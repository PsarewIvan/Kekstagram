'use strict';

(function () {
  var levelPin = document.querySelector('.effect-level__pin');

  // Изменение глубины эффекта
  levelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCords = {
      x: evt.clientX
    };
    var rightRange = startCords.x;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCords.x - moveEvt.clientX
      };

      startCords = {
        x: moveEvt.clientX
      };

      console.log(rightRange + ':' + startCords.x);

      if (shift.x <= rightRange) {
        levelPin.style.left = (levelPin.offsetLeft - shift.x) + 'px';
      }
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
