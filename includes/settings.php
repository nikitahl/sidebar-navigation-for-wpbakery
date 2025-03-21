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
    // ToDO: uopdate screenshots
	register_setting( 'sidebar_nav_for_wpbakery_options_group', 'sidebar_nav_for_wpbakery_disable_description' );
	register_setting( 'sidebar_nav_for_wpbakery_options_group', 'sidebar_nav_for_wpbakery_compact_view' );
	register_setting( 'sidebar_nav_for_wpbakery_options_group', 'sidebar_nav_for_wpbakery_compact_view_edit_form' );
	register_setting( 'sidebar_nav_for_wpbakery_options_group', 'sidebar_nav_for_wpbakery_responsive_view', [
		'sanitize_callback' => function( $value ) {
			return $value === '1' ? '1' : '0'; // Ensures checkbox properly saves '1' or '0'
		},
	] );
	register_setting( 'sidebar_nav_for_wpbakery_options_group', 'sidebar_nav_for_wpbakery_page_structure' );
	register_setting( 'sidebar_nav_for_wpbakery_options_group', 'sidebar_nav_for_wpbakery_sidebar_position' );

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

	// Add "Compact view" field for Edit Form
	add_settings_field(
		'sidebar_nav_for_wpbakery_compact_view_edit_form',
		'<div class="sfw-label">
			<span class="sfw-title">' . esc_html__( 'Edit Form compact view', 'sidebar-navigation-for-wpbakery' ) . '</span>
			<span class="sfw-tooltip" aria-label="' . esc_attr__( 'Reduces fields size and spacing in the Edit Element panel for a more compact view.', 'sidebar-navigation-for-wpbakery' ) . '">❔</span>
		</div>',
		'sidebar_nav_for_wpbakery_compact_view_edit_form_callback',
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

	// Add "Page Structure" field
	add_settings_field(
		'sidebar_nav_for_wpbakery_page_structure',
		'<div class="sfw-label">
			<span class="sfw-title">' . esc_html__( 'Page Structure icon', 'sidebar-navigation-for-wpbakery' ) . '</span>
			<span class="sfw-tooltip" aria-label="' . esc_attr__( 'Adds a Page Structure icon to the navbar. Displays a Page Structure in a panel.', 'sidebar-navigation-for-wpbakery' ) . '">❔</span>
		</div>',
		'sidebar_nav_for_wpbakery_page_structure_callback',
		'sidebar-navigation-for-wpbakery',
		'sidebar_nav_for_wpbakery_main_section'
	);

	// Add "Sidebar Position" field
	add_settings_field(
		'sidebar_nav_for_wpbakery_sidebar_position',
		'<div class="sfw-label">
			<span class="sfw-title">' . esc_html__( 'Sidebar Position', 'sidebar-navigation-for-wpbakery' ) . '</span>
			<span class="sfw-tooltip" aria-label="' . esc_attr__( 'Choose the position of the sidebar.', 'sidebar-navigation-for-wpbakery' ) . '">❔</span>
		</div>',
		'sidebar_nav_for_wpbakery_sidebar_position_callback',
		'sidebar-navigation-for-wpbakery',
		'sidebar_nav_for_wpbakery_main_section'
	);
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
 * Callback for "Compact view" checkbox for Edit Form/Settings panel.
 *
 * @since 2.1
 */
function sidebar_nav_for_wpbakery_compact_view_edit_form_callback () {
	$option = get_option( 'sidebar_nav_for_wpbakery_compact_view_edit_form', 0 );
	?>
	<input type="checkbox" name="sidebar_nav_for_wpbakery_compact_view_edit_form"
            id="sidebar_nav_for_wpbakery_compact_view_edit_form" value="1"
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
 * Callback for "Page Structure" checkbox.
 *
 * @since 2.1
 */
function sidebar_nav_for_wpbakery_page_structure_callback() {
	$option = get_option( 'sidebar_nav_for_wpbakery_page_structure', 0 );
	?>
	<input type="checkbox" name="sidebar_nav_for_wpbakery_page_structure"
           id="sidebar_nav_for_wpbakery_page_structure" value="1"
		<?php checked( 1, $option, true ); ?> />
	<?php
}

/**
 * Callback for "Sidebar Position" radio buttons.
 *
 * @since 2.1
 */
function sidebar_nav_for_wpbakery_sidebar_position_callback() {
	$option = get_option( 'sidebar_nav_for_wpbakery_sidebar_position', 'left' );
	?>
	<fieldset id="sidebar-position-option">
		<label class="sfw-inline-item">
			<input type="radio" name="sidebar_nav_for_wpbakery_sidebar_position" value="left"
				<?php checked( 'left', $option, true ); ?> />
			<?php esc_html_e( 'Left', 'sidebar-navigation-for-wpbakery' ); ?>
		</label class="sfw-radio">
		<label class="sfw-inline-item">
			<input type="radio" name="sidebar_nav_for_wpbakery_sidebar_position" value="right"
				<?php checked( 'right', $option, true ); ?> />
			<?php esc_html_e( 'Right', 'sidebar-navigation-for-wpbakery' ); ?>
		</label>
	</fieldset>
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
		plugin_dir_url( __FILE__ ) . '../assets/dist/css/admin.min.css', // CSS file path
		array(), // Dependencies (if any)
		filemtime( plugin_dir_path( __FILE__ ) . '../assets/dist/css/admin.min.css' ), // Version (based on file modification time)
		'all' // Media
	);

	// Enqueue JS file for admin
	wp_enqueue_script(
		'sidebar-for-wpb-admin-tooltip', // Handle
		plugin_dir_url( __FILE__ ) . '../assets/dist/js/admin.min.js', // JS file path
		array( 'jquery' ), // Dependencies (if any)
		filemtime( plugin_dir_path( __FILE__ ) . '../assets/dist/js/admin.min.js' ), // Version (based on file modification time)
		true // Load in footer
	);
}
