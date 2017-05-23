//This is the companion JS code of the _includes/feedback-form.html
//documentation feedback form. This copy serves as a backup. 
//Normally, it resides on a CDN referenced from _includes/feedback-form.html.

$(document).ready(function () {
	var cookieVariablesNames = ['feedbackSubmitted','path','uuid'];
	var defaultFormValues = {
		email: "",
		textFeedback: "",
		inaccurateContent: false,
		wrongInformation: false,
		insufficientInformation: false,
		textErrors: false,
		outdatedSample: false,
	};
	var formIsProcessing = false;
	//Util functions
	var generateUUID = function () {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	};

	var getCookieByName = function(name) {
		//This is a very crude, but necessary because currently there is somekind of url rewriting going on
		//so the cookies are set for a base path but then additional navigation is done with url rewriting
		//so we set the cookie name as complete path to avoid a problem where the cookie is set for multiple pages.
		if(name === "yesNoFeedback"){
			name = currentPath;
		}
		var match = document.cookie.match(new RegExp(name + '=([^;]+)'));
		if (match) return match[1];
	};

	//Init utility variables
	var currentPath = $(location).attr('href');
	var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
	var formPopupNotification = $("#feedback-form-popup-container").kendoNotification({
		appendTo: "#feedback-form-window"
	}).data("kendoNotification");

	var setCookieByName = function (name, value) {
		var cookieUUID = getCookieByName("uuid");
		if(!cookieUUID){
			document.cookie = "uuid=" + generateUUID() +"; path=/";
		}
		//This is a very crude, but necessary because currently there is somekind of url rewriting going on
		//so the cookies are set for a base path but then additional navigation is done with url rewriting
		//so we set the cookie name as complete path to avoid a problem where the cookie is set for multiple pages.
		if(name === "yesNoFeedback"){
			name = currentPath;
		}
		document.cookie = name + "=" + value +";";
	};

	//Feedback menu controls
	var feedbackButtonsContainer = $("#helpful-buttons-container");
	var feedbackSubmittedContainer = $("#feedback-submitted-container");
	var toggleFeedbackButtons = function (toggle) {
		if (toggle) {
			feedbackButtonsContainer.show();
			feedbackSubmittedContainer.hide();
		} else {
			feedbackButtonsContainer.hide();
			feedbackSubmittedContainer.show();
		}
	};

	var checkIfYesNoSubmitted = function () {
		//If cookie for feedback is set hide the buttons
		if (getCookieByName("yesNoFeedback")) {
			toggleFeedbackButtons(false);
		}else{
			toggleFeedbackButtons(true);
		}
		return false;
	};


	//FORM
	//Init the form popup window
	var win = $("#feedback-form-window").kendoWindow({
		actions: ["Close"],
		draggable: false,
		height: "700px",
		modal: true,
		pinned: false,
		visible: false,
		title: false,
		resizable: false,
		width: "500px"
	}).data("kendoWindow");
	//Init form
	var feedbackForm = $("#feedback-form");
	var formModel = kendo.observable(defaultFormValues);
	var isFormModelEmpty = function (){
		var isModelDefault = true;
		for (var key in defaultFormValues) {
			var isValueEqual = formModel[key] === defaultFormValues[key];
			if(!isValueEqual){
				isModelDefault = false;
				break;
			}
		}
		return isModelDefault;
	};
	//Bind model to form
	kendo.bind($("div#feedback-form-window"), formModel);
	//Attach to form submit to adjust variables and send request
	var validator = feedbackForm.kendoValidator({
		messages: {
			// defines a message for the custom validation rule
			htmlValidation: "HTML tags are not allowed in the input.",
			messageLength: "Message must be below 2500 symbols.",
			whiteSpaces: "Whitespaces only text is not allowed."
		},
		rules: {
			htmlValidation: function(input) {
				if (input.is("[id=feedback-text-input]")) {
					var string = input.val();
					var matches = string.match(/(<([^>]+)>)/ig);
					if(matches != null){
						return false;
					}
				}
				return true;
			},
			messageLength: function(input) {
				if (input.is("[id=feedback-text-input]")) {
					var string = input.val();
					if(string.length > 2500){
						return false;
					}
				}
				return true;
			},
			whiteSpaces: function(input) {
				if (input.is("[id=feedback-text-input]")) {
					return $.trim(input.val()) !== "";
				}
				return true;
			}
		}}).data("kendoValidator")
	feedbackForm.submit(function(e) {
		e.preventDefault();
		//if form is processing do nothing.
		if(formIsProcessing){
			return;
		}
		formIsProcessing = true;
		if(isFormModelEmpty()){
			formPopupNotification.show("Please provide some feedback before submitting the form.", "Error");
			formIsProcessing = false;
			return;
		}
		if(validator.validate()) {
			win.close();
			setCookieByName("submittingFeedback")
			formModel.yesNoFeedback = getCookieByName("yesNoFeedback") || "Not submitted";
			formModel.uuid = getCookieByName("uuid");
			formModel.path = currentPath;
			formModel.sheetId = $("#hidden-sheet-id").val();
			$.post("http://api.everlive.com/v1/lzrla9wpuk636rdd/functions/saveFeedback", formModel.toJSON(), function () {
				formIsProcessing = false;
				popupNotification.show("Your feedback was saved. Thank you!", "info");
			});
		}else {
			formIsProcessing = false;
		}
	});

	//Attach to close button inside form window
	$("#form-close-button").click(function () {
		win.close();
	});

	//Init buttons
	$("#yesButton").click(function () {
		setCookieByName("yesNoFeedback", "Yes");
		toggleFeedbackButtons(false);
		popupNotification.show("Thank you for your feedback!", "info");
	});
	$("#noButton").click(function () {
		setCookieByName("yesNoFeedback", "No");
		toggleFeedbackButtons(false);
		win.center().open();
	});
	$("#additional-feedback-button").click(function () {
		win.center().open();
	});

	//Check for the cookie aka state of buttons
	checkIfYesNoSubmitted();
});