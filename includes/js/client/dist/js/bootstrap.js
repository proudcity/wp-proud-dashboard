/*!
 * jQuery JavaScript Library v3.1.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2016-09-22T22:30Z
 */
/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if(function(global,factory){"use strict";"object"==typeof module&&"object"==typeof module.exports?
// For CommonJS and CommonJS-like environments where a proper `window`
// is present, execute the factory and get jQuery.
// For environments that do not have a `window` with a `document`
// (such as Node.js), expose a factory as module.exports.
// This accentuates the need for the creation of a real `window`.
// e.g. var jQuery = require("jquery")(window);
// See ticket #14549 for more info.
module.exports=global.document?factory(global,!0):function(w){if(!w.document)throw new Error("jQuery requires a window with a document");return factory(w)}:factory(global)}("undefined"!=typeof window?window:this,function(window,noGlobal){
// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";function DOMEval(code,doc){doc=doc||document;var script=doc.createElement("script");script.text=code,doc.head.appendChild(script).parentNode.removeChild(script)}function isArrayLike(obj){
// Support: real iOS 8.2 only (not reproducible in simulator)
// `in` check used to prevent JIT error (gh-2145)
// hasOwn isn't used here due to false negatives
// regarding Nodelist length in IE
var length=!!obj&&"length"in obj&&obj.length,type=jQuery.type(obj);return"function"!==type&&!jQuery.isWindow(obj)&&("array"===type||0===length||"number"==typeof length&&length>0&&length-1 in obj)}
// Implement the identical functionality for filter and not
function winnow(elements,qualifier,not){
// Single element
// Arraylike of elements (jQuery, arguments, Array)
// Simple selector that can be filtered directly, removing non-Elements
// Complex selector, compare the two sets, removing non-Elements
return jQuery.isFunction(qualifier)?jQuery.grep(elements,function(elem,i){return!!qualifier.call(elem,i,elem)!==not}):qualifier.nodeType?jQuery.grep(elements,function(elem){return elem===qualifier!==not}):"string"!=typeof qualifier?jQuery.grep(elements,function(elem){return indexOf.call(qualifier,elem)>-1!==not}):risSimple.test(qualifier)?jQuery.filter(qualifier,elements,not):(qualifier=jQuery.filter(qualifier,elements),jQuery.grep(elements,function(elem){return indexOf.call(qualifier,elem)>-1!==not&&1===elem.nodeType}))}function sibling(cur,dir){for(;(cur=cur[dir])&&1!==cur.nodeType;);return cur}
// Convert String-formatted options into Object-formatted ones
function createOptions(options){var object={};return jQuery.each(options.match(rnothtmlwhite)||[],function(_,flag){object[flag]=!0}),object}function Identity(v){return v}function Thrower(ex){throw ex}function adoptValue(value,resolve,reject){var method;try{
// Check for promise aspect first to privilege synchronous behavior
value&&jQuery.isFunction(method=value.promise)?method.call(value).done(resolve).fail(reject):value&&jQuery.isFunction(method=value.then)?method.call(value,resolve,reject):
// Support: Android 4.0 only
// Strict mode functions invoked without .call/.apply get global-object context
resolve.call(void 0,value)}catch(value){
// Support: Android 4.0 only
// Strict mode functions invoked without .call/.apply get global-object context
reject.call(void 0,value)}}
// The ready event handler and self cleanup method
function completed(){document.removeEventListener("DOMContentLoaded",completed),window.removeEventListener("load",completed),jQuery.ready()}function Data(){this.expando=jQuery.expando+Data.uid++}function getData(data){
// Only convert to a number if it doesn't change the string
return"true"===data||"false"!==data&&("null"===data?null:data===+data+""?+data:rbrace.test(data)?JSON.parse(data):data)}function dataAttr(elem,key,data){var name;
// If nothing was found internally, try to fetch any
// data from the HTML5 data-* attribute
if(void 0===data&&1===elem.nodeType)if(name="data-"+key.replace(rmultiDash,"-$&").toLowerCase(),data=elem.getAttribute(name),"string"==typeof data){try{data=getData(data)}catch(e){}
// Make sure we set the data so it isn't changed later
dataUser.set(elem,key,data)}else data=void 0;return data}function adjustCSS(elem,prop,valueParts,tween){var adjusted,scale=1,maxIterations=20,currentValue=tween?function(){return tween.cur()}:function(){return jQuery.css(elem,prop,"")},initial=currentValue(),unit=valueParts&&valueParts[3]||(jQuery.cssNumber[prop]?"":"px"),
// Starting value computation is required for potential unit mismatches
initialInUnit=(jQuery.cssNumber[prop]||"px"!==unit&&+initial)&&rcssNum.exec(jQuery.css(elem,prop));if(initialInUnit&&initialInUnit[3]!==unit){
// Trust units reported by jQuery.css
unit=unit||initialInUnit[3],
// Make sure we update the tween properties later on
valueParts=valueParts||[],
// Iteratively approximate from a nonzero starting point
initialInUnit=+initial||1;do
// If previous iteration zeroed out, double until we get *something*.
// Use string for doubling so we don't accidentally see scale as unchanged below
scale=scale||".5",
// Adjust and apply
initialInUnit/=scale,jQuery.style(elem,prop,initialInUnit+unit);while(scale!==(scale=currentValue()/initial)&&1!==scale&&--maxIterations)}
// Apply relative offset (+=/-=) if specified
return valueParts&&(initialInUnit=+initialInUnit||+initial||0,adjusted=valueParts[1]?initialInUnit+(valueParts[1]+1)*valueParts[2]:+valueParts[2],tween&&(tween.unit=unit,tween.start=initialInUnit,tween.end=adjusted)),adjusted}function getDefaultDisplay(elem){var temp,doc=elem.ownerDocument,nodeName=elem.nodeName,display=defaultDisplayMap[nodeName];return display?display:(temp=doc.body.appendChild(doc.createElement(nodeName)),display=jQuery.css(temp,"display"),temp.parentNode.removeChild(temp),"none"===display&&(display="block"),defaultDisplayMap[nodeName]=display,display)}function showHide(elements,show){
// Determine new display value for elements that need to change
for(var display,elem,values=[],index=0,length=elements.length;index<length;index++)elem=elements[index],elem.style&&(display=elem.style.display,show?(
// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
// check is required in this first loop unless we have a nonempty display value (either
// inline or about-to-be-restored)
"none"===display&&(values[index]=dataPriv.get(elem,"display")||null,values[index]||(elem.style.display="")),""===elem.style.display&&isHiddenWithinTree(elem)&&(values[index]=getDefaultDisplay(elem))):"none"!==display&&(values[index]="none",
// Remember what we're overwriting
dataPriv.set(elem,"display",display)));
// Set the display of the elements in a second loop to avoid constant reflow
for(index=0;index<length;index++)null!=values[index]&&(elements[index].style.display=values[index]);return elements}function getAll(context,tag){
// Support: IE <=9 - 11 only
// Use typeof to avoid zero-argument method invocation on host objects (#15151)
var ret;return ret="undefined"!=typeof context.getElementsByTagName?context.getElementsByTagName(tag||"*"):"undefined"!=typeof context.querySelectorAll?context.querySelectorAll(tag||"*"):[],void 0===tag||tag&&jQuery.nodeName(context,tag)?jQuery.merge([context],ret):ret}
// Mark scripts as having already been evaluated
function setGlobalEval(elems,refElements){for(var i=0,l=elems.length;i<l;i++)dataPriv.set(elems[i],"globalEval",!refElements||dataPriv.get(refElements[i],"globalEval"))}function buildFragment(elems,context,scripts,selection,ignored){for(var elem,tmp,tag,wrap,contains,j,fragment=context.createDocumentFragment(),nodes=[],i=0,l=elems.length;i<l;i++)if(elem=elems[i],elem||0===elem)
// Add nodes directly
if("object"===jQuery.type(elem))
// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge(nodes,elem.nodeType?[elem]:elem);else if(rhtml.test(elem)){for(tmp=tmp||fragment.appendChild(context.createElement("div")),
// Deserialize a standard representation
tag=(rtagName.exec(elem)||["",""])[1].toLowerCase(),wrap=wrapMap[tag]||wrapMap._default,tmp.innerHTML=wrap[1]+jQuery.htmlPrefilter(elem)+wrap[2],
// Descend through wrappers to the right content
j=wrap[0];j--;)tmp=tmp.lastChild;
// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge(nodes,tmp.childNodes),
// Remember the top-level container
tmp=fragment.firstChild,
// Ensure the created nodes are orphaned (#12392)
tmp.textContent=""}else nodes.push(context.createTextNode(elem));for(
// Remove wrapper from fragment
fragment.textContent="",i=0;elem=nodes[i++];)
// Skip elements already in the context collection (trac-4087)
if(selection&&jQuery.inArray(elem,selection)>-1)ignored&&ignored.push(elem);else
// Capture executables
if(contains=jQuery.contains(elem.ownerDocument,elem),
// Append to fragment
tmp=getAll(fragment.appendChild(elem),"script"),
// Preserve script evaluation history
contains&&setGlobalEval(tmp),scripts)for(j=0;elem=tmp[j++];)rscriptType.test(elem.type||"")&&scripts.push(elem);return fragment}function returnTrue(){return!0}function returnFalse(){return!1}
// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement(){try{return document.activeElement}catch(err){}}function on(elem,types,selector,data,fn,one){var origFn,type;
// Types can be a map of types/handlers
if("object"==typeof types){
// ( types-Object, selector, data )
"string"!=typeof selector&&(
// ( types-Object, data )
data=data||selector,selector=void 0);for(type in types)on(elem,type,selector,data,types[type],one);return elem}if(null==data&&null==fn?(
// ( types, fn )
fn=selector,data=selector=void 0):null==fn&&("string"==typeof selector?(
// ( types, selector, fn )
fn=data,data=void 0):(
// ( types, data, fn )
fn=data,data=selector,selector=void 0)),fn===!1)fn=returnFalse;else if(!fn)return elem;
// Use same guid so caller can remove using origFn
return 1===one&&(origFn=fn,fn=function(event){
// Can use an empty set, since event contains the info
return jQuery().off(event),origFn.apply(this,arguments)},fn.guid=origFn.guid||(origFn.guid=jQuery.guid++)),elem.each(function(){jQuery.event.add(this,types,fn,data,selector)})}function manipulationTarget(elem,content){return jQuery.nodeName(elem,"table")&&jQuery.nodeName(11!==content.nodeType?content:content.firstChild,"tr")?elem.getElementsByTagName("tbody")[0]||elem:elem}
// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript(elem){return elem.type=(null!==elem.getAttribute("type"))+"/"+elem.type,elem}function restoreScript(elem){var match=rscriptTypeMasked.exec(elem.type);return match?elem.type=match[1]:elem.removeAttribute("type"),elem}function cloneCopyEvent(src,dest){var i,l,type,pdataOld,pdataCur,udataOld,udataCur,events;if(1===dest.nodeType){
// 1. Copy private data: events, handlers, etc.
if(dataPriv.hasData(src)&&(pdataOld=dataPriv.access(src),pdataCur=dataPriv.set(dest,pdataOld),events=pdataOld.events)){delete pdataCur.handle,pdataCur.events={};for(type in events)for(i=0,l=events[type].length;i<l;i++)jQuery.event.add(dest,type,events[type][i])}
// 2. Copy user data
dataUser.hasData(src)&&(udataOld=dataUser.access(src),udataCur=jQuery.extend({},udataOld),dataUser.set(dest,udataCur))}}
// Fix IE bugs, see support tests
function fixInput(src,dest){var nodeName=dest.nodeName.toLowerCase();
// Fails to persist the checked state of a cloned checkbox or radio button.
"input"===nodeName&&rcheckableType.test(src.type)?dest.checked=src.checked:"input"!==nodeName&&"textarea"!==nodeName||(dest.defaultValue=src.defaultValue)}function domManip(collection,args,callback,ignored){
// Flatten any nested arrays
args=concat.apply([],args);var fragment,first,scripts,hasScripts,node,doc,i=0,l=collection.length,iNoClone=l-1,value=args[0],isFunction=jQuery.isFunction(value);
// We can't cloneNode fragments that contain checked, in WebKit
if(isFunction||l>1&&"string"==typeof value&&!support.checkClone&&rchecked.test(value))return collection.each(function(index){var self=collection.eq(index);isFunction&&(args[0]=value.call(this,index,self.html())),domManip(self,args,callback,ignored)});if(l&&(fragment=buildFragment(args,collection[0].ownerDocument,!1,collection,ignored),first=fragment.firstChild,1===fragment.childNodes.length&&(fragment=first),first||ignored)){
// Use the original fragment for the last item
// instead of the first because it can end up
// being emptied incorrectly in certain situations (#8070).
for(scripts=jQuery.map(getAll(fragment,"script"),disableScript),hasScripts=scripts.length;i<l;i++)node=fragment,i!==iNoClone&&(node=jQuery.clone(node,!0,!0),
// Keep references to cloned scripts for later restoration
hasScripts&&
// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge(scripts,getAll(node,"script"))),callback.call(collection[i],node,i);if(hasScripts)
// Evaluate executable scripts on first document insertion
for(doc=scripts[scripts.length-1].ownerDocument,
// Reenable scripts
jQuery.map(scripts,restoreScript),i=0;i<hasScripts;i++)node=scripts[i],rscriptType.test(node.type||"")&&!dataPriv.access(node,"globalEval")&&jQuery.contains(doc,node)&&(node.src?
// Optional AJAX dependency, but won't run scripts if not present
jQuery._evalUrl&&jQuery._evalUrl(node.src):DOMEval(node.textContent.replace(rcleanScript,""),doc))}return collection}function remove(elem,selector,keepData){for(var node,nodes=selector?jQuery.filter(selector,elem):elem,i=0;null!=(node=nodes[i]);i++)keepData||1!==node.nodeType||jQuery.cleanData(getAll(node)),node.parentNode&&(keepData&&jQuery.contains(node.ownerDocument,node)&&setGlobalEval(getAll(node,"script")),node.parentNode.removeChild(node));return elem}function curCSS(elem,name,computed){var width,minWidth,maxWidth,ret,style=elem.style;
// Support: IE <=9 only
// getPropertyValue is only needed for .css('filter') (#12537)
// A tribute to the "awesome hack by Dean Edwards"
// Android Browser returns percentage for some values,
// but width seems to be reliably pixels.
// This is against the CSSOM draft spec:
// https://drafts.csswg.org/cssom/#resolved-values
// Remember the original values
// Put in the new values to get a computed value out
// Revert the changed values
// Support: IE <=9 - 11 only
// IE returns zIndex value as an integer.
return computed=computed||getStyles(elem),computed&&(ret=computed.getPropertyValue(name)||computed[name],""!==ret||jQuery.contains(elem.ownerDocument,elem)||(ret=jQuery.style(elem,name)),!support.pixelMarginRight()&&rnumnonpx.test(ret)&&rmargin.test(name)&&(width=style.width,minWidth=style.minWidth,maxWidth=style.maxWidth,style.minWidth=style.maxWidth=style.width=ret,ret=computed.width,style.width=width,style.minWidth=minWidth,style.maxWidth=maxWidth)),void 0!==ret?ret+"":ret}function addGetHookIf(conditionFn,hookFn){
// Define the hook, we'll check on the first run if it's really needed.
return{get:function(){
// Hook not needed (or it's not possible to use it due
// to missing dependency), remove it.
return conditionFn()?void delete this.get:(this.get=hookFn).apply(this,arguments)}}}
// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName(name){
// Shortcut for names that are not vendor prefixed
if(name in emptyStyle)return name;for(
// Check for vendor prefixed names
var capName=name[0].toUpperCase()+name.slice(1),i=cssPrefixes.length;i--;)if(name=cssPrefixes[i]+capName,name in emptyStyle)return name}function setPositiveNumber(elem,value,subtract){
// Any relative (+/-) values have already been
// normalized at this point
var matches=rcssNum.exec(value);
// Guard against undefined "subtract", e.g., when used as in cssHooks
return matches?Math.max(0,matches[2]-(subtract||0))+(matches[3]||"px"):value}function augmentWidthOrHeight(elem,name,extra,isBorderBox,styles){var i,val=0;for(
// If we already have the right measurement, avoid augmentation
i=extra===(isBorderBox?"border":"content")?4:"width"===name?1:0;i<4;i+=2)
// Both box models exclude margin, so add it if we want it
"margin"===extra&&(val+=jQuery.css(elem,extra+cssExpand[i],!0,styles)),isBorderBox?(
// border-box includes padding, so remove it if we want content
"content"===extra&&(val-=jQuery.css(elem,"padding"+cssExpand[i],!0,styles)),
// At this point, extra isn't border nor margin, so remove border
"margin"!==extra&&(val-=jQuery.css(elem,"border"+cssExpand[i]+"Width",!0,styles))):(
// At this point, extra isn't content, so add padding
val+=jQuery.css(elem,"padding"+cssExpand[i],!0,styles),
// At this point, extra isn't content nor padding, so add border
"padding"!==extra&&(val+=jQuery.css(elem,"border"+cssExpand[i]+"Width",!0,styles)));return val}function getWidthOrHeight(elem,name,extra){
// Start with offset property, which is equivalent to the border-box value
var val,valueIsBorderBox=!0,styles=getStyles(elem),isBorderBox="border-box"===jQuery.css(elem,"boxSizing",!1,styles);
// Some non-html elements return undefined for offsetWidth, so check for null/undefined
// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
if(
// Support: IE <=11 only
// Running getBoundingClientRect on a disconnected node
// in IE throws an error.
elem.getClientRects().length&&(val=elem.getBoundingClientRect()[name]),val<=0||null==val){
// Computed unit is not pixels. Stop here and return.
if(
// Fall back to computed then uncomputed css if necessary
val=curCSS(elem,name,styles),(val<0||null==val)&&(val=elem.style[name]),rnumnonpx.test(val))return val;
// Check for style in case a browser which returns unreliable values
// for getComputedStyle silently falls back to the reliable elem.style
valueIsBorderBox=isBorderBox&&(support.boxSizingReliable()||val===elem.style[name]),
// Normalize "", auto, and prepare for extra
val=parseFloat(val)||0}
// Use the active box-sizing model to add/subtract irrelevant styles
return val+augmentWidthOrHeight(elem,name,extra||(isBorderBox?"border":"content"),valueIsBorderBox,styles)+"px"}function Tween(elem,options,prop,end,easing){return new Tween.prototype.init(elem,options,prop,end,easing)}function raf(){timerId&&(window.requestAnimationFrame(raf),jQuery.fx.tick())}
// Animations created synchronously will run synchronously
function createFxNow(){return window.setTimeout(function(){fxNow=void 0}),fxNow=jQuery.now()}
// Generate parameters to create a standard animation
function genFx(type,includeWidth){var which,i=0,attrs={height:type};for(
// If we include width, step value is 1 to do all cssExpand values,
// otherwise step value is 2 to skip over Left and Right
includeWidth=includeWidth?1:0;i<4;i+=2-includeWidth)which=cssExpand[i],attrs["margin"+which]=attrs["padding"+which]=type;return includeWidth&&(attrs.opacity=attrs.width=type),attrs}function createTween(value,prop,animation){for(var tween,collection=(Animation.tweeners[prop]||[]).concat(Animation.tweeners["*"]),index=0,length=collection.length;index<length;index++)if(tween=collection[index].call(animation,prop,value))
// We're done with this property
return tween}function defaultPrefilter(elem,props,opts){var prop,value,toggle,hooks,oldfire,propTween,restoreDisplay,display,isBox="width"in props||"height"in props,anim=this,orig={},style=elem.style,hidden=elem.nodeType&&isHiddenWithinTree(elem),dataShow=dataPriv.get(elem,"fxshow");
// Queue-skipping animations hijack the fx hooks
opts.queue||(hooks=jQuery._queueHooks(elem,"fx"),null==hooks.unqueued&&(hooks.unqueued=0,oldfire=hooks.empty.fire,hooks.empty.fire=function(){hooks.unqueued||oldfire()}),hooks.unqueued++,anim.always(function(){
// Ensure the complete handler is called before this completes
anim.always(function(){hooks.unqueued--,jQuery.queue(elem,"fx").length||hooks.empty.fire()})}));
// Detect show/hide animations
for(prop in props)if(value=props[prop],rfxtypes.test(value)){if(delete props[prop],toggle=toggle||"toggle"===value,value===(hidden?"hide":"show")){
// Pretend to be hidden if this is a "show" and
// there is still data from a stopped show/hide
if("show"!==value||!dataShow||void 0===dataShow[prop])continue;hidden=!0}orig[prop]=dataShow&&dataShow[prop]||jQuery.style(elem,prop)}if(
// Bail out if this is a no-op like .hide().hide()
propTween=!jQuery.isEmptyObject(props),propTween||!jQuery.isEmptyObject(orig)){
// Restrict "overflow" and "display" styles during box animations
isBox&&1===elem.nodeType&&(
// Support: IE <=9 - 11, Edge 12 - 13
// Record all 3 overflow attributes because IE does not infer the shorthand
// from identically-valued overflowX and overflowY
opts.overflow=[style.overflow,style.overflowX,style.overflowY],
// Identify a display type, preferring old show/hide data over the CSS cascade
restoreDisplay=dataShow&&dataShow.display,null==restoreDisplay&&(restoreDisplay=dataPriv.get(elem,"display")),display=jQuery.css(elem,"display"),"none"===display&&(restoreDisplay?display=restoreDisplay:(
// Get nonempty value(s) by temporarily forcing visibility
showHide([elem],!0),restoreDisplay=elem.style.display||restoreDisplay,display=jQuery.css(elem,"display"),showHide([elem]))),
// Animate inline elements as inline-block
("inline"===display||"inline-block"===display&&null!=restoreDisplay)&&"none"===jQuery.css(elem,"float")&&(
// Restore the original display value at the end of pure show/hide animations
propTween||(anim.done(function(){style.display=restoreDisplay}),null==restoreDisplay&&(display=style.display,restoreDisplay="none"===display?"":display)),style.display="inline-block")),opts.overflow&&(style.overflow="hidden",anim.always(function(){style.overflow=opts.overflow[0],style.overflowX=opts.overflow[1],style.overflowY=opts.overflow[2]})),
// Implement show/hide animations
propTween=!1;for(prop in orig)
// General show/hide setup for this element animation
propTween||(dataShow?"hidden"in dataShow&&(hidden=dataShow.hidden):dataShow=dataPriv.access(elem,"fxshow",{display:restoreDisplay}),
// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
toggle&&(dataShow.hidden=!hidden),
// Show elements before animating them
hidden&&showHide([elem],!0),/* eslint-disable no-loop-func */
anim.done(function(){/* eslint-enable no-loop-func */
// The final step of a "hide" animation is actually hiding the element
hidden||showHide([elem]),dataPriv.remove(elem,"fxshow");for(prop in orig)jQuery.style(elem,prop,orig[prop])})),
// Per-property setup
propTween=createTween(hidden?dataShow[prop]:0,prop,anim),prop in dataShow||(dataShow[prop]=propTween.start,hidden&&(propTween.end=propTween.start,propTween.start=0))}}function propFilter(props,specialEasing){var index,name,easing,value,hooks;
// camelCase, specialEasing and expand cssHook pass
for(index in props)if(name=jQuery.camelCase(index),easing=specialEasing[name],value=props[index],jQuery.isArray(value)&&(easing=value[1],value=props[index]=value[0]),index!==name&&(props[name]=value,delete props[index]),hooks=jQuery.cssHooks[name],hooks&&"expand"in hooks){value=hooks.expand(value),delete props[name];
// Not quite $.extend, this won't overwrite existing keys.
// Reusing 'index' because we have the correct "name"
for(index in value)index in props||(props[index]=value[index],specialEasing[index]=easing)}else specialEasing[name]=easing}function Animation(elem,properties,options){var result,stopped,index=0,length=Animation.prefilters.length,deferred=jQuery.Deferred().always(function(){
// Don't match elem in the :animated selector
delete tick.elem}),tick=function(){if(stopped)return!1;for(var currentTime=fxNow||createFxNow(),remaining=Math.max(0,animation.startTime+animation.duration-currentTime),
// Support: Android 2.3 only
// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
temp=remaining/animation.duration||0,percent=1-temp,index=0,length=animation.tweens.length;index<length;index++)animation.tweens[index].run(percent);return deferred.notifyWith(elem,[animation,percent,remaining]),percent<1&&length?remaining:(deferred.resolveWith(elem,[animation]),!1)},animation=deferred.promise({elem:elem,props:jQuery.extend({},properties),opts:jQuery.extend(!0,{specialEasing:{},easing:jQuery.easing._default},options),originalProperties:properties,originalOptions:options,startTime:fxNow||createFxNow(),duration:options.duration,tweens:[],createTween:function(prop,end){var tween=jQuery.Tween(elem,animation.opts,prop,end,animation.opts.specialEasing[prop]||animation.opts.easing);return animation.tweens.push(tween),tween},stop:function(gotoEnd){var index=0,
// If we are going to the end, we want to run all the tweens
// otherwise we skip this part
length=gotoEnd?animation.tweens.length:0;if(stopped)return this;for(stopped=!0;index<length;index++)animation.tweens[index].run(1);
// Resolve when we played the last frame; otherwise, reject
return gotoEnd?(deferred.notifyWith(elem,[animation,1,0]),deferred.resolveWith(elem,[animation,gotoEnd])):deferred.rejectWith(elem,[animation,gotoEnd]),this}}),props=animation.props;for(propFilter(props,animation.opts.specialEasing);index<length;index++)if(result=Animation.prefilters[index].call(animation,elem,props,animation.opts))return jQuery.isFunction(result.stop)&&(jQuery._queueHooks(animation.elem,animation.opts.queue).stop=jQuery.proxy(result.stop,result)),result;
// attach callbacks from options
return jQuery.map(props,createTween,animation),jQuery.isFunction(animation.opts.start)&&animation.opts.start.call(elem,animation),jQuery.fx.timer(jQuery.extend(tick,{elem:elem,anim:animation,queue:animation.opts.queue})),animation.progress(animation.opts.progress).done(animation.opts.done,animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)}
// Strip and collapse whitespace according to HTML spec
// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
function stripAndCollapse(value){var tokens=value.match(rnothtmlwhite)||[];return tokens.join(" ")}function getClass(elem){return elem.getAttribute&&elem.getAttribute("class")||""}function buildParams(prefix,obj,traditional,add){var name;if(jQuery.isArray(obj))
// Serialize array item.
jQuery.each(obj,function(i,v){traditional||rbracket.test(prefix)?
// Treat each array item as a scalar.
add(prefix,v):
// Item is non-scalar (array or object), encode its numeric index.
buildParams(prefix+"["+("object"==typeof v&&null!=v?i:"")+"]",v,traditional,add)});else if(traditional||"object"!==jQuery.type(obj))
// Serialize scalar item.
add(prefix,obj);else
// Serialize object item.
for(name in obj)buildParams(prefix+"["+name+"]",obj[name],traditional,add)}
// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports(structure){
// dataTypeExpression is optional and defaults to "*"
return function(dataTypeExpression,func){"string"!=typeof dataTypeExpression&&(func=dataTypeExpression,dataTypeExpression="*");var dataType,i=0,dataTypes=dataTypeExpression.toLowerCase().match(rnothtmlwhite)||[];if(jQuery.isFunction(func))
// For each dataType in the dataTypeExpression
for(;dataType=dataTypes[i++];)
// Prepend if requested
"+"===dataType[0]?(dataType=dataType.slice(1)||"*",(structure[dataType]=structure[dataType]||[]).unshift(func)):(structure[dataType]=structure[dataType]||[]).push(func)}}
// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR){function inspect(dataType){var selected;return inspected[dataType]=!0,jQuery.each(structure[dataType]||[],function(_,prefilterOrFactory){var dataTypeOrTransport=prefilterOrFactory(options,originalOptions,jqXHR);return"string"!=typeof dataTypeOrTransport||seekingTransport||inspected[dataTypeOrTransport]?seekingTransport?!(selected=dataTypeOrTransport):void 0:(options.dataTypes.unshift(dataTypeOrTransport),inspect(dataTypeOrTransport),!1)}),selected}var inspected={},seekingTransport=structure===transports;return inspect(options.dataTypes[0])||!inspected["*"]&&inspect("*")}
// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend(target,src){var key,deep,flatOptions=jQuery.ajaxSettings.flatOptions||{};for(key in src)void 0!==src[key]&&((flatOptions[key]?target:deep||(deep={}))[key]=src[key]);return deep&&jQuery.extend(!0,target,deep),target}/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses(s,jqXHR,responses){
// Remove auto dataType and get content-type in the process
for(var ct,type,finalDataType,firstDataType,contents=s.contents,dataTypes=s.dataTypes;"*"===dataTypes[0];)dataTypes.shift(),void 0===ct&&(ct=s.mimeType||jqXHR.getResponseHeader("Content-Type"));
// Check if we're dealing with a known content-type
if(ct)for(type in contents)if(contents[type]&&contents[type].test(ct)){dataTypes.unshift(type);break}
// Check to see if we have a response for the expected dataType
if(dataTypes[0]in responses)finalDataType=dataTypes[0];else{
// Try convertible dataTypes
for(type in responses){if(!dataTypes[0]||s.converters[type+" "+dataTypes[0]]){finalDataType=type;break}firstDataType||(firstDataType=type)}
// Or just use first one
finalDataType=finalDataType||firstDataType}
// If we found a dataType
// We add the dataType to the list if needed
// and return the corresponding response
if(finalDataType)return finalDataType!==dataTypes[0]&&dataTypes.unshift(finalDataType),responses[finalDataType]}/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert(s,response,jqXHR,isSuccess){var conv2,current,conv,tmp,prev,converters={},
// Work with a copy of dataTypes in case we need to modify it for conversion
dataTypes=s.dataTypes.slice();
// Create converters map with lowercased keys
if(dataTypes[1])for(conv in s.converters)converters[conv.toLowerCase()]=s.converters[conv];
// Convert to each sequential dataType
for(current=dataTypes.shift();current;)if(s.responseFields[current]&&(jqXHR[s.responseFields[current]]=response),
// Apply the dataFilter if provided
!prev&&isSuccess&&s.dataFilter&&(response=s.dataFilter(response,s.dataType)),prev=current,current=dataTypes.shift())
// There's only work to do if current dataType is non-auto
if("*"===current)current=prev;else if("*"!==prev&&prev!==current){
// If none found, seek a pair
if(
// Seek a direct converter
conv=converters[prev+" "+current]||converters["* "+current],!conv)for(conv2 in converters)if(
// If conv2 outputs current
tmp=conv2.split(" "),tmp[1]===current&&(
// If prev can be converted to accepted input
conv=converters[prev+" "+tmp[0]]||converters["* "+tmp[0]])){
// Condense equivalence converters
conv===!0?conv=converters[conv2]:converters[conv2]!==!0&&(current=tmp[0],dataTypes.unshift(tmp[1]));break}
// Apply converter (if not an equivalence)
if(conv!==!0)
// Unless errors are allowed to bubble, catch and return them
if(conv&&s["throws"])response=conv(response);else try{response=conv(response)}catch(e){return{state:"parsererror",error:conv?e:"No conversion from "+prev+" to "+current}}}return{state:"success",data:response}}/**
 * Gets a window from an element
 */
function getWindow(elem){return jQuery.isWindow(elem)?elem:9===elem.nodeType&&elem.defaultView}var arr=[],document=window.document,getProto=Object.getPrototypeOf,slice=arr.slice,concat=arr.concat,push=arr.push,indexOf=arr.indexOf,class2type={},toString=class2type.toString,hasOwn=class2type.hasOwnProperty,fnToString=hasOwn.toString,ObjectFunctionString=fnToString.call(Object),support={},version="3.1.1",
// Define a local copy of jQuery
jQuery=function(selector,context){
// The jQuery object is actually just the init constructor 'enhanced'
// Need init if jQuery is called (just allow error to be thrown if not included)
return new jQuery.fn.init(selector,context)},
// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
rtrim=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
// Matches dashed string for camelizing
rmsPrefix=/^-ms-/,rdashAlpha=/-([a-z])/g,
// Used by jQuery.camelCase as callback to replace()
fcamelCase=function(all,letter){return letter.toUpperCase()};jQuery.fn=jQuery.prototype={
// The current version of jQuery being used
jquery:version,constructor:jQuery,
// The default length of a jQuery object is 0
length:0,toArray:function(){return slice.call(this)},
// Get the Nth element in the matched element set OR
// Get the whole matched element set as a clean array
get:function(num){
// Return all the elements in a clean array
// Return all the elements in a clean array
return null==num?slice.call(this):num<0?this[num+this.length]:this[num]},
// Take an array of elements and push it onto the stack
// (returning the new matched element set)
pushStack:function(elems){
// Build a new jQuery matched element set
var ret=jQuery.merge(this.constructor(),elems);
// Return the newly-formed element set
// Add the old object onto the stack (as a reference)
return ret.prevObject=this,ret},
// Execute a callback for every element in the matched set.
each:function(callback){return jQuery.each(this,callback)},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem)}))},slice:function(){return this.pushStack(slice.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(i){var len=this.length,j=+i+(i<0?len:0);return this.pushStack(j>=0&&j<len?[this[j]]:[])},end:function(){return this.prevObject||this.constructor()},
// For internal use only.
// Behaves like an Array's method, not like a jQuery method.
push:push,sort:arr.sort,splice:arr.splice},jQuery.extend=jQuery.fn.extend=function(){var options,name,src,copy,copyIsArray,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=!1;for(
// Handle a deep copy situation
"boolean"==typeof target&&(deep=target,
// Skip the boolean and the target
target=arguments[i]||{},i++),
// Handle case when target is a string or something (possible in deep copy)
"object"==typeof target||jQuery.isFunction(target)||(target={}),
// Extend jQuery itself if only one argument is passed
i===length&&(target=this,i--);i<length;i++)
// Only deal with non-null/undefined values
if(null!=(options=arguments[i]))
// Extend the base object
for(name in options)src=target[name],copy=options[name],
// Prevent never-ending loop
target!==copy&&(
// Recurse if we're merging plain objects or arrays
deep&&copy&&(jQuery.isPlainObject(copy)||(copyIsArray=jQuery.isArray(copy)))?(copyIsArray?(copyIsArray=!1,clone=src&&jQuery.isArray(src)?src:[]):clone=src&&jQuery.isPlainObject(src)?src:{},
// Never move original objects, clone them
target[name]=jQuery.extend(deep,clone,copy)):void 0!==copy&&(target[name]=copy));
// Return the modified object
return target},jQuery.extend({
// Unique for each copy of jQuery on the page
expando:"jQuery"+(version+Math.random()).replace(/\D/g,""),
// Assume jQuery is ready without the ready module
isReady:!0,error:function(msg){throw new Error(msg)},noop:function(){},isFunction:function(obj){return"function"===jQuery.type(obj)},isArray:Array.isArray,isWindow:function(obj){return null!=obj&&obj===obj.window},isNumeric:function(obj){
// As of jQuery 3.0, isNumeric is limited to
// strings and numbers (primitives or objects)
// that can be coerced to finite numbers (gh-2662)
var type=jQuery.type(obj);
// parseFloat NaNs numeric-cast false positives ("")
// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
// subtraction forces infinities to NaN
return("number"===type||"string"===type)&&!isNaN(obj-parseFloat(obj))},isPlainObject:function(obj){var proto,Ctor;
// Detect obvious negatives
// Use toString instead of jQuery.type to catch host objects
// Detect obvious negatives
// Use toString instead of jQuery.type to catch host objects
// Objects with no prototype (e.g., `Object.create( null )`) are plain
// Objects with prototype are plain iff they were constructed by a global Object function
return!(!obj||"[object Object]"!==toString.call(obj))&&(!(proto=getProto(obj))||(Ctor=hasOwn.call(proto,"constructor")&&proto.constructor,"function"==typeof Ctor&&fnToString.call(Ctor)===ObjectFunctionString))},isEmptyObject:function(obj){/* eslint-disable no-unused-vars */
// See https://github.com/eslint/eslint/issues/6125
var name;for(name in obj)return!1;return!0},type:function(obj){return null==obj?obj+"":"object"==typeof obj||"function"==typeof obj?class2type[toString.call(obj)]||"object":typeof obj},
// Evaluates a script in a global context
globalEval:function(code){DOMEval(code)},
// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 13
// Microsoft forgot to hump their vendor prefix (#9572)
camelCase:function(string){return string.replace(rmsPrefix,"ms-").replace(rdashAlpha,fcamelCase)},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toLowerCase()===name.toLowerCase()},each:function(obj,callback){var length,i=0;if(isArrayLike(obj))for(length=obj.length;i<length&&callback.call(obj[i],i,obj[i])!==!1;i++);else for(i in obj)if(callback.call(obj[i],i,obj[i])===!1)break;return obj},
// Support: Android <=4.0 only
trim:function(text){return null==text?"":(text+"").replace(rtrim,"")},
// results is for internal usage only
makeArray:function(arr,results){var ret=results||[];return null!=arr&&(isArrayLike(Object(arr))?jQuery.merge(ret,"string"==typeof arr?[arr]:arr):push.call(ret,arr)),ret},inArray:function(elem,arr,i){return null==arr?-1:indexOf.call(arr,elem,i)},
// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
merge:function(first,second){for(var len=+second.length,j=0,i=first.length;j<len;j++)first[i++]=second[j];return first.length=i,first},grep:function(elems,callback,invert){
// Go through the array, only saving the items
// that pass the validator function
for(var callbackInverse,matches=[],i=0,length=elems.length,callbackExpect=!invert;i<length;i++)callbackInverse=!callback(elems[i],i),callbackInverse!==callbackExpect&&matches.push(elems[i]);return matches},
// arg is for internal usage only
map:function(elems,callback,arg){var length,value,i=0,ret=[];
// Go through the array, translating each of the items to their new values
if(isArrayLike(elems))for(length=elems.length;i<length;i++)value=callback(elems[i],i,arg),null!=value&&ret.push(value);else for(i in elems)value=callback(elems[i],i,arg),null!=value&&ret.push(value);
// Flatten any nested arrays
return concat.apply([],ret)},
// A global GUID counter for objects
guid:1,
// Bind a function to a context, optionally partially applying any
// arguments.
proxy:function(fn,context){var tmp,args,proxy;
// Quick check to determine if target is callable, in the spec
// this throws a TypeError, but we will just return undefined.
if("string"==typeof context&&(tmp=fn[context],context=fn,fn=tmp),jQuery.isFunction(fn))
// Simulated bind
// Set the guid of unique handler to the same of original handler, so it can be removed
return args=slice.call(arguments,2),proxy=function(){return fn.apply(context||this,args.concat(slice.call(arguments)))},proxy.guid=fn.guid=fn.guid||jQuery.guid++,proxy},now:Date.now,
// jQuery.support is not used in Core but other projects attach their
// properties to it so it needs to exist.
support:support}),"function"==typeof Symbol&&(jQuery.fn[Symbol.iterator]=arr[Symbol.iterator]),
// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(i,name){class2type["[object "+name+"]"]=name.toLowerCase()});var Sizzle=/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
function(window){function Sizzle(selector,context,results,seed){var m,i,elem,nid,match,groups,newSelector,newContext=context&&context.ownerDocument,
// nodeType defaults to 9, since context defaults to document
nodeType=context?context.nodeType:9;
// Return early from calls with invalid selector or context
if(results=results||[],"string"!=typeof selector||!selector||1!==nodeType&&9!==nodeType&&11!==nodeType)return results;
// Try to shortcut find operations (as opposed to filters) in HTML documents
if(!seed&&((context?context.ownerDocument||context:preferredDoc)!==document&&setDocument(context),context=context||document,documentIsHTML)){
// If the selector is sufficiently simple, try using a "get*By*" DOM method
// (excepting DocumentFragment context, where the methods don't exist)
if(11!==nodeType&&(match=rquickExpr.exec(selector)))
// ID selector
if(m=match[1]){
// Document context
if(9===nodeType){if(!(elem=context.getElementById(m)))return results;
// Support: IE, Opera, Webkit
// TODO: identify versions
// getElementById can match elements by name instead of ID
if(elem.id===m)return results.push(elem),results}else
// Support: IE, Opera, Webkit
// TODO: identify versions
// getElementById can match elements by name instead of ID
if(newContext&&(elem=newContext.getElementById(m))&&contains(context,elem)&&elem.id===m)return results.push(elem),results}else{if(match[2])return push.apply(results,context.getElementsByTagName(selector)),results;if((m=match[3])&&support.getElementsByClassName&&context.getElementsByClassName)return push.apply(results,context.getElementsByClassName(m)),results}
// Take advantage of querySelectorAll
if(support.qsa&&!compilerCache[selector+" "]&&(!rbuggyQSA||!rbuggyQSA.test(selector))){if(1!==nodeType)newContext=context,newSelector=selector;else if("object"!==context.nodeName.toLowerCase()){for(
// Capture the context ID, setting it first if necessary
(nid=context.getAttribute("id"))?nid=nid.replace(rcssescape,fcssescape):context.setAttribute("id",nid=expando),
// Prefix every selector in the list
groups=tokenize(selector),i=groups.length;i--;)groups[i]="#"+nid+" "+toSelector(groups[i]);newSelector=groups.join(","),
// Expand context for sibling selectors
newContext=rsibling.test(selector)&&testContext(context.parentNode)||context}if(newSelector)try{return push.apply(results,newContext.querySelectorAll(newSelector)),results}catch(qsaError){}finally{nid===expando&&context.removeAttribute("id")}}}
// All others
return select(selector.replace(rtrim,"$1"),context,results,seed)}/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache(){function cache(key,value){
// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
// Only keep the most recent entries
return keys.push(key+" ")>Expr.cacheLength&&delete cache[keys.shift()],cache[key+" "]=value}var keys=[];return cache}/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction(fn){return fn[expando]=!0,fn}/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert(fn){var el=document.createElement("fieldset");try{return!!fn(el)}catch(e){return!1}finally{
// Remove from its parent by default
el.parentNode&&el.parentNode.removeChild(el),
// release memory in IE
el=null}}/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle(attrs,handler){for(var arr=attrs.split("|"),i=arr.length;i--;)Expr.attrHandle[arr[i]]=handler}/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck(a,b){var cur=b&&a,diff=cur&&1===a.nodeType&&1===b.nodeType&&a.sourceIndex-b.sourceIndex;
// Use IE sourceIndex if available on both nodes
if(diff)return diff;
// Check if b follows a
if(cur)for(;cur=cur.nextSibling;)if(cur===b)return-1;return a?1:-1}/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return"input"===name&&elem.type===type}}/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return("input"===name||"button"===name)&&elem.type===type}}/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo(disabled){
// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
return function(elem){
// Only certain elements can match :enabled or :disabled
// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
// Only certain elements can match :enabled or :disabled
// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
// Check for inherited disabledness on relevant non-disabled elements:
// * listed form-associated elements in a disabled fieldset
//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
// * option elements in a disabled optgroup
//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
// All such elements have a "form" property.
// Option elements defer to a parent optgroup if present
// Where there is no isDisabled, check manually
/* jshint -W018 */
return"form"in elem?elem.parentNode&&elem.disabled===!1?"label"in elem?"label"in elem.parentNode?elem.parentNode.disabled===disabled:elem.disabled===disabled:elem.isDisabled===disabled||elem.isDisabled!==!disabled&&disabledAncestor(elem)===disabled:elem.disabled===disabled:"label"in elem&&elem.disabled===disabled}}/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo(fn){return markFunction(function(argument){return argument=+argument,markFunction(function(seed,matches){
// Match elements found at the specified indexes
for(var j,matchIndexes=fn([],seed.length,argument),i=matchIndexes.length;i--;)seed[j=matchIndexes[i]]&&(seed[j]=!(matches[j]=seed[j]))})})}/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext(context){return context&&"undefined"!=typeof context.getElementsByTagName&&context}
// Easy API for creating new setFilters
function setFilters(){}function toSelector(tokens){for(var i=0,len=tokens.length,selector="";i<len;i++)selector+=tokens[i].value;return selector}function addCombinator(matcher,combinator,base){var dir=combinator.dir,skip=combinator.next,key=skip||dir,checkNonElements=base&&"parentNode"===key,doneName=done++;
// Check against closest ancestor/preceding element
// Check against all ancestor/preceding elements
return combinator.first?function(elem,context,xml){for(;elem=elem[dir];)if(1===elem.nodeType||checkNonElements)return matcher(elem,context,xml);return!1}:function(elem,context,xml){var oldCache,uniqueCache,outerCache,newCache=[dirruns,doneName];
// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
if(xml){for(;elem=elem[dir];)if((1===elem.nodeType||checkNonElements)&&matcher(elem,context,xml))return!0}else for(;elem=elem[dir];)if(1===elem.nodeType||checkNonElements)if(outerCache=elem[expando]||(elem[expando]={}),
// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[elem.uniqueID]||(outerCache[elem.uniqueID]={}),skip&&skip===elem.nodeName.toLowerCase())elem=elem[dir]||elem;else{if((oldCache=uniqueCache[key])&&oldCache[0]===dirruns&&oldCache[1]===doneName)
// Assign to newCache so results back-propagate to previous elements
return newCache[2]=oldCache[2];
// A match means we're done; a fail means we have to keep checking
if(
// Reuse newcache so results back-propagate to previous elements
uniqueCache[key]=newCache,newCache[2]=matcher(elem,context,xml))return!0}return!1}}function elementMatcher(matchers){return matchers.length>1?function(elem,context,xml){for(var i=matchers.length;i--;)if(!matchers[i](elem,context,xml))return!1;return!0}:matchers[0]}function multipleContexts(selector,contexts,results){for(var i=0,len=contexts.length;i<len;i++)Sizzle(selector,contexts[i],results);return results}function condense(unmatched,map,filter,context,xml){for(var elem,newUnmatched=[],i=0,len=unmatched.length,mapped=null!=map;i<len;i++)(elem=unmatched[i])&&(filter&&!filter(elem,context,xml)||(newUnmatched.push(elem),mapped&&map.push(i)));return newUnmatched}function setMatcher(preFilter,selector,matcher,postFilter,postFinder,postSelector){return postFilter&&!postFilter[expando]&&(postFilter=setMatcher(postFilter)),postFinder&&!postFinder[expando]&&(postFinder=setMatcher(postFinder,postSelector)),markFunction(function(seed,results,context,xml){var temp,i,elem,preMap=[],postMap=[],preexisting=results.length,
// Get initial elements from seed or context
elems=seed||multipleContexts(selector||"*",context.nodeType?[context]:context,[]),
// Prefilter to get matcher input, preserving a map for seed-results synchronization
matcherIn=!preFilter||!seed&&selector?elems:condense(elems,preMap,preFilter,context,xml),matcherOut=matcher?
// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
postFinder||(seed?preFilter:preexisting||postFilter)?
// ...intermediate processing is necessary
[]:
// ...otherwise use results directly
results:matcherIn;
// Apply postFilter
if(
// Find primary matches
matcher&&matcher(matcherIn,matcherOut,context,xml),postFilter)for(temp=condense(matcherOut,postMap),postFilter(temp,[],context,xml),
// Un-match failing elements by moving them back to matcherIn
i=temp.length;i--;)(elem=temp[i])&&(matcherOut[postMap[i]]=!(matcherIn[postMap[i]]=elem));if(seed){if(postFinder||preFilter){if(postFinder){for(
// Get the final matcherOut by condensing this intermediate into postFinder contexts
temp=[],i=matcherOut.length;i--;)(elem=matcherOut[i])&&
// Restore matcherIn since elem is not yet a final match
temp.push(matcherIn[i]=elem);postFinder(null,matcherOut=[],temp,xml)}for(
// Move matched elements from seed to results to keep them synchronized
i=matcherOut.length;i--;)(elem=matcherOut[i])&&(temp=postFinder?indexOf(seed,elem):preMap[i])>-1&&(seed[temp]=!(results[temp]=elem))}}else matcherOut=condense(matcherOut===results?matcherOut.splice(preexisting,matcherOut.length):matcherOut),postFinder?postFinder(null,results,matcherOut,xml):push.apply(results,matcherOut)})}function matcherFromTokens(tokens){for(var checkContext,matcher,j,len=tokens.length,leadingRelative=Expr.relative[tokens[0].type],implicitRelative=leadingRelative||Expr.relative[" "],i=leadingRelative?1:0,
// The foundational matcher ensures that elements are reachable from top-level context(s)
matchContext=addCombinator(function(elem){return elem===checkContext},implicitRelative,!0),matchAnyContext=addCombinator(function(elem){return indexOf(checkContext,elem)>-1},implicitRelative,!0),matchers=[function(elem,context,xml){var ret=!leadingRelative&&(xml||context!==outermostContext)||((checkContext=context).nodeType?matchContext(elem,context,xml):matchAnyContext(elem,context,xml));
// Avoid hanging onto element (issue #299)
return checkContext=null,ret}];i<len;i++)if(matcher=Expr.relative[tokens[i].type])matchers=[addCombinator(elementMatcher(matchers),matcher)];else{
// Return special upon seeing a positional matcher
if(matcher=Expr.filter[tokens[i].type].apply(null,tokens[i].matches),matcher[expando]){for(
// Find the next relative operator (if any) for proper handling
j=++i;j<len&&!Expr.relative[tokens[j].type];j++);
// If the preceding token was a descendant combinator, insert an implicit any-element `*`
return setMatcher(i>1&&elementMatcher(matchers),i>1&&toSelector(tokens.slice(0,i-1).concat({value:" "===tokens[i-2].type?"*":""})).replace(rtrim,"$1"),matcher,i<j&&matcherFromTokens(tokens.slice(i,j)),j<len&&matcherFromTokens(tokens=tokens.slice(j)),j<len&&toSelector(tokens))}matchers.push(matcher)}return elementMatcher(matchers)}function matcherFromGroupMatchers(elementMatchers,setMatchers){var bySet=setMatchers.length>0,byElement=elementMatchers.length>0,superMatcher=function(seed,context,xml,results,outermost){var elem,j,matcher,matchedCount=0,i="0",unmatched=seed&&[],setMatched=[],contextBackup=outermostContext,
// We must always have either seed elements or outermost context
elems=seed||byElement&&Expr.find.TAG("*",outermost),
// Use integer dirruns iff this is the outermost matcher
dirrunsUnique=dirruns+=null==contextBackup?1:Math.random()||.1,len=elems.length;
// Add elements passing elementMatchers directly to results
// Support: IE<9, Safari
// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
for(outermost&&(outermostContext=context===document||context||outermost);i!==len&&null!=(elem=elems[i]);i++){if(byElement&&elem){for(j=0,context||elem.ownerDocument===document||(setDocument(elem),xml=!documentIsHTML);matcher=elementMatchers[j++];)if(matcher(elem,context||document,xml)){results.push(elem);break}outermost&&(dirruns=dirrunsUnique)}
// Track unmatched elements for set filters
bySet&&(
// They will have gone through all possible matchers
(elem=!matcher&&elem)&&matchedCount--,
// Lengthen the array for every element, matched or not
seed&&unmatched.push(elem))}
// Apply set filters to unmatched elements
// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
// no element matchers and no seed.
// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
// case, which will result in a "00" `matchedCount` that differs from `i` but is also
// numerically zero.
if(
// `i` is now the count of elements visited above, and adding it to `matchedCount`
// makes the latter nonnegative.
matchedCount+=i,bySet&&i!==matchedCount){for(j=0;matcher=setMatchers[j++];)matcher(unmatched,setMatched,context,xml);if(seed){
// Reintegrate element matches to eliminate the need for sorting
if(matchedCount>0)for(;i--;)unmatched[i]||setMatched[i]||(setMatched[i]=pop.call(results));
// Discard index placeholder values to get only actual matches
setMatched=condense(setMatched)}
// Add matches to results
push.apply(results,setMatched),
// Seedless set matches succeeding multiple successful matchers stipulate sorting
outermost&&!seed&&setMatched.length>0&&matchedCount+setMatchers.length>1&&Sizzle.uniqueSort(results)}
// Override manipulation of globals by nested matchers
return outermost&&(dirruns=dirrunsUnique,outermostContext=contextBackup),unmatched};return bySet?markFunction(superMatcher):superMatcher}var i,support,Expr,getText,isXML,tokenize,compile,select,outermostContext,sortInput,hasDuplicate,
// Local document vars
setDocument,document,docElem,documentIsHTML,rbuggyQSA,rbuggyMatches,matches,contains,
// Instance-specific data
expando="sizzle"+1*new Date,preferredDoc=window.document,dirruns=0,done=0,classCache=createCache(),tokenCache=createCache(),compilerCache=createCache(),sortOrder=function(a,b){return a===b&&(hasDuplicate=!0),0},
// Instance methods
hasOwn={}.hasOwnProperty,arr=[],pop=arr.pop,push_native=arr.push,push=arr.push,slice=arr.slice,
// Use a stripped-down indexOf as it's faster than native
// https://jsperf.com/thor-indexof-vs-for/5
indexOf=function(list,elem){for(var i=0,len=list.length;i<len;i++)if(list[i]===elem)return i;return-1},booleans="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
// Regular expressions
// http://www.w3.org/TR/css3-selectors/#whitespace
whitespace="[\\x20\\t\\r\\n\\f]",
// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
identifier="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
attributes="\\["+whitespace+"*("+identifier+")(?:"+whitespace+
// Operator (capture 2)
"*([*^$|!~]?=)"+whitespace+
// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+identifier+"))|)"+whitespace+"*\\]",pseudos=":("+identifier+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+attributes+")*)|.*)\\)|)",
// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
rwhitespace=new RegExp(whitespace+"+","g"),rtrim=new RegExp("^"+whitespace+"+|((?:^|[^\\\\])(?:\\\\.)*)"+whitespace+"+$","g"),rcomma=new RegExp("^"+whitespace+"*,"+whitespace+"*"),rcombinators=new RegExp("^"+whitespace+"*([>+~]|"+whitespace+")"+whitespace+"*"),rattributeQuotes=new RegExp("="+whitespace+"*([^\\]'\"]*?)"+whitespace+"*\\]","g"),rpseudo=new RegExp(pseudos),ridentifier=new RegExp("^"+identifier+"$"),matchExpr={ID:new RegExp("^#("+identifier+")"),CLASS:new RegExp("^\\.("+identifier+")"),TAG:new RegExp("^("+identifier+"|[*])"),ATTR:new RegExp("^"+attributes),PSEUDO:new RegExp("^"+pseudos),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+whitespace+"*(even|odd|(([+-]|)(\\d*)n|)"+whitespace+"*(?:([+-]|)"+whitespace+"*(\\d+)|))"+whitespace+"*\\)|)","i"),bool:new RegExp("^(?:"+booleans+")$","i"),
// For use in libraries implementing .is()
// We use this for POS matching in `select`
needsContext:new RegExp("^"+whitespace+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+whitespace+"*((?:-\\d)?\\d*)"+whitespace+"*\\)|)(?=[^-]|$)","i")},rinputs=/^(?:input|select|textarea|button)$/i,rheader=/^h\d$/i,rnative=/^[^{]+\{\s*\[native \w/,
// Easily-parseable/retrievable ID or TAG or CLASS selectors
rquickExpr=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,rsibling=/[+~]/,
// CSS escapes
// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
runescape=new RegExp("\\\\([\\da-f]{1,6}"+whitespace+"?|("+whitespace+")|.)","ig"),funescape=function(_,escaped,escapedWhitespace){var high="0x"+escaped-65536;
// NaN means non-codepoint
// Support: Firefox<24
// Workaround erroneous numeric interpretation of +"0x"
// BMP codepoint
// Supplemental Plane codepoint (surrogate pair)
return high!==high||escapedWhitespace?escaped:high<0?String.fromCharCode(high+65536):String.fromCharCode(high>>10|55296,1023&high|56320)},
// CSS string/identifier serialization
// https://drafts.csswg.org/cssom/#common-serializing-idioms
rcssescape=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,fcssescape=function(ch,asCodePoint){
// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
return asCodePoint?"\0"===ch?"�":ch.slice(0,-1)+"\\"+ch.charCodeAt(ch.length-1).toString(16)+" ":"\\"+ch},
// Used for iframes
// See setDocument()
// Removing the function wrapper causes a "Permission Denied"
// error in IE
unloadHandler=function(){setDocument()},disabledAncestor=addCombinator(function(elem){return elem.disabled===!0&&("form"in elem||"label"in elem)},{dir:"parentNode",next:"legend"});
// Optimize for push.apply( _, NodeList )
try{push.apply(arr=slice.call(preferredDoc.childNodes),preferredDoc.childNodes),
// Support: Android<4.0
// Detect silently failing push.apply
arr[preferredDoc.childNodes.length].nodeType}catch(e){push={apply:arr.length?
// Leverage slice if possible
function(target,els){push_native.apply(target,slice.call(els))}:
// Support: IE<9
// Otherwise append directly
function(target,els){
// Can't trust NodeList.length
for(var j=target.length,i=0;target[j++]=els[i++];);target.length=j-1}}}
// Expose support vars for convenience
support=Sizzle.support={},/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML=Sizzle.isXML=function(elem){
// documentElement is verified for cases where it doesn't yet exist
// (such as loading iframes in IE - #4833)
var documentElement=elem&&(elem.ownerDocument||elem).documentElement;return!!documentElement&&"HTML"!==documentElement.nodeName},/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument=Sizzle.setDocument=function(node){var hasCompare,subWindow,doc=node?node.ownerDocument||node:preferredDoc;
// Return early if doc is invalid or already selected
// Return early if doc is invalid or already selected
// Update global variables
// Support: IE 9-11, Edge
// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
// Support: IE 11, Edge
/* Attributes
	---------------------------------------------------------------------- */
// Support: IE<8
// Verify that getAttribute really returns attributes and not properties
// (excepting IE8 booleans)
/* getElement(s)By*
	---------------------------------------------------------------------- */
// Check if getElementsByTagName("*") returns only elements
// Support: IE<9
// Support: IE<10
// Check if getElementById returns elements by name
// The broken getElementById methods don't pick up programmatically-set names,
// so use a roundabout getElementsByName test
// ID filter and find
// Support: IE 6 - 7 only
// getElementById is not reliable as a find shortcut
// Tag
// Class
/* QSA/matchesSelector
	---------------------------------------------------------------------- */
// QSA and matchesSelector support
// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
// qSa(:focus) reports false when true (Chrome 21)
// We allow this because of a bug in IE8/9 that throws an error
// whenever `document.activeElement` is accessed on an iframe
// So, we allow :focus to pass through QSA all the time to avoid the IE error
// See https://bugs.jquery.com/ticket/13378
// Build QSA regex
// Regex strategy adopted from Diego Perini
/* Contains
	---------------------------------------------------------------------- */
// Element contains another
// Purposefully self-exclusive
// As in, an element does not contain itself
/* Sorting
	---------------------------------------------------------------------- */
// Document order sorting
return doc!==document&&9===doc.nodeType&&doc.documentElement?(document=doc,docElem=document.documentElement,documentIsHTML=!isXML(document),preferredDoc!==document&&(subWindow=document.defaultView)&&subWindow.top!==subWindow&&(subWindow.addEventListener?subWindow.addEventListener("unload",unloadHandler,!1):subWindow.attachEvent&&subWindow.attachEvent("onunload",unloadHandler)),support.attributes=assert(function(el){return el.className="i",!el.getAttribute("className")}),support.getElementsByTagName=assert(function(el){return el.appendChild(document.createComment("")),!el.getElementsByTagName("*").length}),support.getElementsByClassName=rnative.test(document.getElementsByClassName),support.getById=assert(function(el){return docElem.appendChild(el).id=expando,!document.getElementsByName||!document.getElementsByName(expando).length}),support.getById?(Expr.filter.ID=function(id){var attrId=id.replace(runescape,funescape);return function(elem){return elem.getAttribute("id")===attrId}},Expr.find.ID=function(id,context){if("undefined"!=typeof context.getElementById&&documentIsHTML){var elem=context.getElementById(id);return elem?[elem]:[]}}):(Expr.filter.ID=function(id){var attrId=id.replace(runescape,funescape);return function(elem){var node="undefined"!=typeof elem.getAttributeNode&&elem.getAttributeNode("id");return node&&node.value===attrId}},Expr.find.ID=function(id,context){if("undefined"!=typeof context.getElementById&&documentIsHTML){var node,i,elems,elem=context.getElementById(id);if(elem){if(
// Verify the id attribute
node=elem.getAttributeNode("id"),node&&node.value===id)return[elem];for(
// Fall back on getElementsByName
elems=context.getElementsByName(id),i=0;elem=elems[i++];)if(node=elem.getAttributeNode("id"),node&&node.value===id)return[elem]}return[]}}),Expr.find.TAG=support.getElementsByTagName?function(tag,context){return"undefined"!=typeof context.getElementsByTagName?context.getElementsByTagName(tag):support.qsa?context.querySelectorAll(tag):void 0}:function(tag,context){var elem,tmp=[],i=0,
// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
results=context.getElementsByTagName(tag);
// Filter out possible comments
if("*"===tag){for(;elem=results[i++];)1===elem.nodeType&&tmp.push(elem);return tmp}return results},Expr.find.CLASS=support.getElementsByClassName&&function(className,context){if("undefined"!=typeof context.getElementsByClassName&&documentIsHTML)return context.getElementsByClassName(className)},rbuggyMatches=[],rbuggyQSA=[],(support.qsa=rnative.test(document.querySelectorAll))&&(assert(function(el){
// Select is set to empty string on purpose
// This is to test IE's treatment of not explicitly
// setting a boolean content attribute,
// since its presence should be enough
// https://bugs.jquery.com/ticket/12359
docElem.appendChild(el).innerHTML="<a id='"+expando+"'></a><select id='"+expando+"-\r\\' msallowcapture=''><option selected=''></option></select>",
// Support: IE8, Opera 11-12.16
// Nothing should be selected when empty strings follow ^= or $= or *=
// The test attribute must be unknown in Opera but "safe" for WinRT
// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
el.querySelectorAll("[msallowcapture^='']").length&&rbuggyQSA.push("[*^$]="+whitespace+"*(?:''|\"\")"),
// Support: IE8
// Boolean attributes and "value" are not treated correctly
el.querySelectorAll("[selected]").length||rbuggyQSA.push("\\["+whitespace+"*(?:value|"+booleans+")"),
// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
el.querySelectorAll("[id~="+expando+"-]").length||rbuggyQSA.push("~="),
// Webkit/Opera - :checked should return selected option elements
// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
// IE8 throws error here and will not see later tests
el.querySelectorAll(":checked").length||rbuggyQSA.push(":checked"),
// Support: Safari 8+, iOS 8+
// https://bugs.webkit.org/show_bug.cgi?id=136851
// In-page `selector#id sibling-combinator selector` fails
el.querySelectorAll("a#"+expando+"+*").length||rbuggyQSA.push(".#.+[+~]")}),assert(function(el){el.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
// Support: Windows 8 Native Apps
// The type and name attributes are restricted during .innerHTML assignment
var input=document.createElement("input");input.setAttribute("type","hidden"),el.appendChild(input).setAttribute("name","D"),
// Support: IE8
// Enforce case-sensitivity of name attribute
el.querySelectorAll("[name=d]").length&&rbuggyQSA.push("name"+whitespace+"*[*^$|!~]?="),
// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
// IE8 throws error here and will not see later tests
2!==el.querySelectorAll(":enabled").length&&rbuggyQSA.push(":enabled",":disabled"),
// Support: IE9-11+
// IE's :disabled selector does not pick up the children of disabled fieldsets
docElem.appendChild(el).disabled=!0,2!==el.querySelectorAll(":disabled").length&&rbuggyQSA.push(":enabled",":disabled"),
// Opera 10-11 does not throw on post-comma invalid pseudos
el.querySelectorAll("*,:x"),rbuggyQSA.push(",.*:")})),(support.matchesSelector=rnative.test(matches=docElem.matches||docElem.webkitMatchesSelector||docElem.mozMatchesSelector||docElem.oMatchesSelector||docElem.msMatchesSelector))&&assert(function(el){
// Check to see if it's possible to do matchesSelector
// on a disconnected node (IE 9)
support.disconnectedMatch=matches.call(el,"*"),
// This should fail with an exception
// Gecko does not error, returns false instead
matches.call(el,"[s!='']:x"),rbuggyMatches.push("!=",pseudos)}),rbuggyQSA=rbuggyQSA.length&&new RegExp(rbuggyQSA.join("|")),rbuggyMatches=rbuggyMatches.length&&new RegExp(rbuggyMatches.join("|")),hasCompare=rnative.test(docElem.compareDocumentPosition),contains=hasCompare||rnative.test(docElem.contains)?function(a,b){var adown=9===a.nodeType?a.documentElement:a,bup=b&&b.parentNode;return a===bup||!(!bup||1!==bup.nodeType||!(adown.contains?adown.contains(bup):a.compareDocumentPosition&&16&a.compareDocumentPosition(bup)))}:function(a,b){if(b)for(;b=b.parentNode;)if(b===a)return!0;return!1},sortOrder=hasCompare?function(a,b){
// Flag for duplicate removal
if(a===b)return hasDuplicate=!0,0;
// Sort on method existence if only one input has compareDocumentPosition
var compare=!a.compareDocumentPosition-!b.compareDocumentPosition;
// Calculate position if both inputs belong to the same document
// Otherwise we know they are disconnected
// Disconnected nodes
// Choose the first element that is related to our preferred document
return compare?compare:(compare=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&compare||!support.sortDetached&&b.compareDocumentPosition(a)===compare?a===document||a.ownerDocument===preferredDoc&&contains(preferredDoc,a)?-1:b===document||b.ownerDocument===preferredDoc&&contains(preferredDoc,b)?1:sortInput?indexOf(sortInput,a)-indexOf(sortInput,b):0:4&compare?-1:1)}:function(a,b){
// Exit early if the nodes are identical
if(a===b)return hasDuplicate=!0,0;var cur,i=0,aup=a.parentNode,bup=b.parentNode,ap=[a],bp=[b];
// Parentless nodes are either documents or disconnected
if(!aup||!bup)return a===document?-1:b===document?1:aup?-1:bup?1:sortInput?indexOf(sortInput,a)-indexOf(sortInput,b):0;if(aup===bup)return siblingCheck(a,b);for(
// Otherwise we need full lists of their ancestors for comparison
cur=a;cur=cur.parentNode;)ap.unshift(cur);for(cur=b;cur=cur.parentNode;)bp.unshift(cur);
// Walk down the tree looking for a discrepancy
for(;ap[i]===bp[i];)i++;
// Do a sibling check if the nodes have a common ancestor
// Otherwise nodes in our document sort first
return i?siblingCheck(ap[i],bp[i]):ap[i]===preferredDoc?-1:bp[i]===preferredDoc?1:0},document):document},Sizzle.matches=function(expr,elements){return Sizzle(expr,null,null,elements)},Sizzle.matchesSelector=function(elem,expr){if(
// Set document vars if needed
(elem.ownerDocument||elem)!==document&&setDocument(elem),
// Make sure that attribute selectors are quoted
expr=expr.replace(rattributeQuotes,"='$1']"),support.matchesSelector&&documentIsHTML&&!compilerCache[expr+" "]&&(!rbuggyMatches||!rbuggyMatches.test(expr))&&(!rbuggyQSA||!rbuggyQSA.test(expr)))try{var ret=matches.call(elem,expr);
// IE 9's matchesSelector returns false on disconnected nodes
if(ret||support.disconnectedMatch||
// As well, disconnected nodes are said to be in a document
// fragment in IE 9
elem.document&&11!==elem.document.nodeType)return ret}catch(e){}return Sizzle(expr,document,null,[elem]).length>0},Sizzle.contains=function(context,elem){
// Set document vars if needed
return(context.ownerDocument||context)!==document&&setDocument(context),contains(context,elem)},Sizzle.attr=function(elem,name){
// Set document vars if needed
(elem.ownerDocument||elem)!==document&&setDocument(elem);var fn=Expr.attrHandle[name.toLowerCase()],
// Don't get fooled by Object.prototype properties (jQuery #13807)
val=fn&&hasOwn.call(Expr.attrHandle,name.toLowerCase())?fn(elem,name,!documentIsHTML):void 0;return void 0!==val?val:support.attributes||!documentIsHTML?elem.getAttribute(name):(val=elem.getAttributeNode(name))&&val.specified?val.value:null},Sizzle.escape=function(sel){return(sel+"").replace(rcssescape,fcssescape)},Sizzle.error=function(msg){throw new Error("Syntax error, unrecognized expression: "+msg)},/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort=function(results){var elem,duplicates=[],j=0,i=0;if(
// Unless we *know* we can detect duplicates, assume their presence
hasDuplicate=!support.detectDuplicates,sortInput=!support.sortStable&&results.slice(0),results.sort(sortOrder),hasDuplicate){for(;elem=results[i++];)elem===results[i]&&(j=duplicates.push(i));for(;j--;)results.splice(duplicates[j],1)}
// Clear input after sorting to release objects
// See https://github.com/jquery/sizzle/pull/225
return sortInput=null,results},/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText=Sizzle.getText=function(elem){var node,ret="",i=0,nodeType=elem.nodeType;if(nodeType){if(1===nodeType||9===nodeType||11===nodeType){
// Use textContent for elements
// innerText usage removed for consistency of new lines (jQuery #11153)
if("string"==typeof elem.textContent)return elem.textContent;
// Traverse its children
for(elem=elem.firstChild;elem;elem=elem.nextSibling)ret+=getText(elem)}else if(3===nodeType||4===nodeType)return elem.nodeValue}else
// If no nodeType, this is expected to be an array
for(;node=elem[i++];)
// Do not traverse comment nodes
ret+=getText(node);
// Do not include comment or processing instruction nodes
return ret},Expr=Sizzle.selectors={
// Can be adjusted by the user
cacheLength:50,createPseudo:markFunction,match:matchExpr,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(match){
// Move the given value to match[3] whether quoted or unquoted
return match[1]=match[1].replace(runescape,funescape),match[3]=(match[3]||match[4]||match[5]||"").replace(runescape,funescape),"~="===match[2]&&(match[3]=" "+match[3]+" "),match.slice(0,4)},CHILD:function(match){/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
// nth-* requires argument
// numeric x and y parameters for Expr.filter.CHILD
// remember that false/true cast respectively to 0/1
return match[1]=match[1].toLowerCase(),"nth"===match[1].slice(0,3)?(match[3]||Sizzle.error(match[0]),match[4]=+(match[4]?match[5]+(match[6]||1):2*("even"===match[3]||"odd"===match[3])),match[5]=+(match[7]+match[8]||"odd"===match[3])):match[3]&&Sizzle.error(match[0]),match},PSEUDO:function(match){var excess,unquoted=!match[6]&&match[2];
// Accept quoted arguments as-is
// Get excess from tokenize (recursively)
// advance to the next closing parenthesis
// excess is a negative index
return matchExpr.CHILD.test(match[0])?null:(match[3]?match[2]=match[4]||match[5]||"":unquoted&&rpseudo.test(unquoted)&&(excess=tokenize(unquoted,!0))&&(excess=unquoted.indexOf(")",unquoted.length-excess)-unquoted.length)&&(match[0]=match[0].slice(0,excess),match[2]=unquoted.slice(0,excess)),match.slice(0,3))}},filter:{TAG:function(nodeNameSelector){var nodeName=nodeNameSelector.replace(runescape,funescape).toLowerCase();return"*"===nodeNameSelector?function(){return!0}:function(elem){return elem.nodeName&&elem.nodeName.toLowerCase()===nodeName}},CLASS:function(className){var pattern=classCache[className+" "];return pattern||(pattern=new RegExp("(^|"+whitespace+")"+className+"("+whitespace+"|$)"))&&classCache(className,function(elem){return pattern.test("string"==typeof elem.className&&elem.className||"undefined"!=typeof elem.getAttribute&&elem.getAttribute("class")||"")})},ATTR:function(name,operator,check){return function(elem){var result=Sizzle.attr(elem,name);return null==result?"!="===operator:!operator||(result+="","="===operator?result===check:"!="===operator?result!==check:"^="===operator?check&&0===result.indexOf(check):"*="===operator?check&&result.indexOf(check)>-1:"$="===operator?check&&result.slice(-check.length)===check:"~="===operator?(" "+result.replace(rwhitespace," ")+" ").indexOf(check)>-1:"|="===operator&&(result===check||result.slice(0,check.length+1)===check+"-"))}},CHILD:function(type,what,argument,first,last){var simple="nth"!==type.slice(0,3),forward="last"!==type.slice(-4),ofType="of-type"===what;
// Shortcut for :nth-*(n)
return 1===first&&0===last?function(elem){return!!elem.parentNode}:function(elem,context,xml){var cache,uniqueCache,outerCache,node,nodeIndex,start,dir=simple!==forward?"nextSibling":"previousSibling",parent=elem.parentNode,name=ofType&&elem.nodeName.toLowerCase(),useCache=!xml&&!ofType,diff=!1;if(parent){
// :(first|last|only)-(child|of-type)
if(simple){for(;dir;){for(node=elem;node=node[dir];)if(ofType?node.nodeName.toLowerCase()===name:1===node.nodeType)return!1;
// Reverse direction for :only-* (if we haven't yet done so)
start=dir="only"===type&&!start&&"nextSibling"}return!0}
// non-xml :nth-child(...) stores cache data on `parent`
if(start=[forward?parent.firstChild:parent.lastChild],forward&&useCache){for(
// Seek `elem` from a previously-cached index
// ...in a gzip-friendly way
node=parent,outerCache=node[expando]||(node[expando]={}),
// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={}),cache=uniqueCache[type]||[],nodeIndex=cache[0]===dirruns&&cache[1],diff=nodeIndex&&cache[2],node=nodeIndex&&parent.childNodes[nodeIndex];node=++nodeIndex&&node&&node[dir]||(
// Fallback to seeking `elem` from the start
diff=nodeIndex=0)||start.pop();)
// When found, cache indexes on `parent` and break
if(1===node.nodeType&&++diff&&node===elem){uniqueCache[type]=[dirruns,nodeIndex,diff];break}}else
// xml :nth-child(...)
// or :nth-last-child(...) or :nth(-last)?-of-type(...)
if(
// Use previously-cached element index if available
useCache&&(
// ...in a gzip-friendly way
node=elem,outerCache=node[expando]||(node[expando]={}),
// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={}),cache=uniqueCache[type]||[],nodeIndex=cache[0]===dirruns&&cache[1],diff=nodeIndex),diff===!1)
// Use the same loop as above to seek `elem` from the start
for(;(node=++nodeIndex&&node&&node[dir]||(diff=nodeIndex=0)||start.pop())&&((ofType?node.nodeName.toLowerCase()!==name:1!==node.nodeType)||!++diff||(
// Cache the index of each encountered element
useCache&&(outerCache=node[expando]||(node[expando]={}),
// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={}),uniqueCache[type]=[dirruns,diff]),node!==elem)););
// Incorporate the offset, then check against cycle size
return diff-=last,diff===first||diff%first===0&&diff/first>=0}}},PSEUDO:function(pseudo,argument){
// pseudo-class names are case-insensitive
// http://www.w3.org/TR/selectors/#pseudo-classes
// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
// Remember that setFilters inherits from pseudos
var args,fn=Expr.pseudos[pseudo]||Expr.setFilters[pseudo.toLowerCase()]||Sizzle.error("unsupported pseudo: "+pseudo);
// The user may use createPseudo to indicate that
// arguments are needed to create the filter function
// just as Sizzle does
// The user may use createPseudo to indicate that
// arguments are needed to create the filter function
// just as Sizzle does
// But maintain support for old signatures
return fn[expando]?fn(argument):fn.length>1?(args=[pseudo,pseudo,"",argument],Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())?markFunction(function(seed,matches){for(var idx,matched=fn(seed,argument),i=matched.length;i--;)idx=indexOf(seed,matched[i]),seed[idx]=!(matches[idx]=matched[i])}):function(elem){return fn(elem,0,args)}):fn}},pseudos:{
// Potentially complex pseudos
not:markFunction(function(selector){
// Trim the selector passed to compile
// to avoid treating leading and trailing
// spaces as combinators
var input=[],results=[],matcher=compile(selector.replace(rtrim,"$1"));return matcher[expando]?markFunction(function(seed,matches,context,xml){
// Match elements unmatched by `matcher`
for(var elem,unmatched=matcher(seed,null,xml,[]),i=seed.length;i--;)(elem=unmatched[i])&&(seed[i]=!(matches[i]=elem))}):function(elem,context,xml){
// Don't keep the element (issue #299)
return input[0]=elem,matcher(input,null,xml,results),input[0]=null,!results.pop()}}),has:markFunction(function(selector){return function(elem){return Sizzle(selector,elem).length>0}}),contains:markFunction(function(text){return text=text.replace(runescape,funescape),function(elem){return(elem.textContent||elem.innerText||getText(elem)).indexOf(text)>-1}}),
// "Whether an element is represented by a :lang() selector
// is based solely on the element's language value
// being equal to the identifier C,
// or beginning with the identifier C immediately followed by "-".
// The matching of C against the element's language value is performed case-insensitively.
// The identifier C does not have to be a valid language name."
// http://www.w3.org/TR/selectors/#lang-pseudo
lang:markFunction(function(lang){
// lang value must be a valid identifier
return ridentifier.test(lang||"")||Sizzle.error("unsupported lang: "+lang),lang=lang.replace(runescape,funescape).toLowerCase(),function(elem){var elemLang;do if(elemLang=documentIsHTML?elem.lang:elem.getAttribute("xml:lang")||elem.getAttribute("lang"))return elemLang=elemLang.toLowerCase(),elemLang===lang||0===elemLang.indexOf(lang+"-");while((elem=elem.parentNode)&&1===elem.nodeType);return!1}}),
// Miscellaneous
target:function(elem){var hash=window.location&&window.location.hash;return hash&&hash.slice(1)===elem.id},root:function(elem){return elem===docElem},focus:function(elem){return elem===document.activeElement&&(!document.hasFocus||document.hasFocus())&&!!(elem.type||elem.href||~elem.tabIndex)},
// Boolean properties
enabled:createDisabledPseudo(!1),disabled:createDisabledPseudo(!0),checked:function(elem){
// In CSS3, :checked should return both checked and selected elements
// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
var nodeName=elem.nodeName.toLowerCase();return"input"===nodeName&&!!elem.checked||"option"===nodeName&&!!elem.selected},selected:function(elem){
// Accessing this property makes selected-by-default
// options in Safari work properly
return elem.parentNode&&elem.parentNode.selectedIndex,elem.selected===!0},
// Contents
empty:function(elem){
// http://www.w3.org/TR/selectors/#empty-pseudo
// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
//   but not by others (comment: 8; processing instruction: 7; etc.)
// nodeType < 6 works because attributes (2) do not appear as children
for(elem=elem.firstChild;elem;elem=elem.nextSibling)if(elem.nodeType<6)return!1;return!0},parent:function(elem){return!Expr.pseudos.empty(elem)},
// Element/input types
header:function(elem){return rheader.test(elem.nodeName)},input:function(elem){return rinputs.test(elem.nodeName)},button:function(elem){var name=elem.nodeName.toLowerCase();return"input"===name&&"button"===elem.type||"button"===name},text:function(elem){var attr;
// Support: IE<8
// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
return"input"===elem.nodeName.toLowerCase()&&"text"===elem.type&&(null==(attr=elem.getAttribute("type"))||"text"===attr.toLowerCase())},
// Position-in-collection
first:createPositionalPseudo(function(){return[0]}),last:createPositionalPseudo(function(matchIndexes,length){return[length-1]}),eq:createPositionalPseudo(function(matchIndexes,length,argument){return[argument<0?argument+length:argument]}),even:createPositionalPseudo(function(matchIndexes,length){for(var i=0;i<length;i+=2)matchIndexes.push(i);return matchIndexes}),odd:createPositionalPseudo(function(matchIndexes,length){for(var i=1;i<length;i+=2)matchIndexes.push(i);return matchIndexes}),lt:createPositionalPseudo(function(matchIndexes,length,argument){for(var i=argument<0?argument+length:argument;--i>=0;)matchIndexes.push(i);return matchIndexes}),gt:createPositionalPseudo(function(matchIndexes,length,argument){for(var i=argument<0?argument+length:argument;++i<length;)matchIndexes.push(i);return matchIndexes})}},Expr.pseudos.nth=Expr.pseudos.eq;
// Add button/input type pseudos
for(i in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})Expr.pseudos[i]=createInputPseudo(i);for(i in{submit:!0,reset:!0})Expr.pseudos[i]=createButtonPseudo(i);/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
// One-time assignments
// Sort stability
// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
// Initialize against the default document
// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
// Support: IE<9
// Use defaultValue in place of getAttribute("value")
// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
return setFilters.prototype=Expr.filters=Expr.pseudos,Expr.setFilters=new setFilters,tokenize=Sizzle.tokenize=function(selector,parseOnly){var matched,match,tokens,type,soFar,groups,preFilters,cached=tokenCache[selector+" "];if(cached)return parseOnly?0:cached.slice(0);for(soFar=selector,groups=[],preFilters=Expr.preFilter;soFar;){
// Comma and first run
matched&&!(match=rcomma.exec(soFar))||(match&&(
// Don't consume trailing commas as valid
soFar=soFar.slice(match[0].length)||soFar),groups.push(tokens=[])),matched=!1,
// Combinators
(match=rcombinators.exec(soFar))&&(matched=match.shift(),tokens.push({value:matched,
// Cast descendant combinators to space
type:match[0].replace(rtrim," ")}),soFar=soFar.slice(matched.length));
// Filters
for(type in Expr.filter)!(match=matchExpr[type].exec(soFar))||preFilters[type]&&!(match=preFilters[type](match))||(matched=match.shift(),tokens.push({value:matched,type:type,matches:match}),soFar=soFar.slice(matched.length));if(!matched)break}
// Return the length of the invalid excess
// if we're just parsing
// Otherwise, throw an error or return tokens
// Cache the tokens
return parseOnly?soFar.length:soFar?Sizzle.error(selector):tokenCache(selector,groups).slice(0)},compile=Sizzle.compile=function(selector,match){var i,setMatchers=[],elementMatchers=[],cached=compilerCache[selector+" "];if(!cached){for(
// Generate a function of recursive functions that can be used to check each element
match||(match=tokenize(selector)),i=match.length;i--;)cached=matcherFromTokens(match[i]),cached[expando]?setMatchers.push(cached):elementMatchers.push(cached);
// Cache the compiled function
cached=compilerCache(selector,matcherFromGroupMatchers(elementMatchers,setMatchers)),
// Save selector and tokenization
cached.selector=selector}return cached},select=Sizzle.select=function(selector,context,results,seed){var i,tokens,token,type,find,compiled="function"==typeof selector&&selector,match=!seed&&tokenize(selector=compiled.selector||selector);
// Try to minimize operations if there is only one selector in the list and no seed
// (the latter of which guarantees us context)
if(results=results||[],1===match.length){if(
// Reduce context if the leading compound selector is an ID
tokens=match[0]=match[0].slice(0),tokens.length>2&&"ID"===(token=tokens[0]).type&&9===context.nodeType&&documentIsHTML&&Expr.relative[tokens[1].type]){if(context=(Expr.find.ID(token.matches[0].replace(runescape,funescape),context)||[])[0],!context)return results;compiled&&(context=context.parentNode),selector=selector.slice(tokens.shift().value.length)}for(
// Fetch a seed set for right-to-left matching
i=matchExpr.needsContext.test(selector)?0:tokens.length;i--&&(token=tokens[i],!Expr.relative[type=token.type]);)if((find=Expr.find[type])&&(seed=find(token.matches[0].replace(runescape,funescape),rsibling.test(tokens[0].type)&&testContext(context.parentNode)||context))){if(
// If seed is empty or no tokens remain, we can return early
tokens.splice(i,1),selector=seed.length&&toSelector(tokens),!selector)return push.apply(results,seed),results;break}}
// Compile and execute a filtering function if one is not provided
// Provide `match` to avoid retokenization if we modified the selector above
return(compiled||compile(selector,match))(seed,context,!documentIsHTML,results,!context||rsibling.test(selector)&&testContext(context.parentNode)||context),results},support.sortStable=expando.split("").sort(sortOrder).join("")===expando,support.detectDuplicates=!!hasDuplicate,setDocument(),support.sortDetached=assert(function(el){
// Should return 1, but returns 4 (following)
return 1&el.compareDocumentPosition(document.createElement("fieldset"))}),assert(function(el){return el.innerHTML="<a href='#'></a>","#"===el.firstChild.getAttribute("href")})||addHandle("type|href|height|width",function(elem,name,isXML){if(!isXML)return elem.getAttribute(name,"type"===name.toLowerCase()?1:2)}),support.attributes&&assert(function(el){return el.innerHTML="<input/>",el.firstChild.setAttribute("value",""),""===el.firstChild.getAttribute("value")})||addHandle("value",function(elem,name,isXML){if(!isXML&&"input"===elem.nodeName.toLowerCase())return elem.defaultValue}),assert(function(el){return null==el.getAttribute("disabled")})||addHandle(booleans,function(elem,name,isXML){var val;if(!isXML)return elem[name]===!0?name.toLowerCase():(val=elem.getAttributeNode(name))&&val.specified?val.value:null}),Sizzle}(window);jQuery.find=Sizzle,jQuery.expr=Sizzle.selectors,
// Deprecated
jQuery.expr[":"]=jQuery.expr.pseudos,jQuery.uniqueSort=jQuery.unique=Sizzle.uniqueSort,jQuery.text=Sizzle.getText,jQuery.isXMLDoc=Sizzle.isXML,jQuery.contains=Sizzle.contains,jQuery.escapeSelector=Sizzle.escape;var dir=function(elem,dir,until){for(var matched=[],truncate=void 0!==until;(elem=elem[dir])&&9!==elem.nodeType;)if(1===elem.nodeType){if(truncate&&jQuery(elem).is(until))break;matched.push(elem)}return matched},siblings=function(n,elem){for(var matched=[];n;n=n.nextSibling)1===n.nodeType&&n!==elem&&matched.push(n);return matched},rneedsContext=jQuery.expr.match.needsContext,rsingleTag=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,risSimple=/^.[^:#\[\.,]*$/;jQuery.filter=function(expr,elems,not){var elem=elems[0];return not&&(expr=":not("+expr+")"),1===elems.length&&1===elem.nodeType?jQuery.find.matchesSelector(elem,expr)?[elem]:[]:jQuery.find.matches(expr,jQuery.grep(elems,function(elem){return 1===elem.nodeType}))},jQuery.fn.extend({find:function(selector){var i,ret,len=this.length,self=this;if("string"!=typeof selector)return this.pushStack(jQuery(selector).filter(function(){for(i=0;i<len;i++)if(jQuery.contains(self[i],this))return!0}));for(ret=this.pushStack([]),i=0;i<len;i++)jQuery.find(selector,self[i],ret);return len>1?jQuery.uniqueSort(ret):ret},filter:function(selector){return this.pushStack(winnow(this,selector||[],!1))},not:function(selector){return this.pushStack(winnow(this,selector||[],!0))},is:function(selector){
// If this is a positional/relative selector, check membership in the returned set
// so $("p:first").is("p:last") won't return true for a doc with two "p".
return!!winnow(this,"string"==typeof selector&&rneedsContext.test(selector)?jQuery(selector):selector||[],!1).length}});
// Initialize a jQuery object
// A central reference to the root jQuery(document)
var rootjQuery,
// A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
// Strict HTML recognition (#11290: must start with <)
// Shortcut simple #id case for speed
rquickExpr=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,init=jQuery.fn.init=function(selector,context,root){var match,elem;
// HANDLE: $(""), $(null), $(undefined), $(false)
if(!selector)return this;
// Handle HTML strings
if(
// Method init() accepts an alternate rootjQuery
// so migrate can support jQuery.sub (gh-2101)
root=root||rootjQuery,"string"==typeof selector){
// Match html or make sure no context is specified for #id
if(
// Assume that strings that start and end with <> are HTML and skip the regex check
match="<"===selector[0]&&">"===selector[selector.length-1]&&selector.length>=3?[null,selector,null]:rquickExpr.exec(selector),!match||!match[1]&&context)return!context||context.jquery?(context||root).find(selector):this.constructor(context).find(selector);
// HANDLE: $(html) -> $(array)
if(match[1]){
// HANDLE: $(html, props)
if(context=context instanceof jQuery?context[0]:context,
// Option to run scripts is true for back-compat
// Intentionally let the error be thrown if parseHTML is not present
jQuery.merge(this,jQuery.parseHTML(match[1],context&&context.nodeType?context.ownerDocument||context:document,!0)),rsingleTag.test(match[1])&&jQuery.isPlainObject(context))for(match in context)
// Properties of context are called as methods if possible
jQuery.isFunction(this[match])?this[match](context[match]):this.attr(match,context[match]);return this}
// Inject the element directly into the jQuery object
return elem=document.getElementById(match[2]),elem&&(this[0]=elem,this.length=1),this}
// Execute immediately if ready is not present
return selector.nodeType?(this[0]=selector,this.length=1,this):jQuery.isFunction(selector)?void 0!==root.ready?root.ready(selector):selector(jQuery):jQuery.makeArray(selector,this)};
// Give the init function the jQuery prototype for later instantiation
init.prototype=jQuery.fn,
// Initialize central reference
rootjQuery=jQuery(document);var rparentsprev=/^(?:parents|prev(?:Until|All))/,
// Methods guaranteed to produce a unique set when starting from a unique set
guaranteedUnique={children:!0,contents:!0,next:!0,prev:!0};jQuery.fn.extend({has:function(target){var targets=jQuery(target,this),l=targets.length;return this.filter(function(){for(var i=0;i<l;i++)if(jQuery.contains(this,targets[i]))return!0})},closest:function(selectors,context){var cur,i=0,l=this.length,matched=[],targets="string"!=typeof selectors&&jQuery(selectors);
// Positional selectors never match, since there's no _selection_ context
if(!rneedsContext.test(selectors))for(;i<l;i++)for(cur=this[i];cur&&cur!==context;cur=cur.parentNode)
// Always skip document fragments
if(cur.nodeType<11&&(targets?targets.index(cur)>-1:
// Don't pass non-elements to Sizzle
1===cur.nodeType&&jQuery.find.matchesSelector(cur,selectors))){matched.push(cur);break}return this.pushStack(matched.length>1?jQuery.uniqueSort(matched):matched)},
// Determine the position of an element within the set
index:function(elem){
// No argument, return index in parent
// No argument, return index in parent
// Index in selector
// If it receives a jQuery object, the first element is used
return elem?"string"==typeof elem?indexOf.call(jQuery(elem),this[0]):indexOf.call(this,elem.jquery?elem[0]:elem):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(selector,context){return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(),jQuery(selector,context))))},addBack:function(selector){return this.add(null==selector?this.prevObject:this.prevObject.filter(selector))}}),jQuery.each({parent:function(elem){var parent=elem.parentNode;return parent&&11!==parent.nodeType?parent:null},parents:function(elem){return dir(elem,"parentNode")},parentsUntil:function(elem,i,until){return dir(elem,"parentNode",until)},next:function(elem){return sibling(elem,"nextSibling")},prev:function(elem){return sibling(elem,"previousSibling")},nextAll:function(elem){return dir(elem,"nextSibling")},prevAll:function(elem){return dir(elem,"previousSibling")},nextUntil:function(elem,i,until){return dir(elem,"nextSibling",until)},prevUntil:function(elem,i,until){return dir(elem,"previousSibling",until)},siblings:function(elem){return siblings((elem.parentNode||{}).firstChild,elem)},children:function(elem){return siblings(elem.firstChild)},contents:function(elem){return elem.contentDocument||jQuery.merge([],elem.childNodes)}},function(name,fn){jQuery.fn[name]=function(until,selector){var matched=jQuery.map(this,fn,until);
// Remove duplicates
// Reverse order for parents* and prev-derivatives
return"Until"!==name.slice(-5)&&(selector=until),selector&&"string"==typeof selector&&(matched=jQuery.filter(selector,matched)),this.length>1&&(guaranteedUnique[name]||jQuery.uniqueSort(matched),rparentsprev.test(name)&&matched.reverse()),this.pushStack(matched)}});var rnothtmlwhite=/[^\x20\t\r\n\f]+/g;/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks=function(options){
// Convert options from String-formatted to Object-formatted if needed
// (we check in cache first)
options="string"==typeof options?createOptions(options):jQuery.extend({},options);var// Flag to know if list is currently firing
firing,
// Last fire value for non-forgettable lists
memory,
// Flag to know if list was already fired
fired,
// Flag to prevent firing
locked,
// Actual callback list
list=[],
// Queue of execution data for repeatable lists
queue=[],
// Index of currently firing callback (modified by add/remove as needed)
firingIndex=-1,
// Fire callbacks
fire=function(){for(
// Enforce single-firing
locked=options.once,
// Execute callbacks for all pending executions,
// respecting firingIndex overrides and runtime changes
fired=firing=!0;queue.length;firingIndex=-1)for(memory=queue.shift();++firingIndex<list.length;)
// Run callback and check for early termination
list[firingIndex].apply(memory[0],memory[1])===!1&&options.stopOnFalse&&(
// Jump to end and forget the data so .add doesn't re-fire
firingIndex=list.length,memory=!1);
// Forget the data if we're done with it
options.memory||(memory=!1),firing=!1,
// Clean up if we're done firing for good
locked&&(
// Keep an empty list if we have data for future add calls
list=memory?[]:"")},
// Actual Callbacks object
self={
// Add a callback or a collection of callbacks to the list
add:function(){
// If we have memory from a past run, we should fire after adding
return list&&(memory&&!firing&&(firingIndex=list.length-1,queue.push(memory)),function add(args){jQuery.each(args,function(_,arg){jQuery.isFunction(arg)?options.unique&&self.has(arg)||list.push(arg):arg&&arg.length&&"string"!==jQuery.type(arg)&&
// Inspect recursively
add(arg)})}(arguments),memory&&!firing&&fire()),this},
// Remove a callback from the list
remove:function(){return jQuery.each(arguments,function(_,arg){for(var index;(index=jQuery.inArray(arg,list,index))>-1;)list.splice(index,1),
// Handle firing indexes
index<=firingIndex&&firingIndex--}),this},
// Check if a given callback is in the list.
// If no argument is given, return whether or not list has callbacks attached.
has:function(fn){return fn?jQuery.inArray(fn,list)>-1:list.length>0},
// Remove all callbacks from the list
empty:function(){return list&&(list=[]),this},
// Disable .fire and .add
// Abort any current/pending executions
// Clear all callbacks and values
disable:function(){return locked=queue=[],list=memory="",this},disabled:function(){return!list},
// Disable .fire
// Also disable .add unless we have memory (since it would have no effect)
// Abort any pending executions
lock:function(){return locked=queue=[],memory||firing||(list=memory=""),this},locked:function(){return!!locked},
// Call all callbacks with the given context and arguments
fireWith:function(context,args){return locked||(args=args||[],args=[context,args.slice?args.slice():args],queue.push(args),firing||fire()),this},
// Call all the callbacks with the given arguments
fire:function(){return self.fireWith(this,arguments),this},
// To know if the callbacks have already been called at least once
fired:function(){return!!fired}};return self},jQuery.extend({Deferred:function(func){var tuples=[
// action, add listener, callbacks,
// ... .then handlers, argument index, [final state]
["notify","progress",jQuery.Callbacks("memory"),jQuery.Callbacks("memory"),2],["resolve","done",jQuery.Callbacks("once memory"),jQuery.Callbacks("once memory"),0,"resolved"],["reject","fail",jQuery.Callbacks("once memory"),jQuery.Callbacks("once memory"),1,"rejected"]],state="pending",promise={state:function(){return state},always:function(){return deferred.done(arguments).fail(arguments),this},"catch":function(fn){return promise.then(null,fn)},
// Keep pipe for back-compat
pipe:function(){var fns=arguments;return jQuery.Deferred(function(newDefer){jQuery.each(tuples,function(i,tuple){
// Map tuples (progress, done, fail) to arguments (done, fail, progress)
var fn=jQuery.isFunction(fns[tuple[4]])&&fns[tuple[4]];
// deferred.progress(function() { bind to newDefer or newDefer.notify })
// deferred.done(function() { bind to newDefer or newDefer.resolve })
// deferred.fail(function() { bind to newDefer or newDefer.reject })
deferred[tuple[1]](function(){var returned=fn&&fn.apply(this,arguments);returned&&jQuery.isFunction(returned.promise)?returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject):newDefer[tuple[0]+"With"](this,fn?[returned]:arguments)})}),fns=null}).promise()},then:function(onFulfilled,onRejected,onProgress){function resolve(depth,deferred,handler,special){return function(){var that=this,args=arguments,mightThrow=function(){var returned,then;
// Support: Promises/A+ section 2.3.3.3.3
// https://promisesaplus.com/#point-59
// Ignore double-resolution attempts
if(!(depth<maxDepth)){
// Support: Promises/A+ section 2.3.1
// https://promisesaplus.com/#point-48
if(returned=handler.apply(that,args),returned===deferred.promise())throw new TypeError("Thenable self-resolution");
// Support: Promises/A+ sections 2.3.3.1, 3.5
// https://promisesaplus.com/#point-54
// https://promisesaplus.com/#point-75
// Retrieve `then` only once
then=returned&&(
// Support: Promises/A+ section 2.3.4
// https://promisesaplus.com/#point-64
// Only check objects and functions for thenability
"object"==typeof returned||"function"==typeof returned)&&returned.then,
// Handle a returned thenable
jQuery.isFunction(then)?
// Special processors (notify) just wait for resolution
special?then.call(returned,resolve(maxDepth,deferred,Identity,special),resolve(maxDepth,deferred,Thrower,special)):(
// ...and disregard older resolution values
maxDepth++,then.call(returned,resolve(maxDepth,deferred,Identity,special),resolve(maxDepth,deferred,Thrower,special),resolve(maxDepth,deferred,Identity,deferred.notifyWith))):(
// Only substitute handlers pass on context
// and multiple values (non-spec behavior)
handler!==Identity&&(that=void 0,args=[returned]),
// Process the value(s)
// Default process is resolve
(special||deferred.resolveWith)(that,args))}},
// Only normal processors (resolve) catch and reject exceptions
process=special?mightThrow:function(){try{mightThrow()}catch(e){jQuery.Deferred.exceptionHook&&jQuery.Deferred.exceptionHook(e,process.stackTrace),
// Support: Promises/A+ section 2.3.3.3.4.1
// https://promisesaplus.com/#point-61
// Ignore post-resolution exceptions
depth+1>=maxDepth&&(
// Only substitute handlers pass on context
// and multiple values (non-spec behavior)
handler!==Thrower&&(that=void 0,args=[e]),deferred.rejectWith(that,args))}};
// Support: Promises/A+ section 2.3.3.3.1
// https://promisesaplus.com/#point-57
// Re-resolve promises immediately to dodge false rejection from
// subsequent errors
depth?process():(
// Call an optional hook to record the stack, in case of exception
// since it's otherwise lost when execution goes async
jQuery.Deferred.getStackHook&&(process.stackTrace=jQuery.Deferred.getStackHook()),window.setTimeout(process))}}var maxDepth=0;return jQuery.Deferred(function(newDefer){
// progress_handlers.add( ... )
tuples[0][3].add(resolve(0,newDefer,jQuery.isFunction(onProgress)?onProgress:Identity,newDefer.notifyWith)),
// fulfilled_handlers.add( ... )
tuples[1][3].add(resolve(0,newDefer,jQuery.isFunction(onFulfilled)?onFulfilled:Identity)),
// rejected_handlers.add( ... )
tuples[2][3].add(resolve(0,newDefer,jQuery.isFunction(onRejected)?onRejected:Thrower))}).promise()},
// Get a promise for this deferred
// If obj is provided, the promise aspect is added to the object
promise:function(obj){return null!=obj?jQuery.extend(obj,promise):promise}},deferred={};
// All done!
// Add list-specific methods
// Make the deferred a promise
// Call given func if any
return jQuery.each(tuples,function(i,tuple){var list=tuple[2],stateString=tuple[5];
// promise.progress = list.add
// promise.done = list.add
// promise.fail = list.add
promise[tuple[1]]=list.add,
// Handle state
stateString&&list.add(function(){
// state = "resolved" (i.e., fulfilled)
// state = "rejected"
state=stateString},
// rejected_callbacks.disable
// fulfilled_callbacks.disable
tuples[3-i][2].disable,
// progress_callbacks.lock
tuples[0][2].lock),
// progress_handlers.fire
// fulfilled_handlers.fire
// rejected_handlers.fire
list.add(tuple[3].fire),
// deferred.notify = function() { deferred.notifyWith(...) }
// deferred.resolve = function() { deferred.resolveWith(...) }
// deferred.reject = function() { deferred.rejectWith(...) }
deferred[tuple[0]]=function(){return deferred[tuple[0]+"With"](this===deferred?void 0:this,arguments),this},
// deferred.notifyWith = list.fireWith
// deferred.resolveWith = list.fireWith
// deferred.rejectWith = list.fireWith
deferred[tuple[0]+"With"]=list.fireWith}),promise.promise(deferred),func&&func.call(deferred,deferred),deferred},
// Deferred helper
when:function(singleValue){var
// count of uncompleted subordinates
remaining=arguments.length,
// count of unprocessed arguments
i=remaining,
// subordinate fulfillment data
resolveContexts=Array(i),resolveValues=slice.call(arguments),
// the master Deferred
master=jQuery.Deferred(),
// subordinate callback factory
updateFunc=function(i){return function(value){resolveContexts[i]=this,resolveValues[i]=arguments.length>1?slice.call(arguments):value,--remaining||master.resolveWith(resolveContexts,resolveValues)}};
// Single- and empty arguments are adopted like Promise.resolve
if(remaining<=1&&(adoptValue(singleValue,master.done(updateFunc(i)).resolve,master.reject),"pending"===master.state()||jQuery.isFunction(resolveValues[i]&&resolveValues[i].then)))return master.then();
// Multiple arguments are aggregated like Promise.all array elements
for(;i--;)adoptValue(resolveValues[i],updateFunc(i),master.reject);return master.promise()}});
// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;jQuery.Deferred.exceptionHook=function(error,stack){
// Support: IE 8 - 9 only
// Console exists when dev tools are open, which can happen at any time
window.console&&window.console.warn&&error&&rerrorNames.test(error.name)&&window.console.warn("jQuery.Deferred exception: "+error.message,error.stack,stack)},jQuery.readyException=function(error){window.setTimeout(function(){throw error})};
// The deferred used on DOM ready
var readyList=jQuery.Deferred();jQuery.fn.ready=function(fn){return readyList.then(fn)["catch"](function(error){jQuery.readyException(error)}),this},jQuery.extend({
// Is the DOM ready to be used? Set to true once it occurs.
isReady:!1,
// A counter to track how many items to wait for before
// the ready event fires. See #6781
readyWait:1,
// Hold (or release) the ready event
holdReady:function(hold){hold?jQuery.readyWait++:jQuery.ready(!0)},
// Handle when the DOM is ready
ready:function(wait){
// Abort if there are pending holds or we're already ready
(wait===!0?--jQuery.readyWait:jQuery.isReady)||(
// Remember that the DOM is ready
jQuery.isReady=!0,
// If a normal DOM Ready event fired, decrement, and wait if need be
wait!==!0&&--jQuery.readyWait>0||
// If there are functions bound, to execute
readyList.resolveWith(document,[jQuery]))}}),jQuery.ready.then=readyList.then,
// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
"complete"===document.readyState||"loading"!==document.readyState&&!document.documentElement.doScroll?
// Handle it asynchronously to allow scripts the opportunity to delay ready
window.setTimeout(jQuery.ready):(
// Use the handy event callback
document.addEventListener("DOMContentLoaded",completed),
// A fallback to window.onload, that will always work
window.addEventListener("load",completed));
// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access=function(elems,fn,key,value,chainable,emptyGet,raw){var i=0,len=elems.length,bulk=null==key;
// Sets many values
if("object"===jQuery.type(key)){chainable=!0;for(i in key)access(elems,fn,i,key[i],!0,emptyGet,raw)}else if(void 0!==value&&(chainable=!0,jQuery.isFunction(value)||(raw=!0),bulk&&(
// Bulk operations run against the entire set
raw?(fn.call(elems,value),fn=null):(bulk=fn,fn=function(elem,key,value){return bulk.call(jQuery(elem),value)})),fn))for(;i<len;i++)fn(elems[i],key,raw?value:value.call(elems[i],i,fn(elems[i],key)));
// Gets
return chainable?elems:bulk?fn.call(elems):len?fn(elems[0],key):emptyGet},acceptData=function(owner){
// Accepts only:
//  - Node
//    - Node.ELEMENT_NODE
//    - Node.DOCUMENT_NODE
//  - Object
//    - Any
return 1===owner.nodeType||9===owner.nodeType||!+owner.nodeType};Data.uid=1,Data.prototype={cache:function(owner){
// Check if the owner object already has a cache
var value=owner[this.expando];
// If not, create one
// We can accept data for non-element nodes in modern browsers,
// but we should not, see #8335.
// Always return an empty object.
// If it is a node unlikely to be stringify-ed or looped over
// use plain assignment
return value||(value={},acceptData(owner)&&(owner.nodeType?owner[this.expando]=value:Object.defineProperty(owner,this.expando,{value:value,configurable:!0}))),value},set:function(owner,data,value){var prop,cache=this.cache(owner);
// Handle: [ owner, key, value ] args
// Always use camelCase key (gh-2257)
if("string"==typeof data)cache[jQuery.camelCase(data)]=value;else
// Copy the properties one-by-one to the cache object
for(prop in data)cache[jQuery.camelCase(prop)]=data[prop];return cache},get:function(owner,key){
// Always use camelCase key (gh-2257)
return void 0===key?this.cache(owner):owner[this.expando]&&owner[this.expando][jQuery.camelCase(key)]},access:function(owner,key,value){
// In cases where either:
//
//   1. No key was specified
//   2. A string key was specified, but no value provided
//
// Take the "read" path and allow the get method to determine
// which value to return, respectively either:
//
//   1. The entire cache object
//   2. The data stored at the key
//
// In cases where either:
//
//   1. No key was specified
//   2. A string key was specified, but no value provided
//
// Take the "read" path and allow the get method to determine
// which value to return, respectively either:
//
//   1. The entire cache object
//   2. The data stored at the key
//
// When the key is not a string, or both a key and value
// are specified, set or extend (existing objects) with either:
//
//   1. An object of properties
//   2. A key and value
//
return void 0===key||key&&"string"==typeof key&&void 0===value?this.get(owner,key):(this.set(owner,key,value),void 0!==value?value:key)},remove:function(owner,key){var i,cache=owner[this.expando];if(void 0!==cache){if(void 0!==key){
// Support array or space separated string of keys
jQuery.isArray(key)?
// If key is an array of keys...
// We always set camelCase keys, so remove that.
key=key.map(jQuery.camelCase):(key=jQuery.camelCase(key),
// If a key with the spaces exists, use it.
// Otherwise, create an array by matching non-whitespace
key=key in cache?[key]:key.match(rnothtmlwhite)||[]),i=key.length;for(;i--;)delete cache[key[i]]}
// Remove the expando if there's no more data
(void 0===key||jQuery.isEmptyObject(cache))&&(
// Support: Chrome <=35 - 45
// Webkit & Blink performance suffers when deleting properties
// from DOM nodes, so set to undefined instead
// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
owner.nodeType?owner[this.expando]=void 0:delete owner[this.expando])}},hasData:function(owner){var cache=owner[this.expando];return void 0!==cache&&!jQuery.isEmptyObject(cache)}};var dataPriv=new Data,dataUser=new Data,rbrace=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,rmultiDash=/[A-Z]/g;jQuery.extend({hasData:function(elem){return dataUser.hasData(elem)||dataPriv.hasData(elem)},data:function(elem,name,data){return dataUser.access(elem,name,data)},removeData:function(elem,name){dataUser.remove(elem,name)},
// TODO: Now that all calls to _data and _removeData have been replaced
// with direct calls to dataPriv methods, these can be deprecated.
_data:function(elem,name,data){return dataPriv.access(elem,name,data)},_removeData:function(elem,name){dataPriv.remove(elem,name)}}),jQuery.fn.extend({data:function(key,value){var i,name,data,elem=this[0],attrs=elem&&elem.attributes;
// Gets all values
if(void 0===key){if(this.length&&(data=dataUser.get(elem),1===elem.nodeType&&!dataPriv.get(elem,"hasDataAttrs"))){for(i=attrs.length;i--;)
// Support: IE 11 only
// The attrs elements can be null (#14894)
attrs[i]&&(name=attrs[i].name,0===name.indexOf("data-")&&(name=jQuery.camelCase(name.slice(5)),dataAttr(elem,name,data[name])));dataPriv.set(elem,"hasDataAttrs",!0)}return data}
// Sets multiple values
// Sets multiple values
return"object"==typeof key?this.each(function(){dataUser.set(this,key)}):access(this,function(value){var data;
// The calling jQuery object (element matches) is not empty
// (and therefore has an element appears at this[ 0 ]) and the
// `value` parameter was not undefined. An empty jQuery object
// will result in `undefined` for elem = this[ 0 ] which will
// throw an exception if an attempt to read a data cache is made.
if(elem&&void 0===value){if(
// Attempt to get data from the cache
// The key will always be camelCased in Data
data=dataUser.get(elem,key),void 0!==data)return data;if(
// Attempt to "discover" the data in
// HTML5 custom data-* attrs
data=dataAttr(elem,key),void 0!==data)return data}else
// Set the data...
this.each(function(){
// We always store the camelCased key
dataUser.set(this,key,value)})},null,value,arguments.length>1,null,!0)},removeData:function(key){return this.each(function(){dataUser.remove(this,key)})}}),jQuery.extend({queue:function(elem,type,data){var queue;if(elem)
// Speed up dequeue by getting out quickly if this is just a lookup
return type=(type||"fx")+"queue",queue=dataPriv.get(elem,type),data&&(!queue||jQuery.isArray(data)?queue=dataPriv.access(elem,type,jQuery.makeArray(data)):queue.push(data)),queue||[]},dequeue:function(elem,type){type=type||"fx";var queue=jQuery.queue(elem,type),startLength=queue.length,fn=queue.shift(),hooks=jQuery._queueHooks(elem,type),next=function(){jQuery.dequeue(elem,type)};
// If the fx queue is dequeued, always remove the progress sentinel
"inprogress"===fn&&(fn=queue.shift(),startLength--),fn&&(
// Add a progress sentinel to prevent the fx queue from being
// automatically dequeued
"fx"===type&&queue.unshift("inprogress"),
// Clear up the last queue stop function
delete hooks.stop,fn.call(elem,next,hooks)),!startLength&&hooks&&hooks.empty.fire()},
// Not public - generate a queueHooks object, or return the current one
_queueHooks:function(elem,type){var key=type+"queueHooks";return dataPriv.get(elem,key)||dataPriv.access(elem,key,{empty:jQuery.Callbacks("once memory").add(function(){dataPriv.remove(elem,[type+"queue",key])})})}}),jQuery.fn.extend({queue:function(type,data){var setter=2;return"string"!=typeof type&&(data=type,type="fx",setter--),arguments.length<setter?jQuery.queue(this[0],type):void 0===data?this:this.each(function(){var queue=jQuery.queue(this,type,data);
// Ensure a hooks for this queue
jQuery._queueHooks(this,type),"fx"===type&&"inprogress"!==queue[0]&&jQuery.dequeue(this,type)})},dequeue:function(type){return this.each(function(){jQuery.dequeue(this,type)})},clearQueue:function(type){return this.queue(type||"fx",[])},
// Get a promise resolved when queues of a certain type
// are emptied (fx is the type by default)
promise:function(type,obj){var tmp,count=1,defer=jQuery.Deferred(),elements=this,i=this.length,resolve=function(){--count||defer.resolveWith(elements,[elements])};for("string"!=typeof type&&(obj=type,type=void 0),type=type||"fx";i--;)tmp=dataPriv.get(elements[i],type+"queueHooks"),tmp&&tmp.empty&&(count++,tmp.empty.add(resolve));return resolve(),defer.promise(obj)}});var pnum=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,rcssNum=new RegExp("^(?:([+-])=|)("+pnum+")([a-z%]*)$","i"),cssExpand=["Top","Right","Bottom","Left"],isHiddenWithinTree=function(elem,el){
// Inline style trumps all
// isHiddenWithinTree might be called from jQuery#filter function;
// in that case, element will be second argument
// Otherwise, check computed style
// Support: Firefox <=43 - 45
// Disconnected elements can have computed display: none, so first confirm that elem is
// in the document.
return elem=el||elem,"none"===elem.style.display||""===elem.style.display&&jQuery.contains(elem.ownerDocument,elem)&&"none"===jQuery.css(elem,"display")},swap=function(elem,options,callback,args){var ret,name,old={};
// Remember the old values, and insert the new ones
for(name in options)old[name]=elem.style[name],elem.style[name]=options[name];ret=callback.apply(elem,args||[]);
// Revert the old values
for(name in options)elem.style[name]=old[name];return ret},defaultDisplayMap={};jQuery.fn.extend({show:function(){return showHide(this,!0)},hide:function(){return showHide(this)},toggle:function(state){return"boolean"==typeof state?state?this.show():this.hide():this.each(function(){isHiddenWithinTree(this)?jQuery(this).show():jQuery(this).hide()})}});var rcheckableType=/^(?:checkbox|radio)$/i,rtagName=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,rscriptType=/^$|\/(?:java|ecma)script/i,wrapMap={
// Support: IE <=9 only
option:[1,"<select multiple='multiple'>","</select>"],
// XHTML parsers do not magically insert elements in the
// same way that tag soup parsers do. So we cannot shorten
// this by omitting <tbody> or other required elements.
thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};
// Support: IE <=9 only
wrapMap.optgroup=wrapMap.option,wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead,wrapMap.th=wrapMap.td;var rhtml=/<|&#?\w+;/;!function(){var fragment=document.createDocumentFragment(),div=fragment.appendChild(document.createElement("div")),input=document.createElement("input");
// Support: Android 4.0 - 4.3 only
// Check state lost if the name is set (#11217)
// Support: Windows Web Apps (WWA)
// `name` and `type` must use .setAttribute for WWA (#14901)
input.setAttribute("type","radio"),input.setAttribute("checked","checked"),input.setAttribute("name","t"),div.appendChild(input),
// Support: Android <=4.1 only
// Older WebKit doesn't clone checked state correctly in fragments
support.checkClone=div.cloneNode(!0).cloneNode(!0).lastChild.checked,
// Support: IE <=11 only
// Make sure textarea (and checkbox) defaultValue is properly cloned
div.innerHTML="<textarea>x</textarea>",support.noCloneChecked=!!div.cloneNode(!0).lastChild.defaultValue}();var documentElement=document.documentElement,rkeyEvent=/^key/,rmouseEvent=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,rtypenamespace=/^([^.]*)(?:\.(.+)|)/;/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event={global:{},add:function(elem,types,handler,data,selector){var handleObjIn,eventHandle,tmp,events,t,handleObj,special,handlers,type,namespaces,origType,elemData=dataPriv.get(elem);
// Don't attach events to noData or text/comment nodes (but allow plain objects)
if(elemData)for(
// Caller can pass in an object of custom data in lieu of the handler
handler.handler&&(handleObjIn=handler,handler=handleObjIn.handler,selector=handleObjIn.selector),
// Ensure that invalid selectors throw exceptions at attach time
// Evaluate against documentElement in case elem is a non-element node (e.g., document)
selector&&jQuery.find.matchesSelector(documentElement,selector),
// Make sure that the handler has a unique ID, used to find/remove it later
handler.guid||(handler.guid=jQuery.guid++),
// Init the element's event structure and main handler, if this is the first
(events=elemData.events)||(events=elemData.events={}),(eventHandle=elemData.handle)||(eventHandle=elemData.handle=function(e){
// Discard the second event of a jQuery.event.trigger() and
// when an event is called after a page has unloaded
return"undefined"!=typeof jQuery&&jQuery.event.triggered!==e.type?jQuery.event.dispatch.apply(elem,arguments):void 0}),
// Handle multiple events separated by a space
types=(types||"").match(rnothtmlwhite)||[""],t=types.length;t--;)tmp=rtypenamespace.exec(types[t])||[],type=origType=tmp[1],namespaces=(tmp[2]||"").split(".").sort(),
// There *must* be a type, no attaching namespace-only handlers
type&&(
// If event changes its type, use the special event handlers for the changed type
special=jQuery.event.special[type]||{},
// If selector defined, determine special event api type, otherwise given type
type=(selector?special.delegateType:special.bindType)||type,
// Update special based on newly reset type
special=jQuery.event.special[type]||{},
// handleObj is passed to all event handlers
handleObj=jQuery.extend({type:type,origType:origType,data:data,handler:handler,guid:handler.guid,selector:selector,needsContext:selector&&jQuery.expr.match.needsContext.test(selector),namespace:namespaces.join(".")},handleObjIn),
// Init the event handler queue if we're the first
(handlers=events[type])||(handlers=events[type]=[],handlers.delegateCount=0,
// Only use addEventListener if the special events handler returns false
special.setup&&special.setup.call(elem,data,namespaces,eventHandle)!==!1||elem.addEventListener&&elem.addEventListener(type,eventHandle)),special.add&&(special.add.call(elem,handleObj),handleObj.handler.guid||(handleObj.handler.guid=handler.guid)),
// Add to the element's handler list, delegates in front
selector?handlers.splice(handlers.delegateCount++,0,handleObj):handlers.push(handleObj),
// Keep track of which events have ever been used, for event optimization
jQuery.event.global[type]=!0)},
// Detach an event or set of events from an element
remove:function(elem,types,handler,selector,mappedTypes){var j,origCount,tmp,events,t,handleObj,special,handlers,type,namespaces,origType,elemData=dataPriv.hasData(elem)&&dataPriv.get(elem);if(elemData&&(events=elemData.events)){for(
// Once for each type.namespace in types; type may be omitted
types=(types||"").match(rnothtmlwhite)||[""],t=types.length;t--;)
// Unbind all events (on this namespace, if provided) for the element
if(tmp=rtypenamespace.exec(types[t])||[],type=origType=tmp[1],namespaces=(tmp[2]||"").split(".").sort(),type){for(special=jQuery.event.special[type]||{},type=(selector?special.delegateType:special.bindType)||type,handlers=events[type]||[],tmp=tmp[2]&&new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.|)")+"(\\.|$)"),
// Remove matching events
origCount=j=handlers.length;j--;)handleObj=handlers[j],!mappedTypes&&origType!==handleObj.origType||handler&&handler.guid!==handleObj.guid||tmp&&!tmp.test(handleObj.namespace)||selector&&selector!==handleObj.selector&&("**"!==selector||!handleObj.selector)||(handlers.splice(j,1),handleObj.selector&&handlers.delegateCount--,special.remove&&special.remove.call(elem,handleObj));
// Remove generic event handler if we removed something and no more handlers exist
// (avoids potential for endless recursion during removal of special event handlers)
origCount&&!handlers.length&&(special.teardown&&special.teardown.call(elem,namespaces,elemData.handle)!==!1||jQuery.removeEvent(elem,type,elemData.handle),delete events[type])}else for(type in events)jQuery.event.remove(elem,type+types[t],handler,selector,!0);
// Remove data and the expando if it's no longer used
jQuery.isEmptyObject(events)&&dataPriv.remove(elem,"handle events")}},dispatch:function(nativeEvent){
// Make a writable jQuery.Event from the native event object
var i,j,ret,matched,handleObj,handlerQueue,event=jQuery.event.fix(nativeEvent),args=new Array(arguments.length),handlers=(dataPriv.get(this,"events")||{})[event.type]||[],special=jQuery.event.special[event.type]||{};for(
// Use the fix-ed jQuery.Event rather than the (read-only) native event
args[0]=event,i=1;i<arguments.length;i++)args[i]=arguments[i];
// Call the preDispatch hook for the mapped type, and let it bail if desired
if(event.delegateTarget=this,!special.preDispatch||special.preDispatch.call(this,event)!==!1){for(
// Determine handlers
handlerQueue=jQuery.event.handlers.call(this,event,handlers),
// Run delegates first; they may want to stop propagation beneath us
i=0;(matched=handlerQueue[i++])&&!event.isPropagationStopped();)for(event.currentTarget=matched.elem,j=0;(handleObj=matched.handlers[j++])&&!event.isImmediatePropagationStopped();)
// Triggered event must either 1) have no namespace, or 2) have namespace(s)
// a subset or equal to those in the bound event (both can have no namespace).
event.rnamespace&&!event.rnamespace.test(handleObj.namespace)||(event.handleObj=handleObj,event.data=handleObj.data,ret=((jQuery.event.special[handleObj.origType]||{}).handle||handleObj.handler).apply(matched.elem,args),void 0!==ret&&(event.result=ret)===!1&&(event.preventDefault(),event.stopPropagation()));
// Call the postDispatch hook for the mapped type
return special.postDispatch&&special.postDispatch.call(this,event),event.result}},handlers:function(event,handlers){var i,handleObj,sel,matchedHandlers,matchedSelectors,handlerQueue=[],delegateCount=handlers.delegateCount,cur=event.target;
// Find delegate handlers
if(delegateCount&&
// Support: IE <=9
// Black-hole SVG <use> instance trees (trac-13180)
cur.nodeType&&
// Support: Firefox <=42
// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
// Support: IE 11 only
// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
!("click"===event.type&&event.button>=1))for(;cur!==this;cur=cur.parentNode||this)
// Don't check non-elements (#13208)
// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
if(1===cur.nodeType&&("click"!==event.type||cur.disabled!==!0)){for(matchedHandlers=[],matchedSelectors={},i=0;i<delegateCount;i++)handleObj=handlers[i],
// Don't conflict with Object.prototype properties (#13203)
sel=handleObj.selector+" ",void 0===matchedSelectors[sel]&&(matchedSelectors[sel]=handleObj.needsContext?jQuery(sel,this).index(cur)>-1:jQuery.find(sel,this,null,[cur]).length),matchedSelectors[sel]&&matchedHandlers.push(handleObj);matchedHandlers.length&&handlerQueue.push({elem:cur,handlers:matchedHandlers})}
// Add the remaining (directly-bound) handlers
return cur=this,delegateCount<handlers.length&&handlerQueue.push({elem:cur,handlers:handlers.slice(delegateCount)}),handlerQueue},addProp:function(name,hook){Object.defineProperty(jQuery.Event.prototype,name,{enumerable:!0,configurable:!0,get:jQuery.isFunction(hook)?function(){if(this.originalEvent)return hook(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[name]},set:function(value){Object.defineProperty(this,name,{enumerable:!0,configurable:!0,writable:!0,value:value})}})},fix:function(originalEvent){return originalEvent[jQuery.expando]?originalEvent:new jQuery.Event(originalEvent)},special:{load:{
// Prevent triggered image.load events from bubbling to window.load
noBubble:!0},focus:{
// Fire native event if possible so blur/focus sequence is correct
trigger:function(){if(this!==safeActiveElement()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===safeActiveElement()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{
// For checkbox, fire native event so checked state will be right
trigger:function(){if("checkbox"===this.type&&this.click&&jQuery.nodeName(this,"input"))return this.click(),!1},
// For cross-browser consistency, don't fire native .click() on links
_default:function(event){return jQuery.nodeName(event.target,"a")}},beforeunload:{postDispatch:function(event){
// Support: Firefox 20+
// Firefox doesn't alert if the returnValue field is not set.
void 0!==event.result&&event.originalEvent&&(event.originalEvent.returnValue=event.result)}}}},jQuery.removeEvent=function(elem,type,handle){
// This "if" is needed for plain objects
elem.removeEventListener&&elem.removeEventListener(type,handle)},jQuery.Event=function(src,props){
// Allow instantiation without the 'new' keyword
// Allow instantiation without the 'new' keyword
// Event object
// Events bubbling up the document may have been marked as prevented
// by a handler lower down the tree; reflect the correct value.
// Support: Android <=2.3 only
// Create target properties
// Support: Safari <=6 - 7 only
// Target should not be a text node (#504, #13143)
// Put explicitly provided properties onto the event object
// Create a timestamp if incoming event doesn't have one
// Mark it as fixed
return this instanceof jQuery.Event?(src&&src.type?(this.originalEvent=src,this.type=src.type,this.isDefaultPrevented=src.defaultPrevented||void 0===src.defaultPrevented&&src.returnValue===!1?returnTrue:returnFalse,this.target=src.target&&3===src.target.nodeType?src.target.parentNode:src.target,this.currentTarget=src.currentTarget,this.relatedTarget=src.relatedTarget):this.type=src,props&&jQuery.extend(this,props),this.timeStamp=src&&src.timeStamp||jQuery.now(),void(this[jQuery.expando]=!0)):new jQuery.Event(src,props)},
// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype={constructor:jQuery.Event,isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=returnTrue,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=returnTrue,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=returnTrue,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},
// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(event){var button=event.button;
// Add which for key events
// Add which for key events
// Add which for click: 1 === left; 2 === middle; 3 === right
return null==event.which&&rkeyEvent.test(event.type)?null!=event.charCode?event.charCode:event.keyCode:!event.which&&void 0!==button&&rmouseEvent.test(event.type)?1&button?1:2&button?3:4&button?2:0:event.which}},jQuery.event.addProp),
// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(orig,fix){jQuery.event.special[orig]={delegateType:fix,bindType:fix,handle:function(event){var ret,target=this,related=event.relatedTarget,handleObj=event.handleObj;
// For mouseenter/leave call the handler if related is outside the target.
// NB: No relatedTarget if the mouse left/entered the browser window
return related&&(related===target||jQuery.contains(target,related))||(event.type=handleObj.origType,ret=handleObj.handler.apply(this,arguments),event.type=fix),ret}}}),jQuery.fn.extend({on:function(types,selector,data,fn){return on(this,types,selector,data,fn)},one:function(types,selector,data,fn){return on(this,types,selector,data,fn,1)},off:function(types,selector,fn){var handleObj,type;if(types&&types.preventDefault&&types.handleObj)
// ( event )  dispatched jQuery.Event
return handleObj=types.handleObj,jQuery(types.delegateTarget).off(handleObj.namespace?handleObj.origType+"."+handleObj.namespace:handleObj.origType,handleObj.selector,handleObj.handler),this;if("object"==typeof types){
// ( types-object [, selector] )
for(type in types)this.off(type,selector,types[type]);return this}
// ( types [, fn] )
return selector!==!1&&"function"!=typeof selector||(fn=selector,selector=void 0),fn===!1&&(fn=returnFalse),this.each(function(){jQuery.event.remove(this,types,fn,selector)})}});var/* eslint-disable max-len */
// See https://github.com/eslint/eslint/issues/3229
rxhtmlTag=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,/* eslint-enable */
// Support: IE <=10 - 11, Edge 12 - 13
// In IE/Edge using regex groups here causes severe slowdowns.
// See https://connect.microsoft.com/IE/feedback/details/1736512/
rnoInnerhtml=/<script|<style|<link/i,
// checked="checked" or checked
rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,rscriptTypeMasked=/^true\/(.*)/,rcleanScript=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;jQuery.extend({htmlPrefilter:function(html){return html.replace(rxhtmlTag,"<$1></$2>")},clone:function(elem,dataAndEvents,deepDataAndEvents){var i,l,srcElements,destElements,clone=elem.cloneNode(!0),inPage=jQuery.contains(elem.ownerDocument,elem);
// Fix IE cloning issues
if(!(support.noCloneChecked||1!==elem.nodeType&&11!==elem.nodeType||jQuery.isXMLDoc(elem)))for(
// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
destElements=getAll(clone),srcElements=getAll(elem),i=0,l=srcElements.length;i<l;i++)fixInput(srcElements[i],destElements[i]);
// Copy the events from the original to the clone
if(dataAndEvents)if(deepDataAndEvents)for(srcElements=srcElements||getAll(elem),destElements=destElements||getAll(clone),i=0,l=srcElements.length;i<l;i++)cloneCopyEvent(srcElements[i],destElements[i]);else cloneCopyEvent(elem,clone);
// Return the cloned set
// Preserve script evaluation history
return destElements=getAll(clone,"script"),destElements.length>0&&setGlobalEval(destElements,!inPage&&getAll(elem,"script")),clone},cleanData:function(elems){for(var data,elem,type,special=jQuery.event.special,i=0;void 0!==(elem=elems[i]);i++)if(acceptData(elem)){if(data=elem[dataPriv.expando]){if(data.events)for(type in data.events)special[type]?jQuery.event.remove(elem,type):jQuery.removeEvent(elem,type,data.handle);
// Support: Chrome <=35 - 45+
// Assign undefined instead of using delete, see Data#remove
elem[dataPriv.expando]=void 0}elem[dataUser.expando]&&(
// Support: Chrome <=35 - 45+
// Assign undefined instead of using delete, see Data#remove
elem[dataUser.expando]=void 0)}}}),jQuery.fn.extend({detach:function(selector){return remove(this,selector,!0)},remove:function(selector){return remove(this,selector)},text:function(value){return access(this,function(value){return void 0===value?jQuery.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=value)})},null,value,arguments.length)},append:function(){return domManip(this,arguments,function(elem){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var target=manipulationTarget(this,elem);target.appendChild(elem)}})},prepend:function(){return domManip(this,arguments,function(elem){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var target=manipulationTarget(this,elem);target.insertBefore(elem,target.firstChild)}})},before:function(){return domManip(this,arguments,function(elem){this.parentNode&&this.parentNode.insertBefore(elem,this)})},after:function(){return domManip(this,arguments,function(elem){this.parentNode&&this.parentNode.insertBefore(elem,this.nextSibling)})},empty:function(){for(var elem,i=0;null!=(elem=this[i]);i++)1===elem.nodeType&&(
// Prevent memory leaks
jQuery.cleanData(getAll(elem,!1)),
// Remove any remaining nodes
elem.textContent="");return this},clone:function(dataAndEvents,deepDataAndEvents){return dataAndEvents=null!=dataAndEvents&&dataAndEvents,deepDataAndEvents=null==deepDataAndEvents?dataAndEvents:deepDataAndEvents,this.map(function(){return jQuery.clone(this,dataAndEvents,deepDataAndEvents)})},html:function(value){return access(this,function(value){var elem=this[0]||{},i=0,l=this.length;if(void 0===value&&1===elem.nodeType)return elem.innerHTML;
// See if we can take a shortcut and just use innerHTML
if("string"==typeof value&&!rnoInnerhtml.test(value)&&!wrapMap[(rtagName.exec(value)||["",""])[1].toLowerCase()]){value=jQuery.htmlPrefilter(value);try{for(;i<l;i++)elem=this[i]||{},
// Remove element nodes and prevent memory leaks
1===elem.nodeType&&(jQuery.cleanData(getAll(elem,!1)),elem.innerHTML=value);elem=0}catch(e){}}elem&&this.empty().append(value)},null,value,arguments.length)},replaceWith:function(){var ignored=[];
// Make the changes, replacing each non-ignored context element with the new content
return domManip(this,arguments,function(elem){var parent=this.parentNode;jQuery.inArray(this,ignored)<0&&(jQuery.cleanData(getAll(this)),parent&&parent.replaceChild(elem,this))},ignored)}}),jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(selector){for(var elems,ret=[],insert=jQuery(selector),last=insert.length-1,i=0;i<=last;i++)elems=i===last?this:this.clone(!0),jQuery(insert[i])[original](elems),
// Support: Android <=4.0 only, PhantomJS 1 only
// .get() because push.apply(_, arraylike) throws on ancient WebKit
push.apply(ret,elems.get());return this.pushStack(ret)}});var rmargin=/^margin/,rnumnonpx=new RegExp("^("+pnum+")(?!px)[a-z%]+$","i"),getStyles=function(elem){
// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
// IE throws on elements created in popups
// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
var view=elem.ownerDocument.defaultView;return view&&view.opener||(view=window),view.getComputedStyle(elem)};!function(){
// Executing both pixelPosition & boxSizingReliable tests require only one layout
// so they're executed at the same time to save the second computation.
function computeStyleTests(){
// This is a singleton, we need to execute it only once
if(div){div.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",div.innerHTML="",documentElement.appendChild(container);var divStyle=window.getComputedStyle(div);pixelPositionVal="1%"!==divStyle.top,
// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
reliableMarginLeftVal="2px"===divStyle.marginLeft,boxSizingReliableVal="4px"===divStyle.width,
// Support: Android 4.0 - 4.3 only
// Some styles come back with percentage values, even though they shouldn't
div.style.marginRight="50%",pixelMarginRightVal="4px"===divStyle.marginRight,documentElement.removeChild(container),
// Nullify the div so it wouldn't be stored in the memory and
// it will also be a sign that checks already performed
div=null}}var pixelPositionVal,boxSizingReliableVal,pixelMarginRightVal,reliableMarginLeftVal,container=document.createElement("div"),div=document.createElement("div");
// Finish early in limited (non-browser) environments
div.style&&(
// Support: IE <=9 - 11 only
// Style of cloned element affects source element cloned (#8908)
div.style.backgroundClip="content-box",div.cloneNode(!0).style.backgroundClip="",support.clearCloneStyle="content-box"===div.style.backgroundClip,container.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",container.appendChild(div),jQuery.extend(support,{pixelPosition:function(){return computeStyleTests(),pixelPositionVal},boxSizingReliable:function(){return computeStyleTests(),boxSizingReliableVal},pixelMarginRight:function(){return computeStyleTests(),pixelMarginRightVal},reliableMarginLeft:function(){return computeStyleTests(),reliableMarginLeftVal}}))}();var
// Swappable if display is none or starts with table
// except "table", "table-cell", or "table-caption"
// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
rdisplayswap=/^(none|table(?!-c[ea]).+)/,cssShow={position:"absolute",visibility:"hidden",display:"block"},cssNormalTransform={letterSpacing:"0",fontWeight:"400"},cssPrefixes=["Webkit","Moz","ms"],emptyStyle=document.createElement("div").style;jQuery.extend({
// Add in style property hooks for overriding the default
// behavior of getting and setting a style property
cssHooks:{opacity:{get:function(elem,computed){if(computed){
// We should always get a number back from opacity
var ret=curCSS(elem,"opacity");return""===ret?"1":ret}}}},
// Don't automatically add "px" to these possibly-unitless properties
cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},
// Add in properties whose names you wish to fix before
// setting or getting the value
cssProps:{"float":"cssFloat"},
// Get and set the style property on a DOM Node
style:function(elem,name,value,extra){
// Don't set styles on text and comment nodes
if(elem&&3!==elem.nodeType&&8!==elem.nodeType&&elem.style){
// Make sure that we're working with the right name
var ret,type,hooks,origName=jQuery.camelCase(name),style=elem.style;
// Check if we're setting a value
// Gets hook for the prefixed version, then unprefixed version
// Check if we're setting a value
// If a hook was provided get the non-computed value from there
// Convert "+=" or "-=" to relative numbers (#7345)
// Fixes bug #9237
// Make sure that null and NaN values aren't set (#7116)
// If a number was passed in, add the unit (except for certain CSS properties)
// background-* props affect original clone's values
// If a hook was provided, use that value, otherwise just set the specified value
return name=jQuery.cssProps[origName]||(jQuery.cssProps[origName]=vendorPropName(origName)||origName),hooks=jQuery.cssHooks[name]||jQuery.cssHooks[origName],void 0===value?hooks&&"get"in hooks&&void 0!==(ret=hooks.get(elem,!1,extra))?ret:style[name]:(type=typeof value,"string"===type&&(ret=rcssNum.exec(value))&&ret[1]&&(value=adjustCSS(elem,name,ret),type="number"),null!=value&&value===value&&("number"===type&&(value+=ret&&ret[3]||(jQuery.cssNumber[origName]?"":"px")),support.clearCloneStyle||""!==value||0!==name.indexOf("background")||(style[name]="inherit"),hooks&&"set"in hooks&&void 0===(value=hooks.set(elem,value,extra))||(style[name]=value)),void 0)}},css:function(elem,name,extra,styles){var val,num,hooks,origName=jQuery.camelCase(name);
// Make numeric if forced or a qualifier was provided and val looks numeric
// Make sure that we're working with the right name
// Try prefixed name followed by the unprefixed name
// If a hook was provided get the computed value from there
// Otherwise, if a way to get the computed value exists, use that
// Convert "normal" to computed value
// Make numeric if forced or a qualifier was provided and val looks numeric
return name=jQuery.cssProps[origName]||(jQuery.cssProps[origName]=vendorPropName(origName)||origName),hooks=jQuery.cssHooks[name]||jQuery.cssHooks[origName],hooks&&"get"in hooks&&(val=hooks.get(elem,!0,extra)),void 0===val&&(val=curCSS(elem,name,styles)),"normal"===val&&name in cssNormalTransform&&(val=cssNormalTransform[name]),""===extra||extra?(num=parseFloat(val),extra===!0||isFinite(num)?num||0:val):val}}),jQuery.each(["height","width"],function(i,name){jQuery.cssHooks[name]={get:function(elem,computed,extra){if(computed)
// Certain elements can have dimension info if we invisibly show them
// but it must have a current display style that would benefit
// Support: Safari 8+
// Table columns in Safari have non-zero offsetWidth & zero
// getBoundingClientRect().width unless display is changed.
// Support: IE <=11 only
// Running getBoundingClientRect on a disconnected node
// in IE throws an error.
return!rdisplayswap.test(jQuery.css(elem,"display"))||elem.getClientRects().length&&elem.getBoundingClientRect().width?getWidthOrHeight(elem,name,extra):swap(elem,cssShow,function(){return getWidthOrHeight(elem,name,extra)})},set:function(elem,value,extra){var matches,styles=extra&&getStyles(elem),subtract=extra&&augmentWidthOrHeight(elem,name,extra,"border-box"===jQuery.css(elem,"boxSizing",!1,styles),styles);
// Convert to pixels if value adjustment is needed
return subtract&&(matches=rcssNum.exec(value))&&"px"!==(matches[3]||"px")&&(elem.style[name]=value,value=jQuery.css(elem,name)),setPositiveNumber(elem,value,subtract)}}}),jQuery.cssHooks.marginLeft=addGetHookIf(support.reliableMarginLeft,function(elem,computed){if(computed)return(parseFloat(curCSS(elem,"marginLeft"))||elem.getBoundingClientRect().left-swap(elem,{marginLeft:0},function(){return elem.getBoundingClientRect().left}))+"px"}),
// These hooks are used by animate to expand properties
jQuery.each({margin:"",padding:"",border:"Width"},function(prefix,suffix){jQuery.cssHooks[prefix+suffix]={expand:function(value){for(var i=0,expanded={},
// Assumes a single number if not a string
parts="string"==typeof value?value.split(" "):[value];i<4;i++)expanded[prefix+cssExpand[i]+suffix]=parts[i]||parts[i-2]||parts[0];return expanded}},rmargin.test(prefix)||(jQuery.cssHooks[prefix+suffix].set=setPositiveNumber)}),jQuery.fn.extend({css:function(name,value){return access(this,function(elem,name,value){var styles,len,map={},i=0;if(jQuery.isArray(name)){for(styles=getStyles(elem),len=name.length;i<len;i++)map[name[i]]=jQuery.css(elem,name[i],!1,styles);return map}return void 0!==value?jQuery.style(elem,name,value):jQuery.css(elem,name)},name,value,arguments.length>1)}}),jQuery.Tween=Tween,Tween.prototype={constructor:Tween,init:function(elem,options,prop,end,easing,unit){this.elem=elem,this.prop=prop,this.easing=easing||jQuery.easing._default,this.options=options,this.start=this.now=this.cur(),this.end=end,this.unit=unit||(jQuery.cssNumber[prop]?"":"px")},cur:function(){var hooks=Tween.propHooks[this.prop];return hooks&&hooks.get?hooks.get(this):Tween.propHooks._default.get(this)},run:function(percent){var eased,hooks=Tween.propHooks[this.prop];return this.options.duration?this.pos=eased=jQuery.easing[this.easing](percent,this.options.duration*percent,0,1,this.options.duration):this.pos=eased=percent,this.now=(this.end-this.start)*eased+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),hooks&&hooks.set?hooks.set(this):Tween.propHooks._default.set(this),this}},Tween.prototype.init.prototype=Tween.prototype,Tween.propHooks={_default:{get:function(tween){var result;
// Use a property on the element directly when it is not a DOM element,
// or when there is no matching style property that exists.
// Use a property on the element directly when it is not a DOM element,
// or when there is no matching style property that exists.
// Passing an empty string as a 3rd parameter to .css will automatically
// attempt a parseFloat and fallback to a string if the parse fails.
// Simple values such as "10px" are parsed to Float;
// complex values such as "rotate(1rad)" are returned as-is.
return 1!==tween.elem.nodeType||null!=tween.elem[tween.prop]&&null==tween.elem.style[tween.prop]?tween.elem[tween.prop]:(result=jQuery.css(tween.elem,tween.prop,""),result&&"auto"!==result?result:0)},set:function(tween){
// Use step hook for back compat.
// Use cssHook if its there.
// Use .style if available and use plain properties where available.
jQuery.fx.step[tween.prop]?jQuery.fx.step[tween.prop](tween):1!==tween.elem.nodeType||null==tween.elem.style[jQuery.cssProps[tween.prop]]&&!jQuery.cssHooks[tween.prop]?tween.elem[tween.prop]=tween.now:jQuery.style(tween.elem,tween.prop,tween.now+tween.unit)}}},
// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop=Tween.propHooks.scrollLeft={set:function(tween){tween.elem.nodeType&&tween.elem.parentNode&&(tween.elem[tween.prop]=tween.now)}},jQuery.easing={linear:function(p){return p},swing:function(p){return.5-Math.cos(p*Math.PI)/2},_default:"swing"},jQuery.fx=Tween.prototype.init,
// Back compat <1.8 extension point
jQuery.fx.step={};var fxNow,timerId,rfxtypes=/^(?:toggle|show|hide)$/,rrun=/queueHooks$/;jQuery.Animation=jQuery.extend(Animation,{tweeners:{"*":[function(prop,value){var tween=this.createTween(prop,value);return adjustCSS(tween.elem,prop,rcssNum.exec(value),tween),tween}]},tweener:function(props,callback){jQuery.isFunction(props)?(callback=props,props=["*"]):props=props.match(rnothtmlwhite);for(var prop,index=0,length=props.length;index<length;index++)prop=props[index],Animation.tweeners[prop]=Animation.tweeners[prop]||[],Animation.tweeners[prop].unshift(callback)},prefilters:[defaultPrefilter],prefilter:function(callback,prepend){prepend?Animation.prefilters.unshift(callback):Animation.prefilters.push(callback)}}),jQuery.speed=function(speed,easing,fn){var opt=speed&&"object"==typeof speed?jQuery.extend({},speed):{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&!jQuery.isFunction(easing)&&easing};
// Go to the end state if fx are off or if document is hidden
// Normalize opt.queue - true/undefined/null -> "fx"
// Queueing
return jQuery.fx.off||document.hidden?opt.duration=0:"number"!=typeof opt.duration&&(opt.duration in jQuery.fx.speeds?opt.duration=jQuery.fx.speeds[opt.duration]:opt.duration=jQuery.fx.speeds._default),null!=opt.queue&&opt.queue!==!0||(opt.queue="fx"),opt.old=opt.complete,opt.complete=function(){jQuery.isFunction(opt.old)&&opt.old.call(this),opt.queue&&jQuery.dequeue(this,opt.queue)},opt},jQuery.fn.extend({fadeTo:function(speed,to,easing,callback){
// Show any hidden elements after setting opacity to 0
return this.filter(isHiddenWithinTree).css("opacity",0).show().end().animate({opacity:to},speed,easing,callback)},animate:function(prop,speed,easing,callback){var empty=jQuery.isEmptyObject(prop),optall=jQuery.speed(speed,easing,callback),doAnimation=function(){
// Operate on a copy of prop so per-property easing won't be lost
var anim=Animation(this,jQuery.extend({},prop),optall);
// Empty animations, or finishing resolves immediately
(empty||dataPriv.get(this,"finish"))&&anim.stop(!0)};return doAnimation.finish=doAnimation,empty||optall.queue===!1?this.each(doAnimation):this.queue(optall.queue,doAnimation)},stop:function(type,clearQueue,gotoEnd){var stopQueue=function(hooks){var stop=hooks.stop;delete hooks.stop,stop(gotoEnd)};return"string"!=typeof type&&(gotoEnd=clearQueue,clearQueue=type,type=void 0),clearQueue&&type!==!1&&this.queue(type||"fx",[]),this.each(function(){var dequeue=!0,index=null!=type&&type+"queueHooks",timers=jQuery.timers,data=dataPriv.get(this);if(index)data[index]&&data[index].stop&&stopQueue(data[index]);else for(index in data)data[index]&&data[index].stop&&rrun.test(index)&&stopQueue(data[index]);for(index=timers.length;index--;)timers[index].elem!==this||null!=type&&timers[index].queue!==type||(timers[index].anim.stop(gotoEnd),dequeue=!1,timers.splice(index,1));
// Start the next in the queue if the last step wasn't forced.
// Timers currently will call their complete callbacks, which
// will dequeue but only if they were gotoEnd.
!dequeue&&gotoEnd||jQuery.dequeue(this,type)})},finish:function(type){return type!==!1&&(type=type||"fx"),this.each(function(){var index,data=dataPriv.get(this),queue=data[type+"queue"],hooks=data[type+"queueHooks"],timers=jQuery.timers,length=queue?queue.length:0;
// Look for any active animations, and finish them
for(
// Enable finishing flag on private data
data.finish=!0,
// Empty the queue first
jQuery.queue(this,type,[]),hooks&&hooks.stop&&hooks.stop.call(this,!0),index=timers.length;index--;)timers[index].elem===this&&timers[index].queue===type&&(timers[index].anim.stop(!0),timers.splice(index,1));
// Look for any animations in the old queue and finish them
for(index=0;index<length;index++)queue[index]&&queue[index].finish&&queue[index].finish.call(this);
// Turn off finishing flag
delete data.finish})}}),jQuery.each(["toggle","show","hide"],function(i,name){var cssFn=jQuery.fn[name];jQuery.fn[name]=function(speed,easing,callback){return null==speed||"boolean"==typeof speed?cssFn.apply(this,arguments):this.animate(genFx(name,!0),speed,easing,callback)}}),
// Generate shortcuts for custom animations
jQuery.each({slideDown:genFx("show"),slideUp:genFx("hide"),slideToggle:genFx("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(name,props){jQuery.fn[name]=function(speed,easing,callback){return this.animate(props,speed,easing,callback)}}),jQuery.timers=[],jQuery.fx.tick=function(){var timer,i=0,timers=jQuery.timers;for(fxNow=jQuery.now();i<timers.length;i++)timer=timers[i],
// Checks the timer has not already been removed
timer()||timers[i]!==timer||timers.splice(i--,1);timers.length||jQuery.fx.stop(),fxNow=void 0},jQuery.fx.timer=function(timer){jQuery.timers.push(timer),timer()?jQuery.fx.start():jQuery.timers.pop()},jQuery.fx.interval=13,jQuery.fx.start=function(){timerId||(timerId=window.requestAnimationFrame?window.requestAnimationFrame(raf):window.setInterval(jQuery.fx.tick,jQuery.fx.interval))},jQuery.fx.stop=function(){window.cancelAnimationFrame?window.cancelAnimationFrame(timerId):window.clearInterval(timerId),timerId=null},jQuery.fx.speeds={slow:600,fast:200,
// Default speed
_default:400},
// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay=function(time,type){return time=jQuery.fx?jQuery.fx.speeds[time]||time:time,type=type||"fx",this.queue(type,function(next,hooks){var timeout=window.setTimeout(next,time);hooks.stop=function(){window.clearTimeout(timeout)}})},function(){var input=document.createElement("input"),select=document.createElement("select"),opt=select.appendChild(document.createElement("option"));input.type="checkbox",
// Support: Android <=4.3 only
// Default value for a checkbox should be "on"
support.checkOn=""!==input.value,
// Support: IE <=11 only
// Must access selectedIndex to make default options select
support.optSelected=opt.selected,
// Support: IE <=11 only
// An input loses its value after becoming a radio
input=document.createElement("input"),input.value="t",input.type="radio",support.radioValue="t"===input.value}();var boolHook,attrHandle=jQuery.expr.attrHandle;jQuery.fn.extend({attr:function(name,value){return access(this,jQuery.attr,name,value,arguments.length>1)},removeAttr:function(name){return this.each(function(){jQuery.removeAttr(this,name)})}}),jQuery.extend({attr:function(elem,name,value){var ret,hooks,nType=elem.nodeType;
// Don't get/set attributes on text, comment and attribute nodes
if(3!==nType&&8!==nType&&2!==nType)
// Fallback to prop when attributes are not supported
// Fallback to prop when attributes are not supported
// Attribute hooks are determined by the lowercase version
// Grab necessary hook if one is defined
return"undefined"==typeof elem.getAttribute?jQuery.prop(elem,name,value):(1===nType&&jQuery.isXMLDoc(elem)||(hooks=jQuery.attrHooks[name.toLowerCase()]||(jQuery.expr.match.bool.test(name)?boolHook:void 0)),void 0!==value?null===value?void jQuery.removeAttr(elem,name):hooks&&"set"in hooks&&void 0!==(ret=hooks.set(elem,value,name))?ret:(elem.setAttribute(name,value+""),value):hooks&&"get"in hooks&&null!==(ret=hooks.get(elem,name))?ret:(ret=jQuery.find.attr(elem,name),null==ret?void 0:ret))},attrHooks:{type:{set:function(elem,value){if(!support.radioValue&&"radio"===value&&jQuery.nodeName(elem,"input")){var val=elem.value;return elem.setAttribute("type",value),val&&(elem.value=val),value}}}},removeAttr:function(elem,value){var name,i=0,
// Attribute names can contain non-HTML whitespace characters
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
attrNames=value&&value.match(rnothtmlwhite);if(attrNames&&1===elem.nodeType)for(;name=attrNames[i++];)elem.removeAttribute(name)}}),
// Hooks for boolean attributes
boolHook={set:function(elem,value,name){
// Remove boolean attributes when set to false
return value===!1?jQuery.removeAttr(elem,name):elem.setAttribute(name,name),name}},jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g),function(i,name){var getter=attrHandle[name]||jQuery.find.attr;attrHandle[name]=function(elem,name,isXML){var ret,handle,lowercaseName=name.toLowerCase();
// Avoid an infinite loop by temporarily removing this function from the getter
return isXML||(handle=attrHandle[lowercaseName],attrHandle[lowercaseName]=ret,ret=null!=getter(elem,name,isXML)?lowercaseName:null,attrHandle[lowercaseName]=handle),ret}});var rfocusable=/^(?:input|select|textarea|button)$/i,rclickable=/^(?:a|area)$/i;jQuery.fn.extend({prop:function(name,value){return access(this,jQuery.prop,name,value,arguments.length>1)},removeProp:function(name){return this.each(function(){delete this[jQuery.propFix[name]||name]})}}),jQuery.extend({prop:function(elem,name,value){var ret,hooks,nType=elem.nodeType;
// Don't get/set properties on text, comment and attribute nodes
if(3!==nType&&8!==nType&&2!==nType)
// Fix name and attach hooks
return 1===nType&&jQuery.isXMLDoc(elem)||(name=jQuery.propFix[name]||name,hooks=jQuery.propHooks[name]),void 0!==value?hooks&&"set"in hooks&&void 0!==(ret=hooks.set(elem,value,name))?ret:elem[name]=value:hooks&&"get"in hooks&&null!==(ret=hooks.get(elem,name))?ret:elem[name]},propHooks:{tabIndex:{get:function(elem){
// Support: IE <=9 - 11 only
// elem.tabIndex doesn't always return the
// correct value when it hasn't been explicitly set
// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
// Use proper attribute retrieval(#12072)
var tabindex=jQuery.find.attr(elem,"tabindex");return tabindex?parseInt(tabindex,10):rfocusable.test(elem.nodeName)||rclickable.test(elem.nodeName)&&elem.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),
// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
support.optSelected||(jQuery.propHooks.selected={get:function(elem){/* eslint no-unused-expressions: "off" */
var parent=elem.parentNode;return parent&&parent.parentNode&&parent.parentNode.selectedIndex,null},set:function(elem){/* eslint no-unused-expressions: "off" */
var parent=elem.parentNode;parent&&(parent.selectedIndex,parent.parentNode&&parent.parentNode.selectedIndex)}}),jQuery.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){jQuery.propFix[this.toLowerCase()]=this}),jQuery.fn.extend({addClass:function(value){var classes,elem,cur,curValue,clazz,j,finalValue,i=0;if(jQuery.isFunction(value))return this.each(function(j){jQuery(this).addClass(value.call(this,j,getClass(this)))});if("string"==typeof value&&value)for(classes=value.match(rnothtmlwhite)||[];elem=this[i++];)if(curValue=getClass(elem),cur=1===elem.nodeType&&" "+stripAndCollapse(curValue)+" "){for(j=0;clazz=classes[j++];)cur.indexOf(" "+clazz+" ")<0&&(cur+=clazz+" ");
// Only assign if different to avoid unneeded rendering.
finalValue=stripAndCollapse(cur),curValue!==finalValue&&elem.setAttribute("class",finalValue)}return this},removeClass:function(value){var classes,elem,cur,curValue,clazz,j,finalValue,i=0;if(jQuery.isFunction(value))return this.each(function(j){jQuery(this).removeClass(value.call(this,j,getClass(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof value&&value)for(classes=value.match(rnothtmlwhite)||[];elem=this[i++];)if(curValue=getClass(elem),
// This expression is here for better compressibility (see addClass)
cur=1===elem.nodeType&&" "+stripAndCollapse(curValue)+" "){for(j=0;clazz=classes[j++];)
// Remove *all* instances
for(;cur.indexOf(" "+clazz+" ")>-1;)cur=cur.replace(" "+clazz+" "," ");
// Only assign if different to avoid unneeded rendering.
finalValue=stripAndCollapse(cur),curValue!==finalValue&&elem.setAttribute("class",finalValue)}return this},toggleClass:function(value,stateVal){var type=typeof value;return"boolean"==typeof stateVal&&"string"===type?stateVal?this.addClass(value):this.removeClass(value):jQuery.isFunction(value)?this.each(function(i){jQuery(this).toggleClass(value.call(this,i,getClass(this),stateVal),stateVal)}):this.each(function(){var className,i,self,classNames;if("string"===type)for(
// Toggle individual class names
i=0,self=jQuery(this),classNames=value.match(rnothtmlwhite)||[];className=classNames[i++];)
// Check each className given, space separated list
self.hasClass(className)?self.removeClass(className):self.addClass(className);else void 0!==value&&"boolean"!==type||(className=getClass(this),className&&
// Store className if set
dataPriv.set(this,"__className__",className),
// If the element has a class name or if we're passed `false`,
// then remove the whole classname (if there was one, the above saved it).
// Otherwise bring back whatever was previously saved (if anything),
// falling back to the empty string if nothing was stored.
this.setAttribute&&this.setAttribute("class",className||value===!1?"":dataPriv.get(this,"__className__")||""))})},hasClass:function(selector){var className,elem,i=0;for(className=" "+selector+" ";elem=this[i++];)if(1===elem.nodeType&&(" "+stripAndCollapse(getClass(elem))+" ").indexOf(className)>-1)return!0;return!1}});var rreturn=/\r/g;jQuery.fn.extend({val:function(value){var hooks,ret,isFunction,elem=this[0];{if(arguments.length)return isFunction=jQuery.isFunction(value),this.each(function(i){var val;1===this.nodeType&&(val=isFunction?value.call(this,i,jQuery(this).val()):value,
// Treat null/undefined as ""; convert numbers to string
null==val?val="":"number"==typeof val?val+="":jQuery.isArray(val)&&(val=jQuery.map(val,function(value){return null==value?"":value+""})),hooks=jQuery.valHooks[this.type]||jQuery.valHooks[this.nodeName.toLowerCase()],
// If set returns undefined, fall back to normal setting
hooks&&"set"in hooks&&void 0!==hooks.set(this,val,"value")||(this.value=val))});if(elem)
// Handle most common string cases
return hooks=jQuery.valHooks[elem.type]||jQuery.valHooks[elem.nodeName.toLowerCase()],hooks&&"get"in hooks&&void 0!==(ret=hooks.get(elem,"value"))?ret:(ret=elem.value,"string"==typeof ret?ret.replace(rreturn,""):null==ret?"":ret)}}}),jQuery.extend({valHooks:{option:{get:function(elem){var val=jQuery.find.attr(elem,"value");
// Support: IE <=10 - 11 only
// option.text throws exceptions (#14686, #14858)
// Strip and collapse whitespace
// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
return null!=val?val:stripAndCollapse(jQuery.text(elem))}},select:{get:function(elem){var value,option,i,options=elem.options,index=elem.selectedIndex,one="select-one"===elem.type,values=one?null:[],max=one?index+1:options.length;
// Loop through all the selected options
for(i=index<0?max:one?index:0;i<max;i++)
// Support: IE <=9 only
// IE8-9 doesn't update selected after form reset (#2551)
if(option=options[i],(option.selected||i===index)&&
// Don't return options that are disabled or in a disabled optgroup
!option.disabled&&(!option.parentNode.disabled||!jQuery.nodeName(option.parentNode,"optgroup"))){
// We don't need an array for one selects
if(
// Get the specific value for the option
value=jQuery(option).val(),one)return value;
// Multi-Selects return an array
values.push(value)}return values},set:function(elem,value){for(var optionSet,option,options=elem.options,values=jQuery.makeArray(value),i=options.length;i--;)option=options[i],/* eslint-disable no-cond-assign */
(option.selected=jQuery.inArray(jQuery.valHooks.option.get(option),values)>-1)&&(optionSet=!0);
// Force browsers to behave consistently when non-matching value is set
return optionSet||(elem.selectedIndex=-1),values}}}}),
// Radios and checkboxes getter/setter
jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this]={set:function(elem,value){if(jQuery.isArray(value))return elem.checked=jQuery.inArray(jQuery(elem).val(),value)>-1}},support.checkOn||(jQuery.valHooks[this].get=function(elem){return null===elem.getAttribute("value")?"on":elem.value})});
// Return jQuery for attributes-only inclusion
var rfocusMorph=/^(?:focusinfocus|focusoutblur)$/;jQuery.extend(jQuery.event,{trigger:function(event,data,elem,onlyHandlers){var i,cur,tmp,bubbleType,ontype,handle,special,eventPath=[elem||document],type=hasOwn.call(event,"type")?event.type:event,namespaces=hasOwn.call(event,"namespace")?event.namespace.split("."):[];
// Don't do events on text and comment nodes
if(cur=tmp=elem=elem||document,3!==elem.nodeType&&8!==elem.nodeType&&!rfocusMorph.test(type+jQuery.event.triggered)&&(type.indexOf(".")>-1&&(
// Namespaced trigger; create a regexp to match event type in handle()
namespaces=type.split("."),type=namespaces.shift(),namespaces.sort()),ontype=type.indexOf(":")<0&&"on"+type,
// Caller can pass in a jQuery.Event object, Object, or just an event type string
event=event[jQuery.expando]?event:new jQuery.Event(type,"object"==typeof event&&event),
// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
event.isTrigger=onlyHandlers?2:3,event.namespace=namespaces.join("."),event.rnamespace=event.namespace?new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,
// Clean up the event in case it is being reused
event.result=void 0,event.target||(event.target=elem),
// Clone any incoming data and prepend the event, creating the handler arg list
data=null==data?[event]:jQuery.makeArray(data,[event]),
// Allow special events to draw outside the lines
special=jQuery.event.special[type]||{},onlyHandlers||!special.trigger||special.trigger.apply(elem,data)!==!1)){
// Determine event propagation path in advance, per W3C events spec (#9951)
// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
if(!onlyHandlers&&!special.noBubble&&!jQuery.isWindow(elem)){for(bubbleType=special.delegateType||type,rfocusMorph.test(bubbleType+type)||(cur=cur.parentNode);cur;cur=cur.parentNode)eventPath.push(cur),tmp=cur;
// Only add window if we got to document (e.g., not plain obj or detached DOM)
tmp===(elem.ownerDocument||document)&&eventPath.push(tmp.defaultView||tmp.parentWindow||window)}for(
// Fire handlers on the event path
i=0;(cur=eventPath[i++])&&!event.isPropagationStopped();)event.type=i>1?bubbleType:special.bindType||type,
// jQuery handler
handle=(dataPriv.get(cur,"events")||{})[event.type]&&dataPriv.get(cur,"handle"),handle&&handle.apply(cur,data),
// Native handler
handle=ontype&&cur[ontype],handle&&handle.apply&&acceptData(cur)&&(event.result=handle.apply(cur,data),event.result===!1&&event.preventDefault());
// If nobody prevented the default action, do it now
// Call a native DOM method on the target with the same name as the event.
// Don't do default actions on window, that's where global variables be (#6170)
// Don't re-trigger an onFOO event when we call its FOO() method
// Prevent re-triggering of the same event, since we already bubbled it above
return event.type=type,onlyHandlers||event.isDefaultPrevented()||special._default&&special._default.apply(eventPath.pop(),data)!==!1||!acceptData(elem)||ontype&&jQuery.isFunction(elem[type])&&!jQuery.isWindow(elem)&&(tmp=elem[ontype],tmp&&(elem[ontype]=null),jQuery.event.triggered=type,elem[type](),jQuery.event.triggered=void 0,tmp&&(elem[ontype]=tmp)),event.result}},
// Piggyback on a donor event to simulate a different one
// Used only for `focus(in | out)` events
simulate:function(type,elem,event){var e=jQuery.extend(new jQuery.Event,event,{type:type,isSimulated:!0});jQuery.event.trigger(e,null,elem)}}),jQuery.fn.extend({trigger:function(type,data){return this.each(function(){jQuery.event.trigger(type,data,this)})},triggerHandler:function(type,data){var elem=this[0];if(elem)return jQuery.event.trigger(type,data,elem,!0)}}),jQuery.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(i,name){
// Handle event binding
jQuery.fn[name]=function(data,fn){return arguments.length>0?this.on(name,null,data,fn):this.trigger(name)}}),jQuery.fn.extend({hover:function(fnOver,fnOut){return this.mouseenter(fnOver).mouseleave(fnOut||fnOver)}}),support.focusin="onfocusin"in window,
// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
support.focusin||jQuery.each({focus:"focusin",blur:"focusout"},function(orig,fix){
// Attach a single capturing handler on the document while someone wants focusin/focusout
var handler=function(event){jQuery.event.simulate(fix,event.target,jQuery.event.fix(event))};jQuery.event.special[fix]={setup:function(){var doc=this.ownerDocument||this,attaches=dataPriv.access(doc,fix);attaches||doc.addEventListener(orig,handler,!0),dataPriv.access(doc,fix,(attaches||0)+1)},teardown:function(){var doc=this.ownerDocument||this,attaches=dataPriv.access(doc,fix)-1;attaches?dataPriv.access(doc,fix,attaches):(doc.removeEventListener(orig,handler,!0),dataPriv.remove(doc,fix))}}});var location=window.location,nonce=jQuery.now(),rquery=/\?/;
// Cross-browser xml parsing
jQuery.parseXML=function(data){var xml;if(!data||"string"!=typeof data)return null;
// Support: IE 9 - 11 only
// IE throws on parseFromString with invalid input.
try{xml=(new window.DOMParser).parseFromString(data,"text/xml")}catch(e){xml=void 0}return xml&&!xml.getElementsByTagName("parsererror").length||jQuery.error("Invalid XML: "+data),xml};var rbracket=/\[\]$/,rCRLF=/\r?\n/g,rsubmitterTypes=/^(?:submit|button|image|reset|file)$/i,rsubmittable=/^(?:input|select|textarea|keygen)/i;
// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param=function(a,traditional){var prefix,s=[],add=function(key,valueOrFunction){
// If value is a function, invoke it and use its return value
var value=jQuery.isFunction(valueOrFunction)?valueOrFunction():valueOrFunction;s[s.length]=encodeURIComponent(key)+"="+encodeURIComponent(null==value?"":value)};
// If an array was passed in, assume that it is an array of form elements.
if(jQuery.isArray(a)||a.jquery&&!jQuery.isPlainObject(a))
// Serialize the form elements
jQuery.each(a,function(){add(this.name,this.value)});else
// If traditional, encode the "old" way (the way 1.3.2 or older
// did it), otherwise encode params recursively.
for(prefix in a)buildParams(prefix,a[prefix],traditional,add);
// Return the resulting serialization
return s.join("&")},jQuery.fn.extend({serialize:function(){return jQuery.param(this.serializeArray())},serializeArray:function(){return this.map(function(){
// Can add propHook for "elements" to filter or add form elements
var elements=jQuery.prop(this,"elements");return elements?jQuery.makeArray(elements):this}).filter(function(){var type=this.type;
// Use .is( ":disabled" ) so that fieldset[disabled] works
return this.name&&!jQuery(this).is(":disabled")&&rsubmittable.test(this.nodeName)&&!rsubmitterTypes.test(type)&&(this.checked||!rcheckableType.test(type))}).map(function(i,elem){var val=jQuery(this).val();return null==val?null:jQuery.isArray(val)?jQuery.map(val,function(val){return{name:elem.name,value:val.replace(rCRLF,"\r\n")}}):{name:elem.name,value:val.replace(rCRLF,"\r\n")}}).get()}});var r20=/%20/g,rhash=/#.*$/,rantiCache=/([?&])_=[^&]*/,rheaders=/^(.*?):[ \t]*([^\r\n]*)$/gm,
// #7653, #8125, #8152: local protocol detection
rlocalProtocol=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,rnoContent=/^(?:GET|HEAD)$/,rprotocol=/^\/\//,/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
prefilters={},/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
transports={},
// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
allTypes="*/".concat("*"),
// Anchor tag for parsing the document origin
originAnchor=document.createElement("a");originAnchor.href=location.href,jQuery.extend({
// Counter for holding the number of active queries
active:0,
// Last-Modified header cache for next request
lastModified:{},etag:{},ajaxSettings:{url:location.href,type:"GET",isLocal:rlocalProtocol.test(location.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/
accepts:{"*":allTypes,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},
// Data converters
// Keys separate source (or catchall "*") and destination types with a single space
converters:{
// Convert anything to text
"* text":String,
// Text to html (true = no transformation)
"text html":!0,
// Evaluate text as a json expression
"text json":JSON.parse,
// Parse text as xml
"text xml":jQuery.parseXML},
// For options that shouldn't be deep extended:
// you can add your own custom options here if
// and when you create one that shouldn't be
// deep extended (see ajaxExtend)
flatOptions:{url:!0,context:!0}},
// Creates a full fledged settings object into target
// with both ajaxSettings and settings fields.
// If target is omitted, writes into ajaxSettings.
ajaxSetup:function(target,settings){
// Building a settings object
// Extending ajaxSettings
return settings?ajaxExtend(ajaxExtend(target,jQuery.ajaxSettings),settings):ajaxExtend(jQuery.ajaxSettings,target)},ajaxPrefilter:addToPrefiltersOrTransports(prefilters),ajaxTransport:addToPrefiltersOrTransports(transports),
// Main method
ajax:function(url,options){
// Callback for when everything is done
function done(status,nativeStatusText,responses,headers){var isSuccess,success,error,response,modified,statusText=nativeStatusText;
// Ignore repeat invocations
completed||(completed=!0,
// Clear timeout if it exists
timeoutTimer&&window.clearTimeout(timeoutTimer),
// Dereference transport for early garbage collection
// (no matter how long the jqXHR object will be used)
transport=void 0,
// Cache response headers
responseHeadersString=headers||"",
// Set readyState
jqXHR.readyState=status>0?4:0,
// Determine if successful
isSuccess=status>=200&&status<300||304===status,
// Get response data
responses&&(response=ajaxHandleResponses(s,jqXHR,responses)),
// Convert no matter what (that way responseXXX fields are always set)
response=ajaxConvert(s,response,jqXHR,isSuccess),
// If successful, handle type chaining
isSuccess?(
// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
s.ifModified&&(modified=jqXHR.getResponseHeader("Last-Modified"),modified&&(jQuery.lastModified[cacheURL]=modified),modified=jqXHR.getResponseHeader("etag"),modified&&(jQuery.etag[cacheURL]=modified)),
// if no content
204===status||"HEAD"===s.type?statusText="nocontent":304===status?statusText="notmodified":(statusText=response.state,success=response.data,error=response.error,isSuccess=!error)):(
// Extract error from statusText and normalize for non-aborts
error=statusText,!status&&statusText||(statusText="error",status<0&&(status=0))),
// Set data for the fake xhr object
jqXHR.status=status,jqXHR.statusText=(nativeStatusText||statusText)+"",
// Success/Error
isSuccess?deferred.resolveWith(callbackContext,[success,statusText,jqXHR]):deferred.rejectWith(callbackContext,[jqXHR,statusText,error]),
// Status-dependent callbacks
jqXHR.statusCode(statusCode),statusCode=void 0,fireGlobals&&globalEventContext.trigger(isSuccess?"ajaxSuccess":"ajaxError",[jqXHR,s,isSuccess?success:error]),
// Complete
completeDeferred.fireWith(callbackContext,[jqXHR,statusText]),fireGlobals&&(globalEventContext.trigger("ajaxComplete",[jqXHR,s]),
// Handle the global AJAX counter
--jQuery.active||jQuery.event.trigger("ajaxStop")))}
// If url is an object, simulate pre-1.5 signature
"object"==typeof url&&(options=url,url=void 0),
// Force options to be an object
options=options||{};var transport,
// URL without anti-cache param
cacheURL,
// Response headers
responseHeadersString,responseHeaders,
// timeout handle
timeoutTimer,
// Url cleanup var
urlAnchor,
// Request state (becomes false upon send and true upon completion)
completed,
// To know if global events are to be dispatched
fireGlobals,
// Loop variable
i,
// uncached part of the url
uncached,
// Create the final options object
s=jQuery.ajaxSetup({},options),
// Callbacks context
callbackContext=s.context||s,
// Context for global events is callbackContext if it is a DOM node or jQuery collection
globalEventContext=s.context&&(callbackContext.nodeType||callbackContext.jquery)?jQuery(callbackContext):jQuery.event,
// Deferreds
deferred=jQuery.Deferred(),completeDeferred=jQuery.Callbacks("once memory"),
// Status-dependent callbacks
statusCode=s.statusCode||{},
// Headers (they are sent all at once)
requestHeaders={},requestHeadersNames={},
// Default abort message
strAbort="canceled",
// Fake xhr
jqXHR={readyState:0,
// Builds headers hashtable if needed
getResponseHeader:function(key){var match;if(completed){if(!responseHeaders)for(responseHeaders={};match=rheaders.exec(responseHeadersString);)responseHeaders[match[1].toLowerCase()]=match[2];match=responseHeaders[key.toLowerCase()]}return null==match?null:match},
// Raw string
getAllResponseHeaders:function(){return completed?responseHeadersString:null},
// Caches the header
setRequestHeader:function(name,value){return null==completed&&(name=requestHeadersNames[name.toLowerCase()]=requestHeadersNames[name.toLowerCase()]||name,requestHeaders[name]=value),this},
// Overrides response content-type header
overrideMimeType:function(type){return null==completed&&(s.mimeType=type),this},
// Status-dependent callbacks
statusCode:function(map){var code;if(map)if(completed)
// Execute the appropriate callbacks
jqXHR.always(map[jqXHR.status]);else
// Lazy-add the new callbacks in a way that preserves old ones
for(code in map)statusCode[code]=[statusCode[code],map[code]];return this},
// Cancel the request
abort:function(statusText){var finalText=statusText||strAbort;return transport&&transport.abort(finalText),done(0,finalText),this}};
// A cross-domain request is in order when the origin doesn't match the current origin.
if(
// Attach deferreds
deferred.promise(jqXHR),
// Add protocol if not provided (prefilters might expect it)
// Handle falsy url in the settings object (#10093: consistency with old signature)
// We also use the url parameter if available
s.url=((url||s.url||location.href)+"").replace(rprotocol,location.protocol+"//"),
// Alias method option to type as per ticket #12004
s.type=options.method||options.type||s.method||s.type,
// Extract dataTypes list
s.dataTypes=(s.dataType||"*").toLowerCase().match(rnothtmlwhite)||[""],null==s.crossDomain){urlAnchor=document.createElement("a");
// Support: IE <=8 - 11, Edge 12 - 13
// IE throws exception on accessing the href property if url is malformed,
// e.g. http://example.com:80x/
try{urlAnchor.href=s.url,
// Support: IE <=8 - 11 only
// Anchor's host property isn't correctly set when s.url is relative
urlAnchor.href=urlAnchor.href,s.crossDomain=originAnchor.protocol+"//"+originAnchor.host!=urlAnchor.protocol+"//"+urlAnchor.host}catch(e){
// If there is an error parsing the URL, assume it is crossDomain,
// it can be rejected by the transport if it is invalid
s.crossDomain=!0}}
// If request was aborted inside a prefilter, stop there
if(
// Convert data if not already a string
s.data&&s.processData&&"string"!=typeof s.data&&(s.data=jQuery.param(s.data,s.traditional)),
// Apply prefilters
inspectPrefiltersOrTransports(prefilters,s,options,jqXHR),completed)return jqXHR;
// We can fire global events as of now if asked to
// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
fireGlobals=jQuery.event&&s.global,
// Watch for a new set of requests
fireGlobals&&0===jQuery.active++&&jQuery.event.trigger("ajaxStart"),
// Uppercase the type
s.type=s.type.toUpperCase(),
// Determine if request has content
s.hasContent=!rnoContent.test(s.type),
// Save the URL in case we're toying with the If-Modified-Since
// and/or If-None-Match header later on
// Remove hash to simplify url manipulation
cacheURL=s.url.replace(rhash,""),
// More options handling for requests with no content
s.hasContent?s.data&&s.processData&&0===(s.contentType||"").indexOf("application/x-www-form-urlencoded")&&(s.data=s.data.replace(r20,"+")):(
// Remember the hash so we can put it back
uncached=s.url.slice(cacheURL.length),
// If data is available, append data to url
s.data&&(cacheURL+=(rquery.test(cacheURL)?"&":"?")+s.data,
// #9682: remove data so that it's not used in an eventual retry
delete s.data),
// Add or update anti-cache param if needed
s.cache===!1&&(cacheURL=cacheURL.replace(rantiCache,"$1"),uncached=(rquery.test(cacheURL)?"&":"?")+"_="+nonce++ +uncached),
// Put hash and anti-cache on the URL that will be requested (gh-1732)
s.url=cacheURL+uncached),
// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
s.ifModified&&(jQuery.lastModified[cacheURL]&&jqXHR.setRequestHeader("If-Modified-Since",jQuery.lastModified[cacheURL]),jQuery.etag[cacheURL]&&jqXHR.setRequestHeader("If-None-Match",jQuery.etag[cacheURL])),
// Set the correct header, if data is being sent
(s.data&&s.hasContent&&s.contentType!==!1||options.contentType)&&jqXHR.setRequestHeader("Content-Type",s.contentType),
// Set the Accepts header for the server, depending on the dataType
jqXHR.setRequestHeader("Accept",s.dataTypes[0]&&s.accepts[s.dataTypes[0]]?s.accepts[s.dataTypes[0]]+("*"!==s.dataTypes[0]?", "+allTypes+"; q=0.01":""):s.accepts["*"]);
// Check for headers option
for(i in s.headers)jqXHR.setRequestHeader(i,s.headers[i]);
// Allow custom headers/mimetypes and early abort
if(s.beforeSend&&(s.beforeSend.call(callbackContext,jqXHR,s)===!1||completed))
// Abort if not done already and return
return jqXHR.abort();
// If no transport, we auto-abort
if(
// Aborting is no longer a cancellation
strAbort="abort",
// Install callbacks on deferreds
completeDeferred.add(s.complete),jqXHR.done(s.success),jqXHR.fail(s.error),
// Get transport
transport=inspectPrefiltersOrTransports(transports,s,options,jqXHR)){
// If request was aborted inside ajaxSend, stop there
if(jqXHR.readyState=1,
// Send global event
fireGlobals&&globalEventContext.trigger("ajaxSend",[jqXHR,s]),completed)return jqXHR;
// Timeout
s.async&&s.timeout>0&&(timeoutTimer=window.setTimeout(function(){jqXHR.abort("timeout")},s.timeout));try{completed=!1,transport.send(requestHeaders,done)}catch(e){
// Rethrow post-completion exceptions
if(completed)throw e;
// Propagate others as results
done(-1,e)}}else done(-1,"No Transport");return jqXHR},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json")},getScript:function(url,callback){return jQuery.get(url,void 0,callback,"script")}}),jQuery.each(["get","post"],function(i,method){jQuery[method]=function(url,data,callback,type){
// The url can be an options object (which then must have .url)
// Shift arguments if data argument was omitted
return jQuery.isFunction(data)&&(type=type||callback,callback=data,data=void 0),jQuery.ajax(jQuery.extend({url:url,type:method,dataType:type,data:data,success:callback},jQuery.isPlainObject(url)&&url))}}),jQuery._evalUrl=function(url){return jQuery.ajax({url:url,
// Make this explicit, since user can override this through ajaxSetup (#11264)
type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},jQuery.fn.extend({wrapAll:function(html){var wrap;
// The elements to wrap the target around
return this[0]&&(jQuery.isFunction(html)&&(html=html.call(this[0])),wrap=jQuery(html,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&wrap.insertBefore(this[0]),wrap.map(function(){for(var elem=this;elem.firstElementChild;)elem=elem.firstElementChild;return elem}).append(this)),this},wrapInner:function(html){return jQuery.isFunction(html)?this.each(function(i){jQuery(this).wrapInner(html.call(this,i))}):this.each(function(){var self=jQuery(this),contents=self.contents();contents.length?contents.wrapAll(html):self.append(html)})},wrap:function(html){var isFunction=jQuery.isFunction(html);return this.each(function(i){jQuery(this).wrapAll(isFunction?html.call(this,i):html)})},unwrap:function(selector){return this.parent(selector).not("body").each(function(){jQuery(this).replaceWith(this.childNodes)}),this}}),jQuery.expr.pseudos.hidden=function(elem){return!jQuery.expr.pseudos.visible(elem)},jQuery.expr.pseudos.visible=function(elem){return!!(elem.offsetWidth||elem.offsetHeight||elem.getClientRects().length)},jQuery.ajaxSettings.xhr=function(){try{return new window.XMLHttpRequest}catch(e){}};var xhrSuccessStatus={
// File protocol always yields status code 0, assume 200
0:200,
// Support: IE <=9 only
// #1450: sometimes IE returns 1223 when it should be 204
1223:204},xhrSupported=jQuery.ajaxSettings.xhr();support.cors=!!xhrSupported&&"withCredentials"in xhrSupported,support.ajax=xhrSupported=!!xhrSupported,jQuery.ajaxTransport(function(options){var callback,errorCallback;
// Cross domain only allowed if supported through XMLHttpRequest
if(support.cors||xhrSupported&&!options.crossDomain)return{send:function(headers,complete){var i,xhr=options.xhr();
// Apply custom fields if provided
if(xhr.open(options.type,options.url,options.async,options.username,options.password),options.xhrFields)for(i in options.xhrFields)xhr[i]=options.xhrFields[i];
// Override mime type if needed
options.mimeType&&xhr.overrideMimeType&&xhr.overrideMimeType(options.mimeType),
// X-Requested-With header
// For cross-domain requests, seeing as conditions for a preflight are
// akin to a jigsaw puzzle, we simply never set it to be sure.
// (it can always be set on a per-request basis or even using ajaxSetup)
// For same-domain requests, won't change header if already provided.
options.crossDomain||headers["X-Requested-With"]||(headers["X-Requested-With"]="XMLHttpRequest");
// Set headers
for(i in headers)xhr.setRequestHeader(i,headers[i]);
// Callback
callback=function(type){return function(){callback&&(callback=errorCallback=xhr.onload=xhr.onerror=xhr.onabort=xhr.onreadystatechange=null,"abort"===type?xhr.abort():"error"===type?
// Support: IE <=9 only
// On a manual native abort, IE9 throws
// errors on any property access that is not readyState
"number"!=typeof xhr.status?complete(0,"error"):complete(
// File: protocol always yields status 0; see #8605, #14207
xhr.status,xhr.statusText):complete(xhrSuccessStatus[xhr.status]||xhr.status,xhr.statusText,
// Support: IE <=9 only
// IE9 has no XHR2 but throws on binary (trac-11426)
// For XHR2 non-text, let the caller handle it (gh-2498)
"text"!==(xhr.responseType||"text")||"string"!=typeof xhr.responseText?{binary:xhr.response}:{text:xhr.responseText},xhr.getAllResponseHeaders()))}},
// Listen to events
xhr.onload=callback(),errorCallback=xhr.onerror=callback("error"),
// Support: IE 9 only
// Use onreadystatechange to replace onabort
// to handle uncaught aborts
void 0!==xhr.onabort?xhr.onabort=errorCallback:xhr.onreadystatechange=function(){
// Check readyState before timeout as it changes
4===xhr.readyState&&
// Allow onerror to be called first,
// but that will not handle a native abort
// Also, save errorCallback to a variable
// as xhr.onerror cannot be accessed
window.setTimeout(function(){callback&&errorCallback()})},
// Create the abort callback
callback=callback("abort");try{
// Do send the request (this may raise an exception)
xhr.send(options.hasContent&&options.data||null)}catch(e){
// #14683: Only rethrow if this hasn't been notified as an error yet
if(callback)throw e}},abort:function(){callback&&callback()}}}),
// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter(function(s){s.crossDomain&&(s.contents.script=!1)}),
// Install script dataType
jQuery.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(text){return jQuery.globalEval(text),text}}}),
// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter("script",function(s){void 0===s.cache&&(s.cache=!1),s.crossDomain&&(s.type="GET")}),
// Bind script tag hack transport
jQuery.ajaxTransport("script",function(s){
// This transport only deals with cross domain requests
if(s.crossDomain){var script,callback;return{send:function(_,complete){script=jQuery("<script>").prop({charset:s.scriptCharset,src:s.url}).on("load error",callback=function(evt){script.remove(),callback=null,evt&&complete("error"===evt.type?404:200,evt.type)}),
// Use native DOM manipulation to avoid our domManip AJAX trickery
document.head.appendChild(script[0])},abort:function(){callback&&callback()}}}});var oldCallbacks=[],rjsonp=/(=)\?(?=&|$)|\?\?/;
// Default jsonp settings
jQuery.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var callback=oldCallbacks.pop()||jQuery.expando+"_"+nonce++;return this[callback]=!0,callback}}),
// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter("json jsonp",function(s,originalSettings,jqXHR){var callbackName,overwritten,responseContainer,jsonProp=s.jsonp!==!1&&(rjsonp.test(s.url)?"url":"string"==typeof s.data&&0===(s.contentType||"").indexOf("application/x-www-form-urlencoded")&&rjsonp.test(s.data)&&"data");
// Handle iff the expected data type is "jsonp" or we have a parameter to set
if(jsonProp||"jsonp"===s.dataTypes[0])
// Delegate to script
// Get callback name, remembering preexisting value associated with it
// Insert callback into url or form data
// Use data converter to retrieve json after script execution
// Force json dataType
// Install callback
// Clean-up function (fires after converters)
return callbackName=s.jsonpCallback=jQuery.isFunction(s.jsonpCallback)?s.jsonpCallback():s.jsonpCallback,jsonProp?s[jsonProp]=s[jsonProp].replace(rjsonp,"$1"+callbackName):s.jsonp!==!1&&(s.url+=(rquery.test(s.url)?"&":"?")+s.jsonp+"="+callbackName),s.converters["script json"]=function(){return responseContainer||jQuery.error(callbackName+" was not called"),responseContainer[0]},s.dataTypes[0]="json",overwritten=window[callbackName],window[callbackName]=function(){responseContainer=arguments},jqXHR.always(function(){
// If previous value didn't exist - remove it
void 0===overwritten?jQuery(window).removeProp(callbackName):window[callbackName]=overwritten,
// Save back as free
s[callbackName]&&(
// Make sure that re-using the options doesn't screw things around
s.jsonpCallback=originalSettings.jsonpCallback,
// Save the callback name for future use
oldCallbacks.push(callbackName)),
// Call if it was a function and we have a response
responseContainer&&jQuery.isFunction(overwritten)&&overwritten(responseContainer[0]),responseContainer=overwritten=void 0}),"script"}),
// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument=function(){var body=document.implementation.createHTMLDocument("").body;return body.innerHTML="<form></form><form></form>",2===body.childNodes.length}(),
// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML=function(data,context,keepScripts){if("string"!=typeof data)return[];"boolean"==typeof context&&(keepScripts=context,context=!1);var base,parsed,scripts;
// Single tag
// Stop scripts or inline event handlers from being executed immediately
// by using document.implementation
// Set the base href for the created document
// so any parsed elements with URLs
// are based on the document's URL (gh-2965)
// Single tag
return context||(support.createHTMLDocument?(context=document.implementation.createHTMLDocument(""),base=context.createElement("base"),base.href=document.location.href,context.head.appendChild(base)):context=document),parsed=rsingleTag.exec(data),scripts=!keepScripts&&[],parsed?[context.createElement(parsed[1])]:(parsed=buildFragment([data],context,scripts),scripts&&scripts.length&&jQuery(scripts).remove(),jQuery.merge([],parsed.childNodes))},/**
 * Load a url into a page
 */
jQuery.fn.load=function(url,params,callback){var selector,type,response,self=this,off=url.indexOf(" ");
// If it's a function
// We assume that it's the callback
// If we have elements to modify, make the request
return off>-1&&(selector=stripAndCollapse(url.slice(off)),url=url.slice(0,off)),jQuery.isFunction(params)?(callback=params,params=void 0):params&&"object"==typeof params&&(type="POST"),self.length>0&&jQuery.ajax({url:url,
// If "type" variable is undefined, then "GET" method will be used.
// Make value of this field explicit since
// user can override it through ajaxSetup method
type:type||"GET",dataType:"html",data:params}).done(function(responseText){
// Save response for use in complete callback
response=arguments,self.html(selector?
// If a selector was specified, locate the right elements in a dummy div
// Exclude scripts to avoid IE 'Permission Denied' errors
jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector):
// Otherwise use the full result
responseText)}).always(callback&&function(jqXHR,status){self.each(function(){callback.apply(this,response||[jqXHR.responseText,status,jqXHR])})}),this},
// Attach a bunch of functions for handling common AJAX events
jQuery.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(i,type){jQuery.fn[type]=function(fn){return this.on(type,fn)}}),jQuery.expr.pseudos.animated=function(elem){return jQuery.grep(jQuery.timers,function(fn){return elem===fn.elem}).length},jQuery.offset={setOffset:function(elem,options,i){var curPosition,curLeft,curCSSTop,curTop,curOffset,curCSSLeft,calculatePosition,position=jQuery.css(elem,"position"),curElem=jQuery(elem),props={};
// Set position first, in-case top/left are set even on static elem
"static"===position&&(elem.style.position="relative"),curOffset=curElem.offset(),curCSSTop=jQuery.css(elem,"top"),curCSSLeft=jQuery.css(elem,"left"),calculatePosition=("absolute"===position||"fixed"===position)&&(curCSSTop+curCSSLeft).indexOf("auto")>-1,
// Need to be able to calculate position if either
// top or left is auto and position is either absolute or fixed
calculatePosition?(curPosition=curElem.position(),curTop=curPosition.top,curLeft=curPosition.left):(curTop=parseFloat(curCSSTop)||0,curLeft=parseFloat(curCSSLeft)||0),jQuery.isFunction(options)&&(
// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
options=options.call(elem,i,jQuery.extend({},curOffset))),null!=options.top&&(props.top=options.top-curOffset.top+curTop),null!=options.left&&(props.left=options.left-curOffset.left+curLeft),"using"in options?options.using.call(elem,props):curElem.css(props)}},jQuery.fn.extend({offset:function(options){
// Preserve chaining for setter
if(arguments.length)return void 0===options?this:this.each(function(i){jQuery.offset.setOffset(this,options,i)});var docElem,win,rect,doc,elem=this[0];if(elem)
// Support: IE <=11 only
// Running getBoundingClientRect on a
// disconnected node in IE throws an error
// Support: IE <=11 only
// Running getBoundingClientRect on a
// disconnected node in IE throws an error
// Make sure element is not hidden (display: none)
return elem.getClientRects().length?(rect=elem.getBoundingClientRect(),rect.width||rect.height?(doc=elem.ownerDocument,win=getWindow(doc),docElem=doc.documentElement,{top:rect.top+win.pageYOffset-docElem.clientTop,left:rect.left+win.pageXOffset-docElem.clientLeft}):rect):{top:0,left:0}},position:function(){if(this[0]){var offsetParent,offset,elem=this[0],parentOffset={top:0,left:0};
// Subtract parent offsets and element margins
// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
// because it is its only offset parent
// Assume getBoundingClientRect is there when computed position is fixed
// Get *real* offsetParent
// Get correct offsets
// Add offsetParent borders
return"fixed"===jQuery.css(elem,"position")?offset=elem.getBoundingClientRect():(offsetParent=this.offsetParent(),offset=this.offset(),jQuery.nodeName(offsetParent[0],"html")||(parentOffset=offsetParent.offset()),parentOffset={top:parentOffset.top+jQuery.css(offsetParent[0],"borderTopWidth",!0),left:parentOffset.left+jQuery.css(offsetParent[0],"borderLeftWidth",!0)}),{top:offset.top-parentOffset.top-jQuery.css(elem,"marginTop",!0),left:offset.left-parentOffset.left-jQuery.css(elem,"marginLeft",!0)}}},
// This method will return documentElement in the following cases:
// 1) For the element inside the iframe without offsetParent, this method will return
//    documentElement of the parent window
// 2) For the hidden or detached element
// 3) For body or html element, i.e. in case of the html node - it will return itself
//
// but those exceptions were never presented as a real life use-cases
// and might be considered as more preferable results.
//
// This logic, however, is not guaranteed and can change at any point in the future
offsetParent:function(){return this.map(function(){for(var offsetParent=this.offsetParent;offsetParent&&"static"===jQuery.css(offsetParent,"position");)offsetParent=offsetParent.offsetParent;return offsetParent||documentElement})}}),
// Create scrollLeft and scrollTop methods
jQuery.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(method,prop){var top="pageYOffset"===prop;jQuery.fn[method]=function(val){return access(this,function(elem,method,val){var win=getWindow(elem);return void 0===val?win?win[prop]:elem[method]:void(win?win.scrollTo(top?win.pageXOffset:val,top?val:win.pageYOffset):elem[method]=val)},method,val,arguments.length)}}),
// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each(["top","left"],function(i,prop){jQuery.cssHooks[prop]=addGetHookIf(support.pixelPosition,function(elem,computed){if(computed)
// If curCSS returns percentage, fallback to offset
return computed=curCSS(elem,prop),rnumnonpx.test(computed)?jQuery(elem).position()[prop]+"px":computed})}),
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each({Height:"height",Width:"width"},function(name,type){jQuery.each({padding:"inner"+name,content:type,"":"outer"+name},function(defaultExtra,funcName){
// Margin is only for outerHeight, outerWidth
jQuery.fn[funcName]=function(margin,value){var chainable=arguments.length&&(defaultExtra||"boolean"!=typeof margin),extra=defaultExtra||(margin===!0||value===!0?"margin":"border");return access(this,function(elem,type,value){var doc;
// Get document width or height
// Get width or height on the element, requesting but not forcing parseFloat
// Set width or height on the element
return jQuery.isWindow(elem)?0===funcName.indexOf("outer")?elem["inner"+name]:elem.document.documentElement["client"+name]:9===elem.nodeType?(doc=elem.documentElement,Math.max(elem.body["scroll"+name],doc["scroll"+name],elem.body["offset"+name],doc["offset"+name],doc["client"+name])):void 0===value?jQuery.css(elem,type,extra):jQuery.style(elem,type,value,extra)},type,chainable?margin:void 0,chainable)}})}),jQuery.fn.extend({bind:function(types,data,fn){return this.on(types,null,data,fn)},unbind:function(types,fn){return this.off(types,null,fn)},delegate:function(selector,types,data,fn){return this.on(types,selector,data,fn)},undelegate:function(selector,types,fn){
// ( namespace ) or ( selector, types [, fn] )
return 1===arguments.length?this.off(selector,"**"):this.off(types,selector||"**",fn)}}),jQuery.parseJSON=JSON.parse,
// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
"function"==typeof define&&define.amd&&define("jquery",[],function(){return jQuery});var
// Map over jQuery in case of overwrite
_jQuery=window.jQuery,
// Map over the $ in case of overwrite
_$=window.$;
// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
return jQuery.noConflict=function(deep){return window.$===jQuery&&(window.$=_$),deep&&window.jQuery===jQuery&&(window.jQuery=_jQuery),jQuery},noGlobal||(window.jQuery=window.$=jQuery),jQuery}),"undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function($){"use strict";var version=$.fn.jquery.split(" ")[0].split(".");if(version[0]<2&&version[1]<9||1==version[0]&&9==version[1]&&version[2]<1||version[0]>3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(jQuery),/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($){"use strict";
// CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
// ============================================================
function transitionEnd(){var el=document.createElement("bootstrap"),transEndEventNames={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var name in transEndEventNames)if(void 0!==el.style[name])return{end:transEndEventNames[name]};return!1}
// http://blog.alexmaccaw.com/css-transitions
$.fn.emulateTransitionEnd=function(duration){var called=!1,$el=this;$(this).one("bsTransitionEnd",function(){called=!0});var callback=function(){called||$($el).trigger($.support.transition.end)};return setTimeout(callback,duration),this},$(function(){$.support.transition=transitionEnd(),$.support.transition&&($.event.special.bsTransitionEnd={bindType:$.support.transition.end,delegateType:$.support.transition.end,handle:function(e){if($(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}})})}(jQuery),/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($){"use strict";
// ALERT PLUGIN DEFINITION
// =======================
function Plugin(option){return this.each(function(){var $this=$(this),data=$this.data("bs.alert");data||$this.data("bs.alert",data=new Alert(this)),"string"==typeof option&&data[option].call($this)})}
// ALERT CLASS DEFINITION
// ======================
var dismiss='[data-dismiss="alert"]',Alert=function(el){$(el).on("click",dismiss,this.close)};Alert.VERSION="3.3.7",Alert.TRANSITION_DURATION=150,Alert.prototype.close=function(e){function removeElement(){
// detach from parent, fire event then clean up data
$parent.detach().trigger("closed.bs.alert").remove()}var $this=$(this),selector=$this.attr("data-target");selector||(selector=$this.attr("href"),selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,""));var $parent=$("#"===selector?[]:selector);e&&e.preventDefault(),$parent.length||($parent=$this.closest(".alert")),$parent.trigger(e=$.Event("close.bs.alert")),e.isDefaultPrevented()||($parent.removeClass("in"),$.support.transition&&$parent.hasClass("fade")?$parent.one("bsTransitionEnd",removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION):removeElement())};var old=$.fn.alert;$.fn.alert=Plugin,$.fn.alert.Constructor=Alert,
// ALERT NO CONFLICT
// =================
$.fn.alert.noConflict=function(){return $.fn.alert=old,this},
// ALERT DATA-API
// ==============
$(document).on("click.bs.alert.data-api",dismiss,Alert.prototype.close)}(jQuery),/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($){"use strict";
// BUTTON PLUGIN DEFINITION
// ========================
function Plugin(option){return this.each(function(){var $this=$(this),data=$this.data("bs.button"),options="object"==typeof option&&option;data||$this.data("bs.button",data=new Button(this,options)),"toggle"==option?data.toggle():option&&data.setState(option)})}
// BUTTON PUBLIC CLASS DEFINITION
// ==============================
var Button=function(element,options){this.$element=$(element),this.options=$.extend({},Button.DEFAULTS,options),this.isLoading=!1};Button.VERSION="3.3.7",Button.DEFAULTS={loadingText:"loading..."},Button.prototype.setState=function(state){var d="disabled",$el=this.$element,val=$el.is("input")?"val":"html",data=$el.data();state+="Text",null==data.resetText&&$el.data("resetText",$el[val]()),
// push to event loop to allow forms to submit
setTimeout($.proxy(function(){$el[val](null==data[state]?this.options[state]:data[state]),"loadingText"==state?(this.isLoading=!0,$el.addClass(d).attr(d,d).prop(d,!0)):this.isLoading&&(this.isLoading=!1,$el.removeClass(d).removeAttr(d).prop(d,!1))},this),0)},Button.prototype.toggle=function(){var changed=!0,$parent=this.$element.closest('[data-toggle="buttons"]');if($parent.length){var $input=this.$element.find("input");"radio"==$input.prop("type")?($input.prop("checked")&&(changed=!1),$parent.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==$input.prop("type")&&($input.prop("checked")!==this.$element.hasClass("active")&&(changed=!1),this.$element.toggleClass("active")),$input.prop("checked",this.$element.hasClass("active")),changed&&$input.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var old=$.fn.button;$.fn.button=Plugin,$.fn.button.Constructor=Button,
// BUTTON NO CONFLICT
// ==================
$.fn.button.noConflict=function(){return $.fn.button=old,this},
// BUTTON DATA-API
// ===============
$(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(e){var $btn=$(e.target).closest(".btn");Plugin.call($btn,"toggle"),$(e.target).is('input[type="radio"], input[type="checkbox"]')||(
// Prevent double click on radios, and the double selections (so cancellation) on checkboxes
e.preventDefault(),
// The target component still receive the focus
$btn.is("input,button")?$btn.trigger("focus"):$btn.find("input:visible,button:visible").first().trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(e){$(e.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(e.type))})}(jQuery),/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($){"use strict";
// CAROUSEL PLUGIN DEFINITION
// ==========================
function Plugin(option){return this.each(function(){var $this=$(this),data=$this.data("bs.carousel"),options=$.extend({},Carousel.DEFAULTS,$this.data(),"object"==typeof option&&option),action="string"==typeof option?option:options.slide;data||$this.data("bs.carousel",data=new Carousel(this,options)),"number"==typeof option?data.to(option):action?data[action]():options.interval&&data.pause().cycle()})}
// CAROUSEL CLASS DEFINITION
// =========================
var Carousel=function(element,options){this.$element=$(element),this.$indicators=this.$element.find(".carousel-indicators"),this.options=options,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",$.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",$.proxy(this.pause,this)).on("mouseleave.bs.carousel",$.proxy(this.cycle,this))};Carousel.VERSION="3.3.7",Carousel.TRANSITION_DURATION=600,Carousel.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},Carousel.prototype.keydown=function(e){if(!/input|textarea/i.test(e.target.tagName)){switch(e.which){case 37:this.prev();break;case 39:this.next();break;default:return}e.preventDefault()}},Carousel.prototype.cycle=function(e){return e||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval($.proxy(this.next,this),this.options.interval)),this},Carousel.prototype.getItemIndex=function(item){return this.$items=item.parent().children(".item"),this.$items.index(item||this.$active)},Carousel.prototype.getItemForDirection=function(direction,active){var activeIndex=this.getItemIndex(active),willWrap="prev"==direction&&0===activeIndex||"next"==direction&&activeIndex==this.$items.length-1;if(willWrap&&!this.options.wrap)return active;var delta="prev"==direction?-1:1,itemIndex=(activeIndex+delta)%this.$items.length;return this.$items.eq(itemIndex)},Carousel.prototype.to=function(pos){var that=this,activeIndex=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(!(pos>this.$items.length-1||pos<0))// yes, "slid"
return this.sliding?this.$element.one("slid.bs.carousel",function(){that.to(pos)}):activeIndex==pos?this.pause().cycle():this.slide(pos>activeIndex?"next":"prev",this.$items.eq(pos))},Carousel.prototype.pause=function(e){return e||(this.paused=!0),this.$element.find(".next, .prev").length&&$.support.transition&&(this.$element.trigger($.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},Carousel.prototype.next=function(){if(!this.sliding)return this.slide("next")},Carousel.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},Carousel.prototype.slide=function(type,next){var $active=this.$element.find(".item.active"),$next=next||this.getItemForDirection(type,$active),isCycling=this.interval,direction="next"==type?"left":"right",that=this;if($next.hasClass("active"))return this.sliding=!1;var relatedTarget=$next[0],slideEvent=$.Event("slide.bs.carousel",{relatedTarget:relatedTarget,direction:direction});if(this.$element.trigger(slideEvent),!slideEvent.isDefaultPrevented()){if(this.sliding=!0,isCycling&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var $nextIndicator=$(this.$indicators.children()[this.getItemIndex($next)]);$nextIndicator&&$nextIndicator.addClass("active")}var slidEvent=$.Event("slid.bs.carousel",{relatedTarget:relatedTarget,direction:direction});// yes, "slid"
// force reflow
return $.support.transition&&this.$element.hasClass("slide")?($next.addClass(type),$next[0].offsetWidth,$active.addClass(direction),$next.addClass(direction),$active.one("bsTransitionEnd",function(){$next.removeClass([type,direction].join(" ")).addClass("active"),$active.removeClass(["active",direction].join(" ")),that.sliding=!1,setTimeout(function(){that.$element.trigger(slidEvent)},0)}).emulateTransitionEnd(Carousel.TRANSITION_DURATION)):($active.removeClass("active"),$next.addClass("active"),this.sliding=!1,this.$element.trigger(slidEvent)),isCycling&&this.cycle(),this}};var old=$.fn.carousel;$.fn.carousel=Plugin,$.fn.carousel.Constructor=Carousel,
// CAROUSEL NO CONFLICT
// ====================
$.fn.carousel.noConflict=function(){return $.fn.carousel=old,this};
// CAROUSEL DATA-API
// =================
var clickHandler=function(e){var href,$this=$(this),$target=$($this.attr("data-target")||(href=$this.attr("href"))&&href.replace(/.*(?=#[^\s]+$)/,""));// strip for ie7
if($target.hasClass("carousel")){var options=$.extend({},$target.data(),$this.data()),slideIndex=$this.attr("data-slide-to");slideIndex&&(options.interval=!1),Plugin.call($target,options),slideIndex&&$target.data("bs.carousel").to(slideIndex),e.preventDefault()}};$(document).on("click.bs.carousel.data-api","[data-slide]",clickHandler).on("click.bs.carousel.data-api","[data-slide-to]",clickHandler),$(window).on("load",function(){$('[data-ride="carousel"]').each(function(){var $carousel=$(this);Plugin.call($carousel,$carousel.data())})})}(jQuery),/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
/* jshint latedef: false */
+function($){"use strict";function getTargetFromTrigger($trigger){var href,target=$trigger.attr("data-target")||(href=$trigger.attr("href"))&&href.replace(/.*(?=#[^\s]+$)/,"");// strip for ie7
return $(target)}
// COLLAPSE PLUGIN DEFINITION
// ==========================
function Plugin(option){return this.each(function(){var $this=$(this),data=$this.data("bs.collapse"),options=$.extend({},Collapse.DEFAULTS,$this.data(),"object"==typeof option&&option);!data&&options.toggle&&/show|hide/.test(option)&&(options.toggle=!1),data||$this.data("bs.collapse",data=new Collapse(this,options)),"string"==typeof option&&data[option]()})}
// COLLAPSE PUBLIC CLASS DEFINITION
// ================================
var Collapse=function(element,options){this.$element=$(element),this.options=$.extend({},Collapse.DEFAULTS,options),this.$trigger=$('[data-toggle="collapse"][href="#'+element.id+'"],[data-toggle="collapse"][data-target="#'+element.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};Collapse.VERSION="3.3.7",Collapse.TRANSITION_DURATION=350,Collapse.DEFAULTS={toggle:!0},Collapse.prototype.dimension=function(){var hasWidth=this.$element.hasClass("width");return hasWidth?"width":"height"},Collapse.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var activesData,actives=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(actives&&actives.length&&(activesData=actives.data("bs.collapse"),activesData&&activesData.transitioning))){var startEvent=$.Event("show.bs.collapse");if(this.$element.trigger(startEvent),!startEvent.isDefaultPrevented()){actives&&actives.length&&(Plugin.call(actives,"hide"),activesData||actives.data("bs.collapse",null));var dimension=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[dimension](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var complete=function(){this.$element.removeClass("collapsing").addClass("collapse in")[dimension](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!$.support.transition)return complete.call(this);var scrollSize=$.camelCase(["scroll",dimension].join("-"));this.$element.one("bsTransitionEnd",$.proxy(complete,this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])}}}},Collapse.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var startEvent=$.Event("hide.bs.collapse");if(this.$element.trigger(startEvent),!startEvent.isDefaultPrevented()){var dimension=this.dimension();this.$element[dimension](this.$element[dimension]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var complete=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return $.support.transition?void this.$element[dimension](0).one("bsTransitionEnd",$.proxy(complete,this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION):complete.call(this)}}},Collapse.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},Collapse.prototype.getParent=function(){return $(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each($.proxy(function(i,element){var $element=$(element);this.addAriaAndCollapsedClass(getTargetFromTrigger($element),$element)},this)).end()},Collapse.prototype.addAriaAndCollapsedClass=function($element,$trigger){var isOpen=$element.hasClass("in");$element.attr("aria-expanded",isOpen),$trigger.toggleClass("collapsed",!isOpen).attr("aria-expanded",isOpen)};var old=$.fn.collapse;$.fn.collapse=Plugin,$.fn.collapse.Constructor=Collapse,
// COLLAPSE NO CONFLICT
// ====================
$.fn.collapse.noConflict=function(){return $.fn.collapse=old,this},
// COLLAPSE DATA-API
// =================
$(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(e){var $this=$(this);$this.attr("data-target")||e.preventDefault();var $target=getTargetFromTrigger($this),data=$target.data("bs.collapse"),option=data?"toggle":$this.data();Plugin.call($target,option)})}(jQuery),/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($){"use strict";function getParent($this){var selector=$this.attr("data-target");selector||(selector=$this.attr("href"),selector=selector&&/#[A-Za-z]/.test(selector)&&selector.replace(/.*(?=#[^\s]*$)/,""));var $parent=selector&&$(selector);return $parent&&$parent.length?$parent:$this.parent()}function clearMenus(e){e&&3===e.which||($(backdrop).remove(),$(toggle).each(function(){var $this=$(this),$parent=getParent($this),relatedTarget={relatedTarget:this};$parent.hasClass("open")&&(e&&"click"==e.type&&/input|textarea/i.test(e.target.tagName)&&$.contains($parent[0],e.target)||($parent.trigger(e=$.Event("hide.bs.dropdown",relatedTarget)),e.isDefaultPrevented()||($this.attr("aria-expanded","false"),$parent.removeClass("open").trigger($.Event("hidden.bs.dropdown",relatedTarget)))))}))}
// DROPDOWN PLUGIN DEFINITION
// ==========================
function Plugin(option){return this.each(function(){var $this=$(this),data=$this.data("bs.dropdown");data||$this.data("bs.dropdown",data=new Dropdown(this)),"string"==typeof option&&data[option].call($this)})}
// DROPDOWN CLASS DEFINITION
// =========================
var backdrop=".dropdown-backdrop",toggle='[data-toggle="dropdown"]',Dropdown=function(element){$(element).on("click.bs.dropdown",this.toggle)};Dropdown.VERSION="3.3.7",Dropdown.prototype.toggle=function(e){var $this=$(this);if(!$this.is(".disabled, :disabled")){var $parent=getParent($this),isActive=$parent.hasClass("open");if(clearMenus(),!isActive){"ontouchstart"in document.documentElement&&!$parent.closest(".navbar-nav").length&&
// if mobile we use a backdrop because click events don't delegate
$(document.createElement("div")).addClass("dropdown-backdrop").insertAfter($(this)).on("click",clearMenus);var relatedTarget={relatedTarget:this};if($parent.trigger(e=$.Event("show.bs.dropdown",relatedTarget)),e.isDefaultPrevented())return;$this.trigger("focus").attr("aria-expanded","true"),$parent.toggleClass("open").trigger($.Event("shown.bs.dropdown",relatedTarget))}return!1}},Dropdown.prototype.keydown=function(e){if(/(38|40|27|32)/.test(e.which)&&!/input|textarea/i.test(e.target.tagName)){var $this=$(this);if(e.preventDefault(),e.stopPropagation(),!$this.is(".disabled, :disabled")){var $parent=getParent($this),isActive=$parent.hasClass("open");if(!isActive&&27!=e.which||isActive&&27==e.which)return 27==e.which&&$parent.find(toggle).trigger("focus"),$this.trigger("click");var desc=" li:not(.disabled):visible a",$items=$parent.find(".dropdown-menu"+desc);if($items.length){var index=$items.index(e.target);38==e.which&&index>0&&index--,// up
40==e.which&&index<$items.length-1&&index++,// down
~index||(index=0),$items.eq(index).trigger("focus")}}}};var old=$.fn.dropdown;$.fn.dropdown=Plugin,$.fn.dropdown.Constructor=Dropdown,
// DROPDOWN NO CONFLICT
// ====================
$.fn.dropdown.noConflict=function(){return $.fn.dropdown=old,this},
// APPLY TO STANDARD DROPDOWN ELEMENTS
// ===================================
$(document).on("click.bs.dropdown.data-api",clearMenus).on("click.bs.dropdown.data-api",".dropdown form",function(e){e.stopPropagation()}).on("click.bs.dropdown.data-api",toggle,Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api",toggle,Dropdown.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",Dropdown.prototype.keydown)}(jQuery),/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($){"use strict";
// MODAL PLUGIN DEFINITION
// =======================
function Plugin(option,_relatedTarget){return this.each(function(){var $this=$(this),data=$this.data("bs.modal"),options=$.extend({},Modal.DEFAULTS,$this.data(),"object"==typeof option&&option);data||$this.data("bs.modal",data=new Modal(this,options)),"string"==typeof option?data[option](_relatedTarget):options.show&&data.show(_relatedTarget)})}
// MODAL CLASS DEFINITION
// ======================
var Modal=function(element,options){this.options=options,this.$body=$(document.body),this.$element=$(element),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,$.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};Modal.VERSION="3.3.7",Modal.TRANSITION_DURATION=300,Modal.BACKDROP_TRANSITION_DURATION=150,Modal.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},Modal.prototype.toggle=function(_relatedTarget){return this.isShown?this.hide():this.show(_relatedTarget)},Modal.prototype.show=function(_relatedTarget){var that=this,e=$.Event("show.bs.modal",{relatedTarget:_relatedTarget});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',$.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){that.$element.one("mouseup.dismiss.bs.modal",function(e){$(e.target).is(that.$element)&&(that.ignoreBackdropClick=!0)})}),this.backdrop(function(){var transition=$.support.transition&&that.$element.hasClass("fade");that.$element.parent().length||that.$element.appendTo(that.$body),that.$element.show().scrollTop(0),that.adjustDialog(),transition&&that.$element[0].offsetWidth,that.$element.addClass("in"),that.enforceFocus();var e=$.Event("shown.bs.modal",{relatedTarget:_relatedTarget});transition?that.$dialog.one("bsTransitionEnd",function(){that.$element.trigger("focus").trigger(e)}).emulateTransitionEnd(Modal.TRANSITION_DURATION):that.$element.trigger("focus").trigger(e)}))},Modal.prototype.hide=function(e){e&&e.preventDefault(),e=$.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),$(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),$.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",$.proxy(this.hideModal,this)).emulateTransitionEnd(Modal.TRANSITION_DURATION):this.hideModal())},Modal.prototype.enforceFocus=function(){$(document).off("focusin.bs.modal").on("focusin.bs.modal",$.proxy(function(e){document===e.target||this.$element[0]===e.target||this.$element.has(e.target).length||this.$element.trigger("focus")},this))},Modal.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",$.proxy(function(e){27==e.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},Modal.prototype.resize=function(){this.isShown?$(window).on("resize.bs.modal",$.proxy(this.handleUpdate,this)):$(window).off("resize.bs.modal")},Modal.prototype.hideModal=function(){var that=this;this.$element.hide(),this.backdrop(function(){that.$body.removeClass("modal-open"),that.resetAdjustments(),that.resetScrollbar(),that.$element.trigger("hidden.bs.modal")})},Modal.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},Modal.prototype.backdrop=function(callback){var that=this,animate=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var doAnimate=$.support.transition&&animate;if(this.$backdrop=$(document.createElement("div")).addClass("modal-backdrop "+animate).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",$.proxy(function(e){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(e.target===e.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),doAnimate&&this.$backdrop[0].offsetWidth,// force reflow
this.$backdrop.addClass("in"),!callback)return;doAnimate?this.$backdrop.one("bsTransitionEnd",callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callback()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var callbackRemove=function(){that.removeBackdrop(),callback&&callback()};$.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callbackRemove()}else callback&&callback()},
// these following methods are used to handle overflowing modals
Modal.prototype.handleUpdate=function(){this.adjustDialog()},Modal.prototype.adjustDialog=function(){var modalIsOverflowing=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&modalIsOverflowing?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!modalIsOverflowing?this.scrollbarWidth:""})},Modal.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},Modal.prototype.checkScrollbar=function(){var fullWindowWidth=window.innerWidth;if(!fullWindowWidth){// workaround for missing window.innerWidth in IE8
var documentElementRect=document.documentElement.getBoundingClientRect();fullWindowWidth=documentElementRect.right-Math.abs(documentElementRect.left)}this.bodyIsOverflowing=document.body.clientWidth<fullWindowWidth,this.scrollbarWidth=this.measureScrollbar()},Modal.prototype.setScrollbar=function(){var bodyPad=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",bodyPad+this.scrollbarWidth)},Modal.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},Modal.prototype.measureScrollbar=function(){// thx walsh
var scrollDiv=document.createElement("div");scrollDiv.className="modal-scrollbar-measure",this.$body.append(scrollDiv);var scrollbarWidth=scrollDiv.offsetWidth-scrollDiv.clientWidth;return this.$body[0].removeChild(scrollDiv),scrollbarWidth};var old=$.fn.modal;$.fn.modal=Plugin,$.fn.modal.Constructor=Modal,
// MODAL NO CONFLICT
// =================
$.fn.modal.noConflict=function(){return $.fn.modal=old,this},
// MODAL DATA-API
// ==============
$(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(e){var $this=$(this),href=$this.attr("href"),$target=$($this.attr("data-target")||href&&href.replace(/.*(?=#[^\s]+$)/,"")),option=$target.data("bs.modal")?"toggle":$.extend({remote:!/#/.test(href)&&href},$target.data(),$this.data());$this.is("a")&&e.preventDefault(),$target.one("show.bs.modal",function(showEvent){showEvent.isDefaultPrevented()||// only register focus restorer if modal will actually get shown
$target.one("hidden.bs.modal",function(){$this.is(":visible")&&$this.trigger("focus")})}),Plugin.call($target,option,this)})}(jQuery),/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($){"use strict";
// TOOLTIP PLUGIN DEFINITION
// =========================
function Plugin(option){return this.each(function(){var $this=$(this),data=$this.data("bs.tooltip"),options="object"==typeof option&&option;!data&&/destroy|hide/.test(option)||(data||$this.data("bs.tooltip",data=new Tooltip(this,options)),"string"==typeof option&&data[option]())})}
// TOOLTIP PUBLIC CLASS DEFINITION
// ===============================
var Tooltip=function(element,options){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",element,options)};Tooltip.VERSION="3.3.7",Tooltip.TRANSITION_DURATION=150,Tooltip.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},Tooltip.prototype.init=function(type,element,options){if(this.enabled=!0,this.type=type,this.$element=$(element),this.options=this.getOptions(options),this.$viewport=this.options.viewport&&$($.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var triggers=this.options.trigger.split(" "),i=triggers.length;i--;){var trigger=triggers[i];if("click"==trigger)this.$element.on("click."+this.type,this.options.selector,$.proxy(this.toggle,this));else if("manual"!=trigger){var eventIn="hover"==trigger?"mouseenter":"focusin",eventOut="hover"==trigger?"mouseleave":"focusout";this.$element.on(eventIn+"."+this.type,this.options.selector,$.proxy(this.enter,this)),this.$element.on(eventOut+"."+this.type,this.options.selector,$.proxy(this.leave,this))}}this.options.selector?this._options=$.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},Tooltip.prototype.getDefaults=function(){return Tooltip.DEFAULTS},Tooltip.prototype.getOptions=function(options){return options=$.extend({},this.getDefaults(),this.$element.data(),options),options.delay&&"number"==typeof options.delay&&(options.delay={show:options.delay,hide:options.delay}),options},Tooltip.prototype.getDelegateOptions=function(){var options={},defaults=this.getDefaults();return this._options&&$.each(this._options,function(key,value){defaults[key]!=value&&(options[key]=value)}),options},Tooltip.prototype.enter=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data("bs."+this.type);return self||(self=new this.constructor(obj.currentTarget,this.getDelegateOptions()),$(obj.currentTarget).data("bs."+this.type,self)),obj instanceof $.Event&&(self.inState["focusin"==obj.type?"focus":"hover"]=!0),self.tip().hasClass("in")||"in"==self.hoverState?void(self.hoverState="in"):(clearTimeout(self.timeout),self.hoverState="in",self.options.delay&&self.options.delay.show?void(self.timeout=setTimeout(function(){"in"==self.hoverState&&self.show()},self.options.delay.show)):self.show())},Tooltip.prototype.isInStateTrue=function(){for(var key in this.inState)if(this.inState[key])return!0;return!1},Tooltip.prototype.leave=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data("bs."+this.type);if(self||(self=new this.constructor(obj.currentTarget,this.getDelegateOptions()),$(obj.currentTarget).data("bs."+this.type,self)),obj instanceof $.Event&&(self.inState["focusout"==obj.type?"focus":"hover"]=!1),!self.isInStateTrue())return clearTimeout(self.timeout),self.hoverState="out",self.options.delay&&self.options.delay.hide?void(self.timeout=setTimeout(function(){"out"==self.hoverState&&self.hide()},self.options.delay.hide)):self.hide()},Tooltip.prototype.show=function(){var e=$.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(e);var inDom=$.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(e.isDefaultPrevented()||!inDom)return;var that=this,$tip=this.tip(),tipId=this.getUID(this.type);this.setContent(),$tip.attr("id",tipId),this.$element.attr("aria-describedby",tipId),this.options.animation&&$tip.addClass("fade");var placement="function"==typeof this.options.placement?this.options.placement.call(this,$tip[0],this.$element[0]):this.options.placement,autoToken=/\s?auto?\s?/i,autoPlace=autoToken.test(placement);autoPlace&&(placement=placement.replace(autoToken,"")||"top"),$tip.detach().css({top:0,left:0,display:"block"}).addClass(placement).data("bs."+this.type,this),this.options.container?$tip.appendTo(this.options.container):$tip.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var pos=this.getPosition(),actualWidth=$tip[0].offsetWidth,actualHeight=$tip[0].offsetHeight;if(autoPlace){var orgPlacement=placement,viewportDim=this.getPosition(this.$viewport);placement="bottom"==placement&&pos.bottom+actualHeight>viewportDim.bottom?"top":"top"==placement&&pos.top-actualHeight<viewportDim.top?"bottom":"right"==placement&&pos.right+actualWidth>viewportDim.width?"left":"left"==placement&&pos.left-actualWidth<viewportDim.left?"right":placement,$tip.removeClass(orgPlacement).addClass(placement)}var calculatedOffset=this.getCalculatedOffset(placement,pos,actualWidth,actualHeight);this.applyPlacement(calculatedOffset,placement);var complete=function(){var prevHoverState=that.hoverState;that.$element.trigger("shown.bs."+that.type),that.hoverState=null,"out"==prevHoverState&&that.leave(that)};$.support.transition&&this.$tip.hasClass("fade")?$tip.one("bsTransitionEnd",complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION):complete()}},Tooltip.prototype.applyPlacement=function(offset,placement){var $tip=this.tip(),width=$tip[0].offsetWidth,height=$tip[0].offsetHeight,marginTop=parseInt($tip.css("margin-top"),10),marginLeft=parseInt($tip.css("margin-left"),10);
// we must check for NaN for ie 8/9
isNaN(marginTop)&&(marginTop=0),isNaN(marginLeft)&&(marginLeft=0),offset.top+=marginTop,offset.left+=marginLeft,
// $.fn.offset doesn't round pixel values
// so we use setOffset directly with our own function B-0
$.offset.setOffset($tip[0],$.extend({using:function(props){$tip.css({top:Math.round(props.top),left:Math.round(props.left)})}},offset),0),$tip.addClass("in");
// check to see if placing tip in new offset caused the tip to resize itself
var actualWidth=$tip[0].offsetWidth,actualHeight=$tip[0].offsetHeight;"top"==placement&&actualHeight!=height&&(offset.top=offset.top+height-actualHeight);var delta=this.getViewportAdjustedDelta(placement,offset,actualWidth,actualHeight);delta.left?offset.left+=delta.left:offset.top+=delta.top;var isVertical=/top|bottom/.test(placement),arrowDelta=isVertical?2*delta.left-width+actualWidth:2*delta.top-height+actualHeight,arrowOffsetPosition=isVertical?"offsetWidth":"offsetHeight";$tip.offset(offset),this.replaceArrow(arrowDelta,$tip[0][arrowOffsetPosition],isVertical)},Tooltip.prototype.replaceArrow=function(delta,dimension,isVertical){this.arrow().css(isVertical?"left":"top",50*(1-delta/dimension)+"%").css(isVertical?"top":"left","")},Tooltip.prototype.setContent=function(){var $tip=this.tip(),title=this.getTitle();$tip.find(".tooltip-inner")[this.options.html?"html":"text"](title),$tip.removeClass("fade in top bottom left right")},Tooltip.prototype.hide=function(callback){function complete(){"in"!=that.hoverState&&$tip.detach(),that.$element&&// TODO: Check whether guarding this code with this `if` is really necessary.
that.$element.removeAttr("aria-describedby").trigger("hidden.bs."+that.type),callback&&callback()}var that=this,$tip=$(this.$tip),e=$.Event("hide.bs."+this.type);if(this.$element.trigger(e),!e.isDefaultPrevented())return $tip.removeClass("in"),$.support.transition&&$tip.hasClass("fade")?$tip.one("bsTransitionEnd",complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION):complete(),this.hoverState=null,this},Tooltip.prototype.fixTitle=function(){var $e=this.$element;($e.attr("title")||"string"!=typeof $e.attr("data-original-title"))&&$e.attr("data-original-title",$e.attr("title")||"").attr("title","")},Tooltip.prototype.hasContent=function(){return this.getTitle()},Tooltip.prototype.getPosition=function($element){$element=$element||this.$element;var el=$element[0],isBody="BODY"==el.tagName,elRect=el.getBoundingClientRect();null==elRect.width&&(
// width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
elRect=$.extend({},elRect,{width:elRect.right-elRect.left,height:elRect.bottom-elRect.top}));var isSvg=window.SVGElement&&el instanceof window.SVGElement,elOffset=isBody?{top:0,left:0}:isSvg?null:$element.offset(),scroll={scroll:isBody?document.documentElement.scrollTop||document.body.scrollTop:$element.scrollTop()},outerDims=isBody?{width:$(window).width(),height:$(window).height()}:null;return $.extend({},elRect,scroll,outerDims,elOffset)},Tooltip.prototype.getCalculatedOffset=function(placement,pos,actualWidth,actualHeight){/* placement == 'right' */
return"bottom"==placement?{top:pos.top+pos.height,left:pos.left+pos.width/2-actualWidth/2}:"top"==placement?{top:pos.top-actualHeight,left:pos.left+pos.width/2-actualWidth/2}:"left"==placement?{top:pos.top+pos.height/2-actualHeight/2,left:pos.left-actualWidth}:{top:pos.top+pos.height/2-actualHeight/2,left:pos.left+pos.width}},Tooltip.prototype.getViewportAdjustedDelta=function(placement,pos,actualWidth,actualHeight){var delta={top:0,left:0};if(!this.$viewport)return delta;var viewportPadding=this.options.viewport&&this.options.viewport.padding||0,viewportDimensions=this.getPosition(this.$viewport);if(/right|left/.test(placement)){var topEdgeOffset=pos.top-viewportPadding-viewportDimensions.scroll,bottomEdgeOffset=pos.top+viewportPadding-viewportDimensions.scroll+actualHeight;topEdgeOffset<viewportDimensions.top?// top overflow
delta.top=viewportDimensions.top-topEdgeOffset:bottomEdgeOffset>viewportDimensions.top+viewportDimensions.height&&(// bottom overflow
delta.top=viewportDimensions.top+viewportDimensions.height-bottomEdgeOffset)}else{var leftEdgeOffset=pos.left-viewportPadding,rightEdgeOffset=pos.left+viewportPadding+actualWidth;leftEdgeOffset<viewportDimensions.left?// left overflow
delta.left=viewportDimensions.left-leftEdgeOffset:rightEdgeOffset>viewportDimensions.right&&(// right overflow
delta.left=viewportDimensions.left+viewportDimensions.width-rightEdgeOffset)}return delta},Tooltip.prototype.getTitle=function(){var title,$e=this.$element,o=this.options;return title=$e.attr("data-original-title")||("function"==typeof o.title?o.title.call($e[0]):o.title)},Tooltip.prototype.getUID=function(prefix){do prefix+=~~(1e6*Math.random());while(document.getElementById(prefix));return prefix},Tooltip.prototype.tip=function(){if(!this.$tip&&(this.$tip=$(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},Tooltip.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},Tooltip.prototype.enable=function(){this.enabled=!0},Tooltip.prototype.disable=function(){this.enabled=!1},Tooltip.prototype.toggleEnabled=function(){this.enabled=!this.enabled},Tooltip.prototype.toggle=function(e){var self=this;e&&(self=$(e.currentTarget).data("bs."+this.type),self||(self=new this.constructor(e.currentTarget,this.getDelegateOptions()),$(e.currentTarget).data("bs."+this.type,self))),e?(self.inState.click=!self.inState.click,self.isInStateTrue()?self.enter(self):self.leave(self)):self.tip().hasClass("in")?self.leave(self):self.enter(self)},Tooltip.prototype.destroy=function(){var that=this;clearTimeout(this.timeout),this.hide(function(){that.$element.off("."+that.type).removeData("bs."+that.type),that.$tip&&that.$tip.detach(),that.$tip=null,that.$arrow=null,that.$viewport=null,that.$element=null})};var old=$.fn.tooltip;$.fn.tooltip=Plugin,$.fn.tooltip.Constructor=Tooltip,
// TOOLTIP NO CONFLICT
// ===================
$.fn.tooltip.noConflict=function(){return $.fn.tooltip=old,this}}(jQuery),/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($){"use strict";
// POPOVER PLUGIN DEFINITION
// =========================
function Plugin(option){return this.each(function(){var $this=$(this),data=$this.data("bs.popover"),options="object"==typeof option&&option;!data&&/destroy|hide/.test(option)||(data||$this.data("bs.popover",data=new Popover(this,options)),"string"==typeof option&&data[option]())})}
// POPOVER PUBLIC CLASS DEFINITION
// ===============================
var Popover=function(element,options){this.init("popover",element,options)};if(!$.fn.tooltip)throw new Error("Popover requires tooltip.js");Popover.VERSION="3.3.7",Popover.DEFAULTS=$.extend({},$.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),
// NOTE: POPOVER EXTENDS tooltip.js
// ================================
Popover.prototype=$.extend({},$.fn.tooltip.Constructor.prototype),Popover.prototype.constructor=Popover,Popover.prototype.getDefaults=function(){return Popover.DEFAULTS},Popover.prototype.setContent=function(){var $tip=this.tip(),title=this.getTitle(),content=this.getContent();$tip.find(".popover-title")[this.options.html?"html":"text"](title),$tip.find(".popover-content").children().detach().end()[// we use append for html objects to maintain js events
this.options.html?"string"==typeof content?"html":"append":"text"](content),$tip.removeClass("fade top bottom left right in"),
// IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
// this manually by checking the contents.
$tip.find(".popover-title").html()||$tip.find(".popover-title").hide()},Popover.prototype.hasContent=function(){return this.getTitle()||this.getContent()},Popover.prototype.getContent=function(){var $e=this.$element,o=this.options;return $e.attr("data-content")||("function"==typeof o.content?o.content.call($e[0]):o.content)},Popover.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var old=$.fn.popover;$.fn.popover=Plugin,$.fn.popover.Constructor=Popover,
// POPOVER NO CONFLICT
// ===================
$.fn.popover.noConflict=function(){return $.fn.popover=old,this}}(jQuery),/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($){"use strict";
// SCROLLSPY CLASS DEFINITION
// ==========================
function ScrollSpy(element,options){this.$body=$(document.body),this.$scrollElement=$($(element).is(document.body)?window:element),this.options=$.extend({},ScrollSpy.DEFAULTS,options),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",$.proxy(this.process,this)),this.refresh(),this.process()}
// SCROLLSPY PLUGIN DEFINITION
// ===========================
function Plugin(option){return this.each(function(){var $this=$(this),data=$this.data("bs.scrollspy"),options="object"==typeof option&&option;data||$this.data("bs.scrollspy",data=new ScrollSpy(this,options)),"string"==typeof option&&data[option]()})}ScrollSpy.VERSION="3.3.7",ScrollSpy.DEFAULTS={offset:10},ScrollSpy.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},ScrollSpy.prototype.refresh=function(){var that=this,offsetMethod="offset",offsetBase=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),$.isWindow(this.$scrollElement[0])||(offsetMethod="position",offsetBase=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var $el=$(this),href=$el.data("target")||$el.attr("href"),$href=/^#./.test(href)&&$(href);return $href&&$href.length&&$href.is(":visible")&&[[$href[offsetMethod]().top+offsetBase,href]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){that.offsets.push(this[0]),that.targets.push(this[1])})},ScrollSpy.prototype.process=function(){var i,scrollTop=this.$scrollElement.scrollTop()+this.options.offset,scrollHeight=this.getScrollHeight(),maxScroll=this.options.offset+scrollHeight-this.$scrollElement.height(),offsets=this.offsets,targets=this.targets,activeTarget=this.activeTarget;if(this.scrollHeight!=scrollHeight&&this.refresh(),scrollTop>=maxScroll)return activeTarget!=(i=targets[targets.length-1])&&this.activate(i);if(activeTarget&&scrollTop<offsets[0])return this.activeTarget=null,this.clear();for(i=offsets.length;i--;)activeTarget!=targets[i]&&scrollTop>=offsets[i]&&(void 0===offsets[i+1]||scrollTop<offsets[i+1])&&this.activate(targets[i])},ScrollSpy.prototype.activate=function(target){this.activeTarget=target,this.clear();var selector=this.selector+'[data-target="'+target+'"],'+this.selector+'[href="'+target+'"]',active=$(selector).parents("li").addClass("active");active.parent(".dropdown-menu").length&&(active=active.closest("li.dropdown").addClass("active")),active.trigger("activate.bs.scrollspy")},ScrollSpy.prototype.clear=function(){$(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var old=$.fn.scrollspy;$.fn.scrollspy=Plugin,$.fn.scrollspy.Constructor=ScrollSpy,
// SCROLLSPY NO CONFLICT
// =====================
$.fn.scrollspy.noConflict=function(){return $.fn.scrollspy=old,this},
// SCROLLSPY DATA-API
// ==================
$(window).on("load.bs.scrollspy.data-api",function(){$('[data-spy="scroll"]').each(function(){var $spy=$(this);Plugin.call($spy,$spy.data())})})}(jQuery),/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($){"use strict";
// TAB PLUGIN DEFINITION
// =====================
function Plugin(option){return this.each(function(){var $this=$(this),data=$this.data("bs.tab");data||$this.data("bs.tab",data=new Tab(this)),"string"==typeof option&&data[option]()})}
// TAB CLASS DEFINITION
// ====================
var Tab=function(element){
// jscs:disable requireDollarBeforejQueryAssignment
this.element=$(element)};Tab.VERSION="3.3.7",Tab.TRANSITION_DURATION=150,Tab.prototype.show=function(){var $this=this.element,$ul=$this.closest("ul:not(.dropdown-menu)"),selector=$this.data("target");if(selector||(selector=$this.attr("href"),selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,"")),!$this.parent("li").hasClass("active")){var $previous=$ul.find(".active:last a"),hideEvent=$.Event("hide.bs.tab",{relatedTarget:$this[0]}),showEvent=$.Event("show.bs.tab",{relatedTarget:$previous[0]});if($previous.trigger(hideEvent),$this.trigger(showEvent),!showEvent.isDefaultPrevented()&&!hideEvent.isDefaultPrevented()){var $target=$(selector);this.activate($this.closest("li"),$ul),this.activate($target,$target.parent(),function(){$previous.trigger({type:"hidden.bs.tab",relatedTarget:$this[0]}),$this.trigger({type:"shown.bs.tab",relatedTarget:$previous[0]})})}}},Tab.prototype.activate=function(element,container,callback){function next(){$active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),element.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),transition?(element[0].offsetWidth,// reflow for transition
element.addClass("in")):element.removeClass("fade"),element.parent(".dropdown-menu").length&&element.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),callback&&callback()}var $active=container.find("> .active"),transition=callback&&$.support.transition&&($active.length&&$active.hasClass("fade")||!!container.find("> .fade").length);$active.length&&transition?$active.one("bsTransitionEnd",next).emulateTransitionEnd(Tab.TRANSITION_DURATION):next(),$active.removeClass("in")};var old=$.fn.tab;$.fn.tab=Plugin,$.fn.tab.Constructor=Tab,
// TAB NO CONFLICT
// ===============
$.fn.tab.noConflict=function(){return $.fn.tab=old,this};
// TAB DATA-API
// ============
var clickHandler=function(e){e.preventDefault(),Plugin.call($(this),"show")};$(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',clickHandler).on("click.bs.tab.data-api",'[data-toggle="pill"]',clickHandler)}(jQuery),/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($){"use strict";
// AFFIX PLUGIN DEFINITION
// =======================
function Plugin(option){return this.each(function(){var $this=$(this),data=$this.data("bs.affix"),options="object"==typeof option&&option;data||$this.data("bs.affix",data=new Affix(this,options)),"string"==typeof option&&data[option]()})}
// AFFIX CLASS DEFINITION
// ======================
var Affix=function(element,options){this.options=$.extend({},Affix.DEFAULTS,options),this.$target=$(this.options.target).on("scroll.bs.affix.data-api",$.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",$.proxy(this.checkPositionWithEventLoop,this)),this.$element=$(element),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};Affix.VERSION="3.3.7",Affix.RESET="affix affix-top affix-bottom",Affix.DEFAULTS={offset:0,target:window},Affix.prototype.getState=function(scrollHeight,height,offsetTop,offsetBottom){var scrollTop=this.$target.scrollTop(),position=this.$element.offset(),targetHeight=this.$target.height();if(null!=offsetTop&&"top"==this.affixed)return scrollTop<offsetTop&&"top";if("bottom"==this.affixed)return null!=offsetTop?!(scrollTop+this.unpin<=position.top)&&"bottom":!(scrollTop+targetHeight<=scrollHeight-offsetBottom)&&"bottom";var initializing=null==this.affixed,colliderTop=initializing?scrollTop:position.top,colliderHeight=initializing?targetHeight:height;return null!=offsetTop&&scrollTop<=offsetTop?"top":null!=offsetBottom&&colliderTop+colliderHeight>=scrollHeight-offsetBottom&&"bottom"},Affix.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(Affix.RESET).addClass("affix");var scrollTop=this.$target.scrollTop(),position=this.$element.offset();return this.pinnedOffset=position.top-scrollTop},Affix.prototype.checkPositionWithEventLoop=function(){setTimeout($.proxy(this.checkPosition,this),1)},Affix.prototype.checkPosition=function(){if(this.$element.is(":visible")){var height=this.$element.height(),offset=this.options.offset,offsetTop=offset.top,offsetBottom=offset.bottom,scrollHeight=Math.max($(document).height(),$(document.body).height());"object"!=typeof offset&&(offsetBottom=offsetTop=offset),"function"==typeof offsetTop&&(offsetTop=offset.top(this.$element)),"function"==typeof offsetBottom&&(offsetBottom=offset.bottom(this.$element));var affix=this.getState(scrollHeight,height,offsetTop,offsetBottom);if(this.affixed!=affix){null!=this.unpin&&this.$element.css("top","");var affixType="affix"+(affix?"-"+affix:""),e=$.Event(affixType+".bs.affix");if(this.$element.trigger(e),e.isDefaultPrevented())return;this.affixed=affix,this.unpin="bottom"==affix?this.getPinnedOffset():null,this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace("affix","affixed")+".bs.affix")}"bottom"==affix&&this.$element.offset({top:scrollHeight-height-offsetBottom})}};var old=$.fn.affix;$.fn.affix=Plugin,$.fn.affix.Constructor=Affix,
// AFFIX NO CONFLICT
// =================
$.fn.affix.noConflict=function(){return $.fn.affix=old,this},
// AFFIX DATA-API
// ==============
$(window).on("load",function(){$('[data-spy="affix"]').each(function(){var $spy=$(this),data=$spy.data();data.offset=data.offset||{},null!=data.offsetBottom&&(data.offset.bottom=data.offsetBottom),null!=data.offsetTop&&(data.offset.top=data.offsetTop),Plugin.call($spy,data)})})}(jQuery),function(){/*--------------------------------------------------------------------------*/
/**
   * The base implementation of `compareAscending` which compares values and
   * sorts them in ascending order without guaranteeing a stable sort.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {number} Returns the sort order indicator for `value`.
   */
function baseCompareAscending(value,other){if(value!==other){var valIsNull=null===value,valIsUndef=value===undefined,valIsReflexive=value===value,othIsNull=null===other,othIsUndef=other===undefined,othIsReflexive=other===other;if(value>other&&!othIsNull||!valIsReflexive||valIsNull&&!othIsUndef&&othIsReflexive||valIsUndef&&othIsReflexive)return 1;if(value<other&&!valIsNull||!othIsReflexive||othIsNull&&!valIsUndef&&valIsReflexive||othIsUndef&&valIsReflexive)return-1}return 0}/**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for callback shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {Function} predicate The function invoked per iteration.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
function baseFindIndex(array,predicate,fromRight){for(var length=array.length,index=fromRight?length:-1;fromRight?index--:++index<length;)if(predicate(array[index],index,array))return index;return-1}/**
   * The base implementation of `_.indexOf` without support for binary searches.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
function baseIndexOf(array,value,fromIndex){if(value!==value)return indexOfNaN(array,fromIndex);for(var index=fromIndex-1,length=array.length;++index<length;)if(array[index]===value)return index;return-1}/**
   * The base implementation of `_.isFunction` without support for environments
   * with incorrect `typeof` results.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   */
function baseIsFunction(value){
// Avoid a Chakra JIT bug in compatibility modes of IE 11.
// See https://github.com/jashkenas/underscore/issues/1621 for more details.
return"function"==typeof value||!1}/**
   * Converts `value` to a string if it's not one. An empty string is returned
   * for `null` or `undefined` values.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
function baseToString(value){return null==value?"":value+""}/**
   * Used by `_.trim` and `_.trimLeft` to get the index of the first character
   * of `string` that is not found in `chars`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @param {string} chars The characters to find.
   * @returns {number} Returns the index of the first character not found in `chars`.
   */
function charsLeftIndex(string,chars){for(var index=-1,length=string.length;++index<length&&chars.indexOf(string.charAt(index))>-1;);return index}/**
   * Used by `_.trim` and `_.trimRight` to get the index of the last character
   * of `string` that is not found in `chars`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @param {string} chars The characters to find.
   * @returns {number} Returns the index of the last character not found in `chars`.
   */
function charsRightIndex(string,chars){for(var index=string.length;index--&&chars.indexOf(string.charAt(index))>-1;);return index}/**
   * Used by `_.sortBy` to compare transformed elements of a collection and stable
   * sort them in ascending order.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @returns {number} Returns the sort order indicator for `object`.
   */
function compareAscending(object,other){return baseCompareAscending(object.criteria,other.criteria)||object.index-other.index}/**
   * Used by `_.sortByOrder` to compare multiple properties of a value to another
   * and stable sort them.
   *
   * If `orders` is unspecified, all valuess are sorted in ascending order. Otherwise,
   * a value is sorted in ascending order if its corresponding order is "asc", and
   * descending if "desc".
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {boolean[]} orders The order to sort by for each property.
   * @returns {number} Returns the sort order indicator for `object`.
   */
function compareMultiple(object,other,orders){for(var index=-1,objCriteria=object.criteria,othCriteria=other.criteria,length=objCriteria.length,ordersLength=orders.length;++index<length;){var result=baseCompareAscending(objCriteria[index],othCriteria[index]);if(result){if(index>=ordersLength)return result;var order=orders[index];return result*("asc"===order||order===!0?1:-1)}}
// Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
// that causes it, under certain circumstances, to provide the same value for
// `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
// for more details.
//
// This also ensures a stable sort in V8 and other engines.
// See https://code.google.com/p/v8/issues/detail?id=90 for more details.
return object.index-other.index}/**
   * Used by `_.deburr` to convert latin-1 supplementary letters to basic latin letters.
   *
   * @private
   * @param {string} letter The matched letter to deburr.
   * @returns {string} Returns the deburred letter.
   */
function deburrLetter(letter){return deburredLetters[letter]}/**
   * Used by `_.escape` to convert characters to HTML entities.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
function escapeHtmlChar(chr){return htmlEscapes[chr]}/**
   * Used by `_.escapeRegExp` to escape characters for inclusion in compiled regexes.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @param {string} leadingChar The capture group for a leading character.
   * @param {string} whitespaceChar The capture group for a whitespace character.
   * @returns {string} Returns the escaped character.
   */
function escapeRegExpChar(chr,leadingChar,whitespaceChar){return leadingChar?chr=regexpEscapes[chr]:whitespaceChar&&(chr=stringEscapes[chr]),"\\"+chr}/**
   * Used by `_.template` to escape characters for inclusion in compiled string literals.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
function escapeStringChar(chr){return"\\"+stringEscapes[chr]}/**
   * Gets the index at which the first occurrence of `NaN` is found in `array`.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched `NaN`, else `-1`.
   */
function indexOfNaN(array,fromIndex,fromRight){for(var length=array.length,index=fromIndex+(fromRight?0:-1);fromRight?index--:++index<length;){var other=array[index];if(other!==other)return index}return-1}/**
   * Checks if `value` is object-like.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   */
function isObjectLike(value){return!!value&&"object"==typeof value}/**
   * Used by `trimmedLeftIndex` and `trimmedRightIndex` to determine if a
   * character code is whitespace.
   *
   * @private
   * @param {number} charCode The character code to inspect.
   * @returns {boolean} Returns `true` if `charCode` is whitespace, else `false`.
   */
function isSpace(charCode){return charCode<=160&&charCode>=9&&charCode<=13||32==charCode||160==charCode||5760==charCode||6158==charCode||charCode>=8192&&(charCode<=8202||8232==charCode||8233==charCode||8239==charCode||8287==charCode||12288==charCode||65279==charCode)}/**
   * Replaces all `placeholder` elements in `array` with an internal placeholder
   * and returns an array of their indexes.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {*} placeholder The placeholder to replace.
   * @returns {Array} Returns the new array of placeholder indexes.
   */
function replaceHolders(array,placeholder){for(var index=-1,length=array.length,resIndex=-1,result=[];++index<length;)array[index]===placeholder&&(array[index]=PLACEHOLDER,result[++resIndex]=index);return result}/**
   * An implementation of `_.uniq` optimized for sorted arrays without support
   * for callback shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} [iteratee] The function invoked per iteration.
   * @returns {Array} Returns the new duplicate free array.
   */
function sortedUniq(array,iteratee){for(var seen,index=-1,length=array.length,resIndex=-1,result=[];++index<length;){var value=array[index],computed=iteratee?iteratee(value,index,array):value;index&&seen===computed||(seen=computed,result[++resIndex]=value)}return result}/**
   * Used by `_.trim` and `_.trimLeft` to get the index of the first non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the first non-whitespace character.
   */
function trimmedLeftIndex(string){for(var index=-1,length=string.length;++index<length&&isSpace(string.charCodeAt(index)););return index}/**
   * Used by `_.trim` and `_.trimRight` to get the index of the last non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the last non-whitespace character.
   */
function trimmedRightIndex(string){for(var index=string.length;index--&&isSpace(string.charCodeAt(index)););return index}/**
   * Used by `_.unescape` to convert HTML entities to characters.
   *
   * @private
   * @param {string} chr The matched character to unescape.
   * @returns {string} Returns the unescaped character.
   */
function unescapeHtmlChar(chr){return htmlUnescapes[chr]}/*--------------------------------------------------------------------------*/
/**
   * Create a new pristine `lodash` function using the given `context` object.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {Object} [context=root] The context object.
   * @returns {Function} Returns a new `lodash` function.
   * @example
   *
   * _.mixin({ 'foo': _.constant('foo') });
   *
   * var lodash = _.runInContext();
   * lodash.mixin({ 'bar': lodash.constant('bar') });
   *
   * _.isFunction(_.foo);
   * // => true
   * _.isFunction(_.bar);
   * // => false
   *
   * lodash.isFunction(lodash.foo);
   * // => false
   * lodash.isFunction(lodash.bar);
   * // => true
   *
   * // using `context` to mock `Date#getTime` use in `_.now`
   * var mock = _.runInContext({
   *   'Date': function() {
   *     return { 'getTime': getTimeMock };
   *   }
   * });
   *
   * // or creating a suped-up `defer` in Node.js
   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
   */
function runInContext(context){/*------------------------------------------------------------------------*/
/**
     * Creates a `lodash` object which wraps `value` to enable implicit chaining.
     * Methods that operate on and return arrays, collections, and functions can
     * be chained together. Methods that retrieve a single value or may return a
     * primitive value will automatically end the chain returning the unwrapped
     * value. Explicit chaining may be enabled using `_.chain`. The execution of
     * chained methods is lazy, that is, execution is deferred until `_#value`
     * is implicitly or explicitly called.
     *
     * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
     * fusion is an optimization strategy which merge iteratee calls; this can help
     * to avoid the creation of intermediate data structures and greatly reduce the
     * number of iteratee executions.
     *
     * Chaining is supported in custom builds as long as the `_#value` method is
     * directly or indirectly included in the build.
     *
     * In addition to lodash methods, wrappers have `Array` and `String` methods.
     *
     * The wrapper `Array` methods are:
     * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`,
     * `splice`, and `unshift`
     *
     * The wrapper `String` methods are:
     * `replace` and `split`
     *
     * The wrapper methods that support shortcut fusion are:
     * `compact`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `filter`,
     * `first`, `initial`, `last`, `map`, `pluck`, `reject`, `rest`, `reverse`,
     * `slice`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `toArray`,
     * and `where`
     *
     * The chainable wrapper methods are:
     * `after`, `ary`, `assign`, `at`, `before`, `bind`, `bindAll`, `bindKey`,
     * `callback`, `chain`, `chunk`, `commit`, `compact`, `concat`, `constant`,
     * `countBy`, `create`, `curry`, `debounce`, `defaults`, `defaultsDeep`,
     * `defer`, `delay`, `difference`, `drop`, `dropRight`, `dropRightWhile`,
     * `dropWhile`, `fill`, `filter`, `flatten`, `flattenDeep`, `flow`, `flowRight`,
     * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
     * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
     * `invoke`, `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`,
     * `matchesProperty`, `memoize`, `merge`, `method`, `methodOf`, `mixin`,
     * `modArgs`, `negate`, `omit`, `once`, `pairs`, `partial`, `partialRight`,
     * `partition`, `pick`, `plant`, `pluck`, `property`, `propertyOf`, `pull`,
     * `pullAt`, `push`, `range`, `rearg`, `reject`, `remove`, `rest`, `restParam`,
     * `reverse`, `set`, `shuffle`, `slice`, `sort`, `sortBy`, `sortByAll`,
     * `sortByOrder`, `splice`, `spread`, `take`, `takeRight`, `takeRightWhile`,
     * `takeWhile`, `tap`, `throttle`, `thru`, `times`, `toArray`, `toPlainObject`,
     * `transform`, `union`, `uniq`, `unshift`, `unzip`, `unzipWith`, `values`,
     * `valuesIn`, `where`, `without`, `wrap`, `xor`, `zip`, `zipObject`, `zipWith`
     *
     * The wrapper methods that are **not** chainable by default are:
     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clone`, `cloneDeep`,
     * `deburr`, `endsWith`, `escape`, `escapeRegExp`, `every`, `find`, `findIndex`,
     * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `findWhere`, `first`,
     * `floor`, `get`, `gt`, `gte`, `has`, `identity`, `includes`, `indexOf`,
     * `inRange`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
     * `isEmpty`, `isEqual`, `isError`, `isFinite` `isFunction`, `isMatch`,
     * `isNative`, `isNaN`, `isNull`, `isNumber`, `isObject`, `isPlainObject`,
     * `isRegExp`, `isString`, `isUndefined`, `isTypedArray`, `join`, `kebabCase`,
     * `last`, `lastIndexOf`, `lt`, `lte`, `max`, `min`, `noConflict`, `noop`,
     * `now`, `pad`, `padLeft`, `padRight`, `parseInt`, `pop`, `random`, `reduce`,
     * `reduceRight`, `repeat`, `result`, `round`, `runInContext`, `shift`, `size`,
     * `snakeCase`, `some`, `sortedIndex`, `sortedLastIndex`, `startCase`,
     * `startsWith`, `sum`, `template`, `trim`, `trimLeft`, `trimRight`, `trunc`,
     * `unescape`, `uniqueId`, `value`, and `words`
     *
     * The wrapper method `sample` will return a wrapped value when `n` is provided,
     * otherwise an unwrapped value is returned.
     *
     * @name _
     * @constructor
     * @category Chain
     * @param {*} value The value to wrap in a `lodash` instance.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var wrapped = _([1, 2, 3]);
     *
     * // returns an unwrapped value
     * wrapped.reduce(function(total, n) {
     *   return total + n;
     * });
     * // => 6
     *
     * // returns a wrapped value
     * var squares = wrapped.map(function(n) {
     *   return n * n;
     * });
     *
     * _.isArray(squares);
     * // => false
     *
     * _.isArray(squares.value());
     * // => true
     */
function lodash(value){if(isObjectLike(value)&&!isArray(value)&&!(value instanceof LazyWrapper)){if(value instanceof LodashWrapper)return value;if(hasOwnProperty.call(value,"__chain__")&&hasOwnProperty.call(value,"__wrapped__"))return wrapperClone(value)}return new LodashWrapper(value)}/**
     * The function whose prototype all chaining wrappers inherit from.
     *
     * @private
     */
function baseLodash(){}/**
     * The base constructor for creating `lodash` wrapper objects.
     *
     * @private
     * @param {*} value The value to wrap.
     * @param {boolean} [chainAll] Enable chaining for all wrapper methods.
     * @param {Array} [actions=[]] Actions to peform to resolve the unwrapped value.
     */
function LodashWrapper(value,chainAll,actions){this.__wrapped__=value,this.__actions__=actions||[],this.__chain__=!!chainAll}/*------------------------------------------------------------------------*/
/**
     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
     *
     * @private
     * @param {*} value The value to wrap.
     */
function LazyWrapper(value){this.__wrapped__=value,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=POSITIVE_INFINITY,this.__views__=[]}/**
     * Creates a clone of the lazy wrapper object.
     *
     * @private
     * @name clone
     * @memberOf LazyWrapper
     * @returns {Object} Returns the cloned `LazyWrapper` object.
     */
function lazyClone(){var result=new LazyWrapper(this.__wrapped__);return result.__actions__=arrayCopy(this.__actions__),result.__dir__=this.__dir__,result.__filtered__=this.__filtered__,result.__iteratees__=arrayCopy(this.__iteratees__),result.__takeCount__=this.__takeCount__,result.__views__=arrayCopy(this.__views__),result}/**
     * Reverses the direction of lazy iteration.
     *
     * @private
     * @name reverse
     * @memberOf LazyWrapper
     * @returns {Object} Returns the new reversed `LazyWrapper` object.
     */
function lazyReverse(){if(this.__filtered__){var result=new LazyWrapper(this);result.__dir__=-1,result.__filtered__=!0}else result=this.clone(),result.__dir__*=-1;return result}/**
     * Extracts the unwrapped value from its lazy wrapper.
     *
     * @private
     * @name value
     * @memberOf LazyWrapper
     * @returns {*} Returns the unwrapped value.
     */
function lazyValue(){var array=this.__wrapped__.value(),dir=this.__dir__,isArr=isArray(array),isRight=dir<0,arrLength=isArr?array.length:0,view=getView(0,arrLength,this.__views__),start=view.start,end=view.end,length=end-start,index=isRight?end:start-1,iteratees=this.__iteratees__,iterLength=iteratees.length,resIndex=0,takeCount=nativeMin(length,this.__takeCount__);if(!isArr||arrLength<LARGE_ARRAY_SIZE||arrLength==length&&takeCount==length)return baseWrapperValue(array,this.__actions__);var result=[];outer:for(;length--&&resIndex<takeCount;){index+=dir;for(var iterIndex=-1,value=array[index];++iterIndex<iterLength;){var data=iteratees[iterIndex],iteratee=data.iteratee,type=data.type,computed=iteratee(value);if(type==LAZY_MAP_FLAG)value=computed;else if(!computed){if(type==LAZY_FILTER_FLAG)continue outer;break outer}}result[resIndex++]=value}return result}/*------------------------------------------------------------------------*/
/**
     * Creates a cache object to store key/value pairs.
     *
     * @private
     * @static
     * @name Cache
     * @memberOf _.memoize
     */
function MapCache(){this.__data__={}}/**
     * Removes `key` and its value from the cache.
     *
     * @private
     * @name delete
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed successfully, else `false`.
     */
function mapDelete(key){return this.has(key)&&delete this.__data__[key]}/**
     * Gets the cached value for `key`.
     *
     * @private
     * @name get
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the cached value.
     */
function mapGet(key){return"__proto__"==key?undefined:this.__data__[key]}/**
     * Checks if a cached value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
function mapHas(key){return"__proto__"!=key&&hasOwnProperty.call(this.__data__,key)}/**
     * Sets `value` to `key` of the cache.
     *
     * @private
     * @name set
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the value to cache.
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache object.
     */
function mapSet(key,value){return"__proto__"!=key&&(this.__data__[key]=value),this}/*------------------------------------------------------------------------*/
/**
     *
     * Creates a cache object to store unique values.
     *
     * @private
     * @param {Array} [values] The values to cache.
     */
function SetCache(values){var length=values?values.length:0;for(this.data={hash:nativeCreate(null),set:new Set};length--;)this.push(values[length])}/**
     * Checks if `value` is in `cache` mimicking the return signature of
     * `_.indexOf` by returning `0` if the value is found, else `-1`.
     *
     * @private
     * @param {Object} cache The cache to search.
     * @param {*} value The value to search for.
     * @returns {number} Returns `0` if `value` is found, else `-1`.
     */
function cacheIndexOf(cache,value){var data=cache.data,result="string"==typeof value||isObject(value)?data.set.has(value):data.hash[value];return result?0:-1}/**
     * Adds `value` to the cache.
     *
     * @private
     * @name push
     * @memberOf SetCache
     * @param {*} value The value to cache.
     */
function cachePush(value){var data=this.data;"string"==typeof value||isObject(value)?data.set.add(value):data.hash[value]=!0}/*------------------------------------------------------------------------*/
/**
     * Creates a new array joining `array` with `other`.
     *
     * @private
     * @param {Array} array The array to join.
     * @param {Array} other The other array to join.
     * @returns {Array} Returns the new concatenated array.
     */
function arrayConcat(array,other){for(var index=-1,length=array.length,othIndex=-1,othLength=other.length,result=Array(length+othLength);++index<length;)result[index]=array[index];for(;++othIndex<othLength;)result[index++]=other[othIndex];return result}/**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
function arrayCopy(source,array){var index=-1,length=source.length;for(array||(array=Array(length));++index<length;)array[index]=source[index];return array}/**
     * A specialized version of `_.forEach` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
function arrayEach(array,iteratee){for(var index=-1,length=array.length;++index<length&&iteratee(array[index],index,array)!==!1;);return array}/**
     * A specialized version of `_.forEachRight` for arrays without support for
     * callback shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
function arrayEachRight(array,iteratee){for(var length=array.length;length--&&iteratee(array[length],length,array)!==!1;);return array}/**
     * A specialized version of `_.every` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`.
     */
function arrayEvery(array,predicate){for(var index=-1,length=array.length;++index<length;)if(!predicate(array[index],index,array))return!1;return!0}/**
     * A specialized version of `baseExtremum` for arrays which invokes `iteratee`
     * with one argument: (value).
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} comparator The function used to compare values.
     * @param {*} exValue The initial extremum value.
     * @returns {*} Returns the extremum value.
     */
function arrayExtremum(array,iteratee,comparator,exValue){for(var index=-1,length=array.length,computed=exValue,result=computed;++index<length;){var value=array[index],current=+iteratee(value);comparator(current,computed)&&(computed=current,result=value)}return result}/**
     * A specialized version of `_.filter` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
function arrayFilter(array,predicate){for(var index=-1,length=array.length,resIndex=-1,result=[];++index<length;){var value=array[index];predicate(value,index,array)&&(result[++resIndex]=value)}return result}/**
     * A specialized version of `_.map` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
function arrayMap(array,iteratee){for(var index=-1,length=array.length,result=Array(length);++index<length;)result[index]=iteratee(array[index],index,array);return result}/**
     * Appends the elements of `values` to `array`.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to append.
     * @returns {Array} Returns `array`.
     */
function arrayPush(array,values){for(var index=-1,length=values.length,offset=array.length;++index<length;)array[offset+index]=values[index];return array}/**
     * A specialized version of `_.reduce` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {boolean} [initFromArray] Specify using the first element of `array`
     *  as the initial value.
     * @returns {*} Returns the accumulated value.
     */
function arrayReduce(array,iteratee,accumulator,initFromArray){var index=-1,length=array.length;for(initFromArray&&length&&(accumulator=array[++index]);++index<length;)accumulator=iteratee(accumulator,array[index],index,array);return accumulator}/**
     * A specialized version of `_.reduceRight` for arrays without support for
     * callback shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {boolean} [initFromArray] Specify using the last element of `array`
     *  as the initial value.
     * @returns {*} Returns the accumulated value.
     */
function arrayReduceRight(array,iteratee,accumulator,initFromArray){var length=array.length;for(initFromArray&&length&&(accumulator=array[--length]);length--;)accumulator=iteratee(accumulator,array[length],length,array);return accumulator}/**
     * A specialized version of `_.some` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
function arraySome(array,predicate){for(var index=-1,length=array.length;++index<length;)if(predicate(array[index],index,array))return!0;return!1}/**
     * A specialized version of `_.sum` for arrays without support for callback
     * shorthands and `this` binding..
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {number} Returns the sum.
     */
function arraySum(array,iteratee){for(var length=array.length,result=0;length--;)result+=+iteratee(array[length])||0;return result}/**
     * Used by `_.defaults` to customize its `_.assign` use.
     *
     * @private
     * @param {*} objectValue The destination object property value.
     * @param {*} sourceValue The source object property value.
     * @returns {*} Returns the value to assign to the destination object.
     */
function assignDefaults(objectValue,sourceValue){return objectValue===undefined?sourceValue:objectValue}/**
     * Used by `_.template` to customize its `_.assign` use.
     *
     * **Note:** This function is like `assignDefaults` except that it ignores
     * inherited property values when checking if a property is `undefined`.
     *
     * @private
     * @param {*} objectValue The destination object property value.
     * @param {*} sourceValue The source object property value.
     * @param {string} key The key associated with the object and source values.
     * @param {Object} object The destination object.
     * @returns {*} Returns the value to assign to the destination object.
     */
function assignOwnDefaults(objectValue,sourceValue,key,object){return objectValue!==undefined&&hasOwnProperty.call(object,key)?objectValue:sourceValue}/**
     * A specialized version of `_.assign` for customizing assigned values without
     * support for argument juggling, multiple sources, and `this` binding `customizer`
     * functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {Function} customizer The function to customize assigned values.
     * @returns {Object} Returns `object`.
     */
function assignWith(object,source,customizer){for(var index=-1,props=keys(source),length=props.length;++index<length;){var key=props[index],value=object[key],result=customizer(value,source[key],key,object,source);(result===result?result===value:value!==value)&&(value!==undefined||key in object)||(object[key]=result)}return object}/**
     * The base implementation of `_.assign` without support for argument juggling,
     * multiple sources, and `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
function baseAssign(object,source){return null==source?object:baseCopy(source,keys(source),object)}/**
     * The base implementation of `_.at` without support for string collections
     * and individual key arguments.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {number[]|string[]} props The property names or indexes of elements to pick.
     * @returns {Array} Returns the new array of picked elements.
     */
function baseAt(collection,props){for(var index=-1,isNil=null==collection,isArr=!isNil&&isArrayLike(collection),length=isArr?collection.length:0,propsLength=props.length,result=Array(propsLength);++index<propsLength;){var key=props[index];isArr?result[index]=isIndex(key,length)?collection[key]:undefined:result[index]=isNil?undefined:collection[key]}return result}/**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property names to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @returns {Object} Returns `object`.
     */
function baseCopy(source,props,object){object||(object={});for(var index=-1,length=props.length;++index<length;){var key=props[index];object[key]=source[key]}return object}/**
     * The base implementation of `_.callback` which supports specifying the
     * number of arguments to provide to `func`.
     *
     * @private
     * @param {*} [func=_.identity] The value to convert to a callback.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {number} [argCount] The number of arguments to provide to `func`.
     * @returns {Function} Returns the callback.
     */
function baseCallback(func,thisArg,argCount){var type=typeof func;return"function"==type?thisArg===undefined?func:bindCallback(func,thisArg,argCount):null==func?identity:"object"==type?baseMatches(func):thisArg===undefined?property(func):baseMatchesProperty(func,thisArg)}/**
     * The base implementation of `_.clone` without support for argument juggling
     * and `this` binding `customizer` functions.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @param {Function} [customizer] The function to customize cloning values.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The object `value` belongs to.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates clones with source counterparts.
     * @returns {*} Returns the cloned value.
     */
function baseClone(value,isDeep,customizer,key,object,stackA,stackB){var result;if(customizer&&(result=object?customizer(value,key,object):customizer(value)),result!==undefined)return result;if(!isObject(value))return value;var isArr=isArray(value);if(isArr){if(result=initCloneArray(value),!isDeep)return arrayCopy(value,result)}else{var tag=objToString.call(value),isFunc=tag==funcTag;if(tag!=objectTag&&tag!=argsTag&&(!isFunc||object))return cloneableTags[tag]?initCloneByTag(value,tag,isDeep):object?value:{};if(result=initCloneObject(isFunc?{}:value),!isDeep)return baseAssign(result,value)}
// Check for circular references and return its corresponding clone.
stackA||(stackA=[]),stackB||(stackB=[]);for(var length=stackA.length;length--;)if(stackA[length]==value)return stackB[length];
// Add the source value to the stack of traversed objects and associate it with its clone.
// Recursively populate clone (susceptible to call stack limits).
return stackA.push(value),stackB.push(result),(isArr?arrayEach:baseForOwn)(value,function(subValue,key){result[key]=baseClone(subValue,isDeep,customizer,key,value,stackA,stackB)}),result}/**
     * The base implementation of `_.delay` and `_.defer` which accepts an index
     * of where to slice the arguments to provide to `func`.
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {Object} args The arguments provide to `func`.
     * @returns {number} Returns the timer id.
     */
function baseDelay(func,wait,args){if("function"!=typeof func)throw new TypeError(FUNC_ERROR_TEXT);return setTimeout(function(){func.apply(undefined,args)},wait)}/**
     * The base implementation of `_.difference` which accepts a single array
     * of values to exclude.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Array} values The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     */
function baseDifference(array,values){var length=array?array.length:0,result=[];if(!length)return result;var index=-1,indexOf=getIndexOf(),isCommon=indexOf===baseIndexOf,cache=isCommon&&values.length>=LARGE_ARRAY_SIZE?createCache(values):null,valuesLength=values.length;cache&&(indexOf=cacheIndexOf,isCommon=!1,values=cache);outer:for(;++index<length;){var value=array[index];if(isCommon&&value===value){for(var valuesIndex=valuesLength;valuesIndex--;)if(values[valuesIndex]===value)continue outer;result.push(value)}else indexOf(values,value,0)<0&&result.push(value)}return result}/**
     * The base implementation of `_.every` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`
     */
function baseEvery(collection,predicate){var result=!0;return baseEach(collection,function(value,index,collection){return result=!!predicate(value,index,collection)}),result}/**
     * Gets the extremum value of `collection` invoking `iteratee` for each value
     * in `collection` to generate the criterion by which the value is ranked.
     * The `iteratee` is invoked with three arguments: (value, index|key, collection).
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} comparator The function used to compare values.
     * @param {*} exValue The initial extremum value.
     * @returns {*} Returns the extremum value.
     */
function baseExtremum(collection,iteratee,comparator,exValue){var computed=exValue,result=computed;return baseEach(collection,function(value,index,collection){var current=+iteratee(value,index,collection);(comparator(current,computed)||current===exValue&&current===result)&&(computed=current,result=value)}),result}/**
     * The base implementation of `_.fill` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     */
function baseFill(array,value,start,end){var length=array.length;for(start=null==start?0:+start||0,start<0&&(start=-start>length?0:length+start),end=end===undefined||end>length?length:+end||0,end<0&&(end+=length),length=start>end?0:end>>>0,start>>>=0;start<length;)array[start++]=value;return array}/**
     * The base implementation of `_.filter` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
function baseFilter(collection,predicate){var result=[];return baseEach(collection,function(value,index,collection){predicate(value,index,collection)&&result.push(value)}),result}/**
     * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
     * without support for callback shorthands and `this` binding, which iterates
     * over `collection` using the provided `eachFunc`.
     *
     * @private
     * @param {Array|Object|string} collection The collection to search.
     * @param {Function} predicate The function invoked per iteration.
     * @param {Function} eachFunc The function to iterate over `collection`.
     * @param {boolean} [retKey] Specify returning the key of the found element
     *  instead of the element itself.
     * @returns {*} Returns the found element or its key, else `undefined`.
     */
function baseFind(collection,predicate,eachFunc,retKey){var result;return eachFunc(collection,function(value,key,collection){if(predicate(value,key,collection))return result=retKey?key:value,!1}),result}/**
     * The base implementation of `_.flatten` with added support for restricting
     * flattening and specifying the start index.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {boolean} [isDeep] Specify a deep flatten.
     * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
     * @param {Array} [result=[]] The initial result value.
     * @returns {Array} Returns the new flattened array.
     */
function baseFlatten(array,isDeep,isStrict,result){result||(result=[]);for(var index=-1,length=array.length;++index<length;){var value=array[index];isObjectLike(value)&&isArrayLike(value)&&(isStrict||isArray(value)||isArguments(value))?isDeep?
// Recursively flatten arrays (susceptible to call stack limits).
baseFlatten(value,isDeep,isStrict,result):arrayPush(result,value):isStrict||(result[result.length]=value)}return result}/**
     * The base implementation of `_.forIn` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
function baseForIn(object,iteratee){return baseFor(object,iteratee,keysIn)}/**
     * The base implementation of `_.forOwn` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
function baseForOwn(object,iteratee){return baseFor(object,iteratee,keys)}/**
     * The base implementation of `_.forOwnRight` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
function baseForOwnRight(object,iteratee){return baseForRight(object,iteratee,keys)}/**
     * The base implementation of `_.functions` which creates an array of
     * `object` function property names filtered from those provided.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Array} props The property names to filter.
     * @returns {Array} Returns the new array of filtered property names.
     */
function baseFunctions(object,props){for(var index=-1,length=props.length,resIndex=-1,result=[];++index<length;){var key=props[index];isFunction(object[key])&&(result[++resIndex]=key)}return result}/**
     * The base implementation of `get` without support for string paths
     * and default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} path The path of the property to get.
     * @param {string} [pathKey] The key representation of path.
     * @returns {*} Returns the resolved value.
     */
function baseGet(object,path,pathKey){if(null!=object){pathKey!==undefined&&pathKey in toObject(object)&&(path=[pathKey]);for(var index=0,length=path.length;null!=object&&index<length;)object=object[path[index++]];return index&&index==length?object:undefined}}/**
     * The base implementation of `_.isEqual` without support for `this` binding
     * `customizer` functions.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize comparing values.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA] Tracks traversed `value` objects.
     * @param {Array} [stackB] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
function baseIsEqual(value,other,customizer,isLoose,stackA,stackB){return value===other||(null==value||null==other||!isObject(value)&&!isObjectLike(other)?value!==value&&other!==other:baseIsEqualDeep(value,other,baseIsEqual,customizer,isLoose,stackA,stackB))}/**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparing objects.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA=[]] Tracks traversed `value` objects.
     * @param {Array} [stackB=[]] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
function baseIsEqualDeep(object,other,equalFunc,customizer,isLoose,stackA,stackB){var objIsArr=isArray(object),othIsArr=isArray(other),objTag=arrayTag,othTag=arrayTag;objIsArr||(objTag=objToString.call(object),objTag==argsTag?objTag=objectTag:objTag!=objectTag&&(objIsArr=isTypedArray(object))),othIsArr||(othTag=objToString.call(other),othTag==argsTag?othTag=objectTag:othTag!=objectTag&&(othIsArr=isTypedArray(other)));var objIsObj=objTag==objectTag,othIsObj=othTag==objectTag,isSameTag=objTag==othTag;if(isSameTag&&!objIsArr&&!objIsObj)return equalByTag(object,other,objTag);if(!isLoose){var objIsWrapped=objIsObj&&hasOwnProperty.call(object,"__wrapped__"),othIsWrapped=othIsObj&&hasOwnProperty.call(other,"__wrapped__");if(objIsWrapped||othIsWrapped)return equalFunc(objIsWrapped?object.value():object,othIsWrapped?other.value():other,customizer,isLoose,stackA,stackB)}if(!isSameTag)return!1;
// Assume cyclic values are equal.
// For more information on detecting circular references see https://es5.github.io/#JO.
stackA||(stackA=[]),stackB||(stackB=[]);for(var length=stackA.length;length--;)if(stackA[length]==object)return stackB[length]==other;
// Add `object` and `other` to the stack of traversed objects.
stackA.push(object),stackB.push(other);var result=(objIsArr?equalArrays:equalObjects)(object,other,equalFunc,customizer,isLoose,stackA,stackB);return stackA.pop(),stackB.pop(),result}/**
     * The base implementation of `_.isMatch` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Array} matchData The propery names, values, and compare flags to match.
     * @param {Function} [customizer] The function to customize comparing objects.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     */
function baseIsMatch(object,matchData,customizer){var index=matchData.length,length=index,noCustomizer=!customizer;if(null==object)return!length;for(object=toObject(object);index--;){var data=matchData[index];if(noCustomizer&&data[2]?data[1]!==object[data[0]]:!(data[0]in object))return!1}for(;++index<length;){data=matchData[index];var key=data[0],objValue=object[key],srcValue=data[1];if(noCustomizer&&data[2]){if(objValue===undefined&&!(key in object))return!1}else{var result=customizer?customizer(objValue,srcValue,key):undefined;if(!(result===undefined?baseIsEqual(srcValue,objValue,customizer,!0):result))return!1}}return!0}/**
     * The base implementation of `_.map` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
function baseMap(collection,iteratee){var index=-1,result=isArrayLike(collection)?Array(collection.length):[];return baseEach(collection,function(value,key,collection){result[++index]=iteratee(value,key,collection)}),result}/**
     * The base implementation of `_.matches` which does not clone `source`.
     *
     * @private
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new function.
     */
function baseMatches(source){var matchData=getMatchData(source);if(1==matchData.length&&matchData[0][2]){var key=matchData[0][0],value=matchData[0][1];return function(object){return null!=object&&(object[key]===value&&(value!==undefined||key in toObject(object)))}}return function(object){return baseIsMatch(object,matchData)}}/**
     * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to compare.
     * @returns {Function} Returns the new function.
     */
function baseMatchesProperty(path,srcValue){var isArr=isArray(path),isCommon=isKey(path)&&isStrictComparable(srcValue),pathKey=path+"";return path=toPath(path),function(object){if(null==object)return!1;var key=pathKey;if(object=toObject(object),(isArr||!isCommon)&&!(key in object)){if(object=1==path.length?object:baseGet(object,baseSlice(path,0,-1)),null==object)return!1;key=last(path),object=toObject(object)}return object[key]===srcValue?srcValue!==undefined||key in object:baseIsEqual(srcValue,object[key],undefined,!0)}}/**
     * The base implementation of `_.merge` without support for argument juggling,
     * multiple sources, and `this` binding `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates values with source counterparts.
     * @returns {Object} Returns `object`.
     */
function baseMerge(object,source,customizer,stackA,stackB){if(!isObject(object))return object;var isSrcArr=isArrayLike(source)&&(isArray(source)||isTypedArray(source)),props=isSrcArr?undefined:keys(source);return arrayEach(props||source,function(srcValue,key){if(props&&(key=srcValue,srcValue=source[key]),isObjectLike(srcValue))stackA||(stackA=[]),stackB||(stackB=[]),baseMergeDeep(object,source,key,baseMerge,customizer,stackA,stackB);else{var value=object[key],result=customizer?customizer(value,srcValue,key,object,source):undefined,isCommon=result===undefined;isCommon&&(result=srcValue),result===undefined&&(!isSrcArr||key in object)||!isCommon&&(result===result?result===value:value!==value)||(object[key]=result)}}),object}/**
     * A specialized version of `baseMerge` for arrays and objects which performs
     * deep merges and tracks traversed objects enabling objects with circular
     * references to be merged.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {string} key The key of the value to merge.
     * @param {Function} mergeFunc The function to merge values.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates values with source counterparts.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
function baseMergeDeep(object,source,key,mergeFunc,customizer,stackA,stackB){for(var length=stackA.length,srcValue=source[key];length--;)if(stackA[length]==srcValue)return void(object[key]=stackB[length]);var value=object[key],result=customizer?customizer(value,srcValue,key,object,source):undefined,isCommon=result===undefined;isCommon&&(result=srcValue,isArrayLike(srcValue)&&(isArray(srcValue)||isTypedArray(srcValue))?result=isArray(value)?value:isArrayLike(value)?arrayCopy(value):[]:isPlainObject(srcValue)||isArguments(srcValue)?result=isArguments(value)?toPlainObject(value):isPlainObject(value)?value:{}:isCommon=!1),
// Add the source value to the stack of traversed objects and associate
// it with its merged value.
stackA.push(srcValue),stackB.push(result),isCommon?
// Recursively merge objects and arrays (susceptible to call stack limits).
object[key]=mergeFunc(result,srcValue,customizer,stackA,stackB):(result===result?result!==value:value===value)&&(object[key]=result)}/**
     * The base implementation of `_.property` without support for deep paths.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @returns {Function} Returns the new function.
     */
function baseProperty(key){return function(object){return null==object?undefined:object[key]}}/**
     * A specialized version of `baseProperty` which supports deep paths.
     *
     * @private
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new function.
     */
function basePropertyDeep(path){var pathKey=path+"";return path=toPath(path),function(object){return baseGet(object,path,pathKey)}}/**
     * The base implementation of `_.pullAt` without support for individual
     * index arguments and capturing the removed elements.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {number[]} indexes The indexes of elements to remove.
     * @returns {Array} Returns `array`.
     */
function basePullAt(array,indexes){for(var length=array?indexes.length:0;length--;){var index=indexes[length];if(index!=previous&&isIndex(index)){var previous=index;splice.call(array,index,1)}}return array}/**
     * The base implementation of `_.random` without support for argument juggling
     * and returning floating-point numbers.
     *
     * @private
     * @param {number} min The minimum possible value.
     * @param {number} max The maximum possible value.
     * @returns {number} Returns the random number.
     */
function baseRandom(min,max){return min+nativeFloor(nativeRandom()*(max-min+1))}/**
     * The base implementation of `_.reduce` and `_.reduceRight` without support
     * for callback shorthands and `this` binding, which iterates over `collection`
     * using the provided `eachFunc`.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} accumulator The initial value.
     * @param {boolean} initFromCollection Specify using the first or last element
     *  of `collection` as the initial value.
     * @param {Function} eachFunc The function to iterate over `collection`.
     * @returns {*} Returns the accumulated value.
     */
function baseReduce(collection,iteratee,accumulator,initFromCollection,eachFunc){return eachFunc(collection,function(value,index,collection){accumulator=initFromCollection?(initFromCollection=!1,value):iteratee(accumulator,value,index,collection)}),accumulator}/**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
function baseSlice(array,start,end){var index=-1,length=array.length;start=null==start?0:+start||0,start<0&&(start=-start>length?0:length+start),end=end===undefined||end>length?length:+end||0,end<0&&(end+=length),length=start>end?0:end-start>>>0,start>>>=0;for(var result=Array(length);++index<length;)result[index]=array[index+start];return result}/**
     * The base implementation of `_.some` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
function baseSome(collection,predicate){var result;return baseEach(collection,function(value,index,collection){return result=predicate(value,index,collection),!result}),!!result}/**
     * The base implementation of `_.sortBy` which uses `comparer` to define
     * the sort order of `array` and replaces criteria objects with their
     * corresponding values.
     *
     * @private
     * @param {Array} array The array to sort.
     * @param {Function} comparer The function to define sort order.
     * @returns {Array} Returns `array`.
     */
function baseSortBy(array,comparer){var length=array.length;for(array.sort(comparer);length--;)array[length]=array[length].value;return array}/**
     * The base implementation of `_.sortByOrder` without param guards.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
     * @param {boolean[]} orders The sort orders of `iteratees`.
     * @returns {Array} Returns the new sorted array.
     */
function baseSortByOrder(collection,iteratees,orders){var callback=getCallback(),index=-1;iteratees=arrayMap(iteratees,function(iteratee){return callback(iteratee)});var result=baseMap(collection,function(value){var criteria=arrayMap(iteratees,function(iteratee){return iteratee(value)});return{criteria:criteria,index:++index,value:value}});return baseSortBy(result,function(object,other){return compareMultiple(object,other,orders)})}/**
     * The base implementation of `_.sum` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {number} Returns the sum.
     */
function baseSum(collection,iteratee){var result=0;return baseEach(collection,function(value,index,collection){result+=+iteratee(value,index,collection)||0}),result}/**
     * The base implementation of `_.uniq` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The function invoked per iteration.
     * @returns {Array} Returns the new duplicate free array.
     */
function baseUniq(array,iteratee){var index=-1,indexOf=getIndexOf(),length=array.length,isCommon=indexOf===baseIndexOf,isLarge=isCommon&&length>=LARGE_ARRAY_SIZE,seen=isLarge?createCache():null,result=[];seen?(indexOf=cacheIndexOf,isCommon=!1):(isLarge=!1,seen=iteratee?[]:result);outer:for(;++index<length;){var value=array[index],computed=iteratee?iteratee(value,index,array):value;if(isCommon&&value===value){for(var seenIndex=seen.length;seenIndex--;)if(seen[seenIndex]===computed)continue outer;iteratee&&seen.push(computed),result.push(value)}else indexOf(seen,computed,0)<0&&((iteratee||isLarge)&&seen.push(computed),result.push(value))}return result}/**
     * The base implementation of `_.values` and `_.valuesIn` which creates an
     * array of `object` property values corresponding to the property names
     * of `props`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} props The property names to get values for.
     * @returns {Object} Returns the array of property values.
     */
function baseValues(object,props){for(var index=-1,length=props.length,result=Array(length);++index<length;)result[index]=object[props[index]];return result}/**
     * The base implementation of `_.dropRightWhile`, `_.dropWhile`, `_.takeRightWhile`,
     * and `_.takeWhile` without support for callback shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {Function} predicate The function invoked per iteration.
     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the slice of `array`.
     */
function baseWhile(array,predicate,isDrop,fromRight){for(var length=array.length,index=fromRight?length:-1;(fromRight?index--:++index<length)&&predicate(array[index],index,array););return isDrop?baseSlice(array,fromRight?0:index,fromRight?index+1:length):baseSlice(array,fromRight?index+1:0,fromRight?length:index)}/**
     * The base implementation of `wrapperValue` which returns the result of
     * performing a sequence of actions on the unwrapped `value`, where each
     * successive action is supplied the return value of the previous.
     *
     * @private
     * @param {*} value The unwrapped value.
     * @param {Array} actions Actions to peform to resolve the unwrapped value.
     * @returns {*} Returns the resolved value.
     */
function baseWrapperValue(value,actions){var result=value;result instanceof LazyWrapper&&(result=result.value());for(var index=-1,length=actions.length;++index<length;){var action=actions[index];result=action.func.apply(action.thisArg,arrayPush([result],action.args))}return result}/**
     * Performs a binary search of `array` to determine the index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
function binaryIndex(array,value,retHighest){var low=0,high=array?array.length:low;if("number"==typeof value&&value===value&&high<=HALF_MAX_ARRAY_LENGTH){for(;low<high;){var mid=low+high>>>1,computed=array[mid];(retHighest?computed<=value:computed<value)&&null!==computed?low=mid+1:high=mid}return high}return binaryIndexBy(array,value,identity,retHighest)}/**
     * This function is like `binaryIndex` except that it invokes `iteratee` for
     * `value` and each element of `array` to compute their sort ranking. The
     * iteratee is invoked with one argument; (value).
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
function binaryIndexBy(array,value,iteratee,retHighest){value=iteratee(value);for(var low=0,high=array?array.length:0,valIsNaN=value!==value,valIsNull=null===value,valIsUndef=value===undefined;low<high;){var mid=nativeFloor((low+high)/2),computed=iteratee(array[mid]),isDef=computed!==undefined,isReflexive=computed===computed;if(valIsNaN)var setLow=isReflexive||retHighest;else setLow=valIsNull?isReflexive&&isDef&&(retHighest||null!=computed):valIsUndef?isReflexive&&(retHighest||isDef):null!=computed&&(retHighest?computed<=value:computed<value);setLow?low=mid+1:high=mid}return nativeMin(high,MAX_ARRAY_INDEX)}/**
     * A specialized version of `baseCallback` which only supports `this` binding
     * and specifying the number of arguments to provide to `func`.
     *
     * @private
     * @param {Function} func The function to bind.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {number} [argCount] The number of arguments to provide to `func`.
     * @returns {Function} Returns the callback.
     */
function bindCallback(func,thisArg,argCount){if("function"!=typeof func)return identity;if(thisArg===undefined)return func;switch(argCount){case 1:return function(value){return func.call(thisArg,value)};case 3:return function(value,index,collection){return func.call(thisArg,value,index,collection)};case 4:return function(accumulator,value,index,collection){return func.call(thisArg,accumulator,value,index,collection)};case 5:return function(value,other,key,object,source){return func.call(thisArg,value,other,key,object,source)}}return function(){return func.apply(thisArg,arguments)}}/**
     * Creates a clone of the given array buffer.
     *
     * @private
     * @param {ArrayBuffer} buffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */
function bufferClone(buffer){var result=new ArrayBuffer(buffer.byteLength),view=new Uint8Array(result);return view.set(new Uint8Array(buffer)),result}/**
     * Creates an array that is the composition of partially applied arguments,
     * placeholders, and provided arguments into a single array of arguments.
     *
     * @private
     * @param {Array|Object} args The provided arguments.
     * @param {Array} partials The arguments to prepend to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @returns {Array} Returns the new array of composed arguments.
     */
function composeArgs(args,partials,holders){for(var holdersLength=holders.length,argsIndex=-1,argsLength=nativeMax(args.length-holdersLength,0),leftIndex=-1,leftLength=partials.length,result=Array(leftLength+argsLength);++leftIndex<leftLength;)result[leftIndex]=partials[leftIndex];for(;++argsIndex<holdersLength;)result[holders[argsIndex]]=args[argsIndex];for(;argsLength--;)result[leftIndex++]=args[argsIndex++];return result}/**
     * This function is like `composeArgs` except that the arguments composition
     * is tailored for `_.partialRight`.
     *
     * @private
     * @param {Array|Object} args The provided arguments.
     * @param {Array} partials The arguments to append to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @returns {Array} Returns the new array of composed arguments.
     */
function composeArgsRight(args,partials,holders){for(var holdersIndex=-1,holdersLength=holders.length,argsIndex=-1,argsLength=nativeMax(args.length-holdersLength,0),rightIndex=-1,rightLength=partials.length,result=Array(argsLength+rightLength);++argsIndex<argsLength;)result[argsIndex]=args[argsIndex];for(var offset=argsIndex;++rightIndex<rightLength;)result[offset+rightIndex]=partials[rightIndex];for(;++holdersIndex<holdersLength;)result[offset+holders[holdersIndex]]=args[argsIndex++];return result}/**
     * Creates a `_.countBy`, `_.groupBy`, `_.indexBy`, or `_.partition` function.
     *
     * @private
     * @param {Function} setter The function to set keys and values of the accumulator object.
     * @param {Function} [initializer] The function to initialize the accumulator object.
     * @returns {Function} Returns the new aggregator function.
     */
function createAggregator(setter,initializer){return function(collection,iteratee,thisArg){var result=initializer?initializer():{};if(iteratee=getCallback(iteratee,thisArg,3),isArray(collection))for(var index=-1,length=collection.length;++index<length;){var value=collection[index];setter(result,value,iteratee(value,index,collection),collection)}else baseEach(collection,function(value,key,collection){setter(result,value,iteratee(value,key,collection),collection)});return result}}/**
     * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */
function createAssigner(assigner){return restParam(function(object,sources){var index=-1,length=null==object?0:sources.length,customizer=length>2?sources[length-2]:undefined,guard=length>2?sources[2]:undefined,thisArg=length>1?sources[length-1]:undefined;for("function"==typeof customizer?(customizer=bindCallback(customizer,thisArg,5),length-=2):(customizer="function"==typeof thisArg?thisArg:undefined,length-=customizer?1:0),guard&&isIterateeCall(sources[0],sources[1],guard)&&(customizer=length<3?undefined:customizer,length=1);++index<length;){var source=sources[index];source&&assigner(object,source,customizer)}return object})}/**
     * Creates a `baseEach` or `baseEachRight` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
function createBaseEach(eachFunc,fromRight){return function(collection,iteratee){var length=collection?getLength(collection):0;if(!isLength(length))return eachFunc(collection,iteratee);for(var index=fromRight?length:-1,iterable=toObject(collection);(fromRight?index--:++index<length)&&iteratee(iterable[index],index,iterable)!==!1;);return collection}}/**
     * Creates a base function for `_.forIn` or `_.forInRight`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
function createBaseFor(fromRight){return function(object,iteratee,keysFunc){for(var iterable=toObject(object),props=keysFunc(object),length=props.length,index=fromRight?length:-1;fromRight?index--:++index<length;){var key=props[index];if(iteratee(iterable[key],key,iterable)===!1)break}return object}}/**
     * Creates a function that wraps `func` and invokes it with the `this`
     * binding of `thisArg`.
     *
     * @private
     * @param {Function} func The function to bind.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @returns {Function} Returns the new bound function.
     */
function createBindWrapper(func,thisArg){function wrapper(){var fn=this&&this!==root&&this instanceof wrapper?Ctor:func;return fn.apply(thisArg,arguments)}var Ctor=createCtorWrapper(func);return wrapper}/**
     * Creates a `Set` cache object to optimize linear searches of large arrays.
     *
     * @private
     * @param {Array} [values] The values to cache.
     * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
     */
function createCache(values){return nativeCreate&&Set?new SetCache(values):null}/**
     * Creates a function that produces compound words out of the words in a
     * given string.
     *
     * @private
     * @param {Function} callback The function to combine each word.
     * @returns {Function} Returns the new compounder function.
     */
function createCompounder(callback){return function(string){for(var index=-1,array=words(deburr(string)),length=array.length,result="";++index<length;)result=callback(result,array[index],index);return result}}/**
     * Creates a function that produces an instance of `Ctor` regardless of
     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
     *
     * @private
     * @param {Function} Ctor The constructor to wrap.
     * @returns {Function} Returns the new wrapped function.
     */
function createCtorWrapper(Ctor){return function(){
// Use a `switch` statement to work with class constructors.
// See http://ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
// for more details.
var args=arguments;switch(args.length){case 0:return new Ctor;case 1:return new Ctor(args[0]);case 2:return new Ctor(args[0],args[1]);case 3:return new Ctor(args[0],args[1],args[2]);case 4:return new Ctor(args[0],args[1],args[2],args[3]);case 5:return new Ctor(args[0],args[1],args[2],args[3],args[4]);case 6:return new Ctor(args[0],args[1],args[2],args[3],args[4],args[5]);case 7:return new Ctor(args[0],args[1],args[2],args[3],args[4],args[5],args[6])}var thisBinding=baseCreate(Ctor.prototype),result=Ctor.apply(thisBinding,args);
// Mimic the constructor's `return` behavior.
// See https://es5.github.io/#x13.2.2 for more details.
return isObject(result)?result:thisBinding}}/**
     * Creates a `_.curry` or `_.curryRight` function.
     *
     * @private
     * @param {boolean} flag The curry bit flag.
     * @returns {Function} Returns the new curry function.
     */
function createCurry(flag){function curryFunc(func,arity,guard){guard&&isIterateeCall(func,arity,guard)&&(arity=undefined);var result=createWrapper(func,flag,undefined,undefined,undefined,undefined,undefined,arity);return result.placeholder=curryFunc.placeholder,result}return curryFunc}/**
     * Creates a `_.defaults` or `_.defaultsDeep` function.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @param {Function} customizer The function to customize assigned values.
     * @returns {Function} Returns the new defaults function.
     */
function createDefaults(assigner,customizer){return restParam(function(args){var object=args[0];return null==object?object:(args.push(customizer),assigner.apply(undefined,args))})}/**
     * Creates a `_.max` or `_.min` function.
     *
     * @private
     * @param {Function} comparator The function used to compare values.
     * @param {*} exValue The initial extremum value.
     * @returns {Function} Returns the new extremum function.
     */
function createExtremum(comparator,exValue){return function(collection,iteratee,thisArg){if(thisArg&&isIterateeCall(collection,iteratee,thisArg)&&(iteratee=undefined),iteratee=getCallback(iteratee,thisArg,3),1==iteratee.length){collection=isArray(collection)?collection:toIterable(collection);var result=arrayExtremum(collection,iteratee,comparator,exValue);if(!collection.length||result!==exValue)return result}return baseExtremum(collection,iteratee,comparator,exValue)}}/**
     * Creates a `_.find` or `_.findLast` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new find function.
     */
function createFind(eachFunc,fromRight){return function(collection,predicate,thisArg){if(predicate=getCallback(predicate,thisArg,3),isArray(collection)){var index=baseFindIndex(collection,predicate,fromRight);return index>-1?collection[index]:undefined}return baseFind(collection,predicate,eachFunc)}}/**
     * Creates a `_.findIndex` or `_.findLastIndex` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new find function.
     */
function createFindIndex(fromRight){return function(array,predicate,thisArg){return array&&array.length?(predicate=getCallback(predicate,thisArg,3),baseFindIndex(array,predicate,fromRight)):-1}}/**
     * Creates a `_.findKey` or `_.findLastKey` function.
     *
     * @private
     * @param {Function} objectFunc The function to iterate over an object.
     * @returns {Function} Returns the new find function.
     */
function createFindKey(objectFunc){return function(object,predicate,thisArg){return predicate=getCallback(predicate,thisArg,3),baseFind(object,predicate,objectFunc,!0)}}/**
     * Creates a `_.flow` or `_.flowRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new flow function.
     */
function createFlow(fromRight){return function(){for(var wrapper,length=arguments.length,index=fromRight?length:-1,leftIndex=0,funcs=Array(length);fromRight?index--:++index<length;){var func=funcs[leftIndex++]=arguments[index];if("function"!=typeof func)throw new TypeError(FUNC_ERROR_TEXT);!wrapper&&LodashWrapper.prototype.thru&&"wrapper"==getFuncName(func)&&(wrapper=new LodashWrapper([],(!0)))}for(index=wrapper?-1:length;++index<length;){func=funcs[index];var funcName=getFuncName(func),data="wrapper"==funcName?getData(func):undefined;wrapper=data&&isLaziable(data[0])&&data[1]==(ARY_FLAG|CURRY_FLAG|PARTIAL_FLAG|REARG_FLAG)&&!data[4].length&&1==data[9]?wrapper[getFuncName(data[0])].apply(wrapper,data[3]):1==func.length&&isLaziable(func)?wrapper[funcName]():wrapper.thru(func)}return function(){var args=arguments,value=args[0];if(wrapper&&1==args.length&&isArray(value)&&value.length>=LARGE_ARRAY_SIZE)return wrapper.plant(value).value();for(var index=0,result=length?funcs[index].apply(this,args):value;++index<length;)result=funcs[index].call(this,result);return result}}}/**
     * Creates a function for `_.forEach` or `_.forEachRight`.
     *
     * @private
     * @param {Function} arrayFunc The function to iterate over an array.
     * @param {Function} eachFunc The function to iterate over a collection.
     * @returns {Function} Returns the new each function.
     */
function createForEach(arrayFunc,eachFunc){return function(collection,iteratee,thisArg){return"function"==typeof iteratee&&thisArg===undefined&&isArray(collection)?arrayFunc(collection,iteratee):eachFunc(collection,bindCallback(iteratee,thisArg,3))}}/**
     * Creates a function for `_.forIn` or `_.forInRight`.
     *
     * @private
     * @param {Function} objectFunc The function to iterate over an object.
     * @returns {Function} Returns the new each function.
     */
function createForIn(objectFunc){return function(object,iteratee,thisArg){return"function"==typeof iteratee&&thisArg===undefined||(iteratee=bindCallback(iteratee,thisArg,3)),objectFunc(object,iteratee,keysIn)}}/**
     * Creates a function for `_.forOwn` or `_.forOwnRight`.
     *
     * @private
     * @param {Function} objectFunc The function to iterate over an object.
     * @returns {Function} Returns the new each function.
     */
function createForOwn(objectFunc){return function(object,iteratee,thisArg){return"function"==typeof iteratee&&thisArg===undefined||(iteratee=bindCallback(iteratee,thisArg,3)),objectFunc(object,iteratee)}}/**
     * Creates a function for `_.mapKeys` or `_.mapValues`.
     *
     * @private
     * @param {boolean} [isMapKeys] Specify mapping keys instead of values.
     * @returns {Function} Returns the new map function.
     */
function createObjectMapper(isMapKeys){return function(object,iteratee,thisArg){var result={};return iteratee=getCallback(iteratee,thisArg,3),baseForOwn(object,function(value,key,object){var mapped=iteratee(value,key,object);key=isMapKeys?mapped:key,value=isMapKeys?value:mapped,result[key]=value}),result}}/**
     * Creates a function for `_.padLeft` or `_.padRight`.
     *
     * @private
     * @param {boolean} [fromRight] Specify padding from the right.
     * @returns {Function} Returns the new pad function.
     */
function createPadDir(fromRight){return function(string,length,chars){return string=baseToString(string),(fromRight?string:"")+createPadding(string,length,chars)+(fromRight?"":string)}}/**
     * Creates a `_.partial` or `_.partialRight` function.
     *
     * @private
     * @param {boolean} flag The partial bit flag.
     * @returns {Function} Returns the new partial function.
     */
function createPartial(flag){var partialFunc=restParam(function(func,partials){var holders=replaceHolders(partials,partialFunc.placeholder);return createWrapper(func,flag,undefined,partials,holders)});return partialFunc}/**
     * Creates a function for `_.reduce` or `_.reduceRight`.
     *
     * @private
     * @param {Function} arrayFunc The function to iterate over an array.
     * @param {Function} eachFunc The function to iterate over a collection.
     * @returns {Function} Returns the new each function.
     */
function createReduce(arrayFunc,eachFunc){return function(collection,iteratee,accumulator,thisArg){var initFromArray=arguments.length<3;return"function"==typeof iteratee&&thisArg===undefined&&isArray(collection)?arrayFunc(collection,iteratee,accumulator,initFromArray):baseReduce(collection,getCallback(iteratee,thisArg,4),accumulator,initFromArray,eachFunc)}}/**
     * Creates a function that wraps `func` and invokes it with optional `this`
     * binding of, partial application, and currying.
     *
     * @private
     * @param {Function|string} func The function or method name to reference.
     * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
function createHybridWrapper(func,bitmask,thisArg,partials,holders,partialsRight,holdersRight,argPos,ary,arity){function wrapper(){for(
// Avoid `arguments` object use disqualifying optimizations by
// converting it to an array before providing it to other functions.
var length=arguments.length,index=length,args=Array(length);index--;)args[index]=arguments[index];if(partials&&(args=composeArgs(args,partials,holders)),partialsRight&&(args=composeArgsRight(args,partialsRight,holdersRight)),isCurry||isCurryRight){var placeholder=wrapper.placeholder,argsHolders=replaceHolders(args,placeholder);if(length-=argsHolders.length,length<arity){var newArgPos=argPos?arrayCopy(argPos):undefined,newArity=nativeMax(arity-length,0),newsHolders=isCurry?argsHolders:undefined,newHoldersRight=isCurry?undefined:argsHolders,newPartials=isCurry?args:undefined,newPartialsRight=isCurry?undefined:args;bitmask|=isCurry?PARTIAL_FLAG:PARTIAL_RIGHT_FLAG,bitmask&=~(isCurry?PARTIAL_RIGHT_FLAG:PARTIAL_FLAG),isCurryBound||(bitmask&=~(BIND_FLAG|BIND_KEY_FLAG));var newData=[func,bitmask,thisArg,newPartials,newsHolders,newPartialsRight,newHoldersRight,newArgPos,ary,newArity],result=createHybridWrapper.apply(undefined,newData);return isLaziable(func)&&setData(result,newData),result.placeholder=placeholder,result}}var thisBinding=isBind?thisArg:this,fn=isBindKey?thisBinding[func]:func;return argPos&&(args=reorder(args,argPos)),isAry&&ary<args.length&&(args.length=ary),this&&this!==root&&this instanceof wrapper&&(fn=Ctor||createCtorWrapper(func)),fn.apply(thisBinding,args)}var isAry=bitmask&ARY_FLAG,isBind=bitmask&BIND_FLAG,isBindKey=bitmask&BIND_KEY_FLAG,isCurry=bitmask&CURRY_FLAG,isCurryBound=bitmask&CURRY_BOUND_FLAG,isCurryRight=bitmask&CURRY_RIGHT_FLAG,Ctor=isBindKey?undefined:createCtorWrapper(func);return wrapper}/**
     * Creates the padding required for `string` based on the given `length`.
     * The `chars` string is truncated if the number of characters exceeds `length`.
     *
     * @private
     * @param {string} string The string to create padding for.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the pad for `string`.
     */
function createPadding(string,length,chars){var strLength=string.length;if(length=+length,strLength>=length||!nativeIsFinite(length))return"";var padLength=length-strLength;return chars=null==chars?" ":chars+"",repeat(chars,nativeCeil(padLength/chars.length)).slice(0,padLength)}/**
     * Creates a function that wraps `func` and invokes it with the optional `this`
     * binding of `thisArg` and the `partials` prepended to those provided to
     * the wrapper.
     *
     * @private
     * @param {Function} func The function to partially apply arguments to.
     * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} partials The arguments to prepend to those provided to the new function.
     * @returns {Function} Returns the new bound function.
     */
function createPartialWrapper(func,bitmask,thisArg,partials){function wrapper(){for(
// Avoid `arguments` object use disqualifying optimizations by
// converting it to an array before providing it `func`.
var argsIndex=-1,argsLength=arguments.length,leftIndex=-1,leftLength=partials.length,args=Array(leftLength+argsLength);++leftIndex<leftLength;)args[leftIndex]=partials[leftIndex];for(;argsLength--;)args[leftIndex++]=arguments[++argsIndex];var fn=this&&this!==root&&this instanceof wrapper?Ctor:func;return fn.apply(isBind?thisArg:this,args)}var isBind=bitmask&BIND_FLAG,Ctor=createCtorWrapper(func);return wrapper}/**
     * Creates a `_.ceil`, `_.floor`, or `_.round` function.
     *
     * @private
     * @param {string} methodName The name of the `Math` method to use when rounding.
     * @returns {Function} Returns the new round function.
     */
function createRound(methodName){var func=Math[methodName];return function(number,precision){return precision=precision===undefined?0:+precision||0,precision?(precision=pow(10,precision),func(number*precision)/precision):func(number)}}/**
     * Creates a `_.sortedIndex` or `_.sortedLastIndex` function.
     *
     * @private
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {Function} Returns the new index function.
     */
function createSortedIndex(retHighest){return function(array,value,iteratee,thisArg){var callback=getCallback(iteratee);return null==iteratee&&callback===baseCallback?binaryIndex(array,value,retHighest):binaryIndexBy(array,value,callback(iteratee,thisArg,1),retHighest)}}/**
     * Creates a function that either curries or invokes `func` with optional
     * `this` binding and partially applied arguments.
     *
     * @private
     * @param {Function|string} func The function or method name to reference.
     * @param {number} bitmask The bitmask of flags.
     *  The bitmask may be composed of the following flags:
     *     1 - `_.bind`
     *     2 - `_.bindKey`
     *     4 - `_.curry` or `_.curryRight` of a bound function
     *     8 - `_.curry`
     *    16 - `_.curryRight`
     *    32 - `_.partial`
     *    64 - `_.partialRight`
     *   128 - `_.rearg`
     *   256 - `_.ary`
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to be partially applied.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
function createWrapper(func,bitmask,thisArg,partials,holders,argPos,ary,arity){var isBindKey=bitmask&BIND_KEY_FLAG;if(!isBindKey&&"function"!=typeof func)throw new TypeError(FUNC_ERROR_TEXT);var length=partials?partials.length:0;if(length||(bitmask&=~(PARTIAL_FLAG|PARTIAL_RIGHT_FLAG),partials=holders=undefined),length-=holders?holders.length:0,bitmask&PARTIAL_RIGHT_FLAG){var partialsRight=partials,holdersRight=holders;partials=holders=undefined}var data=isBindKey?undefined:getData(func),newData=[func,bitmask,thisArg,partials,holders,partialsRight,holdersRight,argPos,ary,arity];if(data&&(mergeData(newData,data),bitmask=newData[1],arity=newData[9]),newData[9]=null==arity?isBindKey?0:func.length:nativeMax(arity-length,0)||0,bitmask==BIND_FLAG)var result=createBindWrapper(newData[0],newData[2]);else result=bitmask!=PARTIAL_FLAG&&bitmask!=(BIND_FLAG|PARTIAL_FLAG)||newData[4].length?createHybridWrapper.apply(undefined,newData):createPartialWrapper.apply(undefined,newData);var setter=data?baseSetData:setData;return setter(result,newData)}/**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparing arrays.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA] Tracks traversed `value` objects.
     * @param {Array} [stackB] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */
function equalArrays(array,other,equalFunc,customizer,isLoose,stackA,stackB){var index=-1,arrLength=array.length,othLength=other.length;if(arrLength!=othLength&&!(isLoose&&othLength>arrLength))return!1;
// Ignore non-index properties.
for(;++index<arrLength;){var arrValue=array[index],othValue=other[index],result=customizer?customizer(isLoose?othValue:arrValue,isLoose?arrValue:othValue,index):undefined;if(result!==undefined){if(result)continue;return!1}
// Recursively compare arrays (susceptible to call stack limits).
if(isLoose){if(!arraySome(other,function(othValue){return arrValue===othValue||equalFunc(arrValue,othValue,customizer,isLoose,stackA,stackB)}))return!1}else if(arrValue!==othValue&&!equalFunc(arrValue,othValue,customizer,isLoose,stackA,stackB))return!1}return!0}/**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
function equalByTag(object,other,tag){switch(tag){case boolTag:case dateTag:
// Coerce dates and booleans to numbers, dates to milliseconds and booleans
// to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
return+object==+other;case errorTag:return object.name==other.name&&object.message==other.message;case numberTag:
// Treat `NaN` vs. `NaN` as equal.
return object!=+object?other!=+other:object==+other;case regexpTag:case stringTag:
// Coerce regexes to strings and treat strings primitives and string
// objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
return object==other+""}return!1}/**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparing values.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA] Tracks traversed `value` objects.
     * @param {Array} [stackB] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
function equalObjects(object,other,equalFunc,customizer,isLoose,stackA,stackB){var objProps=keys(object),objLength=objProps.length,othProps=keys(other),othLength=othProps.length;if(objLength!=othLength&&!isLoose)return!1;for(var index=objLength;index--;){var key=objProps[index];if(!(isLoose?key in other:hasOwnProperty.call(other,key)))return!1}for(var skipCtor=isLoose;++index<objLength;){key=objProps[index];var objValue=object[key],othValue=other[key],result=customizer?customizer(isLoose?othValue:objValue,isLoose?objValue:othValue,key):undefined;
// Recursively compare objects (susceptible to call stack limits).
if(!(result===undefined?equalFunc(objValue,othValue,customizer,isLoose,stackA,stackB):result))return!1;skipCtor||(skipCtor="constructor"==key)}if(!skipCtor){var objCtor=object.constructor,othCtor=other.constructor;
// Non `Object` object instances with different constructors are not equal.
if(objCtor!=othCtor&&"constructor"in object&&"constructor"in other&&!("function"==typeof objCtor&&objCtor instanceof objCtor&&"function"==typeof othCtor&&othCtor instanceof othCtor))return!1}return!0}/**
     * Gets the appropriate "callback" function. If the `_.callback` method is
     * customized this function returns the custom method, otherwise it returns
     * the `baseCallback` function. If arguments are provided the chosen function
     * is invoked with them and its result is returned.
     *
     * @private
     * @returns {Function} Returns the chosen function or its result.
     */
function getCallback(func,thisArg,argCount){var result=lodash.callback||callback;return result=result===callback?baseCallback:result,argCount?result(func,thisArg,argCount):result}/**
     * Gets the name of `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {string} Returns the function name.
     */
function getFuncName(func){for(var result=func.name+"",array=realNames[result],length=array?array.length:0;length--;){var data=array[length],otherFunc=data.func;if(null==otherFunc||otherFunc==func)return data.name}return result}/**
     * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
     * customized this function returns the custom method, otherwise it returns
     * the `baseIndexOf` function. If arguments are provided the chosen function
     * is invoked with them and its result is returned.
     *
     * @private
     * @returns {Function|number} Returns the chosen function or its result.
     */
function getIndexOf(collection,target,fromIndex){var result=lodash.indexOf||indexOf;return result=result===indexOf?baseIndexOf:result,collection?result(collection,target,fromIndex):result}/**
     * Gets the propery names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */
function getMatchData(object){for(var result=pairs(object),length=result.length;length--;)result[length][2]=isStrictComparable(result[length][1]);return result}/**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
function getNative(object,key){var value=null==object?undefined:object[key];return isNative(value)?value:undefined}/**
     * Gets the view, applying any `transforms` to the `start` and `end` positions.
     *
     * @private
     * @param {number} start The start of the view.
     * @param {number} end The end of the view.
     * @param {Array} transforms The transformations to apply to the view.
     * @returns {Object} Returns an object containing the `start` and `end`
     *  positions of the view.
     */
function getView(start,end,transforms){for(var index=-1,length=transforms.length;++index<length;){var data=transforms[index],size=data.size;switch(data.type){case"drop":start+=size;break;case"dropRight":end-=size;break;case"take":end=nativeMin(end,start+size);break;case"takeRight":start=nativeMax(start,end-size)}}return{start:start,end:end}}/**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */
function initCloneArray(array){var length=array.length,result=new array.constructor(length);
// Add array properties assigned by `RegExp#exec`.
return length&&"string"==typeof array[0]&&hasOwnProperty.call(array,"index")&&(result.index=array.index,result.input=array.input),result}/**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */
function initCloneObject(object){var Ctor=object.constructor;return"function"==typeof Ctor&&Ctor instanceof Ctor||(Ctor=Object),new Ctor}/**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */
function initCloneByTag(object,tag,isDeep){var Ctor=object.constructor;switch(tag){case arrayBufferTag:return bufferClone(object);case boolTag:case dateTag:return new Ctor((+object));case float32Tag:case float64Tag:case int8Tag:case int16Tag:case int32Tag:case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:var buffer=object.buffer;return new Ctor(isDeep?bufferClone(buffer):buffer,object.byteOffset,object.length);case numberTag:case stringTag:return new Ctor(object);case regexpTag:var result=new Ctor(object.source,reFlags.exec(object));result.lastIndex=object.lastIndex}return result}/**
     * Invokes the method at `path` on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {Array} args The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     */
function invokePath(object,path,args){null==object||isKey(path,object)||(path=toPath(path),object=1==path.length?object:baseGet(object,baseSlice(path,0,-1)),path=last(path));var func=null==object?object:object[path];return null==func?undefined:func.apply(object,args)}/**
     * Checks if `value` is array-like.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     */
function isArrayLike(value){return null!=value&&isLength(getLength(value))}/**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
function isIndex(value,length){return value="number"==typeof value||reIsUint.test(value)?+value:-1,length=null==length?MAX_SAFE_INTEGER:length,value>-1&&value%1==0&&value<length}/**
     * Checks if the provided arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
     */
function isIterateeCall(value,index,object){if(!isObject(object))return!1;var type=typeof index;if("number"==type?isArrayLike(object)&&isIndex(index,object.length):"string"==type&&index in object){var other=object[index];return value===value?value===other:other!==other}return!1}/**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */
function isKey(value,object){var type=typeof value;if("string"==type&&reIsPlainProp.test(value)||"number"==type)return!0;if(isArray(value))return!1;var result=!reIsDeepProp.test(value);return result||null!=object&&value in toObject(object)}/**
     * Checks if `func` has a lazy counterpart.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` has a lazy counterpart, else `false`.
     */
function isLaziable(func){var funcName=getFuncName(func),other=lodash[funcName];if("function"!=typeof other||!(funcName in LazyWrapper.prototype))return!1;if(func===other)return!0;var data=getData(other);return!!data&&func===data[0]}/**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     */
function isLength(value){return"number"==typeof value&&value>-1&&value%1==0&&value<=MAX_SAFE_INTEGER}/**
     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` if suitable for strict
     *  equality comparisons, else `false`.
     */
function isStrictComparable(value){return value===value&&!isObject(value)}/**
     * Merges the function metadata of `source` into `data`.
     *
     * Merging metadata reduces the number of wrappers required to invoke a function.
     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
     * may be applied regardless of execution order. Methods like `_.ary` and `_.rearg`
     * augment function arguments, making the order in which they are executed important,
     * preventing the merging of metadata. However, we make an exception for a safe
     * common case where curried functions have `_.ary` and or `_.rearg` applied.
     *
     * @private
     * @param {Array} data The destination metadata.
     * @param {Array} source The source metadata.
     * @returns {Array} Returns `data`.
     */
function mergeData(data,source){var bitmask=data[1],srcBitmask=source[1],newBitmask=bitmask|srcBitmask,isCommon=newBitmask<ARY_FLAG,isCombo=srcBitmask==ARY_FLAG&&bitmask==CURRY_FLAG||srcBitmask==ARY_FLAG&&bitmask==REARG_FLAG&&data[7].length<=source[8]||srcBitmask==(ARY_FLAG|REARG_FLAG)&&bitmask==CURRY_FLAG;
// Exit early if metadata can't be merged.
if(!isCommon&&!isCombo)return data;
// Use source `thisArg` if available.
srcBitmask&BIND_FLAG&&(data[2]=source[2],
// Set when currying a bound function.
newBitmask|=bitmask&BIND_FLAG?0:CURRY_BOUND_FLAG);
// Compose partial arguments.
var value=source[3];if(value){var partials=data[3];data[3]=partials?composeArgs(partials,value,source[4]):arrayCopy(value),data[4]=partials?replaceHolders(data[3],PLACEHOLDER):arrayCopy(source[4])}
// Compose partial right arguments.
// Use source `argPos` if available.
// Use source `ary` if it's smaller.
// Use source `arity` if one is not provided.
// Use source `func` and merge bitmasks.
return value=source[5],value&&(partials=data[5],data[5]=partials?composeArgsRight(partials,value,source[6]):arrayCopy(value),data[6]=partials?replaceHolders(data[5],PLACEHOLDER):arrayCopy(source[6])),value=source[7],value&&(data[7]=arrayCopy(value)),srcBitmask&ARY_FLAG&&(data[8]=null==data[8]?source[8]:nativeMin(data[8],source[8])),null==data[9]&&(data[9]=source[9]),data[0]=source[0],data[1]=newBitmask,data}/**
     * Used by `_.defaultsDeep` to customize its `_.merge` use.
     *
     * @private
     * @param {*} objectValue The destination object property value.
     * @param {*} sourceValue The source object property value.
     * @returns {*} Returns the value to assign to the destination object.
     */
function mergeDefaults(objectValue,sourceValue){return objectValue===undefined?sourceValue:merge(objectValue,sourceValue,mergeDefaults)}/**
     * A specialized version of `_.pick` which picks `object` properties specified
     * by `props`.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} props The property names to pick.
     * @returns {Object} Returns the new object.
     */
function pickByArray(object,props){object=toObject(object);for(var index=-1,length=props.length,result={};++index<length;){var key=props[index];key in object&&(result[key]=object[key])}return result}/**
     * A specialized version of `_.pick` which picks `object` properties `predicate`
     * returns truthy for.
     *
     * @private
     * @param {Object} object The source object.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Object} Returns the new object.
     */
function pickByCallback(object,predicate){var result={};return baseForIn(object,function(value,key,object){predicate(value,key,object)&&(result[key]=value)}),result}/**
     * Reorder `array` according to the specified indexes where the element at
     * the first index is assigned as the first element, the element at
     * the second index is assigned as the second element, and so on.
     *
     * @private
     * @param {Array} array The array to reorder.
     * @param {Array} indexes The arranged array indexes.
     * @returns {Array} Returns `array`.
     */
function reorder(array,indexes){for(var arrLength=array.length,length=nativeMin(indexes.length,arrLength),oldArray=arrayCopy(array);length--;){var index=indexes[length];array[length]=isIndex(index,arrLength)?oldArray[index]:undefined}return array}/**
     * A fallback implementation of `Object.keys` which creates an array of the
     * own enumerable property names of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
function shimKeys(object){for(var props=keysIn(object),propsLength=props.length,length=propsLength&&object.length,allowIndexes=!!length&&isLength(length)&&(isArray(object)||isArguments(object)),index=-1,result=[];++index<propsLength;){var key=props[index];(allowIndexes&&isIndex(key,length)||hasOwnProperty.call(object,key))&&result.push(key)}return result}/**
     * Converts `value` to an array-like object if it's not one.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {Array|Object} Returns the array-like object.
     */
function toIterable(value){return null==value?[]:isArrayLike(value)?isObject(value)?value:Object(value):values(value)}/**
     * Converts `value` to an object if it's not one.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {Object} Returns the object.
     */
function toObject(value){return isObject(value)?value:Object(value)}/**
     * Converts `value` to property path array if it's not one.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {Array} Returns the property path array.
     */
function toPath(value){if(isArray(value))return value;var result=[];return baseToString(value).replace(rePropName,function(match,number,quote,string){result.push(quote?string.replace(reEscapeChar,"$1"):number||match)}),result}/**
     * Creates a clone of `wrapper`.
     *
     * @private
     * @param {Object} wrapper The wrapper to clone.
     * @returns {Object} Returns the cloned wrapper.
     */
function wrapperClone(wrapper){return wrapper instanceof LazyWrapper?wrapper.clone():new LodashWrapper(wrapper.__wrapped__,wrapper.__chain__,arrayCopy(wrapper.__actions__))}/*------------------------------------------------------------------------*/
/**
     * Creates an array of elements split into groups the length of `size`.
     * If `collection` can't be split evenly, the final chunk will be the remaining
     * elements.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to process.
     * @param {number} [size=1] The length of each chunk.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the new array containing chunks.
     * @example
     *
     * _.chunk(['a', 'b', 'c', 'd'], 2);
     * // => [['a', 'b'], ['c', 'd']]
     *
     * _.chunk(['a', 'b', 'c', 'd'], 3);
     * // => [['a', 'b', 'c'], ['d']]
     */
function chunk(array,size,guard){size=(guard?isIterateeCall(array,size,guard):null==size)?1:nativeMax(nativeFloor(size)||1,1);for(var index=0,length=array?array.length:0,resIndex=-1,result=Array(nativeCeil(length/size));index<length;)result[++resIndex]=baseSlice(array,index,index+=size);return result}/**
     * Creates an array with all falsey values removed. The values `false`, `null`,
     * `0`, `""`, `undefined`, and `NaN` are falsey.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to compact.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     */
function compact(array){for(var index=-1,length=array?array.length:0,resIndex=-1,result=[];++index<length;){var value=array[index];value&&(result[++resIndex]=value)}return result}/**
     * Creates a slice of `array` with `n` elements dropped from the beginning.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.drop([1, 2, 3]);
     * // => [2, 3]
     *
     * _.drop([1, 2, 3], 2);
     * // => [3]
     *
     * _.drop([1, 2, 3], 5);
     * // => []
     *
     * _.drop([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
function drop(array,n,guard){var length=array?array.length:0;return length?((guard?isIterateeCall(array,n,guard):null==n)&&(n=1),baseSlice(array,n<0?0:n)):[]}/**
     * Creates a slice of `array` with `n` elements dropped from the end.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropRight([1, 2, 3]);
     * // => [1, 2]
     *
     * _.dropRight([1, 2, 3], 2);
     * // => [1]
     *
     * _.dropRight([1, 2, 3], 5);
     * // => []
     *
     * _.dropRight([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
function dropRight(array,n,guard){var length=array?array.length:0;return length?((guard?isIterateeCall(array,n,guard):null==n)&&(n=1),n=length-(+n||0),baseSlice(array,0,n<0?0:n)):[]}/**
     * Creates a slice of `array` excluding elements dropped from the end.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * bound to `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that match the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropRightWhile([1, 2, 3], function(n) {
     *   return n > 1;
     * });
     * // => [1]
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.dropRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
     * // => ['barney', 'fred']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.dropRightWhile(users, 'active', false), 'user');
     * // => ['barney']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.dropRightWhile(users, 'active'), 'user');
     * // => ['barney', 'fred', 'pebbles']
     */
function dropRightWhile(array,predicate,thisArg){return array&&array.length?baseWhile(array,getCallback(predicate,thisArg,3),!0,!0):[]}/**
     * Creates a slice of `array` excluding elements dropped from the beginning.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * bound to `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropWhile([1, 2, 3], function(n) {
     *   return n < 3;
     * });
     * // => [3]
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.dropWhile(users, { 'user': 'barney', 'active': false }), 'user');
     * // => ['fred', 'pebbles']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.dropWhile(users, 'active', false), 'user');
     * // => ['pebbles']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.dropWhile(users, 'active'), 'user');
     * // => ['barney', 'fred', 'pebbles']
     */
function dropWhile(array,predicate,thisArg){return array&&array.length?baseWhile(array,getCallback(predicate,thisArg,3),!0):[]}/**
     * Fills elements of `array` with `value` from `start` up to, but not
     * including, `end`.
     *
     * **Note:** This method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.fill(array, 'a');
     * console.log(array);
     * // => ['a', 'a', 'a']
     *
     * _.fill(Array(3), 2);
     * // => [2, 2, 2]
     *
     * _.fill([4, 6, 8], '*', 1, 2);
     * // => [4, '*', 8]
     */
function fill(array,value,start,end){var length=array?array.length:0;return length?(start&&"number"!=typeof start&&isIterateeCall(array,value,start)&&(start=0,end=length),baseFill(array,value,start,end)):[]}/**
     * Gets the first element of `array`.
     *
     * @static
     * @memberOf _
     * @alias head
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the first element of `array`.
     * @example
     *
     * _.first([1, 2, 3]);
     * // => 1
     *
     * _.first([]);
     * // => undefined
     */
function first(array){return array?array[0]:undefined}/**
     * Flattens a nested array. If `isDeep` is `true` the array is recursively
     * flattened, otherwise it's only flattened a single level.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to flatten.
     * @param {boolean} [isDeep] Specify a deep flatten.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flatten([1, [2, 3, [4]]]);
     * // => [1, 2, 3, [4]]
     *
     * // using `isDeep`
     * _.flatten([1, [2, 3, [4]]], true);
     * // => [1, 2, 3, 4]
     */
function flatten(array,isDeep,guard){var length=array?array.length:0;return guard&&isIterateeCall(array,isDeep,guard)&&(isDeep=!1),length?baseFlatten(array,isDeep):[]}/**
     * Recursively flattens a nested array.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to recursively flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flattenDeep([1, [2, 3, [4]]]);
     * // => [1, 2, 3, 4]
     */
function flattenDeep(array){var length=array?array.length:0;return length?baseFlatten(array,!0):[]}/**
     * Gets the index at which the first occurrence of `value` is found in `array`
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons. If `fromIndex` is negative, it's used as the offset
     * from the end of `array`. If `array` is sorted providing `true` for `fromIndex`
     * performs a faster binary search.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {boolean|number} [fromIndex=0] The index to search from or `true`
     *  to perform a binary search on a sorted array.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.indexOf([1, 2, 1, 2], 2);
     * // => 1
     *
     * // using `fromIndex`
     * _.indexOf([1, 2, 1, 2], 2, 2);
     * // => 3
     *
     * // performing a binary search
     * _.indexOf([1, 1, 2, 2], 2, true);
     * // => 2
     */
function indexOf(array,value,fromIndex){var length=array?array.length:0;if(!length)return-1;if("number"==typeof fromIndex)fromIndex=fromIndex<0?nativeMax(length+fromIndex,0):fromIndex;else if(fromIndex){var index=binaryIndex(array,value);return index<length&&(value===value?value===array[index]:array[index]!==array[index])?index:-1}return baseIndexOf(array,value,fromIndex||0)}/**
     * Gets all but the last element of `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.initial([1, 2, 3]);
     * // => [1, 2]
     */
function initial(array){return dropRight(array,1)}/**
     * Gets the last element of `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the last element of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     */
function last(array){var length=array?array.length:0;return length?array[length-1]:undefined}/**
     * This method is like `_.indexOf` except that it iterates over elements of
     * `array` from right to left.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {boolean|number} [fromIndex=array.length-1] The index to search from
     *  or `true` to perform a binary search on a sorted array.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.lastIndexOf([1, 2, 1, 2], 2);
     * // => 3
     *
     * // using `fromIndex`
     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
     * // => 1
     *
     * // performing a binary search
     * _.lastIndexOf([1, 1, 2, 2], 2, true);
     * // => 3
     */
function lastIndexOf(array,value,fromIndex){var length=array?array.length:0;if(!length)return-1;var index=length;if("number"==typeof fromIndex)index=(fromIndex<0?nativeMax(length+fromIndex,0):nativeMin(fromIndex||0,length-1))+1;else if(fromIndex){index=binaryIndex(array,value,!0)-1;var other=array[index];return(value===value?value===other:other!==other)?index:-1}if(value!==value)return indexOfNaN(array,index,!0);for(;index--;)if(array[index]===value)return index;return-1}/**
     * Removes all provided values from `array` using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.without`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...*} [values] The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3, 1, 2, 3];
     *
     * _.pull(array, 2, 3);
     * console.log(array);
     * // => [1, 1]
     */
function pull(){var args=arguments,array=args[0];if(!array||!array.length)return array;for(var index=0,indexOf=getIndexOf(),length=args.length;++index<length;)for(var fromIndex=0,value=args[index];(fromIndex=indexOf(array,value,fromIndex))>-1;)splice.call(array,fromIndex,1);return array}/**
     * Removes all elements from `array` that `predicate` returns truthy for
     * and returns an array of the removed elements. The predicate is bound to
     * `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * **Note:** Unlike `_.filter`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [1, 2, 3, 4];
     * var evens = _.remove(array, function(n) {
     *   return n % 2 == 0;
     * });
     *
     * console.log(array);
     * // => [1, 3]
     *
     * console.log(evens);
     * // => [2, 4]
     */
function remove(array,predicate,thisArg){var result=[];if(!array||!array.length)return result;var index=-1,indexes=[],length=array.length;for(predicate=getCallback(predicate,thisArg,3);++index<length;){var value=array[index];predicate(value,index,array)&&(result.push(value),indexes.push(index))}return basePullAt(array,indexes),result}/**
     * Gets all but the first element of `array`.
     *
     * @static
     * @memberOf _
     * @alias tail
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.rest([1, 2, 3]);
     * // => [2, 3]
     */
function rest(array){return drop(array,1)}/**
     * Creates a slice of `array` from `start` up to, but not including, `end`.
     *
     * **Note:** This method is used instead of `Array#slice` to support node
     * lists in IE < 9 and to ensure dense arrays are returned.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
function slice(array,start,end){var length=array?array.length:0;return length?(end&&"number"!=typeof end&&isIterateeCall(array,start,end)&&(start=0,end=length),baseSlice(array,start,end)):[]}/**
     * Creates a slice of `array` with `n` elements taken from the beginning.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.take([1, 2, 3]);
     * // => [1]
     *
     * _.take([1, 2, 3], 2);
     * // => [1, 2]
     *
     * _.take([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.take([1, 2, 3], 0);
     * // => []
     */
function take(array,n,guard){var length=array?array.length:0;return length?((guard?isIterateeCall(array,n,guard):null==n)&&(n=1),baseSlice(array,0,n<0?0:n)):[]}/**
     * Creates a slice of `array` with `n` elements taken from the end.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeRight([1, 2, 3]);
     * // => [3]
     *
     * _.takeRight([1, 2, 3], 2);
     * // => [2, 3]
     *
     * _.takeRight([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.takeRight([1, 2, 3], 0);
     * // => []
     */
function takeRight(array,n,guard){var length=array?array.length:0;return length?((guard?isIterateeCall(array,n,guard):null==n)&&(n=1),n=length-(+n||0),baseSlice(array,n<0?0:n)):[]}/**
     * Creates a slice of `array` with elements taken from the end. Elements are
     * taken until `predicate` returns falsey. The predicate is bound to `thisArg`
     * and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeRightWhile([1, 2, 3], function(n) {
     *   return n > 1;
     * });
     * // => [2, 3]
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.takeRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
     * // => ['pebbles']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.takeRightWhile(users, 'active', false), 'user');
     * // => ['fred', 'pebbles']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.takeRightWhile(users, 'active'), 'user');
     * // => []
     */
function takeRightWhile(array,predicate,thisArg){return array&&array.length?baseWhile(array,getCallback(predicate,thisArg,3),!1,!0):[]}/**
     * Creates a slice of `array` with elements taken from the beginning. Elements
     * are taken until `predicate` returns falsey. The predicate is bound to
     * `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeWhile([1, 2, 3], function(n) {
     *   return n < 3;
     * });
     * // => [1, 2]
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false},
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.takeWhile(users, { 'user': 'barney', 'active': false }), 'user');
     * // => ['barney']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.takeWhile(users, 'active', false), 'user');
     * // => ['barney', 'fred']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.takeWhile(users, 'active'), 'user');
     * // => []
     */
function takeWhile(array,predicate,thisArg){return array&&array.length?baseWhile(array,getCallback(predicate,thisArg,3)):[]}/**
     * Creates a duplicate-free version of an array, using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons, in which only the first occurence of each element
     * is kept. Providing `true` for `isSorted` performs a faster search algorithm
     * for sorted arrays. If an iteratee function is provided it's invoked for
     * each element in the array to generate the criterion by which uniqueness
     * is computed. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments: (value, index, array).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias unique
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {boolean} [isSorted] Specify the array is sorted.
     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new duplicate-value-free array.
     * @example
     *
     * _.uniq([2, 1, 2]);
     * // => [2, 1]
     *
     * // using `isSorted`
     * _.uniq([1, 1, 2], true);
     * // => [1, 2]
     *
     * // using an iteratee function
     * _.uniq([1, 2.5, 1.5, 2], function(n) {
     *   return this.floor(n);
     * }, Math);
     * // => [1, 2.5]
     *
     * // using the `_.property` callback shorthand
     * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
function uniq(array,isSorted,iteratee,thisArg){var length=array?array.length:0;if(!length)return[];null!=isSorted&&"boolean"!=typeof isSorted&&(thisArg=iteratee,iteratee=isIterateeCall(array,isSorted,thisArg)?undefined:isSorted,isSorted=!1);var callback=getCallback();return null==iteratee&&callback===baseCallback||(iteratee=callback(iteratee,thisArg,3)),isSorted&&getIndexOf()===baseIndexOf?sortedUniq(array,iteratee):baseUniq(array,iteratee)}/**
     * This method is like `_.zip` except that it accepts an array of grouped
     * elements and creates an array regrouping the elements to their pre-zip
     * configuration.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
     * // => [['fred', 30, true], ['barney', 40, false]]
     *
     * _.unzip(zipped);
     * // => [['fred', 'barney'], [30, 40], [true, false]]
     */
function unzip(array){if(!array||!array.length)return[];var index=-1,length=0;array=arrayFilter(array,function(group){if(isArrayLike(group))return length=nativeMax(group.length,length),!0});for(var result=Array(length);++index<length;)result[index]=arrayMap(array,baseProperty(index));return result}/**
     * This method is like `_.unzip` except that it accepts an iteratee to specify
     * how regrouped values should be combined. The `iteratee` is bound to `thisArg`
     * and invoked with four arguments: (accumulator, value, index, group).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @param {Function} [iteratee] The function to combine regrouped values.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
     * // => [[1, 10, 100], [2, 20, 200]]
     *
     * _.unzipWith(zipped, _.add);
     * // => [3, 30, 300]
     */
function unzipWith(array,iteratee,thisArg){var length=array?array.length:0;if(!length)return[];var result=unzip(array);return null==iteratee?result:(iteratee=bindCallback(iteratee,thisArg,4),arrayMap(result,function(group){return arrayReduce(group,iteratee,undefined,!0)}))}/**
     * Creates an array of unique values that is the [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
     * of the provided arrays.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of values.
     * @example
     *
     * _.xor([1, 2], [4, 2]);
     * // => [1, 4]
     */
function xor(){for(var index=-1,length=arguments.length;++index<length;){var array=arguments[index];if(isArrayLike(array))var result=result?arrayPush(baseDifference(result,array),baseDifference(array,result)):array}return result?baseUniq(result):[]}/**
     * The inverse of `_.pairs`; this method returns an object composed from arrays
     * of property names and values. Provide either a single two dimensional array,
     * e.g. `[[key1, value1], [key2, value2]]` or two arrays, one of property names
     * and one of corresponding values.
     *
     * @static
     * @memberOf _
     * @alias object
     * @category Array
     * @param {Array} props The property names.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObject([['fred', 30], ['barney', 40]]);
     * // => { 'fred': 30, 'barney': 40 }
     *
     * _.zipObject(['fred', 'barney'], [30, 40]);
     * // => { 'fred': 30, 'barney': 40 }
     */
function zipObject(props,values){var index=-1,length=props?props.length:0,result={};for(!length||values||isArray(props[0])||(values=[]);++index<length;){var key=props[index];values?result[key]=values[index]:key&&(result[key[0]]=key[1])}return result}/*------------------------------------------------------------------------*/
/**
     * Creates a `lodash` object that wraps `value` with explicit method
     * chaining enabled.
     *
     * @static
     * @memberOf _
     * @category Chain
     * @param {*} value The value to wrap.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36 },
     *   { 'user': 'fred',    'age': 40 },
     *   { 'user': 'pebbles', 'age': 1 }
     * ];
     *
     * var youngest = _.chain(users)
     *   .sortBy('age')
     *   .map(function(chr) {
     *     return chr.user + ' is ' + chr.age;
     *   })
     *   .first()
     *   .value();
     * // => 'pebbles is 1'
     */
function chain(value){var result=lodash(value);return result.__chain__=!0,result}/**
     * This method invokes `interceptor` and returns `value`. The interceptor is
     * bound to `thisArg` and invoked with one argument; (value). The purpose of
     * this method is to "tap into" a method chain in order to perform operations
     * on intermediate results within the chain.
     *
     * @static
     * @memberOf _
     * @category Chain
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @param {*} [thisArg] The `this` binding of `interceptor`.
     * @returns {*} Returns `value`.
     * @example
     *
     * _([1, 2, 3])
     *  .tap(function(array) {
     *    array.pop();
     *  })
     *  .reverse()
     *  .value();
     * // => [2, 1]
     */
function tap(value,interceptor,thisArg){return interceptor.call(thisArg,value),value}/**
     * This method is like `_.tap` except that it returns the result of `interceptor`.
     *
     * @static
     * @memberOf _
     * @category Chain
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @param {*} [thisArg] The `this` binding of `interceptor`.
     * @returns {*} Returns the result of `interceptor`.
     * @example
     *
     * _('  abc  ')
     *  .chain()
     *  .trim()
     *  .thru(function(value) {
     *    return [value];
     *  })
     *  .value();
     * // => ['abc']
     */
function thru(value,interceptor,thisArg){return interceptor.call(thisArg,value)}/**
     * Enables explicit method chaining on the wrapper object.
     *
     * @name chain
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * // without explicit chaining
     * _(users).first();
     * // => { 'user': 'barney', 'age': 36 }
     *
     * // with explicit chaining
     * _(users).chain()
     *   .first()
     *   .pick('user')
     *   .value();
     * // => { 'user': 'barney' }
     */
function wrapperChain(){return chain(this)}/**
     * Executes the chained sequence and returns the wrapped result.
     *
     * @name commit
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2];
     * var wrapped = _(array).push(3);
     *
     * console.log(array);
     * // => [1, 2]
     *
     * wrapped = wrapped.commit();
     * console.log(array);
     * // => [1, 2, 3]
     *
     * wrapped.last();
     * // => 3
     *
     * console.log(array);
     * // => [1, 2, 3]
     */
function wrapperCommit(){return new LodashWrapper(this.value(),this.__chain__)}/**
     * Creates a clone of the chained sequence planting `value` as the wrapped value.
     *
     * @name plant
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2];
     * var wrapped = _(array).map(function(value) {
     *   return Math.pow(value, 2);
     * });
     *
     * var other = [3, 4];
     * var otherWrapped = wrapped.plant(other);
     *
     * otherWrapped.value();
     * // => [9, 16]
     *
     * wrapped.value();
     * // => [1, 4]
     */
function wrapperPlant(value){for(var result,parent=this;parent instanceof baseLodash;){var clone=wrapperClone(parent);result?previous.__wrapped__=clone:result=clone;var previous=clone;parent=parent.__wrapped__}return previous.__wrapped__=value,result}/**
     * Reverses the wrapped array so the first element becomes the last, the
     * second element becomes the second to last, and so on.
     *
     * **Note:** This method mutates the wrapped array.
     *
     * @name reverse
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new reversed `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _(array).reverse().value()
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */
function wrapperReverse(){var value=this.__wrapped__,interceptor=function(value){return value.reverse()};if(value instanceof LazyWrapper){var wrapped=value;return this.__actions__.length&&(wrapped=new LazyWrapper(this)),wrapped=wrapped.reverse(),wrapped.__actions__.push({func:thru,args:[interceptor],thisArg:undefined}),new LodashWrapper(wrapped,this.__chain__)}return this.thru(interceptor)}/**
     * Produces the result of coercing the unwrapped value to a string.
     *
     * @name toString
     * @memberOf _
     * @category Chain
     * @returns {string} Returns the coerced string value.
     * @example
     *
     * _([1, 2, 3]).toString();
     * // => '1,2,3'
     */
function wrapperToString(){return this.value()+""}/**
     * Executes the chained sequence to extract the unwrapped value.
     *
     * @name value
     * @memberOf _
     * @alias run, toJSON, valueOf
     * @category Chain
     * @returns {*} Returns the resolved unwrapped value.
     * @example
     *
     * _([1, 2, 3]).value();
     * // => [1, 2, 3]
     */
function wrapperValue(){return baseWrapperValue(this.__wrapped__,this.__actions__)}/**
     * Checks if `predicate` returns truthy for **all** elements of `collection`.
     * The predicate is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias all
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`.
     * @example
     *
     * _.every([true, 1, null, 'yes'], Boolean);
     * // => false
     *
     * var users = [
     *   { 'user': 'barney', 'active': false },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.every(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.every(users, 'active', false);
     * // => true
     *
     * // using the `_.property` callback shorthand
     * _.every(users, 'active');
     * // => false
     */
function every(collection,predicate,thisArg){var func=isArray(collection)?arrayEvery:baseEvery;return thisArg&&isIterateeCall(collection,predicate,thisArg)&&(predicate=undefined),"function"==typeof predicate&&thisArg===undefined||(predicate=getCallback(predicate,thisArg,3)),func(collection,predicate)}/**
     * Iterates over elements of `collection`, returning an array of all elements
     * `predicate` returns truthy for. The predicate is bound to `thisArg` and
     * invoked with three arguments: (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias select
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the new filtered array.
     * @example
     *
     * _.filter([4, 5, 6], function(n) {
     *   return n % 2 == 0;
     * });
     * // => [4, 6]
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
     * // => ['barney']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.filter(users, 'active', false), 'user');
     * // => ['fred']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.filter(users, 'active'), 'user');
     * // => ['barney']
     */
function filter(collection,predicate,thisArg){var func=isArray(collection)?arrayFilter:baseFilter;return predicate=getCallback(predicate,thisArg,3),func(collection,predicate)}/**
     * Performs a deep comparison between each element in `collection` and the
     * source object, returning the first element that has equivalent property
     * values.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. For comparing a single
     * own or inherited property value see `_.matchesProperty`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {Object} source The object of property values to match.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.result(_.findWhere(users, { 'age': 36, 'active': true }), 'user');
     * // => 'barney'
     *
     * _.result(_.findWhere(users, { 'age': 40, 'active': false }), 'user');
     * // => 'fred'
     */
function findWhere(collection,source){return find(collection,baseMatches(source))}/**
     * Checks if `target` is in `collection` using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons. If `fromIndex` is negative, it's used as the offset
     * from the end of `collection`.
     *
     * @static
     * @memberOf _
     * @alias contains, include
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {*} target The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
     * @returns {boolean} Returns `true` if a matching element is found, else `false`.
     * @example
     *
     * _.includes([1, 2, 3], 1);
     * // => true
     *
     * _.includes([1, 2, 3], 1, 2);
     * // => false
     *
     * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
     * // => true
     *
     * _.includes('pebbles', 'eb');
     * // => true
     */
function includes(collection,target,fromIndex,guard){var length=collection?getLength(collection):0;return isLength(length)||(collection=values(collection),length=collection.length),fromIndex="number"!=typeof fromIndex||guard&&isIterateeCall(target,fromIndex,guard)?0:fromIndex<0?nativeMax(length+fromIndex,0):fromIndex||0,"string"==typeof collection||!isArray(collection)&&isString(collection)?fromIndex<=length&&collection.indexOf(target,fromIndex)>-1:!!length&&getIndexOf(collection,target,fromIndex)>-1}/**
     * Creates an array of values by running each element in `collection` through
     * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments: (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
     *
     * The guarded methods are:
     * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`,
     * `drop`, `dropRight`, `every`, `fill`, `flatten`, `invert`, `max`, `min`,
     * `parseInt`, `slice`, `sortBy`, `take`, `takeRight`, `template`, `trim`,
     * `trimLeft`, `trimRight`, `trunc`, `random`, `range`, `sample`, `some`,
     * `sum`, `uniq`, and `words`
     *
     * @static
     * @memberOf _
     * @alias collect
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new mapped array.
     * @example
     *
     * function timesThree(n) {
     *   return n * 3;
     * }
     *
     * _.map([1, 2], timesThree);
     * // => [3, 6]
     *
     * _.map({ 'a': 1, 'b': 2 }, timesThree);
     * // => [3, 6] (iteration order is not guaranteed)
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * // using the `_.property` callback shorthand
     * _.map(users, 'user');
     * // => ['barney', 'fred']
     */
function map(collection,iteratee,thisArg){var func=isArray(collection)?arrayMap:baseMap;return iteratee=getCallback(iteratee,thisArg,3),func(collection,iteratee)}/**
     * Gets the property value of `path` from all elements in `collection`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Array|string} path The path of the property to pluck.
     * @returns {Array} Returns the property values.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * _.pluck(users, 'user');
     * // => ['barney', 'fred']
     *
     * var userIndex = _.indexBy(users, 'user');
     * _.pluck(userIndex, 'age');
     * // => [36, 40] (iteration order is not guaranteed)
     */
function pluck(collection,path){return map(collection,property(path))}/**
     * The opposite of `_.filter`; this method returns the elements of `collection`
     * that `predicate` does **not** return truthy for.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the new filtered array.
     * @example
     *
     * _.reject([1, 2, 3, 4], function(n) {
     *   return n % 2 == 0;
     * });
     * // => [1, 3]
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': true }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.reject(users, { 'age': 40, 'active': true }), 'user');
     * // => ['barney']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.reject(users, 'active', false), 'user');
     * // => ['fred']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.reject(users, 'active'), 'user');
     * // => ['barney']
     */
function reject(collection,predicate,thisArg){var func=isArray(collection)?arrayFilter:baseFilter;return predicate=getCallback(predicate,thisArg,3),func(collection,function(value,index,collection){return!predicate(value,index,collection)})}/**
     * Gets a random element or `n` random elements from a collection.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to sample.
     * @param {number} [n] The number of elements to sample.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {*} Returns the random sample(s).
     * @example
     *
     * _.sample([1, 2, 3, 4]);
     * // => 2
     *
     * _.sample([1, 2, 3, 4], 2);
     * // => [3, 1]
     */
function sample(collection,n,guard){if(guard?isIterateeCall(collection,n,guard):null==n){collection=toIterable(collection);var length=collection.length;return length>0?collection[baseRandom(0,length-1)]:undefined}var index=-1,result=toArray(collection),length=result.length,lastIndex=length-1;for(n=nativeMin(n<0?0:+n||0,length);++index<n;){var rand=baseRandom(index,lastIndex),value=result[rand];result[rand]=result[index],result[index]=value}return result.length=n,result}/**
     * Creates an array of shuffled values, using a version of the
     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     * @example
     *
     * _.shuffle([1, 2, 3, 4]);
     * // => [4, 1, 3, 2]
     */
function shuffle(collection){return sample(collection,POSITIVE_INFINITY)}/**
     * Gets the size of `collection` by returning its length for array-like
     * values or the number of own enumerable properties for objects.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @returns {number} Returns the size of `collection`.
     * @example
     *
     * _.size([1, 2, 3]);
     * // => 3
     *
     * _.size({ 'a': 1, 'b': 2 });
     * // => 2
     *
     * _.size('pebbles');
     * // => 7
     */
function size(collection){var length=collection?getLength(collection):0;return isLength(length)?length:keys(collection).length}/**
     * Checks if `predicate` returns truthy for **any** element of `collection`.
     * The function returns as soon as it finds a passing value and does not iterate
     * over the entire collection. The predicate is bound to `thisArg` and invoked
     * with three arguments: (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias any
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     * @example
     *
     * _.some([null, 0, 'yes', false], Boolean);
     * // => true
     *
     * var users = [
     *   { 'user': 'barney', 'active': true },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.some(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.some(users, 'active', false);
     * // => true
     *
     * // using the `_.property` callback shorthand
     * _.some(users, 'active');
     * // => true
     */
function some(collection,predicate,thisArg){var func=isArray(collection)?arraySome:baseSome;return thisArg&&isIterateeCall(collection,predicate,thisArg)&&(predicate=undefined),"function"==typeof predicate&&thisArg===undefined||(predicate=getCallback(predicate,thisArg,3)),func(collection,predicate)}/**
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection through `iteratee`. This method performs
     * a stable sort, that is, it preserves the original sort order of equal elements.
     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * _.sortBy([1, 2, 3], function(n) {
     *   return Math.sin(n);
     * });
     * // => [3, 1, 2]
     *
     * _.sortBy([1, 2, 3], function(n) {
     *   return this.sin(n);
     * }, Math);
     * // => [3, 1, 2]
     *
     * var users = [
     *   { 'user': 'fred' },
     *   { 'user': 'pebbles' },
     *   { 'user': 'barney' }
     * ];
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.sortBy(users, 'user'), 'user');
     * // => ['barney', 'fred', 'pebbles']
     */
function sortBy(collection,iteratee,thisArg){if(null==collection)return[];thisArg&&isIterateeCall(collection,iteratee,thisArg)&&(iteratee=undefined);var index=-1;iteratee=getCallback(iteratee,thisArg,3);var result=baseMap(collection,function(value,key,collection){return{criteria:iteratee(value,key,collection),index:++index,value:value}});return baseSortBy(result,compareAscending)}/**
     * This method is like `_.sortByAll` except that it allows specifying the
     * sort orders of the iteratees to sort by. If `orders` is unspecified, all
     * values are sorted in ascending order. Otherwise, a value is sorted in
     * ascending order if its corresponding order is "asc", and descending if "desc".
     *
     * If a property name is provided for an iteratee the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If an object is provided for an iteratee the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
     * @param {boolean[]} [orders] The sort orders of `iteratees`.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 34 },
     *   { 'user': 'fred',   'age': 42 },
     *   { 'user': 'barney', 'age': 36 }
     * ];
     *
     * // sort by `user` in ascending order and by `age` in descending order
     * _.map(_.sortByOrder(users, ['user', 'age'], ['asc', 'desc']), _.values);
     * // => [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
     */
function sortByOrder(collection,iteratees,orders,guard){return null==collection?[]:(guard&&isIterateeCall(iteratees,orders,guard)&&(orders=undefined),isArray(iteratees)||(iteratees=null==iteratees?[]:[iteratees]),isArray(orders)||(orders=null==orders?[]:[orders]),baseSortByOrder(collection,iteratees,orders))}/**
     * Performs a deep comparison between each element in `collection` and the
     * source object, returning an array of all elements that have equivalent
     * property values.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. For comparing a single
     * own or inherited property value see `_.matchesProperty`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {Object} source The object of property values to match.
     * @returns {Array} Returns the new filtered array.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false, 'pets': ['hoppy'] },
     *   { 'user': 'fred',   'age': 40, 'active': true, 'pets': ['baby puss', 'dino'] }
     * ];
     *
     * _.pluck(_.where(users, { 'age': 36, 'active': false }), 'user');
     * // => ['barney']
     *
     * _.pluck(_.where(users, { 'pets': ['dino'] }), 'user');
     * // => ['fred']
     */
function where(collection,source){return filter(collection,baseMatches(source))}/*------------------------------------------------------------------------*/
/**
     * The opposite of `_.before`; this method creates a function that invokes
     * `func` once it's called `n` or more times.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {number} n The number of calls before `func` is invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var saves = ['profile', 'settings'];
     *
     * var done = _.after(saves.length, function() {
     *   console.log('done saving!');
     * });
     *
     * _.forEach(saves, function(type) {
     *   asyncSave({ 'type': type, 'complete': done });
     * });
     * // => logs 'done saving!' after the two async saves have completed
     */
function after(n,func){if("function"!=typeof func){if("function"!=typeof n)throw new TypeError(FUNC_ERROR_TEXT);var temp=n;n=func,func=temp}return n=nativeIsFinite(n=+n)?n:0,function(){if(--n<1)return func.apply(this,arguments)}}/**
     * Creates a function that accepts up to `n` arguments ignoring any
     * additional arguments.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @param {number} [n=func.length] The arity cap.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Function} Returns the new function.
     * @example
     *
     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
     * // => [6, 8, 10]
     */
function ary(func,n,guard){return guard&&isIterateeCall(func,n,guard)&&(n=undefined),n=func&&null==n?func.length:nativeMax(+n||0,0),createWrapper(func,ARY_FLAG,undefined,undefined,undefined,undefined,n)}/**
     * Creates a function that invokes `func`, with the `this` binding and arguments
     * of the created function, while it's called less than `n` times. Subsequent
     * calls to the created function return the result of the last `func` invocation.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {number} n The number of calls at which `func` is no longer invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * jQuery('#add').on('click', _.before(5, addContactToList));
     * // => allows adding up to 4 contacts to the list
     */
function before(n,func){var result;if("function"!=typeof func){if("function"!=typeof n)throw new TypeError(FUNC_ERROR_TEXT);var temp=n;n=func,func=temp}return function(){return--n>0&&(result=func.apply(this,arguments)),n<=1&&(func=undefined),result}}/**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked. The debounced function comes with a `cancel` method to cancel
     * delayed invocations. Provide an options object to indicate that `func`
     * should be invoked on the leading and/or trailing edge of the `wait` timeout.
     * Subsequent calls to the debounced function return the result of the last
     * `func` invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
     * on the trailing edge of the timeout only if the the debounced function is
     * invoked more than once during the `wait` timeout.
     *
     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
     * for details over the differences between `_.debounce` and `_.throttle`.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=false] Specify invoking on the leading
     *  edge of the timeout.
     * @param {number} [options.maxWait] The maximum time `func` is allowed to be
     *  delayed before it's invoked.
     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
     *  edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // avoid costly calculations while the window size is in flux
     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
     *
     * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
     * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * }));
     *
     * // ensure `batchLog` is invoked once after 1 second of debounced calls
     * var source = new EventSource('/stream');
     * jQuery(source).on('message', _.debounce(batchLog, 250, {
     *   'maxWait': 1000
     * }));
     *
     * // cancel a debounced call
     * var todoChanges = _.debounce(batchLog, 1000);
     * Object.observe(models.todo, todoChanges);
     *
     * Object.observe(models, function(changes) {
     *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
     *     todoChanges.cancel();
     *   }
     * }, ['delete']);
     *
     * // ...at some point `models.todo` is changed
     * models.todo.completed = true;
     *
     * // ...before 1 second has passed `models.todo` is deleted
     * // which cancels the debounced `todoChanges` call
     * delete models.todo;
     */
function debounce(func,wait,options){function cancel(){timeoutId&&clearTimeout(timeoutId),maxTimeoutId&&clearTimeout(maxTimeoutId),lastCalled=0,maxTimeoutId=timeoutId=trailingCall=undefined}function complete(isCalled,id){id&&clearTimeout(id),maxTimeoutId=timeoutId=trailingCall=undefined,isCalled&&(lastCalled=now(),result=func.apply(thisArg,args),timeoutId||maxTimeoutId||(args=thisArg=undefined))}function delayed(){var remaining=wait-(now()-stamp);remaining<=0||remaining>wait?complete(trailingCall,maxTimeoutId):timeoutId=setTimeout(delayed,remaining)}function maxDelayed(){complete(trailing,timeoutId)}function debounced(){if(args=arguments,stamp=now(),thisArg=this,trailingCall=trailing&&(timeoutId||!leading),maxWait===!1)var leadingCall=leading&&!timeoutId;else{maxTimeoutId||leading||(lastCalled=stamp);var remaining=maxWait-(stamp-lastCalled),isCalled=remaining<=0||remaining>maxWait;isCalled?(maxTimeoutId&&(maxTimeoutId=clearTimeout(maxTimeoutId)),lastCalled=stamp,result=func.apply(thisArg,args)):maxTimeoutId||(maxTimeoutId=setTimeout(maxDelayed,remaining))}return isCalled&&timeoutId?timeoutId=clearTimeout(timeoutId):timeoutId||wait===maxWait||(timeoutId=setTimeout(delayed,wait)),leadingCall&&(isCalled=!0,result=func.apply(thisArg,args)),!isCalled||timeoutId||maxTimeoutId||(args=thisArg=undefined),result}var args,maxTimeoutId,result,stamp,thisArg,timeoutId,trailingCall,lastCalled=0,maxWait=!1,trailing=!0;if("function"!=typeof func)throw new TypeError(FUNC_ERROR_TEXT);if(wait=wait<0?0:+wait||0,options===!0){var leading=!0;trailing=!1}else isObject(options)&&(leading=!!options.leading,maxWait="maxWait"in options&&nativeMax(+options.maxWait||0,wait),trailing="trailing"in options?!!options.trailing:trailing);return debounced.cancel=cancel,debounced}/**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is coerced to a string and used as the
     * cache key. The `func` is invoked with the `this` binding of the memoized
     * function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoizing function.
     * @example
     *
     * var upperCase = _.memoize(function(string) {
     *   return string.toUpperCase();
     * });
     *
     * upperCase('fred');
     * // => 'FRED'
     *
     * // modifying the result cache
     * upperCase.cache.set('fred', 'BARNEY');
     * upperCase('fred');
     * // => 'BARNEY'
     *
     * // replacing `_.memoize.Cache`
     * var object = { 'user': 'fred' };
     * var other = { 'user': 'barney' };
     * var identity = _.memoize(_.identity);
     *
     * identity(object);
     * // => { 'user': 'fred' }
     * identity(other);
     * // => { 'user': 'fred' }
     *
     * _.memoize.Cache = WeakMap;
     * var identity = _.memoize(_.identity);
     *
     * identity(object);
     * // => { 'user': 'fred' }
     * identity(other);
     * // => { 'user': 'barney' }
     */
function memoize(func,resolver){if("function"!=typeof func||resolver&&"function"!=typeof resolver)throw new TypeError(FUNC_ERROR_TEXT);var memoized=function(){var args=arguments,key=resolver?resolver.apply(this,args):args[0],cache=memoized.cache;if(cache.has(key))return cache.get(key);var result=func.apply(this,args);return memoized.cache=cache.set(key,result),result};return memoized.cache=new memoize.Cache,memoized}/**
     * Creates a function that negates the result of the predicate `func`. The
     * `func` predicate is invoked with the `this` binding and arguments of the
     * created function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} predicate The predicate to negate.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function isEven(n) {
     *   return n % 2 == 0;
     * }
     *
     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
     * // => [1, 3, 5]
     */
function negate(predicate){if("function"!=typeof predicate)throw new TypeError(FUNC_ERROR_TEXT);return function(){return!predicate.apply(this,arguments)}}/**
     * Creates a function that is restricted to invoking `func` once. Repeat calls
     * to the function return the value of the first call. The `func` is invoked
     * with the `this` binding and arguments of the created function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var initialize = _.once(createApplication);
     * initialize();
     * initialize();
     * // `initialize` invokes `createApplication` once
     */
function once(func){return before(2,func)}/**
     * Creates a function that invokes `func` with the `this` binding of the
     * created function and arguments from `start` and beyond provided as an array.
     *
     * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.restParam(function(what, names) {
     *   return what + ' ' + _.initial(names).join(', ') +
     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
     * });
     *
     * say('hello', 'fred', 'barney', 'pebbles');
     * // => 'hello fred, barney, & pebbles'
     */
function restParam(func,start){if("function"!=typeof func)throw new TypeError(FUNC_ERROR_TEXT);return start=nativeMax(start===undefined?func.length-1:+start||0,0),function(){for(var args=arguments,index=-1,length=nativeMax(args.length-start,0),rest=Array(length);++index<length;)rest[index]=args[start+index];switch(start){case 0:return func.call(this,rest);case 1:return func.call(this,args[0],rest);case 2:return func.call(this,args[0],args[1],rest)}var otherArgs=Array(start+1);for(index=-1;++index<start;)otherArgs[index]=args[index];return otherArgs[start]=rest,func.apply(this,otherArgs)}}/**
     * Creates a function that invokes `func` with the `this` binding of the created
     * function and an array of arguments much like [`Function#apply`](https://es5.github.io/#x15.3.4.3).
     *
     * **Note:** This method is based on the [spread operator](https://developer.mozilla.org/Web/JavaScript/Reference/Operators/Spread_operator).
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to spread arguments over.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.spread(function(who, what) {
     *   return who + ' says ' + what;
     * });
     *
     * say(['fred', 'hello']);
     * // => 'fred says hello'
     *
     * // with a Promise
     * var numbers = Promise.all([
     *   Promise.resolve(40),
     *   Promise.resolve(36)
     * ]);
     *
     * numbers.then(_.spread(function(x, y) {
     *   return x + y;
     * }));
     * // => a Promise of 76
     */
function spread(func){if("function"!=typeof func)throw new TypeError(FUNC_ERROR_TEXT);return function(array){return func.apply(this,array)}}/**
     * Creates a throttled function that only invokes `func` at most once per
     * every `wait` milliseconds. The throttled function comes with a `cancel`
     * method to cancel delayed invocations. Provide an options object to indicate
     * that `func` should be invoked on the leading and/or trailing edge of the
     * `wait` timeout. Subsequent calls to the throttled function return the
     * result of the last `func` call.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
     * on the trailing edge of the timeout only if the the throttled function is
     * invoked more than once during the `wait` timeout.
     *
     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
     * for details over the differences between `_.throttle` and `_.debounce`.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to throttle.
     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=true] Specify invoking on the leading
     *  edge of the timeout.
     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
     *  edge of the timeout.
     * @returns {Function} Returns the new throttled function.
     * @example
     *
     * // avoid excessively updating the position while scrolling
     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
     *
     * // invoke `renewToken` when the click event is fired, but not more than once every 5 minutes
     * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
     *   'trailing': false
     * }));
     *
     * // cancel a trailing throttled call
     * jQuery(window).on('popstate', throttled.cancel);
     */
function throttle(func,wait,options){var leading=!0,trailing=!0;if("function"!=typeof func)throw new TypeError(FUNC_ERROR_TEXT);return options===!1?leading=!1:isObject(options)&&(leading="leading"in options?!!options.leading:leading,trailing="trailing"in options?!!options.trailing:trailing),debounce(func,wait,{leading:leading,maxWait:+wait,trailing:trailing})}/**
     * Creates a function that provides `value` to the wrapper function as its
     * first argument. Any additional arguments provided to the function are
     * appended to those provided to the wrapper function. The wrapper is invoked
     * with the `this` binding of the created function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {*} value The value to wrap.
     * @param {Function} wrapper The wrapper function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var p = _.wrap(_.escape, function(func, text) {
     *   return '<p>' + func(text) + '</p>';
     * });
     *
     * p('fred, barney, & pebbles');
     * // => '<p>fred, barney, &amp; pebbles</p>'
     */
function wrap(value,wrapper){return wrapper=null==wrapper?identity:wrapper,createWrapper(wrapper,PARTIAL_FLAG,undefined,[value],[])}/*------------------------------------------------------------------------*/
/**
     * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
     * otherwise they are assigned by reference. If `customizer` is provided it's
     * invoked to produce the cloned values. If `customizer` returns `undefined`
     * cloning is handled by the method instead. The `customizer` is bound to
     * `thisArg` and invoked with up to three argument; (value [, index|key, object]).
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
     * The enumerable properties of `arguments` objects and objects created by
     * constructors other than `Object` are cloned to plain `Object` objects. An
     * empty object is returned for uncloneable values such as functions, DOM nodes,
     * Maps, Sets, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @param {Function} [customizer] The function to customize cloning values.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {*} Returns the cloned value.
     * @example
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * var shallow = _.clone(users);
     * shallow[0] === users[0];
     * // => true
     *
     * var deep = _.clone(users, true);
     * deep[0] === users[0];
     * // => false
     *
     * // using a customizer callback
     * var el = _.clone(document.body, function(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(false);
     *   }
     * });
     *
     * el === document.body
     * // => false
     * el.nodeName
     * // => BODY
     * el.childNodes.length;
     * // => 0
     */
function clone(value,isDeep,customizer,thisArg){return isDeep&&"boolean"!=typeof isDeep&&isIterateeCall(value,isDeep,customizer)?isDeep=!1:"function"==typeof isDeep&&(thisArg=customizer,customizer=isDeep,isDeep=!1),"function"==typeof customizer?baseClone(value,isDeep,bindCallback(customizer,thisArg,3)):baseClone(value,isDeep)}/**
     * Creates a deep clone of `value`. If `customizer` is provided it's invoked
     * to produce the cloned values. If `customizer` returns `undefined` cloning
     * is handled by the method instead. The `customizer` is bound to `thisArg`
     * and invoked with up to three argument; (value [, index|key, object]).
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
     * The enumerable properties of `arguments` objects and objects created by
     * constructors other than `Object` are cloned to plain `Object` objects. An
     * empty object is returned for uncloneable values such as functions, DOM nodes,
     * Maps, Sets, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to deep clone.
     * @param {Function} [customizer] The function to customize cloning values.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {*} Returns the deep cloned value.
     * @example
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * var deep = _.cloneDeep(users);
     * deep[0] === users[0];
     * // => false
     *
     * // using a customizer callback
     * var el = _.cloneDeep(document.body, function(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(true);
     *   }
     * });
     *
     * el === document.body
     * // => false
     * el.nodeName
     * // => BODY
     * el.childNodes.length;
     * // => 20
     */
function cloneDeep(value,customizer,thisArg){return"function"==typeof customizer?baseClone(value,!0,bindCallback(customizer,thisArg,3)):baseClone(value,!0)}/**
     * Checks if `value` is greater than `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`, else `false`.
     * @example
     *
     * _.gt(3, 1);
     * // => true
     *
     * _.gt(3, 3);
     * // => false
     *
     * _.gt(1, 3);
     * // => false
     */
function gt(value,other){return value>other}/**
     * Checks if `value` is greater than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than or equal to `other`, else `false`.
     * @example
     *
     * _.gte(3, 1);
     * // => true
     *
     * _.gte(3, 3);
     * // => true
     *
     * _.gte(1, 3);
     * // => false
     */
function gte(value,other){return value>=other}/**
     * Checks if `value` is classified as an `arguments` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
function isArguments(value){return isObjectLike(value)&&isArrayLike(value)&&hasOwnProperty.call(value,"callee")&&!propertyIsEnumerable.call(value,"callee")}/**
     * Checks if `value` is classified as a boolean primitive or object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isBoolean(false);
     * // => true
     *
     * _.isBoolean(null);
     * // => false
     */
function isBoolean(value){return value===!0||value===!1||isObjectLike(value)&&objToString.call(value)==boolTag}/**
     * Checks if `value` is classified as a `Date` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isDate(new Date);
     * // => true
     *
     * _.isDate('Mon April 23 2012');
     * // => false
     */
function isDate(value){return isObjectLike(value)&&objToString.call(value)==dateTag}/**
     * Checks if `value` is a DOM element.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
     * @example
     *
     * _.isElement(document.body);
     * // => true
     *
     * _.isElement('<body>');
     * // => false
     */
function isElement(value){return!!value&&1===value.nodeType&&isObjectLike(value)&&!isPlainObject(value)}/**
     * Checks if `value` is empty. A value is considered empty unless it's an
     * `arguments` object, array, string, or jQuery-like collection with a length
     * greater than `0` or an object with own enumerable properties.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {Array|Object|string} value The value to inspect.
     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty(null);
     * // => true
     *
     * _.isEmpty(true);
     * // => true
     *
     * _.isEmpty(1);
     * // => true
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({ 'a': 1 });
     * // => false
     */
function isEmpty(value){return null==value||(isArrayLike(value)&&(isArray(value)||isString(value)||isArguments(value)||isObjectLike(value)&&isFunction(value.splice))?!value.length:!keys(value).length)}/**
     * Performs a deep comparison between two values to determine if they are
     * equivalent. If `customizer` is provided it's invoked to compare values.
     * If `customizer` returns `undefined` comparisons are handled by the method
     * instead. The `customizer` is bound to `thisArg` and invoked with up to
     * three arguments: (value, other [, index|key]).
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. Functions and DOM nodes
     * are **not** supported. Provide a customizer function to extend support
     * for comparing other values.
     *
     * @static
     * @memberOf _
     * @alias eq
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize value comparisons.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'user': 'fred' };
     * var other = { 'user': 'fred' };
     *
     * object == other;
     * // => false
     *
     * _.isEqual(object, other);
     * // => true
     *
     * // using a customizer callback
     * var array = ['hello', 'goodbye'];
     * var other = ['hi', 'goodbye'];
     *
     * _.isEqual(array, other, function(value, other) {
     *   if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
     *     return true;
     *   }
     * });
     * // => true
     */
function isEqual(value,other,customizer,thisArg){customizer="function"==typeof customizer?bindCallback(customizer,thisArg,3):undefined;var result=customizer?customizer(value,other):undefined;return result===undefined?baseIsEqual(value,other,customizer):!!result}/**
     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
     * `SyntaxError`, `TypeError`, or `URIError` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
     * @example
     *
     * _.isError(new Error);
     * // => true
     *
     * _.isError(Error);
     * // => false
     */
function isError(value){return isObjectLike(value)&&"string"==typeof value.message&&objToString.call(value)==errorTag}/**
     * Checks if `value` is a finite primitive number.
     *
     * **Note:** This method is based on [`Number.isFinite`](http://ecma-international.org/ecma-262/6.0/#sec-number.isfinite).
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
     * @example
     *
     * _.isFinite(10);
     * // => true
     *
     * _.isFinite('10');
     * // => false
     *
     * _.isFinite(true);
     * // => false
     *
     * _.isFinite(Object(10));
     * // => false
     *
     * _.isFinite(Infinity);
     * // => false
     */
function isFinite(value){return"number"==typeof value&&nativeIsFinite(value)}/**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
function isFunction(value){
// The use of `Object#toString` avoids issues with the `typeof` operator
// in older versions of Chrome and Safari which return 'function' for regexes
// and Safari 8 which returns 'object' for typed array constructors.
return isObject(value)&&objToString.call(value)==funcTag}/**
     * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(1);
     * // => false
     */
function isObject(value){
// Avoid a V8 JIT bug in Chrome 19-20.
// See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
var type=typeof value;return!!value&&("object"==type||"function"==type)}/**
     * Performs a deep comparison between `object` and `source` to determine if
     * `object` contains equivalent property values. If `customizer` is provided
     * it's invoked to compare values. If `customizer` returns `undefined`
     * comparisons are handled by the method instead. The `customizer` is bound
     * to `thisArg` and invoked with three arguments: (value, other, index|key).
     *
     * **Note:** This method supports comparing properties of arrays, booleans,
     * `Date` objects, numbers, `Object` objects, regexes, and strings. Functions
     * and DOM nodes are **not** supported. Provide a customizer function to extend
     * support for comparing other values.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Function} [customizer] The function to customize value comparisons.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * var object = { 'user': 'fred', 'age': 40 };
     *
     * _.isMatch(object, { 'age': 40 });
     * // => true
     *
     * _.isMatch(object, { 'age': 36 });
     * // => false
     *
     * // using a customizer callback
     * var object = { 'greeting': 'hello' };
     * var source = { 'greeting': 'hi' };
     *
     * _.isMatch(object, source, function(value, other) {
     *   return _.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/) || undefined;
     * });
     * // => true
     */
function isMatch(object,source,customizer,thisArg){return customizer="function"==typeof customizer?bindCallback(customizer,thisArg,3):undefined,baseIsMatch(object,getMatchData(source),customizer)}/**
     * Checks if `value` is `NaN`.
     *
     * **Note:** This method is not the same as [`isNaN`](https://es5.github.io/#x15.1.2.4)
     * which returns `true` for `undefined` and other non-numeric values.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     * @example
     *
     * _.isNaN(NaN);
     * // => true
     *
     * _.isNaN(new Number(NaN));
     * // => true
     *
     * isNaN(undefined);
     * // => true
     *
     * _.isNaN(undefined);
     * // => false
     */
function isNaN(value){
// An `NaN` primitive is the only value that is not equal to itself.
// Perform the `toStringTag` check first to avoid errors with some host objects in IE.
return isNumber(value)&&value!=+value}/**
     * Checks if `value` is a native function.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
     * @example
     *
     * _.isNative(Array.prototype.push);
     * // => true
     *
     * _.isNative(_);
     * // => false
     */
function isNative(value){return null!=value&&(isFunction(value)?reIsNative.test(fnToString.call(value)):isObjectLike(value)&&reIsHostCtor.test(value))}/**
     * Checks if `value` is `null`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
     * @example
     *
     * _.isNull(null);
     * // => true
     *
     * _.isNull(void 0);
     * // => false
     */
function isNull(value){return null===value}/**
     * Checks if `value` is classified as a `Number` primitive or object.
     *
     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
     * as numbers, use the `_.isFinite` method.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isNumber(8.4);
     * // => true
     *
     * _.isNumber(NaN);
     * // => true
     *
     * _.isNumber('8.4');
     * // => false
     */
function isNumber(value){return"number"==typeof value||isObjectLike(value)&&objToString.call(value)==numberTag}/**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * **Note:** This method assumes objects created by the `Object` constructor
     * have no inherited enumerable properties.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
function isPlainObject(value){var Ctor;
// Exit early for non `Object` objects.
if(!isObjectLike(value)||objToString.call(value)!=objectTag||isArguments(value)||!hasOwnProperty.call(value,"constructor")&&(Ctor=value.constructor,"function"==typeof Ctor&&!(Ctor instanceof Ctor)))return!1;
// IE < 9 iterates inherited properties before own properties. If the first
// iterated property is an object's own property then there are no inherited
// enumerable properties.
var result;
// In most environments an object's own properties are iterated before
// its inherited properties. If the last iterated property is an object's
// own property then there are no inherited enumerable properties.
return baseForIn(value,function(subValue,key){result=key}),result===undefined||hasOwnProperty.call(value,result)}/**
     * Checks if `value` is classified as a `RegExp` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isRegExp(/abc/);
     * // => true
     *
     * _.isRegExp('/abc/');
     * // => false
     */
function isRegExp(value){return isObject(value)&&objToString.call(value)==regexpTag}/**
     * Checks if `value` is classified as a `String` primitive or object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isString('abc');
     * // => true
     *
     * _.isString(1);
     * // => false
     */
function isString(value){return"string"==typeof value||isObjectLike(value)&&objToString.call(value)==stringTag}/**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
function isTypedArray(value){return isObjectLike(value)&&isLength(value.length)&&!!typedArrayTags[objToString.call(value)]}/**
     * Checks if `value` is `undefined`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
     * @example
     *
     * _.isUndefined(void 0);
     * // => true
     *
     * _.isUndefined(null);
     * // => false
     */
function isUndefined(value){return value===undefined}/**
     * Checks if `value` is less than `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`, else `false`.
     * @example
     *
     * _.lt(1, 3);
     * // => true
     *
     * _.lt(3, 3);
     * // => false
     *
     * _.lt(3, 1);
     * // => false
     */
function lt(value,other){return value<other}/**
     * Checks if `value` is less than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than or equal to `other`, else `false`.
     * @example
     *
     * _.lte(1, 3);
     * // => true
     *
     * _.lte(3, 3);
     * // => true
     *
     * _.lte(3, 1);
     * // => false
     */
function lte(value,other){return value<=other}/**
     * Converts `value` to an array.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Array} Returns the converted array.
     * @example
     *
     * (function() {
     *   return _.toArray(arguments).slice(1);
     * }(1, 2, 3));
     * // => [2, 3]
     */
function toArray(value){var length=value?getLength(value):0;return isLength(length)?length?arrayCopy(value):[]:values(value)}/**
     * Converts `value` to a plain object flattening inherited enumerable
     * properties of `value` to own properties of the plain object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Object} Returns the converted plain object.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.assign({ 'a': 1 }, new Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */
function toPlainObject(value){return baseCopy(value,keysIn(value))}/**
     * Creates an object that inherits from the given `prototype` object. If a
     * `properties` object is provided its own enumerable properties are assigned
     * to the created object.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} prototype The object to inherit from.
     * @param {Object} [properties] The properties to assign to the object.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Object} Returns the new object.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * function Circle() {
     *   Shape.call(this);
     * }
     *
     * Circle.prototype = _.create(Shape.prototype, {
     *   'constructor': Circle
     * });
     *
     * var circle = new Circle;
     * circle instanceof Circle;
     * // => true
     *
     * circle instanceof Shape;
     * // => true
     */
function create(prototype,properties,guard){var result=baseCreate(prototype);return guard&&isIterateeCall(prototype,properties,guard)&&(properties=undefined),properties?baseAssign(result,properties):result}/**
     * Creates an array of function property names from all enumerable properties,
     * own and inherited, of `object`.
     *
     * @static
     * @memberOf _
     * @alias methods
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the new array of property names.
     * @example
     *
     * _.functions(_);
     * // => ['after', 'ary', 'assign', ...]
     */
function functions(object){return baseFunctions(object,keysIn(object))}/**
     * Gets the property value at `path` of `object`. If the resolved value is
     * `undefined` the `defaultValue` is used in its place.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
function get(object,path,defaultValue){var result=null==object?undefined:baseGet(object,toPath(path),path+"");return result===undefined?defaultValue:result}/**
     * Checks if `path` is a direct property.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` is a direct property, else `false`.
     * @example
     *
     * var object = { 'a': { 'b': { 'c': 3 } } };
     *
     * _.has(object, 'a');
     * // => true
     *
     * _.has(object, 'a.b.c');
     * // => true
     *
     * _.has(object, ['a', 'b', 'c']);
     * // => true
     */
function has(object,path){if(null==object)return!1;var result=hasOwnProperty.call(object,path);if(!result&&!isKey(path)){if(path=toPath(path),object=1==path.length?object:baseGet(object,baseSlice(path,0,-1)),null==object)return!1;path=last(path),result=hasOwnProperty.call(object,path)}return result||isLength(object.length)&&isIndex(path,object.length)&&(isArray(object)||isArguments(object))}/**
     * Creates an object composed of the inverted keys and values of `object`.
     * If `object` contains duplicate values, subsequent values overwrite property
     * assignments of previous values unless `multiValue` is `true`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to invert.
     * @param {boolean} [multiValue] Allow multiple values per key.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invert(object);
     * // => { '1': 'c', '2': 'b' }
     *
     * // with `multiValue`
     * _.invert(object, true);
     * // => { '1': ['a', 'c'], '2': ['b'] }
     */
function invert(object,multiValue,guard){guard&&isIterateeCall(object,multiValue,guard)&&(multiValue=undefined);for(var index=-1,props=keys(object),length=props.length,result={};++index<length;){var key=props[index],value=object[key];multiValue?hasOwnProperty.call(result,value)?result[value].push(key):result[value]=[key]:result[value]=key}return result}/**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */
function keysIn(object){if(null==object)return[];isObject(object)||(object=Object(object));var length=object.length;length=length&&isLength(length)&&(isArray(object)||isArguments(object))&&length||0;for(var Ctor=object.constructor,index=-1,isProto="function"==typeof Ctor&&Ctor.prototype===object,result=Array(length),skipIndexes=length>0;++index<length;)result[index]=index+"";for(var key in object)skipIndexes&&isIndex(key,length)||"constructor"==key&&(isProto||!hasOwnProperty.call(object,key))||result.push(key);return result}/**
     * Creates a two dimensional array of the key-value pairs for `object`,
     * e.g. `[[key1, value1], [key2, value2]]`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the new array of key-value pairs.
     * @example
     *
     * _.pairs({ 'barney': 36, 'fred': 40 });
     * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
     */
function pairs(object){object=toObject(object);for(var index=-1,props=keys(object),length=props.length,result=Array(length);++index<length;){var key=props[index];result[index]=[key,object[key]]}return result}/**
     * This method is like `_.get` except that if the resolved value is a function
     * it's invoked with the `this` binding of its parent object and its result
     * is returned.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to resolve.
     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
     *
     * _.result(object, 'a[0].b.c1');
     * // => 3
     *
     * _.result(object, 'a[0].b.c2');
     * // => 4
     *
     * _.result(object, 'a.b.c', 'default');
     * // => 'default'
     *
     * _.result(object, 'a.b.c', _.constant('default'));
     * // => 'default'
     */
function result(object,path,defaultValue){var result=null==object?undefined:object[path];return result===undefined&&(null==object||isKey(path,object)||(path=toPath(path),object=1==path.length?object:baseGet(object,baseSlice(path,0,-1)),result=null==object?undefined:object[last(path)]),result=result===undefined?defaultValue:result),isFunction(result)?result.call(object):result}/**
     * Sets the property value of `path` on `object`. If a portion of `path`
     * does not exist it's created.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to augment.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.set(object, 'a[0].b.c', 4);
     * console.log(object.a[0].b.c);
     * // => 4
     *
     * _.set(object, 'x[0].y.z', 5);
     * console.log(object.x[0].y.z);
     * // => 5
     */
function set(object,path,value){if(null==object)return object;var pathKey=path+"";path=null!=object[pathKey]||isKey(path,object)?[pathKey]:toPath(path);for(var index=-1,length=path.length,lastIndex=length-1,nested=object;null!=nested&&++index<length;){var key=path[index];isObject(nested)&&(index==lastIndex?nested[key]=value:null==nested[key]&&(nested[key]=isIndex(path[index+1])?[]:{})),nested=nested[key]}return object}/**
     * An alternative to `_.reduce`; this method transforms `object` to a new
     * `accumulator` object which is the result of running each of its own enumerable
     * properties through `iteratee`, with each invocation potentially mutating
     * the `accumulator` object. The `iteratee` is bound to `thisArg` and invoked
     * with four arguments: (accumulator, value, key, object). Iteratee functions
     * may exit iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Array|Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The custom accumulator value.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * _.transform([2, 3, 4], function(result, n) {
     *   result.push(n *= n);
     *   return n % 2 == 0;
     * });
     * // => [4, 9]
     *
     * _.transform({ 'a': 1, 'b': 2 }, function(result, n, key) {
     *   result[key] = n * 3;
     * });
     * // => { 'a': 3, 'b': 6 }
     */
function transform(object,iteratee,accumulator,thisArg){var isArr=isArray(object)||isTypedArray(object);if(iteratee=getCallback(iteratee,thisArg,4),null==accumulator)if(isArr||isObject(object)){var Ctor=object.constructor;accumulator=isArr?isArray(object)?new Ctor:[]:baseCreate(isFunction(Ctor)?Ctor.prototype:undefined)}else accumulator={};return(isArr?arrayEach:baseForOwn)(object,function(value,index,object){return iteratee(accumulator,value,index,object)}),accumulator}/**
     * Creates an array of the own enumerable property values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.values(new Foo);
     * // => [1, 2] (iteration order is not guaranteed)
     *
     * _.values('hi');
     * // => ['h', 'i']
     */
function values(object){return baseValues(object,keys(object))}/**
     * Creates an array of the own and inherited enumerable property values
     * of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.valuesIn(new Foo);
     * // => [1, 2, 3] (iteration order is not guaranteed)
     */
function valuesIn(object){return baseValues(object,keysIn(object))}/*------------------------------------------------------------------------*/
/**
     * Checks if `n` is between `start` and up to but not including, `end`. If
     * `end` is not specified it's set to `start` with `start` then set to `0`.
     *
     * @static
     * @memberOf _
     * @category Number
     * @param {number} n The number to check.
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `n` is in the range, else `false`.
     * @example
     *
     * _.inRange(3, 2, 4);
     * // => true
     *
     * _.inRange(4, 8);
     * // => true
     *
     * _.inRange(4, 2);
     * // => false
     *
     * _.inRange(2, 2);
     * // => false
     *
     * _.inRange(1.2, 2);
     * // => true
     *
     * _.inRange(5.2, 4);
     * // => false
     */
function inRange(value,start,end){return start=+start||0,end===undefined?(end=start,start=0):end=+end||0,value>=nativeMin(start,end)&&value<nativeMax(start,end)}/**
     * Produces a random number between `min` and `max` (inclusive). If only one
     * argument is provided a number between `0` and the given number is returned.
     * If `floating` is `true`, or either `min` or `max` are floats, a floating-point
     * number is returned instead of an integer.
     *
     * @static
     * @memberOf _
     * @category Number
     * @param {number} [min=0] The minimum possible value.
     * @param {number} [max=1] The maximum possible value.
     * @param {boolean} [floating] Specify returning a floating-point number.
     * @returns {number} Returns the random number.
     * @example
     *
     * _.random(0, 5);
     * // => an integer between 0 and 5
     *
     * _.random(5);
     * // => also an integer between 0 and 5
     *
     * _.random(5, true);
     * // => a floating-point number between 0 and 5
     *
     * _.random(1.2, 5.2);
     * // => a floating-point number between 1.2 and 5.2
     */
function random(min,max,floating){floating&&isIterateeCall(min,max,floating)&&(max=floating=undefined);var noMin=null==min,noMax=null==max;if(null==floating&&(noMax&&"boolean"==typeof min?(floating=min,min=1):"boolean"==typeof max&&(floating=max,noMax=!0)),noMin&&noMax&&(max=1,noMax=!1),min=+min||0,noMax?(max=min,min=0):max=+max||0,floating||min%1||max%1){var rand=nativeRandom();return nativeMin(min+rand*(max-min+parseFloat("1e-"+((rand+"").length-1))),max)}return baseRandom(min,max)}/**
     * Capitalizes the first character of `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to capitalize.
     * @returns {string} Returns the capitalized string.
     * @example
     *
     * _.capitalize('fred');
     * // => 'Fred'
     */
function capitalize(string){return string=baseToString(string),string&&string.charAt(0).toUpperCase()+string.slice(1)}/**
     * Deburrs `string` by converting [latin-1 supplementary letters](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
     * to basic latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to deburr.
     * @returns {string} Returns the deburred string.
     * @example
     *
     * _.deburr('déjà vu');
     * // => 'deja vu'
     */
function deburr(string){return string=baseToString(string),string&&string.replace(reLatin1,deburrLetter).replace(reComboMark,"")}/**
     * Checks if `string` ends with the given target string.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to search.
     * @param {string} [target] The string to search for.
     * @param {number} [position=string.length] The position to search from.
     * @returns {boolean} Returns `true` if `string` ends with `target`, else `false`.
     * @example
     *
     * _.endsWith('abc', 'c');
     * // => true
     *
     * _.endsWith('abc', 'b');
     * // => false
     *
     * _.endsWith('abc', 'b', 2);
     * // => true
     */
function endsWith(string,target,position){string=baseToString(string),target+="";var length=string.length;return position=position===undefined?length:nativeMin(position<0?0:+position||0,length),position-=target.length,position>=0&&string.indexOf(target,position)==position}/**
     * Converts the characters "&", "<", ">", '"', "'", and "\`", in `string` to
     * their corresponding HTML entities.
     *
     * **Note:** No other characters are escaped. To escape additional characters
     * use a third-party library like [_he_](https://mths.be/he).
     *
     * Though the ">" character is escaped for symmetry, characters like
     * ">" and "/" don't need escaping in HTML and have no special meaning
     * unless they're part of a tag or unquoted attribute value.
     * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
     * (under "semi-related fun fact") for more details.
     *
     * Backticks are escaped because in Internet Explorer < 9, they can break out
     * of attribute values or HTML comments. See [#59](https://html5sec.org/#59),
     * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
     * [#133](https://html5sec.org/#133) of the [HTML5 Security Cheatsheet](https://html5sec.org/)
     * for more details.
     *
     * When working with HTML you should always [quote attribute values](http://wonko.com/post/html-escaping)
     * to reduce XSS vectors.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('fred, barney, & pebbles');
     * // => 'fred, barney, &amp; pebbles'
     */
function escape(string){
// Reset `lastIndex` because in IE < 9 `String#replace` does not.
return string=baseToString(string),string&&reHasUnescapedHtml.test(string)?string.replace(reUnescapedHtml,escapeHtmlChar):string}/**
     * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
     * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escapeRegExp('[lodash](https://lodash.com/)');
     * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
     */
function escapeRegExp(string){return string=baseToString(string),string&&reHasRegExpChars.test(string)?string.replace(reRegExpChars,escapeRegExpChar):string||"(?:)"}/**
     * Pads `string` on the left and right sides if it's shorter than `length`.
     * Padding characters are truncated if they can't be evenly divided by `length`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.pad('abc', 8);
     * // => '  abc   '
     *
     * _.pad('abc', 8, '_-');
     * // => '_-abc_-_'
     *
     * _.pad('abc', 3);
     * // => 'abc'
     */
function pad(string,length,chars){string=baseToString(string),length=+length;var strLength=string.length;if(strLength>=length||!nativeIsFinite(length))return string;var mid=(length-strLength)/2,leftLength=nativeFloor(mid),rightLength=nativeCeil(mid);return chars=createPadding("",rightLength,chars),chars.slice(0,leftLength)+string+chars}/**
     * Converts `string` to an integer of the specified radix. If `radix` is
     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a hexadecimal,
     * in which case a `radix` of `16` is used.
     *
     * **Note:** This method aligns with the [ES5 implementation](https://es5.github.io/#E)
     * of `parseInt`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} string The string to convert.
     * @param {number} [radix] The radix to interpret `value` by.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.parseInt('08');
     * // => 8
     *
     * _.map(['6', '08', '10'], _.parseInt);
     * // => [6, 8, 10]
     */
function parseInt(string,radix,guard){
// Firefox < 21 and Opera < 15 follow ES3 for `parseInt`.
// Chrome fails to trim leading <BOM> whitespace characters.
// See https://code.google.com/p/v8/issues/detail?id=3109 for more details.
return(guard?isIterateeCall(string,radix,guard):null==radix)?radix=0:radix&&(radix=+radix),string=trim(string),nativeParseInt(string,radix||(reHasHexPrefix.test(string)?16:10))}/**
     * Repeats the given string `n` times.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to repeat.
     * @param {number} [n=0] The number of times to repeat the string.
     * @returns {string} Returns the repeated string.
     * @example
     *
     * _.repeat('*', 3);
     * // => '***'
     *
     * _.repeat('abc', 2);
     * // => 'abcabc'
     *
     * _.repeat('abc', 0);
     * // => ''
     */
function repeat(string,n){var result="";if(string=baseToString(string),n=+n,n<1||!string||!nativeIsFinite(n))return result;
// Leverage the exponentiation by squaring algorithm for a faster repeat.
// See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
do n%2&&(result+=string),n=nativeFloor(n/2),string+=string;while(n);return result}/**
     * Checks if `string` starts with the given target string.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to search.
     * @param {string} [target] The string to search for.
     * @param {number} [position=0] The position to search from.
     * @returns {boolean} Returns `true` if `string` starts with `target`, else `false`.
     * @example
     *
     * _.startsWith('abc', 'a');
     * // => true
     *
     * _.startsWith('abc', 'b');
     * // => false
     *
     * _.startsWith('abc', 'b', 1);
     * // => true
     */
function startsWith(string,target,position){return string=baseToString(string),position=null==position?0:nativeMin(position<0?0:+position||0,string.length),string.lastIndexOf(target,position)==position}/**
     * Creates a compiled template function that can interpolate data properties
     * in "interpolate" delimiters, HTML-escape interpolated data properties in
     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
     * properties may be accessed as free variables in the template. If a setting
     * object is provided it takes precedence over `_.templateSettings` values.
     *
     * **Note:** In the development build `_.template` utilizes
     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
     * for easier debugging.
     *
     * For more information on precompiling templates see
     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
     *
     * For more information on Chrome extension sandboxes see
     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The template string.
     * @param {Object} [options] The options object.
     * @param {RegExp} [options.escape] The HTML "escape" delimiter.
     * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
     * @param {Object} [options.imports] An object to import into the template as free variables.
     * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
     * @param {string} [options.sourceURL] The sourceURL of the template's compiled source.
     * @param {string} [options.variable] The data object variable name.
     * @param- {Object} [otherOptions] Enables the legacy `options` param signature.
     * @returns {Function} Returns the compiled template function.
     * @example
     *
     * // using the "interpolate" delimiter to create a compiled template
     * var compiled = _.template('hello <%= user %>!');
     * compiled({ 'user': 'fred' });
     * // => 'hello fred!'
     *
     * // using the HTML "escape" delimiter to escape data property values
     * var compiled = _.template('<b><%- value %></b>');
     * compiled({ 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // using the "evaluate" delimiter to execute JavaScript and generate HTML
     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the internal `print` function in "evaluate" delimiters
     * var compiled = _.template('<% print("hello " + user); %>!');
     * compiled({ 'user': 'barney' });
     * // => 'hello barney!'
     *
     * // using the ES delimiter as an alternative to the default "interpolate" delimiter
     * var compiled = _.template('hello ${ user }!');
     * compiled({ 'user': 'pebbles' });
     * // => 'hello pebbles!'
     *
     * // using custom template delimiters
     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
     * var compiled = _.template('hello {{ user }}!');
     * compiled({ 'user': 'mustache' });
     * // => 'hello mustache!'
     *
     * // using backslashes to treat delimiters as plain text
     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
     * compiled({ 'value': 'ignored' });
     * // => '<%- value %>'
     *
     * // using the `imports` option to import `jQuery` as `jq`
     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the `sourceURL` option to specify a custom sourceURL for the template
     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
     *
     * // using the `variable` option to ensure a with-statement isn't used in the compiled template
     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     * //   var __t, __p = '';
     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
     * //   return __p;
     * // }
     *
     * // using the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and a stack trace
     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */
function template(string,options,otherOptions){
// Based on John Resig's `tmpl` implementation (http://ejohn.org/blog/javascript-micro-templating/)
// and Laura Doktorova's doT.js (https://github.com/olado/doT).
var settings=lodash.templateSettings;otherOptions&&isIterateeCall(string,options,otherOptions)&&(options=otherOptions=undefined),string=baseToString(string),options=assignWith(baseAssign({},otherOptions||options),settings,assignOwnDefaults);var isEscaping,isEvaluating,imports=assignWith(baseAssign({},options.imports),settings.imports,assignOwnDefaults),importsKeys=keys(imports),importsValues=baseValues(imports,importsKeys),index=0,interpolate=options.interpolate||reNoMatch,source="__p += '",reDelimiters=RegExp((options.escape||reNoMatch).source+"|"+interpolate.source+"|"+(interpolate===reInterpolate?reEsTemplate:reNoMatch).source+"|"+(options.evaluate||reNoMatch).source+"|$","g"),sourceURL="//# sourceURL="+("sourceURL"in options?options.sourceURL:"lodash.templateSources["+ ++templateCounter+"]")+"\n";string.replace(reDelimiters,function(match,escapeValue,interpolateValue,esTemplateValue,evaluateValue,offset){
// The JS engine embedded in Adobe products requires returning the `match`
// string in order to produce the correct `offset` value.
// Escape characters that can't be included in string literals.
// Replace delimiters with snippets.
return interpolateValue||(interpolateValue=esTemplateValue),source+=string.slice(index,offset).replace(reUnescapedString,escapeStringChar),escapeValue&&(isEscaping=!0,source+="' +\n__e("+escapeValue+") +\n'"),evaluateValue&&(isEvaluating=!0,source+="';\n"+evaluateValue+";\n__p += '"),interpolateValue&&(source+="' +\n((__t = ("+interpolateValue+")) == null ? '' : __t) +\n'"),index=offset+match.length,match}),source+="';\n";
// If `variable` is not specified wrap a with-statement around the generated
// code to add the data object to the top of the scope chain.
var variable=options.variable;variable||(source="with (obj) {\n"+source+"\n}\n"),
// Cleanup code by stripping empty strings.
source=(isEvaluating?source.replace(reEmptyStringLeading,""):source).replace(reEmptyStringMiddle,"$1").replace(reEmptyStringTrailing,"$1;"),
// Frame code as the function body.
source="function("+(variable||"obj")+") {\n"+(variable?"":"obj || (obj = {});\n")+"var __t, __p = ''"+(isEscaping?", __e = _.escape":"")+(isEvaluating?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+source+"return __p\n}";var result=attempt(function(){return Function(importsKeys,sourceURL+"return "+source).apply(undefined,importsValues)});if(
// Provide the compiled function's source by its `toString` method or
// the `source` property as a convenience for inlining compiled templates.
result.source=source,isError(result))throw result;return result}/**
     * Removes leading and trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trim('  abc  ');
     * // => 'abc'
     *
     * _.trim('-_-abc-_-', '_-');
     * // => 'abc'
     *
     * _.map(['  foo  ', '  bar  '], _.trim);
     * // => ['foo', 'bar']
     */
function trim(string,chars,guard){var value=string;return(string=baseToString(string))?(guard?isIterateeCall(value,chars,guard):null==chars)?string.slice(trimmedLeftIndex(string),trimmedRightIndex(string)+1):(chars+="",string.slice(charsLeftIndex(string,chars),charsRightIndex(string,chars)+1)):string}/**
     * Removes leading whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimLeft('  abc  ');
     * // => 'abc  '
     *
     * _.trimLeft('-_-abc-_-', '_-');
     * // => 'abc-_-'
     */
function trimLeft(string,chars,guard){var value=string;return string=baseToString(string),string?(guard?isIterateeCall(value,chars,guard):null==chars)?string.slice(trimmedLeftIndex(string)):string.slice(charsLeftIndex(string,chars+"")):string}/**
     * Removes trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimRight('  abc  ');
     * // => '  abc'
     *
     * _.trimRight('-_-abc-_-', '_-');
     * // => '-_-abc'
     */
function trimRight(string,chars,guard){var value=string;return string=baseToString(string),string?(guard?isIterateeCall(value,chars,guard):null==chars)?string.slice(0,trimmedRightIndex(string)+1):string.slice(0,charsRightIndex(string,chars+"")+1):string}/**
     * Truncates `string` if it's longer than the given maximum string length.
     * The last characters of the truncated string are replaced with the omission
     * string which defaults to "...".
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to truncate.
     * @param {Object|number} [options] The options object or maximum string length.
     * @param {number} [options.length=30] The maximum string length.
     * @param {string} [options.omission='...'] The string to indicate text is omitted.
     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the truncated string.
     * @example
     *
     * _.trunc('hi-diddly-ho there, neighborino');
     * // => 'hi-diddly-ho there, neighbo...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', 24);
     * // => 'hi-diddly-ho there, n...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': ' '
     * });
     * // => 'hi-diddly-ho there,...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': /,? +/
     * });
     * // => 'hi-diddly-ho there...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', {
     *   'omission': ' [...]'
     * });
     * // => 'hi-diddly-ho there, neig [...]'
     */
function trunc(string,options,guard){guard&&isIterateeCall(string,options,guard)&&(options=undefined);var length=DEFAULT_TRUNC_LENGTH,omission=DEFAULT_TRUNC_OMISSION;if(null!=options)if(isObject(options)){var separator="separator"in options?options.separator:separator;length="length"in options?+options.length||0:length,omission="omission"in options?baseToString(options.omission):omission}else length=+options||0;if(string=baseToString(string),length>=string.length)return string;var end=length-omission.length;if(end<1)return omission;var result=string.slice(0,end);if(null==separator)return result+omission;if(isRegExp(separator)){if(string.slice(end).search(separator)){var match,newEnd,substring=string.slice(0,end);for(separator.global||(separator=RegExp(separator.source,(reFlags.exec(separator)||"")+"g")),separator.lastIndex=0;match=separator.exec(substring);)newEnd=match.index;result=result.slice(0,null==newEnd?end:newEnd)}}else if(string.indexOf(separator,end)!=end){var index=result.lastIndexOf(separator);index>-1&&(result=result.slice(0,index))}return result+omission}/**
     * The inverse of `_.escape`; this method converts the HTML entities
     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, and `&#96;` in `string` to their
     * corresponding characters.
     *
     * **Note:** No other HTML entities are unescaped. To unescape additional HTML
     * entities use a third-party library like [_he_](https://mths.be/he).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to unescape.
     * @returns {string} Returns the unescaped string.
     * @example
     *
     * _.unescape('fred, barney, &amp; pebbles');
     * // => 'fred, barney, & pebbles'
     */
function unescape(string){return string=baseToString(string),string&&reHasEscapedHtml.test(string)?string.replace(reEscapedHtml,unescapeHtmlChar):string}/**
     * Splits `string` into an array of its words.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {RegExp|string} [pattern] The pattern to match words.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the words of `string`.
     * @example
     *
     * _.words('fred, barney, & pebbles');
     * // => ['fred', 'barney', 'pebbles']
     *
     * _.words('fred, barney, & pebbles', /[^, ]+/g);
     * // => ['fred', 'barney', '&', 'pebbles']
     */
function words(string,pattern,guard){return guard&&isIterateeCall(string,pattern,guard)&&(pattern=undefined),string=baseToString(string),string.match(pattern||reWords)||[]}/**
     * Creates a function that invokes `func` with the `this` binding of `thisArg`
     * and arguments of the created function. If `func` is a property name the
     * created callback returns the property value for a given element. If `func`
     * is an object the created callback returns `true` for elements that contain
     * the equivalent object properties, otherwise it returns `false`.
     *
     * @static
     * @memberOf _
     * @alias iteratee
     * @category Utility
     * @param {*} [func=_.identity] The value to convert to a callback.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Function} Returns the callback.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * // wrap to create custom callback shorthands
     * _.callback = _.wrap(_.callback, function(callback, func, thisArg) {
     *   var match = /^(.+?)__([gl]t)(.+)$/.exec(func);
     *   if (!match) {
     *     return callback(func, thisArg);
     *   }
     *   return function(object) {
     *     return match[2] == 'gt'
     *       ? object[match[1]] > match[3]
     *       : object[match[1]] < match[3];
     *   };
     * });
     *
     * _.filter(users, 'age__gt36');
     * // => [{ 'user': 'fred', 'age': 40 }]
     */
function callback(func,thisArg,guard){return guard&&isIterateeCall(func,thisArg,guard)&&(thisArg=undefined),isObjectLike(func)?matches(func):baseCallback(func,thisArg)}/**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var object = { 'user': 'fred' };
     * var getter = _.constant(object);
     *
     * getter() === object;
     * // => true
     */
function constant(value){return function(){return value}}/**
     * This method returns the first argument provided to it.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'user': 'fred' };
     *
     * _.identity(object) === object;
     * // => true
     */
function identity(value){return value}/**
     * Creates a function that performs a deep comparison between a given object
     * and `source`, returning `true` if the given object has equivalent property
     * values, else `false`.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. For comparing a single
     * own or inherited property value see `_.matchesProperty`.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.filter(users, _.matches({ 'age': 40, 'active': false }));
     * // => [{ 'user': 'fred', 'age': 40, 'active': false }]
     */
function matches(source){return baseMatches(baseClone(source,!0))}/**
     * Creates a function that compares the property value of `path` on a given
     * object to `value`.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Array|string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * _.find(users, _.matchesProperty('user', 'fred'));
     * // => { 'user': 'fred' }
     */
function matchesProperty(path,srcValue){return baseMatchesProperty(path,baseClone(srcValue,!0))}/**
     * Adds all own enumerable function properties of a source object to the
     * destination object. If `object` is a function then methods are added to
     * its prototype as well.
     *
     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
     * avoid conflicts caused by modifying the original.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Function|Object} [object=lodash] The destination object.
     * @param {Object} source The object of functions to add.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.chain=true] Specify whether the functions added
     *  are chainable.
     * @returns {Function|Object} Returns `object`.
     * @example
     *
     * function vowels(string) {
     *   return _.filter(string, function(v) {
     *     return /[aeiou]/i.test(v);
     *   });
     * }
     *
     * _.mixin({ 'vowels': vowels });
     * _.vowels('fred');
     * // => ['e']
     *
     * _('fred').vowels().value();
     * // => ['e']
     *
     * _.mixin({ 'vowels': vowels }, { 'chain': false });
     * _('fred').vowels();
     * // => ['e']
     */
function mixin(object,source,options){if(null==options){var isObj=isObject(source),props=isObj?keys(source):undefined,methodNames=props&&props.length?baseFunctions(source,props):undefined;(methodNames?methodNames.length:isObj)||(methodNames=!1,options=source,source=object,object=this)}methodNames||(methodNames=baseFunctions(source,keys(source)));var chain=!0,index=-1,isFunc=isFunction(object),length=methodNames.length;options===!1?chain=!1:isObject(options)&&"chain"in options&&(chain=options.chain);for(;++index<length;){var methodName=methodNames[index],func=source[methodName];object[methodName]=func,isFunc&&(object.prototype[methodName]=function(func){return function(){var chainAll=this.__chain__;if(chain||chainAll){var result=object(this.__wrapped__),actions=result.__actions__=arrayCopy(this.__actions__);return actions.push({func:func,args:arguments,thisArg:object}),result.__chain__=chainAll,result}return func.apply(object,arrayPush([this.value()],arguments))}}(func))}return object}/**
     * Reverts the `_` variable to its previous value and returns a reference to
     * the `lodash` function.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @returns {Function} Returns the `lodash` function.
     * @example
     *
     * var lodash = _.noConflict();
     */
function noConflict(){return root._=oldDash,this}/**
     * A no-operation function that returns `undefined` regardless of the
     * arguments it receives.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @example
     *
     * var object = { 'user': 'fred' };
     *
     * _.noop(object) === undefined;
     * // => true
     */
function noop(){}/**
     * Creates a function that returns the property value at `path` on a
     * given object.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': { 'c': 2 } } },
     *   { 'a': { 'b': { 'c': 1 } } }
     * ];
     *
     * _.map(objects, _.property('a.b.c'));
     * // => [2, 1]
     *
     * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
     * // => [1, 2]
     */
function property(path){return isKey(path)?baseProperty(path):basePropertyDeep(path)}/**
     * The opposite of `_.property`; this method creates a function that returns
     * the property value at a given path on `object`.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var array = [0, 1, 2],
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
     * // => [2, 0]
     */
function propertyOf(object){return function(path){return baseGet(object,toPath(path),path+"")}}/**
     * Creates an array of numbers (positive and/or negative) progressing from
     * `start` up to, but not including, `end`. If `end` is not specified it's
     * set to `start` with `start` then set to `0`. If `end` is less than `start`
     * a zero-length range is created unless a negative `step` is specified.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the new array of numbers.
     * @example
     *
     * _.range(4);
     * // => [0, 1, 2, 3]
     *
     * _.range(1, 5);
     * // => [1, 2, 3, 4]
     *
     * _.range(0, 20, 5);
     * // => [0, 5, 10, 15]
     *
     * _.range(0, -4, -1);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.range(0);
     * // => []
     */
function range(start,end,step){step&&isIterateeCall(start,end,step)&&(end=step=undefined),start=+start||0,step=null==step?1:+step||0,null==end?(end=start,start=0):end=+end||0;for(
// Use `Array(length)` so engines like Chakra and V8 avoid slower modes.
// See https://youtu.be/XAqIpGU8ZZk#t=17m25s for more details.
var index=-1,length=nativeMax(nativeCeil((end-start)/(step||1)),0),result=Array(length);++index<length;)result[index]=start,start+=step;return result}/**
     * Invokes the iteratee function `n` times, returning an array of the results
     * of each invocation. The `iteratee` is bound to `thisArg` and invoked with
     * one argument; (index).
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * var diceRolls = _.times(3, _.partial(_.random, 1, 6, false));
     * // => [3, 6, 4]
     *
     * _.times(3, function(n) {
     *   mage.castSpell(n);
     * });
     * // => invokes `mage.castSpell(n)` three times with `n` of `0`, `1`, and `2`
     *
     * _.times(3, function(n) {
     *   this.cast(n);
     * }, mage);
     * // => also invokes `mage.castSpell(n)` three times
     */
function times(n,iteratee,thisArg){
// Exit early to avoid a JSC JIT bug in Safari 8
// where `Array(0)` is treated as `Array(1)`.
if(n=nativeFloor(n),n<1||!nativeIsFinite(n))return[];var index=-1,result=Array(nativeMin(n,MAX_ARRAY_LENGTH));for(iteratee=bindCallback(iteratee,thisArg,1);++index<n;)index<MAX_ARRAY_LENGTH?result[index]=iteratee(index):iteratee(index);return result}/**
     * Generates a unique ID. If `prefix` is provided the ID is appended to it.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {string} [prefix] The value to prefix the ID with.
     * @returns {string} Returns the unique ID.
     * @example
     *
     * _.uniqueId('contact_');
     * // => 'contact_104'
     *
     * _.uniqueId();
     * // => '105'
     */
function uniqueId(prefix){var id=++idCounter;return baseToString(prefix)+id}/*------------------------------------------------------------------------*/
/**
     * Adds two numbers.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {number} augend The first number to add.
     * @param {number} addend The second number to add.
     * @returns {number} Returns the sum.
     * @example
     *
     * _.add(6, 4);
     * // => 10
     */
function add(augend,addend){return(+augend||0)+(+addend||0)}/**
     * Gets the sum of the values in `collection`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {number} Returns the sum.
     * @example
     *
     * _.sum([4, 6]);
     * // => 10
     *
     * _.sum({ 'a': 4, 'b': 6 });
     * // => 10
     *
     * var objects = [
     *   { 'n': 4 },
     *   { 'n': 6 }
     * ];
     *
     * _.sum(objects, function(object) {
     *   return object.n;
     * });
     * // => 10
     *
     * // using the `_.property` callback shorthand
     * _.sum(objects, 'n');
     * // => 10
     */
function sum(collection,iteratee,thisArg){return thisArg&&isIterateeCall(collection,iteratee,thisArg)&&(iteratee=undefined),iteratee=getCallback(iteratee,thisArg,3),1==iteratee.length?arraySum(isArray(collection)?collection:toIterable(collection),iteratee):baseSum(collection,iteratee)}
// Avoid issues with some ES3 environments that attempt to use values, named
// after built-in constructors like `Object`, for the creation of literals.
// ES5 clears this up by stating that literals must use built-in constructors.
// See https://es5.github.io/#x11.1.5 for more details.
context=context?_.defaults(root.Object(),context,_.pick(root,contextProps)):root;/** Native constructor references. */
var Array=context.Array,Date=context.Date,Error=context.Error,Function=context.Function,Math=context.Math,Number=context.Number,Object=context.Object,RegExp=context.RegExp,String=context.String,TypeError=context.TypeError,arrayProto=Array.prototype,objectProto=Object.prototype,stringProto=String.prototype,fnToString=Function.prototype.toString,hasOwnProperty=objectProto.hasOwnProperty,idCounter=0,objToString=objectProto.toString,oldDash=root._,reIsNative=RegExp("^"+fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),ArrayBuffer=context.ArrayBuffer,clearTimeout=context.clearTimeout,parseFloat=context.parseFloat,pow=Math.pow,propertyIsEnumerable=objectProto.propertyIsEnumerable,Set=getNative(context,"Set"),setTimeout=context.setTimeout,splice=arrayProto.splice,Uint8Array=context.Uint8Array,WeakMap=getNative(context,"WeakMap"),nativeCeil=Math.ceil,nativeCreate=getNative(Object,"create"),nativeFloor=Math.floor,nativeIsArray=getNative(Array,"isArray"),nativeIsFinite=context.isFinite,nativeKeys=getNative(Object,"keys"),nativeMax=Math.max,nativeMin=Math.min,nativeNow=getNative(Date,"now"),nativeParseInt=context.parseInt,nativeRandom=Math.random,NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY,POSITIVE_INFINITY=Number.POSITIVE_INFINITY,MAX_ARRAY_LENGTH=4294967295,MAX_ARRAY_INDEX=MAX_ARRAY_LENGTH-1,HALF_MAX_ARRAY_LENGTH=MAX_ARRAY_LENGTH>>>1,MAX_SAFE_INTEGER=9007199254740991,metaMap=WeakMap&&new WeakMap,realNames={};lodash.support={};/**
     * By default, the template delimiters used by lodash are like those in
     * embedded Ruby (ERB). Change the following template settings to use
     * alternative delimiters.
     *
     * @static
     * @memberOf _
     * @type Object
     */
lodash.templateSettings={/**
       * Used to detect `data` property values to be HTML-escaped.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
escape:reEscape,/**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
evaluate:reEvaluate,/**
       * Used to detect `data` property values to inject.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
interpolate:reInterpolate,/**
       * Used to reference the data object in the template text.
       *
       * @memberOf _.templateSettings
       * @type string
       */
variable:"",/**
       * Used to import variables into the compiled template.
       *
       * @memberOf _.templateSettings
       * @type Object
       */
imports:{/**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type Function
         */
_:lodash}};/**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} prototype The object to inherit from.
     * @returns {Object} Returns the new object.
     */
var baseCreate=function(){function object(){}return function(prototype){if(isObject(prototype)){object.prototype=prototype;var result=new object;object.prototype=undefined}return result||{}}}(),baseEach=createBaseEach(baseForOwn),baseEachRight=createBaseEach(baseForOwnRight,!0),baseFor=createBaseFor(),baseForRight=createBaseFor(!0),baseSetData=metaMap?function(func,data){return metaMap.set(func,data),func}:identity,getData=metaMap?function(func){return metaMap.get(func)}:noop,getLength=baseProperty("length"),setData=function(){var count=0,lastCalled=0;return function(key,value){var stamp=now(),remaining=HOT_SPAN-(stamp-lastCalled);if(lastCalled=stamp,remaining>0){if(++count>=HOT_COUNT)return key}else count=0;return baseSetData(key,value)}}(),difference=restParam(function(array,values){return isObjectLike(array)&&isArrayLike(array)?baseDifference(array,baseFlatten(values,!1,!0)):[]}),findIndex=createFindIndex(),findLastIndex=createFindIndex(!0),intersection=restParam(function(arrays){for(var othLength=arrays.length,othIndex=othLength,caches=Array(length),indexOf=getIndexOf(),isCommon=indexOf===baseIndexOf,result=[];othIndex--;){var value=arrays[othIndex]=isArrayLike(value=arrays[othIndex])?value:[];caches[othIndex]=isCommon&&value.length>=120?createCache(othIndex&&value):null}var array=arrays[0],index=-1,length=array?array.length:0,seen=caches[0];outer:for(;++index<length;)if(value=array[index],(seen?cacheIndexOf(seen,value):indexOf(result,value,0))<0){for(var othIndex=othLength;--othIndex;){var cache=caches[othIndex];if((cache?cacheIndexOf(cache,value):indexOf(arrays[othIndex],value,0))<0)continue outer}seen&&seen.push(value),result.push(value)}return result}),pullAt=restParam(function(array,indexes){indexes=baseFlatten(indexes);var result=baseAt(array,indexes);return basePullAt(array,indexes.sort(baseCompareAscending)),result}),sortedIndex=createSortedIndex(),sortedLastIndex=createSortedIndex(!0),union=restParam(function(arrays){return baseUniq(baseFlatten(arrays,!1,!0))}),without=restParam(function(array,values){return isArrayLike(array)?baseDifference(array,values):[]}),zip=restParam(unzip),zipWith=restParam(function(arrays){var length=arrays.length,iteratee=length>2?arrays[length-2]:undefined,thisArg=length>1?arrays[length-1]:undefined;return length>2&&"function"==typeof iteratee?length-=2:(iteratee=length>1&&"function"==typeof thisArg?(--length,thisArg):undefined,thisArg=undefined),arrays.length=length,unzipWith(arrays,iteratee,thisArg)}),wrapperConcat=restParam(function(values){return values=baseFlatten(values),this.thru(function(array){return arrayConcat(isArray(array)?array:[toObject(array)],values)})}),at=restParam(function(collection,props){return baseAt(collection,baseFlatten(props))}),countBy=createAggregator(function(result,value,key){hasOwnProperty.call(result,key)?++result[key]:result[key]=1}),find=createFind(baseEach),findLast=createFind(baseEachRight,!0),forEach=createForEach(arrayEach,baseEach),forEachRight=createForEach(arrayEachRight,baseEachRight),groupBy=createAggregator(function(result,value,key){hasOwnProperty.call(result,key)?result[key].push(value):result[key]=[value]}),indexBy=createAggregator(function(result,value,key){result[key]=value}),invoke=restParam(function(collection,path,args){var index=-1,isFunc="function"==typeof path,isProp=isKey(path),result=isArrayLike(collection)?Array(collection.length):[];return baseEach(collection,function(value){var func=isFunc?path:isProp&&null!=value?value[path]:undefined;result[++index]=func?func.apply(value,args):invokePath(value,path,args)}),result}),partition=createAggregator(function(result,value,key){result[key?0:1].push(value)},function(){return[[],[]]}),reduce=createReduce(arrayReduce,baseEach),reduceRight=createReduce(arrayReduceRight,baseEachRight),sortByAll=restParam(function(collection,iteratees){if(null==collection)return[];var guard=iteratees[2];return guard&&isIterateeCall(iteratees[0],iteratees[1],guard)&&(iteratees.length=1),baseSortByOrder(collection,baseFlatten(iteratees),[])}),now=nativeNow||function(){return(new Date).getTime()},bind=restParam(function(func,thisArg,partials){var bitmask=BIND_FLAG;if(partials.length){var holders=replaceHolders(partials,bind.placeholder);bitmask|=PARTIAL_FLAG}return createWrapper(func,bitmask,thisArg,partials,holders)}),bindAll=restParam(function(object,methodNames){methodNames=methodNames.length?baseFlatten(methodNames):functions(object);for(var index=-1,length=methodNames.length;++index<length;){var key=methodNames[index];object[key]=createWrapper(object[key],BIND_FLAG,object)}return object}),bindKey=restParam(function(object,key,partials){var bitmask=BIND_FLAG|BIND_KEY_FLAG;if(partials.length){var holders=replaceHolders(partials,bindKey.placeholder);bitmask|=PARTIAL_FLAG}return createWrapper(key,bitmask,object,partials,holders)}),curry=createCurry(CURRY_FLAG),curryRight=createCurry(CURRY_RIGHT_FLAG),defer=restParam(function(func,args){return baseDelay(func,1,args)}),delay=restParam(function(func,wait,args){return baseDelay(func,wait,args)}),flow=createFlow(),flowRight=createFlow(!0),modArgs=restParam(function(func,transforms){if(transforms=baseFlatten(transforms),"function"!=typeof func||!arrayEvery(transforms,baseIsFunction))throw new TypeError(FUNC_ERROR_TEXT);var length=transforms.length;return restParam(function(args){for(var index=nativeMin(args.length,length);index--;)args[index]=transforms[index](args[index]);return func.apply(this,args)})}),partial=createPartial(PARTIAL_FLAG),partialRight=createPartial(PARTIAL_RIGHT_FLAG),rearg=restParam(function(func,indexes){return createWrapper(func,REARG_FLAG,undefined,undefined,undefined,baseFlatten(indexes))}),isArray=nativeIsArray||function(value){return isObjectLike(value)&&isLength(value.length)&&objToString.call(value)==arrayTag},merge=createAssigner(baseMerge),assign=createAssigner(function(object,source,customizer){return customizer?assignWith(object,source,customizer):baseAssign(object,source)}),defaults=createDefaults(assign,assignDefaults),defaultsDeep=createDefaults(merge,mergeDefaults),findKey=createFindKey(baseForOwn),findLastKey=createFindKey(baseForOwnRight),forIn=createForIn(baseFor),forInRight=createForIn(baseForRight),forOwn=createForOwn(baseForOwn),forOwnRight=createForOwn(baseForOwnRight),keys=nativeKeys?function(object){var Ctor=null==object?undefined:object.constructor;return"function"==typeof Ctor&&Ctor.prototype===object||"function"!=typeof object&&isArrayLike(object)?shimKeys(object):isObject(object)?nativeKeys(object):[]}:shimKeys,mapKeys=createObjectMapper(!0),mapValues=createObjectMapper(),omit=restParam(function(object,props){if(null==object)return{};if("function"!=typeof props[0]){var props=arrayMap(baseFlatten(props),String);return pickByArray(object,baseDifference(keysIn(object),props))}var predicate=bindCallback(props[0],props[1],3);return pickByCallback(object,function(value,key,object){return!predicate(value,key,object)})}),pick=restParam(function(object,props){return null==object?{}:"function"==typeof props[0]?pickByCallback(object,bindCallback(props[0],props[1],3)):pickByArray(object,baseFlatten(props))}),camelCase=createCompounder(function(result,word,index){return word=word.toLowerCase(),result+(index?word.charAt(0).toUpperCase()+word.slice(1):word)}),kebabCase=createCompounder(function(result,word,index){return result+(index?"-":"")+word.toLowerCase()}),padLeft=createPadDir(),padRight=createPadDir(!0),snakeCase=createCompounder(function(result,word,index){return result+(index?"_":"")+word.toLowerCase()}),startCase=createCompounder(function(result,word,index){return result+(index?" ":"")+(word.charAt(0).toUpperCase()+word.slice(1))}),attempt=restParam(function(func,args){try{return func.apply(undefined,args)}catch(e){return isError(e)?e:new Error(e)}}),method=restParam(function(path,args){return function(object){return invokePath(object,path,args)}}),methodOf=restParam(function(object,args){return function(path){return invokePath(object,path,args)}}),ceil=createRound("ceil"),floor=createRound("floor"),max=createExtremum(gt,NEGATIVE_INFINITY),min=createExtremum(lt,POSITIVE_INFINITY),round=createRound("round");/*------------------------------------------------------------------------*/
// Ensure wrappers are instances of `baseLodash`.
// Add functions to the `Map` cache.
// Add functions to the `Set` cache.
// Assign cache to `_.memoize`.
// Add functions that return wrapped values when chaining.
// Add aliases.
// Add functions to `lodash.prototype`.
/*------------------------------------------------------------------------*/
// Add functions that return unwrapped values when chaining.
// Add aliases.
/*------------------------------------------------------------------------*/
// Add functions capable of returning wrapped and unwrapped values when chaining.
/*------------------------------------------------------------------------*/
/**
     * The semantic version number.
     *
     * @static
     * @memberOf _
     * @type string
     */
// Assign default placeholders.
// Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
// Add `LazyWrapper` methods that accept an `iteratee` value.
// Add `LazyWrapper` methods for `_.first` and `_.last`.
// Add `LazyWrapper` methods for `_.initial` and `_.rest`.
// Add `LazyWrapper` methods for `_.pluck` and `_.where`.
// Add `LazyWrapper` methods to `lodash.prototype`.
// Add `Array` and `String` methods to `lodash.prototype`.
// Map minified function names to their real names.
// Add functions to the lazy wrapper.
// Add chaining functions to the `lodash` wrapper.
// Add function aliases to the `lodash` wrapper.
return lodash.prototype=baseLodash.prototype,LodashWrapper.prototype=baseCreate(baseLodash.prototype),LodashWrapper.prototype.constructor=LodashWrapper,LazyWrapper.prototype=baseCreate(baseLodash.prototype),LazyWrapper.prototype.constructor=LazyWrapper,MapCache.prototype["delete"]=mapDelete,MapCache.prototype.get=mapGet,MapCache.prototype.has=mapHas,MapCache.prototype.set=mapSet,SetCache.prototype.push=cachePush,memoize.Cache=MapCache,lodash.after=after,lodash.ary=ary,lodash.assign=assign,lodash.at=at,lodash.before=before,lodash.bind=bind,lodash.bindAll=bindAll,lodash.bindKey=bindKey,lodash.callback=callback,lodash.chain=chain,lodash.chunk=chunk,lodash.compact=compact,lodash.constant=constant,lodash.countBy=countBy,lodash.create=create,lodash.curry=curry,lodash.curryRight=curryRight,lodash.debounce=debounce,lodash.defaults=defaults,lodash.defaultsDeep=defaultsDeep,lodash.defer=defer,lodash.delay=delay,lodash.difference=difference,lodash.drop=drop,lodash.dropRight=dropRight,lodash.dropRightWhile=dropRightWhile,lodash.dropWhile=dropWhile,lodash.fill=fill,lodash.filter=filter,lodash.flatten=flatten,lodash.flattenDeep=flattenDeep,lodash.flow=flow,lodash.flowRight=flowRight,lodash.forEach=forEach,lodash.forEachRight=forEachRight,lodash.forIn=forIn,lodash.forInRight=forInRight,lodash.forOwn=forOwn,lodash.forOwnRight=forOwnRight,lodash.functions=functions,lodash.groupBy=groupBy,lodash.indexBy=indexBy,lodash.initial=initial,lodash.intersection=intersection,lodash.invert=invert,lodash.invoke=invoke,lodash.keys=keys,lodash.keysIn=keysIn,lodash.map=map,lodash.mapKeys=mapKeys,lodash.mapValues=mapValues,lodash.matches=matches,lodash.matchesProperty=matchesProperty,lodash.memoize=memoize,lodash.merge=merge,lodash.method=method,lodash.methodOf=methodOf,lodash.mixin=mixin,lodash.modArgs=modArgs,lodash.negate=negate,lodash.omit=omit,lodash.once=once,lodash.pairs=pairs,lodash.partial=partial,lodash.partialRight=partialRight,lodash.partition=partition,lodash.pick=pick,lodash.pluck=pluck,lodash.property=property,lodash.propertyOf=propertyOf,lodash.pull=pull,lodash.pullAt=pullAt,lodash.range=range,lodash.rearg=rearg,lodash.reject=reject,lodash.remove=remove,lodash.rest=rest,lodash.restParam=restParam,lodash.set=set,lodash.shuffle=shuffle,lodash.slice=slice,lodash.sortBy=sortBy,lodash.sortByAll=sortByAll,lodash.sortByOrder=sortByOrder,lodash.spread=spread,lodash.take=take,lodash.takeRight=takeRight,lodash.takeRightWhile=takeRightWhile,lodash.takeWhile=takeWhile,lodash.tap=tap,lodash.throttle=throttle,lodash.thru=thru,lodash.times=times,lodash.toArray=toArray,lodash.toPlainObject=toPlainObject,lodash.transform=transform,lodash.union=union,lodash.uniq=uniq,lodash.unzip=unzip,lodash.unzipWith=unzipWith,lodash.values=values,lodash.valuesIn=valuesIn,lodash.where=where,lodash.without=without,lodash.wrap=wrap,lodash.xor=xor,lodash.zip=zip,lodash.zipObject=zipObject,lodash.zipWith=zipWith,lodash.backflow=flowRight,lodash.collect=map,lodash.compose=flowRight,lodash.each=forEach,lodash.eachRight=forEachRight,lodash.extend=assign,lodash.iteratee=callback,lodash.methods=functions,lodash.object=zipObject,lodash.select=filter,lodash.tail=rest,lodash.unique=uniq,mixin(lodash,lodash),lodash.add=add,lodash.attempt=attempt,lodash.camelCase=camelCase,lodash.capitalize=capitalize,lodash.ceil=ceil,lodash.clone=clone,lodash.cloneDeep=cloneDeep,lodash.deburr=deburr,lodash.endsWith=endsWith,lodash.escape=escape,lodash.escapeRegExp=escapeRegExp,lodash.every=every,lodash.find=find,lodash.findIndex=findIndex,lodash.findKey=findKey,lodash.findLast=findLast,lodash.findLastIndex=findLastIndex,lodash.findLastKey=findLastKey,lodash.findWhere=findWhere,lodash.first=first,lodash.floor=floor,lodash.get=get,lodash.gt=gt,lodash.gte=gte,lodash.has=has,lodash.identity=identity,lodash.includes=includes,lodash.indexOf=indexOf,lodash.inRange=inRange,lodash.isArguments=isArguments,lodash.isArray=isArray,lodash.isBoolean=isBoolean,lodash.isDate=isDate,lodash.isElement=isElement,lodash.isEmpty=isEmpty,lodash.isEqual=isEqual,lodash.isError=isError,lodash.isFinite=isFinite,lodash.isFunction=isFunction,lodash.isMatch=isMatch,lodash.isNaN=isNaN,lodash.isNative=isNative,lodash.isNull=isNull,lodash.isNumber=isNumber,lodash.isObject=isObject,lodash.isPlainObject=isPlainObject,lodash.isRegExp=isRegExp,lodash.isString=isString,lodash.isTypedArray=isTypedArray,lodash.isUndefined=isUndefined,lodash.kebabCase=kebabCase,lodash.last=last,lodash.lastIndexOf=lastIndexOf,lodash.lt=lt,lodash.lte=lte,lodash.max=max,lodash.min=min,lodash.noConflict=noConflict,lodash.noop=noop,lodash.now=now,lodash.pad=pad,lodash.padLeft=padLeft,lodash.padRight=padRight,lodash.parseInt=parseInt,lodash.random=random,lodash.reduce=reduce,lodash.reduceRight=reduceRight,lodash.repeat=repeat,lodash.result=result,lodash.round=round,lodash.runInContext=runInContext,lodash.size=size,lodash.snakeCase=snakeCase,lodash.some=some,lodash.sortedIndex=sortedIndex,lodash.sortedLastIndex=sortedLastIndex,lodash.startCase=startCase,lodash.startsWith=startsWith,lodash.sum=sum,lodash.template=template,lodash.trim=trim,lodash.trimLeft=trimLeft,lodash.trimRight=trimRight,lodash.trunc=trunc,lodash.unescape=unescape,lodash.uniqueId=uniqueId,lodash.words=words,lodash.all=every,lodash.any=some,lodash.contains=includes,lodash.eq=isEqual,lodash.detect=find,lodash.foldl=reduce,lodash.foldr=reduceRight,lodash.head=first,lodash.include=includes,lodash.inject=reduce,mixin(lodash,function(){var source={};return baseForOwn(lodash,function(func,methodName){lodash.prototype[methodName]||(source[methodName]=func)}),source}(),!1),lodash.sample=sample,lodash.prototype.sample=function(n){return this.__chain__||null!=n?this.thru(function(value){return sample(value,n)}):sample(this.value())},lodash.VERSION=VERSION,arrayEach(["bind","bindKey","curry","curryRight","partial","partialRight"],function(methodName){lodash[methodName].placeholder=lodash}),arrayEach(["drop","take"],function(methodName,index){LazyWrapper.prototype[methodName]=function(n){var filtered=this.__filtered__;if(filtered&&!index)return new LazyWrapper(this);n=null==n?1:nativeMax(nativeFloor(n)||0,0);var result=this.clone();return filtered?result.__takeCount__=nativeMin(result.__takeCount__,n):result.__views__.push({size:n,type:methodName+(result.__dir__<0?"Right":"")}),result},LazyWrapper.prototype[methodName+"Right"]=function(n){return this.reverse()[methodName](n).reverse()}}),arrayEach(["filter","map","takeWhile"],function(methodName,index){var type=index+1,isFilter=type!=LAZY_MAP_FLAG;LazyWrapper.prototype[methodName]=function(iteratee,thisArg){var result=this.clone();return result.__iteratees__.push({iteratee:getCallback(iteratee,thisArg,1),type:type}),result.__filtered__=result.__filtered__||isFilter,result}}),arrayEach(["first","last"],function(methodName,index){var takeName="take"+(index?"Right":"");LazyWrapper.prototype[methodName]=function(){return this[takeName](1).value()[0]}}),arrayEach(["initial","rest"],function(methodName,index){var dropName="drop"+(index?"":"Right");LazyWrapper.prototype[methodName]=function(){return this.__filtered__?new LazyWrapper(this):this[dropName](1)}}),arrayEach(["pluck","where"],function(methodName,index){var operationName=index?"filter":"map",createCallback=index?baseMatches:property;LazyWrapper.prototype[methodName]=function(value){return this[operationName](createCallback(value))}}),LazyWrapper.prototype.compact=function(){return this.filter(identity)},LazyWrapper.prototype.reject=function(predicate,thisArg){return predicate=getCallback(predicate,thisArg,1),this.filter(function(value){return!predicate(value)})},LazyWrapper.prototype.slice=function(start,end){start=null==start?0:+start||0;var result=this;return result.__filtered__&&(start>0||end<0)?new LazyWrapper(result):(start<0?result=result.takeRight(-start):start&&(result=result.drop(start)),end!==undefined&&(end=+end||0,result=end<0?result.dropRight(-end):result.take(end-start)),result)},LazyWrapper.prototype.takeRightWhile=function(predicate,thisArg){return this.reverse().takeWhile(predicate,thisArg).reverse()},LazyWrapper.prototype.toArray=function(){return this.take(POSITIVE_INFINITY)},baseForOwn(LazyWrapper.prototype,function(func,methodName){var checkIteratee=/^(?:filter|map|reject)|While$/.test(methodName),retUnwrapped=/^(?:first|last)$/.test(methodName),lodashFunc=lodash[retUnwrapped?"take"+("last"==methodName?"Right":""):methodName];lodashFunc&&(lodash.prototype[methodName]=function(){var args=retUnwrapped?[1]:arguments,chainAll=this.__chain__,value=this.__wrapped__,isHybrid=!!this.__actions__.length,isLazy=value instanceof LazyWrapper,iteratee=args[0],useLazy=isLazy||isArray(value);useLazy&&checkIteratee&&"function"==typeof iteratee&&1!=iteratee.length&&(
// Avoid lazy use if the iteratee has a "length" value other than `1`.
isLazy=useLazy=!1);var interceptor=function(value){return retUnwrapped&&chainAll?lodashFunc(value,1)[0]:lodashFunc.apply(undefined,arrayPush([value],args))},action={func:thru,args:[interceptor],thisArg:undefined},onlyLazy=isLazy&&!isHybrid;if(retUnwrapped&&!chainAll)return onlyLazy?(value=value.clone(),value.__actions__.push(action),func.call(value)):lodashFunc.call(undefined,this.value())[0];if(!retUnwrapped&&useLazy){value=onlyLazy?value:new LazyWrapper(this);var result=func.apply(value,args);return result.__actions__.push(action),new LodashWrapper(result,chainAll)}return this.thru(interceptor)})}),arrayEach(["join","pop","push","replace","shift","sort","splice","split","unshift"],function(methodName){var func=(/^(?:replace|split)$/.test(methodName)?stringProto:arrayProto)[methodName],chainName=/^(?:push|sort|unshift)$/.test(methodName)?"tap":"thru",retUnwrapped=/^(?:join|pop|replace|shift)$/.test(methodName);lodash.prototype[methodName]=function(){var args=arguments;return retUnwrapped&&!this.__chain__?func.apply(this.value(),args):this[chainName](function(value){return func.apply(value,args)})}}),baseForOwn(LazyWrapper.prototype,function(func,methodName){var lodashFunc=lodash[methodName];if(lodashFunc){var key=lodashFunc.name+"",names=realNames[key]||(realNames[key]=[]);names.push({name:methodName,func:lodashFunc})}}),realNames[createHybridWrapper(undefined,BIND_KEY_FLAG).name]=[{name:"wrapper",func:undefined}],LazyWrapper.prototype.clone=lazyClone,LazyWrapper.prototype.reverse=lazyReverse,LazyWrapper.prototype.value=lazyValue,lodash.prototype.chain=wrapperChain,lodash.prototype.commit=wrapperCommit,lodash.prototype.concat=wrapperConcat,lodash.prototype.plant=wrapperPlant,lodash.prototype.reverse=wrapperReverse,lodash.prototype.toString=wrapperToString,lodash.prototype.run=lodash.prototype.toJSON=lodash.prototype.valueOf=lodash.prototype.value=wrapperValue,lodash.prototype.collect=lodash.prototype.map,lodash.prototype.head=lodash.prototype.first,lodash.prototype.select=lodash.prototype.filter,lodash.prototype.tail=lodash.prototype.rest,lodash}/** Used as a safe reference for `undefined` in pre-ES5 environments. */
var undefined,VERSION="3.10.1",BIND_FLAG=1,BIND_KEY_FLAG=2,CURRY_BOUND_FLAG=4,CURRY_FLAG=8,CURRY_RIGHT_FLAG=16,PARTIAL_FLAG=32,PARTIAL_RIGHT_FLAG=64,ARY_FLAG=128,REARG_FLAG=256,DEFAULT_TRUNC_LENGTH=30,DEFAULT_TRUNC_OMISSION="...",HOT_COUNT=150,HOT_SPAN=16,LARGE_ARRAY_SIZE=200,LAZY_FILTER_FLAG=1,LAZY_MAP_FLAG=2,FUNC_ERROR_TEXT="Expected a function",PLACEHOLDER="__lodash_placeholder__",argsTag="[object Arguments]",arrayTag="[object Array]",boolTag="[object Boolean]",dateTag="[object Date]",errorTag="[object Error]",funcTag="[object Function]",mapTag="[object Map]",numberTag="[object Number]",objectTag="[object Object]",regexpTag="[object RegExp]",setTag="[object Set]",stringTag="[object String]",weakMapTag="[object WeakMap]",arrayBufferTag="[object ArrayBuffer]",float32Tag="[object Float32Array]",float64Tag="[object Float64Array]",int8Tag="[object Int8Array]",int16Tag="[object Int16Array]",int32Tag="[object Int32Array]",uint8Tag="[object Uint8Array]",uint8ClampedTag="[object Uint8ClampedArray]",uint16Tag="[object Uint16Array]",uint32Tag="[object Uint32Array]",reEmptyStringLeading=/\b__p \+= '';/g,reEmptyStringMiddle=/\b(__p \+=) '' \+/g,reEmptyStringTrailing=/(__e\(.*?\)|\b__t\)) \+\n'';/g,reEscapedHtml=/&(?:amp|lt|gt|quot|#39|#96);/g,reUnescapedHtml=/[&<>"'`]/g,reHasEscapedHtml=RegExp(reEscapedHtml.source),reHasUnescapedHtml=RegExp(reUnescapedHtml.source),reEscape=/<%-([\s\S]+?)%>/g,reEvaluate=/<%([\s\S]+?)%>/g,reInterpolate=/<%=([\s\S]+?)%>/g,reIsDeepProp=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,reIsPlainProp=/^\w*$/,rePropName=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,reRegExpChars=/^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,reHasRegExpChars=RegExp(reRegExpChars.source),reComboMark=/[\u0300-\u036f\ufe20-\ufe23]/g,reEscapeChar=/\\(\\)?/g,reEsTemplate=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,reFlags=/\w*$/,reHasHexPrefix=/^0[xX]/,reIsHostCtor=/^\[object .+?Constructor\]$/,reIsUint=/^\d+$/,reLatin1=/[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g,reNoMatch=/($^)/,reUnescapedString=/['\n\r\u2028\u2029\\]/g,reWords=function(){var upper="[A-Z\\xc0-\\xd6\\xd8-\\xde]",lower="[a-z\\xdf-\\xf6\\xf8-\\xff]+";return RegExp(upper+"+(?="+upper+lower+")|"+upper+"?"+lower+"|"+upper+"+|[0-9]+","g")}(),contextProps=["Array","ArrayBuffer","Date","Error","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Math","Number","Object","RegExp","Set","String","_","clearTimeout","isFinite","parseFloat","parseInt","setTimeout","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap"],templateCounter=-1,typedArrayTags={};typedArrayTags[float32Tag]=typedArrayTags[float64Tag]=typedArrayTags[int8Tag]=typedArrayTags[int16Tag]=typedArrayTags[int32Tag]=typedArrayTags[uint8Tag]=typedArrayTags[uint8ClampedTag]=typedArrayTags[uint16Tag]=typedArrayTags[uint32Tag]=!0,typedArrayTags[argsTag]=typedArrayTags[arrayTag]=typedArrayTags[arrayBufferTag]=typedArrayTags[boolTag]=typedArrayTags[dateTag]=typedArrayTags[errorTag]=typedArrayTags[funcTag]=typedArrayTags[mapTag]=typedArrayTags[numberTag]=typedArrayTags[objectTag]=typedArrayTags[regexpTag]=typedArrayTags[setTag]=typedArrayTags[stringTag]=typedArrayTags[weakMapTag]=!1;/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags={};cloneableTags[argsTag]=cloneableTags[arrayTag]=cloneableTags[arrayBufferTag]=cloneableTags[boolTag]=cloneableTags[dateTag]=cloneableTags[float32Tag]=cloneableTags[float64Tag]=cloneableTags[int8Tag]=cloneableTags[int16Tag]=cloneableTags[int32Tag]=cloneableTags[numberTag]=cloneableTags[objectTag]=cloneableTags[regexpTag]=cloneableTags[stringTag]=cloneableTags[uint8Tag]=cloneableTags[uint8ClampedTag]=cloneableTags[uint16Tag]=cloneableTags[uint32Tag]=!0,cloneableTags[errorTag]=cloneableTags[funcTag]=cloneableTags[mapTag]=cloneableTags[setTag]=cloneableTags[weakMapTag]=!1;/** Used to map latin-1 supplementary letters to basic latin letters. */
var deburredLetters={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss"},htmlEscapes={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"},htmlUnescapes={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'","&#96;":"`"},objectTypes={"function":!0,object:!0},regexpEscapes={0:"x30",1:"x31",2:"x32",3:"x33",4:"x34",5:"x35",6:"x36",7:"x37",8:"x38",9:"x39",A:"x41",B:"x42",C:"x43",D:"x44",E:"x45",F:"x46",a:"x61",b:"x62",c:"x63",d:"x64",e:"x65",f:"x66",n:"x6e",r:"x72",t:"x74",u:"x75",v:"x76",x:"x78"},stringEscapes={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},freeExports=objectTypes[typeof exports]&&exports&&!exports.nodeType&&exports,freeModule=objectTypes[typeof module]&&module&&!module.nodeType&&module,freeGlobal=freeExports&&freeModule&&"object"==typeof global&&global&&global.Object&&global,freeSelf=objectTypes[typeof self]&&self&&self.Object&&self,freeWindow=objectTypes[typeof window]&&window&&window.Object&&window,moduleExports=freeModule&&freeModule.exports===freeExports&&freeExports,root=freeGlobal||freeWindow!==(this&&this.window)&&freeWindow||freeSelf||this,_=runInContext();
// Some AMD build optimizers like r.js check for condition patterns like the following:
"function"==typeof define&&"object"==typeof define.amd&&define.amd?(
// Expose lodash to the global object when an AMD loader is present to avoid
// errors in cases where lodash is loaded by a script tag and not intended
// as an AMD module. See http://requirejs.org/docs/errors.html#mismatch for
// more details.
root._=_,
// Define as an anonymous module so, through path mapping, it can be
// referenced as the "underscore" module.
define(function(){return _})):freeExports&&freeModule?
// Export for Node.js or RingoJS.
moduleExports?(freeModule.exports=_)._=_:freeExports._=_:
// Export for a browser or Rhino.
root._=_}.call(this);