<?php
/**
 * Plugin Name: Sidebar for WPBakery Page Builder
 * Description: Enhanced UI for WPBakery Page Builder with a sidebar navigation and panels.
 * Version: 2.1
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

require_once plugin_dir_path(__FILE__) . 'includes/settings.php';

add_action( 'vc_frontend_editor_enqueue_js_css', 'sidebar_for_wpb_enqueue_frontend', 999 );
add_action( 'plugins_loaded', 'sidebar_nav_for_wpbakery_load_textdomain' );

// Add "Settings" link on the Plugins page
add_filter('plugin_action_links_sidebar-navigation-for-wpbakery/sidebar-navigation-for-wpbakery.php', 'sidebar_nav_for_wpbakery_settings_link');

/**
 * Enqueue the plugin's styles and scripts.
 */
function sidebar_for_wpb_enqueue_frontend() {
	// Check if we are in inline editor mode and only then load the script
	if ( vc_is_inline() ) {
		wp_register_script( 'sidebar-for-wpb-js', plugins_url( '/assets/dist/js/editor.min.js', __FILE__ ), array(), WPB_VC_VERSION, true  );
		wp_enqueue_script( 'sidebar-for-wpb-js' );

		$page_structure_html = file_get_contents(plugin_dir_path(__FILE__) . 'includes/page-structure-panel.php');
		$page_structure_title = esc_html__( 'Page Structure', 'sidebar-navigation-for-wpbakery' );
		$page_structure_find = esc_html__( 'Find', 'sidebar-navigation-for-wpbakery' );
		// Get saved options
		$settings = array(
			'pluginUrl'           => plugins_url( '', __FILE__ ),
			'disableDescription'  => get_option( 'sidebar_nav_for_wpbakery_disable_description', '0' ),
			'compactView'         => get_option( 'sidebar_nav_for_wpbakery_compact_view', '0' ),
			'compactViewEditForm' => get_option( 'sidebar_nav_for_wpbakery_compact_view_edit_form', '0' ),
			'responsiveView'      => get_option( 'sidebar_nav_for_wpbakery_responsive_view', '0' ),
			'pageStructure'       => get_option( 'sidebar_nav_for_wpbakery_page_structure', '0' ),
			'sidebarPostion'      => get_option( 'sidebar_nav_for_wpbakery_sidebar_position', 'left' ),
			'pageStructureHtml'   => $page_structure_html,
			'pageStructureTitle'  => $page_structure_title,
			'pageStructureFind'   => $page_structure_find,
		);

		// Provide plugin URL for JS
		wp_localize_script( 'sidebar-for-wpb-js', 'sidebar_for_wpb_js', $settings );
	}
}

/**
 * Adds a settings link to the plugin's actions array.
 *
 * @param array $links The plugin action links.
 * @return array The modified links array with the settings link added.
 * @since 2.0
 */
function sidebar_nav_for_wpbakery_settings_link( $links ) {
	// Generate the settings link and escape the URL for security
	$settings_link = '<a href="' . esc_url( admin_url( 'options-general.php?page=sidebar-navigation-for-wpbakery' ) ) . '">' . esc_html__( 'Settings', 'sidebar-navigation-for-wpbakery' ) . '</a>';

	// Add the settings link to the beginning of the array
	array_unshift( $links, $settings_link );

	return $links;
}

/**
 * Load the plugin's text domain for localization.
 */
function sidebar_nav_for_wpbakery_load_textdomain() {
	load_plugin_textdomain( 'sidebar-navigation-for-wpbakery', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
}
