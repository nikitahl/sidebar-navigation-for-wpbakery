import '../../css/editor/editor.css'
import { SidebarForWPBakery } from './sidebar'
import { PageStructure } from './page-structure'
import { extendInlineShortcodeView } from './utils'

const $ = jQuery

$(document).ready(() => {
  extendInlineShortcodeView()
  $(window).on('vc_build', () => {
    if (window.sidebar_for_wpb_js.pageStructure === '1') {
      new PageStructure()
    }
    new SidebarForWPBakery()
  })
})
