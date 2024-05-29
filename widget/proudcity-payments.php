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
			'ProudCity Payments', 								// Title
			array( __CLASS__, 'create_widget' ),
		);
	}

	/**
	 *
	 */
	public static function create_widget(){

		/**
		 * Sends the user to the proper account URL for their site or to a default if we're local
		 */
		if ( 'local' == wp_get_environment_type() ){
			$site = 'wwwproudcity';
		} else {
			$site = getenv( 'WORDPRESS_DB_NAME' );
		}

		if ( ! empty( getenv( 'PROUDCITY_PAYMENTS_SECRET' ) ) ){
			$url = '/payments/overview';
		} else {
			$url = '/payments/about';
		}

		$html = '';

		$html .= '<div id="proudcity-payments" class="rounded-3 proudcity-dashboard-widget row mb-3">';
			$html .= '<div class="col-md-2 text-center"><i class="fa-solid fa-money-check-dollar"></i></div>';
			$html .= '<div class="col-md-10">';
				$html .= '<p>Manage payments and reports.</p>';
				$html .= '<a class="btn btn-sm btn-primary text-white" href="https://my.proudcity.com/sites/'. esc_attr( $site ) . esc_attr( $url ) .'" target="_blank">Payments</a>';
			$html .= '</div>';
		$html .= '</div><!-- /#proudcity-payments -->';



		echo $html;
	}

}

Proud_Widget_Payments::instance();
