!function(e){function t(t){for(var n,c,u=t[0],i=t[1],l=t[2],s=0,p=[];s<u.length;s++)c=u[s],o[c]&&p.push(o[c][0]),o[c]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);for(f&&f(t);p.length;)p.shift()();return a.push.apply(a,l||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],n=!0,u=1;u<r.length;u++){var i=r[u];0!==o[i]&&(n=!1)}n&&(a.splice(t--,1),e=c(c.s=r[0]))}return e}var n={},o={5:0},a=[];function c(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,c),r.l=!0,r.exports}c.m=e,c.c=n,c.d=function(e,t,r){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(c.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(r,n,function(t){return e[t]}.bind(null,n));return r},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var u=window.webpackJsonp=window.webpackJsonp||[],i=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var f=i;a.push([33,0]),r()}({33:function(e,t,r){"use strict";var n=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(r(0));var o=[{name:"Adam"},{name:"Bob"},{name:"Carrie"},{name:"Donovan"},{name:"Edward"},{name:"Felicity"},{name:"George"},{name:"Hannah"},{name:"Iris"},{name:"Jerry"}],a=[{source:0,target:1},{source:0,target:2},{source:0,target:3},{source:0,target:4},{source:1,target:5},{source:2,target:5},{source:2,target:5},{source:3,target:4},{source:5,target:8},{source:5,target:9},{source:6,target:7},{source:7,target:8},{source:8,target:9}],c=n.forceSimulation(o).force("charge",n.forceManyBody()).force("link",n.forceLink(a)).force("center",n.forceCenter().x(250).y(150)),u=n.scaleOrdinal(n.schemeCategory10),i=n.select("body").append("svg").attr("width",500).attr("height",300),l=i.selectAll("line").data(a).enter().append("line").style("stroke","#ccc").style("stroke-width",1),f=i.selectAll("circle").data(o).enter().append("circle").attr("r",10).style("fill",function(e,t){return u(t)}).call(n.drag().on("start",function(e){n.event.active||c.alphaTarget(.3).restart();e.fx=e.x,e.fy=e.y}).on("drag",function(e){e.fx=n.event.x,e.fy=n.event.y}).on("end",function(e){n.event.active||c.alphaTarget(0);e.fx=null,e.fy=null}));f.append("title").text(function(e){return e.name}),c.on("tick",function(){l.attr("x1",function(e){return e.source.x}).attr("y1",function(e){return e.source.y}).attr("x2",function(e){return e.target.x}).attr("y2",function(e){return e.target.y}),f.attr("cx",function(e){return e.x}).attr("cy",function(e){return e.y})})}});
//# sourceMappingURL=force_layout.bundle.js.map