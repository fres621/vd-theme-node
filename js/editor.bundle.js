(()=>{"use strict";var e,t,n,o,r={721:(e,t,n)=>{n.a(e,(async(e,o)=>{try{n.d(t,{X:()=>e,i:()=>r});const e=await fetch("https://raw.githubusercontent.com/nexpid/VendettaThemeUtil/main/colors/200.0/RawColors.json").then((e=>e.json())),r=await fetch("https://raw.githubusercontent.com/nexpid/VendettaThemeUtil/main/colors/200.0/SemanticColors.json").then((e=>e.json()));o()}catch(e){o(e)}}),1)},983:(e,t,n)=>{n.a(e,(async(e,t)=>{try{var o=n(904),r=n(721),a=e([r]);let i;r=(a.then?(await a)():a)[0];let d={getSColor:e=>u(e,"dark"),getRColor:e=>m(e),getBackground:()=>i?.background,ref:{url:"./assets/ref/name.png",alpha:1},messages:[{author:{name:"fres",avatarUrl:"https://cdn.discordapp.com/avatars/843448897737064448/520512b700da5b93f1ea5bac0d5849e7.png?size=1024"},timestamp:"Today at 6:21",content:[{content:"Welcome to vd-theme-node",type:"text"}]}]};var c=document.createElement("iframe");c.onload=function(){c.contentWindow.canvasOnLoad((()=>{window.loadTheme=async e=>{var t,n,o;i=await fetch(e).then((e=>e.json())),t=i.name,n=e,o=i.authors,document.getElementById("selected-theme-info").innerHTML="",[["span",{},"Currently selected: "],["a",{href:n},t??n],["span",{}," by "+o.map((e=>e.name)).join(",")]].map((([e,t,n])=>{let o=document.createElement(e);o.innerText=n,Object.keys(t).map((e=>o.setAttribute(e,t[e]))),document.getElementById("selected-theme-info").appendChild(o)})),c.contentWindow.targetFunction(d)};const e=document.querySelector("#theme_input");document.querySelector("#theme_load_btn").addEventListener("click",(()=>window.loadTheme(e.value))),c.contentWindow.targetFunction(d);const t=document.querySelector("#ref_alpha");t.addEventListener("input",(function(){d.ref.alpha=t.value/100,c.contentWindow.targetFunction(d)})),t.addEventListener("change",(function(){d.ref.alpha=t.value/100,c.contentWindow.targetFunction(d)}))})),window.asd=e=>c.contentWindow.targetFunction(e)},c.src="canvas.html?css=css/embed.css",c.width=(0,o.Z)(720)[0],c.height=(0,o.Z)(1466)[0],c.frameBorder="0",c.scrolling="no",document.querySelector("#canvas_container").appendChild(c),window.defaultSemanticColors=r.i,window.defaultRawColors=r.X,window.ctheme=i;const s={BG_BACKDROP:"BACKGROUND_FLOATING",BG_BASE_PRIMARY:"BACKGROUND_PRIMARY",BG_BASE_SECONDARY:"BACKGROUND_SECONDARY",BG_BASE_TERTIARY:"BACKGROUND_SECONDARY_ALT",BG_MOD_FAINT:"BACKGROUND_MODIFIER_ACCENT",BG_MOD_STRONG:"BACKGROUND_MODIFIER_ACCENT",BG_MOD_SUBTLE:"BACKGROUND_MODIFIER_ACCENT",BG_SURFACE_OVERLAY:"BACKGROUND_FLOATING",BG_SURFACE_OVERLAY_TMP:"BACKGROUND_FLOATING",BG_SURFACE_RAISED:"BACKGROUND_MOBILE_PRIMARY"},l={dark:0,light:1,amoled:2,darker:3};function u(e,t){const n=e=>i?.semanticColors?.[e],o=n(e)||n(s[e]);return o?.[l[t]]||"amoled"===t||"darker"===t?o?.[0]:i?.rawColors?.[r.i[e].source[t]]||r.i[e].colors[t]}function m(e){return i?.rawColors?.[e]||r.X[e]}window.getSemanticColor=u,window.getRawColor=m,t()}catch(_){t(_)}}))},904:(e,t,n)=>{function o(...e){return e.map((e=>.5*e))}n.d(t,{Z:()=>o})}},a={};function c(e){var t=a[e];if(void 0!==t)return t.exports;var n=a[e]={exports:{}};return r[e](n,n.exports,c),n.exports}e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",n="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",o=e=>{e&&e.d<1&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},c.a=(r,a,c)=>{var i;c&&((i=[]).d=-1);var d,s,l,u=new Set,m=r.exports,_=new Promise(((e,t)=>{l=t,s=e}));_[t]=m,_[e]=e=>(i&&e(i),u.forEach(e),_.catch((e=>{}))),r.exports=_,a((r=>{var a;d=(r=>r.map((r=>{if(null!==r&&"object"==typeof r){if(r[e])return r;if(r.then){var a=[];a.d=0,r.then((e=>{c[t]=e,o(a)}),(e=>{c[n]=e,o(a)}));var c={};return c[e]=e=>e(a),c}}var i={};return i[e]=e=>{},i[t]=r,i})))(r);var c=()=>d.map((e=>{if(e[n])throw e[n];return e[t]})),s=new Promise((t=>{(a=()=>t(c)).r=0;var n=e=>e!==i&&!u.has(e)&&(u.add(e),e&&!e.d&&(a.r++,e.push(a)));d.map((t=>t[e](n)))}));return a.r?s:c()}),(e=>(e?l(_[n]=e):s(m),o(i)))),i&&i.d<0&&(i.d=0)},c.d=(e,t)=>{for(var n in t)c.o(t,n)&&!c.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},c.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),c(983)})();