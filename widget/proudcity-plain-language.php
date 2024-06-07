<?php

class Proud_Plain_Language{

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
			self::$instance = new Proud_Plain_Language();
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
			'proud_plain_language', 						// widget_slug
			'Plain language training', 								// Title
			array( __CLASS__, 'create_widget' ),
		);
	}

	/**
	 *
	 */
	public static function create_widget(){
		$html = '';

		$html .= '<div id="proudcity-plain-language" class="rounded-3 proudcity-dashboard-widget row mb-3">';
			$html .= '<div class="col-md-2 text-center"><i class="fa-solid fa-square-pen"></i></div>';
			$html .= '<div class="col-md-10">';
				$html .= '<p>Write better government website content.</p>';
				$html .= '<a class="btn btn-sm btn-primary text-white" href="https://proudcity.com/plain-language" target="_blank">Plain language training</a>';
			$html .= '</div>';
		$html .= '</div><!-- /#proudcity-training -->';



		echo $html;
	}

}

Proud_Plain_Language::instance();
