"use strict";

function openContainer() {
  $(".container-outer").css({
    'opacity': '1',
    'zIndex': '100',
    'display': 'block'
  });
}

function closeContainer() {
  $(".container-outer").css({
    'opacity': '0',
    'zIndex': '-10',
    'display': 'none'
  });
}

function clearContainer() {
  $("#chooseTitle").val('');
  $("#chooseDate").val('');
  $("#chooseImage").val('');
  $("#writeDescription").val('');
}

function createTooltip(text) {
  return "\n        data-toggle=\"tooltip\" data-placement=\"left\" title=\"".concat(text, "\"\n    ");
}

function addCardElement(inputURL, inputTitle, inputDescription, inputDate) {
  return "\n        <div class=\"col-sm-4\">\n            <div class=\"card\">\n                <div id=\"image-container\">\n                    <img src=\"".concat(inputURL, "\" class=\"card-img-top custom-image\" alt=\"...\">\n                </div>\n                <div class=\"card-body\">\n                    <h5 class=\"card-title\" ").concat(createTooltip('Click to edit'), ">").concat(inputTitle, "</h5>\n                    <p class=\"card-text ").concat(createTooltip('Click to edit'), "\">").concat(inputDescription, "</p>\n                </div>\n                <div class=\"card-footer\">\n                    <div class=\"d-flex align-items-center justify-content-between\">\n                        <small class=\"text-muted\">Date: ").concat(inputDate, "</small>\n                        <button type=\"button\" class=\"btn btn-delete\"><strong>Delete</strong></button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ");
}

$("#addEvent").click(function () {
  return openContainer();
});
$("#close-button").click(function () {
  return closeContainer();
});
$("#accept-button").click(function () {
  var success = false;
  var inputTitle = $("#chooseTitle").val();
  var inputDate = $("#chooseDate").val();
  var inputURL = $("#chooseImage").val();
  var inputDescription = $("#writeDescription").val();

  if (alertEmptyInput()) {
    success = false;
  } else {
    success = true;
  }

  if (checkIfInputEmpty(inputURL)) {
    inputURL = "https://www.fikt.uklo.edu.mk/assets/uploads/sites/2/2015/03/fict_logo.png";
  }

  if (success) {
    $(function () {
      $("*").tooltip();
    });
    $(".card-group").prepend(addCardElement(inputURL, inputTitle, inputDescription, inputDate));
    $("#eventText").css("display", "none");
    $('.card-title, .card-text').editable({
      // trigger event
      event: 'click',
      // enables touch event
      touch: true,
      // converts \n to <br />
      lineBreaks: false,
      // close on enter
      closeOnEnter: true,
      // message to show when empty
      emptyMessage: 'Click to edit'
    });
    closeContainer();
    clearContainer();
    success = false;
  }
});
$('.card-title, .card-text').hover(function () {});
$(document).on('click', '.btn-delete', function () {
  $(this).closest('.col-sm-4').remove();
});

var checkIfInputEmpty = function checkIfInputEmpty(input) {
  if (input.length <= 0) {
    return true;
  }

  return false;
};

var alertEmptyInput = function alertEmptyInput() {
  var inputTitle = $("#chooseTitle").val();
  var inputDate = $("#chooseDate").val();
  var inputDescription = $("#writeDescription").val();

  if (checkIfInputEmpty(inputTitle)) {
    alert("Title is empty!");
    return true;
  }

  if (checkIfInputEmpty(inputDate)) {
    alert("Date is empty!");
    return true;
  }

  if (checkIfInputEmpty(inputDescription)) {
    alert("Description is empty!");
    return true;
  }

  return false;
};