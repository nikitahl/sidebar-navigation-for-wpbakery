/**
 * Notifications class that overrides and extends existing WPBakery notifications.
 * While preserving existing functionality, it adds a close button.
 */

const $ = jQuery
const { vc } = window

export class Notifications {
  constructor () {
    this.$message = null
    this.showNotification = this.showNotification.bind(this)
    this.hideNotification = this.hideNotification.bind(this)
    this.init()
  }

  init () {
    vc.showMessage = this.showNotification

    if (window.vc_user_access && !window.vc_user_access().partAccess('unfiltered_html')) {
      vc.showMessage(window.i18nLocale.unfiltered_html_access, 'type-error', 15000)
    }
  }

  hideNotification () {
    this.$message.slideUp(500, function () {
      $(this).remove()
    })
    if (vc.message_timeout && this.$message) {
      window.clearTimeout(vc.message_timeout)
      vc.message_timeout = false
    }
  }

  showNotification  (message, type, timeout, target) {
    if (vc.message_timeout) {
      $('.vc_message').remove()
      window.clearTimeout(vc.message_timeout)
    }
    if (!type) {
      type = 'success'
    }
    if (!timeout) {
      timeout = 10000
    }
    const defaultSelector = window.vc_mode && 'admin_page' === window.vc_mode ? '.metabox-composer-content' : 'body'
    const selector = target || defaultSelector
    const $close = $('<span class="vc_message-close"><i class="vc-composer-icon vc-c-icon-close"></i></span>')
    this.$message = $('<div class="vc_message ' + type + '" style="z-index: 999;">' + message + '</div>')
    $close.on('click', this.hideNotification)

    this.$message.append($close)
    this.$message.prependTo($(selector))
    this.$message.fadeIn(500)

    vc.message_timeout = window.setTimeout(this.hideNotification, timeout)
  }
}
