<?php

class Proud_Widget_Payments{

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
			self::$instance = new Proud_Widget_Payments();
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
			'proud_payments_widget', 						// widget_slug
			'Payments', 								// Title
			array( __CLASS__, 'create_widget' ),
		);
	}

	/**
	 *
	 */
	public static function create_widget(){
		$html = '';

		$html .= '<div id="proudcity-payments" class="rounded-3 proudcity-dashboard-widget row mb-3">';
			$html .= '<div class="col-md-2 text-center"><i class="fa-solid fa-money-check-dollar"></i></div>';
			$html .= '<div class="col-md-10">';
				$html .= '<p>Manage settings, payments, payouts.</p>';
				$html .= '<a class="btn btn-sm btn-primary text-white" href="https://my.proudcity.com" target="_blank">Payments</a>';
			$html .= '</div>';
		$html .= '</div><!-- /#proudcity-payments -->';



		echo $html;
	}

}

Proud_Widget_Payments::instance();