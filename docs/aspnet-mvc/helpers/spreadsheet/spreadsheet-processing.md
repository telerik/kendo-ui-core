---
title: Spreadsheet Processing
page_title: Spreadsheet Processing | Kendo UI Spreadsheet Widget
description: "Learn how to process Kendo UI Spreadsheet data using the Telerik Document Processing library."
slug: spreadsheet_processing_spreadsheet_mvc
---

## Overview

Kendo UI ships a .NET based server-side module established on [Telerik RadSpreadProcessing](http://docs.telerik.com/devtools/wpf/controls/radspreadprocessing/overview),
part of the Document Processing Library.

It allows importing, exporting, and processing data from various formats:

* Excel Microsoft Office Open XML Spreadsheet (.xlsx)
* Comma separated values (.csv)
* Tab separated values (.txt)
* Portable document format (.pdf) (export only)

## Adding Dependencies

The .NET server-side module is distributed as a part of the [UI for ASP.NET MVC bundle](/aspnet-mvc/introduction).

In the ZIP bundle you will find a `spreadsheet` folder that contains assemblies for both .NET 4.0 and .NET 4.5.
You need to include a reference to the `Telerik.Web.Spreadsheet.dll` assembly for the respective framework version.

The main entry point for the project is the `Telerik.Web.Spreadsheet.Workbook` class.
This is a `POCO` object that mirrors the object structure of the JSON and provides format conversion methods. Under the hood, it uses the Telerik DPL to perform the actual conversion.

## Supported Scenarios

The following section contains typical usage scenarios, as they would appear in an ASP.NET MVC application.

> **Important**  
> There is no strict dependency on the type of server framework used. Popular choices like MVC, WebAPI and WebForms work equally well.

### Load Data from an External File

Here we'll load a file from the file system and convert it to a Workbook for serialization. The supported file extensions are .xlsx, .csv, .txt, and .json.

```cs
public class HomeController : Controller
{
    public ActionResult Read()
    {
        var path = Server.MapPath("~/App_Data/path/to/document.xlsx");
        var workbook = Telerik.Web.Spreadsheet.Workbook.Load(path);

        // Uses Newtonsoft.Json internally to serialize fields correctly
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

### Save a Workbook to an External File

Here we'll post a Workbook to a controller and save it as a local file. The supported file extensions are .xlsx, .csv, .txt, .pdf, and .json.

> Note that you need to set [aspnet:MaxJsonDeserializerMembers](https://msdn.microsoft.com/en-us/library/hh975440%28v=vs.120%29.aspx?f=255&MSPPError=-2147217396)
  in web.config to a higher value than the default.


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

### Convert a DPL Document to a Workbook

The Telerik Document Processing Library provides a full-blown model for a spreadsheet document.
Convert it to Telerik.Web.Spreadsheet.Workbook if you want to display the result in the Kendo UI Spreadsheet widget.

```cs
    var document = new Telerik.Windows.Documents.Spreadsheet.Model.Workbook();
    var worksheet = document.Worksheets.Add();
    worksheet.Cells[0, 0].SetValue("1.23");

    return Telerik.Web.Spreadsheet.Workbook.FromDocument(document);
```

### Convert a Workbook to a DPL Document

Conversely, you can start with a Kendo UI Spreadsheet model (Telerik.Web.Spreadsheet.Workbook) and convert it to a DPL Document.
Then, it can be further processed, converted, and stored as needed.

```cs
[HttpPost]
public ActionResult Process(Telerik.Web.Spreadsheet.Workbook workbook)
{
    var document = workbook.ToDocument();

    // Continue with the DPL API as usual...
    var worksheet = document.ActiveWorksheet;
    var A1Cell = new CellIndex(0, 0);
    var B2Cell = new CellIndex(1, 1);

    worksheet.Cells[A1Cell, B2Cell].Merge();

    return new EmptyResult();
}
```

## Troubleshooting

### Processing fails for files with small amount of data
The conversion and processing can hang or fail even if the spreadsheet file does not contain a lot of data.

Even cells that appear empty will be processed if they have non-default styling.

** Solution **

Reset all cells outside the used range to the default borders, formatting and colors.

## Further Reading

The full documentation of the [RadSpreadProcessing module](http://docs.telerik.com/devtools/wpf/controls/radspreadprocessing/overview) is available as a part of the [UI for WPF](http://docs.telerik.com/devtools/wpf/introduction).

## See Also

Other articles on Kendo UI Spreadsheet:

* [Load and Save Data as JSON]({% slug loadand_saveas_json_spreadsheet_widget %})
* [Export to Excel]({% slug export_toexcel_spreadsheet_widget %})
