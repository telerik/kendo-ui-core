---
title: Server-Side Processing
page_title: Server-Side Processing
description: "Process the data of the Telerik UI Spreadsheet by using the Telerik Document Processing library."
previous_url: /helpers/data-management/spreadsheet/spreadsheet-processing
slug: spreadsheet_processing_spreadsheet_mvc
position: 10
---

# Server-Side Processing

To export huge datasets to Excel, you can use the [RadSpreadStreamProcessing library](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/overview) which is part of [Telerik Document Processing (TDP) by Progress](https://docs.telerik.com/devtools/document-processing/introduction).

> The [Telerik Document Processing libraries](https://docs.telerik.com/devtools/document-processing/introduction#libraries) are distributed as part of the [{{ site.product }}]({% slug overview_aspnetmvc6_aspnetmvc %}) and are available for the Telerik UI Enterprise and DevCraft bundles.

For examples on how to export Excel files, refer to the [RadSpreadProcessing library](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/overview).

TDP handles the data import, export, and processing from the following formats:

* Excel Microsoft Office Open XML Spreadsheet (`.xlsx`)
* Comma-separated values (`.csv`)
* Tab-separated values (`.txt`)
* Portable document format (`.pdf`) (export only)

## Dependencies

The `.NET` server-side module is distributed as a part of the [{{ site.product }}]({% slug overview_aspnetmvc6_aspnetmvc %}). The `telerik.ui.for.aspnetmvc.<version>.zip` archive contains a `spreadsheet` folder that contains assemblies for both .NET 4.0 and .NET 4.5 versions. Include a reference to the `Telerik.Web.Spreadsheet.dll` assembly for the respective framework version. The main entry point for the project is the `Telerik.Web.Spreadsheet.Workbook` class. This is a `POCO` object that mirrors the object structure of the JSON and provides format conversion methods. Under the hood, it uses TDP to perform the actual conversion.

> No strict dependency on the type of the server framework that is used exists. Popular choices, such as MVC, WebAPI, and WebForms, work equally well.

## Loading Data from External Files

The following example demonstrates how to load a file from the file system and convert it to a Workbook for serialization.

The supported file extensions are:
* `.xlsx`
* `.csv`
* `.txt`
* `.json`

```cs
public class HomeController : Controller
{
    public ActionResult Read()
    {
        var path = Server.MapPath("~/App_Data/path/to/document.xlsx");
        var workbook = Telerik.Web.Spreadsheet.Workbook.Load(path);

        //Uses Newtonsoft.Json internally to serialize fields correctly.
        return Content(workbook.ToJson(), Telerik.Web.Spreadsheet.MimeTypes.JSON);
    }
}
```
```cshtml
@(Html.Kendo().Spreadsheet()
    .Name("spreadsheet")
)

<script>
    $(document).ready(function () {
        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        $.getJSON("@Url.Action("Read", "Home")")
        .done(function (data) {
            spreadsheet.fromJSON(data);
        });
    });
</script>
```

## Loading Data from External Files by Using BindTo Method

The following example demonstrates how to load a file from the file system and use it to populate the Spreadsheet.

The supported file extensions are:
* `.xlsx`
* `.csv`
* `.txt`
* `.json`

    @{
        var path = Server.MapPath("~/App_Data/path/to/document.xlsx");
        var workbook = Telerik.Web.Spreadsheet.Workbook.Load(path);
    }

    @(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .BindTo(workbook)
    )

## Loading Data by Using BindTo and Document Model

The following example demonstrates how to load the data by using the `BindTo` method and the Spreadsheet document model.

```cs
	public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var document = new Telerik.Windows.Documents.Spreadsheet.Model.Workbook();
            var worksheet = document.Worksheets.Add();
            worksheet.Cells[0, 0].SetValue("1.23");
            worksheet.Name = "Worksheet 1";

            return View(Telerik.Web.Spreadsheet.Workbook.FromDocument(document));
        }
    }
```
```cshtml
@model Telerik.Web.Spreadsheet.Workbook

@(Html.Kendo().Spreadsheet()
    .Name("spreadsheet")
    .BindTo(Model)
);
```

## Saving Workbooks to External Files

The following example demonstrates how to post a workbook to a controller and save it as a local file.

The supported file extensions are:
* `.xlsx`
* `.csv`
* `.txt`
* `.pdf`
* `.json`

> Set [`aspnet:MaxJsonDeserializerMembers`](https://msdn.microsoft.com/en-us/library/hh975440%28v=vs.120%29.aspx?f=255&MSPPError=-2147217396) to a higher value than the default one in the `web.config`.

```cs
[HttpPost]
public ActionResult Save(Telerik.Web.Spreadsheet.Workbook workbook)
{
    workbook.Save("path/to/document.xlsx");
    return new EmptyResult();
}
```
```cshtml
@(Html.Kendo().Spreadsheet()
    .Name("spreadsheet")
)

<button id="save">Save</button>
<script>
    $("#save").click(function () {
        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        $.ajax({
            url: "@Url.Action("Save", "Home")",
            data: JSON.stringify(spreadsheet.toJSON()),
            contentType: "application/json",
            type: "POST"
        });
    });
</script>
```
```web.config
<configuration>
  <appSettings>
    <add key="aspnet:MaxJsonDeserializerMembers" value="150000" />
  </appSettings>
</configuration>
```

## Converting TDP Documents to Workbooks

Telerik Document Processing provides a full-blown model for a Spreadsheet document. To display the result in a Spreadsheet, convert it to `Telerik.Web.Spreadsheet.Workbook`.

    var document = new Telerik.Windows.Documents.Spreadsheet.Model.Workbook();
    var worksheet = document.Worksheets.Add();
    worksheet.Cells[0, 0].SetValue("1.23");

    return Telerik.Web.Spreadsheet.Workbook.FromDocument(document);

## Converting Workbooks to TDP Documents

You can convert a `Telerik.Web.Spreadsheet.Workbook` Spreadsheet model and to a TDP document and then process it further and convert and store it as needed.

    [HttpPost]
    public ActionResult Process(Telerik.Web.Spreadsheet.Workbook workbook)
    {
        var document = workbook.ToDocument();

        // Continue with the TDP API as usual.
        var worksheet = document.ActiveWorksheet;
        var A1Cell = new CellIndex(0, 0);
        var B2Cell = new CellIndex(1, 1);

        worksheet.Cells[A1Cell, B2Cell].Merge();

        return new EmptyResult();
    }

## See Also

* [Basic Usage of the Spreadsheet HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/spreadsheet/index)
* [API Reference of the Spreadsheet HtmlHelper for {{ site.framework }}](/api/spreadsheet)
