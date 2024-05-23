<?php

class Proud_Training{

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
			self::$instance = new Proud_Training();
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

		add_action( 'wp_dashboard_setup', array( $this, 'add_training_widget' ) );

	} // init

	public static function add_training_widget(){
		wp_add_dashboard_widget(
			'proud_training', 						// widget_slug
			'ProudCity training', 								// Title
			array( __CLASS__, 'training_widget' ),
		);
	}

	/**
	 *
	 */
	public static function training_widget(){
		$html = '';

		$html .= '<div id="proudcity-training" class="rounded-3 proudcity-dashboard-widget row mb-3">';
			$html .= '<div class="col-md-2 text-center"><i class="fa-solid fa-chalkboard"></i></div>';
			$html .= '<div class="col-md-10">';
				$html .= '<p>New user and refresher classes</p>';
				$html .= '<a class="btn btn-sm btn-primary text-white" href="https://proudcity.com/academy">ProudCity Training</a>';
			$html .= '</div>';
		$html .= '</div><!-- /#proudcity-training -->';



		echo $html;
	}

}

Proud_Training::instance();
