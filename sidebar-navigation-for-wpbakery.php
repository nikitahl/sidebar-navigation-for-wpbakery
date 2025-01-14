<?php
/**
 * Plugin Name: Sidebar for WPBakery
 * Description: Enhanced UI for WPBakery Page Builder with a sidebar navigation and panels.
 * Version: 1.0
 * Author: Nikita Hlopov
 * Author URI: https://nikitahl.com
 * Requires PHP: 7.0
 * Requires at least: 6.4
 * License: GPLv3
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function sidebar_for_wpb_enqueue_frontend() {
	// check if we are in inline editor mode
	// and only then load the script
	if ( vc_is_inline() ) {
		wp_register_script( 'sidebar-for-wpb-js', plugins_url( '/assets/js/sidebar-for-wpb.min.js', __FILE__ ), array(), WPB_VC_VERSION, true  );
		wp_enqueue_script( 'sidebar-for-wpb-js' );

		// Provide plugin URL for JS
		wp_localize_script( 'sidebar-for-wpb-js', 'sidebar_for_wpb_js', array(
			'plugin_url' => plugins_url( '', __FILE__ )
		) );
	}
}
add_action( 'vc_frontend_editor_enqueue_js_css', 'sidebar_for_wpb_enqueue_frontend', 999 );
