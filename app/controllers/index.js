//--------------------------------------Read Data from daatabse and check-------------
var db = Titanium.Database.install('/myparse.db', 'myparse');
var user = db.execute("Select * from setting");
var isRegistered = user.fieldByName('isregister');
var u_id = user.fieldByName('userId');
var u_name = user.fieldByName('username');

if (isRegistered == 0) {
    var win_home_win = Alloy.createController('win_home').getView();
    win_home_win.open();
} else {
    var tgb = Alloy.createController('win_tab_group').getView();
    tgb.open();

}
user.close();
db.close();
var index_close = function() {
    alert('123')
    $.win.close();
};
Titanium.App.addEventListener('close_home', index_close);
