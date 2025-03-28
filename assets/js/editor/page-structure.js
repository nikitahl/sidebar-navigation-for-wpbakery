const $ = jQuery
const { vc } = window

export class PageStructure {
  constructor () {
    this.$wpbodyContent = $('#wpbody-content')
    this.$navbar = $('#vc_navbar')
    this.$navbarItems = this.$navbar.find('.vc_navbar-nav li')
    this.structureIconHtml = `
      <svg width="27" height="27" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="40" width="44" height="12" rx="2" stroke="white" stroke-width="2" fill="transparent"/>
        <rect x="10" y="26" width="44" height="12" rx="2" stroke="white" stroke-width="2" fill="transparent"/>
        <rect x="10" y="12" width="44" height="12" rx="2" stroke="white" stroke-width="2" fill="transparent"/>
      </svg>
    `
    this.pageStructureHtml = window.sidebar_for_wpb_js.pageStructureHtml
    this.pageStructureTitle = window.sidebar_for_wpb_js.pageStructureTitle
    this.pageStructureFind = window.sidebar_for_wpb_js.pageStructureFind
    this.$pageStructurePanel = null
    this.pageStructurePanel = null
    this.$pageStructureContainer = null
    this.$elementHelper = null
    this.structuredData = []
    this.expandedNodes = {}
    this.debouncedRender = _.debounce(this.renderPageStructure.bind(this), 500)

    this.init()
  }

  init () {
    this.addPageStructurePanel()
    this.addNavbarIcon()
    this.createElementOutlineHelper()
  }

  addNavbarIcon () {
    const $icon = $('<li></li>')
    $icon.html(`
      <a class="vc_icon-btn" id="vc_page-structure" title="Page Structure">
        <i class="vc-composer-icon vc-icon-structure">${this.structureIconHtml}</i>
      </a>
    `)

    this.$navbarItems.eq(1).after($icon)

    const $pageStructure = $('#vc_page-structure')
    if ($pageStructure.length) {
      $pageStructure.on('click', this.handlePageStructureClick.bind(this))
    }
  }

  addPageStructurePanel () {
    this.$wpbodyContent.append(this.pageStructureHtml)
    this.$pageStructurePanel = $('#vc_ui-panel-page-structure')
    this.$pageStructureContainer = this.$pageStructurePanel.find('#page-structure-container')

    if (this.$pageStructurePanel.length) {
      this.$pageStructurePanel.find('h3').text(this.pageStructureTitle)
    }
    this.createPanelView()
  }

  handlePageStructureClick () {
    this.pageStructurePanel.render()
  }

  createPanelView () {
    if (vc.PageStructurePanel) return // Prevent multiple initializations

    vc.PageStructurePanelView = vc.PanelView.extend({})
    vc.PageStructurePanel = vc.PageStructurePanelView
      .vcExtendUI(vc.HelperPanelViewHeaderFooter)
      .extend({
        panelName: 'page_structure',
        isRendered: false,
        initialize: () => {
          if (!this.isRendered) {
            this.isRendered = true
            this.renderPageStructure()
            vc.events.on('afterLoadShortcode', this.debouncedRender)
            vc.events.on('afterRemoveShortcode', this.debouncedRender)
          }
        },
        render: function () {
          if (this.$el.is(':hidden')) {
            vc.closeActivePanel()
          }
          vc.active_panel = this
          this.show()
        },
        show: function () {
          if (this.$el.hasClass('vc_active')) {
            return
          }
          this.$el.addClass('vc_active')
          this.trigger('show')
        }
      })
    this.pageStructurePanel = new vc.PageStructurePanel({ el: '#vc_ui-panel-page-structure' })
  }

  buildTree (elements) {
    const map = new Map()
    const tree = []

    elements.forEach(el => map.set(el.id, { ...el, children: [] }))

    elements.forEach(el => {
      if (el.attributes.parent_id) {
        const parent = map.get(el.attributes.parent_id)
        if (parent) {
          parent.children.push(map.get(el.id))
        }
      } else {
        tree.push(map.get(el.id))
      }
    })

    return tree
  }

