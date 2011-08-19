(function($, kendo) {
    function addStylesheet(cssText) {
        var ss = document.createElement('style');

        document.getElementsByTagName("head")[0].appendChild(ss);

        if (ss.styleSheet) {
            ss.styleSheet.cssText = cssText;
        } else {
            ss.appendChild(document.createTextNode(cssText));
        }
    }

    var applicationRoot = "http://localhost/kendo/themebuilder/", // this should be changed in production
        ThemeBuilder = kendo.Observable.extend({
            init: function() {
                $("<link rel='stylesheet' href='" + applicationRoot + "styles.css' />").appendTo("head");

                // use inline styles to be sure that the wrapper won't inherit styles from the page
                $('\
                    <div id="kendo-themebuilder">\
                        <ul id="stylable-elements">\
                            <li>Widget\
                                <div><div class="styling-options">\
                                    <label for="widget-bc">Border color</label> <input id="widget-bc" />\
                                    <label for="widget-bgc">Background color</label> <input id="widget-bgc" />\
                                    <label for="widget-c">Text color</label> <input id="widget-c" />\
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
                $("#kendo-themebuilder").kendoWindow({
                    title: "Kendo ThemeBuilder",
                    draggable: true,
                    resizable: true,
                    actions: ["Close"],
                    content: "interface.html"
                }).closest(".t-window").css({ width: '300px', minHeight: '300px', top: '20px', right: '20px' });

                $("#stylable-elements").kendoPanelBar();
            }
        });

    $.extend(kendo, {
        ThemeBuilder: ThemeBuilder
    });
})(jQuery, kendo);
