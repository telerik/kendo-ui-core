---
title: DataSource Binding
page_title: DataSource Binding
description: "Learn how to bind a sheet of a {{ site.product }} Spreadsheet to a DataSource in {{ site.framework }} applications."
slug: htmlhelpers_spreadsheet_bind_to_datasource_aspnetcore
position: 1
---

# DataSource Binding

The Spreadsheet component supports binding individual sheets to a [DataSource]({% slug htmlhelpers_datasource_aspnetcore%}) instance that allows you to load data from a remote endpoint into the Spreadsheet and edit it.    

For a runnable example, refer to the demo on [binding the Spreadsheet component to a DataSource](https://demos.telerik.com/{{ site.platform }}/spreadsheet/datasource). The Spreadsheet DataSource from that demo uses the [`read`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/transport.read) and [`submit`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/transport.submit) transport options. The `submit` option is required to handle a scenario where the user creates, updates, and deletes items simultaneously.

When using separate [`create`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/transport.create), [`update`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/transport.update), and [`destroy`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/transport.destroy) handlers, one can fail while the others do not. That will result in a mismatch of the data state between the client (the Spreadsheet) and the remote source. The `submit` option handles all operations through a single request. The operation will not save any changes if a specified record is invalid.

## Specific Behavior

The DataSource binding switches the sheet to a special data-bound mode. It differs from the standard behavior in the following ways:

* Column headers are inferred from the data item fields. Configure the column headers and ordering by using the [`setDataSource()`](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/sheet/methods/setdatasource) method of the sheet.
* Cell styles, formulas, and formats are not persisted in the DataSource.
* Row height and column width are not persisted in the DataSource.
* Sorting and filtering are applied locally.

The CRUD data operations are also handled in a specific way:

* Inserted rows are always appended at the end, regardless of the actual row index.
* Updating cell content translates into `update` operations.
* Deleting rows translates into `destroy` operations.
* Inserting and removing columns is not supported.

{% if site.core %}
## Data Source Binding in Razor Pages

To bind the Telerik UI Spreadsheet for {{ site.framework }} to a DataSource within a Razor Pages application, the [specific behavior](#specific-behavior) is still valid. 

You need to configure the `read` and `submit` transport options to send requests to the respective handler in the `PageModel`. When handling the `submit` action, you must send the anti-forgery token through the request. 

For the complete project, refer to the [Spreadsheet in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Spreadsheet).

```Razor Index.cshtml
    @page
    @model IndexModel

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
                url: '@Url.Page("Index", "Data_Source_Products_Submit")',
                data: {
                    model: e.data, // The sheet's data.
                    __RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken // The anti-forgery token.
                },
                dataType: "json",
                success: function (result) {
                    e.success(result.Updated, "update"); // Trigger `update` operation.
                    e.success(result.Created, "create"); // Trigger `create` operation.
                    e.success(result.Destroyed, "destroy"); // Trigger `destroy` operation.
                },
                error: function (xhr, httpStatusMessage, customErrorMessage) {
                    alert(xhr.responseText);
                }
            });
        }

        function onRead(options) {
            $.ajax({
                url: '@Url.Page("Index", "Data_Source_Products_Read")',
                dataType: "json",
                success: function (result) {
                    options.success(result.Data); // Set the received data from the remote endpoint to the sheet's DataSource.
                },
                error: function (result) {
                    options.error(result);
                }
            });
        }

        function onChange(e) {
            $("#cancel, #save").toggleClass("k-disabled", !this.hasChanges()); // Enable the "Save changes" and "Cancel changes" buttons if a specified data item has changed.
        }

        function getDataSource() {
            return $("#spreadsheet").data("kendoSpreadsheet").activeSheet().dataSource;
        }

        $(document).ready( function () {
            $("#save").click(function() { // Handle the "click" event of the "Save changes" button.
                if (!$(this).hasClass("k-disabled")) {
                    getDataSource().sync(); // Call the sync() method of the DataSouce to trigger the "submit" handler.
                }
            });

            $("#cancel").click(function () { // Handle the "click" event of the "Cancel changes" button.
                if (!$(this).hasClass("k-disabled")) {
                    getDataSource().cancelChanges(); // Call the cancelChanges() method of the DataSouce to cancel the pending changes.
                }
            });
        });
    </script>
```
```C# Index.cshtml.cs
    public static IList<Product> SpreadData;

    public void OnGet()
    {
        if (SpreadData == null)
        {
            // Populate the "SpreadData" collection with data.
            SpreadData = Enumerable.Range(1, 50).Select(x => new Product() { 
                ProductID = x,
                CategoryID = x % 7,
                ProductName = "Product " + x
            }).ToList();
        }
    }

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
```Model
    public class Product
    {
        public int ProductID { get; set; }
        public int CategoryID { get; set; }
        public string ProductName { get; set; }
    }
```
{% endif %}

## Unsupported Scenarios

* The [`Sheet`](/api/kendo.mvc.ui.fluent/spreadsheetsheetbuilder) cannot be bound to a DataSource that does not contain any items because the header row in the sheet is generated based on the data item fields.
* The records cannot be edited after sorting the sheet ([a feature request](https://feedback.telerik.com/kendo-jquery-ui/1402815-allow-sorting-for-spreadsheet-with-datasource)).
* The records cannot be edited after filtering the sheet ([a feature request](https://feedback.telerik.com/kendo-jquery-ui/1402817-allow-filtering-for-spreadsheet-with-datasource)).

## See Also

* [Exporting the Spreadsheet to Excel]({% slug htmlhelpers_spreadsheet_export_to_excel_aspnetcore %})
{% if site.core %}
* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
{% endif %}
* [Client-Side API of the Spreadsheet](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
* [Server-Side HtmlHelper API of the Spreadsheet](/api/spreadsheet)
{% if site.core %}
* [Server-Side TagHelper API of the Spreadsheet](/api/taghelpers/spreadsheet)
{% endif %}




