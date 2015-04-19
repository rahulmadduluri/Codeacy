var editor = ace.edit("editor");
editor.setTheme("ace/theme/tomorrow_night_eighties");
editor.getSession().setMode("ace/mode/java");
editor.getSession().setUseWrapMode(true);
editor.setReadOnly(true);


/*
$("div .ace_gutter .ace_gutter-active-line").css("background", "transparent");
$("div .ace_layer .ace_cursor").css("color", "transparent");
*/

editor.getSession().getSelection().on('changeCursor', function(e) {
	if(editor.getCursorPosition().row>=2) {
		editor.setReadOnly(false);
		/*
		$("div .ace_gutter .ace_gutter-active-line").css("background", "");
		$("div .ace_layer .ace_cursor").css("color", "");
		*/
	}
	else {
		editor.setReadOnly(true);
		/*
		$("div .ace_gutter .ace_gutter-active-line").css("background", "transparent");
		$("div .ace_layer .ace_cursor").css("color", "transparent");
		*/
	}
	if(editor.getCursorPosition().row<2 && editor.getReadOnly()) {
		editor.moveCursorTo(2,0);
	}
});


var code = '';

// event for when typing stops
var myTimer = null;
editor.getSession().on('change', function(e) {
	clearTimeout(myTimer);
	myTimer = null;
	if(!myTimer) {
    	myTimer = setTimeout(function(){
    		// stuff to happen after typing stops
    	}, 2000);
	}
});



var socket = io.connect('http://localhost');

//socket has connected
var hasConnected = false;

//function that game.js calls to compile code
var compileCode = function() {
	//if has connected, get all lines and send to server to compile
	if (hasConnected) {
		code = editor.getSession().getDocument().getAllLines();
		console.log(code);
		// when source code is submitted do this:
		socket.emit('source-sent', { source: code });
		runInitialAnimation();
	}
}; 

socket.on('start', function(data) {
	hasConnected = true;
});


