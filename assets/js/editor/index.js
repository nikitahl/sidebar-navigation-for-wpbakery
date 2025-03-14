import '../../css/editor.css'
import { SidebarForWPBakery } from './sidebar'

const $ = jQuery

$(document).ready(() => {
  $(window).on('vc_build', () => {
    new SidebarForWPBakery()
  })
})
