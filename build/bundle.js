!function(e){function t(n){if(o[n])return o[n].exports;var s=o[n]={exports:{},id:n,loaded:!1};return e[n].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}([function(e,t,o){"use strict";function n(){r=!1;var e=window.pageYOffset;(0,i.checkProject)(e),(0,s.updateScrollMeter)(e),(0,i.checkVisibility)()}var s=o(2),i=o(1),r=void 0;(0,s.setupScrollMeter)(),window.addEventListener("scroll",function(){r||(window.requestAnimationFrame(n),r=!0)}),window.addEventListener("resize",s.resizeUpdate)},function(e,t,o){"use strict";function n(e,t){d[t].className.indexOf(" expanded")==-1?d[t].classList.add("expanded"):d[t].classList.remove("expanded")}function s(e){var t=h!==-1?a[h].offsetTop:0,o=h!==-1?a[h].offsetHeight:a[0].offsetTop;e>t+o?(h!==-1?((0,l.hide)(u[h]),d[h].classList.remove("expanded")):(0,l.showName)(),h++,(0,l.show)(d[h],u[h])):e<t&&((0,l.hide)(d[h],u[h]),d[h].classList.remove("expanded"),h--,h!==-1&&(0,l.show)(u[h]))}function i(e,t,o){e.forEach(function(e,n){var s=(0,l.getElementTop)(e),i=s+e.offsetHeight;s<o&&i>t+50&&(e.classList.remove("scroll--hidden"),e.classList.add("scroll--visible"))})}function r(e,t,o){e.forEach(function(e,n){var s=(0,l.getElementTop)(e),i=s+e.offsetHeight;(t>i||o<s)&&(e.classList.add("scroll--hidden"),e.classList.remove("scroll--visible"))})}function c(){var e=window.pageYOffset,t=e-50,o=e+window.innerHeight-50,n=document.querySelectorAll(".scroll--hidden"),s=document.querySelectorAll(".scroll--visible");i(n,t,o),r(s,t,o)}Object.defineProperty(t,"__esModule",{value:!0}),t.infoPanels=void 0,t.toggleInfoExpansion=n,t.checkProject=s,t.checkHiddenElements=i,t.checkVisibleElements=r,t.checkVisibility=c;var l=o(3),d=t.infoPanels=document.querySelectorAll(".info-panel"),a=document.querySelectorAll(".project"),u=document.querySelectorAll(".bg__text"),f=document.querySelectorAll(".info-panel__expand-button");(0,l.addMultipleEventListeners)(f,"click",function(e,t){return n(e,t)});var h=-1},function(e,t){"use strict";function o(){i.style.strokeDasharray=r,i.style.strokeDashoffset=r}function n(e){var t=Math.max(document.documentElement.clientHeight,document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight),o=t-window.innerHeight,n=e/o;i.style.strokeDashoffset=r-r*n}function s(){clearTimeout(c),c=setTimeout(function(){var e=window.pageYOffset;n(e)},200)}Object.defineProperty(t,"__esModule",{value:!0}),t.setupScrollMeter=o,t.updateScrollMeter=n,t.resizeUpdate=s;var i=document.querySelector(".scroll-meter circle"),r=2*Math.PI*i.r.baseVal.value,c=void 0},function(e,t){"use strict";function o(){for(var e=0;e<arguments.length;e++)arguments[e].classList.add("show"),arguments[e].classList.remove("hide")}function n(){for(var e=0;e<arguments.length;e++)arguments[e].classList.add("hide"),arguments[e].classList.remove("show")}function s(){var e=document.querySelector("header .name text");e.classList.add("show")}function i(e){for(var t=0;e;)t+=e.offsetTop+e.clientTop,e=e.offsetParent;return t}function r(e,t,o){e.forEach(function(e,n){e.addEventListener(t,function(e){o(e,n)})})}Object.defineProperty(t,"__esModule",{value:!0}),t.show=o,t.hide=n,t.showName=s,t.getElementTop=i,t.addMultipleEventListeners=r}]);