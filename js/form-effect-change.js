'use strict';

(function () {
  var levelPin = document.querySelector('.effect-level__pin');
  var levelBar = document.querySelector('.effect-level__line');

  // Изменение глубины эффекта
  levelPin.addEventListener('mousedown', function (evt) {

    evt.preventDefault();

    var limitCords;
    var pinCords;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      limitCords = {
        min: levelBar.offsetLeft - levelPin.offsetWidth,
        max: levelBar.offsetLeft + levelBar.offsetWidth - levelPin.offsetWidth
      };
      pinCords = levelPin.offsetLeft + moveEvt.movementX;

      if (pinCords < limitCords.min) {
        pinCords = limitCords.min;
      }
      if (pinCords > limitCords.max) {
        pinCords = limitCords.max;
      }
      levelPin.style.left = pinCords + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
