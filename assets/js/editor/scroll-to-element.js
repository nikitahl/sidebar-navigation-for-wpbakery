const $ = jQuery
const { vc } = window
let $elementHelper = null

export function scrollToElement (id) {
  const $element = vc.$frame_body.find(`[data-model-id="${id}"]`)
  if ($element.length) {
    scrollToElementAndWait($element[0], () => {
      showElementHelper($element)
    })
  }
}

function scrollToElementAndWait (element, callback) {
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

function createElementOutlineHelper () {
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
  $elementHelper = vc.$frame_body.find('.sfw-element-helper')
}

function showElementHelper ($element) {
  $element.append($elementHelper)
  $elementHelper.css({
    zIndex: 9999,
    opacity: '1',
    visibility: 'visible',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  })
  setTimeout(() => $elementHelper.css({ opacity: '0', visibility: 'hidden', zIndex: -1 }), 1800)
}

$(document).ready(() => {
  vc.events.on('app.render', () => {
    if (!$elementHelper && vc.$frame_body) {
      createElementOutlineHelper()
    }
  })
})
