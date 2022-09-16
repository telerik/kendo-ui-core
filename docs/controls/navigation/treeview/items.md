---
title: Items
page_title: jQuery TreeView Documentation | Items
description: "Get started with the jQuery TreeView by Kendo UI and handle its item properties."
slug: items_kendoui_treeview
position: 4
---

# Items

When you bind the TreeView through the `dataSource` configuration option, each item can acquire specific properties.

The following example demonstrates how to pass item properties to the TreeView. You can configure the `text`, `imageUrl`, `spriteCssClass`, and `url` fields through the [`datatextfield`](/api/web/treeview#dataTextField), [`dataimageurlfield`](/api/web/treeview#dataImageUrlField), [`dataspritecssclassfield`](/api/web/treeview#dataSpriteCssClassField), and [`dataurlfield`](/api/web/treeview#dataUrlField) options respectively.

To add arbitrary fields when binding the TreeView, use the `dataSource` configuration. The fields are stored in the `HierarchicalDataSource` and can be easily accessed through the [`dataItem`](/api/web/treeview#dataitem) method of the widget.

    var item = {
        text: "Item text",

        // If specified, renders the item as a link (<a href=""></a>).
        url: "/",

        // Renders a <img class="k-image" src="/images/icon.png" />
        imageUrl: "/images/icon.png",

        // Renders an HTML attribute to the DOM element.
        attr: {
            "data-myattr": "test"
        },

        // Renders a <span class="k-sprite icon save" />.
        spriteCssClass: "icon save",

        // Specifies whether the node text will be encoded.
        // Useful when rendering node-specific HTML.
        encoded: false,

        // Specifies whether the item is initially expanded.
        // Applicable when the item has child nodes.
        expanded: true,

        // Specifies whether the item is initially enabled.
        enabled: true,

        // Specifies whether the item checkbox is initially checked.
        // Applicable for items with checkboxes using the default checkbox template.
        checked: true,

        // Specifies whether the item is initially selected.
        selected: true,

        // Indicates the sub-items of the item.
        items: [
            { text: "Subitem text" }
        ]
    };

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
