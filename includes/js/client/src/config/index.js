let config = {};

// CMS specific
config = window.proud_dashboard;
config.cms = 'wordpress';
config.pluginText = 'Plugin';
config.cmsNice = 'Wordpress';
let url = '/wp-admin/admin-ajax.php?';
if(process.env.NODE_ENV === 'development') {
  url = 'http://localhost:8080/wp-admin/admin-ajax.php?';
}
config.apiUrl = url + 'action=proud_dashboard_proxy&endpoint=/sites/' + config.siteId + '/';

// Date format
config.dateFormat = 'MMMM Do YYYY';

export default config;