(this.webpackJsonpcollapsenonmerci=this.webpackJsonpcollapsenonmerci||[]).push([[0],{201:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),l=t(34),c=t.n(l),o=(t(88),t(37)),i=(t(89),t(2)),s=function(){return Object(i.jsx)("div",{className:"slider-wrapper",children:Object(i.jsx)("div",{className:"slider",children:Array.from(Array(100).keys()).map((function(e,a){return Object(i.jsx)("div",{className:"slider-item",children:" Collapse non merci ! "},a)}))})})},u=t(3),d=t(13),b=t(217),f=t(215),h="0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)",j=[{value:0},{value:25},{value:50},{value:75},{value:100}],p=Object(f.a)({root:{color:function(e){return e.color},height:2,padding:"15px 0",width:200},thumb:{height:28,width:28,backgroundColor:"#fff",boxShadow:h,marginTop:-14,marginLeft:-14,"&:focus, &:hover, &$active":{boxShadow:"0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)","@media (hover: none)":{boxShadow:h}}},active:{},valueLabel:{left:"calc(-50% + 12px)",top:-18,"& *":{background:"rgba(255,255,255, 0)",color:"#000"}},track:{height:2},rail:{height:2,opacity:.5,backgroundColor:"#bfbfbf"},mark:{backgroundColor:"#bfbfbf",height:8,width:1,marginTop:-3},markActive:{opacity:1,backgroundColor:"currentColor"}});function g(e){var a=e.value,t=e.setValue,r=e.action,n=p(r);return Object(i.jsxs)("div",{style:{marginBottom:"2rem"},children:[Object(i.jsx)("div",{style:{marginBottom:"1.5rem"},children:r.label}),Object(i.jsx)(b.a,{classes:n,defaultValue:a,onChange:function(e,a){t(r,a)},"aria-label":"ios slider",marks:j,valueLabelDisplay:"on"})]})}var v=t(23);v.b.font.family="mattoneregular",v.b.font.size=18;var m={plugins:{legend:{display:!1,position:"bottom",labels:{font:{size:40}}}}},x=function(e){var a=e.datasets,t=e.chartRef,r=e.playRef;return Object(i.jsxs)("div",{className:"main-chart-wrapper",children:[0===a.length&&Object(i.jsxs)("div",{ref:function(e){null!==e&&(r.current=e)},className:"play",children:["Jouez avec les options ",Object(i.jsx)("br",{}),Object(i.jsx)("div",{className:"text-center arrow-wrapper",children:Object(i.jsx)("span",{className:"arrow arrow-bar is-bottom"})})]}),Object(i.jsx)(v.a,{ref:function(e){null!==e&&(t.current=e)},data:{labels:["Empreinte carbone"],datasets:a},options:m})]})},O=function(e,a){var t=e.datasets.map((function(e){return e.label[0]}));t.length!==a.length&&a.length>t.length?a.filter((function(e){return!t.includes(e.label)})).forEach((function(a){t.push(a.label),e.datasets.push({barPercentage:.5,barThickness:30,label:[a.label],backgroundColor:[a.color],borderColor:[a.color],borderWidth:1,hoverBackgroundColor:[a.color],hoverBorderColor:[a.color],data:[a.value]})})):t.length===a.length&&e.datasets.find((function(e){return a.forEach((function(a){return a.value!==e.data[0]&&a.label===e.label[0]&&(e.data[0]=a.value,!0)}))}))},y=function(e){var a=e.actions,t=Object(r.useRef)(null),n=Object(r.useRef)(null),l=[],c=function(e,a){var r=l.filter((function(a){return a.label===e.label}));(r=0===r.length?Object(d.a)({},e):r[0]).value=e.value*a,l=[].concat(Object(u.a)(l.filter((function(a){return a.label!==e.label}))),[r]),O(t.current.config.data,l),t.current.config.data.datasets=t.current.config.data.datasets.sort((function(e,a){return a.data[0]-e.data[0]})),"none"!==n.current.style.display&&(n.current.style.display="none"),t.current.update()};return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(x,{playRef:n,chartRef:t,datasets:[]}),Object(i.jsx)("div",{className:"d-flex input-sliders-wrapper",children:a.map((function(e,a){return Object(i.jsx)("div",{style:{marginRight:"1.5rem"},children:Object(i.jsx)(g,{action:e,value:e.value,setValue:c})},a)}))})]})},k=function(){return Object(i.jsx)("div",{className:"loader",children:Object(i.jsx)("div",{className:"slider-wrapper",children:Object(i.jsx)("div",{className:"slider",children:Array.from(Array(100).keys()).map((function(e,a){return Object(i.jsx)("div",{className:"slider-item",children:":)"},a)}))})})})},w=[{label:"Arr\xeater de manger de la viande",value:40,color:"rgb(255,103,0)"},{label:"Se d\xe9placer \xe0 cheval",value:30,color:"rgb(128,0,255, 1)"},{label:"Pipi sous la douche",value:2,color:"rgb(255,250,0)"}];var C=function(){var e=Object(r.useState)(!1),a=Object(o.a)(e,2),t=a[0],n=a[1];return Object(r.useEffect)((function(){setInterval((function(){n(!0)}),1e3)}),[]),Object(i.jsxs)("div",{className:"App",children:[!t&&Object(i.jsx)(k,{}),Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(s,{}),Object(i.jsx)(y,{actions:w})]})]})},N=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,219)).then((function(a){var t=a.getCLS,r=a.getFID,n=a.getFCP,l=a.getLCP,c=a.getTTFB;t(e),r(e),n(e),l(e),c(e)}))};c.a.render(Object(i.jsx)(n.a.StrictMode,{children:Object(i.jsx)(C,{})}),document.getElementById("root")),N()},88:function(e,a,t){},89:function(e,a,t){}},[[201,1,2]]]);
//# sourceMappingURL=main.a9841628.chunk.js.map