!function(t){function r(r){for(var a,o,l=r[0],c=r[1],u=r[2],s=0,p=[];s<l.length;s++)o=l[s],e[o]&&p.push(e[o][0]),e[o]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);for(f&&f(r);p.length;)p.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var t,r=0;r<i.length;r++){for(var n=i[r],a=!0,l=1;l<n.length;l++){var c=n[l];0!==e[c]&&(a=!1)}a&&(i.splice(r--,1),t=o(o.s=n[0]))}return t}var a={},e={12:0},i=[];function o(r){if(a[r])return a[r].exports;var n=a[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=a,o.d=function(t,r,n){o.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,r){if(1&r&&(t=o(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var a in t)o.d(n,a,function(r){return t[r]}.bind(null,a));return n},o.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(r,"a",r),r},o.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},o.p="";var l=window.webpackJsonp=window.webpackJsonp||[],c=l.push.bind(l);l.push=r,l=l.slice();for(var u=0;u<l.length;u++)r(l[u]);var f=c;i.push([15,0]),n()}({15:function(t,r,n){"use strict";n.r(r);for(var a=n(0),e=(n(16),[]),i=0;i<50;i++){var o=Math.random(),l=Math.random();e.push([o,l])}var c=300,u=a.A().domain([0,1]).range([40,420]),f=a.A().domain([0,1]).range([260,40]),s=a.D().domain([0,a.v(e,function(t){return t[1]})]).range([0,10]),p=a.d().scale(u).ticks(5),d=a.e().scale(f).ticks(5),h=a.p(".1%");p.tickFormat(h),d.tickFormat(h);var v=a.G("body").append("svg").attr("width",500).attr("height",c);v.append("clipPath").attr("id","chart-area").append("rect").attr("x",40).attr("y",40).attr("width",380).attr("height",220);var b=v.append("g").attr("id","circles").attr("clip-path","url(#chart-area)").selectAll("circle").data(e).enter().append("circle").attr("cx",function(t){return u(t[0])}).attr("cy",function(t){return f(t[1])}).attr("r",function(t){return s(t[1])});v.append("g").attr("class","x axis").attr("transform","translate(0,260)").call(p),v.append("g").attr("class","y axis").attr("transform","translate(40,0)").call(d),a.G("p").on("click",function(){e=[];for(var t=0;t<50;t++){var r=Math.random(),n=Math.random();e.push([r,n])}v.selectAll("circle").data(e).transition().duration(1e3).on("start",function(){a.G(this).attr("fill","magenta").attr("r",7)}).attr("cx",function(t){return u(t[0])}).attr("cy",function(t){return f(t[1])}).transition().duration(1e3).attr("fill","black").attr("r",2),v.select(".x.axis").transition().duration(1e3).call(p),v.select(".y.axis").transition().duration(1e3).call(d)}),a.H("input").on("click",function(){var t=a.G(this).node().value;b.attr("fill","black");var r=a.F;switch(t){case"centre":b.filter(function(t){return Math.abs(.5-t[0])<.3&&Math.abs(.5-t[1])<.3}).attr("fill",r[1]);break;case"edges":b.filter(function(t){return Math.abs(.5-t[0])>.3||Math.abs(.5-t[1])>.3}).attr("fill",r[3]);break;case"quadrants":b.filter(function(t){return t[0]<=.5&&t[1]>=.5}).attr("fill",r[0]),b.filter(function(t){return t[0]>.5&&t[1]>=.5}).attr("fill",r[1]),b.filter(function(t){return t[0]>.5&&t[1]<.5}).attr("fill",r[2]),b.filter(function(t){return t[0]<=.5&&t[1]<.5}).attr("fill",r[3])}})},16:function(t,r,n){var a=n(17);"string"==typeof a&&(a=[[t.i,a,""]]);var e={hmr:!0,transform:void 0,insertInto:void 0};n(2)(a,e);a.locals&&(t.exports=a.locals)},17:function(t,r,n){(t.exports=n(1)(!1)).push([t.i,"p {\n  font-family: Helvetica, sans-serif;\n  font-size: 12px;\n}\n\ninput[type='radio'] {\n  margin-left: 40px;\n}\n",""])}});
//# sourceMappingURL=scatterplot.bundle.js.map