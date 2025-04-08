---
title: Localization
page_title: Localization
description: "Get started with the Telerik UI Grid component for {{ site.framework }} and translate its toolbar, menu, command, filter, header, and pager text messages for different culture locales."
slug: localization_aspnetcore_grid
position: 3
---

# Localization

The Grid provides options for localizing its user interface by utilizing the available Resources messages as well as providing custom messages as part of its configuration.

## Getting Started

To use the community-sources Resources files, override the executing context and set the server-side culture. This causes the {{ site.framework }} Grid to use the matching Resource file messages and localize them accordingly. In case of missing messages, you can update the Resources file or include the message in the configuration of the grid.

1. Add the `Microsoft.AspNetCore.Mvc.Filters` and `System.Globalization` to the controller using namespaces:

    ```C#
    using Microsoft.AspNetCore.Mvc.Filters;
    using System.Globalization;
    ```

1. Override the default thread culture and the current UI culture.

    ```C#
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        CultureInfo.DefaultThreadCurrentCulture = CultureInfo.DefaultThreadCurrentUICulture = new CultureInfo("fr-FR");

        base.OnActionExecuting(context);
    }
    ```

1. Match the client-side culture. By including the Kendo UI culture scripts, the number formats, the week and month names, the date and time formats, and so on will match the server-side culture and prevent validation errors. The culture scripts are generated from the Windows 10 and .NET 4.7 server-side culture definitions and match them by design.

    ```HtmlHelper
        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/cultures/kendo.culture.fr-FR.min.js">
        <!-- include the call to the kendo.culture() method before any widgets are initialized -->

        <script>kendo.culture("fr-FR");</script>

        @(Html.Kendo().Grid<OrderViewModel>()
            /* grid definition */
        )
    ```
    {% if site.core %}
    ```TagHelper
        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/cultures/kendo.culture.fr-FR.min.js">
        <!-- include the call to the kendo.culture() method before any widgets are initialized -->

        <script>kendo.culture("fr-FR");</script>

        <kendo-grid name="grid">
            /* grid definition */
        </kendo-grid>
    ```
    {% endif %}
    
## Toolbar Messages

The following example demonstrates how to implement the custom translation of the toolbar messages in the Grid by using the `Toolbar.[Command].Text()` method.

```HtmlHelper
    @(Html.Kendo().Grid<AspNetCoreGrid.Models.OrderViewModel>()
        .ToolBar(tools=>
        {
            tools.Pdf().Text("Custom PDF button text");
            tools.Excel().Text("Custom Excel button text");
            tools.Save().Text("Custom Save Changes button text");
            tools.Create().Text("Custom Create button text");
        })
```
{% if site.core %}
```TagHelper
    <kendo-grid name="Grid">
        <toolbar>
            <toolbar-button name="excel" text="Custom Excel button text"></toolbar-button>
            <toolbar-button name="pdf" text="Custom PDF button text"></toolbar-button>
            <toolbar-button name="save" text="Custom Save button text"></toolbar-button>
            <toolbar-button name="create" text="Custom Create button text"></toolbar-button>
        </toolbar>
    </kendo-grid>
```
{% endif %}

## Menu Messages

The following example demonstrates how to implement the message translation of the column menu in the Grid by using the `ColumnMenu.Messages()` method.

```HtmlHelper
    .ColumnMenu(colMenu=>colMenu.Messages(messages=> {
            messages.SortAscending("Custom Sort Asc Message");
            messages.SortDescending("Custom Sort Desc Message");
            messages.Columns("Custom Columns Message");
            messages.Filter("Custom Column Filter message");
            messages.Lock("Custom Column Lock message");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="Grid">
        <column-menu component-type="modern">
            <messages sort-ascending="Custom Sort Asc Message" 
                      sort-descending="Custom Sort Desc Message"
                      columns="Custom Columns Message"
                      filter="Custom Column Filter message" 
                      lock="Custom Column Lock message" />
            <column-menu-columns sort="asc">
                <column-menu-columns-groups>
                    <column-menu-columns-group title="Order ID" columns='new List<string> { "OrderID" }' />
                    <column-menu-columns-group title="Address" columns='new List<string> { "ShipCountry", "ShipName", "ShipAddress" }' />
                </column-menu-columns-groups>
            </column-menu-columns>
        </column-menu>
    </kendo-grid>
```
{% endif %}

