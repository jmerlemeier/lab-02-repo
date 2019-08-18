'use strict'

let allImagesOne = [];
let allImagesTwo = [];

const Image = function (image_url, title, description, keyword, numberofhorns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.numberofhorns = numberofhorns;
};

Image.prototype.renderWithHandleBars = function () {
  let hornHtml = $('#horn-template').html();
  const renderImageWithHandlebars = Handlebars.compile(hornHtml);
  const hornImage = renderImageWithHandlebars(this);
  $('main').append(hornImage);
};

// DRY
const renderPageOne = () => {
  allImagesOne.forEach(image => {
    image.renderWithHandleBars();
  })
}

const getAllPageOneFiles = () => {
  $.get('data/page-1.json')
    .then(images => {
      images.forEach(eachImage => {
        allImagesOne.push(new Image(
          eachImage.image_url,
          eachImage.title,
          eachImage.description,
          eachImage.keyword,
          eachImage.horns
        ));
      })
      renderPageOne();
    })
}

const renderPageTwo = () => {
  allImagesTwo.forEach(image => {
    image.renderWithHandleBars();
  })
}

const getAllPageTwoFiles = () => {
  $.get('data/page-2.json')
    .then(images => {
      images.forEach(eachImage => {
        allImagesTwo.push(new Image(
          eachImage.image_url,
          eachImage.title,
          eachImage.description,
          eachImage.keyword,
          eachImage.horns
        ));
      })
    })
}

//-------------------------------------

<<<<<<< HEAD
// SORT FUNCTION
// Image.sort = function (array, property) {
//   array.sort((a, b) => {
//     //return a[property] < b[property] ? -1 : 1;
//     if (a[property] > b[property]) {
//       return 1;
//     } else if (a[property] < b[property]) {
//       return -1;
//     } else {
//       return 0;
//     }
//   })
// }

// $('#horns').on('click', () => {
//   Image.sort(allImagesOne, (this).numberofhorns);
//   console.log('in the click sorting.');
//   console.log('number of horns is ', this.numberofhorns);
// })

$('#sort-template').on('change', function () {
  console.log($('#sort-template option:selected').val());
  let selectedSorter = $('#sort-template option:selected').val();
  if (selectedSorter === 'title') {
    allImagesOne.sort(function (a, b) {
      if (a.title < b.title) { return -1; }
      if (a.title > b.title) { return 1; }
    });
  } else if (selectedSorter === 'numberofhorns') {
    allImagesOne.sort(function (a, b) {
      if (a.numberofhorns < b.numberofhorns) { return -1; }
      if (a.numberofhorns > b.numberofhorns) { return 1; }
    });
  }
  $('main').html('');

  allImagesOne.forEach(image => {
    console.log('image', image);
    image.renderWithHandlebars();

  })
})




=======

function sortImages(imageArray) {
  $('#sort-template').on('change', function () {
    console.log($('#sort-template option:selected').val());
    let selectedSorter = $('#sort-template option:selected').val();
    if (selectedSorter === 'title') {
      imageArray.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    } else if (selectedSorter === 'numberofhorns') {
      imageArray.sort(function (a, b) {
        if (a.numberofhorns < b.numberofhorns) {
          return -1;
        }
        if (a.numberofhorns > b.numberofhorns) {
          return 1;
        }
        return 0;
      });
    }
    $('main').html('');

    imageArray.forEach(image => {
      console.log('image', image);
      image.renderWithHandleBars();
    })
  })
}

>>>>>>> cbddeb7bb17943152ba5452a6b15781d5f37dce3
function renderDropDown(attribute) {
  const uniques = [];
  let dropdown = $('#dropdown-template');
  allImagesOne.forEach(image => {
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

$('#dropdown-template').on('change', function () {
  let $selected = $(this).val();
  $('section').hide();
  $(`img[data-keyword = ${$selected}]`).parent().show();
  $(`img[data-horns = ${$selected}]`).parent().show();
});

$('input[type=radio]').on('change', function () {
  $('#dropdown-template').empty();
  let $clicked = $(this).val();
  console.log($(this).val())
  if ($clicked === 'radio-one') {
    renderDropDown('keyword');
  } else {
    renderDropDown('numberofhorns');
  }
});

$('#page-one').on('click', function () {
  $('section').hide();
  renderPageOne();
  sortImages(allImagesOne);
})

$('#page-two').on('click', function () {
  $('section').hide()
  renderPageTwo();
  sortImages(allImagesTwo);
})

getAllPageTwoFiles();
getAllPageOneFiles();

