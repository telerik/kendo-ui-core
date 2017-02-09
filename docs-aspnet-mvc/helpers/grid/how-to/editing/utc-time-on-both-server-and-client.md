---
title: Use UTC on Both Client and Server
page_title: Use UTC on Both Client and Server | Kendo UI Grid HtmlHelper
description: "Configure the Kendo UI Grid to use the enum type for both displaying and editing."
slug: howto_useutctimeonclientandserver_gridaspnetmv
---

# Use UTC on Both Client and Server

The following example demonstrates how to keep a `DateTime` property in a `UTC` format on both server and client when using a Grid with Ajax binding and editing.

Every time a date is being retrieved from the database or received from the client, the `DateTime Kind` property is left unspecified on the server side. The .NET framework implicitly converts such dates to local formats.

A similar thing happens on the client side. Browsers convert all dates according to the local time when the `Date` is parsed from a `Number` to a `Date` object. For example, when you create a JavaScript date, such as `new Date(1353397262112)`, browsers on different machines which use different TimeZone system settings show different string representations.

To keep time in the UTC format, apply an explicit transformation to the dates on both client and server.

> **Important**
>
> If you use formats for parsing UTC date strings, [apply the `zzz` specifier](http://docs.telerik.com/kendo-ui/framework/globalization/dateparsing#parse-utc-date-strings) to render the local time. Otherwise, the current browser timezone offset will apply.

Below are listed the 2 corresponding steps for you to follow.

1. Use a `ViewModel` with a setter and a getter that explicitly set the `DateTime Kind` to UTC.

    ###### Example

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

2. Use the [`requestEnd`](/api/javascript/data/datasource#requestend) event of the DataSource to intercept and replace the incoming Date field with the time difference.

    ###### Example

    ```
        @(Html.Kendo().Grid<KendoUIMVC5.Models.Person>().Name("persons")
            .DataSource(dataSource => dataSource
                .Ajax()
                .Events(ev=>ev.RequestEnd("onRequestEnd"))
            )
            // ...
        )

        <script>
            function onRequestEnd = function(e) {
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
                        obj[name] = prop.replace(/\d+/, function (n) {
                            var offsetMiliseconds = new Date(parseInt(n)).getTimezoneOffset() * 60000;
                            return parseInt(n) + offsetMiliseconds
                        });
                    }
                }
            }
        </script>
    ```

To see the example, refer to the project on how to [use UTC time on both the client and the server](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/utc-on-server-and-client).

## See Also

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [GridBuilder API Reference](/api/Kendo.Mvc.UI.Fluent/GridBuilder)

For more runnable examples on the Kendo UI Grid in ASP.NET MVC applications, browse its [**How To** documentation folder](/helpers/grid/how-to/Appearance/).
