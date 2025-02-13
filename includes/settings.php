<?php
/**
 * Registers the settings page, settings fields, and tooltips.
 *
 * @since 2.0
 */

if (!defined('ABSPATH')) {
	exit;
}

// Hook to add the settings page
add_action('admin_menu', 'sidebar_nav_for_wpbakery_add_settings_page');
add_action('admin_init', 'sidebar_nav_for_wpbakery_settings_init');
add_action( 'admin_enqueue_scripts', 'sidebar_nav_for_wpbakery_enqueue_admin_scripts' );

/**
 * Adds the settings page to the admin menu.
 *
 * @since 2.0
 */
function sidebar_nav_for_wpbakery_add_settings_page() {
	add_options_page(
		esc_html__( 'Sidebar for WPBakery Settings', 'sidebar-navigation-for-wpbakery' ), // Page title
		esc_html__( 'Sidebar for WPBakery', 'sidebar-navigation-for-wpbakery' ),         // Menu title
		'manage_options',                                                               // Capability
		'sidebar-navigation-for-wpbakery',                                              // Menu slug
		'sidebar_nav_for_wpbakery_settings_page'                                        // Callback function
	);
}

/**
 * Renders the settings page for the plugin.
 *
 * @since 2.0
 */
function sidebar_nav_for_wpbakery_settings_page() {
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Sidebar for WPBakery Settings', 'sidebar-navigation-for-wpbakery' ); ?></h1>
		<form action="options.php" method="post">
			<?php
			// Output security fields for the registered settings
			settings_fields( 'sidebar_nav_for_wpbakery_options_group' );

			// Output the settings sections and their fields
			do_settings_sections( 'sidebar-navigation-for-wpbakery' );

			// Submit button for saving the settings
			submit_button();
			?>
		</form>
	</div>
	<?php
}

/**
 * Registers the settings fields and sections.
 *
 * @since 2.0
 */
function sidebar_nav_for_wpbakery_settings_init() {
	// Register settings
	register_setting( 'sidebar_nav_for_wpbakery_options_group', 'sidebar_nav_for_wpbakery_disable_description' );
	register_setting( 'sidebar_nav_for_wpbakery_options_group', 'sidebar_nav_for_wpbakery_compact_view' );
	register_setting( 'sidebar_nav_for_wpbakery_options_group', 'sidebar_nav_for_wpbakery_responsive_view', [
		'sanitize_callback' => function( $value ) {
			return $value === '1' ? '1' : '0'; // Ensures checkbox properly saves '1' or '0'
		}
	] );

	// Add settings section
	add_settings_section(
		'sidebar_nav_for_wpbakery_main_section',
		'',
		'',
		'sidebar-navigation-for-wpbakery'
	);

	// Add "Disable elements' description" field
	add_settings_field(
		'sidebar_nav_for_wpbakery_disable_description',
		'<div class="sfw-label">
			<span class="sfw-title">' . esc_html__( 'Disable elements\' description', 'sidebar-navigation-for-wpbakery' ) . '</span>
			<span class="sfw-tooltip" aria-label="' . esc_attr__( 'Hides the descriptions under WPBakery elements in the Add Element panel.', 'sidebar-navigation-for-wpbakery' ) . '">❔</span>
		</div>',
		'sidebar_nav_for_wpbakery_disable_description_callback',
		'sidebar-navigation-for-wpbakery',
		'sidebar_nav_for_wpbakery_main_section'
	);

	// Add "Compact view" field
	add_settings_field(
		'sidebar_nav_for_wpbakery_compact_view',
		'<div class="sfw-label">
			<span class="sfw-title">' . esc_html__( 'Elements compact view', 'sidebar-navigation-for-wpbakery' ) . '</span>
			<span class="sfw-tooltip" aria-label="' . esc_attr__( 'Reduces spacing between elements in the Add Element panel for a more compact view.', 'sidebar-navigation-for-wpbakery' ) . '">❔</span>
		</div>',
		'sidebar_nav_for_wpbakery_compact_view_callback',
		'sidebar-navigation-for-wpbakery',
		'sidebar_nav_for_wpbakery_main_section'
	);

	// Add "Responsive view" field
	add_settings_field(
		'sidebar_nav_for_wpbakery_responsive_view',
		'<div class="sfw-label">
			<span class="sfw-title">' . esc_html__( 'Responsive view', 'sidebar-navigation-for-wpbakery' ) . '</span>
			<span class="sfw-tooltip" aria-label="' . esc_attr__( 'Makes the page view area shrink when the sidebar is opened.', 'sidebar-navigation-for-wpbakery' ) . '">❔</span>
		</div>',
		'sidebar_nav_for_wpbakery_responsive_view_callback',
		'sidebar-navigation-for-wpbakery',
		'sidebar_nav_for_wpbakery_main_section'
	);
}

