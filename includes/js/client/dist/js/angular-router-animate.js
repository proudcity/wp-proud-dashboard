/**
 * State-based routing for AngularJS
 * @version v0.2.15
 * @link http://angular-ui.github.com/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
/* commonjs package manager support (eg componentjs) */
"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="ui.router"),function(window,angular,undefined){/*jshint globalstrict:true*/
/*global angular:false*/
"use strict";function inherit(parent,extra){return extend(new(extend(function(){},{prototype:parent})),extra)}function merge(dst){return forEach(arguments,function(obj){obj!==dst&&forEach(obj,function(value,key){dst.hasOwnProperty(key)||(dst[key]=value)})}),dst}/**
 * Finds the common ancestor path between two states.
 *
 * @param {Object} first The first state.
 * @param {Object} second The second state.
 * @return {Array} Returns an array of state names in descending order, not including the root.
 */
function ancestors(first,second){var path=[];for(var n in first.path){if(first.path[n]!==second.path[n])break;path.push(first.path[n])}return path}/**
 * IE8-safe wrapper for `Object.keys()`.
 *
 * @param {Object} object A JavaScript object.
 * @return {Array} Returns the keys of the object as an array.
 */
function objectKeys(object){if(Object.keys)return Object.keys(object);var result=[];return forEach(object,function(val,key){result.push(key)}),result}/**
 * IE8-safe wrapper for `Array.prototype.indexOf()`.
 *
 * @param {Array} array A JavaScript array.
 * @param {*} value A value to search the array for.
 * @return {Number} Returns the array index value of `value`, or `-1` if not present.
 */
function indexOf(array,value){if(Array.prototype.indexOf)return array.indexOf(value,Number(arguments[2])||0);var len=array.length>>>0,from=Number(arguments[2])||0;for(from=from<0?Math.ceil(from):Math.floor(from),from<0&&(from+=len);from<len;from++)if(from in array&&array[from]===value)return from;return-1}/**
 * Merges a set of parameters with all parameters inherited between the common parents of the
 * current state and a given destination state.
 *
 * @param {Object} currentParams The value of the current state parameters ($stateParams).
 * @param {Object} newParams The set of parameters which will be composited with inherited params.
 * @param {Object} $current Internal definition of object representing the current state.
 * @param {Object} $to Internal definition of object representing state to transition to.
 */
function inheritParams(currentParams,newParams,$current,$to){var parentParams,parents=ancestors($current,$to),inherited={},inheritList=[];for(var i in parents)if(parents[i].params&&(parentParams=objectKeys(parents[i].params),parentParams.length))for(var j in parentParams)indexOf(inheritList,parentParams[j])>=0||(inheritList.push(parentParams[j]),inherited[parentParams[j]]=currentParams[parentParams[j]]);return extend({},inherited,newParams)}/**
 * Performs a non-strict comparison of the subset of two objects, defined by a list of keys.
 *
 * @param {Object} a The first object.
 * @param {Object} b The second object.
 * @param {Array} keys The list of keys within each object to compare. If the list is empty or not specified,
 *                     it defaults to the list of keys in `a`.
 * @return {Boolean} Returns `true` if the keys match, otherwise `false`.
 */
function equalForKeys(a,b,keys){if(!keys){keys=[];for(var n in a)keys.push(n)}for(var i=0;i<keys.length;i++){var k=keys[i];if(a[k]!=b[k])return!1}return!0}/**
 * Returns the subset of an object, based on a list of keys.
 *
 * @param {Array} keys
 * @param {Object} values
 * @return {Boolean} Returns a subset of `values`.
 */
function filterByKeys(keys,values){var filtered={};return forEach(keys,function(name){filtered[name]=values[name]}),filtered}
// extracted from underscore.js
// Return a copy of the object only containing the whitelisted properties.
function pick(obj){var copy={},keys=Array.prototype.concat.apply(Array.prototype,Array.prototype.slice.call(arguments,1));return forEach(keys,function(key){key in obj&&(copy[key]=obj[key])}),copy}
// extracted from underscore.js
// Return a copy of the object omitting the blacklisted properties.
function omit(obj){var copy={},keys=Array.prototype.concat.apply(Array.prototype,Array.prototype.slice.call(arguments,1));for(var key in obj)indexOf(keys,key)==-1&&(copy[key]=obj[key]);return copy}function filter(collection,callback){var array=isArray(collection),result=array?[]:{};return forEach(collection,function(val,i){callback(val,i)&&(result[array?result.length:i]=val)}),result}function map(collection,callback){var result=isArray(collection)?[]:{};return forEach(collection,function(val,i){result[i]=callback(val,i)}),result}function $Resolve($q,$injector){var VISIT_IN_PROGRESS=1,VISIT_DONE=2,NOTHING={},NO_DEPENDENCIES=[],NO_LOCALS=NOTHING,NO_PARENT=extend($q.when(NOTHING),{$$promises:NOTHING,$$values:NOTHING});/**
   * @ngdoc function
   * @name ui.router.util.$resolve#study
   * @methodOf ui.router.util.$resolve
   *
   * @description
   * Studies a set of invocables that are likely to be used multiple times.
   * <pre>
   * $resolve.study(invocables)(locals, parent, self)
   * </pre>
   * is equivalent to
   * <pre>
   * $resolve.resolve(invocables, locals, parent, self)
   * </pre>
   * but the former is more efficient (in fact `resolve` just calls `study` 
   * internally).
   *
   * @param {object} invocables Invocable objects
   * @return {function} a function to pass in locals, parent and self
   */
this.study=function(invocables){function visit(value,key){if(visited[key]!==VISIT_DONE){if(cycle.push(key),visited[key]===VISIT_IN_PROGRESS)throw cycle.splice(0,indexOf(cycle,key)),new Error("Cyclic dependency: "+cycle.join(" -> "));if(visited[key]=VISIT_IN_PROGRESS,isString(value))plan.push(key,[function(){return $injector.get(value)}],NO_DEPENDENCIES);else{var params=$injector.annotate(value);forEach(params,function(param){param!==key&&invocables.hasOwnProperty(param)&&visit(invocables[param],param)}),plan.push(key,value,params)}cycle.pop(),visited[key]=VISIT_DONE}}// plan is all that's required
function isResolve(value){return isObject(value)&&value.then&&value.$$promises}if(!isObject(invocables))throw new Error("'invocables' must be an object");var invocableKeys=objectKeys(invocables||{}),plan=[],cycle=[],visited={};return forEach(invocables,visit),invocables=cycle=visited=null,function(locals,parent,self){function done(){
// Merge parent values we haven't got yet and publish our own $$values
--wait||(merged||merge(values,parent.$$values),result.$$values=values,result.$$promises=result.$$promises||!0,// keep for isResolve()
delete result.$$inheritedValues,resolution.resolve(values))}function fail(reason){result.$$failure=reason,resolution.reject(reason)}function invoke(key,invocable,params){function onfailure(reason){invocation.reject(reason),fail(reason)}function proceed(){if(!isDefined(result.$$failure))try{invocation.resolve($injector.invoke(invocable,self,values)),invocation.promise.then(function(result){values[key]=result,done()},onfailure)}catch(e){onfailure(e)}}
// Create a deferred for this invocation. Failures will propagate to the resolution as well.
var invocation=$q.defer(),waitParams=0;
// Wait for any parameter that we have a promise for (either from parent or from this
// resolve; in that case study() will have made sure it's ordered before us in the plan).
forEach(params,function(dep){promises.hasOwnProperty(dep)&&!locals.hasOwnProperty(dep)&&(waitParams++,promises[dep].then(function(result){values[dep]=result,--waitParams||proceed()},onfailure))}),waitParams||proceed(),
// Publish promise synchronously; invocations further down in the plan may depend on it.
promises[key]=invocation.promise}if(isResolve(locals)&&self===undefined&&(self=parent,parent=locals,locals=null),locals){if(!isObject(locals))throw new Error("'locals' must be an object")}else locals=NO_LOCALS;if(parent){if(!isResolve(parent))throw new Error("'parent' must be a promise returned by $resolve.resolve()")}else parent=NO_PARENT;
// To complete the overall resolution, we have to wait for the parent
// promise and for the promise for each invokable in our plan.
var resolution=$q.defer(),result=resolution.promise,promises=result.$$promises={},values=extend({},locals),wait=1+plan.length/3,merged=!1;
// Short-circuit if parent has already failed
if(isDefined(parent.$$failure))return fail(parent.$$failure),result;parent.$$inheritedValues&&merge(values,omit(parent.$$inheritedValues,invocableKeys)),
// Merge parent values if the parent has already resolved, or merge
// parent promises and wait if the parent resolve is still in progress.
extend(promises,parent.$$promises),parent.$$values?(merged=merge(values,omit(parent.$$values,invocableKeys)),result.$$inheritedValues=omit(parent.$$values,invocableKeys),done()):(parent.$$inheritedValues&&(result.$$inheritedValues=omit(parent.$$inheritedValues,invocableKeys)),parent.then(done,fail));
// Process each invocable in the plan, but ignore any where a local of the same name exists.
for(var i=0,ii=plan.length;i<ii;i+=3)locals.hasOwnProperty(plan[i])?done():invoke(plan[i],plan[i+1],plan[i+2]);return result}},/**
   * @ngdoc function
   * @name ui.router.util.$resolve#resolve
   * @methodOf ui.router.util.$resolve
   *
   * @description
   * Resolves a set of invocables. An invocable is a function to be invoked via 
   * `$injector.invoke()`, and can have an arbitrary number of dependencies. 
   * An invocable can either return a value directly,
   * or a `$q` promise. If a promise is returned it will be resolved and the 
   * resulting value will be used instead. Dependencies of invocables are resolved 
   * (in this order of precedence)
   *
   * - from the specified `locals`
   * - from another invocable that is part of this `$resolve` call
   * - from an invocable that is inherited from a `parent` call to `$resolve` 
   *   (or recursively
   * - from any ancestor `$resolve` of that parent).
   *
   * The return value of `$resolve` is a promise for an object that contains 
   * (in this order of precedence)
   *
   * - any `locals` (if specified)
   * - the resolved return values of all injectables
   * - any values inherited from a `parent` call to `$resolve` (if specified)
   *
   * The promise will resolve after the `parent` promise (if any) and all promises 
   * returned by injectables have been resolved. If any invocable 
   * (or `$injector.invoke`) throws an exception, or if a promise returned by an 
   * invocable is rejected, the `$resolve` promise is immediately rejected with the 
   * same error. A rejection of a `parent` promise (if specified) will likewise be 
   * propagated immediately. Once the `$resolve` promise has been rejected, no 
   * further invocables will be called.
   * 
   * Cyclic dependencies between invocables are not permitted and will caues `$resolve`
   * to throw an error. As a special case, an injectable can depend on a parameter 
   * with the same name as the injectable, which will be fulfilled from the `parent` 
   * injectable of the same name. This allows inherited values to be decorated. 
   * Note that in this case any other injectable in the same `$resolve` with the same
   * dependency would see the decorated value, not the inherited value.
   *
   * Note that missing dependencies -- unlike cyclic dependencies -- will cause an 
   * (asynchronous) rejection of the `$resolve` promise rather than a (synchronous) 
   * exception.
   *
   * Invocables are invoked eagerly as soon as all dependencies are available. 
   * This is true even for dependencies inherited from a `parent` call to `$resolve`.
   *
   * As a special case, an invocable can be a string, in which case it is taken to 
   * be a service name to be passed to `$injector.get()`. This is supported primarily 
   * for backwards-compatibility with the `resolve` property of `$routeProvider` 
   * routes.
   *
   * @param {object} invocables functions to invoke or 
   * `$injector` services to fetch.
   * @param {object} locals  values to make available to the injectables
   * @param {object} parent  a promise returned by another call to `$resolve`.
   * @param {object} self  the `this` for the invoked methods
   * @return {object} Promise for an object that contains the resolved return value
   * of all invocables, as well as any inherited and local values.
   */
this.resolve=function(invocables,locals,parent,self){return this.study(invocables)(locals,parent,self)}}function $TemplateFactory($http,$templateCache,$injector){/**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromConfig
   * @methodOf ui.router.util.$templateFactory
   *
   * @description
   * Creates a template from a configuration object. 
   *
   * @param {object} config Configuration object for which to load a template. 
   * The following properties are search in the specified order, and the first one 
   * that is defined is used to create the template:
   *
   * @param {string|object} config.template html string template or function to 
   * load via {@link ui.router.util.$templateFactory#fromString fromString}.
   * @param {string|object} config.templateUrl url to load or a function returning 
   * the url to load via {@link ui.router.util.$templateFactory#fromUrl fromUrl}.
   * @param {Function} config.templateProvider function to invoke via 
   * {@link ui.router.util.$templateFactory#fromProvider fromProvider}.
   * @param {object} params  Parameters to pass to the template function.
   * @param {object} locals Locals to pass to `invoke` if the template is loaded 
   * via a `templateProvider`. Defaults to `{ params: params }`.
   *
   * @return {string|object}  The template html as a string, or a promise for 
   * that string,or `null` if no template is configured.
   */
this.fromConfig=function(config,params,locals){return isDefined(config.template)?this.fromString(config.template,params):isDefined(config.templateUrl)?this.fromUrl(config.templateUrl,params):isDefined(config.templateProvider)?this.fromProvider(config.templateProvider,params,locals):null},/**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromString
   * @methodOf ui.router.util.$templateFactory
   *
   * @description
   * Creates a template from a string or a function returning a string.
   *
   * @param {string|object} template html template as a string or function that 
   * returns an html template as a string.
   * @param {object} params Parameters to pass to the template function.
   *
   * @return {string|object} The template html as a string, or a promise for that 
   * string.
   */
this.fromString=function(template,params){return isFunction(template)?template(params):template},/**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromUrl
   * @methodOf ui.router.util.$templateFactory
   * 
   * @description
   * Loads a template from the a URL via `$http` and `$templateCache`.
   *
   * @param {string|Function} url url of the template to load, or a function 
   * that returns a url.
   * @param {Object} params Parameters to pass to the url function.
   * @return {string|Promise.<string>} The template html as a string, or a promise 
   * for that string.
   */
this.fromUrl=function(url,params){return isFunction(url)&&(url=url(params)),null==url?null:$http.get(url,{cache:$templateCache,headers:{Accept:"text/html"}}).then(function(response){return response.data})},/**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromProvider
   * @methodOf ui.router.util.$templateFactory
   *
   * @description
   * Creates a template by invoking an injectable provider function.
   *
   * @param {Function} provider Function to invoke via `$injector.invoke`
   * @param {Object} params Parameters for the template.
   * @param {Object} locals Locals to pass to `invoke`. Defaults to 
   * `{ params: params }`.
   * @return {string|Promise.<string>} The template html as a string, or a promise 
   * for that string.
   */
this.fromProvider=function(provider,params,locals){return $injector.invoke(provider,null,locals||{params:params})}}// reference to $UrlMatcherFactoryProvider
/**
 * @ngdoc object
 * @name ui.router.util.type:UrlMatcher
 *
 * @description
 * Matches URLs against patterns and extracts named parameters from the path or the search
 * part of the URL. A URL pattern consists of a path pattern, optionally followed by '?' and a list
 * of search parameters. Multiple search parameter names are separated by '&'. Search parameters
 * do not influence whether or not a URL is matched, but their values are passed through into
 * the matched parameters returned by {@link ui.router.util.type:UrlMatcher#methods_exec exec}.
 *
 * Path parameter placeholders can be specified using simple colon/catch-all syntax or curly brace
 * syntax, which optionally allows a regular expression for the parameter to be specified:
 *
 * * `':'` name - colon placeholder
 * * `'*'` name - catch-all placeholder
 * * `'{' name '}'` - curly placeholder
 * * `'{' name ':' regexp|type '}'` - curly placeholder with regexp or type name. Should the
 *   regexp itself contain curly braces, they must be in matched pairs or escaped with a backslash.
 *
 * Parameter names may contain only word characters (latin letters, digits, and underscore) and
 * must be unique within the pattern (across both path and search parameters). For colon
 * placeholders or curly placeholders without an explicit regexp, a path parameter matches any
 * number of characters other than '/'. For catch-all placeholders the path parameter matches
 * any number of characters.
 *
 * Examples:
 *
 * * `'/hello/'` - Matches only if the path is exactly '/hello/'. There is no special treatment for
 *   trailing slashes, and patterns have to match the entire path, not just a prefix.
 * * `'/user/:id'` - Matches '/user/bob' or '/user/1234!!!' or even '/user/' but not '/user' or
 *   '/user/bob/details'. The second path segment will be captured as the parameter 'id'.
 * * `'/user/{id}'` - Same as the previous example, but using curly brace syntax.
 * * `'/user/{id:[^/]*}'` - Same as the previous example.
 * * `'/user/{id:[0-9a-fA-F]{1,8}}'` - Similar to the previous example, but only matches if the id
 *   parameter consists of 1 to 8 hex digits.
 * * `'/files/{path:.*}'` - Matches any URL starting with '/files/' and captures the rest of the
 *   path into the parameter 'path'.
 * * `'/files/*path'` - ditto.
 * * `'/calendar/{start:date}'` - Matches "/calendar/2014-11-12" (because the pattern defined
 *   in the built-in  `date` Type matches `2014-11-12`) and provides a Date object in $stateParams.start
 *
 * @param {string} pattern  The pattern to compile into a matcher.
 * @param {Object} config  A configuration object hash:
 * @param {Object=} parentMatcher Used to concatenate the pattern/config onto
 *   an existing UrlMatcher
 *
 * * `caseInsensitive` - `true` if URL matching should be case insensitive, otherwise `false`, the default value (for backward compatibility) is `false`.
 * * `strict` - `false` if matching against a URL with a trailing slash should be treated as equivalent to a URL without a trailing slash, the default value is `true`.
 *
 * @property {string} prefix  A static prefix of this pattern. The matcher guarantees that any
 *   URL matching this matcher (i.e. any string for which {@link ui.router.util.type:UrlMatcher#methods_exec exec()} returns
 *   non-null) will start with this prefix.
 *
 * @property {string} source  The pattern that was passed into the constructor
 *
 * @property {string} sourcePath  The path portion of the source property
 *
 * @property {string} sourceSearch  The search portion of the source property
 *
 * @property {string} regex  The constructed regex that will be used to match against the url when
 *   it is time to determine which url will match.
 *
 * @returns {Object}  New `UrlMatcher` object
 */