## Command Messages

The following example demonstrates how to implement the translation of the column command messages in the Grid by using the command `Columns.[Command].Text()` method.

```HtmlHelper
    .Columns(columns =>
    {
        columns.Bound(f => f.OrderID).Width(200);
        columns.Bound(f => f.ShipCountry).Width(200);
        columns.Command(command =>
        {
            command.Edit().Text("Custom Edit button text");
            command.Destroy().Text("Custom Destroy button text");
        });
    })
```
{% if site.core %}
```TagHelper
    <kendo-grid name="Grid">
        <columns>
            <column field="OrderID" width="200"></column>
            <column field="ShipCountry" width="200"></column>
            <column>
                <commands>
                    <column-command text="Custom Edit button text" name="edit"></column-command>
                    <column-command text="Custom Delete button text" name="delete"></column-command>
                </commands>
            </column>
        </columns>
    </kendo-grid>
```
{% endif %}

## Filter Messages

The following example demonstrates how to implement the translations of the filter menu and operator messages in the Grid by using the `Filterable.Messages()` and `Filterable.Operators.For[Type]()` methods.

```HtmlHelper
    .Filterable(filterable => {
        filterable.Messages(messages =>
        {
            messages.Info("My Info");
            messages.Clear("My Clear");
            messages.Or("My Or");
            messages.And("My and");
            messages.IsTrue("My Custom True");
            messages.Operator("my custom operator message");
            /* and others */
        });
        filterable.Operators(op => {
            op.ForString(strop=> {
                strop.Clear(); // default filter operator
                strop.Contains("My Contains");
            });
        });
    })
```
{% if site.core %}
```TagHelper
    <kendo-grid name="Grid">
        <filterable>
            <messages 
                      info="My Info"
                      clear="My Clear"
                      or="My Or"
                      and="My and" 
                      is-true="My Custom True"
                      operator="My custom operator message" />
            <operators >
                <string contains="My Contains" />
            </operators>
        </filterable>
    </kendo-grid>
```
{% endif %}

## Group Header Messages

The following example demonstrates how to implement the translation for the group header messages in the Grid by using the `Groupable.Messages.Empty()` method.

```HtmlHelper
    .Groupable(groupable=> {
        groupable.Messages(messages =>
        {
            messages.Empty("My Drag Here to group by column message");
        });
    })
```
{% if site.core %}
```TagHelper
    <kendo-grid name="Grid">
        <groupable>
            <messages empty="My Drag Here to group by column message"/>
        </groupable>
    </kendo-grid>
```
{% endif %}

## Pager Messages

The following example demonstrates how to implement the translations of the pager messages in the Grid. For more information, refer to the [`messages`](https://docs.telerik.com/kendo-ui/api/javascript/ui/pager/configuration/messages) API reference.

```HtmlHelper
    .Pageable(pageable=> {
        pageable.Refresh(true);
        pageable.Messages(messages => {
            messages.Refresh("My Refresh");
            messages.Next("My Next");
            messages.Last("My Last");
            messages.Display("My {0} - {1} of {2} items"); // {0} is the index of the first record on the page, {1}     - the index of the last")
            /* and others */
        });
    })
```
{% if site.core %}
```TagHelper
    <kendo-grid name="Grid">
        <pageable refresh="true">
            <messages 
                      refresh="My Refresh"
                      next="My Next"
                      last="My Last"
                      display="My {0} - {1} of {2} items"/> @*{0} is the index of the first record on the page, {1} - the index of the last"*@
        </pageable>
    </kendo-grid>
```
{% endif %}

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Localization Support by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/globalization)
* [RTL Support by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/right-to-left-support)
* [Globalization in {{ site.product }}]({% slug overview_globalization_core %})
