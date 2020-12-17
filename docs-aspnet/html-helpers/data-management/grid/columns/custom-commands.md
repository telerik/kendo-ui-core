---
title: Custom Commands
page_title: Custom Column Commands
description: "Get started with the Telerik UI Grid HtmlHelper for {{ site.framework }} and learn how to implement custom commands for handling its column records."
slug: customcommands_aspnetcore_grid
position: 9
---

# Custom Commands

You can implement custom commands for handling the records of the Grid.

To include a command column which will render a button for triggering the command in the column cells:

1. Add a custom command column by using the column definition.

        .Columns(columns => {
            columns.Command(command => command.Custom("ViewDetails").Click("showDetails"));
        })

1. Wire the `click` event of the button to a JavaScript function which will receive the corresponding Grid data item as an argument.  In the function definition, handle the command.

        <script type="text/javascript">
            function showDetails(e) {
                e.preventDefault();

                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                kendo.alert(dataItem.ShipName);
            }
        </script>

For a runnable example, refer to the [demo on implementing custom commands in the Grid](https://demos.telerik.com/{{ site.platform }}/grid/custom-command).

## See Also

* [Knowledge Base Section](/knowledge-base)
* [Server-Side API](/api/grid)
