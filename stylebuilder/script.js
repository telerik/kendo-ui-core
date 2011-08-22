// TODO: handle scenarios where jQuery is not on the page
// TODO: use $.getScript to load kendo, if not available
// TODO: show a neat message to urge the unsupported browsers to upgrade (instead of the iframe)

(function() {

    function addStylesheet(cssText) {
        var ss = document.createElement('style');

        document.getElementsByTagName("head")[0].appendChild(ss);

        if (ss.styleSheet) {
            ss.styleSheet.cssText = cssText;
        } else {
            ss.appendChild(document.createTextNode(cssText));
        }
    }

    var styleBuilderCss = "\
        #kendo-stylebuilder{text-align:left;font:12px sans-serif;}\
        #kendo-stylebuilder .styling-options{padding:.4em;color:}\
        #kendo-stylebuilder label{display:inline-block;width:40%;}\
        #kendo-stylebuilder .t-style-apply{margin:1em 0 0;}\
        ";

    addStylesheet(styleBuilderCss);

    var startStyleBuilder = function($, kendo){
        var applicationRoot = "http://localhost/kendo/stylebuilder/", // this should be changed in production
            StyleBuilder = kendo.Observable.extend({
                init: function() {
                    $("<link rel='stylesheet' href='" + applicationRoot + "styles.css' />").appendTo("head");

                    // use inline styles to be sure that the wrapper won't inherit styles from the page
                    // TODO: convert div to window that can be dragged/resized
                    // TODO: use window.contentUrl to load interface

                    $('\
                        <div id="kendo-stylebuilder">\
                            <ul id="stylable-elements">\
                                <li>Widget\
                                    <div><div class="styling-options">\
                                        <label for="widget-bc">Border color</label> <input id="widget-bc" />\
                                        <label for="widget-bgc">Background color</label> <input id="widget-bgc" />\
                                        <label for="widget-c">Text color</label> <input id="heawidgetder-c" />\
                                    </div></div></li>\
                                <li>Headers\
                                    <div><div class="styling-options">\
                                        <label for="header-bgc">Background color</label> <input id="header-bgc" />\
                                        <label for="header-c">Text color</label> <input id="header-c" />\
                                    </div></div></li>\
                                <li>Links\
                                    <div><div class="styling-options">\
                                    <label for="link-c">Text color</label> <input id="link-c" />\
                                    </div></div></li>\
                                <li>Content &amp; Template Holders\
                                    <div><div class="styling-options">\
                                    <label for="content-bgc">Background color</label> <input id="content-bgc" />\
                                    </div></div></li>\
                                <li>Item Group Holders\
                                    <div><div class="styling-options">\
                                    <label for="group-bgc">Background color</label> <input id="group-bgc" />\
                                    </div></div></li>\
                                    </ul>\
                            <button type="button" class="t-style-apply t-button">Apply</button>\
                        </div>').appendTo(document.body);
                    $("#kendo-stylebuilder").kendoWindow({
                        title: "Kendo Stylebuilder",
                        draggable: true,
                        resizable: true,
                        actions: ["Close"],
                        content: "interface.html"
                    }).closest(".t-window").css({ width: '300px', minHeight: '300px', top: '20px', right: '20px' });

                    $("#stylable-elements").kendoPanelBar();
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

