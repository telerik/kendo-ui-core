(function($, kendo){
    if (!kendo) {
        return;
    }

    var applicationRoot = "http://localhost/kendo/stylebuilder/", // this should be changed in production
        StyleBuilder = kendo.Observable.extend({
            init: function() {
                $("<link rel='stylesheet' href='" + applicationRoot + "styles.css' />").appendTo("head");

                // use inline styles to be sure that the wrapper won't inherit styles from the page
                this.element = $("<div id='kendo-stylebuilder' />")
                    .css({
                        backgroundColor: "#333",
                        border: "1px solid #888",
                        boxShadow: "0 0 4px #ccc",
                        color: "#f1f1f1",
                        borderRadius: "5px",
                        padding: "10px",
                        position: "fixed",
                        top: "20px",
                        right: "20px"
                    })
                    .append("<iframe frameborder='0' src='" + applicationRoot + "interface.html' />")
                    .appendTo(document.body);
            }
        });

    new StyleBuilder();

    $.extend(kendo, {
        StyleBuilder: StyleBuilder
    });
})(jQuery, kendo);
