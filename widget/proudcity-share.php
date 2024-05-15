<?php

class Proud_Share{

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
			self::$instance = new Proud_Share();
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
			'proud_share', 						// widget_slug
			'Share', 								// Title
			array( __CLASS__, 'create_widget' ),
		);
	}

	/**
	 *
	 */
	public static function create_widget(){
		$html = '';

		$html .= '<div id="proudcity-clean-up" class="rounded-3 proudcity-dashboard-widget row mb-3">';
			$html .= '<div class="col-md-2 text-center"><i class="fa-solid fa-share"></i></div>';
			$html .= '<div class="col-md-10">';
				$html .= '<p>Our primary source of new business is through word of mouth referrals. We appreciate any support you can give us by sharing ProudCity to your network.<i class="fa-solid fa-heart" style="color:#e52207; font-size:14px;"></i></p>';
				$html .= '<a class="btn btn-sm btn-primary text-white" href="#" target="_blank">Share</a>';
			$html .= '</div>';
		$html .= '</div><!-- /#proudcity-training -->';



		echo $html;
	}

}

Proud_Share::instance();
