(()=>{"use strict";var t,e,a,o,r={721:(t,e,a)=>{a.a(t,(async(t,o)=>{try{a.d(e,{X:()=>t,i:()=>r});const t=await fetch("https://raw.githubusercontent.com/nexpid/VendettaThemeUtil/main/colors/200.0/RawColors.json").then((t=>t.json())),r=await fetch("https://raw.githubusercontent.com/nexpid/VendettaThemeUtil/main/colors/200.0/SemanticColors.json").then((t=>t.json()));o()}catch(t){o(t)}}),1)},708:(t,e,a)=>{a.a(t,(async(t,e)=>{try{var o=a(91),r=a(278),l=a(721),n=t([l]);function i(t,e){console.log("options",e);const a=document.getElementById("textCanvas"),[l,n]=[a.width,a.height],i=a.getContext("2d");i.clearRect(0,0,l,n),(0,r.Z)({ctx:i,w:l,h:n},e),(0,o.Z)({ctx:i,w:l,h:n},e),i.save(),i.globalAlpha=.7,i.restore()}l=(n.then?(await n)():n)[0],window.setmessages=async()=>{};let c={getSColor:t=>{return e=t,"dark",l.i[e].colors.dark;var e},getRColor:t=>{return e=t,l.X[e];var e},getBackground:()=>{}};window.options=c;let s={};(async()=>{let t=new FontFace("gg-sans","url(assets/fonts/ggsans-Normal.ttf)",{style:"normal",weight:400});document.fonts.add(t),await t.load(),window.targetFunction=t=>{let e=t.getBackground(),a=e?.url;if(a)if(s[a])i(0,{...t,getBackground:()=>({...e,image:s[a]})});else{let o=new Image;o.src=a,s[a]=o,o.onload=function(){i(0,{...t,getBackground:()=>({...e,image:o})})}}else i(0,t)},i(0,c),window._isCanvasLoaded=!0,window._onLoadCallbacks.forEach((t=>t()))})(),e()}catch(h){e(h)}}))},278:(t,e,a)=>{function o({ctx:t,w:e,h:a},{getSColor:o,getBackground:r}){let l=o("BG_BASE_PRIMARY");t.fillStyle=l,t.fillRect(0,0,e,a);let n=r()?.image;if(n){let e=n.width/n.height,a=n.width>n.height?360:Math.floor(680*e),o=n.width>n.height?Math.floor(360*e):680;t.drawImage(n,a-360?-(a-360)/2:0,53,a,o)}}a.d(e,{Z:()=>o})},91:(t,e,a)=>{function o(...t){return t.map((t=>.5*t))}function r({ctx:t,w:e,h:a},{getSColor:r}){let l=r("BG_BASE_PRIMARY"),n=r("INPUT_BACKGROUND"),i=r("REDESIGN_BUTTON_SECONDARY_ALT_BACKGROUND"),c=r("REDESIGN_CHAT_INPUT_BACKGROUND"),s=r("INTERACTIVE_NORMAL"),h=r("REDESIGN_BUTTON_SECONDARY_ALT_TEXT"),f=r("TEXT_MUTED");t.save(),t.shadowColor=n,t.shadowBlur=0,t.shadowOffsetY=-2,t.fillStyle=l,t.fillRect(0,680,e,a),t.restore(),t.save(),t.fillStyle=c,t.beginPath(),t.roundRect(...o(105,1372.5,510,75.6),100),t.fill(),t.fillStyle=i,t.beginPath(),t.arc(...o(53.5,1410.5,37.4),0,2*Math.PI),t.fill(),t.beginPath(),t.arc(...o(668.5,1410.5,37.4),0,2*Math.PI),t.fill(),t.font=`${o(30)}px gg-sans`,t.fillStyle=f,t.fillText("Message @uwu",...o(131,1422)),t.fillStyle=h,t.fillRect(...o(40,1409,27,3)),t.fillRect(...o(52,1397,3,27)),t.beginPath(),t.arc(...o(668.5,1410.6,11),0,1*Math.PI),t.lineWidth=o(3.5)[0],t.strokeStyle=h,t.stroke(),t.fillRect(...o(666.5,1420,4,9)),t.beginPath(),t.roundRect(...o(663,1394,11,23,100)),t.fill(),t.fillStyle=s,t.beginPath(),t.arc(...o(576.5,1410.5,19),0,2*Math.PI),t.fill(),t.fillStyle=c,t.beginPath(),t.arc(...o(569,1403,3.6),0,2*Math.PI),t.fill(),t.beginPath(),t.arc(...o(584,1403,3.6),0,2*Math.PI),t.fill(),t.beginPath(),t.arc(...o(576.5,1412.5,11),0,1*Math.PI),t.fill(),t.restore()}a.d(e,{Z:()=>r})}},l={};function n(t){var e=l[t];if(void 0!==e)return e.exports;var a=l[t]={exports:{}};return r[t](a,a.exports,n),a.exports}t="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",e="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",a="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",o=t=>{t&&t.d<1&&(t.d=1,t.forEach((t=>t.r--)),t.forEach((t=>t.r--?t.r++:t())))},n.a=(r,l,n)=>{var i;n&&((i=[]).d=-1);var c,s,h,f=new Set,d=r.exports,g=new Promise(((t,e)=>{h=e,s=t}));g[e]=d,g[t]=t=>(i&&t(i),f.forEach(t),g.catch((t=>{}))),r.exports=g,l((r=>{var l;c=(r=>r.map((r=>{if(null!==r&&"object"==typeof r){if(r[t])return r;if(r.then){var l=[];l.d=0,r.then((t=>{n[e]=t,o(l)}),(t=>{n[a]=t,o(l)}));var n={};return n[t]=t=>t(l),n}}var i={};return i[t]=t=>{},i[e]=r,i})))(r);var n=()=>c.map((t=>{if(t[a])throw t[a];return t[e]})),s=new Promise((e=>{(l=()=>e(n)).r=0;var a=t=>t!==i&&!f.has(t)&&(f.add(t),t&&!t.d&&(l.r++,t.push(l)));c.map((e=>e[t](a)))}));return l.r?s:n()}),(t=>(t?h(g[a]=t):s(d),o(i)))),i&&i.d<0&&(i.d=0)},n.d=(t,e)=>{for(var a in e)n.o(e,a)&&!n.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n(708)})();