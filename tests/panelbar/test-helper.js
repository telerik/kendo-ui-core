(function() {
    var PanelBarHelpers = window.PanelBarHelpers = {
        fromOptions: function (panelbarOptions, options) {
            var container = QUnit.fixture;

            options = options || {};

            if (options.rtl) {
                container = $("<div class='k-rtl' />").appendTo(container);
            }

            return PanelBarHelpers.fromHtml("<div />", panelbarOptions, container);
        },

        fromHtml: function (html, options, container) {
            container = container || QUnit.fixture;

            var panelbar = window.panelbar = $(html).appendTo(container).kendoPanelBar(options);
            window.panelbarObject = panelbar.data("kendoPanelBar");

            return panelbar;
        },

        destroy: function () {
            kendo.destroy(QUnit.fixture);
            delete window.panelbar;
            delete window.panelbarObject;
        },

        basicModule: {
            teardown: function() {
                PanelBarHelpers.destroy();
            }
        },

        noAnimationModule: {
            setup: function() {
                kendo.effects.disable();
            },
            teardown: function() {
                kendo.effects.enable();
                PanelBarHelpers.destroy();
            }
        }
    };
})();
