var utility = require("utility");
var args = arguments[0] || {};
var checkSocailAct = false;
var current_focus_element = null;
var text = 'Terms and Conditions';
$.postActivity.text = 'Post activity on' + " " + args.social;

//////-------------TextFeild txtFullName--------------
$.txtFullName.addEventListener('focus', function(e) {
    current_focus_element = $.txtFullName;
});
$.txtFullName.addEventListener('return', function(e) {
    $.txtUserName.focus();
});
/////////------------TextFeild txtUserName-----------
$.txtUserName.addEventListener('focus', function(e) {
    current_focus_element = $.txtUserName;
});
$.txtUserName.addEventListener('return', function(e) {
    $.txtEmail.focus();
});
///////---------- TextFeild txtEmail-------------
$.txtEmail.addEventListener('focus', function(e) {
    current_focus_element = $.txtEmail;
});
$.txtEmail.addEventListener('return', function(e) {
    $.txtPassword.focus();
});
//////----------textField txtPassword-------------
$.txtPassword.addEventListener('focus', function(e) {
    current_focus_element = $.txtPassword;
});
$.txtPassword.addEventListener('return', function(e) {
    $.txtconfirmPassword.focus();
});
$.txtconfirmPassword.addEventListener('focus', function(e) {
    current_focus_element = $.txtconfirmPassword;
});

var json_data = JSON.parse(Titanium.App.Properties.getString('login_user'));
$.userimage.image = Titanium.App.Properties.getString('image');
utility.cachedImageView('userImage', Titanium.App.Properties.getString('image'), $.userimage);
var fb_id = json_data[Titanium.App.Properties.getString('uid')].id;
$.txtFullName.value = json_data[Titanium.App.Properties.getString('uid')].name;
var fbEmail = json_data[Titanium.App.Properties.getString('uid')].email;
$.txtEmail.value = fbEmail.toLowerCase();

$.chkmark.addEventListener('click', function(e) {
    if (current_focus_element) {
        current_focus_element.blur();
    }
    if ($.chkmark.image == '/images/blueuncheck.png') {
        checkSocailAct = true;
        $.chkmark.image = '/images/bluecheck.png';
    } else {
        checkSocailAct = false;
        $.chkmark.image = '/images/blueuncheck.png';
    }
});

var selected_option = 0;
////---------Upload button click------------
$.upload.addEventListener('click', function(e) {
    // openOptions();
    utility.androidOptionDialog(["Take Photo", "Choose from Library", "Cancel"], "Change Profile Picture", selected_option, onOptionClicked);
});
function onOptionClicked(e) {
    selected_option = e.index;
    switch(e.index) {
        case 0:
            //Take Photo
            var options_camera = {
                success : function(imagedata) {
                    $.userimage.image = imagedata;
                },
                error : function(error) {
                    Ti.API.info('Error :' + JSON.stringify(error));
                }
            };
            utility.takeNewPicFromCamera(options_camera);
            break;
        case 1:
            //Choose from Library
            var options_gallery = {
                success : function(imagedata) {
                    $.userimage.image = imagedata;
                },
                error : function(error) {
                    Ti.API.info('Error :' + JSON.stringify(error));
                }
            };
            utility.takeNewPicFromGallery(options_gallery);
            break;
        case 2:
            //cancel
            break;
    }

}

////////------------post Login Activity of Facebook/ twittwe-------------
var postOnSocial = function() {
    Ti.API.info('Post on Scocial');

    if (Alloy.Globals.fb.loggedIn) {
        var data = {
            link : "http://mepintoo.blogspot.com",
            name : "The test Application .",
            message : "test Application - Titanium iPhone + android .",
            caption : "test Application - Titanium iPhone + android.",
            description : "est Application - Titanium iPhone + android.",
            test : [{
                foo : 'Encoding test',
                bar : 'Durp durp'
            }, 'test']
        };
        Alloy.Globals.fb.requestWithGraphPath('me/feed', data, "POST", function(e) {
            if (e.success) {
                Titanium.API.info('------success:' + JSON.stringify(e.success));
            } else {
                if (e.error) {
                    Titanium.API.info('------error:' + JSON.stringify(e.error));
                } else {

                    Titanium.API.info('------strange error:');
                }
            }
        });
    }

};

if (OS_IOS) {
    $.termsandcond.attributedString = Titanium.UI.iOS.createAttributedString({
        text : text,
        attributes : [{
            type : Titanium.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
            value : Titanium.UI.iOS.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
            range : [0, text.length]
        }]
    });
} else {
    $.termsandcond.html = "<U>" + text + "</U>";
}

