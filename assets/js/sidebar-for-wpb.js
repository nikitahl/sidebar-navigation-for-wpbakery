(function ($) {
	$(document).ready(function () {
		var $window = $(window);
		$window.on('vc_build', function () {
			var pluginUrl = window.sidebar_for_wpb_js.pluginUrl;
			var disableDescription = window.sidebar_for_wpb_js.disableDescription;
			var compactView = window.sidebar_for_wpb_js.compactView;
			var responsiveView = window.sidebar_for_wpb_js.responsiveView;
			var $screenSizeControls = $('#vc_screen-size-control .vc_screen-width');
			var $addElementPanel = $('#vc_ui-panel-add-element');
			var $navbar = $('#vc_navbar');
			var $frameWrapper = $('#vc_inline-frame-wrapper');
			var $iframe = $('#vc_inline-frame');
			var $navbarItems = $navbar.find('.vc_navbar-nav li');
			var $panelWindow = $('.vc_ui-panel-window');
			var $navbarBtns = $navbar.find('.vc_icon-btn');
			var panelsSettings = [
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
			];

			$.each($navbarItems, setNavbarItems);

			$('body').append('<link rel="stylesheet" href="' + pluginUrl + '/assets/css/sidebar-for-wpb.min.css" type="text/css" />');

			var myObserver = new MutationObserver(mutationHandler);
			var obsConfig = {
				attributes: true
			};

			$panelWindow.each(function() {
				myObserver.observe(this, obsConfig);
			});

			function mutationHandler(mutationRecords) {
				mutationRecords.forEach(function(mutation) {
					if (window.innerWidth > 960 && mutation.type === 'attributes' && mutation.attributeName === 'class') {
						setFrameWrapperPosition();
						setActiveBtn($(mutation.target));
					}
				});
			}

			function handleWindowResize() {
				setFrameWrapperPosition();
			}

			function setFrameWrapperPosition() {
				var currentView = getCurrentView();
				if (window.innerWidth > 960) {
					var $activePanel = $panelWindow.filter('.vc_active');
					if ($activePanel.length) {
						$frameWrapper.css('left', '490px'); // sidebar 440px + navbar 50px
						setIframeWidth(currentView, window.innerWidth + 'px', 'auto');
						if ($activePanel.is('#vc_ui-panel-templates') && $activePanel.hasClass('vc_media-xs')) {
							$activePanel.removeClass('vc_media-xs');
							$activePanel.addClass('vc_media-sm');
						}
					} else {
						$frameWrapper.css('left', '50px'); // navbar 50px
						setIframeWidth(currentView, '100%', 'none');
					}
				} else {
					$frameWrapper.css('left', '0');
					setIframeWidth(currentView, '100%', 'none');
				}
			}

			function setIframeWidth (currentView, iframeWidth, overflow) {
				if (responsiveView === '0') {
					if (currentView === 100) {
						$frameWrapper.css('overflow-x', overflow);
						$iframe.css('width', iframeWidth);
					} else {
						$frameWrapper.css('overflow-x', 'auto');
						$iframe.css('width', currentView + 'px');
					}
				}
			}

			function getCurrentView () {
				return parseInt($screenSizeControls.filter('.active').attr('data-size'));
			}

			function setActiveBtn ($target) {
				$navbarBtns.removeClass('vc_active');
				if ($target.hasClass('vc_active')) {
					var panelType = $target.attr('data-vc-ui-element');
					var activePanel = panelsSettings.find(function (setting) {
						return setting.panelId === panelType;
					});
					if (activePanel) {
						var activeBtn = activePanel.navbarBtnId;
						$navbar.find('.vc_navbar-nav > li > #' + activeBtn).addClass('vc_active');
					}
				}
			}

			function setSettings () {
				if (disableDescription === '1') {
					$addElementPanel.find('.wpb-elements-list').addClass('vc_hide-description');
				}
				if (compactView === '1') {
					$addElementPanel.find('.wpb-elements-list').addClass('vc_compact-view');
				}
			}

			function setNavbarItems (index, item) {
				var $item = $(item);
				var $child = $item.children();
				if ($child.hasClass('vc_back-button')) {
					$item.css('order', '10');
				} else if ($child.hasClass('vc_dropdown-more')) {
					$item.css({
						'order': '9'
					});
				} else if ($child.hasClass('vc_btn-save')) {
					$item.css({
						'order': '8'
					});
				} else if ($child.attr('id') === 'vc_screen-size-control') {
					$item.css('order', '7');
				} else if ($child.hasClass('vc_post-settings')) {
					$item.css('order', '6');
				} else if ($child.hasClass('vc_seo-button')) {
					$item.css({
						'order':'5',
						'margin-top': 'auto'
					});
				}
			}

			setActiveBtn($panelWindow.filter('.vc_active'));
			handleWindowResize();
			setSettings();

			$window.on('resize', handleWindowResize);

		});
	});
})(jQuery);
