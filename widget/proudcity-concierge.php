<?php

class Proud_Concierge
{
    private static $instance;

    /**
     * Spins up the instance of the plugin so that we don't get many instances running at once
     *
     * @since 1.0
     * @author SFNdesign, Curtis McHale
     *
     * @uses $instance->init()                      The main get it running function
     */
    public static function instance()
    {

        if (! self::$instance) {
            self::$instance = new Proud_Concierge();
            self::$instance->init();
        }

    } // instance

    /**
     * Spins up all the actions/filters in the plugin to really get the engine running
     *
     * @since 1.0
     * @author SFNdesign, Curtis McHale
     */
    public function init()
    {

        add_action('wp_dashboard_setup', array( $this, 'add_widget' ));

    } // init

    public static function add_widget()
    {
        wp_add_dashboard_widget(
            'proud_concierge', 						// widget_slug
            'Concierge', 								// Title
            array( __CLASS__, 'create_widget' ),
        );
    }

    /**
     *
     */
    public static function create_widget()
    {
        $html = '';

        $html .= '<div id="proudcity-clean-up" class="rounded-3 proudcity-dashboard-widget row mb-3">';
        $html .= '<div class="col-md-2 text-center"><i class="fa-solid fa-bell-concierge"></i></div>';
        $html .= '<div class="col-md-10">';
        $html .= '<p>On-demand one-on-one time with ProudCity</p>';
        $html .= '<a class="btn btn-sm btn-primary text-white" href="https://proudcity.com/concierge" target="_blank">Order Concierge</a>';
        $html .= '</div>';
        $html .= '</div><!-- /#proudcity-training -->';



        echo $html;
    }

}

Proud_Concierge::instance();
