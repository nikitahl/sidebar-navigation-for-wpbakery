import '../../scss/editor/main.scss'
import { extendInlineShortcodeView, addSearchInputListener } from './utils'
import { SidebarForWPBakery } from './sidebar'
import { PageStructure } from './page-structure'
import { Notifications } from './notifications'
import { applyThemeColor } from './theme-color'

const $ = window.jQuery

$(document).ready(() => {
  applyThemeColor()
  extendInlineShortcodeView()
  $(window).on('vc_build', () => {
    if (window?.sidebar_for_wpb_js?.pageStructure === '1') {
      new PageStructure()
    }
    new Notifications()
    new SidebarForWPBakery()

    addSearchInputListener()
  })
})
