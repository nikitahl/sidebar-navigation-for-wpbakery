const { vc } = window

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
