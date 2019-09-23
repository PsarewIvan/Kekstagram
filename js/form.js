'use strict';

// Работа с формой
(function () {
  var imgPopupUpload = document.querySelector('.img-upload__overlay');
  var imgPopupCloseButton = document.querySelector('#upload-cancel');
  var imgUploadButton = document.querySelector('#upload-file');
  var tagsForm = document.querySelector('.text__hashtags');
  var commentForm = document.querySelector('.text__description');

  var buttonImgScaleSmaller = document.querySelector('.scale__control--smaller');
  var buttonImgScaleBigger = document.querySelector('.scale__control--bigger');
  var imgScaleValue = document.querySelector('.scale__control--value');
  var userUploadImg = document.querySelector('.js__user-upload-img');
  var MIN_IMG_SCALE = 25;
  var MAX_IMG_SCALE = 100;
  var IMG_SCALE_STEP = 25;

  var effectsList = document.querySelector('.img-upload__effects');
  var effectSlider = document.querySelector('.img-upload__effect-level');
  var inputNoneEffect = document.querySelector('#effect-none');

  var defaultEffectValues = {
    imgScale: '100',
    effect: 'effect-none',
    effectLevel: '100',
    hashtags: '',
    comment: ''
  }

  // Показ/скрытие редактора загружаемого фото
  var showImgUploadPopup = function () {
    imgPopupUpload.classList.remove('hidden');
    document.addEventListener('keydown', onImgPopupEscPress);
  };

  var closeImgUploadPopup = function () {
    imgPopupUpload.classList.add('hidden');
    document.removeEventListener('keydown', onImgPopupEscPress);
    setToDefault();
  }

  var onImgPopupEscPress = function (evt) {
    if (evt.keyCode === window.global.ESC_KEYCODE &&
      document.activeElement != tagsForm &&
      document.activeElement != commentForm) {
      closeImgUploadPopup();
    }
  };

  imgUploadButton.addEventListener('change', function () {
    if (this.files[0]) {
      var fr = new FileReader();

      fr.addEventListener('load', function () {
        document.querySelector('.js__user-upload-img').setAttribute('src', fr.result);
        showImgUploadPopup();
        document.querySelector('.text__hashtags').focus({
          preventScroll: true
        });
      }, false);

      fr.readAsDataURL(this.files[0]);
    }
  });

  imgPopupCloseButton.addEventListener('click', function () {
    closeImgUploadPopup();
  })

  // Возврат настроек по умолчанию
  var setToDefault = function() {
    userUploadImg.setAttribute('style', 'transform: scale(' + defaultEffectValues.imgScale / 100 + ')');
    imgScaleValue.setAttribute('value', defaultEffectValues.imgScale + '%');
    removeImgEffects();
    hideEffectSlider();
    inputNoneEffect.checked = true;
    tagsForm.value = defaultEffectValues.hashtags;
    commentForm.value = defaultEffectValues.comment;
  };

  // Редактируем масштаб загружаемого изображения
  var doImgScaleSmaller = function () {
    var scaleValue = +imgScaleValue.getAttribute('value').slice(0, -1);
    if (scaleValue > MIN_IMG_SCALE) {
      var newScaleValue = scaleValue - IMG_SCALE_STEP;
      imgScaleValue.setAttribute('value', newScaleValue + '%');
      userUploadImg.setAttribute('style', 'transform: scale(' + newScaleValue / 100 + ')');
    }
  };

  var doImgScaleBigger = function () {
    var scaleValue = +imgScaleValue.getAttribute('value').slice(0, -1);
    if (scaleValue < MAX_IMG_SCALE) {
      var newScaleValue = scaleValue + IMG_SCALE_STEP;
      imgScaleValue.setAttribute('value', newScaleValue + '%');
      userUploadImg.setAttribute('style', 'transform: scale(' + newScaleValue / 100 + ')');
    }
  };

  buttonImgScaleSmaller.addEventListener('click', function () {
    doImgScaleSmaller();
  });

  buttonImgScaleBigger.addEventListener('click', function () {
    doImgScaleBigger();
  });

  // Наложение эффекта на изображение
  var removeImgEffects = function () {
    userUploadImg.classList.remove(  //тут лучше переделать, возможно рег.выражения
      'effects__preview--chrome',
      'effects__preview--sepia',
      'effects__preview--marvin',
      'effects__preview--phobos',
      'effects__preview--heat'
    );
  };

  var addEffectClassMod = function (mod) {
    effectSlider.classList.remove('hidden');
    userUploadImg.classList.add('effects__preview--' + mod)
  };

  var hideEffectSlider = function () {
    effectSlider.classList.add('hidden');
  }

  var changeImgEffects = function (evt) {
    if (evt.target.value == 'none') {
      removeImgEffects();
      hideEffectSlider();
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
      removeImgEffects();
    }
  };

  effectsList.addEventListener('click', function (evt) {
    if (evt.target.name == 'effect') {
      removeImgEffects();
      changeImgEffects(evt);
    }
  });
})();
