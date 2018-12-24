$('form').submit( function(event){
  event.preventDefault();//prevent default form submition

  let searchField = $('#search');
  let submitButton = $('#submit');
//begining of the ajax part
  let url = 'https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';
  let flickrData = {
    tags: searchField.val(),
    format: 'json',
  }
  //prevent empty searchField
  if(searchField.val() == '') {
    return $('#photos').html('<p class="error-text">You have submited an empty form. Please enter a search term to get Flickr Photos.</p>');
  }
  //disabling of the button and searchField
  searchField.prop('disabled', true);
  submitButton.attr('disabled', true).val('searching...');

  // ajax callback
  function displayImages(data) {
    let photoHTML = '<ul>';
    $.each(data.items, function(key, item){
      photoHTML += '<li class="grid-25 tablet-grid-50" >';
      photoHTML += '<a href= "'+ item.link + '" class="image" target="_blank">';
      photoHTML +=  '<img src="' + item.media.m + '" /> </a> </li>';
    });
    photoHTML += '</ul>';
    $('#photos').html(photoHTML);

    //enabling of the button and searchField
    searchField.prop('disabled', false);
    submitButton.attr('disabled', false).val('search');
  }
  $.getJSON(url, flickrData, displayImages).fail(function(error){
    return $('#photos').html('<p class="error-text"> Error: ' + error.status);
  });
});