  renderPageStructure () {
    this.structuredData = this.buildTree(vc.shortcodes.models)
    this.$pageStructureContainer.empty()
    this.$pageStructureContainer.append(this.createTreeHTML(this.structuredData))

    this.$pageStructureContainer.off('click mouseenter mouseleave', '.page-structure-label')
    this.$pageStructureContainer.off('click', '.vc_control-btn')

    this.$pageStructureContainer.on('click', '.page-structure-label', (e) => {
      if ($(e.target).closest('.element-controls').length) {
        return
      }
      const $label = $(e.currentTarget)
      const id = $label.attr('id')
      const nodeId = `node-${id}`
      this.expandedNodes[nodeId] = Object.prototype.hasOwnProperty.call(this.expandedNodes, nodeId) ? !this.expandedNodes[nodeId] : true
      $label.toggleClass('expanded')
      $label.next().slideToggle(200)
    })

    this.$pageStructurePanel.on('click', '.vc_control-btn', (e) => {
      e.preventDefault()
      e.stopPropagation()
      const $currentTarget = $(e.currentTarget)
      const $label = $currentTarget.closest('.page-structure-label')
      const id = $label.attr('id')
      const controlType = $currentTarget.data('control')
      switch (controlType) {
      case 'inspect':
        this.scrollToElement(id)
        break
      case 'edit':
        this.editElement(id)
        break
      }
    })
  }

  createTreeHTML (nodes) {
    if (!nodes?.length) return ''

    const $ul = $('<ul class="page-structure-list"></ul>')

    nodes.forEach(node => {
      const id = node?.id || ''
      const nodeId = `node-${id}`
      const isExpanded = this.expandedNodes[nodeId] || false
      let nodeName = node?.settings?.name
      if (nodeName === 'Row') {
        const rowTitle = node?.attributes?.params?.row_title
        nodeName += rowTitle ? ` (${rowTitle})` : ''
      }
      nodeName = nodeName || 'Unnamed Element'
      const $li = $(`
        <li class="page-structure-item ${this.createNodeClasses(node) || ''}">
          <div class="page-structure-label" title="${nodeName}" id="${id}">
            <span>
              ${nodeName}
            </span>
            <div class="element-controls">
              <a class="vc_control-btn vc_control-btn-inspect" data-control="inspect" href="#" title="${this.pageStructureFind} ${nodeName}" target="_blank"><span class="vc_btn-content"><i class="vc-composer-icon vc-c-icon-search"></i></span></a>
              <a class="vc_control-btn vc_control-btn-edit" data-control="edit" href="#" title="${window.i18nLocale.edit} ${nodeName}" target="_blank"><span class="vc_btn-content"><i class="vc-composer-icon vc-c-icon-mode_edit"></i></span></a>
            </div>
          </div>
        </li>
      `)

      if (node?.children?.length) {
        const $childContainer = $('<div class="page-structure-children"></div>').append(this.createTreeHTML(node.children))
        if (!isExpanded) {
          $childContainer.hide()
        }
        $li.find('.page-structure-label').addClass('page-structure-label--children')
        $li.append($childContainer)
      }

      $ul.append($li)
    })

    return $ul
  }

  createNodeClasses (node) {
    switch (node?.settings?.name) {
    case 'Section':
      return 'page-structure-item--section'
    case 'Row':
      return 'page-structure-item--row'
    case 'Column':
      return 'page-structure-item--column'
    case 'Inner Row':
      return 'page-structure-item--inner-row'
    case 'Inner Column':
      return 'page-structure-item--inner-column'
    default:
      return
    }
  }

  editElement (id) {
    if ('edit_element' !== vc.activePanelName() || !vc.active_panel.model || vc.active_panel.model.get('id') !== id) {
      const model = vc.shortcodes.get(id)
      vc.closeActivePanel()
      vc.edit_element_block_view.render(model)
    }
  }

  scrollToElement (id) {
    const $element = vc.$frame_body.find(`[data-model-id="${id}"]`)
    if ($element.length) {
      this.scrollToElementAndWait($element[0], () => {
        this.showElementHelper($element)
      })
    }
  }

  scrollToElementAndWait (element, callback) {
    if (!element) return

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target) // Stop observing once visible
            callback(entry.target) // Run the callback
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(element)
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  createElementOutlineHelper () {
    const $helper = $('<div class="sfw-element-helper"><div>')
    $helper.css({
      position: 'absolute',
      opacity: '0',
      visibility: 'hidden',
      zIndex: -1,
      boxShadow: '0 0 4px 2px rgb(10, 130, 240, 0.5)',
      background: 'rgba(10, 130, 240, 0.2)',
      pointerEvents: 'none',
      transition: 'box-shadow 0.8s ease-in-out, background 0.8s ease-in-out'
    })
    vc.$frame_body.append($helper)
    this.$elementHelper = vc.$frame_body.find('.sfw-element-helper')
  }

  showElementHelper ($element) {
    $element.append(this.$elementHelper)
    this.$elementHelper.css({
      zIndex: 9999,
      opacity: '1',
      visibility: 'visible',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    })
    setTimeout(() => this.$elementHelper.css({ opacity: '0', visibility: 'hidden', zIndex: -1 }), 1800)
  }
}
