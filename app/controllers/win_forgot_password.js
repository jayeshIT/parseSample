var utility = require("utility");
$.email_textfield.autocapitalization = Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE;
$.submit_button.addEventListener('click', function(e) {
    $.email_textfield.blur();
    if ($.email_textfield.value.trim().length === 0) {
        utility.showalertDialog("Please enter E-mail address.");
        return;
    } else {
        if (utility.validateEmail($.email_textfield.value)) {
        } else {
            utility.showalertDialog("Please enter your valid E-mail address.");
            $.email_textfield.value = '';
            return;
        }
    }

    Parse.User.requestPasswordReset(($.email_textfield.value).toLowerCase(), {
        success : function(success) {
            Ti.API.info('Success' + JSON.stringify(success));
            var alertDialog = utility.showalertDialogWithButton("We have sent link on provided E-mail to reset your password.");
            alertDialog.addEventListener('click', function() {
                $.win_forgot_password.close();
            });
            alertDialog.show();
        },
        error : function(error) {
            utility.showalertDialog(error.message);
        }
    });

});

$.username_button.addEventListener('click', function(e) {
    $.email_textfield.blur();
    if ($.email_textfield.value.trim().length === 0) {
        utility.showalertDialog("Please enter E-mail address.");
        return;
    } else {
        if (utility.validateEmail($.email_textfield.value)) {
        } else {
            utility.showalertDialog("Please enter your valid E-mail address.");
            $.email_textfield.value = '';
            return;
        }
    }
    var User = Parse.Object.extend("User");
    var query = new Parse.Query(User);
    query.equalTo("email", ($.email_textfield.value).toLowerCase());
    query.limit(1);
    query.find({
        success : function(result) {
            Ti.API.info('=====reslu : ' + JSON.stringify(result));
            if (result.length > 0) {
                Ti.API.info('results' + JSON.stringify(result));
                Ti.API.info('results.length: ' + result.length);
                utility.showalertDialog(result[0].get("username"));
            } else {
                alert('No user found with email \n' + $.email_textfield.value);
            }
        },
        error : function(error) {
            alert('No user found with email \n' + $.email_textfield.value);
            alert("Error: " + error.code + " " + error.message);
        }
    });
});
