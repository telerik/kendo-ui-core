function createPbHtml(){
	var html = "<div id='test-container'>" +
		"<div id='progressbar'></div>" +
		"</div>";

	$(html).appendTo(document.body);
}

function removePbHtml(){
	$("#test-container").remove();
}