(function($, window, undefined) {

    var animation = {
            show: {
                effects: "expandVertical fadeIn",
                duration: 300,
                show: true
            },
            hide: {
                effects: "expandVertical fadeIn",
                duration: 300,
                reverse: true,
                hide: true
            }
        };

    $(".detailHandle").live("click", function (e) {
        var extender = $(this).next(),
            visible = extender.is(":visible");

        extender.kendoStop(true).kendoAnimate(!visible ? animation.show : animation.hide, visible);
    });

    $().ready(function () {
        prettyPrint();
        $("#codeStrip").kendoTabStrip();
    });
    
})($, window);
