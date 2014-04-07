var utility = require("utility");
var first_time_click = false;
$.facecbook_view.addEventListener('click', function(e) {
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
            Titanium.App.Properties.setString('image', "https://graph.facebook.com/" + Alloy.Globals.fb.uid + "/picture?type=large");
            Titanium.App.Properties.setString('uid', Alloy.Globals.fb.uid);
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
                            var social = {
                                "social" : 'facebook'
                            };
                            Alloy.Globals.open_signupsocial(social);
                        }
                    }
                },
                error : function(error) {
                    alert("Error: " + error.code + " " + error.message);
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
        // Alloy.Globals.UserId = FbUser.id;
        // Alloy.Globals.Userusername = FbUser.get("username").toLowerCase();
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
            $.win_home.close();
        }
        // alert('open tabgroup');

    }
};
$.login_lbl.addEventListener('click', function(e) {
    var loginWin = Alloy.createController('win_login').getView();
    if (OS_IOS) {
        $.navigation.openWindow(loginWin, {
            animated : true
        });
    } else {
        loginWin.open();
    }
});
Alloy.Globals.open_forgot_password = function() {
    var forgot_password = Alloy.createController('win_forgot_password').getView();
    if (OS_IOS) {
        $.navigation.openWindow(forgot_password, {
            animated : true
        });
    } else {
        forgot_password.open();
    }
};
Alloy.Globals.open_signupsocial = function(data) {
    var SignupSocailWin = Alloy.createController('win_signupsocial', data).getView();
    if (OS_IOS) {
        $.navigation.openWindow(SignupSocailWin, {
            animated : true
        });
    } else {
        SignupSocailWin.open();
    }
};
Alloy.Globals.navigation_close = function() {
    $.navigation.close();
};
Alloy.Globals.home_close = function() {
    $.win_home.close();
};

