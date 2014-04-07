// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.CFG.platformWidth = Titanium.Platform.displayCaps.platformWidth;
Alloy.CFG.platformHeight = Titanium.Platform.displayCaps.platformHeight;
Alloy.Globals.loginViaFacebook = false;
Alloy.Globals.socialContacts = false;
Alloy.Globals.facebookSpinviteUser = false;
Alloy.Globals.fb = require('facebook');
Alloy.Globals.fb.appid = Alloy.CFG.facebook.appID;
Alloy.Globals.fb.permissions = ['publish_stream', 'read_stream', 'email', 'user_location', 'user_videos', 'user_birthday', 'user_actions.video', 'user_photos', 'export_stream', 'photo_upload', 'read_friendlists', 'status_update', 'xmpp_login', 'video_upload', 'user_actions.video'];
Alloy.Globals.fb.forceDialogAuth = true;

var facebook_login = function(e) {
    if (e.success) {

        Titanium.App.Properties.setString('token', Alloy.Globals.fb.getAccessToken());

        if (Alloy.Globals.loginViaFacebook) {
            Alloy.Globals.facbook_login();
        } else {
            //Alloy.Globals.facebook_signup();
            Alloy.Globals.facbook_login();
        }
    } else if (e.cancelled) {
        Ti.API.info('Facebook login cancelled');
    } else if (e.error) {
    } else {
        Alloy.Globals.fb.logout();
    }
};
Alloy.Globals.fb.addEventListener('login', facebook_login);

Alloy.Globals.fontFamily = (OS_IOS) ? "Roboto" : "Roboto-Regular";
Alloy.Globals.platform_width = Titanium.Platform.displayCaps.platformWidth;
Alloy.Globals.platform_height = Titanium.Platform.displayCaps.platformHeight;
Alloy.CFG.UI = {
    "socialsignupProfile" : Alloy.CFG.platformHeight * 0.1666,
    "half_socialsignupProfile" : (Alloy.CFG.platformHeight * 0.1666) / 2,
    "height_txtfield_72" : Alloy.CFG.platformHeight * 0.085,
    "width_textfield_95" : Alloy.CFG.platformWidth * 0.95,
    "width_button_85" : (Alloy.Globals.platformWidth * 0.85),
    "win_home_login_view_height" : (Alloy.CFG.platformHeight / 2),
    "win_home_commonView_height" : ((Alloy.CFG.platformHeight / 2) * 0.2),
    "win_home_commonView_width" : (Alloy.CFG.platformWidth * 0.8),
    "win_home_common_imageview_left" : ((Alloy.CFG.platformWidth * 0.8) * 0.10),
    "win_home_common_imageview_width" : ((Alloy.CFG.platformWidth * 0.8) * 0.17),
    "win_home_common_imageview_height" : (((Alloy.CFG.platformHeight / 2) * 0.2) * 0.7),
    "win_home_common_lbl_left" : ((Alloy.CFG.platformWidth * 0.8) * 0.29),
    "win_home_twitter_top" : ((Alloy.CFG.platformHeight / 2) * 0.25),
    "win_home_google_view_top" : ((Alloy.CFG.platformHeight / 2) * 0.5),
    "win_home_linkedin_view_top" : ((Alloy.CFG.platformHeight / 2) * 0.75),
    "win_home_bottomView_height" : Alloy.CFG.platformHeight * 0.20,
    "win_home_alreadylogin_lbl_height" : ((Alloy.CFG.platformHeight * 0.20) * 0.02),
    "win_login_login_view_top" : (Alloy.CFG.platformHeight * 0.25),
    "win_login_login_view_left" : (Alloy.CFG.platformWidth * 0.05),
    "win_login_login_view_height" : (Alloy.CFG.platformHeight * 0.18),
    "win_login_textfield_height" : (Alloy.CFG.platformHeight * 0.18) * 0.49,
    "win_login_divider_height" : (Alloy.CFG.platformHeight * 0.18) * 0.01,
    "win_login_button_height" : (Alloy.CFG.platformHeight * 0.07),
    "win_login_login_button_height" : (Alloy.CFG.platformHeight * 0.45),
    "win_login_signin_button_bottom" : (Alloy.CFG.platformHeight * 0.1),
    "win_login_signin_button_height" : (Alloy.CFG.platformHeight * 0.08),
    "win_login_signin_button_left" : (Alloy.CFG.platformWidth * 0.2),
    "win_login_forgot_password_lbl_bottom" : (Alloy.CFG.platformHeight * 0.05)

};

if (OS_ANDROID) {
    Alloy.CFG.platformDPI = Ti.Platform.displayCaps.dpi;
    var mod = require('ti.physicalSizeCategory');
    switch(mod.physicalSizeCategory) {
        case 'small':
            Titanium.API.info('------------------------Small device success------------------------------- :' + Alloy.CFG.platformDPI);
            Alloy.CFG.android_fonts = {

            };
            break;
        case 'normal':
            Titanium.API.info('------------------------Normal device success------------------------------- :' + Alloy.CFG.platformDPI);
            if (Alloy.CFG.platformDPI <= 160) {
                Alloy.CFG.android_fonts = {
                    //win_home.js
                    "win_home_27" : 20, // facebook,Twitter,Linkedin Label
                    //win_login.js
                    "win_login_via_button_forgotlabel" : 14,
                };

            } else if (Alloy.CFG.platformDPI >= 160 && Alloy.CFG.platformDPI <= 300) {
                
                Alloy.CFG.android_fonts = {
                    //win_home.js
                    "win_home_27" : 24, // facebook,Twitter,Linkedin Label
                    //win_login.js
                    "win_login_via_button_forgotlabel" : 18,
                };

            } else if (Alloy.CFG.platformDPI >= 300) {
                Alloy.CFG.android_fonts = {
                    //win_home.js
                    "win_home_27" : 28, // facebook,Twitter,Linkedin Label
                    //win_login.js
                    "win_login_via_button_forgotlabel" : 22,
                };
            } else {
                Alloy.CFG.android_fonts = {
                    //win_home.js
                    "win_home_27" : 28, // facebook,Twitter,Linkedin Label
                    //win_login.js
                    "win_login_via_button_forgotlabel" : 22,
                };
            }
            break;
        case 'large':
            Titanium.API.info('------------------------Large device success------------------------------- :' + Alloy.CFG.platformDPI);
            Alloy.CFG.android_fonts = {
                //win_home.js
                "win_home_27" : 28, // facebook,Twitter,Linkedin Label
                //win_login.js
                "win_login_via_button_forgotlabel" : 22,
            };
            break;
        case 'xlarge':
            Titanium.API.info('------------------------X-Large device success------------------------------- :' + Alloy.CFG.platformDPI);
            Alloy.CFG.android_fonts = {
                //win_home.js
                "win_home_27" : 32, // facebook,Twitter,Linkedin Label
                //win_login.js
                "win_login_via_button_forgotlabel" : 25,
            };
            break;
        case 'default':
            break;
    }

} else {
    Alloy.CFG.android_fonts = {
        //win_home.js
        "win_home_27" : 15, // facebook,Twitter,Linkedin Label
        //win_login.js
        "win_login_via_button_forgotlabel" : 12
    };
}

