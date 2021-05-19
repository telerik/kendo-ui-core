---
title: Items
page_title: jQuery DropDownTree Documentation | Items
description: "Get started with the jQuery DropDownTree by Kendo UI and set its item properties."
slug: items_kendoui_dropdowntree
position: 5
---

# Items

When you bind the DropDownTree through the `dataSource` configuration option, each item can acquire specific properties.

The following example demonstrates how to set the item properties of the DropDownTree. You can configure the `text`, `imageUrl`, `spriteCssClass`, and `url` fields through the [`datatextfield`](/api/javascript/ui/dropdowntree#configuration-dataTextField), [`dataimageurlfield`](/api/javascript/ui/dropdowntree#configuration-dataImageUrlField), [`dataspritecssclassfield`](/api/javascript/ui/dropdowntree#configuration-dataSpriteCssClassField), and [`dataurlfield`](/api/javascript/ui/dropdowntree#configuration-dataUrlField) options respectively.

    var item = {
        text: "Item text",
        value: "value",
        enabled: true,

        // If specified, renders the item as a link (<a href=""></a>).
        url: "/",

        // Renders an <img class="k-image" src="/images/icon.png" />.
        imageUrl: "/images/icon.png",

        // Renders a <span class="k-sprite icon save" />.
        spriteCssClass: "icon save",

        // Specifies whether the node text will be encoded.
        // Useful when rendering node-specific HTML.
        encoded: false,

        // Specifies whether the item is initially expanded.
        // Applicable when the item has child nodes.
        expanded: true,

        // Specifies whether the item checkbox is initially checked.
        // Applicable for items with checkboxes which use the default checkbox template.
        checked: true,

        // Specifies whether the item is initially selected.
        selected: true,

        // Indicates the sub-items of the item.
        items: [
            { text: "Subitem text" }
        ]
    };

## See Also

* [JavaScript API Reference of the DropDownTree](/api/javascript/ui/dropdowntree)
