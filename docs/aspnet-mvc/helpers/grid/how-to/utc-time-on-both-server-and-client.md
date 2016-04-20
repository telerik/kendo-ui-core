---
title: Use UTC on Both Client and Server
page_title: Use UTC on Both Client and Server | Kendo UI Grid HtmlHelper
description: "Configure the Kendo UI Grid to use the enum type for both displaying and editing."
slug: howto_useutctimeonclientandserver_gridaspnetmv
---

# Use UTC on Both Client and Server

The example below demonstrates how to keep a `DateTime` property in a `UTC` format on both server and client when using a Grid with Ajax binding and editing.

Every time a date is being retrieved from the database or received from the client, the `DateTime Kind` property is left unspecified on the server side. The .NET framework implicitly converts such dates to local formats.

A similar thing happens on the client side. Browsers convert all dates according to the local time when the `Date` is parsed from a `Number` to a `Date` object. For example, when you create a JavaScript date, such as `new Date(1353397262112)`, browsers on different machines which use different TimeZone system settings show different string representations.

To keep time in the UTC format, apply an explicit transformation to the dates on both client and server.

Below are listed the two corresponding steps for you to follow.

**Step 1** Use a `ViewModel` with a setter and a getter that explicitly set the `DateTime Kind` to UTC.

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

**Step 2** Use the [`requestEnd`](/api/javascript/data/datasource#requestend) event of the DataSource to intercept and replace the incoming Date field with the time difference.

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

To see the example on how to use UTC time on both the client and the server, refer to [this project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/utc-on-server-and-client).

## See Also

Other articles and how-to examples on the Kendo UI Grid HtmlHelper:

* [Overview of the Grid HtmlHelper]({% slug overview_uploadhelper_aspnetmvc %})
* [How to Apply Custom Row Styles Based on Model Data]({% slug howto_applycustomrrowstylesmodeldata_gridaspnetmv %})
* [How to Bind the Grid to DataTable]({% slug howto_bindgridtodatatable_gridaspnetmvc %})
* [How to Bind the Grid to the SignalR Hub]({% slug howto_bindgridtosignalrhub_gridaspnetmv %})
* [How to Export Grid Data in PDF]({% slug howto_exportonpdf_gridaspnetmv %})
* [How to Export Grid Data to CSV Files]({% slug howto_exportgriddatacsvfile_gridaspnetmv %})
* [How to Export Grid Data to Excel]({% slug howto_exportgriddataasexceldocs_gridaspnetmv %})
* [How to Handle Unauthorized Requests with Ajax-Bound Grids]({% slug howto_handleunathorizedrequestsajaxbound_gridaspnetmv %})
* [How to Post Grid Data with Form]({% slug howto_postgriddatawithform_gridaspnetmv %})
* [How to Post Grid Selection to Server]({% slug howto_postselectiontoserver_gridaspnetmv %})
* [How to Preserve the Grid Server Toolbar Template after Using setOptions]({% slug howto_preserveservertemplateaftersetoptions_gridaspnetmv %})
* [How to Use Custom JsonResult with Ajax-Bound Grids]({% slug howto_usecustomjsonresultajaxbound_gridaspnetmvc %})
* [How to Use Grid Hierarchy with Dynamic Model Loading and DataTable]({% slug howto_usegridhierarchydynamicmodelload_gridaspnetmv %})
* [How to Use Grid Self-Referencing Hierarchy]({% slug howto_usegridselfrefhierarchy_gridaspnetmv %})
* [How to Use oData v4 with WebAPI Controller]({% slug howto_useodata4webapicontroller_gridaspnetmvc %})
* [How to Use the Sortable to Reorder Grid Rows]({% slug howto_usesortabletoreorder_gridaspnetmv %})

For more runnable examples on the Kendo UI Grid HtmlHelper, browse the [how-to section of articles]({% slug howto_applycustomrowstylesbasedondata_gridaspnetmvc %}).
