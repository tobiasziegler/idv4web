!function(t){function e(e){for(var n,l,a=e[0],i=e[1],c=e[2],p=0,s=[];p<a.length;p++)l=a[p],o[l]&&s.push(o[l][0]),o[l]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n]);for(f&&f(e);s.length;)s.shift()();return u.push.apply(u,c||[]),r()}function r(){for(var t,e=0;e<u.length;e++){for(var r=u[e],n=!0,a=1;a<r.length;a++){var i=r[a];0!==o[i]&&(n=!1)}n&&(u.splice(e--,1),t=l(l.s=r[0]))}return t}var n={},o={13:0},u=[];function l(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,l),r.l=!0,r.exports}l.m=t,l.c=n,l.d=function(t,e,r){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},l.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(l.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)l.d(r,n,function(e){return t[e]}.bind(null,n));return r},l.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="";var a=window.webpackJsonp=window.webpackJsonp||[],i=a.push.bind(a);a.push=e,a=a.slice();for(var c=0;c<a.length;c++)e(a[c]);var f=i;u.push([29,0]),r()}({29:function(t,e,r){"use strict";(function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e})(r(0)).select("body").append("svg").attr("width",500).attr("height",50).selectAll("circle").data([5,10,15,20,25]).enter().append("circle").attr("cx",function(t,e){return 50*e+25}).attr("cy",25).attr("r",function(t){return t}).attr("fill","yellow").attr("stroke","orange").attr("stroke-width",function(t){return t/2})}});
//# sourceMappingURL=circles.bundle.js.map