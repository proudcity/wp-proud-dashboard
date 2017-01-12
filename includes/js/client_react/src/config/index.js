let config = {};

// CMS specific
config = window.proud_dashboard;
config.cms = 'wordpress';
config.pluginText = 'Plugin';
config.cmsNice = 'Wordpress';
let url = '//api.proudcity.com/v1/';
if(process.env.NODE_ENV === 'development') {
  url = '//localhost:4000/v1/';
}
config.apiUrl = url;// + 'action=proud_dashboard_proxy&endpoint=/sites/' + config.siteId + '/';
config.siteApiUrl = url + 'sites/' + config.siteId + '/';
// Date format
config.dateFormat = 'MMMM Do YYYY';

export default config;