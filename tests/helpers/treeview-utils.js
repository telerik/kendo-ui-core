import '@progress/kendo-ui/src/kendo.treeview.js';

export const TreeViewHelpers = {
    fromOptions: function(treeviewOptions, options) {
        let container = Mocha.fixture;

        options = options || {};

        if (options.rtl) {
            container = $("<div class='k-rtl' />").appendTo(container);
        }

        return TreeViewHelpers.fromHtml("<div />", treeviewOptions, container);
    },

    fromHtml: function(html, options, container) {
        container = container || Mocha.fixture;

        let treeview = $(html).appendTo(container).kendoTreeView(options);

        return treeview;
    },

    getTreeViewObject: function(treeview) {
        return treeview.data("kendoTreeView");
    },

    destroy: function() {
        kendo.destroy(Mocha.fixture);
        delete window.treeview;
        delete window.treeviewObject;
    }
};