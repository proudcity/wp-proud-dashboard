<?php
/**
 * @author ProudCity
 */

namespace Proud\Dashboard;

// Initialize $_SESSION
if(!session_id()) {
    session_start();
}

class Dashboard extends ProudDashboard {


  function __construct() {
    parent::__construct();

    // Display the admin notification
    //add_action( 'admin_notices', array( $this, 'plugin_activation' ) ) ;

    // Add the dashboard page
    add_action( 'admin_menu', array($this, 'create_menu') );\
    
    // Save the auth0 token to $wp_session
    add_action( 'auth0_user_login', array($this, 'auth0_user_login'), 0, 5 );
    //add_action('init', array($this, 'myStartSession'), 1);
    add_action( 'wp_logout', array($this, 'endSession' ) );
    //add_action('wp_login', array($this, 'myEndSession') );

  }


  public function endSession() {
    setcookie("proud_dashboard_token", "", time() - 3600);
    session_destroy ();
  }



  


  /**
   * Saves the version of the plugin to the database and displays an activation notice on where users
   * can connect to the ProudCity API.
   */
  public function auth0_user_login($user_id, $user_profile, $is_new, $id_token, $access_token) {

    $data = array(
      'access_token' => $access_token,
      'id_token' => $id_token,
      'user_profile' => $user_profile,
    );

    setcookie("proud_dashboard_token", $id_token, time() + 3600*24*14); // @todo: set time

  }



  /**
   * Saves the version of the plugin to the database and displays an activation notice on where users
   * can connect to the ProudCity API.
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

    delete_option( 'proud_dashboard_options' );
    delete_option( 'proud_dashboard_token' );

  } // end plugin_deactivation


  /**
   * Creates the wp-admin menu entries for the dashboard.
   */
  public function create_menu() {

    add_menu_page(
      __( 'Dashboard', $this->key ), 
      __( 'Dashboard', $this->key ), 
      'read',
      'proud_dashboard',
      array($this, 'dashboard_page'), 
      plugins_url('/../images/icon.png', __FILE__) 
    );

  } // end create_menu


  /**
   * Display the ProudCity dashboard.
   */
  public function dashboard_page() {
    $options = get_option( 'proud_dashboard_options', array() );
    $path = plugins_url('../includes/js/',__FILE__);
    $logo = plugins_url('/../images/logo.png', __FILE__);

    $token = $_COOKIE['proud_dashboard_token'];

    // @todo: Not sure why this isn't coming in from Auth0 properly...
    $token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Byb3VkY2l0eS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NTZhMjk0OGMzZWEyMTBlMDBhYjMxZGM2IiwiYXVkIjoiTEp5TVJDVW9aR2RrTlJaaHgzYkNYbnNxbEdadTVTMlIiLCJleHAiOjE0Nzc2MDcwOTIsImlhdCI6MTQ3NjM5NzQ5Mn0.Vsw90H5R0rgbciK3dERnsRWVF87VvAGnUV5Hu00I_bA';

    // @todo
    $sideId = '575fa1a3990c5da317b40102';

    // Enqueue Bootstrap 

    // First time using app, need to set everything up
    /*if( empty($options['refresh_token']) ) {

      // Call ProudCity /initialize to set the allowed CORS endpoint
      // @todo: error handling: redirect user to ProudCity API dedicated login page
      if (empty($options['siteId'])) {
        $data = array(
          'url' => get_site_url(),
        );
        $response = $this->api( '/initialize', 'POST', $data, true );
        $options['siteId'] = $response['_id'];
        update_option( 'proud_dashboard_options', $options );
      }

      // Save some JS variables (available at proud_dashboard.siteId, etc)
      wp_enqueue_script( 'proud-dashboard-connect', $path . 'proud-dashboard-connect.js' );
      wp_localize_script( 'proud-dashboard-connect', 'proud_dashboard_connect', array( 
        'nonce' => wp_create_nonce( $this->key ),
        'auth0' => $this->auth0,
        'siteId' => $options['siteId']
      ) );

      require_once plugin_dir_path(__FILE__) . '../templates/proud-dashboard-connect.php';
    
    }*/

    // Show me the dashboard!
    //else {

      // Enqueue react
      wp_enqueue_script( 'proud-dashboard-app-vendor', $path . 'client/dist/vendor.dist.js' );
      wp_enqueue_script( 'proud-dashboard-app', $path . 'client/dist/app.dist.js', array('proud-dashboard-app-vendor') );
      // Save some JS variables (available at proud_dashboard.siteId, etc)
      wp_localize_script( 'proud-dashboard-app', 'proud_dashboard', array( 
        'siteId' => $sideId, 
        'token' => $token,
      ) );
      wp_enqueue_style ( 'proud-dashboard-app', $path . 'client/dist/app.dist.css' );

      require_once plugin_dir_path(__FILE__) . '../templates/proud-dashboard.php';

    //} // if()

  }

}
new Dashboard;
