---
title: Position DropDownList Popup in PanelBar Content 
page_title: Position DropDownList Popup in PanelBar Content - Kendo UI for jQuery PanelBar
description: "Learn how to position DropDownList popup in the content of the Kendo UI PanelBar for jQuery."
slug: dropdownlist-popup-in-panelbar-content
tags: panelbar, content, dropdownlist, popup
component: panelbar
type: how-to
ticketid: 1594859
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® PanelBar for jQuery</td>
 </tr>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® DropDownList for jQuery</td>
 </tr>
</table>

## Description

How can I position a DropDownList popup in the content of the PanelBar?

## Solution

1. Wrap the element, from which the DropDownList is initialized, in a container.

```html
<li><span id="ddl-container"><input type="text" id="ddl"/></span></li>
```

2. Use the [`popup.appendTo`](/api/javascript/ui/dropdownlist/configuration/popup#popupappendto) option of the component, in order to configure the position of the popup to the container.

```js
popup: {
  appendTo: $('#ddl-container')
}
```
3. You may also need to configure the style of the `animation container` by setting its `top` and `left` position.

```css
.k-animation-container{
   top: initial !important;
   left: initial !important;
}
```

The following example demonstrates the full implementation of the suggested approach:

```dojo
<ul id="panelbar">
      <li>Item 1
        <ul>
          <li ><span id="ddl-container"><input type="text" id="ddl"/></span></li>
          <li>Sub Item 2</li>
          <li>Sub Item 3</li>
        </ul>
      </li>
    </ul>
    <script>
      $("#panelbar").kendoPanelBar();

      $("#ddl").kendoDropDownList({
        dataSource: [
          { name: "Apples" },
          { name: "Oranges" }
        ],
        dataTextField: "name",
        dataValueField: "name",        
        popup: {
          appendTo: $('#ddl-container')
        }
      });

    </script>
    <style>
      .k-animation-container{
        top: initial !important;
        left: initial !important;
      }
    </style>
```

## See Also
* [JavaScript API Reference of the PanelBar](/api/javascript/ui/panelbar)
* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)