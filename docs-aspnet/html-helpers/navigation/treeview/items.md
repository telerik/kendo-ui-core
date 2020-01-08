---
title: Items
page_title: Items
description: "Learn about the item properties in the Telerik UI TreeView HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_treeview_items_aspnetcore
position: 3
---

# Item Properties

When you bind the TreeView through the `DataSource()` configuration option, each item can acquire specific properties.

The following JSON example demonstrates how to pass item properties to the TreeView. You can configure the `text`, `imageUrl`, `spriteCssClass`, and `url` fields through the [`DataTextField`](/api/Kendo.Mvc.UI.Fluent/TreeViewBuilder#datatextfieldsystemstring), [`DataImageUrlField`](/api/Kendo.Mvc.UI.Fluent/TreeViewBuilder#dataimageurlfieldsystemstring), [`DataSpriteCssClassField`](/api/Kendo.Mvc.UI.Fluent/TreeViewBuilder#dataspritecssclassfieldsystemstring), and [`DataUrlField`](/api/Kendo.Mvc.UI.Fluent/TreeViewBuilder#dataurlfieldsystemstring) options respectively.

    {
        "text":"Item text",

        // If specified, renders the item as a link (<a href=""></a>)
        "url":"/",

        // Renders a <img class="k-image" src="/images/icon.png" />
        "imageUrl":"/images/icon.png",

        // Renders a <span class="k-sprite icon save" />
        "spriteCssClass":"icon save",

        // Specifies whether the node text should be encoded or not.
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

* [Server-Side API](/api/treeview)
