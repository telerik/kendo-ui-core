---
title: Keyboard Navigation
page_title: jQuery DropDownList Documentation - Keyboard Navigation
description: "Get started with the jQuery DropDownList by Kendo UI and learn about the accessibility support it provides through its keyboard navigation functionality."
components: ["dropdownlist"]
slug: keynav_kendoui_ddl_widget
position: 2
---

# Keyboard Navigation

The keyboard navigation of the DropDownList is always available.

The DropDownList supports the following keyboard shortcuts:

| Shortcut |	Description |
| :---- | :---- |
| Up Arrow |	Highlights the previous item. |
| Down Arrow |	Highlights the next item. |
| Left Arrow	 |Highlights the previous item. |
| Right Arrow |	Highlights the next item. |
| Home |	Selects the first item in the list. |
| End |	Selects the last item in the list. |
| Page Up |Scrolls the popup up. |
| Page Down |	Scrolls the popup down. |
| Enter |	Selects the highlighted item. |
| Esc |	Closes the popup. |
| Alt + Down Arrow |	Opens the popup. |
| Space |	Opens the popup, or selects the highlighted item. |
| Alt + Up Arrow |	Closes the popup. |

For a complete example, refer to the [demo on keyboard navigation of the DropDownList](https://demos.telerik.com/kendo-ui/dropdownlist/keyboard-navigation).

## Events

When the popup of the DropDownList is opened and the arrow keys are used to highlight an item a `select` event is fired upon highlighting an item. When pressing `Enter` or `Space`, or blurring the component a `change` event is fired and the value of the component is set.

When the popup of the DropDownList is closed and the arrow keys are used to select an item a `select` event is fired imediately followed by a `change` event.

## See Also

* [Keyboard Navigation by the DropDownList (Demo)](https://demos.telerik.com/kendo-ui/dropdownlist/keyboard-navigation)
* [Keyboard Support in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}#keyboard-navigation)
* [Accessibility in the DropDownList]({% slug jquery_dropdownlist_accessibility %})
