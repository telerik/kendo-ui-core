//This is the code of a Telerik Backend Services Cloud Function
//that collects documentation feedback (Feedback Form) and
//writes it to Google Sheets. It is present here as a backup.
//See _layouts/page.html and _includes/feedback-form.html.
//The AppID is available in the form's JS code.

Everlive.CloudFunction.onRequest(function(request, response, done){
    //here adjust the refresh token accordingly
    var url = 'https://www.googleapis.com/oauth2/v4/token?refresh_token=1/97NRWe4weZqkKtRWSa5_54Y0iAL5meY2IeMGGAoR11k&grant_type=refresh_token&client_id=246020013776-2va28mc9bdi53ehf6q8a4jq7vr2l72aq.apps.googleusercontent.com&client_secret=CltSTMA_vBJQPQ65YAW4co6v';
    var contentType = "application/x-www-form-urlencoded";
    
    var options = {
    };
    options.contentType = contentType;
    
    var sendErrorMail = function(errorMessage, formData, callback){
    	console.log(errorMessage);
        Everlive.Email.sendEmailFromTemplate('documentationFeedbackError', ['j7p8b5w9u2f6l9b0@platform-telerik.slack.com'], {"ErrMsg":errorMessage, "FormData": formData}, function(err, res) {
            callback();
        });
    };
    
    Everlive.Http.post(
        url,
        options,
        function (error, resp) {
            if (error) {
                var errorMessage = "Error while authenticating to google, " + JSON.stringify(error) +". Message is: " + request.data.body;
                var formData = JSON.stringify(request.data);
                sendErrorMail(errorMessage, formData, done);
            } else {
                console.log('Saving feedback with params: '+JSON.stringify(request.data));
                //Here adjust the sheet id
                var url = 'https://spreadsheets.google.com/feeds/list/'+request.data.sheetId+'/od6/private/full';
                var headers = { "Authorization": "Bearer " + resp.data.access_token };
                var contentType = "application/atom+xml";
                var data = "<entry xmlns=\"http://www.w3.org/2005/Atom\" xmlns:gsx=\"http://schemas.google.com/spreadsheets/2006/extended\">"+
                    "<gsx:timestamp>"+new Date()+"</gsx:timestamp>" +
                    "<gsx:textfeedback>"+request.data.textFeedback+"</gsx:textfeedback>" +
                    "<gsx:email>"+request.data.email+"</gsx:email>" +
                    "<gsx:inaccuratecontent>"+request.data.inaccurateContent+"</gsx:inaccuratecontent>" +
                    "<gsx:wronginformation>"+request.data.wrongInformation+"</gsx:wronginformation>" +
                    "<gsx:insufficientinformation>"+request.data.insufficientInformation+"</gsx:insufficientinformation>" +
                    "<gsx:texterrors>"+request.data.textErrors+"</gsx:texterrors>" +
                    "<gsx:outdatedsample>"+request.data.outdatedSample+"</gsx:outdatedsample>" +
                    "<gsx:yesnofeedback>"+request.data.yesNoFeedback+"</gsx:yesnofeedback>" +
                    "<gsx:uuid>"+request.data.uuid+"</gsx:uuid>" +
                    "<gsx:path>"+request.data.path+"</gsx:path>" +
                    "</entry>";
                var options = {
                };


                options.body = data;
                options.headers = headers;
                options.contentType = contentType;

                Everlive.Http.post(
                    url,
                    options,
                    function (error, response) {
                        if (error) {
                            var errorMessage = "Error while saving feedback in google sheet, " + JSON.stringify(error);
                			var formData = JSON.stringify(request.data);
                			sendErrorMail(errorMessage, formData, done);
                        } else {
                            done();
                        }
                    });
            }  
        });
    
});