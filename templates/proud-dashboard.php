
<div id="<?php print $this->id; ?>" class="col-sm-12" ng-app="app" style="margin:0">
  <div ng-init="$root.appId = 'wp_proud_dashboard'" class="spacing">
    <div ui-view class="parent dashboard-wrapper"></div>

  </div>
</div>

<style>
  .dashboard-wrapper > .container {
    width: 100% !important;
    max-width: 1200px !important;
    margin: 0 !important;
  }
</style>