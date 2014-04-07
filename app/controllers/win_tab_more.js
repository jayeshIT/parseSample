var btn = Titanium.UI.createButton({
    title : 'Logout'
});
btn.addEventListener('click', function(e) {
    //Alloy.Globals.index_close();
    Titanium.App.fireEvent('close_home');
});
$.win_tab_more.add(btn);

