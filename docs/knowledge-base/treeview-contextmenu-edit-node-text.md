---
title: Edit TreeView Node Text through Context Menu
description: An example on how to edit the text of a Kendo UI TreeView node by using a context menu.
type: how-to
page_title: Edit Node Text through Context Menu | Kendo UI TreeView
slug: treeview-contextmenu-edit-node-text
tags: kendo, kendo-ui, treeview, contextmenu, edit, node, text
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2018.2.516</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>TreeView for Progress® Kendo UI®</td>
	</tr>
</table>

## Description

How can I edit the text of a TreeView node by using a context menu?

## Solution

1. On right-clicking the node, show a ContextMenu.
1. Display a textbox in a Window.
1. Set the entered text in the textbox as node text.

```dojo
<div id="treeview"></div>

<ul id="menu">
    <li>Edit Node</li>
</ul>

<script id="editTemplate" type="text/x-kendo-template">
    <label>Text: <input class="k-textbox" value="#= node.text #" /></label>
    <button class="k-button k-primary">Save</button>
</script>

<script>
    var editTemplate = kendo.template($("#editTemplate").html());

    $("#treeview").kendoTreeView({
        dataSource: [
        {
            text: "foo", items: [
                { text: "bar" },
                { text: "baz" }
            ]
        }
        ]
    })

    $("#menu").kendoContextMenu({
        target: "#treeview",
        filter: ".k-in",
        select: function (e) {
            var node = $("#treeview").getKendoTreeView().dataItem($(e.target).closest(".k-item"));
            // create and open Window
            $("<div />")
                .html(editTemplate({ node: node }))
                .appendTo("body")
                .kendoWindow({
                    modal: true,
                    visible: false,
                    deactivate: function () {
                        this.destroy();
                    }
                })
                // bind the Save button's click handler
                .on("click", ".k-primary", function (e) {
                    e.preventDefault();

                    var dialog = $(e.currentTarget).closest("[data-role=window]").getKendoWindow();
                    var textbox = dialog.element.find(".k-textbox");
                    debugger;
                    node.set("text", textbox.val());

                    dialog.close();
                })
                .getKendoWindow().center().open();
        }
    });
</script>
```

## See Also

* [API Reference of the TreeView](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview).
