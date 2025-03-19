import '../../css/editor/editor.css'
import { SidebarForWPBakery } from './sidebar'
import { PageStructure } from './page-structure'

const $ = jQuery

$(document).ready(() => {
  $(window).on('vc_build', () => {
    new PageStructure()
    new SidebarForWPBakery()
  })
})
