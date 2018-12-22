import $ from 'jquery';
function doCheck() {
    var allFilled = true;
    $('#addUserForm :input.form-control').each(function () {
        if ($(this).val() == '') {
            allFilled = false;
        }
        if ($(this).attr('id') === 'phone') {
            if ($(this).val().length !== 10) {
                allFilled = false;
            }
        }
    });
    $('#addUserBtn').prop('disabled', !allFilled);
    if (allFilled) {
        $('#addUserBtn').removeAttr('disabled');
    }
}

//ready event
$(document).ready(function () {
    //check
    doCheck();
    //event key up request form
    $('#addUserForm :input.form-control').keyup(doCheck);

    //accept only number in phone input
    $('#phone').keypress(function(event) {
        return /\d/.test(String.fromCharCode(event.keyCode));
    });

    //accept only character in name input
    $('#name').keypress(function(event) {
        return /[a-z]/g.test(String.fromCharCode(event.keyCode));
    });
});