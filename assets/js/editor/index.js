import '../../scss/editor/main.scss'
import { extendInlineShortcodeView } from './utils'
import { SidebarForWPBakery } from './sidebar'
import { PageStructure } from './page-structure'
import { Notifications } from './notifications'

const $ = jQuery

$(document).ready(() => {
  extendInlineShortcodeView()
  $(window).on('vc_build', () => {
    if (window.sidebar_for_wpb_js.pageStructure === '1') {
      new PageStructure()
    }
    new Notifications()
    new SidebarForWPBakery()
  })
})
