---
title: Adding a DropDownList in a Spreadsheet Cell
description: Learn how to create a dropdown list that loads data from a remote endpoint when using the Telerik UI for {{ site.framework }} Spreadsheet.
type: how-to
page_title: Adding a DropDownList in a Spreadsheet Cell
slug: spreadsheet-dropdownlist-cell
tags: spreadsheet, dropdown, dropdownlist, list, custom, cell, remote, server, data
res_type: kb
component: spreadsheet
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Spreadsheet</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2024.2.514 version</td>
 </tr>
</table>

## Description

How can I create a dropdown cell (of type list) in the Spreadsheet component that loads the options from the server?

## Solution

1. Bind the Spreadsheet to a DataSource that requests the data from a remote endpoint, as demonstrated in the [DataSource Binding online demo](https://demos.telerik.com/{{ site.platform }}/spreadsheet/datasource).

    ```View
        @(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        ... // Other configuration.
        .Sheets(sheets =>
        {
            sheets.Add()
                .Name("Sheet1")
                .DataSource<SpreadsheetProductViewModel>(ds => ds
                        .Custom()
                        .Batch(true)
                        .Transport(t => t.Read("onRead"))
                        .Schema(s => s
                            .Model(m =>
                            {
                                m.Id(p => p.CustomerID);
                            })
                        )
                    )
                .Columns(columns => // Configure the header (i.e., 3 columns). The rest of the columns and rows will be loaded based on the data collection retrieved from the server.
                {
                    columns.Add();
                    columns.Add();
                    columns.Add();
                })
                .Rows(rows =>
                {
                    rows.Add().Cells(cells =>
                    {
                        cells.Add().Background("#fef0cd").TextAlign(SpreadsheetTextAlign.Center);
                        cells.Add().Background("#fef0cd").TextAlign(SpreadsheetTextAlign.Center);
                        cells.Add().Background("#fef0cd").TextAlign(SpreadsheetTextAlign.Center);
                    });
                });
        })
        )

        <script>
            function onRead(options) {
                // Trigger an AJAX request to request the data.
                $.ajax({
                    url: '@Url.Action("ReadData", "Home")',
                    dataType: "json",
                    success: function (result) {
                        options.success(result.Data);
                    },
                    error: function (result) {
                        options.error(result);
                    }
                });
            }
        </script>
    ```
    ```Controller
        public JsonResult ReadData([DataSourceRequest] DataSourceRequest request)
        {
            var spreadsheetData = new List<SpreadsheetProductViewModel>();
            // Populate the collection with the data that must be loaded into the Spreadsheet component.
            return Json(spreadsheetData.ToDataSourceResult(request));
        }
    ```
    ```Model
        public class SpreadsheetProductViewModel
        {
            public string CustomerID { get; set; }

            public string CustomerName { get; set; }

            public string CustomerBranchName { get; set; }

            public List<string> Branches { get; set; }
        }
    ```

1. Configure the dropdown dynamically for each **CustomerBranchName** cell by handling the `RequestEnd` event of the DataSource. 
1. Within the `RequestEnd` event handler, loop through the data items that will be loaded in the Spreadsheet, access the respective **Branches** collection for each record, and set up the cell's custom editor at runtime.

    ```
        @(Html.Kendo().Spreadsheet()
            .Name("spreadsheet")
            .Sheets(sheets =>
            {
                sheets.Add()
                    .Name("Sheet1")
                    .DataSource<SpreadsheetProductViewModel>(ds => ds
                            .Custom()
                            .Events(ev => ev.RequestEnd("onRequestEnd"))
                            ... // Other configuration.
                        )
                    ... // Other configuration.
            })
        )

        <script>
            function onRequestEnd(e) {
                if (e.type === "read") {
                    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet"); // Get a reference to the Spreadsheet.
                    var sheet = spreadsheet.activeSheet(); // Select the current sheet.
                    var data = e.response; // Get the data from the server response.
                    for (var i = 0; i < data.length; i++) { // Loop through the data items.
                        var index = i + 2;
                        var range = sheet.range("C" + index); // Use the range() method to select column "C".
                        var branchData = data[i].Branches.join(","); // Parse the "Branches" values to a comma-separated string.
                        range.validation({ // Configure the dropdown for each cell in column C.
                            from: ` "${branchData}" `,
                            showButton: true,
                            comparerType: "list",
                            dataType: "list",
                            allowNulls: true,
                            type: "reject"
                        });
                    }
                }
            }
        </script>
    ```

## More {{ site.framework }} Spreadsheet Resources

* [{{ site.framework }} Spreadsheet Documentation]({%slug htmlhelpers_spreadsheet_aspnetcore%})

* [{{ site.framework }} Spreadsheet Demos](https://demos.telerik.com/{{ site.platform }}/spreadsheet)

{% if site.core %}
* [{{ site.framework }} Spreadsheet Product Page](https://www.telerik.com/aspnet-core-ui/spreadsheet)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Spreadsheet Product Page](https://www.telerik.com/aspnet-mvc/spreadsheet)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Spreadsheet for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
* [Server-Side API Reference of the Spreadsheet for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/spreadsheet)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Spreadsheet for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/spreadsheet)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
