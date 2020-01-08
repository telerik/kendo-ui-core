---
title: Items
page_title: Items
description: "Learn about the item properties in the Telerik UI DropDownTree HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_dropdowntree_items_aspnetcore
position: 4
---

# Items

When you bind the DropDownTree through the `DataSource()` configuration option, each item can acquire specific properties.

The following JSON example demonstrates how to pass item properties to the DropDownTree. You can configure the `text`, `value`, `imageUrl`, `spriteCssClass`, and `url` fields through the [`DataTextField`](/api/Kendo.Mvc.UI.Fluent/DropDownTreeBuilder#datatextfieldsystemstring), [`DataValueField`](/api/Kendo.Mvc.UI.Fluent/DropDownTreeBuilder#datavaluefieldsystemstring), [`DataImageUrlField`](/api/Kendo.Mvc.UI.Fluent/DropDownTreeBuilder#dataimageurlfieldsystemstring), [`DataSpriteCssClassField`](/api/Kendo.Mvc.UI.Fluent/DropDownTreeBuilder#dataspritecssclassfieldsystemstring), and [`DataUrlField`](/api/Kendo.Mvc.UI.Fluent/DropDownTreeBuilder#dataurlfieldsystemstring) options respectively.

    {
        "text":"Item text",

        "value":"1",

        // If specified, renders the item as a link (<a href=""></a>)
        "url":"/",

        // Renders a <img class="k-image" src="/images/icon.png" />
        "imageUrl":"/images/icon.png",

        // Renders a <span class="k-sprite icon save" />
        "spriteCssClass":"icon save",

        // Specifies whether the text of the node in the treeview embedded in the DropDownTree should be encoded or not.
        // Useful when rendering node-specific HTML.
        "encoded":false,

        // Specifies whether the item is initially expanded.
        // Applicable when the item has child nodes.
        "expanded":true,

        // Specifies whether the item checkbox is initially checked.
        // Applicable for items with checkboxes using the default checkbox template.
        "checked":true,

        // Specifies whether the item is initially selected.
        "selected":true,

        // Indicates the sub-items of the item.
        "items":[{
            "text":"Subitem text"
        }]
    }

## See Also

* [Server-Side API](/api/dropdowntree)
