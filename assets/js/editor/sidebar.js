;(function ($) {
  $(document).ready(() => {
    const $window = $(window)
    $window.on('vc_build', () => {
      const pluginUrl = window.sidebar_for_wpb_js.pluginUrl
      const disableDescription = window.sidebar_for_wpb_js.disableDescription
      const compactView = window.sidebar_for_wpb_js.compactView
      const compactViewEditForm = window.sidebar_for_wpb_js.compactViewEditForm
      const responsiveView = window.sidebar_for_wpb_js.responsiveView
      const $screenSizeControls = $('#vc_screen-size-control .vc_screen-width')
      const $addElementPanel = $('#vc_ui-panel-add-element')
      const $editElementPanel = $('#vc_ui-panel-edit-element')
      const $settingsPanel = $('#vc_ui-panel-post-settings')
      const $navbar = $('#vc_navbar')
      const $frameWrapper = $('#vc_inline-frame-wrapper')
      const $iframe = $('#vc_inline-frame')
      const $navbarItems = $navbar.find('.vc_navbar-nav li')
      const $panelWindow = $('.vc_ui-panel-window')
      const $navbarBtns = $navbar.find('.vc_icon-btn')
      const panelsSettings = [
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
        }
      ]

      $.each($navbarItems, setNavbarItems)

      $('body').append('<link rel="stylesheet" href="' + pluginUrl + '/assets/css/sidebar-for-wpb.min.css" type="text/css" />')

      const myObserver = new MutationObserver(mutationHandler)
      const obsConfig = {
        attributes: true
      }

      $panelWindow.each(function() {
        myObserver.observe(this, obsConfig)
      })

      function mutationHandler(mutationRecords) {
        mutationRecords.forEach((mutation) => {
          if (window.innerWidth > 960 && mutation.type === 'attributes' && mutation.attributeName === 'class') {
            setFrameWrapperPosition()
            setActiveBtn($(mutation.target))
          }
        })
      }

      function handleWindowResize() {
        setFrameWrapperPosition()
      }

      function setFrameWrapperPosition() {
        const currentView = getCurrentView()
        if (window.innerWidth > 960) {
          const $activePanel = $panelWindow.filter('.vc_active')
          if ($activePanel.length) {
            $frameWrapper.css('left', '490px') // sidebar 440px + navbar 50px
            setIframeWidth(currentView, window.innerWidth + 'px', 'auto')
            if ($activePanel.is('#vc_ui-panel-templates') && $activePanel.hasClass('vc_media-xs')) {
              $activePanel.removeClass('vc_media-xs')
              $activePanel.addClass('vc_media-sm')
            }
          } else {
            $frameWrapper.css('left', '50px') // navbar 50px
            setIframeWidth(currentView, '100%', 'none')
          }
        } else {
          $frameWrapper.css('left', '0')
          setIframeWidth(currentView, '100%', 'none')
        }
      }

      function setIframeWidth (currentView, iframeWidth, overflow) {
        if (responsiveView === '0') {
          if (currentView === 100) {
            $frameWrapper.css('overflow-x', overflow)
            $iframe.css('width', iframeWidth)
          } else {
            $frameWrapper.css('overflow-x', 'auto')
            $iframe.css('width', currentView + 'px')
          }
        }
      }

      function getCurrentView () {
        return parseInt($screenSizeControls.filter('.active').attr('data-size'))
      }

      function setActiveBtn ($target) {
        $navbarBtns.removeClass('vc_active')
        if ($target.hasClass('vc_active')) {
          const panelType = $target.attr('data-vc-ui-element')
          const activePanel = panelsSettings.find((setting) => setting.panelId === panelType)
          if (activePanel) {
            const activeBtn = activePanel.navbarBtnId
            $navbar.find('.vc_navbar-nav > li > #' + activeBtn).addClass('vc_active')
          }
        }
      }

      function setSettings () {
        if (disableDescription === '1') {
          $addElementPanel.find('.wpb-elements-list').addClass('vc_hide-description')
        }
        if (compactView === '1') {
          $addElementPanel.find('.wpb-elements-list').addClass('vc_compact-view')
        }
        if (compactViewEditForm === '1') {
          $editElementPanel.find('.vc_ui-panel-content').addClass('vc_compact-view')
          $settingsPanel.find('.vc_ui-panel-content-container').addClass('vc_compact-view')
        }
      }

      function setNavbarItems (index, item) {
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
            'order':'5',
            'margin-top': 'auto'
          })
        }
      }

      setActiveBtn($panelWindow.filter('.vc_active'))
      handleWindowResize()
      setSettings()

      $window.on('resize', handleWindowResize)
    })
  })
})(jQuery)
