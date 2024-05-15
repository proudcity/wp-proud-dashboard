<?php
/*
Plugin Name:        Proud Dashboard
Plugin URI:         https://github.com/proudcity/wp-proud-dashboard
Description:        Multisite and other dashboard enhancements
Version:            4.2024.05.15.1445
Author:             ProudCity
Author URI:         http://proudcity.com
License:            Affero GPL v3
*/


class Proud_Dashboard{

	private static $instance;

	/**
	 * Spins up the instance of the plugin so that we don't get many instances running at once
	 *
	 * @since 1.0
	 * @author SFNdesign, Curtis McHale
	 *
	 * @uses $instance->init()                      The main get it running function
	 */
	public static function instance(){

		if ( ! self::$instance ){
			self::$instance = new Proud_Dashboard();
			self::$instance->init();
		}

	} // instance

	/**
	 * Spins up all the actions/filters in the plugin to really get the engine running
	 *
	 * @since 1.0
	 * @author SFNdesign, Curtis McHale
	 *
	 * @uses $this->constants()                 Defines our constants
	 * @uses $this->includes()                  Gets any includes we have
	 */
	public function init(){

		$this->constants();
		$this->includes();

		add_action( 'wp_dashboard_setup', array( $this, 'remove_dashboard_widgets' ) );
		add_filter( 'wp_proud_phoenix_allowed_slugs', array( $this, 'allow_new_theme_styles' ), 1 );

		// Register hooks that are fired when the plugin is activated, deactivated, and uninstalled, respectively.
		register_activation_hook( __FILE__, array( $this, 'activate' ) );
		register_deactivation_hook( __FILE__, array( $this, 'deactivate' ) );
		register_uninstall_hook( __FILE__, array( __CLASS__, 'uninstall' ) );

	} // init

	/**
	 * Removes the metaboxes on the WP dashboard that we don't want
	 *
	 * @since 2024.05.088
	 * @author Curtis
	 * @access public
	 *
	 * @uses 	remove_meta_box() 						Removes the designated metabox
	 */ 
	public static function remove_dashboard_widgets(){

		global $wp_meta_boxes;

		remove_meta_box( 'dashboard_incoming_links', 'dashboard', 'normal' );
		remove_meta_box( 'dashboard_plugins', 'dashboard', 'normal' );
		remove_meta_box( 'dashboard_primary', 'dashboard', 'side' );
		remove_meta_box( 'dashboard_secondary', 'dashboard', 'normal' );
		remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
		remove_meta_box( 'dashboard_recent_drafts', 'dashboard', 'side' );
		remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' );
		remove_meta_box( 'dashboard_right_now', 'dashboard', 'normal' );
		remove_meta_box( 'dashboard_activity', 'dashboard', 'normal');//since 3.8
		remove_meta_box( 'wpseo-dashboard-overview', 'dashboard', 'normal' );
		remove_meta_box( 'rg_forms_dashboard', 'dashboard', 'normal' ); //gravityforms
		remove_meta_box( 'auth0_dashboard_widget_age', 'dashboard', 'normal' );
		remove_meta_box( 'auth0_dashboard_widget_gender', 'dashboard', 'normal' );
		remove_meta_box( 'auth0_dashboard_widget_income', 'dashboard', 'normal' );
		remove_meta_box( 'auth0_dashboard_widget_signups', 'dashboard', 'normal' );
		remove_meta_box( 'auth0_dashboard_widget_Location', 'dashboard', 'normal' );
		remove_meta_box( 'auth0_dashboard_widget_idp', 'dashboard', 'normal' );
		remove_meta_box( 'dashboard_rediscache', 'dashboard', 'normal' );
		remove_meta_box( 'so-dashboard-news', 'dashboard', 'normal' );
		remove_meta_box( 'wp_mail_smtp_reports_widget_lite', 'dashboard', 'normal' );
		remove_meta_box( 'dashboard_site_health', 'dashboard', 'normal' );
		remove_meta_box( 'em_booking_stats', 'dashboard', 'normal' );
		remove_meta_box( 'blc_dashboard_widget', 'dashboard', 'normal' );
		remove_meta_box( 'wpseo-wincher-dashboard-overview', 'dashboard', 'normal' );

/*
		echo '<pre>';
		print_r( $wp_meta_boxes );
		echo '</pre>';
*/
	}

	/**
	 * Hooks in with the Pheonix theme found in the PC Analytics plugin so that we have
	 * the styles from that theme available on this page as well
	 *
	 * @since 2024.05.08
	 * @author Curtis
	 * @access public
	 *
	 * @param 	array 		$page_slug 				required 				Array of page slugs in the WP admin that our styles should be shown on
	 */
	public static function allow_new_theme_styles( $page_slug ){
		return $page_slug[] = 'dashboard';
	}

	/**
	 * Gives us any constants we need in the plugin
	 *
	 * @since 1.0
	 */
	public function constants(){

		define( 'PROUD_DASHBOARD_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

	}

	/**
	 * Includes any externals
	 *
	 * @since 1.0
	 * @author SFNdesign, Curtis McHale
	 * @access public
	 */
	public function includes(){
		require_once( PROUD_DASHBOARD_PLUGIN_DIR . '/widget/news-feed.php' );
		require_once( PROUD_DASHBOARD_PLUGIN_DIR . '/widget/proudcity-training.php' );
		require_once( PROUD_DASHBOARD_PLUGIN_DIR . '/widget/proudcity-plain-language.php' );
		require_once( PROUD_DASHBOARD_PLUGIN_DIR . '/widget/proudcity-clean-up.php' );
		require_once( PROUD_DASHBOARD_PLUGIN_DIR . '/widget/proudcity-review.php' );
		require_once( PROUD_DASHBOARD_PLUGIN_DIR . '/widget/proudcity-help-center.php' );
		require_once( PROUD_DASHBOARD_PLUGIN_DIR . '/widget/proudcity-support.php' );
		require_once( PROUD_DASHBOARD_PLUGIN_DIR . '/widget/proudcity-share.php' );
	}

	/**
	 * Fired when plugin is activated
	 *
	 * @param   bool    $network_wide   TRUE if WPMU 'super admin' uses Network Activate option
	 */
	public function activate( $network_wide ){

	} // activate

	/**
	 * Fired when plugin is deactivated
	 *
	 * @param   bool    $network_wide   TRUE if WPMU 'super admin' uses Network Activate option
	 */
	public function deactivate( $network_wide ){

	} // deactivate

	/**
	 * Fired when plugin is uninstalled
	 *
	 * @param   bool    $network_wide   TRUE if WPMU 'super admin' uses Network Activate option
	 */
	public function uninstall( $network_wide ){

	} // uninstall

} // Proud_Dashboard

Proud_Dashboard::instance();
