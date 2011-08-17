(function($, kendo){
    var template = kendo.template(
            "<div id='kendo-stylebuilder'>" +
                "<ul>" +
                    "<li>Headers</li>" +
                    "<li>Links</li>" +
                "</ul>" +
            "</div>"
        );

    $("<link rel='stylesheet' href='http://gyoshev.telerik.com/kendo/stylebuilder/styles.css' />").appendTo("head");

    $(template({}))
        .css({
            position: "fixed",
            top: 20,
            right: 20
        })
        .appendTo(document.body);
})(jQuery, kendo);
