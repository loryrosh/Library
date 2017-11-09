$(document).ready(function () {
    var statusField = $('#status_message');
    var contentField = $('.content_result');

    function getFormArray(elem, msgField) {
        // serializing all elements of the form
        var form_data = elem.closest('form').serializeArray();

        // adding button to the array of form fields
        form_data.push({name: elem.attr('name')});

        if (has_empty_fields(form_data, msgField))
            return '';
        return form_data;
    }

    function has_empty_fields(data, msgField) {
        var res = false;
        $.each(data, function (i, field) {
            //alert( field.name + ' ' + field.value + ' ' + field.type );
            if (field.value == '' && field.type != 'submit') {
                show_alert("Please fill in all the fields!", msgField, false);
                res = true;
                return false;
            }
        });
        return res;
    }

    function show_alert(msg, msgField, isSuccess) {
        if (isSuccess)
            msgField.removeClass('bg-danger').addClass('bg-success');
        else
            msgField.removeClass('bg-success').addClass('bg-danger');
        msgField.toggle(true).text(msg);
    }

    function showResponse(resp, msgField) {
        if (resp == "false")
            show_alert("Unsuccessful attempt. Please try once again.", msgField, false);
        else
            show_alert(resp, msgField, true);
    }

    function hideMsgs() {
        statusField.toggle(false);
        contentField.toggle(false);
    }

    function prepareContentField() {
        contentField.toggle(true);

        var contentBody = contentField.find('tbody');
        contentBody.empty();
        return contentBody;
    }

    /************************************************* general settings *************************************************/

    // stop submit requests
    $('.doNotProcess').submit(function (e) {
        e.preventDefault();
    });

    $('button').click(function () {
        hideMsgs();
    });

    // hide error message when switching between tabs
    $('.navbar-nav a, #navbar').click(function () {
        hideMsgs();
    });

    $.ajaxSetup(
        {
            type: "POST"
        });

    /********************************************* registration form **************************************************/

    $('#registerForm').validate({
        rules: {
            firstName: "required",
            lastName: "required",
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                pwdcheck: true,
                minlength: 8
            }
        },
        messages: {
            firstName: $('#error_firstname').html(),
            lastName: $('#error_lastname').html(),
            password: {
                required: $('#error_password').html(),
                pwdcheck: $('#error_pwd_check').html(),
                minlength: $('#error_pwd_minlen').html()

            },
            email: {
                required: $('#error_email_req').html(),
                email: $('#error_email').html()
            }
        }
    });

    $.validator.addMethod("pwdcheck",
        function (value, element) {
            return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!?.,/@#$%^&+=])(?=\S+$).{8,}$/.test(value);
        });

    $('#register').click(function () {
        if ($('#registerForm').valid()) {
            if (checkPassword()) {
                if (provideRegistration()) {
                    location.href = "account";
                }
            }
        }
    });

    $('#email').blur(function () {
        var userEmail = $.trim($('#email').val());
        if (isEmail(userEmail)) {
            $.ajax(
                {
                    url: "/checks/email",
                    data: {email: userEmail},
                    success: function (resp) {
                        if (!resp) alert($('#error_email_not_unique'));
                    }
                });
        }
    });

    function provideRegistration() {
        var result = false;
        var form_data = $('#registerForm').serialize();
        if (form_data !== '') {
            $.ajax(
                {

                    url: "/register",
                    data: form_data,
                    async: false,
                    success: function (resp) {
                        if (resp) alert($('#succRegister'));
                        result = resp;
                    }
                });
            return result;
        }
        else
            return false;
    }


    function checkPassword() {
        var userEmail = $.trim($('#email').val());
        var userPas = $.trim($('#password').val());
        var result = false;
        if (userEmail !== '' && userPas !== '') {
            $.ajax(
                {
                    url: "/checks/password",
                    data: {password: userPas, email: userEmail},
                    async: false,
                    success: function (resp) {
                        if (!resp) alert($('#errorContainsParts'));
                        result = resp;
                    }
                });
            return result;
        }
        else
            return false;
    }
});

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

/************************* book filters *****************************************/
$('#filer_button').click(function () {
    filterRequest();
});

function filterRequest() {
    var titleFilter = $.trim($('#book_title').val());
    var authorFilter = $.trim($('#book_author').val());
    var yearFilter = $.trim($('#book_year').val());
    var genreFilter = $("#book_genre option").filter(":selected").attr('id');
    $.ajax(
    {
        url: "/filters",
        data: {title: titleFilter, author: authorFilter, year: yearFilter, genre: genreFilter},
        dataType: "json",
        success: function (resp) {
            var contentBody = $('.content_res_book');
            contentBody.empty();

            $.each(resp, function (key, data) {
                var onHands = $('#orderOnHandsForm').clone();
                var inLib = $('#orderInLibForm').clone();

                var htmlContent = '';
                htmlContent +=
                    '<tr><td>' + data.title + '</td>' +
                    '<td>' + data.authors[0] + '</td>' +
                    '<td>' + data.year + '</td>' +
                    '<td>' + data.genre + '</td>';

                var button = onHands.find('button');
                addId(button, 'name', data.book_id);
                addId(button, 'id', data.book_id);

                button = inLib.find('button');
                addId(button, 'name', data.book_id);
                addId(button, 'id', data.book_id);

                htmlContent += '<td>' + onHands.html() + '</td>';
                htmlContent += '<td>' + inLib.html() + '</td></tr>';

                contentBody.append($(htmlContent));
            });
        }
    });
}

function addId(obj, attrName, id) {
    obj.attr(attrName, (obj.attr(attrName) + '_' + id));
}

function getId(attrName) {
    var parts = attrName.split("_");

    if(parts.length > 1){
        return parts[1];
    }
    return "";
}

/********************************************* delivery **********************************************/

$(".orderHands").click(function () {
    console.log(parseInt($(this).attr("name"), 10));
});

$(".orderLib").click(function () {
    console.log(parseInt($(this).attr("name"), 10));
});
/******************************************** profile editing *****************************************/
$('#deleteProfile').click(function () {
    $.ajax(
        {
            url: "/deleteAccount",
            //data:
            async: false,
            success: function (resp) {
                if(!resp) alert("Delete profile failed!");
                else location.href = "login?logout"
            }
        });
});