/**
 * @license AngularJS v1.5.8
 * (c) 2010-2016 Google, Inc. http://angularjs.org
 * License: MIT
 */
!function(window,angular){"use strict";function isValidDottedPath(path){return null!=path&&""!==path&&"hasOwnProperty"!==path&&MEMBER_NAME_REGEX.test("."+path)}function lookupDottedPath(obj,path){if(!isValidDottedPath(path))throw $resourceMinErr("badmember",'Dotted member path "@{0}" is invalid.',path);for(var keys=path.split("."),i=0,ii=keys.length;i<ii&&angular.isDefined(obj);i++){var key=keys[i];obj=null!==obj?obj[key]:void 0}return obj}/**
 * Create a shallow copy of an object and clear other fields from the destination
 */
function shallowClearAndCopy(src,dst){dst=dst||{},angular.forEach(dst,function(value,key){delete dst[key]});for(var key in src)!src.hasOwnProperty(key)||"$"===key.charAt(0)&&"$"===key.charAt(1)||(dst[key]=src[key]);return dst}var $resourceMinErr=angular.$$minErr("$resource"),MEMBER_NAME_REGEX=/^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;/**
 * @ngdoc module
 * @name ngResource
 * @description
 *
 * # ngResource
 *
 * The `ngResource` module provides interaction support with RESTful services
 * via the $resource service.
 *
 *
 * <div doc-module-components="ngResource"></div>
 *
 * See {@link ngResource.$resourceProvider} and {@link ngResource.$resource} for usage.
 */
/**
 * @ngdoc provider
 * @name $resourceProvider
 *
 * @description
 *
 * Use `$resourceProvider` to change the default behavior of the {@link ngResource.$resource}
 * service.
 *
 * ## Dependencies
 * Requires the {@link ngResource } module to be installed.
 *
 */
/**
 * @ngdoc service
 * @name $resource
 * @requires $http
 * @requires ng.$log
 * @requires $q
 * @requires ng.$timeout
 *
 * @description
 * A factory which creates a resource object that lets you interact with
 * [RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) server-side data sources.
 *
 * The returned resource object has action methods which provide high-level behaviors without
 * the need to interact with the low level {@link ng.$http $http} service.
 *
 * Requires the {@link ngResource `ngResource`} module to be installed.
 *
 * By default, trailing slashes will be stripped from the calculated URLs,
 * which can pose problems with server backends that do not expect that
 * behavior.  This can be disabled by configuring the `$resourceProvider` like
 * this:
 *
 * ```js
     app.config(['$resourceProvider', function($resourceProvider) {
       // Don't strip trailing slashes from calculated URLs
       $resourceProvider.defaults.stripTrailingSlashes = false;
     }]);
 * ```
 *
 * @param {string} url A parameterized URL template with parameters prefixed by `:` as in
 *   `/user/:username`. If you are using a URL with a port number (e.g.
 *   `http://example.com:8080/api`), it will be respected.
 *
 *   If you are using a url with a suffix, just add the suffix, like this:
 *   `$resource('http://example.com/resource.json')` or `$resource('http://example.com/:id.json')`
 *   or even `$resource('http://example.com/resource/:resource_id.:format')`
 *   If the parameter before the suffix is empty, :resource_id in this case, then the `/.` will be
 *   collapsed down to a single `.`.  If you need this sequence to appear and not collapse then you
 *   can escape it with `/\.`.
 *
 * @param {Object=} paramDefaults Default values for `url` parameters. These can be overridden in
 *   `actions` methods. If a parameter value is a function, it will be called every time
 *   a param value needs to be obtained for a request (unless the param was overridden). The function
 *   will be passed the current data value as an argument.
 *
 *   Each key value in the parameter object is first bound to url template if present and then any
 *   excess keys are appended to the url search query after the `?`.
 *
 *   Given a template `/path/:verb` and parameter `{verb:'greet', salutation:'Hello'}` results in
 *   URL `/path/greet?salutation=Hello`.
 *
 *   If the parameter value is prefixed with `@`, then the value for that parameter will be
 *   extracted from the corresponding property on the `data` object (provided when calling a
 *   "non-GET" action method).
 *   For example, if the `defaultParam` object is `{someParam: '@someProp'}` then the value of
 *   `someParam` will be `data.someProp`.
 *   Note that the parameter will be ignored, when calling a "GET" action method (i.e. an action
 *   method that does not accept a request body)
 *
 * @param {Object.<Object>=} actions Hash with declaration of custom actions that should extend
 *   the default set of resource actions. The declaration should be created in the format of {@link
 *   ng.$http#usage $http.config}:
 *
 *       {action1: {method:?, params:?, isArray:?, headers:?, ...},
 *        action2: {method:?, params:?, isArray:?, headers:?, ...},
 *        ...}
 *
 *   Where:
 *
 *   - **`action`** – {string} – The name of action. This name becomes the name of the method on
 *     your resource object.
 *   - **`method`** – {string} – Case insensitive HTTP method (e.g. `GET`, `POST`, `PUT`,
 *     `DELETE`, `JSONP`, etc).
 *   - **`params`** – {Object=} – Optional set of pre-bound parameters for this action. If any of
 *     the parameter value is a function, it will be called every time when a param value needs to
 *     be obtained for a request (unless the param was overridden). The function will be passed the
 *     current data value as an argument.
 *   - **`url`** – {string} – action specific `url` override. The url templating is supported just
 *     like for the resource-level urls.
 *   - **`isArray`** – {boolean=} – If true then the returned object for this action is an array,
 *     see `returns` section.
 *   - **`transformRequest`** –
 *     `{function(data, headersGetter)|Array.<function(data, headersGetter)>}` –
 *     transform function or an array of such functions. The transform function takes the http
 *     request body and headers and returns its transformed (typically serialized) version.
 *     By default, transformRequest will contain one function that checks if the request data is
 *     an object and serializes to using `angular.toJson`. To prevent this behavior, set
 *     `transformRequest` to an empty array: `transformRequest: []`
 *   - **`transformResponse`** –
 *     `{function(data, headersGetter)|Array.<function(data, headersGetter)>}` –
 *     transform function or an array of such functions. The transform function takes the http
 *     response body and headers and returns its transformed (typically deserialized) version.
 *     By default, transformResponse will contain one function that checks if the response looks
 *     like a JSON string and deserializes it using `angular.fromJson`. To prevent this behavior,
 *     set `transformResponse` to an empty array: `transformResponse: []`
 *   - **`cache`** – `{boolean|Cache}` – If true, a default $http cache will be used to cache the
 *     GET request, otherwise if a cache instance built with
 *     {@link ng.$cacheFactory $cacheFactory}, this cache will be used for
 *     caching.
 *   - **`timeout`** – `{number}` – timeout in milliseconds.<br />
 *     **Note:** In contrast to {@link ng.$http#usage $http.config}, {@link ng.$q promises} are
 *     **not** supported in $resource, because the same value would be used for multiple requests.
 *     If you are looking for a way to cancel requests, you should use the `cancellable` option.
 *   - **`cancellable`** – `{boolean}` – if set to true, the request made by a "non-instance" call
 *     will be cancelled (if not already completed) by calling `$cancelRequest()` on the call's
 *     return value. Calling `$cancelRequest()` for a non-cancellable or an already
 *     completed/cancelled request will have no effect.<br />
 *   - **`withCredentials`** - `{boolean}` - whether to set the `withCredentials` flag on the
 *     XHR object. See
 *     [requests with credentials](https://developer.mozilla.org/en/http_access_control#section_5)
 *     for more information.
 *   - **`responseType`** - `{string}` - see
 *     [requestType](https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest#responseType).
 *   - **`interceptor`** - `{Object=}` - The interceptor object has two optional methods -
 *     `response` and `responseError`. Both `response` and `responseError` interceptors get called
 *     with `http response` object. See {@link ng.$http $http interceptors}.
 *
 * @param {Object} options Hash with custom settings that should extend the
 *   default `$resourceProvider` behavior.  The supported options are:
 *
 *   - **`stripTrailingSlashes`** – {boolean} – If true then the trailing
 *   slashes from any calculated URL will be stripped. (Defaults to true.)
 *   - **`cancellable`** – {boolean} – If true, the request made by a "non-instance" call will be
 *   cancelled (if not already completed) by calling `$cancelRequest()` on the call's return value.
 *   This can be overwritten per action. (Defaults to false.)
 *
 * @returns {Object} A resource "class" object with methods for the default set of resource actions
 *   optionally extended with custom `actions`. The default set contains these actions:
 *   ```js
 *   { 'get':    {method:'GET'},
 *     'save':   {method:'POST'},
 *     'query':  {method:'GET', isArray:true},
 *     'remove': {method:'DELETE'},
 *     'delete': {method:'DELETE'} };
 *   ```
 *
 *   Calling these methods invoke an {@link ng.$http} with the specified http method,
 *   destination and parameters. When the data is returned from the server then the object is an
 *   instance of the resource class. The actions `save`, `remove` and `delete` are available on it
 *   as  methods with the `$` prefix. This allows you to easily perform CRUD operations (create,
 *   read, update, delete) on server-side data like this:
 *   ```js
 *   var User = $resource('/user/:userId', {userId:'@id'});
 *   var user = User.get({userId:123}, function() {
 *     user.abc = true;
 *     user.$save();
 *   });
 *   ```
 *
 *   It is important to realize that invoking a $resource object method immediately returns an
 *   empty reference (object or array depending on `isArray`). Once the data is returned from the
 *   server the existing reference is populated with the actual data. This is a useful trick since
 *   usually the resource is assigned to a model which is then rendered by the view. Having an empty
 *   object results in no rendering, once the data arrives from the server then the object is
 *   populated with the data and the view automatically re-renders itself showing the new data. This
 *   means that in most cases one never has to write a callback function for the action methods.
 *
 *   The action methods on the class object or instance object can be invoked with the following
 *   parameters:
 *
 *   - HTTP GET "class" actions: `Resource.action([parameters], [success], [error])`
 *   - non-GET "class" actions: `Resource.action([parameters], postData, [success], [error])`
 *   - non-GET instance actions:  `instance.$action([parameters], [success], [error])`
 *
 *
 *   Success callback is called with (value, responseHeaders) arguments, where the value is
 *   the populated resource instance or collection object. The error callback is called
 *   with (httpResponse) argument.
 *
 *   Class actions return empty instance (with additional properties below).
 *   Instance actions return promise of the action.
 *
 *   The Resource instances and collections have these additional properties:
 *
 *   - `$promise`: the {@link ng.$q promise} of the original server interaction that created this
 *     instance or collection.
 *
 *     On success, the promise is resolved with the same resource instance or collection object,
 *     updated with data from server. This makes it easy to use in
 *     {@link ngRoute.$routeProvider resolve section of $routeProvider.when()} to defer view
 *     rendering until the resource(s) are loaded.
 *
 *     On failure, the promise is rejected with the {@link ng.$http http response} object, without
 *     the `resource` property.
 *
 *     If an interceptor object was provided, the promise will instead be resolved with the value
 *     returned by the interceptor.
 *
 *   - `$resolved`: `true` after first server interaction is completed (either with success or
 *      rejection), `false` before that. Knowing if the Resource has been resolved is useful in
 *      data-binding.
 *
 *   The Resource instances and collections have these additional methods:
 *
 *   - `$cancelRequest`: If there is a cancellable, pending request related to the instance or
 *      collection, calling this method will abort the request.
 *
 *   The Resource instances have these additional methods:
 *
 *   - `toJSON`: It returns a simple object without any of the extra properties added as part of
 *     the Resource API. This object can be serialized through {@link angular.toJson} safely
 *     without attaching Angular-specific fields. Notice that `JSON.stringify` (and
 *     `angular.toJson`) automatically use this method when serializing a Resource instance
 *     (see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#toJSON()_behavior)).
 *
 * @example
 *
 * # Credit card resource
 *
 * ```js
     // Define CreditCard class
     var CreditCard = $resource('/user/:userId/card/:cardId',
      {userId:123, cardId:'@id'}, {
       charge: {method:'POST', params:{charge:true}}
      });

     // We can retrieve a collection from the server
     var cards = CreditCard.query(function() {
       // GET: /user/123/card
       // server returns: [ {id:456, number:'1234', name:'Smith'} ];

       var card = cards[0];
       // each item is an instance of CreditCard
       expect(card instanceof CreditCard).toEqual(true);
       card.name = "J. Smith";
       // non GET methods are mapped onto the instances
       card.$save();
       // POST: /user/123/card/456 {id:456, number:'1234', name:'J. Smith'}
       // server returns: {id:456, number:'1234', name: 'J. Smith'};

       // our custom method is mapped as well.
       card.$charge({amount:9.99});
       // POST: /user/123/card/456?amount=9.99&charge=true {id:456, number:'1234', name:'J. Smith'}
     });

     // we can create an instance as well
     var newCard = new CreditCard({number:'0123'});
     newCard.name = "Mike Smith";
     newCard.$save();
     // POST: /user/123/card {number:'0123', name:'Mike Smith'}
     // server returns: {id:789, number:'0123', name: 'Mike Smith'};
     expect(newCard.id).toEqual(789);
 * ```
 *
 * The object returned from this function execution is a resource "class" which has "static" method
 * for each action in the definition.
 *
 * Calling these methods invoke `$http` on the `url` template with the given `method`, `params` and
 * `headers`.
 *
 * @example
 *
 * # User resource
 *
 * When the data is returned from the server then the object is an instance of the resource type and
 * all of the non-GET methods are available with `$` prefix. This allows you to easily support CRUD
 * operations (create, read, update, delete) on server-side data.

   ```js
     var User = $resource('/user/:userId', {userId:'@id'});
     User.get({userId:123}, function(user) {
       user.abc = true;
       user.$save();
     });
   ```
 *
 * It's worth noting that the success callback for `get`, `query` and other methods gets passed
 * in the response that came from the server as well as $http header getter function, so one
 * could rewrite the above example and get access to http headers as:
 *
   ```js
     var User = $resource('/user/:userId', {userId:'@id'});
     User.get({userId:123}, function(user, getResponseHeaders){
       user.abc = true;
       user.$save(function(user, putResponseHeaders) {
         //user => saved user object
         //putResponseHeaders => $http header getter
       });
     });
   ```
 *
 * You can also access the raw `$http` promise via the `$promise` property on the object returned
 *
   ```
     var User = $resource('/user/:userId', {userId:'@id'});
     User.get({userId:123})
         .$promise.then(function(user) {
           $scope.user = user;
         });
   ```
 *
 * @example
 *
 * # Creating a custom 'PUT' request
 *
 * In this example we create a custom method on our resource to make a PUT request
 * ```js
 *    var app = angular.module('app', ['ngResource', 'ngRoute']);
 *
 *    // Some APIs expect a PUT request in the format URL/object/ID
 *    // Here we are creating an 'update' method
 *    app.factory('Notes', ['$resource', function($resource) {
 *    return $resource('/notes/:id', null,
 *        {
 *            'update': { method:'PUT' }
 *        });
 *    }]);
 *
 *    // In our controller we get the ID from the URL using ngRoute and $routeParams
 *    // We pass in $routeParams and our Notes factory along with $scope
 *    app.controller('NotesCtrl', ['$scope', '$routeParams', 'Notes',
                                      function($scope, $routeParams, Notes) {
 *    // First get a note object from the factory
 *    var note = Notes.get({ id:$routeParams.id });
 *    $id = note.id;
 *
 *    // Now call update passing in the ID first then the object you are updating
 *    Notes.update({ id:$id }, note);
 *
 *    // This will PUT /notes/ID with the note object in the request payload
 *    }]);
 * ```
 *
 * @example
 *
 * # Cancelling requests
 *
 * If an action's configuration specifies that it is cancellable, you can cancel the request related
 * to an instance or collection (as long as it is a result of a "non-instance" call):
 *
   ```js
     // ...defining the `Hotel` resource...
     var Hotel = $resource('/api/hotel/:id', {id: '@id'}, {
       // Let's make the `query()` method cancellable
       query: {method: 'get', isArray: true, cancellable: true}
     });

     // ...somewhere in the PlanVacationController...
     ...
     this.onDestinationChanged = function onDestinationChanged(destination) {
       // We don't care about any pending request for hotels
       // in a different destination any more
       this.availableHotels.$cancelRequest();

       // Let's query for hotels in '<destination>'
       // (calls: /api/hotel?location=<destination>)
       this.availableHotels = Hotel.query({location: destination});
     };
   ```
 *
 */
angular.module("ngResource",["ng"]).provider("$resource",function(){var PROTOCOL_AND_DOMAIN_REGEX=/^https?:\/\/[^\/]*/,provider=this;/**
     * @ngdoc property
     * @name $resourceProvider#defaults
     * @description
     * Object containing default options used when creating `$resource` instances.
     *
     * The default values satisfy a wide range of usecases, but you may choose to overwrite any of
     * them to further customize your instances. The available properties are:
     *
     * - **stripTrailingSlashes** – `{boolean}` – If true, then the trailing slashes from any
     *   calculated URL will be stripped.<br />
     *   (Defaults to true.)
     * - **cancellable** – `{boolean}` – If true, the request made by a "non-instance" call will be
     *   cancelled (if not already completed) by calling `$cancelRequest()` on the call's return
     *   value. For more details, see {@link ngResource.$resource}. This can be overwritten per
     *   resource class or action.<br />
     *   (Defaults to false.)
     * - **actions** - `{Object.<Object>}` - A hash with default actions declarations. Actions are
     *   high-level methods corresponding to RESTful actions/methods on resources. An action may
     *   specify what HTTP method to use, what URL to hit, if the return value will be a single
     *   object or a collection (array) of objects etc. For more details, see
     *   {@link ngResource.$resource}. The actions can also be enhanced or overwritten per resource
     *   class.<br />
     *   The default actions are:
     *   ```js
     *   {
     *     get: {method: 'GET'},
     *     save: {method: 'POST'},
     *     query: {method: 'GET', isArray: true},
     *     remove: {method: 'DELETE'},
     *     delete: {method: 'DELETE'}
     *   }
     *   ```
     *
     * #### Example
     *
     * For example, you can specify a new `update` action that uses the `PUT` HTTP verb:
     *
     * ```js
     *   angular.
     *     module('myApp').
     *     config(['resourceProvider', function ($resourceProvider) {
     *       $resourceProvider.defaults.actions.update = {
     *         method: 'PUT'
     *       };
     *     });
     * ```
     *
     * Or you can even overwrite the whole `actions` list and specify your own:
     *
     * ```js
     *   angular.
     *     module('myApp').
     *     config(['resourceProvider', function ($resourceProvider) {
     *       $resourceProvider.defaults.actions = {
     *         create: {method: 'POST'}
     *         get:    {method: 'GET'},
     *         getAll: {method: 'GET', isArray:true},
     *         update: {method: 'PUT'},
     *         delete: {method: 'DELETE'}
     *       };
     *     });
     * ```
     *
     */
this.defaults={
// Strip slashes by default
stripTrailingSlashes:!0,
// Make non-instance requests cancellable (via `$cancelRequest()`)
cancellable:!1,
// Default actions configuration
actions:{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}}},this.$get=["$http","$log","$q","$timeout",function($http,$log,$q,$timeout){/**
       * We need our custom method because encodeURIComponent is too aggressive and doesn't follow
       * http://www.ietf.org/rfc/rfc3986.txt with regards to the character set
       * (pchar) allowed in path segments:
       *    segment       = *pchar
       *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
       *    pct-encoded   = "%" HEXDIG HEXDIG
       *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
       *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
       *                     / "*" / "+" / "," / ";" / "="
       */
function encodeUriSegment(val){return encodeUriQuery(val,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}/**
       * This method is intended for encoding *key* or *value* parts of query component. We need a
       * custom method because encodeURIComponent is too aggressive and encodes stuff that doesn't
       * have to be encoded per http://tools.ietf.org/html/rfc3986:
       *    query       = *( pchar / "/" / "?" )
       *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
       *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
       *    pct-encoded   = "%" HEXDIG HEXDIG
       *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
       *                     / "*" / "+" / "," / ";" / "="
       */
function encodeUriQuery(val,pctEncodeSpaces){return encodeURIComponent(val).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,pctEncodeSpaces?"%20":"+")}function Route(template,defaults){this.template=template,this.defaults=extend({},provider.defaults,defaults),this.urlParams={}}function resourceFactory(url,paramDefaults,actions,options){function extractParams(data,actionParams){var ids={};return actionParams=extend({},paramDefaults,actionParams),forEach(actionParams,function(value,key){isFunction(value)&&(value=value(data)),ids[key]=value&&value.charAt&&"@"==value.charAt(0)?lookupDottedPath(data,value.substr(1)):value}),ids}function defaultResponseInterceptor(response){return response.resource}function Resource(value){shallowClearAndCopy(value||{},this)}var route=new Route(url,options);return actions=extend({},provider.defaults.actions,actions),Resource.prototype.toJSON=function(){var data=extend({},this);return delete data.$promise,delete data.$resolved,data},forEach(actions,function(action,name){var hasBody=/^(POST|PUT|PATCH)$/i.test(action.method),numericTimeout=action.timeout,cancellable=angular.isDefined(action.cancellable)?action.cancellable:options&&angular.isDefined(options.cancellable)?options.cancellable:provider.defaults.cancellable;numericTimeout&&!angular.isNumber(numericTimeout)&&($log.debug("ngResource:\n  Only numeric values are allowed as `timeout`.\n  Promises are not supported in $resource, because the same value would be used for multiple requests. If you are looking for a way to cancel requests, you should use the `cancellable` option."),delete action.timeout,numericTimeout=null),Resource[name]=function(a1,a2,a3,a4){var data,success,error,params={};/* jshint -W086 */
/* (purposefully fall through case statements) */
switch(arguments.length){case 4:error=a4,success=a3;
//fallthrough
case 3:case 2:if(!isFunction(a2)){params=a1,data=a2,success=a3;break}if(isFunction(a1)){success=a1,error=a2;break}success=a2,error=a3;case 1:isFunction(a1)?success=a1:hasBody?data=a1:params=a1;break;case 0:break;default:throw $resourceMinErr("badargs","Expected up to 4 arguments [params, data, success, error], got {0} arguments",arguments.length)}/* jshint +W086 */
/* (purposefully fall through case statements) */
var timeoutDeferred,numericTimeoutPromise,isInstanceCall=this instanceof Resource,value=isInstanceCall?data:action.isArray?[]:new Resource(data),httpConfig={},responseInterceptor=action.interceptor&&action.interceptor.response||defaultResponseInterceptor,responseErrorInterceptor=action.interceptor&&action.interceptor.responseError||void 0;forEach(action,function(value,key){switch(key){default:httpConfig[key]=copy(value);break;case"params":case"isArray":case"interceptor":case"cancellable":}}),!isInstanceCall&&cancellable&&(timeoutDeferred=$q.defer(),httpConfig.timeout=timeoutDeferred.promise,numericTimeout&&(numericTimeoutPromise=$timeout(timeoutDeferred.resolve,numericTimeout))),hasBody&&(httpConfig.data=data),route.setUrlParams(httpConfig,extend({},extractParams(data,action.params||{}),params),action.url);var promise=$http(httpConfig).then(function(response){var data=response.data;if(data){
// Need to convert action.isArray to boolean in case it is undefined
// jshint -W018
if(angular.isArray(data)!==!!action.isArray)throw $resourceMinErr("badcfg","Error in resource configuration for action `{0}`. Expected response to contain an {1} but got an {2} (Request: {3} {4})",name,action.isArray?"array":"object",angular.isArray(data)?"array":"object",httpConfig.method,httpConfig.url);
// jshint +W018
if(action.isArray)value.length=0,forEach(data,function(item){"object"==typeof item?value.push(new Resource(item)):
// Valid JSON values may be string literals, and these should not be converted
// into objects. These items will not have access to the Resource prototype
// methods, but unfortunately there
value.push(item)});else{var promise=value.$promise;// Save the promise
shallowClearAndCopy(data,value),value.$promise=promise}}return response.resource=value,response},function(response){return(error||noop)(response),$q.reject(response)});
// we are creating instance / collection
// - set the initial promise
// - return the instance / collection
return promise["finally"](function(){value.$resolved=!0,!isInstanceCall&&cancellable&&(value.$cancelRequest=angular.noop,$timeout.cancel(numericTimeoutPromise),timeoutDeferred=numericTimeoutPromise=httpConfig.timeout=null)}),promise=promise.then(function(response){var value=responseInterceptor(response);return(success||noop)(value,response.headers),value},responseErrorInterceptor),isInstanceCall?promise:(value.$promise=promise,value.$resolved=!1,cancellable&&(value.$cancelRequest=timeoutDeferred.resolve),value)},Resource.prototype["$"+name]=function(params,success,error){isFunction(params)&&(error=success,success=params,params={});var result=Resource[name].call(this,params,this,success,error);return result.$promise||result}}),Resource.bind=function(additionalParamDefaults){return resourceFactory(url,extend({},paramDefaults,additionalParamDefaults),actions)},Resource}var noop=angular.noop,forEach=angular.forEach,extend=angular.extend,copy=angular.copy,isFunction=angular.isFunction;return Route.prototype={setUrlParams:function(config,params,actionUrl){var val,encodedVal,self=this,url=actionUrl||self.template,protocolAndDomain="",urlParams=self.urlParams={};forEach(url.split(/\W/),function(param){if("hasOwnProperty"===param)throw $resourceMinErr("badname","hasOwnProperty is not a valid parameter name.");!new RegExp("^\\d+$").test(param)&&param&&new RegExp("(^|[^\\\\]):"+param+"(\\W|$)").test(url)&&(urlParams[param]={isQueryParamValue:new RegExp("\\?.*=:"+param+"(?:\\W|$)").test(url)})}),url=url.replace(/\\:/g,":"),url=url.replace(PROTOCOL_AND_DOMAIN_REGEX,function(match){return protocolAndDomain=match,""}),params=params||{},forEach(self.urlParams,function(paramInfo,urlParam){val=params.hasOwnProperty(urlParam)?params[urlParam]:self.defaults[urlParam],angular.isDefined(val)&&null!==val?(encodedVal=paramInfo.isQueryParamValue?encodeUriQuery(val,!0):encodeUriSegment(val),url=url.replace(new RegExp(":"+urlParam+"(\\W|$)","g"),function(match,p1){return encodedVal+p1})):url=url.replace(new RegExp("(/?):"+urlParam+"(\\W|$)","g"),function(match,leadingSlashes,tail){return"/"==tail.charAt(0)?tail:leadingSlashes+tail})}),
// strip trailing slashes and set the url (unless this behavior is specifically disabled)
self.defaults.stripTrailingSlashes&&(url=url.replace(/\/+$/,"")||"/"),
// then replace collapse `/.` if found in the last URL path segment before the query
// E.g. `http://url.com/id./format?q=x` becomes `http://url.com/id.format?q=x`
url=url.replace(/\/\.(?=\w+($|\?))/,"."),
// replace escaped `/\.` with `/.`
config.url=protocolAndDomain+url.replace(/\/\\\./,"/."),
// set params - delegate param encoding to $http
forEach(params,function(value,key){self.urlParams[key]||(config.params=config.params||{},config.params[key]=value)})}},resourceFactory}]})}(window,window.angular),/**
 * @license AngularJS v1.5.8
 * (c) 2010-2016 Google, Inc. http://angularjs.org
 * License: MIT
 */
