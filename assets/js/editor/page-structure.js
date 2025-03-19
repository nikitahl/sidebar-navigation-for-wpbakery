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
    this.$pageStructurePanel = null
    this.pageStructurePanel = null
    this.$pageStructureContainer = null

    this.init()
  }

  init () {
    this.addPageStructurePanel()
    this.addNavbarIcon()
    // TODO: Add page structure re-render on changes (add, clone, paste, delete, row layout change, undo, redo)
    // TODO: Add option in settings for navbar to stick to the right side of the screen
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
    const _this = this
    vc.PageStructurePanelView = vc.PanelView.extend({})
    vc.PageStructurePanel = vc.PageStructurePanelView
      .vcExtendUI (vc.HelperPanelViewHeaderFooter)
      .extend({
        panelName: 'page_structure',
        isRendered: false,
        initialize: function () {
          if (!this.isRendered) {
            _this.renderPageStructure()
            vc.events.on('editorChange', _this.debouncedRender.bind(_this))
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
    const _this = this
    this.structuredData = this.buildTree(vc.shortcodes.models)
    this.$pageStructureContainer.empty()
    this.$pageStructureContainer.append(this.createTreeHTML(this.structuredData))
    this.$pageStructureContainer.on('click', '.page-structure-label', function () {
      $(this).toggleClass('expanded')
      $(this).next().slideToggle(200)
    })
    this.$pageStructurePanel.on('click', '.vc_control-btn', function (e) {
      e.preventDefault()
      e.stopPropagation()
      const $label = $(this).closest('.page-structure-label')
      const id = $label.attr('id')
      const controlType = $(this).data('control')
      switch (controlType) {
      case 'inspect':
        _this.scrollToElement(id)
        break
      case 'edit':
        _this.editElement(id)
        break
      case 'delete':
        vc.deleteElement(id)
        break
      }
    })
    this.$pageStructureContainer.on('mouseenter', '.page-structure-label', function () {
      const id = $(this).attr('id')
      vc.$frame_body.find('[data-model-id="' + id + '"]').addClass('vc_hover')
    })
    this.$pageStructureContainer.on('mouseleave', '.page-structure-label', function () {
      const id = $(this).attr('id')
      vc.$frame_body.find('[data-model-id="' + id + '"]').removeClass('vc_hover')
    })
  }

  createTreeHTML (nodes) {
    if (!nodes || nodes.length === 0) return ''

    const $ul = $('<ul class="page-structure-list"></ul>')

    nodes.forEach(node => {
      const className = this.createNodeClasses(node)
      const id = node?.id || ''
      let nodeName = node?.settings?.name
      if (nodeName === 'Row') {
        const rowTitle = node?.attributes?.params?.row_title
        nodeName += rowTitle ? ` (${rowTitle})` : ''
      }
      nodeName = nodeName || 'Unnamed Element'
      const $li = $(`
        <li class="page-structure-item">
          <div class="page-structure-label" title="${nodeName}" id="${id}">
            <span>
              ${nodeName}
            </span>
            <div class="element-controls">
              <a class="vc_control-btn vc_control-btn-inspect" data-control="inspect" href="#" title="Inspect ${nodeName}" target="_blank"><span class="vc_btn-content"><i class="vc-composer-icon vc-c-icon-search"></i></span></a>
              <a class="vc_control-btn vc_control-btn-edit" data-control="edit" href="#" title="${window.i18nLocale.edit} ${nodeName}" target="_blank"><span class="vc_btn-content"><i class="vc-composer-icon vc-c-icon-mode_edit"></i></span></a>
              <a class="vc_control-btn vc_control-btn-delete" data-control="delete" href="#" title="Delete ${nodeName}" target="_blank"><span class="vc_btn-content"><i class="vc-composer-icon vc-c-icon-delete_empty"></i></span></a>
            </div>
          </div>
        </li>
      `)

      if (className) {
        $li.addClass(className)
      }

      if (node?.children.length > 0) {
        const $childContainer = $('<div class="page-structure-children"></div>')
        $childContainer.append(this.createTreeHTML(node.children))
        $childContainer.hide()
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
    vc.$frame_body.find('[data-model-id="' + id + '"]')[0].scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}
