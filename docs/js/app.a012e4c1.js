(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["app"],{0:function(e,r,t){e.exports=t("2f39")},"07e2":function(e,r,t){"use strict";(function(e,n){var i=t("ea36");r["a"]=function(){var r=new Worker(e,{}),t=new Worker(n,{}),o=new i["b"](r),s=new i["b"](t);i["c"].registerBridge("BridgePing",o),i["c"].registerBridge("BridgePong",s),i["c"].registerReceiver("WorkerPing","BridgePing"),i["c"].registerReceiver("WorkerPong","BridgePong")}}).call(this,t("83ce"),t("e836"))},"2f39":function(e,r,t){"use strict";t.r(r);var n=t("967e"),i=t.n(n),o=(t("96cf"),t("fa84")),s=t.n(o),a=(t("7d6e"),t("e54f"),t("62f2"),t("7e6d"),t("2b0e")),c=t("b178");a["a"].use(c["b"],{config:{}});var u=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{attrs:{id:"q-app"}},[t("router-view")],1)},f=[],d={name:"App"},g=d,v=t("2877"),h=Object(v["a"])(g,u,f,!1,null,null,null),p=h.exports,l=t("8c4f"),m=[{path:"/",component:function(){return t.e("2d22c0ff").then(t.bind(null,"f241"))},children:[{path:"",component:function(){return t.e("461a5054").then(t.bind(null,"8b24"))}},{path:"component",component:function(){return t.e("2d0d0b65").then(t.bind(null,"68c0"))}},{path:"webworker",component:function(){return t.e("2d217b09").then(t.bind(null,"c897"))}},{path:"complex",component:function(){return t.e("2d212c2d").then(t.bind(null,"aa90"))}}]}];m.push({path:"*",component:function(){return t.e("4b47640d").then(t.bind(null,"e51e"))}});var w=m;a["a"].use(l["a"]);var b=function(){var e=new l["a"]({scrollBehavior:function(){return{x:0,y:0}},routes:w,mode:"hash",base:""});return e},y=function(){var e="function"===typeof b?b({Vue:a["a"]}):b,r={el:"#q-app",router:e,render:function(e){return e(p)}};return{app:r,router:e}},k=t("ea36"),B=function(e){var r=e.Vue;window.broker=r.prototype.$q.broker=k["c"]},R=t("4b04"),E=t("07e2"),x=y(),P=x.app,W=x.router;function M(){return _.apply(this,arguments)}function _(){return _=s()(i.a.mark(function e(){var r,t;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:r=[B,R["a"],E["a"]],t=0;case 2:if(!(t<r.length)){e.next=20;break}if("function"===typeof r[t]){e.next=5;break}return e.abrupt("continue",17);case 5:return e.prev=5,e.next=8,r[t]({app:P,router:W,Vue:a["a"],ssrContext:null});case 8:e.next=17;break;case 10:if(e.prev=10,e.t0=e["catch"](5),!e.t0||!e.t0.url){e.next=15;break}return window.location.href=e.t0.url,e.abrupt("return");case 15:return console.error("[Quasar] boot error:",e.t0),e.abrupt("return");case 17:t++,e.next=2;break;case 20:new a["a"](P);case 21:case"end":return e.stop()}},e,null,[[5,10]])})),_.apply(this,arguments)}M()},"4b04":function(e,r,t){"use strict";(function(e){var n=t("fc74"),i=t.n(n),o=t("59a1"),s=t.n(o),a=t("ea36"),c=t("b178"),u=function(){function e(){i()(this,e)}return s()(e,[{key:"receive",value:function(e){switch(console.log("worker-hander got message ",e),e.action){case"notify":c["a"].create("Found prime: "+e.number);break;case"notifyofrestart":c["a"].create("Reached limit, resarting");break}}},{key:"receivePromise",value:function(e,r,t){console.log("worker-hander got messagePromise ",e),r()}},{key:"start",value:function(){a["c"].send("WorkerRemote",{action:"start"})}},{key:"pause",value:function(){a["c"].send("WorkerRemote",{action:"pause"})}},{key:"restart",value:function(){a["c"].send("WorkerRemote",{action:"restart"})}},{key:"getPrimes",value:function(){return a["c"].sendPromise("WorkerRemote",{action:"getprimes"})}}]),e}();r["a"]=function(r){var t=r.Vue,n=new u;a["c"].registerReceiver("WorkerHandler",n),t.prototype.$worker=n;var i=new Worker(e,{}),o=new a["b"](i);a["c"].registerBridge("MyBridgeForWebWorker",o),a["c"].registerReceiver("WorkerRemote","MyBridgeForWebWorker"),a["c"].registerReceiver("WorkerRemote2","MyBridgeForWebWorker")}}).call(this,t("777a"))},"777a":function(e,r,t){e.exports=t.p+"js/d19ea3aa.0e0cf92b.worker.js"},"7e6d":function(e,r,t){},"83ce":function(e,r,t){e.exports=t.p+"js/1.564b6b8c.worker.js"},e836:function(e,r,t){e.exports=t.p+"js/2.acf93c00.worker.js"},ea36:function(e,r,t){"use strict";t("551c"),t("ac6a"),t("cadf"),t("06db"),t("5df3"),t("f400");var n=t("fc74"),i=t.n(n),o=t("59a1"),s=t.n(o);t("6b54");function a(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}function c(){return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()}var u=function(){function e(){i()(this,e),this.receivers=new Map,this.promises=new Map,this.bridges=new Map}return s()(e,[{key:"registerBridge",value:function(e,r){if(this.bridges.has(e))throw new Error("Bridge ".concat(e," already exists"));if(!(r instanceof d))throw new Error("Bridge ".concat(e," does not inherit BridgeBase"));if(!this.validateBridge(r))throw new Error("Bridge ".concat(e," does not implement correct functions"));this.bridges.set(e,r)}},{key:"deregisterBridge",value:function(e){if(!this.bridges.has(target_name))throw new Error("Bridge ".concat(e," does not exist"));this.bridges.delete(e)}},{key:"getBridge",value:function(e){if(!this.bridges.has(e))throw new Error("Bridge ".concat(e," does not exist"));return this.bridges.get(e)}},{key:"validateBridge",value:function(e){return"function"===typeof e.send}},{key:"compareBridge",value:function(e,r){return!!this.bridges.has(e)&&r===this.bridges.get(e)}},{key:"registerReceiver",value:function(e,r){if(this.receivers.has(e))throw new Error("Target ".concat(e," already exists"));if("string"===typeof r||r instanceof String){if(!this.bridges.has(r))throw new Error("Bridge ".concat(e," does not exist"));this.receivers.set(e,{bridge:this.bridges.get(r),type:"remote"})}else if(r instanceof d){if(!this.validateBridge(r))throw new Error("Bridge ".concat(e," does not implement correct functions"));this.receivers.set(e,{bridge:r,type:"remote"})}else if(r._isVue){if(!this.validateReceiver(r))throw new Error("Target ".concat(e," does not implement correct functions"));this.receivers.set(e,{target:r,type:"vue"})}else{if(!this.validateReceiver(r))throw new Error("Target ".concat(e," does not implement correct functions"));this.receivers.set(e,{target:r,type:"local"})}}},{key:"deregisterReceiver",value:function(e){if(!this.receivers.has(e))throw new Error("Target ".concat(e," does not exist"));this.receivers.delete(e)}},{key:"getReceiver",value:function(e){if(!this.receivers.has(e))throw new Error("Target ".concat(e," does not exist"));return this.receivers.get(e)}},{key:"validateReceiver",value:function(e){return"function"===typeof e.receive&&"function"===typeof e.receivePromise}},{key:"compareReceiver",value:function(e,r){if(!this.receivers.has(e))return!1;var t=this.receivers.get(e);return"remote"===t.type?t.bridge===r:"vue"===t.type?t.target===r:"local"===t.type?t.target===r:void 0}},{key:"listReceivers",value:function(){return this.receivers.keys()}},{key:"send",value:function(e,r){if(!this.receivers.has(e))throw new Error("Target ".concat(e," does not exist"));var t=this.receivers.get(e);"remote"===t.type?t.bridge.send(e,null,r):"vue"===t.type?t.target.receive(r):"local"===t.type&&t.target.receive(r)}},{key:"sendPromise",value:function(e,r){var t=this;return new Promise(function(n,i){if(!t.receivers.has(e))throw new Error("Target ".concat(e," does not exist"));var o=t.receivers.get(e),s=c();"remote"===o.type?(t.promises.set(s,[n,i]),o.bridge.send(e,s,r)):"vue"===o.type?o.target.receivePromise(r,n,i):"local"===o.type&&o.target.receivePromise(r,n,i)})}},{key:"resolvePromise",value:function(e,r){if(!this.promises.has(e))throw new Error("Invalid or expired promise");var t=this.promises.get(e);t[0](r),this.promises.delete(e)}},{key:"rejectPromise",value:function(e,r){if(!this.promises.has(e))throw new Error("Invalid or expired promise");var t=this.promises.get(e);t[1](r),this.promises.delete(e)}}]),e}(),f=new u,d=function(){function e(){i()(this,e)}return s()(e,[{key:"send",value:function(e,r,t){}},{key:"receive",value:function(e){}}]),e}(),g=t("6430"),v=t.n(g),h=t("ffe3"),p=t.n(h),l=t("37d9"),m=t.n(l),w=function(e){function r(e){var t;return i()(this,r),t=v()(this,p()(r).call(this)),t.target=e,t.target.addEventListener("message",function(e){e.target===t.target&&e.data.type&&"QUASAR_BRIDGE"===e.data.type&&t.receive(e.data)},!1),t}return m()(r,e),s()(r,[{key:"send",value:function(e,r,t){this.target.postMessage({type:"QUASAR_BRIDGE",target_name:e,uid:r,message:t})}},{key:"receive",value:function(e){var r=this,t=e.target_name,n=e.uid,i=e.message,o=e.status;n&&o?"RESOLVE"===o?f.resolvePromise(n,i):f.rejectPromise(n,i):n?f.sendPromise(t,i).then(function(e){r.target.postMessage({type:"QUASAR_BRIDGE",uid:n,message:e,status:"RESOLVE"})}).catch(function(e){r.target.postMessage({type:"QUASAR_BRIDGE",uid:n,message:i,status:"REJECT"})}):f.send(t,i)}}]),r}(d);t.d(r,"c",function(){return f}),t.d(r,"a",function(){return d}),t.d(r,"b",function(){return w})}},[[0,"runtime","vendor"]]]);