(function() {
    var defaultAnimation;
    var TreeView = kendo.ui.TreeView;

    window.TreeViewHelpers = {
        fromOptions: function (treeviewOptions, options) {
            var container = QUnit.fixture;

            options = options || {};

            if (options.rtl) {
                container = $("<div class='k-rtl' />").appendTo(container);
            }

            window.treeview = $("<div />").appendTo(container).kendoTreeView(treeviewOptions);
            window.treeviewObject = treeview.data("kendoTreeView");

            return window.treeview;
        },

        fromHtml: function (html, options) {
            window.treeview = $(html).appendTo(QUnit.fixture).kendoTreeView(options);
            window.treeviewObject = treeview.data("kendoTreeView");

            return window.treeview;
        },

        destroy: function () {
            $(".k-treeview,.k-item,.k-drag-clue,.k-rtl").remove();
            delete window.treeview;
            delete window.treeviewObject;
        }
    };

    TreeViewHelpers.basicModule = {
        teardown: TreeViewHelpers.destroy
    };

    TreeViewHelpers.noAnimationMoudle = {
        setup: function() {
            kendo.effects.disable();
        },
        teardown: function() {
            kendo.effects.enable();
            TreeViewHelpers.destroy();
        }
    };
})();
