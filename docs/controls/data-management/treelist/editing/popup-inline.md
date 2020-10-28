---
title: Popup and Inline
page_title: jQuery TreeList Documentation | Popup and Inline Editing
description: "Get started with the jQuery TreeList by Kendo UI and set the widget in popup or inline edit mode."
slug: popupinlineeditmode_kendoui_treelist
position: 2
---

# Popup and Inline Editing

The TreeList enables you to set its popup and inline edit modes.

The difference between the inline and popup edit modes is the position of the rendered editors. In the popup edit mode, the editors are rendered in a modal window. In the inline edit mode, the editors are rendered in the `tr` element of the edited record. For a runnable example, refer to the [demo on popup editing of the TreeList](https://demos.telerik.com/kendo-ui/treelist/editing-popup).

To enable the popup or inline edit mode:

1. Configure the `toolbar` setting to display the **Add new record** button.
1. Define a command column for the **Update**, **Delete**, and **Add child** buttons.

        $("#treelist").kendoTreeList({
            toolbar: [ "create" ],
            editable: "popup", //or "inline"
            columns: [
                { field: "FirstName", expandable: true, title: "First Name", width: 250 },
                { field: "LastName", title: "Last Name" },
                { field: "Position" },
                { field: "Phone", title: "Phone" },
                { field: "Extension", title: "Ext", format: "{0:#}" },
                { command: [{name: "createchild", text: "Add child"},"edit", "destroy" ], width: 300 }
            ],
          ...
        });

## See Also

* [Popup Editing in the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/editing-popup)
* [TreeList JavaScript API Reference](/api/javascript/ui/treelist)
