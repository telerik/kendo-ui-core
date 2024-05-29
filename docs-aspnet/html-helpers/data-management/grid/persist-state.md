---
title: State Persistence
page_title: State Persistence
description: "Get started with the Telerik UI Grid component for {{ site.framework }} and persist the state of the widget."
slug: persiststate_grid_aspnetcore
position: 10
---

# State Persistence

The Grid enables you to save the custom settings of the user and restore them after the user logs back at some future moment.

To persist the settings that were previously applied to its structure, use the [`getOptions()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/getoptions) and [`setOptions()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/setoptions) methods of the Grid. These methods allow you to serialize the current state of the Grid if needed and recover that state later. For a runnable example, refer to the [demo on persisting the state of the Grid](https://demos.telerik.com/{{ site.platform }}/grid/persist-state).

By design, the `getOptions()` method retrieves the current Grid settings along with the current state of the DataSource options. To restore particular Grid or DataSource options, you can extract only the desired options from the object returned by `getOptions()`.

The example below shows how to retrieve and set the options of the Grid columns.

```
    let grid = $("#grid").data("kendoGrid"); // Get a reference to the Grid.
    let currentOptions = grid.getOptions(); // Get the current Grid options and DataSource state.
    let columnOptionsForSaving = kendo.stringify(currentOptions.columns); // Extract the Grid columns options.
    grid.setOptions({ columns: JSON.parse(columnOptionsForSaving)}); // Call the "setOptions()" method to apply the stored column options of the Grid.
```

## See Also

* [Persisting the State of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/persist-state)
* [Server-Side API](/api/grid)
