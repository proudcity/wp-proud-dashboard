<?php
/*
Plugin Name:        Proud Dashboard
Plugin URI:         https://github.com/proudcity/wp-proud-dashboard
Description:        Multisite and other dashboard enhancements
Version:            1.0.0
Author:             ProudCity
Author URI:         http://proudcity.com
License:            Affero GPL v3
*/

namespace Proud\Dashboard;

define('PROUDCITY_DASHBOARD_COOKIE_LIFETIME', 86400); // 1 day = 3600 * 24, this should match Auth0


//require_once plugin_dir_path(__FILE__) . 'lib/dashboard-agent.class.php';
require_once plugin_dir_path(__FILE__) . 'lib/dashboard.class.php';

// Set the version of this plugin
//if( ! defined( 'GOVREADY_VERSION' ) ) {
//define( 'PROUDCITY_API', 'https://rest.proudcity.com/v1' ); // in wp-proud-core
define('PROUDCITY_DASHBOARD_URL', '//my.proudcity.com');
define('CITY_API_URL', 'https://city-api.proudcity.com/v1');
$distro = getenv('PROUDCITY_DISTRO');
define('PROUDCITY_DISTRO', !empty($distro ? $distro : 'proudcity'));
//define( 'PROUDCITY_APP', getenv('PROUDCITY_APP')); // in wp-proud-core
//} // end if

if (defined('WP_CLI') && WP_CLI) {
    include __DIR__ . '/cli/wp-proud-dashboard-cli.php';
}

class ProudDashboard {

    public function __construct() {
        $this->key = 'proud_dashboard';
        // @todo: get this from an API call?
        $this->auth0 = [
            'domain'    => 'proud_dashboard.auth0.com',
            'client_id' => 'HbYZO5QXKfgNshjKlhZGizskiaJH9kGH',
        ];
        $this->commercial = FALSE; // Is this the commercial or open source version?
        $this->proud_dashboard_url = PROUDCITY_API;
        //$this->proud_dashboard_url = 'http://localhost:4000/v1.0'; // NOTE: Docker can't see this!
        //$this->api_debug = true;

        // Load plugin textdomain
        //add_action( 'init', array( $this, 'plugin_textdomain' ) );

        // Add the AJAX proxy endpoints
        add_action('wp_ajax_proud_dashboard_refresh_token', [
            $this,
            'api_refresh_token',
        ]);
        add_action('wp_ajax_proud_dashboard_proxy', [$this, 'api_proxy']);
        add_action('wp_ajax_nopriv_proud_dashboard_proxy', [
            $this,
            'api_proxy',
        ]);  // @todo: this is temp! only for testing!!!
    }


    /**
     *  Get path to app based on `wp_proud_service_center_path` option.
     */
    public static function get_app_path() {
        $local_path = plugins_url('includes/js', __FILE__);
        $path = get_option('wp_proud_dashboard_path', FALSE);
        if ($path == 'local') {
            return $local_path . '/client/dist';
        }
        else {
            return $path ? $path : PROUDCITY_DASHBOARD_URL;
        }
    }








    /**
     * Defines the plugin textdomain.
     */
    /*public function plugin_textdomain() {

      $locale = apply_filters( $this->key, get_locale(), $domain );

      load_textdomain( $domain, WP_LANG_DIR . '/' . $domain . '/' . $domain . '-' . $locale . '.mo' );
      load_plugin_textdomain( $domain, FALSE, dirname( plugin_basename( __FILE__ ) ) . '/lang/' );

    }*/ // end plugin_textdomain

    /**
     * Make a request to the GovReady API.
     *
     * @todo: error handling
     */
    /*
    public function api($endpoint, $method = 'GET', $data = [], $anonymous = FALSE) {

        $url = $this->proud_dashboard_url . $endpoint;

        // Make sure our token is a-ok
        $token = get_option('proud_dashboard_token', []);

        if (!$anonymous && (empty($token['id_token']) || empty($token['endoflife']) || $token['endoflife'] < time())) {
            $token = $this->api_refresh_token(TRUE);
        }
        $token = !$anonymous && !empty($token['id_token']) ? $token['id_token'] : FALSE;

        // Make the API request with cURL
        // @todo should we support HTTP_request (https://pear.php.net/manual/en/package.http.http-request.intro.php)?
        $headers = ['Content-Type: application/json'];
        if ($token) {
            array_push($headers, 'Authorization: Bearer ' . $token);
        }
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
        if ($data) {
            curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
        }
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        $response = curl_exec($curl);
        curl_close($curl);

        // Only for debugging
        if (!empty($this->api_debug) && $this->api_debug) {
            print_r($url);
            print_r($data);
            print_r($response);
        }

        $response = json_decode($response, TRUE);

        return $response;

    }*/


    /**
     * Refresh the access token.
     */
    /*
    public function api_refresh_token($return = FALSE) {

        // @todo: nonce this call
        $options = get_option('proud_dashboard_options');
        if (!empty($_REQUEST['refresh_token'])) {
            // Validate the nonce
            if (check_ajax_referer($this->key, '_ajax_nonce')) {
                //return;
            }
            $token = $_REQUEST['refresh_token'];
            $options['refresh_token'] = $token;
            update_option('proud_dashboard_options', $options);
        }
        else {
            $token = !empty($options['refresh_token']) ? $options['refresh_token'] : '';
        }

        $response = $this->api('/refresh-token', 'POST', ['refresh_token' => $token], TRUE);
        $response['endoflife'] = time() + (int) $response['expires_in'];
        update_option('proud_dashboard_token', $response);

        if ($return) {
            return $response;
        }
        else {
            wp_send_json($response);
        }

    }*/


    /**
     * Call the GovReady API.
     */
    /*
    public function api_proxy() {

        $method = !empty($_REQUEST['method']) ? $_REQUEST['method'] : $_SERVER['REQUEST_METHOD'];
        $response = $this->api($_REQUEST['endpoint'], $method, $_REQUEST);
        wp_send_json($response);
        wp_die();

    }*/


} // end class