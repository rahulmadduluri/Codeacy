var socket = io.connect('http://localhost');

socket.on('start', function(data) {
	
	// when source code is submitted do this:
	var code = 'import java.util.*;import java.lang.*;import java.io.*;class Main {public static void main(String [] args) throws java.lang.Exception {System.out.println("it works");}}';

	socket.emit('source-sent', { source: code });
});


