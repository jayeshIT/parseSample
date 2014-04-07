(function() {

    require('parse-1.2.16');
    Ti.API.info('-----Alloy.CFG.parsekeys.ApplicationID:' + Alloy.CFG.parsekeys.Applicationid);
    Ti.API.info('----- Alloy.CFG.parsekeys.javascript_Key:' + Alloy.CFG.parsekeys.javascript_Key);
    Ti.API.info('----- Alloy.CFG.parsekeys.restAPIKey:' + Alloy.CFG.parsekeys.restAPIKey);
    Parse.initialize(Alloy.CFG.parsekeys.Applicationid, Alloy.CFG.parsekeys.javascript_Key, Alloy.CFG.parsekeys.restAPIKey);

    exports.isiOS7Plus = function() {
        // iOS-specific test
        if (Titanium.Platform.name == 'iPhone OS') {
            var version = Titanium.Platform.version.split(".");
            var major = parseInt(version[0], 10);

            // Can only test this support on a 3.2+ device
            if (major >= 7) {
                return true;
            }
        }
        return false;
    };
    exports.showalertDialog = function(msg) {
        Titanium.UI.createAlertDialog({
            message : msg,
            title : 'sample',
            buttonNames : ['OK']
        }).show();
    };
    exports.validateEmail = function(emailAddr) {
        if (emailAddr.trim()) {
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            var txt = emailAddr;
            if (reg.test(txt)) {
                return true;
            } else {
                return false;
            }
        }
    };
    exports.cachedImageView = function(imageDirectoryName, url, imageViewObject) {
        Ti.API.info('cachedImageView is loaded');
        if (url != null && url != "") {
            var filename = url.split('/');
            filename = filename[filename.length - 1];
            // Try and get the file that has been previously cached
            var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageDirectoryName, 'profilePic.png');
            var g = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageDirectoryName);
            if (!g.exists()) {
                g.createDirectory();
            }
            var xhr = Ti.Network.createHTTPClient();
            xhr.onload = function() {
                if (xhr.status == 200) {
                    file.write(xhr.responseData);
                    imageViewObject.image = file.nativePath;
                }
            };
            xhr.open('GET', url);
            xhr.send();
        }

    };
    exports.showalertDialogWithButton = function(msg) {
        return Ti.UI.createAlertDialog({
            title : "Smaple",
            message : msg,
            buttonNames : ['OK']
        });
    };
    exports.takeNewPicFromGallery = function(callback) {
        Titanium.Media.openPhotoGallery({
            success : function(event) {
                if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    try {
                        callback.success(event.media);
                    } catch(exx) {
                        Ti.API.info('Gallery Exx :' + JSON.stringify(exx));

                    }
                }
            },
            cancel : function() {

            },
            error : function(error) {

                callback.error(error);
            },
            mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
        });

    };
    exports.takeNewPicFromCamera = function(callback) {
        Titanium.Media.showCamera({
            success : function(event) {
                if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    try {
                        callback.success(event.media);
                    } catch(ex) {
                        Ti.API.info('Camera Exx :' + JSON.stringify(ex));
                    }
                }
            },
            cancel : function() {

            },
            error : function(error) {
                Ti.API.info('Camera error :' + JSON.stringify(error));
                if (error.code == Titanium.Media.NO_CAMERA) {
                }
                callback.error(error);
            },
            // allowEditing : true,
            mediaTypes : Ti.Media.MEDIA_TYPE_PHOTO,
            showControls : true
        });
    };
    exports.tableviewfilter = function(indletters, data) {
        var tablefilter = [{
            title : 'A',
            index : (indletters.indexOf('A') > -1) ? indletters.indexOf('A') : (indletters.indexOf('B') > -1) ? indletters.indexOf('B') : (indletters.indexOf('C') > -1) ? indletters.indexOf('C') : (indletters.indexOf('D') > -1) ? indletters.indexOf('D') : (indletters.indexOf('E') > -1) ? indletters.indexOf('E') : (indletters.indexOf('F') > -1) ? indletters.indexOf('F') : (indletters.indexOf('G') > -1) ? indletters.indexOf('G') : (indletters.indexOf('H') > -1) ? indletters.indexOf('H') : (indletters.indexOf('I') > -1) ? indletters.indexOf('I') : (indletters.indexOf('J') > -1) ? indletters.indexOf('J') : (indletters.indexOf('K') > -1) ? indletters.indexOf('K') : (indletters.indexOf('L') > -1) ? indletters.indexOf('L') : (indletters.indexOf('M') > -1) ? indletters.indexOf('M') : (indletters.indexOf('N') > -1) ? indletters.indexOf('N') : (indletters.indexOf('O') > -1) ? indletters.indexOf('O') : (indletters.indexOf('P') > -1) ? indletters.indexOf('P') : (indletters.indexOf('Q') > -1) ? indletters.indexOf('Q') : (indletters.indexOf('R') > -1) ? indletters.indexOf('R') : (indletters.indexOf('S') > -1) ? indletters.indexOf('S') : (indletters.indexOf('T') > -1) ? indletters.indexOf('T') : (indletters.indexOf('U') > -1) ? indletters.indexOf('U') : (indletters.indexOf('V') > -1) ? indletters.indexOf('V') : (indletters.indexOf('W') > -1) ? indletters.indexOf('W') : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'B',
            index : (indletters.indexOf('B') > -1) ? indletters.indexOf('B') : (indletters.indexOf('C') > -1) ? indletters.indexOf('C') : (indletters.indexOf('D') > -1) ? indletters.indexOf('D') : (indletters.indexOf('E') > -1) ? indletters.indexOf('E') : (indletters.indexOf('F') > -1) ? indletters.indexOf('F') : (indletters.indexOf('G') > -1) ? indletters.indexOf('G') : (indletters.indexOf('H') > -1) ? indletters.indexOf('H') : (indletters.indexOf('I') > -1) ? indletters.indexOf('I') : (indletters.indexOf('J') > -1) ? indletters.indexOf('J') : (indletters.indexOf('K') > -1) ? indletters.indexOf('K') : (indletters.indexOf('L') > -1) ? indletters.indexOf('L') : (indletters.indexOf('M') > -1) ? indletters.indexOf('M') : (indletters.indexOf('N') > -1) ? indletters.indexOf('N') : (indletters.indexOf('O') > -1) ? indletters.indexOf('O') : (indletters.indexOf('P') > -1) ? indletters.indexOf('P') : (indletters.indexOf('Q') > -1) ? indletters.indexOf('Q') : (indletters.indexOf('R') > -1) ? indletters.indexOf('R') : (indletters.indexOf('S') > -1) ? indletters.indexOf('S') : (indletters.indexOf('T') > -1) ? indletters.indexOf('T') : (indletters.indexOf('U') > -1) ? indletters.indexOf('U') : (indletters.indexOf('V') > -1) ? indletters.indexOf('V') : (indletters.indexOf('W') > -1) ? indletters.indexOf('W') : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'C',
            index : (indletters.indexOf('C') > -1) ? indletters.indexOf('C') : (indletters.indexOf('D') > -1) ? indletters.indexOf('D') : (indletters.indexOf('E') > -1) ? indletters.indexOf('E') : (indletters.indexOf('F') > -1) ? indletters.indexOf('F') : (indletters.indexOf('G') > -1) ? indletters.indexOf('G') : (indletters.indexOf('H') > -1) ? indletters.indexOf('H') : (indletters.indexOf('I') > -1) ? indletters.indexOf('I') : (indletters.indexOf('J') > -1) ? indletters.indexOf('J') : (indletters.indexOf('K') > -1) ? indletters.indexOf('K') : (indletters.indexOf('L') > -1) ? indletters.indexOf('L') : (indletters.indexOf('M') > -1) ? indletters.indexOf('M') : (indletters.indexOf('N') > -1) ? indletters.indexOf('N') : (indletters.indexOf('O') > -1) ? indletters.indexOf('O') : (indletters.indexOf('P') > -1) ? indletters.indexOf('P') : (indletters.indexOf('Q') > -1) ? indletters.indexOf('Q') : (indletters.indexOf('R') > -1) ? indletters.indexOf('R') : (indletters.indexOf('S') > -1) ? indletters.indexOf('S') : (indletters.indexOf('T') > -1) ? indletters.indexOf('T') : (indletters.indexOf('U') > -1) ? indletters.indexOf('U') : (indletters.indexOf('V') > -1) ? indletters.indexOf('V') : (indletters.indexOf('W') > -1) ? indletters.indexOf('W') : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'D',
            index : (indletters.indexOf('D') > -1) ? indletters.indexOf('D') : (indletters.indexOf('E') > -1) ? indletters.indexOf('E') : (indletters.indexOf('F') > -1) ? indletters.indexOf('F') : (indletters.indexOf('G') > -1) ? indletters.indexOf('G') : (indletters.indexOf('H') > -1) ? indletters.indexOf('H') : (indletters.indexOf('I') > -1) ? indletters.indexOf('I') : (indletters.indexOf('J') > -1) ? indletters.indexOf('J') : (indletters.indexOf('K') > -1) ? indletters.indexOf('K') : (indletters.indexOf('L') > -1) ? indletters.indexOf('L') : (indletters.indexOf('M') > -1) ? indletters.indexOf('M') : (indletters.indexOf('N') > -1) ? indletters.indexOf('N') : (indletters.indexOf('O') > -1) ? indletters.indexOf('O') : (indletters.indexOf('P') > -1) ? indletters.indexOf('P') : (indletters.indexOf('Q') > -1) ? indletters.indexOf('Q') : (indletters.indexOf('R') > -1) ? indletters.indexOf('R') : (indletters.indexOf('S') > -1) ? indletters.indexOf('S') : (indletters.indexOf('T') > -1) ? indletters.indexOf('T') : (indletters.indexOf('U') > -1) ? indletters.indexOf('U') : (indletters.indexOf('V') > -1) ? indletters.indexOf('V') : (indletters.indexOf('W') > -1) ? indletters.indexOf('W') : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'E',
            index : (indletters.indexOf('E') > -1) ? indletters.indexOf('E') : (indletters.indexOf('F') > -1) ? indletters.indexOf('F') : (indletters.indexOf('G') > -1) ? indletters.indexOf('G') : (indletters.indexOf('H') > -1) ? indletters.indexOf('H') : (indletters.indexOf('I') > -1) ? indletters.indexOf('I') : (indletters.indexOf('J') > -1) ? indletters.indexOf('J') : (indletters.indexOf('K') > -1) ? indletters.indexOf('K') : (indletters.indexOf('L') > -1) ? indletters.indexOf('L') : (indletters.indexOf('M') > -1) ? indletters.indexOf('M') : (indletters.indexOf('N') > -1) ? indletters.indexOf('N') : (indletters.indexOf('O') > -1) ? indletters.indexOf('O') : (indletters.indexOf('P') > -1) ? indletters.indexOf('P') : (indletters.indexOf('Q') > -1) ? indletters.indexOf('Q') : (indletters.indexOf('R') > -1) ? indletters.indexOf('R') : (indletters.indexOf('S') > -1) ? indletters.indexOf('S') : (indletters.indexOf('T') > -1) ? indletters.indexOf('T') : (indletters.indexOf('U') > -1) ? indletters.indexOf('U') : (indletters.indexOf('V') > -1) ? indletters.indexOf('V') : (indletters.indexOf('W') > -1) ? indletters.indexOf('W') : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'F',
            index : (indletters.indexOf('F') > -1) ? indletters.indexOf('F') : (indletters.indexOf('G') > -1) ? indletters.indexOf('G') : (indletters.indexOf('H') > -1) ? indletters.indexOf('H') : (indletters.indexOf('I') > -1) ? indletters.indexOf('I') : (indletters.indexOf('J') > -1) ? indletters.indexOf('J') : (indletters.indexOf('K') > -1) ? indletters.indexOf('K') : (indletters.indexOf('L') > -1) ? indletters.indexOf('L') : (indletters.indexOf('M') > -1) ? indletters.indexOf('M') : (indletters.indexOf('N') > -1) ? indletters.indexOf('N') : (indletters.indexOf('O') > -1) ? indletters.indexOf('O') : (indletters.indexOf('P') > -1) ? indletters.indexOf('P') : (indletters.indexOf('Q') > -1) ? indletters.indexOf('Q') : (indletters.indexOf('R') > -1) ? indletters.indexOf('R') : (indletters.indexOf('S') > -1) ? indletters.indexOf('S') : (indletters.indexOf('T') > -1) ? indletters.indexOf('T') : (indletters.indexOf('U') > -1) ? indletters.indexOf('U') : (indletters.indexOf('V') > -1) ? indletters.indexOf('V') : (indletters.indexOf('W') > -1) ? indletters.indexOf('W') : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'G',
            index : (indletters.indexOf('G') > -1) ? indletters.indexOf('G') : (indletters.indexOf('H') > -1) ? indletters.indexOf('H') : (indletters.indexOf('I') > -1) ? indletters.indexOf('I') : (indletters.indexOf('J') > -1) ? indletters.indexOf('J') : (indletters.indexOf('K') > -1) ? indletters.indexOf('K') : (indletters.indexOf('L') > -1) ? indletters.indexOf('L') : (indletters.indexOf('M') > -1) ? indletters.indexOf('M') : (indletters.indexOf('N') > -1) ? indletters.indexOf('N') : (indletters.indexOf('O') > -1) ? indletters.indexOf('O') : (indletters.indexOf('P') > -1) ? indletters.indexOf('P') : (indletters.indexOf('Q') > -1) ? indletters.indexOf('Q') : (indletters.indexOf('R') > -1) ? indletters.indexOf('R') : (indletters.indexOf('S') > -1) ? indletters.indexOf('S') : (indletters.indexOf('T') > -1) ? indletters.indexOf('T') : (indletters.indexOf('U') > -1) ? indletters.indexOf('U') : (indletters.indexOf('V') > -1) ? indletters.indexOf('V') : (indletters.indexOf('W') > -1) ? indletters.indexOf('W') : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'H',
            index : (indletters.indexOf('H') > -1) ? indletters.indexOf('H') : (indletters.indexOf('I') > -1) ? indletters.indexOf('I') : (indletters.indexOf('J') > -1) ? indletters.indexOf('J') : (indletters.indexOf('K') > -1) ? indletters.indexOf('K') : (indletters.indexOf('L') > -1) ? indletters.indexOf('L') : (indletters.indexOf('M') > -1) ? indletters.indexOf('M') : (indletters.indexOf('N') > -1) ? indletters.indexOf('N') : (indletters.indexOf('O') > -1) ? indletters.indexOf('O') : (indletters.indexOf('P') > -1) ? indletters.indexOf('P') : (indletters.indexOf('Q') > -1) ? indletters.indexOf('Q') : (indletters.indexOf('R') > -1) ? indletters.indexOf('R') : (indletters.indexOf('S') > -1) ? indletters.indexOf('S') : (indletters.indexOf('T') > -1) ? indletters.indexOf('T') : (indletters.indexOf('U') > -1) ? indletters.indexOf('U') : (indletters.indexOf('V') > -1) ? indletters.indexOf('V') : (indletters.indexOf('W') > -1) ? indletters.indexOf('W') : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'I',
            index : (indletters.indexOf('I') > -1) ? indletters.indexOf('I') : (indletters.indexOf('J') > -1) ? indletters.indexOf('J') : (indletters.indexOf('K') > -1) ? indletters.indexOf('K') : (indletters.indexOf('L') > -1) ? indletters.indexOf('L') : (indletters.indexOf('M') > -1) ? indletters.indexOf('M') : (indletters.indexOf('N') > -1) ? indletters.indexOf('N') : (indletters.indexOf('O') > -1) ? indletters.indexOf('O') : (indletters.indexOf('P') > -1) ? indletters.indexOf('P') : (indletters.indexOf('Q') > -1) ? indletters.indexOf('Q') : (indletters.indexOf('R') > -1) ? indletters.indexOf('R') : (indletters.indexOf('S') > -1) ? indletters.indexOf('S') : (indletters.indexOf('T') > -1) ? indletters.indexOf('T') : (indletters.indexOf('U') > -1) ? indletters.indexOf('U') : (indletters.indexOf('V') > -1) ? indletters.indexOf('V') : (indletters.indexOf('W') > -1) ? indletters.indexOf('W') : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'J',
            index : (indletters.indexOf('J') > -1) ? indletters.indexOf('J') : (indletters.indexOf('K') > -1) ? indletters.indexOf('K') : (indletters.indexOf('L') > -1) ? indletters.indexOf('L') : (indletters.indexOf('M') > -1) ? indletters.indexOf('M') : (indletters.indexOf('N') > -1) ? indletters.indexOf('N') : (indletters.indexOf('O') > -1) ? indletters.indexOf('O') : (indletters.indexOf('P') > -1) ? indletters.indexOf('P') : (indletters.indexOf('Q') > -1) ? indletters.indexOf('Q') : (indletters.indexOf('R') > -1) ? indletters.indexOf('R') : (indletters.indexOf('S') > -1) ? indletters.indexOf('S') : (indletters.indexOf('T') > -1) ? indletters.indexOf('T') : (indletters.indexOf('U') > -1) ? indletters.indexOf('U') : (indletters.indexOf('V') > -1) ? indletters.indexOf('V') : (indletters.indexOf('W') > -1) ? indletters.indexOf('W') : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'K',
            index : (indletters.indexOf('K') > -1) ? indletters.indexOf('K') : (indletters.indexOf('L') > -1) ? indletters.indexOf('L') : (indletters.indexOf('M') > -1) ? indletters.indexOf('M') : (indletters.indexOf('N') > -1) ? indletters.indexOf('N') : (indletters.indexOf('O') > -1) ? indletters.indexOf('O') : (indletters.indexOf('P') > -1) ? indletters.indexOf('P') : (indletters.indexOf('Q') > -1) ? indletters.indexOf('Q') : (indletters.indexOf('R') > -1) ? indletters.indexOf('R') : (indletters.indexOf('S') > -1) ? indletters.indexOf('S') : (indletters.indexOf('T') > -1) ? indletters.indexOf('T') : (indletters.indexOf('U') > -1) ? indletters.indexOf('U') : (indletters.indexOf('V') > -1) ? indletters.indexOf('V') : (indletters.indexOf('W') > -1) ? indletters.indexOf('W') : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'L',
            index : (indletters.indexOf('L') > -1) ? indletters.indexOf('L') : (indletters.indexOf('M') > -1) ? indletters.indexOf('M') : (indletters.indexOf('N') > -1) ? indletters.indexOf('N') : (indletters.indexOf('O') > -1) ? indletters.indexOf('O') : (indletters.indexOf('P') > -1) ? indletters.indexOf('P') : (indletters.indexOf('Q') > -1) ? indletters.indexOf('Q') : (indletters.indexOf('R') > -1) ? indletters.indexOf('R') : (indletters.indexOf('S') > -1) ? indletters.indexOf('S') : (indletters.indexOf('T') > -1) ? indletters.indexOf('T') : (indletters.indexOf('U') > -1) ? indletters.indexOf('U') : (indletters.indexOf('V') > -1) ? indletters.indexOf('V') : (indletters.indexOf('W') > -1) ? indletters.indexOf('W') : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'M',
            index : (indletters.indexOf('M') > -1) ? indletters.indexOf('M') : (indletters.indexOf('N') > -1) ? indletters.indexOf('N') : (indletters.indexOf('O') > -1) ? indletters.indexOf('O') : (indletters.indexOf('P') > -1) ? indletters.indexOf('P') : (indletters.indexOf('Q') > -1) ? indletters.indexOf('Q') : (indletters.indexOf('R') > -1) ? indletters.indexOf('R') : (indletters.indexOf('S') > -1) ? indletters.indexOf('S') : (indletters.indexOf('T') > -1) ? indletters.indexOf('T') : (indletters.indexOf('U') > -1) ? indletters.indexOf('U') : (indletters.indexOf('V') > -1) ? indletters.indexOf('V') : (indletters.indexOf('W') > -1) ? indletters.indexOf('W') : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'N',
            index : (indletters.indexOf('N') > -1) ? indletters.indexOf('N') : (indletters.indexOf('O') > -1) ? indletters.indexOf('O') : (indletters.indexOf('P') > -1) ? indletters.indexOf('P') : (indletters.indexOf('Q') > -1) ? indletters.indexOf('Q') : (indletters.indexOf('R') > -1) ? indletters.indexOf('R') : (indletters.indexOf('S') > -1) ? indletters.indexOf('S') : (indletters.indexOf('T') > -1) ? indletters.indexOf('T') : (indletters.indexOf('U') > -1) ? indletters.indexOf('U') : (indletters.indexOf('V') > -1) ? indletters.indexOf('V') : (indletters.indexOf('W') > -1) ? indletters.indexOf('W') : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'O',
            index : (indletters.indexOf('O') > -1) ? indletters.indexOf('O') : (indletters.indexOf('P') > -1) ? indletters.indexOf('P') : (indletters.indexOf('Q') > -1) ? indletters.indexOf('Q') : (indletters.indexOf('R') > -1) ? indletters.indexOf('R') : (indletters.indexOf('S') > -1) ? indletters.indexOf('S') : (indletters.indexOf('T') > -1) ? indletters.indexOf('T') : (indletters.indexOf('U') > -1) ? indletters.indexOf('U') : (indletters.indexOf('V') > -1) ? indletters.indexOf('V') : (indletters.indexOf('W') > -1) ? indletters.indexOf('W') : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'P',
            index : (indletters.indexOf('P') > -1) ? indletters.indexOf('P') : (indletters.indexOf('Q') > -1) ? indletters.indexOf('Q') : (indletters.indexOf('R') > -1) ? indletters.indexOf('R') : (indletters.indexOf('S') > -1) ? indletters.indexOf('S') : (indletters.indexOf('T') > -1) ? indletters.indexOf('T') : (indletters.indexOf('U') > -1) ? indletters.indexOf('U') : (indletters.indexOf('V') > -1) ? indletters.indexOf('V') : (indletters.indexOf('W') > -1) ? indletters.indexOf('W') : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'Q',
            index : (indletters.indexOf('Q') > -1) ? indletters.indexOf('Q') : (indletters.indexOf('R') > -1) ? indletters.indexOf('R') : (indletters.indexOf('S') > -1) ? indletters.indexOf('S') : (indletters.indexOf('T') > -1) ? indletters.indexOf('T') : (indletters.indexOf('U') > -1) ? indletters.indexOf('U') : (indletters.indexOf('V') > -1) ? indletters.indexOf('V') : (indletters.indexOf('W') > -1) ? indletters.indexOf('W') : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'R',
            index : (indletters.indexOf('R') > -1) ? indletters.indexOf('R') : (indletters.indexOf('S') > -1) ? indletters.indexOf('S') : (indletters.indexOf('T') > -1) ? indletters.indexOf('T') : (indletters.indexOf('U') > -1) ? indletters.indexOf('U') : (indletters.indexOf('V') > -1) ? indletters.indexOf('V') : (indletters.indexOf('W') > -1) ? indletters.indexOf('W') : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'S',
            index : (indletters.indexOf('S') > -1) ? indletters.indexOf('S') : (indletters.indexOf('T') > -1) ? indletters.indexOf('T') : (indletters.indexOf('U') > -1) ? indletters.indexOf('U') : (indletters.indexOf('V') > -1) ? indletters.indexOf('V') : (indletters.indexOf('W') > -1) ? indletters.indexOf('W') : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'T',
            index : (indletters.indexOf('T') > -1) ? indletters.indexOf('T') : (indletters.indexOf('U') > -1) ? indletters.indexOf('U') : (indletters.indexOf('V') > -1) ? indletters.indexOf('V') : (indletters.indexOf('W') > -1) ? indletters.indexOf('W') : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'U',
            index : (indletters.indexOf('U') > -1) ? indletters.indexOf('U') : (indletters.indexOf('V') > -1) ? indletters.indexOf('V') : (indletters.indexOf('W') > -1) ? indletters.indexOf('W') : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'V',
            index : (indletters.indexOf('V') > -1) ? indletters.indexOf('V') : (indletters.indexOf('W') > -1) ? indletters.indexOf('W') : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'W',
            index : (indletters.indexOf('W') > -1) ? indletters.indexOf('W') : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'X',
            index : (indletters.indexOf('X') > -1) ? indletters.indexOf('X') : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'Y',
            index : (indletters.indexOf('Y') > -1) ? indletters.indexOf('Y') : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : 'Z',
            index : (indletters.indexOf('Z') > -1) ? indletters.indexOf('Z') : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }, {
            title : '#',
            index : (indletters.indexOf('#') > -1) ? indletters.indexOf('#') : (data.length - 1)
        }];

        return tablefilter;
    };
    exports.androidOptionDialog = function(options, title, selectedIndex, onOptionClickedCallback) {
        option_dialog = Ti.UI.createOptionDialog({
            options : options,
            selectedIndex : selectedIndex,
            title : title
        });
        option_dialog.show();
        option_dialog.addEventListener('click', onOptionClickedCallback);
    };
})();
