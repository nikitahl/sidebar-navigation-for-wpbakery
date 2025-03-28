import '../../scss/admin/admin.scss'

// Simple tooltip behavior using title attribute
document.addEventListener('DOMContentLoaded', () => {
  const tooltips = document.querySelectorAll('.sfw-tooltip')
  tooltips.forEach((tooltip) => {
    tooltip.addEventListener('mouseover', () => {
      const title = tooltip.getAttribute('aria-label')
      const tooltipDiv = document.createElement('div')
      tooltipDiv.classList.add('sfw-tooltip-text')
      tooltipDiv.innerText = title
      tooltip.appendChild(tooltipDiv)
    })

    tooltip.addEventListener('mouseout', () => {
      const tooltipDiv = tooltip.querySelector('.sfw-tooltip-text')
      if (tooltipDiv) {
        tooltip.removeChild(tooltipDiv)
      }
    })
  })
})
