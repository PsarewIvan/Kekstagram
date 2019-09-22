'use strict';

// Работа с галереей изображений
(function () {
  var templateImg = document.querySelector('#picture')
    .content.querySelector('.picture');
  var photosDomParent = document.querySelector('.pictures');

  var numberOfPhoto = 25;

  // Конструктор блоков с фото по шаблону
  var buildPhoto = function (photo) {
    var element = templateImg.cloneNode(true);
    element.querySelector('.picture__img').setAttribute('src', photo.url);
    element.querySelector('.picture__img').setAttribute('data-index', photo.index);
    element.querySelector('.picture__likes').textContent = photo.likes;
    element.querySelector('.picture__comments').textContent = photo.comments.length;
    return element;
  };

  // Заполнение DOM случайными фото
  var fillingPhotosDomBlock = function (count, photosPar) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      fragment.appendChild(buildPhoto(photosPar[i]));
    }
    return fragment;
  };

  // Создаем массив случайных фото (глобально)
  window.gallery = {
    photos: window.dataImg.getPhotos(numberOfPhoto)
  }

  // Вставка случайных миниатюр
  photosDomParent.appendChild(fillingPhotosDomBlock(numberOfPhoto, window.gallery.photos));
})();
