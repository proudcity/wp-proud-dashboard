<?php
/**
 * @author ProudCity
 */

namespace Proud\Dashboard;

// Initialize $_SESSION
if (!session_id()) {
    session_start();
}

class Dashboard extends ProudDashboard {

    public static $pages = [
        'dashboard' => ['title' => 'Dashboard', 'perm' => 'read'],
        'users'     => ['title' => 'Users', 'perm' => 'read'],
        'analytics' => ['title' => 'Analytics', 'perm' => 'read'],
        'addons'    => ['title' => 'Addons', 'perm' => 'read'],
    ];

    function __construct() {
        parent::__construct();

        // Display the admin notification
        //add_action( 'admin_notices', array( $this, 'plugin_activation' ) ) ;

        // Add the dashboard page
        // @todo: enable
        add_action('admin_menu', [$this, 'create_menu']);

        // Save the auth0 token to $wp_session
        add_action('auth0_user_login', [$this, 'auth0_user_login'], 0, 5);
        //add_action('init', array($this, 'myStartSession'), 1);
        add_action('wp_logout', [$this, 'endSession']);
        //add_action('wp_login', array($this, 'myEndSession') );

    }


    public function endSession() {
        setcookie("proud_dashboard_token", "", time() - 3600);
        session_destroy();
    }


    /**
     * Saves the version of the plugin to the database and displays an
     * activation notice on where users can connect to the ProudCity API.
     */
    public function auth0_user_login($user_id, $user_profile, $is_new, $id_token, $access_token) {

        $data = [
            'access_token' => $access_token,
            'id_token'     => $id_token,
            'user_profile' => $user_profile,
            'is_new'       => $is_new,
            'user_id'      => $user_id,
            'get'          => $_GET,
        ];

        //print_r($data);
        //die();

        setcookie("proud_dashboard_token", json_encode($data), time() + 3600 * 24 * 14); // @todo: set time

    }



    /**
     * Saves the version of the plugin to the database and displays an
     * activation notice on where users can connect to the ProudCity API.
     */
    /*public function plugin_activation() {

      $data = $_COOKIE['proud_dashboard_token'];

      $options = get_option( 'proud_dashboard_options', array() );

      // Check that ProudCity has been enabled
      if( empty($options['refresh_token']) ) {

        $html = '<div class="updated">';
          $html .= '<p>';
            $html .= __( '<a href="admin.php?page=proud_dashboard">Connect to ProudCity</a> to finish your setup and begin monitoring your site.', $this->key );
          $html .= '</p>';
        $html .= '</div><!-- /.updated -->';

        echo $html;

      } // end if

      // check that cURL exists
      if( !function_exists('curl_version') ) {

        $html = '<div class="update-nag">';
          $html .= __( 'It looks like cURL is currently not enabled.  The ProudCity plugin will not work without cURL enabled. <a href="http://www.tomjepson.co.uk/enabling-curl-in-php-php-ini-wamp-xamp-ubuntu/" target="_blank">Tutorial to enable cURL in PHP</a>.', $this->key );
        $html .= '</div><!-- /.update-nag -->';

        echo $html;

      } // end if

    } // end plugin_activation*/


    /**
     * Deletes the option from the database.
     */
    public static function plugin_deactivation() {

        //delete_option( 'proud_dashboard_options' );
        //delete_option( 'proud_dashboard_token' );

    } // end plugin_deactivation


    /**
     * Creates the wp-admin menu entries for the dashboard.
     */
    public function create_menu() {

        foreach (self::$pages as $key => $item) {
            add_menu_page(
                __($item['title'], $this->key),
                __($item['title'], $this->key),
                $item['perm'],
                'proud_' . $key,
                [$this, 'dashboard_page'],
                plugins_url('/../images/icon.png', __FILE__)
            );
        }


    } // end create_menu


    /**
     * Display the ProudCity dashboard.
     */
    public function dashboard_page($key) {
        //$options = get_option( 'proud_dashboard_options', array() );
        //$logo = plugins_url('/../images/logo.png', __FILE__);
        global $proudcore;
        $route = str_replace('proud_', '', $_GET['page']);

        $cookie = $_COOKIE['proud_dashboard_token'];
        $cookie = stripslashes($cookie);
        $token = json_decode($cookie, true);

        //$token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Byb3VkY2l0eS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NTZhMjk2YjM4ZDg2MGNmOTNjNDAzYTAzIiwiYXVkIjoiT2wzZERaSTJoZXhSTEZHY2xLUk9LQ1E4RHpFUnFjT1kiLCJleHAiOjE0OTQ2MTAzMjAsImlhdCI6MTQ5NDU3NDMyMH0.1Fp4V40jAdSRFhbqgKxKKU8XVcnAOk4jpEup7s9PO14';
        $siteId = APP && APP != 'APP' ? APP : getenv('APP');
        $path = \Proud\Dashboard\Dashboard::get_app_path();

        // Enqueue angular + the app
        $v = 0.03;
        wp_enqueue_script('proud-dashboard-app-vendor', $path . '/js/angular.min.js?' . $v);
        wp_enqueue_script('proud-dashboard-app-libraries', $path . '/js/libraries.min.js?' . $v);
        wp_enqueue_script('proud-dashboard-app', $path . '/js/app.min.js', ['proud-dashboard-app-vendor']);
        wp_enqueue_script('proud-dashboard-app-templates', $path . '/views/app.templates.js', ['proud-dashboard-app'], FALSE, TRUE);
        wp_enqueue_style('proud-dashboard-app-styles', $path . '/css/app.min.css');

        // Save some JS variables (available at proud_dashboard.siteId, etc)
        $proudcore->addJsSettings([
            'proud_dashboard' => [
                'global' => [
                    'proudcity_site_id' => $siteId,  // done in wp-proud-code
                    'token'              => $token['id_token'],
                    //'proudcity_api' => PROUDCITY_API,  // done in wp-proud-code
                    'proudcity_city_api' => CITY_API_URL,
                    'default_route'      => $route,
                ],
            ],
        ]);

        require_once plugin_dir_path(__FILE__) . '../templates/proud-dashboard.php';

    }

}

new Dashboard;
