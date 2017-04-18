<?php
/**
 * Implements ProudPack Phone Home command.
 */


// This global variable is unfortunately needed to track the caption
$current_image = null;

class ProudcityDashboardCommand extends WP_CLI_Command
{

    /**
     * Calls back to ProudCity API to get initial config settings
     *
     * ## OPTIONS
     *
     * ## EXAMPLES
     *
     *     wp proudcity phonehome "CA/Oakland"
     *
     * @synopsis
     */
    function phonehome($args, $assoc_args)
    {
        $location = str_replace('"', '', $args[0]);
        $request = wp_remote_get(CITY_API_URL . '/city/' . $location . '/service-center');
        $data = json_decode(wp_remote_retrieve_body($request));
        $city = $data->global->location->city;

        // Set options
        update_option('blogname', $city);
        update_option('lat', $data->global->location->lat);
        update_option('lng', $data->global->location->lng);
        update_option('city', $city);
        update_option('state', $data->global->location->state); // @todo: stateFull
        WP_CLI::success('Updated City, lat, lng state, site name to: ' . $city . ', ' . $data->global->location->state);

        // Pre-populate service center
        $services = array();
        foreach ($data->proud_actions_app->global->services as $service) {
            array_push($services, (array)$service);
        }
        update_option('services_local', $services);
        print_r($services);
        WP_CLI::success('Pre-populated service center settings');


        // Upload images
        require_once(ABSPATH . 'wp-admin/includes/media.php');
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/image.php');

        $request = wp_remote_get(CITY_API_URL . '/city/' . $location . '/images');
        $images = json_decode(wp_remote_retrieve_body($request));

        // Updates the caption, sets the homepage image,
        function pc_new_attachment($att_id)
        {
            // Update the caption.
            global $current_image;
            $att = get_post($att_id);
            $id = wp_update_post(array(
                'ID' => $att_id,
                //'post_content' => '',
                'post_excerpt' => $current_image->attribution,
            ));
            // Set as the homepage image.
            $homepage = get_option('page_on_front');
            set_post_thumbnail($homepage, $att_id);
        }

        global $current_image;
        if ($images) {
            foreach (array_reverse($images) as $image) {
                // We need to get the url we are redirected to by Google places
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $image->url);
                curl_setopt($ch, CURLOPT_HEADER, true);
                curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Must be set to true so that PHP follows any "Location:" header
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                $a = curl_exec($ch); // $a will contain all headers
                $image->url = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL); // This is what you need, it will return you the last effective URL

                // Now save the image. We temporarily add the `pc_new_attachment` filter to update the caption and set the attachment as the homepage featured image.
                $current_image = $image;
                $url = $image->url . $city . '-Photo.jpg';
                $title = 'Photo of ' . $city;
                add_action('add_attachment', 'pc_new_attachment');
                $src = media_sideload_image($url, null, $title, 'src');
                remove_action('add_attachment', 'pc_new_attachment');
                WP_CLI::success('Imported image from Google Places: ' . $src);
            }
        }

        // @todo?
        // Set theme settings
        /*$mods = get_option( 'theme_mods_wp-proud-theme', array() );
        if (!empty($response->settings->colors->main)) {
           $mods['color_main'] = $response->settings->colors->main;
        }
        if (!empty($response->settings->colors->secondary)) {
           $mods['color_secondary'] = $response->settings->colors->secondary;
        }
        if (!empty($response->settings->colors->highlight)) {
           $mods['color_highlight'] = $response->settings->colors->highlight;
        }
        update_option( 'theme_mods_wp-proud-theme', $mods );
        */


        // Print a success message
        //WP_CLI::success( print_r($response,1));

        //WP_CLI::success( PROUD_URL . '/sites/' . PROUD_ID . '/launched'.$response->color->highlight.print_r(get_option( 'theme_mods_wp-proud-theme', array() ),1));

    }


    /**
     * Updates the plugins stored in the ProudCity API
     *
     * ## OPTIONS
     *
     * ## EXAMPLES
     *
     *     wp proudcity apiplugins
     *
     * @synopsis
     */
    function apiplugins($args, $assoc_args)
    {
        $out = array();
        $plugins = get_plugins();
        foreach ($plugins as $key => $plugin) {
            $namespace = explode('/', $key);
            if ($status = is_plugin_active($key)) {
                array_push($out, array(
                    'label' => $plugin['Name'],
                    'namespace' => $namespace[0],
                    //'status' => $status,
                    'version' => $plugin['Version']
                ));
            }
        }

        $out = json_encode($out);
        $request = wp_remote_post(PROUDCITY_API . '/sites/' . PROUDCITY_APP . '/plugins', [data => $out]);
        return $request;
    }


    /**
     * Updates the options stored in the ProudCity API
     *
     * ## OPTIONS
     *
     * ## EXAMPLES
     *
     *     wp proudcity apioptions
     *
     * @synopsis
     */
    function apioptions($args, $assoc_args)
    {
        $request = wp_remote_get(PROUDCITY_API . '/distros/' . PROUDCITY_DISTRO . '/plugins');
        $data = json_decode(wp_remote_retrieve_body($request));

        //$data = '[{"key": "gravityformsaddon_gravityformsmailchimp_settings.apiKey", "label": "MailChimp API Key", "plugin":"gravityformsmailchimp"}]';
        //$data = json_decode($data, true);

        $out = [];
        foreach ($data as $plugin) {
            $key = $plugin['key'];
            if (strpos($key,'.') === FALSE) {
                $value = get_option[$key];
                $out[$key] = $value;
            }
            else {
                $keys = explode('.', $key);
                $value = get_option($keys[0]);
                $out[$keys[0]] = !empty($out[$keys[0]]) ? $out[$keys[0]] : [];
                $out[$keys[0]][$keys[1]] = $value[$keys[1]];
            }
        }

        $out = json_encode($out);
        $request = wp_remote_post(PROUDCITY_API . '/sites/' . PROUDCITY_APP . '/options', [data => $out]);
        return $request;
    }


    /**
     * Updates an option in WP with dot notation
     *
     * ## OPTIONS
     *
     * ## EXAMPLES
     *
     *     wp proudcity optionupdate "gravityformsaddon_gravityformsmailchimp_settings.apiKey" "123"
     *
     * @synopsis
     */
    function optionupdate($args, $assoc_args)
    {

        $key = str_replace('"', '', $args[0]);
        $value = str_replace('"', '', $args[1]);

        if (strpos($key,'.') === FALSE) {
            $return = update_option($key, $value, false);
        }
        else {
            $keys = explode('.', $key);
            $arrValue = get_option($keys[0]);
            $arrValue[$keys[1]] = $value;
            $return = update_option($keys[0], $arrValue, false);
            $value = $arrValue;
        }

        echo print_r($value,1);
    }



}

WP_CLI::add_command('proudcity', 'ProudcityDashboardCommand');

