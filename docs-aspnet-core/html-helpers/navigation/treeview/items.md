---
title: Item Properties
page_title: TreeView Item Properties | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn about the item properties in the Kendo UI TreeView HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_treeview_items_aspnetcore
position: 3
---

# Item Properties

When you bind the TreeView through the `DataSource()` configuration option, each item can acquire specific properties.

The following JSON example demonstrates how to pass item properties to the TreeView. You can configure the `text`, `imageUrl`, `spriteCssClass`, and `url` fields through the [`DataTextField`](/api/Kendo.Mvc.UI.Fluent/TreeViewBuilder#datatextfieldsystemstring), [`DataImageUrlField`](/api/Kendo.Mvc.UI.Fluent/TreeViewBuilder#dataimageurlfieldsystemstring), [`DataSpriteCssClassField`](/api/Kendo.Mvc.UI.Fluent/TreeViewBuilder#dataspritecssclassfieldsystemstring), and [`DataUrlField`](/api/Kendo.Mvc.UI.Fluent/TreeViewBuilder#dataurlfieldsystemstring) options respectively.

###### Example

    {
        "text":"Item text",

        // If specified, renders the item as a link (<a href=""></a>)
        "url":"/",

        // Renders a <img class="k-image" src="/images/icon.png" />
        "imageUrl":"/images/icon.png",

        // Renders a <span class="k-sprite icon save" />
        "spriteCssClass":"icon save",

        // Specifies whether the node text should be encoded, or not
        //(useful when rendering node-specific HTML)
        "encoded":false,

        // Specifies whether the item is initially expanded
        // (applicable when the item has child nodes)
        "expanded":true,

        // Specifies whether the item checkbox is initially checked
        // (applicable for items with checkboxes using the default checkbox template)
        "checked":true,

        // Specifies whether the item is initially selected
        "selected":true,

        // Indicates the sub-items of the item
        "items":[{
            "text":"Subitem text"
        }]
    }

## See Also

* [Overview of TreeView HTML Helper]({% slug htmlhelpers_treeview_aspnetcore %})
* [Binding TreeView HTML Helper]({% slug htmlhelpers_treeview_binding_aspnetcore %})
* [Drag and Drop Functionality of the TreeView HTML Helper]({% slug htmlhelpers_treeview_drag_drop_aspnetcore %})
* [Checkboxes Functionality of the TreeView HTML Helper]({% slug htmlhelpers_treeview_checkboxes_aspnetcore %})
