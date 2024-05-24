<?php

class Proud_Widget_Accounts{

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
			self::$instance = new Proud_Widget_Accounts();
			self::$instance->init();
		}

	} // instance

	/**
	 * Spins up all the actions/filters in the plugin to really get the engine running
	 *
	 * @since 1.0
	 * @author SFNdesign, Curtis McHale
	 */
	public function init(){

		add_action( 'wp_dashboard_setup', array( $this, 'add_widget' ) );

	} // init

	public static function add_widget(){
		wp_add_dashboard_widget(
			'proud_accounts_widget', 						// widget_slug
			'Users', 								// Title
			array( __CLASS__, 'create_widget' ),
		);
	}

	/**
	 *
	 */
	public static function create_widget(){
		$html = '';

		$html .= '<div id="proudcity-accounts" class="rounded-3 proudcity-dashboard-widget row mb-3">';
			$html .= '<div class="col-md-2 text-center"><i class="fa-solid fa-users"></i></div>';
			$html .= '<div class="col-md-10">';
				$html .= '<p>Manage accounts and permissions</p>';
				$html .= '<a class="btn btn-sm btn-primary text-white" href="https://my.proudcity.com" target="_blank">Accounts</a>';
			$html .= '</div>';
		$html .= '</div><!-- /#proudcity-accounts -->';



		echo $html;
	}

}

Proud_Widget_Accounts::instance();
