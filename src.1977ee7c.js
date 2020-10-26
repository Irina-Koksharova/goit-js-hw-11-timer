parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Tnu0":[function(require,module,exports) {

},{}],"JyuG":[function(require,module,exports) {
var r=c.getContext("webgl",{preserveDrawingBuffer:!0}),e=c.width=window.innerWidth,t=c.height=window.innerHeight,a={},i={projectileAlpha:.8,projectileLineWidth:1.3,fireworkAngleSpan:.5,baseFireworkVel:3,addedFireworkVel:3,gravity:.03,lowVelBoundary:-.2,xFriction:.995,baseShardVel:1,addedShardVel:.2,fireworks:1e3,baseShardsParFirework:10,addedShardsParFirework:10,shardFireworkVelMultiplier:.3,initHueMultiplier:1/360,runHueAdder:.1/360};a.vertexShaderSource="\nuniform int u_mode;\nuniform vec2 u_res;\nattribute vec4 a_data;\nvarying vec4 v_color;\n\nvec3 h2rgb( float h ){\n\treturn clamp( abs( mod( h * 6. + vec3( 0, 4, 2 ), 6. ) - 3. ) -1., 0., 1. );\n}\nvoid clear(){\n\tgl_Position = vec4( a_data.xy, 0, 1 );\n\tv_color = vec4( 0, 0, 0, a_data.w );\n}\nvoid draw(){\n\tgl_Position = vec4( vec2( 1, -1 ) * ( ( a_data.xy / u_res ) * 2. - 1. ), 0, 1 );\n\tv_color = vec4( h2rgb( a_data.z ), a_data.w );\n}\nvoid main(){\n\tif( u_mode == 0 )\n\t\tdraw();\n\telse\n\t\tclear();\n}\n",a.fragmentShaderSource="\nprecision mediump float;\nvarying vec4 v_color;\n\nvoid main(){\n\tgl_FragColor = v_color;\n}\n",a.vertexShader=r.createShader(r.VERTEX_SHADER),r.shaderSource(a.vertexShader,a.vertexShaderSource),r.compileShader(a.vertexShader),a.fragmentShader=r.createShader(r.FRAGMENT_SHADER),r.shaderSource(a.fragmentShader,a.fragmentShaderSource),r.compileShader(a.fragmentShader),a.shaderProgram=r.createProgram(),r.attachShader(a.shaderProgram,a.vertexShader),r.attachShader(a.shaderProgram,a.fragmentShader),r.linkProgram(a.shaderProgram),r.useProgram(a.shaderProgram),a.dataAttribLoc=r.getAttribLocation(a.shaderProgram,"a_data"),a.dataBuffer=r.createBuffer(),r.enableVertexAttribArray(a.dataAttribLoc),r.bindBuffer(r.ARRAY_BUFFER,a.dataBuffer),r.vertexAttribPointer(a.dataAttribLoc,4,r.FLOAT,!1,0,0),a.resUniformLoc=r.getUniformLocation(a.shaderProgram,"u_res"),a.modeUniformLoc=r.getUniformLocation(a.shaderProgram,"u_mode"),r.viewport(0,0,e,t),r.uniform2f(a.resUniformLoc,e,t),r.blendFunc(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA),r.enable(r.BLEND),r.lineWidth(i.projectileLineWidth),a.data=[],a.clear=function(){r.uniform1i(a.modeUniformLoc,1);var e=.1;a.data=[-1,-1,0,e,1,-1,0,e,-1,1,0,e,-1,1,0,e,1,-1,0,e,1,1,0,e],a.draw(r.TRIANGLES),r.uniform1i(a.modeUniformLoc,0),a.data.length=0},a.draw=function(e){r.bufferData(r.ARRAY_BUFFER,new Float32Array(a.data),r.STATIC_DRAW),r.drawArrays(e,0,a.data.length/4)};for(var h=[],o=0,n=[],d=[],s=i.baseShardsParFirework+i.addedShardsParFirework,u=6.283185307179586,l=0;l<s;++l)n[l]=Math.sin(u*l/s),d[l]=Math.cos(u*l/s);function m(){this.reset(),this.shards=[];for(var r=0;r<s;++r)this.shards.push(new v(this))}function v(r){this.parent=r}function f(){window.requestAnimationFrame(f),a.clear(),++o,h.length<i.fireworks&&h.push(new m),h.map(function(r){r.step()}),a.draw(r.LINES)}m.prototype.reset=function(){var r=-Math.PI/2+(Math.random()-.5)*i.fireworkAngleSpan,a=i.baseFireworkVel+i.addedFireworkVel*Math.random();this.mode=0,this.vx=a*Math.cos(r),this.vy=a*Math.sin(r),this.x=Math.random()*e,this.y=t,this.hue=o*i.initHueMultiplier},m.prototype.step=function(){if(0===this.mode){var r=this.hue,e=this.x,t=this.y;if(this.hue+=i.runHueAdder,this.x+=this.vx*=i.xFriction,this.y+=this.vy+=i.gravity,a.data.push(e,t,r,.2*i.projectileAlpha,this.x,this.y,this.hue,.2*i.projectileAlpha),this.vy>=i.lowVelBoundary){this.mode=1,this.shardAmount=i.baseShardsParFirework+i.addedShardsParFirework*Math.random()|0;for(var h=Math.random()*u,o=Math.cos(h),s=Math.sin(h),c=n[this.shardAmount],l=d[this.shardAmount],m=0;m<this.shardAmount;++m){var v=i.baseShardVel+i.addedShardVel*Math.random();this.shards[m].reset(o*v,s*v);var f=o;o=o*l-s*c,s=s*l+f*c}}}else if(1===this.mode){this.ph=this.hue,this.hue+=i.runHueAdder;var p=!0;for(m=0;m<this.shardAmount;++m){var w=this.shards[m];w.dead||(w.step(),p=!1)}p&&this.reset()}},v.prototype.reset=function(r,e){this.x=this.parent.x,this.y=this.parent.y,this.vx=this.parent.vx*i.shardFireworkVelMultiplier+r,this.vy=this.parent.vy*i.shardFireworkVelMultiplier+e,this.starty=this.y,this.dead=!1,this.tick=1},v.prototype.step=function(){this.tick+=.05;var r=this.x,e=this.y;this.x+=this.vx*=i.xFriction,this.y+=this.vy+=i.gravity;this.y,this.starty,this.starty;a.data.push(r,e,this.parent.ph,i.projectileAlpha/this.tick,this.x,this.y,this.parent.hue,i.projectileAlpha/this.tick),this.y>t&&(this.dead=!0)},f(),window.addEventListener("resize",function(){e=c.width=window.innerWidth,t=c.height=window.innerHeight,r.viewport(0,0,e,t),r.uniform2f(a.resUniformLoc,e,t)}),window.addEventListener("click",function(r){var e=new m;e.x=r.clientX,e.y=r.clientY,e.vx=0,e.vy=0,h.push(e)});
},{}],"Focm":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function n(e,n,s){return n&&t(e.prototype,n),s&&t(e,s),e}require("./styles.css"),require("normalize.css"),require("./js/canvas.js");var s={days:document.querySelector('[data-value="days"]'),hours:document.querySelector('[data-value="hours"]'),mins:document.querySelector('[data-value="mins"]'),secs:document.querySelector('[data-value="secs"]')},o=1e3,a=function(){function t(n){var s=n.selector,o=n.saleTime,a=n.updateTimer;e(this,t),this.selector=s,this.saleTime=o,this.updateTimer=a}return n(t,[{key:"start",value:function(){var e=this;setInterval(function(){var t=e.getTimeComponents(e.saleTime.getTime()-Date.now()),n=t.days,s=t.hours,o=t.mins,a=t.secs;e.updateTimer({days:n,hours:s,mins:o,secs:a})},o)}},{key:"getTimeComponents",value:function(e){return{days:this.formatTimeComponents(Math.floor(e/864e5)),hours:this.formatTimeComponents(Math.floor(e%864e5/36e5)),mins:this.formatTimeComponents(Math.floor(e%36e5/6e4)),secs:this.formatTimeComponents(Math.floor(e%6e4/1e3))}}},{key:"formatTimeComponents",value:function(e){return String(e).padStart(2,"0")}}]),t}();function r(e){var t=e.days,n=e.hours,o=e.mins,a=e.secs;s.days.textContent="".concat(t),s.hours.textContent="".concat(n),s.mins.textContent="".concat(o),s.secs.textContent="".concat(a)}var i=new a({selector:"#timer-1",saleTime:new Date(2021,0,1),updateTimer:r});i.start();
},{"./styles.css":"Tnu0","normalize.css":"Tnu0","./js/canvas.js":"JyuG"}]},{},["Focm"], null)
//# sourceMappingURL=/goit-js-hw-11-timer/src.1977ee7c.js.map