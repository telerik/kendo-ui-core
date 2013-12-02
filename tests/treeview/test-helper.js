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

            return TreeViewHelpers.fromHtml("<div />", treeviewOptions, container);
        },

        fromHtml: function (html, options, container) {
            container = container || QUnit.fixture;

            window.treeview = $(html).appendTo(container).kendoTreeView(options);
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
