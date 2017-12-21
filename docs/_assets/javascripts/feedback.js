$(document).ready(function () {

    var Feedback = {};

    var $window = $(window);

    var cookieVariablesNames = ['feedbackSubmitted', 'path', 'uuid'];
    var defaultFormValues = {
        email: "",
        inaccurateContent: false,
        inaccurateOutdatedContentText: "",
        otherMoreInformation: false,
        otherMoreInformationText: "",
        textErrors: false,
        typosLinksElementsText: "",
        outdatedSample: false,
        inaccurateOutdatedCodeSamplesText: "",
        otherFeedback: false,
        textFeedback: ""
    };

    $("#feedback-checkbox-area").click(function (e) {
        $("span.k-tooltip-validation").remove();
    });

    var formIsProcessing = false;
    //Util functions
    var generateUUID = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    var getCookieByName = function (name) {
        //This is very crude, but necessary because currently there is some kind of url rewriting going on
        //so the cookies are set for a base path but then additional navigation is done with url rewriting
        //so we set the cookie name as complete path to avoid a problem where the cookie is set for multiple pages.
        if (name === "yesNoFeedback") {
            name = currentPath;
        }
        var match = document.cookie.match(new RegExp(name + '=([^;]+)'));
        if (match) return match[1];
    };

    //Init utility variables
    var rawLocationObject = $(location);
    var currentPath = rawLocationObject[0].origin + rawLocationObject[0].pathname;
    var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
    var formPopupNotification = $("#feedback-form-popup-container").kendoNotification({
        appendTo: "#feedback-form-window"
    }).data("kendoNotification");

    var setCookieByName = function (name, value) {
        var cookieUUID = getCookieByName("uuid");
        if (!cookieUUID) {
            document.cookie = "uuid=" + generateUUID() + "; path=/";
        }
        //This is very crude, but necessary because currently there is some kind of url rewriting going on
        //so the cookies are set for a base path but then additional navigation is done with url rewriting
        //so we set the cookie name as complete path to avoid a problem where the cookie is set for multiple pages.
        if (name === "yesNoFeedback") {
            name = currentPath;
        }
        document.cookie = name + "=" + value + ";";
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

    var hideFeedback = function () {
        $("#feedback-container").hide();
    };

    if (getCookieByName("yesNoFeedback")) {
        hideFeedback();
    } else {
        toggleFeedbackButtons(true);
    }

    //FORM
    //Init the form popup window
    var win = $("#feedback-form-window").kendoWindow({
        actions: ["Close"],
        draggable: true,
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
    var isFormModelEmpty = function () {
        var isModelDefault = true;
        for (var key in defaultFormValues) {
            if (key === 'email') {
                continue;
            }
            var isValueEqual = formModel[key] === defaultFormValues[key];
            if (!isValueEqual) {
                isModelDefault = false;
                break;
            }
        }
        return isModelDefault;
    };

    var isFormModelSatisfied = function (key, formValue) {
        var value = formModel[key];
        if (value) {
            return formValue && formValue.length > 0;
        } else {
            return true;
        }
    }
    //Bind model to form
    kendo.bind($("div#feedback-form-window"), formModel);
    //Attach to form submit to adjust variables and send request
    var emptyFormValidator = $("#feedback-checkbox-area").kendoValidator({
        validateOnBlur: false,
        messages: {
            // defines a message for the custom validation rule
            emptyForm: "You need to provide some feedback before submitting the form."
        },
        rules: {
            emptyForm: function (input) {
                return !isFormModelEmpty();
            }
        }

    }).data("kendoValidator");

    var emailValidator = $("#feedback-email-input").kendoValidator({
        validateOnBlur: false,
        messages: {
            email: "Invalid email address."
        },
        rules: {
            email: function (input) {
                if (input.val().length > 0) {
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(input.val());
                }
                return true;
            }
        }
    }).data("kendoValidator");

    // text validation is disabled for the new design of the form. In order to enable it
    // it must be reworked!!!
    var textAreaValidator = function (selector, formModelKey) {
        return $(selector).kendoValidator({
            validateOnBlur: false,
            messages: {
                emptyValidation: "Please provide some additional information.",
                htmlValidation: "HTML tags are not allowed in this field.",
                messageLength: "The message length must not exceed 2500 characters.",
                whiteSpaces: "Using only white spaces is not allowed in this field.",
                feedbackValidation: "Please select a category and provide some additional information."
            },
            rules: {
                emptyValidation: function (input) {
                    var text = input.val();
                    return isFormModelSatisfied(formModelKey, text);
                },
                htmlValidation: function (input) {
                    var text = input.val();
                    var matches = text.match(/(<([^>]+)>)/ig);
                    if (matches != null) {
                        return false;
                    }
                    return true;
                },
                messageLength: function (input) {
                    var text = input.val();
                    if (text.length > 2500) {
                        return false;
                    }
                    return true;
                },
                whiteSpaces: function (input) {
                    var text = input.val();
                    if (text.length > 0) {
                        return $.trim(text) !== "";
                    }
                    return true;
                },
                feedbackValidation: function (input) {
                    var text = input.val();
                    if (text.length > 0) {
                        return formModel[formModelKey];
                    }
                    return true;
                }
            }
        }).data("kendoValidator");
    }

    feedbackForm.submit(function (e) {
        e.preventDefault();
        if (formIsProcessing) {
            return;
        }
        formIsProcessing = true;

        if (textAreaValidator("#feedback-code-sample-text-input", "outdatedSample").validate() &&
            textAreaValidator("#feedback-more-information-text-input", "otherMoreInformation").validate() &&
            textAreaValidator("#feedback-text-errors-text-input", "textErrors").validate() &&
            textAreaValidator("#feedback-inaccurate-content-text-input", "inaccurateContent").validate() &&
            textAreaValidator("#feedback-other-text-input", "otherFeedback").validate() &&
            emptyFormValidator.validate() &&
            emailValidator.validate()) {
            win.close();
            setCookieByName("submittingFeedback")
            formModel.yesNoFeedback = getCookieByName("yesNoFeedback") || "Not submitted";
            formModel.uuid = getCookieByName("uuid");
            formModel.path = currentPath;
            formModel.sheetId = $("#hidden-sheet-id").val();
            $.post("https://api.everlive.com/v1/lzrla9wpuk636rdd/functions/saveFeedback", formModel.toJSON(), function () {
                formIsProcessing = false;
            });
        } else {
            formIsProcessing = false;
        }
    });

    //Attach to close button inside form window
    $("#form-close-button").click(function () {
        win.close();
    });

    //Attach to submit button inside form window
    $("#form-submit-button").click(function () {
        feedbackForm.submit();
    });

    //Init buttons
    $("#yesButton").click(function () {
        setCookieByName("yesNoFeedback", "Yes");
        toggleFeedbackButtons(false);
        Feedback.closeFeedback();
        Feedback.hideFeedbackForm();
        Feedback.adjustNavigationPosition();
    });
    $("#noButton").click(function () {
        setCookieByName("yesNoFeedback", "No");
        toggleFeedbackButtons(false);
        Feedback.closeFeedback();
        Feedback.hideFeedbackForm();
        Feedback.adjustNavigationPosition();
        win.center().open();
    });
    $("#additional-feedback-button").click(function () {
        win.center().open();
    });

    var windowHeight = $window.height();
    var headerHeight = $(".TK-Hat").outerHeight() + $("#page-header").outerHeight();
    var footerHeight = $("#feedback-section").outerHeight() + $("footer").outerHeight();
    var articleHeight = windowHeight - (headerHeight + footerHeight);
    var feedbackOffsetTop = document.body.scrollHeight - footerHeight;
    var shouldOverlayFeedback = !getCookieByName("yesNoFeedback") && !getCookieByName("yesNoFeedbackClosed");
    var showingFeedbackBar = false;
    var scrollFold = $window.scrollTop() + windowHeight;
    var feedbackPinned = false;

    function updateVariables() {
        windowHeight = $window.height();
        headerHeight = $(".TK-Hat").outerHeight() + $("#page-header").outerHeight();
        footerHeight = $("#feedback-section").outerHeight() + $("footer").outerHeight();
        articleHeight = windowHeight - (headerHeight + footerHeight);
        feedbackOffsetTop = document.body.scrollHeight - footerHeight;
        scrollFold = $window.scrollTop() + windowHeight;
    }

    Feedback = $.extend(Feedback, {

        init: function () {

            Feedback._events();

            Feedback.adjustArticleHeight();
            updateVariables();
            Feedback.adjustNavigationPosition();

            if (shouldOverlayFeedback) {

                showingFeedbackBar = true;

                window.setTimeout(function () {
                    showingFeedbackBar = false;
                    Feedback.adjustFeedbackPoistion();
                    Feedback.adjustNavigationPosition();
                }, 10000);
            }

        },


        // #region events
        _events: function () {
            $window.scroll(Feedback._window_scroll);
            $window.resize(Feedback._window_resize);
            $("#close-button").click(Feedback._button_click);
        },
        _window_scroll: function () {
            updateVariables();

            scrollFold = $window.scrollTop() + windowHeight;

            Feedback.adjustFeedbackPoistion();
            Feedback.adjustNavigationPosition();
        },
        _window_resize: function () {
            updateVariables();

            Feedback.adjustArticleHeight();
            Feedback.adjustFeedbackPoistion();
            Feedback.adjustNavigationPosition();
        },
        _button_click: function () {
            Feedback.closeFeedback();
            Feedback.adjustNavigationPosition();
        },
        // #endregion


        // #region adjusters
        adjustNavigationPosition: function Feedback_adjustNavigationPosition() {
            var bottom = 0;

            if (!window.matchMedia('(max-width: 1200px)').matches) {
                bottom = Math.max(feedbackPinned ? $("#feedback-section").outerHeight() : 0, scrollFold - feedbackOffsetTop);
            }

            $("#page-nav").css("bottom", bottom);
        },
        adjustArticleHeight: function Feedback_adjustArticleHeight() {
            $("#page-article").css("min-height", articleHeight);
        },
        adjustFeedbackPoistion: function Feedback_adjustFeedbackPosition() {
            if (!shouldOverlayFeedback || showingFeedbackBar) {
                return;
            }

            if (scrollFold - $("#feedback-section").outerHeight() < feedbackOffsetTop) {
                Feedback.pinFeedback();
            }
            else {
                Feedback.unpinFeedback();
            }
        },
        // #endregion


        // #region feedback bar
        pinFeedback: function Feedback_pinFeedback() {
            feedbackPinned = true;
            $("#feedback-section").addClass("fixed");
            $("#feedback-section-dummy").show();
        },
        unpinFeedback: function Feedback_unpinFeedback() {
            feedbackPinned = false;
            $("#feedback-section").removeClass("fixed");
            $("#feedback-section-dummy").hide();
        },
        closeFeedback: function Feedback_closeFeedback() {
            shouldOverlayFeedback = false;
            setCookieByName("yesNoFeedbackClosed");
            Feedback.unpinFeedback();
        },
        hideFeedbackForm: function Feedback_hideFeedbackForm() {
            $("#feedback-section").addClass("hide-feedback-form");
        }
        // #endregion

    });

    Feedback.init();

});