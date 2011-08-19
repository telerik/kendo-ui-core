// TODO: handle scenarios where jQuery is not on the page
// TODO: use $.getScript to load kendo, if not available

(function() {

    var startStyleBuilder = function($, kendo){
        var applicationRoot = "http://localhost/kendo/stylebuilder/", // this should be changed in production
            StyleBuilder = kendo.Observable.extend({
                init: function() {
                    $("<link rel='stylesheet' href='" + applicationRoot + "styles.css' />").appendTo("head");

                    // use inline styles to be sure that the wrapper won't inherit styles from the page
                    // TODO: convert div to window that can be dragged/resized
                    // TODO: use window.contentUrl to load interface

                    $("<div id='kendo-stylebuilder' />").appendTo(document.body);
                    $("#kendo-stylebuilder").kendoWindow({
                        title: "Kendo Stylebuilder",
                        draggable: true,
                        resizable: true,
                        actions: ["Close"],
                        contentUrl: applicationRoot + "interface.html"
                    }).closest(".t-window").css({ width: '300px', top: '20px', right: '20px' });
                }
            });

        new StyleBuilder();

        $.extend(kendo, {
            StyleBuilder: StyleBuilder
        });
    };

    var getKendo = function() {
        $("<link rel='stylesheet' href='http://localhost/kendo/live/styles/kendo.common.css' />").appendTo("head");
        $("<link rel='stylesheet' href='http://localhost/kendo/live/styles/kendo.kendo.css' />").appendTo("head");
        $.getScript("http://localhost/kendo/deploy/kendoUI/js/kendo.all.min.js", function() { startStyleBuilder(jQuery, kendo); } );
    }

    if (typeof jQuery != "undefined" && typeof kendo == "undefined") {
        getKendo();
    } else if (typeof jQuery == "undefined") {
	    var script = document.createElement('script');
	    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js";
        script.onload = function () {
            getKendo();
        };
	    document.getElementsByTagName('head')[0].appendChild(script);
    } else {
        startStyleBuilder(jQuery, kendo);
    }

})();

