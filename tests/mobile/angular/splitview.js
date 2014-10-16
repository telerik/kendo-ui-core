(function () {
    ngTestModule("Mobile SplitView", {
        teardown: function() {
        }
    });

    ngTest("is instantiated from a kendo-mobile-split-view directive", 1,
    function() {
        QUnit.fixture.html("<div kendo-mobile-application id='app'>" +
            "<kendo-mobile-split-view id='splitview'>" +
                "<kendo-mobile-pane id='side-pane'>" +
                    "<kendo-mobile-view id='side-home'>Side</kendo-mobile-view>" + 
                "<kendo-mobile-pane>" +

                "<kendo-mobile-pane id='main-pane'>" +
                    "<kendo-mobile-view id='main-home'>Main</kendo-mobile-view>" + 
                "<kendo-mobile-pane>" +
            "<kendo-mobile-split-view>" +
        "</div>");
    },
    function() {
        var element = QUnit.fixture.find("#splitview");
        ok(element.getKendoMobileSplitView());
    });

    ngTest("accepts attribute options", 1,
    function() {
        QUnit.fixture.html("<div kendo-mobile-application id='app'>" +
            "<kendo-mobile-split-view id='splitview' k-style=\"'vertical'\">" +
                "<kendo-mobile-pane id='side-pane'>" +
                    "<kendo-mobile-view id='side-home'>Side</kendo-mobile-view>" + 
                "<kendo-mobile-pane>" +

                "<kendo-mobile-pane id='main-pane'>" +
                    "<kendo-mobile-view id='main-home'>Main</kendo-mobile-view>" + 
                "<kendo-mobile-pane>" +
            "<kendo-mobile-split-view>" +
        "</div>");
    },
    function() {
        var splitview = QUnit.fixture.find("#splitview").getKendoMobileSplitView();
        equal(splitview.options.style, "vertical");
    });

    ngTest("initializes child panes", 2,
    function() {
        QUnit.fixture.html("<div kendo-mobile-application id='app'>" +
            "<kendo-mobile-split-view id='splitview' k-style=\"'vertical'\">" +
                "<kendo-mobile-pane id='side-pane'>" +
                    "<kendo-mobile-view id='side-home'>Side</kendo-mobile-view>" + 
                "</kendo-mobile-pane>" +

                "<kendo-mobile-pane id='main-pane'>" +
                    "<kendo-mobile-view id='main-home'>Main</kendo-mobile-view>" + 
                "</kendo-mobile-pane>" +
            "<kendo-mobile-split-view>" +
        "</div>");
    },
    function() {
        var sidePane = QUnit.fixture.find("#side-pane");
        var mainPane = QUnit.fixture.find("#main-pane");

        ok(sidePane.getKendoMobilePane());
        ok(mainPane.getKendoMobilePane());
    });  

}());

