---
title: Custom Commands
page_title: Custom Column Commands
description: "Get started with the Telerik UI Grid component for {{ site.framework }} and learn how to implement custom commands for handling its column records."
components: ["grid"]
slug: customcommands_aspnetcore_grid
position: 9
---

# Custom Commands

You can implement custom commands for handling the records of the Grid.

To include a command column which will render a button for triggering the command in the column cells:

1. Add a custom command column by using the column definition.

    ```HtmlHelper
        .Columns(columns => {
            columns.Command(command => command.Custom("ViewDetails").Click("showDetails"));
        })
    ```
    {% if site.core %}
    ```TagHelper
    <column width="120">
        <commands>
            <column-command text="ViewDetails" click="showDetails"></column-command>
        </commands>
    </column>
    ```
    {% endif %}

1. Wire the `click` event of the button to a JavaScript function which will receive the corresponding Grid data item as an argument.  In the function definition, handle the command.

    ```JS
    <script type="text/javascript">
        function showDetails(e) {
            e.preventDefault();

            var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
            kendo.alert(dataItem.ShipName);
        }
    </script>
    ```

For a runnable example, refer to the [demo on implementing custom commands in the Grid](https://demos.telerik.com/{{ site.platform }}/grid/custom-command).

## Features

The custom command button offers the following features: 

* `HtmlAttributes` - set custom HTML attributes to the underlying HTML of the button
* `IconClass` - set an icon of your choice by providing the icon's name
* `Template` and `TemplateId` - customize the appearance of the button via a template
* `Text` - set the text of the button
* `Visible` - conditionally determine whether the button should be visible via JavaScript (pass the name of the JavaScript function to this option)

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Knowledge Base Section](/knowledge-base)
* [Server-Side API](/api/grid)
