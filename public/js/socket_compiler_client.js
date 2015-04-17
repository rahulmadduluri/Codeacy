var editor = ace.edit("editor");
editor.setTheme("ace/theme/tomorrow_night_eighties");
editor.getSession().setMode("ace/mode/java");
editor.getSession().setUseWrapMode(true);

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

socket.on('start', function(data) {

	$(".compileBtn").click(function() {

		code = editor.getSession().getDocument().getAllLines();
		console.log(code);
		// when source code is submitted do this:
		socket.emit('source-sent', { source: code });
	});

});

