'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var templateComments = document.querySelector('#comments')
    .content.querySelector('.social__comment');
  var userImgList = document.querySelector('.pictures');
  var bigPictureCloseButton = document.querySelector('.big-picture__cancel');

  // Собираем комментарии к болшьшой картинке по шаблону
  var buildComments = function (photoComment) {
    var element = templateComments.cloneNode(true);
    element.querySelector('.social__text').textContent = photoComment;
    element.querySelector('.social__picture')
      .setAttribute('src', ('img/avatar-' + window.global.getRandomNumber(1, 6) + '.svg'));
    return element;
  }

  // Заполнение большой картинки сгенерированным элементом
  var fillingBigPicture = function (firstPhoto) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < firstPhoto.comments.length && i < 5; i++) {
      fragment.appendChild(buildComments(firstPhoto.comments[i]));
    }
    document.querySelector('.big-picture__img')
      .querySelector('img')
      .setAttribute('src', firstPhoto.url);
    document.querySelector('.likes-count').textContent = firstPhoto.likes;
    document.querySelector('.social__caption').textContent = firstPhoto.description;
    document.querySelector('.comments-count').textContent = firstPhoto.comments.length;
    document.querySelector('.social__comments').innerHTML = '';
    document.querySelector('.social__comments').appendChild(fragment);
  };

  // Показ большой превьюшки по клику на миниатюру
  var showBigPicture = function () {
    document.querySelector('.big-picture').classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onBigPictureEscPress);
    bigPictureCloseButton.addEventListener('click', function () {
      closeBigPicture();
    });
  };

  // Закрывает превью картинки при нажатии Esc
  var onBigPictureEscPress = function (evt) {
    window.global.isEscEvent(evt, closeBigPicture)
  };

  var closeBigPicture = function () {
    document.querySelector('.big-picture').classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  userImgList.addEventListener('click', function (evt) {
    if (evt.target.className == 'picture__img') {
      showBigPicture();
      fillingBigPicture(window.gallery.photos[evt.target.dataset.index]);
    }
  });

  // Показ картинки с клавиатуры
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode == ENTER_KEYCODE &&
      evt.target.querySelector('img').dataset.index) {
      showBigPicture();
      fillingBigPicture(window.gallery.photos[evt.target.querySelector('img').dataset.index]);
    }
  });
})();
