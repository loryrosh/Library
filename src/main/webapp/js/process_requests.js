$(document).ready(function () {

    /************************************************* general settings *********************************************/

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

    /********************************************* registration form ************************************************/

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
        hideMsgs();
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
                        if (!resp) {
                            show_alert($('#error_email_not_unique').html(), statusField, false);
                        }
                        else {
                            hideMsgs();
                        }
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
                        if (resp) {
                            show_alert($('#succ_register').html(), statusField, true);
                        }
                        result = resp;
                    }
                });
            return result;
        }
        else
            return result;
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
                        if (!resp) {
                            show_alert($('#error_contains_parts').html(), statusField, false);
                        }
                        result = resp;
                    }
                });
            return result;
        }
        else
            return false;
    }

    /********************************************* profile changing form **************************************************/

    $('#profileForm').validate({
        rules: {
            firstName: "required",
            lastName: "required",
            changePassword: {
                required: false,
                pwdchange: true,
                minlength: 8
            }
        },
        messages: {
            firstName: $('#error_firstname').html(),
            lastName: $('#error_lastname').html(),
            changePassword: {
                pwdchange: $('#error_pwd_check').html(),
                minlength: $('#error_pwd_minlen').html()
            }
        }
    });

    $.validator.addMethod("pwdchange",
        function (value, element) {
            return value === '' || /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!?.,/@#$%^&+=])(?=\S+$).{8,}$/.test(value);
        });

    $('#saveProfile').click(function () {
        hideMsgs();
        if ($('#profileForm').valid()) {
            if ($.trim($('#changePassword').val()) === '' || checkChangePassword()) {
                changeProfile();
            }
        }
    });

    $('#oldPassword').blur(function () {
        var oldPassword = $.trim($('#oldPassword').val());
        if (oldPassword !== '') {
            $.ajax(
                {
                    url: "/checks/oldpassword",
                    data: {oldPassword: oldPassword},
                    success: function (resp) {
                        if (!resp) {
                            show_alert($('#error_old_password').html(), statusField, false);
                        }
                        else {
                            hideMsgs();
                        }
                    }
                });
        }
    });

    function changeProfile() {
        $.ajax(
            {
                url: "/change_profile",
                data: {
                    email: $.trim($('#changeEmail').val()),
                    password: $.trim($('#changePassword').val()),
                    lastName: $.trim($('#lastName').val()),
                    firstName: $.trim($('#firstName').val()),
                    patronymic: $.trim($('#patronymic').val()),
                    oldPassword: $('#oldPassword').val()
                },
                async: false,
                success: function (resp) {
                    switch (resp) {
                        case 0: {
                            show_alert($('#profile_succ').html(), statusField, true);
                            $('#profileForm').hide();
                            break;
                        }
                        case 1: {
                            show_alert($('#error_old_password').html(), statusField, false);
                            break;
                        }
                        case 2: {
                            show_alert($('#error_contains_parts').html(), statusField, false);
                            break;
                        }
                        case 3: {
                            show_alert($('#profile_fail').html(), statusField, false);
                            break;
                        }
                    }
                }
            });
    }

    function checkChangePassword() {
        var userEmail = $.trim($('#changeEmail').val());
        var userPas = $.trim($('#changePassword').val());
        var result = false;
        $.ajax(
            {
                url: "/checks/password",
                data: {password: userPas, email: userEmail},
                async: false,
                success: function (resp) {
                    if (!resp) {
                        show_alert($('#error_contains_parts').html(), statusField, false);
                    }
                    result = resp;
                }
            });
        return result;
    }

    /***************************************** book filters *************************************************/

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
                    filterOutput(resp)
                }
            });
    }

    /********************************************* delivery **********************************************/

    $(".orderHands").click(function () {
        var id = getId($(this).attr("name"));
        addOrder(id, true);
    });

    $(".orderLib").click(function () {
        var id = getId($(this).attr("name"));
        addOrder(id, false);
    });

    $(".cancelOrder").click(function () {
        var id = getId($(this).attr("name"));
        cancelOrder(id, false);
    });

    function addOrder(id, onHands) {
        $.ajax(
            {
                url: "/addOrder",
                data: {bookId: id, toHand: onHands},
                success: function (resp) {
                    switch (resp) {
                        case 0: {
                            show_alert($('#succ_order_created').html(), statusField, true);
                            break;
                        }
                        case 1: {
                            show_alert($('#error_order_create_ordered').html(), statusField, false);
                            break;
                        }
                        case 2: {
                            show_alert($('#error_order_create_delivered').html(), statusField, false);
                            break;
                        }
                    }
                }
            });
    }

    function cancelOrder(id) {
        $.ajax(
            {
                url: "/cancelOrder",
                data: {bookOrderId: id},
                success: function (resp) {
                    if (resp) {
                        show_alert($('#succ_order_canceled').html(), statusField, true);
                    }
                    else if (!resp) {
                        show_alert($('#error_order_canceled').html(), statusField, false);
                    }
                }
            });
    }

    $(".giveOrder").click(function () {
        var id = getId($(this).attr("name"));
        $.ajax(
            {
                url: "/addDelivery",
                data: {orderId: id},
                success: function (resp) {
                    if (resp) {
                        show_alert($('#succ_delivery_created').html(), statusField, true);
                    }
                    else if (!resp) {
                        show_alert($('#error_delivery_created').html(), statusField, false);
                    }
                }
            });
    });


    /******************************************** profile editing *****************************************/
    $('.deleteReader').click(function () {
        var id = getId($(this).attr("name"));
        $.ajax(
            {
                url: "/deleteReader",
                data: {readerId: id},
                async: false,
                success: function (resp) {
                    if (!resp) {
                        show_alert($('#error_delete_account').html(), statusField, false);
                    }
                    else {
                        show_alert($('#succ_account_deleted').html(), statusField, true);
                    }
                }
            });
    });


    /************************************** date picking **************************************************/

    $('#year_picker').daterangepicker({
        locale: {
            cancelLabel: $('#datapicker_clear').html(),
            applyLabel: $('#datapicker_apply').html(),
            format: $('#datapicker_format').html()
        }
    });

    $('#year_picker').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });

    // http://totalprogus.blogspot.ru/2013/12/bootstrap-add-active-class-to-li.html
    $('a[href="' + this.location.pathname + '"]').parents('li,ul').addClass('active');
});
