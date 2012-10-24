var treeview, treeviewObject;

function createTreeView(treeviewOptions, options) {
    var container = document.body;

    options = options || {};

    if (options.rtl) {
        container = $("<div class='k-rtl' />").appendTo(container);
    }

    treeview = $("<div />").appendTo(container).kendoTreeView(treeviewOptions);
    treeviewObject = treeview.data("kendoTreeView");
}

function cleanArtifacts() {
    $(".k-treeview,.k-drag-clue,.k-rtl").remove();
}

