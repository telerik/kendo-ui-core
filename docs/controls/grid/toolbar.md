---
title: Toolbar
page_title: jQuery Grid Documentation - Toolbar
description: "Learn how to configure the Toolbar of the Kendo UI for jQuery Grid."
slug: toolbar_kendoui_grid_widget
position: 19
---

# Toolbar

The [`toolBar`](/api/javascript/ui/grid/configuration/toolbar) configuration option of the Grid allows you to add command buttons and allows the user to invoke built-in Grid functionalities. You can also define custom commands or use templates to customize the Toolbar of the {{ site.product }} Grid.

## Built-In Commands

You can configure the Toolbar and include any of the built-in commands:

```
$("#grid").kendoGrid({
    toolbar: [
      { name: "create" },
      { name: "save" },
      { name: "cancel" },
      { name: "pdf" },
      { name: "paste" },
      { name: "excel" },
      { name: "search" },
      { name: "columns" },
      { name: "group" },
      { name: "sort" },
      { name: "filter" },
    ]
  ....
});
</script>
```

In the 2025 Q2 release an alternative way to configure the tools has been implemented. It relies on the Items configuration of the Grid toolbar:

```
$("#grid").kendoGrid({
    toolbar: {         
       items: [
        { name: "create" },
        { name: "edit" },
        { name: "destroy" },
        { type: "separator", name: "separator"},
        { name: "filter" },
        { name: "sort" },
        { name: "group" },
        { type: "spacer", name: "spacer"},
        { name: "columnChooser" },
      ]
    },
  ....
});
```

| Command | Description | Resources|
|---|---|---|
| columns | Displays a global column menu. | [Column menu documentation]({% slug columnmenu_kendoui_grid_widget %}#global-column-menu) |
| create | Adds an empty data item to the Grid.| [Editing functionality documentation]({% slug editing_kendoui_grid_widget %}) |
| cancel | Reverts any data changes done by the end user.|[Editing functionality documentation]({% slug editing_kendoui_grid_widget %}) |
| save | Persists any data changes done by the end user.|[Editing functionality documentation]({% slug editing_kendoui_grid_widget %}) |
| paste | Enables the built-in paste operations.| [Clipboard documentation]({% slug clipboard_kendoui_grid_component %})|
| pdf | Exports the Grid data in PDF format.| [PDF Export documentation]({% slug exporting_pdf_kendoui_grid_widget %})|
| excel | Exports the Grid data in MS Excel format.| [Excel Export documentation]({% slug exporting_excel_kendoui_grid_widget %})|
| search | Adds the built-in search panel for the Grid.| [Search Panel documentation]({% slug searchpanel_kendoui_grid_widget %})|
| group | Allows grouping from the toolbar tool. | [ToolBar Grouping Tool]({% slug adaptive_tools_kendoui_grid_component %}#grouping) |
| sort | Displays a sort tool. | [ToolBar Sorting Tool]({% slug adaptive_tools_kendoui_grid_component %}#sorting) |
| filter | Allows filtering to be performed from the toolbar tool. | [ToolBar filtering Tool]({% slug adaptive_tools_kendoui_grid_component %}#filtering) |


### Adaptive ToolBar Tools

Starting with the 2025 Q2 release the Grid component supports rendering selected toolbar tools in adaptive mode. This feature improves usability on smaller screens by displaying certain UI elements—such as sorting, filtering, grouping, and editing—in a mobile-friendly ActionSheet. You can learn more in the article [linked here]({% slug adaptive_tools_kendoui_grid_component %}).

## Custom Commands

The Toolbar of the Grid component supports custom commands.

The following example demonstrates how to add a custom command to the Toolbar:

```dojo
<div id="grid"></div>
<script>
  $("#grid").kendoGrid({
    toolbar: [ {
      type: "button",
      text: "Button"
    }, {
      type: "splitButton",
      text: "SplitButton",
      menuButtons: [{text: "Option 1"}, {text: "Option 2"}]
    },{
      name: "dropDownButton",
      type: "dropDownButton",
      text: "Country",
      menuButtons: [
        { id: "1", text: "Belgium" },
        { id: "2", text: "France" }
      ]
    }],
    columns: [
      { field: "name" },
      { field: "age" }
    ],
    dataSource: {
      data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33},
      ],
      schema: {
        model: { id: "id" }
      }
    },
    editable: true
  });
  </script>
```


## Toolbar Template

The Grid also supports using a template for the Toolbar. You can define the template as a string, as an [external Kendo UI template](https://docs.telerik.com/kendo-ui/framework/templates/get-started-external), or return its content using a JavaScript function. For more information on the available template options, refer to the [`Toolbar Templates`](/https://docs.telerik.com/kendo-ui/controls/grid/templates/toolbar-template) API.


## Disable Inactive Tools

Starting with 2025 Q2 release the Grid component provides the possibility to disable or hide the inactive tools when editing. By default the inactive tools will be hidden. When the [showInactiveTools](/api/javascript/ui/grid/configuration/toolbar.showinactivetools) option is enabled the inactive tools will be displayed as disabled.
In the example below, the `Save Changes` and `Cancel Changes` buttons will be disabled until a change in the Grid is performed:

```dojo
    <div id="grid"></div>
    <script>
      $(document).ready(function () {
        $("#grid").kendoGrid({
          showInactiveTools: true,
          toolbar: ["save", "cancel"],
          columns: [{ field: "name" }, { field: "age" }],
          dataSource: {
            data: [
              { id: 1, name: "Jane Doe", age: 30 },
              { id: 2, name: "John Doe", age: 33 },
            ],
            schema: {
              model: {
                id: "id",
                fields: {
                  age: { type: "number" },
                },
              },
            },
          },
          editable: true,
        });
      });
    </script>

```


## KB Articles on Toolbar Templates

* [Place Edit or Update Buttons to Grid Toolbar]({% slug grid-edit-command-toolbar %})
* [Lock and Unlock Grid Columns by Using Toolbar instead of Column Menu]({% slug grid-lock-unlock-using-toolbar %})
* [Find Out More in the Knowledge Base](/knowledge-base)

## See Also

* [Using Toolbar Templates in the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/toolbar-template)
* [Introduction on Templates]({% slug overview_kendoui_templatescomponent %})
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
