---
title: Context Menu
page_title: Context Menu
description: "Learn how to enable and configure the Context Menu of the Telerik UI Grid for {{ site.framework }}."
slug: grid_aspnetcore_contextmenu
position: 15
---

# Context Menu

The {{site.product}} Grid provides a built-in ContextMenu to show the user available options, such as CRUD operations, selection and export options. A ContextMenu is shown when the user right-clicks on the Grid's table `body` or `head` elements.

By default, the Context Menu of the Telerik UI Grid for {{ site.framework }} is disabled.

## Getting Started

To enable a Context Menu with default commands for the Grid, use the `ContextMenu()` configuration option.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("Grid")
        .ContextMenu() // Enable the Context Menu for the Grid.
        ...
    )
```
{% if site.core %}
```TagHelper
   <kendo-grid name="grid">
      <context-menu enabled="true"></context-menu>
   </kendo-grid>
```
{% endif %}

When enabled the ContextMenu shown on the Grid's table `head` element contains the `SortAsc` and `SortDesc` commands. The ContextMenu shown on the Grid's table `body` element contains the `CopySelection`, `CopySelectionNoHeaders`, `Create`, `Edit`, `Destroy`, `Select`, `ReorderRow`, `ExportPdf` and `ExportExcel` commands.

## Customization

The Context Menu provides the option to use default commands and add custom commands. In addition, you can configure the items that are displayed in the ContextMenu for the Grid's table `head` element and those in the ContextMenu for the Grid's table `body` element.

### Default Commands

The table below lists the default Context Menu commands.

| Command       | Description                           |
|----           |----                                   |
|`Separator`    | Renders a separator                   |
|`Create`       | Creates a new item                    |
|`Edit`         | Brings the item in edit mode          |
|`Destroy`      | Destroys the item                     |
|`Select`       | Selects the item                      |
|`CopySelection`| Copies selection                      |
|`CopySelectionNoHeaders`| Copies selection without the headers|
|`ReorderRow`   | Reorders the row                      |
|`ExportPDF`    | Exports the Grid to PDF               |
|`ExportExcel`  | Exports the Grid to Excel             |
|`SortAsc`      | Sorts the items in ascending direction|
|`SortDesc`     | Sorts the items in descending direction|
|`Paste`        | Indicates that the [pasting functionality]({% slug htmlhelpers_grid_clipboard %}) of the Grid is enabled |

The following example demonstrates how you can customize the Context Menu using the default commands:

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("Grid")
        .ContextMenu(menu => menu
            .Head(head => {
                head.Create();
                head.Separator();
                head.SortAsc();
                head.SortDesc();
                head.Separator();
                head.ExportPDF().Text("Generate Pdf File").Icon("file"); //modify the built-in text for the comand and change the icon
                head.ExportExcel();
                head.Paste();
            })
            .Body(body => {
                body.Edit();
                body.Destroy();
                body.Separator();
                body.Select();
                body.CopySelection();
                body.CopySelectionNoHeaders();
                body.Separator();
                body.ReorderRow();
            })
        ) 
        ...
    )
```
{% if site.core %}
```TagHelper
   <kendo-grid name="grid" height="550">
    <context-menu>
        <head>
            <context-menu-item name="create"/>
            <context-menu-item name="separator"/>
            <context-menu-item name="sortAsc"/>
            <context-menu-item name="sortDesc"/>
            <context-menu-item name="separator"/>
            <context-menu-item name="exportPdf" text="Generate PDF file" icon="file" /> //modify the built-in text for the comand and change the icon
            <context-menu-item name="exportExcel"/>
            <context-menu-item name="paste"/>
        </head>
        <body>
            <context-menu-item name="edit" />
            <context-menu-item name="destroy"/>
            <context-menu-item name="separator"/>
            <context-menu-item name="select"/>
            <context-menu-item name="copySelection"/>
            <context-menu-item name="copySelectionNoHeaders"/>
            <context-menu-item name="separator"/>
            <context-menu-item name="reorderRow"/>
        </body>
    </context-menu>
   </kendo-grid>
```
{% endif %}

### Custom Commands

You can also register custom commands for the Context Menu. The following example demonstrates how to implement a custom command:

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("Grid")
        .ContextMenu(menu => menu
            .Head(head => {
                head.Create();
                head.Separator();
                head.Custom("myTool").Text("My Tool).Icon("gear");
            })
        ) 
        ...
    )
```
{% if site.core %}
```TagHelper
   <kendo-grid name="grid" height="550">
    <context-menu>
        <head>
            <context-menu-item name="create"/>
            <context-menu-item name="separator"/>
            <context-menu-item name="myTool" text="My Tool" icon="gear" command="myToolCommand"/>
        </head>
    </context-menu>
   </kendo-grid>
```
{% endif %}
```JavaScript
    kendo.ui.grid.commands["myToolCommand"] = kendo.ui.grid.GridCommand.extend({
            exec: function() {
                var that = this,
                    grid = that.grid;

                grid.saveAsPDF();
            }
        });
```

## Events

The Grid's ContextMenu allows you to subscribe to the following ContextMenu events:

|Event |Description                                                                                                         |
|---   |---                                                                                                                 | 
|`Open`| Fires before a sub menu or the ContextMenu gets opened. You can cancel this event to prevent opening the sub menu. |
|`Close`| Fires before a sub menu or the ContextMenu gets closed. You can cancel this event to prevent closure.             |
|`Select`| Fires when a menu item gets selected.                                                                            |
|`Activate`| Fires when a sub menu or the ContextMenu gets opened and its animation finished.                               |
|`Deactivate`| Fires when a sub menu or the ContextMenu gets closed and its animation finished.                             |

The following example demonstrates how to subscribe to the Grid's ContextMenu `Open` and `Close` events:

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("Grid")
        .ContextMenu(menu => menu
            .Events(ev=>ev
                .Open("openMenu")
                .Close("closeMenu"))
        ) 
        ...
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid" height="550">
        <context-menu enables="true" on-open="openMenu" on-close="closeMenu"></context-menu>
    </kendo-grid>
```
{% endif %}
```JavaScript
    <script>
        function openMenu(){
            // Handle the open event.
        }

        function closeMenu(){
            // Handle the close event.
        }
    </script>
```

## See Also

* [ContextMenu of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/context-menu)
* [Server-Side API](/api/grid)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
