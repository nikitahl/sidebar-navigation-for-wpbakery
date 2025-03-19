import '../../css/editor/editor.css'
import { SidebarForWPBakery } from './sidebar'
import { PageStructure } from './page-structure'
import { extendInlineShortcodeView } from './utils'

const $ = jQuery

$(document).ready(() => {
  extendInlineShortcodeView()
  $(window).on('vc_build', () => {
    new PageStructure()
    new SidebarForWPBakery()
  })
})
