// Simple tooltip behavior using title attribute
document.addEventListener('DOMContentLoaded', function () {
	var tooltips = document.querySelectorAll('.sfw-tooltip');
	tooltips.forEach(function (tooltip) {
		tooltip.addEventListener('mouseover', function () {
			var title = tooltip.getAttribute('aria-label');
			var tooltipDiv = document.createElement('div');
			tooltipDiv.classList.add('sfw-tooltip-text');
			tooltipDiv.innerText = title;
			tooltip.appendChild(tooltipDiv);
		});

		tooltip.addEventListener('mouseout', function () {
			var tooltipDiv = tooltip.querySelector('.sfw-tooltip-text');
			if (tooltipDiv) {
				tooltip.removeChild(tooltipDiv);
			}
		});
	});
});
