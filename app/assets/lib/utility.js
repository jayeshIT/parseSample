var indWin1 = null;
var actInd1 = null;
var indicatorVisible1 = false;
var imageView1 = null;

function hideIndicator11(win) {
	if (indicatorVisible1 && win != null && indWin1 != null && imageView1 != null) {
		imageView1.stop();
		indWin1.close();
		indicatorVisible1 = false;
	}
}

function showIndicator11(win) {
	if (!indicatorVisible1 & win != null) {
		indWin1 = Titanium.UI.createWindow({
			top : 0,
			bottom : 0,
			left : 0,
			right : 0,
			backgroundColor : 'transparent'
		});
		var indView1 = Titanium.UI.createView({
			height : 60,
			width : 200,
			backgroundColor : 'black',
			borderRadius : 10,
			borderWidth : 3,
			borderColor : 'gray'
		});
		var images1 = [];
		for (var i = 1; i < 12; i++) {
			images1.push('images/loading/' + ((i < 10) ? '0' + i : i) + '.png');
		}
		imageView1 = Titanium.UI.createImageView({
			images : images1,
			duration : 100, // in milliseconds, the time before next frame is shown
			repeatCount : 0, // 0 means animation repeats indefinitely, use > 1 to control repeat count
			left : 20,
		});
		indView1.add(imageView1);
		indWin1.add(indView1);
		var message11 = Titanium.UI.createLabel({
			left : 65,
			right : 30,
			height : 20,
			text : 'Loading',
			textAlign : 'left',
			color : 'white',
			font : {
				fontSize : 14,
				fontWeight : 'bold'
			}
		});
		indView1.add(message11);
		imageView1.start();
		indWin1.open();
		indicatorVisible1 = true;
	}
}