function(window,angular){"use strict";/**
 * @ngdoc module
 * @name ngSanitize
 * @description
 *
 * # ngSanitize
 *
 * The `ngSanitize` module provides functionality to sanitize HTML.
 *
 *
 * <div doc-module-components="ngSanitize"></div>
 *
 * See {@link ngSanitize.$sanitize `$sanitize`} for usage.
 */
/**
 * @ngdoc service
 * @name $sanitize
 * @kind function
 *
 * @description
 *   Sanitizes an html string by stripping all potentially dangerous tokens.
 *
 *   The input is sanitized by parsing the HTML into tokens. All safe tokens (from a whitelist) are
 *   then serialized back to properly escaped html string. This means that no unsafe input can make
 *   it into the returned string.
 *
 *   The whitelist for URL sanitization of attribute values is configured using the functions
 *   `aHrefSanitizationWhitelist` and `imgSrcSanitizationWhitelist` of {@link ng.$compileProvider
 *   `$compileProvider`}.
 *
 *   The input may also contain SVG markup if this is enabled via {@link $sanitizeProvider}.
 *
 * @param {string} html HTML input.
 * @returns {string} Sanitized HTML.
 *
 * @example
   <example module="sanitizeExample" deps="angular-sanitize.js">
   <file name="index.html">
     <script>
         angular.module('sanitizeExample', ['ngSanitize'])
           .controller('ExampleController', ['$scope', '$sce', function($scope, $sce) {
             $scope.snippet =
               '<p style="color:blue">an html\n' +
               '<em onmouseover="this.textContent=\'PWN3D!\'">click here</em>\n' +
               'snippet</p>';
             $scope.deliberatelyTrustDangerousSnippet = function() {
               return $sce.trustAsHtml($scope.snippet);
             };
           }]);
     </script>
     <div ng-controller="ExampleController">
        Snippet: <textarea ng-model="snippet" cols="60" rows="3"></textarea>
       <table>
         <tr>
           <td>Directive</td>
           <td>How</td>
           <td>Source</td>
           <td>Rendered</td>
         </tr>
         <tr id="bind-html-with-sanitize">
           <td>ng-bind-html</td>
           <td>Automatically uses $sanitize</td>
           <td><pre>&lt;div ng-bind-html="snippet"&gt;<br/>&lt;/div&gt;</pre></td>
           <td><div ng-bind-html="snippet"></div></td>
         </tr>
         <tr id="bind-html-with-trust">
           <td>ng-bind-html</td>
           <td>Bypass $sanitize by explicitly trusting the dangerous value</td>
           <td>
           <pre>&lt;div ng-bind-html="deliberatelyTrustDangerousSnippet()"&gt;
&lt;/div&gt;</pre>
           </td>
           <td><div ng-bind-html="deliberatelyTrustDangerousSnippet()"></div></td>
         </tr>
         <tr id="bind-default">
           <td>ng-bind</td>
           <td>Automatically escapes</td>
           <td><pre>&lt;div ng-bind="snippet"&gt;<br/>&lt;/div&gt;</pre></td>
           <td><div ng-bind="snippet"></div></td>
         </tr>
       </table>
       </div>
   </file>
   <file name="protractor.js" type="protractor">
     it('should sanitize the html snippet by default', function() {
       expect(element(by.css('#bind-html-with-sanitize div')).getInnerHtml()).
         toBe('<p>an html\n<em>click here</em>\nsnippet</p>');
     });

     it('should inline raw snippet if bound to a trusted value', function() {
       expect(element(by.css('#bind-html-with-trust div')).getInnerHtml()).
         toBe("<p style=\"color:blue\">an html\n" +
              "<em onmouseover=\"this.textContent='PWN3D!'\">click here</em>\n" +
              "snippet</p>");
     });

     it('should escape snippet without any filter', function() {
       expect(element(by.css('#bind-default div')).getInnerHtml()).
         toBe("&lt;p style=\"color:blue\"&gt;an html\n" +
              "&lt;em onmouseover=\"this.textContent='PWN3D!'\"&gt;click here&lt;/em&gt;\n" +
              "snippet&lt;/p&gt;");
     });

     it('should update', function() {
       element(by.model('snippet')).clear();
       element(by.model('snippet')).sendKeys('new <b onclick="alert(1)">text</b>');
       expect(element(by.css('#bind-html-with-sanitize div')).getInnerHtml()).
         toBe('new <b>text</b>');
       expect(element(by.css('#bind-html-with-trust div')).getInnerHtml()).toBe(
         'new <b onclick="alert(1)">text</b>');
       expect(element(by.css('#bind-default div')).getInnerHtml()).toBe(
         "new &lt;b onclick=\"alert(1)\"&gt;text&lt;/b&gt;");
     });
   </file>
   </example>
 */
/**
 * @ngdoc provider
 * @name $sanitizeProvider
 *
 * @description
 * Creates and configures {@link $sanitize} instance.
 */
function $SanitizeProvider(){function toMap(str,lowercaseKeys){var i,obj={},items=str.split(",");for(i=0;i<items.length;i++)obj[lowercaseKeys?lowercase(items[i]):items[i]]=!0;return obj}/**
   * @example
   * htmlParser(htmlString, {
   *     start: function(tag, attrs) {},
   *     end: function(tag) {},
   *     chars: function(text) {},
   *     comment: function(text) {}
   * });
   *
   * @param {string} html string
   * @param {object} handler
   */
function htmlParserImpl(html,handler){null===html||void 0===html?html="":"string"!=typeof html&&(html=""+html),inertBodyElement.innerHTML=html;
//mXSS protection
var mXSSAttempts=5;do{if(0===mXSSAttempts)throw $sanitizeMinErr("uinput","Failed to sanitize html because the input is unstable");mXSSAttempts--,
// strip custom-namespaced attributes on IE<=11
window.document.documentMode&&stripCustomNsAttrs(inertBodyElement),html=inertBodyElement.innerHTML,//trigger mXSS
inertBodyElement.innerHTML=html}while(html!==inertBodyElement.innerHTML);for(var node=inertBodyElement.firstChild;node;){switch(node.nodeType){case 1:// ELEMENT_NODE
handler.start(node.nodeName.toLowerCase(),attrToMap(node.attributes));break;case 3:// TEXT NODE
handler.chars(node.textContent)}var nextNode;if(!(nextNode=node.firstChild)&&(1==node.nodeType&&handler.end(node.nodeName.toLowerCase()),nextNode=node.nextSibling,!nextNode))for(;null==nextNode&&(node=node.parentNode,node!==inertBodyElement);)nextNode=node.nextSibling,1==node.nodeType&&handler.end(node.nodeName.toLowerCase());node=nextNode}for(;node=inertBodyElement.firstChild;)inertBodyElement.removeChild(node)}function attrToMap(attrs){for(var map={},i=0,ii=attrs.length;i<ii;i++){var attr=attrs[i];map[attr.name]=attr.value}return map}/**
   * Escapes all potentially dangerous characters, so that the
   * resulting string can be safely inserted into attribute or
   * element text.
   * @param value
   * @returns {string} escaped text
   */
function encodeEntities(value){return value.replace(/&/g,"&amp;").replace(SURROGATE_PAIR_REGEXP,function(value){var hi=value.charCodeAt(0),low=value.charCodeAt(1);return"&#"+(1024*(hi-55296)+(low-56320)+65536)+";"}).replace(NON_ALPHANUMERIC_REGEXP,function(value){return"&#"+value.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}/**
   * create an HTML/XML writer which writes to buffer
   * @param {Array} buf use buf.join('') to get out sanitized html string
   * @returns {object} in the form of {
   *     start: function(tag, attrs) {},
   *     end: function(tag) {},
   *     chars: function(text) {},
   *     comment: function(text) {}
   * }
   */
function htmlSanitizeWriterImpl(buf,uriValidator){var ignoreCurrentElement=!1,out=bind(buf,buf.push);return{start:function(tag,attrs){tag=lowercase(tag),!ignoreCurrentElement&&blockedElements[tag]&&(ignoreCurrentElement=tag),ignoreCurrentElement||validElements[tag]!==!0||(out("<"),out(tag),forEach(attrs,function(value,key){var lkey=lowercase(key),isImage="img"===tag&&"src"===lkey||"background"===lkey;validAttrs[lkey]!==!0||uriAttrs[lkey]===!0&&!uriValidator(value,isImage)||(out(" "),out(key),out('="'),out(encodeEntities(value)),out('"'))}),out(">"))},end:function(tag){tag=lowercase(tag),ignoreCurrentElement||validElements[tag]!==!0||voidElements[tag]===!0||(out("</"),out(tag),out(">")),tag==ignoreCurrentElement&&(ignoreCurrentElement=!1)},chars:function(chars){ignoreCurrentElement||out(encodeEntities(chars))}}}/**
   * When IE9-11 comes across an unknown namespaced attribute e.g. 'xlink:foo' it adds 'xmlns:ns1' attribute to declare
   * ns1 namespace and prefixes the attribute with 'ns1' (e.g. 'ns1:xlink:foo'). This is undesirable since we don't want
   * to allow any of these custom attributes. This method strips them all.
   *
   * @param node Root element to process
   */
function stripCustomNsAttrs(node){if(node.nodeType===window.Node.ELEMENT_NODE)for(var attrs=node.attributes,i=0,l=attrs.length;i<l;i++){var attrNode=attrs[i],attrName=attrNode.name.toLowerCase();"xmlns:ns1"!==attrName&&0!==attrName.lastIndexOf("ns1:",0)||(node.removeAttributeNode(attrNode),i--,l--)}var nextNode=node.firstChild;nextNode&&stripCustomNsAttrs(nextNode),nextNode=node.nextSibling,nextNode&&stripCustomNsAttrs(nextNode)}var svgEnabled=!1;this.$get=["$$sanitizeUri",function($$sanitizeUri){return svgEnabled&&extend(validElements,svgElements),function(html){var buf=[];return htmlParser(html,htmlSanitizeWriter(buf,function(uri,isImage){return!/^unsafe:/.test($$sanitizeUri(uri,isImage))})),buf.join("")}}],/**
   * @ngdoc method
   * @name $sanitizeProvider#enableSvg
   * @kind function
   *
   * @description
   * Enables a subset of svg to be supported by the sanitizer.
   *
   * <div class="alert alert-warning">
   *   <p>By enabling this setting without taking other precautions, you might expose your
   *   application to click-hijacking attacks. In these attacks, sanitized svg elements could be positioned
   *   outside of the containing element and be rendered over other elements on the page (e.g. a login
   *   link). Such behavior can then result in phishing incidents.</p>
   *
   *   <p>To protect against these, explicitly setup `overflow: hidden` css rule for all potential svg
   *   tags within the sanitized content:</p>
   *
   *   <br>
   *
   *   <pre><code>
   *   .rootOfTheIncludedContent svg {
   *     overflow: hidden !important;
   *   }
   *   </code></pre>
   * </div>
   *
   * @param {boolean=} flag Enable or disable SVG support in the sanitizer.
   * @returns {boolean|ng.$sanitizeProvider} Returns the currently configured value if called
   *    without an argument or self for chaining otherwise.
   */
this.enableSvg=function(enableSvg){return isDefined(enableSvg)?(svgEnabled=enableSvg,this):svgEnabled},
//////////////////////////////////////////////////////////////////////////////////////////////////
// Private stuff
//////////////////////////////////////////////////////////////////////////////////////////////////
bind=angular.bind,extend=angular.extend,forEach=angular.forEach,isDefined=angular.isDefined,lowercase=angular.lowercase,noop=angular.noop,htmlParser=htmlParserImpl,htmlSanitizeWriter=htmlSanitizeWriterImpl;
// Regular Expressions for parsing tags and attributes
var inertBodyElement,SURROGATE_PAIR_REGEXP=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
// Match everything outside of normal chars and " (quote character)
NON_ALPHANUMERIC_REGEXP=/([^\#-~ |!])/g,voidElements=toMap("area,br,col,hr,img,wbr"),optionalEndTagBlockElements=toMap("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),optionalEndTagInlineElements=toMap("rp,rt"),optionalEndTagElements=extend({},optionalEndTagInlineElements,optionalEndTagBlockElements),blockElements=extend({},optionalEndTagBlockElements,toMap("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,section,table,ul")),inlineElements=extend({},optionalEndTagInlineElements,toMap("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),svgElements=toMap("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan"),blockedElements=toMap("script,style"),validElements=extend({},voidElements,blockElements,inlineElements,optionalEndTagElements),uriAttrs=toMap("background,cite,href,longdesc,src,xlink:href"),htmlAttrs=toMap("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"),svgAttrs=toMap("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan",!0),validAttrs=extend({},uriAttrs,svgAttrs,htmlAttrs);!function(window){var doc;if(!window.document||!window.document.implementation)throw $sanitizeMinErr("noinert","Can't create an inert html document");doc=window.document.implementation.createHTMLDocument("inert");var docElement=doc.documentElement||doc.getDocumentElement(),bodyElements=docElement.getElementsByTagName("body");
// usually there should be only one body element in the document, but IE doesn't have any, so we need to create one
if(1===bodyElements.length)inertBodyElement=bodyElements[0];else{var html=doc.createElement("html");inertBodyElement=doc.createElement("body"),html.appendChild(inertBodyElement),doc.appendChild(html)}}(window)}function sanitizeText(chars){var buf=[],writer=htmlSanitizeWriter(buf,noop);return writer.chars(chars),buf.join("")}/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *     Any commits to this file should be reviewed with security in mind.  *
 *   Changes to this file can potentially create security vulnerabilities. *
 *          An approval from 2 Core members with history of modifying      *
 *                         this file is required.                          *
 *                                                                         *
 *  Does the change somehow allow for arbitrary javascript to be executed? *
 *    Or allows for someone to change the prototype of built-in objects?   *
 *     Or gives undesired access to variables likes document or window?    *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var bind,extend,forEach,isDefined,lowercase,noop,htmlParser,htmlSanitizeWriter,$sanitizeMinErr=angular.$$minErr("$sanitize");
// define ngSanitize module and register $sanitize service
angular.module("ngSanitize",[]).provider("$sanitize",$SanitizeProvider),/**
 * @ngdoc filter
 * @name linky
 * @kind function
 *
 * @description
 * Finds links in text input and turns them into html links. Supports `http/https/ftp/mailto` and
 * plain email address links.
 *
 * Requires the {@link ngSanitize `ngSanitize`} module to be installed.
 *
 * @param {string} text Input text.
 * @param {string} target Window (`_blank|_self|_parent|_top`) or named frame to open links in.
 * @param {object|function(url)} [attributes] Add custom attributes to the link element.
 *
 *    Can be one of:
 *
 *    - `object`: A map of attributes
 *    - `function`: Takes the url as a parameter and returns a map of attributes
 *
 *    If the map of attributes contains a value for `target`, it overrides the value of
 *    the target parameter.
 *
 *
 * @returns {string} Html-linkified and {@link $sanitize sanitized} text.
 *
 * @usage
   <span ng-bind-html="linky_expression | linky"></span>
 *
 * @example
   <example module="linkyExample" deps="angular-sanitize.js">
     <file name="index.html">
       <div ng-controller="ExampleController">
       Snippet: <textarea ng-model="snippet" cols="60" rows="3"></textarea>
       <table>
         <tr>
           <th>Filter</th>
           <th>Source</th>
           <th>Rendered</th>
         </tr>
         <tr id="linky-filter">
           <td>linky filter</td>
           <td>
             <pre>&lt;div ng-bind-html="snippet | linky"&gt;<br>&lt;/div&gt;</pre>
           </td>
           <td>
             <div ng-bind-html="snippet | linky"></div>
           </td>
         </tr>
         <tr id="linky-target">
          <td>linky target</td>
          <td>
            <pre>&lt;div ng-bind-html="snippetWithSingleURL | linky:'_blank'"&gt;<br>&lt;/div&gt;</pre>
          </td>
          <td>
            <div ng-bind-html="snippetWithSingleURL | linky:'_blank'"></div>
          </td>
         </tr>
         <tr id="linky-custom-attributes">
          <td>linky custom attributes</td>
          <td>
            <pre>&lt;div ng-bind-html="snippetWithSingleURL | linky:'_self':{rel: 'nofollow'}"&gt;<br>&lt;/div&gt;</pre>
          </td>
          <td>
            <div ng-bind-html="snippetWithSingleURL | linky:'_self':{rel: 'nofollow'}"></div>
          </td>
         </tr>
         <tr id="escaped-html">
           <td>no filter</td>
           <td><pre>&lt;div ng-bind="snippet"&gt;<br>&lt;/div&gt;</pre></td>
           <td><div ng-bind="snippet"></div></td>
         </tr>
       </table>
     </file>
     <file name="script.js">
       angular.module('linkyExample', ['ngSanitize'])
         .controller('ExampleController', ['$scope', function($scope) {
           $scope.snippet =
             'Pretty text with some links:\n'+
             'http://angularjs.org/,\n'+
             'mailto:us@somewhere.org,\n'+
             'another@somewhere.org,\n'+
             'and one more: ftp://127.0.0.1/.';
           $scope.snippetWithSingleURL = 'http://angularjs.org/';
         }]);
     </file>
     <file name="protractor.js" type="protractor">
       it('should linkify the snippet with urls', function() {
         expect(element(by.id('linky-filter')).element(by.binding('snippet | linky')).getText()).
             toBe('Pretty text with some links: http://angularjs.org/, us@somewhere.org, ' +
                  'another@somewhere.org, and one more: ftp://127.0.0.1/.');
         expect(element.all(by.css('#linky-filter a')).count()).toEqual(4);
       });

       it('should not linkify snippet without the linky filter', function() {
         expect(element(by.id('escaped-html')).element(by.binding('snippet')).getText()).
             toBe('Pretty text with some links: http://angularjs.org/, mailto:us@somewhere.org, ' +
                  'another@somewhere.org, and one more: ftp://127.0.0.1/.');
         expect(element.all(by.css('#escaped-html a')).count()).toEqual(0);
       });

       it('should update', function() {
         element(by.model('snippet')).clear();
         element(by.model('snippet')).sendKeys('new http://link.');
         expect(element(by.id('linky-filter')).element(by.binding('snippet | linky')).getText()).
             toBe('new http://link.');
         expect(element.all(by.css('#linky-filter a')).count()).toEqual(1);
         expect(element(by.id('escaped-html')).element(by.binding('snippet')).getText())
             .toBe('new http://link.');
       });

       it('should work with the target property', function() {
        expect(element(by.id('linky-target')).
            element(by.binding("snippetWithSingleURL | linky:'_blank'")).getText()).
            toBe('http://angularjs.org/');
        expect(element(by.css('#linky-target a')).getAttribute('target')).toEqual('_blank');
       });

       it('should optionally add custom attributes', function() {
        expect(element(by.id('linky-custom-attributes')).
            element(by.binding("snippetWithSingleURL | linky:'_self':{rel: 'nofollow'}")).getText()).
            toBe('http://angularjs.org/');
        expect(element(by.css('#linky-custom-attributes a')).getAttribute('rel')).toEqual('nofollow');
       });
     </file>
   </example>
 */
angular.module("ngSanitize").filter("linky",["$sanitize",function($sanitize){var LINKY_URL_REGEXP=/((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,MAILTO_REGEXP=/^mailto:/i,linkyMinErr=angular.$$minErr("linky"),isDefined=angular.isDefined,isFunction=angular.isFunction,isObject=angular.isObject,isString=angular.isString;return function(text,target,attributes){function addText(text){text&&html.push(sanitizeText(text))}function addLink(url,text){var key,linkAttributes=attributesFn(url);html.push("<a ");for(key in linkAttributes)html.push(key+'="'+linkAttributes[key]+'" ');!isDefined(target)||"target"in linkAttributes||html.push('target="',target,'" '),html.push('href="',url.replace(/"/g,"&quot;"),'">'),addText(text),html.push("</a>")}if(null==text||""===text)return text;if(!isString(text))throw linkyMinErr("notstring","Expected string but received: {0}",text);for(var match,url,i,attributesFn=isFunction(attributes)?attributes:isObject(attributes)?function(){return attributes}:function(){return{}},raw=text,html=[];match=raw.match(LINKY_URL_REGEXP);)
// We can not end in these as they are sometimes found at the end of the sentence
url=match[0],
// if we did not match ftp/http/www/mailto then assume mailto
match[2]||match[4]||(url=(match[3]?"http://":"mailto:")+url),i=match.index,addText(raw.substr(0,i)),addLink(url,match[0].replace(MAILTO_REGEXP,"")),raw=raw.substring(i+match[0].length);return addText(raw),$sanitize(html.join(""))}}])}(window,window.angular),/**
 * @license AngularJS v1.5.8
 * (c) 2010-2016 Google, Inc. http://angularjs.org
 * License: MIT
 */
function(window,angular){"use strict";function nodeName_(element){return angular.lowercase(element.nodeName||element[0]&&element[0].nodeName)}function $TouchProvider($provide,$compileProvider){/**
   * @ngdoc method
   * @name  $touchProvider#ngClickOverrideEnabled
   *
   * @param {boolean=} enabled update the ngClickOverrideEnabled state if provided, otherwise just return the
   * current ngClickOverrideEnabled state
   * @returns {*} current value if used as getter or itself (chaining) if used as setter
   *
   * @kind function
   *
   * @description
   * Call this method to enable/disable {@link ngTouch.ngClick ngTouch's ngClick directive}. If enabled,
   * the default ngClick directive will be replaced by a version that eliminates the 300ms delay for
   * click events on browser for touch-devices.
   *
   * The default is `false`.
   *
   */
var ngClickOverrideEnabled=!1,ngClickDirectiveAdded=!1;this.ngClickOverrideEnabled=function(enabled){
// Use this to identify the correct directive in the delegate
return angular.isDefined(enabled)?(enabled&&!ngClickDirectiveAdded&&(ngClickDirectiveAdded=!0,ngTouchClickDirectiveFactory.$$moduleName="ngTouch",$compileProvider.directive("ngClick",ngTouchClickDirectiveFactory),$provide.decorator("ngClickDirective",["$delegate",function($delegate){if(ngClickOverrideEnabled)
// drop the default ngClick directive
$delegate.shift();else for(
// drop the ngTouch ngClick directive if the override has been re-disabled (because
// we cannot de-register added directives)
var i=$delegate.length-1;i>=0;){if("ngTouch"===$delegate[i].$$moduleName){$delegate.splice(i,1);break}i--}return $delegate}])),ngClickOverrideEnabled=enabled,this):ngClickOverrideEnabled},/**
  * @ngdoc service
  * @name $touch
  * @kind object
  *
  * @description
  * Provides the {@link ngTouch.$touch#ngClickOverrideEnabled `ngClickOverrideEnabled`} method.
  *
  */
this.$get=function(){return{/**
       * @ngdoc method
       * @name  $touch#ngClickOverrideEnabled
       *
       * @returns {*} current value of `ngClickOverrideEnabled` set in the {@link ngTouch.$touchProvider $touchProvider},
       * i.e. if {@link ngTouch.ngClick ngTouch's ngClick} directive is enabled.
       *
       * @kind function
       */
ngClickOverrideEnabled:function(){return ngClickOverrideEnabled}}}}/* global ngTouch: false */
/**
 * @ngdoc directive
 * @name ngSwipeLeft
 *
 * @description
 * Specify custom behavior when an element is swiped to the left on a touchscreen device.
 * A leftward swipe is a quick, right-to-left slide of the finger.
 * Though ngSwipeLeft is designed for touch-based devices, it will work with a mouse click and drag
 * too.
 *
 * To disable the mouse click and drag functionality, add `ng-swipe-disable-mouse` to
 * the `ng-swipe-left` or `ng-swipe-right` DOM Element.
 *
 * Requires the {@link ngTouch `ngTouch`} module to be installed.
 *
 * @element ANY
 * @param {expression} ngSwipeLeft {@link guide/expression Expression} to evaluate
 * upon left swipe. (Event object is available as `$event`)
 *
 * @example
    <example module="ngSwipeLeftExample" deps="angular-touch.js">
      <file name="index.html">
        <div ng-show="!showActions" ng-swipe-left="showActions = true">
          Some list content, like an email in the inbox
        </div>
        <div ng-show="showActions" ng-swipe-right="showActions = false">
          <button ng-click="reply()">Reply</button>
          <button ng-click="delete()">Delete</button>
        </div>
      </file>
      <file name="script.js">
        angular.module('ngSwipeLeftExample', ['ngTouch']);
      </file>
    </example>
 */
/**
 * @ngdoc directive
 * @name ngSwipeRight
 *
 * @description
 * Specify custom behavior when an element is swiped to the right on a touchscreen device.
 * A rightward swipe is a quick, left-to-right slide of the finger.
 * Though ngSwipeRight is designed for touch-based devices, it will work with a mouse click and drag
 * too.
 *
 * Requires the {@link ngTouch `ngTouch`} module to be installed.
 *
 * @element ANY
 * @param {expression} ngSwipeRight {@link guide/expression Expression} to evaluate
 * upon right swipe. (Event object is available as `$event`)
 *
 * @example
    <example module="ngSwipeRightExample" deps="angular-touch.js">
      <file name="index.html">
        <div ng-show="!showActions" ng-swipe-left="showActions = true">
          Some list content, like an email in the inbox
        </div>
        <div ng-show="showActions" ng-swipe-right="showActions = false">
          <button ng-click="reply()">Reply</button>
          <button ng-click="delete()">Delete</button>
        </div>
      </file>
      <file name="script.js">
        angular.module('ngSwipeRightExample', ['ngTouch']);
      </file>
    </example>
 */
function makeSwipeDirective(directiveName,direction,eventName){ngTouch.directive(directiveName,["$parse","$swipe",function($parse,$swipe){
// The maximum vertical delta for a swipe should be less than 75px.
var MAX_VERTICAL_DISTANCE=75,MAX_VERTICAL_RATIO=.3,MIN_HORIZONTAL_DISTANCE=30;return function(scope,element,attr){function validSwipe(coords){
// Check that it's within the coordinates.
// Absolute vertical distance must be within tolerances.
// Horizontal distance, we take the current X - the starting X.
// This is negative for leftward swipes and positive for rightward swipes.
// After multiplying by the direction (-1 for left, +1 for right), legal swipes
// (ie. same direction as the directive wants) will have a positive delta and
// illegal ones a negative delta.
// Therefore this delta must be positive, and larger than the minimum.
if(!startCoords)return!1;var deltaY=Math.abs(coords.y-startCoords.y),deltaX=(coords.x-startCoords.x)*direction;// Short circuit for already-invalidated swipes.
return valid&&deltaY<MAX_VERTICAL_DISTANCE&&deltaX>0&&deltaX>MIN_HORIZONTAL_DISTANCE&&deltaY/deltaX<MAX_VERTICAL_RATIO}var startCoords,valid,swipeHandler=$parse(attr[directiveName]),pointerTypes=["touch"];angular.isDefined(attr.ngSwipeDisableMouse)||pointerTypes.push("mouse"),$swipe.bind(element,{start:function(coords,event){startCoords=coords,valid=!0},cancel:function(event){valid=!1},end:function(coords,event){validSwipe(coords)&&scope.$apply(function(){element.triggerHandler(eventName),swipeHandler(scope,{$event:event})})}},pointerTypes)}}])}/* global ngTouchClickDirectiveFactory: false,
 */
/**
 * @ngdoc module
 * @name ngTouch
 * @description
 *
 * # ngTouch
 *
 * The `ngTouch` module provides touch events and other helpers for touch-enabled devices.
 * The implementation is based on jQuery Mobile touch event handling
 * ([jquerymobile.com](http://jquerymobile.com/)).
 *
 *
 * See {@link ngTouch.$swipe `$swipe`} for usage.
 *
 * <div doc-module-components="ngTouch"></div>
 *
 */
// define ngTouch module
/* global -ngTouch */
var ngTouch=angular.module("ngTouch",[]);ngTouch.provider("$touch",$TouchProvider),/**
 * @ngdoc provider
 * @name $touchProvider
 *
 * @description
 * The `$touchProvider` allows enabling / disabling {@link ngTouch.ngClick ngTouch's ngClick directive}.
 */
$TouchProvider.$inject=["$provide","$compileProvider"],/* global ngTouch: false */
/**
     * @ngdoc service
     * @name $swipe
     *
     * @description
     * The `$swipe` service is a service that abstracts the messier details of hold-and-drag swipe
     * behavior, to make implementing swipe-related directives more convenient.
     *
     * Requires the {@link ngTouch `ngTouch`} module to be installed.
     *
     * `$swipe` is used by the `ngSwipeLeft` and `ngSwipeRight` directives in `ngTouch`.
     *
     * # Usage
     * The `$swipe` service is an object with a single method: `bind`. `bind` takes an element
     * which is to be watched for swipes, and an object with four handler functions. See the
     * documentation for `bind` below.
     */
ngTouch.factory("$swipe",[function(){function getCoordinates(event){var originalEvent=event.originalEvent||event,touches=originalEvent.touches&&originalEvent.touches.length?originalEvent.touches:[originalEvent],e=originalEvent.changedTouches&&originalEvent.changedTouches[0]||touches[0];return{x:e.clientX,y:e.clientY}}function getEvents(pointerTypes,eventType){var res=[];return angular.forEach(pointerTypes,function(pointerType){var eventName=POINTER_EVENTS[pointerType][eventType];eventName&&res.push(eventName)}),res.join(" ")}
// The total distance in any direction before we make the call on swipe vs. scroll.
var MOVE_BUFFER_RADIUS=10,POINTER_EVENTS={mouse:{start:"mousedown",move:"mousemove",end:"mouseup"},touch:{start:"touchstart",move:"touchmove",end:"touchend",cancel:"touchcancel"},pointer:{start:"pointerdown",move:"pointermove",end:"pointerup",cancel:"pointercancel"}};return{/**
     * @ngdoc method
     * @name $swipe#bind
     *
     * @description
     * The main method of `$swipe`. It takes an element to be watched for swipe motions, and an
     * object containing event handlers.
     * The pointer types that should be used can be specified via the optional
     * third argument, which is an array of strings `'mouse'`, `'touch'` and `'pointer'`. By default,
     * `$swipe` will listen for `mouse`, `touch` and `pointer` events.
     *
     * The four events are `start`, `move`, `end`, and `cancel`. `start`, `move`, and `end`
     * receive as a parameter a coordinates object of the form `{ x: 150, y: 310 }` and the raw
     * `event`. `cancel` receives the raw `event` as its single parameter.
     *
     * `start` is called on either `mousedown`, `touchstart` or `pointerdown`. After this event, `$swipe` is
     * watching for `touchmove`, `mousemove` or `pointermove` events. These events are ignored until the total
     * distance moved in either dimension exceeds a small threshold.
     *
     * Once this threshold is exceeded, either the horizontal or vertical delta is greater.
     * - If the horizontal distance is greater, this is a swipe and `move` and `end` events follow.
     * - If the vertical distance is greater, this is a scroll, and we let the browser take over.
     *   A `cancel` event is sent.
     *
     * `move` is called on `mousemove`, `touchmove` and `pointermove` after the above logic has determined that
     * a swipe is in progress.
     *
     * `end` is called when a swipe is successfully completed with a `touchend`, `mouseup` or `pointerup`.
     *
     * `cancel` is called either on a `touchcancel` or `pointercancel`  from the browser, or when we begin scrolling
     * as described above.
     *
     */
bind:function(element,eventHandlers,pointerTypes){
// Absolute total movement, used to control swipe vs. scroll.
var totalX,totalY,startCoords,lastPos,active=!1;pointerTypes=pointerTypes||["mouse","touch","pointer"],element.on(getEvents(pointerTypes,"start"),function(event){startCoords=getCoordinates(event),active=!0,totalX=0,totalY=0,lastPos=startCoords,eventHandlers.start&&eventHandlers.start(startCoords,event)});var events=getEvents(pointerTypes,"cancel");events&&element.on(events,function(event){active=!1,eventHandlers.cancel&&eventHandlers.cancel(event)}),element.on(getEvents(pointerTypes,"move"),function(event){if(active&&startCoords)
// Android will send a touchcancel if it thinks we're starting to scroll.
// So when the total distance (+ or - or both) exceeds 10px in either direction,
// we either:
// - On totalX > totalY, we send preventDefault() and treat this as a swipe.
// - On totalY > totalX, we let the browser handle it as a scroll.
{var coords=getCoordinates(event);if(totalX+=Math.abs(coords.x-lastPos.x),totalY+=Math.abs(coords.y-lastPos.y),lastPos=coords,!(totalX<MOVE_BUFFER_RADIUS&&totalY<MOVE_BUFFER_RADIUS))
// One of totalX or totalY has exceeded the buffer, so decide on swipe vs. scroll.
// One of totalX or totalY has exceeded the buffer, so decide on swipe vs. scroll.
// Allow native scrolling to take over.
// Prevent the browser from scrolling.
return totalY>totalX?(active=!1,void(eventHandlers.cancel&&eventHandlers.cancel(event))):(event.preventDefault(),void(eventHandlers.move&&eventHandlers.move(coords,event)))}}),element.on(getEvents(pointerTypes,"end"),function(event){active&&(active=!1,eventHandlers.end&&eventHandlers.end(getCoordinates(event),event))})}}}]);/* global ngTouch: false,
  nodeName_: false
*/
/**
 * @ngdoc directive
 * @name ngClick
 * @deprecated
 *
 * @description
 * <div class="alert alert-danger">
 * **DEPRECATION NOTICE**: Beginning with Angular 1.5, this directive is deprecated and by default **disabled**.
 * The directive will receive no further support and might be removed from future releases.
 * If you need the directive, you can enable it with the {@link ngTouch.$touchProvider $touchProvider#ngClickOverrideEnabled}
 * function. We also recommend that you migrate to [FastClick](https://github.com/ftlabs/fastclick).
 * To learn more about the 300ms delay, this [Telerik article](http://developer.telerik.com/featured/300-ms-click-delay-ios-8/)
 * gives a good overview.
 * </div>
 * A more powerful replacement for the default ngClick designed to be used on touchscreen
 * devices. Most mobile browsers wait about 300ms after a tap-and-release before sending
 * the click event. This version handles them immediately, and then prevents the
 * following click event from propagating.
 *
 * Requires the {@link ngTouch `ngTouch`} module to be installed.
 *
 * This directive can fall back to using an ordinary click event, and so works on desktop
 * browsers as well as mobile.
 *
 * This directive also sets the CSS class `ng-click-active` while the element is being held
 * down (by a mouse click or touch) so you can restyle the depressed element if you wish.
 *
 * @element ANY
 * @param {expression} ngClick {@link guide/expression Expression} to evaluate
 * upon tap. (Event object is available as `$event`)
 *
 * @example
    <example module="ngClickExample" deps="angular-touch.js">
      <file name="index.html">
        <button ng-click="count = count + 1" ng-init="count=0">
          Increment
        </button>
        count: {{ count }}
      </file>
      <file name="script.js">
        angular.module('ngClickExample', ['ngTouch']);
      </file>
    </example>
 */
var ngTouchClickDirectiveFactory=["$parse","$timeout","$rootElement",function($parse,$timeout,$rootElement){
// TAP EVENTS AND GHOST CLICKS
//
// Why tap events?
// Mobile browsers detect a tap, then wait a moment (usually ~300ms) to see if you're
// double-tapping, and then fire a click event.
//
// This delay sucks and makes mobile apps feel unresponsive.
// So we detect touchstart, touchcancel and touchend ourselves and determine when
// the user has tapped on something.
//
// What happens when the browser then generates a click event?
// The browser, of course, also detects the tap and fires a click after a delay. This results in
// tapping/clicking twice. We do "clickbusting" to prevent it.
//
// How does it work?
// We attach global touchstart and click handlers, that run during the capture (early) phase.
// So the sequence for a tap is:
// - global touchstart: Sets an "allowable region" at the point touched.
// - element's touchstart: Starts a touch
// (- touchcancel ends the touch, no click follows)
// - element's touchend: Determines if the tap is valid (didn't move too far away, didn't hold
//   too long) and fires the user's tap handler. The touchend also calls preventGhostClick().
// - preventGhostClick() removes the allowable region the global touchstart created.
// - The browser generates a click event.
// - The global click handler catches the click, and checks whether it was in an allowable region.
//     - If preventGhostClick was called, the region will have been removed, the click is busted.
//     - If the region is still there, the click proceeds normally. Therefore clicks on links and
//       other elements without ngTap on them work normally.
//
// This is an ugly, terrible hack!
// Yeah, tell me about it. The alternatives are using the slow click events, or making our users
// deal with the ghost clicks, so I consider this the least of evils. Fortunately Angular
// encapsulates this ugly logic away from the user.
//
// Why not just put click handlers on the element?
// We do that too, just to be sure. If the tap event caused the DOM to change,
// it is possible another element is now in that position. To take account for these possibly
// distinct elements, the handlers are global and care only about coordinates.
// Checks if the coordinates are close enough to be within the region.
function hit(x1,y1,x2,y2){return Math.abs(x1-x2)<CLICKBUSTER_THRESHOLD&&Math.abs(y1-y2)<CLICKBUSTER_THRESHOLD}
// Checks a list of allowable regions against a click location.
// Returns true if the click should be allowed.
// Splices out the allowable region from the list after it has been used.
function checkAllowableRegions(touchCoordinates,x,y){for(var i=0;i<touchCoordinates.length;i+=2)if(hit(touchCoordinates[i],touchCoordinates[i+1],x,y))return touchCoordinates.splice(i,i+2),!0;return!1}
// Global click handler that prevents the click if it's in a bustable zone and preventGhostClick
// was called recently.
function onClick(event){if(!(Date.now()-lastPreventedTime>PREVENT_DURATION)){var touches=event.touches&&event.touches.length?event.touches:[event],x=touches[0].clientX,y=touches[0].clientY;
// Work around desktop Webkit quirk where clicking a label will fire two clicks (on the label
// and on the input element). Depending on the exact browser, this second click we don't want
// to bust has either (0,0), negative coordinates, or coordinates equal to triggering label
// click event
x<1&&y<1||lastLabelClickCoordinates&&lastLabelClickCoordinates[0]===x&&lastLabelClickCoordinates[1]===y||(
// reset label click coordinates on first subsequent click
lastLabelClickCoordinates&&(lastLabelClickCoordinates=null),
// remember label click coordinates to prevent click busting of trigger click event on input
"label"===nodeName_(event.target)&&(lastLabelClickCoordinates=[x,y]),
// Look for an allowable region containing this click.
// If we find one, that means it was created by touchstart and not removed by
// preventGhostClick, so we don't bust it.
checkAllowableRegions(touchCoordinates,x,y)||(
// If we didn't find an allowable region, bust the click.
event.stopPropagation(),event.preventDefault(),
// Blur focused form elements
event.target&&event.target.blur&&event.target.blur()))}}
// Global touchstart handler that creates an allowable region for a click event.
// This allowable region can be removed by preventGhostClick if we want to bust it.
function onTouchStart(event){var touches=event.touches&&event.touches.length?event.touches:[event],x=touches[0].clientX,y=touches[0].clientY;touchCoordinates.push(x,y),$timeout(function(){
// Remove the allowable region.
for(var i=0;i<touchCoordinates.length;i+=2)if(touchCoordinates[i]==x&&touchCoordinates[i+1]==y)return void touchCoordinates.splice(i,i+2)},PREVENT_DURATION,!1)}
// On the first call, attaches some event handlers. Then whenever it gets called, it creates a
// zone around the touchstart where clicks will get busted.
function preventGhostClick(x,y){touchCoordinates||($rootElement[0].addEventListener("click",onClick,!0),$rootElement[0].addEventListener("touchstart",onTouchStart,!0),touchCoordinates=[]),lastPreventedTime=Date.now(),checkAllowableRegions(touchCoordinates,x,y)}var lastPreventedTime,touchCoordinates,lastLabelClickCoordinates,TAP_DURATION=750,MOVE_TOLERANCE=12,PREVENT_DURATION=2500,CLICKBUSTER_THRESHOLD=25,ACTIVE_CLASS_NAME="ng-click-active";
// Actual linking function.
return function(scope,element,attr){function resetState(){tapping=!1,element.removeClass(ACTIVE_CLASS_NAME)}var tapElement,// Used to blur the element after a tap.
startTime,// Used to check if the tap was held too long.
touchStartX,touchStartY,clickHandler=$parse(attr.ngClick),tapping=!1;element.on("touchstart",function(event){tapping=!0,tapElement=event.target?event.target:event.srcElement,// IE uses srcElement.
// Hack for Safari, which can target text nodes instead of containers.
3==tapElement.nodeType&&(tapElement=tapElement.parentNode),element.addClass(ACTIVE_CLASS_NAME),startTime=Date.now();
// Use jQuery originalEvent
var originalEvent=event.originalEvent||event,touches=originalEvent.touches&&originalEvent.touches.length?originalEvent.touches:[originalEvent],e=touches[0];touchStartX=e.clientX,touchStartY=e.clientY}),element.on("touchcancel",function(event){resetState()}),element.on("touchend",function(event){var diff=Date.now()-startTime,originalEvent=event.originalEvent||event,touches=originalEvent.changedTouches&&originalEvent.changedTouches.length?originalEvent.changedTouches:originalEvent.touches&&originalEvent.touches.length?originalEvent.touches:[originalEvent],e=touches[0],x=e.clientX,y=e.clientY,dist=Math.sqrt(Math.pow(x-touchStartX,2)+Math.pow(y-touchStartY,2));tapping&&diff<TAP_DURATION&&dist<MOVE_TOLERANCE&&(
// Call preventGhostClick so the clickbuster will catch the corresponding click.
preventGhostClick(x,y),
// Blur the focused element (the button, probably) before firing the callback.
// This doesn't work perfectly on Android Chrome, but seems to work elsewhere.
// I couldn't get anything to work reliably on Android Chrome.
tapElement&&tapElement.blur(),angular.isDefined(attr.disabled)&&attr.disabled!==!1||element.triggerHandler("click",[event])),resetState()}),
// Hack for iOS Safari's benefit. It goes searching for onclick handlers and is liable to click
// something else nearby.
element.onclick=function(event){},
// Actual click handler.
// There are three different kinds of clicks, only two of which reach this point.
// - On desktop browsers without touch events, their clicks will always come here.
// - On mobile browsers, the simulated "fast" click will call this.
// - But the browser's follow-up slow click will be "busted" before it reaches this handler.
// Therefore it's safe to use this directive on both mobile and desktop.
element.on("click",function(event,touchend){scope.$apply(function(){clickHandler(scope,{$event:touchend||event})})}),element.on("mousedown",function(event){element.addClass(ACTIVE_CLASS_NAME)}),element.on("mousemove mouseup",function(event){element.removeClass(ACTIVE_CLASS_NAME)})}}];
// Left is negative X-coordinate, right is positive.
makeSwipeDirective("ngSwipeLeft",-1,"swipeleft"),makeSwipeDirective("ngSwipeRight",1,"swiperight")}(window,window.angular);