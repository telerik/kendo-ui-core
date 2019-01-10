(function() {
    var PanelBarHelpers = window.PanelBarHelpers = {
        fromOptions: function(panelbarOptions, options) {
            var container = Mocha.fixture;

            options = options || {};

            if (options.rtl) {
                container = $("<div class='k-rtl' />").appendTo(container);
            }

            return PanelBarHelpers.fromHtml("<div />", panelbarOptions, container);
        },

        fromHtml: function(html, options, container) {
            container = container || Mocha.fixture;

            var panelbar = window.panelbar = $(html).appendTo(container).kendoPanelBar(options);
            window.panelbarObject = panelbar.data("kendoPanelBar");

            return panelbar;
        },

        destroy: function() {
            kendo.destroy(Mocha.fixture);
            delete window.panelbar;
            delete window.panelbarObject;
        }
    };
}());
