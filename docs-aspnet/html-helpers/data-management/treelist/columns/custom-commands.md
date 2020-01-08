---
title: Custom Commands
page_title: Custom Column Commands
description: "Get started with the Telerik UI TreeList HtmlHelper for {{ site.framework }} and learn how to implement custom commands for handling its column records."
slug: htmlhelpers_treelist_aspnetcore_custom_command
position: 6
---

# Custom Commands

You can implement custom commands for handling the records of the TreeList.

To include a command column which will render a button for triggering the command in the column cells:

1. Add a custom command column by using the column definition.

        .Columns(columns =>
        {
            columns.Add().Width(300).Command(c =>
            {
                c.Custom().Name("details").Text("View Details").Click("showDetails");
            });
        })

1. Wire the `click` event of the button to a JavaScript function which will receive the corresponding TreeList data item as an argument.  In the function definition, handle the command.

        <script type="text/javascript">
            function showDetails(e) {
                alert("Custom command button clicked!");
            }
        </script>


## See Also

* [Server-Side API](/api/treelist)
