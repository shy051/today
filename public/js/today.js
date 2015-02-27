'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	$.slidebars();
    $('#hamburger').load('static/hamburger.html');
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('#submitBtn').click(function(e) {
		// console.log('clicked');
		var description = $('#addPostForm #description').val();
		var location = $('#addPostForm #location').val();
		// var date = $('#addPostForm #date').val();
		// var summary = $('#new-project-form #summary').val();
		var json = {
			'post_description': title,
			'location': location
		};
		$.post('/add', json, function() {
			window.location.href = '/most_recent'; // reload the page
		});
	});
}