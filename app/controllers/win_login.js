var utility = require("/utility");
var first_time_click = false;
$.email_textfield.autocapitalization = Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE;
$.password_textfield.autocapitalization = Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE;
var text = 'Forgot your username / password?';
if (OS_IOS) {
    $.forgot_password_lbl.attributedString = Titanium.UI.iOS.createAttributedString({
        text : text,
        attributes : [{
            type : Titanium.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
            value : Titanium.UI.iOS.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
            range : [0, text.length]
        }]
    });
} else {
    $.forgot_password_lbl.html = "<U>" + text + "</U>";
}
$.login_button.addEventListener('click', function(e) {
    $.email_textfield.blur();
    $.password_textfield.blur();
    if ($.email_textfield.value.trim().length == 0) {
        utility.showalertDialog("Please enter username.");
        return;
    }
    if ($.password_textfield.value.trim().length == 0) {
        utility.showalertDialog("Please enter password.");
        return;
    }
    Ti.API.info('userName: ' + $.email_textfield.value);
    Ti.API.info('password: ' + $.password_textfield.value);
    Parse.User.logIn($.email_textfield.value.toLowerCase(), $.password_textfield.value, {
        success : function(newuser) {
            Ti.API.info('Login newuser :' + JSON.stringify(newuser));
            // Alloy.Globals.UserId = newuser.id;
            // Alloy.Globals.Userusername = newuser.get("username");
            Titanium.App.Properties.setString('parse_user', newuser);
            Titanium.App.Properties.setString('parse_user_id', newuser.id);
            Titanium.App.Properties.setString('parse_user_name', newuser.get("username"));

            var db = Titanium.Database.install('/myparse.db', 'myparse');
            db.execute('UPDATE setting SET username=?,userId=?,isregister=?', newuser.get("username").toLowerCase(), newuser.id, 1);
            db.close();
            var tgb = Alloy.createController('win_tab_group').getView();
            tgb.open();
            if (OS_IOS) {
                Alloy.Globals.navigation_close();
            } else {
                $.win_login.close();
                Alloy.Globals.home_close();
            }
            // alert('open tabgroup');

        },
        error : function(newuse, error) {
            Ti.API.info('Login Error :' + JSON.stringify(error));
            utility.showalertDialog(error.message);
        }
    });
});

Alloy.Globals.facbook_login = function() {
    var xhr = Ti.Network.createHTTPClient();
    Titanium.App.Properties.removeProperty('login_user');
    xhr.open("GET", 'https://graph.facebook.com/?ids=' + Alloy.Globals.fb.uid + '&access_token=' + Titanium.App.Properties.getString('token'));
    xhr.setTimeout(1000);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.onload = function() {
        Ti.API.info('onload this.responseText :' + this.responseText);
        if (this.responseText !== null) {
            Titanium.App.Properties.setString('login_user', this.responseText);
            var expireIn = (Alloy.Globals.fb.expirationDate).toISOString();
            var authData = {
                "facebook" : {
                    "id" : Alloy.Globals.fb.uid,
                    "access_token" : Titanium.App.Properties.getString('token'),
                    "expiration_date" : expireIn // "format: yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
                }
            };
            var User = Parse.Object.extend("User");
            var query = new Parse.Query(User);
            query.equalTo("fbUserId", Alloy.Globals.fb.uid);
            query.limit(1);
            query.find({
                success : function(results) {
                    Alloy.Globals.authData = authData;
                    if (results.length > 0) {
                        Ti.API.info('Facebook User Already Exist in Parse - Do login');
                        Ti.API.info('results[0].get("fbUserId").length: ' + results[0].get("fbUserId").length);
                        Ti.API.info('results[0]' + JSON.stringify(results[0]));
                        Ti.API.info('results' + JSON.stringify(results));
                        Ti.API.info('results.length: ' + results.length);
                        facebookLogin_success(results[0]);
                    } else {
                        Ti.API.info('Facebook User DOES not exist');
                        Titanium.App.Properties.setString('image', "https://graph.facebook.com/" + Alloy.Globals.fb.uid + "/picture?type=large");
                        Titanium.App.Properties.setString('uid', Alloy.Globals.fb.uid);
                        if (Titanium.App.Properties.hasProperty('login_user')) {
                            Alloy.Globals.social = 'facebook';
                            var social = {
                                "social" : 'facebook'
                            };

                            Alloy.Globals.open_signupsocial(social);
                        }
                    }
                },
                error : function(error) {
                    Ti.API.info("Error: " + error.code + " " + error.message);
                    utility.showalertDialog(error.message)
                }
            });
        }
    };
    xhr.onerror = function() {
        Ti.API.info('onerror this.responseText :');
        utility.showalertDialog("Server not responding /n Please try again.");
        if (Alloy.Globals.fb.loggedIn) {
            Alloy.Globals.fb.logout();
        }
    };
    xhr.send();
};
var facebookLogin_success = function(FbUser) {
    if (FbUser) {
        Ti.API.info('winBase UserID :' + FbUser.id + " userName :" + FbUser.get("username").toLowerCase());
        Alloy.Globals.TiFacbookLoggedIn = true;
        Alloy.Globals.social = 'facebook';
        //Alloy.Globals.UserId = FbUser.id;
        //Alloy.Globals.Userusername = FbUser.get("username").toLowerCase();
        Titanium.App.Properties.setString('parse_user_id', FbUser.id);
        Titanium.App.Properties.setString('parse_user_name', FbUser.get("username").toLowerCase());
        var db = Titanium.Database.install('/myparse.db', 'myparse');
        db.execute('UPDATE setting SET username=?,userId=?,isregister=?', FbUser.get("username").toLowerCase(), FbUser.id, 1);
        db.close();
        var tgb = Alloy.createController('win_tab_group').getView();
        tgb.open();
        if (OS_IOS) {
            Alloy.Globals.navigation_close();
        } else {
            $.win_login.close();
            Alloy.Globals.home_close();
        }
    }
};

