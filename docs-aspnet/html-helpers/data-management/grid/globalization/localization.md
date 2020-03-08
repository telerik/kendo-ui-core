---
title: Localization
page_title: Localization
description: "Get started with the Telerik UI Grid HtmlHelper for {{ site.framework }} and translate its toolbar, menu, command, filter, header, and pager text messages for different culture locales."
slug: localization_aspnetcore_grid
position: 3
---

# Localization

The Grid provides options for localizing its user interface by utilizing the available Resources messages as well as providing custom messages as part of its configuration.

## Getting Started

To use the community-sources Resources files, override the executing context and set the server-side culture. This causes the {{ site.framework }} Grid to use the matching Resource file messages and localize them accordingly. In case of missing messages, you can update the Resources file or include the message in the configuration of the grid.

1. Add the `Microsoft.AspNetCore.Mvc.Filters` and `System.Globalization` to the controller using namespaces:

        using Microsoft.AspNetCore.Mvc.Filters;
        using System.Globalization;

1. Override the default thread culture and the current UI culture.

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            CultureInfo.DefaultThreadCurrentCulture = CultureInfo.DefaultThreadCurrentUICulture = new CultureInfo("fr-FR");

            base.OnActionExecuting(context);
        }

1. Match the client-side culture. By including the Kendo UI culture scripts, the number formats, the week and month names, the date and time formats, and so on will match the server-side culture and prevent validation errors. The culture scripts are generated from the Windows 10 and .NET 4.7 server-side culture definitions and match them by design.

        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/cultures/kendo.culture.fr-FR.min.js">
        <!-- include the call to the kendo.culture() method before any widgets are initialized -->

        <script>kendo.culture("fr-FR");</script>

        @(Html.Kendo().Grid<OrderViewModel>()
            /* grid definition */
        )

## Toolbar Messages

The following example demonstrates how to implement the custom translation of the toolbar messages in the Grid by using the `Toolbar.[Command].Text()` method.

        @(Html.Kendo().Grid<AspNetCoreGrid.Models.OrderViewModel>()
            .ToolBar(tools=>
            {
                tools.Pdf().Text("Custom PDF button text");
                tools.Excel().Text("Custom Excel button text");
                tools.Save().Text("Custom Save Changes button text");
                tools.Create().Text("Custom Create button text");
            })


## Menu Messages

The following example demonstrates how to implement the message translation of the column menu in the Grid by using the `ColumnMenu.Messages()` method.

        .ColumnMenu(colMenu=>colMenu.Messages(messages=> {
                messages.SortAscending("Custom Sort Asc Message");
                messages.SortDescending("Custom Sort Asc Message");
                messages.Columns("Custom Columns Message");
                messages.Filter("Custom Column Filter message");
                messages.Lock("Custom Column Lock message");
            })
        )

## Command Messages

The following example demonstrates how to implement the translation of the column command messages in the Grid by using the command `Columns.[Command].Text()` method.

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

## Filter Messages

The following example demonstrates how to implement the translations of the filter menu and operator messages in the Grid by using the `Filterable.Messages()` and `Filterable.Operators.For[Type]()` methods.

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

## Group Header Messages

The following example demonstrates how to implement the translation for the group header messages in the Grid by using the `Groupable.Messages.Empty()` method.

        .Groupable(groupable=> {
            groupable.Messages(messages =>
            {
                messages.Empty("My Drag Here to group by column message");
            });
        })

## Pager Messages

The following example demonstrates how to implement the translations of the pager messages in the Grid. For more information, refer to the [`messages`](https://docs.telerik.com/kendo-ui/api/javascript/ui/pager/configuration/messages) API reference.

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

## See Also

* [Localization Support by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/globalization)
* [RTL Support by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/right-to-left-support)
* [Globalization in {{ site.product }}]({% slug overview_globalization_core %})
