---
title: Integrating Buttons and Checkboxes in a Kendo UI for jQuery DropDownList
description: Learn how to combine buttons and checkboxes within a single Kendo UI for jQuery DropDownList component.
type: how-to
page_title: How to Combine Buttons and Checkboxes in Kendo UI for jQuery DropDownList
slug: how-to-combine-buttons-and-checkboxes-kendo-ui-dropdownlist
tags: kendo-ui, jquery, dropdownlist, button, checkbox
res_type: kb
ticketid: 1677682
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Progress® Kendo UI® Toolbar</td>
</tr>
<tr>
<td>Version</td>
<td>2025.1.211</td>
</tr>
</tbody>
</table>

## Description

I want to set up a DropDownList in Kendo UI for jQuery where the top items are selection items and the bottom items are checkboxes that do not close on click. This is to achieve a similar functionality to the Telerik UI for ASP.NET AJAX SplitButton, but within the Kendo UI for jQuery framework.

This knowledge base article also answers the following questions:
- How can I integrate both buttons and checkboxes in a single Kendo UI for jQuery DropDownList?
- Is it possible to prevent the DropDownList from closing when certain items are clicked?
- How to customize DropDownList items with templates in Kendo UI for jQuery?

## Solution

To integrate buttons and checkboxes within a single DropDownList component, and to prevent the dropdown from closing when certain items (like checkboxes) are clicked, follow the steps below:

1. Utilize the `itemTemplate` configuration of the [DropDownButton](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownbutton/configuration/itemtemplate) to customize the items within the dropdown. This template allows for the inclusion of both buttons and checkboxes.

2. To prevent the dropdown from closing when certain items are clicked (e.g., checkboxes), handle the `click` event for these specific items and use a flag (`preventClose`) to control the closing behavior within the `close` event handler of the dropdown.

### Customizing Items with `itemTemplate`

Use the `itemTemplate` to define the structure of the dropdown items, including buttons and checkboxes:

```javascript
$("#dropdownbutton").kendoDropDownButton({
  items: [
    { text: "Button 1" },
    { text: "Button 2" },
    // Add other button items here
    { text: "Checkbox 1", template: "<input type='checkbox' /> Checkbox 1" },
    { text: "Checkbox 2", template: "<input type='checkbox' /> Checkbox 2" }
    // Add other checkbox items here
  ],
  itemTemplate: function(e) {
    return e.template || e.text;
  }
});
```

### Preventing Dropdown from Closing on Checkbox Click

Handle the `click` event for checkbox items and prevent the dropdown from closing by using the `preventClose` flag within the `close` event handler:

```javascript
var preventClose = false;

$("#dropdownbutton").kendoDropDownButton({
  items: [
    // Button items...
    { text: "Checkbox 1", click: function(e) { 
      var checkbox = $(e.currentTarget).find("input");
      checkbox.prop("checked", !checkbox.prop("checked"));
      preventClose = true;
    }},
    { text: "Checkbox 2", click: function(e) { 
      var checkbox = $(e.currentTarget).find("input");
      checkbox.prop("checked", !checkbox.prop("checked"));
      preventClose = true;
    }}
    // Other items...
  ],
  close: function(e) {
    if(preventClose) {
      e.preventDefault();
    }
    preventClose = false;
  }
});
```

This approach allows for a flexible DropDownList component that can accommodate both actionable buttons and selectable checkboxes.

Full example:

```dojo
    <button id="dropDownButton"></button>
    <script>
      var preventClose;
      $("#dropDownButton").kendoDropDownButton({
        icon: "table",
        showArrowButton: true,
        items: [
          { text: "Item 1" },
          { text: "Item 2" },
          { text: ""},
          { text: "Item 3",  click: function(e) { 
            var checkbox = $(e.currentTarget).find("input")
            checkbox.attr("checked", !checkbox.attr("checked"));
            preventClose = true;
          } 
          },
          { text: "Item 4",  click: function(e) { 
            var checkbox = $(e.currentTarget).find("input")
            checkbox.attr("checked", !checkbox.attr("checked"));
            preventClose = true;
          }  }
        ],
        itemTemplate: function(e) {
          if(e.text === "Item 3" || e.text === "Item 4") {
            return '<span class="k-menu-link k-link"><input type="checkbox" />' + '<span class="k-menu-link-text">' + e.text + '</span>' + '</span'
          }

          if(e.text === "") {
            return "<div class='k-separator'></div>"
          }

          else {
            return '<span class="k-menu-link k-link">' + '<span class="k-menu-link-text">' + e.text + '</span>' + '</span'
          }
        },
        close: function(e) {
          if(preventClose) {
            e.preventDefault();
          }
          preventClose = false;
        }
      });
    </script>
```

## See Also

- [Kendo UI for jQuery DropDownList Overview](https://docs.telerik.com/kendo-ui/controls/editors/dropdownlist/overview)
- [DropDownButton ItemTemplate Configuration](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownbutton/configuration/itemtemplate)

