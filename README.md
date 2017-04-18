# wp-proud-dashboard
Creates ProudCity management application for backend use


# Development
By default, this app calls the ProudCity Service Center remove JS include files at https://service-center.proudcity.com.  Fo development,
we can use the local or beta version.:

```
# Use local version (in ./includes/js/client/dist)
cd ./includes/js
git clone git@github.com:proudcity/proudcity-dashboard.git client
wp --allow-root option update wp_proud_dashboard_path 'local'

# Use beta version
# @todo

# Use production version (https://service-center.proudcity.com)
wp --allow-root option delete wp_proud_dashboard_path
```
