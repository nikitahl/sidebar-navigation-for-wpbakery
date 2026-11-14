const { vc, jQuery } = window
const $ = jQuery
const $document = $(document)

let activeElement = 0
let documentKeydownHandler = null
const debouncedHandleTabPress = _.debounce(handleTabPress, 300)

/**
 * Extends the InlineShortcodeView class to trigger an event after removing a shortcode.
 */
export function extendInlineShortcodeView () {
  const originalRemoveView = window.InlineShortcodeView.prototype.removeView

  window.InlineShortcodeView.prototype.removeView = function (model) {
    originalRemoveView.call(this, model) // Call the original method
    vc.events.trigger('afterRemoveShortcode')
  }
}

/**
 * Adds event listener to Add Element's search input.
 */
export function addSearchInputListener () {
  const $searchInput = $('#vc_elements_name_filter')

  if (!$searchInput.length) {
    return
  }

  $searchInput.on('keydown', (e) => {
    if (e.key === 'Tab' || e.keyCode === 9) {
      e.preventDefault()
      handleTabPress(e)
      addDocumentKeydownListener()
      return
    }
  
    debouncedHandleTabPress(e)
    removeDocumentKeydownListener()
  })
}

/**
 * Adds the document keydown handler if it is not already active.
 */
function addDocumentKeydownListener () {
  if (documentKeydownHandler) {
    return
  }

  documentKeydownHandler = handleTabPress
  $document.on('keydown', documentKeydownHandler)
}

/**
 * Removes the document keydown handler.
 */
function removeDocumentKeydownListener () {
  if (!documentKeydownHandler) {
    return
  }

  $document.off('keydown', documentKeydownHandler)
  documentKeydownHandler = null
}

function handleTabPress (e) {
  const $visibleElements = $('.wpb-layout-element-button.vc_visible:not(.vc_inappropriate)')
  const $firstVisibleElement = $visibleElements.first().find('[data-vc-clickable]')

  if (e.key === 'Tab' || e.keyCode === 9) {
    e.preventDefault()
    $visibleElements.find('.snfw-highlighted').removeClass('snfw-highlighted')
    $($visibleElements[activeElement])
      .find('[data-vc-clickable]')
      .focus()
      .addClass('snfw-highlighted')

    activeElement++
  } else if (e.key === 'Enter' || e.keyCode === 13) {
    const $focusedElement = $visibleElements.find('.snfw-highlighted')
    $focusedElement.removeClass('snfw-highlighted')
    removeDocumentKeydownListener()
    $focusedElement.first().triggerHandler('click')
  } else {
    // Always reset to the first element for non-Tab keys.
    $visibleElements.find('.snfw-highlighted').removeClass('snfw-highlighted')
    $firstVisibleElement.addClass('snfw-highlighted')
    activeElement = 0
  }
}

$document.on('click', '[data-vc-ui-element="button-close"]', () => {
  removeDocumentKeydownListener()
})
