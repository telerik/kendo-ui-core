import '@progress/kendo-ui/src/kendo.panelbar.js';

export const PanelBarHelpers = {
    fromOptions: function(panelbarOptions, options) {
        let container = Mocha.fixture;

        options = options || {};

        if (options.rtl) {
            container = $("<div class='k-rtl' />").appendTo(container);
        }

        return PanelBarHelpers.fromHtml("<div />", panelbarOptions, container);
    },

    fromHtml: function(html, options, container) {
        container = container || Mocha.fixture;

        let panelbar = $(html).appendTo(container).kendoPanelBar(options);

        return panelbar;
    },

    getPanelBarObject: function(panelbar) {
        return panelbar.data("kendoPanelBar");
    },

    destroy: function() {
        kendo.destroy(Mocha.fixture);
        this.panelbarObject = null;
    }
};