/**
 * Renders the section description above the settings fields.
 *
 * @since 2.0
 */
function sidebar_nav_for_wpbakery_section_callback() {
	// You can add a description for the section here if needed
	echo '<p>' . esc_html__( 'These settings control the main functionality of the Sidebar for WPBakery plugin.', 'sidebar-navigation-for-wpbakery' ) . '</p>';
}

/**
 * Callback for "Disable elements' description" checkbox.
 *
 * @since 2.0
 */
function sidebar_nav_for_wpbakery_disable_description_callback() {
	$option = get_option( 'sidebar_nav_for_wpbakery_disable_description', 0 );
	?>
	<input type="checkbox" name="sidebar_nav_for_wpbakery_disable_description"
            id="sidebar_nav_for_wpbakery_disable_description" value="1"
		<?php checked( 1, $option, true ); ?> />
	<?php
}

/**
 * Callback for "Compact view" checkbox.
 *
 * @since 2.0
 */
function sidebar_nav_for_wpbakery_compact_view_callback() {
	$option = get_option( 'sidebar_nav_for_wpbakery_compact_view', 0 );
	?>
	<input type="checkbox" name="sidebar_nav_for_wpbakery_compact_view"
            id="sidebar_nav_for_wpbakery_compact_view" value="1"
		<?php checked( 1, $option, true ); ?> />
	<?php
}

/**
 * Callback for "Responsive view" checkbox.
 *
 * @since 2.0
 */
function sidebar_nav_for_wpbakery_responsive_view_callback() {
	$option = get_option( 'sidebar_nav_for_wpbakery_responsive_view', 'default' );

	// If the option is 'default' (not set yet), use checked. Otherwise, use saved value.
	$checked = ( $option === 'default' || $option == '1' ) ? 'checked' : '';

	?>
	<input type="checkbox" name="sidebar_nav_for_wpbakery_responsive_view"
            id="sidebar_nav_for_wpbakery_responsive_view" value="1"
		<?php echo $checked; ?> />
	<?php
}


/**
 * Enqueues the CSS and JS files for the plugin's settings page.
 *
 * @param string $hook The current admin page.
 * @since 2.0
 */
function sidebar_nav_for_wpbakery_enqueue_admin_scripts($hook) {
	// Check if we're on the plugin's settings page
	if ( 'settings_page_sidebar-navigation-for-wpbakery' !== $hook ) {
		return;
	}

	// Enqueue CSS file for admin
	wp_enqueue_style(
		'sidebar-for-wpb-admin-style', // Handle
		plugin_dir_url( __FILE__ ) . '../assets/css/sidebar-for-wpb-admin.css', // CSS file path
		array(), // Dependencies (if any)
		filemtime( plugin_dir_path( __FILE__ ) . '../assets/css/sidebar-for-wpb-admin.min.css' ), // Version (based on file modification time)
		'all' // Media
	);

	// Enqueue JS file for admin
	wp_enqueue_script(
		'sidebar-for-wpb-admin-tooltip', // Handle
		plugin_dir_url( __FILE__ ) . '../assets/js/sidebar-for-wpb-admin.min.js', // JS file path
		array( 'jquery' ), // Dependencies (if any)
		filemtime( plugin_dir_path( __FILE__ ) . '../assets/js/sidebar-for-wpb-admin.js' ), // Version (based on file modification time)
		true // Load in footer
	);
}
