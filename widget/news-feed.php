<?php

class Proud_News_Feed{

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
			self::$instance = new Proud_News_Feed();
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

		add_action( 'wp_dashboard_setup', array( $this, 'add_news_widget' ) );

	} // init

	public static function add_news_widget(){
		wp_add_dashboard_widget(
			'proud_news_feed', 						// widget_slug
			'News', 								// Title
			array( __CLASS__, 'news_widget' ),
		);
	}

	/**
	 * Gets our RSS feed and parses it into content for the widget
	 *
	 * @since 2024.05.15
	 * @author Curtis
	 * @access public
	 *
	 * RSS parsing from: https://digwp.com/2009/11/import-and-display-feeds-in-wordpress/
	 *
	 * @uses 	fetch_feed() 						Fetches RSS feed content
	 * @uses 	set_cache_duration() 				Sets the duration of the feed cache
	 * @uses	get_item_quantity() 				specifies the number of RSS items we want
	 * @uses 	get_items() 						gets the items in the feed
	 */
	public static function news_widget(){
// https://proudcity.com/wp-json/wp/v2/posts?categories=235&per_page=1
//
		$feed = fetch_feed( 'http://proudcity.com/category/proudcity-news' );
		$feed->set_cache_duration(43200); // cached for 12 hours
		$limit = $feed->get_item_quantity(1); // the number of items in the feed
		$items = $feed->get_items(0, $limit); // turn it into an array

		$html = '';

		$html .= '<div id="proudcity-fyi" class="alert alert-soft-primary rounded-3" role="alert">';

			if ( $limit = 0 ){
				echo 'the feed is not available or empty';
			} else {

				foreach( $items as $item ){
					$html .= '<h3><a href="'. esc_url( $item->get_permalink() ). '" title="'. esc_html( $item->get_title() ) .'">';
						$html .= esc_html( $item->get_title() );
					$html .= '</a></h3>';
					$html .= $item->get_description();
				} // foreach

			} // if limit

		$html .= '</div><!-- /#proudcity-fyi -->';



		echo $html;
	}

}

Proud_News_Feed::instance();
