<?php
/*
Plugin Name:        Proud Dashboard
Plugin URI:         https://github.com/proudcity/wp-proud-dashboard
Description:        Multisite and other dashboard enhancements
Version:            PCD4.2024.05.08.1100
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

		// Register hooks that are fired when the plugin is activated, deactivated, and uninstalled, respectively.
		register_activation_hook( __FILE__, array( $this, 'activate' ) );
		register_deactivation_hook( __FILE__, array( $this, 'deactivate' ) );
		register_uninstall_hook( __FILE__, array( __CLASS__, 'uninstall' ) );

	} // init

	public static function remove_dashboard_widgets(){
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
