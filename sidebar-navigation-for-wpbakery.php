<?php
/**
 * Plugin Name: Sidebar for WPBakery Page Builder
 * Description: Customizable UI for WPBakery Page Builder with sidebar navigation and panels.
 * Version: 2.3.1
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

define('SIDEBAR_NAVIGATION_FOR_WPBAKERY_VERSION', '2.3.1');
define('SIDEBAR_NAVIGATION_FOR_WPBAKERY_TD', 'sidebar-navigation-for-wpbakery');

require_once plugin_dir_path(__FILE__) . 'includes/settings.php';

add_action( 'vc_frontend_editor_enqueue_js_css', 'sidebar_for_wpb_enqueue_frontend', 999 );

// Add "Settings" link on the Plugins page
add_filter('plugin_action_links_sidebar-navigation-for-wpbakery/sidebar-navigation-for-wpbakery.php', 'sidebar_nav_for_wpbakery_settings_link');

// Admin dependency notice if WPBakery is missing.
if ( ! function_exists( 'vc_map' ) ) {
	add_action( 'admin_notices', 'sidebar_nav_for_wpbakery_missing_wpbakery_notice' );
	return; // Do not proceed without WPBakery.
}

/**
 * Enqueue the plugin's styles and scripts.
 */
function sidebar_for_wpb_enqueue_frontend() {
	// Check if we are in inline editor mode and only then load the script
	if ( vc_is_inline() ) {
		wp_register_script( 'sidebar-for-wpb-js', plugins_url( '/assets/dist/js/editor.min.js', __FILE__ ), array(), SIDEBAR_NAVIGATION_FOR_WPBAKERY_VERSION, true  );
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
 * Shows admin notice if WPBakery Page Builder is not active.
 *
 * @since 2.3.1
 * @return void
 */
function sidebar_nav_for_wpbakery_missing_wpbakery_notice() {
	if ( current_user_can( 'activate_plugins' ) ) {
		echo '<div class="notice notice-error"><p>' . esc_html__('Sidebar for WPBakery requires WPBakery Page Builder to be installed and active.', 'sidebar-navigation-for-wpbakery') . '</p></div>';
	}
}
