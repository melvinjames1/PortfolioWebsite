var ow=Object.defineProperty,aw=Object.defineProperties;var lw=Object.getOwnPropertyDescriptors;var iv=Object.getOwnPropertySymbols;var cw=Object.prototype.hasOwnProperty,uw=Object.prototype.propertyIsEnumerable;var rv=(n,e,t)=>e in n?ow(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,Ae=(n,e)=>{for(var t in e||={})cw.call(e,t)&&rv(n,t,e[t]);if(iv)for(var t of iv(e))uw.call(e,t)&&rv(n,t,e[t]);return n},zt=(n,e)=>aw(n,lw(e));var ys=(n,e,t)=>new Promise((i,r)=>{var s=l=>{try{a(t.next(l))}catch(c){r(c)}},o=l=>{try{a(t.throw(l))}catch(c){r(c)}},a=l=>l.done?i(l.value):Promise.resolve(l.value).then(s,o);a((t=t.apply(n,e)).next())});var sv=null;var th=1,ov=Symbol("SIGNAL");function bt(n){let e=sv;return sv=n,e}var av={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function dw(n){if(!(rh(n)&&!n.dirty)&&!(!n.dirty&&n.lastCleanEpoch===th)){if(!n.producerMustRecompute(n)&&!nh(n)){n.dirty=!1,n.lastCleanEpoch=th;return}n.producerRecomputeValue(n),n.dirty=!1,n.lastCleanEpoch=th}}function lv(n){return n&&(n.nextProducerIndex=0),bt(n)}function cv(n,e){if(bt(e),!(!n||n.producerNode===void 0||n.producerIndexOfThis===void 0||n.producerLastReadVersion===void 0)){if(rh(n))for(let t=n.nextProducerIndex;t<n.producerNode.length;t++)ih(n.producerNode[t],n.producerIndexOfThis[t]);for(;n.producerNode.length>n.nextProducerIndex;)n.producerNode.pop(),n.producerLastReadVersion.pop(),n.producerIndexOfThis.pop()}}function nh(n){tc(n);for(let e=0;e<n.producerNode.length;e++){let t=n.producerNode[e],i=n.producerLastReadVersion[e];if(i!==t.version||(dw(t),i!==t.version))return!0}return!1}function uv(n){if(tc(n),rh(n))for(let e=0;e<n.producerNode.length;e++)ih(n.producerNode[e],n.producerIndexOfThis[e]);n.producerNode.length=n.producerLastReadVersion.length=n.producerIndexOfThis.length=0,n.liveConsumerNode&&(n.liveConsumerNode.length=n.liveConsumerIndexOfThis.length=0)}function ih(n,e){if(fw(n),tc(n),n.liveConsumerNode.length===1)for(let i=0;i<n.producerNode.length;i++)ih(n.producerNode[i],n.producerIndexOfThis[i]);let t=n.liveConsumerNode.length-1;if(n.liveConsumerNode[e]=n.liveConsumerNode[t],n.liveConsumerIndexOfThis[e]=n.liveConsumerIndexOfThis[t],n.liveConsumerNode.length--,n.liveConsumerIndexOfThis.length--,e<n.liveConsumerNode.length){let i=n.liveConsumerIndexOfThis[e],r=n.liveConsumerNode[e];tc(r),r.producerIndexOfThis[i]=e}}function rh(n){return n.consumerIsAlwaysLive||(n?.liveConsumerNode?.length??0)>0}function tc(n){n.producerNode??=[],n.producerIndexOfThis??=[],n.producerLastReadVersion??=[]}function fw(n){n.liveConsumerNode??=[],n.liveConsumerIndexOfThis??=[]}function hw(){throw new Error}var pw=hw;function dv(n){pw=n}function je(n){return typeof n=="function"}function Js(n){let t=n(i=>{Error.call(i),i.stack=new Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var nc=Js(n=>function(t){n(this),this.message=t?`${t.length} errors occurred during unsubscription:
${t.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=t});function ma(n,e){if(n){let t=n.indexOf(e);0<=t&&n.splice(t,1)}}var tn=class n{constructor(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let e;if(!this.closed){this.closed=!0;let{_parentage:t}=this;if(t)if(this._parentage=null,Array.isArray(t))for(let s of t)s.remove(this);else t.remove(this);let{initialTeardown:i}=this;if(je(i))try{i()}catch(s){e=s instanceof nc?s.errors:[s]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let s of r)try{fv(s)}catch(o){e=e??[],o instanceof nc?e=[...e,...o.errors]:e.push(o)}}if(e)throw new nc(e)}}add(e){var t;if(e&&e!==this)if(this.closed)fv(e);else{if(e instanceof n){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(e)}}_hasParent(e){let{_parentage:t}=this;return t===e||Array.isArray(t)&&t.includes(e)}_addParent(e){let{_parentage:t}=this;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e}_removeParent(e){let{_parentage:t}=this;t===e?this._parentage=null:Array.isArray(t)&&ma(t,e)}remove(e){let{_finalizers:t}=this;t&&ma(t,e),e instanceof n&&e._removeParent(this)}};tn.EMPTY=(()=>{let n=new tn;return n.closed=!0,n})();var sh=tn.EMPTY;function ic(n){return n instanceof tn||n&&"closed"in n&&je(n.remove)&&je(n.add)&&je(n.unsubscribe)}function fv(n){je(n)?n():n.unsubscribe()}var yi={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var Ks={setTimeout(n,e,...t){let{delegate:i}=Ks;return i?.setTimeout?i.setTimeout(n,e,...t):setTimeout(n,e,...t)},clearTimeout(n){let{delegate:e}=Ks;return(e?.clearTimeout||clearTimeout)(n)},delegate:void 0};function rc(n){Ks.setTimeout(()=>{let{onUnhandledError:e}=yi;if(e)e(n);else throw n})}function ga(){}var hv=oh("C",void 0,void 0);function pv(n){return oh("E",void 0,n)}function mv(n){return oh("N",n,void 0)}function oh(n,e,t){return{kind:n,value:e,error:t}}var xs=null;function Qs(n){if(yi.useDeprecatedSynchronousErrorHandling){let e=!xs;if(e&&(xs={errorThrown:!1,error:null}),n(),e){let{errorThrown:t,error:i}=xs;if(xs=null,t)throw i}}else n()}function gv(n){yi.useDeprecatedSynchronousErrorHandling&&xs&&(xs.errorThrown=!0,xs.error=n)}var _s=class extends tn{constructor(e){super(),this.isStopped=!1,e?(this.destination=e,ic(e)&&e.add(this)):this.destination=vw}static create(e,t,i){return new eo(e,t,i)}next(e){this.isStopped?lh(mv(e),this):this._next(e)}error(e){this.isStopped?lh(pv(e),this):(this.isStopped=!0,this._error(e))}complete(){this.isStopped?lh(hv,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(e){this.destination.next(e)}_error(e){try{this.destination.error(e)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},mw=Function.prototype.bind;function ah(n,e){return mw.call(n,e)}var ch=class{constructor(e){this.partialObserver=e}next(e){let{partialObserver:t}=this;if(t.next)try{t.next(e)}catch(i){sc(i)}}error(e){let{partialObserver:t}=this;if(t.error)try{t.error(e)}catch(i){sc(i)}else sc(e)}complete(){let{partialObserver:e}=this;if(e.complete)try{e.complete()}catch(t){sc(t)}}},eo=class extends _s{constructor(e,t,i){super();let r;if(je(e)||!e)r={next:e??void 0,error:t??void 0,complete:i??void 0};else{let s;this&&yi.useDeprecatedNextContext?(s=Object.create(e),s.unsubscribe=()=>this.unsubscribe(),r={next:e.next&&ah(e.next,s),error:e.error&&ah(e.error,s),complete:e.complete&&ah(e.complete,s)}):r=e}this.destination=new ch(r)}};function sc(n){yi.useDeprecatedSynchronousErrorHandling?gv(n):rc(n)}function gw(n){throw n}function lh(n,e){let{onStoppedNotification:t}=yi;t&&Ks.setTimeout(()=>t(n,e))}var vw={closed:!0,next:ga,error:gw,complete:ga};var to=typeof Symbol=="function"&&Symbol.observable||"@@observable";function Wn(n){return n}function uh(...n){return dh(n)}function dh(n){return n.length===0?Wn:n.length===1?n[0]:function(t){return n.reduce((i,r)=>r(i),t)}}var It=(()=>{class n{constructor(t){t&&(this._subscribe=t)}lift(t){let i=new n;return i.source=this,i.operator=t,i}subscribe(t,i,r){let s=xw(t)?t:new eo(t,i,r);return Qs(()=>{let{operator:o,source:a}=this;s.add(o?o.call(s,a):a?this._subscribe(s):this._trySubscribe(s))}),s}_trySubscribe(t){try{return this._subscribe(t)}catch(i){t.error(i)}}forEach(t,i){return i=vv(i),new i((r,s)=>{let o=new eo({next:a=>{try{t(a)}catch(l){s(l),o.unsubscribe()}},error:s,complete:r});this.subscribe(o)})}_subscribe(t){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(t)}[to](){return this}pipe(...t){return dh(t)(this)}toPromise(t){return t=vv(t),new t((i,r)=>{let s;this.subscribe(o=>s=o,o=>r(o),()=>i(s))})}}return n.create=e=>new n(e),n})();function vv(n){var e;return(e=n??yi.Promise)!==null&&e!==void 0?e:Promise}function yw(n){return n&&je(n.next)&&je(n.error)&&je(n.complete)}function xw(n){return n&&n instanceof _s||yw(n)&&ic(n)}function fh(n){return je(n?.lift)}function pt(n){return e=>{if(fh(e))return e.lift(function(t){try{return n(t,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function mt(n,e,t,i,r){return new hh(n,e,t,i,r)}var hh=class extends _s{constructor(e,t,i,r,s,o){super(e),this.onFinalize=s,this.shouldUnsubscribe=o,this._next=t?function(a){try{t(a)}catch(l){e.error(l)}}:super._next,this._error=r?function(a){try{r(a)}catch(l){e.error(l)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){e.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:t}=this;super.unsubscribe(),!t&&((e=this.onFinalize)===null||e===void 0||e.call(this))}}};function no(){return pt((n,e)=>{let t=null;n._refCount++;let i=mt(e,void 0,void 0,void 0,()=>{if(!n||n._refCount<=0||0<--n._refCount){t=null;return}let r=n._connection,s=t;t=null,r&&(!s||r===s)&&r.unsubscribe(),e.unsubscribe()});n.subscribe(i),i.closed||(t=n.connect())})}var io=class extends It{constructor(e,t){super(),this.source=e,this.subjectFactory=t,this._subject=null,this._refCount=0,this._connection=null,fh(e)&&(this.lift=e.lift)}_subscribe(e){return this.getSubject().subscribe(e)}getSubject(){let e=this._subject;return(!e||e.isStopped)&&(this._subject=this.subjectFactory()),this._subject}_teardown(){this._refCount=0;let{_connection:e}=this;this._subject=this._connection=null,e?.unsubscribe()}connect(){let e=this._connection;if(!e){e=this._connection=new tn;let t=this.getSubject();e.add(this.source.subscribe(mt(t,void 0,()=>{this._teardown(),t.complete()},i=>{this._teardown(),t.error(i)},()=>this._teardown()))),e.closed&&(this._connection=null,e=tn.EMPTY)}return e}refCount(){return no()(this)}};var yv=Js(n=>function(){n(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var yn=(()=>{class n extends It{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(t){let i=new oc(this,this);return i.operator=t,i}_throwIfClosed(){if(this.closed)throw new yv}next(t){Qs(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(t)}})}error(t){Qs(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=t;let{observers:i}=this;for(;i.length;)i.shift().error(t)}})}complete(){Qs(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:t}=this;for(;t.length;)t.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var t;return((t=this.observers)===null||t===void 0?void 0:t.length)>0}_trySubscribe(t){return this._throwIfClosed(),super._trySubscribe(t)}_subscribe(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)}_innerSubscribe(t){let{hasError:i,isStopped:r,observers:s}=this;return i||r?sh:(this.currentObservers=null,s.push(t),new tn(()=>{this.currentObservers=null,ma(s,t)}))}_checkFinalizedStatuses(t){let{hasError:i,thrownError:r,isStopped:s}=this;i?t.error(r):s&&t.complete()}asObservable(){let t=new It;return t.source=this,t}}return n.create=(e,t)=>new oc(e,t),n})(),oc=class extends yn{constructor(e,t){super(),this.destination=e,this.source=t}next(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.next)===null||i===void 0||i.call(t,e)}error(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.error)===null||i===void 0||i.call(t,e)}complete(){var e,t;(t=(e=this.destination)===null||e===void 0?void 0:e.complete)===null||t===void 0||t.call(e)}_subscribe(e){var t,i;return(i=(t=this.source)===null||t===void 0?void 0:t.subscribe(e))!==null&&i!==void 0?i:sh}};var dn=class extends yn{constructor(e){super(),this._value=e}get value(){return this.getValue()}_subscribe(e){let t=super._subscribe(e);return!t.closed&&e.next(this._value),t}getValue(){let{hasError:e,thrownError:t,_value:i}=this;if(e)throw t;return this._throwIfClosed(),i}next(e){super.next(this._value=e)}};var jn=new It(n=>n.complete());function xv(n){return n&&je(n.schedule)}function _v(n){return n[n.length-1]}function bv(n){return je(_v(n))?n.pop():void 0}function Ir(n){return xv(_v(n))?n.pop():void 0}function Mv(n,e,t,i){function r(s){return s instanceof t?s:new t(function(o){o(s)})}return new(t||(t=Promise))(function(s,o){function a(u){try{c(i.next(u))}catch(d){o(d)}}function l(u){try{c(i.throw(u))}catch(d){o(d)}}function c(u){u.done?s(u.value):r(u.value).then(a,l)}c((i=i.apply(n,e||[])).next())})}function Sv(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function bs(n){return this instanceof bs?(this.v=n,this):new bs(n)}function wv(n,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=t.apply(n,e||[]),r,s=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",o),r[Symbol.asyncIterator]=function(){return this},r;function o(h){return function(g){return Promise.resolve(g).then(h,d)}}function a(h,g){i[h]&&(r[h]=function(x){return new Promise(function(m,p){s.push([h,x,m,p])>1||l(h,x)})},g&&(r[h]=g(r[h])))}function l(h,g){try{c(i[h](g))}catch(x){f(s[0][3],x)}}function c(h){h.value instanceof bs?Promise.resolve(h.value.v).then(u,d):f(s[0][2],h)}function u(h){l("next",h)}function d(h){l("throw",h)}function f(h,g){h(g),s.shift(),s.length&&l(s[0][0],s[0][1])}}function Ev(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=n[Symbol.asyncIterator],t;return e?e.call(n):(n=typeof Sv=="function"?Sv(n):n[Symbol.iterator](),t={},i("next"),i("throw"),i("return"),t[Symbol.asyncIterator]=function(){return this},t);function i(s){t[s]=n[s]&&function(o){return new Promise(function(a,l){o=n[s](o),r(a,l,o.done,o.value)})}}function r(s,o,a,l){Promise.resolve(l).then(function(c){s({value:c,done:a})},o)}}var ac=n=>n&&typeof n.length=="number"&&typeof n!="function";function lc(n){return je(n?.then)}function cc(n){return je(n[to])}function uc(n){return Symbol.asyncIterator&&je(n?.[Symbol.asyncIterator])}function dc(n){return new TypeError(`You provided ${n!==null&&typeof n=="object"?"an invalid object":`'${n}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function _w(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var fc=_w();function hc(n){return je(n?.[fc])}function pc(n){return wv(this,arguments,function*(){let t=n.getReader();try{for(;;){let{value:i,done:r}=yield bs(t.read());if(r)return yield bs(void 0);yield yield bs(i)}}finally{t.releaseLock()}})}function mc(n){return je(n?.getReader)}function on(n){if(n instanceof It)return n;if(n!=null){if(cc(n))return bw(n);if(ac(n))return Sw(n);if(lc(n))return Mw(n);if(uc(n))return Cv(n);if(hc(n))return ww(n);if(mc(n))return Ew(n)}throw dc(n)}function bw(n){return new It(e=>{let t=n[to]();if(je(t.subscribe))return t.subscribe(e);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function Sw(n){return new It(e=>{for(let t=0;t<n.length&&!e.closed;t++)e.next(n[t]);e.complete()})}function Mw(n){return new It(e=>{n.then(t=>{e.closed||(e.next(t),e.complete())},t=>e.error(t)).then(null,rc)})}function ww(n){return new It(e=>{for(let t of n)if(e.next(t),e.closed)return;e.complete()})}function Cv(n){return new It(e=>{Cw(n,e).catch(t=>e.error(t))})}function Ew(n){return Cv(pc(n))}function Cw(n,e){var t,i,r,s;return Mv(this,void 0,void 0,function*(){try{for(t=Ev(n);i=yield t.next(),!i.done;){let o=i.value;if(e.next(o),e.closed)return}}catch(o){r={error:o}}finally{try{i&&!i.done&&(s=t.return)&&(yield s.call(t))}finally{if(r)throw r.error}}e.complete()})}function Fn(n,e,t,i=0,r=!1){let s=e.schedule(function(){t(),r?n.add(this.schedule(null,i)):this.unsubscribe()},i);if(n.add(s),!r)return s}function gc(n,e=0){return pt((t,i)=>{t.subscribe(mt(i,r=>Fn(i,n,()=>i.next(r),e),()=>Fn(i,n,()=>i.complete(),e),r=>Fn(i,n,()=>i.error(r),e)))})}function vc(n,e=0){return pt((t,i)=>{i.add(n.schedule(()=>t.subscribe(i),e))})}function Tv(n,e){return on(n).pipe(vc(e),gc(e))}function Av(n,e){return on(n).pipe(vc(e),gc(e))}function Iv(n,e){return new It(t=>{let i=0;return e.schedule(function(){i===n.length?t.complete():(t.next(n[i++]),t.closed||this.schedule())})})}function Dv(n,e){return new It(t=>{let i;return Fn(t,e,()=>{i=n[fc](),Fn(t,e,()=>{let r,s;try{({value:r,done:s}=i.next())}catch(o){t.error(o);return}s?t.complete():t.next(r)},0,!0)}),()=>je(i?.return)&&i.return()})}function yc(n,e){if(!n)throw new Error("Iterable cannot be null");return new It(t=>{Fn(t,e,()=>{let i=n[Symbol.asyncIterator]();Fn(t,e,()=>{i.next().then(r=>{r.done?t.complete():t.next(r.value)})},0,!0)})})}function Rv(n,e){return yc(pc(n),e)}function Pv(n,e){if(n!=null){if(cc(n))return Tv(n,e);if(ac(n))return Iv(n,e);if(lc(n))return Av(n,e);if(uc(n))return yc(n,e);if(hc(n))return Dv(n,e);if(mc(n))return Rv(n,e)}throw dc(n)}function Gt(n,e){return e?Pv(n,e):on(n)}function Be(...n){let e=Ir(n);return Gt(n,e)}function ro(n,e){let t=je(n)?n:()=>n,i=r=>r.error(t());return new It(e?r=>e.schedule(i,0,r):i)}function ph(n){return!!n&&(n instanceof It||je(n.lift)&&je(n.subscribe))}var rr=Js(n=>function(){n(this),this.name="EmptyError",this.message="no elements in sequence"});function gt(n,e){return pt((t,i)=>{let r=0;t.subscribe(mt(i,s=>{i.next(n.call(e,s,r++))}))})}var{isArray:Tw}=Array;function Aw(n,e){return Tw(e)?n(...e):n(e)}function Nv(n){return gt(e=>Aw(n,e))}var{isArray:Iw}=Array,{getPrototypeOf:Dw,prototype:Rw,keys:Pw}=Object;function Ov(n){if(n.length===1){let e=n[0];if(Iw(e))return{args:e,keys:null};if(Nw(e)){let t=Pw(e);return{args:t.map(i=>e[i]),keys:t}}}return{args:n,keys:null}}function Nw(n){return n&&typeof n=="object"&&Dw(n)===Rw}function Lv(n,e){return n.reduce((t,i,r)=>(t[i]=e[r],t),{})}function va(...n){let e=Ir(n),t=bv(n),{args:i,keys:r}=Ov(n);if(i.length===0)return Gt([],e);let s=new It(Ow(i,e,r?o=>Lv(r,o):Wn));return t?s.pipe(Nv(t)):s}function Ow(n,e,t=Wn){return i=>{Fv(e,()=>{let{length:r}=n,s=new Array(r),o=r,a=r;for(let l=0;l<r;l++)Fv(e,()=>{let c=Gt(n[l],e),u=!1;c.subscribe(mt(i,d=>{s[l]=d,u||(u=!0,a--),a||i.next(t(s.slice()))},()=>{--o||i.complete()}))},i)},i)}}function Fv(n,e,t){n?Fn(t,n,e):e()}function kv(n,e,t,i,r,s,o,a){let l=[],c=0,u=0,d=!1,f=()=>{d&&!l.length&&!c&&e.complete()},h=x=>c<i?g(x):l.push(x),g=x=>{s&&e.next(x),c++;let m=!1;on(t(x,u++)).subscribe(mt(e,p=>{r?.(p),s?h(p):e.next(p)},()=>{m=!0},void 0,()=>{if(m)try{for(c--;l.length&&c<i;){let p=l.shift();o?Fn(e,o,()=>g(p)):g(p)}f()}catch(p){e.error(p)}}))};return n.subscribe(mt(e,h,()=>{d=!0,f()})),()=>{a?.()}}function Jt(n,e,t=1/0){return je(e)?Jt((i,r)=>gt((s,o)=>e(i,s,r,o))(on(n(i,r))),t):(typeof e=="number"&&(t=e),pt((i,r)=>kv(i,r,n,t)))}function Dr(n=1/0){return Jt(Wn,n)}function Uv(){return Dr(1)}function so(...n){return Uv()(Gt(n,Ir(n)))}function xc(n){return new It(e=>{on(n()).subscribe(e)})}function oi(n,e){return pt((t,i)=>{let r=0;t.subscribe(mt(i,s=>n.call(e,s,r++)&&i.next(s)))})}function Rr(n){return pt((e,t)=>{let i=null,r=!1,s;i=e.subscribe(mt(t,void 0,void 0,o=>{s=on(n(o,Rr(n)(e))),i?(i.unsubscribe(),i=null,s.subscribe(t)):r=!0})),r&&(i.unsubscribe(),i=null,s.subscribe(t))})}function Bv(n,e,t,i,r){return(s,o)=>{let a=t,l=e,c=0;s.subscribe(mt(o,u=>{let d=c++;l=a?n(l,u,d):(a=!0,u),i&&o.next(l)},r&&(()=>{a&&o.next(l),o.complete()})))}}function Ss(n,e){return je(e)?Jt(n,e,1):Jt(n,1)}function Pr(n){return pt((e,t)=>{let i=!1;e.subscribe(mt(t,r=>{i=!0,t.next(r)},()=>{i||t.next(n),t.complete()}))})}function sr(n){return n<=0?()=>jn:pt((e,t)=>{let i=0;e.subscribe(mt(t,r=>{++i<=n&&(t.next(r),n<=i&&t.complete())}))})}function mh(n){return gt(()=>n)}function _c(n=Lw){return pt((e,t)=>{let i=!1;e.subscribe(mt(t,r=>{i=!0,t.next(r)},()=>i?t.complete():t.error(n())))})}function Lw(){return new rr}function ya(n){return pt((e,t)=>{try{e.subscribe(t)}finally{t.add(n)}})}function Fi(n,e){let t=arguments.length>=2;return i=>i.pipe(n?oi((r,s)=>n(r,s,i)):Wn,sr(1),t?Pr(e):_c(()=>new rr))}function oo(n){return n<=0?()=>jn:pt((e,t)=>{let i=[];e.subscribe(mt(t,r=>{i.push(r),n<i.length&&i.shift()},()=>{for(let r of i)t.next(r);t.complete()},void 0,()=>{i=null}))})}function gh(n,e){let t=arguments.length>=2;return i=>i.pipe(n?oi((r,s)=>n(r,s,i)):Wn,oo(1),t?Pr(e):_c(()=>new rr))}function vh(n,e){return pt(Bv(n,e,arguments.length>=2,!0))}function yh(...n){let e=Ir(n);return pt((t,i)=>{(e?so(n,t,e):so(n,t)).subscribe(i)})}function ai(n,e){return pt((t,i)=>{let r=null,s=0,o=!1,a=()=>o&&!r&&i.complete();t.subscribe(mt(i,l=>{r?.unsubscribe();let c=0,u=s++;on(n(l,u)).subscribe(r=mt(i,d=>i.next(e?e(l,d,u,c++):d),()=>{r=null,a()}))},()=>{o=!0,a()}))})}function xh(n){return pt((e,t)=>{on(n).subscribe(mt(t,()=>t.complete(),ga)),!t.closed&&e.subscribe(t)})}function fn(n,e,t){let i=je(n)||e||t?{next:n,error:e,complete:t}:n;return i?pt((r,s)=>{var o;(o=i.subscribe)===null||o===void 0||o.call(i);let a=!0;r.subscribe(mt(s,l=>{var c;(c=i.next)===null||c===void 0||c.call(i,l),s.next(l)},()=>{var l;a=!1,(l=i.complete)===null||l===void 0||l.call(i),s.complete()},l=>{var c;a=!1,(c=i.error)===null||c===void 0||c.call(i,l),s.error(l)},()=>{var l,c;a&&((l=i.unsubscribe)===null||l===void 0||l.call(i)),(c=i.finalize)===null||c===void 0||c.call(i)}))}):Wn}var by="https://g.co/ng/security#xss",Fe=class extends Error{constructor(e,t){super(Ep(e,t)),this.code=e}};function Ep(n,e){return`${`NG0${Math.abs(n)}`}${e?": "+e:""}`}function Ra(n){return{toString:n}.toString()}var bc="__parameters__";function Fw(n){return function(...t){if(n){let i=n(...t);for(let r in i)this[r]=i[r]}}}function Sy(n,e,t){return Ra(()=>{let i=Fw(e);function r(...s){if(this instanceof r)return i.apply(this,s),this;let o=new r(...s);return a.annotation=o,a;function a(l,c,u){let d=l.hasOwnProperty(bc)?l[bc]:Object.defineProperty(l,bc,{value:[]})[bc];for(;d.length<=u;)d.push(null);return(d[u]=d[u]||[]).push(o),l}}return t&&(r.prototype=Object.create(t.prototype)),r.prototype.ngMetadataName=n,r.annotationCls=r,r})}var Ms=globalThis;function Pt(n){for(let e in n)if(n[e]===Pt)return e;throw Error("Could not find renamed property on target object.")}function In(n){if(typeof n=="string")return n;if(Array.isArray(n))return"["+n.map(In).join(", ")+"]";if(n==null)return""+n;if(n.overriddenName)return`${n.overriddenName}`;if(n.name)return`${n.name}`;let e=n.toString();if(e==null)return""+e;let t=e.indexOf(`
`);return t===-1?e:e.substring(0,t)}function Nh(n,e){return n==null||n===""?e===null?"":e:e==null||e===""?n:n+" "+e}var kw=Pt({__forward_ref__:Pt});function My(n){return n.__forward_ref__=My,n.toString=function(){return In(this())},n}function li(n){return wy(n)?n():n}function wy(n){return typeof n=="function"&&n.hasOwnProperty(kw)&&n.__forward_ref__===My}function He(n){return{token:n.token,providedIn:n.providedIn||null,factory:n.factory,value:void 0}}function Pa(n){return{providers:n.providers||[],imports:n.imports||[]}}function Jc(n){return Vv(n,Cy)||Vv(n,Ty)}function Ey(n){return Jc(n)!==null}function Vv(n,e){return n.hasOwnProperty(e)?n[e]:null}function Uw(n){let e=n&&(n[Cy]||n[Ty]);return e||null}function Hv(n){return n&&(n.hasOwnProperty(zv)||n.hasOwnProperty(Bw))?n[zv]:null}var Cy=Pt({\u0275prov:Pt}),zv=Pt({\u0275inj:Pt}),Ty=Pt({ngInjectableDef:Pt}),Bw=Pt({ngInjectorDef:Pt}),ot=class{constructor(e,t){this._desc=e,this.ngMetadataName="InjectionToken",this.\u0275prov=void 0,typeof t=="number"?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.\u0275prov=He({token:this,providedIn:t.providedIn||"root",factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Ay(n){return n&&!!n.\u0275providers}var Vw=Pt({\u0275cmp:Pt}),Hw=Pt({\u0275dir:Pt}),zw=Pt({\u0275pipe:Pt}),Gw=Pt({\u0275mod:Pt}),Dc=Pt({\u0275fac:Pt}),xa=Pt({__NG_ELEMENT_ID__:Pt}),Gv=Pt({__NG_ENV_ID__:Pt});function po(n){return typeof n=="string"?n:n==null?"":String(n)}function Ww(n){return typeof n=="function"?n.name||n.toString():typeof n=="object"&&n!=null&&typeof n.type=="function"?n.type.name||n.type.toString():po(n)}function jw(n,e){let t=e?`. Dependency path: ${e.join(" > ")} > ${n}`:"";throw new Fe(-200,n)}function Cp(n,e){throw new Fe(-201,!1)}var st=function(n){return n[n.Default=0]="Default",n[n.Host=1]="Host",n[n.Self=2]="Self",n[n.SkipSelf=4]="SkipSelf",n[n.Optional=8]="Optional",n}(st||{}),Oh;function Iy(){return Oh}function kn(n){let e=Oh;return Oh=n,e}function Dy(n,e,t){let i=Jc(n);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(t&st.Optional)return null;if(e!==void 0)return e;Cp(n,"Injector")}var $w={},_a=$w,Lh="__NG_DI_FLAG__",Rc="ngTempTokenPath",qw="ngTokenPath",Xw=/\n/gm,Yw="\u0275",Wv="__source",fo;function Zw(){return fo}function Nr(n){let e=fo;return fo=n,e}function Jw(n,e=st.Default){if(fo===void 0)throw new Fe(-203,!1);return fo===null?Dy(n,void 0,e):fo.get(n,e&st.Optional?null:void 0,e)}function Xe(n,e=st.Default){return(Iy()||Jw)(li(n),e)}function ve(n,e=st.Default){return Xe(n,Kc(e))}function Kc(n){return typeof n>"u"||typeof n=="number"?n:0|(n.optional&&8)|(n.host&&1)|(n.self&&2)|(n.skipSelf&&4)}function Fh(n){let e=[];for(let t=0;t<n.length;t++){let i=li(n[t]);if(Array.isArray(i)){if(i.length===0)throw new Fe(900,!1);let r,s=st.Default;for(let o=0;o<i.length;o++){let a=i[o],l=Kw(a);typeof l=="number"?l===-1?r=a.token:s|=l:r=a}e.push(Xe(r,s))}else e.push(Xe(i))}return e}function Ry(n,e){return n[Lh]=e,n.prototype[Lh]=e,n}function Kw(n){return n[Lh]}function Qw(n,e,t,i){let r=n[Rc];throw e[Wv]&&r.unshift(e[Wv]),n.message=eE(`
`+n.message,r,t,i),n[qw]=r,n[Rc]=null,n}function eE(n,e,t,i=null){n=n&&n.charAt(0)===`
`&&n.charAt(1)==Yw?n.slice(2):n;let r=In(e);if(Array.isArray(e))r=e.map(In).join(" -> ");else if(typeof e=="object"){let s=[];for(let o in e)if(e.hasOwnProperty(o)){let a=e[o];s.push(o+":"+(typeof a=="string"?JSON.stringify(a):In(a)))}r=`{${s.join(", ")}}`}return`${t}${i?"("+i+")":""}[${r}]: ${n.replace(Xw,`
  `)}`}var Qc=Ry(Sy("Optional"),8);var Tp=Ry(Sy("SkipSelf"),4);function Cs(n,e){let t=n.hasOwnProperty(Dc);return t?n[Dc]:null}function tE(n,e,t){if(n.length!==e.length)return!1;for(let i=0;i<n.length;i++){let r=n[i],s=e[i];if(t&&(r=t(r),s=t(s)),s!==r)return!1}return!0}function nE(n){return n.flat(Number.POSITIVE_INFINITY)}function Ap(n,e){n.forEach(t=>Array.isArray(t)?Ap(t,e):e(t))}function Py(n,e,t){e>=n.length?n.push(t):n.splice(e,0,t)}function Pc(n,e){return e>=n.length-1?n.pop():n.splice(e,1)[0]}function iE(n,e,t,i){let r=n.length;if(r==e)n.push(t,i);else if(r===1)n.push(i,n[0]),n[0]=t;else{for(r--,n.push(n[r-1],n[r]);r>e;){let s=r-2;n[r]=n[s],r--}n[e]=t,n[e+1]=i}}function Ip(n,e,t){let i=Na(n,e);return i>=0?n[i|1]=t:(i=~i,iE(n,i,e,t)),i}function _h(n,e){let t=Na(n,e);if(t>=0)return n[t|1]}function Na(n,e){return rE(n,e,1)}function rE(n,e,t){let i=0,r=n.length>>t;for(;r!==i;){let s=i+(r-i>>1),o=n[s<<t];if(e===o)return s<<t;o>e?r=s:i=s+1}return~(r<<t)}var ba={},$n=[],mo=new ot(""),Ny=new ot("",-1),Oy=new ot(""),Nc=class{get(e,t=_a){if(t===_a){let i=new Error(`NullInjectorError: No provider for ${In(e)}!`);throw i.name="NullInjectorError",i}return t}},Ly=function(n){return n[n.OnPush=0]="OnPush",n[n.Default=1]="Default",n}(Ly||{}),Bi=function(n){return n[n.Emulated=0]="Emulated",n[n.None=2]="None",n[n.ShadowDom=3]="ShadowDom",n}(Bi||{}),ci=function(n){return n[n.None=0]="None",n[n.SignalBased=1]="SignalBased",n[n.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",n}(ci||{});function sE(n,e,t){let i=n.length;for(;;){let r=n.indexOf(e,t);if(r===-1)return r;if(r===0||n.charCodeAt(r-1)<=32){let s=e.length;if(r+s===i||n.charCodeAt(r+s)<=32)return r}t=r+1}}function kh(n,e,t){let i=0;for(;i<t.length;){let r=t[i];if(typeof r=="number"){if(r!==0)break;i++;let s=t[i++],o=t[i++],a=t[i++];n.setAttribute(e,o,a,s)}else{let s=r,o=t[++i];oE(s)?n.setProperty(e,s,o):n.setAttribute(e,s,o),i++}}return i}function Fy(n){return n===3||n===4||n===6}function oE(n){return n.charCodeAt(0)===64}function Dp(n,e){if(!(e===null||e.length===0))if(n===null||n.length===0)n=e.slice();else{let t=-1;for(let i=0;i<e.length;i++){let r=e[i];typeof r=="number"?t=r:t===0||(t===-1||t===2?jv(n,t,r,null,e[++i]):jv(n,t,r,null,null))}}return n}function jv(n,e,t,i,r){let s=0,o=n.length;if(e===-1)o=-1;else for(;s<n.length;){let a=n[s++];if(typeof a=="number"){if(a===e){o=-1;break}else if(a>e){o=s-1;break}}}for(;s<n.length;){let a=n[s];if(typeof a=="number")break;if(a===t){if(i===null){r!==null&&(n[s+1]=r);return}else if(i===n[s+1]){n[s+2]=r;return}}s++,i!==null&&s++,r!==null&&s++}o!==-1&&(n.splice(o,0,e),s=o+1),n.splice(s++,0,t),i!==null&&n.splice(s++,0,i),r!==null&&n.splice(s++,0,r)}var ky="ng-template";function aE(n,e,t,i){let r=0;if(i){for(;r<e.length&&typeof e[r]=="string";r+=2)if(e[r]==="class"&&sE(e[r+1].toLowerCase(),t,0)!==-1)return!0}else if(Rp(n))return!1;if(r=e.indexOf(1,r),r>-1){let s;for(;++r<e.length&&typeof(s=e[r])=="string";)if(s.toLowerCase()===t)return!0}return!1}function Rp(n){return n.type===4&&n.value!==ky}function lE(n,e,t){let i=n.type===4&&!t?ky:n.value;return e===i}function cE(n,e,t){let i=4,r=n.attrs,s=r!==null?fE(r):0,o=!1;for(let a=0;a<e.length;a++){let l=e[a];if(typeof l=="number"){if(!o&&!xi(i)&&!xi(l))return!1;if(o&&xi(l))continue;o=!1,i=l|i&1;continue}if(!o)if(i&4){if(i=2|i&1,l!==""&&!lE(n,l,t)||l===""&&e.length===1){if(xi(i))return!1;o=!0}}else if(i&8){if(r===null||!aE(n,r,l,t)){if(xi(i))return!1;o=!0}}else{let c=e[++a],u=uE(l,r,Rp(n),t);if(u===-1){if(xi(i))return!1;o=!0;continue}if(c!==""){let d;if(u>s?d="":d=r[u+1].toLowerCase(),i&2&&c!==d){if(xi(i))return!1;o=!0}}}}return xi(i)||o}function xi(n){return(n&1)===0}function uE(n,e,t,i){if(e===null)return-1;let r=0;if(i||!t){let s=!1;for(;r<e.length;){let o=e[r];if(o===n)return r;if(o===3||o===6)s=!0;else if(o===1||o===2){let a=e[++r];for(;typeof a=="string";)a=e[++r];continue}else{if(o===4)break;if(o===0){r+=4;continue}}r+=s?1:2}return-1}else return hE(e,n)}function dE(n,e,t=!1){for(let i=0;i<e.length;i++)if(cE(n,e[i],t))return!0;return!1}function fE(n){for(let e=0;e<n.length;e++){let t=n[e];if(Fy(t))return e}return n.length}function hE(n,e){let t=n.indexOf(4);if(t>-1)for(t++;t<n.length;){let i=n[t];if(typeof i=="number")return-1;if(i===e)return t;t++}return-1}function $v(n,e){return n?":not("+e.trim()+")":e}function pE(n){let e=n[0],t=1,i=2,r="",s=!1;for(;t<n.length;){let o=n[t];if(typeof o=="string")if(i&2){let a=n[++t];r+="["+o+(a.length>0?'="'+a+'"':"")+"]"}else i&8?r+="."+o:i&4&&(r+=" "+o);else r!==""&&!xi(o)&&(e+=$v(s,r),r=""),i=o,s=s||!xi(i);t++}return r!==""&&(e+=$v(s,r)),e}function mE(n){return n.map(pE).join(",")}function gE(n){let e=[],t=[],i=1,r=2;for(;i<n.length;){let s=n[i];if(typeof s=="string")r===2?s!==""&&e.push(s,n[++i]):r===8&&t.push(s);else{if(!xi(r))break;r=s}i++}return{attrs:e,classes:t}}function xn(n){return Ra(()=>{let e=Gy(n),t=zt(Ae({},e),{decls:n.decls,vars:n.vars,template:n.template,consts:n.consts||null,ngContentSelectors:n.ngContentSelectors,onPush:n.changeDetection===Ly.OnPush,directiveDefs:null,pipeDefs:null,dependencies:e.standalone&&n.dependencies||null,getStandaloneInjector:null,signals:n.signals??!1,data:n.data||{},encapsulation:n.encapsulation||Bi.Emulated,styles:n.styles||$n,_:null,schemas:n.schemas||null,tView:null,id:""});Wy(t);let i=n.dependencies;return t.directiveDefs=Xv(i,!1),t.pipeDefs=Xv(i,!0),t.id=xE(t),t})}function vE(n){return Lr(n)||By(n)}function yE(n){return n!==null}function Oa(n){return Ra(()=>({type:n.type,bootstrap:n.bootstrap||$n,declarations:n.declarations||$n,imports:n.imports||$n,exports:n.exports||$n,transitiveCompileScopes:null,schemas:n.schemas||null,id:n.id||null}))}function qv(n,e){if(n==null)return ba;let t={};for(let i in n)if(n.hasOwnProperty(i)){let r=n[i],s,o,a=ci.None;Array.isArray(r)?(a=r[0],s=r[1],o=r[2]??s):(s=r,o=r),e?(t[s]=a!==ci.None?[i,a]:i,e[s]=o):t[s]=i}return t}function Ur(n){return Ra(()=>{let e=Gy(n);return Wy(e),e})}function Uy(n){return{type:n.type,name:n.name,factory:null,pure:n.pure!==!1,standalone:n.standalone===!0,onDestroy:n.type.prototype.ngOnDestroy||null}}function Lr(n){return n[Vw]||null}function By(n){return n[Hw]||null}function Vy(n){return n[zw]||null}function Hy(n){let e=Lr(n)||By(n)||Vy(n);return e!==null?e.standalone:!1}function zy(n,e){let t=n[Gw]||null;if(!t&&e===!0)throw new Error(`Type ${In(n)} does not have '\u0275mod' property.`);return t}function Gy(n){let e={};return{type:n.type,providersResolver:null,factory:null,hostBindings:n.hostBindings||null,hostVars:n.hostVars||0,hostAttrs:n.hostAttrs||null,contentQueries:n.contentQueries||null,declaredInputs:e,inputTransforms:null,inputConfig:n.inputs||ba,exportAs:n.exportAs||null,standalone:n.standalone===!0,signals:n.signals===!0,selectors:n.selectors||$n,viewQuery:n.viewQuery||null,features:n.features||null,setInput:null,findHostDirectiveDefs:null,hostDirectives:null,inputs:qv(n.inputs,e),outputs:qv(n.outputs),debugInfo:null}}function Wy(n){n.features?.forEach(e=>e(n))}function Xv(n,e){if(!n)return null;let t=e?Vy:vE;return()=>(typeof n=="function"?n():n).map(i=>t(i)).filter(yE)}function xE(n){let e=0,t=[n.selectors,n.ngContentSelectors,n.hostVars,n.hostAttrs,n.consts,n.vars,n.decls,n.encapsulation,n.standalone,n.signals,n.exportAs,JSON.stringify(n.inputs),JSON.stringify(n.outputs),Object.getOwnPropertyNames(n.type.prototype),!!n.contentQueries,!!n.viewQuery].join("|");for(let r of t)e=Math.imul(31,e)+r.charCodeAt(0)<<0;return e+=2147483648,"c"+e}function eu(n){return{\u0275providers:n}}function _E(...n){return{\u0275providers:jy(!0,n),\u0275fromNgModule:!0}}function jy(n,...e){let t=[],i=new Set,r,s=o=>{t.push(o)};return Ap(e,o=>{let a=o;Uh(a,s,[],i)&&(r||=[],r.push(a))}),r!==void 0&&$y(r,s),t}function $y(n,e){for(let t=0;t<n.length;t++){let{ngModule:i,providers:r}=n[t];Pp(r,s=>{e(s,i)})}}function Uh(n,e,t,i){if(n=li(n),!n)return!1;let r=null,s=Hv(n),o=!s&&Lr(n);if(!s&&!o){let l=n.ngModule;if(s=Hv(l),s)r=l;else return!1}else{if(o&&!o.standalone)return!1;r=n}let a=i.has(r);if(o){if(a)return!1;if(i.add(r),o.dependencies){let l=typeof o.dependencies=="function"?o.dependencies():o.dependencies;for(let c of l)Uh(c,e,t,i)}}else if(s){if(s.imports!=null&&!a){i.add(r);let c;try{Ap(s.imports,u=>{Uh(u,e,t,i)&&(c||=[],c.push(u))})}finally{}c!==void 0&&$y(c,e)}if(!a){let c=Cs(r)||(()=>new r);e({provide:r,useFactory:c,deps:$n},r),e({provide:Oy,useValue:r,multi:!0},r),e({provide:mo,useValue:()=>Xe(r),multi:!0},r)}let l=s.providers;if(l!=null&&!a){let c=n;Pp(l,u=>{e(u,c)})}}else return!1;return r!==n&&n.providers!==void 0}function Pp(n,e){for(let t of n)Ay(t)&&(t=t.\u0275providers),Array.isArray(t)?Pp(t,e):e(t)}var bE=Pt({provide:String,useValue:Pt});function qy(n){return n!==null&&typeof n=="object"&&bE in n}function SE(n){return!!(n&&n.useExisting)}function ME(n){return!!(n&&n.useFactory)}function Bh(n){return typeof n=="function"}var tu=new ot(""),wc={},wE={},bh;function Np(){return bh===void 0&&(bh=new Nc),bh}var Un=class{},Sa=class extends Un{get destroyed(){return this._destroyed}constructor(e,t,i,r){super(),this.parent=t,this.source=i,this.scopes=r,this.records=new Map,this._ngOnDestroyHooks=new Set,this._onDestroyHooks=[],this._destroyed=!1,Hh(e,o=>this.processProvider(o)),this.records.set(Ny,ao(void 0,this)),r.has("environment")&&this.records.set(Un,ao(void 0,this));let s=this.records.get(tu);s!=null&&typeof s.value=="string"&&this.scopes.add(s.value),this.injectorDefTypes=new Set(this.get(Oy,$n,st.Self))}destroy(){this.assertNotDestroyed(),this._destroyed=!0;let e=bt(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let t=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of t)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),bt(e)}}onDestroy(e){return this.assertNotDestroyed(),this._onDestroyHooks.push(e),()=>this.removeOnDestroy(e)}runInContext(e){this.assertNotDestroyed();let t=Nr(this),i=kn(void 0),r;try{return e()}finally{Nr(t),kn(i)}}get(e,t=_a,i=st.Default){if(this.assertNotDestroyed(),e.hasOwnProperty(Gv))return e[Gv](this);i=Kc(i);let r,s=Nr(this),o=kn(void 0);try{if(!(i&st.SkipSelf)){let l=this.records.get(e);if(l===void 0){let c=DE(e)&&Jc(e);c&&this.injectableDefInScope(c)?l=ao(Vh(e),wc):l=null,this.records.set(e,l)}if(l!=null)return this.hydrate(e,l)}let a=i&st.Self?Np():this.parent;return t=i&st.Optional&&t===_a?null:t,a.get(e,t)}catch(a){if(a.name==="NullInjectorError"){if((a[Rc]=a[Rc]||[]).unshift(In(e)),s)throw a;return Qw(a,e,"R3InjectorError",this.source)}else throw a}finally{kn(o),Nr(s)}}resolveInjectorInitializers(){let e=bt(null),t=Nr(this),i=kn(void 0),r;try{let s=this.get(mo,$n,st.Self);for(let o of s)o()}finally{Nr(t),kn(i),bt(e)}}toString(){let e=[],t=this.records;for(let i of t.keys())e.push(In(i));return`R3Injector[${e.join(", ")}]`}assertNotDestroyed(){if(this._destroyed)throw new Fe(205,!1)}processProvider(e){e=li(e);let t=Bh(e)?e:li(e&&e.provide),i=CE(e);if(!Bh(e)&&e.multi===!0){let r=this.records.get(t);r||(r=ao(void 0,wc,!0),r.factory=()=>Fh(r.multi),this.records.set(t,r)),t=e,r.multi.push(e)}this.records.set(t,i)}hydrate(e,t){let i=bt(null);try{return t.value===wc&&(t.value=wE,t.value=t.factory()),typeof t.value=="object"&&t.value&&IE(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{bt(i)}}injectableDefInScope(e){if(!e.providedIn)return!1;let t=li(e.providedIn);return typeof t=="string"?t==="any"||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(e){let t=this._onDestroyHooks.indexOf(e);t!==-1&&this._onDestroyHooks.splice(t,1)}};function Vh(n){let e=Jc(n),t=e!==null?e.factory:Cs(n);if(t!==null)return t;if(n instanceof ot)throw new Fe(204,!1);if(n instanceof Function)return EE(n);throw new Fe(204,!1)}function EE(n){if(n.length>0)throw new Fe(204,!1);let t=Uw(n);return t!==null?()=>t.factory(n):()=>new n}function CE(n){if(qy(n))return ao(void 0,n.useValue);{let e=TE(n);return ao(e,wc)}}function TE(n,e,t){let i;if(Bh(n)){let r=li(n);return Cs(r)||Vh(r)}else if(qy(n))i=()=>li(n.useValue);else if(ME(n))i=()=>n.useFactory(...Fh(n.deps||[]));else if(SE(n))i=()=>Xe(li(n.useExisting));else{let r=li(n&&(n.useClass||n.provide));if(AE(n))i=()=>new r(...Fh(n.deps));else return Cs(r)||Vh(r)}return i}function ao(n,e,t=!1){return{factory:n,value:e,multi:t?[]:void 0}}function AE(n){return!!n.deps}function IE(n){return n!==null&&typeof n=="object"&&typeof n.ngOnDestroy=="function"}function DE(n){return typeof n=="function"||typeof n=="object"&&n instanceof ot}function Hh(n,e){for(let t of n)Array.isArray(t)?Hh(t,e):t&&Ay(t)?Hh(t.\u0275providers,e):e(t)}function cr(n,e){n instanceof Sa&&n.assertNotDestroyed();let t,i=Nr(n),r=kn(void 0);try{return e()}finally{Nr(i),kn(r)}}function Xy(){return Iy()!==void 0||Zw()!=null}function RE(n){if(!Xy())throw new Fe(-203,!1)}function PE(n){return typeof n=="function"}var ur=0,rt=1,Ve=2,hn=3,bi=4,wi=5,Oc=6,Ma=7,Si=8,go=9,Mi=10,nn=11,wa=12,Yv=13,So=14,Vi=15,La=16,lo=17,or=18,nu=19,Yy=20,Or=21,Sh=22,Ts=23,ui=25,Zy=1;var As=7,Lc=8,vo=9,Xn=10,Op=function(n){return n[n.None=0]="None",n[n.HasTransplantedViews=2]="HasTransplantedViews",n}(Op||{});function ws(n){return Array.isArray(n)&&typeof n[Zy]=="object"}function dr(n){return Array.isArray(n)&&n[Zy]===!0}function Lp(n){return(n.flags&4)!==0}function iu(n){return n.componentOffset>-1}function ru(n){return(n.flags&1)===1}function Fa(n){return!!n.template}function NE(n){return(n[Ve]&512)!==0}var zh=class{constructor(e,t,i){this.previousValue=e,this.currentValue=t,this.firstChange=i}isFirstChange(){return this.firstChange}};function Jy(n,e,t,i){e!==null?e.applyValueToInputSignal(e,i):n[t]=i}function Mo(){return Ky}function Ky(n){return n.type.prototype.ngOnChanges&&(n.setInput=LE),OE}Mo.ngInherit=!0;function OE(){let n=ex(this),e=n?.current;if(e){let t=n.previous;if(t===ba)n.previous=e;else for(let i in e)t[i]=e[i];n.current=null,this.ngOnChanges(e)}}function LE(n,e,t,i,r){let s=this.declaredInputs[i],o=ex(n)||FE(n,{previous:ba,current:null}),a=o.current||(o.current={}),l=o.previous,c=l[s];a[s]=new zh(c&&c.currentValue,t,l===ba),Jy(n,e,r,t)}var Qy="__ngSimpleChanges__";function ex(n){return n[Qy]||null}function FE(n,e){return n[Qy]=e}var Zv=null;var ki=function(n,e,t){Zv?.(n,e,t)},tx="svg",kE="math",UE=!1;function BE(){return UE}function Hi(n){for(;Array.isArray(n);)n=n[ur];return n}function nx(n,e){return Hi(e[n])}function di(n,e){return Hi(e[n.index])}function ix(n,e){return n.data[e]}function rx(n,e){return n[e]}function Br(n,e){let t=e[n];return ws(t)?t:t[ur]}function VE(n){return(n[Ve]&4)===4}function Fp(n){return(n[Ve]&128)===128}function HE(n){return dr(n[hn])}function yo(n,e){return e==null?null:n[e]}function sx(n){n[lo]=0}function zE(n){n[Ve]&1024||(n[Ve]|=1024,Fp(n)&&Ea(n))}function GE(n,e){for(;n>0;)e=e[So],n--;return e}function kp(n){return!!(n[Ve]&9216||n[Ts]?.dirty)}function Gh(n){n[Mi].changeDetectionScheduler?.notify(1),kp(n)?Ea(n):n[Ve]&64&&(BE()?(n[Ve]|=1024,Ea(n)):n[Mi].changeDetectionScheduler?.notify())}function Ea(n){n[Mi].changeDetectionScheduler?.notify();let e=Ca(n);for(;e!==null&&!(e[Ve]&8192||(e[Ve]|=8192,!Fp(e)));)e=Ca(e)}function ox(n,e){if((n[Ve]&256)===256)throw new Fe(911,!1);n[Or]===null&&(n[Or]=[]),n[Or].push(e)}function WE(n,e){if(n[Or]===null)return;let t=n[Or].indexOf(e);t!==-1&&n[Or].splice(t,1)}function Ca(n){let e=n[hn];return dr(e)?e[hn]:e}var Ye={lFrame:hx(null),bindingsEnabled:!0,skipHydrationRootTNode:null};function jE(){return Ye.lFrame.elementDepthCount}function $E(){Ye.lFrame.elementDepthCount++}function qE(){Ye.lFrame.elementDepthCount--}function ax(){return Ye.bindingsEnabled}function XE(){return Ye.skipHydrationRootTNode!==null}function YE(n){return Ye.skipHydrationRootTNode===n}function ZE(){Ye.skipHydrationRootTNode=null}function ft(){return Ye.lFrame.lView}function _n(){return Ye.lFrame.tView}function Dn(n){return Ye.lFrame.contextLView=n,n[Si]}function Rn(n){return Ye.lFrame.contextLView=null,n}function Bn(){let n=lx();for(;n!==null&&n.type===64;)n=n.parent;return n}function lx(){return Ye.lFrame.currentTNode}function JE(){let n=Ye.lFrame,e=n.currentTNode;return n.isParent?e:e.parent}function Ns(n,e){let t=Ye.lFrame;t.currentTNode=n,t.isParent=e}function Up(){return Ye.lFrame.isParent}function cx(){Ye.lFrame.isParent=!1}function KE(){return Ye.lFrame.contextLView}function ka(){let n=Ye.lFrame,e=n.bindingRootIndex;return e===-1&&(e=n.bindingRootIndex=n.tView.bindingStartIndex),e}function QE(){return Ye.lFrame.bindingIndex}function eC(n){return Ye.lFrame.bindingIndex=n}function Bp(){return Ye.lFrame.bindingIndex++}function Vp(n){let e=Ye.lFrame,t=e.bindingIndex;return e.bindingIndex=e.bindingIndex+n,t}function tC(){return Ye.lFrame.inI18n}function nC(n,e){let t=Ye.lFrame;t.bindingIndex=t.bindingRootIndex=n,Wh(e)}function iC(){return Ye.lFrame.currentDirectiveIndex}function Wh(n){Ye.lFrame.currentDirectiveIndex=n}function rC(n){let e=Ye.lFrame.currentDirectiveIndex;return e===-1?null:n[e]}function ux(){return Ye.lFrame.currentQueryIndex}function Hp(n){Ye.lFrame.currentQueryIndex=n}function sC(n){let e=n[rt];return e.type===2?e.declTNode:e.type===1?n[wi]:null}function dx(n,e,t){if(t&st.SkipSelf){let r=e,s=n;for(;r=r.parent,r===null&&!(t&st.Host);)if(r=sC(s),r===null||(s=s[So],r.type&10))break;if(r===null)return!1;e=r,n=s}let i=Ye.lFrame=fx();return i.currentTNode=e,i.lView=n,!0}function zp(n){let e=fx(),t=n[rt];Ye.lFrame=e,e.currentTNode=t.firstChild,e.lView=n,e.tView=t,e.contextLView=n,e.bindingIndex=t.bindingStartIndex,e.inI18n=!1}function fx(){let n=Ye.lFrame,e=n===null?null:n.child;return e===null?hx(n):e}function hx(n){let e={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:n,child:null,inI18n:!1};return n!==null&&(n.child=e),e}function px(){let n=Ye.lFrame;return Ye.lFrame=n.parent,n.currentTNode=null,n.lView=null,n}var mx=px;function Gp(){let n=px();n.isParent=!0,n.tView=null,n.selectedIndex=-1,n.contextLView=null,n.elementDepthCount=0,n.currentDirectiveIndex=-1,n.currentNamespace=null,n.bindingRootIndex=-1,n.bindingIndex=-1,n.currentQueryIndex=0}function oC(n){return(Ye.lFrame.contextLView=GE(n,Ye.lFrame.contextLView))[Si]}function Vr(){return Ye.lFrame.selectedIndex}function Is(n){Ye.lFrame.selectedIndex=n}function gx(){let n=Ye.lFrame;return ix(n.tView,n.selectedIndex)}function wo(){Ye.lFrame.currentNamespace=tx}function Ua(){aC()}function aC(){Ye.lFrame.currentNamespace=null}function lC(){return Ye.lFrame.currentNamespace}var vx=!0;function su(){return vx}function ou(n){vx=n}function cC(n,e,t){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:s}=e.type.prototype;if(i){let o=Ky(e);(t.preOrderHooks??=[]).push(n,o),(t.preOrderCheckHooks??=[]).push(n,o)}r&&(t.preOrderHooks??=[]).push(0-n,r),s&&((t.preOrderHooks??=[]).push(n,s),(t.preOrderCheckHooks??=[]).push(n,s))}function au(n,e){for(let t=e.directiveStart,i=e.directiveEnd;t<i;t++){let s=n.data[t].type.prototype,{ngAfterContentInit:o,ngAfterContentChecked:a,ngAfterViewInit:l,ngAfterViewChecked:c,ngOnDestroy:u}=s;o&&(n.contentHooks??=[]).push(-t,o),a&&((n.contentHooks??=[]).push(t,a),(n.contentCheckHooks??=[]).push(t,a)),l&&(n.viewHooks??=[]).push(-t,l),c&&((n.viewHooks??=[]).push(t,c),(n.viewCheckHooks??=[]).push(t,c)),u!=null&&(n.destroyHooks??=[]).push(t,u)}}function Ec(n,e,t){yx(n,e,3,t)}function Cc(n,e,t,i){(n[Ve]&3)===t&&yx(n,e,t,i)}function Mh(n,e){let t=n[Ve];(t&3)===e&&(t&=16383,t+=1,n[Ve]=t)}function yx(n,e,t,i){let r=i!==void 0?n[lo]&65535:0,s=i??-1,o=e.length-1,a=0;for(let l=r;l<o;l++)if(typeof e[l+1]=="number"){if(a=e[l],i!=null&&a>=i)break}else e[l]<0&&(n[lo]+=65536),(a<s||s==-1)&&(uC(n,t,e,l),n[lo]=(n[lo]&4294901760)+l+2),l++}function Jv(n,e){ki(4,n,e);let t=bt(null);try{e.call(n)}finally{bt(t),ki(5,n,e)}}function uC(n,e,t,i){let r=t[i]<0,s=t[i+1],o=r?-t[i]:t[i],a=n[o];r?n[Ve]>>14<n[lo]>>16&&(n[Ve]&3)===e&&(n[Ve]+=16384,Jv(a,s)):Jv(a,s)}var ho=-1,Ta=class{constructor(e,t,i){this.factory=e,this.resolving=!1,this.canSeeViewProviders=t,this.injectImpl=i}};function dC(n){return n instanceof Ta}function fC(n){return(n.flags&8)!==0}function hC(n){return(n.flags&16)!==0}function xx(n){return n!==ho}function Fc(n){return n&32767}function pC(n){return n>>16}function kc(n,e){let t=pC(n),i=e;for(;t>0;)i=i[So],t--;return i}var jh=!0;function Uc(n){let e=jh;return jh=n,e}var mC=256,_x=mC-1,bx=5,gC=0,Ui={};function vC(n,e,t){let i;typeof t=="string"?i=t.charCodeAt(0)||0:t.hasOwnProperty(xa)&&(i=t[xa]),i==null&&(i=t[xa]=gC++);let r=i&_x,s=1<<r;e.data[n+(r>>bx)]|=s}function Sx(n,e){let t=Mx(n,e);if(t!==-1)return t;let i=e[rt];i.firstCreatePass&&(n.injectorIndex=e.length,wh(i.data,n),wh(e,null),wh(i.blueprint,null));let r=Wp(n,e),s=n.injectorIndex;if(xx(r)){let o=Fc(r),a=kc(r,e),l=a[rt].data;for(let c=0;c<8;c++)e[s+c]=a[o+c]|l[o+c]}return e[s+8]=r,s}function wh(n,e){n.push(0,0,0,0,0,0,0,0,e)}function Mx(n,e){return n.injectorIndex===-1||n.parent&&n.parent.injectorIndex===n.injectorIndex||e[n.injectorIndex+8]===null?-1:n.injectorIndex}function Wp(n,e){if(n.parent&&n.parent.injectorIndex!==-1)return n.parent.injectorIndex;let t=0,i=null,r=e;for(;r!==null;){if(i=Ax(r),i===null)return ho;if(t++,r=r[So],i.injectorIndex!==-1)return i.injectorIndex|t<<16}return ho}function yC(n,e,t){vC(n,e,t)}function xC(n,e){if(e==="class")return n.classes;if(e==="style")return n.styles;let t=n.attrs;if(t){let i=t.length,r=0;for(;r<i;){let s=t[r];if(Fy(s))break;if(s===0)r=r+2;else if(typeof s=="number")for(r++;r<i&&typeof t[r]=="string";)r++;else{if(s===e)return t[r+1];r=r+2}}}return null}function wx(n,e,t){if(t&st.Optional||n!==void 0)return n;Cp(e,"NodeInjector")}function Ex(n,e,t,i){if(t&st.Optional&&i===void 0&&(i=null),!(t&(st.Self|st.Host))){let r=n[go],s=kn(void 0);try{return r?r.get(e,i,t&st.Optional):Dy(e,i,t&st.Optional)}finally{kn(s)}}return wx(i,e,t)}function Cx(n,e,t,i=st.Default,r){if(n!==null){if(e[Ve]&2048&&!(i&st.Self)){let o=MC(n,e,t,i,Ui);if(o!==Ui)return o}let s=Tx(n,e,t,i,Ui);if(s!==Ui)return s}return Ex(e,t,i,r)}function Tx(n,e,t,i,r){let s=bC(t);if(typeof s=="function"){if(!dx(e,n,i))return i&st.Host?wx(r,t,i):Ex(e,t,i,r);try{let o;if(o=s(i),o==null&&!(i&st.Optional))Cp(t);else return o}finally{mx()}}else if(typeof s=="number"){let o=null,a=Mx(n,e),l=ho,c=i&st.Host?e[Vi][wi]:null;for((a===-1||i&st.SkipSelf)&&(l=a===-1?Wp(n,e):e[a+8],l===ho||!Qv(i,!1)?a=-1:(o=e[rt],a=Fc(l),e=kc(l,e)));a!==-1;){let u=e[rt];if(Kv(s,a,u.data)){let d=_C(a,e,t,o,i,c);if(d!==Ui)return d}l=e[a+8],l!==ho&&Qv(i,e[rt].data[a+8]===c)&&Kv(s,a,e)?(o=u,a=Fc(l),e=kc(l,e)):a=-1}}return r}function _C(n,e,t,i,r,s){let o=e[rt],a=o.data[n+8],l=i==null?iu(a)&&jh:i!=o&&(a.type&3)!==0,c=r&st.Host&&s===a,u=Tc(a,o,t,l,c);return u!==null?xo(e,o,u,a):Ui}function Tc(n,e,t,i,r){let s=n.providerIndexes,o=e.data,a=s&1048575,l=n.directiveStart,c=n.directiveEnd,u=s>>20,d=i?a:a+u,f=r?a+u:c;for(let h=d;h<f;h++){let g=o[h];if(h<l&&t===g||h>=l&&g.type===t)return h}if(r){let h=o[l];if(h&&Fa(h)&&h.type===t)return l}return null}function xo(n,e,t,i){let r=n[t],s=e.data;if(dC(r)){let o=r;o.resolving&&jw(Ww(s[t]));let a=Uc(o.canSeeViewProviders);o.resolving=!0;let l,c=o.injectImpl?kn(o.injectImpl):null,u=dx(n,i,st.Default);try{r=n[t]=o.factory(void 0,s,n,i),e.firstCreatePass&&t>=i.directiveStart&&cC(t,s[t],e)}finally{c!==null&&kn(c),Uc(a),o.resolving=!1,mx()}}return r}function bC(n){if(typeof n=="string")return n.charCodeAt(0)||0;let e=n.hasOwnProperty(xa)?n[xa]:void 0;return typeof e=="number"?e>=0?e&_x:SC:e}function Kv(n,e,t){let i=1<<n;return!!(t[e+(n>>bx)]&i)}function Qv(n,e){return!(n&st.Self)&&!(n&st.Host&&e)}var Es=class{constructor(e,t){this._tNode=e,this._lView=t}get(e,t,i){return Cx(this._tNode,this._lView,e,Kc(i),t)}};function SC(){return new Es(Bn(),ft())}function jp(n){return Ra(()=>{let e=n.prototype.constructor,t=e[Dc]||$h(e),i=Object.prototype,r=Object.getPrototypeOf(n.prototype).constructor;for(;r&&r!==i;){let s=r[Dc]||$h(r);if(s&&s!==t)return s;r=Object.getPrototypeOf(r)}return s=>new s})}function $h(n){return wy(n)?()=>{let e=$h(li(n));return e&&e()}:Cs(n)}function MC(n,e,t,i,r){let s=n,o=e;for(;s!==null&&o!==null&&o[Ve]&2048&&!(o[Ve]&512);){let a=Tx(s,o,t,i|st.Self,Ui);if(a!==Ui)return a;let l=s.parent;if(!l){let c=o[Yy];if(c){let u=c.get(t,Ui,i);if(u!==Ui)return u}l=Ax(o),o=o[So]}s=l}return r}function Ax(n){let e=n[rt],t=e.type;return t===2?e.declTNode:t===1?n[wi]:null}function $p(n){return xC(Bn(),n)}function ey(n,e=null,t=null,i){let r=Ix(n,e,t,i);return r.resolveInjectorInitializers(),r}function Ix(n,e=null,t=null,i,r=new Set){let s=[t||$n,_E(n)];return i=i||(typeof n=="object"?void 0:In(n)),new Sa(s,e||Np(),i||null,r)}var Hr=(()=>{class n{static{this.THROW_IF_NOT_FOUND=_a}static{this.NULL=new Nc}static create(t,i){if(Array.isArray(t))return ey({name:""},i,t,"");{let r=t.name??"";return ey({name:r},t.parent,t.providers,r)}}static{this.\u0275prov=He({token:n,providedIn:"any",factory:()=>Xe(Ny)})}static{this.__NG_ELEMENT_ID__=-1}}return n})();var wC="ngOriginalError";function Eh(n){return n[wC]}var zi=class{constructor(){this._console=console}handleError(e){let t=this._findOriginalError(e);this._console.error("ERROR",e),t&&this._console.error("ORIGINAL ERROR",t)}_findOriginalError(e){let t=e&&Eh(e);for(;t&&Eh(t);)t=Eh(t);return t||null}},Dx=new ot("",{providedIn:"root",factory:()=>ve(zi).handleError.bind(void 0)}),qp=(()=>{class n{static{this.__NG_ELEMENT_ID__=EC}static{this.__NG_ENV_ID__=t=>t}}return n})(),qh=class extends qp{constructor(e){super(),this._lView=e}onDestroy(e){return ox(this._lView,e),()=>WE(this._lView,e)}};function EC(){return new qh(ft())}function CC(){return Eo(Bn(),ft())}function Eo(n,e){return new bn(di(n,e))}var bn=(()=>{class n{constructor(t){this.nativeElement=t}static{this.__NG_ELEMENT_ID__=CC}}return n})();function TC(n){return n instanceof bn?n.nativeElement:n}var Xh=class extends yn{constructor(e=!1){super(),this.destroyRef=void 0,this.__isAsync=e,Xy()&&(this.destroyRef=ve(qp,{optional:!0})??void 0)}emit(e){let t=bt(null);try{super.next(e)}finally{bt(t)}}subscribe(e,t,i){let r=e,s=t||(()=>null),o=i;if(e&&typeof e=="object"){let l=e;r=l.next?.bind(l),s=l.error?.bind(l),o=l.complete?.bind(l)}this.__isAsync&&(s=Ch(s),r&&(r=Ch(r)),o&&(o=Ch(o)));let a=super.subscribe({next:r,error:s,complete:o});return e instanceof tn&&e.add(a),a}};function Ch(n){return e=>{setTimeout(n,void 0,e)}}var qn=Xh;function AC(){return this._results[Symbol.iterator]()}var Yh=class n{get changes(){return this._changes??=new qn}constructor(e=!1){this._emitDistinctChangesOnly=e,this.dirty=!0,this._onDirty=void 0,this._results=[],this._changesDetected=!1,this._changes=void 0,this.length=0,this.first=void 0,this.last=void 0;let t=n.prototype;t[Symbol.iterator]||(t[Symbol.iterator]=AC)}get(e){return this._results[e]}map(e){return this._results.map(e)}filter(e){return this._results.filter(e)}find(e){return this._results.find(e)}reduce(e,t){return this._results.reduce(e,t)}forEach(e){this._results.forEach(e)}some(e){return this._results.some(e)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(e,t){this.dirty=!1;let i=nE(e);(this._changesDetected=!tE(this._results,i,t))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.emit(this)}onDirty(e){this._onDirty=e}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}};function Rx(n){return(n.flags&128)===128}var Px=new Map,IC=0;function DC(){return IC++}function RC(n){Px.set(n[nu],n)}function PC(n){Px.delete(n[nu])}var ty="__ngContext__";function Fr(n,e){ws(e)?(n[ty]=e[nu],RC(e)):n[ty]=e}function Nx(n){return Lx(n[wa])}function Ox(n){return Lx(n[bi])}function Lx(n){for(;n!==null&&!dr(n);)n=n[bi];return n}var Zh;function Fx(n){Zh=n}function NC(){if(Zh!==void 0)return Zh;if(typeof document<"u")return document;throw new Fe(210,!1)}var Xp=new ot("",{providedIn:"root",factory:()=>OC}),OC="ng",Yp=new ot(""),an=new ot("",{providedIn:"platform",factory:()=>"unknown"});var Zp=new ot("",{providedIn:"root",factory:()=>NC().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var LC="h",FC="b";var kC=()=>null;function Jp(n,e,t=!1){return kC(n,e,t)}var kx=!1,UC=new ot("",{providedIn:"root",factory:()=>kx});var Sc;function BC(){if(Sc===void 0&&(Sc=null,Ms.trustedTypes))try{Sc=Ms.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:n=>n,createScript:n=>n,createScriptURL:n=>n})}catch{}return Sc}function ny(n){return BC()?.createScriptURL(n)||n}var Bc=class{constructor(e){this.changingThisBreaksApplicationSecurity=e}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${by})`}};function Co(n){return n instanceof Bc?n.changingThisBreaksApplicationSecurity:n}function Kp(n,e){let t=VC(n);if(t!=null&&t!==e){if(t==="ResourceURL"&&e==="URL")return!0;throw new Error(`Required a safe ${e}, got a ${t} (see ${by})`)}return t===e}function VC(n){return n instanceof Bc&&n.getTypeName()||null}var HC=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function Ux(n){return n=String(n),n.match(HC)?n:"unsafe:"+n}var lu=function(n){return n[n.NONE=0]="NONE",n[n.HTML=1]="HTML",n[n.STYLE=2]="STYLE",n[n.SCRIPT=3]="SCRIPT",n[n.URL=4]="URL",n[n.RESOURCE_URL=5]="RESOURCE_URL",n}(lu||{});function Yn(n){let e=Vx();return e?e.sanitize(lu.URL,n)||"":Kp(n,"URL")?Co(n):Ux(po(n))}function zC(n){let e=Vx();if(e)return ny(e.sanitize(lu.RESOURCE_URL,n)||"");if(Kp(n,"ResourceURL"))return ny(Co(n));throw new Fe(904,!1)}function GC(n,e){return e==="src"&&(n==="embed"||n==="frame"||n==="iframe"||n==="media"||n==="script")||e==="href"&&(n==="base"||n==="link")?zC:Yn}function Bx(n,e,t){return GC(e,t)(n)}function Vx(){let n=ft();return n&&n[Mi].sanitizer}var WC=/^>|^->|<!--|-->|--!>|<!-$/g,jC=/(<|>)/g,$C="\u200B$1\u200B";function qC(n){return n.replace(WC,e=>e.replace(jC,$C))}function Gi(n){return n.ownerDocument.defaultView}function Qp(n){return n.ownerDocument}function Hx(n){return n instanceof Function?n():n}function XC(n){return(n??ve(Hr)).get(an)==="browser"}var ar=function(n){return n[n.Important=1]="Important",n[n.DashCase=2]="DashCase",n}(ar||{}),YC;function em(n,e){return YC(n,e)}function co(n,e,t,i,r){if(i!=null){let s,o=!1;dr(i)?s=i:ws(i)&&(o=!0,i=i[ur]);let a=Hi(i);n===0&&t!==null?r==null?$x(e,t,a):Vc(e,t,a,r||null,!0):n===1&&t!==null?Vc(e,t,a,r||null,!0):n===2?h1(e,a,o):n===3&&e.destroyNode(a),s!=null&&m1(e,n,s,t,r)}}function ZC(n,e){return n.createText(e)}function JC(n,e,t){n.setValue(e,t)}function KC(n,e){return n.createComment(qC(e))}function zx(n,e,t){return n.createElement(e,t)}function QC(n,e){Gx(n,e),e[ur]=null,e[wi]=null}function e1(n,e,t,i,r,s){i[ur]=r,i[wi]=e,uu(n,i,t,1,r,s)}function Gx(n,e){e[Mi].changeDetectionScheduler?.notify(1),uu(n,e,e[nn],2,null,null)}function t1(n){let e=n[wa];if(!e)return Th(n[rt],n);for(;e;){let t=null;if(ws(e))t=e[wa];else{let i=e[Xn];i&&(t=i)}if(!t){for(;e&&!e[bi]&&e!==n;)ws(e)&&Th(e[rt],e),e=e[hn];e===null&&(e=n),ws(e)&&Th(e[rt],e),t=e&&e[bi]}e=t}}function n1(n,e,t,i){let r=Xn+i,s=t.length;i>0&&(t[r-1][bi]=e),i<s-Xn?(e[bi]=t[r],Py(t,Xn+i,e)):(t.push(e),e[bi]=null),e[hn]=t;let o=e[La];o!==null&&t!==o&&i1(o,e);let a=e[or];a!==null&&a.insertView(n),Gh(e),e[Ve]|=128}function i1(n,e){let t=n[vo],r=e[hn][hn][Vi];e[Vi]!==r&&(n[Ve]|=Op.HasTransplantedViews),t===null?n[vo]=[e]:t.push(e)}function Wx(n,e){let t=n[vo],i=t.indexOf(e);t.splice(i,1)}function Jh(n,e){if(n.length<=Xn)return;let t=Xn+e,i=n[t];if(i){let r=i[La];r!==null&&r!==n&&Wx(r,i),e>0&&(n[t-1][bi]=i[bi]);let s=Pc(n,Xn+e);QC(i[rt],i);let o=s[or];o!==null&&o.detachView(s[rt]),i[hn]=null,i[bi]=null,i[Ve]&=-129}return i}function jx(n,e){if(!(e[Ve]&256)){let t=e[nn];t.destroyNode&&uu(n,e,t,3,null,null),t1(e)}}function Th(n,e){if(e[Ve]&256)return;let t=bt(null);try{e[Ve]&=-129,e[Ve]|=256,e[Ts]&&uv(e[Ts]),s1(n,e),r1(n,e),e[rt].type===1&&e[nn].destroy();let i=e[La];if(i!==null&&dr(e[hn])){i!==e[hn]&&Wx(i,e);let r=e[or];r!==null&&r.detachView(n)}PC(e)}finally{bt(t)}}function r1(n,e){let t=n.cleanup,i=e[Ma];if(t!==null)for(let s=0;s<t.length-1;s+=2)if(typeof t[s]=="string"){let o=t[s+3];o>=0?i[o]():i[-o].unsubscribe(),s+=2}else{let o=i[t[s+1]];t[s].call(o)}i!==null&&(e[Ma]=null);let r=e[Or];if(r!==null){e[Or]=null;for(let s=0;s<r.length;s++){let o=r[s];o()}}}function s1(n,e){let t;if(n!=null&&(t=n.destroyHooks)!=null)for(let i=0;i<t.length;i+=2){let r=e[t[i]];if(!(r instanceof Ta)){let s=t[i+1];if(Array.isArray(s))for(let o=0;o<s.length;o+=2){let a=r[s[o]],l=s[o+1];ki(4,a,l);try{l.call(a)}finally{ki(5,a,l)}}else{ki(4,r,s);try{s.call(r)}finally{ki(5,r,s)}}}}}function o1(n,e,t){return a1(n,e.parent,t)}function a1(n,e,t){let i=e;for(;i!==null&&i.type&40;)e=i,i=e.parent;if(i===null)return t[ur];{let{componentOffset:r}=i;if(r>-1){let{encapsulation:s}=n.data[i.directiveStart+r];if(s===Bi.None||s===Bi.Emulated)return null}return di(i,t)}}function Vc(n,e,t,i,r){n.insertBefore(e,t,i,r)}function $x(n,e,t){n.appendChild(e,t)}function iy(n,e,t,i,r){i!==null?Vc(n,e,t,i,r):$x(n,e,t)}function l1(n,e,t,i){n.removeChild(e,t,i)}function tm(n,e){return n.parentNode(e)}function c1(n,e){return n.nextSibling(e)}function u1(n,e,t){return f1(n,e,t)}function d1(n,e,t){return n.type&40?di(n,t):null}var f1=d1,ry;function cu(n,e,t,i){let r=o1(n,i,e),s=e[nn],o=i.parent||e[wi],a=u1(o,i,e);if(r!=null)if(Array.isArray(t))for(let l=0;l<t.length;l++)iy(s,r,t[l],a,!1);else iy(s,r,t,a,!1);ry!==void 0&&ry(s,i,e,t,r)}function Ac(n,e){if(e!==null){let t=e.type;if(t&3)return di(e,n);if(t&4)return Kh(-1,n[e.index]);if(t&8){let i=e.child;if(i!==null)return Ac(n,i);{let r=n[e.index];return dr(r)?Kh(-1,r):Hi(r)}}else{if(t&32)return em(e,n)()||Hi(n[e.index]);{let i=qx(n,e);if(i!==null){if(Array.isArray(i))return i[0];let r=Ca(n[Vi]);return Ac(r,i)}else return Ac(n,e.next)}}}return null}function qx(n,e){if(e!==null){let i=n[Vi][wi],r=e.projection;return i.projection[r]}return null}function Kh(n,e){let t=Xn+n+1;if(t<e.length){let i=e[t],r=i[rt].firstChild;if(r!==null)return Ac(i,r)}return e[As]}function h1(n,e,t){let i=tm(n,e);i&&l1(n,i,e,t)}function nm(n,e,t,i,r,s,o){for(;t!=null;){let a=i[t.index],l=t.type;if(o&&e===0&&(a&&Fr(Hi(a),i),t.flags|=2),(t.flags&32)!==32)if(l&8)nm(n,e,t.child,i,r,s,!1),co(e,n,r,a,s);else if(l&32){let c=em(t,i),u;for(;u=c();)co(e,n,r,u,s);co(e,n,r,a,s)}else l&16?p1(n,e,i,t,r,s):co(e,n,r,a,s);t=o?t.projectionNext:t.next}}function uu(n,e,t,i,r,s){nm(t,i,n.firstChild,e,r,s,!1)}function p1(n,e,t,i,r,s){let o=t[Vi],l=o[wi].projection[i.projection];if(Array.isArray(l))for(let c=0;c<l.length;c++){let u=l[c];co(e,n,r,u,s)}else{let c=l,u=o[hn];Rx(i)&&(c.flags|=128),nm(n,e,c,u,r,s,!0)}}function m1(n,e,t,i,r){let s=t[As],o=Hi(t);s!==o&&co(e,n,i,s,r);for(let a=Xn;a<t.length;a++){let l=t[a];uu(l[rt],l,n,e,i,s)}}function g1(n,e,t,i,r){if(e)r?n.addClass(t,i):n.removeClass(t,i);else{let s=i.indexOf("-")===-1?void 0:ar.DashCase;r==null?n.removeStyle(t,i,s):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),s|=ar.Important),n.setStyle(t,i,r,s))}}function v1(n,e,t){n.setAttribute(e,"style",t)}function Xx(n,e,t){t===""?n.removeAttribute(e,"class"):n.setAttribute(e,"class",t)}function Yx(n,e,t){let{mergedAttrs:i,classes:r,styles:s}=t;i!==null&&kh(n,e,i),r!==null&&Xx(n,e,r),s!==null&&v1(n,e,s)}var fi={};function X(n=1){Zx(_n(),ft(),Vr()+n,!1)}function Zx(n,e,t,i){if(!i)if((e[Ve]&3)===3){let s=n.preOrderCheckHooks;s!==null&&Ec(e,s,t)}else{let s=n.preOrderHooks;s!==null&&Cc(e,s,0,t)}Is(t)}function Ze(n,e=st.Default){let t=ft();if(t===null)return Xe(n,e);let i=Bn();return Cx(i,t,li(n),e)}function Jx(){let n="invalid";throw new Error(n)}function Kx(n,e,t,i,r,s){let o=bt(null);try{let a=null;r&ci.SignalBased&&(a=e[i][ov]),a!==null&&a.transformFn!==void 0&&(s=a.transformFn(s)),r&ci.HasDecoratorInputTransform&&(s=n.inputTransforms[i].call(e,s)),n.setInput!==null?n.setInput(e,a,s,t,i):Jy(e,a,i,s)}finally{bt(o)}}function y1(n,e){let t=n.hostBindingOpCodes;if(t!==null)try{for(let i=0;i<t.length;i++){let r=t[i];if(r<0)Is(~r);else{let s=r,o=t[++i],a=t[++i];nC(o,s);let l=e[s];a(2,l)}}}finally{Is(-1)}}function du(n,e,t,i,r,s,o,a,l,c,u){let d=e.blueprint.slice();return d[ur]=r,d[Ve]=i|4|128|8|64,(c!==null||n&&n[Ve]&2048)&&(d[Ve]|=2048),sx(d),d[hn]=d[So]=n,d[Si]=t,d[Mi]=o||n&&n[Mi],d[nn]=a||n&&n[nn],d[go]=l||n&&n[go]||null,d[wi]=s,d[nu]=DC(),d[Oc]=u,d[Yy]=c,d[Vi]=e.type==2?n[Vi]:d,d}function Ba(n,e,t,i,r){let s=n.data[e];if(s===null)s=x1(n,e,t,i,r),tC()&&(s.flags|=32);else if(s.type&64){s.type=t,s.value=i,s.attrs=r;let o=JE();s.injectorIndex=o===null?-1:o.injectorIndex}return Ns(s,!0),s}function x1(n,e,t,i,r){let s=lx(),o=Up(),a=o?s:s&&s.parent,l=n.data[e]=E1(n,a,t,e,i,r);return n.firstChild===null&&(n.firstChild=l),s!==null&&(o?s.child==null&&l.parent!==null&&(s.child=l):s.next===null&&(s.next=l,l.prev=s)),l}function Qx(n,e,t,i){if(t===0)return-1;let r=e.length;for(let s=0;s<t;s++)e.push(i),n.blueprint.push(i),n.data.push(null);return r}function e_(n,e,t,i,r){let s=Vr(),o=i&2;try{Is(-1),o&&e.length>ui&&Zx(n,e,ui,!1),ki(o?2:0,r),t(i,r)}finally{Is(s),ki(o?3:1,r)}}function im(n,e,t){if(Lp(e)){let i=bt(null);try{let r=e.directiveStart,s=e.directiveEnd;for(let o=r;o<s;o++){let a=n.data[o];if(a.contentQueries){let l=t[o];a.contentQueries(1,l,o)}}}finally{bt(i)}}}function rm(n,e,t){ax()&&(P1(n,e,t,di(t,e)),(t.flags&64)===64&&i_(n,e,t))}function sm(n,e,t=di){let i=e.localNames;if(i!==null){let r=e.index+1;for(let s=0;s<i.length;s+=2){let o=i[s+1],a=o===-1?t(e,n):n[o];n[r++]=a}}}function t_(n){let e=n.tView;return e===null||e.incompleteFirstPass?n.tView=om(1,null,n.template,n.decls,n.vars,n.directiveDefs,n.pipeDefs,n.viewQuery,n.schemas,n.consts,n.id):e}function om(n,e,t,i,r,s,o,a,l,c,u){let d=ui+i,f=d+r,h=_1(d,f),g=typeof c=="function"?c():c;return h[rt]={type:n,blueprint:h,template:t,queries:null,viewQuery:a,declTNode:e,data:h.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:f,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof s=="function"?s():s,pipeRegistry:typeof o=="function"?o():o,firstChild:null,schemas:l,consts:g,incompleteFirstPass:!1,ssrId:u}}function _1(n,e){let t=[];for(let i=0;i<e;i++)t.push(i<n?null:fi);return t}function b1(n,e,t,i){let s=i.get(UC,kx)||t===Bi.ShadowDom,o=n.selectRootElement(e,s);return S1(o),o}function S1(n){M1(n)}var M1=()=>null;function w1(n,e,t,i){let r=o_(e);r.push(t),n.firstCreatePass&&a_(n).push(i,r.length-1)}function E1(n,e,t,i,r,s){let o=e?e.injectorIndex:-1,a=0;return XE()&&(a|=128),{type:t,index:i,insertBeforeIndex:null,injectorIndex:o,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,attrs:s,mergedAttrs:null,localNames:null,initialInputs:void 0,inputs:null,outputs:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:e,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function sy(n,e,t,i,r){for(let s in e){if(!e.hasOwnProperty(s))continue;let o=e[s];if(o===void 0)continue;i??={};let a,l=ci.None;Array.isArray(o)?(a=o[0],l=o[1]):a=o;let c=s;if(r!==null){if(!r.hasOwnProperty(s))continue;c=r[s]}n===0?oy(i,t,c,a,l):oy(i,t,c,a)}return i}function oy(n,e,t,i,r){let s;n.hasOwnProperty(t)?(s=n[t]).push(e,i):s=n[t]=[e,i],r!==void 0&&s.push(r)}function C1(n,e,t){let i=e.directiveStart,r=e.directiveEnd,s=n.data,o=e.attrs,a=[],l=null,c=null;for(let u=i;u<r;u++){let d=s[u],f=t?t.get(d):null,h=f?f.inputs:null,g=f?f.outputs:null;l=sy(0,d.inputs,u,l,h),c=sy(1,d.outputs,u,c,g);let x=l!==null&&o!==null&&!Rp(e)?G1(l,u,o):null;a.push(x)}l!==null&&(l.hasOwnProperty("class")&&(e.flags|=8),l.hasOwnProperty("style")&&(e.flags|=16)),e.initialInputs=a,e.inputs=l,e.outputs=c}function T1(n){return n==="class"?"className":n==="for"?"htmlFor":n==="formaction"?"formAction":n==="innerHtml"?"innerHTML":n==="readonly"?"readOnly":n==="tabindex"?"tabIndex":n}function A1(n,e,t,i,r,s,o,a){let l=di(e,t),c=e.inputs,u;!a&&c!=null&&(u=c[i])?(lm(n,t,u,i,r),iu(e)&&I1(t,e.index)):e.type&3?(i=T1(i),r=o!=null?o(r,e.value||"",i):r,s.setProperty(l,i,r)):e.type&12}function I1(n,e){let t=Br(e,n);t[Ve]&16||(t[Ve]|=64)}function am(n,e,t,i){if(ax()){let r=i===null?null:{"":-1},s=O1(n,t),o,a;s===null?o=a=null:[o,a]=s,o!==null&&n_(n,e,t,o,r,a),r&&L1(t,i,r)}t.mergedAttrs=Dp(t.mergedAttrs,t.attrs)}function n_(n,e,t,i,r,s){for(let c=0;c<i.length;c++)yC(Sx(t,e),n,i[c].type);k1(t,n.data.length,i.length);for(let c=0;c<i.length;c++){let u=i[c];u.providersResolver&&u.providersResolver(u)}let o=!1,a=!1,l=Qx(n,e,i.length,null);for(let c=0;c<i.length;c++){let u=i[c];t.mergedAttrs=Dp(t.mergedAttrs,u.hostAttrs),U1(n,t,e,l,u),F1(l,u,r),u.contentQueries!==null&&(t.flags|=4),(u.hostBindings!==null||u.hostAttrs!==null||u.hostVars!==0)&&(t.flags|=64);let d=u.type.prototype;!o&&(d.ngOnChanges||d.ngOnInit||d.ngDoCheck)&&((n.preOrderHooks??=[]).push(t.index),o=!0),!a&&(d.ngOnChanges||d.ngDoCheck)&&((n.preOrderCheckHooks??=[]).push(t.index),a=!0),l++}C1(n,t,s)}function D1(n,e,t,i,r){let s=r.hostBindings;if(s){let o=n.hostBindingOpCodes;o===null&&(o=n.hostBindingOpCodes=[]);let a=~e.index;R1(o)!=a&&o.push(a),o.push(t,i,s)}}function R1(n){let e=n.length;for(;e>0;){let t=n[--e];if(typeof t=="number"&&t<0)return t}return 0}function P1(n,e,t,i){let r=t.directiveStart,s=t.directiveEnd;iu(t)&&B1(e,t,n.data[r+t.componentOffset]),n.firstCreatePass||Sx(t,e),Fr(i,e);let o=t.initialInputs;for(let a=r;a<s;a++){let l=n.data[a],c=xo(e,n,a,t);if(Fr(c,e),o!==null&&z1(e,a-r,c,l,t,o),Fa(l)){let u=Br(t.index,e);u[Si]=xo(e,n,a,t)}}}function i_(n,e,t){let i=t.directiveStart,r=t.directiveEnd,s=t.index,o=iC();try{Is(s);for(let a=i;a<r;a++){let l=n.data[a],c=e[a];Wh(a),(l.hostBindings!==null||l.hostVars!==0||l.hostAttrs!==null)&&N1(l,c)}}finally{Is(-1),Wh(o)}}function N1(n,e){n.hostBindings!==null&&n.hostBindings(1,e)}function O1(n,e){let t=n.directiveRegistry,i=null,r=null;if(t)for(let s=0;s<t.length;s++){let o=t[s];if(dE(e,o.selectors,!1))if(i||(i=[]),Fa(o))if(o.findHostDirectiveDefs!==null){let a=[];r=r||new Map,o.findHostDirectiveDefs(o,a,r),i.unshift(...a,o);let l=a.length;Qh(n,e,l)}else i.unshift(o),Qh(n,e,0);else r=r||new Map,o.findHostDirectiveDefs?.(o,i,r),i.push(o)}return i===null?null:[i,r]}function Qh(n,e,t){e.componentOffset=t,(n.components??=[]).push(e.index)}function L1(n,e,t){if(e){let i=n.localNames=[];for(let r=0;r<e.length;r+=2){let s=t[e[r+1]];if(s==null)throw new Fe(-301,!1);i.push(e[r],s)}}}function F1(n,e,t){if(t){if(e.exportAs)for(let i=0;i<e.exportAs.length;i++)t[e.exportAs[i]]=n;Fa(e)&&(t[""]=n)}}function k1(n,e,t){n.flags|=1,n.directiveStart=e,n.directiveEnd=e+t,n.providerIndexes=e}function U1(n,e,t,i,r){n.data[i]=r;let s=r.factory||(r.factory=Cs(r.type,!0)),o=new Ta(s,Fa(r),Ze);n.blueprint[i]=o,t[i]=o,D1(n,e,i,Qx(n,t,r.hostVars,fi),r)}function B1(n,e,t){let i=di(e,n),r=t_(t),s=n[Mi].rendererFactory,o=16;t.signals?o=4096:t.onPush&&(o=64);let a=fu(n,du(n,r,null,o,i,e,null,s.createRenderer(i,t),null,null,null));n[e.index]=a}function V1(n,e,t,i,r,s){let o=di(n,e);H1(e[nn],o,s,n.value,t,i,r)}function H1(n,e,t,i,r,s,o){if(s==null)n.removeAttribute(e,r,t);else{let a=o==null?po(s):o(s,i||"",r);n.setAttribute(e,r,a,t)}}function z1(n,e,t,i,r,s){let o=s[e];if(o!==null)for(let a=0;a<o.length;){let l=o[a++],c=o[a++],u=o[a++],d=o[a++];Kx(i,t,l,c,u,d)}}function G1(n,e,t){let i=null,r=0;for(;r<t.length;){let s=t[r];if(s===0){r+=4;continue}else if(s===5){r+=2;continue}if(typeof s=="number")break;if(n.hasOwnProperty(s)){i===null&&(i=[]);let o=n[s];for(let a=0;a<o.length;a+=3)if(o[a]===e){i.push(s,o[a+1],o[a+2],t[r+1]);break}}r+=2}return i}function r_(n,e,t,i){return[n,!0,0,e,null,i,null,t,null,null]}function s_(n,e){let t=n.contentQueries;if(t!==null){let i=bt(null);try{for(let r=0;r<t.length;r+=2){let s=t[r],o=t[r+1];if(o!==-1){let a=n.data[o];Hp(s),a.contentQueries(2,e[o],o)}}}finally{bt(i)}}}function fu(n,e){return n[wa]?n[Yv][bi]=e:n[wa]=e,n[Yv]=e,e}function ep(n,e,t){Hp(0);let i=bt(null);try{e(n,t)}finally{bt(i)}}function o_(n){return n[Ma]||(n[Ma]=[])}function a_(n){return n.cleanup||(n.cleanup=[])}function l_(n,e){let t=n[go],i=t?t.get(zi,null):null;i&&i.handleError(e)}function lm(n,e,t,i,r){for(let s=0;s<t.length;){let o=t[s++],a=t[s++],l=t[s++],c=e[o],u=n.data[o];Kx(u,c,i,a,l,r)}}function c_(n,e,t){let i=nx(e,n);JC(n[nn],i,t)}function W1(n,e){let t=Br(e,n),i=t[rt];j1(i,t);let r=t[ur];r!==null&&t[Oc]===null&&(t[Oc]=Jp(r,t[go])),cm(i,t,t[Si])}function j1(n,e){for(let t=e.length;t<n.blueprint.length;t++)e.push(n.blueprint[t])}function cm(n,e,t){zp(e);try{let i=n.viewQuery;i!==null&&ep(1,i,t);let r=n.template;r!==null&&e_(n,e,r,1,t),n.firstCreatePass&&(n.firstCreatePass=!1),e[or]?.finishViewCreation(n),n.staticContentQueries&&s_(n,e),n.staticViewQueries&&ep(2,n.viewQuery,t);let s=n.components;s!==null&&$1(e,s)}catch(i){throw n.firstCreatePass&&(n.incompleteFirstPass=!0,n.firstCreatePass=!1),i}finally{e[Ve]&=-5,Gp()}}function $1(n,e){for(let t=0;t<e.length;t++)W1(n,e[t])}function q1(n,e,t,i){let r=bt(null);try{let s=e.tView,a=n[Ve]&4096?4096:16,l=du(n,s,t,a,null,e,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),c=n[e.index];l[La]=c;let u=n[or];return u!==null&&(l[or]=u.createEmbeddedView(s)),cm(s,l,t),l}finally{bt(r)}}function ay(n,e){return!e||e.firstChild===null||Rx(n)}function X1(n,e,t,i=!0){let r=e[rt];if(n1(r,e,n,t),i){let o=Kh(t,n),a=e[nn],l=tm(a,n[As]);l!==null&&e1(r,n[wi],a,e,l,o)}let s=e[Oc];s!==null&&s.firstChild!==null&&(s.firstChild=null)}function Hc(n,e,t,i,r=!1){for(;t!==null;){let s=e[t.index];s!==null&&i.push(Hi(s)),dr(s)&&Y1(s,i);let o=t.type;if(o&8)Hc(n,e,t.child,i);else if(o&32){let a=em(t,e),l;for(;l=a();)i.push(l)}else if(o&16){let a=qx(e,t);if(Array.isArray(a))i.push(...a);else{let l=Ca(e[Vi]);Hc(l[rt],l,a,i,!0)}}t=r?t.projectionNext:t.next}return i}function Y1(n,e){for(let t=Xn;t<n.length;t++){let i=n[t],r=i[rt].firstChild;r!==null&&Hc(i[rt],i,r,e)}n[As]!==n[ur]&&e.push(n[As])}var u_=[];function Z1(n){return n[Ts]??J1(n)}function J1(n){let e=u_.pop()??Object.create(Q1);return e.lView=n,e}function K1(n){n.lView[Ts]!==n&&(n.lView=null,u_.push(n))}var Q1=zt(Ae({},av),{consumerIsAlwaysLive:!0,consumerMarkedDirty:n=>{Ea(n.lView)},consumerOnSignalRead(){this.lView[Ts]=this}}),d_=100;function f_(n,e=!0,t=0){let i=n[Mi],r=i.rendererFactory,s=!1;s||r.begin?.();try{eT(n,t)}catch(o){throw e&&l_(n,o),o}finally{s||(r.end?.(),i.inlineEffectRunner?.flush())}}function eT(n,e){tp(n,e);let t=0;for(;kp(n);){if(t===d_)throw new Fe(103,!1);t++,tp(n,1)}}function tT(n,e,t,i){let r=e[Ve];if((r&256)===256)return;let s=!1;!s&&e[Mi].inlineEffectRunner?.flush(),zp(e);let o=null,a=null;!s&&nT(n)&&(a=Z1(e),o=lv(a));try{sx(e),eC(n.bindingStartIndex),t!==null&&e_(n,e,t,2,i);let l=(r&3)===3;if(!s)if(l){let d=n.preOrderCheckHooks;d!==null&&Ec(e,d,null)}else{let d=n.preOrderHooks;d!==null&&Cc(e,d,0,null),Mh(e,0)}if(iT(e),h_(e,0),n.contentQueries!==null&&s_(n,e),!s)if(l){let d=n.contentCheckHooks;d!==null&&Ec(e,d)}else{let d=n.contentHooks;d!==null&&Cc(e,d,1),Mh(e,1)}y1(n,e);let c=n.components;c!==null&&m_(e,c,0);let u=n.viewQuery;if(u!==null&&ep(2,u,i),!s)if(l){let d=n.viewCheckHooks;d!==null&&Ec(e,d)}else{let d=n.viewHooks;d!==null&&Cc(e,d,2),Mh(e,2)}if(n.firstUpdatePass===!0&&(n.firstUpdatePass=!1),e[Sh]){for(let d of e[Sh])d();e[Sh]=null}s||(e[Ve]&=-73)}catch(l){throw Ea(e),l}finally{a!==null&&(cv(a,o),K1(a)),Gp()}}function nT(n){return n.type!==2}function h_(n,e){for(let t=Nx(n);t!==null;t=Ox(t))for(let i=Xn;i<t.length;i++){let r=t[i];p_(r,e)}}function iT(n){for(let e=Nx(n);e!==null;e=Ox(e)){if(!(e[Ve]&Op.HasTransplantedViews))continue;let t=e[vo];for(let i=0;i<t.length;i++){let r=t[i],s=r[hn];zE(r)}}}function rT(n,e,t){let i=Br(e,n);p_(i,t)}function p_(n,e){Fp(n)&&tp(n,e)}function tp(n,e){let i=n[rt],r=n[Ve],s=n[Ts],o=!!(e===0&&r&16);if(o||=!!(r&64&&e===0),o||=!!(r&1024),o||=!!(s?.dirty&&nh(s)),s&&(s.dirty=!1),n[Ve]&=-9217,o)tT(i,n,i.template,n[Si]);else if(r&8192){h_(n,1);let a=i.components;a!==null&&m_(n,a,1)}}function m_(n,e,t){for(let i=0;i<e.length;i++)rT(n,e[i],t)}function um(n){for(n[Mi].changeDetectionScheduler?.notify();n;){n[Ve]|=64;let e=Ca(n);if(NE(n)&&!e)return n;n=e}return null}var Ds=class{get rootNodes(){let e=this._lView,t=e[rt];return Hc(t,e,t.firstChild,[])}constructor(e,t,i=!0){this._lView=e,this._cdRefInjectingView=t,this.notifyErrorHandler=i,this._appRef=null,this._attachedToViewContainer=!1}get context(){return this._lView[Si]}set context(e){this._lView[Si]=e}get destroyed(){return(this._lView[Ve]&256)===256}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let e=this._lView[hn];if(dr(e)){let t=e[Lc],i=t?t.indexOf(this):-1;i>-1&&(Jh(e,i),Pc(t,i))}this._attachedToViewContainer=!1}jx(this._lView[rt],this._lView)}onDestroy(e){ox(this._lView,e)}markForCheck(){um(this._cdRefInjectingView||this._lView)}detach(){this._lView[Ve]&=-129}reattach(){Gh(this._lView),this._lView[Ve]|=128}detectChanges(){this._lView[Ve]|=1024,f_(this._lView,this.notifyErrorHandler)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new Fe(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null,Gx(this._lView[rt],this._lView)}attachToAppRef(e){if(this._attachedToViewContainer)throw new Fe(902,!1);this._appRef=e,Gh(this._lView)}},Rs=(()=>{class n{static{this.__NG_ELEMENT_ID__=aT}}return n})(),sT=Rs,oT=class extends sT{constructor(e,t,i){super(),this._declarationLView=e,this._declarationTContainer=t,this.elementRef=i}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(e,t){return this.createEmbeddedViewImpl(e,t)}createEmbeddedViewImpl(e,t,i){let r=q1(this._declarationLView,this._declarationTContainer,e,{embeddedViewInjector:t,dehydratedView:i});return new Ds(r)}};function aT(){return dm(Bn(),ft())}function dm(n,e){return n.type&4?new oT(e,n,Eo(n,e)):null}var R5=new RegExp(`^(\\d+)*(${FC}|${LC})*(.*)`);var lT=()=>null;function ly(n,e){return lT(n,e)}var zc=class{},np=class{},Gc=class{};function cT(n){let e=Error(`No component factory found for ${In(n)}.`);return e[uT]=n,e}var uT="ngComponent";var ip=class{resolveComponentFactory(e){throw cT(e)}},hu=(()=>{class n{static{this.NULL=new ip}}return n})(),Aa=class{},hi=(()=>{class n{constructor(){this.destroyNode=null}static{this.__NG_ELEMENT_ID__=()=>dT()}}return n})();function dT(){let n=ft(),e=Bn(),t=Br(e.index,n);return(ws(t)?t:n)[nn]}var fT=(()=>{class n{static{this.\u0275prov=He({token:n,providedIn:"root",factory:()=>null})}}return n})(),Ah={};var cy=new Set;function fm(n){cy.has(n)||(cy.add(n),performance?.mark?.("mark_feature_usage",{detail:{feature:n}}))}function uy(...n){}function hT(){let n=typeof Ms.requestAnimationFrame=="function",e=Ms[n?"requestAnimationFrame":"setTimeout"],t=Ms[n?"cancelAnimationFrame":"clearTimeout"];if(typeof Zone<"u"&&e&&t){let i=e[Zone.__symbol__("OriginalDelegate")];i&&(e=i);let r=t[Zone.__symbol__("OriginalDelegate")];r&&(t=r)}return{nativeRequestAnimationFrame:e,nativeCancelAnimationFrame:t}}var kt=class n{constructor({enableLongStackTrace:e=!1,shouldCoalesceEventChangeDetection:t=!1,shouldCoalesceRunChangeDetection:i=!1}){if(this.hasPendingMacrotasks=!1,this.hasPendingMicrotasks=!1,this.isStable=!0,this.onUnstable=new qn(!1),this.onMicrotaskEmpty=new qn(!1),this.onStable=new qn(!1),this.onError=new qn(!1),typeof Zone>"u")throw new Fe(908,!1);Zone.assertZonePatched();let r=this;r._nesting=0,r._outer=r._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(r._inner=r._inner.fork(new Zone.TaskTrackingZoneSpec)),e&&Zone.longStackTraceZoneSpec&&(r._inner=r._inner.fork(Zone.longStackTraceZoneSpec)),r.shouldCoalesceEventChangeDetection=!i&&t,r.shouldCoalesceRunChangeDetection=i,r.lastRequestAnimationFrameId=-1,r.nativeRequestAnimationFrame=hT().nativeRequestAnimationFrame,gT(r)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get("isAngularZone")===!0}static assertInAngularZone(){if(!n.isInAngularZone())throw new Fe(909,!1)}static assertNotInAngularZone(){if(n.isInAngularZone())throw new Fe(909,!1)}run(e,t,i){return this._inner.run(e,t,i)}runTask(e,t,i,r){let s=this._inner,o=s.scheduleEventTask("NgZoneEvent: "+r,e,pT,uy,uy);try{return s.runTask(o,t,i)}finally{s.cancelTask(o)}}runGuarded(e,t,i){return this._inner.runGuarded(e,t,i)}runOutsideAngular(e){return this._outer.run(e)}},pT={};function hm(n){if(n._nesting==0&&!n.hasPendingMicrotasks&&!n.isStable)try{n._nesting++,n.onMicrotaskEmpty.emit(null)}finally{if(n._nesting--,!n.hasPendingMicrotasks)try{n.runOutsideAngular(()=>n.onStable.emit(null))}finally{n.isStable=!0}}}function mT(n){n.isCheckStableRunning||n.lastRequestAnimationFrameId!==-1||(n.lastRequestAnimationFrameId=n.nativeRequestAnimationFrame.call(Ms,()=>{n.fakeTopEventTask||(n.fakeTopEventTask=Zone.root.scheduleEventTask("fakeTopEventTask",()=>{n.lastRequestAnimationFrameId=-1,rp(n),n.isCheckStableRunning=!0,hm(n),n.isCheckStableRunning=!1},void 0,()=>{},()=>{})),n.fakeTopEventTask.invoke()}),rp(n))}function gT(n){let e=()=>{mT(n)};n._inner=n._inner.fork({name:"angular",properties:{isAngularZone:!0},onInvokeTask:(t,i,r,s,o,a)=>{if(vT(a))return t.invokeTask(r,s,o,a);try{return dy(n),t.invokeTask(r,s,o,a)}finally{(n.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||n.shouldCoalesceRunChangeDetection)&&e(),fy(n)}},onInvoke:(t,i,r,s,o,a,l)=>{try{return dy(n),t.invoke(r,s,o,a,l)}finally{n.shouldCoalesceRunChangeDetection&&e(),fy(n)}},onHasTask:(t,i,r,s)=>{t.hasTask(r,s),i===r&&(s.change=="microTask"?(n._hasPendingMicrotasks=s.microTask,rp(n),hm(n)):s.change=="macroTask"&&(n.hasPendingMacrotasks=s.macroTask))},onHandleError:(t,i,r,s)=>(t.handleError(r,s),n.runOutsideAngular(()=>n.onError.emit(s)),!1)})}function rp(n){n._hasPendingMicrotasks||(n.shouldCoalesceEventChangeDetection||n.shouldCoalesceRunChangeDetection)&&n.lastRequestAnimationFrameId!==-1?n.hasPendingMicrotasks=!0:n.hasPendingMicrotasks=!1}function dy(n){n._nesting++,n.isStable&&(n.isStable=!1,n.onUnstable.emit(null))}function fy(n){n._nesting--,hm(n)}function vT(n){return!Array.isArray(n)||n.length!==1?!1:n[0].data?.__ignore_ng_zone__===!0}var uo=function(n){return n[n.EarlyRead=0]="EarlyRead",n[n.Write=1]="Write",n[n.MixedReadWrite=2]="MixedReadWrite",n[n.Read=3]="Read",n}(uo||{}),yT={destroy(){}};function pu(n,e){!e&&RE(pu);let t=e?.injector??ve(Hr);if(!XC(t))return yT;fm("NgAfterNextRender");let i=t.get(pm),r=i.handler??=new op,s=e?.phase??uo.MixedReadWrite,o=()=>{r.unregister(l),a()},a=t.get(qp).onDestroy(o),l=cr(t,()=>new sp(s,()=>{o(),n()}));return r.register(l),{destroy:o}}var sp=class{constructor(e,t){this.phase=e,this.callbackFn=t,this.zone=ve(kt),this.errorHandler=ve(zi,{optional:!0}),ve(zc,{optional:!0})?.notify(1)}invoke(){try{this.zone.runOutsideAngular(this.callbackFn)}catch(e){this.errorHandler?.handleError(e)}}},op=class{constructor(){this.executingCallbacks=!1,this.buckets={[uo.EarlyRead]:new Set,[uo.Write]:new Set,[uo.MixedReadWrite]:new Set,[uo.Read]:new Set},this.deferredCallbacks=new Set}register(e){(this.executingCallbacks?this.deferredCallbacks:this.buckets[e.phase]).add(e)}unregister(e){this.buckets[e.phase].delete(e),this.deferredCallbacks.delete(e)}execute(){this.executingCallbacks=!0;for(let e of Object.values(this.buckets))for(let t of e)t.invoke();this.executingCallbacks=!1;for(let e of this.deferredCallbacks)this.buckets[e.phase].add(e);this.deferredCallbacks.clear()}destroy(){for(let e of Object.values(this.buckets))e.clear();this.deferredCallbacks.clear()}},pm=(()=>{class n{constructor(){this.handler=null,this.internalCallbacks=[]}execute(){this.executeInternalCallbacks(),this.handler?.execute()}executeInternalCallbacks(){let t=[...this.internalCallbacks];this.internalCallbacks.length=0;for(let i of t)i()}ngOnDestroy(){this.handler?.destroy(),this.handler=null,this.internalCallbacks.length=0}static{this.\u0275prov=He({token:n,providedIn:"root",factory:()=>new n})}}return n})();function Wc(n,e,t){let i=t?n.styles:null,r=t?n.classes:null,s=0;if(e!==null)for(let o=0;o<e.length;o++){let a=e[o];if(typeof a=="number")s=a;else if(s==1)r=Nh(r,a);else if(s==2){let l=a,c=e[++o];i=Nh(i,l+": "+c+";")}}t?n.styles=i:n.stylesWithoutHost=i,t?n.classes=r:n.classesWithoutHost=r}var jc=class extends hu{constructor(e){super(),this.ngModule=e}resolveComponentFactory(e){let t=Lr(e);return new _o(t,this.ngModule)}};function hy(n){let e=[];for(let t in n){if(!n.hasOwnProperty(t))continue;let i=n[t];i!==void 0&&e.push({propName:Array.isArray(i)?i[0]:i,templateName:t})}return e}function xT(n){let e=n.toLowerCase();return e==="svg"?tx:e==="math"?kE:null}var ap=class{constructor(e,t){this.injector=e,this.parentInjector=t}get(e,t,i){i=Kc(i);let r=this.injector.get(e,Ah,i);return r!==Ah||t===Ah?r:this.parentInjector.get(e,t,i)}},_o=class extends Gc{get inputs(){let e=this.componentDef,t=e.inputTransforms,i=hy(e.inputs);if(t!==null)for(let r of i)t.hasOwnProperty(r.propName)&&(r.transform=t[r.propName]);return i}get outputs(){return hy(this.componentDef.outputs)}constructor(e,t){super(),this.componentDef=e,this.ngModule=t,this.componentType=e.type,this.selector=mE(e.selectors),this.ngContentSelectors=e.ngContentSelectors?e.ngContentSelectors:[],this.isBoundToModule=!!t}create(e,t,i,r){let s=bt(null);try{r=r||this.ngModule;let o=r instanceof Un?r:r?.injector;o&&this.componentDef.getStandaloneInjector!==null&&(o=this.componentDef.getStandaloneInjector(o)||o);let a=o?new ap(e,o):e,l=a.get(Aa,null);if(l===null)throw new Fe(407,!1);let c=a.get(fT,null),u=a.get(pm,null),d=a.get(zc,null),f={rendererFactory:l,sanitizer:c,inlineEffectRunner:null,afterRenderEventManager:u,changeDetectionScheduler:d},h=l.createRenderer(null,this.componentDef),g=this.componentDef.selectors[0][0]||"div",x=i?b1(h,i,this.componentDef.encapsulation,a):zx(h,g,xT(g)),m=512;this.componentDef.signals?m|=4096:this.componentDef.onPush||(m|=16);let p=null;x!==null&&(p=Jp(x,a,!0));let S=om(0,null,null,1,0,null,null,null,null,null,null),w=du(null,S,null,m,null,null,f,h,a,null,p);zp(w);let E,R;try{let C=this.componentDef,I,y=null;C.findHostDirectiveDefs?(I=[],y=new Map,C.findHostDirectiveDefs(C,I,y),I.push(C)):I=[C];let A=_T(w,x),k=bT(A,x,C,I,w,f,h);R=ix(S,ui),x&&wT(h,C,x,i),t!==void 0&&ET(R,this.ngContentSelectors,t),E=MT(k,C,I,y,w,[CT]),cm(S,w,null)}finally{Gp()}return new lp(this.componentType,E,Eo(R,w),w,R)}finally{bt(s)}}},lp=class extends np{constructor(e,t,i,r,s){super(),this.location=i,this._rootLView=r,this._tNode=s,this.previousInputValues=null,this.instance=t,this.hostView=this.changeDetectorRef=new Ds(r,void 0,!1),this.componentType=e}setInput(e,t){let i=this._tNode.inputs,r;if(i!==null&&(r=i[e])){if(this.previousInputValues??=new Map,this.previousInputValues.has(e)&&Object.is(this.previousInputValues.get(e),t))return;let s=this._rootLView;lm(s[rt],s,r,e,t),this.previousInputValues.set(e,t);let o=Br(this._tNode.index,s);um(o)}}get injector(){return new Es(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(e){this.hostView.onDestroy(e)}};function _T(n,e){let t=n[rt],i=ui;return n[i]=e,Ba(t,i,2,"#host",null)}function bT(n,e,t,i,r,s,o){let a=r[rt];ST(i,n,e,o);let l=null;e!==null&&(l=Jp(e,r[go]));let c=s.rendererFactory.createRenderer(e,t),u=16;t.signals?u=4096:t.onPush&&(u=64);let d=du(r,t_(t),null,u,r[n.index],n,s,c,null,null,l);return a.firstCreatePass&&Qh(a,n,i.length-1),fu(r,d),r[n.index]=d}function ST(n,e,t,i){for(let r of n)e.mergedAttrs=Dp(e.mergedAttrs,r.hostAttrs);e.mergedAttrs!==null&&(Wc(e,e.mergedAttrs,!0),t!==null&&Yx(i,t,e))}function MT(n,e,t,i,r,s){let o=Bn(),a=r[rt],l=di(o,r);n_(a,r,o,t,null,i);for(let u=0;u<t.length;u++){let d=o.directiveStart+u,f=xo(r,a,d,o);Fr(f,r)}i_(a,r,o),l&&Fr(l,r);let c=xo(r,a,o.directiveStart+o.componentOffset,o);if(n[Si]=r[Si]=c,s!==null)for(let u of s)u(c,e);return im(a,o,r),c}function wT(n,e,t,i){if(i)kh(n,t,["ng-version","17.3.12"]);else{let{attrs:r,classes:s}=gE(e.selectors[0]);r&&kh(n,t,r),s&&s.length>0&&Xx(n,t,s.join(" "))}}function ET(n,e,t){let i=n.projection=[];for(let r=0;r<e.length;r++){let s=t[r];i.push(s!=null?Array.from(s):null)}}function CT(){let n=Bn();au(ft()[rt],n)}var zr=(()=>{class n{static{this.__NG_ELEMENT_ID__=TT}}return n})();function TT(){let n=Bn();return v_(n,ft())}var AT=zr,g_=class extends AT{constructor(e,t,i){super(),this._lContainer=e,this._hostTNode=t,this._hostLView=i}get element(){return Eo(this._hostTNode,this._hostLView)}get injector(){return new Es(this._hostTNode,this._hostLView)}get parentInjector(){let e=Wp(this._hostTNode,this._hostLView);if(xx(e)){let t=kc(e,this._hostLView),i=Fc(e),r=t[rt].data[i+8];return new Es(r,t)}else return new Es(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(e){let t=py(this._lContainer);return t!==null&&t[e]||null}get length(){return this._lContainer.length-Xn}createEmbeddedView(e,t,i){let r,s;typeof i=="number"?r=i:i!=null&&(r=i.index,s=i.injector);let o=ly(this._lContainer,e.ssrId),a=e.createEmbeddedViewImpl(t||{},s,o);return this.insertImpl(a,r,ay(this._hostTNode,o)),a}createComponent(e,t,i,r,s){let o=e&&!PE(e),a;if(o)a=t;else{let g=t||{};a=g.index,i=g.injector,r=g.projectableNodes,s=g.environmentInjector||g.ngModuleRef}let l=o?e:new _o(Lr(e)),c=i||this.parentInjector;if(!s&&l.ngModule==null){let x=(o?c:this.parentInjector).get(Un,null);x&&(s=x)}let u=Lr(l.componentType??{}),d=ly(this._lContainer,u?.id??null),f=d?.firstChild??null,h=l.create(c,r,f,s);return this.insertImpl(h.hostView,a,ay(this._hostTNode,d)),h}insert(e,t){return this.insertImpl(e,t,!0)}insertImpl(e,t,i){let r=e._lView;if(HE(r)){let a=this.indexOf(e);if(a!==-1)this.detach(a);else{let l=r[hn],c=new g_(l,l[wi],l[hn]);c.detach(c.indexOf(e))}}let s=this._adjustIndex(t),o=this._lContainer;return X1(o,r,s,i),e.attachToViewContainerRef(),Py(Ih(o),s,e),e}move(e,t){return this.insert(e,t)}indexOf(e){let t=py(this._lContainer);return t!==null?t.indexOf(e):-1}remove(e){let t=this._adjustIndex(e,-1),i=Jh(this._lContainer,t);i&&(Pc(Ih(this._lContainer),t),jx(i[rt],i))}detach(e){let t=this._adjustIndex(e,-1),i=Jh(this._lContainer,t);return i&&Pc(Ih(this._lContainer),t)!=null?new Ds(i):null}_adjustIndex(e,t=0){return e??this.length+t}};function py(n){return n[Lc]}function Ih(n){return n[Lc]||(n[Lc]=[])}function v_(n,e){let t,i=e[n.index];return dr(i)?t=i:(t=r_(i,e,null,n),e[n.index]=t,fu(e,t)),DT(t,e,n,i),new g_(t,n,e)}function IT(n,e){let t=n[nn],i=t.createComment(""),r=di(e,n),s=tm(t,r);return Vc(t,s,i,c1(t,r),!1),i}var DT=NT,RT=()=>!1;function PT(n,e,t){return RT(n,e,t)}function NT(n,e,t,i){if(n[As])return;let r;t.type&8?r=Hi(i):r=IT(e,t),n[As]=r}var cp=class n{constructor(e){this.queryList=e,this.matches=null}clone(){return new n(this.queryList)}setDirty(){this.queryList.setDirty()}},up=class n{constructor(e=[]){this.queries=e}createEmbeddedView(e){let t=e.queries;if(t!==null){let i=e.contentQueries!==null?e.contentQueries[0]:t.length,r=[];for(let s=0;s<i;s++){let o=t.getByIndex(s),a=this.queries[o.indexInDeclarationView];r.push(a.clone())}return new n(r)}return null}insertView(e){this.dirtyQueriesWithMatches(e)}detachView(e){this.dirtyQueriesWithMatches(e)}finishViewCreation(e){this.dirtyQueriesWithMatches(e)}dirtyQueriesWithMatches(e){for(let t=0;t<this.queries.length;t++)mm(e,t).matches!==null&&this.queries[t].setDirty()}},$c=class{constructor(e,t,i=null){this.flags=t,this.read=i,typeof e=="string"?this.predicate=HT(e):this.predicate=e}},dp=class n{constructor(e=[]){this.queries=e}elementStart(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(e,t)}elementEnd(e){for(let t=0;t<this.queries.length;t++)this.queries[t].elementEnd(e)}embeddedTView(e){let t=null;for(let i=0;i<this.length;i++){let r=t!==null?t.length:0,s=this.getByIndex(i).embeddedTView(e,r);s&&(s.indexInDeclarationView=i,t!==null?t.push(s):t=[s])}return t!==null?new n(t):null}template(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].template(e,t)}getByIndex(e){return this.queries[e]}get length(){return this.queries.length}track(e){this.queries.push(e)}},fp=class n{constructor(e,t=-1){this.metadata=e,this.matches=null,this.indexInDeclarationView=-1,this.crossesNgTemplate=!1,this._appliesToNextNode=!0,this._declarationNodeIndex=t}elementStart(e,t){this.isApplyingToNode(t)&&this.matchTNode(e,t)}elementEnd(e){this._declarationNodeIndex===e.index&&(this._appliesToNextNode=!1)}template(e,t){this.elementStart(e,t)}embeddedTView(e,t){return this.isApplyingToNode(e)?(this.crossesNgTemplate=!0,this.addMatch(-e.index,t),new n(this.metadata)):null}isApplyingToNode(e){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let t=this._declarationNodeIndex,i=e.parent;for(;i!==null&&i.type&8&&i.index!==t;)i=i.parent;return t===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(e,t){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let s=i[r];this.matchTNodeWithReadOption(e,t,OT(t,s)),this.matchTNodeWithReadOption(e,t,Tc(t,e,s,!1,!1))}else i===Rs?t.type&4&&this.matchTNodeWithReadOption(e,t,-1):this.matchTNodeWithReadOption(e,t,Tc(t,e,i,!1,!1))}matchTNodeWithReadOption(e,t,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===bn||r===zr||r===Rs&&t.type&4)this.addMatch(t.index,-2);else{let s=Tc(t,e,r,!1,!1);s!==null&&this.addMatch(t.index,s)}else this.addMatch(t.index,i)}}addMatch(e,t){this.matches===null?this.matches=[e,t]:this.matches.push(e,t)}};function OT(n,e){let t=n.localNames;if(t!==null){for(let i=0;i<t.length;i+=2)if(t[i]===e)return t[i+1]}return null}function LT(n,e){return n.type&11?Eo(n,e):n.type&4?dm(n,e):null}function FT(n,e,t,i){return t===-1?LT(e,n):t===-2?kT(n,e,i):xo(n,n[rt],t,e)}function kT(n,e,t){if(t===bn)return Eo(e,n);if(t===Rs)return dm(e,n);if(t===zr)return v_(e,n)}function y_(n,e,t,i){let r=e[or].queries[i];if(r.matches===null){let s=n.data,o=t.matches,a=[];for(let l=0;o!==null&&l<o.length;l+=2){let c=o[l];if(c<0)a.push(null);else{let u=s[c];a.push(FT(e,u,o[l+1],t.metadata.read))}}r.matches=a}return r.matches}function hp(n,e,t,i){let r=n.queries.getByIndex(t),s=r.matches;if(s!==null){let o=y_(n,e,r,t);for(let a=0;a<s.length;a+=2){let l=s[a];if(l>0)i.push(o[a/2]);else{let c=s[a+1],u=e[-l];for(let d=Xn;d<u.length;d++){let f=u[d];f[La]===f[hn]&&hp(f[rt],f,c,i)}if(u[vo]!==null){let d=u[vo];for(let f=0;f<d.length;f++){let h=d[f];hp(h[rt],h,c,i)}}}}}return i}function UT(n,e){return n[or].queries[e].queryList}function x_(n,e,t){let i=new Yh((t&4)===4);return w1(n,e,i,i.destroy),(e[or]??=new up).queries.push(new cp(i))-1}function BT(n,e,t){let i=_n();return i.firstCreatePass&&(__(i,new $c(n,e,t),-1),(e&2)===2&&(i.staticViewQueries=!0)),x_(i,ft(),e)}function VT(n,e,t,i){let r=_n();if(r.firstCreatePass){let s=Bn();__(r,new $c(e,t,i),s.index),zT(r,n),(t&2)===2&&(r.staticContentQueries=!0)}return x_(r,ft(),t)}function HT(n){return n.split(",").map(e=>e.trim())}function __(n,e,t){n.queries===null&&(n.queries=new dp),n.queries.track(new fp(e,t))}function zT(n,e){let t=n.contentQueries||(n.contentQueries=[]),i=t.length?t[t.length-1]:-1;e!==i&&t.push(n.queries.length-1,e)}function mm(n,e){return n.queries.getByIndex(e)}function GT(n,e){let t=n[rt],i=mm(t,e);return i.crossesNgTemplate?hp(t,n,e,[]):y_(t,n,i,e)}function gm(n){let e=n.inputConfig,t={};for(let i in e)if(e.hasOwnProperty(i)){let r=e[i];Array.isArray(r)&&r[3]&&(t[i]=r[3])}n.inputTransforms=t}var kr=class{},Ia=class{};var pp=class extends kr{constructor(e,t,i){super(),this._parent=t,this._bootstrapComponents=[],this.destroyCbs=[],this.componentFactoryResolver=new jc(this);let r=zy(e);this._bootstrapComponents=Hx(r.bootstrap),this._r3Injector=Ix(e,t,[{provide:kr,useValue:this},{provide:hu,useValue:this.componentFactoryResolver},...i],In(e),new Set(["environment"])),this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(e)}get injector(){return this._r3Injector}destroy(){let e=this._r3Injector;!e.destroyed&&e.destroy(),this.destroyCbs.forEach(t=>t()),this.destroyCbs=null}onDestroy(e){this.destroyCbs.push(e)}},mp=class extends Ia{constructor(e){super(),this.moduleType=e}create(e){return new pp(this.moduleType,e,[])}};var qc=class extends kr{constructor(e){super(),this.componentFactoryResolver=new jc(this),this.instance=null;let t=new Sa([...e.providers,{provide:kr,useValue:this},{provide:hu,useValue:this.componentFactoryResolver}],e.parent||Np(),e.debugName,new Set(["environment"]));this.injector=t,e.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(e){this.injector.onDestroy(e)}};function mu(n,e,t=null){return new qc({providers:n,parent:e,debugName:t,runEnvironmentInitializers:!0}).injector}var gu=(()=>{class n{constructor(){this.taskId=0,this.pendingTasks=new Set,this.hasPendingTasks=new dn(!1)}get _hasPendingTasks(){return this.hasPendingTasks.value}add(){this._hasPendingTasks||this.hasPendingTasks.next(!0);let t=this.taskId++;return this.pendingTasks.add(t),t}remove(t){this.pendingTasks.delete(t),this.pendingTasks.size===0&&this._hasPendingTasks&&this.hasPendingTasks.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this._hasPendingTasks&&this.hasPendingTasks.next(!1)}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();function b_(n){return jT(n)?Array.isArray(n)||!(n instanceof Map)&&Symbol.iterator in n:!1}function WT(n,e){if(Array.isArray(n))for(let t=0;t<n.length;t++)e(n[t]);else{let t=n[Symbol.iterator](),i;for(;!(i=t.next()).done;)e(i.value)}}function jT(n){return n!==null&&(typeof n=="function"||typeof n=="object")}function vu(n,e,t){return n[e]=t}function $T(n,e){return n[e]}function lr(n,e,t){let i=n[e];return Object.is(i,t)?!1:(n[e]=t,!0)}function vm(n,e,t,i){let r=lr(n,e,t);return lr(n,e+1,i)||r}function qT(n,e,t,i,r){let s=vm(n,e,t,i);return lr(n,e+2,r)||s}function XT(n){return(n.flags&32)===32}function YT(n,e,t,i,r,s,o,a,l){let c=e.consts,u=Ba(e,n,4,o||null,yo(c,a));am(e,t,u,yo(c,l)),au(e,u);let d=u.tView=om(2,u,i,r,s,e.directiveRegistry,e.pipeRegistry,null,e.schemas,c,null);return e.queries!==null&&(e.queries.template(e,u),d.queries=e.queries.embeddedTView(u)),u}function vt(n,e,t,i,r,s,o,a){let l=ft(),c=_n(),u=n+ui,d=c.firstCreatePass?YT(u,c,l,e,t,i,r,s,o):c.data[u];Ns(d,!1);let f=ZT(c,l,d,n);su()&&cu(c,l,f,d),Fr(f,l);let h=r_(f,l,f,d);return l[u]=h,fu(l,h),PT(h,d,l),ru(d)&&rm(c,l,d),o!=null&&sm(l,d,a),vt}var ZT=JT;function JT(n,e,t,i){return ou(!0),e[nn].createComment("")}function ym(n,e,t,i){let r=ft(),s=Bp();if(lr(r,s,e)){let o=_n(),a=gx();V1(a,r,n,e,t,i)}return ym}function KT(n,e,t,i){return lr(n,Bp(),t)?e+po(t)+i:fi}function QT(n,e,t,i,r,s){let o=QE(),a=vm(n,o,t,r);return Vp(2),a?e+po(t)+i+po(r)+s:fi}function Mc(n,e){return n<<17|e<<2}function Ps(n){return n>>17&32767}function eA(n){return(n&2)==2}function tA(n,e){return n&131071|e<<17}function gp(n){return n|2}function bo(n){return(n&131068)>>2}function Dh(n,e){return n&-131069|e<<2}function nA(n){return(n&1)===1}function vp(n){return n|1}function iA(n,e,t,i,r,s){let o=s?e.classBindings:e.styleBindings,a=Ps(o),l=bo(o);n[i]=t;let c=!1,u;if(Array.isArray(t)){let d=t;u=d[1],(u===null||Na(d,u)>0)&&(c=!0)}else u=t;if(r)if(l!==0){let f=Ps(n[a+1]);n[i+1]=Mc(f,a),f!==0&&(n[f+1]=Dh(n[f+1],i)),n[a+1]=tA(n[a+1],i)}else n[i+1]=Mc(a,0),a!==0&&(n[a+1]=Dh(n[a+1],i)),a=i;else n[i+1]=Mc(l,0),a===0?a=i:n[l+1]=Dh(n[l+1],i),l=i;c&&(n[i+1]=gp(n[i+1])),my(n,u,i,!0),my(n,u,i,!1),rA(e,u,n,i,s),o=Mc(a,l),s?e.classBindings=o:e.styleBindings=o}function rA(n,e,t,i,r){let s=r?n.residualClasses:n.residualStyles;s!=null&&typeof e=="string"&&Na(s,e)>=0&&(t[i+1]=vp(t[i+1]))}function my(n,e,t,i){let r=n[t+1],s=e===null,o=i?Ps(r):bo(r),a=!1;for(;o!==0&&(a===!1||s);){let l=n[o],c=n[o+1];sA(l,e)&&(a=!0,n[o+1]=i?vp(c):gp(c)),o=i?Ps(c):bo(c)}a&&(n[t+1]=i?gp(r):vp(r))}function sA(n,e){return n===null||e==null||(Array.isArray(n)?n[1]:n)===e?!0:Array.isArray(n)&&typeof e=="string"?Na(n,e)>=0:!1}var _i={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function oA(n){return n.substring(_i.key,_i.keyEnd)}function aA(n){return lA(n),S_(n,M_(n,0,_i.textEnd))}function S_(n,e){let t=_i.textEnd;return t===e?-1:(e=_i.keyEnd=cA(n,_i.key=e,t),M_(n,e,t))}function lA(n){_i.key=0,_i.keyEnd=0,_i.value=0,_i.valueEnd=0,_i.textEnd=n.length}function M_(n,e,t){for(;e<t&&n.charCodeAt(e)<=32;)e++;return e}function cA(n,e,t){for(;e<t&&n.charCodeAt(e)>32;)e++;return e}function Pe(n,e,t){let i=ft(),r=Bp();if(lr(i,r,e)){let s=_n(),o=gx();A1(s,o,i,n,e,i[nn],t,!1)}return Pe}function yp(n,e,t,i,r){let s=e.inputs,o=r?"class":"style";lm(n,t,s[o],o,i)}function Lt(n,e,t){return E_(n,e,t,!1),Lt}function Wt(n,e){return E_(n,e,null,!0),Wt}function w_(n){dA(vA,uA,n,!0)}function uA(n,e){for(let t=aA(e);t>=0;t=S_(e,t))Ip(n,oA(e),!0)}function E_(n,e,t,i){let r=ft(),s=_n(),o=Vp(2);if(s.firstUpdatePass&&T_(s,n,o,i),e!==fi&&lr(r,o,e)){let a=s.data[Vr()];A_(s,a,r,r[nn],n,r[o+1]=xA(e,t),i,o)}}function dA(n,e,t,i){let r=_n(),s=Vp(2);r.firstUpdatePass&&T_(r,null,s,i);let o=ft();if(t!==fi&&lr(o,s,t)){let a=r.data[Vr()];if(I_(a,i)&&!C_(r,s)){let l=i?a.classesWithoutHost:a.stylesWithoutHost;l!==null&&(t=Nh(l,t||"")),yp(r,a,o,t,i)}else yA(r,a,o,o[nn],o[s+1],o[s+1]=gA(n,e,t),i,s)}}function C_(n,e){return e>=n.expandoStartIndex}function T_(n,e,t,i){let r=n.data;if(r[t+1]===null){let s=r[Vr()],o=C_(n,t);I_(s,i)&&e===null&&!o&&(e=!1),e=fA(r,s,e,i),iA(r,s,e,t,o,i)}}function fA(n,e,t,i){let r=rC(n),s=i?e.residualClasses:e.residualStyles;if(r===null)(i?e.classBindings:e.styleBindings)===0&&(t=Rh(null,n,e,t,i),t=Da(t,e.attrs,i),s=null);else{let o=e.directiveStylingLast;if(o===-1||n[o]!==r)if(t=Rh(r,n,e,t,i),s===null){let l=hA(n,e,i);l!==void 0&&Array.isArray(l)&&(l=Rh(null,n,e,l[1],i),l=Da(l,e.attrs,i),pA(n,e,i,l))}else s=mA(n,e,i)}return s!==void 0&&(i?e.residualClasses=s:e.residualStyles=s),t}function hA(n,e,t){let i=t?e.classBindings:e.styleBindings;if(bo(i)!==0)return n[Ps(i)]}function pA(n,e,t,i){let r=t?e.classBindings:e.styleBindings;n[Ps(r)]=i}function mA(n,e,t){let i,r=e.directiveEnd;for(let s=1+e.directiveStylingLast;s<r;s++){let o=n[s].hostAttrs;i=Da(i,o,t)}return Da(i,e.attrs,t)}function Rh(n,e,t,i,r){let s=null,o=t.directiveEnd,a=t.directiveStylingLast;for(a===-1?a=t.directiveStart:a++;a<o&&(s=e[a],i=Da(i,s.hostAttrs,r),s!==n);)a++;return n!==null&&(t.directiveStylingLast=a),i}function Da(n,e,t){let i=t?1:2,r=-1;if(e!==null)for(let s=0;s<e.length;s++){let o=e[s];typeof o=="number"?r=o:r===i&&(Array.isArray(n)||(n=n===void 0?[]:["",n]),Ip(n,o,t?!0:e[++s]))}return n===void 0?null:n}function gA(n,e,t){if(t==null||t==="")return $n;let i=[],r=Co(t);if(Array.isArray(r))for(let s=0;s<r.length;s++)n(i,r[s],!0);else if(typeof r=="object")for(let s in r)r.hasOwnProperty(s)&&n(i,s,r[s]);else typeof r=="string"&&e(i,r);return i}function vA(n,e,t){let i=String(e);i!==""&&!i.includes(" ")&&Ip(n,i,t)}function yA(n,e,t,i,r,s,o,a){r===fi&&(r=$n);let l=0,c=0,u=0<r.length?r[0]:null,d=0<s.length?s[0]:null;for(;u!==null||d!==null;){let f=l<r.length?r[l+1]:void 0,h=c<s.length?s[c+1]:void 0,g=null,x;u===d?(l+=2,c+=2,f!==h&&(g=d,x=h)):d===null||u!==null&&u<d?(l+=2,g=u):(c+=2,g=d,x=h),g!==null&&A_(n,e,t,i,g,x,o,a),u=l<r.length?r[l]:null,d=c<s.length?s[c]:null}}function A_(n,e,t,i,r,s,o,a){if(!(e.type&3))return;let l=n.data,c=l[a+1],u=nA(c)?gy(l,e,t,r,bo(c),o):void 0;if(!Xc(u)){Xc(s)||eA(c)&&(s=gy(l,null,t,r,a,o));let d=nx(Vr(),t);g1(i,o,d,r,s)}}function gy(n,e,t,i,r,s){let o=e===null,a;for(;r>0;){let l=n[r],c=Array.isArray(l),u=c?l[1]:l,d=u===null,f=t[r+1];f===fi&&(f=d?$n:void 0);let h=d?_h(f,i):u===i?f:void 0;if(c&&!Xc(h)&&(h=_h(l,i)),Xc(h)&&(a=h,o))return a;let g=n[r+1];r=o?Ps(g):bo(g)}if(e!==null){let l=s?e.residualClasses:e.residualStyles;l!=null&&(a=_h(l,i))}return a}function Xc(n){return n!==void 0}function xA(n,e){return n==null||n===""||(typeof e=="string"?n=n+e:typeof n=="object"&&(n=In(Co(n)))),n}function I_(n,e){return(n.flags&(e?8:16))!==0}function _A(n,e,t,i,r,s){let o=e.consts,a=yo(o,r),l=Ba(e,n,2,i,a);return am(e,t,l,yo(o,s)),l.attrs!==null&&Wc(l,l.attrs,!1),l.mergedAttrs!==null&&Wc(l,l.mergedAttrs,!0),e.queries!==null&&e.queries.elementStart(e,l),l}function M(n,e,t,i){let r=ft(),s=_n(),o=ui+n,a=r[nn],l=s.firstCreatePass?_A(o,s,r,e,t,i):s.data[o],c=bA(s,r,l,a,e,n);r[o]=c;let u=ru(l);return Ns(l,!0),Yx(a,c,l),!XT(l)&&su()&&cu(s,r,c,l),jE()===0&&Fr(c,r),$E(),u&&(rm(s,r,l),im(s,l,r)),i!==null&&sm(r,l),M}function T(){let n=Bn();Up()?cx():(n=n.parent,Ns(n,!1));let e=n;YE(e)&&ZE(),qE();let t=_n();return t.firstCreatePass&&(au(t,n),Lp(n)&&t.queries.elementEnd(n)),e.classesWithoutHost!=null&&fC(e)&&yp(t,e,ft(),e.classesWithoutHost,!0),e.stylesWithoutHost!=null&&hC(e)&&yp(t,e,ft(),e.stylesWithoutHost,!1),T}function q(n,e,t,i){return M(n,e,t,i),T(),q}var bA=(n,e,t,i,r,s)=>(ou(!0),zx(i,r,lC()));function SA(n,e,t,i,r){let s=e.consts,o=yo(s,i),a=Ba(e,n,8,"ng-container",o);o!==null&&Wc(a,o,!0);let l=yo(s,r);return am(e,t,a,l),e.queries!==null&&e.queries.elementStart(e,a),a}function xm(n,e,t){let i=ft(),r=_n(),s=n+ui,o=r.firstCreatePass?SA(s,r,i,e,t):r.data[s];Ns(o,!0);let a=MA(r,i,o,n);return i[s]=a,su()&&cu(r,i,a,o),Fr(a,i),ru(o)&&(rm(r,i,o),im(r,o,i)),t!=null&&sm(i,o),xm}function _m(){let n=Bn(),e=_n();return Up()?cx():(n=n.parent,Ns(n,!1)),e.firstCreatePass&&(au(e,n),Lp(n)&&e.queries.elementEnd(n)),_m}var MA=(n,e,t,i)=>(ou(!0),KC(e[nn],""));function Ei(){return ft()}var Yc="en-US";var wA=Yc;function EA(n){typeof n=="string"&&(wA=n.toLowerCase().replace(/_/g,"-"))}function ke(n,e,t,i){let r=ft(),s=_n(),o=Bn();return TA(s,r,r[nn],o,n,e,i),ke}function CA(n,e,t,i){let r=n.cleanup;if(r!=null)for(let s=0;s<r.length-1;s+=2){let o=r[s];if(o===t&&r[s+1]===i){let a=e[Ma],l=r[s+2];return a.length>l?a[l]:null}typeof o=="string"&&(s+=2)}return null}function TA(n,e,t,i,r,s,o){let a=ru(i),c=n.firstCreatePass&&a_(n),u=e[Si],d=o_(e),f=!0;if(i.type&3||o){let x=di(i,e),m=o?o(x):x,p=d.length,S=o?E=>o(Hi(E[i.index])):i.index,w=null;if(!o&&a&&(w=CA(n,e,r,i.index)),w!==null){let E=w.__ngLastListenerFn__||w;E.__ngNextListenerFn__=s,w.__ngLastListenerFn__=s,f=!1}else{s=yy(i,e,u,s,!1);let E=t.listen(m,r,s);d.push(s,E),c&&c.push(r,S,p,p+1)}}else s=yy(i,e,u,s,!1);let h=i.outputs,g;if(f&&h!==null&&(g=h[r])){let x=g.length;if(x)for(let m=0;m<x;m+=2){let p=g[m],S=g[m+1],R=e[p][S].subscribe(s),C=d.length;d.push(s,R),c&&c.push(r,i.index,C,-(C+1))}}}function vy(n,e,t,i){let r=bt(null);try{return ki(6,e,t),t(i)!==!1}catch(s){return l_(n,s),!1}finally{ki(7,e,t),bt(r)}}function yy(n,e,t,i,r){return function s(o){if(o===Function)return i;let a=n.componentOffset>-1?Br(n.index,e):e;um(a);let l=vy(e,t,i,o),c=s.__ngNextListenerFn__;for(;c;)l=vy(e,t,c,o)&&l,c=c.__ngNextListenerFn__;return r&&l===!1&&o.preventDefault(),l}}function Sn(n=1){return oC(n)}function D_(n,e,t,i){VT(n,e,t,i)}function R_(n,e,t){BT(n,e,t)}function yu(n){let e=ft(),t=_n(),i=ux();Hp(i+1);let r=mm(t,i);if(n.dirty&&VE(e)===((r.metadata.flags&2)===2)){if(r.matches===null)n.reset([]);else{let s=GT(e,i);n.reset(s,TC),n.notifyOnChanges()}return!0}return!1}function xu(){return UT(ft(),ux())}function AA(n,e,t,i){t>=n.data.length&&(n.data[t]=null,n.blueprint[t]=null),e[t]=i}function _u(n){let e=KE();return rx(e,ui+n)}function P(n,e=""){let t=ft(),i=_n(),r=n+ui,s=i.firstCreatePass?Ba(i,r,1,e,null):i.data[r],o=IA(i,t,s,e,n);t[r]=o,su()&&cu(i,t,o,s),Ns(s,!1)}var IA=(n,e,t,i,r)=>(ou(!0),ZC(e[nn],i));function Ft(n){return Je("",n,""),Ft}function Je(n,e,t){let i=ft(),r=KT(i,n,e,t);return r!==fi&&c_(i,Vr(),r),Je}function bm(n,e,t,i,r){let s=ft(),o=QT(s,n,e,t,i,r);return o!==fi&&c_(s,Vr(),o),bm}var DA=(()=>{class n{constructor(t){this._injector=t,this.cachedInjectors=new Map}getOrCreateStandaloneInjector(t){if(!t.standalone)return null;if(!this.cachedInjectors.has(t)){let i=jy(!1,t.type),r=i.length>0?mu([i],this._injector,`Standalone[${t.type.name}]`):null;this.cachedInjectors.set(t,r)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static{this.\u0275prov=He({token:n,providedIn:"environment",factory:()=>new n(Xe(Un))})}}return n})();function Mn(n){fm("NgStandalone"),n.getStandaloneInjector=e=>e.get(DA).getOrCreateStandaloneInjector(n)}function P_(n,e,t){let i=ka()+n,r=ft();return r[i]===fi?vu(r,i,t?e.call(t):e()):$T(r,i)}function To(n,e,t,i){return O_(ft(),ka(),n,e,t,i)}function N_(n,e,t,i,r){return RA(ft(),ka(),n,e,t,i,r)}function Sm(n,e,t,i,r,s){return PA(ft(),ka(),n,e,t,i,r,s)}function Mm(n,e){let t=n[e];return t===fi?void 0:t}function O_(n,e,t,i,r,s){let o=e+t;return lr(n,o,r)?vu(n,o+1,s?i.call(s,r):i(r)):Mm(n,o+1)}function RA(n,e,t,i,r,s,o){let a=e+t;return vm(n,a,r,s)?vu(n,a+2,o?i.call(o,r,s):i(r,s)):Mm(n,a+2)}function PA(n,e,t,i,r,s,o,a){let l=e+t;return qT(n,l,r,s,o)?vu(n,l+3,a?i.call(a,r,s,o):i(r,s,o)):Mm(n,l+3)}function bu(n,e){let t=_n(),i,r=n+ui;t.firstCreatePass?(i=NA(e,t.pipeRegistry),t.data[r]=i,i.onDestroy&&(t.destroyHooks??=[]).push(r,i.onDestroy)):i=t.data[r];let s=i.factory||(i.factory=Cs(i.type,!0)),o,a=kn(Ze);try{let l=Uc(!1),c=s();return Uc(l),AA(t,ft(),r,c),c}finally{kn(a)}}function NA(n,e){if(e)for(let t=e.length-1;t>=0;t--){let i=e[t];if(n===i.name)return i}}function Su(n,e,t){let i=n+ui,r=ft(),s=rx(r,i);return OA(r,i)?O_(r,ka(),e,s.transform,t,s):s.transform(t)}function OA(n,e){return n[rt].data[e].pure}var Mu=(()=>{class n{log(t){console.log(t)}warn(t){console.warn(t)}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac,providedIn:"platform"})}}return n})();var L_=new ot("");function Va(n){return!!n&&typeof n.then=="function"}function F_(n){return!!n&&typeof n.subscribe=="function"}var wu=new ot(""),k_=(()=>{class n{constructor(){this.initialized=!1,this.done=!1,this.donePromise=new Promise((t,i)=>{this.resolve=t,this.reject=i}),this.appInits=ve(wu,{optional:!0})??[]}runInitializers(){if(this.initialized)return;let t=[];for(let r of this.appInits){let s=r();if(Va(s))t.push(s);else if(F_(s)){let o=new Promise((a,l)=>{s.subscribe({complete:a,error:l})});t.push(o)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(t).then(()=>{i()}).catch(r=>{this.reject(r)}),t.length===0&&i(),this.initialized=!0}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})(),Eu=new ot("");function LA(){dv(()=>{throw new Fe(600,!1)})}function FA(n){return n.isBoundToModule}function kA(n,e,t){try{let i=t();return Va(i)?i.catch(r=>{throw e.runOutsideAngular(()=>n.handleError(r)),r}):i}catch(i){throw e.runOutsideAngular(()=>n.handleError(i)),i}}var Ha=(()=>{class n{constructor(){this._bootstrapListeners=[],this._runningTick=!1,this._destroyed=!1,this._destroyListeners=[],this._views=[],this.internalErrorHandler=ve(Dx),this.afterRenderEffectManager=ve(pm),this.externalTestViews=new Set,this.beforeRender=new yn,this.afterTick=new yn,this.componentTypes=[],this.components=[],this.isStable=ve(gu).hasPendingTasks.pipe(gt(t=>!t)),this._injector=ve(Un)}get destroyed(){return this._destroyed}get injector(){return this._injector}bootstrap(t,i){let r=t instanceof Gc;if(!this._injector.get(k_).done){let f=!r&&Hy(t),h=!1;throw new Fe(405,h)}let o;r?o=t:o=this._injector.get(hu).resolveComponentFactory(t),this.componentTypes.push(o.componentType);let a=FA(o)?void 0:this._injector.get(kr),l=i||o.selector,c=o.create(Hr.NULL,[],l,a),u=c.location.nativeElement,d=c.injector.get(L_,null);return d?.registerApplication(u),c.onDestroy(()=>{this.detachView(c.hostView),Ph(this.components,c),d?.unregisterApplication(u)}),this._loadComponent(c),c}tick(){this._tick(!0)}_tick(t){if(this._runningTick)throw new Fe(101,!1);let i=bt(null);try{this._runningTick=!0,this.detectChangesInAttachedViews(t)}catch(r){this.internalErrorHandler(r)}finally{this.afterTick.next(),this._runningTick=!1,bt(i)}}detectChangesInAttachedViews(t){let i=0,r=this.afterRenderEffectManager;for(;;){if(i===d_)throw new Fe(103,!1);if(t){let s=i===0;this.beforeRender.next(s);for(let{_lView:o,notifyErrorHandler:a}of this._views)UA(o,s,a)}if(i++,r.executeInternalCallbacks(),![...this.externalTestViews.keys(),...this._views].some(({_lView:s})=>xp(s))&&(r.execute(),![...this.externalTestViews.keys(),...this._views].some(({_lView:s})=>xp(s))))break}}attachView(t){let i=t;this._views.push(i),i.attachToAppRef(this)}detachView(t){let i=t;Ph(this._views,i),i.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView),this.tick(),this.components.push(t);let i=this._injector.get(Eu,[]);[...this._bootstrapListeners,...i].forEach(r=>r(t))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(t=>t()),this._views.slice().forEach(t=>t.destroy())}finally{this._destroyed=!0,this._views=[],this._bootstrapListeners=[],this._destroyListeners=[]}}onDestroy(t){return this._destroyListeners.push(t),()=>Ph(this._destroyListeners,t)}destroy(){if(this._destroyed)throw new Fe(406,!1);let t=this._injector;t.destroy&&!t.destroyed&&t.destroy()}get viewCount(){return this._views.length}warnIfDestroyed(){}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();function Ph(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}function UA(n,e,t){!e&&!xp(n)||BA(n,t,e)}function xp(n){return kp(n)}function BA(n,e,t){let i;t?(i=0,n[Ve]|=1024):n[Ve]&64?i=0:i=1,f_(n,e,i)}var _p=class{constructor(e,t){this.ngModuleFactory=e,this.componentFactories=t}},Cu=(()=>{class n{compileModuleSync(t){return new mp(t)}compileModuleAsync(t){return Promise.resolve(this.compileModuleSync(t))}compileModuleAndAllComponentsSync(t){let i=this.compileModuleSync(t),r=zy(t),s=Hx(r.declarations).reduce((o,a)=>{let l=Lr(a);return l&&o.push(new _o(l)),o},[]);return new _p(i,s)}compileModuleAndAllComponentsAsync(t){return Promise.resolve(this.compileModuleAndAllComponentsSync(t))}clearCache(){}clearCacheFor(t){}getModuleId(t){}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();var VA=(()=>{class n{constructor(){this.zone=ve(kt),this.applicationRef=ve(Ha)}initialize(){this._onMicrotaskEmptySubscription||(this._onMicrotaskEmptySubscription=this.zone.onMicrotaskEmpty.subscribe({next:()=>{this.zone.run(()=>{this.applicationRef.tick()})}}))}ngOnDestroy(){this._onMicrotaskEmptySubscription?.unsubscribe()}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();function HA(n){return[{provide:kt,useFactory:n},{provide:mo,multi:!0,useFactory:()=>{let e=ve(VA,{optional:!0});return()=>e.initialize()}},{provide:mo,multi:!0,useFactory:()=>{let e=ve(jA);return()=>{e.initialize()}}},{provide:Dx,useFactory:zA}]}function zA(){let n=ve(kt),e=ve(zi);return t=>n.runOutsideAngular(()=>e.handleError(t))}function GA(n){let e=HA(()=>new kt(WA(n)));return eu([[],e])}function WA(n){return{enableLongStackTrace:!1,shouldCoalesceEventChangeDetection:n?.eventCoalescing??!1,shouldCoalesceRunChangeDetection:n?.runCoalescing??!1}}var jA=(()=>{class n{constructor(){this.subscription=new tn,this.initialized=!1,this.zone=ve(kt),this.pendingTasks=ve(gu)}initialize(){if(this.initialized)return;this.initialized=!0;let t=null;!this.zone.isStable&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(t=this.pendingTasks.add()),this.zone.runOutsideAngular(()=>{this.subscription.add(this.zone.onStable.subscribe(()=>{kt.assertNotInAngularZone(),queueMicrotask(()=>{t!==null&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(this.pendingTasks.remove(t),t=null)})}))}),this.subscription.add(this.zone.onUnstable.subscribe(()=>{kt.assertInAngularZone(),t??=this.pendingTasks.add()}))}ngOnDestroy(){this.subscription.unsubscribe()}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();function $A(){return typeof $localize<"u"&&$localize.locale||Yc}var wm=new ot("",{providedIn:"root",factory:()=>ve(wm,st.Optional|st.SkipSelf)||$A()});var U_=new ot("");var Ic=null;function qA(n=[],e){return Hr.create({name:e,providers:[{provide:tu,useValue:"platform"},{provide:U_,useValue:new Set([()=>Ic=null])},...n]})}function XA(n=[]){if(Ic)return Ic;let e=qA(n);return Ic=e,LA(),YA(e),e}function YA(n){n.get(Yp,null)?.forEach(t=>t())}var Gr=(()=>{class n{static{this.__NG_ELEMENT_ID__=ZA}}return n})();function ZA(n){return JA(Bn(),ft(),(n&16)===16)}function JA(n,e,t){if(iu(n)&&!t){let i=Br(n.index,e);return new Ds(i,i)}else if(n.type&47){let i=e[Vi];return new Ds(i,e)}return null}var bp=class{constructor(){}supports(e){return b_(e)}create(e){return new Sp(e)}},KA=(n,e)=>e,Sp=class{constructor(e){this.length=0,this._linkedRecords=null,this._unlinkedRecords=null,this._previousItHead=null,this._itHead=null,this._itTail=null,this._additionsHead=null,this._additionsTail=null,this._movesHead=null,this._movesTail=null,this._removalsHead=null,this._removalsTail=null,this._identityChangesHead=null,this._identityChangesTail=null,this._trackByFn=e||KA}forEachItem(e){let t;for(t=this._itHead;t!==null;t=t._next)e(t)}forEachOperation(e){let t=this._itHead,i=this._removalsHead,r=0,s=null;for(;t||i;){let o=!i||t&&t.currentIndex<xy(i,r,s)?t:i,a=xy(o,r,s),l=o.currentIndex;if(o===i)r--,i=i._nextRemoved;else if(t=t._next,o.previousIndex==null)r++;else{s||(s=[]);let c=a-r,u=l-r;if(c!=u){for(let f=0;f<c;f++){let h=f<s.length?s[f]:s[f]=0,g=h+f;u<=g&&g<c&&(s[f]=h+1)}let d=o.previousIndex;s[d]=u-c}}a!==l&&e(o,a,l)}}forEachPreviousItem(e){let t;for(t=this._previousItHead;t!==null;t=t._nextPrevious)e(t)}forEachAddedItem(e){let t;for(t=this._additionsHead;t!==null;t=t._nextAdded)e(t)}forEachMovedItem(e){let t;for(t=this._movesHead;t!==null;t=t._nextMoved)e(t)}forEachRemovedItem(e){let t;for(t=this._removalsHead;t!==null;t=t._nextRemoved)e(t)}forEachIdentityChange(e){let t;for(t=this._identityChangesHead;t!==null;t=t._nextIdentityChange)e(t)}diff(e){if(e==null&&(e=[]),!b_(e))throw new Fe(900,!1);return this.check(e)?this:null}onDestroy(){}check(e){this._reset();let t=this._itHead,i=!1,r,s,o;if(Array.isArray(e)){this.length=e.length;for(let a=0;a<this.length;a++)s=e[a],o=this._trackByFn(a,s),t===null||!Object.is(t.trackById,o)?(t=this._mismatch(t,s,o,a),i=!0):(i&&(t=this._verifyReinsertion(t,s,o,a)),Object.is(t.item,s)||this._addIdentityChange(t,s)),t=t._next}else r=0,WT(e,a=>{o=this._trackByFn(r,a),t===null||!Object.is(t.trackById,o)?(t=this._mismatch(t,a,o,r),i=!0):(i&&(t=this._verifyReinsertion(t,a,o,r)),Object.is(t.item,a)||this._addIdentityChange(t,a)),t=t._next,r++}),this.length=r;return this._truncate(t),this.collection=e,this.isDirty}get isDirty(){return this._additionsHead!==null||this._movesHead!==null||this._removalsHead!==null||this._identityChangesHead!==null}_reset(){if(this.isDirty){let e;for(e=this._previousItHead=this._itHead;e!==null;e=e._next)e._nextPrevious=e._next;for(e=this._additionsHead;e!==null;e=e._nextAdded)e.previousIndex=e.currentIndex;for(this._additionsHead=this._additionsTail=null,e=this._movesHead;e!==null;e=e._nextMoved)e.previousIndex=e.currentIndex;this._movesHead=this._movesTail=null,this._removalsHead=this._removalsTail=null,this._identityChangesHead=this._identityChangesTail=null}}_mismatch(e,t,i,r){let s;return e===null?s=this._itTail:(s=e._prev,this._remove(e)),e=this._unlinkedRecords===null?null:this._unlinkedRecords.get(i,null),e!==null?(Object.is(e.item,t)||this._addIdentityChange(e,t),this._reinsertAfter(e,s,r)):(e=this._linkedRecords===null?null:this._linkedRecords.get(i,r),e!==null?(Object.is(e.item,t)||this._addIdentityChange(e,t),this._moveAfter(e,s,r)):e=this._addAfter(new Mp(t,i),s,r)),e}_verifyReinsertion(e,t,i,r){let s=this._unlinkedRecords===null?null:this._unlinkedRecords.get(i,null);return s!==null?e=this._reinsertAfter(s,e._prev,r):e.currentIndex!=r&&(e.currentIndex=r,this._addToMoves(e,r)),e}_truncate(e){for(;e!==null;){let t=e._next;this._addToRemovals(this._unlink(e)),e=t}this._unlinkedRecords!==null&&this._unlinkedRecords.clear(),this._additionsTail!==null&&(this._additionsTail._nextAdded=null),this._movesTail!==null&&(this._movesTail._nextMoved=null),this._itTail!==null&&(this._itTail._next=null),this._removalsTail!==null&&(this._removalsTail._nextRemoved=null),this._identityChangesTail!==null&&(this._identityChangesTail._nextIdentityChange=null)}_reinsertAfter(e,t,i){this._unlinkedRecords!==null&&this._unlinkedRecords.remove(e);let r=e._prevRemoved,s=e._nextRemoved;return r===null?this._removalsHead=s:r._nextRemoved=s,s===null?this._removalsTail=r:s._prevRemoved=r,this._insertAfter(e,t,i),this._addToMoves(e,i),e}_moveAfter(e,t,i){return this._unlink(e),this._insertAfter(e,t,i),this._addToMoves(e,i),e}_addAfter(e,t,i){return this._insertAfter(e,t,i),this._additionsTail===null?this._additionsTail=this._additionsHead=e:this._additionsTail=this._additionsTail._nextAdded=e,e}_insertAfter(e,t,i){let r=t===null?this._itHead:t._next;return e._next=r,e._prev=t,r===null?this._itTail=e:r._prev=e,t===null?this._itHead=e:t._next=e,this._linkedRecords===null&&(this._linkedRecords=new Zc),this._linkedRecords.put(e),e.currentIndex=i,e}_remove(e){return this._addToRemovals(this._unlink(e))}_unlink(e){this._linkedRecords!==null&&this._linkedRecords.remove(e);let t=e._prev,i=e._next;return t===null?this._itHead=i:t._next=i,i===null?this._itTail=t:i._prev=t,e}_addToMoves(e,t){return e.previousIndex===t||(this._movesTail===null?this._movesTail=this._movesHead=e:this._movesTail=this._movesTail._nextMoved=e),e}_addToRemovals(e){return this._unlinkedRecords===null&&(this._unlinkedRecords=new Zc),this._unlinkedRecords.put(e),e.currentIndex=null,e._nextRemoved=null,this._removalsTail===null?(this._removalsTail=this._removalsHead=e,e._prevRemoved=null):(e._prevRemoved=this._removalsTail,this._removalsTail=this._removalsTail._nextRemoved=e),e}_addIdentityChange(e,t){return e.item=t,this._identityChangesTail===null?this._identityChangesTail=this._identityChangesHead=e:this._identityChangesTail=this._identityChangesTail._nextIdentityChange=e,e}},Mp=class{constructor(e,t){this.item=e,this.trackById=t,this.currentIndex=null,this.previousIndex=null,this._nextPrevious=null,this._prev=null,this._next=null,this._prevDup=null,this._nextDup=null,this._prevRemoved=null,this._nextRemoved=null,this._nextAdded=null,this._nextMoved=null,this._nextIdentityChange=null}},wp=class{constructor(){this._head=null,this._tail=null}add(e){this._head===null?(this._head=this._tail=e,e._nextDup=null,e._prevDup=null):(this._tail._nextDup=e,e._prevDup=this._tail,e._nextDup=null,this._tail=e)}get(e,t){let i;for(i=this._head;i!==null;i=i._nextDup)if((t===null||t<=i.currentIndex)&&Object.is(i.trackById,e))return i;return null}remove(e){let t=e._prevDup,i=e._nextDup;return t===null?this._head=i:t._nextDup=i,i===null?this._tail=t:i._prevDup=t,this._head===null}},Zc=class{constructor(){this.map=new Map}put(e){let t=e.trackById,i=this.map.get(t);i||(i=new wp,this.map.set(t,i)),i.add(e)}get(e,t){let i=e,r=this.map.get(i);return r?r.get(e,t):null}remove(e){let t=e.trackById;return this.map.get(t).remove(e)&&this.map.delete(t),e}get isEmpty(){return this.map.size===0}clear(){this.map.clear()}};function xy(n,e,t){let i=n.previousIndex;if(i===null)return i;let r=0;return t&&i<t.length&&(r=t[i]),i+e+r}function _y(){return new Em([new bp])}var Em=(()=>{class n{static{this.\u0275prov=He({token:n,providedIn:"root",factory:_y})}constructor(t){this.factories=t}static create(t,i){if(i!=null){let r=i.factories.slice();t=t.concat(r)}return new n(t)}static extend(t){return{provide:n,useFactory:i=>n.create(t,i||_y()),deps:[[n,new Tp,new Qc]]}}find(t){let i=this.factories.find(r=>r.supports(t));if(i!=null)return i;throw new Fe(901,!1)}}return n})();function B_(n){try{let{rootComponent:e,appProviders:t,platformProviders:i}=n,r=XA(i),s=[GA(),...t||[]],a=new qc({providers:s,parent:r,debugName:"",runEnvironmentInitializers:!1}).injector,l=a.get(kt);return l.run(()=>{a.resolveInjectorInitializers();let c=a.get(zi,null),u;l.runOutsideAngular(()=>{u=l.onError.subscribe({next:h=>{c.handleError(h)}})});let d=()=>a.destroy(),f=r.get(U_);return f.add(d),a.onDestroy(()=>{u.unsubscribe(),f.delete(d)}),kA(c,l,()=>{let h=a.get(k_);return h.runInitializers(),h.donePromise.then(()=>{let g=a.get(wm,Yc);EA(g||Yc);let x=a.get(Ha);return e!==void 0&&x.bootstrap(e),x})})})}catch(e){return Promise.reject(e)}}function za(n){return typeof n=="boolean"?n:n!=null&&n!=="false"}function V_(n){let e=Lr(n);if(!e)return null;let t=new _o(e);return{get selector(){return t.selector},get type(){return t.componentType},get inputs(){return t.inputs},get outputs(){return t.outputs},get ngContentSelectors(){return t.ngContentSelectors},get isStandalone(){return e.standalone},get isSignal(){return e.signals}}}var q_=null;function Ao(){return q_}function X_(n){q_??=n}var Tu=class{};var Vn=new ot(""),Rm=(()=>{class n{historyGo(t){throw new Error("")}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=He({token:n,factory:()=>ve(QA),providedIn:"platform"})}}return n})(),Y_=new ot(""),QA=(()=>{class n extends Rm{constructor(){super(),this._doc=ve(Vn),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return Ao().getBaseHref(this._doc)}onPopState(t){let i=Ao().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",t,!1),()=>i.removeEventListener("popstate",t)}onHashChange(t){let i=Ao().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",t,!1),()=>i.removeEventListener("hashchange",t)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(t){this._location.pathname=t}pushState(t,i,r){this._history.pushState(t,i,r)}replaceState(t,i,r){this._history.replaceState(t,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(t=0){this._history.go(t)}getState(){return this._history.state}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=He({token:n,factory:()=>new n,providedIn:"platform"})}}return n})();function Pm(n,e){if(n.length==0)return e;if(e.length==0)return n;let t=0;return n.endsWith("/")&&t++,e.startsWith("/")&&t++,t==2?n+e.substring(1):t==1?n+e:n+"/"+e}function H_(n){let e=n.match(/#|\?|$/),t=e&&e.index||n.length,i=t-(n[t-1]==="/"?1:0);return n.slice(0,i)+n.slice(t)}function fr(n){return n&&n[0]!=="?"?"?"+n:n}var hr=(()=>{class n{historyGo(t){throw new Error("")}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=He({token:n,factory:()=>ve(Nm),providedIn:"root"})}}return n})(),Z_=new ot(""),Nm=(()=>{class n extends hr{constructor(t,i){super(),this._platformLocation=t,this._removeListenerFns=[],this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??ve(Vn).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}prepareExternalUrl(t){return Pm(this._baseHref,t)}path(t=!1){let i=this._platformLocation.pathname+fr(this._platformLocation.search),r=this._platformLocation.hash;return r&&t?`${i}${r}`:i}pushState(t,i,r,s){let o=this.prepareExternalUrl(r+fr(s));this._platformLocation.pushState(t,i,o)}replaceState(t,i,r,s){let o=this.prepareExternalUrl(r+fr(s));this._platformLocation.replaceState(t,i,o)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}static{this.\u0275fac=function(i){return new(i||n)(Xe(Rm),Xe(Z_,8))}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})(),J_=(()=>{class n extends hr{constructor(t,i){super(),this._platformLocation=t,this._baseHref="",this._removeListenerFns=[],i!=null&&(this._baseHref=i)}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}path(t=!1){let i=this._platformLocation.hash??"#";return i.length>0?i.substring(1):i}prepareExternalUrl(t){let i=Pm(this._baseHref,t);return i.length>0?"#"+i:i}pushState(t,i,r,s){let o=this.prepareExternalUrl(r+fr(s));o.length==0&&(o=this._platformLocation.pathname),this._platformLocation.pushState(t,i,o)}replaceState(t,i,r,s){let o=this.prepareExternalUrl(r+fr(s));o.length==0&&(o=this._platformLocation.pathname),this._platformLocation.replaceState(t,i,o)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}static{this.\u0275fac=function(i){return new(i||n)(Xe(Rm),Xe(Z_,8))}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac})}}return n})(),Io=(()=>{class n{constructor(t){this._subject=new qn,this._urlChangeListeners=[],this._urlChangeSubscription=null,this._locationStrategy=t;let i=this._locationStrategy.getBaseHref();this._basePath=nI(H_(z_(i))),this._locationStrategy.onPopState(r=>{this._subject.emit({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(t=!1){return this.normalize(this._locationStrategy.path(t))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(t,i=""){return this.path()==this.normalize(t+fr(i))}normalize(t){return n.stripTrailingSlash(tI(this._basePath,z_(t)))}prepareExternalUrl(t){return t&&t[0]!=="/"&&(t="/"+t),this._locationStrategy.prepareExternalUrl(t)}go(t,i="",r=null){this._locationStrategy.pushState(r,"",t,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+fr(i)),r)}replaceState(t,i="",r=null){this._locationStrategy.replaceState(r,"",t,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+fr(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(t=0){this._locationStrategy.historyGo?.(t)}onUrlChange(t){return this._urlChangeListeners.push(t),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(t);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(t="",i){this._urlChangeListeners.forEach(r=>r(t,i))}subscribe(t,i,r){return this._subject.subscribe({next:t,error:i,complete:r})}static{this.normalizeQueryParams=fr}static{this.joinWithSlash=Pm}static{this.stripTrailingSlash=H_}static{this.\u0275fac=function(i){return new(i||n)(Xe(hr))}}static{this.\u0275prov=He({token:n,factory:()=>eI(),providedIn:"root"})}}return n})();function eI(){return new Io(Xe(hr))}function tI(n,e){if(!n||!e.startsWith(n))return e;let t=e.substring(n.length);return t===""||["/",";","?","#"].includes(t[0])?t:e}function z_(n){return n.replace(/\/index.html$/,"")}function nI(n){if(new RegExp("^(https?:)?//").test(n)){let[,t]=n.split(/\/\/[^\/]+/);return t}return n}function K_(n,e){e=encodeURIComponent(e);for(let t of n.split(";")){let i=t.indexOf("="),[r,s]=i==-1?[t,""]:[t.slice(0,i),t.slice(i+1)];if(r.trim()===e)return decodeURIComponent(s)}return null}var Cm=/\s+/,G_=[],Q_=(()=>{class n{constructor(t,i){this._ngEl=t,this._renderer=i,this.initialClasses=G_,this.stateMap=new Map}set klass(t){this.initialClasses=t!=null?t.trim().split(Cm):G_}set ngClass(t){this.rawClass=typeof t=="string"?t.trim().split(Cm):t}ngDoCheck(){for(let i of this.initialClasses)this._updateState(i,!0);let t=this.rawClass;if(Array.isArray(t)||t instanceof Set)for(let i of t)this._updateState(i,!0);else if(t!=null)for(let i of Object.keys(t))this._updateState(i,!!t[i]);this._applyStateDiff()}_updateState(t,i){let r=this.stateMap.get(t);r!==void 0?(r.enabled!==i&&(r.changed=!0,r.enabled=i),r.touched=!0):this.stateMap.set(t,{enabled:i,changed:!0,touched:!0})}_applyStateDiff(){for(let t of this.stateMap){let i=t[0],r=t[1];r.changed?(this._toggleClass(i,r.enabled),r.changed=!1):r.touched||(r.enabled&&this._toggleClass(i,!1),this.stateMap.delete(i)),r.touched=!1}}_toggleClass(t,i){t=t.trim(),t.length>0&&t.split(Cm).forEach(r=>{i?this._renderer.addClass(this._ngEl.nativeElement,r):this._renderer.removeClass(this._ngEl.nativeElement,r)})}static{this.\u0275fac=function(i){return new(i||n)(Ze(bn),Ze(hi))}}static{this.\u0275dir=Ur({type:n,selectors:[["","ngClass",""]],inputs:{klass:[ci.None,"class","klass"],ngClass:"ngClass"},standalone:!0})}}return n})();var Tm=class{constructor(e,t,i,r){this.$implicit=e,this.ngForOf=t,this.index=i,this.count=r}get first(){return this.index===0}get last(){return this.index===this.count-1}get even(){return this.index%2===0}get odd(){return!this.even}},Wr=(()=>{class n{set ngForOf(t){this._ngForOf=t,this._ngForOfDirty=!0}set ngForTrackBy(t){this._trackByFn=t}get ngForTrackBy(){return this._trackByFn}constructor(t,i,r){this._viewContainer=t,this._template=i,this._differs=r,this._ngForOf=null,this._ngForOfDirty=!0,this._differ=null}set ngForTemplate(t){t&&(this._template=t)}ngDoCheck(){if(this._ngForOfDirty){this._ngForOfDirty=!1;let t=this._ngForOf;if(!this._differ&&t)if(0)try{}catch{}else this._differ=this._differs.find(t).create(this.ngForTrackBy)}if(this._differ){let t=this._differ.diff(this._ngForOf);t&&this._applyChanges(t)}}_applyChanges(t){let i=this._viewContainer;t.forEachOperation((r,s,o)=>{if(r.previousIndex==null)i.createEmbeddedView(this._template,new Tm(r.item,this._ngForOf,-1,-1),o===null?void 0:o);else if(o==null)i.remove(s===null?void 0:s);else if(s!==null){let a=i.get(s);i.move(a,o),W_(a,r)}});for(let r=0,s=i.length;r<s;r++){let a=i.get(r).context;a.index=r,a.count=s,a.ngForOf=this._ngForOf}t.forEachIdentityChange(r=>{let s=i.get(r.currentIndex);W_(s,r)})}static ngTemplateContextGuard(t,i){return!0}static{this.\u0275fac=function(i){return new(i||n)(Ze(zr),Ze(Rs),Ze(Em))}}static{this.\u0275dir=Ur({type:n,selectors:[["","ngFor","","ngForOf",""]],inputs:{ngForOf:"ngForOf",ngForTrackBy:"ngForTrackBy",ngForTemplate:"ngForTemplate"},standalone:!0})}}return n})();function W_(n,e){n.context.$implicit=e.item}var jr=(()=>{class n{constructor(t,i){this._viewContainer=t,this._context=new Am,this._thenTemplateRef=null,this._elseTemplateRef=null,this._thenViewRef=null,this._elseViewRef=null,this._thenTemplateRef=i}set ngIf(t){this._context.$implicit=this._context.ngIf=t,this._updateView()}set ngIfThen(t){j_("ngIfThen",t),this._thenTemplateRef=t,this._thenViewRef=null,this._updateView()}set ngIfElse(t){j_("ngIfElse",t),this._elseTemplateRef=t,this._elseViewRef=null,this._updateView()}_updateView(){this._context.$implicit?this._thenViewRef||(this._viewContainer.clear(),this._elseViewRef=null,this._thenTemplateRef&&(this._thenViewRef=this._viewContainer.createEmbeddedView(this._thenTemplateRef,this._context))):this._elseViewRef||(this._viewContainer.clear(),this._thenViewRef=null,this._elseTemplateRef&&(this._elseViewRef=this._viewContainer.createEmbeddedView(this._elseTemplateRef,this._context)))}static ngTemplateContextGuard(t,i){return!0}static{this.\u0275fac=function(i){return new(i||n)(Ze(zr),Ze(Rs))}}static{this.\u0275dir=Ur({type:n,selectors:[["","ngIf",""]],inputs:{ngIf:"ngIf",ngIfThen:"ngIfThen",ngIfElse:"ngIfElse"},standalone:!0})}}return n})(),Am=class{constructor(){this.$implicit=null,this.ngIf=null}};function j_(n,e){if(!!!(!e||e.createEmbeddedView))throw new Error(`${n} must be a TemplateRef, but received '${In(e)}'.`)}function iI(n,e){return new Fe(2100,!1)}var Iu=(()=>{class n{transform(t){if(t==null)return null;if(typeof t!="string")throw iI(n,t);return t.toUpperCase()}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275pipe=Uy({name:"uppercase",type:n,pure:!0,standalone:!0})}}return n})();var Zn=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275mod=Oa({type:n})}static{this.\u0275inj=Pa({})}}return n})(),Om="browser",rI="server";function Ut(n){return n===Om}function Lm(n){return n===rI}var eb=(()=>{class n{static{this.\u0275prov=He({token:n,providedIn:"root",factory:()=>Ut(ve(an))?new Im(ve(Vn),window):new Dm})}}return n})(),Im=class{constructor(e,t){this.document=e,this.window=t,this.offset=()=>[0,0]}setOffset(e){Array.isArray(e)?this.offset=()=>e:this.offset=e}getScrollPosition(){return[this.window.scrollX,this.window.scrollY]}scrollToPosition(e){this.window.scrollTo(e[0],e[1])}scrollToAnchor(e){let t=sI(this.document,e);t&&(this.scrollToElement(t),t.focus())}setHistoryScrollRestoration(e){this.window.history.scrollRestoration=e}scrollToElement(e){let t=e.getBoundingClientRect(),i=t.left+this.window.pageXOffset,r=t.top+this.window.pageYOffset,s=this.offset();this.window.scrollTo(i-s[0],r-s[1])}};function sI(n,e){let t=n.getElementById(e)||n.getElementsByName(e)[0];if(t)return t;if(typeof n.createTreeWalker=="function"&&n.body&&typeof n.body.attachShadow=="function"){let i=n.createTreeWalker(n.body,NodeFilter.SHOW_ELEMENT),r=i.currentNode;for(;r;){let s=r.shadowRoot;if(s){let o=s.getElementById(e)||s.querySelector(`[name="${e}"]`);if(o)return o}r=i.nextNode()}}return null}var Dm=class{setOffset(e){}getScrollPosition(){return[0,0]}scrollToPosition(e){}scrollToAnchor(e){}setHistoryScrollRestoration(e){}},Au=class{};var Um=class extends Tu{constructor(){super(...arguments),this.supportsDOMEvents=!0}},Bm=class n extends Um{static makeCurrent(){X_(new n)}onAndCancel(e,t,i){return e.addEventListener(t,i),()=>{e.removeEventListener(t,i)}}dispatchEvent(e,t){e.dispatchEvent(t)}remove(e){e.parentNode&&e.parentNode.removeChild(e)}createElement(e,t){return t=t||this.getDefaultDocument(),t.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,t){return t==="window"?window:t==="document"?e:t==="body"?e.body:null}getBaseHref(e){let t=oI();return t==null?null:aI(t)}resetBaseElement(){Ga=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return K_(document.cookie,e)}},Ga=null;function oI(){return Ga=Ga||document.querySelector("base"),Ga?Ga.getAttribute("href"):null}function aI(n){return new URL(n,document.baseURI).pathname}var lI=(()=>{class n{build(){return new XMLHttpRequest}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac})}}return n})(),Vm=new ot(""),rb=(()=>{class n{constructor(t,i){this._zone=i,this._eventNameToPlugin=new Map,t.forEach(r=>{r.manager=this}),this._plugins=t.slice().reverse()}addEventListener(t,i,r){return this._findPluginFor(i).addEventListener(t,i,r)}getZone(){return this._zone}_findPluginFor(t){let i=this._eventNameToPlugin.get(t);if(i)return i;if(i=this._plugins.find(s=>s.supports(t)),!i)throw new Fe(5101,!1);return this._eventNameToPlugin.set(t,i),i}static{this.\u0275fac=function(i){return new(i||n)(Xe(Vm),Xe(kt))}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac})}}return n})(),Du=class{constructor(e){this._doc=e}},Fm="ng-app-id",sb=(()=>{class n{constructor(t,i,r,s={}){this.doc=t,this.appId=i,this.nonce=r,this.platformId=s,this.styleRef=new Map,this.hostNodes=new Set,this.styleNodesInDOM=this.collectServerRenderedStyles(),this.platformIsServer=Lm(s),this.resetHostNodes()}addStyles(t){for(let i of t)this.changeUsageCount(i,1)===1&&this.onStyleAdded(i)}removeStyles(t){for(let i of t)this.changeUsageCount(i,-1)<=0&&this.onStyleRemoved(i)}ngOnDestroy(){let t=this.styleNodesInDOM;t&&(t.forEach(i=>i.remove()),t.clear());for(let i of this.getAllStyles())this.onStyleRemoved(i);this.resetHostNodes()}addHost(t){this.hostNodes.add(t);for(let i of this.getAllStyles())this.addStyleToHost(t,i)}removeHost(t){this.hostNodes.delete(t)}getAllStyles(){return this.styleRef.keys()}onStyleAdded(t){for(let i of this.hostNodes)this.addStyleToHost(i,t)}onStyleRemoved(t){let i=this.styleRef;i.get(t)?.elements?.forEach(r=>r.remove()),i.delete(t)}collectServerRenderedStyles(){let t=this.doc.head?.querySelectorAll(`style[${Fm}="${this.appId}"]`);if(t?.length){let i=new Map;return t.forEach(r=>{r.textContent!=null&&i.set(r.textContent,r)}),i}return null}changeUsageCount(t,i){let r=this.styleRef;if(r.has(t)){let s=r.get(t);return s.usage+=i,s.usage}return r.set(t,{usage:i,elements:[]}),i}getStyleElement(t,i){let r=this.styleNodesInDOM,s=r?.get(i);if(s?.parentNode===t)return r.delete(i),s.removeAttribute(Fm),s;{let o=this.doc.createElement("style");return this.nonce&&o.setAttribute("nonce",this.nonce),o.textContent=i,this.platformIsServer&&o.setAttribute(Fm,this.appId),t.appendChild(o),o}}addStyleToHost(t,i){let r=this.getStyleElement(t,i),s=this.styleRef,o=s.get(i)?.elements;o?o.push(r):s.set(i,{elements:[r],usage:1})}resetHostNodes(){let t=this.hostNodes;t.clear(),t.add(this.doc.head)}static{this.\u0275fac=function(i){return new(i||n)(Xe(Vn),Xe(Xp),Xe(Zp,8),Xe(an))}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac})}}return n})(),km={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/MathML/"},zm=/%COMP%/g,ob="%COMP%",cI=`_nghost-${ob}`,uI=`_ngcontent-${ob}`,dI=!0,fI=new ot("",{providedIn:"root",factory:()=>dI});function hI(n){return uI.replace(zm,n)}function pI(n){return cI.replace(zm,n)}function ab(n,e){return e.map(t=>t.replace(zm,n))}var tb=(()=>{class n{constructor(t,i,r,s,o,a,l,c=null){this.eventManager=t,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=s,this.doc=o,this.platformId=a,this.ngZone=l,this.nonce=c,this.rendererByCompId=new Map,this.platformIsServer=Lm(a),this.defaultRenderer=new Wa(t,o,l,this.platformIsServer)}createRenderer(t,i){if(!t||!i)return this.defaultRenderer;this.platformIsServer&&i.encapsulation===Bi.ShadowDom&&(i=zt(Ae({},i),{encapsulation:Bi.Emulated}));let r=this.getOrCreateRenderer(t,i);return r instanceof Ru?r.applyToHost(t):r instanceof ja&&r.applyStyles(),r}getOrCreateRenderer(t,i){let r=this.rendererByCompId,s=r.get(i.id);if(!s){let o=this.doc,a=this.ngZone,l=this.eventManager,c=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,d=this.platformIsServer;switch(i.encapsulation){case Bi.Emulated:s=new Ru(l,c,i,this.appId,u,o,a,d);break;case Bi.ShadowDom:return new Hm(l,c,t,i,o,a,this.nonce,d);default:s=new ja(l,c,i,u,o,a,d);break}r.set(i.id,s)}return s}ngOnDestroy(){this.rendererByCompId.clear()}static{this.\u0275fac=function(i){return new(i||n)(Xe(rb),Xe(sb),Xe(Xp),Xe(fI),Xe(Vn),Xe(an),Xe(kt),Xe(Zp))}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac})}}return n})(),Wa=class{constructor(e,t,i,r){this.eventManager=e,this.doc=t,this.ngZone=i,this.platformIsServer=r,this.data=Object.create(null),this.throwOnSyntheticProps=!0,this.destroyNode=null}destroy(){}createElement(e,t){return t?this.doc.createElementNS(km[t]||t,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,t){(nb(e)?e.content:e).appendChild(t)}insertBefore(e,t,i){e&&(nb(e)?e.content:e).insertBefore(t,i)}removeChild(e,t){e&&e.removeChild(t)}selectRootElement(e,t){let i=typeof e=="string"?this.doc.querySelector(e):e;if(!i)throw new Fe(-5104,!1);return t||(i.textContent=""),i}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,t,i,r){if(r){t=r+":"+t;let s=km[r];s?e.setAttributeNS(s,t,i):e.setAttribute(t,i)}else e.setAttribute(t,i)}removeAttribute(e,t,i){if(i){let r=km[i];r?e.removeAttributeNS(r,t):e.removeAttribute(`${i}:${t}`)}else e.removeAttribute(t)}addClass(e,t){e.classList.add(t)}removeClass(e,t){e.classList.remove(t)}setStyle(e,t,i,r){r&(ar.DashCase|ar.Important)?e.style.setProperty(t,i,r&ar.Important?"important":""):e.style[t]=i}removeStyle(e,t,i){i&ar.DashCase?e.style.removeProperty(t):e.style[t]=""}setProperty(e,t,i){e!=null&&(e[t]=i)}setValue(e,t){e.nodeValue=t}listen(e,t,i){if(typeof e=="string"&&(e=Ao().getGlobalEventTarget(this.doc,e),!e))throw new Error(`Unsupported event target ${e} for event ${t}`);return this.eventManager.addEventListener(e,t,this.decoratePreventDefault(i))}decoratePreventDefault(e){return t=>{if(t==="__ngUnwrap__")return e;(this.platformIsServer?this.ngZone.runGuarded(()=>e(t)):e(t))===!1&&t.preventDefault()}}};function nb(n){return n.tagName==="TEMPLATE"&&n.content!==void 0}var Hm=class extends Wa{constructor(e,t,i,r,s,o,a,l){super(e,s,o,l),this.sharedStylesHost=t,this.hostEl=i,this.shadowRoot=i.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let c=ab(r.id,r.styles);for(let u of c){let d=document.createElement("style");a&&d.setAttribute("nonce",a),d.textContent=u,this.shadowRoot.appendChild(d)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,t){return super.appendChild(this.nodeOrShadowRoot(e),t)}insertBefore(e,t,i){return super.insertBefore(this.nodeOrShadowRoot(e),t,i)}removeChild(e,t){return super.removeChild(this.nodeOrShadowRoot(e),t)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},ja=class extends Wa{constructor(e,t,i,r,s,o,a,l){super(e,s,o,a),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=r,this.styles=l?ab(l,i.styles):i.styles}applyStyles(){this.sharedStylesHost.addStyles(this.styles)}destroy(){this.removeStylesOnCompDestroy&&this.sharedStylesHost.removeStyles(this.styles)}},Ru=class extends ja{constructor(e,t,i,r,s,o,a,l){let c=r+"-"+i.id;super(e,t,i,s,o,a,l,c),this.contentAttr=hI(c),this.hostAttr=pI(c)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,t){let i=super.createElement(e,t);return super.setAttribute(i,this.contentAttr,""),i}},mI=(()=>{class n extends Du{constructor(t){super(t)}supports(t){return!0}addEventListener(t,i,r){return t.addEventListener(i,r,!1),()=>this.removeEventListener(t,i,r)}removeEventListener(t,i,r){return t.removeEventListener(i,r)}static{this.\u0275fac=function(i){return new(i||n)(Xe(Vn))}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac})}}return n})(),ib=["alt","control","meta","shift"],gI={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},vI={alt:n=>n.altKey,control:n=>n.ctrlKey,meta:n=>n.metaKey,shift:n=>n.shiftKey},yI=(()=>{class n extends Du{constructor(t){super(t)}supports(t){return n.parseEventName(t)!=null}addEventListener(t,i,r){let s=n.parseEventName(i),o=n.eventCallback(s.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>Ao().onAndCancel(t,s.domEventName,o))}static parseEventName(t){let i=t.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let s=n._normalizeKey(i.pop()),o="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),o="code."),ib.forEach(c=>{let u=i.indexOf(c);u>-1&&(i.splice(u,1),o+=c+".")}),o+=s,i.length!=0||s.length===0)return null;let l={};return l.domEventName=r,l.fullKey=o,l}static matchEventFullKeyCode(t,i){let r=gI[t.key]||t.key,s="";return i.indexOf("code.")>-1&&(r=t.code,s="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),ib.forEach(o=>{if(o!==r){let a=vI[o];a(t)&&(s+=o+".")}}),s+=r,s===i)}static eventCallback(t,i,r){return s=>{n.matchEventFullKeyCode(s,t)&&r.runGuarded(()=>i(s))}}static _normalizeKey(t){return t==="esc"?"escape":t}static{this.\u0275fac=function(i){return new(i||n)(Xe(Vn))}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac})}}return n})();function lb(n,e){return B_(Ae({rootComponent:n},xI(e)))}function xI(n){return{appProviders:[...wI,...n?.providers??[]],platformProviders:MI}}function _I(){Bm.makeCurrent()}function bI(){return new zi}function SI(){return Fx(document),document}var MI=[{provide:an,useValue:Om},{provide:Yp,useValue:_I,multi:!0},{provide:Vn,useFactory:SI,deps:[]}];var wI=[{provide:tu,useValue:"root"},{provide:zi,useFactory:bI,deps:[]},{provide:Vm,useClass:mI,multi:!0,deps:[Vn,kt,an]},{provide:Vm,useClass:yI,multi:!0,deps:[Vn]},tb,sb,rb,{provide:Aa,useExisting:tb},{provide:Au,useClass:lI,deps:[]},[]];var cb=(()=>{class n{constructor(t){this._doc=t}getTitle(){return this._doc.title}setTitle(t){this._doc.title=t||""}static{this.\u0275fac=function(i){return new(i||n)(Xe(Vn))}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();var Qe="primary",al=Symbol("RouteTitle"),qm=class{constructor(e){this.params=e||{}}has(e){return Object.prototype.hasOwnProperty.call(this.params,e)}get(e){if(this.has(e)){let t=this.params[e];return Array.isArray(t)?t[0]:t}return null}getAll(e){if(this.has(e)){let t=this.params[e];return Array.isArray(t)?t:[t]}return[]}get keys(){return Object.keys(this.params)}};function Lo(n){return new qm(n)}function CI(n,e,t){let i=t.path.split("/");if(i.length>n.length||t.pathMatch==="full"&&(e.hasChildren()||i.length<n.length))return null;let r={};for(let s=0;s<i.length;s++){let o=i[s],a=n[s];if(o.startsWith(":"))r[o.substring(1)]=a;else if(o!==a.path)return null}return{consumed:n.slice(0,i.length),posParams:r}}function TI(n,e){if(n.length!==e.length)return!1;for(let t=0;t<n.length;++t)if(!ji(n[t],e[t]))return!1;return!0}function ji(n,e){let t=n?Xm(n):void 0,i=e?Xm(e):void 0;if(!t||!i||t.length!=i.length)return!1;let r;for(let s=0;s<t.length;s++)if(r=t[s],!yb(n[r],e[r]))return!1;return!0}function Xm(n){return[...Object.keys(n),...Object.getOwnPropertySymbols(n)]}function yb(n,e){if(Array.isArray(n)&&Array.isArray(e)){if(n.length!==e.length)return!1;let t=[...n].sort(),i=[...e].sort();return t.every((r,s)=>i[s]===r)}else return n===e}function xb(n){return n.length>0?n[n.length-1]:null}function Zr(n){return ph(n)?n:Va(n)?Gt(Promise.resolve(n)):Be(n)}var AI={exact:bb,subset:Sb},_b={exact:II,subset:DI,ignored:()=>!0};function ub(n,e,t){return AI[t.paths](n.root,e.root,t.matrixParams)&&_b[t.queryParams](n.queryParams,e.queryParams)&&!(t.fragment==="exact"&&n.fragment!==e.fragment)}function II(n,e){return ji(n,e)}function bb(n,e,t){if(!Ls(n.segments,e.segments)||!Ou(n.segments,e.segments,t)||n.numberOfChildren!==e.numberOfChildren)return!1;for(let i in e.children)if(!n.children[i]||!bb(n.children[i],e.children[i],t))return!1;return!0}function DI(n,e){return Object.keys(e).length<=Object.keys(n).length&&Object.keys(e).every(t=>yb(n[t],e[t]))}function Sb(n,e,t){return Mb(n,e,e.segments,t)}function Mb(n,e,t,i){if(n.segments.length>t.length){let r=n.segments.slice(0,t.length);return!(!Ls(r,t)||e.hasChildren()||!Ou(r,t,i))}else if(n.segments.length===t.length){if(!Ls(n.segments,t)||!Ou(n.segments,t,i))return!1;for(let r in e.children)if(!n.children[r]||!Sb(n.children[r],e.children[r],i))return!1;return!0}else{let r=t.slice(0,n.segments.length),s=t.slice(n.segments.length);return!Ls(n.segments,r)||!Ou(n.segments,r,i)||!n.children[Qe]?!1:Mb(n.children[Qe],e,s,i)}}function Ou(n,e,t){return e.every((i,r)=>_b[t](n[r].parameters,i.parameters))}var $r=class{constructor(e=new Mt([],{}),t={},i=null){this.root=e,this.queryParams=t,this.fragment=i}get queryParamMap(){return this._queryParamMap??=Lo(this.queryParams),this._queryParamMap}toString(){return NI.serialize(this)}},Mt=class{constructor(e,t){this.segments=e,this.children=t,this.parent=null,Object.values(t).forEach(i=>i.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return Lu(this)}},Os=class{constructor(e,t){this.path=e,this.parameters=t}get parameterMap(){return this._parameterMap??=Lo(this.parameters),this._parameterMap}toString(){return Eb(this)}};function RI(n,e){return Ls(n,e)&&n.every((t,i)=>ji(t.parameters,e[i].parameters))}function Ls(n,e){return n.length!==e.length?!1:n.every((t,i)=>t.path===e[i].path)}function PI(n,e){let t=[];return Object.entries(n.children).forEach(([i,r])=>{i===Qe&&(t=t.concat(e(r,i)))}),Object.entries(n.children).forEach(([i,r])=>{i!==Qe&&(t=t.concat(e(r,i)))}),t}var ll=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=He({token:n,factory:()=>new Ka,providedIn:"root"})}}return n})(),Ka=class{parse(e){let t=new Zm(e);return new $r(t.parseRootSegment(),t.parseQueryParams(),t.parseFragment())}serialize(e){let t=`/${$a(e.root,!0)}`,i=FI(e.queryParams),r=typeof e.fragment=="string"?`#${OI(e.fragment)}`:"";return`${t}${i}${r}`}},NI=new Ka;function Lu(n){return n.segments.map(e=>Eb(e)).join("/")}function $a(n,e){if(!n.hasChildren())return Lu(n);if(e){let t=n.children[Qe]?$a(n.children[Qe],!1):"",i=[];return Object.entries(n.children).forEach(([r,s])=>{r!==Qe&&i.push(`${r}:${$a(s,!1)}`)}),i.length>0?`${t}(${i.join("//")})`:t}else{let t=PI(n,(i,r)=>r===Qe?[$a(n.children[Qe],!1)]:[`${r}:${$a(i,!1)}`]);return Object.keys(n.children).length===1&&n.children[Qe]!=null?`${Lu(n)}/${t[0]}`:`${Lu(n)}/(${t.join("//")})`}}function wb(n){return encodeURIComponent(n).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function Pu(n){return wb(n).replace(/%3B/gi,";")}function OI(n){return encodeURI(n)}function Ym(n){return wb(n).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function Fu(n){return decodeURIComponent(n)}function db(n){return Fu(n.replace(/\+/g,"%20"))}function Eb(n){return`${Ym(n.path)}${LI(n.parameters)}`}function LI(n){return Object.entries(n).map(([e,t])=>`;${Ym(e)}=${Ym(t)}`).join("")}function FI(n){let e=Object.entries(n).map(([t,i])=>Array.isArray(i)?i.map(r=>`${Pu(t)}=${Pu(r)}`).join("&"):`${Pu(t)}=${Pu(i)}`).filter(t=>t);return e.length?`?${e.join("&")}`:""}var kI=/^[^\/()?;#]+/;function Gm(n){let e=n.match(kI);return e?e[0]:""}var UI=/^[^\/()?;=#]+/;function BI(n){let e=n.match(UI);return e?e[0]:""}var VI=/^[^=?&#]+/;function HI(n){let e=n.match(VI);return e?e[0]:""}var zI=/^[^&#]+/;function GI(n){let e=n.match(zI);return e?e[0]:""}var Zm=class{constructor(e){this.url=e,this.remaining=e}parseRootSegment(){return this.consumeOptional("/"),this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new Mt([],{}):new Mt([],this.parseChildren())}parseQueryParams(){let e={};if(this.consumeOptional("?"))do this.parseQueryParam(e);while(this.consumeOptional("&"));return e}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(){if(this.remaining==="")return{};this.consumeOptional("/");let e=[];for(this.peekStartsWith("(")||e.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),e.push(this.parseSegment());let t={};this.peekStartsWith("/(")&&(this.capture("/"),t=this.parseParens(!0));let i={};return this.peekStartsWith("(")&&(i=this.parseParens(!1)),(e.length>0||Object.keys(t).length>0)&&(i[Qe]=new Mt(e,t)),i}parseSegment(){let e=Gm(this.remaining);if(e===""&&this.peekStartsWith(";"))throw new Fe(4009,!1);return this.capture(e),new Os(Fu(e),this.parseMatrixParams())}parseMatrixParams(){let e={};for(;this.consumeOptional(";");)this.parseParam(e);return e}parseParam(e){let t=BI(this.remaining);if(!t)return;this.capture(t);let i="";if(this.consumeOptional("=")){let r=Gm(this.remaining);r&&(i=r,this.capture(i))}e[Fu(t)]=Fu(i)}parseQueryParam(e){let t=HI(this.remaining);if(!t)return;this.capture(t);let i="";if(this.consumeOptional("=")){let o=GI(this.remaining);o&&(i=o,this.capture(i))}let r=db(t),s=db(i);if(e.hasOwnProperty(r)){let o=e[r];Array.isArray(o)||(o=[o],e[r]=o),o.push(s)}else e[r]=s}parseParens(e){let t={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let i=Gm(this.remaining),r=this.remaining[i.length];if(r!=="/"&&r!==")"&&r!==";")throw new Fe(4010,!1);let s;i.indexOf(":")>-1?(s=i.slice(0,i.indexOf(":")),this.capture(s),this.capture(":")):e&&(s=Qe);let o=this.parseChildren();t[s]=Object.keys(o).length===1?o[Qe]:new Mt([],o),this.consumeOptional("//")}return t}peekStartsWith(e){return this.remaining.startsWith(e)}consumeOptional(e){return this.peekStartsWith(e)?(this.remaining=this.remaining.substring(e.length),!0):!1}capture(e){if(!this.consumeOptional(e))throw new Fe(4011,!1)}};function Cb(n){return n.segments.length>0?new Mt([],{[Qe]:n}):n}function Tb(n){let e={};for(let[i,r]of Object.entries(n.children)){let s=Tb(r);if(i===Qe&&s.segments.length===0&&s.hasChildren())for(let[o,a]of Object.entries(s.children))e[o]=a;else(s.segments.length>0||s.hasChildren())&&(e[i]=s)}let t=new Mt(n.segments,e);return WI(t)}function WI(n){if(n.numberOfChildren===1&&n.children[Qe]){let e=n.children[Qe];return new Mt(n.segments.concat(e.segments),e.children)}return n}function Fo(n){return n instanceof $r}function jI(n,e,t=null,i=null){let r=Ab(n);return Ib(r,e,t,i)}function Ab(n){let e;function t(s){let o={};for(let l of s.children){let c=t(l);o[l.outlet]=c}let a=new Mt(s.url,o);return s===n&&(e=a),a}let i=t(n.root),r=Cb(i);return e??r}function Ib(n,e,t,i){let r=n;for(;r.parent;)r=r.parent;if(e.length===0)return Wm(r,r,r,t,i);let s=$I(e);if(s.toRoot())return Wm(r,r,new Mt([],{}),t,i);let o=qI(s,r,n),a=o.processChildren?Ya(o.segmentGroup,o.index,s.commands):Rb(o.segmentGroup,o.index,s.commands);return Wm(r,o.segmentGroup,a,t,i)}function ku(n){return typeof n=="object"&&n!=null&&!n.outlets&&!n.segmentPath}function Qa(n){return typeof n=="object"&&n!=null&&n.outlets}function Wm(n,e,t,i,r){let s={};i&&Object.entries(i).forEach(([l,c])=>{s[l]=Array.isArray(c)?c.map(u=>`${u}`):`${c}`});let o;n===e?o=t:o=Db(n,e,t);let a=Cb(Tb(o));return new $r(a,s,r)}function Db(n,e,t){let i={};return Object.entries(n.children).forEach(([r,s])=>{s===e?i[r]=t:i[r]=Db(s,e,t)}),new Mt(n.segments,i)}var Uu=class{constructor(e,t,i){if(this.isAbsolute=e,this.numberOfDoubleDots=t,this.commands=i,e&&i.length>0&&ku(i[0]))throw new Fe(4003,!1);let r=i.find(Qa);if(r&&r!==xb(i))throw new Fe(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function $I(n){if(typeof n[0]=="string"&&n.length===1&&n[0]==="/")return new Uu(!0,0,n);let e=0,t=!1,i=n.reduce((r,s,o)=>{if(typeof s=="object"&&s!=null){if(s.outlets){let a={};return Object.entries(s.outlets).forEach(([l,c])=>{a[l]=typeof c=="string"?c.split("/"):c}),[...r,{outlets:a}]}if(s.segmentPath)return[...r,s.segmentPath]}return typeof s!="string"?[...r,s]:o===0?(s.split("/").forEach((a,l)=>{l==0&&a==="."||(l==0&&a===""?t=!0:a===".."?e++:a!=""&&r.push(a))}),r):[...r,s]},[]);return new Uu(t,e,i)}var No=class{constructor(e,t,i){this.segmentGroup=e,this.processChildren=t,this.index=i}};function qI(n,e,t){if(n.isAbsolute)return new No(e,!0,0);if(!t)return new No(e,!1,NaN);if(t.parent===null)return new No(t,!0,0);let i=ku(n.commands[0])?0:1,r=t.segments.length-1+i;return XI(t,r,n.numberOfDoubleDots)}function XI(n,e,t){let i=n,r=e,s=t;for(;s>r;){if(s-=r,i=i.parent,!i)throw new Fe(4005,!1);r=i.segments.length}return new No(i,!1,r-s)}function YI(n){return Qa(n[0])?n[0].outlets:{[Qe]:n}}function Rb(n,e,t){if(n??=new Mt([],{}),n.segments.length===0&&n.hasChildren())return Ya(n,e,t);let i=ZI(n,e,t),r=t.slice(i.commandIndex);if(i.match&&i.pathIndex<n.segments.length){let s=new Mt(n.segments.slice(0,i.pathIndex),{});return s.children[Qe]=new Mt(n.segments.slice(i.pathIndex),n.children),Ya(s,0,r)}else return i.match&&r.length===0?new Mt(n.segments,{}):i.match&&!n.hasChildren()?Jm(n,e,t):i.match?Ya(n,0,r):Jm(n,e,t)}function Ya(n,e,t){if(t.length===0)return new Mt(n.segments,{});{let i=YI(t),r={};if(Object.keys(i).some(s=>s!==Qe)&&n.children[Qe]&&n.numberOfChildren===1&&n.children[Qe].segments.length===0){let s=Ya(n.children[Qe],e,t);return new Mt(n.segments,s.children)}return Object.entries(i).forEach(([s,o])=>{typeof o=="string"&&(o=[o]),o!==null&&(r[s]=Rb(n.children[s],e,o))}),Object.entries(n.children).forEach(([s,o])=>{i[s]===void 0&&(r[s]=o)}),new Mt(n.segments,r)}}function ZI(n,e,t){let i=0,r=e,s={match:!1,pathIndex:0,commandIndex:0};for(;r<n.segments.length;){if(i>=t.length)return s;let o=n.segments[r],a=t[i];if(Qa(a))break;let l=`${a}`,c=i<t.length-1?t[i+1]:null;if(r>0&&l===void 0)break;if(l&&c&&typeof c=="object"&&c.outlets===void 0){if(!hb(l,c,o))return s;i+=2}else{if(!hb(l,{},o))return s;i++}r++}return{match:!0,pathIndex:r,commandIndex:i}}function Jm(n,e,t){let i=n.segments.slice(0,e),r=0;for(;r<t.length;){let s=t[r];if(Qa(s)){let l=JI(s.outlets);return new Mt(i,l)}if(r===0&&ku(t[0])){let l=n.segments[e];i.push(new Os(l.path,fb(t[0]))),r++;continue}let o=Qa(s)?s.outlets[Qe]:`${s}`,a=r<t.length-1?t[r+1]:null;o&&a&&ku(a)?(i.push(new Os(o,fb(a))),r+=2):(i.push(new Os(o,{})),r++)}return new Mt(i,{})}function JI(n){let e={};return Object.entries(n).forEach(([t,i])=>{typeof i=="string"&&(i=[i]),i!==null&&(e[t]=Jm(new Mt([],{}),0,i))}),e}function fb(n){let e={};return Object.entries(n).forEach(([t,i])=>e[t]=`${i}`),e}function hb(n,e,t){return n==t.path&&ji(e,t.parameters)}var Za="imperative",ln=function(n){return n[n.NavigationStart=0]="NavigationStart",n[n.NavigationEnd=1]="NavigationEnd",n[n.NavigationCancel=2]="NavigationCancel",n[n.NavigationError=3]="NavigationError",n[n.RoutesRecognized=4]="RoutesRecognized",n[n.ResolveStart=5]="ResolveStart",n[n.ResolveEnd=6]="ResolveEnd",n[n.GuardsCheckStart=7]="GuardsCheckStart",n[n.GuardsCheckEnd=8]="GuardsCheckEnd",n[n.RouteConfigLoadStart=9]="RouteConfigLoadStart",n[n.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",n[n.ChildActivationStart=11]="ChildActivationStart",n[n.ChildActivationEnd=12]="ChildActivationEnd",n[n.ActivationStart=13]="ActivationStart",n[n.ActivationEnd=14]="ActivationEnd",n[n.Scroll=15]="Scroll",n[n.NavigationSkipped=16]="NavigationSkipped",n}(ln||{}),pi=class{constructor(e,t){this.id=e,this.url=t}},ko=class extends pi{constructor(e,t,i="imperative",r=null){super(e,t),this.type=ln.NavigationStart,this.navigationTrigger=i,this.restoredState=r}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},Ci=class extends pi{constructor(e,t,i){super(e,t),this.urlAfterRedirects=i,this.type=ln.NavigationEnd}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},Kn=function(n){return n[n.Redirect=0]="Redirect",n[n.SupersededByNewNavigation=1]="SupersededByNewNavigation",n[n.NoDataFromResolver=2]="NoDataFromResolver",n[n.GuardRejected=3]="GuardRejected",n}(Kn||{}),Bu=function(n){return n[n.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",n[n.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",n}(Bu||{}),qr=class extends pi{constructor(e,t,i,r){super(e,t),this.reason=i,this.code=r,this.type=ln.NavigationCancel}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}},Xr=class extends pi{constructor(e,t,i,r){super(e,t),this.reason=i,this.code=r,this.type=ln.NavigationSkipped}},el=class extends pi{constructor(e,t,i,r){super(e,t),this.error=i,this.target=r,this.type=ln.NavigationError}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},Vu=class extends pi{constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r,this.type=ln.RoutesRecognized}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Km=class extends pi{constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r,this.type=ln.GuardsCheckStart}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Qm=class extends pi{constructor(e,t,i,r,s){super(e,t),this.urlAfterRedirects=i,this.state=r,this.shouldActivate=s,this.type=ln.GuardsCheckEnd}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},eg=class extends pi{constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r,this.type=ln.ResolveStart}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},tg=class extends pi{constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r,this.type=ln.ResolveEnd}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},ng=class{constructor(e){this.route=e,this.type=ln.RouteConfigLoadStart}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},ig=class{constructor(e){this.route=e,this.type=ln.RouteConfigLoadEnd}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},rg=class{constructor(e){this.snapshot=e,this.type=ln.ChildActivationStart}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},sg=class{constructor(e){this.snapshot=e,this.type=ln.ChildActivationEnd}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},og=class{constructor(e){this.snapshot=e,this.type=ln.ActivationStart}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},ag=class{constructor(e){this.snapshot=e,this.type=ln.ActivationEnd}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Hu=class{constructor(e,t,i){this.routerEvent=e,this.position=t,this.anchor=i,this.type=ln.Scroll}toString(){let e=this.position?`${this.position[0]}, ${this.position[1]}`:null;return`Scroll(anchor: '${this.anchor}', position: '${e}')`}},tl=class{},nl=class{constructor(e){this.url=e}};var lg=class{constructor(){this.outlet=null,this.route=null,this.injector=null,this.children=new cl,this.attachRef=null}},cl=(()=>{class n{constructor(){this.contexts=new Map}onChildOutletCreated(t,i){let r=this.getOrCreateContext(t);r.outlet=i,this.contexts.set(t,r)}onChildOutletDestroyed(t){let i=this.getContext(t);i&&(i.outlet=null,i.attachRef=null)}onOutletDeactivated(){let t=this.contexts;return this.contexts=new Map,t}onOutletReAttached(t){this.contexts=t}getOrCreateContext(t){let i=this.getContext(t);return i||(i=new lg,this.contexts.set(t,i)),i}getContext(t){return this.contexts.get(t)||null}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})(),zu=class{constructor(e){this._root=e}get root(){return this._root.value}parent(e){let t=this.pathFromRoot(e);return t.length>1?t[t.length-2]:null}children(e){let t=cg(e,this._root);return t?t.children.map(i=>i.value):[]}firstChild(e){let t=cg(e,this._root);return t&&t.children.length>0?t.children[0].value:null}siblings(e){let t=ug(e,this._root);return t.length<2?[]:t[t.length-2].children.map(r=>r.value).filter(r=>r!==e)}pathFromRoot(e){return ug(e,this._root).map(t=>t.value)}};function cg(n,e){if(n===e.value)return e;for(let t of e.children){let i=cg(n,t);if(i)return i}return null}function ug(n,e){if(n===e.value)return[e];for(let t of e.children){let i=ug(n,t);if(i.length)return i.unshift(e),i}return[]}var Jn=class{constructor(e,t){this.value=e,this.children=t}toString(){return`TreeNode(${this.value})`}};function Po(n){let e={};return n&&n.children.forEach(t=>e[t.value.outlet]=t),e}var Gu=class extends zu{constructor(e,t){super(e),this.snapshot=t,_g(this,e)}toString(){return this.snapshot.toString()}};function Pb(n){let e=KI(n),t=new dn([new Os("",{})]),i=new dn({}),r=new dn({}),s=new dn({}),o=new dn(""),a=new Yr(t,i,s,o,r,Qe,n,e.root);return a.snapshot=e.root,new Gu(new Jn(a,[]),e)}function KI(n){let e={},t={},i={},r="",s=new il([],e,i,r,t,Qe,n,null,{});return new Wu("",new Jn(s,[]))}var Yr=class{constructor(e,t,i,r,s,o,a,l){this.urlSubject=e,this.paramsSubject=t,this.queryParamsSubject=i,this.fragmentSubject=r,this.dataSubject=s,this.outlet=o,this.component=a,this._futureSnapshot=l,this.title=this.dataSubject?.pipe(gt(c=>c[al]))??Be(void 0),this.url=e,this.params=t,this.queryParams=i,this.fragment=r,this.data=s}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(gt(e=>Lo(e))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(gt(e=>Lo(e))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function xg(n,e,t="emptyOnly"){let i,{routeConfig:r}=n;return e!==null&&(t==="always"||r?.path===""||!e.component&&!e.routeConfig?.loadComponent)?i={params:Ae(Ae({},e.params),n.params),data:Ae(Ae({},e.data),n.data),resolve:Ae(Ae(Ae(Ae({},n.data),e.data),r?.data),n._resolvedData)}:i={params:Ae({},n.params),data:Ae({},n.data),resolve:Ae(Ae({},n.data),n._resolvedData??{})},r&&Ob(r)&&(i.resolve[al]=r.title),i}var il=class{get title(){return this.data?.[al]}constructor(e,t,i,r,s,o,a,l,c){this.url=e,this.params=t,this.queryParams=i,this.fragment=r,this.data=s,this.outlet=o,this.component=a,this.routeConfig=l,this._resolve=c}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=Lo(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=Lo(this.queryParams),this._queryParamMap}toString(){let e=this.url.map(i=>i.toString()).join("/"),t=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${e}', path:'${t}')`}},Wu=class extends zu{constructor(e,t){super(t),this.url=e,_g(this,t)}toString(){return Nb(this._root)}};function _g(n,e){e.value._routerState=n,e.children.forEach(t=>_g(n,t))}function Nb(n){let e=n.children.length>0?` { ${n.children.map(Nb).join(", ")} } `:"";return`${n.value}${e}`}function jm(n){if(n.snapshot){let e=n.snapshot,t=n._futureSnapshot;n.snapshot=t,ji(e.queryParams,t.queryParams)||n.queryParamsSubject.next(t.queryParams),e.fragment!==t.fragment&&n.fragmentSubject.next(t.fragment),ji(e.params,t.params)||n.paramsSubject.next(t.params),TI(e.url,t.url)||n.urlSubject.next(t.url),ji(e.data,t.data)||n.dataSubject.next(t.data)}else n.snapshot=n._futureSnapshot,n.dataSubject.next(n._futureSnapshot.data)}function dg(n,e){let t=ji(n.params,e.params)&&RI(n.url,e.url),i=!n.parent!=!e.parent;return t&&!i&&(!n.parent||dg(n.parent,e.parent))}function Ob(n){return typeof n.title=="string"||n.title===null}var bg=(()=>{class n{constructor(){this.activated=null,this._activatedRoute=null,this.name=Qe,this.activateEvents=new qn,this.deactivateEvents=new qn,this.attachEvents=new qn,this.detachEvents=new qn,this.parentContexts=ve(cl),this.location=ve(zr),this.changeDetector=ve(Gr),this.environmentInjector=ve(Un),this.inputBinder=ve(Yu,{optional:!0}),this.supportsBindingToComponentInputs=!0}get activatedComponentRef(){return this.activated}ngOnChanges(t){if(t.name){let{firstChange:i,previousValue:r}=t.name;if(i)return;this.isTrackedInParentContexts(r)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(r)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(t){return this.parentContexts.getContext(t)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let t=this.parentContexts.getContext(this.name);t?.route&&(t.attachRef?this.attach(t.attachRef,t.route):this.activateWith(t.route,t.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new Fe(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new Fe(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new Fe(4012,!1);this.location.detach();let t=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(t.instance),t}attach(t,i){this.activated=t,this._activatedRoute=i,this.location.insert(t.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(t.instance)}deactivate(){if(this.activated){let t=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(t)}}activateWith(t,i){if(this.isActivated)throw new Fe(4013,!1);this._activatedRoute=t;let r=this.location,o=t.snapshot.component,a=this.parentContexts.getOrCreateContext(this.name).children,l=new fg(t,a,r.injector);this.activated=r.createComponent(o,{index:r.length,injector:l,environmentInjector:i??this.environmentInjector}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275dir=Ur({type:n,selectors:[["router-outlet"]],inputs:{name:"name"},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],standalone:!0,features:[Mo]})}}return n})(),fg=class n{__ngOutletInjector(e){return new n(this.route,this.childContexts,e)}constructor(e,t,i){this.route=e,this.childContexts=t,this.parent=i}get(e,t){return e===Yr?this.route:e===cl?this.childContexts:this.parent.get(e,t)}},Yu=new ot(""),pb=(()=>{class n{constructor(){this.outletDataSubscriptions=new Map}bindActivatedRouteToOutletComponent(t){this.unsubscribeFromRouteData(t),this.subscribeToRouteData(t)}unsubscribeFromRouteData(t){this.outletDataSubscriptions.get(t)?.unsubscribe(),this.outletDataSubscriptions.delete(t)}subscribeToRouteData(t){let{activatedRoute:i}=t,r=va([i.queryParams,i.params,i.data]).pipe(ai(([s,o,a],l)=>(a=Ae(Ae(Ae({},s),o),a),l===0?Be(a):Promise.resolve(a)))).subscribe(s=>{if(!t.isActivated||!t.activatedComponentRef||t.activatedRoute!==i||i.component===null){this.unsubscribeFromRouteData(t);return}let o=V_(i.component);if(!o){this.unsubscribeFromRouteData(t);return}for(let{templateName:a}of o.inputs)t.activatedComponentRef.setInput(a,s[a])});this.outletDataSubscriptions.set(t,r)}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac})}}return n})();function QI(n,e,t){let i=rl(n,e._root,t?t._root:void 0);return new Gu(i,e)}function rl(n,e,t){if(t&&n.shouldReuseRoute(e.value,t.value.snapshot)){let i=t.value;i._futureSnapshot=e.value;let r=eD(n,e,t);return new Jn(i,r)}else{if(n.shouldAttach(e.value)){let s=n.retrieve(e.value);if(s!==null){let o=s.route;return o.value._futureSnapshot=e.value,o.children=e.children.map(a=>rl(n,a)),o}}let i=tD(e.value),r=e.children.map(s=>rl(n,s));return new Jn(i,r)}}function eD(n,e,t){return e.children.map(i=>{for(let r of t.children)if(n.shouldReuseRoute(i.value,r.value.snapshot))return rl(n,i,r);return rl(n,i)})}function tD(n){return new Yr(new dn(n.url),new dn(n.params),new dn(n.queryParams),new dn(n.fragment),new dn(n.data),n.outlet,n.component,n)}var Lb="ngNavigationCancelingError";function Fb(n,e){let{redirectTo:t,navigationBehaviorOptions:i}=Fo(e)?{redirectTo:e,navigationBehaviorOptions:void 0}:e,r=kb(!1,Kn.Redirect);return r.url=t,r.navigationBehaviorOptions=i,r}function kb(n,e){let t=new Error(`NavigationCancelingError: ${n||""}`);return t[Lb]=!0,t.cancellationCode=e,t}function nD(n){return Ub(n)&&Fo(n.url)}function Ub(n){return!!n&&n[Lb]}var iD=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=xn({type:n,selectors:[["ng-component"]],standalone:!0,features:[Mn],decls:1,vars:0,template:function(i,r){i&1&&q(0,"router-outlet")},dependencies:[bg],encapsulation:2})}}return n})();function rD(n,e){return n.providers&&!n._injector&&(n._injector=mu(n.providers,e,`Route: ${n.path}`)),n._injector??e}function Sg(n){let e=n.children&&n.children.map(Sg),t=e?zt(Ae({},n),{children:e}):Ae({},n);return!t.component&&!t.loadComponent&&(e||t.loadChildren)&&t.outlet&&t.outlet!==Qe&&(t.component=iD),t}function $i(n){return n.outlet||Qe}function sD(n,e){let t=n.filter(i=>$i(i)===e);return t.push(...n.filter(i=>$i(i)!==e)),t}function ul(n){if(!n)return null;if(n.routeConfig?._injector)return n.routeConfig._injector;for(let e=n.parent;e;e=e.parent){let t=e.routeConfig;if(t?._loadedInjector)return t._loadedInjector;if(t?._injector)return t._injector}return null}var oD=(n,e,t,i)=>gt(r=>(new hg(e,r.targetRouterState,r.currentRouterState,t,i).activate(n),r)),hg=class{constructor(e,t,i,r,s){this.routeReuseStrategy=e,this.futureState=t,this.currState=i,this.forwardEvent=r,this.inputBindingEnabled=s}activate(e){let t=this.futureState._root,i=this.currState?this.currState._root:null;this.deactivateChildRoutes(t,i,e),jm(this.futureState.root),this.activateChildRoutes(t,i,e)}deactivateChildRoutes(e,t,i){let r=Po(t);e.children.forEach(s=>{let o=s.value.outlet;this.deactivateRoutes(s,r[o],i),delete r[o]}),Object.values(r).forEach(s=>{this.deactivateRouteAndItsChildren(s,i)})}deactivateRoutes(e,t,i){let r=e.value,s=t?t.value:null;if(r===s)if(r.component){let o=i.getContext(r.outlet);o&&this.deactivateChildRoutes(e,t,o.children)}else this.deactivateChildRoutes(e,t,i);else s&&this.deactivateRouteAndItsChildren(t,i)}deactivateRouteAndItsChildren(e,t){e.value.component&&this.routeReuseStrategy.shouldDetach(e.value.snapshot)?this.detachAndStoreRouteSubtree(e,t):this.deactivateRouteAndOutlet(e,t)}detachAndStoreRouteSubtree(e,t){let i=t.getContext(e.value.outlet),r=i&&e.value.component?i.children:t,s=Po(e);for(let o of Object.values(s))this.deactivateRouteAndItsChildren(o,r);if(i&&i.outlet){let o=i.outlet.detach(),a=i.children.onOutletDeactivated();this.routeReuseStrategy.store(e.value.snapshot,{componentRef:o,route:e,contexts:a})}}deactivateRouteAndOutlet(e,t){let i=t.getContext(e.value.outlet),r=i&&e.value.component?i.children:t,s=Po(e);for(let o of Object.values(s))this.deactivateRouteAndItsChildren(o,r);i&&(i.outlet&&(i.outlet.deactivate(),i.children.onOutletDeactivated()),i.attachRef=null,i.route=null)}activateChildRoutes(e,t,i){let r=Po(t);e.children.forEach(s=>{this.activateRoutes(s,r[s.value.outlet],i),this.forwardEvent(new ag(s.value.snapshot))}),e.children.length&&this.forwardEvent(new sg(e.value.snapshot))}activateRoutes(e,t,i){let r=e.value,s=t?t.value:null;if(jm(r),r===s)if(r.component){let o=i.getOrCreateContext(r.outlet);this.activateChildRoutes(e,t,o.children)}else this.activateChildRoutes(e,t,i);else if(r.component){let o=i.getOrCreateContext(r.outlet);if(this.routeReuseStrategy.shouldAttach(r.snapshot)){let a=this.routeReuseStrategy.retrieve(r.snapshot);this.routeReuseStrategy.store(r.snapshot,null),o.children.onOutletReAttached(a.contexts),o.attachRef=a.componentRef,o.route=a.route.value,o.outlet&&o.outlet.attach(a.componentRef,a.route.value),jm(a.route.value),this.activateChildRoutes(e,null,o.children)}else{let a=ul(r.snapshot);o.attachRef=null,o.route=r,o.injector=a,o.outlet&&o.outlet.activateWith(r,o.injector),this.activateChildRoutes(e,null,o.children)}}else this.activateChildRoutes(e,null,i)}},ju=class{constructor(e){this.path=e,this.route=this.path[this.path.length-1]}},Oo=class{constructor(e,t){this.component=e,this.route=t}};function aD(n,e,t){let i=n._root,r=e?e._root:null;return qa(i,r,t,[i.value])}function lD(n){let e=n.routeConfig?n.routeConfig.canActivateChild:null;return!e||e.length===0?null:{node:n,guards:e}}function Bo(n,e){let t=Symbol(),i=e.get(n,t);return i===t?typeof n=="function"&&!Ey(n)?n:e.get(n):i}function qa(n,e,t,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let s=Po(e);return n.children.forEach(o=>{cD(o,s[o.value.outlet],t,i.concat([o.value]),r),delete s[o.value.outlet]}),Object.entries(s).forEach(([o,a])=>Ja(a,t.getContext(o),r)),r}function cD(n,e,t,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let s=n.value,o=e?e.value:null,a=t?t.getContext(n.value.outlet):null;if(o&&s.routeConfig===o.routeConfig){let l=uD(o,s,s.routeConfig.runGuardsAndResolvers);l?r.canActivateChecks.push(new ju(i)):(s.data=o.data,s._resolvedData=o._resolvedData),s.component?qa(n,e,a?a.children:null,i,r):qa(n,e,t,i,r),l&&a&&a.outlet&&a.outlet.isActivated&&r.canDeactivateChecks.push(new Oo(a.outlet.component,o))}else o&&Ja(e,a,r),r.canActivateChecks.push(new ju(i)),s.component?qa(n,null,a?a.children:null,i,r):qa(n,null,t,i,r);return r}function uD(n,e,t){if(typeof t=="function")return t(n,e);switch(t){case"pathParamsChange":return!Ls(n.url,e.url);case"pathParamsOrQueryParamsChange":return!Ls(n.url,e.url)||!ji(n.queryParams,e.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!dg(n,e)||!ji(n.queryParams,e.queryParams);case"paramsChange":default:return!dg(n,e)}}function Ja(n,e,t){let i=Po(n),r=n.value;Object.entries(i).forEach(([s,o])=>{r.component?e?Ja(o,e.children.getContext(s),t):Ja(o,null,t):Ja(o,e,t)}),r.component?e&&e.outlet&&e.outlet.isActivated?t.canDeactivateChecks.push(new Oo(e.outlet.component,r)):t.canDeactivateChecks.push(new Oo(null,r)):t.canDeactivateChecks.push(new Oo(null,r))}function dl(n){return typeof n=="function"}function dD(n){return typeof n=="boolean"}function fD(n){return n&&dl(n.canLoad)}function hD(n){return n&&dl(n.canActivate)}function pD(n){return n&&dl(n.canActivateChild)}function mD(n){return n&&dl(n.canDeactivate)}function gD(n){return n&&dl(n.canMatch)}function Bb(n){return n instanceof rr||n?.name==="EmptyError"}var Nu=Symbol("INITIAL_VALUE");function Uo(){return ai(n=>va(n.map(e=>e.pipe(sr(1),yh(Nu)))).pipe(gt(e=>{for(let t of e)if(t!==!0){if(t===Nu)return Nu;if(t===!1||t instanceof $r)return t}return!0}),oi(e=>e!==Nu),sr(1)))}function vD(n,e){return Jt(t=>{let{targetSnapshot:i,currentSnapshot:r,guards:{canActivateChecks:s,canDeactivateChecks:o}}=t;return o.length===0&&s.length===0?Be(zt(Ae({},t),{guardsResult:!0})):yD(o,i,r,n).pipe(Jt(a=>a&&dD(a)?xD(i,s,n,e):Be(a)),gt(a=>zt(Ae({},t),{guardsResult:a})))})}function yD(n,e,t,i){return Gt(n).pipe(Jt(r=>wD(r.component,r.route,t,e,i)),Fi(r=>r!==!0,!0))}function xD(n,e,t,i){return Gt(e).pipe(Ss(r=>so(bD(r.route.parent,i),_D(r.route,i),MD(n,r.path,t),SD(n,r.route,t))),Fi(r=>r!==!0,!0))}function _D(n,e){return n!==null&&e&&e(new og(n)),Be(!0)}function bD(n,e){return n!==null&&e&&e(new rg(n)),Be(!0)}function SD(n,e,t){let i=e.routeConfig?e.routeConfig.canActivate:null;if(!i||i.length===0)return Be(!0);let r=i.map(s=>xc(()=>{let o=ul(e)??t,a=Bo(s,o),l=hD(a)?a.canActivate(e,n):cr(o,()=>a(e,n));return Zr(l).pipe(Fi())}));return Be(r).pipe(Uo())}function MD(n,e,t){let i=e[e.length-1],s=e.slice(0,e.length-1).reverse().map(o=>lD(o)).filter(o=>o!==null).map(o=>xc(()=>{let a=o.guards.map(l=>{let c=ul(o.node)??t,u=Bo(l,c),d=pD(u)?u.canActivateChild(i,n):cr(c,()=>u(i,n));return Zr(d).pipe(Fi())});return Be(a).pipe(Uo())}));return Be(s).pipe(Uo())}function wD(n,e,t,i,r){let s=e&&e.routeConfig?e.routeConfig.canDeactivate:null;if(!s||s.length===0)return Be(!0);let o=s.map(a=>{let l=ul(e)??r,c=Bo(a,l),u=mD(c)?c.canDeactivate(n,e,t,i):cr(l,()=>c(n,e,t,i));return Zr(u).pipe(Fi())});return Be(o).pipe(Uo())}function ED(n,e,t,i){let r=e.canLoad;if(r===void 0||r.length===0)return Be(!0);let s=r.map(o=>{let a=Bo(o,n),l=fD(a)?a.canLoad(e,t):cr(n,()=>a(e,t));return Zr(l)});return Be(s).pipe(Uo(),Vb(i))}function Vb(n){return uh(fn(e=>{if(Fo(e))throw Fb(n,e)}),gt(e=>e===!0))}function CD(n,e,t,i){let r=e.canMatch;if(!r||r.length===0)return Be(!0);let s=r.map(o=>{let a=Bo(o,n),l=gD(a)?a.canMatch(e,t):cr(n,()=>a(e,t));return Zr(l)});return Be(s).pipe(Uo(),Vb(i))}var sl=class{constructor(e){this.segmentGroup=e||null}},$u=class extends Error{constructor(e){super(),this.urlTree=e}};function Ro(n){return ro(new sl(n))}function TD(n){return ro(new Fe(4e3,!1))}function AD(n){return ro(kb(!1,Kn.GuardRejected))}var pg=class{constructor(e,t){this.urlSerializer=e,this.urlTree=t}lineralizeSegments(e,t){let i=[],r=t.root;for(;;){if(i=i.concat(r.segments),r.numberOfChildren===0)return Be(i);if(r.numberOfChildren>1||!r.children[Qe])return TD(e.redirectTo);r=r.children[Qe]}}applyRedirectCommands(e,t,i){let r=this.applyRedirectCreateUrlTree(t,this.urlSerializer.parse(t),e,i);if(t.startsWith("/"))throw new $u(r);return r}applyRedirectCreateUrlTree(e,t,i,r){let s=this.createSegmentGroup(e,t.root,i,r);return new $r(s,this.createQueryParams(t.queryParams,this.urlTree.queryParams),t.fragment)}createQueryParams(e,t){let i={};return Object.entries(e).forEach(([r,s])=>{if(typeof s=="string"&&s.startsWith(":")){let a=s.substring(1);i[r]=t[a]}else i[r]=s}),i}createSegmentGroup(e,t,i,r){let s=this.createSegments(e,t.segments,i,r),o={};return Object.entries(t.children).forEach(([a,l])=>{o[a]=this.createSegmentGroup(e,l,i,r)}),new Mt(s,o)}createSegments(e,t,i,r){return t.map(s=>s.path.startsWith(":")?this.findPosParam(e,s,r):this.findOrReturn(s,i))}findPosParam(e,t,i){let r=i[t.path.substring(1)];if(!r)throw new Fe(4001,!1);return r}findOrReturn(e,t){let i=0;for(let r of t){if(r.path===e.path)return t.splice(i),r;i++}return e}},mg={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function ID(n,e,t,i,r){let s=Mg(n,e,t);return s.matched?(i=rD(e,i),CD(i,e,t,r).pipe(gt(o=>o===!0?s:Ae({},mg)))):Be(s)}function Mg(n,e,t){if(e.path==="**")return DD(t);if(e.path==="")return e.pathMatch==="full"&&(n.hasChildren()||t.length>0)?Ae({},mg):{matched:!0,consumedSegments:[],remainingSegments:t,parameters:{},positionalParamSegments:{}};let r=(e.matcher||CI)(t,n,e);if(!r)return Ae({},mg);let s={};Object.entries(r.posParams??{}).forEach(([a,l])=>{s[a]=l.path});let o=r.consumed.length>0?Ae(Ae({},s),r.consumed[r.consumed.length-1].parameters):s;return{matched:!0,consumedSegments:r.consumed,remainingSegments:t.slice(r.consumed.length),parameters:o,positionalParamSegments:r.posParams??{}}}function DD(n){return{matched:!0,parameters:n.length>0?xb(n).parameters:{},consumedSegments:n,remainingSegments:[],positionalParamSegments:{}}}function mb(n,e,t,i){return t.length>0&&ND(n,t,i)?{segmentGroup:new Mt(e,PD(i,new Mt(t,n.children))),slicedSegments:[]}:t.length===0&&OD(n,t,i)?{segmentGroup:new Mt(n.segments,RD(n,t,i,n.children)),slicedSegments:t}:{segmentGroup:new Mt(n.segments,n.children),slicedSegments:t}}function RD(n,e,t,i){let r={};for(let s of t)if(Zu(n,e,s)&&!i[$i(s)]){let o=new Mt([],{});r[$i(s)]=o}return Ae(Ae({},i),r)}function PD(n,e){let t={};t[Qe]=e;for(let i of n)if(i.path===""&&$i(i)!==Qe){let r=new Mt([],{});t[$i(i)]=r}return t}function ND(n,e,t){return t.some(i=>Zu(n,e,i)&&$i(i)!==Qe)}function OD(n,e,t){return t.some(i=>Zu(n,e,i))}function Zu(n,e,t){return(n.hasChildren()||e.length>0)&&t.pathMatch==="full"?!1:t.path===""}function LD(n,e,t,i){return $i(n)!==i&&(i===Qe||!Zu(e,t,n))?!1:Mg(e,n,t).matched}function FD(n,e,t){return e.length===0&&!n.children[t]}var gg=class{};function kD(n,e,t,i,r,s,o="emptyOnly"){return new vg(n,e,t,i,r,o,s).recognize()}var UD=31,vg=class{constructor(e,t,i,r,s,o,a){this.injector=e,this.configLoader=t,this.rootComponentType=i,this.config=r,this.urlTree=s,this.paramsInheritanceStrategy=o,this.urlSerializer=a,this.applyRedirects=new pg(this.urlSerializer,this.urlTree),this.absoluteRedirectCount=0,this.allowRedirects=!0}noMatchError(e){return new Fe(4002,`'${e.segmentGroup}'`)}recognize(){let e=mb(this.urlTree.root,[],[],this.config).segmentGroup;return this.match(e).pipe(gt(t=>{let i=new il([],Object.freeze({}),Object.freeze(Ae({},this.urlTree.queryParams)),this.urlTree.fragment,{},Qe,this.rootComponentType,null,{}),r=new Jn(i,t),s=new Wu("",r),o=jI(i,[],this.urlTree.queryParams,this.urlTree.fragment);return o.queryParams=this.urlTree.queryParams,s.url=this.urlSerializer.serialize(o),this.inheritParamsAndData(s._root,null),{state:s,tree:o}}))}match(e){return this.processSegmentGroup(this.injector,this.config,e,Qe).pipe(Rr(i=>{if(i instanceof $u)return this.urlTree=i.urlTree,this.match(i.urlTree.root);throw i instanceof sl?this.noMatchError(i):i}))}inheritParamsAndData(e,t){let i=e.value,r=xg(i,t,this.paramsInheritanceStrategy);i.params=Object.freeze(r.params),i.data=Object.freeze(r.data),e.children.forEach(s=>this.inheritParamsAndData(s,i))}processSegmentGroup(e,t,i,r){return i.segments.length===0&&i.hasChildren()?this.processChildren(e,t,i):this.processSegment(e,t,i,i.segments,r,!0).pipe(gt(s=>s instanceof Jn?[s]:[]))}processChildren(e,t,i){let r=[];for(let s of Object.keys(i.children))s==="primary"?r.unshift(s):r.push(s);return Gt(r).pipe(Ss(s=>{let o=i.children[s],a=sD(t,s);return this.processSegmentGroup(e,a,o,s)}),vh((s,o)=>(s.push(...o),s)),Pr(null),gh(),Jt(s=>{if(s===null)return Ro(i);let o=Hb(s);return BD(o),Be(o)}))}processSegment(e,t,i,r,s,o){return Gt(t).pipe(Ss(a=>this.processSegmentAgainstRoute(a._injector??e,t,a,i,r,s,o).pipe(Rr(l=>{if(l instanceof sl)return Be(null);throw l}))),Fi(a=>!!a),Rr(a=>{if(Bb(a))return FD(i,r,s)?Be(new gg):Ro(i);throw a}))}processSegmentAgainstRoute(e,t,i,r,s,o,a){return LD(i,r,s,o)?i.redirectTo===void 0?this.matchSegmentAgainstRoute(e,r,i,s,o):this.allowRedirects&&a?this.expandSegmentAgainstRouteUsingRedirect(e,r,t,i,s,o):Ro(r):Ro(r)}expandSegmentAgainstRouteUsingRedirect(e,t,i,r,s,o){let{matched:a,consumedSegments:l,positionalParamSegments:c,remainingSegments:u}=Mg(t,r,s);if(!a)return Ro(t);r.redirectTo.startsWith("/")&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>UD&&(this.allowRedirects=!1));let d=this.applyRedirects.applyRedirectCommands(l,r.redirectTo,c);return this.applyRedirects.lineralizeSegments(r,d).pipe(Jt(f=>this.processSegment(e,i,t,f.concat(u),o,!1)))}matchSegmentAgainstRoute(e,t,i,r,s){let o=ID(t,i,r,e,this.urlSerializer);return i.path==="**"&&(t.children={}),o.pipe(ai(a=>a.matched?(e=i._injector??e,this.getChildConfig(e,i,r).pipe(ai(({routes:l})=>{let c=i._loadedInjector??e,{consumedSegments:u,remainingSegments:d,parameters:f}=a,h=new il(u,f,Object.freeze(Ae({},this.urlTree.queryParams)),this.urlTree.fragment,HD(i),$i(i),i.component??i._loadedComponent??null,i,zD(i)),{segmentGroup:g,slicedSegments:x}=mb(t,u,d,l);if(x.length===0&&g.hasChildren())return this.processChildren(c,l,g).pipe(gt(p=>p===null?null:new Jn(h,p)));if(l.length===0&&x.length===0)return Be(new Jn(h,[]));let m=$i(i)===s;return this.processSegment(c,l,g,x,m?Qe:s,!0).pipe(gt(p=>new Jn(h,p instanceof Jn?[p]:[])))}))):Ro(t)))}getChildConfig(e,t,i){return t.children?Be({routes:t.children,injector:e}):t.loadChildren?t._loadedRoutes!==void 0?Be({routes:t._loadedRoutes,injector:t._loadedInjector}):ED(e,t,i,this.urlSerializer).pipe(Jt(r=>r?this.configLoader.loadChildren(e,t).pipe(fn(s=>{t._loadedRoutes=s.routes,t._loadedInjector=s.injector})):AD(t))):Be({routes:[],injector:e})}};function BD(n){n.sort((e,t)=>e.value.outlet===Qe?-1:t.value.outlet===Qe?1:e.value.outlet.localeCompare(t.value.outlet))}function VD(n){let e=n.value.routeConfig;return e&&e.path===""}function Hb(n){let e=[],t=new Set;for(let i of n){if(!VD(i)){e.push(i);continue}let r=e.find(s=>i.value.routeConfig===s.value.routeConfig);r!==void 0?(r.children.push(...i.children),t.add(r)):e.push(i)}for(let i of t){let r=Hb(i.children);e.push(new Jn(i.value,r))}return e.filter(i=>!t.has(i))}function HD(n){return n.data||{}}function zD(n){return n.resolve||{}}function GD(n,e,t,i,r,s){return Jt(o=>kD(n,e,t,i,o.extractedUrl,r,s).pipe(gt(({state:a,tree:l})=>zt(Ae({},o),{targetSnapshot:a,urlAfterRedirects:l}))))}function WD(n,e){return Jt(t=>{let{targetSnapshot:i,guards:{canActivateChecks:r}}=t;if(!r.length)return Be(t);let s=new Set(r.map(l=>l.route)),o=new Set;for(let l of s)if(!o.has(l))for(let c of zb(l))o.add(c);let a=0;return Gt(o).pipe(Ss(l=>s.has(l)?jD(l,i,n,e):(l.data=xg(l,l.parent,n).resolve,Be(void 0))),fn(()=>a++),oo(1),Jt(l=>a===o.size?Be(t):jn))})}function zb(n){let e=n.children.map(t=>zb(t)).flat();return[n,...e]}function jD(n,e,t,i){let r=n.routeConfig,s=n._resolve;return r?.title!==void 0&&!Ob(r)&&(s[al]=r.title),$D(s,n,e,i).pipe(gt(o=>(n._resolvedData=o,n.data=xg(n,n.parent,t).resolve,null)))}function $D(n,e,t,i){let r=Xm(n);if(r.length===0)return Be({});let s={};return Gt(r).pipe(Jt(o=>qD(n[o],e,t,i).pipe(Fi(),fn(a=>{s[o]=a}))),oo(1),mh(s),Rr(o=>Bb(o)?jn:ro(o)))}function qD(n,e,t,i){let r=ul(e)??i,s=Bo(n,r),o=s.resolve?s.resolve(e,t):cr(r,()=>s(e,t));return Zr(o)}function $m(n){return ai(e=>{let t=n(e);return t?Gt(t).pipe(gt(()=>e)):Be(e)})}var Gb=(()=>{class n{buildTitle(t){let i,r=t.root;for(;r!==void 0;)i=this.getResolvedTitleForRoute(r)??i,r=r.children.find(s=>s.outlet===Qe);return i}getResolvedTitleForRoute(t){return t.data[al]}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=He({token:n,factory:()=>ve(XD),providedIn:"root"})}}return n})(),XD=(()=>{class n extends Gb{constructor(t){super(),this.title=t}updateTitle(t){let i=this.buildTitle(t);i!==void 0&&this.title.setTitle(i)}static{this.\u0275fac=function(i){return new(i||n)(Xe(cb))}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})(),fl=new ot("",{providedIn:"root",factory:()=>({})}),ol=new ot(""),wg=(()=>{class n{constructor(){this.componentLoaders=new WeakMap,this.childrenLoaders=new WeakMap,this.compiler=ve(Cu)}loadComponent(t){if(this.componentLoaders.get(t))return this.componentLoaders.get(t);if(t._loadedComponent)return Be(t._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(t);let i=Zr(t.loadComponent()).pipe(gt(Wb),fn(s=>{this.onLoadEndListener&&this.onLoadEndListener(t),t._loadedComponent=s}),ya(()=>{this.componentLoaders.delete(t)})),r=new io(i,()=>new yn).pipe(no());return this.componentLoaders.set(t,r),r}loadChildren(t,i){if(this.childrenLoaders.get(i))return this.childrenLoaders.get(i);if(i._loadedRoutes)return Be({routes:i._loadedRoutes,injector:i._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(i);let s=YD(i,this.compiler,t,this.onLoadEndListener).pipe(ya(()=>{this.childrenLoaders.delete(i)})),o=new io(s,()=>new yn).pipe(no());return this.childrenLoaders.set(i,o),o}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();function YD(n,e,t,i){return Zr(n.loadChildren()).pipe(gt(Wb),Jt(r=>r instanceof Ia||Array.isArray(r)?Be(r):Gt(e.compileModuleAsync(r))),gt(r=>{i&&i(n);let s,o,a=!1;return Array.isArray(r)?(o=r,a=!0):(s=r.create(t).injector,o=s.get(ol,[],{optional:!0,self:!0}).flat()),{routes:o.map(Sg),injector:s}}))}function ZD(n){return n&&typeof n=="object"&&"default"in n}function Wb(n){return ZD(n)?n.default:n}var Eg=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=He({token:n,factory:()=>ve(JD),providedIn:"root"})}}return n})(),JD=(()=>{class n{shouldProcessUrl(t){return!0}extract(t){return t}merge(t,i){return t}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})(),jb=new ot(""),$b=new ot("");function KD(n,e,t){let i=n.get($b),r=n.get(Vn);return n.get(kt).runOutsideAngular(()=>{if(!r.startViewTransition||i.skipNextTransition)return i.skipNextTransition=!1,new Promise(c=>setTimeout(c));let s,o=new Promise(c=>{s=c}),a=r.startViewTransition(()=>(s(),QD(n))),{onViewTransitionCreated:l}=i;return l&&cr(n,()=>l({transition:a,from:e,to:t})),o})}function QD(n){return new Promise(e=>{pu(e,{injector:n})})}var Cg=(()=>{class n{get hasRequestedNavigation(){return this.navigationId!==0}constructor(){this.currentNavigation=null,this.currentTransition=null,this.lastSuccessfulNavigation=null,this.events=new yn,this.transitionAbortSubject=new yn,this.configLoader=ve(wg),this.environmentInjector=ve(Un),this.urlSerializer=ve(ll),this.rootContexts=ve(cl),this.location=ve(Io),this.inputBindingEnabled=ve(Yu,{optional:!0})!==null,this.titleStrategy=ve(Gb),this.options=ve(fl,{optional:!0})||{},this.paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly",this.urlHandlingStrategy=ve(Eg),this.createViewTransition=ve(jb,{optional:!0}),this.navigationId=0,this.afterPreactivation=()=>Be(void 0),this.rootComponentType=null;let t=r=>this.events.next(new ng(r)),i=r=>this.events.next(new ig(r));this.configLoader.onLoadEndListener=i,this.configLoader.onLoadStartListener=t}complete(){this.transitions?.complete()}handleNavigationRequest(t){let i=++this.navigationId;this.transitions?.next(zt(Ae(Ae({},this.transitions.value),t),{id:i}))}setupNavigations(t,i,r){return this.transitions=new dn({id:0,currentUrlTree:i,currentRawUrl:i,extractedUrl:this.urlHandlingStrategy.extract(i),urlAfterRedirects:this.urlHandlingStrategy.extract(i),rawUrl:i,extras:{},resolve:null,reject:null,promise:Promise.resolve(!0),source:Za,restoredState:null,currentSnapshot:r.snapshot,targetSnapshot:null,currentRouterState:r,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null}),this.transitions.pipe(oi(s=>s.id!==0),gt(s=>zt(Ae({},s),{extractedUrl:this.urlHandlingStrategy.extract(s.rawUrl)})),ai(s=>{let o=!1,a=!1;return Be(s).pipe(ai(l=>{if(this.navigationId>s.id)return this.cancelNavigationTransition(s,"",Kn.SupersededByNewNavigation),jn;this.currentTransition=s,this.currentNavigation={id:l.id,initialUrl:l.rawUrl,extractedUrl:l.extractedUrl,trigger:l.source,extras:l.extras,previousNavigation:this.lastSuccessfulNavigation?zt(Ae({},this.lastSuccessfulNavigation),{previousNavigation:null}):null};let c=!t.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),u=l.extras.onSameUrlNavigation??t.onSameUrlNavigation;if(!c&&u!=="reload"){let d="";return this.events.next(new Xr(l.id,this.urlSerializer.serialize(l.rawUrl),d,Bu.IgnoredSameUrlNavigation)),l.resolve(null),jn}if(this.urlHandlingStrategy.shouldProcessUrl(l.rawUrl))return Be(l).pipe(ai(d=>{let f=this.transitions?.getValue();return this.events.next(new ko(d.id,this.urlSerializer.serialize(d.extractedUrl),d.source,d.restoredState)),f!==this.transitions?.getValue()?jn:Promise.resolve(d)}),GD(this.environmentInjector,this.configLoader,this.rootComponentType,t.config,this.urlSerializer,this.paramsInheritanceStrategy),fn(d=>{s.targetSnapshot=d.targetSnapshot,s.urlAfterRedirects=d.urlAfterRedirects,this.currentNavigation=zt(Ae({},this.currentNavigation),{finalUrl:d.urlAfterRedirects});let f=new Vu(d.id,this.urlSerializer.serialize(d.extractedUrl),this.urlSerializer.serialize(d.urlAfterRedirects),d.targetSnapshot);this.events.next(f)}));if(c&&this.urlHandlingStrategy.shouldProcessUrl(l.currentRawUrl)){let{id:d,extractedUrl:f,source:h,restoredState:g,extras:x}=l,m=new ko(d,this.urlSerializer.serialize(f),h,g);this.events.next(m);let p=Pb(this.rootComponentType).snapshot;return this.currentTransition=s=zt(Ae({},l),{targetSnapshot:p,urlAfterRedirects:f,extras:zt(Ae({},x),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.finalUrl=f,Be(s)}else{let d="";return this.events.next(new Xr(l.id,this.urlSerializer.serialize(l.extractedUrl),d,Bu.IgnoredByUrlHandlingStrategy)),l.resolve(null),jn}}),fn(l=>{let c=new Km(l.id,this.urlSerializer.serialize(l.extractedUrl),this.urlSerializer.serialize(l.urlAfterRedirects),l.targetSnapshot);this.events.next(c)}),gt(l=>(this.currentTransition=s=zt(Ae({},l),{guards:aD(l.targetSnapshot,l.currentSnapshot,this.rootContexts)}),s)),vD(this.environmentInjector,l=>this.events.next(l)),fn(l=>{if(s.guardsResult=l.guardsResult,Fo(l.guardsResult))throw Fb(this.urlSerializer,l.guardsResult);let c=new Qm(l.id,this.urlSerializer.serialize(l.extractedUrl),this.urlSerializer.serialize(l.urlAfterRedirects),l.targetSnapshot,!!l.guardsResult);this.events.next(c)}),oi(l=>l.guardsResult?!0:(this.cancelNavigationTransition(l,"",Kn.GuardRejected),!1)),$m(l=>{if(l.guards.canActivateChecks.length)return Be(l).pipe(fn(c=>{let u=new eg(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot);this.events.next(u)}),ai(c=>{let u=!1;return Be(c).pipe(WD(this.paramsInheritanceStrategy,this.environmentInjector),fn({next:()=>u=!0,complete:()=>{u||this.cancelNavigationTransition(c,"",Kn.NoDataFromResolver)}}))}),fn(c=>{let u=new tg(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot);this.events.next(u)}))}),$m(l=>{let c=u=>{let d=[];u.routeConfig?.loadComponent&&!u.routeConfig._loadedComponent&&d.push(this.configLoader.loadComponent(u.routeConfig).pipe(fn(f=>{u.component=f}),gt(()=>{})));for(let f of u.children)d.push(...c(f));return d};return va(c(l.targetSnapshot.root)).pipe(Pr(null),sr(1))}),$m(()=>this.afterPreactivation()),ai(()=>{let{currentSnapshot:l,targetSnapshot:c}=s,u=this.createViewTransition?.(this.environmentInjector,l.root,c.root);return u?Gt(u).pipe(gt(()=>s)):Be(s)}),gt(l=>{let c=QI(t.routeReuseStrategy,l.targetSnapshot,l.currentRouterState);return this.currentTransition=s=zt(Ae({},l),{targetRouterState:c}),this.currentNavigation.targetRouterState=c,s}),fn(()=>{this.events.next(new tl)}),oD(this.rootContexts,t.routeReuseStrategy,l=>this.events.next(l),this.inputBindingEnabled),sr(1),fn({next:l=>{o=!0,this.lastSuccessfulNavigation=this.currentNavigation,this.events.next(new Ci(l.id,this.urlSerializer.serialize(l.extractedUrl),this.urlSerializer.serialize(l.urlAfterRedirects))),this.titleStrategy?.updateTitle(l.targetRouterState.snapshot),l.resolve(!0)},complete:()=>{o=!0}}),xh(this.transitionAbortSubject.pipe(fn(l=>{throw l}))),ya(()=>{!o&&!a&&this.cancelNavigationTransition(s,"",Kn.SupersededByNewNavigation),this.currentTransition?.id===s.id&&(this.currentNavigation=null,this.currentTransition=null)}),Rr(l=>{if(a=!0,Ub(l))this.events.next(new qr(s.id,this.urlSerializer.serialize(s.extractedUrl),l.message,l.cancellationCode)),nD(l)?this.events.next(new nl(l.url)):s.resolve(!1);else{this.events.next(new el(s.id,this.urlSerializer.serialize(s.extractedUrl),l,s.targetSnapshot??void 0));try{s.resolve(t.errorHandler(l))}catch(c){this.options.resolveNavigationPromiseOnError?s.resolve(!1):s.reject(c)}}return jn}))}))}cancelNavigationTransition(t,i,r){let s=new qr(t.id,this.urlSerializer.serialize(t.extractedUrl),i,r);this.events.next(s),t.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){return this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))).toString()!==this.currentTransition?.extractedUrl.toString()&&!this.currentTransition?.extras.skipLocationChange}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();function eR(n){return n!==Za}var tR=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=He({token:n,factory:()=>ve(nR),providedIn:"root"})}}return n})(),yg=class{shouldDetach(e){return!1}store(e,t){}shouldAttach(e){return!1}retrieve(e){return null}shouldReuseRoute(e,t){return e.routeConfig===t.routeConfig}},nR=(()=>{class n extends yg{static{this.\u0275fac=(()=>{let t;return function(r){return(t||(t=jp(n)))(r||n)}})()}static{this.\u0275prov=He({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})(),qb=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=He({token:n,factory:()=>ve(iR),providedIn:"root"})}}return n})(),iR=(()=>{class n extends qb{constructor(){super(...arguments),this.location=ve(Io),this.urlSerializer=ve(ll),this.options=ve(fl,{optional:!0})||{},this.canceledNavigationResolution=this.options.canceledNavigationResolution||"replace",this.urlHandlingStrategy=ve(Eg),this.urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred",this.currentUrlTree=new $r,this.rawUrlTree=this.currentUrlTree,this.currentPageId=0,this.lastSuccessfulId=-1,this.routerState=Pb(null),this.stateMemento=this.createStateMemento()}getCurrentUrlTree(){return this.currentUrlTree}getRawUrlTree(){return this.rawUrlTree}restoredState(){return this.location.getState()}get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}getRouterState(){return this.routerState}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}registerNonRouterCurrentEntryChangeListener(t){return this.location.subscribe(i=>{i.type==="popstate"&&t(i.url,i.state)})}handleRouterEvent(t,i){if(t instanceof ko)this.stateMemento=this.createStateMemento();else if(t instanceof Xr)this.rawUrlTree=i.initialUrl;else if(t instanceof Vu){if(this.urlUpdateStrategy==="eager"&&!i.extras.skipLocationChange){let r=this.urlHandlingStrategy.merge(i.finalUrl,i.initialUrl);this.setBrowserUrl(r,i)}}else t instanceof tl?(this.currentUrlTree=i.finalUrl,this.rawUrlTree=this.urlHandlingStrategy.merge(i.finalUrl,i.initialUrl),this.routerState=i.targetRouterState,this.urlUpdateStrategy==="deferred"&&(i.extras.skipLocationChange||this.setBrowserUrl(this.rawUrlTree,i))):t instanceof qr&&(t.code===Kn.GuardRejected||t.code===Kn.NoDataFromResolver)?this.restoreHistory(i):t instanceof el?this.restoreHistory(i,!0):t instanceof Ci&&(this.lastSuccessfulId=t.id,this.currentPageId=this.browserPageId)}setBrowserUrl(t,i){let r=this.urlSerializer.serialize(t);if(this.location.isCurrentPathEqualTo(r)||i.extras.replaceUrl){let s=this.browserPageId,o=Ae(Ae({},i.extras.state),this.generateNgRouterState(i.id,s));this.location.replaceState(r,"",o)}else{let s=Ae(Ae({},i.extras.state),this.generateNgRouterState(i.id,this.browserPageId+1));this.location.go(r,"",s)}}restoreHistory(t,i=!1){if(this.canceledNavigationResolution==="computed"){let r=this.browserPageId,s=this.currentPageId-r;s!==0?this.location.historyGo(s):this.currentUrlTree===t.finalUrl&&s===0&&(this.resetState(t),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(i&&this.resetState(t),this.resetUrlToCurrentUrlTree())}resetState(t){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,t.finalUrl??this.rawUrlTree)}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(t,i){return this.canceledNavigationResolution==="computed"?{navigationId:t,\u0275routerPageId:i}:{navigationId:t}}static{this.\u0275fac=(()=>{let t;return function(r){return(t||(t=jp(n)))(r||n)}})()}static{this.\u0275prov=He({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})(),Xa=function(n){return n[n.COMPLETE=0]="COMPLETE",n[n.FAILED=1]="FAILED",n[n.REDIRECTING=2]="REDIRECTING",n}(Xa||{});function Xb(n,e){n.events.pipe(oi(t=>t instanceof Ci||t instanceof qr||t instanceof el||t instanceof Xr),gt(t=>t instanceof Ci||t instanceof Xr?Xa.COMPLETE:(t instanceof qr?t.code===Kn.Redirect||t.code===Kn.SupersededByNewNavigation:!1)?Xa.REDIRECTING:Xa.FAILED),oi(t=>t!==Xa.REDIRECTING),sr(1)).subscribe(()=>{e()})}function rR(n){throw n}var sR={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},oR={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"},Hn=(()=>{class n{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}constructor(){this.disposed=!1,this.isNgZoneEnabled=!1,this.console=ve(Mu),this.stateManager=ve(qb),this.options=ve(fl,{optional:!0})||{},this.pendingTasks=ve(gu),this.urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred",this.navigationTransitions=ve(Cg),this.urlSerializer=ve(ll),this.location=ve(Io),this.urlHandlingStrategy=ve(Eg),this._events=new yn,this.errorHandler=this.options.errorHandler||rR,this.navigated=!1,this.routeReuseStrategy=ve(tR),this.onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore",this.config=ve(ol,{optional:!0})?.flat()??[],this.componentInputBindingEnabled=!!ve(Yu,{optional:!0}),this.eventsSubscription=new tn,this.isNgZoneEnabled=ve(kt)instanceof kt&&kt.isInAngularZone(),this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this,this.currentUrlTree,this.routerState).subscribe({error:t=>{this.console.warn(t)}}),this.subscribeToNavigationEvents()}subscribeToNavigationEvents(){let t=this.navigationTransitions.events.subscribe(i=>{try{let r=this.navigationTransitions.currentTransition,s=this.navigationTransitions.currentNavigation;if(r!==null&&s!==null){if(this.stateManager.handleRouterEvent(i,s),i instanceof qr&&i.code!==Kn.Redirect&&i.code!==Kn.SupersededByNewNavigation)this.navigated=!0;else if(i instanceof Ci)this.navigated=!0;else if(i instanceof nl){let o=this.urlHandlingStrategy.merge(i.url,r.currentRawUrl),a={info:r.extras.info,skipLocationChange:r.extras.skipLocationChange,replaceUrl:this.urlUpdateStrategy==="eager"||eR(r.source)};this.scheduleNavigation(o,Za,null,a,{resolve:r.resolve,reject:r.reject,promise:r.promise})}}lR(i)&&this._events.next(i)}catch(r){this.navigationTransitions.transitionAbortSubject.next(r)}});this.eventsSubscription.add(t)}resetRootComponentType(t){this.routerState.root.component=t,this.navigationTransitions.rootComponentType=t}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),Za,this.stateManager.restoredState())}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((t,i)=>{setTimeout(()=>{this.navigateToSyncWithBrowser(t,"popstate",i)},0)})}navigateToSyncWithBrowser(t,i,r){let s={replaceUrl:!0},o=r?.navigationId?r:null;if(r){let l=Ae({},r);delete l.navigationId,delete l.\u0275routerPageId,Object.keys(l).length!==0&&(s.state=l)}let a=this.parseUrl(t);this.scheduleNavigation(a,i,o,s)}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return this.navigationTransitions.currentNavigation}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(t){this.config=t.map(Sg),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription&&(this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0),this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(t,i={}){let{relativeTo:r,queryParams:s,fragment:o,queryParamsHandling:a,preserveFragment:l}=i,c=l?this.currentUrlTree.fragment:o,u=null;switch(a){case"merge":u=Ae(Ae({},this.currentUrlTree.queryParams),s);break;case"preserve":u=this.currentUrlTree.queryParams;break;default:u=s||null}u!==null&&(u=this.removeEmptyProps(u));let d;try{let f=r?r.snapshot:this.routerState.snapshot.root;d=Ab(f)}catch{(typeof t[0]!="string"||!t[0].startsWith("/"))&&(t=[]),d=this.currentUrlTree.root}return Ib(d,t,u,c??null)}navigateByUrl(t,i={skipLocationChange:!1}){let r=Fo(t)?t:this.parseUrl(t),s=this.urlHandlingStrategy.merge(r,this.rawUrlTree);return this.scheduleNavigation(s,Za,null,i)}navigate(t,i={skipLocationChange:!1}){return aR(t),this.navigateByUrl(this.createUrlTree(t,i),i)}serializeUrl(t){return this.urlSerializer.serialize(t)}parseUrl(t){try{return this.urlSerializer.parse(t)}catch{return this.urlSerializer.parse("/")}}isActive(t,i){let r;if(i===!0?r=Ae({},sR):i===!1?r=Ae({},oR):r=i,Fo(t))return ub(this.currentUrlTree,t,r);let s=this.parseUrl(t);return ub(this.currentUrlTree,s,r)}removeEmptyProps(t){return Object.entries(t).reduce((i,[r,s])=>(s!=null&&(i[r]=s),i),{})}scheduleNavigation(t,i,r,s,o){if(this.disposed)return Promise.resolve(!1);let a,l,c;o?(a=o.resolve,l=o.reject,c=o.promise):c=new Promise((d,f)=>{a=d,l=f});let u=this.pendingTasks.add();return Xb(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(u))}),this.navigationTransitions.handleNavigationRequest({source:i,restoredState:r,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:t,extras:s,resolve:a,reject:l,promise:c,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),c.catch(d=>Promise.reject(d))}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();function aR(n){for(let e=0;e<n.length;e++)if(n[e]==null)throw new Fe(4008,!1)}function lR(n){return!(n instanceof tl)&&!(n instanceof nl)}var qu=(()=>{class n{constructor(t,i,r,s,o,a){this.router=t,this.route=i,this.tabIndexAttribute=r,this.renderer=s,this.el=o,this.locationStrategy=a,this.href=null,this.commands=null,this.onChanges=new yn,this.preserveFragment=!1,this.skipLocationChange=!1,this.replaceUrl=!1;let l=o.nativeElement.tagName?.toLowerCase();this.isAnchorElement=l==="a"||l==="area",this.isAnchorElement?this.subscription=t.events.subscribe(c=>{c instanceof Ci&&this.updateHref()}):this.setTabIndexIfNotOnNativeEl("0")}setTabIndexIfNotOnNativeEl(t){this.tabIndexAttribute!=null||this.isAnchorElement||this.applyAttributeValue("tabindex",t)}ngOnChanges(t){this.isAnchorElement&&this.updateHref(),this.onChanges.next(this)}set routerLink(t){t!=null?(this.commands=Array.isArray(t)?t:[t],this.setTabIndexIfNotOnNativeEl("0")):(this.commands=null,this.setTabIndexIfNotOnNativeEl(null))}onClick(t,i,r,s,o){let a=this.urlTree;if(a===null||this.isAnchorElement&&(t!==0||i||r||s||o||typeof this.target=="string"&&this.target!="_self"))return!0;let l={skipLocationChange:this.skipLocationChange,replaceUrl:this.replaceUrl,state:this.state,info:this.info};return this.router.navigateByUrl(a,l),!this.isAnchorElement}ngOnDestroy(){this.subscription?.unsubscribe()}updateHref(){let t=this.urlTree;this.href=t!==null&&this.locationStrategy?this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(t)):null;let i=this.href===null?null:Bx(this.href,this.el.nativeElement.tagName.toLowerCase(),"href");this.applyAttributeValue("href",i)}applyAttributeValue(t,i){let r=this.renderer,s=this.el.nativeElement;i!==null?r.setAttribute(s,t,i):r.removeAttribute(s,t)}get urlTree(){return this.commands===null?null:this.router.createUrlTree(this.commands,{relativeTo:this.relativeTo!==void 0?this.relativeTo:this.route,queryParams:this.queryParams,fragment:this.fragment,queryParamsHandling:this.queryParamsHandling,preserveFragment:this.preserveFragment})}static{this.\u0275fac=function(i){return new(i||n)(Ze(Hn),Ze(Yr),$p("tabindex"),Ze(hi),Ze(bn),Ze(hr))}}static{this.\u0275dir=Ur({type:n,selectors:[["","routerLink",""]],hostVars:1,hostBindings:function(i,r){i&1&&ke("click",function(o){return r.onClick(o.button,o.ctrlKey,o.shiftKey,o.altKey,o.metaKey)}),i&2&&ym("target",r.target)},inputs:{target:"target",queryParams:"queryParams",fragment:"fragment",queryParamsHandling:"queryParamsHandling",state:"state",info:"info",relativeTo:"relativeTo",preserveFragment:[ci.HasDecoratorInputTransform,"preserveFragment","preserveFragment",za],skipLocationChange:[ci.HasDecoratorInputTransform,"skipLocationChange","skipLocationChange",za],replaceUrl:[ci.HasDecoratorInputTransform,"replaceUrl","replaceUrl",za],routerLink:"routerLink"},standalone:!0,features:[gm,Mo]})}}return n})(),Yb=(()=>{class n{get isActive(){return this._isActive}constructor(t,i,r,s,o){this.router=t,this.element=i,this.renderer=r,this.cdr=s,this.link=o,this.classes=[],this._isActive=!1,this.routerLinkActiveOptions={exact:!1},this.isActiveChange=new qn,this.routerEventsSubscription=t.events.subscribe(a=>{a instanceof Ci&&this.update()})}ngAfterContentInit(){Be(this.links.changes,Be(null)).pipe(Dr()).subscribe(t=>{this.update(),this.subscribeToEachLinkOnChanges()})}subscribeToEachLinkOnChanges(){this.linkInputChangesSubscription?.unsubscribe();let t=[...this.links.toArray(),this.link].filter(i=>!!i).map(i=>i.onChanges);this.linkInputChangesSubscription=Gt(t).pipe(Dr()).subscribe(i=>{this._isActive!==this.isLinkActive(this.router)(i)&&this.update()})}set routerLinkActive(t){let i=Array.isArray(t)?t:t.split(" ");this.classes=i.filter(r=>!!r)}ngOnChanges(t){this.update()}ngOnDestroy(){this.routerEventsSubscription.unsubscribe(),this.linkInputChangesSubscription?.unsubscribe()}update(){!this.links||!this.router.navigated||queueMicrotask(()=>{let t=this.hasActiveLinks();this.classes.forEach(i=>{t?this.renderer.addClass(this.element.nativeElement,i):this.renderer.removeClass(this.element.nativeElement,i)}),t&&this.ariaCurrentWhenActive!==void 0?this.renderer.setAttribute(this.element.nativeElement,"aria-current",this.ariaCurrentWhenActive.toString()):this.renderer.removeAttribute(this.element.nativeElement,"aria-current"),this._isActive!==t&&(this._isActive=t,this.cdr.markForCheck(),this.isActiveChange.emit(t))})}isLinkActive(t){let i=cR(this.routerLinkActiveOptions)?this.routerLinkActiveOptions:this.routerLinkActiveOptions.exact||!1;return r=>{let s=r.urlTree;return s?t.isActive(s,i):!1}}hasActiveLinks(){let t=this.isLinkActive(this.router);return this.link&&t(this.link)||this.links.some(t)}static{this.\u0275fac=function(i){return new(i||n)(Ze(Hn),Ze(bn),Ze(hi),Ze(Gr),Ze(qu,8))}}static{this.\u0275dir=Ur({type:n,selectors:[["","routerLinkActive",""]],contentQueries:function(i,r,s){if(i&1&&D_(s,qu,5),i&2){let o;yu(o=xu())&&(r.links=o)}},inputs:{routerLinkActiveOptions:"routerLinkActiveOptions",ariaCurrentWhenActive:"ariaCurrentWhenActive",routerLinkActive:"routerLinkActive"},outputs:{isActiveChange:"isActiveChange"},exportAs:["routerLinkActive"],standalone:!0,features:[Mo]})}}return n})();function cR(n){return!!n.paths}var Xu=class{};var uR=(()=>{class n{constructor(t,i,r,s,o){this.router=t,this.injector=r,this.preloadingStrategy=s,this.loader=o}setUpPreloading(){this.subscription=this.router.events.pipe(oi(t=>t instanceof Ci),Ss(()=>this.preload())).subscribe(()=>{})}preload(){return this.processRoutes(this.injector,this.router.config)}ngOnDestroy(){this.subscription&&this.subscription.unsubscribe()}processRoutes(t,i){let r=[];for(let s of i){s.providers&&!s._injector&&(s._injector=mu(s.providers,t,`Route: ${s.path}`));let o=s._injector??t,a=s._loadedInjector??o;(s.loadChildren&&!s._loadedRoutes&&s.canLoad===void 0||s.loadComponent&&!s._loadedComponent)&&r.push(this.preloadConfig(o,s)),(s.children||s._loadedRoutes)&&r.push(this.processRoutes(a,s.children??s._loadedRoutes))}return Gt(r).pipe(Dr())}preloadConfig(t,i){return this.preloadingStrategy.preload(i,()=>{let r;i.loadChildren&&i.canLoad===void 0?r=this.loader.loadChildren(t,i):r=Be(null);let s=r.pipe(Jt(o=>o===null?Be(void 0):(i._loadedRoutes=o.routes,i._loadedInjector=o.injector,this.processRoutes(o.injector??t,o.routes))));if(i.loadComponent&&!i._loadedComponent){let o=this.loader.loadComponent(i);return Gt([s,o]).pipe(Dr())}else return s})}static{this.\u0275fac=function(i){return new(i||n)(Xe(Hn),Xe(Cu),Xe(Un),Xe(Xu),Xe(wg))}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})(),Zb=new ot(""),dR=(()=>{class n{constructor(t,i,r,s,o={}){this.urlSerializer=t,this.transitions=i,this.viewportScroller=r,this.zone=s,this.options=o,this.lastId=0,this.lastSource="imperative",this.restoredId=0,this.store={},this.environmentInjector=ve(Un),o.scrollPositionRestoration||="disabled",o.anchorScrolling||="disabled"}init(){this.options.scrollPositionRestoration!=="disabled"&&this.viewportScroller.setHistoryScrollRestoration("manual"),this.routerEventsSubscription=this.createScrollEvents(),this.scrollEventsSubscription=this.consumeScrollEvents()}createScrollEvents(){return this.transitions.events.subscribe(t=>{t instanceof ko?(this.store[this.lastId]=this.viewportScroller.getScrollPosition(),this.lastSource=t.navigationTrigger,this.restoredId=t.restoredState?t.restoredState.navigationId:0):t instanceof Ci?(this.lastId=t.id,this.scheduleScrollEvent(t,this.urlSerializer.parse(t.urlAfterRedirects).fragment)):t instanceof Xr&&t.code===Bu.IgnoredSameUrlNavigation&&(this.lastSource=void 0,this.restoredId=0,this.scheduleScrollEvent(t,this.urlSerializer.parse(t.url).fragment))})}consumeScrollEvents(){return this.transitions.events.subscribe(t=>{t instanceof Hu&&(t.position?this.options.scrollPositionRestoration==="top"?this.viewportScroller.scrollToPosition([0,0]):this.options.scrollPositionRestoration==="enabled"&&this.viewportScroller.scrollToPosition(t.position):t.anchor&&this.options.anchorScrolling==="enabled"?this.viewportScroller.scrollToAnchor(t.anchor):this.options.scrollPositionRestoration!=="disabled"&&this.viewportScroller.scrollToPosition([0,0]))})}scheduleScrollEvent(t,i){this.zone.runOutsideAngular(()=>ys(this,null,function*(){yield new Promise(r=>{setTimeout(()=>{r()}),pu(()=>{r()},{injector:this.environmentInjector})}),this.zone.run(()=>{this.transitions.events.next(new Hu(t,this.lastSource==="popstate"?this.store[this.restoredId]:null,i))})}))}ngOnDestroy(){this.routerEventsSubscription?.unsubscribe(),this.scrollEventsSubscription?.unsubscribe()}static{this.\u0275fac=function(i){Jx()}}static{this.\u0275prov=He({token:n,factory:n.\u0275fac})}}return n})();function Jb(n,...e){return eu([{provide:ol,multi:!0,useValue:n},[],{provide:Yr,useFactory:Kb,deps:[Hn]},{provide:Eu,multi:!0,useFactory:Qb},e.map(t=>t.\u0275providers)])}function Kb(n){return n.routerState.root}function hl(n,e){return{\u0275kind:n,\u0275providers:e}}function Qb(){let n=ve(Hr);return e=>{let t=n.get(Ha);if(e!==t.components[0])return;let i=n.get(Hn),r=n.get(eS);n.get(Tg)===1&&i.initialNavigation(),n.get(tS,null,st.Optional)?.setUpPreloading(),n.get(Zb,null,st.Optional)?.init(),i.resetRootComponentType(t.componentTypes[0]),r.closed||(r.next(),r.complete(),r.unsubscribe())}}var eS=new ot("",{factory:()=>new yn}),Tg=new ot("",{providedIn:"root",factory:()=>1});function fR(){return hl(2,[{provide:Tg,useValue:0},{provide:wu,multi:!0,deps:[Hr],useFactory:e=>{let t=e.get(Y_,Promise.resolve());return()=>t.then(()=>new Promise(i=>{let r=e.get(Hn),s=e.get(eS);Xb(r,()=>{i(!0)}),e.get(Cg).afterPreactivation=()=>(i(!0),s.closed?Be(void 0):s),r.initialNavigation()}))}}])}function hR(){return hl(3,[{provide:wu,multi:!0,useFactory:()=>{let e=ve(Hn);return()=>{e.setUpLocationChangeListener()}}},{provide:Tg,useValue:2}])}var tS=new ot("");function pR(n){return hl(0,[{provide:tS,useExisting:uR},{provide:Xu,useExisting:n}])}function mR(){return hl(8,[pb,{provide:Yu,useExisting:pb}])}function gR(n){let e=[{provide:jb,useValue:KD},{provide:$b,useValue:Ae({skipNextTransition:!!n?.skipInitialTransition},n)}];return hl(9,e)}var gb=new ot("ROUTER_FORROOT_GUARD"),vR=[Io,{provide:ll,useClass:Ka},Hn,cl,{provide:Yr,useFactory:Kb,deps:[Hn]},wg,[]],Jr=(()=>{class n{constructor(t){}static forRoot(t,i){return{ngModule:n,providers:[vR,[],{provide:ol,multi:!0,useValue:t},{provide:gb,useFactory:bR,deps:[[Hn,new Qc,new Tp]]},{provide:fl,useValue:i||{}},i?.useHash?xR():_R(),yR(),i?.preloadingStrategy?pR(i.preloadingStrategy).\u0275providers:[],i?.initialNavigation?SR(i):[],i?.bindToComponentInputs?mR().\u0275providers:[],i?.enableViewTransitions?gR().\u0275providers:[],MR()]}}static forChild(t){return{ngModule:n,providers:[{provide:ol,multi:!0,useValue:t}]}}static{this.\u0275fac=function(i){return new(i||n)(Xe(gb,8))}}static{this.\u0275mod=Oa({type:n})}static{this.\u0275inj=Pa({})}}return n})();function yR(){return{provide:Zb,useFactory:()=>{let n=ve(eb),e=ve(kt),t=ve(fl),i=ve(Cg),r=ve(ll);return t.scrollOffset&&n.setOffset(t.scrollOffset),new dR(r,i,n,e,t)}}}function xR(){return{provide:hr,useClass:J_}}function _R(){return{provide:hr,useClass:Nm}}function bR(n){return"guarded"}function SR(n){return[n.initialNavigation==="disabled"?hR().\u0275providers:[],n.initialNavigation==="enabledBlocking"?fR().\u0275providers:[]]}var vb=new ot("");function MR(){return[{provide:vb,useFactory:Qb},{provide:Eu,multi:!0,useExisting:vb}]}function Ag(){return Ag=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i])}return n},Ag.apply(this,arguments)}var wR={strings:["These are the default values...","You know what you should do?","Use your own!","Have a great day!"],stringsElement:null,typeSpeed:0,startDelay:0,backSpeed:0,smartBackspace:!0,shuffle:!1,backDelay:700,fadeOut:!1,fadeOutClass:"typed-fade-out",fadeOutDelay:500,loop:!1,loopCount:1/0,showCursor:!0,cursorChar:"|",autoInsertCss:!0,attr:null,bindInputFocusEvents:!1,contentType:"html",onBegin:function(n){},onComplete:function(n){},preStringTyped:function(n,e){},onStringTyped:function(n,e){},onLastStringBackspaced:function(n){},onTypingPaused:function(n,e){},onTypingResumed:function(n,e){},onReset:function(n){},onStop:function(n,e){},onStart:function(n,e){},onDestroy:function(n){}},ER=new(function(){function n(){}var e=n.prototype;return e.load=function(t,i,r){if(t.el=typeof r=="string"?document.querySelector(r):r,t.options=Ag({},wR,i),t.isInput=t.el.tagName.toLowerCase()==="input",t.attr=t.options.attr,t.bindInputFocusEvents=t.options.bindInputFocusEvents,t.showCursor=!t.isInput&&t.options.showCursor,t.cursorChar=t.options.cursorChar,t.cursorBlinking=!0,t.elContent=t.attr?t.el.getAttribute(t.attr):t.el.textContent,t.contentType=t.options.contentType,t.typeSpeed=t.options.typeSpeed,t.startDelay=t.options.startDelay,t.backSpeed=t.options.backSpeed,t.smartBackspace=t.options.smartBackspace,t.backDelay=t.options.backDelay,t.fadeOut=t.options.fadeOut,t.fadeOutClass=t.options.fadeOutClass,t.fadeOutDelay=t.options.fadeOutDelay,t.isPaused=!1,t.strings=t.options.strings.map(function(c){return c.trim()}),t.stringsElement=typeof t.options.stringsElement=="string"?document.querySelector(t.options.stringsElement):t.options.stringsElement,t.stringsElement){t.strings=[],t.stringsElement.style.cssText="clip: rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px;";var s=Array.prototype.slice.apply(t.stringsElement.children),o=s.length;if(o)for(var a=0;a<o;a+=1)t.strings.push(s[a].innerHTML.trim())}for(var l in t.strPos=0,t.currentElContent=this.getCurrentElContent(t),t.currentElContent&&t.currentElContent.length>0&&(t.strPos=t.currentElContent.length-1,t.strings.unshift(t.currentElContent)),t.sequence=[],t.strings)t.sequence[l]=l;t.arrayPos=0,t.stopNum=0,t.loop=t.options.loop,t.loopCount=t.options.loopCount,t.curLoop=0,t.shuffle=t.options.shuffle,t.pause={status:!1,typewrite:!0,curString:"",curStrPos:0},t.typingComplete=!1,t.autoInsertCss=t.options.autoInsertCss,t.autoInsertCss&&(this.appendCursorAnimationCss(t),this.appendFadeOutAnimationCss(t))},e.getCurrentElContent=function(t){return t.attr?t.el.getAttribute(t.attr):t.isInput?t.el.value:t.contentType==="html"?t.el.innerHTML:t.el.textContent},e.appendCursorAnimationCss=function(t){var i="data-typed-js-cursor-css";if(t.showCursor&&!document.querySelector("["+i+"]")){var r=document.createElement("style");r.setAttribute(i,"true"),r.innerHTML=`
        .typed-cursor{
          opacity: 1;
        }
        .typed-cursor.typed-cursor--blink{
          animation: typedjsBlink 0.7s infinite;
          -webkit-animation: typedjsBlink 0.7s infinite;
                  animation: typedjsBlink 0.7s infinite;
        }
        @keyframes typedjsBlink{
          50% { opacity: 0.0; }
        }
        @-webkit-keyframes typedjsBlink{
          0% { opacity: 1; }
          50% { opacity: 0.0; }
          100% { opacity: 1; }
        }
      `,document.body.appendChild(r)}},e.appendFadeOutAnimationCss=function(t){var i="data-typed-fadeout-js-css";if(t.fadeOut&&!document.querySelector("["+i+"]")){var r=document.createElement("style");r.setAttribute(i,"true"),r.innerHTML=`
        .typed-fade-out{
          opacity: 0;
          transition: opacity .25s;
        }
        .typed-cursor.typed-cursor--blink.typed-fade-out{
          -webkit-animation: 0;
          animation: 0;
        }
      `,document.body.appendChild(r)}},n}()),iS=new(function(){function n(){}var e=n.prototype;return e.typeHtmlChars=function(t,i,r){if(r.contentType!=="html")return i;var s=t.substring(i).charAt(0);if(s==="<"||s==="&"){var o;for(o=s==="<"?">":";";t.substring(i+1).charAt(0)!==o&&!(1+ ++i>t.length););i++}return i},e.backSpaceHtmlChars=function(t,i,r){if(r.contentType!=="html")return i;var s=t.substring(i).charAt(0);if(s===">"||s===";"){var o;for(o=s===">"?"<":"&";t.substring(i-1).charAt(0)!==o&&!(--i<0););i--}return i},n}()),rS=function(){function n(t,i){ER.load(this,i,t),this.begin()}var e=n.prototype;return e.toggle=function(){this.pause.status?this.start():this.stop()},e.stop=function(){this.typingComplete||this.pause.status||(this.toggleBlinking(!0),this.pause.status=!0,this.options.onStop(this.arrayPos,this))},e.start=function(){this.typingComplete||this.pause.status&&(this.pause.status=!1,this.pause.typewrite?this.typewrite(this.pause.curString,this.pause.curStrPos):this.backspace(this.pause.curString,this.pause.curStrPos),this.options.onStart(this.arrayPos,this))},e.destroy=function(){this.reset(!1),this.options.onDestroy(this)},e.reset=function(t){t===void 0&&(t=!0),clearInterval(this.timeout),this.replaceText(""),this.cursor&&this.cursor.parentNode&&(this.cursor.parentNode.removeChild(this.cursor),this.cursor=null),this.strPos=0,this.arrayPos=0,this.curLoop=0,t&&(this.insertCursor(),this.options.onReset(this),this.begin())},e.begin=function(){var t=this;this.options.onBegin(this),this.typingComplete=!1,this.shuffleStringsIfNeeded(this),this.insertCursor(),this.bindInputFocusEvents&&this.bindFocusEvents(),this.timeout=setTimeout(function(){t.strPos===0?t.typewrite(t.strings[t.sequence[t.arrayPos]],t.strPos):t.backspace(t.strings[t.sequence[t.arrayPos]],t.strPos)},this.startDelay)},e.typewrite=function(t,i){var r=this;this.fadeOut&&this.el.classList.contains(this.fadeOutClass)&&(this.el.classList.remove(this.fadeOutClass),this.cursor&&this.cursor.classList.remove(this.fadeOutClass));var s=this.humanizer(this.typeSpeed),o=1;this.pause.status!==!0?this.timeout=setTimeout(function(){i=iS.typeHtmlChars(t,i,r);var a=0,l=t.substring(i);if(l.charAt(0)==="^"&&/^\^\d+/.test(l)){var c=1;c+=(l=/\d+/.exec(l)[0]).length,a=parseInt(l),r.temporaryPause=!0,r.options.onTypingPaused(r.arrayPos,r),t=t.substring(0,i)+t.substring(i+c),r.toggleBlinking(!0)}if(l.charAt(0)==="`"){for(;t.substring(i+o).charAt(0)!=="`"&&(o++,!(i+o>t.length)););var u=t.substring(0,i),d=t.substring(u.length+1,i+o),f=t.substring(i+o+1);t=u+d+f,o--}r.timeout=setTimeout(function(){r.toggleBlinking(!1),i>=t.length?r.doneTyping(t,i):r.keepTyping(t,i,o),r.temporaryPause&&(r.temporaryPause=!1,r.options.onTypingResumed(r.arrayPos,r))},a)},s):this.setPauseStatus(t,i,!0)},e.keepTyping=function(t,i,r){i===0&&(this.toggleBlinking(!1),this.options.preStringTyped(this.arrayPos,this));var s=t.substring(0,i+=r);this.replaceText(s),this.typewrite(t,i)},e.doneTyping=function(t,i){var r=this;this.options.onStringTyped(this.arrayPos,this),this.toggleBlinking(!0),this.arrayPos===this.strings.length-1&&(this.complete(),this.loop===!1||this.curLoop===this.loopCount)||(this.timeout=setTimeout(function(){r.backspace(t,i)},this.backDelay))},e.backspace=function(t,i){var r=this;if(this.pause.status!==!0){if(this.fadeOut)return this.initFadeOut();this.toggleBlinking(!1);var s=this.humanizer(this.backSpeed);this.timeout=setTimeout(function(){i=iS.backSpaceHtmlChars(t,i,r);var o=t.substring(0,i);if(r.replaceText(o),r.smartBackspace){var a=r.strings[r.arrayPos+1];r.stopNum=a&&o===a.substring(0,i)?i:0}i>r.stopNum?(i--,r.backspace(t,i)):i<=r.stopNum&&(r.arrayPos++,r.arrayPos===r.strings.length?(r.arrayPos=0,r.options.onLastStringBackspaced(),r.shuffleStringsIfNeeded(),r.begin()):r.typewrite(r.strings[r.sequence[r.arrayPos]],i))},s)}else this.setPauseStatus(t,i,!1)},e.complete=function(){this.options.onComplete(this),this.loop?this.curLoop++:this.typingComplete=!0},e.setPauseStatus=function(t,i,r){this.pause.typewrite=r,this.pause.curString=t,this.pause.curStrPos=i},e.toggleBlinking=function(t){this.cursor&&(this.pause.status||this.cursorBlinking!==t&&(this.cursorBlinking=t,t?this.cursor.classList.add("typed-cursor--blink"):this.cursor.classList.remove("typed-cursor--blink")))},e.humanizer=function(t){return Math.round(Math.random()*t/2)+t},e.shuffleStringsIfNeeded=function(){this.shuffle&&(this.sequence=this.sequence.sort(function(){return Math.random()-.5}))},e.initFadeOut=function(){var t=this;return this.el.className+=" "+this.fadeOutClass,this.cursor&&(this.cursor.className+=" "+this.fadeOutClass),setTimeout(function(){t.arrayPos++,t.replaceText(""),t.strings.length>t.arrayPos?t.typewrite(t.strings[t.sequence[t.arrayPos]],0):(t.typewrite(t.strings[0],0),t.arrayPos=0)},this.fadeOutDelay)},e.replaceText=function(t){this.attr?this.el.setAttribute(this.attr,t):this.isInput?this.el.value=t:this.contentType==="html"?this.el.innerHTML=t:this.el.textContent=t},e.bindFocusEvents=function(){var t=this;this.isInput&&(this.el.addEventListener("focus",function(i){t.stop()}),this.el.addEventListener("blur",function(i){t.el.value&&t.el.value.length!==0||t.start()}))},e.insertCursor=function(){this.showCursor&&(this.cursor||(this.cursor=document.createElement("span"),this.cursor.className="typed-cursor",this.cursor.setAttribute("aria-hidden",!0),this.cursor.innerHTML=this.cursorChar,this.el.parentNode&&this.el.parentNode.insertBefore(this.cursor,this.el.nextSibling)))},n}();function CR(n,e){if(n&1){let t=Ei();M(0,"div",91),ke("click",function(){let r=Dn(t).$implicit,s=Sn(2);return Rn(s.openDocs(r.url))}),q(1,"img",92),M(2,"span",93),P(3),T()()}if(n&2){let t=e.$implicit;X(),Pe("src",t.icon,Yn)("alt",t.name),X(2),Je(" ",t.name," ")}}function TR(n,e){if(n&1&&(M(0,"div",85)(1,"div",86),P(2),T(),M(3,"h3",87),q(4,"span",88),P(5),T(),M(6,"div",89),vt(7,CR,4,3,"div",90),T()()),n&2){let t=e.$implicit,i=e.index;X(2),Je(" MOD_",i+1," "),X(3),Je(" ",t.title," "),X(2),Pe("ngForOf",t.skills)}}var sS=(()=>{class n{constructor(t,i,r,s){this.el=t,this.renderer=i,this.router=r,this.platformId=s,this.activeSection="home",this.scrollPercent=0,this.marqueeSkills=["Docker","CI/CD","GitLab CI","GitHub Actions","Terraform","Kubernetes","Python","AWS Security","OWASP Top 10","Linux Hardening","Nmap","Burp Suite","SonarQube","Vulnerability Scanners","Git"],this.skills=[{title:"Security Automation & Tools",skills:[{name:"OWASP",icon:"assets/icons/cybersecurity/owasp.svg",url:"https://owasp.org"},{name:"Nmap",icon:"assets/icons/cybersecurity/nmap.svg",url:"https://nmap.org"},{name:"Burp Suite",icon:"assets/icons/cybersecurity/burpsuite.svg",url:"https://portswigger.net/burp"},{name:"Kali Linux",icon:"assets/icons/cybersecurity/kalilinux.svg",url:"https://www.kali.org/docs/"},{name:"Wireshark",icon:"assets/icons/cybersecurity/wireshark.svg",url:"https://www.wireshark.org"},{name:"Metasploit",icon:"assets/icons/cybersecurity/metasploit.svg",url:"https://www.metasploit.com"}]},{title:"CI/CD & DevSecOps Infrastructure",skills:[{name:"Docker",icon:"assets/icons/tools-workflow/docker.svg",url:"https://docs.docker.com"},{name:"Linux",icon:"assets/icons/tools-workflow/linux.svg",url:"https://docs.kernel.org"},{name:"Git",icon:"assets/icons/tools-workflow/git.svg",url:"https://git-scm.com/doc"},{name:"GitHub",icon:"assets/icons/tools-workflow/github.svg",url:"https://docs.github.com"},{name:"VS Code",icon:"assets/icons/tools-workflow/vscode.svg",url:"https://code.visualstudio.com/docs"},{name:"Postman",icon:"assets/icons/tools-workflow/postman.svg",url:"https://learning.postman.com"}]},{title:"Secure Web Development",skills:[{name:"Angular",icon:"assets/icons/web-dev/angular.svg",url:"https://angular.dev"},{name:"React",icon:"assets/icons/web-dev/react.svg",url:"https://react.dev"},{name:"Node.js",icon:"assets/icons/web-dev/nodedotjs.svg",url:"https://nodejs.org"},{name:"Tailwind",icon:"assets/icons/web-dev/tailwindcss.svg",url:"https://tailwindcss.com"},{name:"JavaScript",icon:"assets/icons/web-dev/javascript.svg",url:"https://developer.mozilla.org/docs/Web/JavaScript"},{name:"TypeScript",icon:"assets/icons/web-dev/typescript.svg",url:"https://www.typescriptlang.org"}]},{title:"Scripting & Databases",skills:[{name:"Python",icon:"assets/icons/ai-ml/python.svg",url:"https://docs.python.org/3/"},{name:"Java",icon:"assets/icons/languages/java.svg",url:"https://dev.java"},{name:"MySQL",icon:"assets/icons/languages/mysql.svg",url:"https://dev.mysql.com/doc/"},{name:"MongoDB",icon:"assets/icons/languages/mongodb.svg",url:"https://www.mongodb.com/docs/"},{name:"C++",icon:"assets/icons/languages/cplusplus.svg",url:"https://isocpp.org"},{name:"Firebase",icon:"assets/icons/languages/firebase.svg",url:"https://firebase.google.com/docs"}]}]}onWindowScroll(){if(!Ut(this.platformId))return;let t=window.scrollY||document.documentElement.scrollTop,i=document.documentElement.scrollHeight-window.innerHeight;this.scrollPercent=i>0?t/i*100:0;let r=["home","skills","contact"],s=window.scrollY+window.innerHeight/3;for(let o of r){let a=document.getElementById(o);a&&a.offsetTop<=s&&a.offsetTop+a.offsetHeight>s&&(this.activeSection=o)}}ngOnInit(){Ut(this.platformId)&&this.loadAssets()}ngAfterViewInit(){Ut(this.platformId)&&(this.typed=new rS(".type",{strings:["DevSecOps Engineer","Full Stack Developer","Cybersecurity Specialist","Automation Architect","The Guy Who Does It Better"],typeSpeed:70,backSpeed:40,loop:!0,backDelay:1500}),setTimeout(()=>{this.el.nativeElement.querySelectorAll(".hero-item").forEach((t,i)=>setTimeout(()=>t.classList.add("visible"),i*80))},50),this.initSkillObserver(),this.initRevealObserver())}ngOnDestroy(){this.typed?.destroy(),this.skillObserver?.disconnect(),this.revealObserver?.disconnect()}openDocs(t){t&&window.open(t,"_blank","noopener noreferrer")}navigateTo(t){Ut(this.platformId)&&this.router.navigate([t])}downloadResume(){Ut(this.platformId)&&window.open("assets/resume.pdf","_blank")}scrollToSection(t){Ut(this.platformId)&&(document.getElementById(t)?.scrollIntoView({behavior:"smooth",block:"start"}),this.activeSection=t)}initSkillObserver(){this.skillObserver=new IntersectionObserver(t=>t.forEach(i=>{i.isIntersecting&&i.target.classList.add("visible")}),{threshold:.1}),this.el.nativeElement.querySelectorAll(".skill-card").forEach(t=>this.skillObserver.observe(t))}initRevealObserver(){this.revealObserver=new IntersectionObserver(t=>t.forEach(i=>{i.target.classList.toggle("visible",i.isIntersecting)}),{threshold:.08}),this.el.nativeElement.querySelectorAll(".reveal").forEach(t=>this.revealObserver.observe(t))}loadAssets(){let t="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";if(!document.querySelector(`link[href="${t}"]`)){let i=this.renderer.createElement("link");this.renderer.setAttribute(i,"rel","stylesheet"),this.renderer.setAttribute(i,"href",t),this.renderer.appendChild(document.head,i)}}static{this.\u0275fac=function(i){return new(i||n)(Ze(bn),Ze(hi),Ze(Hn),Ze(an))}}static{this.\u0275cmp=xn({type:n,selectors:[["app-home"]],hostBindings:function(i,r){i&1&&ke("scroll",function(){return r.onWindowScroll()},!1,Gi)},standalone:!0,features:[Mn],decls:169,vars:9,consts:[[1,"fixed","left-6","top-1/2","-translate-y-1/2","z-50","hidden","lg:flex","flex-col","gap-6","font-mono","text-[10px]","select-none"],[1,"absolute","left-[3px]","top-2","bottom-2","w-px","bg-white/[0.04]","overflow-hidden"],[1,"bg-red-600","w-full","transition-all","duration-200"],[1,"step-item","group","flex","items-center","gap-4","text-white/20","hover:text-white","transition-all","duration-300",3,"click"],[1,"step-dot","w-2","h-2","rounded-full","border","border-white/20","bg-transparent","group-hover:border-red-500","transition-all","duration-300"],[1,"tracking-widest"],[1,"fixed","right-6","bottom-8","z-40","hidden","xl:flex","flex-col","gap-1","font-mono","text-[9px]","text-white/20","text-right","select-none","pointer-events-none"],[1,"text-red-500/60","font-bold"],[1,"text-red-500/40"],[1,"relative","z-10","w-full","overflow-hidden","bg-transparent"],["id","home",1,"min-h-screen","relative","flex","items-center","px-6","md:px-24","py-28","border-b","border-white/[0.02]"],[1,"max-w-5xl","mx-auto","w-full"],[1,"grid","grid-cols-1","lg:grid-cols-12","gap-12","items-center"],[1,"lg:col-span-8","flex","flex-col","gap-6"],[1,"hero-item","opacity-0","-translate-x-8","transition-all","duration-700"],[1,"font-mono","text-[10px]","tracking-[0.2em]","text-red-500","uppercase","border","border-red-500/30","px-3","py-1","bg-red-500/5","rounded"],[1,"hero-item","opacity-0","-translate-x-8","transition-all","duration-700",2,"transition-delay","0.1s"],[1,"font-black","text-white","leading-[0.9]","tracking-tight","uppercase",2,"font-size","clamp(3.5rem, 8vw, 6.2rem)"],[1,"outlined-text","text-transparent",2,"-webkit-text-stroke","1.5px rgba(255,255,255,0.85)"],[1,"hero-item","opacity-0","-translate-x-8","transition-all","duration-700","font-mono","text-sm","tracking-tight","text-white/95",2,"transition-delay","0.2s"],[1,"text-red-500","font-bold"],[1,"type","text-white"],[1,"hero-item","opacity-0","-translate-x-8","transition-all","duration-700",2,"transition-delay","0.3s"],[1,"text-white/85","text-[14px]","leading-relaxed","max-w-lg"],[1,"hero-item","opacity-0","-translate-x-8","transition-all","duration-700","flex","flex-wrap","gap-3","mt-4",2,"transition-delay","0.4s"],[1,"btn-primary",3,"click"],[1,"fas","fa-arrow-down","text-xs"],[1,"btn-ghost",3,"click"],[1,"fas","fa-folder","text-xs"],[1,"fas","fa-user","text-xs"],[1,"lg:col-span-4","hero-item","opacity-0","translate-x-8","transition-all","duration-700","hidden","lg:block",2,"transition-delay","0.2s"],[1,"rounded-xl","border","border-white/[0.05]","bg-black/60","backdrop-blur","p-5","font-mono","text-[9px]","text-white/95","flex","flex-col","gap-2.5"],[1,"flex","items-center","justify-between","border-b","border-white/[0.06]","pb-2"],[1,"text-red-500","font-semibold","uppercase"],[1,"w-1.5","h-1.5","rounded-full","bg-red-500","animate-pulse"],[1,"text-[8px]","text-red-500/60","mt-3","pt-2","border-t","border-white/[0.05]"],[1,"absolute","bottom-10","left-1/2","-translate-x-1/2","flex","flex-col","items-center","gap-1.5","opacity-30","select-none"],[1,"text-white/95","text-[9px]","font-mono","tracking-[0.25em]","uppercase"],[1,"w-px","h-10","bg-gradient-to-b","from-white/40","to-transparent"],["id","skills",1,"min-h-screen","flex","items-center","px-6","md:px-24","py-28","border-b","border-white/[0.02]"],[1,"reveal","opacity-0","translate-y-8","transition-all","duration-700"],[1,"eyebrow"],[1,"fas","fa-bolt","text-xs"],[1,"inline-block","w-8","h-px","bg-red-500/60"],[1,"font-bold","text-white","tracking-tight","uppercase","mb-4",2,"font-size","clamp(2.2rem, 6vw, 3.8rem)"],[1,"text-white/75","text-[13px]","font-light","max-w-lg","mb-12","leading-relaxed"],[1,"grid","grid-cols-1","md:grid-cols-2","gap-6","reveal","opacity-0","translate-y-8","transition-all","duration-700",2,"transition-delay","0.1s"],["class","skill-card rounded-xl border border-white/[0.04] bg-neutral-950/45 p-6 hover:border-red-500/30 transition-all duration-300 relative group cursor-default",4,"ngFor","ngForOf"],[1,"reveal","opacity-0","translate-y-8","transition-all","duration-700","mt-16","grid","grid-cols-1","md:grid-cols-2","gap-5",2,"transition-delay","0.2s"],[1,"group","rounded-xl","border","border-white/[0.05]","bg-neutral-950/45","p-7","hover:border-red-500/40","transition-all","duration-300","cursor-pointer","hover:-translate-y-1","relative","overflow-hidden",3,"click"],[1,"absolute","-bottom-8","-right-8","w-32","h-32","bg-red-600/5","rounded-full","blur-2xl","group-hover:bg-red-600/10","transition-all","duration-500","pointer-events-none"],[1,"relative"],[1,"font-mono","text-[9px]","tracking-[0.2em]","text-red-500","uppercase","mb-3"],[1,"text-white","font-bold","text-xl","tracking-tight","mb-2","uppercase"],[1,"text-white/70","text-[12px]","leading-relaxed","mb-5"],[1,"inline-flex","items-center","gap-2","font-mono","text-[10px]","text-red-500","group-hover:gap-3","transition-all","duration-200"],[1,"fas","fa-arrow-right","text-[9px]"],["id","contact",1,"min-h-screen","flex","items-center","px-6","md:px-24","py-28"],[1,"reveal","opacity-0","translate-y-8","transition-all","duration-700","mb-10"],[1,"fas","fa-envelope","text-xs"],[1,"text-white/95","text-[13px]","font-light","max-w-lg","leading-relaxed"],[1,"reveal","opacity-0","translate-y-8","transition-all","duration-700","rounded-xl","border","border-white/[0.05]","bg-neutral-950/45","p-8","md:p-12","relative","overflow-hidden",2,"transition-delay","0.1s"],[1,"absolute","-bottom-24","-right-24","w-64","h-64","bg-red-600/5","rounded-full","blur-3xl","pointer-events-none","select-none"],["action","https://formspree.io/f/xnnakrka","method","POST",1,"relative","z-10","flex","flex-col","gap-6"],[1,"grid","grid-cols-1","md:grid-cols-2","gap-5"],[1,"flex","flex-col","gap-2"],[1,"font-mono","text-[9px]","uppercase","tracking-[0.2em]","text-white/95"],["type","text","name","name","placeholder","John Doe","required","",1,"bg-black/55","border-b","border-white/10","hover:border-white/20","focus:border-red-500","px-1","py-3","text-white","text-[13px]","placeholder-white/25","outline-none","transition-all"],["type","email","name","email","placeholder","john@domain.com","required","",1,"bg-black/55","border-b","border-white/10","hover:border-white/20","focus:border-red-500","px-1","py-3","text-white","text-[13px]","placeholder-white/25","outline-none","transition-all"],[1,"flex","flex-col","gap-2","md:col-span-2"],["name","message","rows","4","placeholder","Enter your message...","required","",1,"bg-black/55","border-b","border-white/10","hover:border-white/20","focus:border-red-500","px-1","py-3","text-white","text-[13px]","placeholder-white/25","outline-none","transition-all","resize-none"],[1,"flex","flex-col","sm:flex-row","sm:items-center","justify-between","gap-5","border-t","border-white/[0.04]","pt-6","mt-2"],[1,"flex","items-center","gap-3"],["href","https://github.com/melvinjames1","target","_blank",1,"w-8","h-8","rounded","border","border-white/[0.06]","hover:border-red-500/50","flex","items-center","justify-center","text-white/95","hover:text-red-400","transition-all","hover:-translate-y-0.5"],[1,"fab","fa-github","text-xs"],["href","https://www.linkedin.com/in/melvin-james-mj/","target","_blank",1,"w-8","h-8","rounded","border","border-white/[0.06]","hover:border-red-500/50","flex","items-center","justify-center","text-white/95","hover:text-red-400","transition-all","hover:-translate-y-0.5"],[1,"fab","fa-linkedin","text-xs"],["href","mailto:melvin.mj576@gmail.com",1,"w-8","h-8","rounded","border","border-white/[0.06]","hover:border-red-500/50","flex","items-center","justify-center","text-white/95","hover:text-red-400","transition-all","hover:-translate-y-0.5"],["type","button",1,"btn-ghost","text-[10px]","font-mono","ml-2",3,"click"],[1,"fas","fa-scroll","text-xs"],["type","submit",1,"btn-primary","font-mono","text-[10px]"],[1,"fas","fa-paper-plane","text-xs"],[1,"flex","justify-center","mt-12"],["title","Back to top",1,"w-10","h-10","rounded-full","border","border-white/10","hover:border-red-600","bg-neutral-950","text-white/95","hover:text-red-400","flex","items-center","justify-center","transition-all","hover:-translate-y-1",3,"click"],[1,"fas","fa-arrow-up","text-xs"],[1,"skill-card","rounded-xl","border","border-white/[0.04]","bg-neutral-950/45","p-6","hover:border-red-500/30","transition-all","duration-300","relative","group","cursor-default"],[1,"absolute","top-0","right-0","p-3","font-mono","text-[9px]","text-white/95","tracking-widest","group-hover:text-red-500/20","transition-all"],[1,"text-[10px]","font-bold","tracking-[0.15em]","uppercase","text-white/95","mb-6","flex","items-center","gap-2"],[1,"w-1.5","h-1.5","rounded-full","bg-red-500","flex-shrink-0"],[1,"grid","grid-cols-2","sm:grid-cols-3","gap-3"],["class","flex items-center gap-2 px-3 py-2 bg-white/[0.02] border border-white/[0.04] rounded-lg hover:border-white/15 hover:bg-white/[0.04] cursor-pointer transition-all duration-150",3,"click",4,"ngFor","ngForOf"],[1,"flex","items-center","gap-2","px-3","py-2","bg-white/[0.02]","border","border-white/[0.04]","rounded-lg","hover:border-white/15","hover:bg-white/[0.04]","cursor-pointer","transition-all","duration-150",3,"click"],["width","13","height","13",1,"opacity-55","group-hover:opacity-100","object-contain",3,"src","alt"],[1,"text-white/95","text-[11px]","font-medium","transition-all","group-hover:text-white/95","select-none"]],template:function(i,r){i&1&&(M(0,"div",0)(1,"div",1),q(2,"div",2),T(),M(3,"button",3),ke("click",function(){return r.scrollToSection("home")}),q(4,"span",4),M(5,"span",5),P(6,"01 // SYS_INIT"),T()(),M(7,"button",3),ke("click",function(){return r.scrollToSection("skills")}),q(8,"span",4),M(9,"span",5),P(10,"02 // HARDWARE_SPECS"),T()(),M(11,"button",3),ke("click",function(){return r.scrollToSection("contact")}),q(12,"span",4),M(13,"span",5),P(14,"03 // COMS_STATION"),T()()(),M(15,"div",6)(16,"div"),P(17,"SYSTEM_CORE: "),M(18,"span",7),P(19,"ONLINE"),T()(),M(20,"div"),P(21,"SECTOR: DEVS_OPS_SEC"),T(),M(22,"div"),P(23,"ACTIVE_NODES: 90 / 90"),T(),M(24,"div"),P(25,"FRAME_DELTA: 16.6ms // 60 FPS"),T(),M(26,"div"),P(27,"GLSL_RENDER: WEBGL_2.0_ENABLED"),T(),M(28,"div",8),P(29,"OPERATOR: MELVIN_JAMES"),T()(),M(30,"div",9)(31,"section",10)(32,"div",11)(33,"div",12)(34,"div",13)(35,"div",14)(36,"span",15),P(37," SYSTEM INITIALIZED // SEC_CORE "),T()(),M(38,"div",16)(39,"h1",17),P(40," MELVIN"),q(41,"br"),M(42,"span",18),P(43,"JAMES"),T()()(),M(44,"div",19)(45,"span",20),P(46,'$ locate role --filter="'),T(),q(47,"span",21),M(48,"span",20),P(49,'"'),T()(),M(50,"div",22)(51,"p",23),P(52," Full Stack & DevSecOps developer based in Bangalore. I write bulletproof security tools, harden CI/CD pipelines, and build production apps that run flawlessly on the first try. "),T()(),M(53,"div",24)(54,"button",25),ke("click",function(){return r.scrollToSection("skills")}),P(55," SEE MY STACK "),q(56,"i",26),T(),M(57,"button",27),ke("click",function(){return r.navigateTo("/projects")}),P(58," PROJECTS "),q(59,"i",28),T(),M(60,"button",27),ke("click",function(){return r.navigateTo("/about")}),P(61," ABOUT ME "),q(62,"i",29),T()()(),M(63,"div",30)(64,"div",31)(65,"div",32)(66,"span",33),P(67,"TELEMETRY_LOGS"),T(),q(68,"span",34),T(),M(69,"div"),P(70,"[OK] CODE_QUALITY: FLAWLESS"),T(),M(71,"div"),P(72,"[OK] PIPELINES: HARDENED"),T(),M(73,"div"),P(74,"[OK] BUILD_STATUS: PASSING"),T(),M(75,"div"),P(76,"[OK] SECURITY_AUDIT: CLEAN"),T(),M(77,"div"),P(78,"[OK] STANDARDS: UNCOMPROMISED"),T(),M(79,"div",35),P(80," $ tail -n 1 /var/log/secure"),q(81,"br"),P(82," INFO: Clean builds. Zero excuses. "),T()()()(),M(83,"div",36)(84,"span",37),P(85,"SCROLL_DOWN"),T(),q(86,"div",38),T()()(),M(87,"section",39)(88,"div",11)(89,"div",40)(90,"p",41),q(91,"i",42),P(92," CORE MODULES "),q(93,"span",43),T(),M(94,"h2",44),P(95," TOOLS I USE "),T(),M(96,"p",45),P(97," The tools I reach for daily \u2014 security auditing, container pipelines, web apps, and scripting. I don't just use them; I master them. Click any icon to view docs. "),T()(),M(98,"div",46),vt(99,TR,8,3,"div",47),T(),M(100,"div",48)(101,"div",49),ke("click",function(){return r.navigateTo("/projects")}),q(102,"div",50),M(103,"div",51)(104,"p",52),P(105,"// CYBER LAB"),T(),M(106,"h3",53),P(107,"My Projects"),T(),M(108,"p",54),P(109,"Security scanners, ML pipelines, SQL injection sandboxes, and web utilities \u2014 built to actual high standards."),T(),M(110,"span",55),P(111," EXPLORE LAB "),q(112,"i",56),T()()(),M(113,"div",49),ke("click",function(){return r.navigateTo("/about")}),q(114,"div",50),M(115,"div",51)(116,"p",52),P(117,"// BIO_METRICS"),T(),M(118,"h3",53),P(119,"About Me"),T(),M(120,"p",54),P(121,"Education, experience, hobbies, and what I'm working on right now. Guitar, gaming, and motorcycles included."),T(),M(122,"span",55),P(123," VIEW BIO "),q(124,"i",56),T()()()()()(),M(125,"section",57)(126,"div",11)(127,"div",58)(128,"p",41),q(129,"i",59),P(130," COMS STATION "),q(131,"span",43),T(),M(132,"h2",44),P(133," LET'S TALK "),T(),M(134,"p",60),P(135," Got a project, collaboration idea, or want someone on your team who actually delivers top-tier code? Drop a message. "),T()(),M(136,"div",61),q(137,"div",62),M(138,"form",63)(139,"div",64)(140,"div",65)(141,"label",66),P(142,"CLIENT_NAME"),T(),q(143,"input",67),T(),M(144,"div",65)(145,"label",66),P(146,"CLIENT_EMAIL"),T(),q(147,"input",68),T(),M(148,"div",69)(149,"label",66),P(150,"TRANSMISSION_BODY"),T(),q(151,"textarea",70),T()(),M(152,"div",71)(153,"div",72)(154,"a",73),q(155,"i",74),T(),M(156,"a",75),q(157,"i",76),T(),M(158,"a",77),q(159,"i",59),T(),M(160,"button",78),ke("click",function(){return r.downloadResume()}),P(161," RESUME "),q(162,"i",79),T()(),M(163,"button",80),P(164," SEND MESSAGE "),q(165,"i",81),T()()()(),M(166,"div",82)(167,"button",83),ke("click",function(){return r.scrollToSection("home")}),q(168,"i",84),T()()()()()),i&2&&(X(2),Lt("height",r.scrollPercent,"%"),X(),Wt("active-step",r.activeSection==="home"),X(4),Wt("active-step",r.activeSection==="skills"),X(4),Wt("active-step",r.activeSection==="contact"),X(88),Pe("ngForOf",r.skills))},dependencies:[Zn,Wr],styles:["[_nghost-%COMP%]{display:block}.hero-item[_ngcontent-%COMP%]{transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1)}.hero-item.visible[_ngcontent-%COMP%]{opacity:1!important;transform:translate(0)!important}.step-item[_ngcontent-%COMP%]{position:relative;background:transparent;border:none;cursor:pointer;outline:none}.step-item.active-step[_ngcontent-%COMP%]{color:#fff!important}.step-item.active-step[_ngcontent-%COMP%]   .step-dot[_ngcontent-%COMP%]{background-color:#dc2626!important;border-color:#dc2626!important;box-shadow:0 0 10px #dc2626,0 0 20px #dc262666;transform:scale(1.25)}.outlined-text[_ngcontent-%COMP%]{-webkit-text-stroke:1.5px rgba(255,255,255,.85);color:transparent}.typed-cursor[_ngcontent-%COMP%]{font-size:1rem;color:var(--red);-webkit-text-fill-color:var(--red)!important;-webkit-text-stroke:none!important;opacity:1;animation:_ngcontent-%COMP%_typedBlink .7s infinite;font-family:var(--font-mono)}@keyframes _ngcontent-%COMP%_typedBlink{0%,to{opacity:1}50%{opacity:0}}.reveal[_ngcontent-%COMP%]{opacity:0;transform:translateY(24px);transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1)}.reveal.visible[_ngcontent-%COMP%]{opacity:1!important;transform:translateY(0)!important}.project-box[_ngcontent-%COMP%]{transition:all .3s cubic-bezier(.22,1,.36,1)}.project-box[_ngcontent-%COMP%]:hover{transform:translateY(-3px);box-shadow:0 12px 40px #00000080}.terminal-drawer[_ngcontent-%COMP%]{max-height:280px;overflow-y:auto}.terminal-drawer[_ngcontent-%COMP%]::-webkit-scrollbar{width:4px}.terminal-drawer[_ngcontent-%COMP%]::-webkit-scrollbar-track{background:#020202}.terminal-drawer[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:#dc26264d;border-radius:2px}@keyframes _ngcontent-%COMP%_slideDown{0%{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}.animate-slideDown[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_slideDown .35s cubic-bezier(.22,1,.36,1) forwards}input[_ngcontent-%COMP%]:focus, textarea[_ngcontent-%COMP%]:focus{border-color:#dc2626!important;box-shadow:0 4px 20px #dc262614}input[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{transition:border-color .25s,box-shadow .25s}"]})}}return n})();var AR=n=>({"active-step":n}),IR=(n,e,t)=>({"sm:border-r sm:pr-6":n,"sm:pl-6":e,"border-b-0":t}),DR=(n,e,t)=>({"bg-red-600":n,"bg-white/15":e,"animate-pulse":t}),Ig=n=>({"mb-10":n}),RR=(n,e)=>({"border-red-600 group-hover:bg-red-600 group-hover:shadow-md group-hover:shadow-red-600/50":n,"border-amber-500/70 group-hover:bg-amber-500/70":e}),PR=n=>({"border-b border-white/[.04]":n});function NR(n,e){if(n&1){let t=Ei();M(0,"button",73),ke("click",function(){let r=Dn(t).$implicit,s=Sn();return Rn(s.scrollToSection(r.id))}),q(1,"span",74),M(2,"span",75),P(3),T()()}if(n&2){let t=e.$implicit,i=e.index,r=Sn();Pe("ngClass",To(3,AR,r.activeSection===t.id)),X(3),bm("",(i+1).toString().padStart(2,"0")," // ",t.label,"")}}function OR(n,e){if(n&1&&(M(0,"span",76),P(1),T()),n&2){let t=e.$implicit;X(),Je(" ",t," ")}}function LR(n,e){if(n&1&&(M(0,"div",77)(1,"div",78)(2,"span",79),P(3),T(),M(4,"span",80),P(5),T()(),M(6,"div",81),q(7,"div",82),T()()),n&2){let t=e.$implicit,i=e.index,r=Sn();X(3),Ft(t.name),X(2),Je("",t.pct,"%"),X(2),Lt("width",r.skillsVisible?t.pct+"%":"0%")("transition-delay",i*100+"ms")}}function FR(n,e){if(n&1&&(M(0,"div",83)(1,"p",84),P(2),M(3,"span",85),P(4),T()(),M(5,"p",86),P(6),T()()),n&2){let t=e.$implicit;X(2),Je(" ",t.value,""),X(2),Ft(t.suffix),X(2),Je(" ",t.label," ")}}function kR(n,e){if(n&1&&(M(0,"div",87),q(1,"span",88),M(2,"div")(3,"p",89),P(4),T(),M(5,"p",90),P(6),T()()()),n&2){let t=e.$implicit,i=e.index,r=Sn();Pe("ngClass",Sm(4,IR,i===0||i===2,i===1||i===3,i>=r.currently.length-2)),X(),Pe("ngClass",Sm(8,DR,t.active,!t.active,t.active)),X(3),Ft(t.title),X(2),Ft(t.body)}}function UR(n,e){if(n&1){let t=Ei();M(0,"button",91),ke("click",function(){let r=Dn(t).$implicit,s=Sn();return Rn(s.scrollToSection(r.id))}),P(1),T()}if(n&2){let t=e.$implicit;X(),Je(" ",t.label," ")}}function BR(n,e){if(n&1&&(M(0,"span",100),P(1),T()),n&2){let t=e.$implicit;X(),Je(" ",t," ")}}function VR(n,e){if(n&1&&(M(0,"div",92),q(1,"div",93),M(2,"div",94)(3,"div",95),P(4),T(),M(5,"p",96),P(6),T(),M(7,"h3",97),P(8),T(),M(9,"p",98),P(10),T(),M(11,"div",26),vt(12,BR,2,1,"span",99),T()()()),n&2){let t=e.$implicit,i=e.index,r=e.last;Lt("transition-delay",i*100+"ms"),Pe("ngClass",To(8,Ig,!r)),X(4),Je(" LOG_",i+1," "),X(2),Ft(t.year),X(2),Ft(t.title),X(2),Ft(t.body),X(2),Pe("ngForOf",t.tags)}}function HR(n,e){if(n&1&&(M(0,"span",100),P(1),T()),n&2){let t=e.$implicit;X(),Je(" ",t," ")}}function zR(n,e){if(n&1&&(M(0,"div",92),q(1,"div",93),M(2,"div",94)(3,"div",95),P(4),T(),M(5,"p",96),P(6),T(),M(7,"h3",97),P(8),T(),M(9,"p",98),P(10),T(),M(11,"div",26),vt(12,HR,2,1,"span",99),T()()()),n&2){let t=e.$implicit,i=e.index,r=e.last;Lt("transition-delay",i*100+"ms"),Pe("ngClass",To(8,Ig,!r)),X(4),Je(" JOB_",i+1," "),X(2),Ft(t.year),X(2),Ft(t.title),X(2),Ft(t.body),X(2),Pe("ngForOf",t.tags)}}function GR(n,e){n&1&&(M(0,"span",105),q(1,"span",106),P(2," In progress "),T())}function WR(n,e){if(n&1&&(M(0,"span",100),P(1),T()),n&2){let t=e.$implicit;X(),Je(" ",t," ")}}function jR(n,e){if(n&1&&(M(0,"div",92),q(1,"div",101),M(2,"div",94)(3,"div",95),P(4),T(),M(5,"div",102)(6,"p",103),P(7),T(),vt(8,GR,3,0,"span",104),T(),M(9,"h3",97),P(10),T(),M(11,"p",98),P(12),T(),M(13,"div",26),vt(14,WR,2,1,"span",99),T()()()),n&2){let t=e.$implicit,i=e.index,r=e.last;Lt("transition-delay",i*100+"ms"),Pe("ngClass",To(10,Ig,!r)),X(),Pe("ngClass",N_(12,RR,t.status==="completed",t.status==="upcoming")),X(3),Je(" CERT_",i+1," "),X(3),Ft(t.year),X(),Pe("ngIf",t.status==="upcoming"),X(2),Ft(t.title),X(2),Ft(t.body),X(2),Pe("ngForOf",t.tags)}}function $R(n,e){if(n&1&&(M(0,"div",128),q(1,"span",129),M(2,"span",130),P(3),T(),q(4,"i",131),T()),n&2){let t=e.$implicit,i=e.index,r=e.last;Lt("transition-delay",i*40+"ms"),Pe("ngClass",To(4,PR,!r)),X(3),Ft(t)}}function qR(n,e){if(n&1&&(M(0,"span",132),P(1),T()),n&2){let t=e.$implicit;X(),Je(" ",t," ")}}function XR(n,e){if(n&1&&(M(0,"div",107),q(1,"div",108),M(2,"div",109),q(3,"div",110)(4,"div",111),M(5,"div",95),P(6),T(),M(7,"div",112),q(8,"span",113),P(9),T(),M(10,"div",114),q(11,"i"),T(),M(12,"div",115)(13,"h3",116),P(14),T(),q(15,"div",117),T(),q(16,"div",118),M(17,"div",119),vt(18,$R,5,6,"div",120),T(),M(19,"div",121),vt(20,qR,2,1,"span",122),T(),M(21,"div",123)(22,"span",124),P(23),T(),M(24,"div",125),q(25,"div",126),T()(),M(26,"span",127),P(27),T()()()),n&2){let t=e.$implicit,i=e.index;Lt("transition-delay",i*130+"ms"),X(6),Je(" MOD_",i+1," "),X(3),Je(" ",t.chip," "),X(2),w_(t.icon+" text-red-500 text-sm"),X(3),Ft(t.title),X(4),Pe("ngForOf",t.items),X(2),Pe("ngForOf",t.tags),X(3),Ft(t.statusLabel),X(2),Lt("width",t.statusPct+"%"),X(2),Je(" ",(i+1).toString().padStart(2,"0")," ")}}var oS=(()=>{class n{constructor(t,i,r){this.el=t,this.renderer=i,this.platformId=r,this.navItems=[{id:"about",label:"BIO_CORE"},{id:"education",label:"BACKGROUND"},{id:"experience",label:"SERVICE_LOG"},{id:"certifications",label:"CERT_LOG"},{id:"hobbies",label:"OFF_DUTY"}],this.chips=["CI/CD Hardening","Security Automation","Container Hardening","Infrastructure as Code","Vulnerability Scanners","Threat Modeling"],this.skills=[{name:"CI/CD Security Automation",pct:90},{name:"Container Hardening & Orchestration",pct:85},{name:"Penetration Testing & Auditing",pct:80},{name:"Secure Software Development",pct:82}],this.skillsVisible=!1,this.stats=[{value:"2",suffix:"+",label:"Years Experience"},{value:"15",suffix:"+",label:"Security & Web Projects"},{value:"10",suffix:"+",label:"SecOps Pipelines Hardened"},{value:"99",suffix:"%",label:"Pipeline Build Success"}],this.currently=[{active:!0,title:"MSc AI & Cybersecurity",body:"Writing security scanners, studying cryptography, and building automated security tools."},{active:!0,title:"Securing Deployments",body:"Plugging automated security checks into git pipelines so bad code never ships."},{active:!1,title:"CTF Competitive Prep",body:"Sharpening web exploitation skills in private labs."},{active:!1,title:"Infrastructure Hardening",body:"Locking down Docker containers and writing isolation policies that hold up."}],this.education=[{year:"2025 \u2014 Present",title:"MSc, Artificial Intelligence and Cybersecurity",body:"Currently pursuing a master's specializing in Artificial Intelligence and Cybersecurity at CHRIST (Deemed to be University), Bengaluru.",tags:["Bengaluru","Artificial Intelligence","Cybersecurity","CHRIST University"]},{year:"2022 \u2014 2025",title:"Bachelor of Computer Applications (CGPA: 7.77)",body:"Completed a Bachelor of Computer Applications at Kristu Jayanti College (Autonomous), Bengaluru.",tags:["Bengaluru","Kristu Jayanti College","CGPA 7.77"]}],this.experience=[{year:"Jun 2024 \u2014 Jul 2024",title:"Angular Developer Intern",body:"Developed a secure, responsive web application using Angular and Tailwind CSS at Kristu Jayanti Software Development Centre, Bengaluru. Implemented role-based access control using Auth Guards to restrict unauthorized route access, and designed a session scheduling system that improved usability and workflow efficiency for end users.",tags:["Angular","Tailwind CSS","Auth Guards","RBAC","Kristu Jayanti SDC"]}],this.certifications=[{year:"Expected Sep 2026",title:"CompTIA Security+",body:"Vendor-neutral certification covering core security concepts, threats, risk management, and cryptography fundamentals.",tags:["CompTIA","Security Fundamentals"],status:"upcoming"},{year:"Mar 2026",title:"Deloitte Cyber Job Simulation",body:"Forage-hosted simulation of Deloitte's cybersecurity practice, covering identity and access management and forensic investigation tasks.",tags:["Forage","Deloitte","IAM"],status:"completed"},{year:"Feb 2026",title:"OWASP API Security Top 10",body:"LinkedIn Learning course covering the most critical API security risks and how to identify and remediate them.",tags:["LinkedIn Learning","OWASP","API Security"],status:"completed"},{year:"Jul 2023",title:"Network Fundamentals",body:"Infosys Springboard course covering core networking concepts, protocols, and infrastructure fundamentals.",tags:["Infosys Springboard","Networking"],status:"completed"}],this.hobbies=[{icon:"fas fa-music",chip:"Music",title:"Guitarist & Improviser",items:["Electric guitar \u2014 rock & blues","Keyboard & music theory","Experimenting with effects loops"],tags:["Guitar","Keyboard","Music Theory"],statusLabel:"Practice Routine",statusPct:85},{icon:"fas fa-gamepad",chip:"Gaming",title:"RPG Enthusiast",items:["Open-world RPG exploration","Casual FPS & battle royale","Game modding & community builds"],tags:["ARPGs","Co-op","Strategy"],statusLabel:"Campaign Progress",statusPct:60},{icon:"fas fa-motorcycle",chip:"Riding",title:"Touring & Exploration",items:["Weekend highway expeditions","Urban commute & city rides","Bike maintenance & upgrades"],tags:["Highways","Maintenance","Gear Tuning"],statusLabel:"Trip Preparedness",statusPct:95}],this.quickNav=[{id:"about",label:"About"},{id:"education",label:"Edu"},{id:"experience",label:"Exp"},{id:"certifications",label:"Certs"},{id:"hobbies",label:"Hobbies"}],this.activeSection="about",this.scrollPercent=0}onWindowScroll(){if(!Ut(this.platformId))return;let t=window.scrollY||document.documentElement.scrollTop,i=document.documentElement.scrollHeight-window.innerHeight;this.scrollPercent=i>0?t/i*100:0;let r=["about","education","experience","certifications","hobbies"],s=window.scrollY+window.innerHeight/3;for(let o of r){let a=document.getElementById(o);a&&a.offsetTop<=s&&a.offsetTop+a.offsetHeight>s&&(this.activeSection=o)}}ngOnInit(){Ut(this.platformId)&&this.loadAssets()}ngAfterViewInit(){Ut(this.platformId)&&setTimeout(()=>this.initReveal(),100)}ngOnDestroy(){this.revealObserver?.disconnect()}loadAssets(){let t="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";if(!document.querySelector(`link[href="${t}"]`)){let i=this.renderer.createElement("link");this.renderer.setAttribute(i,"rel","stylesheet"),this.renderer.setAttribute(i,"href",t),this.renderer.appendChild(document.head,i)}}initReveal(){let t=this.el.nativeElement.querySelectorAll(".reveal");this.revealObserver=new IntersectionObserver(i=>{i.forEach(r=>{r.isIntersecting?(r.target.classList.remove("opacity-0","translate-y-8"),r.target.id==="about"&&(this.skillsVisible=!0)):r.target.classList.add("opacity-0","translate-y-8")})},{threshold:.08}),t.forEach(i=>this.revealObserver.observe(i))}scrollToSection(t){let i=document.getElementById(t);if(!i)return;let r=i.getBoundingClientRect().top+window.scrollY-24;window.scrollTo({top:r,behavior:"smooth"}),this.activeSection=t}downloadResume(){window.location.href="assets/resume.pdf"}static{this.\u0275fac=function(i){return new(i||n)(Ze(bn),Ze(hi),Ze(an))}}static{this.\u0275cmp=xn({type:n,selectors:[["app-about"]],hostBindings:function(i,r){i&1&&ke("scroll",function(){return r.onWindowScroll()},!1,Gi)},standalone:!0,features:[Mn],decls:144,vars:16,consts:[[1,"fixed","left-6","top-1/2","-translate-y-1/2","z-50","hidden","lg:flex","flex-col","gap-6","font-mono","text-[10px]","select-none"],[1,"absolute","left-[3px]","top-2","bottom-2","w-px","bg-white/[0.04]","overflow-hidden"],[1,"bg-red-600","w-full","transition-all","duration-200"],["class","step-item group flex items-center gap-4 text-white/20 hover:text-white transition-all duration-300",3,"ngClass","click",4,"ngFor","ngForOf"],[1,"fixed","right-6","bottom-8","z-40","hidden","xl:flex","flex-col","gap-1","font-mono","text-[9px]","text-white/20","text-right","select-none","pointer-events-none"],[1,"text-red-500/60","font-bold"],[1,"text-red-500/40"],[1,"relative","z-10","w-full","overflow-hidden","bg-transparent"],["id","about",1,"min-h-screen","relative","flex","items-center","px-6","md:px-24","pt-28","pb-20","border-b","border-white/[0.02]"],[1,"max-w-5xl","mx-auto","w-full"],[1,"reveal","opacity-0","translate-y-8","transition-all","duration-700","mb-12"],[1,"font-mono","text-[10px]","tracking-[0.2em]","text-red-500","uppercase","border","border-red-500/30","px-3","py-1","bg-red-500/5","rounded","inline-block","mb-6"],[1,"flex","flex-col","sm:flex-row","sm:items-end","sm:justify-between","gap-4"],[1,"font-black","text-white","leading-[0.9]","tracking-tight","uppercase",2,"font-size","clamp(2.8rem,7vw,5.4rem)"],[1,"outlined-text","text-transparent",2,"-webkit-text-stroke","1.5px rgba(255,255,255,0.85)"],[1,"font-mono","text-[11px]","font-bold","tracking-[0.18em]","uppercase","text-red-500","mt-4"],[1,"self-start","sm:self-auto","inline-flex","items-center","gap-2","bg-neutral-950/45","border","border-white/[0.07]","text-white/35","font-mono","text-[11px]","font-semibold","px-4","py-2","rounded-full"],[1,"fas","fa-location-dot","text-red-600",2,"font-size","10px"],[1,"grid","grid-cols-1","lg:grid-cols-2","gap-6"],[1,"reveal","opacity-0","translate-y-8","transition-all","duration-700","lg:col-span-2","rounded-xl","border","border-white/[0.05]","bg-neutral-950/45","hover:border-red-500/40","transition-all","duration-300","p-7","relative","overflow-hidden","group","cursor-default"],[1,"absolute","-bottom-8","-right-8","w-32","h-32","bg-red-600/5","rounded-full","blur-2xl","group-hover:bg-red-600/10","transition-all","duration-500","pointer-events-none"],[1,"relative"],[1,"font-mono","text-[9px]","tracking-[0.2em]","text-red-500","uppercase","mb-4"],[1,"text-white/80","text-[0.93rem]","leading-relaxed","mb-3"],[1,"text-white","font-semibold"],[1,"text-white/65","text-[0.93rem]","leading-relaxed","mb-6"],[1,"flex","flex-wrap","gap-2"],["class",`font-mono text-[10px] font-bold tracking-wide uppercase
                  text-red-400/75 bg-red-600/[.08] border border-red-600/20
                  px-3 py-1.5 rounded-lg hover:bg-red-600/15 hover:text-red-300
                  transition-all duration-200 cursor-default`,4,"ngFor","ngForOf"],[1,"reveal","opacity-0","translate-y-8","transition-all","duration-700","rounded-xl","border","border-white/[0.05]","bg-neutral-950/45","hover:border-red-500/40","transition-all","duration-300","p-7",2,"transition-delay","0.1s"],[1,"font-mono","text-[9px]","tracking-[0.2em]","text-red-500","uppercase","mb-5"],[1,"flex","flex-col","gap-4"],["class","skill-row",4,"ngFor","ngForOf"],[1,"reveal","opacity-0","translate-y-8","transition-all","duration-700","rounded-xl","border","border-white/[0.05]","bg-neutral-950/45","hover:border-red-500/40","transition-all","duration-300","p-7",2,"transition-delay","0.15s"],[1,"grid","grid-cols-2","gap-3"],["class",`bg-white/[.02] border border-white/[.04] rounded-lg p-4
                hover:border-red-600/20 hover:bg-red-600/[.04]
                transition-all duration-300 cursor-default group`,4,"ngFor","ngForOf"],[1,"reveal","opacity-0","translate-y-8","transition-all","duration-700","lg:col-span-2","rounded-xl","border","border-white/[0.05]","bg-black/60","backdrop-blur","hover:border-red-500/40","transition-all","duration-300","p-7",2,"transition-delay","0.2s"],[1,"flex","items-center","justify-between","border-b","border-white/[0.06]","pb-3","mb-5"],[1,"font-mono","text-[9px]","tracking-[0.2em]","text-red-500","uppercase"],[1,"w-1.5","h-1.5","rounded-full","bg-red-500","animate-pulse"],[1,"grid","grid-cols-1","sm:grid-cols-2","gap-0"],["class","flex items-start gap-3 py-3 border-b border-white/[.04]",3,"ngClass",4,"ngFor","ngForOf"],[1,"reveal","opacity-0","translate-y-8","transition-all","duration-700","flex","flex-wrap","items-center","gap-3","mt-8",2,"transition-delay","0.25s"],["href","mailto:melvin.mj576@gmail.com",1,"btn-primary","no-underline","font-mono","text-[10px]"],[1,"fa-regular","fa-hand"],[1,"btn-ghost","font-mono","text-[10px]",3,"click"],[1,"fas","fa-scroll","text-xs"],[1,"flex","flex-wrap","gap-2","lg:hidden","w-full","mt-2"],["class",`font-mono text-[10px] font-bold tracking-widest uppercase text-white/30
              border border-white/[0.08] hover:border-red-600/50 hover:text-red-400
              px-3 py-1.5 rounded-full transition-all duration-200`,3,"click",4,"ngFor","ngForOf"],[1,"flex","justify-center","mt-14"],[1,"flex","flex-col","items-center","gap-1.5","text-white/20","hover:text-red-400","transition-colors","duration-200","group",3,"click"],[1,"font-mono","text-[9px]","font-bold","tracking-[0.25em]","uppercase"],[1,"w-px","h-10","bg-gradient-to-b","from-white/40","to-transparent"],["id","education",1,"min-h-screen","flex","items-center","px-6","md:px-24","py-28","border-b","border-white/[0.02]"],[1,"reveal","opacity-0","translate-y-8","transition-all","duration-700"],[1,"eyebrow"],[1,"fas","fa-graduation-cap","text-xs"],[1,"inline-block","w-8","h-px","bg-red-500/60"],[1,"font-bold","text-white","tracking-tight","uppercase","mb-12",2,"font-size","clamp(2.2rem, 6vw, 3.8rem)"],[1,"relative","pl-8","border-l","border-red-600/30"],["class","reveal opacity-0 translate-y-8 transition-all duration-700 relative group cursor-default",3,"ngClass","transition-delay",4,"ngFor","ngForOf"],[1,"fas","fa-arrow-down","text-xs"],["id","experience",1,"min-h-screen","flex","items-center","px-6","md:px-24","py-28","border-b","border-white/[0.02]"],[1,"fas","fa-briefcase","text-xs"],["id","certifications",1,"min-h-screen","flex","items-center","px-6","md:px-24","py-28","border-b","border-white/[0.02]"],[1,"fas","fa-certificate","text-xs"],[1,"btn-primary","font-mono","text-[10px]",3,"click"],["id","hobbies",1,"min-h-screen","flex","items-center","px-6","md:px-24","py-28","overflow-hidden"],[1,"fas","fa-guitar","text-xs"],[1,"grid","grid-cols-1","md:grid-cols-3","gap-5"],["class",`hobby-card reveal opacity-0 translate-y-8 transition-all duration-700
            relative rounded-2xl cursor-default`,3,"transition-delay",4,"ngFor","ngForOf"],[1,"flex","flex-col","items-center","gap-6","mt-14"],["title","Back to top",1,"w-10","h-10","rounded-full","border","border-white/10","hover:border-red-600","bg-neutral-950","text-white/30","hover:text-red-400","flex","items-center","justify-center","transition-all","hover:-translate-y-1",3,"click"],[1,"fas","fa-arrow-up","text-xs"],[1,"step-item","group","flex","items-center","gap-4","text-white/20","hover:text-white","transition-all","duration-300",3,"click","ngClass"],[1,"step-dot","w-2","h-2","rounded-full","border","border-white/20","bg-transparent","group-hover:border-red-500","transition-all","duration-300"],[1,"tracking-widest"],[1,"font-mono","text-[10px]","font-bold","tracking-wide","uppercase","text-red-400/75","bg-red-600/[.08]","border","border-red-600/20","px-3","py-1.5","rounded-lg","hover:bg-red-600/15","hover:text-red-300","transition-all","duration-200","cursor-default"],[1,"skill-row"],[1,"flex","justify-between","items-center","mb-1.5"],[1,"text-[12px]","font-semibold","text-white/80"],[1,"font-mono","text-[11px]","font-bold","text-red-400"],[1,"h-[3px]","rounded-full","bg-white/[.05]","overflow-hidden"],[1,"skill-bar","h-full","rounded-full","bg-gradient-to-r","from-red-600","to-red-400","transition-all","duration-700"],[1,"bg-white/[.02]","border","border-white/[.04]","rounded-lg","p-4","hover:border-red-600/20","hover:bg-red-600/[.04]","transition-all","duration-300","cursor-default","group"],[1,"font-black","text-white","leading-none","mb-1.5","tracking-tight",2,"font-size","1.9rem"],[1,"text-red-500","text-xl"],[1,"font-mono","text-[10px]","font-semibold","uppercase","tracking-[0.1em]","text-white/55","group-hover:text-white/75","transition-colors","duration-300"],[1,"flex","items-start","gap-3","py-3","border-b","border-white/[.04]",3,"ngClass"],[1,"w-2","h-2","rounded-full","flex-shrink-0","mt-1.5",3,"ngClass"],[1,"text-white/90","font-semibold","text-[13px]","mb-0.5"],[1,"text-white/65","text-[12px]","leading-relaxed"],[1,"font-mono","text-[10px]","font-bold","tracking-widest","uppercase","text-white/30","border","border-white/[0.08]","hover:border-red-600/50","hover:text-red-400","px-3","py-1.5","rounded-full","transition-all","duration-200",3,"click"],[1,"reveal","opacity-0","translate-y-8","transition-all","duration-700","relative","group","cursor-default",3,"ngClass"],[1,"absolute","-left-[2.6rem]","top-1.5","w-3.5","h-3.5","rounded-full","border-2","border-red-600","bg-neutral-950","group-hover:bg-red-600","group-hover:shadow-md","group-hover:shadow-red-600/50","transition-all","duration-300"],[1,"rounded-xl","border","border-white/[0.04]","bg-neutral-950/45","p-6","hover:border-red-500/30","transition-all","duration-300","hover:-translate-y-0.5","relative"],[1,"absolute","top-0","right-0","p-3","font-mono","text-[9px]","text-white/10","tracking-widest","group-hover:text-red-500/20","transition-all"],[1,"font-mono","text-[10px]","font-bold","tracking-[0.18em]","uppercase","text-red-500","mb-1"],[1,"text-white","font-bold","text-[1.05rem]","mb-2","leading-snug"],[1,"text-white/70","text-sm","leading-relaxed","mb-3"],["class",`font-mono text-[10px] font-semibold bg-white/[0.03] border border-white/[0.08]
                  text-white/55 px-3 py-1 rounded-lg hover:border-red-600/30
                  hover:text-red-400/70 transition-all duration-200 cursor-default`,4,"ngFor","ngForOf"],[1,"font-mono","text-[10px]","font-semibold","bg-white/[0.03]","border","border-white/[0.08]","text-white/55","px-3","py-1","rounded-lg","hover:border-red-600/30","hover:text-red-400/70","transition-all","duration-200","cursor-default"],[1,"absolute","-left-[2.6rem]","top-1.5","w-3.5","h-3.5","rounded-full","border-2","bg-neutral-950","transition-all","duration-300",3,"ngClass"],[1,"flex","items-center","gap-2","mb-1","flex-wrap"],[1,"font-mono","text-[10px]","font-bold","tracking-[0.18em]","uppercase","text-red-500"],["class",`flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase
                  text-amber-400/70 border border-amber-500/20 bg-amber-500/[.06] px-2 py-0.5 rounded`,4,"ngIf"],[1,"flex","items-center","gap-1.5","font-mono","text-[9px]","tracking-widest","uppercase","text-amber-400/70","border","border-amber-500/20","bg-amber-500/[.06]","px-2","py-0.5","rounded"],[1,"w-1.5","h-1.5","rounded-full","bg-amber-400/80","animate-pulse"],[1,"hobby-card","reveal","opacity-0","translate-y-8","transition-all","duration-700","relative","rounded-2xl","cursor-default"],[1,"hobby-border","absolute","inset-0","rounded-2xl","pointer-events-none","z-0"],[1,"relative","z-10","m-[1.5px]","rounded-[15px]","bg-neutral-950/60","p-7","h-full","flex","flex-col","overflow-hidden","group","transition-transform","duration-300","ease-out","hover:-translate-y-1.5","backdrop-blur-sm"],[1,"absolute","top-0","left-0","right-0","h-px","bg-gradient-to-r","from-transparent","via-red-600/40","to-transparent","opacity-0","group-hover:opacity-100","transition-opacity","duration-400"],[1,"absolute","-top-10","-right-10","w-32","h-32","rounded-full","pointer-events-none","opacity-0","group-hover:opacity-100","transition-opacity","duration-500",2,"background","radial-gradient(circle,rgba(220,38,38,.12) 0%,transparent 70%)"],[1,"inline-flex","items-center","gap-1.5","self-start","font-mono","text-[10px]","font-bold","tracking-widest","uppercase","text-red-500/60","bg-red-600/[.07]","border","border-red-600/15","rounded-full","px-3","py-1","mb-4"],[1,"w-1.5","h-1.5","rounded-full","bg-red-600","flex-shrink-0"],[1,"relative","w-12","h-12","flex-shrink-0","mb-5","flex","items-center","justify-center","rounded-xl","bg-white/[0.03]","border","border-white/[0.08]","transition-all","duration-300","group-hover:border-red-500/30"],[1,"relative","mb-1"],[1,"text-white","font-black","text-[1.05rem]","tracking-tight"],[1,"h-px","bg-gradient-to-r","from-red-600/60","to-transparent","w-0","group-hover:w-full","transition-all","duration-500"],[1,"h-px","bg-white/[.05]","mb-3"],[1,"flex","flex-col","flex-1"],["class",`hobby-item flex items-center gap-2.5 text-[13px] text-white/40 font-light
                    py-2 transition-all duration-200 group-hover:text-white/60
                    hover:!text-white hover:translate-x-1.5`,3,"ngClass","transition-delay",4,"ngFor","ngForOf"],[1,"flex","flex-wrap","gap-1.5","mt-4"],["class",`font-mono text-[10px] font-semibold tracking-wide text-red-400/70
                  bg-red-600/[.09] border border-red-600/20 rounded-full px-2.5 py-1`,4,"ngFor","ngForOf"],[1,"flex","items-center","gap-2.5","mt-4","pt-3.5","border-t","border-white/[.05]"],[1,"font-mono","text-[9px]","font-bold","tracking-widest","uppercase","text-white/30","whitespace-nowrap"],[1,"flex-1","h-[3px]","rounded-full","bg-white/[.06]","overflow-hidden"],[1,"h-full","rounded-full","bg-gradient-to-r","from-red-600","to-red-400","hobby-bar","transition-all","duration-700"],[1,"absolute","bottom-5","right-5","font-black","text-white/[.035]","pointer-events-none","select-none",2,"font-size","5rem","line-height","1"],[1,"hobby-item","flex","items-center","gap-2.5","text-[13px]","text-white/40","font-light","py-2","transition-all","duration-200","group-hover:text-white/60","hover:!text-white","hover:translate-x-1.5",3,"ngClass"],[1,"w-1.5","h-1.5","rounded-full","bg-red-500/40","flex-shrink-0","group-hover:bg-red-500/70","transition-colors","duration-300"],[1,"flex-1"],[1,"fas","fa-arrow-right","text-[10px]","text-red-600/0","group-hover:text-red-600/50","transition-all","duration-200","-translate-x-1","group-hover:translate-x-0"],[1,"font-mono","text-[10px]","font-semibold","tracking-wide","text-red-400/70","bg-red-600/[.09]","border","border-red-600/20","rounded-full","px-2.5","py-1"]],template:function(i,r){i&1&&(M(0,"div",0)(1,"div",1),q(2,"div",2),T(),vt(3,NR,4,5,"button",3),T(),M(4,"div",4)(5,"div"),P(6,"PROFILE_CORE: "),M(7,"span",5),P(8,"ONLINE"),T()(),M(9,"div"),P(10,"SECTOR: BIO_METRICS"),T(),M(11,"div"),P(12),bu(13,"uppercase"),T(),M(14,"div"),P(15),T(),M(16,"div",6),P(17,"OPERATOR: MELVIN_JAMES"),T()(),M(18,"div",7)(19,"section",8)(20,"div",9)(21,"div",10)(22,"span",11),P(23," OPERATOR PROFILE // BIO_CORE "),T(),M(24,"div",12)(25,"div")(26,"h1",13),P(27," MELVIN"),q(28,"br"),M(29,"span",14),P(30,"JAMES"),T()(),M(31,"p",15),P(32," // the guy who breaks things to make them safer (and does it better) "),T()(),M(33,"span",16),q(34,"i",17),P(35," Bangalore, India "),T()()(),M(36,"div",18)(37,"div",19),q(38,"div",20),M(39,"div",21)(40,"p",22),P(41,"// WHO_I_AM"),T(),M(42,"p",23),P(43," I'm a developer focused on the intersection of "),M(44,"span",24),P(45,"CI/CD Automation"),T(),P(46," and "),M(47,"span",24),P(48,"Cybersecurity"),T(),P(49,". I build tools that scan codebases for vulnerabilities, harden Docker containers, and automate compliance checks \u2014 making sure bad code never touches production. "),T(),M(50,"p",25),P(51," When I'm not writing Python scripts or building web apps, you'll find me shredding guitar solos, grinding RPGs, or out on a long motorcycle ride. I just believe in doing everything at the highest standard. "),T(),M(52,"div",26),vt(53,OR,2,1,"span",27),T()()(),M(54,"div",28)(55,"p",29),P(56,"// CORE_SKILLS"),T(),M(57,"div",30),vt(58,LR,8,6,"div",31),T()(),M(59,"div",32)(60,"p",29),P(61,"// METRICS"),T(),M(62,"div",33),vt(63,FR,7,3,"div",34),T()(),M(64,"div",35)(65,"div",36)(66,"span",37),P(67,"// CURRENTLY_RUNNING"),T(),q(68,"span",38),T(),M(69,"div",39),vt(70,kR,7,12,"div",40),T()()(),M(71,"div",41)(72,"a",42),P(73," SAY HI "),q(74,"i",43),T(),M(75,"button",44),ke("click",function(){return r.downloadResume()}),P(76," RESUME "),q(77,"i",45),T(),M(78,"div",46),vt(79,UR,2,1,"button",47),T()(),M(80,"div",48)(81,"button",49),ke("click",function(){return r.scrollToSection("education")}),M(82,"span",50),P(83,"SCROLL_DOWN"),T(),q(84,"div",51),T()()()(),M(85,"section",52)(86,"div",9)(87,"div",53)(88,"p",54),q(89,"i",55),P(90," BACKGROUND "),q(91,"span",56),T(),M(92,"h2",57),P(93," EDUCATION LOG "),T()(),M(94,"div",58),vt(95,VR,13,10,"div",59),T(),M(96,"div",48)(97,"button",44),ke("click",function(){return r.scrollToSection("experience")}),P(98," SERVICE LOG "),q(99,"i",60),T()()()(),M(100,"section",61)(101,"div",9)(102,"div",53)(103,"p",54),q(104,"i",62),P(105," SERVICE RECORD "),q(106,"span",56),T(),M(107,"h2",57),P(108," EXPERIENCE "),T()(),M(109,"div",58),vt(110,zR,13,10,"div",59),T(),M(111,"div",48)(112,"button",44),ke("click",function(){return r.scrollToSection("certifications")}),P(113," CERTIFICATIONS "),q(114,"i",60),T()()()(),M(115,"section",63)(116,"div",9)(117,"div",53)(118,"p",54),q(119,"i",64),P(120," CREDENTIALS "),q(121,"span",56),T(),M(122,"h2",57),P(123," CERTIFICATIONS "),T()(),M(124,"div",58),vt(125,jR,15,15,"div",59),T(),M(126,"div",48)(127,"button",65),ke("click",function(){return r.scrollToSection("hobbies")}),P(128," BEYOND CODE "),q(129,"i",60),T()()()(),M(130,"section",66)(131,"div",9)(132,"div",53)(133,"p",54),q(134,"i",67),P(135," OFF DUTY "),q(136,"span",56),T(),M(137,"h2",57),P(138," BEYOND THE CODE "),T()(),M(139,"div",68),vt(140,XR,28,13,"div",69),T(),M(141,"div",70)(142,"button",71),ke("click",function(){return r.scrollToSection("about")}),q(143,"i",72),T()()()()()),i&2&&(X(2),Lt("height",r.scrollPercent,"%"),X(),Pe("ngForOf",r.navItems),X(9),Je("ACTIVE_MODULE: ",Su(13,14,r.activeSection),""),X(3),Je("SCROLL_DEPTH: ",r.scrollPercent.toFixed(0),"%"),X(38),Pe("ngForOf",r.chips),X(5),Pe("ngForOf",r.skills),X(5),Pe("ngForOf",r.stats),X(7),Pe("ngForOf",r.currently),X(9),Pe("ngForOf",r.quickNav),X(16),Pe("ngForOf",r.education),X(15),Pe("ngForOf",r.experience),X(15),Pe("ngForOf",r.certifications),X(15),Pe("ngForOf",r.hobbies))},dependencies:[Zn,Q_,Wr,jr,Iu,Jr],styles:["[_nghost-%COMP%]{display:block}.outlined-text[_ngcontent-%COMP%]{-webkit-text-stroke:1.5px rgba(255,255,255,.85);color:transparent}.step-item[_ngcontent-%COMP%]{position:relative;background:transparent;border:none;cursor:pointer;outline:none}.step-item.active-step[_ngcontent-%COMP%]{color:#fff!important}.step-item.active-step[_ngcontent-%COMP%]   .step-dot[_ngcontent-%COMP%]{background-color:#dc2626!important;border-color:#dc2626!important;box-shadow:0 0 10px #dc2626,0 0 20px #dc262666;transform:scale(1.25)}.hobby-border[_ngcontent-%COMP%]{background:linear-gradient(135deg,#dc262633,#dc262605 40%,#dc262626 70%,#dc262605);background-size:300% 300%;animation:_ngcontent-%COMP%_borderShift 6s ease infinite;opacity:.3;transition:opacity .4s}.hobby-card[_ngcontent-%COMP%]:hover   .hobby-border[_ngcontent-%COMP%]{opacity:.8}@keyframes _ngcontent-%COMP%_borderShift{0%{background-position:0% 50%}50%{background-position:100% 50%}to{background-position:0% 50%}}.hobby-item[_ngcontent-%COMP%]{transform:translate(0);transition:transform .25s ease,color .25s ease}.hobby-card[_ngcontent-%COMP%]:hover   .hobby-item[_ngcontent-%COMP%]{transform:translate(4px)}.hobby-card[_ngcontent-%COMP%]:hover   .hobby-tag[_ngcontent-%COMP%]{opacity:1}.hobby-card[_ngcontent-%COMP%]:hover   .hobby-bar[_ngcontent-%COMP%]{width:100%}"]})}}return n})();function YR(n,e){if(n&1&&(M(0,"span",71),P(1),T()),n&2){let t=e.$implicit;X(),Je(" ",t," ")}}function ZR(n,e){if(n&1){let t=Ei();M(0,"div",48)(1,"div",49),P(2),T(),M(3,"div",50)(4,"div",51)(5,"div",52)(6,"span",53),P(7),T()(),M(8,"h3",54),P(9),T(),M(10,"p",55),P(11),T(),M(12,"div",56),vt(13,YR,2,1,"span",57),T(),M(14,"a",58),q(15,"i",59),P(16," GITHUB REPO "),T()(),M(17,"div",60)(18,"div",61)(19,"div",62),q(20,"span",63)(21,"span",64)(22,"span",65),T(),M(23,"span",66),P(24,"PYTHON // AI_ML"),T(),M(25,"button",67),ke("click",function(){let r=Dn(t),s=r.$implicit,o=r.index,a=Sn();return Rn(a.copyToClipboard(s.code,"aiml-"+o))}),q(26,"i",68),M(27,"span",69),P(28,"COPY"),T()()(),M(29,"pre",70)(30,"code"),P(31),T()()()()()}if(n&2){let t=e.$implicit,i=e.index;Lt("transition-delay",i*100+"ms"),X(2),Je(" AI_",(i+1).toString().padStart(2,"0")," "),X(5),Je(" AI \xB7 ",(i+1).toString().padStart(2,"0")," "),X(2),Je(" ",t.title," "),X(2),Ft(t.description),X(2),Pe("ngForOf",t.tags),X(),Pe("href",t.repoLink,Yn),X(13),Pe("id","message-aiml-"+i),X(4),Ft(t.code)}}function JR(n,e){if(n&1&&(M(0,"span",71),P(1),T()),n&2){let t=e.$implicit;X(),Je(" ",t," ")}}function KR(n,e){if(n&1&&(M(0,"a",78),q(1,"i",26),P(2," LIVE SITE "),T()),n&2){let t=Sn().$implicit;Pe("href",t.link,Yn)}}function QR(n,e){if(n&1){let t=Ei();M(0,"div",48)(1,"div",49),P(2),T(),M(3,"div",50)(4,"div",51)(5,"div",72)(6,"span",53),P(7),T(),M(8,"span",73),q(9,"i",74),P(10," EDUCATIONAL USE ONLY "),T()(),M(11,"h3",54),P(12),T(),M(13,"p",55),P(14),T(),M(15,"div",56),vt(16,JR,2,1,"span",57),T(),M(17,"div",75)(18,"a",76),q(19,"i",59),P(20," SOURCE CODE "),T(),vt(21,KR,3,1,"a",77),T()(),M(22,"div",60)(23,"div",61)(24,"div",62),q(25,"span",63)(26,"span",64)(27,"span",65),T(),M(28,"span",66),P(29,"SECURITY"),T(),M(30,"button",67),ke("click",function(){let r=Dn(t),s=r.$implicit,o=r.index,a=Sn();return Rn(a.copyToClipboard(s.code,"sec-"+o))}),q(31,"i",68),M(32,"span",69),P(33,"COPY"),T()()(),M(34,"pre",70)(35,"code"),P(36),T()()()()()}if(n&2){let t=e.$implicit,i=e.index;Lt("transition-delay",i*100+"ms"),X(2),Je(" SEC_",(i+1).toString().padStart(2,"0")," "),X(5),Je(" SEC \xB7 ",(i+1).toString().padStart(2,"0")," "),X(5),Je(" ",t.title," "),X(2),Ft(t.description),X(2),Pe("ngForOf",t.tags),X(2),Pe("href",t.repoLink,Yn),X(3),Pe("ngIf",t.link),X(11),Pe("id","message-sec-"+i),X(4),Ft(t.code)}}function eP(n,e){if(n&1&&(M(0,"span",71),P(1),T()),n&2){let t=e.$implicit;X(),Je(" ",t," ")}}function tP(n,e){if(n&1&&(M(0,"div",79)(1,"div",80),P(2),T(),M(3,"div",81)(4,"div",82)(5,"div",62),q(6,"span",83)(7,"span",84)(8,"span",85),T(),M(9,"div",86),q(10,"i",87),M(11,"span",88),P(12),T()()(),M(13,"div",81),q(14,"img",89),M(15,"div",90)(16,"a",91),q(17,"i",92),P(18," VIEW LIVE "),T()()()(),M(19,"div",93)(20,"h3",94),P(21),T(),M(22,"p",95),P(23),T(),M(24,"div",56),vt(25,eP,2,1,"span",96),T(),M(26,"div",75)(27,"a",76),q(28,"i",59),P(29," SOURCE "),T(),M(30,"a",78),q(31,"i",26),P(32," LIVE SITE "),T()()()()),n&2){let t=e.$implicit,i=e.index;Lt("transition-delay",i*100+"ms"),X(2),Je(" WEB_",(i+1).toString().padStart(2,"0")," "),X(10),Ft(t.link),X(2),Pe("src",t.image,Yn)("alt",t.title),X(2),Pe("href",t.link,Yn),X(5),Ft(t.title),X(2),Ft(t.description),X(2),Pe("ngForOf",t.tags),X(2),Pe("href",t.repoLink,Yn),X(3),Pe("href",t.link,Yn)}}var aS=(()=>{class n{constructor(t,i,r){this.el=t,this.renderer=i,this.platformId=r,this.activeSection="aiml",this.scrollPercent=0,this.aiml=[{title:"Local RAG Compliance Auditor",description:"A custom offline RAG pipeline I built to scan security policies, codebases, and compliance standards (OWASP, SOC2, HIPAA) completely locally. Zero cloud APIs, zero data leaving the machine \u2014 just pure local intelligence running on ChromaDB, HuggingFace embeddings, and Mistral.",repoLink:"https://github.com/melvinjames1/Local-RAG",tags:["Python","LangChain","ChromaDB","Offline LLM","Security Policy Auditing"],code:`import os
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.llms import Ollama
from langchain.chains import RetrievalQA

def load_documents(file_path):
    loader = PyPDFLoader(file_path)
    return loader.load()

def split_documents(documents):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=100
    )
    return splitter.split_documents(documents)

def create_vector_store(chunks):
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory="./chroma_db"
    )
    vectorstore.persist()
    return vectorstore

def load_vector_store():
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    return Chroma(
        persist_directory="./chroma_db",
        embedding_function=embeddings
    )

def create_qa_chain(vectorstore):
    llm = Ollama(model="mistral", temperature=0)
    return RetrievalQA.from_chain_type(
        llm=llm,
        retriever=vectorstore.as_retriever(search_kwargs={"k": 5}),
        return_source_documents=True
    )

def main():
    pdf_path = "data/your_pdf.pdf"
    print("Loading PDF...")
    docs   = load_documents(pdf_path)
    chunks = split_documents(docs)

    if not os.path.exists("./chroma_db"):
        print("Creating vector DB...")
        vectorstore = create_vector_store(chunks)
    else:
        print("Loading existing DB...")
        vectorstore = load_vector_store()

    qa_chain = create_qa_chain(vectorstore)
    print("\\nRAG ready (LOCAL). Type 'exit' to quit.\\n")

    while True:
        query = input("Question: ")
        if query.lower() == "exit":
            break
        result = qa_chain.invoke({"query": query})
        print("\\nAnswer:\\n", result["result"])
        print("\\nSources:")
        for doc in result["source_documents"]:
            print("-", doc.metadata.get("source"))
        print("\\n" + "=" * 50 + "\\n")

if __name__ == "__main__":
    main()`},{title:"Automated Security Log Classifier",description:"A smart log classification pipeline using TF-IDF and Logistic Regression. Automatically parses system events, flags suspicious entries, and exports clean predictions way faster than manual auditing.",repoLink:"https://github.com/melvinjames1/Sentiment-Analysis/blob/main/sentimentanalysis.py",tags:["Python","Log Classification","NLP","Security Logs","Anomaly Detection"],code:`import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

data = pd.read_csv("yourfilepath")
X = data["Text"]
y = data["Label"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

vectorizer = TfidfVectorizer(max_features=5000, stop_words="english")
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf  = vectorizer.transform(X_test)

model = LogisticRegression(max_iter=1000)
model.fit(X_train_tfidf, y_train)

y_pred = model.predict(X_test_tfidf)
print(f"Accuracy: {accuracy_score(y_test, y_pred):.2f}")
print(classification_report(y_test, y_pred))
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

data["Predicted"] = model.predict(vectorizer.transform(X))
data.to_csv("sentiment_predictions.csv", index=False)
print("Predictions saved to sentiment_predictions.csv")`}],this.cybersec=[{title:"WAVS \u2014 CI/CD Pipeline Vulnerability Scanner",description:"An automated security scanner built for CI/CD integrations. Aggressively tests containerized web apps for SQLi, XSS, insecure headers, and directory listing flaws during pipeline builds \u2014 shutting down bad code before it reaches production.",repoLink:"https://github.com/melvinjames1/WAVS",tags:["DevSecOps","CI/CD Scanning","SQLi / XSS Testing","Automation","Audit Reports"],code:`import urllib.parse
from .vulnerabilities import (
    sql_injection, xss,
    security_headers, directory_listing, port_scanner
)
from .report.html_report import generate_html
from .report.pdf_report import generate_pdf

class Scanner:
    def __init__(self, target):
        self.target = target.rstrip('/')
        self.parsed = urllib.parse.urlparse(self.target)
        if not self.parsed.scheme:
            self.target = 'http://' + self.target
            self.parsed = urllib.parse.urlparse(self.target)

    def run_full_scan(self):
        report = {}
        report['sql_injection']     = sql_injection.test_sql_injection(self.target)
        report['xss']               = xss.test_xss(self.target)
        report['security_headers']  = security_headers.check_security_headers(self.target)
        report['directory_listing'] = directory_listing.check_directory_listing(self.target)

        host = self.parsed.hostname
        report['open_ports'] = port_scanner.scan_ports(host) if host else []

        return report

    def generate_html_report(self, report, filename):
        html = generate_html(report, self.target)
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(html)

    def generate_pdf_report(self, report, filename):
        generate_pdf(report, self.target, filename)`},{title:"SQL Injection Sandbox & Secure Coding Tutor",description:"An interactive training sandbox demonstrating SQL injection vulnerabilities and secure coding remediation. Built to show developers why raw queries break and how parameterised queries prevent auth bypasses.",repoLink:"https://github.com/melvinjames1/SQL-Injection-Test",link:"https://sql-injection-test-liard.vercel.app",tags:["Secure Coding","SQL Injection","Sandbox","DevSecOps Training"],code:`-- Hardcoded demo database schema
-- Safe sandboxed environment for SQL injection testing

CREATE TABLE users (
    id       INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    role     TEXT DEFAULT 'user'
);

INSERT INTO users VALUES (1, 'admin',   'supersecret123', 'admin');
INSERT INTO users VALUES (2, 'alice',   'password123',    'user');
INSERT INTO users VALUES (3, 'bob',     'qwerty456',      'user');
INSERT INTO users VALUES (4, 'charlie', 'letmein789',     'user');

-- Vulnerable query (intentional \u2014 for demo purposes)
-- Input: ' OR '1'='1
SELECT * FROM users
WHERE username = '' OR '1'='1'
  AND password = '';

-- Result: returns ALL rows \u2014 auth bypassed
-- Shows exactly how unsanitised input
-- lets attackers dump the entire table.

-- Safe parameterised equivalent:
-- SELECT * FROM users
-- WHERE username = ? AND password = ?`}],this.websites=[{title:"Pomodoro Timer",image:"assets/pt.png",description:"A sleek, custom Pomodoro productivity tool I built to optimize my own work intervals. Features clean visual timers, break controls, and zero clutter.",link:"https://pomodoro-timer12.netlify.app/",repoLink:"https://github.com/melvinjames1/pomodoro-timer",tags:["HTML","CSS","JavaScript"]},{title:"Favourite Movie Blog",image:"assets/fmb.png",description:"An Angular & Tailwind application categorizing favorite movies across Hollywood, Bollywood, and Anime with smooth category filters and responsive layouts.",link:"https://main--myfavouritemoviesblog1.netlify.app/Favourite-Movies-Blog/",repoLink:"https://github.com/melvinjames1/FMB",tags:["Angular","Tailwind CSS"]},{title:"Joke Generator",image:"assets/JokeGen.png",description:"A fast React app that pulls random jokes from an API using Axios with instant state updates and zero lag.",link:"https://main--jokegenarator.netlify.app/",repoLink:"https://github.com/melvinjames1/joke-generator",tags:["React","Axios","REST API"]},{title:"Traveller's Guide",image:"assets/Tg.png",description:"A country info tool powered by the REST Countries API. Type any country name and fetch capital, population, currency, and language data instantly.",link:"https://main--travellersguide576.netlify.app/",repoLink:"https://github.com/melvinjames1",tags:["HTML","CSS","JavaScript","REST API"]}]}get totalProjects(){return this.aiml.length+this.cybersec.length+this.websites.length}onWindowScroll(){if(!Ut(this.platformId))return;let t=window.scrollY||document.documentElement.scrollTop,i=document.documentElement.scrollHeight-window.innerHeight;this.scrollPercent=i>0?t/i*100:0;let r=["aiml","cybersec","websites"],s=window.scrollY+window.innerHeight/3;for(let o of r){let a=document.getElementById(o);a&&a.offsetTop<=s&&a.offsetTop+a.offsetHeight>s&&(this.activeSection=o)}}scrollToSection(t){Ut(this.platformId)&&(document.getElementById(t)?.scrollIntoView({behavior:"smooth",block:"start"}),this.activeSection=t)}ngOnInit(){Ut(this.platformId)&&this.loadAssets(),setTimeout(()=>this.initReveal(),100)}ngOnDestroy(){this.revealObserver?.disconnect()}loadAssets(){["https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"].forEach(i=>{if(!document.querySelector(`link[href="${i}"]`)){let r=this.renderer.createElement("link");this.renderer.setAttribute(r,"rel","stylesheet"),this.renderer.setAttribute(r,"href",i),this.renderer.appendChild(document.head,r)}})}initReveal(){let t=this.el.nativeElement.querySelectorAll(".reveal");this.revealObserver=new IntersectionObserver(i=>i.forEach(r=>{r.target.classList.toggle("visible",r.isIntersecting)}),{threshold:.08}),t.forEach(i=>this.revealObserver.observe(i))}copyToClipboard(t,i){navigator.clipboard.writeText(t).then(()=>{let r=document.getElementById(`message-${i}`);r&&(r.textContent="Copied!",setTimeout(()=>r.textContent="Copy",2e3))})}static{this.\u0275fac=function(i){return new(i||n)(Ze(bn),Ze(hi),Ze(an))}}static{this.\u0275cmp=xn({type:n,selectors:[["app-projects"]],hostBindings:function(i,r){i&1&&ke("scroll",function(){return r.onWindowScroll()},!1,Gi)},standalone:!0,features:[Mn],decls:123,vars:18,consts:[[1,"fixed","left-6","top-1/2","-translate-y-1/2","z-50","hidden","lg:flex","flex-col","gap-6","font-mono","text-[10px]","select-none"],[1,"absolute","left-[3px]","top-2","bottom-2","w-px","bg-white/[0.04]","overflow-hidden"],[1,"bg-red-600","w-full","transition-all","duration-200"],[1,"step-item","group","flex","items-center","gap-4","text-white/20","hover:text-white","transition-all","duration-300",3,"click"],[1,"step-dot","w-2","h-2","rounded-full","border","border-white/20","bg-transparent","group-hover:border-red-500","transition-all","duration-300"],[1,"tracking-widest"],[1,"fixed","right-6","bottom-8","z-40","hidden","xl:flex","flex-col","gap-1","font-mono","text-[9px]","text-white/20","text-right","select-none","pointer-events-none"],[1,"text-red-500/60","font-bold"],[1,"text-red-500/40"],[1,"relative","z-10","w-full","overflow-hidden","bg-transparent"],[1,"relative","pt-32","pb-16","px-6","md:px-24"],[1,"max-w-5xl","mx-auto","w-full"],[1,"grid","grid-cols-1","lg:grid-cols-12","gap-12","items-end"],[1,"lg:col-span-8","flex","flex-col","gap-6"],[1,"reveal","opacity-0","translate-y-8","transition-all","duration-700"],[1,"font-mono","text-[10px]","tracking-[0.2em]","text-red-500","uppercase","border","border-red-500/30","px-3","py-1","bg-red-500/5","rounded"],[1,"reveal","opacity-0","translate-y-8","transition-all","duration-700",2,"transition-delay","0.1s"],[1,"font-black","text-white","leading-[0.9]","tracking-tight","uppercase",2,"font-size","clamp(3rem, 7.5vw, 5.6rem)"],[1,"outlined-text","text-transparent",2,"-webkit-text-stroke","1.5px rgba(255,255,255,0.85)"],[1,"reveal","opacity-0","translate-y-8","transition-all","duration-700",2,"transition-delay","0.2s"],[1,"text-white/95","text-[14px]","leading-relaxed","max-w-lg","font-light"],[1,"reveal","opacity-0","translate-y-8","transition-all","duration-700","flex","flex-wrap","gap-3","mt-2",2,"transition-delay","0.3s"],[1,"btn-primary",3,"click"],[1,"fas","fa-brain","text-xs"],[1,"btn-ghost",3,"click"],[1,"fas","fa-shield-halved","text-xs"],[1,"fas","fa-globe","text-xs"],[1,"lg:col-span-4","reveal","opacity-0","translate-y-8","transition-all","duration-700","hidden","lg:block",2,"transition-delay","0.2s"],[1,"rounded-xl","border","border-white/[0.05]","bg-black/60","backdrop-blur","p-5","font-mono","text-[9px]","text-white/95","flex","flex-col","gap-2.5"],[1,"flex","items-center","justify-between","border-b","border-white/[0.06]","pb-2"],[1,"text-red-500","font-semibold","uppercase"],[1,"w-1.5","h-1.5","rounded-full","bg-red-500","animate-pulse"],[1,"text-[8px]","text-red-500/60","mt-3","pt-2","border-t","border-white/[0.05]"],[1,"section-divider"],["id","aiml",1,"relative","pt-20","pb-24","px-6","md:px-24","border-b","border-white/[0.02]"],[1,"eyebrow"],[1,"inline-block","w-8","h-px","bg-red-500/60"],[1,"font-bold","text-white","tracking-tight","uppercase","mb-4",2,"font-size","clamp(2.2rem, 6vw, 3.8rem)"],[1,"text-white/95","text-[13px]","font-light","max-w-lg","mb-12","leading-relaxed"],[1,"flex","flex-col","gap-8"],["class","skill-card reveal opacity-0 translate-y-8 transition-all duration-700 rounded-xl border border-white/[0.04] bg-neutral-950/45 p-6 md:p-8 hover:border-red-500/30 transition-all duration-300 relative group",3,"transition-delay",4,"ngFor","ngForOf"],["id","cybersec",1,"relative","py-24","px-6","md:px-24","border-b","border-white/[0.02]"],["id","websites",1,"relative","py-24","px-6","md:px-24"],[1,"grid","grid-cols-1","md:grid-cols-2","gap-6"],["class","skill-card reveal opacity-0 translate-y-8 transition-all duration-700 rounded-xl border border-white/[0.04] bg-neutral-950/45 hover:border-red-500/30 transition-all duration-300 relative group overflow-hidden",3,"transition-delay",4,"ngFor","ngForOf"],[1,"flex","justify-center","mt-20"],["title","Back to top",1,"w-10","h-10","rounded-full","border","border-white/10","hover:border-red-600","bg-neutral-950","text-white/95","hover:text-red-400","flex","items-center","justify-center","transition-all","hover:-translate-y-1",3,"click"],[1,"fas","fa-arrow-up","text-xs"],[1,"skill-card","reveal","opacity-0","translate-y-8","transition-all","duration-700","rounded-xl","border","border-white/[0.04]","bg-neutral-950/45","p-6","md:p-8","hover:border-red-500/30","transition-all","duration-300","relative","group"],[1,"absolute","top-0","right-0","p-3","font-mono","text-[9px]","text-white/95","tracking-widest","group-hover:text-red-500/20","transition-all"],[1,"grid","grid-cols-1","lg:grid-cols-2","gap-6","lg:gap-10","items-start"],[1,"flex","flex-col","gap-4","sm:gap-5"],[1,"flex","items-center","gap-3"],[1,"font-mono","text-[9px]","tracking-[0.2em]","text-red-500","uppercase","border","border-red-500/30","px-3","py-1","bg-red-500/5","rounded"],[1,"font-black","text-white","tracking-tight","leading-[0.95]","uppercase",2,"font-size","clamp(1.5rem,3.4vw,2.1rem)"],[1,"text-white/95","text-[13px]","leading-relaxed","font-light"],[1,"flex","flex-wrap","gap-2"],["class",`text-[9px] font-mono font-semibold tracking-widest uppercase
                    bg-white/[0.02] border border-white/[0.06] hover:border-red-600/30
                    text-white/95 hover:text-red-400/70 px-2.5 py-1 rounded
                    transition-all duration-200 cursor-default`,4,"ngFor","ngForOf"],["target","_blank",1,"btn-ghost","self-start","text-[10px]","font-mono","mt-1",3,"href"],[1,"fab","fa-github","text-sm"],[1,"group/code","relative"],[1,"flex","items-center","justify-between","bg-black/60","backdrop-blur","border","border-white/[0.05]","border-b-0","rounded-t-xl","px-4","py-3"],[1,"flex","items-center","gap-1.5"],[1,"w-2.5","h-2.5","rounded-full","bg-red-500/80"],[1,"w-2.5","h-2.5","rounded-full","bg-yellow-500/80"],[1,"w-2.5","h-2.5","rounded-full","bg-green-500/80"],[1,"text-[9px]","font-mono","font-bold","tracking-widest","uppercase","text-white/95"],[1,"flex","items-center","gap-1.5","text-white/95","hover:text-red-400","text-[9px]","font-mono","font-bold","tracking-widest","uppercase","transition-all","duration-200",3,"click"],[1,"fas","fa-copy","text-xs"],[3,"id"],[1,"terminal-drawer","bg-black/60","backdrop-blur","border","border-white/[0.05]","border-t-0","rounded-b-xl","p-4","sm:p-5","overflow-x-auto","text-[11px]","leading-relaxed","text-white/95","max-h-72"],[1,"text-[9px]","font-mono","font-semibold","tracking-widest","uppercase","bg-white/[0.02]","border","border-white/[0.06]","hover:border-red-600/30","text-white/95","hover:text-red-400/70","px-2.5","py-1","rounded","transition-all","duration-200","cursor-default"],[1,"flex","items-center","gap-2","flex-wrap"],[1,"flex","items-center","gap-1.5","font-mono","text-[9px]","tracking-widest","uppercase","text-amber-400/70","border","border-amber-500/20","bg-amber-500/[.06]","px-2.5","py-1","rounded"],[1,"fas","fa-triangle-exclamation",2,"font-size","8px"],[1,"flex","flex-wrap","gap-2","mt-1"],["target","_blank",1,"btn-ghost","text-[10px]","font-mono",3,"href"],["target","_blank","class","btn-primary text-[10px] font-mono",3,"href",4,"ngIf"],["target","_blank",1,"btn-primary","text-[10px]","font-mono",3,"href"],[1,"skill-card","reveal","opacity-0","translate-y-8","transition-all","duration-700","rounded-xl","border","border-white/[0.04]","bg-neutral-950/45","hover:border-red-500/30","transition-all","duration-300","relative","group","overflow-hidden"],[1,"absolute","top-0","right-0","p-3","z-10","font-mono","text-[9px]","text-white/95","tracking-widest","group-hover:text-red-500/40","transition-all"],[1,"relative","overflow-hidden"],[1,"flex","items-center","gap-3","bg-black/60","backdrop-blur","px-4","py-2.5","border-b","border-white/[0.05]"],[1,"w-2.5","h-2.5","rounded-full","bg-red-500/70"],[1,"w-2.5","h-2.5","rounded-full","bg-yellow-500/70"],[1,"w-2.5","h-2.5","rounded-full","bg-green-500/70"],[1,"flex-1","bg-white/[0.03]","rounded-full","px-3","py-1","flex","items-center","gap-2","border","border-white/[0.05]"],[1,"fas","fa-lock","text-white/95",2,"font-size","8px"],[1,"text-white/95","text-[10px]","font-mono","truncate"],[1,"w-full","h-44","object-cover","transition-transform","duration-700","group-hover:scale-105",3,"src","alt"],[1,"absolute","inset-0","bg-gradient-to-t","from-black/90","via-black/20","to-transparent","opacity-0","group-hover:opacity-100","transition-opacity","duration-400","flex","items-end","p-4"],["target","_blank",1,"btn-primary","text-[9px]","font-mono",3,"href"],[1,"fas","fa-external-link-alt",2,"font-size","9px"],[1,"p-6","flex","flex-col","gap-3"],[1,"font-black","text-white","tracking-tight","uppercase","text-lg"],[1,"text-white/95","text-[12.5px]","leading-relaxed","font-light"],["class",`text-[9px] font-mono font-semibold tracking-widest uppercase
                  bg-white/[0.02] border border-white/[0.06] hover:border-red-600/30
                  text-white/95 hover:text-red-400/70 px-2.5 py-1 rounded
                  transition-all duration-200 cursor-default`,4,"ngFor","ngForOf"]],template:function(i,r){i&1&&(M(0,"div",0)(1,"div",1),q(2,"div",2),T(),M(3,"button",3),ke("click",function(){return r.scrollToSection("aiml")}),q(4,"span",4),M(5,"span",5),P(6,"01 // AI_ML"),T()(),M(7,"button",3),ke("click",function(){return r.scrollToSection("cybersec")}),q(8,"span",4),M(9,"span",5),P(10,"02 // SECURITY"),T()(),M(11,"button",3),ke("click",function(){return r.scrollToSection("websites")}),q(12,"span",4),M(13,"span",5),P(14,"03 // WEBSITES"),T()()(),M(15,"div",6)(16,"div"),P(17,"REPO_INDEX: "),M(18,"span",7),P(19),T()(),M(20,"div"),P(21),bu(22,"uppercase"),T(),M(23,"div"),P(24,"STACK: PY // TS // SQL"),T(),M(25,"div"),P(26,"SOURCE_CONTROL: GIT_VERIFIED"),T(),M(27,"div"),P(28,"BUILD_STATUS: "),M(29,"span",7),P(30,"PASSING"),T()(),M(31,"div",8),P(32,"OPERATOR: MELVIN_JAMES"),T()(),M(33,"div",9)(34,"section",10)(35,"div",11)(36,"div",12)(37,"div",13)(38,"div",14)(39,"span",15),P(40," // PROJECT_ARCHIVE "),T()(),M(41,"div",16)(42,"h1",17),P(43," MY"),q(44,"br"),M(45,"span",18),P(46,"PROJECTS"),T()()(),M(47,"div",19)(48,"p",20),P(49," Stuff I built from scratch \u2014 offline ML pipelines that parse security logs, scanners that break bad builds, and web apps built to actual professional standards. "),T()(),M(50,"div",21)(51,"button",22),ke("click",function(){return r.scrollToSection("aiml")}),P(52," AI / ML "),q(53,"i",23),T(),M(54,"button",24),ke("click",function(){return r.scrollToSection("cybersec")}),P(55," SECURITY "),q(56,"i",25),T(),M(57,"button",24),ke("click",function(){return r.scrollToSection("websites")}),P(58," WEBSITES "),q(59,"i",26),T()()(),M(60,"div",27)(61,"div",28)(62,"div",29)(63,"span",30),P(64,"MANIFEST_LOGS"),T(),q(65,"span",31),T(),M(66,"div"),P(67),T(),M(68,"div"),P(69),T(),M(70,"div"),P(71),T(),M(72,"div"),P(73,"[OK] REPO_LINKS: VERIFIED"),T(),M(74,"div",32),P(75," $ git log --oneline -n 1"),q(76,"br"),P(77," INFO: All builds passing with top performance. "),T()()()()()(),q(78,"div",33),M(79,"section",34)(80,"div",11)(81,"div",14)(82,"p",35),q(83,"i",23),P(84," INTELLIGENCE "),q(85,"span",36),T(),M(86,"h2",37),P(87," AI & ML PROJECTS "),T(),M(88,"p",38),P(89," Machine learning pipelines built from scratch \u2014 offline RAG systems, log classifiers, zero copy-pasting. "),T()(),M(90,"div",39),vt(91,ZR,32,10,"div",40),T()()(),q(92,"div",33),M(93,"section",41)(94,"div",11)(95,"div",14)(96,"p",35),q(97,"i",25),P(98," OFFENSIVE & DEFENSIVE "),q(99,"span",36),T(),M(100,"h2",37),P(101," CYBER SECURITY "),T(),M(102,"p",38),P(103," Tools I built to scan, break, and harden systems \u2014 built to real industry standards. "),T()(),M(104,"div",39),vt(105,QR,37,11,"div",40),T()()(),q(106,"div",33),M(107,"section",42)(108,"div",11)(109,"div",14)(110,"p",35),q(111,"i",26),P(112," SHIPPED & LIVE "),q(113,"span",36),T(),M(114,"h2",37),P(115," WEBSITES & APPS "),T(),M(116,"p",38),P(117," Clean web applications shipped live \u2014 high performance, custom features, and zero compromises on design. "),T()(),M(118,"div",43),vt(119,tP,33,12,"div",44),T(),M(120,"div",45)(121,"button",46),ke("click",function(){return r.scrollToSection("aiml")}),q(122,"i",47),T()()()()()),i&2&&(X(2),Lt("height",r.scrollPercent,"%"),X(),Wt("active-step",r.activeSection==="aiml"),X(4),Wt("active-step",r.activeSection==="cybersec"),X(4),Wt("active-step",r.activeSection==="websites"),X(8),Je("",r.totalProjects," ENTRIES"),X(2),Je("SECTOR: ",Su(22,16,r.activeSection),""),X(46),Je("[OK] AI_ML_ENTRIES: ",r.aiml.length," loaded"),X(2),Je("[OK] SECURITY_ENTRIES: ",r.cybersec.length," loaded"),X(2),Je("[OK] WEBSITE_ENTRIES: ",r.websites.length," loaded"),X(20),Pe("ngForOf",r.aiml),X(14),Pe("ngForOf",r.cybersec),X(14),Pe("ngForOf",r.websites))},dependencies:[Zn,Wr,jr,Iu,Jr],styles:["[_nghost-%COMP%]{display:block}.reveal[_ngcontent-%COMP%]{transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1)}.reveal.visible[_ngcontent-%COMP%], .reveal[_ngcontent-%COMP%]:not(.opacity-0){opacity:1!important;transform:translateY(0)!important}.step-item[_ngcontent-%COMP%]{position:relative;background:transparent;border:none;cursor:pointer;outline:none}.step-item.active-step[_ngcontent-%COMP%]{color:#fff!important}.step-item.active-step[_ngcontent-%COMP%]   .step-dot[_ngcontent-%COMP%]{background-color:#dc2626!important;border-color:#dc2626!important;box-shadow:0 0 10px #dc2626,0 0 20px #dc262666;transform:scale(1.25)}.outlined-text[_ngcontent-%COMP%]{-webkit-text-stroke:1.5px rgba(255,255,255,.85);color:transparent}.skill-card[_ngcontent-%COMP%]{transition:all .3s cubic-bezier(.22,1,.36,1)}.skill-card[_ngcontent-%COMP%]:hover{transform:translateY(-2px)}.terminal-drawer[_ngcontent-%COMP%]{max-height:280px;overflow-y:auto}.terminal-drawer[_ngcontent-%COMP%]::-webkit-scrollbar{width:4px}.terminal-drawer[_ngcontent-%COMP%]::-webkit-scrollbar-track{background:#020202}.terminal-drawer[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:#dc26264d;border-radius:2px}"]})}}return n})();var lS=[{path:"",component:sS},{path:"projects",component:aS},{path:"about",component:oS}];var cS={providers:[Jb(lS)]};var nP=()=>({exact:!0});function iP(n,e){if(n&1){let t=Ei();M(0,"div",23),ke("click",function(){Dn(t);let r=Sn();return Rn(r.closeMenu())}),T()}}var uS=(()=>{class n{constructor(t,i){this.platformId=t,this.router=i,this.menuOpen=!1,this.isScrolled=!1,this.scrollProgress=0}ngOnInit(){Ut(this.platformId)&&this.updateScroll()}onWindowScroll(){this.updateScroll()}updateScroll(){let t=window.scrollY||document.documentElement.scrollTop;this.isScrolled=t>20;let i=document.documentElement.scrollHeight-window.innerHeight;this.scrollProgress=i>0?t/i*100:0}toggleMenu(){this.menuOpen=!this.menuOpen}closeMenu(){this.menuOpen=!1}navigateTo(t){this.closeMenu(),Ut(this.platformId)&&this.router.navigate([t])}scrollToSection(t){if(this.closeMenu(),!Ut(this.platformId))return;this.router.url.split("#")[0].split("?")[0]!=="/"?this.router.navigate(["/"]).then(()=>{setTimeout(()=>this.scroll(t),120)}):this.scroll(t)}scroll(t){setTimeout(()=>{let i=document.getElementById(t);i&&i.scrollIntoView({behavior:"smooth",block:"start"})},80)}static{this.\u0275fac=function(i){return new(i||n)(Ze(an),Ze(Hn))}}static{this.\u0275cmp=xn({type:n,selectors:[["app-navbar"]],hostBindings:function(i,r){i&1&&ke("scroll",function(){return r.onWindowScroll()},!1,Gi)},standalone:!0,features:[Mn],decls:42,vars:37,consts:[["home","routerLinkActive"],["projects","routerLinkActive"],["about","routerLinkActive"],[1,"scroll-progress"],[1,"nav-header","fixed","top-0","left-0","w-full","z-50","px-6","md:px-12","py-5","flex","items-center","justify-between","border-b","border-transparent","bg-transparent"],[1,"text-lg","md:text-xl","font-bold","tracking-tight","text-white","select-none","no-underline","cursor-pointer",2,"font-family","'Space Grotesk',sans-serif","letter-spacing","-0.02em",3,"click"],[1,"text-red-500"],[1,"hidden","md:flex","items-center","gap-1"],["routerLink","/","routerLinkActive","text-white",1,"group","relative","px-4","py-2","text-[13px]","font-medium","tracking-wide","text-white/70","transition-colors","duration-300","hover:text-white",3,"routerLinkActiveOptions"],[1,"absolute","bottom-0","left-1/2","h-0.5","-translate-x-1/2","rounded-full","bg-red-500","transition-all","duration-300"],["routerLink","/projects","routerLinkActive","text-white",1,"group","relative","px-4","py-2","text-[13px]","font-medium","tracking-wide","text-white/70","transition-colors","duration-300","hover:text-white"],["routerLink","/about","routerLinkActive","text-white",1,"group","relative","px-4","py-2","text-[13px]","font-medium","tracking-wide","text-white/70","transition-colors","duration-300","hover:text-white"],["id","mobile-menu-btn","aria-label","Toggle menu",1,"md:hidden","w-9","h-9","rounded-lg","border","border-white/10","hover:border-white/20","bg-white/[0.03]","flex","flex-col","justify-center","items-center","gap-1.5","transition-all","duration-200","group",3,"click"],[1,"block","w-4","h-[1.5px]","bg-white/60","transition-all","duration-300","origin-center"],[1,"block","w-4","h-[1.5px]","bg-white/60","transition-all","duration-200"],[1,"fixed","top-[73px]","left-0","w-full","z-40","md:hidden","px-4","transition-all","duration-300","ease-out"],[1,"rounded-2xl","bg-[#0f0f0f]/98","backdrop-blur-2xl","border","border-white/[0.08]","overflow-hidden","shadow-2xl","shadow-black/60"],[1,"flex","flex-col","p-3","gap-1"],[1,"flex","items-center","gap-3","text-white/95","hover:text-white","hover:bg-white/[0.04]","text-[14px]","font-medium","px-4","py-3","rounded-xl","transition-all","duration-150","no-underline","cursor-pointer",3,"click"],[1,"border-t","border-white/[0.05]","p-4"],["href","mailto:melvin.mj576@gmail.com",1,"flex","items-center","justify-center","gap-2","bg-red-600/10","border","border-red-600/20","hover:bg-red-600/20","text-red-400","hover:text-red-300","text-[13px]","font-medium","px-4","py-3","rounded-xl","transition-all","duration-150","no-underline","cursor-pointer"],[1,"fas","fa-envelope","text-xs"],["class","fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden",3,"click",4,"ngIf"],[1,"fixed","inset-0","z-30","bg-black/50","backdrop-blur-sm","md:hidden",3,"click"]],template:function(i,r){if(i&1){let s=Ei();q(0,"div",3),M(1,"header",4)(2,"a",5),ke("click",function(){return Dn(s),Rn(r.navigateTo("/"))}),M(3,"span",6),P(4,"<"),T(),P(5,"Melvin"),M(6,"span",6),P(7,"/"),T(),P(8,"James"),M(9,"span",6),P(10,">"),T()(),M(11,"nav",7)(12,"a",8,0),P(14," Home "),q(15,"span",9),T(),M(16,"a",10,1),P(18," Projects "),q(19,"span",9),T(),M(20,"a",11,2),P(22," About "),q(23,"span",9),T()(),M(24,"button",12),ke("click",function(){return Dn(s),Rn(r.toggleMenu())}),q(25,"span",13)(26,"span",14)(27,"span",13),T()(),M(28,"div",15)(29,"div",16)(30,"nav",17)(31,"a",18),ke("click",function(){return Dn(s),Rn(r.navigateTo("/"))}),P(32," Home "),T(),M(33,"a",18),ke("click",function(){return Dn(s),Rn(r.navigateTo("/projects"))}),P(34," Projects "),T(),M(35,"a",18),ke("click",function(){return Dn(s),Rn(r.navigateTo("/about"))}),P(36," About "),T()(),M(37,"div",19)(38,"a",20),q(39,"i",21),P(40," melvin.mj576@gmail.com "),T()()()(),vt(41,iP,1,0,"div",22)}if(i&2){let s=_u(13),o=_u(17),a=_u(21);Lt("width",r.scrollProgress+"%"),X(),Wt("scrolled",r.isScrolled),X(11),Pe("routerLinkActiveOptions",P_(36,nP)),X(3),Wt("w-0",!s.isActive)("w-6",s.isActive),X(4),Wt("w-0",!o.isActive)("w-6",o.isActive),X(4),Wt("w-0",!a.isActive)("w-6",a.isActive),X(2),Wt("rotate-45",r.menuOpen)("translate-y-[6px]",r.menuOpen),X(),Wt("opacity-0",r.menuOpen),X(),Wt("-rotate-45",r.menuOpen)("-translate-y-[6px]",r.menuOpen),X(),Wt("opacity-0",!r.menuOpen)("pointer-events-none",!r.menuOpen)("-translate-y-2",!r.menuOpen)("translate-y-0",r.menuOpen),X(13),Pe("ngIf",r.menuOpen)}},dependencies:[Zn,jr,Jr,qu,Yb],styles:['.scroll-progress[_ngcontent-%COMP%]{position:fixed;top:0;left:0;height:2px;background:linear-gradient(to right,#b91515,#e02020,#f87171);z-index:9999;transition:width .1s linear;transform-origin:left;border-radius:0 2px 2px 0;box-shadow:0 0 8px #e0202080}.nav-header[_ngcontent-%COMP%]{transition:background-color .4s ease,border-color .4s ease,box-shadow .4s ease}.nav-header.scrolled[_ngcontent-%COMP%]{background-color:#080808e0!important;border-bottom-color:#ffffff0d!important;box-shadow:0 1px #ffffff0a,0 8px 40px #0009;backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px)}.nav-link.active-route[_ngcontent-%COMP%]{color:#ffffffe6!important;position:relative}.nav-link.active-route[_ngcontent-%COMP%]:after{content:"";position:absolute;bottom:4px;left:50%;transform:translate(-50%);width:16px;height:1.5px;background:#e02020;border-radius:999px}@keyframes _ngcontent-%COMP%_drawerIn{0%{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}']})}}return n})();var dS=(()=>{class n{constructor(){this.year=new Date().getFullYear()}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=xn({type:n,selectors:[["app-footer"]],standalone:!0,features:[Mn],decls:29,vars:1,consts:[[1,"bg-neutral-950","border-t","border-white/[0.06]","px-6","py-8"],[1,"max-w-5xl","mx-auto","flex","flex-col","sm:flex-row","items-center","justify-between","gap-4"],[1,"flex","flex-col","sm:flex-row","items-center","gap-3","text-center","sm:text-left"],[1,"text-[15px]","font-black","tracking-tight","text-white"],[1,"text-red-500"],[1,"hidden","sm:block","w-px","h-4","bg-white/10"],["href","mailto:melvin.mj576@gmail.com",1,"text-white/95","hover:text-red-400","text-[12px]","font-medium","tracking-wide","transition-colors","duration-200"],[1,"text-white/95","text-[11px]","tracking-widest","uppercase","order-last","sm:order-none"],[1,"flex","items-center","gap-3"],["href","https://twitter.com/MelvinJame61516","target","_blank",1,"w-9","h-9","rounded-full","bg-neutral-900","border","border-white/[0.07]","hover:border-red-600/40","hover:bg-red-600/10","flex","items-center","justify-center","text-white/95","hover:text-red-400","transition-all","duration-200","hover:-translate-y-0.5"],["fill","currentColor","viewBox","0 0 24 24",1,"w-4","h-4"],["d","M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"],["href","https://www.instagram.com/melvin._.james/","target","_blank",1,"w-9","h-9","rounded-full","bg-neutral-900","border","border-white/[0.07]","hover:border-red-600/40","hover:bg-red-600/10","flex","items-center","justify-center","text-white/95","hover:text-red-400","transition-all","duration-200","hover:-translate-y-0.5"],["fill","none","stroke","currentColor","stroke-width","2","stroke-linecap","round","stroke-linejoin","round","viewBox","0 0 24 24",1,"w-4","h-4"],["width","20","height","20","x","2","y","2","rx","5","ry","5"],["d","M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"],["href","https://www.linkedin.com/in/melvin-james-303561255/","target","_blank",1,"w-9","h-9","rounded-full","bg-neutral-900","border","border-white/[0.07]","hover:border-red-600/40","hover:bg-red-600/10","flex","items-center","justify-center","text-white/95","hover:text-red-400","transition-all","duration-200","hover:-translate-y-0.5"],["d","M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"],["cx","4","cy","4","r","2"]],template:function(i,r){i&1&&(M(0,"footer",0)(1,"div",1)(2,"div",2)(3,"span",3)(4,"span",4),P(5,"<"),T(),P(6,"Melvin"),M(7,"span",4),P(8,"/"),T(),P(9,"James"),M(10,"span",4),P(11,">"),T()(),q(12,"span",5),M(13,"a",6),P(14," melvin.mj576@gmail.com "),T()(),M(15,"p",7),P(16),T(),M(17,"div",8)(18,"a",9),wo(),M(19,"svg",10),q(20,"path",11),T()(),Ua(),M(21,"a",12),wo(),M(22,"svg",13),q(23,"rect",14)(24,"path",15),T()(),Ua(),M(25,"a",16),wo(),M(26,"svg",10),q(27,"path",17)(28,"circle",18),T()()()()()),i&2&&(X(16),Je(" \xA9 ",r.year," Melvin James "))},dependencies:[Zn,Jr],encapsulation:2})}}return n})();function rP(n,e){if(n&1&&q(0,"div",11),n&2){let t=e.$implicit;Lt("left",t.x,"px")("top",t.y,"px")("opacity",t.opacity)("width",t.size,"px")("height",t.size*1.4,"px")}}function sP(n,e){if(n&1&&q(0,"div",12),n&2){let t=e.$implicit;Lt("left",t.x,"px")("top",t.y,"px")("width",t.size,"px")("height",t.size*1.4,"px")("--tx",t.tx)("--ty",t.ty)}}function oP(n,e){if(n&1&&(xm(0),q(1,"div",1),wo(),M(2,"svg",2),q(3,"circle",3)(4,"line",4)(5,"line",5)(6,"line",6)(7,"line",7),T(),Ua(),q(8,"img",8),vt(9,rP,1,10,"div",9)(10,sP,1,12,"div",10),_m()),n&2){let t=Sn();X(),Lt("left",t.mx,"px")("top",t.my,"px"),Wt("hovered",t.isHovered)("clicked",t.isClicked),X(),Lt("left",t.rx,"px")("top",t.ry,"px"),Wt("hovered",t.isHovered)("clicked",t.isClicked),X(6),Lt("left",t.gx,"px")("top",t.gy,"px"),Wt("state-idle",t.sprite==="idle")("state-hover",t.sprite==="hover")("state-click",t.sprite==="click"),Pe("src","assets/cursors/cursor_"+t.sprite+".png",Yn),X(),Pe("ngForOf",t.trail),X(),Pe("ngForOf",t.splash)("ngForTrackBy",t.trackById)}}var fS=(()=>{class n{get sprite(){return this.isClicked?"click":this.isHovered?"hover":"idle"}constructor(t,i){this.zone=t,this.cdr=i,this.isMobile=!1,this.mx=-200,this.my=-200,this.gx=-200,this.gy=-200,this.rx=-200,this.ry=-200,this.isHovered=!1,this.isClicked=!1,this.splashId=0,this.trail=Array.from({length:10},(r,s)=>({x:-200,y:-200,opacity:+((10-s)/10*.45).toFixed(2),size:+(7-s*.6).toFixed(1)})),this.splash=[],this.pos=Array(10).fill({x:-200,y:-200}),this.cleanups=[]}onMove(t){this.mx=t.clientX,this.my=t.clientY}onDown(){this.isMobile||(this.isClicked=!0,this.spawnSplash(this.mx,this.my),setTimeout(()=>{this.isClicked=!1,this.cdr.markForCheck()},200))}ngOnInit(){if(this.isMobile=this.detectMobile(),this.isMobile){document.documentElement.style.setProperty("cursor","auto","important");return}this.zone.runOutsideAngular(()=>this.loop()),setTimeout(()=>this.bindHovers(),300)}ngOnDestroy(){cancelAnimationFrame(this.raf),this.cleanups.forEach(t=>t())}detectMobile(){return!!(window.matchMedia("(pointer: coarse)").matches||window.innerWidth<=768)}loop(){let t=(i,r,s)=>i+(r-i)*s;this.rx=t(this.rx,this.mx,.18),this.ry=t(this.ry,this.my,.18),this.gx=t(this.gx,this.mx,.09),this.gy=t(this.gy,this.my,.09);for(let i=9;i>0;i--)this.pos[i]=this.pos[i-1];this.pos[0]={x:this.mx,y:this.my},this.trail.forEach((i,r)=>{i.x=this.pos[r].x,i.y=this.pos[r].y}),this.cdr.markForCheck(),this.raf=requestAnimationFrame(()=>this.loop())}spawnSplash(t,i){this.splash=Array.from({length:16},()=>{let r=Math.random()*Math.PI*2,s=25+Math.random()*70;return{x:t,y:i,tx:(Math.cos(r)*s).toFixed(1)+"px",ty:(Math.sin(r)*s).toFixed(1)+"px",size:+(3+Math.random()*9).toFixed(1),id:this.splashId++}}),setTimeout(()=>{this.splash=[],this.cdr.markForCheck()},850)}bindHovers(){document.querySelectorAll("a, button, input, textarea, select, [data-hover], [routerLink], [href]").forEach(r=>{let s=()=>{this.isHovered=!0,this.cdr.markForCheck()},o=()=>{this.isHovered=!1,this.cdr.markForCheck()};r.addEventListener("mouseenter",s),r.addEventListener("mouseleave",o),this.cleanups.push(()=>{r.removeEventListener("mouseenter",s),r.removeEventListener("mouseleave",o)})});let i=new MutationObserver(()=>{this.cleanups.forEach(r=>r()),this.cleanups=[],this.bindHovers()});i.observe(document.body,{childList:!0,subtree:!0}),this.cleanups.push(()=>i.disconnect())}trackById(t,i){return i.id}static{this.\u0275fac=function(i){return new(i||n)(Ze(kt),Ze(Gr))}}static{this.\u0275cmp=xn({type:n,selectors:[["app-gothic-cursor"]],hostBindings:function(i,r){i&1&&ke("mousemove",function(o){return r.onMove(o)},!1,Qp)("mousedown",function(){return r.onDown()},!1,Qp)},standalone:!0,features:[Mn],decls:1,vars:1,consts:[[4,"ngIf"],[1,"g-dot"],["viewBox","0 0 40 40","xmlns","http://www.w3.org/2000/svg",1,"g-ring"],["cx","20","cy","20","r","14","fill","none","stroke","#cc0000","stroke-width","0.8","opacity","0.6"],["x1","20","y1","2","x2","20","y2","10","stroke","#cc0000","stroke-width","0.8","opacity","0.7"],["x1","20","y1","30","x2","20","y2","38","stroke","#cc0000","stroke-width","0.8","opacity","0.7"],["x1","2","y1","20","x2","10","y2","20","stroke","#cc0000","stroke-width","0.8","opacity","0.7"],["x1","30","y1","20","x2","38","y2","20","stroke","#cc0000","stroke-width","0.8","opacity","0.7"],["alt","","aria-hidden","true",1,"g-girl",3,"src"],["class","blood-drop",3,"left","top","opacity","width","height",4,"ngFor","ngForOf"],["class","splash-drop",3,"left","top","width","height","--tx","--ty",4,"ngFor","ngForOf","ngForTrackBy"],[1,"blood-drop"],[1,"splash-drop"]],template:function(i,r){i&1&&vt(0,oP,11,30,"ng-container",0),i&2&&Pe("ngIf",!r.isMobile)},dependencies:[Zn,Wr,jr],styles:["[_nghost-%COMP%]{pointer-events:none;-webkit-user-select:none;user-select:none}.g-dot[_ngcontent-%COMP%]{position:fixed;width:7px;height:7px;background:#c00;border-radius:50%;transform:translate(-50%,-50%);z-index:99999;pointer-events:none;transition:width .12s ease,height .12s ease,background .12s ease,box-shadow .12s ease}.g-dot.hovered[_ngcontent-%COMP%]{width:4px;height:4px;background:#ff3030;box-shadow:0 0 6px 2px #f006}.g-dot.clicked[_ngcontent-%COMP%]{width:18px;height:18px;background:red;box-shadow:0 0 16px 6px #f008;transition:width .06s ease,height .06s ease}.g-ring[_ngcontent-%COMP%]{position:fixed;width:40px;height:40px;transform:translate(-50%,-50%) rotate(0);z-index:99998;pointer-events:none;transition:transform .3s ease,width .3s ease,height .3s ease,opacity .3s ease;opacity:.7;animation:_ngcontent-%COMP%_ring-spin 8s linear infinite}.g-ring.hovered[_ngcontent-%COMP%]{width:60px;height:60px;opacity:1;animation:_ngcontent-%COMP%_ring-spin 2s linear infinite}.g-ring.clicked[_ngcontent-%COMP%]{width:80px;height:80px;opacity:1;animation:_ngcontent-%COMP%_ring-spin .4s linear infinite}@keyframes _ngcontent-%COMP%_ring-spin{0%{transform:translate(-50%,-50%) rotate(0)}to{transform:translate(-50%,-50%) rotate(360deg)}}.g-girl[_ngcontent-%COMP%]{position:fixed;width:90px;height:90px;transform:translate(-50%,-50%);z-index:99997;pointer-events:none;image-rendering:pixelated;image-rendering:crisp-edges;transition:filter .25s ease;filter:drop-shadow(0 0 0px transparent)}.g-girl.state-idle[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_girl-float 3s ease-in-out infinite;filter:drop-shadow(0 2px 8px #cc000033)}.g-girl.state-hover[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_girl-pulse .8s ease-in-out infinite alternate;filter:drop-shadow(0 0 10px #cc0000aa) drop-shadow(0 0 20px #88000066)}.g-girl.state-click[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_girl-shake .15s ease-in-out infinite;filter:drop-shadow(0 0 18px #ff0000cc) drop-shadow(0 0 35px #cc000088)}@keyframes _ngcontent-%COMP%_girl-float{0%,to{transform:translate(-50%,-50%) translateY(0) scale(1)}50%{transform:translate(-50%,-50%) translateY(-5px) scale(1.02)}}@keyframes _ngcontent-%COMP%_girl-pulse{0%{transform:translate(-50%,-50%) scale(1.05)}to{transform:translate(-50%,-50%) scale(1.18)}}@keyframes _ngcontent-%COMP%_girl-shake{0%{transform:translate(calc(-50% - 2px),-50%) scale(1.1) rotate(-1deg)}50%{transform:translate(calc(-50% + 2px),-50%) scale(1.1) rotate(1deg)}to{transform:translate(calc(-50% - 1px),-50%) scale(1.1) rotate(-.5deg)}}.blood-drop[_ngcontent-%COMP%]{position:fixed;z-index:99996;border-radius:50% 50% 50% 0;background:#8b0000;transform:translate(-50%,-50%) rotate(-45deg);pointer-events:none}.splash-drop[_ngcontent-%COMP%]{position:fixed;z-index:99995;border-radius:50% 50% 50% 0;background:#c00;pointer-events:none;transform:translate(-50%,-50%);animation:_ngcontent-%COMP%_splash-out .8s cubic-bezier(.25,.46,.45,.94) forwards}@keyframes _ngcontent-%COMP%_splash-out{0%{transform:translate(-50%,-50%) scale(1.2);opacity:1}to{transform:translate(calc(-50% + var(--tx)),calc(-50% + var(--ty))) scale(0);opacity:0}}@media (pointer: coarse),(max-width: 768px){*[_ngcontent-%COMP%]{cursor:auto!important}}"],changeDetection:0})}}return n})();var nf="184";var US=0,l0=1,BS=2;var Hl=1,VS=2,la=3,_r=0,Ln=1,gi=2,Qi=0,zs=1,ds=2,c0=3,u0=4,HS=5;var ss=100,zS=101,GS=102,WS=103,jS=104,$S=200,qS=201,XS=202,YS=203,Sd=204,Md=205,ZS=206,JS=207,KS=208,QS=209,eM=210,tM=211,nM=212,iM=213,rM=214,wd=0,Ed=1,Cd=2,Gs=3,Td=4,Ad=5,Id=6,Dd=7,d0=0,sM=1,oM=2,Ri=0,f0=1,h0=2,p0=3,m0=4,g0=5,v0=6,y0=7;var Kg=300,fs=301,$s=302,rf=303,sf=304,zl=306,Rd=1e3,Yi=1001,Pd=1002,un=1003,aM=1004;var Gl=1005;var gn=1006,of=1007;var hs=1008;var ri=1009,x0=1010,_0=1011,ca=1012,af=1013,Pi=1014,Ni=1015,er=1016,lf=1017,cf=1018,ua=1020,b0=35902,S0=35899,M0=1021,w0=1022,vi=1023,Zi=1026,ps=1027,E0=1028,uf=1029,ms=1030,df=1031;var ff=1033,Wl=33776,jl=33777,$l=33778,ql=33779,hf=35840,pf=35841,mf=35842,gf=35843,vf=36196,yf=37492,xf=37496,_f=37488,bf=37489,Xl=37490,Sf=37491,Mf=37808,wf=37809,Ef=37810,Cf=37811,Tf=37812,Af=37813,If=37814,Df=37815,Rf=37816,Pf=37817,Nf=37818,Of=37819,Lf=37820,Ff=37821,kf=36492,Uf=36494,Bf=36495,Vf=36283,Hf=36284,Yl=36285,zf=36286;var bl=2300,Nd=2301,bd=2302,Qg=2303,e0=2400,t0=2401,n0=2402;var lM=3200;var C0=0,cM=1,Mr="",ti="srgb",Sl="srgb-linear",Ml="linear",wt="srgb";var Vs=7680;var i0=519,uM=512,dM=513,fM=514,Gf=515,hM=516,pM=517,Wf=518,mM=519,r0=35044;var T0="300 es",Di=2e3,wl=2001;function aP(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function lP(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function El(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function gM(){let n=El("canvas");return n.style.display="block",n}var hS={},ea=null;function A0(...n){let e="THREE."+n.shift();ea?ea("log",e,...n):console.log(e,...n)}function vM(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ne(...n){n=vM(n);let e="THREE."+n.shift();if(ea)ea("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Ue(...n){n=vM(n);let e="THREE."+n.shift();if(ea)ea("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Od(...n){let e=n.join(" ");e in hS||(hS[e]=!0,Ne(...n))}function yM(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var xM={[wd]:Ed,[Cd]:Id,[Td]:Dd,[Gs]:Ad,[Ed]:wd,[Id]:Cd,[Dd]:Td,[Ad]:Gs},Ji=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},wn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],pS=1234567,xl=Math.PI/180,ta=180/Math.PI;function da(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(wn[n&255]+wn[n>>8&255]+wn[n>>16&255]+wn[n>>24&255]+"-"+wn[e&255]+wn[e>>8&255]+"-"+wn[e>>16&15|64]+wn[e>>24&255]+"-"+wn[t&63|128]+wn[t>>8&255]+"-"+wn[t>>16&255]+wn[t>>24&255]+wn[i&255]+wn[i>>8&255]+wn[i>>16&255]+wn[i>>24&255]).toLowerCase()}function dt(n,e,t){return Math.max(e,Math.min(t,n))}function I0(n,e){return(n%e+e)%e}function cP(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function uP(n,e,t){return n!==e?(t-n)/(e-n):0}function _l(n,e,t){return(1-t)*n+t*e}function dP(n,e,t,i){return _l(n,e,1-Math.exp(-t*i))}function fP(n,e=1){return e-Math.abs(I0(n,e*2)-e)}function hP(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function pP(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function mP(n,e){return n+Math.floor(Math.random()*(e-n+1))}function gP(n,e){return n+Math.random()*(e-n)}function vP(n){return n*(.5-Math.random())}function yP(n){n!==void 0&&(pS=n);let e=pS+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function xP(n){return n*xl}function _P(n){return n*ta}function bP(n){return(n&n-1)===0&&n!==0}function SP(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function MP(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function wP(n,e,t,i,r){let s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+i)/2),u=o((e+i)/2),d=s((e-i)/2),f=o((e-i)/2),h=s((i-e)/2),g=o((i-e)/2);switch(r){case"XYX":n.set(a*u,l*d,l*f,a*c);break;case"YZY":n.set(l*f,a*u,l*d,a*c);break;case"ZXZ":n.set(l*d,l*f,a*u,a*c);break;case"XZX":n.set(a*u,l*g,l*h,a*c);break;case"YXY":n.set(l*h,a*u,l*g,a*c);break;case"ZYZ":n.set(l*g,l*h,a*u,a*c);break;default:Ne("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ko(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Pn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var jf={DEG2RAD:xl,RAD2DEG:ta,generateUUID:da,clamp:dt,euclideanModulo:I0,mapLinear:cP,inverseLerp:uP,lerp:_l,damp:dP,pingpong:fP,smoothstep:hP,smootherstep:pP,randInt:mP,randFloat:gP,randFloatSpread:vP,seededRandom:yP,degToRad:xP,radToDeg:_P,isPowerOfTwo:bP,ceilPowerOfTwo:SP,floorPowerOfTwo:MP,setQuaternionFromProperEuler:wP,normalize:Pn,denormalize:Ko},Ct=class n{static{n.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(dt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(dt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ki=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3],f=s[o+0],h=s[o+1],g=s[o+2],x=s[o+3];if(d!==x||l!==f||c!==h||u!==g){let m=l*f+c*h+u*g+d*x;m<0&&(f=-f,h=-h,g=-g,x=-x,m=-m);let p=1-a;if(m<.9995){let S=Math.acos(m),w=Math.sin(S);p=Math.sin(p*S)/w,a=Math.sin(a*S)/w,l=l*p+f*a,c=c*p+h*a,u=u*p+g*a,d=d*p+x*a}else{l=l*p+f*a,c=c*p+h*a,u=u*p+g*a,d=d*p+x*a;let S=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=S,c*=S,u*=S,d*=S}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,o){let a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=s[o],f=s[o+1],h=s[o+2],g=s[o+3];return e[t]=a*g+u*d+l*h-c*f,e[t+1]=l*g+u*f+c*d-a*h,e[t+2]=c*g+u*h+a*f-l*d,e[t+3]=u*g-a*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),d=a(s/2),f=l(i/2),h=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=f*u*d+c*h*g,this._y=c*h*d-f*u*g,this._z=c*u*g+f*h*d,this._w=c*u*d-f*h*g;break;case"YXZ":this._x=f*u*d+c*h*g,this._y=c*h*d-f*u*g,this._z=c*u*g-f*h*d,this._w=c*u*d+f*h*g;break;case"ZXY":this._x=f*u*d-c*h*g,this._y=c*h*d+f*u*g,this._z=c*u*g+f*h*d,this._w=c*u*d-f*h*g;break;case"ZYX":this._x=f*u*d-c*h*g,this._y=c*h*d+f*u*g,this._z=c*u*g-f*h*d,this._w=c*u*d+f*h*g;break;case"YZX":this._x=f*u*d+c*h*g,this._y=c*h*d+f*u*g,this._z=c*u*g-f*h*d,this._w=c*u*d-f*h*g;break;case"XZY":this._x=f*u*d-c*h*g,this._y=c*h*d-f*u*g,this._z=c*u*g+f*h*d,this._w=c*u*d+f*h*g;break;default:Ne("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=i+a+d;if(f>0){let h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(s-c)*h,this._z=(o-r)*h}else if(i>a&&i>d){let h=2*Math.sqrt(1+i-a-d);this._w=(u-l)/h,this._x=.25*h,this._y=(r+o)/h,this._z=(s+c)/h}else if(a>d){let h=2*Math.sqrt(1+a-i-d);this._w=(s-c)/h,this._x=(r+o)/h,this._y=.25*h,this._z=(l+u)/h}else{let h=2*Math.sqrt(1+d-i-a);this._w=(o-r)/h,this._x=(s+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(dt(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let l=1-t;if(a<.9995){let c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},B=class n{static{n.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(mS.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(mS.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),d=2*(s*i-o*t);return this.x=t+l*c+o*d-a*u,this.y=i+l*u+a*c-s*d,this.z=r+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(dt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Dg.copy(this).projectOnVector(e),this.sub(Dg)}reflect(e){return this.sub(Dg.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(dt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Dg=new B,mS=new Ki,We=class n{static{n.prototype.isMatrix3=!0}constructor(e,t,i,r,s,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],f=i[2],h=i[5],g=i[8],x=r[0],m=r[3],p=r[6],S=r[1],w=r[4],E=r[7],R=r[2],C=r[5],I=r[8];return s[0]=o*x+a*S+l*R,s[3]=o*m+a*w+l*C,s[6]=o*p+a*E+l*I,s[1]=c*x+u*S+d*R,s[4]=c*m+u*w+d*C,s[7]=c*p+u*E+d*I,s[2]=f*x+h*S+g*R,s[5]=f*m+h*w+g*C,s[8]=f*p+h*E+g*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*s,h=c*s-o*l,g=t*d+i*f+r*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=d*x,e[1]=(r*c-u*i)*x,e[2]=(a*i-r*o)*x,e[3]=f*x,e[4]=(u*t-r*l)*x,e[5]=(r*s-a*t)*x,e[6]=h*x,e[7]=(i*l-c*t)*x,e[8]=(o*t-i*s)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){let l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Rg.makeScale(e,t)),this}rotate(e){return this.premultiply(Rg.makeRotation(-e)),this}translate(e,t){return this.premultiply(Rg.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Rg=new We,gS=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vS=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function EP(){let n={enabled:!0,workingColorSpace:Sl,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===wt&&(r.r=xr(r.r),r.g=xr(r.g),r.b=xr(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===wt&&(r.r=Qo(r.r),r.g=Qo(r.g),r.b=Qo(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Mr?Ml:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Od("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Od("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Sl]:{primaries:e,whitePoint:i,transfer:Ml,toXYZ:gS,fromXYZ:vS,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ti},outputColorSpaceConfig:{drawingBufferColorSpace:ti}},[ti]:{primaries:e,whitePoint:i,transfer:wt,toXYZ:gS,fromXYZ:vS,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ti}}}),n}var ut=EP();function xr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Qo(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Vo,Ld=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Vo===void 0&&(Vo=El("canvas")),Vo.width=e.width,Vo.height=e.height;let r=Vo.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Vo}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=El("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=xr(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(xr(t[i]/255)*255):t[i]=xr(t[i]);return{data:t,width:e.width,height:e.height}}else return Ne("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},CP=0,na=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:CP++}),this.uuid=da(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Pg(r[o].image)):s.push(Pg(r[o]))}else s=Pg(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function Pg(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ld.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ne("Texture: Unable to serialize Texture."),{})}var TP=0,Ng=new B,wr=(()=>{class n extends Ji{constructor(t=n.DEFAULT_IMAGE,i=n.DEFAULT_MAPPING,r=Yi,s=Yi,o=gn,a=hs,l=vi,c=ri,u=n.DEFAULT_ANISOTROPY,d=Mr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:TP++}),this.uuid=da(),this.name="",this.source=new na(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=s,this.magFilter=o,this.minFilter=a,this.anisotropy=u,this.format=l,this.internalFormat=null,this.type=c,this.offset=new Ct(0,0),this.repeat=new Ct(1,1),this.center=new Ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ng).x}get height(){return this.source.getSize(Ng).y}get depth(){return this.source.getSize(Ng).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let i in t){let r=t[i];if(r===void 0){Ne(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}let s=this[i];if(s===void 0){Ne(`Texture.setValues(): property '${i}' does not exist.`);continue}s&&r&&s.isVector2&&r.isVector2||s&&r&&s.isVector3&&r.isVector3||s&&r&&s.isMatrix3&&r.isMatrix3?s.copy(r):this[i]=r}}toJSON(t){let i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Kg)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Rd:t.x=t.x-Math.floor(t.x);break;case Yi:t.x=t.x<0?0:1;break;case Pd:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Rd:t.y=t.y-Math.floor(t.y);break;case Yi:t.y=t.y<0?0:1;break;case Pd:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}return n.DEFAULT_IMAGE=null,n.DEFAULT_MAPPING=Kg,n.DEFAULT_ANISOTROPY=1,n})(),qt=class n{static{n.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(c+1)/2,E=(h+1)/2,R=(p+1)/2,C=(u+f)/4,I=(d+x)/4,y=(g+m)/4;return w>E&&w>R?w<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(w),r=C/i,s=I/i):E>R?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=C/r,s=y/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=I/s,r=y/s),this.set(i,r,s,t),this}let S=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(f-u)*(f-u));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(d-x)/S,this.z=(f-u)/S,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this.w=dt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this.w=dt(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(dt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Fd=class extends Ji{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new qt(0,0,e,t),this.scissorTest=!1,this.viewport=new qt(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},s=new wr(r),o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){let t={minFilter:gn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new na(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}},ni=class extends Fd{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Cl=class extends wr{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=un,this.minFilter=un,this.wrapR=Yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var kd=class extends wr{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=un,this.minFilter=un,this.wrapR=Yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var $t=class n{static{n.prototype.isMatrix4=!0}constructor(e,t,i,r,s,o,a,l,c,u,d,f,h,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,d,f,h,g,x,m)}set(e,t,i,r,s,o,a,l,c,u,d,f,h,g,x,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,i=e.elements,r=1/Ho.setFromMatrixColumn(e,0).length(),s=1/Ho.setFromMatrixColumn(e,1).length(),o=1/Ho.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let f=o*u,h=o*d,g=a*u,x=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=h+g*c,t[5]=f-x*c,t[9]=-a*l,t[2]=x-f*c,t[6]=g+h*c,t[10]=o*l}else if(e.order==="YXZ"){let f=l*u,h=l*d,g=c*u,x=c*d;t[0]=f+x*a,t[4]=g*a-h,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-g,t[6]=x+f*a,t[10]=o*l}else if(e.order==="ZXY"){let f=l*u,h=l*d,g=c*u,x=c*d;t[0]=f-x*a,t[4]=-o*d,t[8]=g+h*a,t[1]=h+g*a,t[5]=o*u,t[9]=x-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let f=o*u,h=o*d,g=a*u,x=a*d;t[0]=l*u,t[4]=g*c-h,t[8]=f*c+x,t[1]=l*d,t[5]=x*c+f,t[9]=h*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let f=o*l,h=o*c,g=a*l,x=a*c;t[0]=l*u,t[4]=x-f*d,t[8]=g*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=h*d+g,t[10]=f-x*d}else if(e.order==="XZY"){let f=o*l,h=o*c,g=a*l,x=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+x,t[5]=o*u,t[9]=h*d-g,t[2]=g*d-h,t[6]=a*u,t[10]=x*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(AP,e,IP)}lookAt(e,t,i){let r=this.elements;return Qn.subVectors(e,t),Qn.lengthSq()===0&&(Qn.z=1),Qn.normalize(),Kr.crossVectors(i,Qn),Kr.lengthSq()===0&&(Math.abs(i.z)===1?Qn.x+=1e-4:Qn.z+=1e-4,Qn.normalize(),Kr.crossVectors(i,Qn)),Kr.normalize(),Ju.crossVectors(Qn,Kr),r[0]=Kr.x,r[4]=Ju.x,r[8]=Qn.x,r[1]=Kr.y,r[5]=Ju.y,r[9]=Qn.y,r[2]=Kr.z,r[6]=Ju.z,r[10]=Qn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],f=i[9],h=i[13],g=i[2],x=i[6],m=i[10],p=i[14],S=i[3],w=i[7],E=i[11],R=i[15],C=r[0],I=r[4],y=r[8],A=r[12],k=r[1],D=r[5],U=r[9],$=r[13],Z=r[2],O=r[6],z=r[10],H=r[14],te=r[3],re=r[7],de=r[11],be=r[15];return s[0]=o*C+a*k+l*Z+c*te,s[4]=o*I+a*D+l*O+c*re,s[8]=o*y+a*U+l*z+c*de,s[12]=o*A+a*$+l*H+c*be,s[1]=u*C+d*k+f*Z+h*te,s[5]=u*I+d*D+f*O+h*re,s[9]=u*y+d*U+f*z+h*de,s[13]=u*A+d*$+f*H+h*be,s[2]=g*C+x*k+m*Z+p*te,s[6]=g*I+x*D+m*O+p*re,s[10]=g*y+x*U+m*z+p*de,s[14]=g*A+x*$+m*H+p*be,s[3]=S*C+w*k+E*Z+R*te,s[7]=S*I+w*D+E*O+R*re,s[11]=S*y+w*U+E*z+R*de,s[15]=S*A+w*$+E*H+R*be,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],g=e[3],x=e[7],m=e[11],p=e[15],S=l*h-c*f,w=a*h-c*d,E=a*f-l*d,R=o*h-c*u,C=o*f-l*u,I=o*d-a*u;return t*(x*S-m*w+p*E)-i*(g*S-m*R+p*C)+r*(g*w-x*R+p*I)-s*(g*E-x*C+m*I)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],g=e[12],x=e[13],m=e[14],p=e[15],S=t*a-i*o,w=t*l-r*o,E=t*c-s*o,R=i*l-r*a,C=i*c-s*a,I=r*c-s*l,y=u*x-d*g,A=u*m-f*g,k=u*p-h*g,D=d*m-f*x,U=d*p-h*x,$=f*p-h*m,Z=S*$-w*U+E*D+R*k-C*A+I*y;if(Z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/Z;return e[0]=(a*$-l*U+c*D)*O,e[1]=(r*U-i*$-s*D)*O,e[2]=(x*I-m*C+p*R)*O,e[3]=(f*C-d*I-h*R)*O,e[4]=(l*k-o*$-c*A)*O,e[5]=(t*$-r*k+s*A)*O,e[6]=(m*E-g*I-p*w)*O,e[7]=(u*I-f*E+h*w)*O,e[8]=(o*U-a*k+c*y)*O,e[9]=(i*k-t*U-s*y)*O,e[10]=(g*C-x*E+p*S)*O,e[11]=(d*E-u*C-h*S)*O,e[12]=(a*A-o*D-l*y)*O,e[13]=(t*D-i*A+r*y)*O,e[14]=(x*w-g*R-m*S)*O,e[15]=(u*R-d*w+f*S)*O,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,f=s*c,h=s*u,g=s*d,x=o*u,m=o*d,p=a*d,S=l*c,w=l*u,E=l*d,R=i.x,C=i.y,I=i.z;return r[0]=(1-(x+p))*R,r[1]=(h+E)*R,r[2]=(g-w)*R,r[3]=0,r[4]=(h-E)*C,r[5]=(1-(f+p))*C,r[6]=(m+S)*C,r[7]=0,r[8]=(g+w)*I,r[9]=(m-S)*I,r[10]=(1-(f+x))*I,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinant();if(s===0)return i.set(1,1,1),t.identity(),this;let o=Ho.set(r[0],r[1],r[2]).length(),a=Ho.set(r[4],r[5],r[6]).length(),l=Ho.set(r[8],r[9],r[10]).length();s<0&&(o=-o),Ti.copy(this);let c=1/o,u=1/a,d=1/l;return Ti.elements[0]*=c,Ti.elements[1]*=c,Ti.elements[2]*=c,Ti.elements[4]*=u,Ti.elements[5]*=u,Ti.elements[6]*=u,Ti.elements[8]*=d,Ti.elements[9]*=d,Ti.elements[10]*=d,t.setFromRotationMatrix(Ti),i.x=o,i.y=a,i.z=l,this}makePerspective(e,t,i,r,s,o,a=Di,l=!1){let c=this.elements,u=2*s/(t-e),d=2*s/(i-r),f=(t+e)/(t-e),h=(i+r)/(i-r),g,x;if(l)g=s/(o-s),x=o*s/(o-s);else if(a===Di)g=-(o+s)/(o-s),x=-2*o*s/(o-s);else if(a===wl)g=-o/(o-s),x=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Di,l=!1){let c=this.elements,u=2/(t-e),d=2/(i-r),f=-(t+e)/(t-e),h=-(i+r)/(i-r),g,x;if(l)g=1/(o-s),x=o/(o-s);else if(a===Di)g=-2/(o-s),x=-(o+s)/(o-s);else if(a===wl)g=-1/(o-s),x=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},Ho=new B,Ti=new $t,AP=new B(0,0,0),IP=new B(1,1,1),Kr=new B,Ju=new B,Qn=new B,yS=new $t,xS=new Ki,Tl=(()=>{class n{constructor(t=0,i=0,r=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=r,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,r,s=this._order){return this._x=t,this._y=i,this._z=r,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,r=!0){let s=t.elements,o=s[0],a=s[4],l=s[8],c=s[1],u=s[5],d=s[9],f=s[2],h=s[6],g=s[10];switch(i){case"XYZ":this._y=Math.asin(dt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,g),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-dt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(l,g),this._z=Math.atan2(c,u)):(this._y=Math.atan2(-f,o),this._z=0);break;case"ZXY":this._x=Math.asin(dt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,g),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(c,o));break;case"ZYX":this._y=Math.asin(-dt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,g),this._z=Math.atan2(c,o)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(dt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,u),this._y=Math.atan2(-f,o)):(this._x=0,this._y=Math.atan2(l,g));break;case"XZY":this._z=Math.asin(-dt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(l,o)):(this._x=Math.atan2(-d,g),this._y=0);break;default:Ne("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,r){return yS.makeRotationFromQuaternion(t),this.setFromRotationMatrix(yS,i,r)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return xS.setFromEuler(this),this.setFromQuaternion(xS,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}return n.DEFAULT_ORDER="XYZ",n})(),Al=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},DP=0,_S=new B,zo=new Ki,pr=new $t,Ku=new B,pl=new B,RP=new B,PP=new Ki,bS=new B(1,0,0),SS=new B(0,1,0),MS=new B(0,0,1),wS={type:"added"},NP={type:"removed"},Go={type:"childadded",child:null},Og={type:"childremoved",child:null},Er=(()=>{class n extends Ji{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:DP++}),this.uuid=da(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new B,i=new Tl,r=new Ki,s=new B(1,1,1);function o(){r.setFromEuler(i,!1)}function a(){i.setFromQuaternion(r,void 0,!1)}i._onChange(o),r._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new $t},normalMatrix:{value:new We}}),this.matrix=new $t,this.matrixWorld=new $t,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Al,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return zo.setFromAxisAngle(t,i),this.quaternion.multiply(zo),this}rotateOnWorldAxis(t,i){return zo.setFromAxisAngle(t,i),this.quaternion.premultiply(zo),this}rotateX(t){return this.rotateOnAxis(bS,t)}rotateY(t){return this.rotateOnAxis(SS,t)}rotateZ(t){return this.rotateOnAxis(MS,t)}translateOnAxis(t,i){return _S.copy(t).applyQuaternion(this.quaternion),this.position.add(_S.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(bS,t)}translateY(t){return this.translateOnAxis(SS,t)}translateZ(t){return this.translateOnAxis(MS,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(pr.copy(this.matrixWorld).invert())}lookAt(t,i,r){t.isVector3?Ku.copy(t):Ku.set(t,i,r);let s=this.parent;this.updateWorldMatrix(!0,!1),pl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pr.lookAt(pl,Ku,this.up):pr.lookAt(Ku,pl,this.up),this.quaternion.setFromRotationMatrix(pr),s&&(pr.extractRotation(s.matrixWorld),zo.setFromRotationMatrix(pr),this.quaternion.premultiply(zo.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(Ue("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(wS),Go.child=t,this.dispatchEvent(Go),Go.child=null):Ue("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}let i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(NP),Og.child=t,this.dispatchEvent(Og),Og.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),pr.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),pr.multiply(t.parent.matrixWorld)),t.applyMatrix4(pr),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(wS),Go.child=t,this.dispatchEvent(Go),Go.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let r=0,s=this.children.length;r<s;r++){let a=this.children[r].getObjectByProperty(t,i);if(a!==void 0)return a}}getObjectsByProperty(t,i,r=[]){this[t]===i&&r.push(this);let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].getObjectsByProperty(t,i,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pl,t,RP),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pl,PP,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].traverseVisible(t)}traverseAncestors(t){let i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let i=t.x,r=t.y,s=t.z,o=this.matrix.elements;o[12]+=i-o[0]*i-o[4]*r-o[8]*s,o[13]+=r-o[1]*i-o[5]*r-o[9]*s,o[14]+=s-o[2]*i-o[6]*r-o[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].updateMatrixWorld(t)}updateWorldMatrix(t,i){let r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(t){let i=t===void 0||typeof t=="string",r={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(l=>zt(Ae({},l),{boundingBox:l.boundingBox?l.boundingBox.toJSON():void 0,boundingSphere:l.boundingSphere?l.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(l=>Ae({},l)),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function o(l,c){return l[c.uuid]===void 0&&(l[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);let l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){let c=l.shapes;if(Array.isArray(c))for(let u=0,d=c.length;u<d;u++){let f=c[u];o(t.shapes,f)}else o(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let l=[];for(let c=0,u=this.material.length;c<u;c++)l.push(o(t.materials,this.material[c]));s.material=l}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let l=0;l<this.children.length;l++)s.children.push(this.children[l].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let l=0;l<this.animations.length;l++){let c=this.animations[l];s.animations.push(o(t.animations,c))}}if(i){let l=a(t.geometries),c=a(t.materials),u=a(t.textures),d=a(t.images),f=a(t.shapes),h=a(t.skeletons),g=a(t.animations),x=a(t.nodes);l.length>0&&(r.geometries=l),c.length>0&&(r.materials=c),u.length>0&&(r.textures=u),d.length>0&&(r.images=d),f.length>0&&(r.shapes=f),h.length>0&&(r.skeletons=h),g.length>0&&(r.animations=g),x.length>0&&(r.nodes=x)}return r.object=s,r;function a(l){let c=[];for(let u in l){let d=l[u];delete d.metadata,c.push(d)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let r=0;r<t.children.length;r++){let s=t.children[r];this.add(s.clone())}return this}}return n.DEFAULT_UP=new B(0,1,0),n.DEFAULT_MATRIX_AUTO_UPDATE=!0,n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,n})(),Hs=class extends Er{constructor(){super(),this.isGroup=!0,this.type="Group"}},OP={type:"move"},ia=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Hs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Hs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Hs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,i),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,g=.005;c.inputState.pinching&&f>h+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(OP)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Hs;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},_M={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qr={h:0,s:0,l:0},Qu={h:0,s:0,l:0};function Lg(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var ht=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ti){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ut.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=ut.workingColorSpace){return this.r=e,this.g=t,this.b=i,ut.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=ut.workingColorSpace){if(e=I0(e,1),t=dt(t,0,1),i=dt(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Lg(o,s,e+1/3),this.g=Lg(o,s,e),this.b=Lg(o,s,e-1/3)}return ut.colorSpaceToWorking(this,r),this}setStyle(e,t=ti){function i(s){s!==void 0&&parseFloat(s)<1&&Ne("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ne("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);Ne("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ti){let i=_M[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ne("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=xr(e.r),this.g=xr(e.g),this.b=xr(e.b),this}copyLinearToSRGB(e){return this.r=Qo(e.r),this.g=Qo(e.g),this.b=Qo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ti){return ut.workingToColorSpace(En.copy(this),e),Math.round(dt(En.r*255,0,255))*65536+Math.round(dt(En.g*255,0,255))*256+Math.round(dt(En.b*255,0,255))}getHexString(e=ti){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ut.workingColorSpace){ut.workingToColorSpace(En.copy(this),t);let i=En.r,r=En.g,s=En.b,o=Math.max(i,r,s),a=Math.min(i,r,s),l,c,u=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=ut.workingColorSpace){return ut.workingToColorSpace(En.copy(this),t),e.r=En.r,e.g=En.g,e.b=En.b,e}getStyle(e=ti){ut.workingToColorSpace(En.copy(this),e);let t=En.r,i=En.g,r=En.b;return e!==ti?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Qr),this.setHSL(Qr.h+e,Qr.s+t,Qr.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Qr),e.getHSL(Qu);let i=_l(Qr.h,Qu.h,t),r=_l(Qr.s,Qu.s,t),s=_l(Qr.l,Qu.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},En=new ht;ht.NAMES=_M;var Il=class extends Er{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Tl,this.environmentIntensity=1,this.environmentRotation=new Tl,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ai=new B,mr=new B,Fg=new B,gr=new B,Wo=new B,jo=new B,ES=new B,kg=new B,Ug=new B,Bg=new B,Vg=new qt,Hg=new qt,zg=new qt,rs=class n{constructor(e=new B,t=new B,i=new B){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Ai.subVectors(e,t),r.cross(Ai);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Ai.subVectors(r,t),mr.subVectors(i,t),Fg.subVectors(e,t);let o=Ai.dot(Ai),a=Ai.dot(mr),l=Ai.dot(Fg),c=mr.dot(mr),u=mr.dot(Fg),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;let f=1/d,h=(c*l-a*u)*f,g=(o*u-a*l)*f;return s.set(1-h-g,g,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,gr)===null?!1:gr.x>=0&&gr.y>=0&&gr.x+gr.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,gr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,gr.x),l.addScaledVector(o,gr.y),l.addScaledVector(a,gr.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return Vg.setScalar(0),Hg.setScalar(0),zg.setScalar(0),Vg.fromBufferAttribute(e,t),Hg.fromBufferAttribute(e,i),zg.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Vg,s.x),o.addScaledVector(Hg,s.y),o.addScaledVector(zg,s.z),o}static isFrontFacing(e,t,i,r){return Ai.subVectors(i,t),mr.subVectors(e,t),Ai.cross(mr).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ai.subVectors(this.c,this.b),mr.subVectors(this.a,this.b),Ai.cross(mr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,o,a;Wo.subVectors(r,i),jo.subVectors(s,i),kg.subVectors(e,i);let l=Wo.dot(kg),c=jo.dot(kg);if(l<=0&&c<=0)return t.copy(i);Ug.subVectors(e,r);let u=Wo.dot(Ug),d=jo.dot(Ug);if(u>=0&&d<=u)return t.copy(r);let f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(Wo,o);Bg.subVectors(e,s);let h=Wo.dot(Bg),g=jo.dot(Bg);if(g>=0&&h<=g)return t.copy(s);let x=h*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(jo,a);let m=u*g-h*d;if(m<=0&&d-u>=0&&h-g>=0)return ES.subVectors(s,r),a=(d-u)/(d-u+(h-g)),t.copy(r).addScaledVector(ES,a);let p=1/(m+x+f);return o=x*p,a=f*p,t.copy(i).addScaledVector(Wo,o).addScaledVector(jo,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},os=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ii.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ii.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Ii.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Ii):Ii.fromBufferAttribute(s,o),Ii.applyMatrix4(e.matrixWorld),this.expandByPoint(Ii);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ed.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ed.copy(i.boundingBox)),ed.applyMatrix4(e.matrixWorld),this.union(ed)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ii),Ii.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ml),td.subVectors(this.max,ml),$o.subVectors(e.a,ml),qo.subVectors(e.b,ml),Xo.subVectors(e.c,ml),es.subVectors(qo,$o),ts.subVectors(Xo,qo),Fs.subVectors($o,Xo);let t=[0,-es.z,es.y,0,-ts.z,ts.y,0,-Fs.z,Fs.y,es.z,0,-es.x,ts.z,0,-ts.x,Fs.z,0,-Fs.x,-es.y,es.x,0,-ts.y,ts.x,0,-Fs.y,Fs.x,0];return!Gg(t,$o,qo,Xo,td)||(t=[1,0,0,0,1,0,0,0,1],!Gg(t,$o,qo,Xo,td))?!1:(nd.crossVectors(es,ts),t=[nd.x,nd.y,nd.z],Gg(t,$o,qo,Xo,td))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ii).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ii).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(vr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),vr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),vr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),vr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),vr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),vr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),vr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),vr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(vr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},vr=[new B,new B,new B,new B,new B,new B,new B,new B],Ii=new B,ed=new os,$o=new B,qo=new B,Xo=new B,es=new B,ts=new B,Fs=new B,ml=new B,td=new B,nd=new B,ks=new B;function Gg(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){ks.fromArray(n,s);let a=r.x*Math.abs(ks.x)+r.y*Math.abs(ks.y)+r.z*Math.abs(ks.z),l=e.dot(ks),c=t.dot(ks),u=i.dot(ks);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}var Kt=new B,id=new Ct,LP=0,pn=class extends Ji{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:LP++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=r0,this.updateRanges=[],this.gpuType=Ni,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)id.fromBufferAttribute(this,t),id.applyMatrix3(e),this.setXY(t,id.x,id.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix3(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix4(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Kt.fromBufferAttribute(this,t),Kt.applyNormalMatrix(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Kt.fromBufferAttribute(this,t),Kt.transformDirection(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ko(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Pn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ko(t,this.array)),t}setX(e,t){return this.normalized&&(t=Pn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ko(t,this.array)),t}setY(e,t){return this.normalized&&(t=Pn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ko(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Pn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ko(t,this.array)),t}setW(e,t){return this.normalized&&(t=Pn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Pn(t,this.array),i=Pn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Pn(t,this.array),i=Pn(i,this.array),r=Pn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Pn(t,this.array),i=Pn(i,this.array),r=Pn(r,this.array),s=Pn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==r0&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var Dl=class extends pn{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Rl=class extends pn{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var mn=class extends pn{constructor(e,t,i){super(new Float32Array(e),t,i)}},FP=new os,gl=new B,Wg=new B,as=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):FP.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;gl.subVectors(e,this.center);let t=gl.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(gl,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Wg.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(gl.copy(e.center).add(Wg)),this.expandByPoint(gl.copy(e.center).sub(Wg))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},kP=0,mi=new $t,jg=new Er,Yo=new B,ei=new os,vl=new os,cn=new B,Tn=class n extends Ji{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kP++}),this.uuid=da(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(aP(e)?Rl:Dl)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new We().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return mi.makeRotationFromQuaternion(e),this.applyMatrix4(mi),this}rotateX(e){return mi.makeRotationX(e),this.applyMatrix4(mi),this}rotateY(e){return mi.makeRotationY(e),this.applyMatrix4(mi),this}rotateZ(e){return mi.makeRotationZ(e),this.applyMatrix4(mi),this}translate(e,t,i){return mi.makeTranslation(e,t,i),this.applyMatrix4(mi),this}scale(e,t,i){return mi.makeScale(e,t,i),this.applyMatrix4(mi),this}lookAt(e){return jg.lookAt(e),jg.updateMatrix(),this.applyMatrix4(jg.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yo).negate(),this.translate(Yo.x,Yo.y,Yo.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new mn(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ne("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new os);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ue("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];ei.setFromBufferAttribute(s),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,ei.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,ei.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(ei.min),this.boundingBox.expandByPoint(ei.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ue('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new as);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ue("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){let i=this.boundingSphere.center;if(ei.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];vl.setFromBufferAttribute(a),this.morphTargetsRelative?(cn.addVectors(ei.min,vl.min),ei.expandByPoint(cn),cn.addVectors(ei.max,vl.max),ei.expandByPoint(cn)):(ei.expandByPoint(vl.min),ei.expandByPoint(vl.max))}ei.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)cn.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(cn));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)cn.fromBufferAttribute(a,c),l&&(Yo.fromBufferAttribute(e,c),cn.add(Yo)),r=Math.max(r,i.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Ue('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ue("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pn(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let y=0;y<i.count;y++)a[y]=new B,l[y]=new B;let c=new B,u=new B,d=new B,f=new Ct,h=new Ct,g=new Ct,x=new B,m=new B;function p(y,A,k){c.fromBufferAttribute(i,y),u.fromBufferAttribute(i,A),d.fromBufferAttribute(i,k),f.fromBufferAttribute(s,y),h.fromBufferAttribute(s,A),g.fromBufferAttribute(s,k),u.sub(c),d.sub(c),h.sub(f),g.sub(f);let D=1/(h.x*g.y-g.x*h.y);isFinite(D)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(d,-h.y).multiplyScalar(D),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-g.x).multiplyScalar(D),a[y].add(x),a[A].add(x),a[k].add(x),l[y].add(m),l[A].add(m),l[k].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let y=0,A=S.length;y<A;++y){let k=S[y],D=k.start,U=k.count;for(let $=D,Z=D+U;$<Z;$+=3)p(e.getX($+0),e.getX($+1),e.getX($+2))}let w=new B,E=new B,R=new B,C=new B;function I(y){R.fromBufferAttribute(r,y),C.copy(R);let A=a[y];w.copy(A),w.sub(R.multiplyScalar(R.dot(A))).normalize(),E.crossVectors(C,A);let D=E.dot(l[y])<0?-1:1;o.setXYZW(y,w.x,w.y,w.z,D)}for(let y=0,A=S.length;y<A;++y){let k=S[y],D=k.start,U=k.count;for(let $=D,Z=D+U;$<Z;$+=3)I(e.getX($+0)),I(e.getX($+1)),I(e.getX($+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new pn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,h=i.count;f<h;f++)i.setXYZ(f,0,0,0);let r=new B,s=new B,o=new B,a=new B,l=new B,c=new B,u=new B,d=new B;if(e)for(let f=0,h=e.count;f<h;f+=3){let g=e.getX(f+0),x=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)cn.fromBufferAttribute(e,t),cn.normalize(),e.setXYZ(t,cn.x,cn.y,cn.z)}toNonIndexed(){function e(a,l){let c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u),h=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?h=l[x]*a.data.stride+a.offset:h=l[x]*u;for(let p=0;p<u;p++)f[g++]=c[h++]}return new pn(f,u,d)}if(this.index===null)return Ne("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let a in r){let l=r[a],c=e(l,i);t.setAttribute(a,c)}let s=this.morphAttributes;for(let a in s){let l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){let f=c[u],h=e(f,i);l.push(h)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){let h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let c in r){let u=r[c];this.setAttribute(c,u.clone(t))}let s=e.morphAttributes;for(let c in s){let u=[],d=s[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,u=o.length;c<u;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}};var UP=0,br=class extends Ji{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:UP++}),this.uuid=da(),this.name="",this.type="Material",this.blending=zs,this.side=_r,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Sd,this.blendDst=Md,this.blendEquation=ss,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ht(0,0,0),this.blendAlpha=0,this.depthFunc=Gs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=i0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vs,this.stencilZFail=Vs,this.stencilZPass=Vs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Ne(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Ne(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==zs&&(i.blending=this.blending),this.side!==_r&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Sd&&(i.blendSrc=this.blendSrc),this.blendDst!==Md&&(i.blendDst=this.blendDst),this.blendEquation!==ss&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Gs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==i0&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Vs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Vs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let a in s){let l=s[a];delete l.metadata,o.push(l)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var yr=new B,$g=new B,rd=new B,ns=new B,qg=new B,sd=new B,Xg=new B,ra=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,yr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=yr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(yr.copy(this.origin).addScaledVector(this.direction,t),yr.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){$g.copy(e).add(t).multiplyScalar(.5),rd.copy(t).sub(e).normalize(),ns.copy(this.origin).sub($g);let s=e.distanceTo(t)*.5,o=-this.direction.dot(rd),a=ns.dot(this.direction),l=-ns.dot(rd),c=ns.lengthSq(),u=Math.abs(1-o*o),d,f,h,g;if(u>0)if(d=o*l-a,f=o*a-l,g=s*u,d>=0)if(f>=-g)if(f<=g){let x=1/u;d*=x,f*=x,h=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f<=-g?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c):f<=g?(d=0,f=Math.min(Math.max(-s,-l),s),h=f*(f+2*l)+c):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy($g).addScaledVector(rd,f),h}intersectSphere(e,t){yr.subVectors(e.center,this.origin);let i=yr.dot(this.direction),r=yr.dot(yr)-i*i,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,yr)!==null}intersectTriangle(e,t,i,r,s){qg.subVectors(t,e),sd.subVectors(i,e),Xg.crossVectors(qg,sd);let o=this.direction.dot(Xg),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ns.subVectors(this.origin,e);let l=a*this.direction.dot(sd.crossVectors(ns,sd));if(l<0)return null;let c=a*this.direction.dot(qg.cross(ns));if(c<0||l+c>o)return null;let u=-a*ns.dot(Xg);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ws=class extends br{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tl,this.combine=d0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},CS=new $t,Us=new ra,od=new as,TS=new B,ad=new B,ld=new B,cd=new B,Yg=new B,ud=new B,AS=new B,dd=new B,Nn=class extends Er{constructor(e=new Tn,t=new Ws){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){ud.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=a[l],d=s[l];u!==0&&(Yg.fromBufferAttribute(d,e),o?ud.addScaledVector(Yg,u):ud.addScaledVector(Yg.sub(t),u))}t.add(ud)}return t}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),od.copy(i.boundingSphere),od.applyMatrix4(s),Us.copy(e.ray).recast(e.near),!(od.containsPoint(Us.origin)===!1&&(Us.intersectSphere(od,TS)===null||Us.origin.distanceToSquared(TS)>(e.far-e.near)**2))&&(CS.copy(s).invert(),Us.copy(e.ray).applyMatrix4(CS),!(i.boundingBox!==null&&Us.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Us)))}_computeIntersections(e,t,i){let r,s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){let m=f[g],p=o[m.materialIndex],S=Math.max(m.start,h.start),w=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let E=S,R=w;E<R;E+=3){let C=a.getX(E),I=a.getX(E+1),y=a.getX(E+2);r=fd(this,p,e,i,c,u,d,C,I,y),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,h.start),x=Math.min(a.count,h.start+h.count);for(let m=g,p=x;m<p;m+=3){let S=a.getX(m),w=a.getX(m+1),E=a.getX(m+2);r=fd(this,o,e,i,c,u,d,S,w,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){let m=f[g],p=o[m.materialIndex],S=Math.max(m.start,h.start),w=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let E=S,R=w;E<R;E+=3){let C=E,I=E+1,y=E+2;r=fd(this,p,e,i,c,u,d,C,I,y),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,h.start),x=Math.min(l.count,h.start+h.count);for(let m=g,p=x;m<p;m+=3){let S=m,w=m+1,E=m+2;r=fd(this,o,e,i,c,u,d,S,w,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function BP(n,e,t,i,r,s,o,a){let l;if(e.side===Ln?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===_r,a),l===null)return null;dd.copy(a),dd.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(dd);return c<t.near||c>t.far?null:{distance:c,point:dd.clone(),object:n}}function fd(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,ad),n.getVertexPosition(l,ld),n.getVertexPosition(c,cd);let u=BP(n,e,t,i,ad,ld,cd,AS);if(u){let d=new B;rs.getBarycoord(AS,ad,ld,cd,d),r&&(u.uv=rs.getInterpolatedAttribute(r,a,l,c,d,new Ct)),s&&(u.uv1=rs.getInterpolatedAttribute(s,a,l,c,d,new Ct)),o&&(u.normal=rs.getInterpolatedAttribute(o,a,l,c,d,new B),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let f={a,b:l,c,normal:new B,materialIndex:0};rs.getNormal(ad,ld,cd,f.normal),u.face=f,u.barycoord=d}return u}var Ud=class extends wr{constructor(e=null,t=1,i=1,r,s,o,a,l,c=un,u=un,d,f){super(null,o,a,l,c,u,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Zg=new B,VP=new B,HP=new We,Xi=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=Zg.subVectors(i,t).cross(VP.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let r=e.delta(Zg),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(r,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||HP.getNormalMatrix(e),r=this.coplanarPoint(Zg).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Bs=new as,zP=new Ct(.5,.5),hd=new B,Pl=class{constructor(e=new Xi,t=new Xi,i=new Xi,r=new Xi,s=new Xi,o=new Xi){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Di,i=!1){let r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],d=s[5],f=s[6],h=s[7],g=s[8],x=s[9],m=s[10],p=s[11],S=s[12],w=s[13],E=s[14],R=s[15];if(r[0].setComponents(c-o,h-u,p-g,R-S).normalize(),r[1].setComponents(c+o,h+u,p+g,R+S).normalize(),r[2].setComponents(c+a,h+d,p+x,R+w).normalize(),r[3].setComponents(c-a,h-d,p-x,R-w).normalize(),i)r[4].setComponents(l,f,m,E).normalize(),r[5].setComponents(c-l,h-f,p-m,R-E).normalize();else if(r[4].setComponents(c-l,h-f,p-m,R-E).normalize(),t===Di)r[5].setComponents(c+l,h+f,p+m,R+E).normalize();else if(t===wl)r[5].setComponents(l,f,m,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Bs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Bs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Bs)}intersectsSprite(e){Bs.center.set(0,0,0);let t=zP.distanceTo(e.center);return Bs.radius=.7071067811865476+t,Bs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bs)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(hd.x=r.normal.x>0?e.max.x:e.min.x,hd.y=r.normal.y>0?e.max.y:e.min.y,hd.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(hd)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var sa=class extends br{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ht(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Bd=new B,Vd=new B,IS=new $t,yl=new ra,pd=new as,Jg=new B,DS=new B,Hd=class extends Er{constructor(e=new Tn,t=new sa){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)Bd.fromBufferAttribute(t,r-1),Vd.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Bd.distanceTo(Vd);e.setAttribute("lineDistance",new mn(i,1))}else Ne("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),pd.copy(i.boundingSphere),pd.applyMatrix4(r),pd.radius+=s,e.ray.intersectsSphere(pd)===!1)return;IS.copy(r).invert(),yl.copy(e.ray).applyMatrix4(IS);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){let h=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let x=h,m=g-1;x<m;x+=c){let p=u.getX(x),S=u.getX(x+1),w=md(this,e,yl,l,p,S,x);w&&t.push(w)}if(this.isLineLoop){let x=u.getX(g-1),m=u.getX(h),p=md(this,e,yl,l,x,m,g-1);p&&t.push(p)}}else{let h=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let x=h,m=g-1;x<m;x+=c){let p=md(this,e,yl,l,x,x+1,x);p&&t.push(p)}if(this.isLineLoop){let x=md(this,e,yl,l,g-1,h,g-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function md(n,e,t,i,r,s,o){let a=n.geometry.attributes.position;if(Bd.fromBufferAttribute(a,r),Vd.fromBufferAttribute(a,s),t.distanceSqToSegment(Bd,Vd,Jg,DS)>i)return;Jg.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(Jg);if(!(c<e.near||c>e.far))return{distance:c,point:DS.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}var RS=new B,PS=new B,Nl=class extends Hd{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)RS.fromBufferAttribute(t,r),PS.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+RS.distanceTo(PS);e.setAttribute("lineDistance",new mn(i,1))}else Ne("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var oa=class extends br{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ht(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},NS=new $t,s0=new ra,gd=new as,vd=new B,Ol=class extends Er{constructor(e=new Tn,t=new oa){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),gd.copy(i.boundingSphere),gd.applyMatrix4(r),gd.radius+=s,e.ray.intersectsSphere(gd)===!1)return;NS.copy(r).invert(),s0.copy(e.ray).applyMatrix4(NS);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,d=i.attributes.position;if(c!==null){let f=Math.max(0,o.start),h=Math.min(c.count,o.start+o.count);for(let g=f,x=h;g<x;g++){let m=c.getX(g);vd.fromBufferAttribute(d,m),OS(vd,m,l,r,e,t,this)}}else{let f=Math.max(0,o.start),h=Math.min(d.count,o.start+o.count);for(let g=f,x=h;g<x;g++)vd.fromBufferAttribute(d,g),OS(vd,g,l,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function OS(n,e,t,i,r,s,o){let a=s0.distanceSqToPoint(n);if(a<t){let l=new B;s0.closestPointToPoint(n,l),l.applyMatrix4(i);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Ll=class extends wr{constructor(e=[],t=fs,i,r,s,o,a,l,c,u){super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var Sr=class extends wr{constructor(e,t,i=Pi,r,s,o,a=un,l=un,c,u=Zi,d=1){if(u!==Zi&&u!==ps)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:d};super(f,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new na(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},zd=class extends Sr{constructor(e,t=Pi,i=fs,r,s,o=un,a=un,l,c=Zi){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,r,s,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Fl=class extends wr{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},aa=class n extends Tn{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let l=[],c=[],u=[],d=[],f=0,h=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new mn(c,3)),this.setAttribute("normal",new mn(u,3)),this.setAttribute("uv",new mn(d,2));function g(x,m,p,S,w,E,R,C,I,y,A){let k=E/I,D=R/y,U=E/2,$=R/2,Z=C/2,O=I+1,z=y+1,H=0,te=0,re=new B;for(let de=0;de<z;de++){let be=de*D-$;for(let Ce=0;Ce<O;Ce++){let at=Ce*k-U;re[x]=at*S,re[m]=be*w,re[p]=Z,c.push(re.x,re.y,re.z),re[x]=0,re[m]=0,re[p]=C>0?1:-1,u.push(re.x,re.y,re.z),d.push(Ce/I),d.push(1-de/y),H+=1}}for(let de=0;de<y;de++)for(let be=0;be<I;be++){let Ce=f+be+O*de,at=f+be+O*(de+1),et=f+(be+1)+O*(de+1),Me=f+(be+1)+O*de;l.push(Ce,at,Me),l.push(at,et,Me),te+=6}a.addGroup(h,te,A),h+=te,f+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var js=class n extends Tn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,d=e/a,f=t/l,h=[],g=[],x=[],m=[];for(let p=0;p<u;p++){let S=p*f-o;for(let w=0;w<c;w++){let E=w*d-s;g.push(E,-S,0),x.push(0,0,1),m.push(w/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<a;S++){let w=S+c*p,E=S+c*(p+1),R=S+1+c*(p+1),C=S+1+c*p;h.push(w,E,C),h.push(E,R,C)}this.setIndex(h),this.setAttribute("position",new mn(g,3)),this.setAttribute("normal",new mn(x,3)),this.setAttribute("uv",new mn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var kl=class n extends Tn{constructor(e=1,t=.4,i=64,r=8,s=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:i,radialSegments:r,p:s,q:o},i=Math.floor(i),r=Math.floor(r);let a=[],l=[],c=[],u=[],d=new B,f=new B,h=new B,g=new B,x=new B,m=new B,p=new B;for(let w=0;w<=i;++w){let E=w/i*s*Math.PI*2;S(E,s,o,e,h),S(E+.01,s,o,e,g),m.subVectors(g,h),p.addVectors(g,h),x.crossVectors(m,p),p.crossVectors(x,m),x.normalize(),p.normalize();for(let R=0;R<=r;++R){let C=R/r*Math.PI*2,I=-t*Math.cos(C),y=t*Math.sin(C);d.x=h.x+(I*p.x+y*x.x),d.y=h.y+(I*p.y+y*x.y),d.z=h.z+(I*p.z+y*x.z),l.push(d.x,d.y,d.z),f.subVectors(d,h).normalize(),c.push(f.x,f.y,f.z),u.push(w/i),u.push(R/r)}}for(let w=1;w<=i;w++)for(let E=1;E<=r;E++){let R=(r+1)*(w-1)+(E-1),C=(r+1)*w+(E-1),I=(r+1)*w+E,y=(r+1)*(w-1)+E;a.push(R,C,y),a.push(C,I,y)}this.setIndex(a),this.setAttribute("position",new mn(l,3)),this.setAttribute("normal",new mn(c,3)),this.setAttribute("uv",new mn(u,2));function S(w,E,R,C,I){let y=Math.cos(w),A=Math.sin(w),k=R/E*w,D=Math.cos(k);I.x=C*(2+D)*.5*y,I.y=C*(2+D)*A*.5,I.z=C*Math.sin(k)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}};function qs(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];if(LS(r))r.isRenderTargetTexture?(Ne("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(LS(r[0])){let s=[];for(let o=0,a=r.length;o<a;o++)s[o]=r[o].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function An(n){let e={};for(let t=0;t<n.length;t++){let i=qs(n[t]);for(let r in i)e[r]=i[r]}return e}function LS(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function GP(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function D0(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ut.workingColorSpace}var bM={clone:qs,merge:An},WP=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,jP=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,On=class extends br{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=WP,this.fragmentShader=jP,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=qs(e.uniforms),this.uniformsGroups=GP(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},Gd=class extends On{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Wd=class extends br{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=lM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},jd=class extends br{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function yd(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}var ls=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];n:{e:{let o;t:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=t[++i],e<r)break e}o=t.length;break t}if(!(e>=s)){let a=t[1];e<a&&(i=2,s=a);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=s,s=t[--i-1],e>=s)break e}o=i,i=0;break t}break n}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=i[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},$d=class extends ls{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:e0,endingEnd:e0}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],l=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case t0:s=e,a=2*t-i;break;case n0:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case t0:o=e,l=2*i-t;break;case n0:o=1,l=i+r[1]-r[0];break;default:o=e-1,l=t}let c=(i-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-i),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,g=(i-t)/(r-t),x=g*g,m=x*g,p=-f*m+2*f*x-f*g,S=(1+f)*m+(-1.5-2*f)*x+(-.5+f)*g+1,w=(-1-h)*m+(1.5+h)*x+.5*g,E=h*m-h*x;for(let R=0;R!==a;++R)s[R]=p*o[u+R]+S*o[c+R]+w*o[l+R]+E*o[d+R];return s}},qd=class extends ls{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(i-t)/(r-t),d=1-u;for(let f=0;f!==a;++f)s[f]=o[c+f]*d+o[l+f]*u;return s}},Xd=class extends ls{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Yd=class extends ls{interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this.settings||this.DefaultSettings_,d=u.inTangents,f=u.outTangents;if(!d||!f){let x=(i-t)/(r-t),m=1-x;for(let p=0;p!==a;++p)s[p]=o[c+p]*m+o[l+p]*x;return s}let h=a*2,g=e-1;for(let x=0;x!==a;++x){let m=o[c+x],p=o[l+x],S=g*h+x*2,w=f[S],E=f[S+1],R=e*h+x*2,C=d[R],I=d[R+1],y=(i-t)/(r-t),A,k,D,U,$;for(let Z=0;Z<8;Z++){A=y*y,k=A*y,D=1-y,U=D*D,$=U*D;let z=$*t+3*U*y*w+3*D*A*C+k*r-i;if(Math.abs(z)<1e-10)break;let H=3*U*(w-t)+6*D*y*(C-w)+3*A*(r-C);if(Math.abs(H)<1e-10)break;y=y-z/H,y=Math.max(0,Math.min(1,y))}s[x]=$*m+3*U*y*E+3*D*A*I+k*p}return s}},ii=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=yd(t,this.TimeBufferType),this.values=yd(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:yd(e.times,Array),values:yd(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Xd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new qd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new $d(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Yd(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case bl:t=this.InterpolantFactoryMethodDiscrete;break;case Nd:t=this.InterpolantFactoryMethodLinear;break;case bd:t=this.InterpolantFactoryMethodSmooth;break;case Qg:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ne("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return bl;case this.InterpolantFactoryMethodLinear:return Nd;case this.InterpolantFactoryMethodSmooth:return bd;case this.InterpolantFactoryMethodBezier:return Qg}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ue("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(Ue("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){Ue("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){Ue("KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(r!==void 0&&lP(r))for(let a=0,l=r.length;a!==l;++a){let c=r[a];if(isNaN(c)){Ue("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===bd,s=e.length-1,o=1;for(let a=1;a<s;++a){let l=!1,c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(r)l=!0;else{let d=a*i,f=d-i,h=d+i;for(let g=0;g!==i;++g){let x=t[d+g];if(x!==t[f+g]||x!==t[h+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let d=a*i,f=o*i;for(let h=0;h!==i;++h)t[f+h]=t[d+h]}++o}}if(s>0){e[o]=e[s];for(let a=s*i,l=o*i,c=0;c!==i;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};ii.prototype.ValueTypeName="";ii.prototype.TimeBufferType=Float32Array;ii.prototype.ValueBufferType=Float32Array;ii.prototype.DefaultInterpolation=Nd;var cs=class extends ii{constructor(e,t,i){super(e,t,i)}};cs.prototype.ValueTypeName="bool";cs.prototype.ValueBufferType=Array;cs.prototype.DefaultInterpolation=bl;cs.prototype.InterpolantFactoryMethodLinear=void 0;cs.prototype.InterpolantFactoryMethodSmooth=void 0;var Zd=class extends ii{constructor(e,t,i,r){super(e,t,i,r)}};Zd.prototype.ValueTypeName="color";var Jd=class extends ii{constructor(e,t,i,r){super(e,t,i,r)}};Jd.prototype.ValueTypeName="number";var Kd=class extends ls{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-t)/(r-t),c=e*a;for(let u=c+a;c!==u;c+=4)Ki.slerpFlat(s,0,o,c-a,o,c,l);return s}},Ul=class extends ii{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new Kd(this.times,this.values,this.getValueSize(),e)}};Ul.prototype.ValueTypeName="quaternion";Ul.prototype.InterpolantFactoryMethodSmooth=void 0;var us=class extends ii{constructor(e,t,i){super(e,t,i)}};us.prototype.ValueTypeName="string";us.prototype.ValueBufferType=Array;us.prototype.DefaultInterpolation=bl;us.prototype.InterpolantFactoryMethodLinear=void 0;us.prototype.InterpolantFactoryMethodSmooth=void 0;var Qd=class extends ii{constructor(e,t,i,r){super(e,t,i,r)}};Qd.prototype.ValueTypeName="vector";var xd=new B,_d=new Ki,qi=new B,Bl=class extends Er{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new $t,this.projectionMatrix=new $t,this.projectionMatrixInverse=new $t,this.coordinateSystem=Di,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(xd,_d,qi),qi.x===1&&qi.y===1&&qi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xd,_d,qi.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(xd,_d,qi),qi.x===1&&qi.y===1&&qi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xd,_d,qi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},is=new B,FS=new Ct,kS=new Ct,Cn=class extends Bl{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ta*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(xl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ta*2*Math.atan(Math.tan(xl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){is.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(is.x,is.y).multiplyScalar(-e/is.z),is.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(is.x,is.y).multiplyScalar(-e/is.z)}getViewSize(e,t){return this.getViewBounds(e,FS,kS),t.subVectors(kS,FS)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(xl*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Vl=class extends Bl{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var Zo=-90,Jo=1,ef=class extends Er{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Cn(Zo,Jo,e,t);r.layers=this.layers,this.add(r);let s=new Cn(Zo,Jo,e,t);s.layers=this.layers,this.add(s);let o=new Cn(Zo,Jo,e,t);o.layers=this.layers,this.add(o);let a=new Cn(Zo,Jo,e,t);a.layers=this.layers,this.add(a);let l=new Cn(Zo,Jo,e,t);l.layers=this.layers,this.add(l);let c=new Cn(Zo,Jo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(let c of t)this.remove(c);if(e===Di)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===wl)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},tf=class extends Cn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var R0="\\[\\]\\.:\\/",$P=new RegExp("["+R0+"]","g"),P0="[^"+R0+"]",qP="[^"+R0.replace("\\.","")+"]",XP=/((?:WC+[\/:])*)/.source.replace("WC",P0),YP=/(WCOD+)?/.source.replace("WCOD",qP),ZP=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",P0),JP=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",P0),KP=new RegExp("^"+XP+YP+ZP+JP+"$"),QP=["material","materials","bones","map"],o0=class{constructor(e,t,i){let r=i||jt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},jt=(()=>{class n{constructor(t,i,r){this.path=i,this.parsedPath=r||n.parseTrackName(i),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,i,r){return t&&t.isAnimationObjectGroup?new n.Composite(t,i,r):new n(t,i,r)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace($P,"")}static parseTrackName(t){let i=KP.exec(t);if(i===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let r={nodeName:i[2],objectName:i[3],objectIndex:i[4],propertyName:i[5],propertyIndex:i[6]},s=r.nodeName&&r.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let o=r.nodeName.substring(s+1);QP.indexOf(o)!==-1&&(r.nodeName=r.nodeName.substring(0,s),r.objectName=o)}if(r.propertyName===null||r.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return r}static findNode(t,i){if(i===void 0||i===""||i==="."||i===-1||i===t.name||i===t.uuid)return t;if(t.skeleton){let r=t.skeleton.getBoneByName(i);if(r!==void 0)return r}if(t.children){let r=function(o){for(let a=0;a<o.length;a++){let l=o[a];if(l.name===i||l.uuid===i)return l;let c=r(l.children);if(c)return c}return null},s=r(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,i){t[i]=this.targetObject[this.propertyName]}_getValue_array(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)t[i++]=r[s]}_getValue_arrayElement(t,i){t[i]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,i){this.resolvedProperty.toArray(t,i)}_setValue_direct(t,i){this.targetObject[this.propertyName]=t[i]}_setValue_direct_setNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++]}_setValue_array_setNeedsUpdate(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,i){this.resolvedProperty[this.propertyIndex]=t[i]}_setValue_arrayElement_setNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,i){this.resolvedProperty.fromArray(t,i)}_setValue_fromArray_setNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,i){this.bind(),this.getValue(t,i)}_setValue_unbound(t,i){this.bind(),this.setValue(t,i)}bind(){let t=this.node,i=this.parsedPath,r=i.objectName,s=i.propertyName,o=i.propertyIndex;if(t||(t=n.findNode(this.rootNode,i.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ne("PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let u=i.objectIndex;switch(r){case"materials":if(!t.material){Ue("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ue("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ue("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let d=0;d<t.length;d++)if(t[d].name===u){u=d;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ue("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ue("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[r]===void 0){Ue("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[r]}if(u!==void 0){if(t[u]===void 0){Ue("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[u]}}let a=t[s];if(a===void 0){let u=i.nodeName;Ue("PropertyBinding: Trying to update property for track: "+u+"."+s+" but it wasn't found.",t);return}let l=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?l=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(o!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Ue("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ue("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[o]!==void 0&&(o=t.morphTargetDictionary[o])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=o}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}return n.Composite=o0,n})();jt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};jt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};jt.prototype.GetterByBindingType=[jt.prototype._getValue_direct,jt.prototype._getValue_array,jt.prototype._getValue_arrayElement,jt.prototype._getValue_toArray];jt.prototype.SetterByBindingTypeAndVersioning=[[jt.prototype._setValue_direct,jt.prototype._setValue_direct_setNeedsUpdate,jt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[jt.prototype._setValue_array,jt.prototype._setValue_array_setNeedsUpdate,jt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[jt.prototype._setValue_arrayElement,jt.prototype._setValue_arrayElement_setNeedsUpdate,jt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[jt.prototype._setValue_fromArray,jt.prototype._setValue_fromArray_setNeedsUpdate,jt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var RH=new Float32Array(1);var a0=class n{static{n.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};function N0(n,e,t,i){let r=eN(i);switch(t){case M0:return n*e;case E0:return n*e/r.components*r.byteLength;case uf:return n*e/r.components*r.byteLength;case ms:return n*e*2/r.components*r.byteLength;case df:return n*e*2/r.components*r.byteLength;case w0:return n*e*3/r.components*r.byteLength;case vi:return n*e*4/r.components*r.byteLength;case ff:return n*e*4/r.components*r.byteLength;case Wl:case jl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case $l:case ql:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case pf:case gf:return Math.max(n,16)*Math.max(e,8)/4;case hf:case mf:return Math.max(n,8)*Math.max(e,8)/2;case vf:case yf:case _f:case bf:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case xf:case Xl:case Sf:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Mf:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case wf:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ef:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Cf:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Tf:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Af:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case If:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Df:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Rf:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Pf:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Nf:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Of:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Lf:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Ff:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case kf:case Uf:case Bf:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Vf:case Hf:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Yl:case zf:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function eN(n){switch(n){case ri:case x0:return{byteLength:1,components:1};case ca:case _0:case er:return{byteLength:2,components:1};case lf:case cf:return{byteLength:2,components:4};case Pi:case af:case Ni:return{byteLength:4,components:1};case b0:case S0:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:nf}}));typeof window<"u"&&(window.__THREE__?Ne("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=nf);function WM(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function tN(n){let e=new WeakMap;function t(a,l){let c=a.array,u=a.usage,d=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),a.onUploadCallback();let h;if(c instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=n.SHORT;else if(c instanceof Uint32Array)h=n.UNSIGNED_INT;else if(c instanceof Int32Array)h=n.INT;else if(c instanceof Int8Array)h=n.BYTE;else if(c instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){let u=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,u);else{d.sort((h,g)=>h.start-g.start);let f=0;for(let h=1;h<d.length;h++){let g=d[f],x=d[h];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,d[f]=x)}d.length=f+1;for(let h=0,g=d.length;h<g;h++){let x=d[h];n.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var nN=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,iN=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,rN=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,sN=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,oN=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,aN=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,lN=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,cN=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,uN=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,dN=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,fN=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hN=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,pN=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,mN=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,gN=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,vN=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,yN=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xN=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_N=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bN=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,SN=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,MN=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,wN=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,EN=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,CN=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,TN=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,AN=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,IN=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,DN=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,RN=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,PN="gl_FragColor = linearToOutputTexel( gl_FragColor );",NN=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ON=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,LN=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,FN=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,kN=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,UN=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,BN=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,VN=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,HN=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,zN=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,GN=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,WN=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,jN=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$N=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qN=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,XN=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,YN=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ZN=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,JN=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,KN=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,QN=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,e2=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,t2=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,n2=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,i2=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,r2=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,s2=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,o2=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,a2=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,l2=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,c2=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,u2=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,d2=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,f2=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,h2=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,p2=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,m2=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,g2=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,v2=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,y2=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,x2=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_2=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,b2=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,S2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,M2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,w2=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,E2=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,C2=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,T2=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,A2=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,I2=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,D2=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,R2=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,P2=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,N2=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,O2=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,L2=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,F2=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,k2=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,U2=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,B2=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,V2=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,H2=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,z2=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,G2=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,W2=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,j2=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,$2=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,q2=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,X2=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Y2=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Z2=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,J2=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,K2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Q2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,eO=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,tO=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,nO=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,iO=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rO=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sO=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oO=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,aO=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lO=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,cO=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,uO=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,dO=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,fO=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hO=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pO=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mO=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gO=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,vO=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yO=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xO=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_O=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,bO=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,SO=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,MO=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,wO=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,EO=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,CO=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,TO=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,AO=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,IO=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,DO=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,RO=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,PO=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,NO=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,OO=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,LO=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,nt={alphahash_fragment:nN,alphahash_pars_fragment:iN,alphamap_fragment:rN,alphamap_pars_fragment:sN,alphatest_fragment:oN,alphatest_pars_fragment:aN,aomap_fragment:lN,aomap_pars_fragment:cN,batching_pars_vertex:uN,batching_vertex:dN,begin_vertex:fN,beginnormal_vertex:hN,bsdfs:pN,iridescence_fragment:mN,bumpmap_pars_fragment:gN,clipping_planes_fragment:vN,clipping_planes_pars_fragment:yN,clipping_planes_pars_vertex:xN,clipping_planes_vertex:_N,color_fragment:bN,color_pars_fragment:SN,color_pars_vertex:MN,color_vertex:wN,common:EN,cube_uv_reflection_fragment:CN,defaultnormal_vertex:TN,displacementmap_pars_vertex:AN,displacementmap_vertex:IN,emissivemap_fragment:DN,emissivemap_pars_fragment:RN,colorspace_fragment:PN,colorspace_pars_fragment:NN,envmap_fragment:ON,envmap_common_pars_fragment:LN,envmap_pars_fragment:FN,envmap_pars_vertex:kN,envmap_physical_pars_fragment:XN,envmap_vertex:UN,fog_vertex:BN,fog_pars_vertex:VN,fog_fragment:HN,fog_pars_fragment:zN,gradientmap_pars_fragment:GN,lightmap_pars_fragment:WN,lights_lambert_fragment:jN,lights_lambert_pars_fragment:$N,lights_pars_begin:qN,lights_toon_fragment:YN,lights_toon_pars_fragment:ZN,lights_phong_fragment:JN,lights_phong_pars_fragment:KN,lights_physical_fragment:QN,lights_physical_pars_fragment:e2,lights_fragment_begin:t2,lights_fragment_maps:n2,lights_fragment_end:i2,lightprobes_pars_fragment:r2,logdepthbuf_fragment:s2,logdepthbuf_pars_fragment:o2,logdepthbuf_pars_vertex:a2,logdepthbuf_vertex:l2,map_fragment:c2,map_pars_fragment:u2,map_particle_fragment:d2,map_particle_pars_fragment:f2,metalnessmap_fragment:h2,metalnessmap_pars_fragment:p2,morphinstance_vertex:m2,morphcolor_vertex:g2,morphnormal_vertex:v2,morphtarget_pars_vertex:y2,morphtarget_vertex:x2,normal_fragment_begin:_2,normal_fragment_maps:b2,normal_pars_fragment:S2,normal_pars_vertex:M2,normal_vertex:w2,normalmap_pars_fragment:E2,clearcoat_normal_fragment_begin:C2,clearcoat_normal_fragment_maps:T2,clearcoat_pars_fragment:A2,iridescence_pars_fragment:I2,opaque_fragment:D2,packing:R2,premultiplied_alpha_fragment:P2,project_vertex:N2,dithering_fragment:O2,dithering_pars_fragment:L2,roughnessmap_fragment:F2,roughnessmap_pars_fragment:k2,shadowmap_pars_fragment:U2,shadowmap_pars_vertex:B2,shadowmap_vertex:V2,shadowmask_pars_fragment:H2,skinbase_vertex:z2,skinning_pars_vertex:G2,skinning_vertex:W2,skinnormal_vertex:j2,specularmap_fragment:$2,specularmap_pars_fragment:q2,tonemapping_fragment:X2,tonemapping_pars_fragment:Y2,transmission_fragment:Z2,transmission_pars_fragment:J2,uv_pars_fragment:K2,uv_pars_vertex:Q2,uv_vertex:eO,worldpos_vertex:tO,background_vert:nO,background_frag:iO,backgroundCube_vert:rO,backgroundCube_frag:sO,cube_vert:oO,cube_frag:aO,depth_vert:lO,depth_frag:cO,distance_vert:uO,distance_frag:dO,equirect_vert:fO,equirect_frag:hO,linedashed_vert:pO,linedashed_frag:mO,meshbasic_vert:gO,meshbasic_frag:vO,meshlambert_vert:yO,meshlambert_frag:xO,meshmatcap_vert:_O,meshmatcap_frag:bO,meshnormal_vert:SO,meshnormal_frag:MO,meshphong_vert:wO,meshphong_frag:EO,meshphysical_vert:CO,meshphysical_frag:TO,meshtoon_vert:AO,meshtoon_frag:IO,points_vert:DO,points_frag:RO,shadow_vert:PO,shadow_frag:NO,sprite_vert:OO,sprite_frag:LO},me={common:{diffuse:{value:new ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new Ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new ht(16777215)},opacity:{value:1},center:{value:new Ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},nr={basic:{uniforms:An([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:nt.meshbasic_vert,fragmentShader:nt.meshbasic_frag},lambert:{uniforms:An([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new ht(0)},envMapIntensity:{value:1}}]),vertexShader:nt.meshlambert_vert,fragmentShader:nt.meshlambert_frag},phong:{uniforms:An([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new ht(0)},specular:{value:new ht(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:nt.meshphong_vert,fragmentShader:nt.meshphong_frag},standard:{uniforms:An([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag},toon:{uniforms:An([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new ht(0)}}]),vertexShader:nt.meshtoon_vert,fragmentShader:nt.meshtoon_frag},matcap:{uniforms:An([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:nt.meshmatcap_vert,fragmentShader:nt.meshmatcap_frag},points:{uniforms:An([me.points,me.fog]),vertexShader:nt.points_vert,fragmentShader:nt.points_frag},dashed:{uniforms:An([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:nt.linedashed_vert,fragmentShader:nt.linedashed_frag},depth:{uniforms:An([me.common,me.displacementmap]),vertexShader:nt.depth_vert,fragmentShader:nt.depth_frag},normal:{uniforms:An([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:nt.meshnormal_vert,fragmentShader:nt.meshnormal_frag},sprite:{uniforms:An([me.sprite,me.fog]),vertexShader:nt.sprite_vert,fragmentShader:nt.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:nt.background_vert,fragmentShader:nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:nt.backgroundCube_vert,fragmentShader:nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:nt.cube_vert,fragmentShader:nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:nt.equirect_vert,fragmentShader:nt.equirect_frag},distance:{uniforms:An([me.common,me.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:nt.distance_vert,fragmentShader:nt.distance_frag},shadow:{uniforms:An([me.lights,me.fog,{color:{value:new ht(0)},opacity:{value:1}}]),vertexShader:nt.shadow_vert,fragmentShader:nt.shadow_frag}};nr.physical={uniforms:An([nr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new Ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new Ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new ht(0)},specularColor:{value:new ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new Ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag};var $f={r:0,b:0,g:0},FO=new $t,jM=new We;jM.set(-1,0,0,0,1,0,0,0,1);function kO(n,e,t,i,r,s){let o=new ht(0),a=r===!0?0:1,l,c,u=null,d=0,f=null;function h(S){let w=S.isScene===!0?S.background:null;if(w&&w.isTexture){let E=S.backgroundBlurriness>0;w=e.get(w,E)}return w}function g(S){let w=!1,E=h(S);E===null?m(o,a):E&&E.isColor&&(m(E,1),w=!0);let R=n.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,s):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(S,w){let E=h(w);E&&(E.isCubeTexture||E.mapping===zl)?(c===void 0&&(c=new Nn(new aa(1,1,1),new On({name:"BackgroundCubeMaterial",uniforms:qs(nr.backgroundCube.uniforms),vertexShader:nr.backgroundCube.vertexShader,fragmentShader:nr.backgroundCube.fragmentShader,side:Ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,C,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=E,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(FO.makeRotationFromEuler(w.backgroundRotation)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(jM),c.material.toneMapped=ut.getTransfer(E.colorSpace)!==wt,(u!==E||d!==E.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=E,d=E.version,f=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new Nn(new js(2,2),new On({name:"BackgroundMaterial",uniforms:qs(nr.background.uniforms),vertexShader:nr.background.vertexShader,fragmentShader:nr.background.fragmentShader,side:_r,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=ut.getTransfer(E.colorSpace)!==wt,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||d!==E.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,u=E,d=E.version,f=n.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function m(S,w){S.getRGB($f,D0(n)),t.buffers.color.setClear($f.r,$f.g,$f.b,w,s)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,w=1){o.set(S),a=w,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(S){a=S,m(o,a)},render:g,addToRenderList:x,dispose:p}}function UO(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null),s=r,o=!1;function a(D,U,$,Z,O){let z=!1,H=d(D,Z,$,U);s!==H&&(s=H,c(s.object)),z=h(D,Z,$,O),z&&g(D,Z,$,O),O!==null&&e.update(O,n.ELEMENT_ARRAY_BUFFER),(z||o)&&(o=!1,E(D,U,$,Z),O!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return n.createVertexArray()}function c(D){return n.bindVertexArray(D)}function u(D){return n.deleteVertexArray(D)}function d(D,U,$,Z){let O=Z.wireframe===!0,z=i[U.id];z===void 0&&(z={},i[U.id]=z);let H=D.isInstancedMesh===!0?D.id:0,te=z[H];te===void 0&&(te={},z[H]=te);let re=te[$.id];re===void 0&&(re={},te[$.id]=re);let de=re[O];return de===void 0&&(de=f(l()),re[O]=de),de}function f(D){let U=[],$=[],Z=[];for(let O=0;O<t;O++)U[O]=0,$[O]=0,Z[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:$,attributeDivisors:Z,object:D,attributes:{},index:null}}function h(D,U,$,Z){let O=s.attributes,z=U.attributes,H=0,te=$.getAttributes();for(let re in te)if(te[re].location>=0){let be=O[re],Ce=z[re];if(Ce===void 0&&(re==="instanceMatrix"&&D.instanceMatrix&&(Ce=D.instanceMatrix),re==="instanceColor"&&D.instanceColor&&(Ce=D.instanceColor)),be===void 0||be.attribute!==Ce||Ce&&be.data!==Ce.data)return!0;H++}return s.attributesNum!==H||s.index!==Z}function g(D,U,$,Z){let O={},z=U.attributes,H=0,te=$.getAttributes();for(let re in te)if(te[re].location>=0){let be=z[re];be===void 0&&(re==="instanceMatrix"&&D.instanceMatrix&&(be=D.instanceMatrix),re==="instanceColor"&&D.instanceColor&&(be=D.instanceColor));let Ce={};Ce.attribute=be,be&&be.data&&(Ce.data=be.data),O[re]=Ce,H++}s.attributes=O,s.attributesNum=H,s.index=Z}function x(){let D=s.newAttributes;for(let U=0,$=D.length;U<$;U++)D[U]=0}function m(D){p(D,0)}function p(D,U){let $=s.newAttributes,Z=s.enabledAttributes,O=s.attributeDivisors;$[D]=1,Z[D]===0&&(n.enableVertexAttribArray(D),Z[D]=1),O[D]!==U&&(n.vertexAttribDivisor(D,U),O[D]=U)}function S(){let D=s.newAttributes,U=s.enabledAttributes;for(let $=0,Z=U.length;$<Z;$++)U[$]!==D[$]&&(n.disableVertexAttribArray($),U[$]=0)}function w(D,U,$,Z,O,z,H){H===!0?n.vertexAttribIPointer(D,U,$,O,z):n.vertexAttribPointer(D,U,$,Z,O,z)}function E(D,U,$,Z){x();let O=Z.attributes,z=$.getAttributes(),H=U.defaultAttributeValues;for(let te in z){let re=z[te];if(re.location>=0){let de=O[te];if(de===void 0&&(te==="instanceMatrix"&&D.instanceMatrix&&(de=D.instanceMatrix),te==="instanceColor"&&D.instanceColor&&(de=D.instanceColor)),de!==void 0){let be=de.normalized,Ce=de.itemSize,at=e.get(de);if(at===void 0)continue;let et=at.buffer,Me=at.type,Q=at.bytesPerElement,he=Me===n.INT||Me===n.UNSIGNED_INT||de.gpuType===af;if(de.isInterleavedBufferAttribute){let se=de.data,Oe=se.stride,ze=de.offset;if(se.isInstancedInterleavedBuffer){for(let Le=0;Le<re.locationSize;Le++)p(re.location+Le,se.meshPerAttribute);D.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Le=0;Le<re.locationSize;Le++)m(re.location+Le);n.bindBuffer(n.ARRAY_BUFFER,et);for(let Le=0;Le<re.locationSize;Le++)w(re.location+Le,Ce/re.locationSize,Me,be,Oe*Q,(ze+Ce/re.locationSize*Le)*Q,he)}else{if(de.isInstancedBufferAttribute){for(let se=0;se<re.locationSize;se++)p(re.location+se,de.meshPerAttribute);D.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let se=0;se<re.locationSize;se++)m(re.location+se);n.bindBuffer(n.ARRAY_BUFFER,et);for(let se=0;se<re.locationSize;se++)w(re.location+se,Ce/re.locationSize,Me,be,Ce*Q,Ce/re.locationSize*se*Q,he)}}else if(H!==void 0){let be=H[te];if(be!==void 0)switch(be.length){case 2:n.vertexAttrib2fv(re.location,be);break;case 3:n.vertexAttrib3fv(re.location,be);break;case 4:n.vertexAttrib4fv(re.location,be);break;default:n.vertexAttrib1fv(re.location,be)}}}}S()}function R(){A();for(let D in i){let U=i[D];for(let $ in U){let Z=U[$];for(let O in Z){let z=Z[O];for(let H in z)u(z[H].object),delete z[H];delete Z[O]}}delete i[D]}}function C(D){if(i[D.id]===void 0)return;let U=i[D.id];for(let $ in U){let Z=U[$];for(let O in Z){let z=Z[O];for(let H in z)u(z[H].object),delete z[H];delete Z[O]}}delete i[D.id]}function I(D){for(let U in i){let $=i[U];for(let Z in $){let O=$[Z];if(O[D.id]===void 0)continue;let z=O[D.id];for(let H in z)u(z[H].object),delete z[H];delete O[D.id]}}}function y(D){for(let U in i){let $=i[U],Z=D.isInstancedMesh===!0?D.id:0,O=$[Z];if(O!==void 0){for(let z in O){let H=O[z];for(let te in H)u(H[te].object),delete H[te];delete O[z]}delete $[Z],Object.keys($).length===0&&delete i[U]}}}function A(){k(),o=!0,s!==r&&(s=r,c(s.object))}function k(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:A,resetDefaultState:k,dispose:R,releaseStatesOfGeometry:C,releaseStatesOfObject:y,releaseStatesOfProgram:I,initAttributes:x,enableAttribute:m,disableUnusedAttributes:S}}function BO(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function o(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function a(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let f=0;for(let h=0;h<u;h++)f+=c[h];t.update(f,i,1)}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function VO(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let I=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(I){return!(I!==vi&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){let y=I===er&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==ri&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==Ni&&!y)}function l(I){if(I==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(Ne("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&Ne("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=n.getParameter(n.MAX_SAMPLES),C=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:w,maxFragmentUniforms:E,maxSamples:R,samples:C}}function HO(n){let e=this,t=null,i=0,r=!1,s=!1,o=new Xi,a=new We,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let h=d.length!==0||f||i!==0||r;return r=f,i=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){let g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{let S=s?0:i,w=S*4,E=p.clippingState||null;l.value=E,E=u(g,f,w,h);for(let R=0;R!==w;++R)E[R]=t[R];p.clippingState=E,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,h,g){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let p=h+x*4,S=f.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,E=h;w!==x;++w,E+=4)o.copy(d[w]).applyMatrix4(S,a),o.normal.toArray(m,E),m[E+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}var gs=4,SM=[.125,.215,.35,.446,.526,.582],Xs=20,zO=256,Zl=new Vl,MM=new ht,O0=null,L0=0,F0=0,k0=!1,GO=new B,Xf=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){let{size:o=256,position:a=GO}=s;O0=this._renderer.getRenderTarget(),L0=this._renderer.getActiveCubeFace(),F0=this._renderer.getActiveMipmapLevel(),k0=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=CM(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=EM(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(O0,L0,F0),this._renderer.xr.enabled=k0,e.scissorTest=!1,fa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===fs||e.mapping===$s?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),O0=this._renderer.getRenderTarget(),L0=this._renderer.getActiveCubeFace(),F0=this._renderer.getActiveMipmapLevel(),k0=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:gn,minFilter:gn,generateMipmaps:!1,type:er,format:vi,colorSpace:Sl,depthBuffer:!1},r=wM(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wM(e,t,i);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=WO(s)),this._blurMaterial=$O(s,e,t),this._ggxMaterial=jO(s,e,t)}return r}_compileMaterial(e){let t=new Nn(new Tn,e);this._renderer.compile(t,Zl)}_sceneToCubeUV(e,t,i,r,s){let l=new Cn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(MM),d.toneMapping=Ri,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Nn(new aa,new Ws({name:"PMREM.Background",side:Ln,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,m=x.material,p=!1,S=e.background;S?S.isColor&&(m.color.copy(S),e.background=null,p=!0):(m.color.copy(MM),p=!0);for(let w=0;w<6;w++){let E=w%3;E===0?(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[w],s.y,s.z)):E===1?(l.up.set(0,0,c[w]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[w],s.z)):(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[w]));let R=this._cubeSize;fa(r,E*R,w>2?R:0,R,R),d.setRenderTarget(r),p&&d.render(x,l),d.render(e,l)}d.toneMapping=h,d.autoClear=f,e.background=S}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===fs||e.mapping===$s;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=CM()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=EM());let s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;let a=s.uniforms;a.envMap.value=e;let l=this._cubeSize;fa(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Zl)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;let l=o.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),f=0+c*1.25,h=d*f,{_lodMax:g}=this,x=this._sizeLods[i],m=3*x*(i>g-gs?i-g+gs:0),p=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=h,l.mipInt.value=g-t,fa(s,m,p,3*x,2*x),r.setRenderTarget(s),r.render(a,Zl),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-i,fa(e,m,p,3*x,2*x),r.setRenderTarget(e),r.render(a,Zl)}_blur(e,t,i,r,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Ue("blur direction must be either latitudinal or longitudinal!");let u=3,d=this._lodMeshes[r];d.material=c;let f=c.uniforms,h=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*Xs-1),x=s/g,m=isFinite(s)?1+Math.floor(u*x):Xs;m>Xs&&Ne(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Xs}`);let p=[],S=0;for(let I=0;I<Xs;++I){let y=I/x,A=Math.exp(-y*y/2);p.push(A),I===0?S+=A:I<m&&(S+=2*A)}for(let I=0;I<p.length;I++)p[I]=p[I]/S;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:w}=this;f.dTheta.value=g,f.mipInt.value=w-i;let E=this._sizeLods[r],R=3*E*(r>w-gs?r-w+gs:0),C=4*(this._cubeSize-E);fa(t,R,C,3*E,2*E),l.setRenderTarget(t),l.render(d,Zl)}};function WO(n){let e=[],t=[],i=[],r=n,s=n-gs+1+SM.length;for(let o=0;o<s;o++){let a=Math.pow(2,r);e.push(a);let l=1/a;o>n-gs?l=SM[o-n+gs-1]:o===0&&(l=0),t.push(l);let c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,g=6,x=3,m=2,p=1,S=new Float32Array(x*g*h),w=new Float32Array(m*g*h),E=new Float32Array(p*g*h);for(let C=0;C<h;C++){let I=C%3*2/3-1,y=C>2?0:-1,A=[I,y,0,I+2/3,y,0,I+2/3,y+1,0,I,y,0,I+2/3,y+1,0,I,y+1,0];S.set(A,x*g*C),w.set(f,m*g*C);let k=[C,C,C,C,C,C];E.set(k,p*g*C)}let R=new Tn;R.setAttribute("position",new pn(S,x)),R.setAttribute("uv",new pn(w,m)),R.setAttribute("faceIndex",new pn(E,p)),i.push(new Nn(R,null)),r>gs&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function wM(n,e,t){let i=new ni(n,e,t);return i.texture.mapping=zl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function fa(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function jO(n,e,t){return new On({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:zO,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Jf(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function $O(n,e,t){let i=new Float32Array(Xs),r=new B(0,1,0);return new On({name:"SphericalGaussianBlur",defines:{n:Xs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Jf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function EM(){return new On({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Jf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function CM(){return new On({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Jf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function Jf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var Yf=class extends ni{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Ll(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new aa(5,5,5),s=new On({name:"CubemapFromEquirect",uniforms:qs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ln,blending:Qi});s.uniforms.tEquirect.value=t;let o=new Nn(r,s),a=t.minFilter;return t.minFilter===hs&&(t.minFilter=gn),new ef(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}};function qO(n){let e=new WeakMap,t=new WeakMap,i=null;function r(f,h=!1){return f==null?null:h?o(f):s(f)}function s(f){if(f&&f.isTexture){let h=f.mapping;if(h===rf||h===sf)if(e.has(f)){let g=e.get(f).texture;return a(g,f.mapping)}else{let g=f.image;if(g&&g.height>0){let x=new Yf(g.height);return x.fromEquirectangularTexture(n,f),e.set(f,x),f.addEventListener("dispose",c),a(x.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){let h=f.mapping,g=h===rf||h===sf,x=h===fs||h===$s;if(g||x){let m=t.get(f),p=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return i===null&&(i=new Xf(n)),m=g?i.fromEquirectangular(f,m):i.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),m.texture;if(m!==void 0)return m.texture;{let S=f.image;return g&&S&&S.height>0||x&&S&&l(S)?(i===null&&(i=new Xf(n)),m=g?i.fromEquirectangular(f):i.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),f.addEventListener("dispose",u),m.texture):null}}}return f}function a(f,h){return h===rf?f.mapping=fs:h===sf&&(f.mapping=$s),f}function l(f){let h=0,g=6;for(let x=0;x<g;x++)f[x]!==void 0&&h++;return h===g}function c(f){let h=f.target;h.removeEventListener("dispose",c);let g=e.get(h);g!==void 0&&(e.delete(h),g.dispose())}function u(f){let h=f.target;h.removeEventListener("dispose",u);let g=t.get(h);g!==void 0&&(t.delete(h),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function XO(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&Od("WebGLRenderer: "+i+" extension not supported."),r}}}function YO(n,e,t,i){let r={},s=new WeakMap;function o(d){let f=d.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete r[f.id];let h=s.get(f);h&&(e.remove(h),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function l(d){let f=d.attributes;for(let h in f)e.update(f[h],n.ARRAY_BUFFER)}function c(d){let f=[],h=d.index,g=d.attributes.position,x=0;if(g===void 0)return;if(h!==null){let S=h.array;x=h.version;for(let w=0,E=S.length;w<E;w+=3){let R=S[w+0],C=S[w+1],I=S[w+2];f.push(R,C,C,I,I,R)}}else{let S=g.array;x=g.version;for(let w=0,E=S.length/3-1;w<E;w+=3){let R=w+0,C=w+1,I=w+2;f.push(R,C,C,I,I,R)}}let m=new(g.count>=65535?Rl:Dl)(f,1);m.version=x;let p=s.get(d);p&&e.remove(p),s.set(d,m)}function u(d){let f=s.get(d);if(f){let h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function ZO(n,e,t){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,f){n.drawElements(i,f,s,d*o),t.update(f,i,1)}function c(d,f,h){h!==0&&(n.drawElementsInstanced(i,f,s,d*o,h),t.update(f,i,h))}function u(d,f,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,d,0,h);let x=0;for(let m=0;m<h;m++)x+=f[m];t.update(x,i,1)}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function JO(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:Ue("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function KO(n,e,t){let i=new WeakMap,r=new qt;function s(o,a,l){let c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,f=i.get(a);if(f===void 0||f.count!==d){let k=function(){y.dispose(),i.delete(a),a.removeEventListener("dispose",k)};var h=k;f!==void 0&&f.texture.dispose();let g=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],E=0;g===!0&&(E=1),x===!0&&(E=2),m===!0&&(E=3);let R=a.attributes.position.count*E,C=1;R>e.maxTextureSize&&(C=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);let I=new Float32Array(R*C*4*d),y=new Cl(I,R,C,d);y.type=Ni,y.needsUpdate=!0;let A=E*4;for(let D=0;D<d;D++){let U=p[D],$=S[D],Z=w[D],O=R*C*4*D;for(let z=0;z<U.count;z++){let H=z*A;g===!0&&(r.fromBufferAttribute(U,z),I[O+H+0]=r.x,I[O+H+1]=r.y,I[O+H+2]=r.z,I[O+H+3]=0),x===!0&&(r.fromBufferAttribute($,z),I[O+H+4]=r.x,I[O+H+5]=r.y,I[O+H+6]=r.z,I[O+H+7]=0),m===!0&&(r.fromBufferAttribute(Z,z),I[O+H+8]=r.x,I[O+H+9]=r.y,I[O+H+10]=r.z,I[O+H+11]=Z.itemSize===4?r.w:1)}}f={count:d,texture:y,size:new Ct(R,C)},i.set(a,f),a.addEventListener("dispose",k)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];let x=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function QO(n,e,t,i,r){let s=new WeakMap;function o(c){let u=r.render.frame,d=c.geometry,f=e.get(c,d);if(s.get(f)!==u&&(e.update(f),s.set(f,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){let h=c.skeleton;s.get(h)!==u&&(h.update(),s.set(h,u))}return f}function a(){s=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}var eL={[f0]:"LINEAR_TONE_MAPPING",[h0]:"REINHARD_TONE_MAPPING",[p0]:"CINEON_TONE_MAPPING",[m0]:"ACES_FILMIC_TONE_MAPPING",[v0]:"AGX_TONE_MAPPING",[y0]:"NEUTRAL_TONE_MAPPING",[g0]:"CUSTOM_TONE_MAPPING"};function tL(n,e,t,i,r){let s=new ni(e,t,{type:n,depthBuffer:i,stencilBuffer:r,depthTexture:i?new Sr(e,t):void 0}),o=new ni(e,t,{type:er,depthBuffer:!1,stencilBuffer:!1}),a=new Tn;a.setAttribute("position",new mn([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new mn([0,2,0,0,2,0],2));let l=new Gd({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new Nn(a,l),u=new Vl(-1,1,1,-1,0,1),d=null,f=null,h=!1,g,x=null,m=[],p=!1;this.setSize=function(S,w){s.setSize(S,w),o.setSize(S,w);for(let E=0;E<m.length;E++){let R=m[E];R.setSize&&R.setSize(S,w)}},this.setEffects=function(S){m=S,p=m.length>0&&m[0].isRenderPass===!0;let w=s.width,E=s.height;for(let R=0;R<m.length;R++){let C=m[R];C.setSize&&C.setSize(w,E)}},this.begin=function(S,w){if(h||S.toneMapping===Ri&&m.length===0)return!1;if(x=w,w!==null){let E=w.width,R=w.height;(s.width!==E||s.height!==R)&&this.setSize(E,R)}return p===!1&&S.setRenderTarget(s),g=S.toneMapping,S.toneMapping=Ri,!0},this.hasRenderPass=function(){return p},this.end=function(S,w){S.toneMapping=g,h=!0;let E=s,R=o;for(let C=0;C<m.length;C++){let I=m[C];if(I.enabled!==!1&&(I.render(S,R,E,w),I.needsSwap!==!1)){let y=E;E=R,R=y}}if(d!==S.outputColorSpace||f!==S.toneMapping){d=S.outputColorSpace,f=S.toneMapping,l.defines={},ut.getTransfer(d)===wt&&(l.defines.SRGB_TRANSFER="");let C=eL[f];C&&(l.defines[C]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=E.texture,S.setRenderTarget(x),S.render(c,u),x=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),o.dispose(),a.dispose(),l.dispose()}}var $M=new wr,V0=new Sr(1,1),qM=new Cl,XM=new kd,YM=new Ll,TM=[],AM=[],IM=new Float32Array(16),DM=new Float32Array(9),RM=new Float32Array(4);function pa(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=TM[r];if(s===void 0&&(s=new Float32Array(r),TM[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function rn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function sn(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Kf(n,e){let t=AM[e];t===void 0&&(t=new Int32Array(e),AM[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function nL(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function iL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;n.uniform2fv(this.addr,e),sn(t,e)}}function rL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(rn(t,e))return;n.uniform3fv(this.addr,e),sn(t,e)}}function sL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;n.uniform4fv(this.addr,e),sn(t,e)}}function oL(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(rn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),sn(t,e)}else{if(rn(t,i))return;RM.set(i),n.uniformMatrix2fv(this.addr,!1,RM),sn(t,i)}}function aL(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(rn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),sn(t,e)}else{if(rn(t,i))return;DM.set(i),n.uniformMatrix3fv(this.addr,!1,DM),sn(t,i)}}function lL(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(rn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),sn(t,e)}else{if(rn(t,i))return;IM.set(i),n.uniformMatrix4fv(this.addr,!1,IM),sn(t,i)}}function cL(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function uL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;n.uniform2iv(this.addr,e),sn(t,e)}}function dL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;n.uniform3iv(this.addr,e),sn(t,e)}}function fL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;n.uniform4iv(this.addr,e),sn(t,e)}}function hL(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function pL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;n.uniform2uiv(this.addr,e),sn(t,e)}}function mL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;n.uniform3uiv(this.addr,e),sn(t,e)}}function gL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;n.uniform4uiv(this.addr,e),sn(t,e)}}function vL(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(V0.compareFunction=t.isReversedDepthBuffer()?Wf:Gf,s=V0):s=$M,t.setTexture2D(e||s,r)}function yL(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||XM,r)}function xL(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||YM,r)}function _L(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||qM,r)}function bL(n){switch(n){case 5126:return nL;case 35664:return iL;case 35665:return rL;case 35666:return sL;case 35674:return oL;case 35675:return aL;case 35676:return lL;case 5124:case 35670:return cL;case 35667:case 35671:return uL;case 35668:case 35672:return dL;case 35669:case 35673:return fL;case 5125:return hL;case 36294:return pL;case 36295:return mL;case 36296:return gL;case 35678:case 36198:case 36298:case 36306:case 35682:return vL;case 35679:case 36299:case 36307:return yL;case 35680:case 36300:case 36308:case 36293:return xL;case 36289:case 36303:case 36311:case 36292:return _L}}function SL(n,e){n.uniform1fv(this.addr,e)}function ML(n,e){let t=pa(e,this.size,2);n.uniform2fv(this.addr,t)}function wL(n,e){let t=pa(e,this.size,3);n.uniform3fv(this.addr,t)}function EL(n,e){let t=pa(e,this.size,4);n.uniform4fv(this.addr,t)}function CL(n,e){let t=pa(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function TL(n,e){let t=pa(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function AL(n,e){let t=pa(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function IL(n,e){n.uniform1iv(this.addr,e)}function DL(n,e){n.uniform2iv(this.addr,e)}function RL(n,e){n.uniform3iv(this.addr,e)}function PL(n,e){n.uniform4iv(this.addr,e)}function NL(n,e){n.uniform1uiv(this.addr,e)}function OL(n,e){n.uniform2uiv(this.addr,e)}function LL(n,e){n.uniform3uiv(this.addr,e)}function FL(n,e){n.uniform4uiv(this.addr,e)}function kL(n,e,t){let i=this.cache,r=e.length,s=Kf(t,r);rn(i,s)||(n.uniform1iv(this.addr,s),sn(i,s));let o;this.type===n.SAMPLER_2D_SHADOW?o=V0:o=$M;for(let a=0;a!==r;++a)t.setTexture2D(e[a]||o,s[a])}function UL(n,e,t){let i=this.cache,r=e.length,s=Kf(t,r);rn(i,s)||(n.uniform1iv(this.addr,s),sn(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||XM,s[o])}function BL(n,e,t){let i=this.cache,r=e.length,s=Kf(t,r);rn(i,s)||(n.uniform1iv(this.addr,s),sn(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||YM,s[o])}function VL(n,e,t){let i=this.cache,r=e.length,s=Kf(t,r);rn(i,s)||(n.uniform1iv(this.addr,s),sn(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||qM,s[o])}function HL(n){switch(n){case 5126:return SL;case 35664:return ML;case 35665:return wL;case 35666:return EL;case 35674:return CL;case 35675:return TL;case 35676:return AL;case 5124:case 35670:return IL;case 35667:case 35671:return DL;case 35668:case 35672:return RL;case 35669:case 35673:return PL;case 5125:return NL;case 36294:return OL;case 36295:return LL;case 36296:return FL;case 35678:case 36198:case 36298:case 36306:case 35682:return kL;case 35679:case 36299:case 36307:return UL;case 35680:case 36300:case 36308:case 36293:return BL;case 36289:case 36303:case 36311:case 36292:return VL}}var H0=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=bL(t.type)}},z0=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=HL(t.type)}},G0=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],i)}}},U0=/(\w+)(\])?(\[|\.)?/g;function PM(n,e){n.seq.push(e),n.map[e.id]=e}function zL(n,e,t){let i=n.name,r=i.length;for(U0.lastIndex=0;;){let s=U0.exec(i),o=U0.lastIndex,a=s[1],l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){PM(t,c===void 0?new H0(a,n,e):new z0(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new G0(a),PM(t,d)),t=d}}}var ha=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);zL(a,l,this)}let r=[],s=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&i.push(o)}return i}};function NM(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var GL=37297,WL=0;function jL(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var OM=new We;function $L(n){ut._getMatrix(OM,ut.workingColorSpace,n);let e=`mat3( ${OM.elements.map(t=>t.toFixed(4))} )`;switch(ut.getTransfer(n)){case Ml:return[e,"LinearTransferOETF"];case wt:return[e,"sRGBTransferOETF"];default:return Ne("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function LM(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+jL(n.getShaderSource(e),a)}else return s}function qL(n,e){let t=$L(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var XL={[f0]:"Linear",[h0]:"Reinhard",[p0]:"Cineon",[m0]:"ACESFilmic",[v0]:"AgX",[y0]:"Neutral",[g0]:"Custom"};function YL(n,e){let t=XL[e];return t===void 0?(Ne("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var qf=new B;function ZL(){ut.getLuminanceCoefficients(qf);let n=qf.x.toFixed(4),e=qf.y.toFixed(4),t=qf.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function JL(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Kl).join(`
`)}function KL(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function QL(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),o=s.name,a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Kl(n){return n!==""}function FM(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function kM(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var eF=/^[ \t]*#include +<([\w\d./]+)>/gm;function W0(n){return n.replace(eF,nF)}var tF=new Map;function nF(n,e){let t=nt[e];if(t===void 0){let i=tF.get(e);if(i!==void 0)t=nt[i],Ne('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return W0(t)}var iF=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function UM(n){return n.replace(iF,rF)}function rF(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function BM(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var sF={[Hl]:"SHADOWMAP_TYPE_PCF",[la]:"SHADOWMAP_TYPE_VSM"};function oF(n){return sF[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var aF={[fs]:"ENVMAP_TYPE_CUBE",[$s]:"ENVMAP_TYPE_CUBE",[zl]:"ENVMAP_TYPE_CUBE_UV"};function lF(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":aF[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var cF={[$s]:"ENVMAP_MODE_REFRACTION"};function uF(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":cF[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var dF={[d0]:"ENVMAP_BLENDING_MULTIPLY",[sM]:"ENVMAP_BLENDING_MIX",[oM]:"ENVMAP_BLENDING_ADD"};function fF(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":dF[n.combine]||"ENVMAP_BLENDING_NONE"}function hF(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function pF(n,e,t,i){let r=n.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,l=oF(t),c=lF(t),u=uF(t),d=fF(t),f=hF(t),h=JL(t),g=KL(s),x=r.createProgram(),m,p,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Kl).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Kl).join(`
`),p.length>0&&(p+=`
`)):(m=[BM(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Kl).join(`
`),p=[BM(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ri?"#define TONE_MAPPING":"",t.toneMapping!==Ri?nt.tonemapping_pars_fragment:"",t.toneMapping!==Ri?YL("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",nt.colorspace_pars_fragment,qL("linearToOutputTexel",t.outputColorSpace),ZL(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Kl).join(`
`)),o=W0(o),o=FM(o,t),o=kM(o,t),a=W0(a),a=FM(a,t),a=kM(a,t),o=UM(o),a=UM(a),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===T0?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===T0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let w=S+m+o,E=S+p+a,R=NM(r,r.VERTEX_SHADER,w),C=NM(r,r.FRAGMENT_SHADER,E);r.attachShader(x,R),r.attachShader(x,C),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function I(D){if(n.debug.checkShaderErrors){let U=r.getProgramInfoLog(x)||"",$=r.getShaderInfoLog(R)||"",Z=r.getShaderInfoLog(C)||"",O=U.trim(),z=$.trim(),H=Z.trim(),te=!0,re=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(te=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,R,C);else{let de=LM(r,R,"vertex"),be=LM(r,C,"fragment");Ue("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+O+`
`+de+`
`+be)}else O!==""?Ne("WebGLProgram: Program Info Log:",O):(z===""||H==="")&&(re=!1);re&&(D.diagnostics={runnable:te,programLog:O,vertexShader:{log:z,prefix:m},fragmentShader:{log:H,prefix:p}})}r.deleteShader(R),r.deleteShader(C),y=new ha(r,x),A=QL(r,x)}let y;this.getUniforms=function(){return y===void 0&&I(this),y};let A;this.getAttributes=function(){return A===void 0&&I(this),A};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=r.getProgramParameter(x,GL)),k},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=WL++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=C,this}var mF=0,j0=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new $0(e),t.set(e,i)),i}},$0=class{constructor(e){this.id=mF++,this.code=e,this.usedTimes=0}};function gF(n){return n===ms||n===Xl||n===Yl}function vF(n,e,t,i,r,s){let o=new Al,a=new j0,l=new Set,c=[],u=new Map,d=i.logarithmicDepthBuffer,f=i.precision,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return l.add(y),y===0?"uv":`uv${y}`}function x(y,A,k,D,U,$){let Z=D.fog,O=U.geometry,z=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?D.environment:null,H=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,te=e.get(y.envMap||z,H),re=te&&te.mapping===zl?te.image.height:null,de=h[y.type];y.precision!==null&&(f=i.getMaxPrecision(y.precision),f!==y.precision&&Ne("WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));let be=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Ce=be!==void 0?be.length:0,at=0;O.morphAttributes.position!==void 0&&(at=1),O.morphAttributes.normal!==void 0&&(at=2),O.morphAttributes.color!==void 0&&(at=3);let et,Me,Q,he;if(de){let $e=nr[de];et=$e.vertexShader,Me=$e.fragmentShader}else et=y.vertexShader,Me=y.fragmentShader,a.update(y),Q=a.getVertexShaderID(y),he=a.getFragmentShaderID(y);let se=n.getRenderTarget(),Oe=n.state.buffers.depth.getReversed(),ze=U.isInstancedMesh===!0,Le=U.isBatchedMesh===!0,St=!!y.map,tt=!!y.matcap,xt=!!te,Et=!!y.aoMap,lt=!!y.lightMap,Qt=!!y.bumpMap,Bt=!!y.normalMap,zn=!!y.displacementMap,L=!!y.emissiveMap,en=!!y.metalnessMap,ct=!!y.roughnessMap,Nt=y.anisotropy>0,pe=y.clearcoat>0,Vt=y.dispersion>0,b=y.iridescence>0,v=y.sheen>0,V=y.transmission>0,K=Nt&&!!y.anisotropyMap,ie=pe&&!!y.clearcoatMap,oe=pe&&!!y.clearcoatNormalMap,fe=pe&&!!y.clearcoatRoughnessMap,Y=b&&!!y.iridescenceMap,ee=b&&!!y.iridescenceThicknessMap,xe=v&&!!y.sheenColorMap,we=v&&!!y.sheenRoughnessMap,ce=!!y.specularMap,ae=!!y.specularColorMap,Ge=!!y.specularIntensityMap,Ke=V&&!!y.transmissionMap,_t=V&&!!y.thicknessMap,N=!!y.gradientMap,le=!!y.alphaMap,J=y.alphaTest>0,_e=!!y.alphaHash,ue=!!y.extensions,ne=Ri;y.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(ne=n.toneMapping);let Ie={shaderID:de,shaderType:y.type,shaderName:y.name,vertexShader:et,fragmentShader:Me,defines:y.defines,customVertexShaderID:Q,customFragmentShaderID:he,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Le,batchingColor:Le&&U._colorsTexture!==null,instancing:ze,instancingColor:ze&&U.instanceColor!==null,instancingMorph:ze&&U.morphTexture!==null,outputColorSpace:se===null?n.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:ut.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:St,matcap:tt,envMap:xt,envMapMode:xt&&te.mapping,envMapCubeUVHeight:re,aoMap:Et,lightMap:lt,bumpMap:Qt,normalMap:Bt,displacementMap:zn,emissiveMap:L,normalMapObjectSpace:Bt&&y.normalMapType===cM,normalMapTangentSpace:Bt&&y.normalMapType===C0,packedNormalMap:Bt&&y.normalMapType===C0&&gF(y.normalMap.format),metalnessMap:en,roughnessMap:ct,anisotropy:Nt,anisotropyMap:K,clearcoat:pe,clearcoatMap:ie,clearcoatNormalMap:oe,clearcoatRoughnessMap:fe,dispersion:Vt,iridescence:b,iridescenceMap:Y,iridescenceThicknessMap:ee,sheen:v,sheenColorMap:xe,sheenRoughnessMap:we,specularMap:ce,specularColorMap:ae,specularIntensityMap:Ge,transmission:V,transmissionMap:Ke,thicknessMap:_t,gradientMap:N,opaque:y.transparent===!1&&y.blending===zs&&y.alphaToCoverage===!1,alphaMap:le,alphaTest:J,alphaHash:_e,combine:y.combine,mapUv:St&&g(y.map.channel),aoMapUv:Et&&g(y.aoMap.channel),lightMapUv:lt&&g(y.lightMap.channel),bumpMapUv:Qt&&g(y.bumpMap.channel),normalMapUv:Bt&&g(y.normalMap.channel),displacementMapUv:zn&&g(y.displacementMap.channel),emissiveMapUv:L&&g(y.emissiveMap.channel),metalnessMapUv:en&&g(y.metalnessMap.channel),roughnessMapUv:ct&&g(y.roughnessMap.channel),anisotropyMapUv:K&&g(y.anisotropyMap.channel),clearcoatMapUv:ie&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:oe&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:fe&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Y&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:ee&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:we&&g(y.sheenRoughnessMap.channel),specularMapUv:ce&&g(y.specularMap.channel),specularColorMapUv:ae&&g(y.specularColorMap.channel),specularIntensityMapUv:Ge&&g(y.specularIntensityMap.channel),transmissionMapUv:Ke&&g(y.transmissionMap.channel),thicknessMapUv:_t&&g(y.thicknessMap.channel),alphaMapUv:le&&g(y.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Bt||Nt),vertexNormals:!!O.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!O.attributes.uv&&(St||le),fog:!!Z,useFog:y.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||O.attributes.normal===void 0&&Bt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Oe,skinning:U.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:Ce,morphTextureStride:at,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:$.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&k.length>0,shadowMapType:n.shadowMap.type,toneMapping:ne,decodeVideoTexture:St&&y.map.isVideoTexture===!0&&ut.getTransfer(y.map.colorSpace)===wt,decodeVideoTextureEmissive:L&&y.emissiveMap.isVideoTexture===!0&&ut.getTransfer(y.emissiveMap.colorSpace)===wt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===gi,flipSided:y.side===Ln,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ue&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ue&&y.extensions.multiDraw===!0||Le)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ie.vertexUv1s=l.has(1),Ie.vertexUv2s=l.has(2),Ie.vertexUv3s=l.has(3),l.clear(),Ie}function m(y){let A=[];if(y.shaderID?A.push(y.shaderID):(A.push(y.customVertexShaderID),A.push(y.customFragmentShaderID)),y.defines!==void 0)for(let k in y.defines)A.push(k),A.push(y.defines[k]);return y.isRawShaderMaterial===!1&&(p(A,y),S(A,y),A.push(n.outputColorSpace)),A.push(y.customProgramCacheKey),A.join()}function p(y,A){y.push(A.precision),y.push(A.outputColorSpace),y.push(A.envMapMode),y.push(A.envMapCubeUVHeight),y.push(A.mapUv),y.push(A.alphaMapUv),y.push(A.lightMapUv),y.push(A.aoMapUv),y.push(A.bumpMapUv),y.push(A.normalMapUv),y.push(A.displacementMapUv),y.push(A.emissiveMapUv),y.push(A.metalnessMapUv),y.push(A.roughnessMapUv),y.push(A.anisotropyMapUv),y.push(A.clearcoatMapUv),y.push(A.clearcoatNormalMapUv),y.push(A.clearcoatRoughnessMapUv),y.push(A.iridescenceMapUv),y.push(A.iridescenceThicknessMapUv),y.push(A.sheenColorMapUv),y.push(A.sheenRoughnessMapUv),y.push(A.specularMapUv),y.push(A.specularColorMapUv),y.push(A.specularIntensityMapUv),y.push(A.transmissionMapUv),y.push(A.thicknessMapUv),y.push(A.combine),y.push(A.fogExp2),y.push(A.sizeAttenuation),y.push(A.morphTargetsCount),y.push(A.morphAttributeCount),y.push(A.numDirLights),y.push(A.numPointLights),y.push(A.numSpotLights),y.push(A.numSpotLightMaps),y.push(A.numHemiLights),y.push(A.numRectAreaLights),y.push(A.numDirLightShadows),y.push(A.numPointLightShadows),y.push(A.numSpotLightShadows),y.push(A.numSpotLightShadowsWithMaps),y.push(A.numLightProbes),y.push(A.shadowMapType),y.push(A.toneMapping),y.push(A.numClippingPlanes),y.push(A.numClipIntersection),y.push(A.depthPacking)}function S(y,A){o.disableAll(),A.instancing&&o.enable(0),A.instancingColor&&o.enable(1),A.instancingMorph&&o.enable(2),A.matcap&&o.enable(3),A.envMap&&o.enable(4),A.normalMapObjectSpace&&o.enable(5),A.normalMapTangentSpace&&o.enable(6),A.clearcoat&&o.enable(7),A.iridescence&&o.enable(8),A.alphaTest&&o.enable(9),A.vertexColors&&o.enable(10),A.vertexAlphas&&o.enable(11),A.vertexUv1s&&o.enable(12),A.vertexUv2s&&o.enable(13),A.vertexUv3s&&o.enable(14),A.vertexTangents&&o.enable(15),A.anisotropy&&o.enable(16),A.alphaHash&&o.enable(17),A.batching&&o.enable(18),A.dispersion&&o.enable(19),A.batchingColor&&o.enable(20),A.gradientMap&&o.enable(21),A.packedNormalMap&&o.enable(22),A.vertexNormals&&o.enable(23),y.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.reversedDepthBuffer&&o.enable(4),A.skinning&&o.enable(5),A.morphTargets&&o.enable(6),A.morphNormals&&o.enable(7),A.morphColors&&o.enable(8),A.premultipliedAlpha&&o.enable(9),A.shadowMapEnabled&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.decodeVideoTextureEmissive&&o.enable(20),A.alphaToCoverage&&o.enable(21),A.numLightProbeGrids>0&&o.enable(22),y.push(o.mask)}function w(y){let A=h[y.type],k;if(A){let D=nr[A];k=bM.clone(D.uniforms)}else k=y.uniforms;return k}function E(y,A){let k=u.get(A);return k!==void 0?++k.usedTimes:(k=new pF(n,A,y,r),c.push(k),u.set(A,k)),k}function R(y){if(--y.usedTimes===0){let A=c.indexOf(y);c[A]=c[c.length-1],c.pop(),u.delete(y.cacheKey),y.destroy()}}function C(y){a.remove(y)}function I(){a.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:w,acquireProgram:E,releaseProgram:R,releaseShaderCache:C,programs:c,dispose:I}}function yF(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function xF(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function VM(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function HM(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(f){let h=0;return f.isInstancedMesh&&(h+=2),f.isSkinnedMesh&&(h+=1),h}function a(f,h,g,x,m,p){let S=n[e];return S===void 0?(S={id:f.id,object:f,geometry:h,material:g,materialVariant:o(f),groupOrder:x,renderOrder:f.renderOrder,z:m,group:p},n[e]=S):(S.id=f.id,S.object=f,S.geometry=h,S.material=g,S.materialVariant=o(f),S.groupOrder=x,S.renderOrder=f.renderOrder,S.z=m,S.group=p),e++,S}function l(f,h,g,x,m,p){let S=a(f,h,g,x,m,p);g.transmission>0?i.push(S):g.transparent===!0?r.push(S):t.push(S)}function c(f,h,g,x,m,p){let S=a(f,h,g,x,m,p);g.transmission>0?i.unshift(S):g.transparent===!0?r.unshift(S):t.unshift(S)}function u(f,h){t.length>1&&t.sort(f||xF),i.length>1&&i.sort(h||VM),r.length>1&&r.sort(h||VM)}function d(){for(let f=e,h=n.length;f<h;f++){let g=n[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:d,sort:u}}function _F(){let n=new WeakMap;function e(i,r){let s=n.get(i),o;return s===void 0?(o=new HM,n.set(i,[o])):r>=s.length?(o=new HM,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function bF(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new ht};break;case"SpotLight":t={position:new B,direction:new B,color:new ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new ht,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new ht,groundColor:new ht};break;case"RectAreaLight":t={color:new ht,position:new B,halfWidth:new B,halfHeight:new B};break}return n[e.id]=t,t}}}function SF(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var MF=0;function wF(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function EF(n){let e=new bF,t=SF(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new B);let r=new B,s=new $t,o=new $t;function a(c){let u=0,d=0,f=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let h=0,g=0,x=0,m=0,p=0,S=0,w=0,E=0,R=0,C=0,I=0;c.sort(wF);for(let A=0,k=c.length;A<k;A++){let D=c[A],U=D.color,$=D.intensity,Z=D.distance,O=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===ms?O=D.shadow.map.texture:O=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=U.r*$,d+=U.g*$,f+=U.b*$;else if(D.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(D.sh.coefficients[z],$);I++}else if(D.isDirectionalLight){let z=e.get(D);if(z.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let H=D.shadow,te=t.get(D);te.shadowIntensity=H.intensity,te.shadowBias=H.bias,te.shadowNormalBias=H.normalBias,te.shadowRadius=H.radius,te.shadowMapSize=H.mapSize,i.directionalShadow[h]=te,i.directionalShadowMap[h]=O,i.directionalShadowMatrix[h]=D.shadow.matrix,S++}i.directional[h]=z,h++}else if(D.isSpotLight){let z=e.get(D);z.position.setFromMatrixPosition(D.matrixWorld),z.color.copy(U).multiplyScalar($),z.distance=Z,z.coneCos=Math.cos(D.angle),z.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),z.decay=D.decay,i.spot[x]=z;let H=D.shadow;if(D.map&&(i.spotLightMap[R]=D.map,R++,H.updateMatrices(D),D.castShadow&&C++),i.spotLightMatrix[x]=H.matrix,D.castShadow){let te=t.get(D);te.shadowIntensity=H.intensity,te.shadowBias=H.bias,te.shadowNormalBias=H.normalBias,te.shadowRadius=H.radius,te.shadowMapSize=H.mapSize,i.spotShadow[x]=te,i.spotShadowMap[x]=O,E++}x++}else if(D.isRectAreaLight){let z=e.get(D);z.color.copy(U).multiplyScalar($),z.halfWidth.set(D.width*.5,0,0),z.halfHeight.set(0,D.height*.5,0),i.rectArea[m]=z,m++}else if(D.isPointLight){let z=e.get(D);if(z.color.copy(D.color).multiplyScalar(D.intensity),z.distance=D.distance,z.decay=D.decay,D.castShadow){let H=D.shadow,te=t.get(D);te.shadowIntensity=H.intensity,te.shadowBias=H.bias,te.shadowNormalBias=H.normalBias,te.shadowRadius=H.radius,te.shadowMapSize=H.mapSize,te.shadowCameraNear=H.camera.near,te.shadowCameraFar=H.camera.far,i.pointShadow[g]=te,i.pointShadowMap[g]=O,i.pointShadowMatrix[g]=D.shadow.matrix,w++}i.point[g]=z,g++}else if(D.isHemisphereLight){let z=e.get(D);z.skyColor.copy(D.color).multiplyScalar($),z.groundColor.copy(D.groundColor).multiplyScalar($),i.hemi[p]=z,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=me.LTC_FLOAT_1,i.rectAreaLTC2=me.LTC_FLOAT_2):(i.rectAreaLTC1=me.LTC_HALF_1,i.rectAreaLTC2=me.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;let y=i.hash;(y.directionalLength!==h||y.pointLength!==g||y.spotLength!==x||y.rectAreaLength!==m||y.hemiLength!==p||y.numDirectionalShadows!==S||y.numPointShadows!==w||y.numSpotShadows!==E||y.numSpotMaps!==R||y.numLightProbes!==I)&&(i.directional.length=h,i.spot.length=x,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=E+R-C,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=I,y.directionalLength=h,y.pointLength=g,y.spotLength=x,y.rectAreaLength=m,y.hemiLength=p,y.numDirectionalShadows=S,y.numPointShadows=w,y.numSpotShadows=E,y.numSpotMaps=R,y.numLightProbes=I,i.version=MF++)}function l(c,u){let d=0,f=0,h=0,g=0,x=0,m=u.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){let w=c[p];if(w.isDirectionalLight){let E=i.directional[d];E.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),d++}else if(w.isSpotLight){let E=i.spot[h];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),h++}else if(w.isRectAreaLight){let E=i.rectArea[g];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(m),o.identity(),s.copy(w.matrixWorld),s.premultiply(m),o.extractRotation(s),E.halfWidth.set(w.width*.5,0,0),E.halfHeight.set(0,w.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),g++}else if(w.isPointLight){let E=i.point[f];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(m),f++}else if(w.isHemisphereLight){let E=i.hemi[x];E.direction.setFromMatrixPosition(w.matrixWorld),E.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:i}}function zM(n){let e=new EF(n),t=[],i=[],r=[];function s(f){d.camera=f,t.length=0,i.length=0,r.length=0}function o(f){t.push(f)}function a(f){i.push(f)}function l(f){r.push(f)}function c(){e.setup(t)}function u(f){e.setupView(t,f)}let d={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function CF(n){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new zM(n),e.set(r,[a])):s>=o.length?(a=new zM(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var TF=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,AF=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,IF=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],DF=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],GM=new $t,Jl=new B,B0=new B;function RF(n,e,t){let i=new Pl,r=new Ct,s=new Ct,o=new qt,a=new Wd,l=new jd,c={},u=t.maxTextureSize,d={[_r]:Ln,[Ln]:_r,[gi]:gi},f=new On({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ct},radius:{value:4}},vertexShader:TF,fragmentShader:AF}),h=f.clone();h.defines.HORIZONTAL_PASS=1;let g=new Tn;g.setAttribute("position",new pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Nn(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Hl;let p=this.type;this.render=function(C,I,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;this.type===VS&&(Ne("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Hl);let A=n.getRenderTarget(),k=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),U=n.state;U.setBlending(Qi),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let $=p!==this.type;$&&I.traverse(function(Z){Z.material&&(Array.isArray(Z.material)?Z.material.forEach(O=>O.needsUpdate=!0):Z.material.needsUpdate=!0)});for(let Z=0,O=C.length;Z<O;Z++){let z=C[Z],H=z.shadow;if(H===void 0){Ne("WebGLShadowMap:",z,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);let te=H.getFrameExtents();r.multiply(te),s.copy(H.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/te.x),r.x=s.x*te.x,H.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/te.y),r.y=s.y*te.y,H.mapSize.y=s.y));let re=n.state.buffers.depth.getReversed();if(H.camera._reversedDepth=re,H.map===null||$===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===la){if(z.isPointLight){Ne("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new ni(r.x,r.y,{format:ms,type:er,minFilter:gn,magFilter:gn,generateMipmaps:!1}),H.map.texture.name=z.name+".shadowMap",H.map.depthTexture=new Sr(r.x,r.y,Ni),H.map.depthTexture.name=z.name+".shadowMapDepth",H.map.depthTexture.format=Zi,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=un,H.map.depthTexture.magFilter=un}else z.isPointLight?(H.map=new Yf(r.x),H.map.depthTexture=new zd(r.x,Pi)):(H.map=new ni(r.x,r.y),H.map.depthTexture=new Sr(r.x,r.y,Pi)),H.map.depthTexture.name=z.name+".shadowMap",H.map.depthTexture.format=Zi,this.type===Hl?(H.map.depthTexture.compareFunction=re?Wf:Gf,H.map.depthTexture.minFilter=gn,H.map.depthTexture.magFilter=gn):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=un,H.map.depthTexture.magFilter=un);H.camera.updateProjectionMatrix()}let de=H.map.isWebGLCubeRenderTarget?6:1;for(let be=0;be<de;be++){if(H.map.isWebGLCubeRenderTarget)n.setRenderTarget(H.map,be),n.clear();else{be===0&&(n.setRenderTarget(H.map),n.clear());let Ce=H.getViewport(be);o.set(s.x*Ce.x,s.y*Ce.y,s.x*Ce.z,s.y*Ce.w),U.viewport(o)}if(z.isPointLight){let Ce=H.camera,at=H.matrix,et=z.distance||Ce.far;et!==Ce.far&&(Ce.far=et,Ce.updateProjectionMatrix()),Jl.setFromMatrixPosition(z.matrixWorld),Ce.position.copy(Jl),B0.copy(Ce.position),B0.add(IF[be]),Ce.up.copy(DF[be]),Ce.lookAt(B0),Ce.updateMatrixWorld(),at.makeTranslation(-Jl.x,-Jl.y,-Jl.z),GM.multiplyMatrices(Ce.projectionMatrix,Ce.matrixWorldInverse),H._frustum.setFromProjectionMatrix(GM,Ce.coordinateSystem,Ce.reversedDepth)}else H.updateMatrices(z);i=H.getFrustum(),E(I,y,H.camera,z,this.type)}H.isPointLightShadow!==!0&&this.type===la&&S(H,y),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(A,k,D)};function S(C,I){let y=e.update(x);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,h.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new ni(r.x,r.y,{format:ms,type:er})),f.uniforms.shadow_pass.value=C.map.depthTexture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(I,null,y,f,x,null),h.uniforms.shadow_pass.value=C.mapPass.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(I,null,y,h,x,null)}function w(C,I,y,A){let k=null,D=y.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(D!==void 0)k=D;else if(k=y.isPointLight===!0?l:a,n.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let U=k.uuid,$=I.uuid,Z=c[U];Z===void 0&&(Z={},c[U]=Z);let O=Z[$];O===void 0&&(O=k.clone(),Z[$]=O,I.addEventListener("dispose",R)),k=O}if(k.visible=I.visible,k.wireframe=I.wireframe,A===la?k.side=I.shadowSide!==null?I.shadowSide:I.side:k.side=I.shadowSide!==null?I.shadowSide:d[I.side],k.alphaMap=I.alphaMap,k.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,k.map=I.map,k.clipShadows=I.clipShadows,k.clippingPlanes=I.clippingPlanes,k.clipIntersection=I.clipIntersection,k.displacementMap=I.displacementMap,k.displacementScale=I.displacementScale,k.displacementBias=I.displacementBias,k.wireframeLinewidth=I.wireframeLinewidth,k.linewidth=I.linewidth,y.isPointLight===!0&&k.isMeshDistanceMaterial===!0){let U=n.properties.get(k);U.light=y}return k}function E(C,I,y,A,k){if(C.visible===!1)return;if(C.layers.test(I.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&k===la)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,C.matrixWorld);let $=e.update(C),Z=C.material;if(Array.isArray(Z)){let O=$.groups;for(let z=0,H=O.length;z<H;z++){let te=O[z],re=Z[te.materialIndex];if(re&&re.visible){let de=w(C,re,A,k);C.onBeforeShadow(n,C,I,y,$,de,te),n.renderBufferDirect(y,null,$,de,C,te),C.onAfterShadow(n,C,I,y,$,de,te)}}}else if(Z.visible){let O=w(C,Z,A,k);C.onBeforeShadow(n,C,I,y,$,O,null),n.renderBufferDirect(y,null,$,O,C,null),C.onAfterShadow(n,C,I,y,$,O,null)}}let U=C.children;for(let $=0,Z=U.length;$<Z;$++)E(U[$],I,y,A,k)}function R(C){C.target.removeEventListener("dispose",R);for(let y in c){let A=c[y],k=C.target.uuid;k in A&&(A[k].dispose(),delete A[k])}}}function PF(n,e){function t(){let N=!1,le=new qt,J=null,_e=new qt(0,0,0,0);return{setMask:function(ue){J!==ue&&!N&&(n.colorMask(ue,ue,ue,ue),J=ue)},setLocked:function(ue){N=ue},setClear:function(ue,ne,Ie,$e,Xt){Xt===!0&&(ue*=$e,ne*=$e,Ie*=$e),le.set(ue,ne,Ie,$e),_e.equals(le)===!1&&(n.clearColor(ue,ne,Ie,$e),_e.copy(le))},reset:function(){N=!1,J=null,_e.set(-1,0,0,0)}}}function i(){let N=!1,le=!1,J=null,_e=null,ue=null;return{setReversed:function(ne){if(le!==ne){let Ie=e.get("EXT_clip_control");ne?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT),le=ne;let $e=ue;ue=null,this.setClear($e)}},getReversed:function(){return le},setTest:function(ne){ne?se(n.DEPTH_TEST):Oe(n.DEPTH_TEST)},setMask:function(ne){J!==ne&&!N&&(n.depthMask(ne),J=ne)},setFunc:function(ne){if(le&&(ne=xM[ne]),_e!==ne){switch(ne){case wd:n.depthFunc(n.NEVER);break;case Ed:n.depthFunc(n.ALWAYS);break;case Cd:n.depthFunc(n.LESS);break;case Gs:n.depthFunc(n.LEQUAL);break;case Td:n.depthFunc(n.EQUAL);break;case Ad:n.depthFunc(n.GEQUAL);break;case Id:n.depthFunc(n.GREATER);break;case Dd:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}_e=ne}},setLocked:function(ne){N=ne},setClear:function(ne){ue!==ne&&(ue=ne,le&&(ne=1-ne),n.clearDepth(ne))},reset:function(){N=!1,J=null,_e=null,ue=null,le=!1}}}function r(){let N=!1,le=null,J=null,_e=null,ue=null,ne=null,Ie=null,$e=null,Xt=null;return{setTest:function(Tt){N||(Tt?se(n.STENCIL_TEST):Oe(n.STENCIL_TEST))},setMask:function(Tt){le!==Tt&&!N&&(n.stencilMask(Tt),le=Tt)},setFunc:function(Tt,ir,Oi){(J!==Tt||_e!==ir||ue!==Oi)&&(n.stencilFunc(Tt,ir,Oi),J=Tt,_e=ir,ue=Oi)},setOp:function(Tt,ir,Oi){(ne!==Tt||Ie!==ir||$e!==Oi)&&(n.stencilOp(Tt,ir,Oi),ne=Tt,Ie=ir,$e=Oi)},setLocked:function(Tt){N=Tt},setClear:function(Tt){Xt!==Tt&&(n.clearStencil(Tt),Xt=Tt)},reset:function(){N=!1,le=null,J=null,_e=null,ue=null,ne=null,Ie=null,$e=null,Xt=null}}}let s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap,u={},d={},f={},h=new WeakMap,g=[],x=null,m=!1,p=null,S=null,w=null,E=null,R=null,C=null,I=null,y=new ht(0,0,0),A=0,k=!1,D=null,U=null,$=null,Z=null,O=null,z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,te=0,re=n.getParameter(n.VERSION);re.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(re)[1]),H=te>=1):re.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),H=te>=2);let de=null,be={},Ce=n.getParameter(n.SCISSOR_BOX),at=n.getParameter(n.VIEWPORT),et=new qt().fromArray(Ce),Me=new qt().fromArray(at);function Q(N,le,J,_e){let ue=new Uint8Array(4),ne=n.createTexture();n.bindTexture(N,ne),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ie=0;Ie<J;Ie++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(le,0,n.RGBA,1,1,_e,0,n.RGBA,n.UNSIGNED_BYTE,ue):n.texImage2D(le+Ie,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ue);return ne}let he={};he[n.TEXTURE_2D]=Q(n.TEXTURE_2D,n.TEXTURE_2D,1),he[n.TEXTURE_CUBE_MAP]=Q(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),he[n.TEXTURE_2D_ARRAY]=Q(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),he[n.TEXTURE_3D]=Q(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),se(n.DEPTH_TEST),o.setFunc(Gs),Qt(!1),Bt(l0),se(n.CULL_FACE),Et(Qi);function se(N){u[N]!==!0&&(n.enable(N),u[N]=!0)}function Oe(N){u[N]!==!1&&(n.disable(N),u[N]=!1)}function ze(N,le){return f[N]!==le?(n.bindFramebuffer(N,le),f[N]=le,N===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=le),N===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=le),!0):!1}function Le(N,le){let J=g,_e=!1;if(N){J=h.get(le),J===void 0&&(J=[],h.set(le,J));let ue=N.textures;if(J.length!==ue.length||J[0]!==n.COLOR_ATTACHMENT0){for(let ne=0,Ie=ue.length;ne<Ie;ne++)J[ne]=n.COLOR_ATTACHMENT0+ne;J.length=ue.length,_e=!0}}else J[0]!==n.BACK&&(J[0]=n.BACK,_e=!0);_e&&n.drawBuffers(J)}function St(N){return x!==N?(n.useProgram(N),x=N,!0):!1}let tt={[ss]:n.FUNC_ADD,[zS]:n.FUNC_SUBTRACT,[GS]:n.FUNC_REVERSE_SUBTRACT};tt[WS]=n.MIN,tt[jS]=n.MAX;let xt={[$S]:n.ZERO,[qS]:n.ONE,[XS]:n.SRC_COLOR,[Sd]:n.SRC_ALPHA,[eM]:n.SRC_ALPHA_SATURATE,[KS]:n.DST_COLOR,[ZS]:n.DST_ALPHA,[YS]:n.ONE_MINUS_SRC_COLOR,[Md]:n.ONE_MINUS_SRC_ALPHA,[QS]:n.ONE_MINUS_DST_COLOR,[JS]:n.ONE_MINUS_DST_ALPHA,[tM]:n.CONSTANT_COLOR,[nM]:n.ONE_MINUS_CONSTANT_COLOR,[iM]:n.CONSTANT_ALPHA,[rM]:n.ONE_MINUS_CONSTANT_ALPHA};function Et(N,le,J,_e,ue,ne,Ie,$e,Xt,Tt){if(N===Qi){m===!0&&(Oe(n.BLEND),m=!1);return}if(m===!1&&(se(n.BLEND),m=!0),N!==HS){if(N!==p||Tt!==k){if((S!==ss||R!==ss)&&(n.blendEquation(n.FUNC_ADD),S=ss,R=ss),Tt)switch(N){case zs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ds:n.blendFunc(n.ONE,n.ONE);break;case c0:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case u0:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ue("WebGLState: Invalid blending: ",N);break}else switch(N){case zs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ds:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case c0:Ue("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case u0:Ue("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ue("WebGLState: Invalid blending: ",N);break}w=null,E=null,C=null,I=null,y.set(0,0,0),A=0,p=N,k=Tt}return}ue=ue||le,ne=ne||J,Ie=Ie||_e,(le!==S||ue!==R)&&(n.blendEquationSeparate(tt[le],tt[ue]),S=le,R=ue),(J!==w||_e!==E||ne!==C||Ie!==I)&&(n.blendFuncSeparate(xt[J],xt[_e],xt[ne],xt[Ie]),w=J,E=_e,C=ne,I=Ie),($e.equals(y)===!1||Xt!==A)&&(n.blendColor($e.r,$e.g,$e.b,Xt),y.copy($e),A=Xt),p=N,k=!1}function lt(N,le){N.side===gi?Oe(n.CULL_FACE):se(n.CULL_FACE);let J=N.side===Ln;le&&(J=!J),Qt(J),N.blending===zs&&N.transparent===!1?Et(Qi):Et(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);let _e=N.stencilWrite;a.setTest(_e),_e&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),L(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?se(n.SAMPLE_ALPHA_TO_COVERAGE):Oe(n.SAMPLE_ALPHA_TO_COVERAGE)}function Qt(N){D!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),D=N)}function Bt(N){N!==US?(se(n.CULL_FACE),N!==U&&(N===l0?n.cullFace(n.BACK):N===BS?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Oe(n.CULL_FACE),U=N}function zn(N){N!==$&&(H&&n.lineWidth(N),$=N)}function L(N,le,J){N?(se(n.POLYGON_OFFSET_FILL),(Z!==le||O!==J)&&(Z=le,O=J,o.getReversed()&&(le=-le),n.polygonOffset(le,J))):Oe(n.POLYGON_OFFSET_FILL)}function en(N){N?se(n.SCISSOR_TEST):Oe(n.SCISSOR_TEST)}function ct(N){N===void 0&&(N=n.TEXTURE0+z-1),de!==N&&(n.activeTexture(N),de=N)}function Nt(N,le,J){J===void 0&&(de===null?J=n.TEXTURE0+z-1:J=de);let _e=be[J];_e===void 0&&(_e={type:void 0,texture:void 0},be[J]=_e),(_e.type!==N||_e.texture!==le)&&(de!==J&&(n.activeTexture(J),de=J),n.bindTexture(N,le||he[N]),_e.type=N,_e.texture=le)}function pe(){let N=be[de];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function Vt(){try{n.compressedTexImage2D(...arguments)}catch(N){Ue("WebGLState:",N)}}function b(){try{n.compressedTexImage3D(...arguments)}catch(N){Ue("WebGLState:",N)}}function v(){try{n.texSubImage2D(...arguments)}catch(N){Ue("WebGLState:",N)}}function V(){try{n.texSubImage3D(...arguments)}catch(N){Ue("WebGLState:",N)}}function K(){try{n.compressedTexSubImage2D(...arguments)}catch(N){Ue("WebGLState:",N)}}function ie(){try{n.compressedTexSubImage3D(...arguments)}catch(N){Ue("WebGLState:",N)}}function oe(){try{n.texStorage2D(...arguments)}catch(N){Ue("WebGLState:",N)}}function fe(){try{n.texStorage3D(...arguments)}catch(N){Ue("WebGLState:",N)}}function Y(){try{n.texImage2D(...arguments)}catch(N){Ue("WebGLState:",N)}}function ee(){try{n.texImage3D(...arguments)}catch(N){Ue("WebGLState:",N)}}function xe(N){return d[N]!==void 0?d[N]:n.getParameter(N)}function we(N,le){d[N]!==le&&(n.pixelStorei(N,le),d[N]=le)}function ce(N){et.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),et.copy(N))}function ae(N){Me.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),Me.copy(N))}function Ge(N,le){let J=c.get(le);J===void 0&&(J=new WeakMap,c.set(le,J));let _e=J.get(N);_e===void 0&&(_e=n.getUniformBlockIndex(le,N.name),J.set(N,_e))}function Ke(N,le){let _e=c.get(le).get(N);l.get(le)!==_e&&(n.uniformBlockBinding(le,_e,N.__bindingPointIndex),l.set(le,_e))}function _t(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},d={},de=null,be={},f={},h=new WeakMap,g=[],x=null,m=!1,p=null,S=null,w=null,E=null,R=null,C=null,I=null,y=new ht(0,0,0),A=0,k=!1,D=null,U=null,$=null,Z=null,O=null,et.set(0,0,n.canvas.width,n.canvas.height),Me.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:se,disable:Oe,bindFramebuffer:ze,drawBuffers:Le,useProgram:St,setBlending:Et,setMaterial:lt,setFlipSided:Qt,setCullFace:Bt,setLineWidth:zn,setPolygonOffset:L,setScissorTest:en,activeTexture:ct,bindTexture:Nt,unbindTexture:pe,compressedTexImage2D:Vt,compressedTexImage3D:b,texImage2D:Y,texImage3D:ee,pixelStorei:we,getParameter:xe,updateUBOMapping:Ge,uniformBlockBinding:Ke,texStorage2D:oe,texStorage3D:fe,texSubImage2D:v,texSubImage3D:V,compressedTexSubImage2D:K,compressedTexSubImage3D:ie,scissor:ce,viewport:ae,reset:_t}}function NF(n,e,t,i,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ct,u=new WeakMap,d=new Set,f,h=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(b,v){return g?new OffscreenCanvas(b,v):El("canvas")}function m(b,v,V){let K=1,ie=Vt(b);if((ie.width>V||ie.height>V)&&(K=V/Math.max(ie.width,ie.height)),K<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){let oe=Math.floor(K*ie.width),fe=Math.floor(K*ie.height);f===void 0&&(f=x(oe,fe));let Y=v?x(oe,fe):f;return Y.width=oe,Y.height=fe,Y.getContext("2d").drawImage(b,0,0,oe,fe),Ne("WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+oe+"x"+fe+")."),Y}else return"data"in b&&Ne("WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),b;return b}function p(b){return b.generateMipmaps}function S(b){n.generateMipmap(b)}function w(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(b,v,V,K,ie,oe=!1){if(b!==null){if(n[b]!==void 0)return n[b];Ne("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let fe;K&&(fe=e.get("EXT_texture_norm16"),fe||Ne("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=v;if(v===n.RED&&(V===n.FLOAT&&(Y=n.R32F),V===n.HALF_FLOAT&&(Y=n.R16F),V===n.UNSIGNED_BYTE&&(Y=n.R8),V===n.UNSIGNED_SHORT&&fe&&(Y=fe.R16_EXT),V===n.SHORT&&fe&&(Y=fe.R16_SNORM_EXT)),v===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(Y=n.R8UI),V===n.UNSIGNED_SHORT&&(Y=n.R16UI),V===n.UNSIGNED_INT&&(Y=n.R32UI),V===n.BYTE&&(Y=n.R8I),V===n.SHORT&&(Y=n.R16I),V===n.INT&&(Y=n.R32I)),v===n.RG&&(V===n.FLOAT&&(Y=n.RG32F),V===n.HALF_FLOAT&&(Y=n.RG16F),V===n.UNSIGNED_BYTE&&(Y=n.RG8),V===n.UNSIGNED_SHORT&&fe&&(Y=fe.RG16_EXT),V===n.SHORT&&fe&&(Y=fe.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(Y=n.RG8UI),V===n.UNSIGNED_SHORT&&(Y=n.RG16UI),V===n.UNSIGNED_INT&&(Y=n.RG32UI),V===n.BYTE&&(Y=n.RG8I),V===n.SHORT&&(Y=n.RG16I),V===n.INT&&(Y=n.RG32I)),v===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&(Y=n.RGB8UI),V===n.UNSIGNED_SHORT&&(Y=n.RGB16UI),V===n.UNSIGNED_INT&&(Y=n.RGB32UI),V===n.BYTE&&(Y=n.RGB8I),V===n.SHORT&&(Y=n.RGB16I),V===n.INT&&(Y=n.RGB32I)),v===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&(Y=n.RGBA8UI),V===n.UNSIGNED_SHORT&&(Y=n.RGBA16UI),V===n.UNSIGNED_INT&&(Y=n.RGBA32UI),V===n.BYTE&&(Y=n.RGBA8I),V===n.SHORT&&(Y=n.RGBA16I),V===n.INT&&(Y=n.RGBA32I)),v===n.RGB&&(V===n.UNSIGNED_SHORT&&fe&&(Y=fe.RGB16_EXT),V===n.SHORT&&fe&&(Y=fe.RGB16_SNORM_EXT),V===n.UNSIGNED_INT_5_9_9_9_REV&&(Y=n.RGB9_E5),V===n.UNSIGNED_INT_10F_11F_11F_REV&&(Y=n.R11F_G11F_B10F)),v===n.RGBA){let ee=oe?Ml:ut.getTransfer(ie);V===n.FLOAT&&(Y=n.RGBA32F),V===n.HALF_FLOAT&&(Y=n.RGBA16F),V===n.UNSIGNED_BYTE&&(Y=ee===wt?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT&&fe&&(Y=fe.RGBA16_EXT),V===n.SHORT&&fe&&(Y=fe.RGBA16_SNORM_EXT),V===n.UNSIGNED_SHORT_4_4_4_4&&(Y=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(Y=n.RGB5_A1)}return(Y===n.R16F||Y===n.R32F||Y===n.RG16F||Y===n.RG32F||Y===n.RGBA16F||Y===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function R(b,v){let V;return b?v===null||v===Pi||v===ua?V=n.DEPTH24_STENCIL8:v===Ni?V=n.DEPTH32F_STENCIL8:v===ca&&(V=n.DEPTH24_STENCIL8,Ne("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Pi||v===ua?V=n.DEPTH_COMPONENT24:v===Ni?V=n.DEPTH_COMPONENT32F:v===ca&&(V=n.DEPTH_COMPONENT16),V}function C(b,v){return p(b)===!0||b.isFramebufferTexture&&b.minFilter!==un&&b.minFilter!==gn?Math.log2(Math.max(v.width,v.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?v.mipmaps.length:1}function I(b){let v=b.target;v.removeEventListener("dispose",I),A(v),v.isVideoTexture&&u.delete(v),v.isHTMLTexture&&d.delete(v)}function y(b){let v=b.target;v.removeEventListener("dispose",y),D(v)}function A(b){let v=i.get(b);if(v.__webglInit===void 0)return;let V=b.source,K=h.get(V);if(K){let ie=K[v.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&k(b),Object.keys(K).length===0&&h.delete(V)}i.remove(b)}function k(b){let v=i.get(b);n.deleteTexture(v.__webglTexture);let V=b.source,K=h.get(V);delete K[v.__cacheKey],o.memory.textures--}function D(b){let v=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(v.__webglFramebuffer[K]))for(let ie=0;ie<v.__webglFramebuffer[K].length;ie++)n.deleteFramebuffer(v.__webglFramebuffer[K][ie]);else n.deleteFramebuffer(v.__webglFramebuffer[K]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[K])}else{if(Array.isArray(v.__webglFramebuffer))for(let K=0;K<v.__webglFramebuffer.length;K++)n.deleteFramebuffer(v.__webglFramebuffer[K]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let K=0;K<v.__webglColorRenderbuffer.length;K++)v.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[K]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let V=b.textures;for(let K=0,ie=V.length;K<ie;K++){let oe=i.get(V[K]);oe.__webglTexture&&(n.deleteTexture(oe.__webglTexture),o.memory.textures--),i.remove(V[K])}i.remove(b)}let U=0;function $(){U=0}function Z(){return U}function O(b){U=b}function z(){let b=U;return b>=r.maxTextures&&Ne("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),U+=1,b}function H(b){let v=[];return v.push(b.wrapS),v.push(b.wrapT),v.push(b.wrapR||0),v.push(b.magFilter),v.push(b.minFilter),v.push(b.anisotropy),v.push(b.internalFormat),v.push(b.format),v.push(b.type),v.push(b.generateMipmaps),v.push(b.premultiplyAlpha),v.push(b.flipY),v.push(b.unpackAlignment),v.push(b.colorSpace),v.join()}function te(b,v){let V=i.get(b);if(b.isVideoTexture&&Nt(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&V.__version!==b.version){let K=b.image;if(K===null)Ne("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)Ne("WebGLRenderer: Texture marked for update but image is incomplete");else{Oe(V,b,v);return}}else b.isExternalTexture&&(V.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+v)}function re(b,v){let V=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&V.__version!==b.version){Oe(V,b,v);return}else b.isExternalTexture&&(V.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+v)}function de(b,v){let V=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&V.__version!==b.version){Oe(V,b,v);return}t.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+v)}function be(b,v){let V=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&V.__version!==b.version){ze(V,b,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+v)}let Ce={[Rd]:n.REPEAT,[Yi]:n.CLAMP_TO_EDGE,[Pd]:n.MIRRORED_REPEAT},at={[un]:n.NEAREST,[aM]:n.NEAREST_MIPMAP_NEAREST,[Gl]:n.NEAREST_MIPMAP_LINEAR,[gn]:n.LINEAR,[of]:n.LINEAR_MIPMAP_NEAREST,[hs]:n.LINEAR_MIPMAP_LINEAR},et={[uM]:n.NEVER,[mM]:n.ALWAYS,[dM]:n.LESS,[Gf]:n.LEQUAL,[fM]:n.EQUAL,[Wf]:n.GEQUAL,[hM]:n.GREATER,[pM]:n.NOTEQUAL};function Me(b,v){if(v.type===Ni&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===gn||v.magFilter===of||v.magFilter===Gl||v.magFilter===hs||v.minFilter===gn||v.minFilter===of||v.minFilter===Gl||v.minFilter===hs)&&Ne("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,Ce[v.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,Ce[v.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,Ce[v.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,at[v.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,at[v.minFilter]),v.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,et[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===un||v.minFilter!==Gl&&v.minFilter!==hs||v.type===Ni&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){let V=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function Q(b,v){let V=!1;b.__webglInit===void 0&&(b.__webglInit=!0,v.addEventListener("dispose",I));let K=v.source,ie=h.get(K);ie===void 0&&(ie={},h.set(K,ie));let oe=H(v);if(oe!==b.__cacheKey){ie[oe]===void 0&&(ie[oe]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,V=!0),ie[oe].usedTimes++;let fe=ie[b.__cacheKey];fe!==void 0&&(ie[b.__cacheKey].usedTimes--,fe.usedTimes===0&&k(v)),b.__cacheKey=oe,b.__webglTexture=ie[oe].texture}return V}function he(b,v,V){return Math.floor(Math.floor(b/V)/v)}function se(b,v,V,K){let oe=b.updateRanges;if(oe.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,V,K,v.data);else{oe.sort((we,ce)=>we.start-ce.start);let fe=0;for(let we=1;we<oe.length;we++){let ce=oe[fe],ae=oe[we],Ge=ce.start+ce.count,Ke=he(ae.start,v.width,4),_t=he(ce.start,v.width,4);ae.start<=Ge+1&&Ke===_t&&he(ae.start+ae.count-1,v.width,4)===Ke?ce.count=Math.max(ce.count,ae.start+ae.count-ce.start):(++fe,oe[fe]=ae)}oe.length=fe+1;let Y=t.getParameter(n.UNPACK_ROW_LENGTH),ee=t.getParameter(n.UNPACK_SKIP_PIXELS),xe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let we=0,ce=oe.length;we<ce;we++){let ae=oe[we],Ge=Math.floor(ae.start/4),Ke=Math.ceil(ae.count/4),_t=Ge%v.width,N=Math.floor(Ge/v.width),le=Ke,J=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,_t),t.pixelStorei(n.UNPACK_SKIP_ROWS,N),t.texSubImage2D(n.TEXTURE_2D,0,_t,N,le,J,V,K,v.data)}b.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,Y),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ee),t.pixelStorei(n.UNPACK_SKIP_ROWS,xe)}}function Oe(b,v,V){let K=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(K=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(K=n.TEXTURE_3D);let ie=Q(b,v),oe=v.source;t.bindTexture(K,b.__webglTexture,n.TEXTURE0+V);let fe=i.get(oe);if(oe.version!==fe.__version||ie===!0){if(t.activeTexture(n.TEXTURE0+V),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let J=ut.getPrimaries(ut.workingColorSpace),_e=v.colorSpace===Mr?null:ut.getPrimaries(v.colorSpace),ue=v.colorSpace===Mr||J===_e?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let ee=m(v.image,!1,r.maxTextureSize);ee=pe(v,ee);let xe=s.convert(v.format,v.colorSpace),we=s.convert(v.type),ce=E(v.internalFormat,xe,we,v.normalized,v.colorSpace,v.isVideoTexture);Me(K,v);let ae,Ge=v.mipmaps,Ke=v.isVideoTexture!==!0,_t=fe.__version===void 0||ie===!0,N=oe.dataReady,le=C(v,ee);if(v.isDepthTexture)ce=R(v.format===ps,v.type),_t&&(Ke?t.texStorage2D(n.TEXTURE_2D,1,ce,ee.width,ee.height):t.texImage2D(n.TEXTURE_2D,0,ce,ee.width,ee.height,0,xe,we,null));else if(v.isDataTexture)if(Ge.length>0){Ke&&_t&&t.texStorage2D(n.TEXTURE_2D,le,ce,Ge[0].width,Ge[0].height);for(let J=0,_e=Ge.length;J<_e;J++)ae=Ge[J],Ke?N&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,ae.width,ae.height,xe,we,ae.data):t.texImage2D(n.TEXTURE_2D,J,ce,ae.width,ae.height,0,xe,we,ae.data);v.generateMipmaps=!1}else Ke?(_t&&t.texStorage2D(n.TEXTURE_2D,le,ce,ee.width,ee.height),N&&se(v,ee,xe,we)):t.texImage2D(n.TEXTURE_2D,0,ce,ee.width,ee.height,0,xe,we,ee.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ke&&_t&&t.texStorage3D(n.TEXTURE_2D_ARRAY,le,ce,Ge[0].width,Ge[0].height,ee.depth);for(let J=0,_e=Ge.length;J<_e;J++)if(ae=Ge[J],v.format!==vi)if(xe!==null)if(Ke){if(N)if(v.layerUpdates.size>0){let ue=N0(ae.width,ae.height,v.format,v.type);for(let ne of v.layerUpdates){let Ie=ae.data.subarray(ne*ue/ae.data.BYTES_PER_ELEMENT,(ne+1)*ue/ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,ne,ae.width,ae.height,1,xe,Ie)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,ae.width,ae.height,ee.depth,xe,ae.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,J,ce,ae.width,ae.height,ee.depth,0,ae.data,0,0);else Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ke?N&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,ae.width,ae.height,ee.depth,xe,we,ae.data):t.texImage3D(n.TEXTURE_2D_ARRAY,J,ce,ae.width,ae.height,ee.depth,0,xe,we,ae.data)}else{Ke&&_t&&t.texStorage2D(n.TEXTURE_2D,le,ce,Ge[0].width,Ge[0].height);for(let J=0,_e=Ge.length;J<_e;J++)ae=Ge[J],v.format!==vi?xe!==null?Ke?N&&t.compressedTexSubImage2D(n.TEXTURE_2D,J,0,0,ae.width,ae.height,xe,ae.data):t.compressedTexImage2D(n.TEXTURE_2D,J,ce,ae.width,ae.height,0,ae.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ke?N&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,ae.width,ae.height,xe,we,ae.data):t.texImage2D(n.TEXTURE_2D,J,ce,ae.width,ae.height,0,xe,we,ae.data)}else if(v.isDataArrayTexture)if(Ke){if(_t&&t.texStorage3D(n.TEXTURE_2D_ARRAY,le,ce,ee.width,ee.height,ee.depth),N)if(v.layerUpdates.size>0){let J=N0(ee.width,ee.height,v.format,v.type);for(let _e of v.layerUpdates){let ue=ee.data.subarray(_e*J/ee.data.BYTES_PER_ELEMENT,(_e+1)*J/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,_e,ee.width,ee.height,1,xe,we,ue)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,xe,we,ee.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ce,ee.width,ee.height,ee.depth,0,xe,we,ee.data);else if(v.isData3DTexture)Ke?(_t&&t.texStorage3D(n.TEXTURE_3D,le,ce,ee.width,ee.height,ee.depth),N&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,xe,we,ee.data)):t.texImage3D(n.TEXTURE_3D,0,ce,ee.width,ee.height,ee.depth,0,xe,we,ee.data);else if(v.isFramebufferTexture){if(_t)if(Ke)t.texStorage2D(n.TEXTURE_2D,le,ce,ee.width,ee.height);else{let J=ee.width,_e=ee.height;for(let ue=0;ue<le;ue++)t.texImage2D(n.TEXTURE_2D,ue,ce,J,_e,0,xe,we,null),J>>=1,_e>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){let J=n.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),ee.parentNode!==J){J.appendChild(ee),d.add(v),J.onpaint=$e=>{let Xt=$e.changedElements;for(let Tt of d)Xt.includes(Tt.image)&&(Tt.needsUpdate=!0)},J.requestPaint();return}let _e=0,ue=n.RGBA,ne=n.RGBA,Ie=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,_e,ue,ne,Ie,ee),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ge.length>0){if(Ke&&_t){let J=Vt(Ge[0]);t.texStorage2D(n.TEXTURE_2D,le,ce,J.width,J.height)}for(let J=0,_e=Ge.length;J<_e;J++)ae=Ge[J],Ke?N&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,xe,we,ae):t.texImage2D(n.TEXTURE_2D,J,ce,xe,we,ae);v.generateMipmaps=!1}else if(Ke){if(_t){let J=Vt(ee);t.texStorage2D(n.TEXTURE_2D,le,ce,J.width,J.height)}N&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,xe,we,ee)}else t.texImage2D(n.TEXTURE_2D,0,ce,xe,we,ee);p(v)&&S(K),fe.__version=oe.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function ze(b,v,V){if(v.image.length!==6)return;let K=Q(b,v),ie=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+V);let oe=i.get(ie);if(ie.version!==oe.__version||K===!0){t.activeTexture(n.TEXTURE0+V);let fe=ut.getPrimaries(ut.workingColorSpace),Y=v.colorSpace===Mr?null:ut.getPrimaries(v.colorSpace),ee=v.colorSpace===Mr||fe===Y?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);let xe=v.isCompressedTexture||v.image[0].isCompressedTexture,we=v.image[0]&&v.image[0].isDataTexture,ce=[];for(let ne=0;ne<6;ne++)!xe&&!we?ce[ne]=m(v.image[ne],!0,r.maxCubemapSize):ce[ne]=we?v.image[ne].image:v.image[ne],ce[ne]=pe(v,ce[ne]);let ae=ce[0],Ge=s.convert(v.format,v.colorSpace),Ke=s.convert(v.type),_t=E(v.internalFormat,Ge,Ke,v.normalized,v.colorSpace),N=v.isVideoTexture!==!0,le=oe.__version===void 0||K===!0,J=ie.dataReady,_e=C(v,ae);Me(n.TEXTURE_CUBE_MAP,v);let ue;if(xe){N&&le&&t.texStorage2D(n.TEXTURE_CUBE_MAP,_e,_t,ae.width,ae.height);for(let ne=0;ne<6;ne++){ue=ce[ne].mipmaps;for(let Ie=0;Ie<ue.length;Ie++){let $e=ue[Ie];v.format!==vi?Ge!==null?N?J&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie,0,0,$e.width,$e.height,Ge,$e.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie,_t,$e.width,$e.height,0,$e.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie,0,0,$e.width,$e.height,Ge,Ke,$e.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie,_t,$e.width,$e.height,0,Ge,Ke,$e.data)}}}else{if(ue=v.mipmaps,N&&le){ue.length>0&&_e++;let ne=Vt(ce[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,_e,_t,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(we){N?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,ce[ne].width,ce[ne].height,Ge,Ke,ce[ne].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,_t,ce[ne].width,ce[ne].height,0,Ge,Ke,ce[ne].data);for(let Ie=0;Ie<ue.length;Ie++){let Xt=ue[Ie].image[ne].image;N?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie+1,0,0,Xt.width,Xt.height,Ge,Ke,Xt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie+1,_t,Xt.width,Xt.height,0,Ge,Ke,Xt.data)}}else{N?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Ge,Ke,ce[ne]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,_t,Ge,Ke,ce[ne]);for(let Ie=0;Ie<ue.length;Ie++){let $e=ue[Ie];N?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie+1,0,0,Ge,Ke,$e.image[ne]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie+1,_t,Ge,Ke,$e.image[ne])}}}p(v)&&S(n.TEXTURE_CUBE_MAP),oe.__version=ie.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function Le(b,v,V,K,ie,oe){let fe=s.convert(V.format,V.colorSpace),Y=s.convert(V.type),ee=E(V.internalFormat,fe,Y,V.normalized,V.colorSpace),xe=i.get(v),we=i.get(V);if(we.__renderTarget=v,!xe.__hasExternalTextures){let ce=Math.max(1,v.width>>oe),ae=Math.max(1,v.height>>oe);ie===n.TEXTURE_3D||ie===n.TEXTURE_2D_ARRAY?t.texImage3D(ie,oe,ee,ce,ae,v.depth,0,fe,Y,null):t.texImage2D(ie,oe,ee,ce,ae,0,fe,Y,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),ct(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,ie,we.__webglTexture,0,en(v)):(ie===n.TEXTURE_2D||ie>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,K,ie,we.__webglTexture,oe),t.bindFramebuffer(n.FRAMEBUFFER,null)}function St(b,v,V){if(n.bindRenderbuffer(n.RENDERBUFFER,b),v.depthBuffer){let K=v.depthTexture,ie=K&&K.isDepthTexture?K.type:null,oe=R(v.stencilBuffer,ie),fe=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;ct(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,en(v),oe,v.width,v.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,en(v),oe,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,oe,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,fe,n.RENDERBUFFER,b)}else{let K=v.textures;for(let ie=0;ie<K.length;ie++){let oe=K[ie],fe=s.convert(oe.format,oe.colorSpace),Y=s.convert(oe.type),ee=E(oe.internalFormat,fe,Y,oe.normalized,oe.colorSpace);ct(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,en(v),ee,v.width,v.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,en(v),ee,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,ee,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function tt(b,v,V){let K=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let ie=i.get(v.depthTexture);if(ie.__renderTarget=v,(!ie.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),K){if(ie.__webglInit===void 0&&(ie.__webglInit=!0,v.depthTexture.addEventListener("dispose",I)),ie.__webglTexture===void 0){ie.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,ie.__webglTexture),Me(n.TEXTURE_CUBE_MAP,v.depthTexture);let xe=s.convert(v.depthTexture.format),we=s.convert(v.depthTexture.type),ce;v.depthTexture.format===Zi?ce=n.DEPTH_COMPONENT24:v.depthTexture.format===ps&&(ce=n.DEPTH24_STENCIL8);for(let ae=0;ae<6;ae++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,ce,v.width,v.height,0,xe,we,null)}}else te(v.depthTexture,0);let oe=ie.__webglTexture,fe=en(v),Y=K?n.TEXTURE_CUBE_MAP_POSITIVE_X+V:n.TEXTURE_2D,ee=v.depthTexture.format===ps?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===Zi)ct(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ee,Y,oe,0,fe):n.framebufferTexture2D(n.FRAMEBUFFER,ee,Y,oe,0);else if(v.depthTexture.format===ps)ct(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ee,Y,oe,0,fe):n.framebufferTexture2D(n.FRAMEBUFFER,ee,Y,oe,0);else throw new Error("Unknown depthTexture format")}function xt(b){let v=i.get(b),V=b.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==b.depthTexture){let K=b.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),K){let ie=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,K.removeEventListener("dispose",ie)};K.addEventListener("dispose",ie),v.__depthDisposeCallback=ie}v.__boundDepthTexture=K}if(b.depthTexture&&!v.__autoAllocateDepthBuffer)if(V)for(let K=0;K<6;K++)tt(v.__webglFramebuffer[K],b,K);else{let K=b.texture.mipmaps;K&&K.length>0?tt(v.__webglFramebuffer[0],b,0):tt(v.__webglFramebuffer,b,0)}else if(V){v.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[K]),v.__webglDepthbuffer[K]===void 0)v.__webglDepthbuffer[K]=n.createRenderbuffer(),St(v.__webglDepthbuffer[K],b,!1);else{let ie=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=v.__webglDepthbuffer[K];n.bindRenderbuffer(n.RENDERBUFFER,oe),n.framebufferRenderbuffer(n.FRAMEBUFFER,ie,n.RENDERBUFFER,oe)}}else{let K=b.texture.mipmaps;if(K&&K.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),St(v.__webglDepthbuffer,b,!1);else{let ie=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,oe),n.framebufferRenderbuffer(n.FRAMEBUFFER,ie,n.RENDERBUFFER,oe)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Et(b,v,V){let K=i.get(b);v!==void 0&&Le(K.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&xt(b)}function lt(b){let v=b.texture,V=i.get(b),K=i.get(v);b.addEventListener("dispose",y);let ie=b.textures,oe=b.isWebGLCubeRenderTarget===!0,fe=ie.length>1;if(fe||(K.__webglTexture===void 0&&(K.__webglTexture=n.createTexture()),K.__version=v.version,o.memory.textures++),oe){V.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer[Y]=[];for(let ee=0;ee<v.mipmaps.length;ee++)V.__webglFramebuffer[Y][ee]=n.createFramebuffer()}else V.__webglFramebuffer[Y]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer=[];for(let Y=0;Y<v.mipmaps.length;Y++)V.__webglFramebuffer[Y]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(fe)for(let Y=0,ee=ie.length;Y<ee;Y++){let xe=i.get(ie[Y]);xe.__webglTexture===void 0&&(xe.__webglTexture=n.createTexture(),o.memory.textures++)}if(b.samples>0&&ct(b)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let Y=0;Y<ie.length;Y++){let ee=ie[Y];V.__webglColorRenderbuffer[Y]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[Y]);let xe=s.convert(ee.format,ee.colorSpace),we=s.convert(ee.type),ce=E(ee.internalFormat,xe,we,ee.normalized,ee.colorSpace,b.isXRRenderTarget===!0),ae=en(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,ae,ce,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Y,n.RENDERBUFFER,V.__webglColorRenderbuffer[Y])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),St(V.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(oe){t.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),Me(n.TEXTURE_CUBE_MAP,v);for(let Y=0;Y<6;Y++)if(v.mipmaps&&v.mipmaps.length>0)for(let ee=0;ee<v.mipmaps.length;ee++)Le(V.__webglFramebuffer[Y][ee],b,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ee);else Le(V.__webglFramebuffer[Y],b,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);p(v)&&S(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(fe){for(let Y=0,ee=ie.length;Y<ee;Y++){let xe=ie[Y],we=i.get(xe),ce=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ce=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ce,we.__webglTexture),Me(ce,xe),Le(V.__webglFramebuffer,b,xe,n.COLOR_ATTACHMENT0+Y,ce,0),p(xe)&&S(ce)}t.unbindTexture()}else{let Y=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(Y=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Y,K.__webglTexture),Me(Y,v),v.mipmaps&&v.mipmaps.length>0)for(let ee=0;ee<v.mipmaps.length;ee++)Le(V.__webglFramebuffer[ee],b,v,n.COLOR_ATTACHMENT0,Y,ee);else Le(V.__webglFramebuffer,b,v,n.COLOR_ATTACHMENT0,Y,0);p(v)&&S(Y),t.unbindTexture()}b.depthBuffer&&xt(b)}function Qt(b){let v=b.textures;for(let V=0,K=v.length;V<K;V++){let ie=v[V];if(p(ie)){let oe=w(b),fe=i.get(ie).__webglTexture;t.bindTexture(oe,fe),S(oe),t.unbindTexture()}}}let Bt=[],zn=[];function L(b){if(b.samples>0){if(ct(b)===!1){let v=b.textures,V=b.width,K=b.height,ie=n.COLOR_BUFFER_BIT,oe=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,fe=i.get(b),Y=v.length>1;if(Y)for(let xe=0;xe<v.length;xe++)t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer);let ee=b.texture.mipmaps;ee&&ee.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,fe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let xe=0;xe<v.length;xe++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(ie|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(ie|=n.STENCIL_BUFFER_BIT)),Y){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,fe.__webglColorRenderbuffer[xe]);let we=i.get(v[xe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,we,0)}n.blitFramebuffer(0,0,V,K,0,0,V,K,ie,n.NEAREST),l===!0&&(Bt.length=0,zn.length=0,Bt.push(n.COLOR_ATTACHMENT0+xe),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Bt.push(oe),zn.push(oe),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,zn)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Bt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Y)for(let xe=0;xe<v.length;xe++){t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.RENDERBUFFER,fe.__webglColorRenderbuffer[xe]);let we=i.get(v[xe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.TEXTURE_2D,we,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){let v=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function en(b){return Math.min(r.maxSamples,b.samples)}function ct(b){let v=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Nt(b){let v=o.render.frame;u.get(b)!==v&&(u.set(b,v),b.update())}function pe(b,v){let V=b.colorSpace,K=b.format,ie=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||V!==Sl&&V!==Mr&&(ut.getTransfer(V)===wt?(K!==vi||ie!==ri)&&Ne("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ue("WebGLTextures: Unsupported texture color space:",V)),v}function Vt(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=$,this.getTextureUnits=Z,this.setTextureUnits=O,this.setTexture2D=te,this.setTexture2DArray=re,this.setTexture3D=de,this.setTextureCube=be,this.rebindTextures=Et,this.setupRenderTarget=lt,this.updateRenderTargetMipmap=Qt,this.updateMultisampleRenderTarget=L,this.setupDepthRenderbuffer=xt,this.setupFrameBufferTexture=Le,this.useMultisampledRTT=ct,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function OF(n,e){function t(i,r=Mr){let s,o=ut.getTransfer(r);if(i===ri)return n.UNSIGNED_BYTE;if(i===lf)return n.UNSIGNED_SHORT_4_4_4_4;if(i===cf)return n.UNSIGNED_SHORT_5_5_5_1;if(i===b0)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===S0)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===x0)return n.BYTE;if(i===_0)return n.SHORT;if(i===ca)return n.UNSIGNED_SHORT;if(i===af)return n.INT;if(i===Pi)return n.UNSIGNED_INT;if(i===Ni)return n.FLOAT;if(i===er)return n.HALF_FLOAT;if(i===M0)return n.ALPHA;if(i===w0)return n.RGB;if(i===vi)return n.RGBA;if(i===Zi)return n.DEPTH_COMPONENT;if(i===ps)return n.DEPTH_STENCIL;if(i===E0)return n.RED;if(i===uf)return n.RED_INTEGER;if(i===ms)return n.RG;if(i===df)return n.RG_INTEGER;if(i===ff)return n.RGBA_INTEGER;if(i===Wl||i===jl||i===$l||i===ql)if(o===wt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Wl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===jl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===$l)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ql)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Wl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===jl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===$l)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ql)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===hf||i===pf||i===mf||i===gf)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===hf)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===pf)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===mf)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===gf)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===vf||i===yf||i===xf||i===_f||i===bf||i===Xl||i===Sf)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===vf||i===yf)return o===wt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===xf)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===_f)return s.COMPRESSED_R11_EAC;if(i===bf)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Xl)return s.COMPRESSED_RG11_EAC;if(i===Sf)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Mf||i===wf||i===Ef||i===Cf||i===Tf||i===Af||i===If||i===Df||i===Rf||i===Pf||i===Nf||i===Of||i===Lf||i===Ff)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Mf)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===wf)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ef)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Cf)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Tf)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Af)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===If)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Df)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Rf)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Pf)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Nf)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Of)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Lf)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ff)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===kf||i===Uf||i===Bf)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===kf)return o===wt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Uf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Bf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Vf||i===Hf||i===Yl||i===zf)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Vf)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Hf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Yl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===zf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ua?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var LF=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,FF=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,q0=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Fl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new On({vertexShader:LF,fragmentShader:FF,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Nn(new js(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},X0=class extends Ji{constructor(e,t){super();let i=this,r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,g=null,x=typeof XRWebGLBinding<"u",m=new q0,p={},S=t.getContextAttributes(),w=null,E=null,R=[],C=[],I=new Ct,y=null,A=new Cn;A.viewport=new qt;let k=new Cn;k.viewport=new qt;let D=[A,k],U=new tf,$=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let he=R[Q];return he===void 0&&(he=new ia,R[Q]=he),he.getTargetRaySpace()},this.getControllerGrip=function(Q){let he=R[Q];return he===void 0&&(he=new ia,R[Q]=he),he.getGripSpace()},this.getHand=function(Q){let he=R[Q];return he===void 0&&(he=new ia,R[Q]=he),he.getHandSpace()};function O(Q){let he=C.indexOf(Q.inputSource);if(he===-1)return;let se=R[he];se!==void 0&&(se.update(Q.inputSource,Q.frame,c||o),se.dispatchEvent({type:Q.type,data:Q.inputSource}))}function z(){r.removeEventListener("select",O),r.removeEventListener("selectstart",O),r.removeEventListener("selectend",O),r.removeEventListener("squeeze",O),r.removeEventListener("squeezestart",O),r.removeEventListener("squeezeend",O),r.removeEventListener("end",z),r.removeEventListener("inputsourceschange",H);for(let Q=0;Q<R.length;Q++){let he=C[Q];he!==null&&(C[Q]=null,R[Q].disconnect(he))}$=null,Z=null,m.reset();for(let Q in p)delete p[Q];e.setRenderTarget(w),h=null,f=null,d=null,r=null,E=null,Me.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,i.isPresenting===!0&&Ne("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,i.isPresenting===!0&&Ne("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=function(Q){return ys(this,null,function*(){if(r=Q,r!==null){if(w=e.getRenderTarget(),r.addEventListener("select",O),r.addEventListener("selectstart",O),r.addEventListener("selectend",O),r.addEventListener("squeeze",O),r.addEventListener("squeezestart",O),r.addEventListener("squeezeend",O),r.addEventListener("end",z),r.addEventListener("inputsourceschange",H),S.xrCompatible!==!0&&(yield t.makeXRCompatible()),y=e.getPixelRatio(),e.getSize(I),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let se=null,Oe=null,ze=null;S.depth&&(ze=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=S.stencil?ps:Zi,Oe=S.stencil?ua:Pi);let Le={colorFormat:t.RGBA8,depthFormat:ze,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(Le),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),E=new ni(f.textureWidth,f.textureHeight,{format:vi,type:ri,depthTexture:new Sr(f.textureWidth,f.textureHeight,Oe,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let se={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,t,se),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),E=new ni(h.framebufferWidth,h.framebufferHeight,{format:vi,type:ri,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=yield r.requestReferenceSpace(a),Me.setContext(r),Me.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}})},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function H(Q){for(let he=0;he<Q.removed.length;he++){let se=Q.removed[he],Oe=C.indexOf(se);Oe>=0&&(C[Oe]=null,R[Oe].disconnect(se))}for(let he=0;he<Q.added.length;he++){let se=Q.added[he],Oe=C.indexOf(se);if(Oe===-1){for(let Le=0;Le<R.length;Le++)if(Le>=C.length){C.push(se),Oe=Le;break}else if(C[Le]===null){C[Le]=se,Oe=Le;break}if(Oe===-1)break}let ze=R[Oe];ze&&ze.connect(se)}}let te=new B,re=new B;function de(Q,he,se){te.setFromMatrixPosition(he.matrixWorld),re.setFromMatrixPosition(se.matrixWorld);let Oe=te.distanceTo(re),ze=he.projectionMatrix.elements,Le=se.projectionMatrix.elements,St=ze[14]/(ze[10]-1),tt=ze[14]/(ze[10]+1),xt=(ze[9]+1)/ze[5],Et=(ze[9]-1)/ze[5],lt=(ze[8]-1)/ze[0],Qt=(Le[8]+1)/Le[0],Bt=St*lt,zn=St*Qt,L=Oe/(-lt+Qt),en=L*-lt;if(he.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(en),Q.translateZ(L),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),ze[10]===-1)Q.projectionMatrix.copy(he.projectionMatrix),Q.projectionMatrixInverse.copy(he.projectionMatrixInverse);else{let ct=St+L,Nt=tt+L,pe=Bt-en,Vt=zn+(Oe-en),b=xt*tt/Nt*ct,v=Et*tt/Nt*ct;Q.projectionMatrix.makePerspective(pe,Vt,b,v,ct,Nt),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function be(Q,he){he===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(he.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(r===null)return;let he=Q.near,se=Q.far;m.texture!==null&&(m.depthNear>0&&(he=m.depthNear),m.depthFar>0&&(se=m.depthFar)),U.near=k.near=A.near=he,U.far=k.far=A.far=se,($!==U.near||Z!==U.far)&&(r.updateRenderState({depthNear:U.near,depthFar:U.far}),$=U.near,Z=U.far),U.layers.mask=Q.layers.mask|6,A.layers.mask=U.layers.mask&-5,k.layers.mask=U.layers.mask&-3;let Oe=Q.parent,ze=U.cameras;be(U,Oe);for(let Le=0;Le<ze.length;Le++)be(ze[Le],Oe);ze.length===2?de(U,A,k):U.projectionMatrix.copy(A.projectionMatrix),Ce(Q,U,Oe)};function Ce(Q,he,se){se===null?Q.matrix.copy(he.matrixWorld):(Q.matrix.copy(se.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(he.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(he.projectionMatrix),Q.projectionMatrixInverse.copy(he.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=ta*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(Q){l=Q,f!==null&&(f.fixedFoveation=Q),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=Q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(Q){return p[Q]};let at=null;function et(Q,he){if(u=he.getViewerPose(c||o),g=he,u!==null){let se=u.views;h!==null&&(e.setRenderTargetFramebuffer(E,h.framebuffer),e.setRenderTarget(E));let Oe=!1;se.length!==U.cameras.length&&(U.cameras.length=0,Oe=!0);for(let tt=0;tt<se.length;tt++){let xt=se[tt],Et=null;if(h!==null)Et=h.getViewport(xt);else{let Qt=d.getViewSubImage(f,xt);Et=Qt.viewport,tt===0&&(e.setRenderTargetTextures(E,Qt.colorTexture,Qt.depthStencilTexture),e.setRenderTarget(E))}let lt=D[tt];lt===void 0&&(lt=new Cn,lt.layers.enable(tt),lt.viewport=new qt,D[tt]=lt),lt.matrix.fromArray(xt.transform.matrix),lt.matrix.decompose(lt.position,lt.quaternion,lt.scale),lt.projectionMatrix.fromArray(xt.projectionMatrix),lt.projectionMatrixInverse.copy(lt.projectionMatrix).invert(),lt.viewport.set(Et.x,Et.y,Et.width,Et.height),tt===0&&(U.matrix.copy(lt.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Oe===!0&&U.cameras.push(lt)}let ze=r.enabledFeatures;if(ze&&ze.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){d=i.getBinding();let tt=d.getDepthInformation(se[0]);tt&&tt.isValid&&tt.texture&&m.init(tt,r.renderState)}if(ze&&ze.includes("camera-access")&&x){e.state.unbindTexture(),d=i.getBinding();for(let tt=0;tt<se.length;tt++){let xt=se[tt].camera;if(xt){let Et=p[xt];Et||(Et=new Fl,p[xt]=Et);let lt=d.getCameraImage(xt);Et.sourceTexture=lt}}}}for(let se=0;se<R.length;se++){let Oe=C[se],ze=R[se];Oe!==null&&ze!==void 0&&ze.update(Oe,he,c||o)}at&&at(Q,he),he.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:he}),g=null}let Me=new WM;Me.setAnimationLoop(et),this.setAnimationLoop=function(Q){at=Q},this.dispose=function(){}}},kF=new $t,ZM=new We;ZM.set(-1,0,0,0,1,0,0,0,1);function UF(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,D0(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,S,w,E){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(m,p):p.isMeshLambertMaterial?(s(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,E)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),x(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,S,w):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ln&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ln&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let S=e.get(p),w=S.envMap,E=S.envMapRotation;w&&(m.envMap.value=w,m.envMapRotation.value.setFromMatrix4(kF.makeRotationFromEuler(E)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(ZM),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=w*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ln&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let S=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function BF(n,e,t,i){let r={},s={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,w){let E=w.program;i.uniformBlockBinding(S,E)}function c(S,w){let E=r[S.id];E===void 0&&(g(S),E=u(S),r[S.id]=E,S.addEventListener("dispose",m));let R=w.program;i.updateUBOMapping(S,R);let C=e.render.frame;s[S.id]!==C&&(f(S),s[S.id]=C)}function u(S){let w=d();S.__bindingPointIndex=w;let E=n.createBuffer(),R=S.__size,C=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,R,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,E),E}function d(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return Ue("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){let w=r[S.id],E=S.uniforms,R=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let C=0,I=E.length;C<I;C++){let y=Array.isArray(E[C])?E[C]:[E[C]];for(let A=0,k=y.length;A<k;A++){let D=y[A];if(h(D,C,A,R)===!0){let U=D.__offset,$=Array.isArray(D.value)?D.value:[D.value],Z=0;for(let O=0;O<$.length;O++){let z=$[O],H=x(z);typeof z=="number"||typeof z=="boolean"?(D.__data[0]=z,n.bufferSubData(n.UNIFORM_BUFFER,U+Z,D.__data)):z.isMatrix3?(D.__data[0]=z.elements[0],D.__data[1]=z.elements[1],D.__data[2]=z.elements[2],D.__data[3]=0,D.__data[4]=z.elements[3],D.__data[5]=z.elements[4],D.__data[6]=z.elements[5],D.__data[7]=0,D.__data[8]=z.elements[6],D.__data[9]=z.elements[7],D.__data[10]=z.elements[8],D.__data[11]=0):ArrayBuffer.isView(z)?D.__data.set(new z.constructor(z.buffer,z.byteOffset,D.__data.length)):(z.toArray(D.__data,Z),Z+=H.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,U,D.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(S,w,E,R){let C=S.value,I=w+"_"+E;if(R[I]===void 0)return typeof C=="number"||typeof C=="boolean"?R[I]=C:ArrayBuffer.isView(C)?R[I]=C.slice():R[I]=C.clone(),!0;{let y=R[I];if(typeof C=="number"||typeof C=="boolean"){if(y!==C)return R[I]=C,!0}else{if(ArrayBuffer.isView(C))return!0;if(y.equals(C)===!1)return y.copy(C),!0}}return!1}function g(S){let w=S.uniforms,E=0,R=16;for(let I=0,y=w.length;I<y;I++){let A=Array.isArray(w[I])?w[I]:[w[I]];for(let k=0,D=A.length;k<D;k++){let U=A[k],$=Array.isArray(U.value)?U.value:[U.value];for(let Z=0,O=$.length;Z<O;Z++){let z=$[Z],H=x(z),te=E%R,re=te%H.boundary,de=te+re;E+=re,de!==0&&R-de<H.storage&&(E+=R-de),U.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=E,E+=H.storage}}}let C=E%R;return C>0&&(E+=R-C),S.__size=E,S.__cache={},this}function x(S){let w={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(w.boundary=4,w.storage=4):S.isVector2?(w.boundary=8,w.storage=8):S.isVector3||S.isColor?(w.boundary=16,w.storage=12):S.isVector4?(w.boundary=16,w.storage=16):S.isMatrix3?(w.boundary=48,w.storage=48):S.isMatrix4?(w.boundary=64,w.storage=64):S.isTexture?Ne("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(w.boundary=16,w.storage=S.byteLength):Ne("WebGLRenderer: Unsupported uniform value type.",S),w}function m(S){let w=S.target;w.removeEventListener("dispose",m);let E=o.indexOf(w.__bindingPointIndex);o.splice(E,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function p(){for(let S in r)n.deleteBuffer(r[S]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}var VF=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),tr=null;function HF(){return tr===null&&(tr=new Ud(VF,16,16,ms,er),tr.name="DFG_LUT",tr.minFilter=gn,tr.magFilter=gn,tr.wrapS=Yi,tr.wrapT=Yi,tr.generateMipmaps=!1,tr.needsUpdate=!0),tr}var Zf=class{constructor(e={}){let{canvas:t=gM(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:h=ri}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=o;let x=h,m=new Set([ff,df,uf]),p=new Set([ri,Pi,ca,ua,lf,cf]),S=new Uint32Array(4),w=new Int32Array(4),E=new B,R=null,C=null,I=[],y=[],A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ri,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let k=this,D=!1,U=null;this._outputColorSpace=ti;let $=0,Z=0,O=null,z=-1,H=null,te=new qt,re=new qt,de=null,be=new ht(0),Ce=0,at=t.width,et=t.height,Me=1,Q=null,he=null,se=new qt(0,0,at,et),Oe=new qt(0,0,at,et),ze=!1,Le=new Pl,St=!1,tt=!1,xt=new $t,Et=new B,lt=new qt,Qt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Bt=!1;function zn(){return O===null?Me:1}let L=i;function en(_,F){return t.getContext(_,F)}try{let _={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${nf}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",Ie,!1),t.addEventListener("webglcontextcreationerror",$e,!1),L===null){let F="webgl2";if(L=en(F,_),L===null)throw en(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(_){throw Ue("WebGLRenderer: "+_.message),_}let ct,Nt,pe,Vt,b,v,V,K,ie,oe,fe,Y,ee,xe,we,ce,ae,Ge,Ke,_t,N,le,J;function _e(){ct=new XO(L),ct.init(),N=new OF(L,ct),Nt=new VO(L,ct,e,N),pe=new PF(L,ct),Nt.reversedDepthBuffer&&f&&pe.buffers.depth.setReversed(!0),Vt=new JO(L),b=new yF,v=new NF(L,ct,pe,b,Nt,N,Vt),V=new qO(k),K=new tN(L),le=new UO(L,K),ie=new YO(L,K,Vt,le),oe=new QO(L,ie,K,le,Vt),Ge=new KO(L,Nt,v),we=new HO(b),fe=new vF(k,V,ct,Nt,le,we),Y=new UF(k,b),ee=new _F,xe=new CF(ct),ae=new kO(k,V,pe,oe,g,l),ce=new RF(k,oe,Nt),J=new BF(L,Vt,Nt,pe),Ke=new BO(L,ct,Vt),_t=new ZO(L,ct,Vt),Vt.programs=fe.programs,k.capabilities=Nt,k.extensions=ct,k.properties=b,k.renderLists=ee,k.shadowMap=ce,k.state=pe,k.info=Vt}_e(),x!==ri&&(A=new tL(x,t.width,t.height,r,s));let ue=new X0(k,L);this.xr=ue,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let _=ct.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){let _=ct.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return Me},this.setPixelRatio=function(_){_!==void 0&&(Me=_,this.setSize(at,et,!1))},this.getSize=function(_){return _.set(at,et)},this.setSize=function(_,F,j=!0){if(ue.isPresenting){Ne("WebGLRenderer: Can't change size while VR device is presenting.");return}at=_,et=F,t.width=Math.floor(_*Me),t.height=Math.floor(F*Me),j===!0&&(t.style.width=_+"px",t.style.height=F+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,_,F)},this.getDrawingBufferSize=function(_){return _.set(at*Me,et*Me).floor()},this.setDrawingBufferSize=function(_,F,j){at=_,et=F,Me=j,t.width=Math.floor(_*j),t.height=Math.floor(F*j),this.setViewport(0,0,_,F)},this.setEffects=function(_){if(x===ri){Ue("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(_){for(let F=0;F<_.length;F++)if(_[F].isOutputPass===!0){Ne("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(_||[])},this.getCurrentViewport=function(_){return _.copy(te)},this.getViewport=function(_){return _.copy(se)},this.setViewport=function(_,F,j,G){_.isVector4?se.set(_.x,_.y,_.z,_.w):se.set(_,F,j,G),pe.viewport(te.copy(se).multiplyScalar(Me).round())},this.getScissor=function(_){return _.copy(Oe)},this.setScissor=function(_,F,j,G){_.isVector4?Oe.set(_.x,_.y,_.z,_.w):Oe.set(_,F,j,G),pe.scissor(re.copy(Oe).multiplyScalar(Me).round())},this.getScissorTest=function(){return ze},this.setScissorTest=function(_){pe.setScissorTest(ze=_)},this.setOpaqueSort=function(_){Q=_},this.setTransparentSort=function(_){he=_},this.getClearColor=function(_){return _.copy(ae.getClearColor())},this.setClearColor=function(){ae.setClearColor(...arguments)},this.getClearAlpha=function(){return ae.getClearAlpha()},this.setClearAlpha=function(){ae.setClearAlpha(...arguments)},this.clear=function(_=!0,F=!0,j=!0){let G=0;if(_){let W=!1;if(O!==null){let ye=O.texture.format;W=m.has(ye)}if(W){let ye=O.texture.type,Ee=p.has(ye),ge=ae.getClearColor(),Te=ae.getClearAlpha(),De=ge.r,qe=ge.g,it=ge.b;Ee?(S[0]=De,S[1]=qe,S[2]=it,S[3]=Te,L.clearBufferuiv(L.COLOR,0,S)):(w[0]=De,w[1]=qe,w[2]=it,w[3]=Te,L.clearBufferiv(L.COLOR,0,w))}else G|=L.COLOR_BUFFER_BIT}F&&(G|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&(G|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&L.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(_){_.setRenderer(this),U=_},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",Ie,!1),t.removeEventListener("webglcontextcreationerror",$e,!1),ae.dispose(),ee.dispose(),xe.dispose(),b.dispose(),V.dispose(),oe.dispose(),le.dispose(),J.dispose(),fe.dispose(),ue.dispose(),ue.removeEventListener("sessionstart",Y0),ue.removeEventListener("sessionend",Z0),vs.stop()};function ne(_){_.preventDefault(),A0("WebGLRenderer: Context Lost."),D=!0}function Ie(){A0("WebGLRenderer: Context Restored."),D=!1;let _=Vt.autoReset,F=ce.enabled,j=ce.autoUpdate,G=ce.needsUpdate,W=ce.type;_e(),Vt.autoReset=_,ce.enabled=F,ce.autoUpdate=j,ce.needsUpdate=G,ce.type=W}function $e(_){Ue("WebGLRenderer: A WebGL context could not be created. Reason: ",_.statusMessage)}function Xt(_){let F=_.target;F.removeEventListener("dispose",Xt),Tt(F)}function Tt(_){ir(_),b.remove(_)}function ir(_){let F=b.get(_).programs;F!==void 0&&(F.forEach(function(j){fe.releaseProgram(j)}),_.isShaderMaterial&&fe.releaseShaderCache(_))}this.renderBufferDirect=function(_,F,j,G,W,ye){F===null&&(F=Qt);let Ee=W.isMesh&&W.matrixWorld.determinant()<0,ge=ew(_,F,j,G,W);pe.setMaterial(G,Ee);let Te=j.index,De=1;if(G.wireframe===!0){if(Te=ie.getWireframeAttribute(j),Te===void 0)return;De=2}let qe=j.drawRange,it=j.attributes.position,Re=qe.start*De,At=(qe.start+qe.count)*De;ye!==null&&(Re=Math.max(Re,ye.start*De),At=Math.min(At,(ye.start+ye.count)*De)),Te!==null?(Re=Math.max(Re,0),At=Math.min(At,Te.count)):it!=null&&(Re=Math.max(Re,0),At=Math.min(At,it.count));let Yt=At-Re;if(Yt<0||Yt===1/0)return;le.setup(W,G,ge,j,Te);let Ht,Dt=Ke;if(Te!==null&&(Ht=K.get(Te),Dt=_t,Dt.setIndex(Ht)),W.isMesh)G.wireframe===!0?(pe.setLineWidth(G.wireframeLinewidth*zn()),Dt.setMode(L.LINES)):Dt.setMode(L.TRIANGLES);else if(W.isLine){let vn=G.linewidth;vn===void 0&&(vn=1),pe.setLineWidth(vn*zn()),W.isLineSegments?Dt.setMode(L.LINES):W.isLineLoop?Dt.setMode(L.LINE_LOOP):Dt.setMode(L.LINE_STRIP)}else W.isPoints?Dt.setMode(L.POINTS):W.isSprite&&Dt.setMode(L.TRIANGLES);if(W.isBatchedMesh)if(ct.get("WEBGL_multi_draw"))Dt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let vn=W._multiDrawStarts,Se=W._multiDrawCounts,Gn=W._multiDrawCount,yt=Te?K.get(Te).bytesPerElement:1,si=b.get(G).currentProgram.getUniforms();for(let Li=0;Li<Gn;Li++)si.setValue(L,"_gl_DrawID",Li),Dt.render(vn[Li]/yt,Se[Li])}else if(W.isInstancedMesh)Dt.renderInstances(Re,Yt,W.count);else if(j.isInstancedBufferGeometry){let vn=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Se=Math.min(j.instanceCount,vn);Dt.renderInstances(Re,Yt,Se)}else Dt.render(Re,Yt)};function Oi(_,F,j){_.transparent===!0&&_.side===gi&&_.forceSinglePass===!1?(_.side=Ln,_.needsUpdate=!0,ec(_,F,j),_.side=_r,_.needsUpdate=!0,ec(_,F,j),_.side=gi):ec(_,F,j)}this.compile=function(_,F,j=null){j===null&&(j=_),C=xe.get(j),C.init(F),y.push(C),j.traverseVisible(function(W){W.isLight&&W.layers.test(F.layers)&&(C.pushLight(W),W.castShadow&&C.pushShadow(W))}),_!==j&&_.traverseVisible(function(W){W.isLight&&W.layers.test(F.layers)&&(C.pushLight(W),W.castShadow&&C.pushShadow(W))}),C.setupLights();let G=new Set;return _.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let ye=W.material;if(ye)if(Array.isArray(ye))for(let Ee=0;Ee<ye.length;Ee++){let ge=ye[Ee];Oi(ge,j,W),G.add(ge)}else Oi(ye,j,W),G.add(ye)}),C=y.pop(),G},this.compileAsync=function(_,F,j=null){let G=this.compile(_,F,j);return new Promise(W=>{function ye(){if(G.forEach(function(Ee){b.get(Ee).currentProgram.isReady()&&G.delete(Ee)}),G.size===0){W(_);return}setTimeout(ye,10)}ct.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let Qf=null;function KM(_){Qf&&Qf(_)}function Y0(){vs.stop()}function Z0(){vs.start()}let vs=new WM;vs.setAnimationLoop(KM),typeof self<"u"&&vs.setContext(self),this.setAnimationLoop=function(_){Qf=_,ue.setAnimationLoop(_),_===null?vs.stop():vs.start()},ue.addEventListener("sessionstart",Y0),ue.addEventListener("sessionend",Z0),this.render=function(_,F){if(F!==void 0&&F.isCamera!==!0){Ue("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;U!==null&&U.renderStart(_,F);let j=ue.enabled===!0&&ue.isPresenting===!0,G=A!==null&&(O===null||j)&&A.begin(k,O);if(_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ue.enabled===!0&&ue.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(ue.cameraAutoUpdate===!0&&ue.updateCamera(F),F=ue.getCamera()),_.isScene===!0&&_.onBeforeRender(k,_,F,O),C=xe.get(_,y.length),C.init(F),C.state.textureUnits=v.getTextureUnits(),y.push(C),xt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Le.setFromProjectionMatrix(xt,Di,F.reversedDepth),tt=this.localClippingEnabled,St=we.init(this.clippingPlanes,tt),R=ee.get(_,I.length),R.init(),I.push(R),ue.enabled===!0&&ue.isPresenting===!0){let Ee=k.xr.getDepthSensingMesh();Ee!==null&&eh(Ee,F,-1/0,k.sortObjects)}eh(_,F,0,k.sortObjects),R.finish(),k.sortObjects===!0&&R.sort(Q,he),Bt=ue.enabled===!1||ue.isPresenting===!1||ue.hasDepthSensing()===!1,Bt&&ae.addToRenderList(R,_),this.info.render.frame++,St===!0&&we.beginShadows();let W=C.state.shadowsArray;if(ce.render(W,_,F),St===!0&&we.endShadows(),this.info.autoReset===!0&&this.info.reset(),(G&&A.hasRenderPass())===!1){let Ee=R.opaque,ge=R.transmissive;if(C.setupLights(),F.isArrayCamera){let Te=F.cameras;if(ge.length>0)for(let De=0,qe=Te.length;De<qe;De++){let it=Te[De];K0(Ee,ge,_,it)}Bt&&ae.render(_);for(let De=0,qe=Te.length;De<qe;De++){let it=Te[De];J0(R,_,it,it.viewport)}}else ge.length>0&&K0(Ee,ge,_,F),Bt&&ae.render(_),J0(R,_,F)}O!==null&&Z===0&&(v.updateMultisampleRenderTarget(O),v.updateRenderTargetMipmap(O)),G&&A.end(k),_.isScene===!0&&_.onAfterRender(k,_,F),le.resetDefaultState(),z=-1,H=null,y.pop(),y.length>0?(C=y[y.length-1],v.setTextureUnits(C.state.textureUnits),St===!0&&we.setGlobalState(k.clippingPlanes,C.state.camera)):C=null,I.pop(),I.length>0?R=I[I.length-1]:R=null,U!==null&&U.renderEnd()};function eh(_,F,j,G){if(_.visible===!1)return;if(_.layers.test(F.layers)){if(_.isGroup)j=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(F);else if(_.isLightProbeGrid)C.pushLightProbeGrid(_);else if(_.isLight)C.pushLight(_),_.castShadow&&C.pushShadow(_);else if(_.isSprite){if(!_.frustumCulled||Le.intersectsSprite(_)){G&&lt.setFromMatrixPosition(_.matrixWorld).applyMatrix4(xt);let Ee=oe.update(_),ge=_.material;ge.visible&&R.push(_,Ee,ge,j,lt.z,null)}}else if((_.isMesh||_.isLine||_.isPoints)&&(!_.frustumCulled||Le.intersectsObject(_))){let Ee=oe.update(_),ge=_.material;if(G&&(_.boundingSphere!==void 0?(_.boundingSphere===null&&_.computeBoundingSphere(),lt.copy(_.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),lt.copy(Ee.boundingSphere.center)),lt.applyMatrix4(_.matrixWorld).applyMatrix4(xt)),Array.isArray(ge)){let Te=Ee.groups;for(let De=0,qe=Te.length;De<qe;De++){let it=Te[De],Re=ge[it.materialIndex];Re&&Re.visible&&R.push(_,Ee,Re,j,lt.z,it)}}else ge.visible&&R.push(_,Ee,ge,j,lt.z,null)}}let ye=_.children;for(let Ee=0,ge=ye.length;Ee<ge;Ee++)eh(ye[Ee],F,j,G)}function J0(_,F,j,G){let{opaque:W,transmissive:ye,transparent:Ee}=_;C.setupLightsView(j),St===!0&&we.setGlobalState(k.clippingPlanes,j),G&&pe.viewport(te.copy(G)),W.length>0&&Ql(W,F,j),ye.length>0&&Ql(ye,F,j),Ee.length>0&&Ql(Ee,F,j),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function K0(_,F,j,G){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(C.state.transmissionRenderTarget[G.id]===void 0){let Re=ct.has("EXT_color_buffer_half_float")||ct.has("EXT_color_buffer_float");C.state.transmissionRenderTarget[G.id]=new ni(1,1,{generateMipmaps:!0,type:Re?er:ri,minFilter:hs,samples:Math.max(4,Nt.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ut.workingColorSpace})}let ye=C.state.transmissionRenderTarget[G.id],Ee=G.viewport||te;ye.setSize(Ee.z*k.transmissionResolutionScale,Ee.w*k.transmissionResolutionScale);let ge=k.getRenderTarget(),Te=k.getActiveCubeFace(),De=k.getActiveMipmapLevel();k.setRenderTarget(ye),k.getClearColor(be),Ce=k.getClearAlpha(),Ce<1&&k.setClearColor(16777215,.5),k.clear(),Bt&&ae.render(j);let qe=k.toneMapping;k.toneMapping=Ri;let it=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),C.setupLightsView(G),St===!0&&we.setGlobalState(k.clippingPlanes,G),Ql(_,j,G),v.updateMultisampleRenderTarget(ye),v.updateRenderTargetMipmap(ye),ct.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let At=0,Yt=F.length;At<Yt;At++){let Ht=F[At],{object:Dt,geometry:vn,material:Se,group:Gn}=Ht;if(Se.side===gi&&Dt.layers.test(G.layers)){let yt=Se.side;Se.side=Ln,Se.needsUpdate=!0,Q0(Dt,j,G,vn,Se,Gn),Se.side=yt,Se.needsUpdate=!0,Re=!0}}Re===!0&&(v.updateMultisampleRenderTarget(ye),v.updateRenderTargetMipmap(ye))}k.setRenderTarget(ge,Te,De),k.setClearColor(be,Ce),it!==void 0&&(G.viewport=it),k.toneMapping=qe}function Ql(_,F,j){let G=F.isScene===!0?F.overrideMaterial:null;for(let W=0,ye=_.length;W<ye;W++){let Ee=_[W],{object:ge,geometry:Te,group:De}=Ee,qe=Ee.material;qe.allowOverride===!0&&G!==null&&(qe=G),ge.layers.test(j.layers)&&Q0(ge,F,j,Te,qe,De)}}function Q0(_,F,j,G,W,ye){_.onBeforeRender(k,F,j,G,W,ye),_.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),W.onBeforeRender(k,F,j,G,_,ye),W.transparent===!0&&W.side===gi&&W.forceSinglePass===!1?(W.side=Ln,W.needsUpdate=!0,k.renderBufferDirect(j,F,G,W,_,ye),W.side=_r,W.needsUpdate=!0,k.renderBufferDirect(j,F,G,W,_,ye),W.side=gi):k.renderBufferDirect(j,F,G,W,_,ye),_.onAfterRender(k,F,j,G,W,ye)}function ec(_,F,j){F.isScene!==!0&&(F=Qt);let G=b.get(_),W=C.state.lights,ye=C.state.shadowsArray,Ee=W.state.version,ge=fe.getParameters(_,W.state,ye,F,j,C.state.lightProbeGridArray),Te=fe.getProgramCacheKey(ge),De=G.programs;G.environment=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?F.environment:null,G.fog=F.fog;let qe=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap;G.envMap=V.get(_.envMap||G.environment,qe),G.envMapRotation=G.environment!==null&&_.envMap===null?F.environmentRotation:_.envMapRotation,De===void 0&&(_.addEventListener("dispose",Xt),De=new Map,G.programs=De);let it=De.get(Te);if(it!==void 0){if(G.currentProgram===it&&G.lightsStateVersion===Ee)return tv(_,ge),it}else ge.uniforms=fe.getUniforms(_),U!==null&&_.isNodeMaterial&&U.build(_,j,ge),_.onBeforeCompile(ge,k),it=fe.acquireProgram(ge,Te),De.set(Te,it),G.uniforms=ge.uniforms;let Re=G.uniforms;return(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)&&(Re.clippingPlanes=we.uniform),tv(_,ge),G.needsLights=nw(_),G.lightsStateVersion=Ee,G.needsLights&&(Re.ambientLightColor.value=W.state.ambient,Re.lightProbe.value=W.state.probe,Re.directionalLights.value=W.state.directional,Re.directionalLightShadows.value=W.state.directionalShadow,Re.spotLights.value=W.state.spot,Re.spotLightShadows.value=W.state.spotShadow,Re.rectAreaLights.value=W.state.rectArea,Re.ltc_1.value=W.state.rectAreaLTC1,Re.ltc_2.value=W.state.rectAreaLTC2,Re.pointLights.value=W.state.point,Re.pointLightShadows.value=W.state.pointShadow,Re.hemisphereLights.value=W.state.hemi,Re.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Re.spotLightMatrix.value=W.state.spotLightMatrix,Re.spotLightMap.value=W.state.spotLightMap,Re.pointShadowMatrix.value=W.state.pointShadowMatrix),G.lightProbeGrid=C.state.lightProbeGridArray.length>0,G.currentProgram=it,G.uniformsList=null,it}function ev(_){if(_.uniformsList===null){let F=_.currentProgram.getUniforms();_.uniformsList=ha.seqWithValue(F.seq,_.uniforms)}return _.uniformsList}function tv(_,F){let j=b.get(_);j.outputColorSpace=F.outputColorSpace,j.batching=F.batching,j.batchingColor=F.batchingColor,j.instancing=F.instancing,j.instancingColor=F.instancingColor,j.instancingMorph=F.instancingMorph,j.skinning=F.skinning,j.morphTargets=F.morphTargets,j.morphNormals=F.morphNormals,j.morphColors=F.morphColors,j.morphTargetsCount=F.morphTargetsCount,j.numClippingPlanes=F.numClippingPlanes,j.numIntersection=F.numClipIntersection,j.vertexAlphas=F.vertexAlphas,j.vertexTangents=F.vertexTangents,j.toneMapping=F.toneMapping}function QM(_,F){if(_.length===0)return null;if(_.length===1)return _[0].texture!==null?_[0]:null;E.setFromMatrixPosition(F.matrixWorld);for(let j=0,G=_.length;j<G;j++){let W=_[j];if(W.texture!==null&&W.boundingBox.containsPoint(E))return W}return null}function ew(_,F,j,G,W){F.isScene!==!0&&(F=Qt),v.resetTextureUnits();let ye=F.fog,Ee=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?F.environment:null,ge=O===null?k.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:ut.workingColorSpace,Te=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,De=V.get(G.envMap||Ee,Te),qe=G.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,it=!!j.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Re=!!j.morphAttributes.position,At=!!j.morphAttributes.normal,Yt=!!j.morphAttributes.color,Ht=Ri;G.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(Ht=k.toneMapping);let Dt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,vn=Dt!==void 0?Dt.length:0,Se=b.get(G),Gn=C.state.lights;if(St===!0&&(tt===!0||_!==H)){let Ot=_===H&&G.id===z;we.setState(G,_,Ot)}let yt=!1;G.version===Se.__version?(Se.needsLights&&Se.lightsStateVersion!==Gn.state.version||Se.outputColorSpace!==ge||W.isBatchedMesh&&Se.batching===!1||!W.isBatchedMesh&&Se.batching===!0||W.isBatchedMesh&&Se.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Se.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Se.instancing===!1||!W.isInstancedMesh&&Se.instancing===!0||W.isSkinnedMesh&&Se.skinning===!1||!W.isSkinnedMesh&&Se.skinning===!0||W.isInstancedMesh&&Se.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Se.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Se.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Se.instancingMorph===!1&&W.morphTexture!==null||Se.envMap!==De||G.fog===!0&&Se.fog!==ye||Se.numClippingPlanes!==void 0&&(Se.numClippingPlanes!==we.numPlanes||Se.numIntersection!==we.numIntersection)||Se.vertexAlphas!==qe||Se.vertexTangents!==it||Se.morphTargets!==Re||Se.morphNormals!==At||Se.morphColors!==Yt||Se.toneMapping!==Ht||Se.morphTargetsCount!==vn||!!Se.lightProbeGrid!=C.state.lightProbeGridArray.length>0)&&(yt=!0):(yt=!0,Se.__version=G.version);let si=Se.currentProgram;yt===!0&&(si=ec(G,F,W),U&&G.isNodeMaterial&&U.onUpdateProgram(G,si,Se));let Li=!1,Cr=!1,Ys=!1,Rt=si.getUniforms(),Zt=Se.uniforms;if(pe.useProgram(si.program)&&(Li=!0,Cr=!0,Ys=!0),G.id!==z&&(z=G.id,Cr=!0),Se.needsLights){let Ot=QM(C.state.lightProbeGridArray,W);Se.lightProbeGrid!==Ot&&(Se.lightProbeGrid=Ot,Cr=!0)}if(Li||H!==_){pe.buffers.depth.getReversed()&&_.reversedDepth!==!0&&(_._reversedDepth=!0,_.updateProjectionMatrix()),Rt.setValue(L,"projectionMatrix",_.projectionMatrix),Rt.setValue(L,"viewMatrix",_.matrixWorldInverse);let Ar=Rt.map.cameraPosition;Ar!==void 0&&Ar.setValue(L,Et.setFromMatrixPosition(_.matrixWorld)),Nt.logarithmicDepthBuffer&&Rt.setValue(L,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&Rt.setValue(L,"isOrthographic",_.isOrthographicCamera===!0),H!==_&&(H=_,Cr=!0,Ys=!0)}if(Se.needsLights&&(Gn.state.directionalShadowMap.length>0&&Rt.setValue(L,"directionalShadowMap",Gn.state.directionalShadowMap,v),Gn.state.spotShadowMap.length>0&&Rt.setValue(L,"spotShadowMap",Gn.state.spotShadowMap,v),Gn.state.pointShadowMap.length>0&&Rt.setValue(L,"pointShadowMap",Gn.state.pointShadowMap,v)),W.isSkinnedMesh){Rt.setOptional(L,W,"bindMatrix"),Rt.setOptional(L,W,"bindMatrixInverse");let Ot=W.skeleton;Ot&&(Ot.boneTexture===null&&Ot.computeBoneTexture(),Rt.setValue(L,"boneTexture",Ot.boneTexture,v))}W.isBatchedMesh&&(Rt.setOptional(L,W,"batchingTexture"),Rt.setValue(L,"batchingTexture",W._matricesTexture,v),Rt.setOptional(L,W,"batchingIdTexture"),Rt.setValue(L,"batchingIdTexture",W._indirectTexture,v),Rt.setOptional(L,W,"batchingColorTexture"),W._colorsTexture!==null&&Rt.setValue(L,"batchingColorTexture",W._colorsTexture,v));let Tr=j.morphAttributes;if((Tr.position!==void 0||Tr.normal!==void 0||Tr.color!==void 0)&&Ge.update(W,j,si),(Cr||Se.receiveShadow!==W.receiveShadow)&&(Se.receiveShadow=W.receiveShadow,Rt.setValue(L,"receiveShadow",W.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&F.environment!==null&&(Zt.envMapIntensity.value=F.environmentIntensity),Zt.dfgLUT!==void 0&&(Zt.dfgLUT.value=HF()),Cr){if(Rt.setValue(L,"toneMappingExposure",k.toneMappingExposure),Se.needsLights&&tw(Zt,Ys),ye&&G.fog===!0&&Y.refreshFogUniforms(Zt,ye),Y.refreshMaterialUniforms(Zt,G,Me,et,C.state.transmissionRenderTarget[_.id]),Se.needsLights&&Se.lightProbeGrid){let Ot=Se.lightProbeGrid;Zt.probesSH.value=Ot.texture,Zt.probesMin.value.copy(Ot.boundingBox.min),Zt.probesMax.value.copy(Ot.boundingBox.max),Zt.probesResolution.value.copy(Ot.resolution)}ha.upload(L,ev(Se),Zt,v)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(ha.upload(L,ev(Se),Zt,v),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&Rt.setValue(L,"center",W.center),Rt.setValue(L,"modelViewMatrix",W.modelViewMatrix),Rt.setValue(L,"normalMatrix",W.normalMatrix),Rt.setValue(L,"modelMatrix",W.matrixWorld),G.uniformsGroups!==void 0){let Ot=G.uniformsGroups;for(let Ar=0,Zs=Ot.length;Ar<Zs;Ar++){let nv=Ot[Ar];J.update(nv,si),J.bind(nv,si)}}return si}function tw(_,F){_.ambientLightColor.needsUpdate=F,_.lightProbe.needsUpdate=F,_.directionalLights.needsUpdate=F,_.directionalLightShadows.needsUpdate=F,_.pointLights.needsUpdate=F,_.pointLightShadows.needsUpdate=F,_.spotLights.needsUpdate=F,_.spotLightShadows.needsUpdate=F,_.rectAreaLights.needsUpdate=F,_.hemisphereLights.needsUpdate=F}function nw(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(_,F,j){let G=b.get(_);G.__autoAllocateDepthBuffer=_.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),b.get(_.texture).__webglTexture=F,b.get(_.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:j,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(_,F){let j=b.get(_);j.__webglFramebuffer=F,j.__useDefaultFramebuffer=F===void 0};let iw=L.createFramebuffer();this.setRenderTarget=function(_,F=0,j=0){O=_,$=F,Z=j;let G=null,W=!1,ye=!1;if(_){let ge=b.get(_);if(ge.__useDefaultFramebuffer!==void 0){pe.bindFramebuffer(L.FRAMEBUFFER,ge.__webglFramebuffer),te.copy(_.viewport),re.copy(_.scissor),de=_.scissorTest,pe.viewport(te),pe.scissor(re),pe.setScissorTest(de),z=-1;return}else if(ge.__webglFramebuffer===void 0)v.setupRenderTarget(_);else if(ge.__hasExternalTextures)v.rebindTextures(_,b.get(_.texture).__webglTexture,b.get(_.depthTexture).__webglTexture);else if(_.depthBuffer){let qe=_.depthTexture;if(ge.__boundDepthTexture!==qe){if(qe!==null&&b.has(qe)&&(_.width!==qe.image.width||_.height!==qe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");v.setupDepthRenderbuffer(_)}}let Te=_.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(ye=!0);let De=b.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(Array.isArray(De[F])?G=De[F][j]:G=De[F],W=!0):_.samples>0&&v.useMultisampledRTT(_)===!1?G=b.get(_).__webglMultisampledFramebuffer:Array.isArray(De)?G=De[j]:G=De,te.copy(_.viewport),re.copy(_.scissor),de=_.scissorTest}else te.copy(se).multiplyScalar(Me).floor(),re.copy(Oe).multiplyScalar(Me).floor(),de=ze;if(j!==0&&(G=iw),pe.bindFramebuffer(L.FRAMEBUFFER,G)&&pe.drawBuffers(_,G),pe.viewport(te),pe.scissor(re),pe.setScissorTest(de),W){let ge=b.get(_.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+F,ge.__webglTexture,j)}else if(ye){let ge=F;for(let Te=0;Te<_.textures.length;Te++){let De=b.get(_.textures[Te]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Te,De.__webglTexture,j,ge)}}else if(_!==null&&j!==0){let ge=b.get(_.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ge.__webglTexture,j)}z=-1},this.readRenderTargetPixels=function(_,F,j,G,W,ye,Ee,ge=0){if(!(_&&_.isWebGLRenderTarget)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=b.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&Ee!==void 0&&(Te=Te[Ee]),Te){pe.bindFramebuffer(L.FRAMEBUFFER,Te);try{let De=_.textures[ge],qe=De.format,it=De.type;if(_.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ge),!Nt.textureFormatReadable(qe)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Nt.textureTypeReadable(it)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=_.width-G&&j>=0&&j<=_.height-W&&L.readPixels(F,j,G,W,N.convert(qe),N.convert(it),ye)}finally{let De=O!==null?b.get(O).__webglFramebuffer:null;pe.bindFramebuffer(L.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=function(_,F,j,G,W,ye,Ee,ge=0){return ys(this,null,function*(){if(!(_&&_.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=b.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&Ee!==void 0&&(Te=Te[Ee]),Te)if(F>=0&&F<=_.width-G&&j>=0&&j<=_.height-W){pe.bindFramebuffer(L.FRAMEBUFFER,Te);let De=_.textures[ge],qe=De.format,it=De.type;if(_.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ge),!Nt.textureFormatReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Nt.textureTypeReadable(it))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Re=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Re),L.bufferData(L.PIXEL_PACK_BUFFER,ye.byteLength,L.STREAM_READ),L.readPixels(F,j,G,W,N.convert(qe),N.convert(it),0);let At=O!==null?b.get(O).__webglFramebuffer:null;pe.bindFramebuffer(L.FRAMEBUFFER,At);let Yt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),yield yM(L,Yt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Re),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ye),L.deleteBuffer(Re),L.deleteSync(Yt),ye}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")})},this.copyFramebufferToTexture=function(_,F=null,j=0){let G=Math.pow(2,-j),W=Math.floor(_.image.width*G),ye=Math.floor(_.image.height*G),Ee=F!==null?F.x:0,ge=F!==null?F.y:0;v.setTexture2D(_,0),L.copyTexSubImage2D(L.TEXTURE_2D,j,0,0,Ee,ge,W,ye),pe.unbindTexture()};let rw=L.createFramebuffer(),sw=L.createFramebuffer();this.copyTextureToTexture=function(_,F,j=null,G=null,W=0,ye=0){let Ee,ge,Te,De,qe,it,Re,At,Yt,Ht=_.isCompressedTexture?_.mipmaps[ye]:_.image;if(j!==null)Ee=j.max.x-j.min.x,ge=j.max.y-j.min.y,Te=j.isBox3?j.max.z-j.min.z:1,De=j.min.x,qe=j.min.y,it=j.isBox3?j.min.z:0;else{let Zt=Math.pow(2,-W);Ee=Math.floor(Ht.width*Zt),ge=Math.floor(Ht.height*Zt),_.isDataArrayTexture?Te=Ht.depth:_.isData3DTexture?Te=Math.floor(Ht.depth*Zt):Te=1,De=0,qe=0,it=0}G!==null?(Re=G.x,At=G.y,Yt=G.z):(Re=0,At=0,Yt=0);let Dt=N.convert(F.format),vn=N.convert(F.type),Se;F.isData3DTexture?(v.setTexture3D(F,0),Se=L.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(v.setTexture2DArray(F,0),Se=L.TEXTURE_2D_ARRAY):(v.setTexture2D(F,0),Se=L.TEXTURE_2D),pe.activeTexture(L.TEXTURE0),pe.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,F.flipY),pe.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),pe.pixelStorei(L.UNPACK_ALIGNMENT,F.unpackAlignment);let Gn=pe.getParameter(L.UNPACK_ROW_LENGTH),yt=pe.getParameter(L.UNPACK_IMAGE_HEIGHT),si=pe.getParameter(L.UNPACK_SKIP_PIXELS),Li=pe.getParameter(L.UNPACK_SKIP_ROWS),Cr=pe.getParameter(L.UNPACK_SKIP_IMAGES);pe.pixelStorei(L.UNPACK_ROW_LENGTH,Ht.width),pe.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Ht.height),pe.pixelStorei(L.UNPACK_SKIP_PIXELS,De),pe.pixelStorei(L.UNPACK_SKIP_ROWS,qe),pe.pixelStorei(L.UNPACK_SKIP_IMAGES,it);let Ys=_.isDataArrayTexture||_.isData3DTexture,Rt=F.isDataArrayTexture||F.isData3DTexture;if(_.isDepthTexture){let Zt=b.get(_),Tr=b.get(F),Ot=b.get(Zt.__renderTarget),Ar=b.get(Tr.__renderTarget);pe.bindFramebuffer(L.READ_FRAMEBUFFER,Ot.__webglFramebuffer),pe.bindFramebuffer(L.DRAW_FRAMEBUFFER,Ar.__webglFramebuffer);for(let Zs=0;Zs<Te;Zs++)Ys&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,b.get(_).__webglTexture,W,it+Zs),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,b.get(F).__webglTexture,ye,Yt+Zs)),L.blitFramebuffer(De,qe,Ee,ge,Re,At,Ee,ge,L.DEPTH_BUFFER_BIT,L.NEAREST);pe.bindFramebuffer(L.READ_FRAMEBUFFER,null),pe.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(W!==0||_.isRenderTargetTexture||b.has(_)){let Zt=b.get(_),Tr=b.get(F);pe.bindFramebuffer(L.READ_FRAMEBUFFER,rw),pe.bindFramebuffer(L.DRAW_FRAMEBUFFER,sw);for(let Ot=0;Ot<Te;Ot++)Ys?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Zt.__webglTexture,W,it+Ot):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Zt.__webglTexture,W),Rt?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Tr.__webglTexture,ye,Yt+Ot):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Tr.__webglTexture,ye),W!==0?L.blitFramebuffer(De,qe,Ee,ge,Re,At,Ee,ge,L.COLOR_BUFFER_BIT,L.NEAREST):Rt?L.copyTexSubImage3D(Se,ye,Re,At,Yt+Ot,De,qe,Ee,ge):L.copyTexSubImage2D(Se,ye,Re,At,De,qe,Ee,ge);pe.bindFramebuffer(L.READ_FRAMEBUFFER,null),pe.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Rt?_.isDataTexture||_.isData3DTexture?L.texSubImage3D(Se,ye,Re,At,Yt,Ee,ge,Te,Dt,vn,Ht.data):F.isCompressedArrayTexture?L.compressedTexSubImage3D(Se,ye,Re,At,Yt,Ee,ge,Te,Dt,Ht.data):L.texSubImage3D(Se,ye,Re,At,Yt,Ee,ge,Te,Dt,vn,Ht):_.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,ye,Re,At,Ee,ge,Dt,vn,Ht.data):_.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,ye,Re,At,Ht.width,Ht.height,Dt,Ht.data):L.texSubImage2D(L.TEXTURE_2D,ye,Re,At,Ee,ge,Dt,vn,Ht);pe.pixelStorei(L.UNPACK_ROW_LENGTH,Gn),pe.pixelStorei(L.UNPACK_IMAGE_HEIGHT,yt),pe.pixelStorei(L.UNPACK_SKIP_PIXELS,si),pe.pixelStorei(L.UNPACK_SKIP_ROWS,Li),pe.pixelStorei(L.UNPACK_SKIP_IMAGES,Cr),ye===0&&F.generateMipmaps&&L.generateMipmap(Se),pe.unbindTexture()},this.initRenderTarget=function(_){b.get(_).__webglFramebuffer===void 0&&v.setupRenderTarget(_)},this.initTexture=function(_){_.isCubeTexture?v.setTextureCube(_,0):_.isData3DTexture?v.setTexture3D(_,0):_.isDataArrayTexture||_.isCompressedArrayTexture?v.setTexture2DArray(_,0):v.setTexture2D(_,0),pe.unbindTexture()},this.resetState=function(){$=0,Z=0,O=null,pe.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ut._getDrawingBufferColorSpace(e),t.unpackColorSpace=ut._getUnpackColorSpace()}};var GF=["geoCanvas"],JM=(()=>{class n{constructor(t){this.platformId=t,this.currentLookAt=new B(0,0,0),this.activeSection="home"}onWindowScroll(){if(!Ut(this.platformId))return;let t=["home","skills","projects","about","contact","education","experience","certifications","hobbies","aiml","cybersec","websites"],i=window.scrollY+window.innerHeight/3;for(let r of t){let s=document.getElementById(r);if(s&&s.offsetTop<=i&&s.offsetTop+s.offsetHeight>i){this.activeSection=r;break}}}ngAfterViewInit(){Ut(this.platformId)&&this.initGeoCanvas()}ngOnDestroy(){Ut(this.platformId)&&(cancelAnimationFrame(this.animId),this.resizeHandler&&window.removeEventListener("resize",this.resizeHandler),this.mouseHandler&&window.removeEventListener("mousemove",this.mouseHandler),this.pointsGeometry?.dispose(),this.pointsMaterial?.dispose(),this.lineGeometry?.dispose(),this.lineMaterial?.dispose(),this.holoGeometry?.dispose(),this.holoMaterial?.dispose(),this.coreGeometry?.dispose(),this.coreMaterial?.dispose(),this.renderer?.dispose())}initGeoCanvas(){let t=this.canvasRef.nativeElement,i=new Il;this.scene=i;let r=new Cn(60,window.innerWidth/window.innerHeight,1,3e3);r.position.z=500,this.camera=r;let s=new Zf({canvas:t,alpha:!0,antialias:!0});s.setSize(window.innerWidth,window.innerHeight),s.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer=s;let o=new js(6e3,6e3,120,120);this.holoGeometry=o;let a=new On({vertexShader:`
        uniform float uTime;
        varying vec3 vPosition;
        void main() {
          vec3 pos = position;
          float dist = length(pos.xy);
          
          // Cyber wave displacement
          float wave = sin(pos.x * 0.005 + uTime * 1.5) * cos(pos.y * 0.005 + uTime * 1.5) * 50.0;
          wave += sin(pos.x * 0.01 - uTime * 2.0) * 15.0;
          
          // Expanded damping limits so waves remain visible over a larger area
          float damping = smoothstep(0.0, 300.0, dist) * (1.0 - smoothstep(1600.0, 2800.0, dist));
          pos.z += wave * damping;
          
          vPosition = pos;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,fragmentShader:`
        uniform float uTime;
        uniform vec3 uColor;
        varying vec3 vPosition;
        void main() {
          float dist = length(vPosition.xy);
          
          // 1. Grid lines calculation
          vec2 gridCoord = vPosition.xy / 40.0;
          vec2 gridDist = abs(fract(gridCoord - 0.5) - 0.5);
          float lineWidth = 0.06;
          vec2 gridLineVec = smoothstep(lineWidth, 0.0, gridDist);
          float gridLine = max(gridLineVec.x, gridLineVec.y);
          
          // 2. Pulse wave propagating outwards
          float pulse = sin(dist * 0.003 - uTime * 2.0) * 0.5 + 0.5;
          pulse = pow(pulse, 8.0);
          
          // 3. Scanline overlay
          float scanline = sin(vPosition.y * 0.2 + uTime * 6.0) * 0.1 + 0.9;
          
          // 4. Smooth outer fade extended from 1300 to 2800 units
          float fade = 1.0 - smoothstep(400.0, 2800.0, dist);
          
          // Combine final transparency and color
          float alpha = (gridLine * 0.25 + pulse * 0.4) * fade;
          vec3 color = uColor;
          color += vec3(0.5, 0.1, 0.1) * pulse; // Extra glow on pulse wave
          color *= scanline;
          
          if (alpha < 0.01) discard;
          gl_FragColor = vec4(color, alpha);
        }
      `,uniforms:{uTime:{value:0},uColor:{value:new ht(14427686)}},transparent:!0,depthWrite:!1,blending:ds,side:gi});this.holoMaterial=a;let l=new Nn(o,a);l.rotation.x=-Math.PI/2,l.position.y=-450,i.add(l),this.holoPlane=l;let c=new kl(100,26,120,16);this.coreGeometry=c;let u=new Ws({color:14427686,wireframe:!0,transparent:!0,opacity:.35,blending:ds});this.coreMaterial=u;let d=new Nn(c,u);i.add(d),this.coreMesh=d;let f=90,h=140,g=400,x={x:650,y:480,z:350},m=[],p=new Float32Array(f*3);for(let te=0;te<f;te++){let re=(Math.random()-.5)*x.x*2,de=(Math.random()-.5)*x.y*2,be=(Math.random()-.5)*x.z*2;m.push({x:re,y:de,z:be,vx:(Math.random()-.5)*.7,vy:(Math.random()-.5)*.7,vz:(Math.random()-.5)*.7}),p[te*3]=re,p[te*3+1]=de,p[te*3+2]=be}let S=new Tn;S.setAttribute("position",new pn(p,3)),this.pointsGeometry=S;let w=new oa({color:14427686,size:3.5,transparent:!0,opacity:.65,blending:ds,depthWrite:!1});this.pointsMaterial=w;let E=new Ol(S,w);i.add(E);let R=new Float32Array(g*2*3),C=new Float32Array(g*2*3),I=new Tn;I.setAttribute("position",new pn(R,3)),I.setAttribute("color",new pn(C,3)),this.lineGeometry=I;let y=new sa({vertexColors:!0,transparent:!0,blending:ds,depthWrite:!1});this.lineMaterial=y;let A=new Nl(I,y);i.add(A);let k=0,D=0;this.mouseHandler=te=>{k=(te.clientX-window.innerWidth/2)*.35,D=(te.clientY-window.innerHeight/2)*.35},window.addEventListener("mousemove",this.mouseHandler),this.resizeHandler=()=>{r.aspect=window.innerWidth/window.innerHeight,r.updateProjectionMatrix(),s.setSize(window.innerWidth,window.innerHeight)},window.addEventListener("resize",this.resizeHandler);let U=new B(0,0,500),$=new B(0,0,0),Z=1,O=.35,z=1,H=()=>{if(this.activeSection==="home"?(U.set(0,0,500),$.set(0,0,0),Z=1,O=.35,z=.8):this.activeSection==="skills"?(U.set(220,100,420),$.set(100,0,0),Z=1.25,O=.45,z=1.3):this.activeSection==="projects"?(U.set(-300,-180,250),$.set(0,-50,0),Z=2.2,O=.12,z=.6):this.activeSection==="about"?(U.set(0,420,300),$.set(0,0,0),Z=.75,O=.4,z=.5):this.activeSection==="contact"?(U.set(0,0,180),$.set(0,0,0),Z=.55,O=.75,z=2.2):this.activeSection==="education"?(U.set(-260,180,360),$.set(-90,60,0),Z=1,O=.3,z=.5):this.activeSection==="experience"?(U.set(280,-60,320),$.set(110,-20,0),Z=1.45,O=.5,z=.9):this.activeSection==="certifications"?(U.set(-220,-100,300),$.set(-70,-30,0),Z=1.3,O=.45,z=.7):this.activeSection==="hobbies"?(U.set(0,-260,260),$.set(0,-60,0),Z=1.85,O=.55,z=1.6):this.activeSection==="aiml"?(U.set(-320,140,300),$.set(-100,30,0),Z=1.6,O=.4,z=.9):this.activeSection==="cybersec"?(U.set(300,40,260),$.set(110,0,0),Z=2.4,O=.55,z=1.4):this.activeSection==="websites"&&(U.set(0,-220,320),$.set(0,-40,0),Z=1.15,O=.25,z=.7),r.position.lerp(U,.04),this.currentLookAt.lerp($,.04),r.lookAt(this.currentLookAt),r.position.x+=(k-r.position.x)*.02,r.position.y+=(-D-r.position.y)*.02,this.coreMesh){this.coreMesh.rotation.x+=.005,this.coreMesh.rotation.y+=.007;let et=this.coreMesh.scale.x,Me=jf.lerp(et,Z,.04);this.coreMesh.scale.setScalar(Me),this.coreMaterial&&(this.coreMaterial.opacity=jf.lerp(this.coreMaterial.opacity,O,.04))}let te=S.attributes.position,re=I.attributes.position,de=I.attributes.color;for(let et=0;et<f;et++){let Me=m[et];Me.x+=Me.vx*z,Me.y+=Me.vy*z,Me.z+=Me.vz*z,Math.abs(Me.x)>x.x&&(Me.vx*=-1),Math.abs(Me.y)>x.y&&(Me.vy*=-1),Math.abs(Me.z)>x.z&&(Me.vz*=-1),te.setXYZ(et,Me.x,Me.y,Me.z)}te.needsUpdate=!0;let be=0,Ce=0,at=0;for(let et=0;et<f;et++){let Me=m[et];for(let Q=et+1;Q<f;Q++){let he=m[Q],se=Me.x-he.x,Oe=Me.y-he.y,ze=Me.z-he.z,Le=Math.sqrt(se*se+Oe*Oe+ze*ze);if(Le<h&&at<g){re.setXYZ(be,Me.x,Me.y,Me.z),re.setXYZ(be+1,he.x,he.y,he.z),be+=2;let St=(1-Le/h)*.3,tt=220/255*St,xt=38/255*St,Et=38/255*St;this.activeSection==="contact"&&(tt=255/255*St,xt=60/255*St,Et=60/255*St),de.setXYZ(Ce,tt,xt,Et),de.setXYZ(Ce+1,tt,xt,Et),Ce++,Ce++,at++}}}I.setDrawRange(0,at*2),re.needsUpdate=!0,de.needsUpdate=!0,E.rotation.y+=15e-5,A.rotation.y+=15e-5,this.holoMaterial&&(this.holoMaterial.uniforms.uTime.value+=.016),s.render(i,r),this.animId=requestAnimationFrame(H)};H()}static{this.\u0275fac=function(i){return new(i||n)(Ze(an))}}static{this.\u0275cmp=xn({type:n,selectors:[["app-root"]],viewQuery:function(i,r){if(i&1&&R_(GF,5),i&2){let s;yu(s=xu())&&(r.canvasRef=s.first)}},hostBindings:function(i,r){i&1&&ke("scroll",function(){return r.onWindowScroll()},!1,Gi)},standalone:!0,features:[Mn],decls:6,vars:0,consts:[["geoCanvas",""],[2,"position","fixed","inset","0","width","100%","height","100%","pointer-events","none","z-index","1"]],template:function(i,r){i&1&&(q(0,"canvas",1,0)(2,"app-navbar"),M(3,"router-outlet"),q(4,"app-gothic-cursor"),T(),q(5,"app-footer"))},dependencies:[bg,uS,dS,fS],encapsulation:2})}}return n})();lb(JM,cS).catch(console.error);
