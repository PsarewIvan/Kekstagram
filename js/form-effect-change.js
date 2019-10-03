'use strict';

(function () {
  var levelPin = document.querySelector('.effect-level__pin');
  var levelBar = document.querySelector('.effect-level__line');
  var levelValue = document.querySelector('.effect-level__value');

  // Меняет глубину эффекта в стилях
  var changeEffectValue = function () {
    var effectsClassNames = window.form.getEffectsClassNames();
    var userImg = window.form.userUploadImg;

    for (var i = 0; i < effectsClassNames.length; i++) {
      if (userImg.classList.contains(effectsClassNames[i])) {
        window.form.addFIlterDepth(userImg, levelValue.value, i);
      }
    }
  };

  // Запускает изменение эффектов
  levelPin.addEventListener('mousedown', function (evt) {

    evt.preventDefault();

    var limitCords;
    var pinCords;
    var ratio;

    // Двигает пин и записывает значение от 1 до 100 в инпут
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      limitCords = {
        min: levelBar.offsetLeft - levelPin.offsetWidth,
        max: levelBar.offsetLeft + levelBar.offsetWidth - levelPin.offsetWidth
      };
      ratio = (limitCords.max - limitCords.min) / 100;
      pinCords = levelPin.offsetLeft + moveEvt.movementX;

      if (pinCords < limitCords.min) {
        pinCords = limitCords.min;
      }
      if (pinCords > limitCords.max) {
        pinCords = limitCords.max;
      }
      levelValue.value = Math.floor(pinCords / ratio); // Записывает значение: 0..100
      levelPin.style.left = pinCords + 'px';
      changeEffectValue();
    };

    // Выключает изменение эффектов
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
