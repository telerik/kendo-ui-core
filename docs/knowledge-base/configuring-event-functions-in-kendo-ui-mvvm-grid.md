---
title: Configuring Event Functions Custom Editors in Kendo UI MVVM Grid
description: Learn how to configure event functions in Kendo UI MVVM Grid when using custom editors like DropDownList.
type: how-to
page_title: Adding Event Functions to MVVM Grid Editors
slug: configuring-event-functions-in-kendo-ui-mvvm-grid
tags: grid, kendo-ui, mvvm, editor, dropdownlist, events
res_type: kb
ticketid: 1688929
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Grid for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2025.2.520</td>
</tr>
</tbody>
</table>

## Description

When using the Kendo UI MVVM Grid with custom editors such as DropDownList, event bindings may not function as expected if they do not reference the main view model. This issue occurs because bindings in Kendo UI MVVM are not standard JavaScript code and need explicit linkage to the view model. For example, the `change` event may not be located in the parent view model array, leading to difficulties in handling events.

This knowledge base article also answers the following questions:
- How to bind events in Kendo UI MVVM Grid editors?
- Why does the `change` event not work in MVVM Grid custom editors?
- How to configure DropDownList as a custom editor in MVVM Grid?

## Solution

To ensure event functions are correctly linked to the main view model, configure the needed editor directly in the view model. Below is a step-by-step solution:

### Custom DropDownList Editor Example

Define the editor function in the view model and include the required bindings explicitly.

```javascript
var viewModel = kendo.observable({
    comboData: [
        { text: "Option 1", value: 1 },
        { text: "Option 2", value: 2 },
    ],
    onChange: function(e) {
        alert("Change event triggered!");
    },
    editor: function(container, options) {
        $('<input name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: this.get("comboData"),
                dataTextField: "text",
                dataValueField: "value",
                valuePrimitive: true,
                value: options.model[options.field],
                change: this.get("onChange"), // Reference to the viewModel function
            });
    }
});

kendo.bind($("#grid"), viewModel);
```

### Configuring MVVM Grid Columns
In the MVVM Grid configuration, reference the custom editor function from the view model.

```html
<div id="grid" data-role="grid"
     data-columns="[
         { 'field': 'column1', editor: viewModel.editor }
     ]"
     data-bind="source: gridData">
</div>
```

### Key Notes
1. Bind the editor function directly to the view model.
2. Ensure all required data and functions (`comboData`, `onChange`) are part of the view model.

### Example 

```dojo
<div id="example">
      <div
        data-role="grid"
        data-editable="true"
        data-columns="[
                         { 'field': 'column1', editor:viewModel.editor },
                         { 'field': 'column2' },
                         { 'field': 'column3' },
                         { 'field': 'column4' }
                      ]"
        data-bind="source: gridData"
      ></div>

      <script>
        var viewModel = kendo.observable({
          gridData: [
            {
              column1: "Column2",
              column2: "Column2",
              column3: "Column3",
              column4: "Column4",
            },
          ],
          comboData: [
            {
              text: "Column 1",
              value: "Column1",
            },
            {
              text: "Column 2",
              value: "Column2",
            },
            {
              text: "Column 3",
              value: "Column3",
            },
          ],
          onChange: function () {
            alert("changed");
          },
          editor: function (container, options) {
            $('<input  name="' + options.field + '"/>')
              .appendTo(container)
              .kendoDropDownList({
                dataSource: viewModel.comboData,
                dataTextField: "text",
                dataValueField: "value",
                valuePrimitive: true,
                value: "column1",
                change: viewModel.onChange,
              });
          },
        });
        kendo.bind($("#example"), viewModel);
      </script>
    </div>
```

## See Also

- [Kendo UI MVVM Overview](https://www.telerik.com/kendo-jquery-ui/documentation/framework/mvvm/overview#important-notes)
- [Kendo UI Grid Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/overview)
- [Kendo UI DropDownList Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/dropdownlist/overview)
