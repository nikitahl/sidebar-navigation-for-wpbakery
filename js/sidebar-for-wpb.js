(function ($) {
	$(document).ready(function () {
		$(window).on('vc_build', function () {
			var pluginUrl = window.sidebar_for_wpb_js.plugin_url;
			var $navbar = $('#vc_navbar');
			var $frameWrapper = $('#vc_inline-frame-wrapper');
			var $navbarClone = $navbar.clone();
			var $navbarItems = $navbar.find('.vc_navbar-nav li');
			var $undoBtn = $navbar.find('#vc_navbar-undo');
			var $redoBtn = $navbar.find('#vc_navbar-redo');

			$undoBtn.attr('id', 'vc_navbar-undo-custom');
			$redoBtn.attr('id', 'vc_navbar-redo-custom');
			$navbar.attr('id', 'vc_navbar-custom');

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
					$child.css({
						'margin': '2px 3px',
						'width': '90%',
						'font-size': '11px',
					})
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

			$navbar.after($navbarClone);
			$('body').append('<link rel="stylesheet" href="' + pluginUrl + '/css/sidebar-for-wpb.min.css" type="text/css" />');

			var $panelWindow = $('.vc_ui-panel-window');
			var myObserver = new MutationObserver(mutationHandler);
			var obsConfig = {
				attributes: true
			};

			$panelWindow.each(function() {
				myObserver.observe(this, obsConfig);
			});

			function mutationHandler(mutationRecords) {
				mutationRecords.forEach(function(mutation) {
					if (window.innerWidth > 782 && mutation.type === 'attributes' && mutation.attributeName === 'class') {
						if (mutation.target.classList.contains('vc_active')) {
							$frameWrapper.css('left', '440px');
						} else {
							$frameWrapper.css('left', '60px');
						}
					}
				});
			}

		});
	});
})(jQuery);
