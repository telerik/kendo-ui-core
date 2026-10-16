---
title: RTL Support
page_title: jQuery TreeView Documentation - TreeView Right-to-Left Support
description: "Get started with the jQuery TreeView by Kendo UI and learn how it renders and behaves in right-to-left mode."
components: ["treeview"]
slug: rtl_kendoui_treeview_widget
position: 21
---

# Right-to-Left Support

Right-to-left (RTL) support reflects the ability of a widget to render its content in a right-to-left direction for right-to-left languages, such as Arabic or Hebrew.

The TreeView detects RTL mode when the `k-rtl` CSS class is applied to the widget or to one of its parent elements. For more information on how to apply the class, refer to the [article on RTL support in Kendo UI for jQuery]({% slug right_toleft_languages_accessibility_support %}).

In RTL mode, the TreeView:

* Renders the expand and collapse chevron icons in the reversed direction.
* Expands a focused node with the `Left Arrow` key and collapses it with the `Right Arrow` key.

## See Also

* [RTL Support by the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/right-to-left-support)
* [RTL Support in Kendo UI for jQuery]({% slug right_toleft_languages_accessibility_support %})
* [Globalization in Kendo UI for jQuery]({% slug overview_kendoui_globalization %})
* [JavaScript API Reference of the TreeView](/api/ui/treeview)
