'use strict';

(function () {
  var imgPopupUpload = document.querySelector('.img-upload__overlay');
  var imgPopupCloseButton = document.querySelector('#upload-cancel');
  var imgUploadButton = document.querySelector('#upload-file');
  var tagsForm = document.querySelector('.text__hashtags');
  var commentForm = document.querySelector('.text__description');
  var inputNoneEffect = document.querySelector('#effect-none');

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
  var setToDefault = function () {
    var defaultEffectValues = window.form.EFFECT_VALUE;

    window.form.userUploadImg.setAttribute('style', 'transform: scale(' + defaultEffectValues.imgScale / 100 + ')');
    window.form.imgScaleValue.setAttribute('value', defaultEffectValues.imgScale + '%');
    window.form.removeImgEffects();
    window.form.hideEffectSlider();
    inputNoneEffect.checked = true;
    tagsForm.value = defaultEffectValues.hashtags;
    commentForm.value = defaultEffectValues.comment;
  };
})();
