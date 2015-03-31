// This file contains JS for styles

// If you want to use included CSS framework, require it from your app

'use strict';

console.log('loading styling effects');



// This section adds wave effect to buttons

var buttons = document.getElementsByClassName('button');

Array.prototype.forEach.call(buttons, function(button){
  button.addEventListener('mousedown', function(event){
    var target = event.target;
    var rect = target.getBoundingClientRect();

    // remove previous wave if any
    var wave = target.querySelector('.wave');
    if (wave) {
      wave.remove();
    }

    // Create new one and give it wave class
    wave = document.createElement('span');
    wave.className = 'wave';
    wave.style.height = wave.style.width = Math.max(rect.width, rect.height) + 'px';
    target.appendChild(wave);
    var top = event.pageY - rect.top - wave.offsetHeight / 2 -  document.body.scrollTop;
    var left = event.pageX - rect.left - wave.offsetWidth / 2 - document.body.scrollLeft;
    wave.style.top = top + 'px';
    wave.style.left = left + 'px';
    return false;
  });
});