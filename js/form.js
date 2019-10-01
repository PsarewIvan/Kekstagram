'use strict';

// Работа с формой
(function () {
  var buttonImgScaleSmaller = document.querySelector('.scale__control--smaller');
  var buttonImgScaleBigger = document.querySelector('.scale__control--bigger');

  var MIN_IMG_SCALE = 25;
  var MAX_IMG_SCALE = 100;
  var IMG_SCALE_STEP = 25;

  var effectsFieldset = document.querySelector('.img-upload__effects');
  var effectSlider = document.querySelector('.img-upload__effect-level');

  // Переменные для работы с формой
  window.form = {
    userUploadImg: document.querySelector('.js__user-upload-img'),
    imgScaleValue: document.querySelector('.scale__control--value'),
    EFFECT_VALUE: {
      imgScale: '100',
      effect: 'effect-none',
      effectLevel: '100',
      hashtags: '',
      comment: ''
    },

    effectsClassNames: [
      'effects__preview--chrome',
      'effects__preview--sepia',
      'effects__preview--marvin',
      'effects__preview--phobos',
      'effects__preview--heat'
    ],

    removeImgEffects: function () {
      var imgClassList = this.userUploadImg.classList;
      for (var i = 0; i < this.effectsClassNames.length; i++) {
        if (imgClassList.contains(this.effectsClassNames[i])) {
          imgClassList.remove(this.effectsClassNames[i]);
        }
      }
    },

    hideEffectSlider: function () {
      effectSlider.classList.add('hidden');
    }
  }

  // Редактируем масштаб загружаемого изображения
  var doImgScaleSmaller = function () {
    var scaleValue = +window.form.imgScaleValue.getAttribute('value').slice(0, -1);
    if (scaleValue > MIN_IMG_SCALE) {
      var newScaleValue = scaleValue - IMG_SCALE_STEP;
      window.form.imgScaleValue.setAttribute('value', newScaleValue + '%');
      window.form.userUploadImg.setAttribute('style', 'transform: scale(' + newScaleValue / 100 + ')');
    }
  };

  var doImgScaleBigger = function () {
    var scaleValue = +window.form.imgScaleValue.getAttribute('value').slice(0, -1);
    if (scaleValue < MAX_IMG_SCALE) {
      var newScaleValue = scaleValue + IMG_SCALE_STEP;
      window.form.imgScaleValue.setAttribute('value', newScaleValue + '%');
      window.form.userUploadImg.setAttribute('style', 'transform: scale(' + newScaleValue / 100 + ')');
    }
  };

  buttonImgScaleSmaller.addEventListener('click', function () {
    doImgScaleSmaller();
  });

  buttonImgScaleBigger.addEventListener('click', function () {
    doImgScaleBigger();
  });

  // Наложение эффекта на изображение
  var addEffectClassMod = function (mod) {
    effectSlider.classList.remove('hidden');
    window.form.userUploadImg.classList.add('effects__preview--' + mod)
  };

  var changeImgEffects = function (evt) {
    if (evt.target.value == 'none') {
      window.form.removeImgEffects();
      window.form.hideEffectSlider();
    } else if (evt.target.value == 'chrome') {
      addEffectClassMod('chrome')
    } else if (evt.target.value == 'sepia') {
      addEffectClassMod('sepia')
    } else if (evt.target.value == 'marvin') {
      addEffectClassMod('marvin')
    } else if (evt.target.value == 'phobos') {
      addEffectClassMod('phobos')
    } else if (evt.target.value == 'heat') {
      addEffectClassMod('heat')
    } else {
      window.form.removeImgEffects();
    }
  };

  effectsFieldset.addEventListener('click', function (evt) {
    if (evt.target.name == 'effect') {
      window.form.removeImgEffects();
      changeImgEffects(evt);
    }
  });
})();
