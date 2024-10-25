---
title: Create Custom Tool in the ToolBar Similar to the Grid ColumnMenu
page_title: Create ColumnMenu Tool in the ToolBar - Kendo UI for jQuery ToolBar
description: "Learn how to create a custom tool in the ToolBar similar to the Kendo UI for jQuery Grid ColumnMenu."
slug: toolbar-column-menu
tags: custom, toolbar, grid, column, menu
component: toolbar
ticketid: 1654347
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ToolBar for jQuery</td> 
 </tr>
</table>


## Description

How can I create a custom ToolBar tool that has similar appearance to the [Grid`s Column Menu]({% slug columnmenu_kendoui_grid_widget %})?

## Solution

The Kendo UI ColumnMenu can not be used as a standalone component. If you need to have a similar functionality to the ColumnMenu in the ToolBar you can try utilizing the rest of the Kendo components to achieve it. 


1. In the ToolBar [`items.template`](/api/javascript/ui/toolbar/configuration/items.template) add an element from which you can initialize a [`Kendo Popup`](/api/javascript/ui/popup).
1. In the Popup component, you can add an [`ExpansionPanels`]({% slug overview_kendoui_expansionpanel_widget %}).
1. Next, add the needed components such as CheckBox, CheckBoxGroup, DropDownList, Button, etc. 

```dojo
    <div id="toolbar"></div>

    <div id="popup">
      <div id="expansionPanel">
        <ul id="checkboxgroup"></ul>
        <div>
          <button id="first-btn">Button 1</button>
          <button id="second-btn">Button 2</button>
        </div>
      </div>

      <div id="expansionPanel2">
        <label for="products">Products:</label>
        <input id="products" />
      </div>
    </div>
    <script>
      $("#toolbar").kendoToolBar({
        items: [
          { type: 'button', icon: 'menu', text: 'Custom Menu', click: onClick }
        ] 
      });

      $("#popup").kendoPopup({
        anchor: $(".k-button")
      }).data("kendoPopup")

      function onClick(){
        $("#popup").data('kendoPopup').open()
      }

      $("#expansionPanel").kendoExpansionPanel({
        title: 'CheckBoxGroup example',
        expanded: true
      });

      $("#expansionPanel2").kendoExpansionPanel({
        title: 'DropDownList example',
      });

      $("#checkboxgroup").kendoCheckBoxGroup({
        items: [ "one", "two", "three" ],
        value: ["two", "one"]
      });

      $("#products").kendoDropDownList({
        filter: "startswith",
        dataTextField: "ProductName",
        dataValueField: "ProductID",
        dataSource: {
          type: "odata",
          serverFiltering: true,
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
            }
          }
        }
      });

      $("#first-btn").kendoButton({
        text: 'Button 1',
        themeColor: "success"
      });

      $("#second-btn").kendoButton({
        text: 'Button 2',
        themeColor: "primary"
      });
    </script>
```

## See Also

* [JavaScript API Reference of the ToolBar](/api/javascript/ui/toolbar)
