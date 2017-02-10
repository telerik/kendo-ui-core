---
title: Server-Side Processing
page_title: Server-Side Processing | Kendo UI Spreadsheet HtmlHelper
description: "Process Kendo UI Spreadsheet data using the Telerik Document Processing library."
slug: spreadsheet_processing_spreadsheet_mvc
position: 2
---

# Server-Side Processing

To export huge datasets to Excel, a well-suited solution is the new [RadSpreadStreamProcessing library](http://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/overview) which is part of [Telerik Document Processing (TDP) by Progress](http://docs.telerik.com/devtools/document-processing/introduction).

TDP handles the data import, export, and processing from the following formats:

* Excel Microsoft Office Open XML Spreadsheet (`.xlsx`)
* Comma-separated values (`.csv`)
* Tab-separated values (`.txt`)
* Portable document format (`.pdf`) (export only)

> **Important**
>
> The [Telerik Document Processing libraries](http://docs.telerik.com/devtools/document-processing/introduction#libraries) are distributed as part of the [UI for ASP.NET MVC]({% slug overview_aspnetmvc %}) and are available for the Kendo UI Enterprise and DevCraft bundles.

For examples on how to export Excel files, refer to the [RadSpreadProcessing library](http://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/overview).

## Dependencies

The `.NET` server-side module is distributed as a part of the [UI for ASP.NET MVC bundle]({% slug overview_aspnetmvc %}).

The `telerik.ui.for.aspnetmvc.<version>.zip` archive contains a `spreadsheet` folder that contains assemblies for both .NET 4.0 and .NET 4.5 versions. Include a reference to the `Telerik.Web.Spreadsheet.dll` assembly for the respective framework version.

The main entry point for the project is the `Telerik.Web.Spreadsheet.Workbook` class. This is a `POCO` object that mirrors the object structure of the JSON and provides format conversion methods. Under the hood, it uses TDP to perform the actual conversion.

## Supported Scenarios

Below are listed the typical usage scenarios as they would appear in ASP.NET MVC applications for you to get familiar with.

> **Important**
>
> There is no strict dependency on the type of server framework used. Popular choices, such as MVC, WebAPI, and WebForms, work equally well.

### Load Data from External File

Load a file from the file system and convert it to a Workbook for serialization. The supported file extensions are `.xlsx`, `.csv`, `.txt`, and `.json`.

###### Example

```tab-cs
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
```tab-cshtml
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

### Load Data from External File Using BindTo Method

Load a file from the file system and use it to populate the Spreadsheet widget. The supported file extensions are `.xlsx`, `.csv`, `.txt`, and `.json`.

###### Example

```tab-cshtml
@{
    var path = Server.MapPath("~/App_Data/path/to/document.xlsx");
    var workbook = Telerik.Web.Spreadsheet.Workbook.Load(path);
}

@(Html.Kendo().Spreadsheet()
    .Name("spreadsheet")
    .BindTo(workbook)
)
```

### Save Workbook to External File

Post a Workbook to a controller and save it as a local file. The supported file extensions are `.xlsx`, `.csv`, `.txt`, `.pdf`, and `.json`.

> **Important**
>
> Set [`aspnet:MaxJsonDeserializerMembers`](https://msdn.microsoft.com/en-us/library/hh975440%28v=vs.120%29.aspx?f=255&MSPPError=-2147217396) to a higher value than the default one in the `web.config`.

###### Example

```tab-cs
[HttpPost]
public ActionResult Save(Telerik.Web.Spreadsheet.Workbook workbook)
{
    workbook.Save("path/to/document.xlsx");
    return new EmptyResult();
}
```
```tab-cshtml
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
```tab-web.config
<configuration>
  <appSettings>
    <add key="aspnet:MaxJsonDeserializerMembers" value="150000" />
  </appSettings>
</configuration>
```

### Convert TDP Document to Workbook

Telerik Document Processing provides a full-blown model for a Spreadsheet document. Convert it to `Telerik.Web.Spreadsheet.Workbook` if you want to display the result in the Kendo UI Spreadsheet widget.

###### Example

```tab-cs
    var document = new Telerik.Windows.Documents.Spreadsheet.Model.Workbook();
    var worksheet = document.Worksheets.Add();
    worksheet.Cells[0, 0].SetValue("1.23");

    return Telerik.Web.Spreadsheet.Workbook.FromDocument(document);
```

### Convert Workbook to TDP Document

Conversely, you can start with a Kendo UI Spreadsheet model (`Telerik.Web.Spreadsheet.Workbook`) and convert it to a TDP document. Then, it can be further processed, converted, and stored as needed.

###### Example

```tab-cs
[HttpPost]
public ActionResult Process(Telerik.Web.Spreadsheet.Workbook workbook)
{
    var document = workbook.ToDocument();

    //Continue with the TDP API as usual.
    var worksheet = document.ActiveWorksheet;
    var A1Cell = new CellIndex(0, 0);
    var B2Cell = new CellIndex(1, 1);

    worksheet.Cells[A1Cell, B2Cell].Merge();

    return new EmptyResult();
}
```

## See Also

* [Load and Save Data as JSON](http://docs.telerik.com/kendo-ui/controls/data-management/spreadsheet/import-and-export-data/json)
* [Export to Excel](http://docs.telerik.com/kendo-ui/controls/data-management/spreadsheet/import-and-export-data/export-to-excel)
* [Overview of the Kendo UI Spreadsheet Widget](http://docs.telerik.com/kendo-ui/controls/data-management/spreadsheet/overview)
* [Overview of the Spreadsheet HtmlHelper]({% slug overview_spreadsheethelper_aspnetmvc %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
* [Spreadsheet HtmlHelper Troubleshooting]({% slug troubleshoot_spreadsheethelper_aspnetmvc %})
