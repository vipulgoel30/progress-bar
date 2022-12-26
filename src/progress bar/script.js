"use strict";
let percentage=0;
const loaderItems=[...document.querySelectorAll('[class^="progress__load--"]')];
const interval=setInterval(()=>{
      percentage++;
      if(percentage<=25){
          const item=loaderItems[0];

          const rotateValue=(Number.parseFloat(getComputedStyle(item).rotate))-((90/25))+'deg';
           console.log(rotateValue);
          item.style.rotate=rotateValue;
      }
},100);
setTimeout(()=>{
clearInterval(interval);
},10000)