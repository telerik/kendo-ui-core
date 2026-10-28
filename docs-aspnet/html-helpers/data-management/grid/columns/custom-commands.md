---
title: Custom Commands
page_title: Custom Column Commands
description: "Get started with the Telerik UI Grid component for {{ site.framework }} and learn how to implement custom commands for handling its column records."
components: ["grid"]
slug: customcommands_aspnetcore_grid
position: 9
---

# Custom Commands

Custom commands let you handle Grid records with custom buttons in a command column.

To add a command column that renders a custom button in each row:

1. Define a custom command in the column configuration.

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

1. Handle the button `click` event in a JavaScript function. Use the event target to get the row data item and run your custom logic.

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

* Set custom HTML attributes on the button with `HtmlAttributes`.
* Set the icon by name with `IconClass`.
* Customize the button appearance with `Template` and `TemplateId`.
* Set the button text with `Text`.
* Control button visibility in JavaScript with `Visible`.

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Knowledge Base Articles](/knowledge-base)
* [Grid Server-Side API Reference](/api/grid)
