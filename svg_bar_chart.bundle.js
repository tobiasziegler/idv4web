!function(e){function t(t){for(var r,i,l=t[0],u=t[1],c=t[2],d=0,p=[];d<l.length;d++)i=l[d],a[i]&&p.push(a[i][0]),a[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);for(s&&s(t);p.length;)p.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,l=1;l<n.length;l++){var u=n[l];0!==a[u]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={12:0},o=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var l=window.webpackJsonp=window.webpackJsonp||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var s=u;o.push([28,0]),n()}({26:function(e,t,n){(e.exports=n(2)(!1)).push([e.i,"input {\n  height: 250px;\n  width: 30px;\n  /* Orient vertically */\n  -webkit-appearance: slider-vertical;\n  writing-mode: bt-lr;\n}\n\nrect {\n  -moz-transition: all 0.25s;\n  -o-transition: all 0.25s;\n  -webkit-transition: all 0.25s;\n  transition: all 0.25s;\n}\n\nrect:hover {\n  fill: orange;\n}\n\n#tooltip {\n  position: absolute;\n  width: 200px;\n  height: auto;\n  padding: 10px;\n  background-color: white;\n  -webkit-border-radius: 10px;\n  -moz-border-radius: 10px;\n  border-radius: 10px;\n  -webkit-box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);\n  -moz-box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);\n  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);\n  pointer-events: none;\n}\n\n#tooltip.hidden {\n  display: none;\n}\n\n#tooltip p {\n  margin: 0;\n  font-family: sans-serif;\n  font-size: 16px;\n  line-height: 20px;\n}\n",""])},27:function(e,t,n){var r=n(26);"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(1)(r,a);r.locals&&(e.exports=r.locals)},28:function(e,t,n){"use strict";var r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(0));n(27);var a=[{key:0,value:5},{key:1,value:10},{key:2,value:13},{key:3,value:19},{key:4,value:21},{key:5,value:25},{key:6,value:22},{key:7,value:18},{key:8,value:15},{key:9,value:13},{key:10,value:11},{key:11,value:12},{key:12,value:15},{key:13,value:20},{key:14,value:18},{key:15,value:17},{key:16,value:16},{key:17,value:18},{key:18,value:23},{key:19,value:25}],o=function(e){return e.key},i=250,l=r.scaleBand().domain(r.range(a.length)).rangeRound([0,600]).paddingInner(.05),u=r.scaleLinear().domain([0,r.max(a,function(e){return e.value})]).range([0,i]),c=r.select("body").append("svg").attr("width",600).attr("height",i);c.selectAll("rect").data(a,o).enter().append("rect").attr("x",function(e,t){return l(t)}).attr("y",function(e){return i-u(e.value)}).attr("width",l.bandwidth()).attr("height",function(e){return u(e.value)}).attr("fill",function(e){return"rgb(0, 0, "+Math.round(10*e.value)+")"}).on("mouseover",function(e){var t=parseFloat(r.select(this).attr("x"))+l.bandwidth()/2,n=parseFloat(r.select(this).attr("y"))/2+125;r.select("#tooltip").style("left",t+"px").style("top",n+"px").select("#value").text(e.value),r.select("#tooltip").classed("hidden",!1)}).on("mouseout",function(){return r.select("#tooltip").classed("hidden",!0)}).on("click",function(){return d()}),r.selectAll("p").on("click",function(){var e=r.select(this).attr("id");if("add"==e){var t=Math.floor(25*Math.random()),n=a[a.length-1].key;a.push({key:n+1,value:t})}else"remove"==e&&a.shift();l.domain(r.range(a.length)),u.domain([0,r.max(a,function(e){return e.value})]);var s=c.selectAll("rect").data(a,o);s.enter().append("rect").attr("x",600).attr("y",function(e){return i-u(e.value)}).attr("width",l.bandwidth()).attr("height",function(e){return u(e.value)}).attr("fill",function(e){return"rgb(0, 0, "+Math.round(10*e.value)+")"}).merge(s).transition().duration(500).attr("x",function(e,t){return l(t)}).attr("y",function(e){return i-u(e.value)}).attr("width",l.bandwidth()).attr("height",function(e){return u(e.value)}),s.exit().transition().duration(500).attr("x",-l.bandwidth()).remove()});var s=!1,d=function(){s=!s,c.selectAll("rect").sort(function(e,t){return s?r.ascending(e.value,t.value):r.descending(e.value,t.value)}).transition().delay(function(e,t){return 50*t}).duration(1e3).attr("x",function(e,t){return l(t)})};r.select("input").on("change",function(){var e=+r.select(this).node().value;c.selectAll("rect").attr("fill",function(e){return"rgb(0, 0, "+10*e.value+")"}).filter(function(t){return t.value<=e}).attr("fill","red")})}});
//# sourceMappingURL=svg_bar_chart.bundle.js.map