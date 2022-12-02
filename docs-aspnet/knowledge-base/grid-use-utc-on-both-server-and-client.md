---
title: Formatting Grid DateTime Data Fields to Use UTC    
description: "Learn how to use UTC formatting on both the server and the client for {{ site.product }} Grid DateTime data fields."
type: how-to
page_title: Use UTC in Both Client and Server Grids 
slug: grid-use-utc-on-server-and-client
tags: grid, utc, format, datetime, client, server
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.2.913 version</td>
 </tr>
</table>

## Description

The Grid converts the values in columns that are bound to `DateTime` fields to local formats. How can I prevent this and keep the UTC format of the time?  

## Solution

Every time a date is retrieved from the database or received from the client, the `DateTime Kind` property is left unspecified on the server side. The .NET framework implicitly converts such dates to local formats.

Something similar happens on the client side. When the `Date` is parsed from a `Number` to a `Date` object, the browsers convert all dates according to the local time. For example, when you create a JavaScript date, such as `new Date(1353397262112)`, browsers on different machines which use different TimeZone system settings show different string representations.

To keep the time in UTC format, apply an explicit transformation to the dates on both client and server.

> If you use formats for parsing UTC date strings, [apply the `zzz` specifier](https://docs.telerik.com/kendo-ui/framework/globalization/dateparsing#parse-utc-date-strings) to render the local time. Otherwise, the current browser timezone offset will apply.

To apply the explicit transformation:

1. Use a `ViewModel` with a setter and a getter that explicitly set the `DateTime Kind` to UTC.

    ```
        private DateTime birthDate;
        public DateTime BirthDate
        {
            get { return this.birthDate; }
            set {
                this.birthDate = new DateTime(value.Ticks, DateTimeKind.Utc);
            }
        }
    ```

2. Use the [`requestEnd`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/events/requestend) event of the DataSource to intercept and replace the incoming Date field with the time difference.

    ```
        @(Html.Kendo().Grid<KendoUIMVC5.Models.Person>().Name("persons")
            .DataSource(dataSource => dataSource
                .Ajax()
                .Events(ev=>ev.RequestEnd("onRequestEnd"))
            )
            // ...
        )

        <script>
            var onRequestEnd = function(e) {
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
                    offsetDateFields(gr); // Handle the Key variable as well
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
        </script>
    ```

To explore the complete example, see the project on how to [use UTC time on both the client and the server](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/utc-on-server-and-client).

## See Also

{% if site.core %}
* [GridBuilder API Reference](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/GridBuilder)
{% else %}
* [GridBuilder API Reference](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/GridBuilder)
{% endif %}


