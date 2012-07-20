var treeview, treeviewObject;

function createTreeView(options) {
     treeview = $("<div />").appendTo(document.body).kendoTreeView(options);
     treeviewObject = treeview.data("kendoTreeView");
}
