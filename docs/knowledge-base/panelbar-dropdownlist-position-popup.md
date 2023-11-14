---
title: How To Position Correctly the DropDownList PopUp in PanelBar
description: "Learn how to position the DropDownList popup when the component is placed in a Kendo UI PanelBar."
type: how-to
page_title: Set Position to the DropDownList PopUp in PanelBar - Kendo UI PanelBar for jQuery
slug: panelbar_dropdownlist_position_popup
tags: panelbar, dropdownlist, popup, position
ticketid: 1594859
res_type: kb
component: panelbar, dropdownlist
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® PanelBar for jQuery</td>
  <td>Progress® Kendo UI® DropDownList for jQuery</td>
 </tr>
</table>

## Description

If DropDownList/ComboBox component is included inside a Kendo PanelBar, the popup is detached from the DropDownList/ComboBox inputs. How I can position the DropDownList/ComboBox popup correctly when the component is placed inside a PanelBar?

## Solution

The described appearance may occur when the DropDownList/ComboBox is used inside the PanelBar content element, as styles are applied to the PanelBar that will affect also the nested widgets. However, in such scenarios:

1. You can wrap the element from which the DropDownList/ComboBox is initialized.
1. Then configure the [`appendTo`](/api/javascript/ui/dropdownlist/configuration/popup#popup.appendTo) option.
1. Set the `top` and `left` position of the animation container to `initial`.

```dojo
    <ul id="panelbar">
      <li>Item 1
        <ul>
          <li ><span id="ddl-container"><input type="text" id="ddl"/></span></li>
          <li>Sub Item 2</li>
          <li>Sub Item 3</li>
        </ul>
      </li>
      <li>Item 2
        <ul>
          <li>Sub Item 1 <li><span id="cb-container"><input type="text" id="combo"/></span></li>
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

      $("#combo").kendoComboBox({
        dataSource: [
          { name: "Apples" },
          { name: "Oranges" }
        ],
        dataTextField: "name",
        dataValueField: "name",          
        popup: {
          appendTo: $('#cb-container')
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

* [PanelBar API Reference](/api/javascript/ui/panelbar)
* [DropDownList API Reference](/api/javascript/ui/dropdownlist)
* [ComboBox API Reference](/api/javascript/ui/combobox)
