---
title: RTL Support
page_title: jQuery TreeList Documentation - TreeList Right-to-Left Support
description: "Get started with the jQuery TreeList by Kendo UI and learn how it renders and behaves in right-to-left mode."
components: ["treelist"]
slug: rtl_kendoui_treelist_widget
position: 13
---

# Right-to-Left Support

Right-to-left (RTL) support reflects the ability of a widget to render its content in a right-to-left direction for right-to-left languages, such as Arabic or Hebrew.

The TreeList detects RTL mode when the `k-rtl` CSS class is applied to the widget or to one of its parent elements. For more information on how to apply the class, refer to the [article on RTL support in Kendo UI for jQuery]({% slug right_toleft_languages_accessibility_support %}).

In RTL mode, the TreeList:

* Renders the expand icon of the tree nodes in the reversed direction.
* Reverses the direction of the `Left Arrow` and `Right Arrow` keyboard navigation, including the `Ctrl` + arrow key column reordering.
* Adjusts the position of the column resize handle and the resize and reorder calculations of the columns.

## See Also

* [RTL Support in Kendo UI for jQuery]({% slug right_toleft_languages_accessibility_support %})
* [Globalization in Kendo UI for jQuery]({% slug overview_kendoui_globalization %})
* [JavaScript API Reference of the TreeList](/api/ui/treelist)
