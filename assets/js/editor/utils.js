const { vc, jQuery, _ } = window
const $ = jQuery

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
 * Adds event listener to Add Element's search input to trigger click on the first visible element when Enter key is pressed.
 */
export function addSearchInputListener () {
  const $searchInput = $('#vc_elements_name_filter')
  const keyupHandler = function (e) {
    const filterValue = $(this).val().trim()

    if (filterValue.length) {
      const $visibleElements = $('.wpb-layout-element-button.vc_visible:not(.vc_inappropriate)')
      const $firstVisibleElement = $visibleElements.first().find('[data-vc-clickable]')
      $firstVisibleElement.addClass('snfw-highlighted')
      if (e.key === 'Tab' || e.keyCode === 9) {
        e.preventDefault()
        $visibleElements.find('.snfw-highlighted').removeClass('snfw-highlighted')
        // next sibling
        $($visibleElements[1]).find('[data-vc-clickable]').focus()
      }
      if (13 === (e.keyCode || e.which)) {
        $visibleElements.find('.snfw-highlighted').removeClass('snfw-highlighted')
        $firstVisibleElement.click()
      }
    }
  }

  if ($searchInput) {
    $searchInput.on('keydown', _.debounce(keyupHandler, 300))
  }
}