function UrlMatcher(pattern,config,parentMatcher){function addParameter(id,type,config,location){if(paramNames.push(id),parentParams[id])return parentParams[id];if(!/^\w+(-+\w+)*(?:\[\])?$/.test(id))throw new Error("Invalid parameter name '"+id+"' in pattern '"+pattern+"'");if(params[id])throw new Error("Duplicate parameter name '"+id+"' in pattern '"+pattern+"'");return params[id]=new $$UMFP.Param(id,type,config,location),params[id]}function quoteRegExp(string,pattern,squash,optional){var surroundPattern=["",""],result=string.replace(/[\\\[\]\^$*+?.()|{}]/g,"\\$&");if(!pattern)return result;switch(squash){case!1:surroundPattern=["(",")"+(optional?"?":"")];break;case!0:surroundPattern=["?(",")?"];break;default:surroundPattern=["("+squash+"|",")?"]}return result+surroundPattern[0]+pattern+surroundPattern[1]}
// Split into static segments separated by path parameter placeholders.
// The number of segments is always 1 more than the number of parameters.
function matchDetails(m,isSearch){var id,regexp,segment,type,cfg;// IE[78] returns '' for unmatched groups instead of null
return id=m[2]||m[3],cfg=config.params[id],segment=pattern.substring(last,m.index),regexp=isSearch?m[4]:m[4]||("*"==m[1]?".*":null),type=$$UMFP.type(regexp||"string")||inherit($$UMFP.type("string"),{pattern:new RegExp(regexp,config.caseInsensitive?"i":undefined)}),{id:id,regexp:regexp,segment:segment,type:type,cfg:cfg}}config=extend({params:{}},isObject(config)?config:{});
// Find all placeholders and create a compiled pattern, using either classic or curly syntax:
//   '*' name
//   ':' name
//   '{' name '}'
//   '{' name ':' regexp '}'
// The regular expression is somewhat complicated due to the need to allow curly braces
// inside the regular expression. The placeholder regexp breaks down as follows:
//    ([:*])([\w\[\]]+)              - classic placeholder ($1 / $2) (search version has - for snake-case)
//    \{([\w\[\]]+)(?:\:( ... ))?\}  - curly brace placeholder ($3) with optional regexp/type ... ($4) (search version has - for snake-case
//    (?: ... | ... | ... )+         - the regexp consists of any number of atoms, an atom being either
//    [^{}\\]+                       - anything other than curly braces or backslash
//    \\.                            - a backslash escape
//    \{(?:[^{}\\]+|\\.)*\}          - a matched set of curly braces containing other atoms
var m,placeholder=/([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,searchPlaceholder=/([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,compiled="^",last=0,segments=this.segments=[],parentParams=parentMatcher?parentMatcher.params:{},params=this.params=parentMatcher?parentMatcher.params.$$new():new $$UMFP.ParamSet,paramNames=[];this.source=pattern;for(var p,param,segment;(m=placeholder.exec(pattern))&&(p=matchDetails(m,!1),!(p.segment.indexOf("?")>=0));)// we're into the search part
param=addParameter(p.id,p.type,p.cfg,"path"),compiled+=quoteRegExp(p.segment,param.type.pattern.source,param.squash,param.isOptional),segments.push(p.segment),last=placeholder.lastIndex;segment=pattern.substring(last);
// Find any search parameter names and remove them from the last segment
var i=segment.indexOf("?");if(i>=0){var search=this.sourceSearch=segment.substring(i);if(segment=segment.substring(0,i),this.sourcePath=pattern.substring(0,last+i),search.length>0)for(last=0;m=searchPlaceholder.exec(search);)p=matchDetails(m,!0),param=addParameter(p.id,p.type,p.cfg,"search"),last=placeholder.lastIndex}else this.sourcePath=pattern,this.sourceSearch="";compiled+=quoteRegExp(segment)+(config.strict===!1?"/?":"")+"$",segments.push(segment),this.regexp=new RegExp(compiled,config.caseInsensitive?"i":undefined),this.prefix=segments[0],this.$$paramNames=paramNames}/**
 * @ngdoc object
 * @name ui.router.util.type:Type
 *
 * @description
 * Implements an interface to define custom parameter types that can be decoded from and encoded to
 * string parameters matched in a URL. Used by {@link ui.router.util.type:UrlMatcher `UrlMatcher`}
 * objects when matching or formatting URLs, or comparing or validating parameter values.
 *
 * See {@link ui.router.util.$urlMatcherFactory#methods_type `$urlMatcherFactory#type()`} for more
 * information on registering custom types.
 *
 * @param {Object} config  A configuration object which contains the custom type definition.  The object's
 *        properties will override the default methods and/or pattern in `Type`'s public interface.
 * @example
 * <pre>
 * {
 *   decode: function(val) { return parseInt(val, 10); },
 *   encode: function(val) { return val && val.toString(); },
 *   equals: function(a, b) { return this.is(a) && a === b; },
 *   is: function(val) { return angular.isNumber(val) isFinite(val) && val % 1 === 0; },
 *   pattern: /\d+/
 * }
 * </pre>
 *
 * @property {RegExp} pattern The regular expression pattern used to match values of this type when
 *           coming from a substring of a URL.
 *
 * @returns {Object}  Returns a new `Type` object.
 */
function Type(config){extend(this,config)}/**
 * @ngdoc object
 * @name ui.router.util.$urlMatcherFactory
 *
 * @description
 * Factory for {@link ui.router.util.type:UrlMatcher `UrlMatcher`} instances. The factory
 * is also available to providers under the name `$urlMatcherFactoryProvider`.
 */
function $UrlMatcherFactory(){function valToString(val){return null!=val?val.toString().replace(/\//g,"%2F"):val}function valFromString(val){return null!=val?val.toString().replace(/%2F/g,"/"):val}function getDefaultConfig(){return{strict:isStrictMode,caseInsensitive:isCaseInsensitive}}function isInjectable(value){return isFunction(value)||isArray(value)&&isFunction(value[value.length-1])}
// `flushTypeQueue()` waits until `$urlMatcherFactory` is injected before invoking the queued `definitionFn`s
function flushTypeQueue(){for(;typeQueue.length;){var type=typeQueue.shift();if(type.pattern)throw new Error("You cannot override a type's .pattern at runtime.");angular.extend($types[type.name],injector.invoke(type.def))}}function ParamSet(params){extend(this,params||{})}$$UMFP=this;var injector,isCaseInsensitive=!1,isStrictMode=!0,defaultSquashPolicy=!1,$types={},enqueue=!0,typeQueue=[],defaultTypes={string:{encode:valToString,decode:valFromString,
// TODO: in 1.0, make string .is() return false if value is undefined/null by default.
// In 0.2.x, string params are optional by default for backwards compat
is:function(val){return null==val||!isDefined(val)||"string"==typeof val},pattern:/[^/]*/},"int":{encode:valToString,decode:function(val){return parseInt(val,10)},is:function(val){return isDefined(val)&&this.decode(val.toString())===val},pattern:/\d+/},bool:{encode:function(val){return val?1:0},decode:function(val){return 0!==parseInt(val,10)},is:function(val){return val===!0||val===!1},pattern:/0|1/},date:{encode:function(val){return this.is(val)?[val.getFullYear(),("0"+(val.getMonth()+1)).slice(-2),("0"+val.getDate()).slice(-2)].join("-"):undefined},decode:function(val){if(this.is(val))return val;var match=this.capture.exec(val);return match?new Date(match[1],match[2]-1,match[3]):undefined},is:function(val){return val instanceof Date&&!isNaN(val.valueOf())},equals:function(a,b){return this.is(a)&&this.is(b)&&a.toISOString()===b.toISOString()},pattern:/[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,capture:/([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/},json:{encode:angular.toJson,decode:angular.fromJson,is:angular.isObject,equals:angular.equals,pattern:/[^/]*/},any:{// does not encode/decode
encode:angular.identity,decode:angular.identity,equals:angular.equals,pattern:/.*/}};/**
   * [Internal] Get the default value of a parameter, which may be an injectable function.
   */
$UrlMatcherFactory.$$getDefaultValue=function(config){if(!isInjectable(config.value))return config.value;if(!injector)throw new Error("Injectable functions cannot be called at configuration time");return injector.invoke(config.value)},/**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#caseInsensitive
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Defines whether URL matching should be case sensitive (the default behavior), or not.
   *
   * @param {boolean} value `false` to match URL in a case sensitive manner; otherwise `true`;
   * @returns {boolean} the current value of caseInsensitive
   */
this.caseInsensitive=function(value){return isDefined(value)&&(isCaseInsensitive=value),isCaseInsensitive},/**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#strictMode
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Defines whether URLs should match trailing slashes, or not (the default behavior).
   *
   * @param {boolean=} value `false` to match trailing slashes in URLs, otherwise `true`.
   * @returns {boolean} the current value of strictMode
   */
this.strictMode=function(value){return isDefined(value)&&(isStrictMode=value),isStrictMode},/**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#defaultSquashPolicy
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Sets the default behavior when generating or matching URLs with default parameter values.
   *
   * @param {string} value A string that defines the default parameter URL squashing behavior.
   *    `nosquash`: When generating an href with a default parameter value, do not squash the parameter value from the URL
   *    `slash`: When generating an href with a default parameter value, squash (remove) the parameter value, and, if the
   *             parameter is surrounded by slashes, squash (remove) one slash from the URL
   *    any other string, e.g. "~": When generating an href with a default parameter value, squash (remove)
   *             the parameter value from the URL and replace it with this string.
   */
this.defaultSquashPolicy=function(value){if(!isDefined(value))return defaultSquashPolicy;if(value!==!0&&value!==!1&&!isString(value))throw new Error("Invalid squash policy: "+value+". Valid policies: false, true, arbitrary-string");return defaultSquashPolicy=value,value},/**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#compile
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Creates a {@link ui.router.util.type:UrlMatcher `UrlMatcher`} for the specified pattern.
   *
   * @param {string} pattern  The URL pattern.
   * @param {Object} config  The config object hash.
   * @returns {UrlMatcher}  The UrlMatcher.
   */
this.compile=function(pattern,config){return new UrlMatcher(pattern,extend(getDefaultConfig(),config))},/**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#isMatcher
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Returns true if the specified object is a `UrlMatcher`, or false otherwise.
   *
   * @param {Object} object  The object to perform the type check against.
   * @returns {Boolean}  Returns `true` if the object matches the `UrlMatcher` interface, by
   *          implementing all the same methods.
   */
this.isMatcher=function(o){if(!isObject(o))return!1;var result=!0;return forEach(UrlMatcher.prototype,function(val,name){isFunction(val)&&(result=result&&isDefined(o[name])&&isFunction(o[name]))}),result},/**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#type
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Registers a custom {@link ui.router.util.type:Type `Type`} object that can be used to
   * generate URLs with typed parameters.
   *
   * @param {string} name  The type name.
   * @param {Object|Function} definition   The type definition. See
   *        {@link ui.router.util.type:Type `Type`} for information on the values accepted.
   * @param {Object|Function} definitionFn (optional) A function that is injected before the app
   *        runtime starts.  The result of this function is merged into the existing `definition`.
   *        See {@link ui.router.util.type:Type `Type`} for information on the values accepted.
   *
   * @returns {Object}  Returns `$urlMatcherFactoryProvider`.
   *
   * @example
   * This is a simple example of a custom type that encodes and decodes items from an
   * array, using the array index as the URL-encoded value:
   *
   * <pre>
   * var list = ['John', 'Paul', 'George', 'Ringo'];
   *
   * $urlMatcherFactoryProvider.type('listItem', {
   *   encode: function(item) {
   *     // Represent the list item in the URL using its corresponding index
   *     return list.indexOf(item);
   *   },
   *   decode: function(item) {
   *     // Look up the list item by index
   *     return list[parseInt(item, 10)];
   *   },
   *   is: function(item) {
   *     // Ensure the item is valid by checking to see that it appears
   *     // in the list
   *     return list.indexOf(item) > -1;
   *   }
   * });
   *
   * $stateProvider.state('list', {
   *   url: "/list/{item:listItem}",
   *   controller: function($scope, $stateParams) {
   *     console.log($stateParams.item);
   *   }
   * });
   *
   * // ...
   *
   * // Changes URL to '/list/3', logs "Ringo" to the console
   * $state.go('list', { item: "Ringo" });
   * </pre>
   *
   * This is a more complex example of a type that relies on dependency injection to
   * interact with services, and uses the parameter name from the URL to infer how to
   * handle encoding and decoding parameter values:
   *
   * <pre>
   * // Defines a custom type that gets a value from a service,
   * // where each service gets different types of values from
   * // a backend API:
   * $urlMatcherFactoryProvider.type('dbObject', {}, function(Users, Posts) {
   *
   *   // Matches up services to URL parameter names
   *   var services = {
   *     user: Users,
   *     post: Posts
   *   };
   *
   *   return {
   *     encode: function(object) {
   *       // Represent the object in the URL using its unique ID
   *       return object.id;
   *     },
   *     decode: function(value, key) {
   *       // Look up the object by ID, using the parameter
   *       // name (key) to call the correct service
   *       return services[key].findById(value);
   *     },
   *     is: function(object, key) {
   *       // Check that object is a valid dbObject
   *       return angular.isObject(object) && object.id && services[key];
   *     }
   *     equals: function(a, b) {
   *       // Check the equality of decoded objects by comparing
   *       // their unique IDs
   *       return a.id === b.id;
   *     }
   *   };
   * });
   *
   * // In a config() block, you can then attach URLs with
   * // type-annotated parameters:
   * $stateProvider.state('users', {
   *   url: "/users",
   *   // ...
   * }).state('users.item', {
   *   url: "/{user:dbObject}",
   *   controller: function($scope, $stateParams) {
   *     // $stateParams.user will now be an object returned from
   *     // the Users service
   *   },
   *   // ...
   * });
   * </pre>
   */
this.type=function(name,definition,definitionFn){if(!isDefined(definition))return $types[name];if($types.hasOwnProperty(name))throw new Error("A type named '"+name+"' has already been defined.");return $types[name]=new Type(extend({name:name},definition)),definitionFn&&(typeQueue.push({name:name,def:definitionFn}),enqueue||flushTypeQueue()),this},
// Register default types. Store them in the prototype of $types.
forEach(defaultTypes,function(type,name){$types[name]=new Type(extend({name:name},type))}),$types=inherit($types,{}),/* No need to document $get, since it returns this */
this.$get=["$injector",function($injector){return injector=$injector,enqueue=!1,flushTypeQueue(),forEach(defaultTypes,function(type,name){$types[name]||($types[name]=new Type(type))}),this}],this.Param=function(id,type,config,location){function unwrapShorthand(config){var keys=isObject(config)?objectKeys(config):[],isShorthand=indexOf(keys,"value")===-1&&indexOf(keys,"type")===-1&&indexOf(keys,"squash")===-1&&indexOf(keys,"array")===-1;return isShorthand&&(config={value:config}),config.$$fn=isInjectable(config.value)?config.value:function(){return config.value},config}function getType(config,urlType,location){if(config.type&&urlType)throw new Error("Param '"+id+"' has two type configurations.");return urlType?urlType:config.type?config.type instanceof Type?config.type:new Type(config.type):"config"===location?$types.any:$types.string}
// array config: param name (param[]) overrides default settings.  explicit config overrides param name.
function getArrayMode(){var arrayDefaults={array:"search"===location&&"auto"},arrayParamNomenclature=id.match(/\[\]$/)?{array:!0}:{};return extend(arrayDefaults,arrayParamNomenclature,config).array}/**
     * returns false, true, or the squash value to indicate the "default parameter url squash policy".
     */
function getSquashPolicy(config,isOptional){var squash=config.squash;if(!isOptional||squash===!1)return!1;if(!isDefined(squash)||null==squash)return defaultSquashPolicy;if(squash===!0||isString(squash))return squash;throw new Error("Invalid squash policy: '"+squash+"'. Valid policies: false, true, or arbitrary string")}function getReplace(config,arrayMode,isOptional,squash){var replace,configuredKeys,defaultPolicy=[{from:"",to:isOptional||arrayMode?undefined:""},{from:null,to:isOptional||arrayMode?undefined:""}];return replace=isArray(config.replace)?config.replace:[],isString(squash)&&replace.push({from:squash,to:undefined}),configuredKeys=map(replace,function(item){return item.from}),filter(defaultPolicy,function(item){return indexOf(configuredKeys,item.from)===-1}).concat(replace)}/**
     * [Internal] Get the default value of a parameter, which may be an injectable function.
     */
function $$getDefaultValue(){if(!injector)throw new Error("Injectable functions cannot be called at configuration time");var defaultValue=injector.invoke(config.$$fn);if(null!==defaultValue&&defaultValue!==undefined&&!self.type.is(defaultValue))throw new Error("Default value ("+defaultValue+") for parameter '"+self.id+"' is not an instance of Type ("+self.type.name+")");return defaultValue}/**
     * [Internal] Gets the decoded representation of a value if the value is defined, otherwise, returns the
     * default value, which may be the result of an injectable function.
     */
function $value(value){function hasReplaceVal(val){return function(obj){return obj.from===val}}function $replace(value){var replacement=map(filter(self.replace,hasReplaceVal(value)),function(obj){return obj.to});return replacement.length?replacement[0]:value}return value=$replace(value),isDefined(value)?self.type.$normalize(value):$$getDefaultValue()}function toString(){return"{Param:"+id+" "+type+" squash: '"+squash+"' optional: "+isOptional+"}"}var self=this;config=unwrapShorthand(config),type=getType(config,type,location);var arrayMode=getArrayMode();type=arrayMode?type.$asArray(arrayMode,"search"===location):type,"string"!==type.name||arrayMode||"path"!==location||config.value!==undefined||(config.value="");// for 0.2.x; in 0.3.0+ do not automatically default to ""
var isOptional=config.value!==undefined,squash=getSquashPolicy(config,isOptional),replace=getReplace(config,arrayMode,isOptional,squash);extend(this,{id:id,type:type,location:location,array:arrayMode,squash:squash,replace:replace,isOptional:isOptional,value:$value,dynamic:undefined,config:config,toString:toString})},ParamSet.prototype={$$new:function(){return inherit(this,extend(new ParamSet,{$$parent:this}))},$$keys:function(){for(var keys=[],chain=[],parent=this,ignore=objectKeys(ParamSet.prototype);parent;)chain.push(parent),parent=parent.$$parent;return chain.reverse(),forEach(chain,function(paramset){forEach(objectKeys(paramset),function(key){indexOf(keys,key)===-1&&indexOf(ignore,key)===-1&&keys.push(key)})}),keys},$$values:function(paramValues){var values={},self=this;return forEach(self.$$keys(),function(key){values[key]=self[key].value(paramValues&&paramValues[key])}),values},$$equals:function(paramValues1,paramValues2){var equal=!0,self=this;return forEach(self.$$keys(),function(key){var left=paramValues1&&paramValues1[key],right=paramValues2&&paramValues2[key];self[key].type.equals(left,right)||(equal=!1)}),equal},$$validates:function(paramValues){var i,param,rawVal,normalized,encoded,keys=this.$$keys();for(i=0;i<keys.length&&(param=this[keys[i]],rawVal=paramValues[keys[i]],rawVal!==undefined&&null!==rawVal||!param.isOptional);i++){if(// There was no parameter value, but the param is optional
normalized=param.type.$normalize(rawVal),!param.type.is(normalized))return!1;if(// The value was not of the correct Type, and could not be decoded to the correct Type
encoded=param.type.encode(normalized),angular.isString(encoded)&&!param.type.pattern.exec(encoded))return!1}return!0},$$parent:undefined},this.ParamSet=ParamSet}function $UrlRouterProvider($locationProvider,$urlMatcherFactory){
// Returns a string that is a prefix of all strings matching the RegExp
function regExpPrefix(re){var prefix=/^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(re.source);return null!=prefix?prefix[1].replace(/\\(.)/g,"$1"):""}
// Interpolates matched values into a String.replace()-style pattern
function interpolate(pattern,match){return pattern.replace(/\$(\$|\d{1,2})/,function(m,what){return match["$"===what?0:Number(what)]})}function handleIfMatch($injector,handler,match){if(!match)return!1;var result=$injector.invoke(handler,handler,{$match:match});return!isDefined(result)||result}function $get($location,$rootScope,$injector,$browser){function appendBasePath(url,isHtml5,absolute){return"/"===baseHref?url:isHtml5?baseHref.slice(0,-1)+url:absolute?baseHref.slice(1)+url:url}
// TODO: Optimize groups of rules with non-empty prefix into some sort of decision tree
function update(evt){
// TODO: Re-implement this in 1.0 for https://github.com/angular-ui/ui-router/issues/1573
//if (ignoreUpdate) return true;
function check(rule){var handled=rule($injector,$location);return!!handled&&(isString(handled)&&$location.replace().url(handled),!0)}if(!evt||!evt.defaultPrevented){lastPushedUrl&&$location.url()===lastPushedUrl;lastPushedUrl=undefined;var i,n=rules.length;for(i=0;i<n;i++)if(check(rules[i]))return;
// always check otherwise last to allow dynamic updates to the set of rules
otherwise&&check(otherwise)}}function listen(){return listener=listener||$rootScope.$on("$locationChangeSuccess",update)}var lastPushedUrl,baseHref=$browser.baseHref(),location=$location.url();return interceptDeferred||listen(),{/**
       * @ngdoc function
       * @name ui.router.router.$urlRouter#sync
       * @methodOf ui.router.router.$urlRouter
       *
       * @description
       * Triggers an update; the same update that happens when the address bar url changes, aka `$locationChangeSuccess`.
       * This method is useful when you need to use `preventDefault()` on the `$locationChangeSuccess` event,
       * perform some custom logic (route protection, auth, config, redirection, etc) and then finally proceed
       * with the transition by calling `$urlRouter.sync()`.
       *
       * @example
       * <pre>
       * angular.module('app', ['ui.router'])
       *   .run(function($rootScope, $urlRouter) {
       *     $rootScope.$on('$locationChangeSuccess', function(evt) {
       *       // Halt state change from even starting
       *       evt.preventDefault();
       *       // Perform custom logic
       *       var meetsRequirement = ...
       *       // Continue with the update and state transition if logic allows
       *       if (meetsRequirement) $urlRouter.sync();
       *     });
       * });
       * </pre>
       */
sync:function(){update()},listen:function(){return listen()},update:function(read){return read?void(location=$location.url()):void($location.url()!==location&&($location.url(location),$location.replace()))},push:function(urlMatcher,params,options){var url=urlMatcher.format(params||{});
// Handle the special hash param, if needed
null!==url&&params&&params["#"]&&(url+="#"+params["#"]),$location.url(url),lastPushedUrl=options&&options.$$avoidResync?$location.url():undefined,options&&options.replace&&$location.replace()},/**
       * @ngdoc function
       * @name ui.router.router.$urlRouter#href
       * @methodOf ui.router.router.$urlRouter
       *
       * @description
       * A URL generation method that returns the compiled URL for a given
       * {@link ui.router.util.type:UrlMatcher `UrlMatcher`}, populated with the provided parameters.
       *
       * @example
       * <pre>
       * $bob = $urlRouter.href(new UrlMatcher("/about/:person"), {
       *   person: "bob"
       * });
       * // $bob == "/about/bob";
       * </pre>
       *
       * @param {UrlMatcher} urlMatcher The `UrlMatcher` object which is used as the template of the URL to generate.
       * @param {object=} params An object of parameter values to fill the matcher's required parameters.
       * @param {object=} options Options object. The options are:
       *
       * - **`absolute`** - {boolean=false},  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
       *
       * @returns {string} Returns the fully compiled URL, or `null` if `params` fail validation against `urlMatcher`
       */
href:function(urlMatcher,params,options){if(!urlMatcher.validates(params))return null;var isHtml5=$locationProvider.html5Mode();angular.isObject(isHtml5)&&(isHtml5=isHtml5.enabled);var url=urlMatcher.format(params);if(options=options||{},isHtml5||null===url||(url="#"+$locationProvider.hashPrefix()+url),
// Handle special hash param, if needed
null!==url&&params&&params["#"]&&(url+="#"+params["#"]),url=appendBasePath(url,isHtml5,options.absolute),!options.absolute||!url)return url;var slash=!isHtml5&&url?"/":"",port=$location.port();return port=80===port||443===port?"":":"+port,[$location.protocol(),"://",$location.host(),port,slash,url].join("")}}}var listener,rules=[],otherwise=null,interceptDeferred=!1;/**
   * @ngdoc function
   * @name ui.router.router.$urlRouterProvider#rule
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Defines rules that are used by `$urlRouterProvider` to find matches for
   * specific URLs.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) {
   *   // Here's an example of how you might allow case insensitive urls
   *   $urlRouterProvider.rule(function ($injector, $location) {
   *     var path = $location.path(),
   *         normalized = path.toLowerCase();
   *
   *     if (path !== normalized) {
   *       return normalized;
   *     }
   *   });
   * });
   * </pre>
   *
   * @param {object} rule Handler function that takes `$injector` and `$location`
   * services as arguments. You can use them to return a valid path as a string.
   *
   * @return {object} `$urlRouterProvider` - `$urlRouterProvider` instance
   */
this.rule=function(rule){if(!isFunction(rule))throw new Error("'rule' must be a function");return rules.push(rule),this},/**
   * @ngdoc object
   * @name ui.router.router.$urlRouterProvider#otherwise
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Defines a path that is used when an invalid route is requested.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) {
   *   // if the path doesn't match any of the urls you configured
   *   // otherwise will take care of routing the user to the
   *   // specified url
   *   $urlRouterProvider.otherwise('/index');
   *
   *   // Example of using function rule as param
   *   $urlRouterProvider.otherwise(function ($injector, $location) {
   *     return '/a/valid/url';
   *   });
   * });
   * </pre>
   *
   * @param {string|object} rule The url path you want to redirect to or a function 
   * rule that returns the url path. The function version is passed two params: 
   * `$injector` and `$location` services, and must return a url string.
   *
   * @return {object} `$urlRouterProvider` - `$urlRouterProvider` instance
   */
this.otherwise=function(rule){if(isString(rule)){var redirect=rule;rule=function(){return redirect}}else if(!isFunction(rule))throw new Error("'rule' must be a function");return otherwise=rule,this},/**
   * @ngdoc function
   * @name ui.router.router.$urlRouterProvider#when
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Registers a handler for a given url matching. if handle is a string, it is
   * treated as a redirect, and is interpolated according to the syntax of match
   * (i.e. like `String.replace()` for `RegExp`, or like a `UrlMatcher` pattern otherwise).
   *
   * If the handler is a function, it is injectable. It gets invoked if `$location`
   * matches. You have the option of inject the match object as `$match`.
   *
   * The handler can return
   *
   * - **falsy** to indicate that the rule didn't match after all, then `$urlRouter`
   *   will continue trying to find another one that matches.
   * - **string** which is treated as a redirect and passed to `$location.url()`
   * - **void** or any **truthy** value tells `$urlRouter` that the url was handled.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) {
   *   $urlRouterProvider.when($state.url, function ($match, $stateParams) {
   *     if ($state.$current.navigable !== state ||
   *         !equalForKeys($match, $stateParams) {
   *      $state.transitionTo(state, $match, false);
   *     }
   *   });
   * });
   * </pre>
   *
   * @param {string|object} what The incoming path that you want to redirect.
   * @param {string|object} handler The path you want to redirect your user to.
   */
this.when=function(what,handler){var redirect,handlerIsString=isString(handler);if(isString(what)&&(what=$urlMatcherFactory.compile(what)),!handlerIsString&&!isFunction(handler)&&!isArray(handler))throw new Error("invalid 'handler' in when()");var strategies={matcher:function(what,handler){return handlerIsString&&(redirect=$urlMatcherFactory.compile(handler),handler=["$match",function($match){return redirect.format($match)}]),extend(function($injector,$location){return handleIfMatch($injector,handler,what.exec($location.path(),$location.search()))},{prefix:isString(what.prefix)?what.prefix:""})},regex:function(what,handler){if(what.global||what.sticky)throw new Error("when() RegExp must not be global or sticky");return handlerIsString&&(redirect=handler,handler=["$match",function($match){return interpolate(redirect,$match)}]),extend(function($injector,$location){return handleIfMatch($injector,handler,what.exec($location.path()))},{prefix:regExpPrefix(what)})}},check={matcher:$urlMatcherFactory.isMatcher(what),regex:what instanceof RegExp};for(var n in check)if(check[n])return this.rule(strategies[n](what,handler));throw new Error("invalid 'what' in when()")},/**
   * @ngdoc function
   * @name ui.router.router.$urlRouterProvider#deferIntercept
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Disables (or enables) deferring location change interception.
   *
   * If you wish to customize the behavior of syncing the URL (for example, if you wish to
   * defer a transition but maintain the current URL), call this method at configuration time.
   * Then, at run time, call `$urlRouter.listen()` after you have configured your own
   * `$locationChangeSuccess` event handler.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) {
   *
   *   // Prevent $urlRouter from automatically intercepting URL changes;
   *   // this allows you to configure custom behavior in between
   *   // location changes and route synchronization:
   *   $urlRouterProvider.deferIntercept();
   *
   * }).run(function ($rootScope, $urlRouter, UserService) {
   *
   *   $rootScope.$on('$locationChangeSuccess', function(e) {
   *     // UserService is an example service for managing user state
   *     if (UserService.isLoggedIn()) return;
   *
   *     // Prevent $urlRouter's default handler from firing
   *     e.preventDefault();
   *
   *     UserService.handleLogin().then(function() {
   *       // Once the user has logged in, sync the current URL
   *       // to the router:
   *       $urlRouter.sync();
   *     });
   *   });
   *
   *   // Configures $urlRouter's listener *after* your custom listener
   *   $urlRouter.listen();
   * });
   * </pre>
   *
   * @param {boolean} defer Indicates whether to defer location change interception. Passing
            no parameter is equivalent to `true`.
   */
this.deferIntercept=function(defer){defer===undefined&&(defer=!0),interceptDeferred=defer},/**
   * @ngdoc object
   * @name ui.router.router.$urlRouter
   *
   * @requires $location
   * @requires $rootScope
   * @requires $injector
   * @requires $browser
   *
   * @description
   *
   */
this.$get=$get,$get.$inject=["$location","$rootScope","$injector","$browser"]}function $StateProvider($urlRouterProvider,$urlMatcherFactory){function isRelative(stateName){return 0===stateName.indexOf(".")||0===stateName.indexOf("^")}function findState(stateOrName,base){if(!stateOrName)return undefined;var isStr=isString(stateOrName),name=isStr?stateOrName:stateOrName.name,path=isRelative(name);if(path){if(!base)throw new Error("No reference point given for path '"+name+"'");base=findState(base);for(var rel=name.split("."),i=0,pathLength=rel.length,current=base;i<pathLength;i++)if(""!==rel[i]||0!==i){if("^"!==rel[i])break;if(!current.parent)throw new Error("Path '"+name+"' not valid for state '"+base.name+"'");current=current.parent}else current=base;rel=rel.slice(i).join("."),name=current.name+(current.name&&rel?".":"")+rel}var state=states[name];return!state||!isStr&&(isStr||state!==stateOrName&&state.self!==stateOrName)?undefined:state}function queueState(parentName,state){queue[parentName]||(queue[parentName]=[]),queue[parentName].push(state)}function flushQueuedChildren(parentName){for(var queued=queue[parentName]||[];queued.length;)registerState(queued.shift())}function registerState(state){
// Wrap a new object around the state so we can store our private details easily.
state=inherit(state,{self:state,resolve:state.resolve||{},toString:function(){return this.name}});var name=state.name;if(!isString(name)||name.indexOf("@")>=0)throw new Error("State must have a valid name");if(states.hasOwnProperty(name))throw new Error("State '"+name+"'' is already defined");
// Get parent name
var parentName=name.indexOf(".")!==-1?name.substring(0,name.lastIndexOf(".")):isString(state.parent)?state.parent:isObject(state.parent)&&isString(state.parent.name)?state.parent.name:"";
// If parent is not registered yet, add state to queue and register later
if(parentName&&!states[parentName])return queueState(parentName,state.self);for(var key in stateBuilder)isFunction(stateBuilder[key])&&(state[key]=stateBuilder[key](state,stateBuilder.$delegates[key]));
// Register the state in the global state list and with $urlRouter if necessary.
// Register any queued children
return states[name]=state,!state[abstractKey]&&state.url&&$urlRouterProvider.when(state.url,["$match","$stateParams",function($match,$stateParams){$state.$current.navigable==state&&equalForKeys($match,$stateParams)||$state.transitionTo(state,$match,{inherit:!0,location:!1})}]),flushQueuedChildren(name),state}
// Checks text to see if it looks like a glob.
function isGlob(text){return text.indexOf("*")>-1}
// Returns true if glob matches current $state name.
function doesStateMatchGlob(glob){
//match single stars
for(var globSegments=glob.split("."),segments=$state.$current.name.split("."),i=0,l=globSegments.length;i<l;i++)"*"===globSegments[i]&&(segments[i]="*");
//match greedy starts
//match greedy ends
return"**"===globSegments[0]&&(segments=segments.slice(indexOf(segments,globSegments[1])),segments.unshift("**")),"**"===globSegments[globSegments.length-1]&&(segments.splice(indexOf(segments,globSegments[globSegments.length-2])+1,Number.MAX_VALUE),segments.push("**")),globSegments.length==segments.length&&segments.join("")===globSegments.join("")}function decorator(name,func){/*jshint validthis: true */
/*jshint validthis: true */
return isString(name)&&!isDefined(func)?stateBuilder[name]:isFunction(func)&&isString(name)?(stateBuilder[name]&&!stateBuilder.$delegates[name]&&(stateBuilder.$delegates[name]=stateBuilder[name]),stateBuilder[name]=func,this):this}function state(name,definition){/*jshint validthis: true */
return isObject(name)?definition=name:definition.name=name,registerState(definition),this}function $get($rootScope,$q,$view,$injector,$resolve,$stateParams,$urlRouter,$location,$urlMatcherFactory){
// Handles the case where a state which is the target of a transition is not found, and the user
// can optionally retry or defer the transition
function handleRedirect(redirect,state,params,options){/**
       * @ngdoc event
       * @name ui.router.state.$state#$stateNotFound
       * @eventOf ui.router.state.$state
       * @eventType broadcast on root scope
       * @description
       * Fired when a requested state **cannot be found** using the provided state name during transition.
       * The event is broadcast allowing any handlers a single chance to deal with the error (usually by
       * lazy-loading the unfound state). A special `unfoundState` object is passed to the listener handler,
       * you can see its three properties in the example. You can use `event.preventDefault()` to abort the
       * transition and the promise returned from `go` will be rejected with a `'transition aborted'` value.
       *
       * @param {Object} event Event object.
       * @param {Object} unfoundState Unfound State information. Contains: `to, toParams, options` properties.
       * @param {State} fromState Current state object.
       * @param {Object} fromParams Current state params.
       *
       * @example
       *
       * <pre>
       * // somewhere, assume lazy.state has not been defined
       * $state.go("lazy.state", {a:1, b:2}, {inherit:false});
       *
       * // somewhere else
       * $scope.$on('$stateNotFound',
       * function(event, unfoundState, fromState, fromParams){
       *     console.log(unfoundState.to); // "lazy.state"
       *     console.log(unfoundState.toParams); // {a:1, b:2}
       *     console.log(unfoundState.options); // {inherit:false} + default options
       * })
       * </pre>
       */
var evt=$rootScope.$broadcast("$stateNotFound",redirect,state,params);if(evt.defaultPrevented)return $urlRouter.update(),TransitionAborted;if(!evt.retry)return null;
// Allow the handler to return a promise to defer state lookup retry
if(options.$retry)return $urlRouter.update(),TransitionFailed;var retryTransition=$state.transition=$q.when(evt.retry);return retryTransition.then(function(){return retryTransition!==$state.transition?TransitionSuperseded:(redirect.options.$retry=!0,$state.transitionTo(redirect.to,redirect.toParams,redirect.options))},function(){return TransitionAborted}),$urlRouter.update(),retryTransition}function resolveState(state,params,paramsAreFiltered,inherited,dst,options){function resolveViews(){var viewsPromises=[];
// Resolve template and dependencies for all views.
return forEach(state.views,function(view,name){var injectables=view.resolve&&view.resolve!==state.resolve?view.resolve:{};injectables.$template=[function(){return $view.load(name,{view:view,locals:dst.globals,params:$stateParams,notify:options.notify})||""}],viewsPromises.push($resolve.resolve(injectables,dst.globals,dst.resolve,state).then(function(result){
// References to the controller (only instantiated at link time)
if(isFunction(view.controllerProvider)||isArray(view.controllerProvider)){var injectLocals=angular.extend({},injectables,dst.globals);result.$$controller=$injector.invoke(view.controllerProvider,null,injectLocals)}else result.$$controller=view.controller;
// Provide access to the state itself for internal use
result.$$state=state,result.$$controllerAs=view.controllerAs,dst[name]=result}))}),$q.all(viewsPromises).then(function(){return dst.globals})}
// Make a restricted $stateParams with only the parameters that apply to this state if
// necessary. In addition to being available to the controller and onEnter/onExit callbacks,
// we also need $stateParams to be available for any $injector calls we make during the
// dependency resolution process.
var $stateParams=paramsAreFiltered?params:filterByKeys(state.params.$$keys(),params),locals={$stateParams:$stateParams};
// Resolve 'global' dependencies for the state, i.e. those not specific to a view.
// We're also including $stateParams in this; that way the parameters are restricted
// to the set that should be visible to the state, and are independent of when we update
// the global $state and $stateParams values.
dst.resolve=$resolve.resolve(state.resolve,locals,dst.resolve,state);var promises=[dst.resolve.then(function(globals){dst.globals=globals})];
// Wait for all the promises and then return the activation object
return inherited&&promises.push(inherited),$q.all(promises).then(resolveViews).then(function(values){return dst})}var TransitionSuperseded=$q.reject(new Error("transition superseded")),TransitionPrevented=$q.reject(new Error("transition prevented")),TransitionAborted=$q.reject(new Error("transition aborted")),TransitionFailed=$q.reject(new Error("transition failed"));/**
     * @ngdoc function
     * @name ui.router.state.$state#reload
     * @methodOf ui.router.state.$state
     *
     * @description
     * A method that force reloads the current state. All resolves are re-resolved,
     * controllers reinstantiated, and events re-fired.
     *
     * @example
     * <pre>
     * var app angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.reload = function(){
     *     $state.reload();
     *   }
     * });
     * </pre>
     *
     * `reload()` is just an alias for:
     * <pre>
     * $state.transitionTo($state.current, $stateParams, { 
     *   reload: true, inherit: false, notify: true
     * });
     * </pre>
     *
     * @param {string=|object=} state - A state name or a state object, which is the root of the resolves to be re-resolved.
     * @example
     * <pre>
     * //assuming app application consists of 3 states: 'contacts', 'contacts.detail', 'contacts.detail.item' 
     * //and current state is 'contacts.detail.item'
     * var app angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.reload = function(){
     *     //will reload 'contact.detail' and 'contact.detail.item' states
     *     $state.reload('contact.detail');
     *   }
     * });
     * </pre>
     *
     * `reload()` is just an alias for:
     * <pre>
     * $state.transitionTo($state.current, $stateParams, { 
     *   reload: true, inherit: false, notify: true
     * });
     * </pre>

     * @returns {promise} A promise representing the state of the new transition. See
     * {@link ui.router.state.$state#methods_go $state.go}.
     */
/**
     * @ngdoc function
     * @name ui.router.state.$state#go
     * @methodOf ui.router.state.$state
     *
     * @description
     * Convenience method for transitioning to a new state. `$state.go` calls 
     * `$state.transitionTo` internally but automatically sets options to 
     * `{ location: true, inherit: true, relative: $state.$current, notify: true }`. 
     * This allows you to easily use an absolute or relative to path and specify 
     * only the parameters you'd like to update (while letting unspecified parameters 
     * inherit from the currently active ancestor states).
     *
     * @example
     * <pre>
     * var app = angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.changeState = function () {
     *     $state.go('contact.detail');
     *   };
     * });
     * </pre>
     * <img src='../ngdoc_assets/StateGoExamples.png'/>
     *
     * @param {string} to Absolute state name or relative state path. Some examples:
     *
     * - `$state.go('contact.detail')` - will go to the `contact.detail` state
     * - `$state.go('^')` - will go to a parent state
     * - `$state.go('^.sibling')` - will go to a sibling state
     * - `$state.go('.child.grandchild')` - will go to grandchild state
     *
     * @param {object=} params A map of the parameters that will be sent to the state, 
     * will populate $stateParams. Any parameters that are not specified will be inherited from currently 
     * defined parameters. This allows, for example, going to a sibling state that shares parameters
     * specified in a parent state. Parameter inheritance only works between common ancestor states, I.e.
     * transitioning to a sibling will get you the parameters for all parents, transitioning to a child
     * will get you all current parameters, etc.
     * @param {object=} options Options object. The options are:
     *
     * - **`location`** - {boolean=true|string=} - If `true` will update the url in the location bar, if `false`
     *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
     * - **`inherit`** - {boolean=true}, If `true` will inherit url parameters from current url.
     * - **`relative`** - {object=$state.$current}, When transitioning with relative path (e.g '^'), 
     *    defines which state to be relative from.
     * - **`notify`** - {boolean=true}, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
     * - **`reload`** (v0.2.5) - {boolean=false}, If `true` will force transition even if the state or params 
     *    have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd
     *    use this when you want to force a reload when *everything* is the same, including search params.
     *
     * @returns {promise} A promise representing the state of the new transition.
     *
     * Possible success values:
     *
     * - $state.current
     *
     * <br/>Possible rejection values:
     *
     * - 'transition superseded' - when a newer transition has been started after this one
     * - 'transition prevented' - when `event.preventDefault()` has been called in a `$stateChangeStart` listener
     * - 'transition aborted' - when `event.preventDefault()` has been called in a `$stateNotFound` listener or
     *   when a `$stateNotFound` `event.retry` promise errors.
     * - 'transition failed' - when a state has been unsuccessfully found after 2 tries.
     * - *resolve error* - when an error has occurred with a `resolve`
     *
     */
/**
     * @ngdoc function
     * @name ui.router.state.$state#transitionTo
     * @methodOf ui.router.state.$state
     *
     * @description
     * Low-level method for transitioning to a new state. {@link ui.router.state.$state#methods_go $state.go}
     * uses `transitionTo` internally. `$state.go` is recommended in most situations.
     *
     * @example
     * <pre>
     * var app = angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.changeState = function () {
     *     $state.transitionTo('contact.detail');
     *   };
     * });
     * </pre>
     *
     * @param {string} to State name.
     * @param {object=} toParams A map of the parameters that will be sent to the state,
     * will populate $stateParams.
     * @param {object=} options Options object. The options are:
     *
     * - **`location`** - {boolean=true|string=} - If `true` will update the url in the location bar, if `false`
     *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
     * - **`inherit`** - {boolean=false}, If `true` will inherit url parameters from current url.
     * - **`relative`** - {object=}, When transitioning with relative path (e.g '^'), 
     *    defines which state to be relative from.
     * - **`notify`** - {boolean=true}, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
     * - **`reload`** (v0.2.5) - {boolean=false|string=|object=}, If `true` will force transition even if the state or params 
     *    have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd
     *    use this when you want to force a reload when *everything* is the same, including search params.
     *    if String, then will reload the state with the name given in reload, and any children.
     *    if Object, then a stateObj is expected, will reload the state found in stateObj, and any children.
     *
     * @returns {promise} A promise representing the state of the new transition. See
     * {@link ui.router.state.$state#methods_go $state.go}.
     */
/**
     * @ngdoc function
     * @name ui.router.state.$state#is
     * @methodOf ui.router.state.$state
     *
     * @description
     * Similar to {@link ui.router.state.$state#methods_includes $state.includes},
     * but only checks for the full state name. If params is supplied then it will be
     * tested for strict equality against the current active params object, so all params
     * must match with none missing and no extras.
     *
     * @example
     * <pre>
     * $state.$current.name = 'contacts.details.item';
     *
     * // absolute name
     * $state.is('contact.details.item'); // returns true
     * $state.is(contactDetailItemStateObject); // returns true
     *
     * // relative name (. and ^), typically from a template
     * // E.g. from the 'contacts.details' template
     * <div ng-class="{highlighted: $state.is('.item')}">Item</div>
     * </pre>
     *
     * @param {string|object} stateOrName The state name (absolute or relative) or state object you'd like to check.
     * @param {object=} params A param object, e.g. `{sectionId: section.id}`, that you'd like
     * to test against the current active state.
     * @param {object=} options An options object.  The options are:
     *
     * - **`relative`** - {string|object} -  If `stateOrName` is a relative state name and `options.relative` is set, .is will
     * test relative to `options.relative` state (or name).
     *
     * @returns {boolean} Returns true if it is the state.
     */
/**
     * @ngdoc function
     * @name ui.router.state.$state#includes
     * @methodOf ui.router.state.$state
     *
     * @description
     * A method to determine if the current active state is equal to or is the child of the
     * state stateName. If any params are passed then they will be tested for a match as well.
     * Not all the parameters need to be passed, just the ones you'd like to test for equality.
     *
     * @example
     * Partial and relative names
     * <pre>
     * $state.$current.name = 'contacts.details.item';
     *
     * // Using partial names
     * $state.includes("contacts"); // returns true
     * $state.includes("contacts.details"); // returns true
     * $state.includes("contacts.details.item"); // returns true
     * $state.includes("contacts.list"); // returns false
     * $state.includes("about"); // returns false
     *
     * // Using relative names (. and ^), typically from a template
     * // E.g. from the 'contacts.details' template
     * <div ng-class="{highlighted: $state.includes('.item')}">Item</div>
     * </pre>
     *
     * Basic globbing patterns
     * <pre>
     * $state.$current.name = 'contacts.details.item.url';
     *
     * $state.includes("*.details.*.*"); // returns true
     * $state.includes("*.details.**"); // returns true
     * $state.includes("**.item.**"); // returns true
     * $state.includes("*.details.item.url"); // returns true
     * $state.includes("*.details.*.url"); // returns true
     * $state.includes("*.details.*"); // returns false
     * $state.includes("item.**"); // returns false
     * </pre>
     *
     * @param {string} stateOrName A partial name, relative name, or glob pattern
     * to be searched for within the current state name.
     * @param {object=} params A param object, e.g. `{sectionId: section.id}`,
     * that you'd like to test against the current active state.
     * @param {object=} options An options object.  The options are:
     *
     * - **`relative`** - {string|object=} -  If `stateOrName` is a relative state reference and `options.relative` is set,
     * .includes will test relative to `options.relative` state (or name).
     *
     * @returns {boolean} Returns true if it does include the state
     */
/**
     * @ngdoc function
     * @name ui.router.state.$state#href
     * @methodOf ui.router.state.$state
     *
     * @description
     * A url generation method that returns the compiled url for the given state populated with the given params.
     *
     * @example
     * <pre>
     * expect($state.href("about.person", { person: "bob" })).toEqual("/about/bob");
     * </pre>
     *
     * @param {string|object} stateOrName The state name or state object you'd like to generate a url from.
     * @param {object=} params An object of parameter values to fill the state's required parameters.
     * @param {object=} options Options object. The options are:
     *
     * - **`lossy`** - {boolean=true} -  If true, and if there is no url associated with the state provided in the
     *    first parameter, then the constructed href url will be built from the first navigable ancestor (aka
     *    ancestor with a valid url).
     * - **`inherit`** - {boolean=true}, If `true` will inherit url parameters from current url.
     * - **`relative`** - {object=$state.$current}, When transitioning with relative path (e.g '^'), 
     *    defines which state to be relative from.
     * - **`absolute`** - {boolean=false},  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
     * 
     * @returns {string} compiled state url
     */
/**
     * @ngdoc function
     * @name ui.router.state.$state#get
     * @methodOf ui.router.state.$state
     *
     * @description
     * Returns the state configuration object for any specific state or all states.
     *
     * @param {string|object=} stateOrName (absolute or relative) If provided, will only get the config for
     * the requested state. If not provided, returns an array of ALL state configs.
     * @param {string|object=} context When stateOrName is a relative state reference, the state will be retrieved relative to context.
     * @returns {Object|Array} State configuration object or array of all objects.
     */
return root.locals={resolve:null,globals:{$stateParams:{}}},$state={params:{},current:root.self,$current:root,transition:null},$state.reload=function(state){return $state.transitionTo($state.current,$stateParams,{reload:state||!0,inherit:!1,notify:!0})},$state.go=function(to,params,options){return $state.transitionTo(to,params,extend({inherit:!0,relative:$state.$current},options))},$state.transitionTo=function(to,toParams,options){toParams=toParams||{},options=extend({location:!0,inherit:!1,relative:null,notify:!0,reload:!1,$retry:!1},options||{});var evt,from=$state.$current,fromParams=$state.params,fromPath=from.path,toState=findState(to,options.relative),hash=toParams["#"];if(!isDefined(toState)){var redirect={to:to,toParams:toParams,options:options},redirectResult=handleRedirect(redirect,from.self,fromParams,options);if(redirectResult)return redirectResult;if(
// Always retry once if the $stateNotFound was not prevented
// (handles either redirect changed or state lazy-definition)
to=redirect.to,toParams=redirect.toParams,options=redirect.options,toState=findState(to,options.relative),!isDefined(toState)){if(!options.relative)throw new Error("No such state '"+to+"'");throw new Error("Could not resolve '"+to+"' from state '"+options.relative+"'")}}if(toState[abstractKey])throw new Error("Cannot transition to abstract state '"+to+"'");if(options.inherit&&(toParams=inheritParams($stateParams,toParams||{},$state.$current,toState)),!toState.params.$$validates(toParams))return TransitionFailed;toParams=toState.params.$$values(toParams),to=toState;var toPath=to.path,keep=0,state=toPath[keep],locals=root.locals,toLocals=[];if(options.reload){if(isString(options.reload)||isObject(options.reload)){if(isObject(options.reload)&&!options.reload.name)throw new Error("Invalid reload state object");var reloadState=options.reload===!0?fromPath[0]:findState(options.reload);if(options.reload&&!reloadState)throw new Error("No such reload state '"+(isString(options.reload)?options.reload:options.reload.name)+"'");for(;state&&state===fromPath[keep]&&state!==reloadState;)locals=toLocals[keep]=state.locals,keep++,state=toPath[keep]}}else for(;state&&state===fromPath[keep]&&state.ownParams.$$equals(toParams,fromParams);)locals=toLocals[keep]=state.locals,keep++,state=toPath[keep];
// If we're going to the same state and all locals are kept, we've got nothing to do.
// But clear 'transition', as we still want to cancel any other pending transitions.
// TODO: We may not want to bump 'transition' if we're called from a location change
// that we've initiated ourselves, because we might accidentally abort a legitimate
// transition initiated from code?
if(shouldSkipReload(to,toParams,from,fromParams,locals,options))return hash&&(toParams["#"]=hash),$state.params=toParams,copy($state.params,$stateParams),options.location&&to.navigable&&to.navigable.url&&($urlRouter.push(to.navigable.url,toParams,{$$avoidResync:!0,replace:"replace"===options.location}),$urlRouter.update(!0)),$state.transition=null,$q.when($state.current);
// Broadcast start event and cancel the transition if requested
if(
// Filter parameters before we pass them to event handlers etc.
toParams=filterByKeys(to.params.$$keys(),toParams||{}),options.notify&&$rootScope.$broadcast("$stateChangeStart",to.self,toParams,from.self,fromParams).defaultPrevented)return $rootScope.$broadcast("$stateChangeCancel",to.self,toParams,from.self,fromParams),$urlRouter.update(),TransitionPrevented;for(var resolved=$q.when(locals),l=keep;l<toPath.length;l++,state=toPath[l])locals=toLocals[l]=inherit(locals),resolved=resolveState(state,toParams,state===to,resolved,locals,options);
// Once everything is resolved, we are ready to perform the actual transition
// and return a promise for the new state. We also keep track of what the
// current promise is, so that we can detect overlapping transitions and
// keep only the outcome of the last transition.
var transition=$state.transition=resolved.then(function(){var l,entering,exiting;if($state.transition!==transition)return TransitionSuperseded;
// Exit 'from' states not kept
for(l=fromPath.length-1;l>=keep;l--)exiting=fromPath[l],exiting.self.onExit&&$injector.invoke(exiting.self.onExit,exiting.self,exiting.locals.globals),exiting.locals=null;
// Enter 'to' states not kept
for(l=keep;l<toPath.length;l++)entering=toPath[l],entering.locals=toLocals[l],entering.self.onEnter&&$injector.invoke(entering.self.onEnter,entering.self,entering.locals.globals);
// Run it again, to catch any transitions in callbacks
// Re-add the saved hash before we start returning things
// Run it again, to catch any transitions in callbacks
// Update globals in $state
/**
         * @ngdoc event
         * @name ui.router.state.$state#$stateChangeSuccess
         * @eventOf ui.router.state.$state
         * @eventType broadcast on root scope
         * @description
         * Fired once the state transition is **complete**.
         *
         * @param {Object} event Event object.
         * @param {State} toState The state being transitioned to.
         * @param {Object} toParams The params supplied to the `toState`.
         * @param {State} fromState The current state, pre-transition.
         * @param {Object} fromParams The params supplied to the `fromState`.
         */
return hash&&(toParams["#"]=hash),$state.transition!==transition?TransitionSuperseded:($state.$current=to,$state.current=to.self,$state.params=toParams,copy($state.params,$stateParams),$state.transition=null,options.location&&to.navigable&&$urlRouter.push(to.navigable.url,to.navigable.locals.globals.$stateParams,{$$avoidResync:!0,replace:"replace"===options.location}),options.notify&&$rootScope.$broadcast("$stateChangeSuccess",to.self,toParams,from.self,fromParams),$urlRouter.update(!0),$state.current)},function(error){/**
         * @ngdoc event
         * @name ui.router.state.$state#$stateChangeError
         * @eventOf ui.router.state.$state
         * @eventType broadcast on root scope
         * @description
         * Fired when an **error occurs** during transition. It's important to note that if you
         * have any errors in your resolve functions (javascript errors, non-existent services, etc)
         * they will not throw traditionally. You must listen for this $stateChangeError event to
         * catch **ALL** errors.
         *
         * @param {Object} event Event object.
         * @param {State} toState The state being transitioned to.
         * @param {Object} toParams The params supplied to the `toState`.
         * @param {State} fromState The current state, pre-transition.
         * @param {Object} fromParams The params supplied to the `fromState`.
         * @param {Error} error The resolve error object.
         */
return $state.transition!==transition?TransitionSuperseded:($state.transition=null,evt=$rootScope.$broadcast("$stateChangeError",to.self,toParams,from.self,fromParams,error),evt.defaultPrevented||$urlRouter.update(),$q.reject(error))});return transition},$state.is=function(stateOrName,params,options){options=extend({relative:$state.$current},options||{});var state=findState(stateOrName,options.relative);return isDefined(state)?$state.$current===state&&(!params||equalForKeys(state.params.$$values(params),$stateParams)):undefined},$state.includes=function(stateOrName,params,options){if(options=extend({relative:$state.$current},options||{}),isString(stateOrName)&&isGlob(stateOrName)){if(!doesStateMatchGlob(stateOrName))return!1;stateOrName=$state.$current.name}var state=findState(stateOrName,options.relative);return isDefined(state)?!!isDefined($state.$current.includes[state.name])&&(!params||equalForKeys(state.params.$$values(params),$stateParams,objectKeys(params))):undefined},$state.href=function(stateOrName,params,options){options=extend({lossy:!0,inherit:!0,absolute:!1,relative:$state.$current},options||{});var state=findState(stateOrName,options.relative);if(!isDefined(state))return null;options.inherit&&(params=inheritParams($stateParams,params||{},$state.$current,state));var nav=state&&options.lossy?state.navigable:state;return nav&&nav.url!==undefined&&null!==nav.url?$urlRouter.href(nav.url,filterByKeys(state.params.$$keys().concat("#"),params||{}),{absolute:options.absolute}):null},$state.get=function(stateOrName,context){if(0===arguments.length)return map(objectKeys(states),function(name){return states[name].self});var state=findState(stateOrName,context||$state.$current);return state&&state.self?state.self:null},$state}function shouldSkipReload(to,toParams,from,fromParams,locals,options){
// Return true if there are no differences in non-search (path/object) params, false if there are differences
function nonSearchParamsEqual(fromAndToState,fromParams,toParams){
// Identify whether all the parameters that differ between `fromParams` and `toParams` were search params.
function notSearchParam(key){return"search"!=fromAndToState.params[key].location}var nonQueryParamKeys=fromAndToState.params.$$keys().filter(notSearchParam),nonQueryParams=pick.apply({},[fromAndToState.params].concat(nonQueryParamKeys)),nonQueryParamSet=new $$UMFP.ParamSet(nonQueryParams);return nonQueryParamSet.$$equals(fromParams,toParams)}
// If reload was not explicitly requested
// and we're transitioning to the same state we're already in
// and    the locals didn't change
//     or they changed in a way that doesn't merit reloading
//        (reloadOnParams:false, or reloadOnSearch.false and only search params changed)
// Then return true.
if(!options.reload&&to===from&&(locals===from.locals||to.self.reloadOnSearch===!1&&nonSearchParamsEqual(from,fromParams,toParams)))return!0}var root,$state,states={},queue={},abstractKey="abstract",stateBuilder={
// Derive parent state from a hierarchical name only if 'parent' is not explicitly defined.
// state.children = [];
// if (parent) parent.children.push(state);
parent:function(state){if(isDefined(state.parent)&&state.parent)return findState(state.parent);
// regex matches any valid composite state name
// would match "contact.list" but not "contacts"
var compositeName=/^(.+)\.[^.]+$/.exec(state.name);return compositeName?findState(compositeName[1]):root},
// inherit 'data' from parent and override by own values (if any)
data:function(state){return state.parent&&state.parent.data&&(state.data=state.self.data=extend({},state.parent.data,state.data)),state.data},
// Build a URLMatcher if necessary, either via a relative or absolute URL
url:function(state){var url=state.url,config={params:state.params||{}};if(isString(url))return"^"==url.charAt(0)?$urlMatcherFactory.compile(url.substring(1),config):(state.parent.navigable||root).url.concat(url,config);if(!url||$urlMatcherFactory.isMatcher(url))return url;throw new Error("Invalid url '"+url+"' in state '"+state+"'")},
// Keep track of the closest ancestor state that has a URL (i.e. is navigable)
navigable:function(state){return state.url?state:state.parent?state.parent.navigable:null},
// Own parameters for this state. state.url.params is already built at this point. Create and add non-url params
ownParams:function(state){var params=state.url&&state.url.params||new $$UMFP.ParamSet;return forEach(state.params||{},function(config,id){params[id]||(params[id]=new $$UMFP.Param(id,null,config,"config"))}),params},
// Derive parameters for this state and ensure they're a super-set of parent's parameters
params:function(state){return state.parent&&state.parent.params?extend(state.parent.params.$$new(),state.ownParams):new $$UMFP.ParamSet},
// If there is no explicit multi-view configuration, make one up so we don't have
// to handle both cases in the view directive later. Note that having an explicit
// 'views' property will mean the default unnamed view properties are ignored. This
// is also a good time to resolve view names to absolute names, so everything is a
// straight lookup at link time.
views:function(state){var views={};return forEach(isDefined(state.views)?state.views:{"":state},function(view,name){name.indexOf("@")<0&&(name+="@"+state.parent.name),views[name]=view}),views},
// Keep a full path from the root down to this state as this is needed for state activation.
path:function(state){return state.parent?state.parent.path.concat(state):[]},
// Speed up $state.contains() as it's used a lot
includes:function(state){var includes=state.parent?extend({},state.parent.includes):{};return includes[state.name]=!0,includes},$delegates:{}};
// Implicit root state that is always active
root=registerState({name:"",url:"^",views:null,"abstract":!0}),root.navigable=null,/**
   * @ngdoc function
   * @name ui.router.state.$stateProvider#decorator
   * @methodOf ui.router.state.$stateProvider
   *
   * @description
   * Allows you to extend (carefully) or override (at your own peril) the 
   * `stateBuilder` object used internally by `$stateProvider`. This can be used 
   * to add custom functionality to ui-router, for example inferring templateUrl 
   * based on the state name.
   *
   * When passing only a name, it returns the current (original or decorated) builder
   * function that matches `name`.
   *
   * The builder functions that can be decorated are listed below. Though not all
   * necessarily have a good use case for decoration, that is up to you to decide.
   *
   * In addition, users can attach custom decorators, which will generate new 
   * properties within the state's internal definition. There is currently no clear 
   * use-case for this beyond accessing internal states (i.e. $state.$current), 
   * however, expect this to become increasingly relevant as we introduce additional 
   * meta-programming features.
   *
   * **Warning**: Decorators should not be interdependent because the order of 
   * execution of the builder functions in non-deterministic. Builder functions 
   * should only be dependent on the state definition object and super function.
   *
   *
   * Existing builder functions and current return values:
   *
   * - **parent** `{object}` - returns the parent state object.
   * - **data** `{object}` - returns state data, including any inherited data that is not
   *   overridden by own values (if any).
   * - **url** `{object}` - returns a {@link ui.router.util.type:UrlMatcher UrlMatcher}
   *   or `null`.
   * - **navigable** `{object}` - returns closest ancestor state that has a URL (aka is 
   *   navigable).
   * - **params** `{object}` - returns an array of state params that are ensured to 
   *   be a super-set of parent's params.
   * - **views** `{object}` - returns a views object where each key is an absolute view 
   *   name (i.e. "viewName@stateName") and each value is the config object 
   *   (template, controller) for the view. Even when you don't use the views object 
   *   explicitly on a state config, one is still created for you internally.
   *   So by decorating this builder function you have access to decorating template 
   *   and controller properties.
   * - **ownParams** `{object}` - returns an array of params that belong to the state, 
   *   not including any params defined by ancestor states.
   * - **path** `{string}` - returns the full path from the root down to this state. 
   *   Needed for state activation.
   * - **includes** `{object}` - returns an object that includes every state that 
   *   would pass a `$state.includes()` test.
   *
   * @example
   * <pre>
   * // Override the internal 'views' builder with a function that takes the state
   * // definition, and a reference to the internal function being overridden:
   * $stateProvider.decorator('views', function (state, parent) {
   *   var result = {},
   *       views = parent(state);
   *
   *   angular.forEach(views, function (config, name) {
   *     var autoName = (state.name + '.' + name).replace('.', '/');
   *     config.templateUrl = config.templateUrl || '/partials/' + autoName + '.html';
   *     result[name] = config;
   *   });
   *   return result;
   * });
   *
   * $stateProvider.state('home', {
   *   views: {
   *     'contact.list': { controller: 'ListController' },
   *     'contact.item': { controller: 'ItemController' }
   *   }
   * });
   *
   * // ...
   *
   * $state.go('home');
   * // Auto-populates list and item views with /partials/home/contact/list.html,
   * // and /partials/home/contact/item.html, respectively.
   * </pre>
   *
   * @param {string} name The name of the builder function to decorate. 
   * @param {object} func A function that is responsible for decorating the original 
   * builder function. The function receives two parameters:
   *
   *   - `{object}` - state - The state config object.
   *   - `{object}` - super - The original builder function.
   *
   * @return {object} $stateProvider - $stateProvider instance
   */
this.decorator=decorator,/**
   * @ngdoc function
   * @name ui.router.state.$stateProvider#state
   * @methodOf ui.router.state.$stateProvider
   *
   * @description
   * Registers a state configuration under a given state name. The stateConfig object
   * has the following acceptable properties.
   *
   * @param {string} name A unique state name, e.g. "home", "about", "contacts".
   * To create a parent/child state use a dot, e.g. "about.sales", "home.newest".
   * @param {object} stateConfig State configuration object.
   * @param {string|function=} stateConfig.template
   * <a id='template'></a>
   *   html template as a string or a function that returns
   *   an html template as a string which should be used by the uiView directives. This property 
   *   takes precedence over templateUrl.
   *   
   *   If `template` is a function, it will be called with the following parameters:
   *
   *   - {array.&lt;object&gt;} - state parameters extracted from the current $location.path() by
   *     applying the current state
   *
   * <pre>template:
   *   "<h1>inline template definition</h1>" +
   *   "<div ui-view></div>"</pre>
   * <pre>template: function(params) {
   *       return "<h1>generated template</h1>"; }</pre>
   * </div>
   *
   * @param {string|function=} stateConfig.templateUrl
   * <a id='templateUrl'></a>
   *
   *   path or function that returns a path to an html
   *   template that should be used by uiView.
   *   
   *   If `templateUrl` is a function, it will be called with the following parameters:
   *
   *   - {array.&lt;object&gt;} - state parameters extracted from the current $location.path() by 
   *     applying the current state
   *
   * <pre>templateUrl: "home.html"</pre>
   * <pre>templateUrl: function(params) {
   *     return myTemplates[params.pageId]; }</pre>
   *
   * @param {function=} stateConfig.templateProvider
   * <a id='templateProvider'></a>
   *    Provider function that returns HTML content string.
   * <pre> templateProvider:
   *       function(MyTemplateService, params) {
   *         return MyTemplateService.getTemplate(params.pageId);
   *       }</pre>
   *
   * @param {string|function=} stateConfig.controller
   * <a id='controller'></a>
   *
   *  Controller fn that should be associated with newly
   *   related scope or the name of a registered controller if passed as a string.
   *   Optionally, the ControllerAs may be declared here.
   * <pre>controller: "MyRegisteredController"</pre>
   * <pre>controller:
   *     "MyRegisteredController as fooCtrl"}</pre>
   * <pre>controller: function($scope, MyService) {
   *     $scope.data = MyService.getData(); }</pre>
   *
   * @param {function=} stateConfig.controllerProvider
   * <a id='controllerProvider'></a>
   *
   * Injectable provider function that returns the actual controller or string.
   * <pre>controllerProvider:
   *   function(MyResolveData) {
   *     if (MyResolveData.foo)
   *       return "FooCtrl"
   *     else if (MyResolveData.bar)
   *       return "BarCtrl";
   *     else return function($scope) {
   *       $scope.baz = "Qux";
   *     }
   *   }</pre>
   *
   * @param {string=} stateConfig.controllerAs
   * <a id='controllerAs'></a>
   * 
   * A controller alias name. If present the controller will be
   *   published to scope under the controllerAs name.
   * <pre>controllerAs: "myCtrl"</pre>
   *
   * @param {string|object=} stateConfig.parent
   * <a id='parent'></a>
   * Optionally specifies the parent state of this state.
   *
   * <pre>parent: 'parentState'</pre>
   * <pre>parent: parentState // JS variable</pre>
   *
   * @param {object=} stateConfig.resolve
   * <a id='resolve'></a>
   *
   * An optional map&lt;string, function&gt; of dependencies which
   *   should be injected into the controller. If any of these dependencies are promises, 
   *   the router will wait for them all to be resolved before the controller is instantiated.
   *   If all the promises are resolved successfully, the $stateChangeSuccess event is fired
   *   and the values of the resolved promises are injected into any controllers that reference them.
   *   If any  of the promises are rejected the $stateChangeError event is fired.
   *
   *   The map object is:
   *   
   *   - key - {string}: name of dependency to be injected into controller
   *   - factory - {string|function}: If string then it is alias for service. Otherwise if function, 
   *     it is injected and return value it treated as dependency. If result is a promise, it is 
   *     resolved before its value is injected into controller.
   *
   * <pre>resolve: {
   *     myResolve1:
   *       function($http, $stateParams) {
   *         return $http.get("/api/foos/"+stateParams.fooID);
   *       }
   *     }</pre>
   *
   * @param {string=} stateConfig.url
   * <a id='url'></a>
   *
   *   A url fragment with optional parameters. When a state is navigated or
   *   transitioned to, the `$stateParams` service will be populated with any 
   *   parameters that were passed.
   *
   *   (See {@link ui.router.util.type:UrlMatcher UrlMatcher} `UrlMatcher`} for
   *   more details on acceptable patterns )
   *
   * examples:
   * <pre>url: "/home"
   * url: "/users/:userid"
   * url: "/books/{bookid:[a-zA-Z_-]}"
   * url: "/books/{categoryid:int}"
   * url: "/books/{publishername:string}/{categoryid:int}"
   * url: "/messages?before&after"
   * url: "/messages?{before:date}&{after:date}"
   * url: "/messages/:mailboxid?{before:date}&{after:date}"
   * </pre>
   *
   * @param {object=} stateConfig.views
   * <a id='views'></a>
   * an optional map&lt;string, object&gt; which defined multiple views, or targets views
   * manually/explicitly.
   *
   * Examples:
   *
   * Targets three named `ui-view`s in the parent state's template
   * <pre>views: {
   *     header: {
   *       controller: "headerCtrl",
   *       templateUrl: "header.html"
   *     }, body: {
   *       controller: "bodyCtrl",
   *       templateUrl: "body.html"
   *     }, footer: {
   *       controller: "footCtrl",
   *       templateUrl: "footer.html"
   *     }
   *   }</pre>
   *
   * Targets named `ui-view="header"` from grandparent state 'top''s template, and named `ui-view="body" from parent state's template.
   * <pre>views: {
   *     'header@top': {
   *       controller: "msgHeaderCtrl",
   *       templateUrl: "msgHeader.html"
   *     }, 'body': {
   *       controller: "messagesCtrl",
   *       templateUrl: "messages.html"
   *     }
   *   }</pre>
   *
   * @param {boolean=} [stateConfig.abstract=false]
   * <a id='abstract'></a>
   * An abstract state will never be directly activated,
   *   but can provide inherited properties to its common children states.
   * <pre>abstract: true</pre>
   *
   * @param {function=} stateConfig.onEnter
   * <a id='onEnter'></a>
   *
   * Callback function for when a state is entered. Good way
   *   to trigger an action or dispatch an event, such as opening a dialog.
   * If minifying your scripts, make sure to explictly annotate this function,
   * because it won't be automatically annotated by your build tools.
   *
   * <pre>onEnter: function(MyService, $stateParams) {
   *     MyService.foo($stateParams.myParam);
   * }</pre>
   *
   * @param {function=} stateConfig.onExit
   * <a id='onExit'></a>
   *
   * Callback function for when a state is exited. Good way to
   *   trigger an action or dispatch an event, such as opening a dialog.
   * If minifying your scripts, make sure to explictly annotate this function,
   * because it won't be automatically annotated by your build tools.
   *
   * <pre>onExit: function(MyService, $stateParams) {
   *     MyService.cleanup($stateParams.myParam);
   * }</pre>
   *
   * @param {boolean=} [stateConfig.reloadOnSearch=true]
   * <a id='reloadOnSearch'></a>
   *
   * If `false`, will not retrigger the same state
   *   just because a search/query parameter has changed (via $location.search() or $location.hash()). 
   *   Useful for when you'd like to modify $location.search() without triggering a reload.
   * <pre>reloadOnSearch: false</pre>
   *
   * @param {object=} stateConfig.data
   * <a id='data'></a>
   *
   * Arbitrary data object, useful for custom configuration.  The parent state's `data` is
   *   prototypally inherited.  In other words, adding a data property to a state adds it to
   *   the entire subtree via prototypal inheritance.
   *
   * <pre>data: {
   *     requiredRole: 'foo'
   * } </pre>
   *
   * @param {object=} stateConfig.params
   * <a id='params'></a>
   *
   * A map which optionally configures parameters declared in the `url`, or
   *   defines additional non-url parameters.  For each parameter being
   *   configured, add a configuration object keyed to the name of the parameter.
   *
   *   Each parameter configuration object may contain the following properties:
   *
   *   - ** value ** - {object|function=}: specifies the default value for this
   *     parameter.  This implicitly sets this parameter as optional.
   *
   *     When UI-Router routes to a state and no value is
   *     specified for this parameter in the URL or transition, the
   *     default value will be used instead.  If `value` is a function,
   *     it will be injected and invoked, and the return value used.
   *
   *     *Note*: `undefined` is treated as "no default value" while `null`
   *     is treated as "the default value is `null`".
   *
   *     *Shorthand*: If you only need to configure the default value of the
   *     parameter, you may use a shorthand syntax.   In the **`params`**
   *     map, instead mapping the param name to a full parameter configuration
   *     object, simply set map it to the default parameter value, e.g.:
   *
   * <pre>// define a parameter's default value
   * params: {
   *     param1: { value: "defaultValue" }
   * }
   * // shorthand default values
   * params: {
   *     param1: "defaultValue",
   *     param2: "param2Default"
   * }</pre>
   *
   *   - ** array ** - {boolean=}: *(default: false)* If true, the param value will be
   *     treated as an array of values.  If you specified a Type, the value will be
   *     treated as an array of the specified Type.  Note: query parameter values
   *     default to a special `"auto"` mode.
   *
   *     For query parameters in `"auto"` mode, if multiple  values for a single parameter
   *     are present in the URL (e.g.: `/foo?bar=1&bar=2&bar=3`) then the values
   *     are mapped to an array (e.g.: `{ foo: [ '1', '2', '3' ] }`).  However, if
   *     only one value is present (e.g.: `/foo?bar=1`) then the value is treated as single
   *     value (e.g.: `{ foo: '1' }`).
   *
   * <pre>params: {
   *     param1: { array: true }
   * }</pre>
   *
   *   - ** squash ** - {bool|string=}: `squash` configures how a default parameter value is represented in the URL when
   *     the current parameter value is the same as the default value. If `squash` is not set, it uses the
   *     configured default squash policy.
   *     (See {@link ui.router.util.$urlMatcherFactory#methods_defaultSquashPolicy `defaultSquashPolicy()`})
   *
   *   There are three squash settings:
   *
   *     - false: The parameter's default value is not squashed.  It is encoded and included in the URL
   *     - true: The parameter's default value is omitted from the URL.  If the parameter is preceeded and followed
   *       by slashes in the state's `url` declaration, then one of those slashes are omitted.
   *       This can allow for cleaner looking URLs.
   *     - `"<arbitrary string>"`: The parameter's default value is replaced with an arbitrary placeholder of  your choice.
   *
   * <pre>params: {
   *     param1: {
   *       value: "defaultId",
   *       squash: true
   * } }
   * // squash "defaultValue" to "~"
   * params: {
   *     param1: {
   *       value: "defaultValue",
   *       squash: "~"
   * } }
   * </pre>
   *
   *
   * @example
   * <pre>
   * // Some state name examples
   *
   * // stateName can be a single top-level name (must be unique).
   * $stateProvider.state("home", {});
   *
   * // Or it can be a nested state name. This state is a child of the
   * // above "home" state.
   * $stateProvider.state("home.newest", {});
   *
   * // Nest states as deeply as needed.
   * $stateProvider.state("home.newest.abc.xyz.inception", {});
   *
   * // state() returns $stateProvider, so you can chain state declarations.
   * $stateProvider
   *   .state("home", {})
   *   .state("about", {})
   *   .state("contacts", {});
   * </pre>
   *
   */
this.state=state,/**
   * @ngdoc object
   * @name ui.router.state.$state
   *
   * @requires $rootScope
   * @requires $q
   * @requires ui.router.state.$view
   * @requires $injector
   * @requires ui.router.util.$resolve
   * @requires ui.router.state.$stateParams
   * @requires ui.router.router.$urlRouter
   *
   * @property {object} params A param object, e.g. {sectionId: section.id)}, that 
   * you'd like to test against the current active state.
   * @property {object} current A reference to the state's config object. However 
   * you passed it in. Useful for accessing custom data.
   * @property {object} transition Currently pending transition. A promise that'll 
   * resolve or reject.
   *
   * @description
   * `$state` service is responsible for representing states as well as transitioning
   * between them. It also provides interfaces to ask for current state or even states
   * you're coming from.
   */
this.$get=$get,$get.$inject=["$rootScope","$q","$view","$injector","$resolve","$stateParams","$urlRouter","$location","$urlMatcherFactory"]}function $ViewProvider(){function $get($rootScope,$templateFactory){return{
// $view.load('full.viewName', { template: ..., controller: ..., resolve: ..., async: false, params: ... })
/**
       * @ngdoc function
       * @name ui.router.state.$view#load
       * @methodOf ui.router.state.$view
       *
       * @description
       *
       * @param {string} name name
       * @param {object} options option object.
       */
load:function(name,options){var result,defaults={template:null,controller:null,view:null,locals:null,notify:!0,async:!0,params:{}};/**
         * @ngdoc event
         * @name ui.router.state.$state#$viewContentLoading
         * @eventOf ui.router.state.$view
         * @eventType broadcast on root scope
         * @description
         *
         * Fired once the view **begins loading**, *before* the DOM is rendered.
         *
         * @param {Object} event Event object.
         * @param {Object} viewConfig The view config properties (template, controller, etc).
         *
         * @example
         *
         * <pre>
         * $scope.$on('$viewContentLoading',
         * function(event, viewConfig){
         *     // Access to all the view config properties.
         *     // and one special property 'targetView'
         *     // viewConfig.targetView
         * });
         * </pre>
         */
return options=extend(defaults,options),options.view&&(result=$templateFactory.fromConfig(options.view,options.params,options.locals)),result&&options.notify&&$rootScope.$broadcast("$viewContentLoading",options),result}}}this.$get=$get,/**
   * @ngdoc object
   * @name ui.router.state.$view
   *
   * @requires ui.router.util.$templateFactory
   * @requires $rootScope
   *
   * @description
   *
   */
$get.$inject=["$rootScope","$templateFactory"]}/**
 * @ngdoc object
 * @name ui.router.state.$uiViewScrollProvider
 *
 * @description
 * Provider that returns the {@link ui.router.state.$uiViewScroll} service function.
 */
function $ViewScrollProvider(){var useAnchorScroll=!1;/**
   * @ngdoc function
   * @name ui.router.state.$uiViewScrollProvider#useAnchorScroll
   * @methodOf ui.router.state.$uiViewScrollProvider
   *
   * @description
   * Reverts back to using the core [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll) service for
   * scrolling based on the url anchor.
   */
this.useAnchorScroll=function(){useAnchorScroll=!0},/**
   * @ngdoc object
   * @name ui.router.state.$uiViewScroll
   *
   * @requires $anchorScroll
   * @requires $timeout
   *
   * @description
   * When called with a jqLite element, it scrolls the element into view (after a
   * `$timeout` so the DOM has time to refresh).
   *
   * If you prefer to rely on `$anchorScroll` to scroll the view to the anchor,
   * this can be enabled by calling {@link ui.router.state.$uiViewScrollProvider#methods_useAnchorScroll `$uiViewScrollProvider.useAnchorScroll()`}.
   */
this.$get=["$anchorScroll","$timeout",function($anchorScroll,$timeout){return useAnchorScroll?$anchorScroll:function($element){return $timeout(function(){$element[0].scrollIntoView()},0,!1)}}]}function $ViewDirective($state,$injector,$uiViewScroll,$interpolate){function getService(){return $injector.has?function(service){return $injector.has(service)?$injector.get(service):null}:function(service){try{return $injector.get(service)}catch(e){return null}}}
// Returns a set of DOM manipulation functions based on which Angular version
// it should use
function getRenderer(attrs,scope){var statics=function(){return{enter:function(element,target,cb){target.after(element),cb()},leave:function(element,cb){element.remove(),cb()}}};if($animate)return{enter:function(element,target,cb){var promise=$animate.enter(element,null,target,cb);promise&&promise.then&&promise.then(cb)},leave:function(element,cb){var promise=$animate.leave(element,cb);promise&&promise.then&&promise.then(cb)}};if($animator){var animate=$animator&&$animator(scope,attrs);return{enter:function(element,target,cb){animate.enter(element,null,target),cb()},leave:function(element,cb){animate.leave(element),cb()}}}return statics()}var service=getService(),$animator=service("$animator"),$animate=service("$animate"),directive={restrict:"ECA",terminal:!0,priority:400,transclude:"element",compile:function(tElement,tAttrs,$transclude){return function(scope,$element,attrs){function cleanupLastView(){previousEl&&(previousEl.remove(),previousEl=null),currentScope&&(currentScope.$destroy(),currentScope=null),currentEl&&(renderer.leave(currentEl,function(){previousEl=null}),previousEl=currentEl,currentEl=null)}function updateView(firstTime){var newScope,name=getUiViewName(scope,attrs,$element,$interpolate),previousLocals=name&&$state.$current&&$state.$current.locals[name];if(firstTime||previousLocals!==latestLocals){// nothing to do
newScope=scope.$new(),latestLocals=$state.$current.locals[name];var clone=$transclude(newScope,function(clone){renderer.enter(clone,$element,function(){currentScope&&currentScope.$emit("$viewContentAnimationEnded"),(angular.isDefined(autoScrollExp)&&!autoScrollExp||scope.$eval(autoScrollExp))&&$uiViewScroll(clone)}),cleanupLastView()});currentEl=clone,currentScope=newScope,/**
           * @ngdoc event
           * @name ui.router.state.directive:ui-view#$viewContentLoaded
           * @eventOf ui.router.state.directive:ui-view
           * @eventType emits on ui-view directive scope
           * @description           *
           * Fired once the view is **loaded**, *after* the DOM is rendered.
           *
           * @param {Object} event Event object.
           */
currentScope.$emit("$viewContentLoaded"),currentScope.$eval(onloadExp)}}var previousEl,currentEl,currentScope,latestLocals,onloadExp=attrs.onload||"",autoScrollExp=attrs.autoscroll,renderer=getRenderer(attrs,scope);scope.$on("$stateChangeSuccess",function(){updateView(!1)}),scope.$on("$viewContentLoading",function(){updateView(!1)}),updateView(!0)}}};return directive}function $ViewDirectiveFill($compile,$controller,$state,$interpolate){return{restrict:"ECA",priority:-400,compile:function(tElement){var initial=tElement.html();return function(scope,$element,attrs){var current=$state.$current,name=getUiViewName(scope,attrs,$element,$interpolate),locals=current&&current.locals[name];if(locals){$element.data("$uiView",{name:name,state:locals.$$state}),$element.html(locals.$template?locals.$template:initial);var link=$compile($element.contents());if(locals.$$controller){locals.$scope=scope,locals.$element=$element;var controller=$controller(locals.$$controller,locals);locals.$$controllerAs&&(scope[locals.$$controllerAs]=controller),$element.data("$ngControllerController",controller),$element.children().data("$ngControllerController",controller)}link(scope)}}}}}/**
 * Shared ui-view code for both directives:
 * Given scope, element, and its attributes, return the view's name
 */
function getUiViewName(scope,attrs,element,$interpolate){var name=$interpolate(attrs.uiView||attrs.name||"")(scope),inherited=element.inheritedData("$uiView");return name.indexOf("@")>=0?name:name+"@"+(inherited?inherited.state.name:"")}function parseStateRef(ref,current){var parsed,preparsed=ref.match(/^\s*({[^}]*})\s*$/);if(preparsed&&(ref=current+"("+preparsed[1]+")"),parsed=ref.replace(/\n/g," ").match(/^([^(]+?)\s*(\((.*)\))?$/),!parsed||4!==parsed.length)throw new Error("Invalid state ref '"+ref+"'");return{state:parsed[1],paramExpr:parsed[3]||null}}function stateContext(el){var stateData=el.parent().inheritedData("$uiView");if(stateData&&stateData.state&&stateData.state.name)return stateData.state}function $StateRefDirective($state,$timeout){var allowedOptions=["location","inherit","reload","absolute"];return{restrict:"A",require:["?^uiSrefActive","?^uiSrefActiveEq"],link:function(scope,element,attrs,uiSrefActive){var ref=parseStateRef(attrs.uiSref,$state.current.name),params=null,base=stateContext(element)||$state.$current,hrefKind="[object SVGAnimatedString]"===Object.prototype.toString.call(element.prop("href"))?"xlink:href":"href",newHref=null,isAnchor="A"===element.prop("tagName").toUpperCase(),isForm="FORM"===element[0].nodeName,attr=isForm?"action":hrefKind,nav=!0,options={relative:base,inherit:!0},optionsOverride=scope.$eval(attrs.uiSrefOpts)||{};angular.forEach(allowedOptions,function(option){option in optionsOverride&&(options[option]=optionsOverride[option])});var update=function(newVal){if(newVal&&(params=angular.copy(newVal)),nav){newHref=$state.href(ref.state,params,options);var activeDirective=uiSrefActive[1]||uiSrefActive[0];return activeDirective&&activeDirective.$$addStateInfo(ref.state,params),null===newHref?(nav=!1,!1):void attrs.$set(attr,newHref)}};ref.paramExpr&&(scope.$watch(ref.paramExpr,function(newVal,oldVal){newVal!==params&&update(newVal)},!0),params=angular.copy(scope.$eval(ref.paramExpr))),update(),isForm||element.bind("click",function(e){var button=e.which||e.button;if(!(button>1||e.ctrlKey||e.metaKey||e.shiftKey||element.attr("target"))){
// HACK: This is to allow ng-clicks to be processed before the transition is initiated:
var transition=$timeout(function(){$state.go(ref.state,params,options)});e.preventDefault();
// if the state has no URL, ignore one preventDefault from the <a> directive.
var ignorePreventDefaultCount=isAnchor&&!newHref?1:0;e.preventDefault=function(){ignorePreventDefaultCount--<=0&&$timeout.cancel(transition)}}})}}}function $StateRefActiveDirective($state,$stateParams,$interpolate){return{restrict:"A",controller:["$scope","$element","$attrs",function($scope,$element,$attrs){
// Update route state
function update(){anyMatch()?$element.addClass(activeClass):$element.removeClass(activeClass)}function anyMatch(){for(var i=0;i<states.length;i++)if(isMatch(states[i].state,states[i].params))return!0;return!1}function isMatch(state,params){return"undefined"!=typeof $attrs.uiSrefActiveEq?$state.is(state.name,params):$state.includes(state.name,params)}var activeClass,states=[];
// There probably isn't much point in $observing this
// uiSrefActive and uiSrefActiveEq share the same directive object with some
// slight difference in logic routing
activeClass=$interpolate($attrs.uiSrefActiveEq||$attrs.uiSrefActive||"",!1)($scope),
// Allow uiSref to communicate with uiSrefActive[Equals]
this.$$addStateInfo=function(newState,newParams){var state=$state.get(newState,stateContext($element));states.push({state:state||{name:newState},params:newParams}),update()},$scope.$on("$stateChangeSuccess",update)}]}}function $IsStateFilter($state){var isFilter=function(state){return $state.is(state)};return isFilter.$stateful=!0,isFilter}function $IncludedByStateFilter($state){var includesFilter=function(state){return $state.includes(state)};return includesFilter.$stateful=!0,includesFilter}var isDefined=angular.isDefined,isFunction=angular.isFunction,isString=angular.isString,isObject=angular.isObject,isArray=angular.isArray,forEach=angular.forEach,extend=angular.extend,copy=angular.copy;/**
 * @ngdoc overview
 * @name ui.router.util
 *
 * @description
 * # ui.router.util sub-module
 *
 * This module is a dependency of other sub-modules. Do not include this module as a dependency
 * in your angular app (use {@link ui.router} module instead).
 *
 */
angular.module("ui.router.util",["ng"]),/**
 * @ngdoc overview
 * @name ui.router.router
 * 
 * @requires ui.router.util
 *
 * @description
 * # ui.router.router sub-module
 *
 * This module is a dependency of other sub-modules. Do not include this module as a dependency
 * in your angular app (use {@link ui.router} module instead).
 */
angular.module("ui.router.router",["ui.router.util"]),/**
 * @ngdoc overview
 * @name ui.router.state
 * 
 * @requires ui.router.router
 * @requires ui.router.util
 *
 * @description
 * # ui.router.state sub-module
 *
 * This module is a dependency of the main ui.router module. Do not include this module as a dependency
 * in your angular app (use {@link ui.router} module instead).
 * 
 */
angular.module("ui.router.state",["ui.router.router","ui.router.util"]),/**
 * @ngdoc overview
 * @name ui.router
 *
 * @requires ui.router.state
 *
 * @description
 * # ui.router
 * 
 * ## The main module for ui.router 
 * There are several sub-modules included with the ui.router module, however only this module is needed
 * as a dependency within your angular app. The other modules are for organization purposes. 
 *
 * The modules are:
 * * ui.router - the main "umbrella" module
 * * ui.router.router - 
 * 
 * *You'll need to include **only** this module as the dependency within your angular app.*
 * 
 * <pre>
 * <!doctype html>
 * <html ng-app="myApp">
 * <head>
 *   <script src="js/angular.js"></script>
 *   <!-- Include the ui-router script -->
 *   <script src="js/angular-ui-router.min.js"></script>
 *   <script>
 *     // ...and add 'ui.router' as a dependency
 *     var myApp = angular.module('myApp', ['ui.router']);
 *   </script>
 * </head>
 * <body>
 * </body>
 * </html>
 * </pre>
 */
angular.module("ui.router",["ui.router.state"]),angular.module("ui.router.compat",["ui.router"]),/**
 * @ngdoc object
 * @name ui.router.util.$resolve
 *
 * @requires $q
 * @requires $injector
 *
 * @description
 * Manages resolution of (acyclic) graphs of promises.
 */
$Resolve.$inject=["$q","$injector"],angular.module("ui.router.util").service("$resolve",$Resolve),/**
 * @ngdoc object
 * @name ui.router.util.$templateFactory
 *
 * @requires $http
 * @requires $templateCache
 * @requires $injector
 *
 * @description
 * Service. Manages loading of templates.
 */
$TemplateFactory.$inject=["$http","$templateCache","$injector"],angular.module("ui.router.util").service("$templateFactory",$TemplateFactory);var $$UMFP;/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#concat
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Returns a new matcher for a pattern constructed by appending the path part and adding the
 * search parameters of the specified pattern to this pattern. The current pattern is not
 * modified. This can be understood as creating a pattern for URLs that are relative to (or
 * suffixes of) the current pattern.
 *
 * @example
 * The following two matchers are equivalent:
 * <pre>
 * new UrlMatcher('/user/{id}?q').concat('/details?date');
 * new UrlMatcher('/user/{id}/details?q&date');
 * </pre>
 *
 * @param {string} pattern  The pattern to append.
 * @param {Object} config  An object hash of the configuration for the matcher.
 * @returns {UrlMatcher}  A matcher for the concatenated pattern.
 */
UrlMatcher.prototype.concat=function(pattern,config){
// Because order of search parameters is irrelevant, we can add our own search
// parameters to the end of the new pattern. Parse the new pattern by itself
// and then join the bits together, but it's much easier to do this on a string level.
var defaultConfig={caseInsensitive:$$UMFP.caseInsensitive(),strict:$$UMFP.strictMode(),squash:$$UMFP.defaultSquashPolicy()};return new UrlMatcher(this.sourcePath+pattern+this.sourceSearch,extend(defaultConfig,config),this)},UrlMatcher.prototype.toString=function(){return this.source},/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#exec
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Tests the specified path against this matcher, and returns an object containing the captured
 * parameter values, or null if the path does not match. The returned object contains the values
 * of any search parameters that are mentioned in the pattern, but their value may be null if
 * they are not present in `searchParams`. This means that search parameters are always treated
 * as optional.
 *
 * @example
 * <pre>
 * new UrlMatcher('/user/{id}?q&r').exec('/user/bob', {
 *   x: '1', q: 'hello'
 * });
 * // returns { id: 'bob', q: 'hello', r: null }
 * </pre>
 *
 * @param {string} path  The URL path to match, e.g. `$location.path()`.
 * @param {Object} searchParams  URL search parameters, e.g. `$location.search()`.
 * @returns {Object}  The captured parameter values.
 */
UrlMatcher.prototype.exec=function(path,searchParams){function decodePathArray(string){function reverseString(str){return str.split("").reverse().join("")}function unquoteDashes(str){return str.replace(/\\-/g,"-")}var split=reverseString(string).split(/-(?!\\)/),allReversed=map(split,reverseString);return map(allReversed,unquoteDashes).reverse()}var m=this.regexp.exec(path);if(!m)return null;searchParams=searchParams||{};var i,j,paramName,paramNames=this.parameters(),nTotal=paramNames.length,nPath=this.segments.length-1,values={};if(nPath!==m.length-1)throw new Error("Unbalanced capture group in route '"+this.source+"'");for(i=0;i<nPath;i++){paramName=paramNames[i];var param=this.params[paramName],paramVal=m[i+1];
// if the param value matches a pre-replace pair, replace the value before decoding.
for(j=0;j<param.replace;j++)param.replace[j].from===paramVal&&(paramVal=param.replace[j].to);paramVal&&param.array===!0&&(paramVal=decodePathArray(paramVal)),values[paramName]=param.value(paramVal)}for(;i<nTotal;i++)paramName=paramNames[i],values[paramName]=this.params[paramName].value(searchParams[paramName]);return values},/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#parameters
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Returns the names of all path and search parameters of this pattern in an unspecified order.
 *
 * @returns {Array.<string>}  An array of parameter names. Must be treated as read-only. If the
 *    pattern has no parameters, an empty array is returned.
 */
UrlMatcher.prototype.parameters=function(param){return isDefined(param)?this.params[param]||null:this.$$paramNames},/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#validate
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Checks an object hash of parameters to validate their correctness according to the parameter
 * types of this `UrlMatcher`.
 *
 * @param {Object} params The object hash of parameters to validate.
 * @returns {boolean} Returns `true` if `params` validates, otherwise `false`.
 */
UrlMatcher.prototype.validates=function(params){return this.params.$$validates(params)},/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#format
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Creates a URL that matches this pattern by substituting the specified values
 * for the path and search parameters. Null values for path parameters are
 * treated as empty strings.
 *
 * @example
 * <pre>
 * new UrlMatcher('/user/{id}?q').format({ id:'bob', q:'yes' });
 * // returns '/user/bob?q=yes'
 * </pre>
 *
 * @param {Object} values  the values to substitute for the parameters in this pattern.
 * @returns {string}  the formatted URL (path and optionally search part).
 */
UrlMatcher.prototype.format=function(values){function encodeDashes(str){// Replace dashes with encoded "\-"
return encodeURIComponent(str).replace(/-/g,function(c){return"%5C%"+c.charCodeAt(0).toString(16).toUpperCase()})}values=values||{};var segments=this.segments,params=this.parameters(),paramset=this.params;if(!this.validates(values))return null;var i,search=!1,nPath=segments.length-1,nTotal=params.length,result=segments[0];for(i=0;i<nTotal;i++){var isPathParam=i<nPath,name=params[i],param=paramset[name],value=param.value(values[name]),isDefaultValue=param.isOptional&&param.type.equals(param.value(),value),squash=!!isDefaultValue&&param.squash,encoded=param.type.encode(value);if(isPathParam){var nextSegment=segments[i+1];if(squash===!1)null!=encoded&&(result+=isArray(encoded)?map(encoded,encodeDashes).join("-"):encodeURIComponent(encoded)),result+=nextSegment;else if(squash===!0){var capture=result.match(/\/$/)?/\/?(.*)/:/(.*)/;result+=nextSegment.match(capture)[1]}else isString(squash)&&(result+=squash+nextSegment)}else{if(null==encoded||isDefaultValue&&squash!==!1)continue;isArray(encoded)||(encoded=[encoded]),encoded=map(encoded,encodeURIComponent).join("&"+name+"="),result+=(search?"&":"?")+(name+"="+encoded),search=!0}}return result},/**
 * @ngdoc function
 * @name ui.router.util.type:Type#is
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Detects whether a value is of a particular type. Accepts a native (decoded) value
 * and determines whether it matches the current `Type` object.
 *
 * @param {*} val  The value to check.
 * @param {string} key  Optional. If the type check is happening in the context of a specific
 *        {@link ui.router.util.type:UrlMatcher `UrlMatcher`} object, this is the name of the
 *        parameter in which `val` is stored. Can be used for meta-programming of `Type` objects.
 * @returns {Boolean}  Returns `true` if the value matches the type, otherwise `false`.
 */
Type.prototype.is=function(val,key){return!0},/**
 * @ngdoc function
 * @name ui.router.util.type:Type#encode
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Encodes a custom/native type value to a string that can be embedded in a URL. Note that the
 * return value does *not* need to be URL-safe (i.e. passed through `encodeURIComponent()`), it
 * only needs to be a representation of `val` that has been coerced to a string.
 *
 * @param {*} val  The value to encode.
 * @param {string} key  The name of the parameter in which `val` is stored. Can be used for
 *        meta-programming of `Type` objects.
 * @returns {string}  Returns a string representation of `val` that can be encoded in a URL.
 */
Type.prototype.encode=function(val,key){return val},/**
 * @ngdoc function
 * @name ui.router.util.type:Type#decode
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Converts a parameter value (from URL string or transition param) to a custom/native value.
 *
 * @param {string} val  The URL parameter value to decode.
 * @param {string} key  The name of the parameter in which `val` is stored. Can be used for
 *        meta-programming of `Type` objects.
 * @returns {*}  Returns a custom representation of the URL parameter value.
 */
Type.prototype.decode=function(val,key){return val},/**
 * @ngdoc function
 * @name ui.router.util.type:Type#equals
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Determines whether two decoded values are equivalent.
 *
 * @param {*} a  A value to compare against.
 * @param {*} b  A value to compare against.
 * @returns {Boolean}  Returns `true` if the values are equivalent/equal, otherwise `false`.
 */
Type.prototype.equals=function(a,b){return a==b},Type.prototype.$subPattern=function(){var sub=this.pattern.toString();return sub.substr(1,sub.length-2)},Type.prototype.pattern=/.*/,Type.prototype.toString=function(){return"{Type:"+this.name+"}"},/** Given an encoded string, or a decoded object, returns a decoded object */
Type.prototype.$normalize=function(val){return this.is(val)?val:this.decode(val)},/*
 * Wraps an existing custom Type as an array of Type, depending on 'mode'.
 * e.g.:
 * - urlmatcher pattern "/path?{queryParam[]:int}"
 * - url: "/path?queryParam=1&queryParam=2
 * - $stateParams.queryParam will be [1, 2]
 * if `mode` is "auto", then
 * - url: "/path?queryParam=1 will create $stateParams.queryParam: 1
 * - url: "/path?queryParam=1&queryParam=2 will create $stateParams.queryParam: [1, 2]
 */
Type.prototype.$asArray=function(mode,isSearch){function ArrayType(type,mode){function bindTo(type,callbackName){return function(){return type[callbackName].apply(type,arguments)}}
// Wrap non-array value as array
function arrayWrap(val){return isArray(val)?val:isDefined(val)?[val]:[]}
// Unwrap array value for "auto" mode. Return undefined for empty array.
function arrayUnwrap(val){switch(val.length){case 0:return undefined;case 1:return"auto"===mode?val[0]:val;default:return val}}function falsey(val){return!val}
// Wraps type (.is/.encode/.decode) functions to operate on each value of an array
function arrayHandler(callback,allTruthyMode){return function(val){val=arrayWrap(val);var result=map(val,callback);return allTruthyMode===!0?0===filter(result,falsey).length:arrayUnwrap(result)}}
// Wraps type (.equals) functions to operate on each value of an array
function arrayEqualsHandler(callback){return function(val1,val2){var left=arrayWrap(val1),right=arrayWrap(val2);if(left.length!==right.length)return!1;for(var i=0;i<left.length;i++)if(!callback(left[i],right[i]))return!1;return!0}}this.encode=arrayHandler(bindTo(type,"encode")),this.decode=arrayHandler(bindTo(type,"decode")),this.is=arrayHandler(bindTo(type,"is"),!0),this.equals=arrayEqualsHandler(bindTo(type,"equals")),this.pattern=type.pattern,this.$normalize=arrayHandler(bindTo(type,"$normalize")),this.name=type.name,this.$arrayMode=mode}if(!mode)return this;if("auto"===mode&&!isSearch)throw new Error("'auto' array mode is for query parameters only");return new ArrayType(this,mode)},
// Register as a provider so it's available to other providers
angular.module("ui.router.util").provider("$urlMatcherFactory",$UrlMatcherFactory),angular.module("ui.router.util").run(["$urlMatcherFactory",function($urlMatcherFactory){}]),/**
 * @ngdoc object
 * @name ui.router.router.$urlRouterProvider
 *
 * @requires ui.router.util.$urlMatcherFactoryProvider
 * @requires $locationProvider
 *
 * @description
 * `$urlRouterProvider` has the responsibility of watching `$location`. 
 * When `$location` changes it runs through a list of rules one by one until a 
 * match is found. `$urlRouterProvider` is used behind the scenes anytime you specify 
 * a url in a state configuration. All urls are compiled into a UrlMatcher object.
 *
 * There are several methods on `$urlRouterProvider` that make it useful to use directly
 * in your module config.
 */
$UrlRouterProvider.$inject=["$locationProvider","$urlMatcherFactoryProvider"],angular.module("ui.router.router").provider("$urlRouter",$UrlRouterProvider),/**
 * @ngdoc object
 * @name ui.router.state.$stateProvider
 *
 * @requires ui.router.router.$urlRouterProvider
 * @requires ui.router.util.$urlMatcherFactoryProvider
 *
 * @description
 * The new `$stateProvider` works similar to Angular's v1 router, but it focuses purely
 * on state.
 *
 * A state corresponds to a "place" in the application in terms of the overall UI and
 * navigation. A state describes (via the controller / template / view properties) what
 * the UI looks like and does at that place.
 *
 * States often have things in common, and the primary way of factoring out these
 * commonalities in this model is via the state hierarchy, i.e. parent/child states aka
 * nested states.
 *
 * The `$stateProvider` provides interfaces to declare these states for your app.
 */
$StateProvider.$inject=["$urlRouterProvider","$urlMatcherFactoryProvider"],angular.module("ui.router.state").value("$stateParams",{}).provider("$state",$StateProvider),$ViewProvider.$inject=[],angular.module("ui.router.state").provider("$view",$ViewProvider),angular.module("ui.router.state").provider("$uiViewScroll",$ViewScrollProvider),/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-view
 *
 * @requires ui.router.state.$state
 * @requires $compile
 * @requires $controller
 * @requires $injector
 * @requires ui.router.state.$uiViewScroll
 * @requires $document
 *
 * @restrict ECA
 *
 * @description
 * The ui-view directive tells $state where to place your templates.
 *
 * @param {string=} name A view name. The name should be unique amongst the other views in the
 * same state. You can have views of the same name that live in different states.
 *
 * @param {string=} autoscroll It allows you to set the scroll behavior of the browser window
 * when a view is populated. By default, $anchorScroll is overridden by ui-router's custom scroll
 * service, {@link ui.router.state.$uiViewScroll}. This custom service let's you
 * scroll ui-view elements into view when they are populated during a state activation.
 *
 * *Note: To revert back to old [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll)
 * functionality, call `$uiViewScrollProvider.useAnchorScroll()`.*
 *
 * @param {string=} onload Expression to evaluate whenever the view updates.
 * 
 * @example
 * A view can be unnamed or named. 
 * <pre>
 * <!-- Unnamed -->
 * <div ui-view></div> 
 * 
 * <!-- Named -->
 * <div ui-view="viewName"></div>
 * </pre>
 *
 * You can only have one unnamed view within any template (or root html). If you are only using a 
 * single view and it is unnamed then you can populate it like so:
 * <pre>
 * <div ui-view></div> 
 * $stateProvider.state("home", {
 *   template: "<h1>HELLO!</h1>"
 * })
 * </pre>
 * 
 * The above is a convenient shortcut equivalent to specifying your view explicitly with the {@link ui.router.state.$stateProvider#views `views`}
 * config property, by name, in this case an empty name:
 * <pre>
 * $stateProvider.state("home", {
 *   views: {
 *     "": {
 *       template: "<h1>HELLO!</h1>"
 *     }
 *   }    
 * })
 * </pre>
 * 
 * But typically you'll only use the views property if you name your view or have more than one view 
 * in the same template. There's not really a compelling reason to name a view if its the only one, 
 * but you could if you wanted, like so:
 * <pre>
 * <div ui-view="main"></div>
 * </pre> 
 * <pre>
 * $stateProvider.state("home", {
 *   views: {
 *     "main": {
 *       template: "<h1>HELLO!</h1>"
 *     }
 *   }    
 * })
 * </pre>
 * 
 * Really though, you'll use views to set up multiple views:
 * <pre>
 * <div ui-view></div>
 * <div ui-view="chart"></div> 
 * <div ui-view="data"></div> 
 * </pre>
 * 
 * <pre>
 * $stateProvider.state("home", {
 *   views: {
 *     "": {
 *       template: "<h1>HELLO!</h1>"
 *     },
 *     "chart": {
 *       template: "<chart_thing/>"
 *     },
 *     "data": {
 *       template: "<data_thing/>"
 *     }
 *   }    
 * })
 * </pre>
 *
 * Examples for `autoscroll`:
 *
 * <pre>
 * <!-- If autoscroll present with no expression,
 *      then scroll ui-view into view -->
 * <ui-view autoscroll/>
 *
 * <!-- If autoscroll present with valid expression,
 *      then scroll ui-view into view if expression evaluates to true -->
 * <ui-view autoscroll='true'/>
 * <ui-view autoscroll='false'/>
 * <ui-view autoscroll='scopeVariable'/>
 * </pre>
 */
$ViewDirective.$inject=["$state","$injector","$uiViewScroll","$interpolate"],$ViewDirectiveFill.$inject=["$compile","$controller","$state","$interpolate"],angular.module("ui.router.state").directive("uiView",$ViewDirective),angular.module("ui.router.state").directive("uiView",$ViewDirectiveFill),/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-sref
 *
 * @requires ui.router.state.$state
 * @requires $timeout
 *
 * @restrict A
 *
 * @description
 * A directive that binds a link (`<a>` tag) to a state. If the state has an associated 
 * URL, the directive will automatically generate & update the `href` attribute via 
 * the {@link ui.router.state.$state#methods_href $state.href()} method. Clicking 
 * the link will trigger a state transition with optional parameters. 
 *
 * Also middle-clicking, right-clicking, and ctrl-clicking on the link will be 
 * handled natively by the browser.
 *
 * You can also use relative state paths within ui-sref, just like the relative 
 * paths passed to `$state.go()`. You just need to be aware that the path is relative
 * to the state that the link lives in, in other words the state that loaded the 
 * template containing the link.
 *
 * You can specify options to pass to {@link ui.router.state.$state#go $state.go()}
 * using the `ui-sref-opts` attribute. Options are restricted to `location`, `inherit`,
 * and `reload`.
 *
 * @example
 * Here's an example of how you'd use ui-sref and how it would compile. If you have the 
 * following template:
 * <pre>
 * <a ui-sref="home">Home</a> | <a ui-sref="about">About</a> | <a ui-sref="{page: 2}">Next page</a>
 * 
 * <ul>
 *     <li ng-repeat="contact in contacts">
 *         <a ui-sref="contacts.detail({ id: contact.id })">{{ contact.name }}</a>
 *     </li>
 * </ul>
 * </pre>
 * 
 * Then the compiled html would be (assuming Html5Mode is off and current state is contacts):
 * <pre>
 * <a href="#/home" ui-sref="home">Home</a> | <a href="#/about" ui-sref="about">About</a> | <a href="#/contacts?page=2" ui-sref="{page: 2}">Next page</a>
 * 
 * <ul>
 *     <li ng-repeat="contact in contacts">
 *         <a href="#/contacts/1" ui-sref="contacts.detail({ id: contact.id })">Joe</a>
 *     </li>
 *     <li ng-repeat="contact in contacts">
 *         <a href="#/contacts/2" ui-sref="contacts.detail({ id: contact.id })">Alice</a>
 *     </li>
 *     <li ng-repeat="contact in contacts">
 *         <a href="#/contacts/3" ui-sref="contacts.detail({ id: contact.id })">Bob</a>
 *     </li>
 * </ul>
 *
 * <a ui-sref="home" ui-sref-opts="{reload: true}">Home</a>
 * </pre>
 *
 * @param {string} ui-sref 'stateName' can be any valid absolute or relative state
 * @param {Object} ui-sref-opts options to pass to {@link ui.router.state.$state#go $state.go()}
 */
$StateRefDirective.$inject=["$state","$timeout"],/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-sref-active
 *
 * @requires ui.router.state.$state
 * @requires ui.router.state.$stateParams
 * @requires $interpolate
 *
 * @restrict A
 *
 * @description
 * A directive working alongside ui-sref to add classes to an element when the
 * related ui-sref directive's state is active, and removing them when it is inactive.
 * The primary use-case is to simplify the special appearance of navigation menus
 * relying on `ui-sref`, by having the "active" state's menu button appear different,
 * distinguishing it from the inactive menu items.
 *
 * ui-sref-active can live on the same element as ui-sref or on a parent element. The first
 * ui-sref-active found at the same level or above the ui-sref will be used.
 *
 * Will activate when the ui-sref's target state or any child state is active. If you
 * need to activate only when the ui-sref target state is active and *not* any of
 * it's children, then you will use
 * {@link ui.router.state.directive:ui-sref-active-eq ui-sref-active-eq}
 *
 * @example
 * Given the following template:
 * <pre>
 * <ul>
 *   <li ui-sref-active="active" class="item">
 *     <a href ui-sref="app.user({user: 'bilbobaggins'})">@bilbobaggins</a>
 *   </li>
 * </ul>
 * </pre>
 *
 *
 * When the app state is "app.user" (or any children states), and contains the state parameter "user" with value "bilbobaggins",
 * the resulting HTML will appear as (note the 'active' class):
 * <pre>
 * <ul>
 *   <li ui-sref-active="active" class="item active">
 *     <a ui-sref="app.user({user: 'bilbobaggins'})" href="/users/bilbobaggins">@bilbobaggins</a>
 *   </li>
 * </ul>
 * </pre>
 *
 * The class name is interpolated **once** during the directives link time (any further changes to the
 * interpolated value are ignored).
 *
 * Multiple classes may be specified in a space-separated format:
 * <pre>
 * <ul>
 *   <li ui-sref-active='class1 class2 class3'>
 *     <a ui-sref="app.user">link</a>
 *   </li>
 * </ul>
 * </pre>
 */
/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-sref-active-eq
 *
 * @requires ui.router.state.$state
 * @requires ui.router.state.$stateParams
 * @requires $interpolate
 *
 * @restrict A
 *
 * @description
 * The same as {@link ui.router.state.directive:ui-sref-active ui-sref-active} but will only activate
 * when the exact target state used in the `ui-sref` is active; no child states.
 *
 */
$StateRefActiveDirective.$inject=["$state","$stateParams","$interpolate"],angular.module("ui.router.state").directive("uiSref",$StateRefDirective).directive("uiSrefActive",$StateRefActiveDirective).directive("uiSrefActiveEq",$StateRefActiveDirective),/**
 * @ngdoc filter
 * @name ui.router.state.filter:isState
 *
 * @requires ui.router.state.$state
 *
 * @description
 * Translates to {@link ui.router.state.$state#methods_is $state.is("stateName")}.
 */
$IsStateFilter.$inject=["$state"],/**
 * @ngdoc filter
 * @name ui.router.state.filter:includedByState
 *
 * @requires ui.router.state.$state
 *
 * @description
 * Translates to {@link ui.router.state.$state#methods_includes $state.includes('fullOrPartialStateName')}.
 */
$IncludedByStateFilter.$inject=["$state"],angular.module("ui.router.state").filter("isState",$IsStateFilter).filter("includedByState",$IncludedByStateFilter)}(window,window.angular),/**
 * @license AngularJS v1.5.8
 * (c) 2010-2016 Google, Inc. http://angularjs.org
 * License: MIT
 */
function(window,angular){"use strict";function assertArg(arg,name,reason){if(!arg)throw ngMinErr("areq","Argument '{0}' is {1}",name||"?",reason||"required");return arg}function mergeClasses(a,b){return a||b?a?b?(isArray(a)&&(a=a.join(" ")),isArray(b)&&(b=b.join(" ")),a+" "+b):a:b:""}function packageStyles(options){var styles={};return options&&(options.to||options.from)&&(styles.to=options.to,styles.from=options.from),styles}function pendClasses(classes,fix,isPrefix){var className="";return classes=isArray(classes)?classes:classes&&isString(classes)&&classes.length?classes.split(/\s+/):[],forEach(classes,function(klass,i){klass&&klass.length>0&&(className+=i>0?" ":"",className+=isPrefix?fix+klass:klass+fix)}),className}function removeFromArray(arr,val){var index=arr.indexOf(val);val>=0&&arr.splice(index,1)}function stripCommentsFromElement(element){if(element instanceof jqLite)switch(element.length){case 0:return element;case 1:
// there is no point of stripping anything if the element
// is the only element within the jqLite wrapper.
// (it's important that we retain the element instance.)
if(element[0].nodeType===ELEMENT_NODE)return element;break;default:return jqLite(extractElementNode(element))}if(element.nodeType===ELEMENT_NODE)return jqLite(element)}function extractElementNode(element){if(!element[0])return element;for(var i=0;i<element.length;i++){var elm=element[i];if(elm.nodeType==ELEMENT_NODE)return elm}}function $$addClass($$jqLite,element,className){forEach(element,function(elm){$$jqLite.addClass(elm,className)})}function $$removeClass($$jqLite,element,className){forEach(element,function(elm){$$jqLite.removeClass(elm,className)})}function applyAnimationClassesFactory($$jqLite){return function(element,options){options.addClass&&($$addClass($$jqLite,element,options.addClass),options.addClass=null),options.removeClass&&($$removeClass($$jqLite,element,options.removeClass),options.removeClass=null)}}function prepareAnimationOptions(options){if(options=options||{},!options.$$prepared){var domOperation=options.domOperation||noop;options.domOperation=function(){options.$$domOperationFired=!0,domOperation(),domOperation=noop},options.$$prepared=!0}return options}function applyAnimationStyles(element,options){applyAnimationFromStyles(element,options),applyAnimationToStyles(element,options)}function applyAnimationFromStyles(element,options){options.from&&(element.css(options.from),options.from=null)}function applyAnimationToStyles(element,options){options.to&&(element.css(options.to),options.to=null)}function mergeAnimationDetails(element,oldAnimation,newAnimation){var target=oldAnimation.options||{},newOptions=newAnimation.options||{},toAdd=(target.addClass||"")+" "+(newOptions.addClass||""),toRemove=(target.removeClass||"")+" "+(newOptions.removeClass||""),classes=resolveElementClasses(element.attr("class"),toAdd,toRemove);newOptions.preparationClasses&&(target.preparationClasses=concatWithSpace(newOptions.preparationClasses,target.preparationClasses),delete newOptions.preparationClasses);
// noop is basically when there is no callback; otherwise something has been set
var realDomOperation=target.domOperation!==noop?target.domOperation:null;
// TODO(matsko or sreeramu): proper fix is to maintain all animation callback in array and call at last,but now only leave has the callback so no issue with this.
return extend(target,newOptions),realDomOperation&&(target.domOperation=realDomOperation),classes.addClass?target.addClass=classes.addClass:target.addClass=null,classes.removeClass?target.removeClass=classes.removeClass:target.removeClass=null,oldAnimation.addClass=target.addClass,oldAnimation.removeClass=target.removeClass,target}function resolveElementClasses(existing,toAdd,toRemove){function splitClassesToLookup(classes){isString(classes)&&(classes=classes.split(" "));var obj={};return forEach(classes,function(klass){
// sometimes the split leaves empty string values
// incase extra spaces were applied to the options
klass.length&&(obj[klass]=!0)}),obj}var ADD_CLASS=1,REMOVE_CLASS=-1,flags={};existing=splitClassesToLookup(existing),toAdd=splitClassesToLookup(toAdd),forEach(toAdd,function(value,key){flags[key]=ADD_CLASS}),toRemove=splitClassesToLookup(toRemove),forEach(toRemove,function(value,key){flags[key]=flags[key]===ADD_CLASS?null:REMOVE_CLASS});var classes={addClass:"",removeClass:""};return forEach(flags,function(val,klass){var prop,allow;val===ADD_CLASS?(prop="addClass",allow=!existing[klass]||existing[klass+REMOVE_CLASS_SUFFIX]):val===REMOVE_CLASS&&(prop="removeClass",allow=existing[klass]||existing[klass+ADD_CLASS_SUFFIX]),allow&&(classes[prop].length&&(classes[prop]+=" "),classes[prop]+=klass)}),classes}function getDomNode(element){return element instanceof jqLite?element[0]:element}function applyGeneratedPreparationClasses(element,event,options){var classes="";event&&(classes=pendClasses(event,EVENT_CLASS_PREFIX,!0)),options.addClass&&(classes=concatWithSpace(classes,pendClasses(options.addClass,ADD_CLASS_SUFFIX))),options.removeClass&&(classes=concatWithSpace(classes,pendClasses(options.removeClass,REMOVE_CLASS_SUFFIX))),classes.length&&(options.preparationClasses=classes,element.addClass(classes))}function clearGeneratedClasses(element,options){options.preparationClasses&&(element.removeClass(options.preparationClasses),options.preparationClasses=null),options.activeClasses&&(element.removeClass(options.activeClasses),options.activeClasses=null)}function blockTransitions(node,duration){
// we use a negative delay value since it performs blocking
// yet it doesn't kill any existing transitions running on the
// same element which makes this safe for class-based animations
var value=duration?"-"+duration+"s":"";return applyInlineStyle(node,[TRANSITION_DELAY_PROP,value]),[TRANSITION_DELAY_PROP,value]}function blockKeyframeAnimations(node,applyBlock){var value=applyBlock?"paused":"",key=ANIMATION_PROP+ANIMATION_PLAYSTATE_KEY;return applyInlineStyle(node,[key,value]),[key,value]}function applyInlineStyle(node,styleTuple){var prop=styleTuple[0],value=styleTuple[1];node.style[prop]=value}function concatWithSpace(a,b){return a?b?a+" "+b:a:b}function getCssKeyframeDurationStyle(duration){return[ANIMATION_DURATION_PROP,duration+"s"]}function getCssDelayStyle(delay,isKeyframeAnimation){var prop=isKeyframeAnimation?ANIMATION_DELAY_PROP:TRANSITION_DELAY_PROP;return[prop,delay+"s"]}function computeCssStyles($window,element,properties){var styles=Object.create(null),detectedStyles=$window.getComputedStyle(element)||{};return forEach(properties,function(formalStyleName,actualStyleName){var val=detectedStyles[formalStyleName];if(val){var c=val.charAt(0);
// only numerical-based values have a negative sign or digit as the first value
("-"===c||"+"===c||c>=0)&&(val=parseMaxTime(val)),
// by setting this to null in the event that the delay is not set or is set directly as 0
// then we can still allow for negative values to be used later on and not mistake this
// value for being greater than any other negative value.
0===val&&(val=null),styles[actualStyleName]=val}}),styles}function parseMaxTime(str){var maxValue=0,values=str.split(/\s*,\s*/);return forEach(values,function(value){
// it's always safe to consider only second values and omit `ms` values since
// getComputedStyle will always handle the conversion for us
"s"==value.charAt(value.length-1)&&(value=value.substring(0,value.length-1)),value=parseFloat(value)||0,maxValue=maxValue?Math.max(value,maxValue):value}),maxValue}function truthyTimingValue(val){return 0===val||null!=val}function getCssTransitionDurationStyle(duration,applyOnlyDuration){var style=TRANSITION_PROP,value=duration+"s";return applyOnlyDuration?style+=DURATION_KEY:value+=" linear all",[style,value]}function createLocalCacheLookup(){var cache=Object.create(null);return{flush:function(){cache=Object.create(null)},count:function(key){var entry=cache[key];return entry?entry.total:0},get:function(key){var entry=cache[key];return entry&&entry.value},put:function(key,value){cache[key]?cache[key].total++:cache[key]={total:1,value:value}}}}
// we do not reassign an already present style value since
// if we detect the style property value again we may be
// detecting styles that were added via the `from` styles.
// We make use of `isDefined` here since an empty string
// or null value (which is what getPropertyValue will return
// for a non-existing style) will still be marked as a valid
// value for the style (a falsy value implies that the style
// is to be removed at the end of the animation). If we had a simple
// "OR" statement then it would not be enough to catch that.
function registerRestorableStyles(backup,node,properties){forEach(properties,function(prop){backup[prop]=isDefined(backup[prop])?backup[prop]:node.style.getPropertyValue(prop)})}var TRANSITION_PROP,TRANSITIONEND_EVENT,ANIMATION_PROP,ANIMATIONEND_EVENT,ELEMENT_NODE=1,ADD_CLASS_SUFFIX="-add",REMOVE_CLASS_SUFFIX="-remove",EVENT_CLASS_PREFIX="ng-",ACTIVE_CLASS_SUFFIX="-active",PREPARE_CLASS_SUFFIX="-prepare",NG_ANIMATE_CLASSNAME="ng-animate",NG_ANIMATE_CHILDREN_DATA="$$ngAnimateChildren",CSS_PREFIX="";
// If unprefixed events are not supported but webkit-prefixed are, use the latter.
// Otherwise, just use W3C names, browsers not supporting them at all will just ignore them.
// Note: Chrome implements `window.onwebkitanimationend` and doesn't implement `window.onanimationend`
// but at the same time dispatches the `animationend` event and not `webkitAnimationEnd`.
// Register both events in case `window.onanimationend` is not supported because of that,
// do the same for `transitionend` as Safari is likely to exhibit similar behavior.
// Also, the only modern browser that uses vendor prefixes for transitions/keyframes is webkit
// therefore there is no reason to test anymore for other vendor prefixes:
// http://caniuse.com/#search=transition
void 0===window.ontransitionend&&void 0!==window.onwebkittransitionend?(CSS_PREFIX="-webkit-",TRANSITION_PROP="WebkitTransition",TRANSITIONEND_EVENT="webkitTransitionEnd transitionend"):(TRANSITION_PROP="transition",TRANSITIONEND_EVENT="transitionend"),void 0===window.onanimationend&&void 0!==window.onwebkitanimationend?(CSS_PREFIX="-webkit-",ANIMATION_PROP="WebkitAnimation",ANIMATIONEND_EVENT="webkitAnimationEnd animationend"):(ANIMATION_PROP="animation",ANIMATIONEND_EVENT="animationend");var copy,extend,forEach,isArray,isDefined,isElement,isFunction,isObject,isString,isUndefined,jqLite,noop,DURATION_KEY="Duration",PROPERTY_KEY="Property",DELAY_KEY="Delay",TIMING_KEY="TimingFunction",ANIMATION_ITERATION_COUNT_KEY="IterationCount",ANIMATION_PLAYSTATE_KEY="PlayState",SAFE_FAST_FORWARD_DURATION_VALUE=9999,ANIMATION_DELAY_PROP=ANIMATION_PROP+DELAY_KEY,ANIMATION_DURATION_PROP=ANIMATION_PROP+DURATION_KEY,TRANSITION_DELAY_PROP=TRANSITION_PROP+DELAY_KEY,TRANSITION_DURATION_PROP=TRANSITION_PROP+DURATION_KEY,ngMinErr=angular.$$minErr("ng"),$$rAFSchedulerFactory=["$$rAF",function($$rAF){function scheduler(tasks){
// we make a copy since RAFScheduler mutates the state
// of the passed in array variable and this would be difficult
// to track down on the outside code
queue=queue.concat(tasks),nextTick()}function nextTick(){if(queue.length){for(var items=queue.shift(),i=0;i<items.length;i++)items[i]();cancelFn||$$rAF(function(){cancelFn||nextTick()})}}var queue,cancelFn;/* waitUntilQuiet does two things:
   * 1. It will run the FINAL `fn` value only when an uncanceled RAF has passed through
   * 2. It will delay the next wave of tasks from running until the quiet `fn` has run.
   *
   * The motivation here is that animation code can request more time from the scheduler
   * before the next wave runs. This allows for certain DOM properties such as classes to
   * be resolved in time for the next animation to run.
   */
return queue=scheduler.queue=[],scheduler.waitUntilQuiet=function(fn){cancelFn&&cancelFn(),cancelFn=$$rAF(function(){cancelFn=null,fn(),nextTick()})},scheduler}],$$AnimateChildrenDirective=["$interpolate",function($interpolate){return{link:function(scope,element,attrs){function setData(value){value="on"===value||"true"===value,element.data(NG_ANIMATE_CHILDREN_DATA,value)}var val=attrs.ngAnimateChildren;isString(val)&&0===val.length?//empty attribute
element.data(NG_ANIMATE_CHILDREN_DATA,!0):(
// Interpolate and set the value, so that it is available to
// animations that run right after compilation
setData($interpolate(val)(scope)),attrs.$observe("ngAnimateChildren",setData))}}}],ANIMATE_TIMER_KEY="$$animateCss",ONE_SECOND=1e3,ELAPSED_TIME_MAX_DECIMAL_PLACES=3,CLOSING_TIME_BUFFER=1.5,DETECT_CSS_PROPERTIES={transitionDuration:TRANSITION_DURATION_PROP,transitionDelay:TRANSITION_DELAY_PROP,transitionProperty:TRANSITION_PROP+PROPERTY_KEY,animationDuration:ANIMATION_DURATION_PROP,animationDelay:ANIMATION_DELAY_PROP,animationIterationCount:ANIMATION_PROP+ANIMATION_ITERATION_COUNT_KEY},DETECT_STAGGER_CSS_PROPERTIES={transitionDuration:TRANSITION_DURATION_PROP,transitionDelay:TRANSITION_DELAY_PROP,animationDuration:ANIMATION_DURATION_PROP,animationDelay:ANIMATION_DELAY_PROP},$AnimateCssProvider=["$animateProvider",function($animateProvider){var gcsLookup=createLocalCacheLookup(),gcsStaggerLookup=createLocalCacheLookup();this.$get=["$window","$$jqLite","$$AnimateRunner","$timeout","$$forceReflow","$sniffer","$$rAFScheduler","$$animateQueue",function($window,$$jqLite,$$AnimateRunner,$timeout,$$forceReflow,$sniffer,$$rAFScheduler,$$animateQueue){function gcsHashFn(node,extraClasses){var KEY="$$ngAnimateParentKey",parentNode=node.parentNode,parentID=parentNode[KEY]||(parentNode[KEY]=++parentCounter);return parentID+"-"+node.getAttribute("class")+"-"+extraClasses}function computeCachedCssStyles(node,className,cacheKey,properties){var timings=gcsLookup.get(cacheKey);
// we keep putting this in multiple times even though the value and the cacheKey are the same
// because we're keeping an internal tally of how many duplicate animations are detected.
return timings||(timings=computeCssStyles($window,node,properties),"infinite"===timings.animationIterationCount&&(timings.animationIterationCount=1)),gcsLookup.put(cacheKey,timings),timings}function computeCachedCssStaggerStyles(node,className,cacheKey,properties){var stagger;
// if we have one or more existing matches of matching elements
// containing the same parent + CSS styles (which is how cacheKey works)
// then staggering is possible
if(gcsLookup.count(cacheKey)>0&&(stagger=gcsStaggerLookup.get(cacheKey),!stagger)){var staggerClassName=pendClasses(className,"-stagger");$$jqLite.addClass(node,staggerClassName),stagger=computeCssStyles($window,node,properties),
// force the conversion of a null value to zero incase not set
stagger.animationDuration=Math.max(stagger.animationDuration,0),stagger.transitionDuration=Math.max(stagger.transitionDuration,0),$$jqLite.removeClass(node,staggerClassName),gcsStaggerLookup.put(cacheKey,stagger)}return stagger||{}}function waitUntilQuiet(callback){rafWaitQueue.push(callback),$$rAFScheduler.waitUntilQuiet(function(){gcsLookup.flush(),gcsStaggerLookup.flush();
// we use a for loop to ensure that if the queue is changed
// during this looping then it will consider new requests
for(var pageWidth=$$forceReflow(),i=0;i<rafWaitQueue.length;i++)rafWaitQueue[i](pageWidth);rafWaitQueue.length=0})}function computeTimings(node,className,cacheKey){var timings=computeCachedCssStyles(node,className,cacheKey,DETECT_CSS_PROPERTIES),aD=timings.animationDelay,tD=timings.transitionDelay;return timings.maxDelay=aD&&tD?Math.max(aD,tD):aD||tD,timings.maxDuration=Math.max(timings.animationDuration*timings.animationIterationCount,timings.transitionDuration),timings}var applyAnimationClasses=applyAnimationClassesFactory($$jqLite),parentCounter=0,rafWaitQueue=[];return function(element,initialOptions){function endFn(){close()}function cancelFn(){close(!0)}function close(rejected){// jshint ignore:line
// if the promise has been called already then we shouldn't close
// the animation again
if(!(animationClosed||animationCompleted&&animationPaused)){animationClosed=!0,animationPaused=!1,options.$$skipPreparationClasses||$$jqLite.removeClass(element,preparationClasses),$$jqLite.removeClass(element,activeClasses),blockKeyframeAnimations(node,!1),blockTransitions(node,!1),forEach(temporaryStyles,function(entry){
// There is only one way to remove inline style properties entirely from elements.
// By using `removeProperty` this works, but we need to convert camel-cased CSS
// styles down to hyphenated values.
node.style[entry[0]]=""}),applyAnimationClasses(element,options),applyAnimationStyles(element,options),Object.keys(restoreStyles).length&&forEach(restoreStyles,function(value,prop){value?node.style.setProperty(prop,value):node.style.removeProperty(prop)}),
// the reason why we have this option is to allow a synchronous closing callback
// that is fired as SOON as the animation ends (when the CSS is removed) or if
// the animation never takes off at all. A good example is a leave animation since
// the element must be removed just after the animation is over or else the element
// will appear on screen for one animation frame causing an overbearing flicker.
options.onDone&&options.onDone(),events&&events.length&&
// Remove the transitionend / animationend listener(s)
element.off(events.join(" "),onAnimationProgress);
//Cancel the fallback closing timeout and remove the timer data
var animationTimerData=element.data(ANIMATE_TIMER_KEY);animationTimerData&&($timeout.cancel(animationTimerData[0].timer),element.removeData(ANIMATE_TIMER_KEY)),
// if the preparation function fails then the promise is not setup
runner&&runner.complete(!rejected)}}function applyBlocking(duration){flags.blockTransition&&blockTransitions(node,duration),flags.blockKeyframeAnimation&&blockKeyframeAnimations(node,!!duration)}function closeAndReturnNoopAnimator(){
// should flush the cache animation
return runner=new $$AnimateRunner({end:endFn,cancel:cancelFn}),waitUntilQuiet(noop),close(),{$$willAnimate:!1,start:function(){return runner},end:endFn}}function onAnimationProgress(event){event.stopPropagation();var ev=event.originalEvent||event,timeStamp=ev.$manualTimeStamp||Date.now(),elapsedTime=parseFloat(ev.elapsedTime.toFixed(ELAPSED_TIME_MAX_DECIMAL_PLACES));/* $manualTimeStamp is a mocked timeStamp value which is set
         * within browserTrigger(). This is only here so that tests can
         * mock animations properly. Real events fallback to event.timeStamp,
         * or, if they don't, then a timeStamp is automatically created for them.
         * We're checking to see if the timeStamp surpasses the expected delay,
         * but we're using elapsedTime instead of the timeStamp on the 2nd
         * pre-condition since animationPauseds sometimes close off early */
Math.max(timeStamp-startTime,0)>=maxDelayTime&&elapsedTime>=maxDuration&&(
// we set this flag to ensure that if the transition is paused then, when resumed,
// the animation will automatically close itself since transitions cannot be paused.
animationCompleted=!0,close())}function start(){function triggerAnimationStart(){
// just incase a stagger animation kicks in when the animation
// itself was cancelled entirely
if(!animationClosed){if(applyBlocking(!1),forEach(temporaryStyles,function(entry){var key=entry[0],value=entry[1];node.style[key]=value}),applyAnimationClasses(element,options),$$jqLite.addClass(element,activeClasses),flags.recalculateTimingStyles){if(fullClassName=node.className+" "+preparationClasses,cacheKey=gcsHashFn(node,fullClassName),timings=computeTimings(node,fullClassName,cacheKey),relativeDelay=timings.maxDelay,maxDelay=Math.max(relativeDelay,0),maxDuration=timings.maxDuration,0===maxDuration)return void close();flags.hasTransitions=timings.transitionDuration>0,flags.hasAnimations=timings.animationDuration>0}if(flags.applyAnimationDelay&&(relativeDelay="boolean"!=typeof options.delay&&truthyTimingValue(options.delay)?parseFloat(options.delay):relativeDelay,maxDelay=Math.max(relativeDelay,0),timings.animationDelay=relativeDelay,delayStyle=getCssDelayStyle(relativeDelay,!0),temporaryStyles.push(delayStyle),node.style[delayStyle[0]]=delayStyle[1]),maxDelayTime=maxDelay*ONE_SECOND,maxDurationTime=maxDuration*ONE_SECOND,options.easing){var easeProp,easeVal=options.easing;flags.hasTransitions&&(easeProp=TRANSITION_PROP+TIMING_KEY,temporaryStyles.push([easeProp,easeVal]),node.style[easeProp]=easeVal),flags.hasAnimations&&(easeProp=ANIMATION_PROP+TIMING_KEY,temporaryStyles.push([easeProp,easeVal]),node.style[easeProp]=easeVal)}timings.transitionDuration&&events.push(TRANSITIONEND_EVENT),timings.animationDuration&&events.push(ANIMATIONEND_EVENT),startTime=Date.now();var timerTime=maxDelayTime+CLOSING_TIME_BUFFER*maxDurationTime,endTime=startTime+timerTime,animationsData=element.data(ANIMATE_TIMER_KEY)||[],setupFallbackTimer=!0;if(animationsData.length){var currentTimerData=animationsData[0];setupFallbackTimer=endTime>currentTimerData.expectedEndTime,setupFallbackTimer?$timeout.cancel(currentTimerData.timer):animationsData.push(close)}if(setupFallbackTimer){var timer=$timeout(onAnimationExpired,timerTime,!1);animationsData[0]={timer:timer,expectedEndTime:endTime},animationsData.push(close),element.data(ANIMATE_TIMER_KEY,animationsData)}events.length&&element.on(events.join(" "),onAnimationProgress),options.to&&(options.cleanupStyles&&registerRestorableStyles(restoreStyles,node,Object.keys(options.to)),applyAnimationToStyles(element,options))}}function onAnimationExpired(){var animationsData=element.data(ANIMATE_TIMER_KEY);
// this will be false in the event that the element was
// removed from the DOM (via a leave animation or something
// similar)
if(animationsData){for(var i=1;i<animationsData.length;i++)animationsData[i]();element.removeData(ANIMATE_TIMER_KEY)}}if(!animationClosed){if(!node.parentNode)return void close();
// even though we only pause keyframe animations here the pause flag
// will still happen when transitions are used. Only the transition will
// not be paused since that is not possible. If the animation ends when
// paused then it will not complete until unpaused or cancelled.
var playPause=function(playAnimation){if(animationCompleted)animationPaused&&playAnimation&&(animationPaused=!1,close());else if(animationPaused=!playAnimation,timings.animationDuration){var value=blockKeyframeAnimations(node,animationPaused);animationPaused?temporaryStyles.push(value):removeFromArray(temporaryStyles,value)}},maxStagger=itemIndex>0&&(timings.transitionDuration&&0===stagger.transitionDuration||timings.animationDuration&&0===stagger.animationDuration)&&Math.max(stagger.animationDelay,stagger.transitionDelay);maxStagger?$timeout(triggerAnimationStart,Math.floor(maxStagger*itemIndex*ONE_SECOND),!1):triggerAnimationStart(),
// this will decorate the existing promise runner with pause/resume methods
runnerHost.resume=function(){playPause(!0)},runnerHost.pause=function(){playPause(!1)}}}
// all of the animation functions should create
// a copy of the options data, however, if a
// parent service has already created a copy then
// we should stick to using that
var options=initialOptions||{};options.$$prepared||(options=prepareAnimationOptions(copy(options)));var restoreStyles={},node=getDomNode(element);if(!node||!node.parentNode||!$$animateQueue.enabled())return closeAndReturnNoopAnimator();var animationClosed,animationPaused,animationCompleted,runner,runnerHost,maxDelay,maxDelayTime,maxDuration,maxDurationTime,startTime,temporaryStyles=[],classes=element.attr("class"),styles=packageStyles(options),events=[];if(0===options.duration||!$sniffer.animations&&!$sniffer.transitions)return closeAndReturnNoopAnimator();var method=options.event&&isArray(options.event)?options.event.join(" "):options.event,isStructural=method&&options.structural,structuralClassName="",addRemoveClassName="";isStructural?structuralClassName=pendClasses(method,EVENT_CLASS_PREFIX,!0):method&&(structuralClassName=method),options.addClass&&(addRemoveClassName+=pendClasses(options.addClass,ADD_CLASS_SUFFIX)),options.removeClass&&(addRemoveClassName.length&&(addRemoveClassName+=" "),addRemoveClassName+=pendClasses(options.removeClass,REMOVE_CLASS_SUFFIX)),
// there may be a situation where a structural animation is combined together
// with CSS classes that need to resolve before the animation is computed.
// However this means that there is no explicit CSS code to block the animation
// from happening (by setting 0s none in the class name). If this is the case
// we need to apply the classes before the first rAF so we know to continue if
// there actually is a detected transition or keyframe animation
options.applyClassesEarly&&addRemoveClassName.length&&applyAnimationClasses(element,options);var preparationClasses=[structuralClassName,addRemoveClassName].join(" ").trim(),fullClassName=classes+" "+preparationClasses,activeClasses=pendClasses(preparationClasses,ACTIVE_CLASS_SUFFIX),hasToStyles=styles.to&&Object.keys(styles.to).length>0,containsKeyframeAnimation=(options.keyframeStyle||"").length>0;
// there is no way we can trigger an animation if no styles and
// no classes are being applied which would then trigger a transition,
// unless there a is raw keyframe value that is applied to the element.
if(!containsKeyframeAnimation&&!hasToStyles&&!preparationClasses)return closeAndReturnNoopAnimator();var cacheKey,stagger;if(options.stagger>0){var staggerVal=parseFloat(options.stagger);stagger={transitionDelay:staggerVal,animationDelay:staggerVal,transitionDuration:0,animationDuration:0}}else cacheKey=gcsHashFn(node,fullClassName),stagger=computeCachedCssStaggerStyles(node,preparationClasses,cacheKey,DETECT_STAGGER_CSS_PROPERTIES);options.$$skipPreparationClasses||$$jqLite.addClass(element,preparationClasses);var applyOnlyDuration;if(options.transitionStyle){var transitionStyle=[TRANSITION_PROP,options.transitionStyle];applyInlineStyle(node,transitionStyle),temporaryStyles.push(transitionStyle)}if(options.duration>=0){applyOnlyDuration=node.style[TRANSITION_PROP].length>0;var durationStyle=getCssTransitionDurationStyle(options.duration,applyOnlyDuration);
// we set the duration so that it will be picked up by getComputedStyle later
applyInlineStyle(node,durationStyle),temporaryStyles.push(durationStyle)}if(options.keyframeStyle){var keyframeStyle=[ANIMATION_PROP,options.keyframeStyle];applyInlineStyle(node,keyframeStyle),temporaryStyles.push(keyframeStyle)}var itemIndex=stagger?options.staggerIndex>=0?options.staggerIndex:gcsLookup.count(cacheKey):0,isFirst=0===itemIndex;
// this is a pre-emptive way of forcing the setup classes to be added and applied INSTANTLY
// without causing any combination of transitions to kick in. By adding a negative delay value
// it forces the setup class' transition to end immediately. We later then remove the negative
// transition delay to allow for the transition to naturally do it's thing. The beauty here is
// that if there is no transition defined then nothing will happen and this will also allow
// other transitions to be stacked on top of each other without any chopping them out.
isFirst&&!options.skipBlocking&&blockTransitions(node,SAFE_FAST_FORWARD_DURATION_VALUE);var timings=computeTimings(node,fullClassName,cacheKey),relativeDelay=timings.maxDelay;maxDelay=Math.max(relativeDelay,0),maxDuration=timings.maxDuration;var flags={};if(flags.hasTransitions=timings.transitionDuration>0,flags.hasAnimations=timings.animationDuration>0,flags.hasTransitionAll=flags.hasTransitions&&"all"==timings.transitionProperty,flags.applyTransitionDuration=hasToStyles&&(flags.hasTransitions&&!flags.hasTransitionAll||flags.hasAnimations&&!flags.hasTransitions),flags.applyAnimationDuration=options.duration&&flags.hasAnimations,flags.applyTransitionDelay=truthyTimingValue(options.delay)&&(flags.applyTransitionDuration||flags.hasTransitions),flags.applyAnimationDelay=truthyTimingValue(options.delay)&&flags.hasAnimations,flags.recalculateTimingStyles=addRemoveClassName.length>0,(flags.applyTransitionDuration||flags.applyAnimationDuration)&&(maxDuration=options.duration?parseFloat(options.duration):maxDuration,flags.applyTransitionDuration&&(flags.hasTransitions=!0,timings.transitionDuration=maxDuration,applyOnlyDuration=node.style[TRANSITION_PROP+PROPERTY_KEY].length>0,temporaryStyles.push(getCssTransitionDurationStyle(maxDuration,applyOnlyDuration))),flags.applyAnimationDuration&&(flags.hasAnimations=!0,timings.animationDuration=maxDuration,temporaryStyles.push(getCssKeyframeDurationStyle(maxDuration)))),0===maxDuration&&!flags.recalculateTimingStyles)return closeAndReturnNoopAnimator();if(null!=options.delay){var delayStyle;"boolean"!=typeof options.delay&&(delayStyle=parseFloat(options.delay),
// number in options.delay means we have to recalculate the delay for the closing timeout
maxDelay=Math.max(delayStyle,0)),flags.applyTransitionDelay&&temporaryStyles.push(getCssDelayStyle(delayStyle)),flags.applyAnimationDelay&&temporaryStyles.push(getCssDelayStyle(delayStyle,!0))}
// TODO(matsko): for 1.5 change this code to have an animator object for better debugging
// we need to recalculate the delay value since we used a pre-emptive negative
// delay value and the delay value is required for the final event checking. This
// property will ensure that this will happen after the RAF phase has passed.
return null==options.duration&&timings.transitionDuration>0&&(flags.recalculateTimingStyles=flags.recalculateTimingStyles||isFirst),maxDelayTime=maxDelay*ONE_SECOND,maxDurationTime=maxDuration*ONE_SECOND,options.skipBlocking||(flags.blockTransition=timings.transitionDuration>0,flags.blockKeyframeAnimation=timings.animationDuration>0&&stagger.animationDelay>0&&0===stagger.animationDuration),options.from&&(options.cleanupStyles&&registerRestorableStyles(restoreStyles,node,Object.keys(options.from)),applyAnimationFromStyles(element,options)),flags.blockTransition||flags.blockKeyframeAnimation?applyBlocking(maxDuration):options.skipBlocking||blockTransitions(node,!1),{$$willAnimate:!0,end:endFn,start:function(){if(!animationClosed)
// we don't have access to pause/resume the animation
// since it hasn't run yet. AnimateRunner will therefore
// set noop functions for resume and pause and they will
// later be overridden once the animation is triggered
return runnerHost={end:endFn,cancel:cancelFn,resume:null,//this will be set during the start() phase
pause:null},runner=new $$AnimateRunner(runnerHost),waitUntilQuiet(start),runner}}}}]}],$$AnimateCssDriverProvider=["$$animationProvider",function($$animationProvider){function isDocumentFragment(node){return node.parentNode&&11===node.parentNode.nodeType}$$animationProvider.drivers.push("$$animateCssDriver");var NG_ANIMATE_SHIM_CLASS_NAME="ng-animate-shim",NG_ANIMATE_ANCHOR_CLASS_NAME="ng-anchor",NG_OUT_ANCHOR_CLASS_NAME="ng-anchor-out",NG_IN_ANCHOR_CLASS_NAME="ng-anchor-in";this.$get=["$animateCss","$rootScope","$$AnimateRunner","$rootElement","$sniffer","$$jqLite","$document",function($animateCss,$rootScope,$$AnimateRunner,$rootElement,$sniffer,$$jqLite,$document){function filterCssClasses(classes){
//remove all the `ng-` stuff
return classes.replace(/\bng-\S+\b/g,"")}function getUniqueValues(a,b){return isString(a)&&(a=a.split(" ")),isString(b)&&(b=b.split(" ")),a.filter(function(val){return b.indexOf(val)===-1}).join(" ")}function prepareAnchoredAnimation(classes,outAnchor,inAnchor){function calculateAnchorStyles(anchor){var styles={},coords=getDomNode(anchor).getBoundingClientRect();
// we iterate directly since safari messes up and doesn't return
// all the keys for the coords object when iterated
return forEach(["width","height","top","left"],function(key){var value=coords[key];switch(key){case"top":value+=bodyNode.scrollTop;break;case"left":value+=bodyNode.scrollLeft}styles[key]=Math.floor(value)+"px"}),styles}function prepareOutAnimation(){var animator=$animateCss(clone,{addClass:NG_OUT_ANCHOR_CLASS_NAME,delay:!0,from:calculateAnchorStyles(outAnchor)});
// read the comment within `prepareRegularAnimation` to understand
// why this check is necessary
return animator.$$willAnimate?animator:null}function getClassVal(element){return element.attr("class")||""}function prepareInAnimation(){var endingClasses=filterCssClasses(getClassVal(inAnchor)),toAdd=getUniqueValues(endingClasses,startingClasses),toRemove=getUniqueValues(startingClasses,endingClasses),animator=$animateCss(clone,{to:calculateAnchorStyles(inAnchor),addClass:NG_IN_ANCHOR_CLASS_NAME+" "+toAdd,removeClass:NG_OUT_ANCHOR_CLASS_NAME+" "+toRemove,delay:!0});
// read the comment within `prepareRegularAnimation` to understand
// why this check is necessary
return animator.$$willAnimate?animator:null}function end(){clone.remove(),outAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME),inAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME)}var clone=jqLite(getDomNode(outAnchor).cloneNode(!0)),startingClasses=filterCssClasses(getClassVal(clone));outAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME),inAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME),clone.addClass(NG_ANIMATE_ANCHOR_CLASS_NAME),rootBodyElement.append(clone);var animatorIn,animatorOut=prepareOutAnimation();
// the user may not end up using the `out` animation and
// only making use of the `in` animation or vice-versa.
// In either case we should allow this and not assume the
// animation is over unless both animations are not used.
if(!animatorOut&&(animatorIn=prepareInAnimation(),!animatorIn))return end();var startingAnimator=animatorOut||animatorIn;return{start:function(){function endFn(){currentAnimation&&currentAnimation.end()}var runner,currentAnimation=startingAnimator.start();return currentAnimation.done(function(){
// in the event that there is no `in` animation
return currentAnimation=null,!animatorIn&&(animatorIn=prepareInAnimation())?(currentAnimation=animatorIn.start(),currentAnimation.done(function(){currentAnimation=null,end(),runner.complete()}),currentAnimation):(end(),void runner.complete())}),runner=new $$AnimateRunner({end:endFn,cancel:endFn})}}}function prepareFromToAnchorAnimation(from,to,classes,anchors){var fromAnimation=prepareRegularAnimation(from,noop),toAnimation=prepareRegularAnimation(to,noop),anchorAnimations=[];
// no point in doing anything when there are no elements to animate
if(forEach(anchors,function(anchor){var outElement=anchor.out,inElement=anchor["in"],animator=prepareAnchoredAnimation(classes,outElement,inElement);animator&&anchorAnimations.push(animator)}),fromAnimation||toAnimation||0!==anchorAnimations.length)return{start:function(){function endFn(){forEach(animationRunners,function(runner){runner.end()})}var animationRunners=[];fromAnimation&&animationRunners.push(fromAnimation.start()),toAnimation&&animationRunners.push(toAnimation.start()),forEach(anchorAnimations,function(animation){animationRunners.push(animation.start())});var runner=new $$AnimateRunner({end:endFn,cancel:endFn});return $$AnimateRunner.all(animationRunners,function(status){runner.complete(status)}),runner}}}function prepareRegularAnimation(animationDetails){var element=animationDetails.element,options=animationDetails.options||{};animationDetails.structural&&(options.event=animationDetails.event,options.structural=!0,options.applyClassesEarly=!0,
// we special case the leave animation since we want to ensure that
// the element is removed as soon as the animation is over. Otherwise
// a flicker might appear or the element may not be removed at all
"leave"===animationDetails.event&&(options.onDone=options.domOperation)),
// We assign the preparationClasses as the actual animation event since
// the internals of $animateCss will just suffix the event token values
// with `-active` to trigger the animation.
options.preparationClasses&&(options.event=concatWithSpace(options.event,options.preparationClasses));var animator=$animateCss(element,options);
// the driver lookup code inside of $$animation attempts to spawn a
// driver one by one until a driver returns a.$$willAnimate animator object.
// $animateCss will always return an object, however, it will pass in
// a flag as a hint as to whether an animation was detected or not
return animator.$$willAnimate?animator:null}
// only browsers that support these properties can render animations
if(!$sniffer.animations&&!$sniffer.transitions)return noop;var bodyNode=$document[0].body,rootNode=getDomNode($rootElement),rootBodyElement=jqLite(
// this is to avoid using something that exists outside of the body
// we also special case the doc fragment case because our unit test code
// appends the $rootElement to the body after the app has been bootstrapped
isDocumentFragment(rootNode)||bodyNode.contains(rootNode)?rootNode:bodyNode);applyAnimationClassesFactory($$jqLite);return function(animationDetails){return animationDetails.from&&animationDetails.to?prepareFromToAnchorAnimation(animationDetails.from,animationDetails.to,animationDetails.classes,animationDetails.anchors):prepareRegularAnimation(animationDetails)}}]}],$$AnimateJsProvider=["$animateProvider",function($animateProvider){this.$get=["$injector","$$AnimateRunner","$$jqLite",function($injector,$$AnimateRunner,$$jqLite){function lookupAnimations(classes){classes=isArray(classes)?classes:classes.split(" ");for(var matches=[],flagMap={},i=0;i<classes.length;i++){var klass=classes[i],animationFactory=$animateProvider.$$registeredAnimations[klass];animationFactory&&!flagMap[klass]&&(matches.push($injector.get(animationFactory)),flagMap[klass]=!0)}return matches}var applyAnimationClasses=applyAnimationClassesFactory($$jqLite);
// $animateJs(element, 'enter');
return function(element,event,classes,options){function applyOptions(){options.domOperation(),applyAnimationClasses(element,options)}function close(){animationClosed=!0,applyOptions(),applyAnimationStyles(element,options)}function executeAnimationFn(fn,element,event,options,onDone){var args;switch(event){case"animate":args=[element,options.from,options.to,onDone];break;case"setClass":args=[element,classesToAdd,classesToRemove,onDone];break;case"addClass":args=[element,classesToAdd,onDone];break;case"removeClass":args=[element,classesToRemove,onDone];break;default:args=[element,onDone]}args.push(options);var value=fn.apply(fn,args);if(value)if(isFunction(value.start)&&(value=value.start()),value instanceof $$AnimateRunner)value.done(onDone);else if(isFunction(value))
// optional onEnd / onCancel callback
return value;return noop}function groupEventedAnimations(element,event,options,animations,fnName){var operations=[];return forEach(animations,function(ani){var animation=ani[fnName];animation&&
// note that all of these animations will run in parallel
operations.push(function(){var runner,endProgressCb,resolved=!1,onAnimationComplete=function(rejected){resolved||(resolved=!0,(endProgressCb||noop)(rejected),runner.complete(!rejected))};return runner=new $$AnimateRunner({end:function(){onAnimationComplete()},cancel:function(){onAnimationComplete(!0)}}),endProgressCb=executeAnimationFn(animation,element,event,options,function(result){var cancelled=result===!1;onAnimationComplete(cancelled)}),runner})}),operations}function packageAnimations(element,event,options,animations,fnName){var operations=groupEventedAnimations(element,event,options,animations,fnName);if(0===operations.length){var a,b;"beforeSetClass"===fnName?(a=groupEventedAnimations(element,"removeClass",options,animations,"beforeRemoveClass"),b=groupEventedAnimations(element,"addClass",options,animations,"beforeAddClass")):"setClass"===fnName&&(a=groupEventedAnimations(element,"removeClass",options,animations,"removeClass"),b=groupEventedAnimations(element,"addClass",options,animations,"addClass")),a&&(operations=operations.concat(a)),b&&(operations=operations.concat(b))}if(0!==operations.length)
// TODO(matsko): add documentation
return function(callback){var runners=[];return operations.length&&forEach(operations,function(animateFn){runners.push(animateFn())}),runners.length?$$AnimateRunner.all(runners,callback):callback(),function(reject){forEach(runners,function(runner){reject?runner.cancel():runner.end()})}}}var animationClosed=!1;
// the `classes` argument is optional and if it is not used
// then the classes will be resolved from the element's className
// property as well as options.addClass/options.removeClass.
3===arguments.length&&isObject(classes)&&(options=classes,classes=null),options=prepareAnimationOptions(options),classes||(classes=element.attr("class")||"",options.addClass&&(classes+=" "+options.addClass),options.removeClass&&(classes+=" "+options.removeClass));var before,after,classesToAdd=options.addClass,classesToRemove=options.removeClass,animations=lookupAnimations(classes);if(animations.length){var afterFn,beforeFn;"leave"==event?(beforeFn="leave",afterFn="afterLeave"):(beforeFn="before"+event.charAt(0).toUpperCase()+event.substr(1),afterFn=event),"enter"!==event&&"move"!==event&&(before=packageAnimations(element,event,options,animations,beforeFn)),after=packageAnimations(element,event,options,animations,afterFn)}
// no matching animations
if(before||after){var runner;return{$$willAnimate:!0,end:function(){return runner?runner.end():(close(),runner=new $$AnimateRunner,runner.complete(!0)),runner},start:function(){function onComplete(success){close(success),runner.complete(success)}function endAnimations(cancelled){animationClosed||((closeActiveAnimations||noop)(cancelled),onComplete(cancelled))}if(runner)return runner;runner=new $$AnimateRunner;var closeActiveAnimations,chain=[];return before&&chain.push(function(fn){closeActiveAnimations=before(fn)}),chain.length?chain.push(function(fn){applyOptions(),fn(!0)}):applyOptions(),after&&chain.push(function(fn){closeActiveAnimations=after(fn)}),runner.setHost({end:function(){endAnimations()},cancel:function(){endAnimations(!0)}}),$$AnimateRunner.chain(chain,onComplete),runner}}}}}]}],$$AnimateJsDriverProvider=["$$animationProvider",function($$animationProvider){$$animationProvider.drivers.push("$$animateJsDriver"),this.$get=["$$animateJs","$$AnimateRunner",function($$animateJs,$$AnimateRunner){function prepareAnimation(animationDetails){
// TODO(matsko): make sure to check for grouped animations and delegate down to normal animations
var element=animationDetails.element,event=animationDetails.event,options=animationDetails.options,classes=animationDetails.classes;return $$animateJs(element,event,classes,options)}return function(animationDetails){if(animationDetails.from&&animationDetails.to){var fromAnimation=prepareAnimation(animationDetails.from),toAnimation=prepareAnimation(animationDetails.to);if(!fromAnimation&&!toAnimation)return;return{start:function(){function endFnFactory(){return function(){forEach(animationRunners,function(runner){
// at this point we cannot cancel animations for groups just yet. 1.5+
runner.end()})}}function done(status){runner.complete(status)}var animationRunners=[];fromAnimation&&animationRunners.push(fromAnimation.start()),toAnimation&&animationRunners.push(toAnimation.start()),$$AnimateRunner.all(animationRunners,done);var runner=new $$AnimateRunner({end:endFnFactory(),cancel:endFnFactory()});return runner}}}return prepareAnimation(animationDetails)}}]}],NG_ANIMATE_ATTR_NAME="data-ng-animate",NG_ANIMATE_PIN_DATA="$ngAnimatePin",$$AnimateQueueProvider=["$animateProvider",function($animateProvider){function makeTruthyCssClassMap(classString){if(!classString)return null;var keys=classString.split(ONE_SPACE),map=Object.create(null);return forEach(keys,function(key){map[key]=!0}),map}function hasMatchingClasses(newClassString,currentClassString){if(newClassString&&currentClassString){var currentClassMap=makeTruthyCssClassMap(currentClassString);return newClassString.split(ONE_SPACE).some(function(className){return currentClassMap[className]})}}function isAllowed(ruleType,element,currentAnimation,previousAnimation){return rules[ruleType].some(function(fn){return fn(element,currentAnimation,previousAnimation)})}function hasAnimationClasses(animation,and){var a=(animation.addClass||"").length>0,b=(animation.removeClass||"").length>0;return and?a&&b:a||b}var PRE_DIGEST_STATE=1,RUNNING_STATE=2,ONE_SPACE=" ",rules=this.rules={skip:[],cancel:[],join:[]};rules.join.push(function(element,newAnimation,currentAnimation){
// if the new animation is class-based then we can just tack that on
return!newAnimation.structural&&hasAnimationClasses(newAnimation)}),rules.skip.push(function(element,newAnimation,currentAnimation){
// there is no need to animate anything if no classes are being added and
// there is no structural animation that will be triggered
return!newAnimation.structural&&!hasAnimationClasses(newAnimation)}),rules.skip.push(function(element,newAnimation,currentAnimation){
// why should we trigger a new structural animation if the element will
// be removed from the DOM anyway?
return"leave"==currentAnimation.event&&newAnimation.structural}),rules.skip.push(function(element,newAnimation,currentAnimation){
// if there is an ongoing current animation then don't even bother running the class-based animation
return currentAnimation.structural&&currentAnimation.state===RUNNING_STATE&&!newAnimation.structural}),rules.cancel.push(function(element,newAnimation,currentAnimation){
// there can never be two structural animations running at the same time
return currentAnimation.structural&&newAnimation.structural}),rules.cancel.push(function(element,newAnimation,currentAnimation){
// if the previous animation is already running, but the new animation will
// be triggered, but the new animation is structural
return currentAnimation.state===RUNNING_STATE&&newAnimation.structural}),rules.cancel.push(function(element,newAnimation,currentAnimation){
// cancel the animation if classes added / removed in both animation cancel each other out,
// but only if the current animation isn't structural
if(currentAnimation.structural)return!1;var nA=newAnimation.addClass,nR=newAnimation.removeClass,cA=currentAnimation.addClass,cR=currentAnimation.removeClass;
// early detection to save the global CPU shortage :)
// early detection to save the global CPU shortage :)
return!(isUndefined(nA)&&isUndefined(nR)||isUndefined(cA)&&isUndefined(cR))&&(hasMatchingClasses(nA,cR)||hasMatchingClasses(nR,cA))}),this.$get=["$$rAF","$rootScope","$rootElement","$document","$$HashMap","$$animation","$$AnimateRunner","$templateRequest","$$jqLite","$$forceReflow",function($$rAF,$rootScope,$rootElement,$document,$$HashMap,$$animation,$$AnimateRunner,$templateRequest,$$jqLite,$$forceReflow){function postDigestTaskFactory(){var postDigestCalled=!1;return function(fn){
// we only issue a call to postDigest before
// it has first passed. This prevents any callbacks
// from not firing once the animation has completed
// since it will be out of the digest cycle.
postDigestCalled?fn():$rootScope.$$postDigest(function(){postDigestCalled=!0,fn()})}}function normalizeAnimationDetails(element,animation){return mergeAnimationDetails(element,animation,{})}function findCallbacks(parent,element,event){var targetNode=getDomNode(element),targetParentNode=getDomNode(parent),matches=[],entries=callbackRegistry[event];return entries&&forEach(entries,function(entry){contains.call(entry.node,targetNode)?matches.push(entry.callback):"leave"===event&&contains.call(entry.node,targetParentNode)&&matches.push(entry.callback)}),matches}function filterFromRegistry(list,matchContainer,matchCallback){var containerNode=extractElementNode(matchContainer);return list.filter(function(entry){var isMatch=entry.node===containerNode&&(!matchCallback||entry.callback===matchCallback);return!isMatch})}function cleanupEventListeners(phase,element){"close"!==phase||element[0].parentNode||
// If the element is not attached to a parentNode, it has been removed by
// the domOperation, and we can safely remove the event callbacks
$animate.off(element)}function queueAnimation(element,event,initialOptions){function notifyProgress(runner,event,phase,data){runInNextPostDigestOrNow(function(){var callbacks=findCallbacks(parent,element,event);callbacks.length?
// do not optimize this call here to RAF because
// we don't know how heavy the callback code here will
// be and if this code is buffered then this can
// lead to a performance regression.
$$rAF(function(){forEach(callbacks,function(callback){callback(element,phase,data)}),cleanupEventListeners(phase,element)}):cleanupEventListeners(phase,element)}),runner.progress(event,phase,data)}function close(reject){// jshint ignore:line
clearGeneratedClasses(element,options),applyAnimationClasses(element,options),applyAnimationStyles(element,options),options.domOperation(),runner.complete(!reject)}
// we always make a copy of the options since
// there should never be any side effects on
// the input data when running `$animateCss`.
var node,parent,options=copy(initialOptions);element=stripCommentsFromElement(element),element&&(node=getDomNode(element),parent=element.parent()),options=prepareAnimationOptions(options);
// we create a fake runner with a working promise.
// These methods will become available after the digest has passed
var runner=new $$AnimateRunner,runInNextPostDigestOrNow=postDigestTaskFactory();
// there are situations where a directive issues an animation for
// a jqLite wrapper that contains only comment nodes... If this
// happens then there is no way we can perform an animation
if(isArray(options.addClass)&&(options.addClass=options.addClass.join(" ")),options.addClass&&!isString(options.addClass)&&(options.addClass=null),isArray(options.removeClass)&&(options.removeClass=options.removeClass.join(" ")),options.removeClass&&!isString(options.removeClass)&&(options.removeClass=null),options.from&&!isObject(options.from)&&(options.from=null),options.to&&!isObject(options.to)&&(options.to=null),!node)return close(),runner;var className=[node.className,options.addClass,options.removeClass].join(" ");if(!isAnimatableClassName(className))return close(),runner;var isStructural=["enter","move","leave"].indexOf(event)>=0,documentHidden=$document[0].hidden,skipAnimations=!animationsEnabled||documentHidden||disabledElementsLookup.get(node),existingAnimation=!skipAnimations&&activeAnimationsLookup.get(node)||{},hasExistingAnimation=!!existingAnimation.state;if(
// there is no point in traversing the same collection of parent ancestors if a followup
// animation will be run on the same element that already did all that checking work
skipAnimations||hasExistingAnimation&&existingAnimation.state==PRE_DIGEST_STATE||(skipAnimations=!areAnimationsAllowed(element,parent,event)),skipAnimations)
// Callbacks should fire even if the document is hidden (regression fix for issue #14120)
return documentHidden&&notifyProgress(runner,event,"start"),close(),documentHidden&&notifyProgress(runner,event,"close"),runner;isStructural&&closeChildAnimations(element);var newAnimation={structural:isStructural,element:element,event:event,addClass:options.addClass,removeClass:options.removeClass,close:close,options:options,runner:runner};if(hasExistingAnimation){var skipAnimationFlag=isAllowed("skip",element,newAnimation,existingAnimation);if(skipAnimationFlag)return existingAnimation.state===RUNNING_STATE?(close(),runner):(mergeAnimationDetails(element,existingAnimation,newAnimation),existingAnimation.runner);var cancelAnimationFlag=isAllowed("cancel",element,newAnimation,existingAnimation);if(cancelAnimationFlag)if(existingAnimation.state===RUNNING_STATE)
// this will end the animation right away and it is safe
// to do so since the animation is already running and the
// runner callback code will run in async
existingAnimation.runner.end();else{if(!existingAnimation.structural)
// this will merge the new animation options into existing animation options
return mergeAnimationDetails(element,existingAnimation,newAnimation),existingAnimation.runner;
// this means that the animation is queued into a digest, but
// hasn't started yet. Therefore it is safe to run the close
// method which will call the runner methods in async.
existingAnimation.close()}else{
// a joined animation means that this animation will take over the existing one
// so an example would involve a leave animation taking over an enter. Then when
// the postDigest kicks in the enter will be ignored.
var joinAnimationFlag=isAllowed("join",element,newAnimation,existingAnimation);if(joinAnimationFlag){if(existingAnimation.state!==RUNNING_STATE)
//we return the same runner since only the option values of this animation will
//be fed into the `existingAnimation`.
return applyGeneratedPreparationClasses(element,isStructural?event:null,options),event=newAnimation.event=existingAnimation.event,options=mergeAnimationDetails(element,existingAnimation,newAnimation),existingAnimation.runner;normalizeAnimationDetails(element,newAnimation)}}}else
// normalization in this case means that it removes redundant CSS classes that
// already exist (addClass) or do not exist (removeClass) on the element
normalizeAnimationDetails(element,newAnimation);
// when the options are merged and cleaned up we may end up not having to do
// an animation at all, therefore we should check this before issuing a post
// digest callback. Structural animations will always run no matter what.
var isValidAnimation=newAnimation.structural;if(isValidAnimation||(
// animate (from/to) can be quickly checked first, otherwise we check if any classes are present
isValidAnimation="animate"===newAnimation.event&&Object.keys(newAnimation.options.to||{}).length>0||hasAnimationClasses(newAnimation)),!isValidAnimation)return close(),clearElementAnimationState(element),runner;
// the counter keeps track of cancelled animations
var counter=(existingAnimation.counter||0)+1;return newAnimation.counter=counter,markElementAnimationState(element,PRE_DIGEST_STATE,newAnimation),$rootScope.$$postDigest(function(){var animationDetails=activeAnimationsLookup.get(node),animationCancelled=!animationDetails;animationDetails=animationDetails||{};
// if addClass/removeClass is called before something like enter then the
// registered parent element may not be present. The code below will ensure
// that a final value for parent element is obtained
var parentElement=element.parent()||[],isValidAnimation=parentElement.length>0&&("animate"===animationDetails.event||animationDetails.structural||hasAnimationClasses(animationDetails));
// this means that the previous animation was cancelled
// even if the follow-up animation is the same event
if(animationCancelled||animationDetails.counter!==counter||!isValidAnimation)
// if another animation did not take over then we need
// to make sure that the domOperation and options are
// handled accordingly
// if the event changed from something like enter to leave then we do
// it, otherwise if it's the same then the end result will be the same too
// in the event that the element animation was not cancelled or a follow-up animation
// isn't allowed to animate from here then we need to clear the state of the element
// so that any future animations won't read the expired animation data.
return animationCancelled&&(applyAnimationClasses(element,options),applyAnimationStyles(element,options)),(animationCancelled||isStructural&&animationDetails.event!==event)&&(options.domOperation(),runner.end()),void(isValidAnimation||clearElementAnimationState(element));
// this combined multiple class to addClass / removeClass into a setClass event
// so long as a structural event did not take over the animation
event=!animationDetails.structural&&hasAnimationClasses(animationDetails,!0)?"setClass":animationDetails.event,markElementAnimationState(element,RUNNING_STATE);var realRunner=$$animation(element,event,animationDetails.options);
// this will update the runner's flow-control events based on
// the `realRunner` object.
runner.setHost(realRunner),notifyProgress(runner,event,"start",{}),realRunner.done(function(status){close(!status);var animationDetails=activeAnimationsLookup.get(node);animationDetails&&animationDetails.counter===counter&&clearElementAnimationState(getDomNode(element)),notifyProgress(runner,event,"close",{})})}),runner}function closeChildAnimations(element){var node=getDomNode(element),children=node.querySelectorAll("["+NG_ANIMATE_ATTR_NAME+"]");forEach(children,function(child){var state=parseInt(child.getAttribute(NG_ANIMATE_ATTR_NAME)),animationDetails=activeAnimationsLookup.get(child);if(animationDetails)switch(state){case RUNNING_STATE:animationDetails.runner.end();/* falls through */
case PRE_DIGEST_STATE:activeAnimationsLookup.remove(child)}})}function clearElementAnimationState(element){var node=getDomNode(element);node.removeAttribute(NG_ANIMATE_ATTR_NAME),activeAnimationsLookup.remove(node)}function isMatchingElement(nodeOrElmA,nodeOrElmB){return getDomNode(nodeOrElmA)===getDomNode(nodeOrElmB)}/**
     * This fn returns false if any of the following is true:
     * a) animations on any parent element are disabled, and animations on the element aren't explicitly allowed
     * b) a parent element has an ongoing structural animation, and animateChildren is false
     * c) the element is not a child of the body
     * d) the element is not a child of the $rootElement
     */
function areAnimationsAllowed(element,parentElement,event){var animateChildren,bodyElement=jqLite($document[0].body),bodyElementDetected=isMatchingElement(element,bodyElement)||"HTML"===element[0].nodeName,rootElementDetected=isMatchingElement(element,$rootElement),parentAnimationDetected=!1,elementDisabled=disabledElementsLookup.get(getDomNode(element)),parentHost=jqLite.data(element[0],NG_ANIMATE_PIN_DATA);for(parentHost&&(parentElement=parentHost),parentElement=getDomNode(parentElement);parentElement&&(rootElementDetected||(
// angular doesn't want to attempt to animate elements outside of the application
// therefore we need to ensure that the rootElement is an ancestor of the current element
rootElementDetected=isMatchingElement(parentElement,$rootElement)),parentElement.nodeType===ELEMENT_NODE);){var details=activeAnimationsLookup.get(parentElement)||{};
// either an enter, leave or move animation will commence
// therefore we can't allow any animations to take place
// but if a parent animation is class-based then that's ok
if(!parentAnimationDetected){var parentElementDisabled=disabledElementsLookup.get(parentElement);if(parentElementDisabled===!0&&elementDisabled!==!1){
// disable animations if the user hasn't explicitly enabled animations on the
// current element
elementDisabled=!0;
// element is disabled via parent element, no need to check anything else
break}parentElementDisabled===!1&&(elementDisabled=!1),parentAnimationDetected=details.structural}if(isUndefined(animateChildren)||animateChildren===!0){var value=jqLite.data(parentElement,NG_ANIMATE_CHILDREN_DATA);isDefined(value)&&(animateChildren=value)}
// there is no need to continue traversing at this point
if(parentAnimationDetected&&animateChildren===!1)break;if(bodyElementDetected||(
// we also need to ensure that the element is or will be a part of the body element
// otherwise it is pointless to even issue an animation to be rendered
bodyElementDetected=isMatchingElement(parentElement,bodyElement)),bodyElementDetected&&rootElementDetected)
// If both body and root have been found, any other checks are pointless,
// as no animation data should live outside the application
break;parentElement=rootElementDetected||
// If no rootElement is detected, check if the parentElement is pinned to another element
!(parentHost=jqLite.data(parentElement,NG_ANIMATE_PIN_DATA))?parentElement.parentNode:getDomNode(parentHost)}var allowAnimation=(!parentAnimationDetected||animateChildren)&&elementDisabled!==!0;return allowAnimation&&rootElementDetected&&bodyElementDetected}function markElementAnimationState(element,state,details){details=details||{},details.state=state;var node=getDomNode(element);node.setAttribute(NG_ANIMATE_ATTR_NAME,state);var oldValue=activeAnimationsLookup.get(node),newValue=oldValue?extend(oldValue,details):details;activeAnimationsLookup.put(node,newValue)}var activeAnimationsLookup=new $$HashMap,disabledElementsLookup=new $$HashMap,animationsEnabled=null,deregisterWatch=$rootScope.$watch(function(){return 0===$templateRequest.totalPendingRequests},function(isEmpty){isEmpty&&(deregisterWatch(),
// Now that all templates have been downloaded, $animate will wait until
// the post digest queue is empty before enabling animations. By having two
// calls to $postDigest calls we can ensure that the flag is enabled at the
// very end of the post digest queue. Since all of the animations in $animate
// use $postDigest, it's important that the code below executes at the end.
// This basically means that the page is fully downloaded and compiled before
// any animations are triggered.
$rootScope.$$postDigest(function(){$rootScope.$$postDigest(function(){
// we check for null directly in the event that the application already called
// .enabled() with whatever arguments that it provided it with
null===animationsEnabled&&(animationsEnabled=!0)})}))}),callbackRegistry=Object.create(null),classNameFilter=$animateProvider.classNameFilter(),isAnimatableClassName=classNameFilter?function(className){return classNameFilter.test(className)}:function(){return!0},applyAnimationClasses=applyAnimationClassesFactory($$jqLite),contains=window.Node.prototype.contains||function(arg){
// jshint bitwise: false
return this===arg||!!(16&this.compareDocumentPosition(arg))},$animate={on:function(event,container,callback){var node=extractElementNode(container);callbackRegistry[event]=callbackRegistry[event]||[],callbackRegistry[event].push({node:node,callback:callback}),
// Remove the callback when the element is removed from the DOM
jqLite(container).on("$destroy",function(){var animationDetails=activeAnimationsLookup.get(node);animationDetails||
// If there's an animation ongoing, the callback calling code will remove
// the event listeners. If we'd remove here, the callbacks would be removed
// before the animation ends
$animate.off(event,container,callback)})},off:function(event,container,callback){if(1!==arguments.length||isString(arguments[0])){var entries=callbackRegistry[event];entries&&(callbackRegistry[event]=1===arguments.length?null:filterFromRegistry(entries,container,callback))}else{container=arguments[0];for(var eventType in callbackRegistry)callbackRegistry[eventType]=filterFromRegistry(callbackRegistry[eventType],container)}},pin:function(element,parentElement){assertArg(isElement(element),"element","not an element"),assertArg(isElement(parentElement),"parentElement","not an element"),element.data(NG_ANIMATE_PIN_DATA,parentElement)},push:function(element,event,options,domOperation){return options=options||{},options.domOperation=domOperation,queueAnimation(element,event,options)},
// this method has four signatures:
//  () - global getter
//  (bool) - global setter
//  (element) - element getter
//  (element, bool) - element setter<F37>
enabled:function(element,bool){var argCount=arguments.length;if(0===argCount)
// () - Global getter
bool=!!animationsEnabled;else{var hasElement=isElement(element);if(hasElement){var node=getDomNode(element);1===argCount?
// (element) - Element getter
bool=!disabledElementsLookup.get(node):
// (element, bool) - Element setter
disabledElementsLookup.put(node,!bool)}else
// (bool) - Global setter
bool=animationsEnabled=!!element}return bool}};return $animate}]}],$$AnimationProvider=["$animateProvider",function($animateProvider){function setRunner(element,runner){element.data(RUNNER_STORAGE_KEY,runner)}function removeRunner(element){element.removeData(RUNNER_STORAGE_KEY)}function getRunner(element){return element.data(RUNNER_STORAGE_KEY)}var NG_ANIMATE_REF_ATTR="ng-animate-ref",drivers=this.drivers=[],RUNNER_STORAGE_KEY="$$animationRunner";this.$get=["$$jqLite","$rootScope","$injector","$$AnimateRunner","$$HashMap","$$rAFScheduler",function($$jqLite,$rootScope,$injector,$$AnimateRunner,$$HashMap,$$rAFScheduler){function sortAnimations(animations){function processNode(entry){if(entry.processed)return entry;entry.processed=!0;var elementNode=entry.domNode,parentNode=elementNode.parentNode;lookup.put(elementNode,entry);for(var parentEntry;parentNode;){if(parentEntry=lookup.get(parentNode)){parentEntry.processed||(parentEntry=processNode(parentEntry));break}parentNode=parentNode.parentNode}return(parentEntry||tree).children.push(entry),entry}function flatten(tree){var i,result=[],queue=[];for(i=0;i<tree.children.length;i++)queue.push(tree.children[i]);var remainingLevelEntries=queue.length,nextLevelEntries=0,row=[];for(i=0;i<queue.length;i++){var entry=queue[i];remainingLevelEntries<=0&&(remainingLevelEntries=nextLevelEntries,nextLevelEntries=0,result.push(row),row=[]),row.push(entry.fn),entry.children.forEach(function(childEntry){nextLevelEntries++,queue.push(childEntry)}),remainingLevelEntries--}return row.length&&result.push(row),result}var i,tree={children:[]},lookup=new $$HashMap;
// this is done first beforehand so that the hashmap
// is filled with a list of the elements that will be animated
for(i=0;i<animations.length;i++){var animation=animations[i];lookup.put(animation.domNode,animations[i]={domNode:animation.domNode,fn:animation.fn,children:[]})}for(i=0;i<animations.length;i++)processNode(animations[i]);return flatten(tree)}var animationQueue=[],applyAnimationClasses=applyAnimationClassesFactory($$jqLite);
// TODO(matsko): document the signature in a better way
return function(element,event,options){
// TODO(matsko): change to reference nodes
function getAnchorNodes(node){var SELECTOR="["+NG_ANIMATE_REF_ATTR+"]",items=node.hasAttribute(NG_ANIMATE_REF_ATTR)?[node]:node.querySelectorAll(SELECTOR),anchors=[];return forEach(items,function(node){var attr=node.getAttribute(NG_ANIMATE_REF_ATTR);attr&&attr.length&&anchors.push(node)}),anchors}function groupAnimations(animations){var preparedAnimations=[],refLookup={};forEach(animations,function(animation,index){var element=animation.element,node=getDomNode(element),event=animation.event,enterOrMove=["enter","move"].indexOf(event)>=0,anchorNodes=animation.structural?getAnchorNodes(node):[];if(anchorNodes.length){var direction=enterOrMove?"to":"from";forEach(anchorNodes,function(anchor){var key=anchor.getAttribute(NG_ANIMATE_REF_ATTR);refLookup[key]=refLookup[key]||{},refLookup[key][direction]={animationID:index,element:jqLite(anchor)}})}else preparedAnimations.push(animation)});var usedIndicesLookup={},anchorGroups={};return forEach(refLookup,function(operations,key){var from=operations.from,to=operations.to;if(!from||!to){
// only one of these is set therefore we can't have an
// anchor animation since all three pieces are required
var index=from?from.animationID:to.animationID,indexKey=index.toString();return void(usedIndicesLookup[indexKey]||(usedIndicesLookup[indexKey]=!0,preparedAnimations.push(animations[index])))}var fromAnimation=animations[from.animationID],toAnimation=animations[to.animationID],lookupKey=from.animationID.toString();if(!anchorGroups[lookupKey]){var group=anchorGroups[lookupKey]={structural:!0,beforeStart:function(){fromAnimation.beforeStart(),toAnimation.beforeStart()},close:function(){fromAnimation.close(),toAnimation.close()},classes:cssClassesIntersection(fromAnimation.classes,toAnimation.classes),from:fromAnimation,to:toAnimation,anchors:[]};
// the anchor animations require that the from and to elements both have at least
// one shared CSS class which effectively marries the two elements together to use
// the same animation driver and to properly sequence the anchor animation.
group.classes.length?preparedAnimations.push(group):(preparedAnimations.push(fromAnimation),preparedAnimations.push(toAnimation))}anchorGroups[lookupKey].anchors.push({out:from.element,"in":to.element})}),preparedAnimations}function cssClassesIntersection(a,b){a=a.split(" "),b=b.split(" ");for(var matches=[],i=0;i<a.length;i++){var aa=a[i];if("ng-"!==aa.substring(0,3))for(var j=0;j<b.length;j++)if(aa===b[j]){matches.push(aa);break}}return matches.join(" ")}function invokeFirstDriver(animationDetails){
// we loop in reverse order since the more general drivers (like CSS and JS)
// may attempt more elements, but custom drivers are more particular
for(var i=drivers.length-1;i>=0;i--){var driverName=drivers[i],factory=$injector.get(driverName),driver=factory(animationDetails);if(driver)return driver}}function beforeStart(){element.addClass(NG_ANIMATE_CLASSNAME),tempClasses&&$$jqLite.addClass(element,tempClasses),prepareClassName&&($$jqLite.removeClass(element,prepareClassName),prepareClassName=null)}function updateAnimationRunners(animation,newRunner){function update(element){var runner=getRunner(element);runner&&runner.setHost(newRunner)}animation.from&&animation.to?(update(animation.from.element),update(animation.to.element)):update(animation.element)}function handleDestroyedElement(){var runner=getRunner(element);!runner||"leave"===event&&options.$$domOperationFired||runner.end()}function close(rejected){// jshint ignore:line
element.off("$destroy",handleDestroyedElement),removeRunner(element),applyAnimationClasses(element,options),applyAnimationStyles(element,options),options.domOperation(),tempClasses&&$$jqLite.removeClass(element,tempClasses),element.removeClass(NG_ANIMATE_CLASSNAME),runner.complete(!rejected)}options=prepareAnimationOptions(options);var isStructural=["enter","move","leave"].indexOf(event)>=0,runner=new $$AnimateRunner({end:function(){close()},cancel:function(){close(!0)}});if(!drivers.length)return close(),runner;setRunner(element,runner);var classes=mergeClasses(element.attr("class"),mergeClasses(options.addClass,options.removeClass)),tempClasses=options.tempClasses;tempClasses&&(classes+=" "+tempClasses,options.tempClasses=null);var prepareClassName;
// we only want there to be one function called within the post digest
// block. This way we can group animations for all the animations that
// were apart of the same postDigest flush call.
// we only want there to be one function called within the post digest
// block. This way we can group animations for all the animations that
// were apart of the same postDigest flush call.
return isStructural&&(prepareClassName="ng-"+event+PREPARE_CLASS_SUFFIX,$$jqLite.addClass(element,prepareClassName)),animationQueue.push({
// this data is used by the postDigest code and passed into
// the driver step function
element:element,classes:classes,event:event,structural:isStructural,options:options,beforeStart:beforeStart,close:close}),element.on("$destroy",handleDestroyedElement),animationQueue.length>1?runner:($rootScope.$$postDigest(function(){var animations=[];forEach(animationQueue,function(entry){
// the element was destroyed early on which removed the runner
// form its storage. This means we can't animate this element
// at all and it already has been closed due to destruction.
getRunner(entry.element)?animations.push(entry):entry.close()}),
// now any future animations will be in another postDigest
animationQueue.length=0;var groupedAnimations=groupAnimations(animations),toBeSortedAnimations=[];forEach(groupedAnimations,function(animationEntry){toBeSortedAnimations.push({domNode:getDomNode(animationEntry.from?animationEntry.from.element:animationEntry.element),fn:function(){
// it's important that we apply the `ng-animate` CSS class and the
// temporary classes before we do any driver invoking since these
// CSS classes may be required for proper CSS detection.
animationEntry.beforeStart();var startAnimationFn,closeFn=animationEntry.close,targetElement=animationEntry.anchors?animationEntry.from.element||animationEntry.to.element:animationEntry.element;if(getRunner(targetElement)){var operation=invokeFirstDriver(animationEntry);operation&&(startAnimationFn=operation.start)}if(startAnimationFn){var animationRunner=startAnimationFn();animationRunner.done(function(status){closeFn(!status)}),updateAnimationRunners(animationEntry,animationRunner)}else closeFn()}})}),
// we need to sort each of the animations in order of parent to child
// relationships. This ensures that the child classes are applied at the
// right time.
$$rAFScheduler(sortAnimations(toBeSortedAnimations))}),runner)}}]}],ngAnimateSwapDirective=["$animate","$rootScope",function($animate,$rootScope){return{restrict:"A",transclude:"element",terminal:!0,priority:600,// we use 600 here to ensure that the directive is caught before others
link:function(scope,$element,attrs,ctrl,$transclude){var previousElement,previousScope;scope.$watchCollection(attrs.ngAnimateSwap||attrs["for"],function(value){previousElement&&$animate.leave(previousElement),previousScope&&(previousScope.$destroy(),previousScope=null),(value||0===value)&&(previousScope=scope.$new(),$transclude(previousScope,function(element){previousElement=element,$animate.enter(element,null,$element)}))})}}}];/**
 * @ngdoc service
 * @name $animate
 * @kind object
 *
 * @description
 * The ngAnimate `$animate` service documentation is the same for the core `$animate` service.
 *
 * Click here {@link ng.$animate to learn more about animations with `$animate`}.
 */
angular.module("ngAnimate",[],function(){
// Access helpers from angular core.
// Do it inside a `config` block to ensure `window.angular` is available.
noop=angular.noop,copy=angular.copy,extend=angular.extend,jqLite=angular.element,forEach=angular.forEach,isArray=angular.isArray,isString=angular.isString,isObject=angular.isObject,isUndefined=angular.isUndefined,isDefined=angular.isDefined,isFunction=angular.isFunction,isElement=angular.isElement}).directive("ngAnimateSwap",ngAnimateSwapDirective).directive("ngAnimateChildren",$$AnimateChildrenDirective).factory("$$rAFScheduler",$$rAFSchedulerFactory).provider("$$animateQueue",$$AnimateQueueProvider).provider("$$animation",$$AnimationProvider).provider("$animateCss",$AnimateCssProvider).provider("$$animateCssDriver",$$AnimateCssDriverProvider).provider("$$animateJs",$$AnimateJsProvider).provider("$$animateJsDriver",$$AnimateJsDriverProvider)}(window,window.angular);