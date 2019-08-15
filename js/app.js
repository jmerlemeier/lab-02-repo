'use strict'

// var source = document.getElementById("entry-template").innerHTML;
// var template = Handlebars.compile(source);
// var html = template(context);
// $('main').append(html);

const allImages = [];

const Image = function (image_url, title, description, keyword, numberofhorns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.numberofhorns = numberofhorns;
  allImages.push(this);
};

Image.prototype.renderwithJquery = function () {
  const $myTemplate = $('#photo-template');
  const $myTemplateHtml = $myTemplate.html();
  $myTemplate.hide();
  const $newSection = $('<section></section>')
  $newSection.html($myTemplateHtml);

  $newSection.find('h2').text(this.title);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('p').text(this.description);
  $newSection.find('img').attr('data-keyword', this.keyword);
  $newSection.find('img').attr('data-horns', this.numberofhorns);

  $('main').append($newSection);
}

//AJAX
const getAllImagesFromFile = () => {
  $.get('data/page-1.json').then(images => {
    images.forEach(eachImage => {
      new Image(
        eachImage.image_url,
        eachImage.title,
        eachImage.description,
        eachImage.keyword,
        eachImage.horns
      );
    })

    allImages.forEach(image => {
      image.renderwithJquery();
    })

    //filterImages();
  })

}

getAllImagesFromFile();
//-------------------------------------

function renderDropDown(attribute) {
  const uniques = [];
  let dropdown = $('select');
  allImages.forEach(image => {
    let flag = true;
    uniques.forEach(uniqueImage => {
      if (uniqueImage === image[attribute]) {
        flag = false;
      }

    })
    if (flag) {
      dropdown
        .append($('<option></option>')
          .attr('value', image[attribute])
          .text(image[attribute]));
      uniques.push(image[attribute]);
    }
  })
}

$('select').on('change', function () {
  let $selected = $(this).val();
  $('section').hide();
  $(`img[data-keyword = ${$selected}]`).parent().show();
  $(`img[data-horns = ${$selected}]`).parent().show();
});

$('input[type=radio]').on('change', function () {
  $('select').empty();
  let $clicked = $(this).val();
  console.log($(this).val())
  if ($clicked === 'radio-one') {
    renderDropDown('keyword');
  } else {
    renderDropDown('numberofhorns');
  }
});
