(()=>{"use strict";var e,t,o,n,r={721:(e,t,o)=>{o.a(e,(async(e,n)=>{try{o.d(t,{X:()=>e,i:()=>r});const e=await fetch("https://raw.githubusercontent.com/nexpid/VendettaThemeUtil/main/colors/200.0/RawColors.json").then((e=>e.json())),r=await fetch("https://raw.githubusercontent.com/nexpid/VendettaThemeUtil/main/colors/200.0/SemanticColors.json").then((e=>e.json()));n()}catch(e){n(e)}}),1)},983:(e,t,o)=>{o.a(e,(async(e,t)=>{try{var n=o(904),r=o(721),a=e([r]);let i;r=(a.then?(await a)():a)[0];let d={getSColor:e=>u(e,"dark"),getRColor:e=>_(e),getBackground:()=>i?.background,ref:{url:"./assets/ref/name.png",alpha:.5},messages:[{author:{name:"fres",avatarUrl:"https://cdn.discordapp.com/avatars/843448897737064448/520512b700da5b93f1ea5bac0d5849e7.png?size=1024"},timestamp:"Today at 6:21",content:[{content:"Welcome to vd-theme-node",type:"text"}]}]};var c=document.createElement("iframe");c.onload=function(){c.contentWindow.canvasOnLoad((()=>{window.loadTheme=async e=>{i=await fetch(e).then((e=>e.json())),c.contentWindow.targetFunction(d)};const e=document.querySelector("#theme_input");document.querySelector("#theme_load_btn").addEventListener("click",(()=>window.loadTheme(e.value))),c.contentWindow.targetFunction(d);const t=document.querySelector("#ref_alpha");t.addEventListener("input",(function(){d.ref.alpha=t.value/100,c.contentWindow.targetFunction(d)}))})),window.asd=e=>c.contentWindow.targetFunction(e)},c.src="canvas.html",c.width=(0,n.Z)(720)[0],c.height=(0,n.Z)(1466)[0],c.frameBorder="0",c.scrolling="no",document.querySelector("#canvas_container").appendChild(c),window.defaultSemanticColors=r.i,window.defaultRawColors=r.X,window.ctheme=i;const s={BG_BACKDROP:"BACKGROUND_FLOATING",BG_BASE_PRIMARY:"BACKGROUND_PRIMARY",BG_BASE_SECONDARY:"BACKGROUND_SECONDARY",BG_BASE_TERTIARY:"BACKGROUND_SECONDARY_ALT",BG_MOD_FAINT:"BACKGROUND_MODIFIER_ACCENT",BG_MOD_STRONG:"BACKGROUND_MODIFIER_ACCENT",BG_MOD_SUBTLE:"BACKGROUND_MODIFIER_ACCENT",BG_SURFACE_OVERLAY:"BACKGROUND_FLOATING",BG_SURFACE_OVERLAY_TMP:"BACKGROUND_FLOATING",BG_SURFACE_RAISED:"BACKGROUND_MOBILE_PRIMARY"},l={dark:0,light:1,amoled:2,darker:3};function u(e,t){const o=e=>i?.semanticColors?.[e],n=o(e)||o(s[e]);return n?.[l[t]]||"amoled"===t||"darker"===t?n?.[0]:i?.rawColors?.[r.i[e].source[t]]||r.i[e].colors[t]}function _(e){return i?.rawColors?.[e]||r.X[e]}window.getSemanticColor=u,window.getRawColor=_,t()}catch(m){t(m)}}))},904:(e,t,o)=>{function n(...e){return e.map((e=>.5*e))}o.d(t,{Z:()=>n})}},a={};function c(e){var t=a[e];if(void 0!==t)return t.exports;var o=a[e]={exports:{}};return r[e](o,o.exports,c),o.exports}e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",o="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",n=e=>{e&&e.d<1&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},c.a=(r,a,c)=>{var i;c&&((i=[]).d=-1);var d,s,l,u=new Set,_=r.exports,m=new Promise(((e,t)=>{l=t,s=e}));m[t]=_,m[e]=e=>(i&&e(i),u.forEach(e),m.catch((e=>{}))),r.exports=m,a((r=>{var a;d=(r=>r.map((r=>{if(null!==r&&"object"==typeof r){if(r[e])return r;if(r.then){var a=[];a.d=0,r.then((e=>{c[t]=e,n(a)}),(e=>{c[o]=e,n(a)}));var c={};return c[e]=e=>e(a),c}}var i={};return i[e]=e=>{},i[t]=r,i})))(r);var c=()=>d.map((e=>{if(e[o])throw e[o];return e[t]})),s=new Promise((t=>{(a=()=>t(c)).r=0;var o=e=>e!==i&&!u.has(e)&&(u.add(e),e&&!e.d&&(a.r++,e.push(a)));d.map((t=>t[e](o)))}));return a.r?s:c()}),(e=>(e?l(m[o]=e):s(_),n(i)))),i&&i.d<0&&(i.d=0)},c.d=(e,t)=>{for(var o in t)c.o(t,o)&&!c.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},c.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),c(983)})();