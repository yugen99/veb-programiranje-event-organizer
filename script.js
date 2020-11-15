function openContainer() {
    $(".container-outer").css({'opacity': '1', 'zIndex': '100', 'display': 'block'});
}

function closeContainer() {
    $(".container-outer").css({'opacity': '0', 'zIndex': '-10', 'display': 'none'});
}

function clearContainer() {
    $("#chooseTitle").val('');
    $("#chooseDate").val('');
    $("#chooseImage").val('');
    $("#writeDescription").val('');
}

function createTooltip(text) {
    return `
        data-toggle="tooltip" data-placement="left" title="${text}"
    `;
}

function addCardElement(inputURL, inputTitle, inputDescription, inputDate) {
    return `
        <div class="col-sm-4">
            <div class="card">
                <div id="image-container">
                    <img src="${inputURL}" class="card-img-top custom-image" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title" ${createTooltip('Click to edit')}>${inputTitle}</h5>
                    <p class="card-text ${createTooltip('Click to edit')}">${inputDescription}</p>
                </div>
                <div class="card-footer">
                    <div class="d-flex align-items-center justify-content-between">
                        <small class="text-muted">Date: ${inputDate}</small>
                        <button type="button" class="btn btn-delete"><strong>Delete</strong></button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

$("#addEvent").click(() => openContainer());
$("#close-button").click(() => closeContainer());



$("#accept-button").click(function() {
    let success = false;

    let inputTitle = $("#chooseTitle").val();
    let inputDate = $("#chooseDate").val();
    let inputURL = $("#chooseImage").val();
    let inputDescription = $("#writeDescription").val();

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
            event : 'click',
          
            // enables touch event
            touch : true,
          
            // converts \n to <br />
            lineBreaks : false,
          
            // close on enter
            closeOnEnter : true,
          
            // message to show when empty
            emptyMessage : 'Click to edit',
        }); 

        closeContainer();
        clearContainer();
        success = false;
    }
});

$('.card-title, .card-text').hover(function() {

});

$(document).on('click','.btn-delete',function(){
    $(this).closest('.col-sm-4').remove();
});

const checkIfInputEmpty = (input) => {
    if (input.length <= 0) {
        return true;
    }
    return false;
}

const alertEmptyInput = () => {
    let inputTitle = $("#chooseTitle").val();
    let inputDate = $("#chooseDate").val();
    let inputDescription = $("#writeDescription").val();

    if(checkIfInputEmpty(inputTitle)) {
        alert("Title is empty!");
        return true;
    }
    if(checkIfInputEmpty(inputDate)) {
        alert("Date is empty!");
        return true;
    }
    if(checkIfInputEmpty(inputDescription)) {
        alert("Description is empty!");
        return true;
    }
    return false;
}