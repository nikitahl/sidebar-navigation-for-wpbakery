=== Sidebar for WPBakery Page Builder ===

Contributors: nikitahl, mrdollar4444
Tags: wpbakery, wpbakery-extension, wpbakery-extensions, wpbakery-page-builder
Requires at least: 6.4
Tested up to: 7.1
Stable tag: 2.6.0
Requires PHP: 7.0
License: GPLv3 or later
License URI: http://www.gnu.org/licenses/gpl-3.0.html

A collection of interface enhancements and productivity features for a smoother, more efficient WPBakery editing experience.

== Description ==

Make WPBakery Page Builder work the way you want.

This plugin gives you greater control over the editing environment with a customizable sidebar, improved navigation, page structure access, and a range of interface enhancements.

Reorganize your workspace, adjust panel layouts, enable compact views, and customize editor styling to create an interface that better fits your workflow.

Designed to improve both usability and flexibility, the plugin helps reduce unnecessary clutter and makes essential editing tools easier to access.

Get a more streamlined and personalized WPBakery experience without changing the way you build pages.

== Features ==

* Persistent sidebar navigation bar for quick access to WPBakery panels
* Panels displayed as a sidebar for easy access to settings and tools
* Resizable sidebar width for a personalized layout
* Dismissible notifications for a distraction-free interface
* Scroll directly to selected elements in the Edit Form panel
* Add a first found element on Enter
* Customized Backend Editor view (Requires WPBakery v9.0+)
* Customizable settings page to adjust sidebar appearance and behavior:
  * Toggle sidebar in the Frontend Editor.
  * Toggle custom styling in the Backend Editor.
  * Hide element descriptions in the Add Element panel
  * Reduce spacing between elements for a compact view
  * Optimize field size and spacing in the Edit Form/Settings panel
  * Choose whether the page view area shrinks when the sidebar is open
  * Option to position the sidebar on the right side
  * Page Structure panel for a clear overview of your page layout
  * Option to set theme for the Frontend editor interface (light/dark)

== Requirements ==

* WPBakery Page Builder 8.0 or later
* PHP 7.0 or later
* WordPress 6.4 or later

== Contribute ==

This plugin is open-source! You can contribute, report issues, or suggest improvements on GitHub:
[GitHub Repository](https://github.com/nikitahl/sidebar-navigation-for-wpbakery)

== Installation ==

1. Upload the plugin folder to your /wp-content/plugins/ folder.
2. Go to the **Plugins** page and activate the plugin.

== Screenshots ==

1. Enhanced Sidebar UI
2. Editor Navigation Bar
3. Edit Form Panel
4. Page Structure Panel
5. Sidebar on the Right
6. Dark mode
7. Plugin Settings Page
8. Customized Backend Editor

== Frequently Asked Questions ==

= How do I activate the sidebar? =

Simply activate the plugin and edit any post/page using WPBakery Page Builder’s Frontend Editor.

= Where does the sidebar appear? =

By default, the sidebar appears on the left side of the WPBakery Page Builder interface. You can change it to the right in the settings.

= Can I customize the sidebar? =

Yes! The settings page allows you to tweak sidebar positioning, spacing, and visibility preferences.

= Where do I find the plugin settings? =

Navigate to **Settings > Sidebar for WPBakery Page Builder** in your WordPress dashboard.

= How do I disable the sidebar? =

Deactivate the plugin via the WordPress **Plugins** page.

== Changelog ==

= 2.6.0 =

* New: Added an option to enable or disable the sidebar in the Frontend Editor.
* New: Added an option to enable or disable custom styling in the Backend Editor.
* Improvement: Improved the settings page with toggle switches for a more intuitive experience.
* Fix: Fixed a DOM-based XSS issue in the Page Structure panel caused by unescaped element names and row titles.

= 2.5.1 =
* Fix: Fixed the issue with the adding of the first/selected element on Enter key press in the Add Element panel.

= 2.5 =
* Fix: Fixed issue with sidebar styles not applying correctly after 9.0 update of WPBakery Page Builder.
* Update: Update dark theme styles for the Frontend editor interface.
* Update: Added ability to add first/selected element on Enter key press in the Add Element panel.

= 2.4 =
* Update: Added option to set theme for the Frontend editor interface (light/dark).

= 2.3.1 =
* Fix: Fixed issue with the sidebar opening on edit control hover.
* Fix: Fixed issue with the opened sidebar panel and iframe resize on page load.
* Fix: Fixed Grid container appearance in the Page Structure panel.
* Fix: Fixed Flexbox container appearance in the Page Structure panel.
* Fix: Fixed issue with sidebar structure item expand state.
* Fix: Fixed issue with panel resize on smaller screen widths.

= 2.3 =
* Update: Added the ability to close notification messages.
* Update: Added button in Edit Form to scroll to element.

= 2.2.1 =
* Fix: Updated Custom CSS/JS icon position.
* Fix: Updated navbar collapse point on vertical resize.
* Fix: Fixed issue with panels size for mobile view on window resize.

= 2.2 =
* Update: Added the ability to resize the sidebar width in the editor.

= 2.1 =
* Update: Added the ability to reduce fields size and spacing in the Edit Form/Settings panel for a more compact view.
* Update: Added Page Structure panel to the sidebar, to view the page's structure.
* Update: Added option to set sidebar position to the right.
* Fix: Fixed an issue with navbar icons when resizing the screen vertically.

= 2.0 =
* Update: Added the ability to hide the description under elements in the Add Element panel.
* Update: Added the ability to reduces spacing between elements in the Add Element panel for a more compact view.
* Update: Added the option to make the page view area shrink or stay the same width when the sidebar is opened.
* Fix: Fixed the issue with template preview in the Templates panel

= 1.1 =
* Update: Added active state for the icons in the navigation bar.
* Fix: Fixed the issue with editable area view when Page Settings panel being initially opened.

= 1.0 =
* Plugin released.

