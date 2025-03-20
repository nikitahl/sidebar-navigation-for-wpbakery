const $ = window.jQuery

export class SidebarForWPBakery {
  constructor () {
    this.pluginUrl = window.sidebar_for_wpb_js.pluginUrl
    this.disableDescription = window.sidebar_for_wpb_js.disableDescription
    this.compactView = window.sidebar_for_wpb_js.compactView
    this.compactViewEditForm = window.sidebar_for_wpb_js.compactViewEditForm
    this.responsiveView = window.sidebar_for_wpb_js.responsiveView
    this.sidebarPostion = window.sidebar_for_wpb_js.sidebarPostion
    this.$window = $(window)
    this.$body = $('body')
    this.$screenSizeControls = $('#vc_screen-size-control .vc_screen-width')
    this.$addElementPanel = $('#vc_ui-panel-add-element')
    this.$editElementPanel = $('#vc_ui-panel-edit-element')
    this.$settingsPanel = $('#vc_ui-panel-post-settings')
    this.$navbar = $('#vc_navbar')
    this.$frameWrapper = $('#vc_inline-frame-wrapper')
    this.$iframe = $('#vc_inline-frame')
    this.$navbarItems = this.$navbar.find('.vc_navbar-nav li')
    this.$panelWindow = $('.vc_ui-panel-window')
    this.$navbarBtns = this.$navbar.find('.vc_icon-btn')
    this.panelsSettings = [
      {
        panelId: 'panel-add-element',
        navbarBtnId: 'vc_add-new-element'
      },
      {
        panelId: 'panel-templates',
        navbarBtnId: 'vc_templates-editor-button'
      },
      {
        panelId: 'panel-post-seo',
        navbarBtnId: 'vc_seo-button'
      },
      {
        panelId: 'panel-post-settings',
        navbarBtnId: 'vc_post-settings-button'
      },
      {
        panelId: 'panel-page-structure',
        navbarBtnId: 'vc_page-structure'
      }
    ]

    this.init()
  }

  init () {
    this.$body.addClass(`sidebar-position-${this.sidebarPostion}`)
    // Set navbar items order
    $.each(this.$navbarItems, this.setNavbarItems.bind(this))

    // Append styles
    this.$body.append(`<link rel="stylesheet" href="${this.pluginUrl}/assets/dist/css/editor.min.css" type="text/css" />`)

    // Set up MutationObserver
    const myObserver = new MutationObserver(this.mutationHandler.bind(this))
    const obsConfig = { attributes: true }

    this.$panelWindow.each(function () {
      myObserver.observe(this, obsConfig)
    })

    // Set initial settings
    this.setActiveBtn(this.$panelWindow.filter('.vc_active'))
    this.handleWindowResize()
    this.setSettings()

    this.$window.on('resize', this.handleWindowResize.bind(this))
  }

  mutationHandler (mutationRecords) {
    mutationRecords.forEach((mutation) => {
      if (window.innerWidth > 960 && mutation.type === 'attributes' && mutation.attributeName === 'class') {
        this.setFrameWrapperPosition()
        this.setActiveBtn($(mutation.target))
      }
    })
  }

  handleWindowResize () {
    this.setFrameWrapperPosition()
  }

  setFrameWrapperPosition () {
    const currentView = this.getCurrentView()
    if (window.innerWidth > 960) {
      const $activePanel = this.$panelWindow.filter('.vc_active')
      if ($activePanel.length) {
        this.$frameWrapper.css(this.sidebarPostion, '490px') // sidebar 440px + navbar 50px
        this.setIframeWidth(currentView, `${window.innerWidth}px`, 'auto')
        if ($activePanel.is('#vc_ui-panel-templates') && $activePanel.hasClass('vc_media-xs')) {
          $activePanel.removeClass('vc_media-xs')
          $activePanel.addClass('vc_media-sm')
        }
      } else {
        this.$frameWrapper.css(this.sidebarPostion, '50px') // navbar 50px
        this.setIframeWidth(currentView, '100%', 'none')
      }
    } else {
      this.$frameWrapper.css(this.sidebarPostion, '0')
      this.setIframeWidth(currentView, '100%', 'none')
    }
  }

  setIframeWidth (currentView, iframeWidth, overflow) {
    if (this.responsiveView === '0') {
      if (currentView === 100) {
        this.$frameWrapper.css('overflow-x', overflow)
        this.$iframe.css('width', iframeWidth)
      } else {
        this.$frameWrapper.css('overflow-x', 'auto')
        this.$iframe.css('width', `${currentView}px`)
      }
    }
  }

  getCurrentView () {
    return parseInt(this.$screenSizeControls.filter('.active').attr('data-size'))
  }

  setActiveBtn ($target) {
    this.$navbarBtns.removeClass('vc_active')
    if ($target.hasClass('vc_active')) {
      const panelType = $target.attr('data-vc-ui-element')
      const activePanel = this.panelsSettings.find((setting) => setting.panelId === panelType)
      if (activePanel) {
        const activeBtn = activePanel.navbarBtnId
        this.$navbar.find(`.vc_navbar-nav > li > #${activeBtn}`).addClass('vc_active')
      }
    }
  }

  setSettings () {
    if (this.disableDescription === '1') {
      this.$addElementPanel.find('.wpb-elements-list').addClass('vc_hide-description')
    }
    if (this.compactView === '1') {
      this.$addElementPanel.find('.wpb-elements-list').addClass('vc_compact-view')
    }
    if (this.compactViewEditForm === '1') {
      this.$editElementPanel.find('.vc_ui-panel-content').addClass('vc_compact-view')
      this.$settingsPanel.find('.vc_ui-panel-content-container').addClass('vc_compact-view')
    }
  }

  setNavbarItems (index, item) {
    const $item = $(item)
    const $child = $item.children()
    if ($child.hasClass('vc_back-button')) {
      $item.css('order', '10')
    } else if ($child.hasClass('vc_dropdown-more')) {
      $item.css({
        'order': '9'
      })
    } else if ($child.hasClass('vc_btn-save')) {
      $item.css({
        'order': '8'
      })
    } else if ($child.attr('id') === 'vc_screen-size-control') {
      $item.css('order', '7')
    } else if ($child.hasClass('vc_post-settings')) {
      $item.css('order', '6')
    } else if ($child.hasClass('vc_seo-button')) {
      $item.css({
        'order': '5',
        'margin-top': 'auto'
      })
    }
  }
}
