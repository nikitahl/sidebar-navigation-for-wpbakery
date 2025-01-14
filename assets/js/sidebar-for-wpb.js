(function ($) {
	$(document).ready(function () {
		var $window = $(window);
		$window.on('vc_build', function () {
			var pluginUrl = window.sidebar_for_wpb_js.plugin_url;
			var $navbar = $('#vc_navbar');
			var $frameWrapper = $('#vc_inline-frame-wrapper');
			var $navbarItems = $navbar.find('.vc_navbar-nav li');
			var $panelWindow = $('.vc_ui-panel-window');

			$.each($navbarItems, function (index, item) {
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
			});

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
						setFrameWrapperPosition($(mutation.target));
					}
				});
			}

			function handleWindowResize() {
				setFrameWrapperPosition($panelWindow);
			}

			function setFrameWrapperPosition($panelWindow) {
				if (window.innerWidth > 960) {
					if ($panelWindow.hasClass('vc_active')) {
						$frameWrapper.css('left', '490px'); // sidebar 440px + navbar 50px
					} else {
						$frameWrapper.css('left', '50px'); // navbar 50px
					}
				} else {
					$frameWrapper.css('left', '0');
				}
			}

			$window.on('resize', handleWindowResize);

		});
	});
})(jQuery);
