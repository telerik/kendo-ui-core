---
title: Data Source Binding
page_title: Data Source Binding
description: "Learn how to bind a sheet to a Data Source in the Telerik UI Spreadsheet HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_spreadsheet_bind_to_datasource_aspnetcore
position: 1
---

# Data Source Binding

The Spreadsheet supports binding individual sheets to a Data Source instance which allows you to quickly bring data from external data sources into the Spreadsheet and edit it.  

For a runnable example, refer to the demo on [binding the Spreadsheet HtmlHelper to the DataSource](https://demos.telerik.com/{{ site.platform }}/spreadsheet/datasource). The Spreadsheet DataSource from that example uses the [`read`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/transport.read) and [`submit`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/transport.submit) transport options. The `submit` option is required to properly handle a scenario in which the user creates, updates and deletes items simultaneously.

When using separate [`create`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/transport.create), [`update`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/transport.update), and [`destroy`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/transport.destroy) handlers, it is possible that one of them fails, while the others do not. That will result in a mismatch of the data state between the client (the Spreadsheet) and the remote source. The `submit` option handles all operations within a single request. It will not save any changes if any of the items is invalid.

## Specific Behavior

Data Source binding switches the sheet to a special data-bound mode. It differs from the standard behavior in the following ways:

* Column headers are inferred from the data item fields. Configure the column headers and ordering by using the [sheet `setDataSource` method](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/sheet/methods/setdatasource).
* Cell styles, formulas, and formats are not persisted in the data source.
* Row height and column width are not persisted in the data source.
* Sorting and filtering are applied locally.

CRUD operations are also handled in a specific way:

* Inserted rows are always appended at the end, regardless of the actual row index.
* Updating cell content translates into update operations.
* Deleting rows translates into destroy operations.
* Inserting and removing columns is not supported.

{% if site.core %}
## Data Source Binding in Razor Page scenario

In order to set up the Data Source Binding of the Telerik UI Spreadsheet HtmlHelper for {{ site.framework }} component in Razor page scenario, the above mentioned requrements are still valid. You will, however, need to configure the `read` and `submit` transport options to send requests to the respective handler in the PageModel. When handling the `submit` action you will need to also send the antiforgery token. See the implementation details in the example below, and for the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <div class="box-col">
        <h4>Save data changes</h4>
        <div>
            <button id="save">Save changes</button>
            <button id="cancel">Cancel changes</button>
        </div>
    </div>

    @(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .Events(e => e
                .DataBinding("onDataBinding")
                .DataBound("onDataBound")
            )
        .Sheets(s => s.Add()
            .Name("Sheet1")
            .DataSource<Product>(ds => ds
                .Custom()
                .Batch(true)
                .Transport(t => t
                    .Read("onRead")
                    .Submit("onSubmit")
                )
                .Events(e => e.Change("onChange"))
                .Schema(sch => sch
                    .Model(m =>
                    {
                        m.Id(i => i.ProductID);
                    })
                )
            )
            .Columns(columns=>{
                columns.Add().Width(100);
                columns.Add().Width(100);
                columns.Add().Width(200);
            })
            .Rows(rows =>
            {
                rows.Add().Height(40).Cells(cells =>
                {
                    cells.Add()
                        .Bold(true)
                        .Background("#9c27b0")
                        .TextAlign(SpreadsheetTextAlign.Center)
                        .Color("white");
                    cells.Add()
                        .Bold(true)
                        .Background("#9c27b0")
                        .TextAlign(SpreadsheetTextAlign.Center)
                        .Color("white");
                    cells.Add()
                        .Bold(true)
                        .Background("#9c27b0")
                        .TextAlign(SpreadsheetTextAlign.Center)
                        .Color("white");
                });
            })
            )
        )

    <script>
        function onSubmit(e) {
            $.ajax({
                type: "POST",
                url: '@Url.Page("SpreadsheetDataSourceBinding", "Data_Source_Products_Submit")',
                data: {
                    model: e.data,
                    __RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken
                },
                dataType: "json",
                success: function (result) {
                    e.success(result.Updated, "update");
                    e.success(result.Created, "create");
                    e.success(result.Destroyed, "destroy");
                },
                error: function (xhr, httpStatusMessage, customErrorMessage) {
                    alert(xhr.responseText);
                }
            });
        }

        function onRead(options) {
            $.ajax({
                url: '@Url.Page("SpreadsheetDataSourceBinding", "Data_Source_Products_Read")',
                dataType: "json",
                success: function (result) {
                    options.success(result.Data);
                },
                error: function (result) {
                    options.error(result);
                }
            });
        }

        function onChange(e) {
            $("#cancel, #save").toggleClass("k-state-disabled", !this.hasChanges());
        }

        function getDataSource() {
            return $("#spreadsheet").data("kendoSpreadsheet").activeSheet().dataSource;
        }

        function onDataBinding(e) {
            console.log('Data is about to be bound to sheet "' + e.sheet.name() + '".');
        }

        function onDataBound(e) {
            console.log('Data has been bound to sheet "' + e.sheet.name() + '".');
        }

        $(document).ready( function () {
            $("#save").click(function () {
                if (!$(this).hasClass("k-state-disabled")) {
                    getDataSource().sync();
                }
            });

            $("#cancel").click(function () {
                if (!$(this).hasClass("k-state-disabled")) {
                    getDataSource().cancelChanges();
                }
            });
        })
    </script>
```
```tab-PageModel(cshtml.cs)
    public JsonResult OnGetData_Source_Products_Read([DataSourceRequest] DataSourceRequest request)
    {
        return new JsonResult(SpreadData.ToDataSourceResult(request));
    }

    public ActionResult OnPostData_Source_Products_Submit(SpreadsheetSubmitViewModel model)
    {
        var result = new SpreadsheetSubmitViewModel()
        {
            Created = new List<Product>(),
            Updated = new List<Product>(),
            Destroyed = new List<Product>()
        };

        if ((model.Created != null || model.Updated != null || model.Destroyed != null) && ModelState.IsValid)
        {
            if (model.Created != null)
            {
                foreach (var created in model.Created)
                {
                    SpreadData.Add(created);
                    result.Created.Add(created);
                }
            }

            if (model.Updated != null)
            {
                foreach (var updated in model.Updated)
                {
                    var target = SpreadData.FirstOrDefault(x=>x.ProductID == updated.ProductID);
                    target = updated;
                    result.Updated.Add(updated);
                }
            }

            if (model.Destroyed != null)
            {
                foreach (var destroyed in model.Destroyed)
                {
                    var target = SpreadData.FirstOrDefault(x => x.ProductID == destroyed.ProductID);
                    SpreadData.Remove(target);
                    result.Destroyed.Add(destroyed);
                }
            }

            return new JsonResult(result);
        }
        else
        {
            return StatusCode(400, "The models contain invalid property values.");
        }
    }
```

{% endif %}

## Unsupported Scenarios

* The Sheet cannot be bound to a source which does not contain any items because the header row in the sheet is generated based on the data items fields.
* Records cannot be edited after sorting the sheet ([related feature request](https://feedback.telerik.com/kendo-jquery-ui/1402815-allow-sorting-for-spreadsheet-with-datasource)).
* Records cannot be edited after filtering the sheet ([related feature request](https://feedback.telerik.com/kendo-jquery-ui/1402817-allow-filtering-for-spreadsheet-with-datasource)).

## See Also

* [Server-Side API](/api/spreadsheet)
* [Custom Functions]({% slug htmlhelpers_spreadsheet_custom_functions_aspnetcore %})
* [Cell Formatting]({% slug htmlhelpers_spreadsheet_custom_functions_aspnetcore %})
* [Export to Excel]({% slug htmlhelpers_spreadsheet_export_to_excel_aspnetcore %})