$.rightButton.addEventListener('click', function(e) {

    var fb_userid = null;
    var twitter_userid = null;
    var google_userid = null;
    var linkedIn_userid = null;

    fb_userid = Titanium.App.Properties.getString('uid');
    twitter_userid = "";
    google_userid = "";
    linkedIn_userid = "";

    Ti.API.info('-------fbUserid------' + fb_userid);
    Ti.API.info('-------twitterUserId------' + twitter_userid);
    Ti.API.info('-------googleUserId------' + google_userid);
    Ti.API.info('-------linkedInUserId------' + linkedIn_userid);

    /////-------check for Profile pic image -------------
    var profileImageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'userImage/' + 'profilePic.png');
    var parseFile = null;
    if (profileImageFile.exists()) {
        var Imagedata = profileImageFile.read();
        var encodedImagedata = Ti.Utils.base64encode(Imagedata);
        var name = "profilePic.png";
        parseFile = new Parse.File(name, {
            base64 : encodedImagedata.toString()
        });
    } else {
        ////-------------if profileImageFile is not exist than it ask to Upload image------------
        utility.showalertDialog("Please select profile picture");
        return;
    }

    Ti.API.info('-------txtUserName------' + $.txtUserName.value);
    Ti.API.info('-------txtUserName------' + $.txtUserName.value.trim().length);
    Ti.API.info('-------txtEmail------' + $.txtEmail.value);
    Ti.API.info('-------txtEmail------' + $.txtEmail.value.trim().length);
    Ti.API.info('-------txtPassword------' + $.txtPassword.value);
    Ti.API.info('-------txtPassword------' + $.txtPassword.value.trim().length);
    Ti.API.info('-------txtconfirmPassword------' + $.txtconfirmPassword.value);
    Ti.API.info('-------txtconfirmPassword------' + $.txtconfirmPassword.value.trim().length);

    if (current_focus_element) {
        current_focus_element.blur();
    }
    if ($.txtFullName.value.trim().length === 0) {
        utility.showalertDialog('Please enter full name.');
        $.txtFullName.value = '';
        return;
    }
    if ($.txtUserName.value.trim().length === 0) {
        utility.showalertDialog('Please enter user name.');
        $.txtUserName.value = '';
        return;
    }
    if ($.txtEmail.value.trim().length === 0) {
        utility.showalertDialog('Please enter email.');
        $.txtEmail.value = '';
        return;
    } else {
        if (utility.validateEmail($.txtEmail.value)) {
        } else {
            utility.showalertDialog("Please enter your valid E-mail address.");
            $.txtEmail.value = '';
            return;
        }
    }
    if ($.txtPassword.value.trim().length === 0) {
        utility.showalertDialog('Please enter password.');
        $.txtPassword.value = '';
        return;
    }
    if ($.txtconfirmPassword.value.trim().length === 0) {
        utility.showalertDialog('Please enter confirm password.');
        $.txtconfirmPassword.value = '';
        return;
    }
    if ($.txtconfirmPassword.value.trim() !== $.txtPassword.value.trim()) {
        utility.showalertDialog('Please and confirm password not match.');
        $.txtPassword.value = '';
        $.txtconfirmPassword.value = '';
        return;
    }
    var fname = $.txtFullName.value.split(" ");
    var User = Parse.Object.extend("User");
    var newuser = new User();
    Ti.API.info('--this is new user' + newuser);
    /////---------Save new User---------------
    parseFile.save().then(function(obj) {
        Ti.API.info('--this is new user ssave');
        newuser.save({
            username : $.txtUserName.value.toLowerCase(),
            password : $.txtPassword.value,
            authData : Alloy.Globals.authData,
            email : ($.txtEmail.value).toLowerCase(),
            firstName : (fname[0]) ? fname[0] : "",
            lastName : (fname[1]) ? fname[1] : "",
            profilePic : parseFile,
            fbUserId : fb_userid,
            twitterUserId : twitter_userid,
            googleUserId : google_userid,
            linkedInUserId : linkedIn_userid,
            phoneNumber : 123
        }, {
            success : function(newuser, success) {
                Ti.API.info('New User :' + JSON.stringify(newuser));
                Ti.API.info('New User :' + newuser);
                /////--------Login with User-------------
                Parse.User.logIn($.txtUserName.value.toLowerCase(), $.txtPassword.value, {
                    success : function(newuser) {
                        Ti.API.info('Login Success ');
                        // Alloy.Globals.UserData = newuser;
                        // Alloy.Globals.UserId = newuser.id;
                        
                        Titanium.App.Properties.setString('parse_user', newuser);
                        Titanium.App.Properties.setString('parse_user_id', newuser.id);
                        Titanium.App.Properties.setString('parse_user_name', newuser.get("username"));
                        
                        Ti.API.info('newuser.username :' + newuser.get("username"));
                        if ($.chkmark.image == '/images/bluecheck.png') {
                            alert('open 2')
                            postOnSocial();
                        }
                        var db = Titanium.Database.install('/myparse.db', 'myparse');
                        db.execute('UPDATE setting SET username=?,userId=?,isregister=?', newuser.get("username"), newuser.id, 1);
                        db.close();
                        alert('open tabgroup')
                    },
                    error : function(newuser, error) {
                        Ti.API.info('Login Error :' + JSON.stringify(error));
                    }
                });
            },
            error : function(newuser, error) {
                Ti.API.info('New User error:');
                Ti.API.info('New User error:', JSON.stringify(error));
                Ti.API.info('New User error:', error);
                Ti.API.info('Failed to create new object, with error code: ' + error.description);
                if (error.code == 202) {
                    utility.showalertDialog("The username '" + ($.txtUserName.value).toLowerCase() + "' has already been taken, please choose a different one.");
                } else if (error.code == 203) {
                    utility.showalertDialog("The email '" + ($.txtEmail.value).toLowerCase() + "' has already been taken, please choose a different one.");
                }
            }
        });

    }, function(error) {
        Ti.API.info('--this is new user error');
        utility.showalertDialog("Unable to upload image.Please Try  again.");
    });

});