$.signin_button.addEventListener('click', function(e) {
    Alloy.Globals.loginViaFacebook = true;
    if (first_time_click == false) {
        first_time_click = true;
        if (Alloy.Globals.fb.loggedIn) {
            Alloy.Globals.facbook_login();
            Alloy.Globals.isScreenUsedForSignup = false;
            first_time_click = false;
        } else {
            first_time_click = true;
            Alloy.Globals.fb.authorize();
            first_time_click = false;
        }
    }
});

$.forgot_password_lbl.addEventListener('click', function(e) {
    Alloy.Globals.open_forgot_password();
});
Alloy.Globals.login_close = function() {
    $.win_login.close();
};
/*
 function addSubView() {

 view_parent = Titanium.UI.createView({
 top : 0,
 left : 0,
 right : 0,
 bottom : 0,
 backgroundColor : 'gray'
 });

 var view_child = Titanium.UI.createView({
 left : '5%',
 right : '5%',
 layout : 'vertical',
 backgroundColor : 'white',
 height : '50%'
 });
 var label_forgot = Titanium.UI.createLabel({
 top : '1%',
 left : 0,
 right : 0,
 textAlign : 'center',
 text : 'Enter E-mail address.',
 color : 'black'
 });

 var forgot_textfield = Titanium.UI.createTextField({
 top : '2%',
 left : 2,
 right : 2,
 paddingLeft : 2,
 paddingRight : 2,
 autocorrect : false,
 returnKeyType : Ti.UI.RETURNKEY_DONE,
 autocorrect : false,
 backgroundColor : 'transparent',
 font : {
 fontSize : Alloy.CFG.android_fonts.win_home_27,
 fontFamily : Alloy.Globals.fontFamily
 },
 color : Alloy.CFG.colors.color_black,
 clearButtonMode : Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
 keyboardType : Titanium.UI.KEYBOARD_EMAIL,
 hintText : 'Email',
 height : '14%'
 });
 var doneButton = Titanium.UI.createButton({
 left : '5%',
 top : '2%',
 title : 'Send'
 });
 doneButton.addEventListener('click', function(e) {
 if (forgot_textfield.value.trim().length === 0) {
 utility.showalertDialog("Please enter E-mail address.");
 return;
 } else {
 if (utility.validateEmail(forgot_textfield.value)) {
 } else {
 utility.showalertDialog("Please enter your valid E-mail address.");
 forgot_textfield.value = '';
 return;
 }
 }

 Parse.User.requestPasswordReset(forgot_textfield.value, {
 success : function(e) {
 Ti.API.info('Success' + JSON.stringify(e));
 var alertDialog = utility.showalertDialogWithButton("We have sent link on provided E-mail to reset your password.");
 alertDialog.addEventListener('click', function() {
 $.win_login.remove(view_parent);
 });
 alertDialog.show();
 },
 error : function(error) {
 utility.showalertDialog(error.message);
 }
 });
 });
 var cancelButton = Titanium.UI.createButton({
 left : '5%',
 top : '2%',
 title : 'Cancel'
 });
 cancelButton.addEventListener('click', function(e) {
 $.win_login.remove(view_parent);
 });
 view_child.add(label_forgot);
 view_child.add(forgot_textfield);
 view_child.add(doneButton);
 view_child.add(cancelButton);
 view_parent.add(view_child);
 $.win_login.add(view_parent);
 };*/
