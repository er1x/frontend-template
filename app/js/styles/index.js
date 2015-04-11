// This file contains JS for styles

// If you want to use included CSS framework, require it from your app

'use strict';


(function(window, document) {

    console.log('loading styling effects');

    var buttons      = document.getElementsByClassName('button');
    var menubarLinks = document.getElementsByClassName('menubar-link--accordion');
    var menubarSliderButton = document.getElementsByClassName('menubar-slider');

    // Wave effect for buttons
    Array.prototype.forEach.call(buttons, function(button){
      button.addEventListener('mousedown', function(event){
        var target = event.target;
        var rect   = target.getBoundingClientRect();

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

    // Menubar accordion
    Array.prototype.forEach.call(menubarLinks, function(anchor){
      anchor.addEventListener('click', function(event){
        var target = event.target;
        var submenu = target.nextSibling.nextSibling;
        submenu.classList.toggle('opened');
        return false;
      });
    });

    // Menubar visibility in mobile
    menubarSliderButton[0].addEventListener('click', function(){
      var el = document.querySelector('.menubar > ul');
      if (el.style.display === 'block') {
        el.style.display = 'none';
        menubarSliderButton[0].innerHTML = '<i>-&gt;</i>';
      } else {
        el.style.display = 'block';
        menubarSliderButton[0].innerHTML = '<i>-&lt;</i>';
      }
    });

})(window, document);
