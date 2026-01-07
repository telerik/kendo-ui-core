---
title: Use UTC Format on Both Client and Server when using Dates in Grid
page_title: Use UTC Format on Both Client and Server when using Dates in Grid
description: "Configure the {{ site.product }} Grid to keep the DateTime properties in a UTC format on both server and client."
previous_url: /helpers/data-management/grid/how-to/editing/utc-time-on-both-server-and-client, /html-helpers/data-management/grid/how-to/editing/utc-time-on-both-server-and-client
slug: howto_useutctimeonclientandserver_gridaspnetmv
component: grid
type: how-to
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product version</td>
  <td>2025.4.1217</td>
 </tr>
</table>

## Description

How can I keep all `DateTime` properties in `UTC` format in the Grid on the client and the server?

## Solution

The following example demonstrates how to keep a `DateTime` property in a `UTC` format on both server and client when using a Grid with Ajax binding and editing.

Every time a date is retrieved from the database or received from the client, the `DateTime Kind` property is left unspecified on the server side. The .NET framework implicitly converts such dates to local formats.

A similar thing happens on the client side. Browsers convert all dates according to the local time when the `Date` is parsed from a `Number` to a `Date` object. For example, when you create a JavaScript date, such as `new Date(1353397262112)`, browsers on different machines, which use different TimeZone system settings show different string representations.

To keep time in the `UTC` format, apply an explicit transformation to the dates on both client and server.

> If you use formats for parsing `UTC` date strings, [apply the `zzz` specifier](https://docs.telerik.com/kendo-ui/framework/globalization/dateparsing#parse-utc-date-strings) to render the local time. Otherwise, the current browser timezone offset will apply.

Below are listed the two corresponding steps for you to follow.

1. Use a `ViewModel` with a setter and a getter that explicitly set the `DateTime Kind` to `UTC`.

    ```C#
        private DateTime birthDate;
        public DateTime BirthDate
        {
            get { return this.birthDate; }
            set {
                this.birthDate = new DateTime(value.Ticks, DateTimeKind.Utc);
            }
        }
    ```

1. Use the [`RequestEnd`](/api/kendo.mvc.ui.fluent/datasourceeventbuilder#requestendsystemstring) event of the DataSource to intercept and replace the incoming `DateTime` field with the time difference.

    ```Razor
        @(Html.Kendo().Grid<KendoUIMVC5.Models.Person>()
            .Name("persons")
            .DataSource(dataSource => dataSource
                .Ajax()
                .Events(ev=>ev.RequestEnd("onRequestEnd"))
            )
            ... // Additional configuration.
        )

        <script type="text/javascript">
            (function () {
                window.onRequestEnd = function (e) {
                    if (e.response.Data && e.response.Data.length) {
                        var data = e.response.Data;
                        if (this.group().length && e.type == "read") {
                            handleGroups(data);
                        } else {
                            loopRecords(data);
                        }
                    }
                }

                function handleGroups(groups) {
                    for (var i = 0; i < groups.length; i++) {
                        var gr = groups[i];
                        offsetDateFields(gr); //handle the Key variable as well
                        if (gr.HasSubgroups) {
                            handleGroups(gr.Items)
                        } else {
                            loopRecords(gr.Items);
                        }
                    }
                }

                function loopRecords(persons) {
                    for (var i = 0; i < persons.length; i++) {
                        var person = persons[i];
                        offsetDateFields(person);
                    }
                }

                function offsetDateFields(obj) {
                    for (var name in obj) {
                        var prop = obj[name];
                        if (typeof (prop) === "string" && prop.indexOf("/Date(") == 0) {
                            obj[name] = prop.replace(/-?\d+/, function (n) {
                                var offsetMiliseconds = new Date(parseInt(n)).getTimezoneOffset() * 60000;
                                return parseInt(n) + offsetMiliseconds
                            });
                        }
                    }
                }
            })();
        </script>
    ```

To review the complete example, refer to the [project on how to use UTC time on both the client and the server when the Grid contains dates](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridDateUtcOnServerAndClient).

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})
* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

