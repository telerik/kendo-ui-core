---
title: Images
page_title: Spreadsheet | Telerik UI for ASP.NET Core HtmlHelpers
description: "Place an image in a Kendo UI Spreadsheet HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_spreadsheet_images_aspnetcore
position: 5
---

# Images

The Spreadsheet offers support for images to be placed on its sheets.

There are three options that would allow you to load an image on a sheet:

* Use the Insert Image tool available on the Spreadsheet toolbar.

* Use the initial configuration of the Spreadsheet to load and point to the widget.

* Use the `sheet.addImage()` API method.

## Use the Insert Image Tool

You can upload and insert a custom image in the Spreadsheet with the `Insert Image` tool:

**Figure 1: The Insert Image Tool**

![Spreadsheet Insert Image tool](images/spreadsheet-insert-image-tool.png)

Then, in the pop-up window, you can select or drag-in a file from the file system:

**Figure 2: The Insert Image Tool**

![Spreadsheet Insert Image pop-up](images/spreadsheet-insert-image-pop-up.png)

## Configure the Spreadsheet to Display an Image Initially

1. To properly configure the Spreadsheet to display an image on one its sheets, add a definition for the image to the Spreadsheet [`images`](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet/configuration/images) field. In the `images` object each image should be specified with unique key (property name) holding as value the image URL. The image URLs can be either [data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs), in which case the images are fully contained in the definition, or can be external URLs.

1. Then you should reference that image and place it accordingly using the [`drawings`](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet/configuration/sheets.drawings) array of the respective sheet. 

The drawing definition should contain:

* A pointer to the cell that will hold the top-left corner of the image: `TopLeftCell`.

* X and Y offset of the top-left corner: `OffsetX` and  `OffsetY`.

* Dimensions of the rendered image: `Width` and `Height`.

* A pointer to the image key that is used in the `Images` configuration of the Spreadsheet: `Image`.

The example below demonstrates how to configure the Spreadsheet to display an image with top-left corner placed in the `J6` cell:

###### Example

```
    @(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .Images(new { testImage = "/images/image1.png" })
        .Sheets(sheets =>
        {
            sheets.Add()
                .Name("Sheet1")
                .Drawings(dr =>
                {
                    dr.Add()
                    .TopLeftCell("J6")
                    .OffsetX(30)
                    .OffsetY(10)
                    .Width(50)
                    .Height(50)
                    .Image("testImage");

                })
                .Columns(columns =>
                {
                    columns.Add().Width(115);
                })
                .Rows(rows =>
                {
                    rows.Add().Height(25).Cells(cells =>
                    {
                            cells.Add()
                            .Value("ID")
                            .TextAlign(SpreadsheetTextAlign.Center);
                    });
                });
        })
    )
```

##  Use the addImage() Method

The Spreadsheet Sheet API exposes a method that would allow you to programmatically add an image to the Spreadsheet and place in on a Sheet. To do that, a new `kendo.spreadsheet.Drawing` object should be created first. The configuration of the `Drawing` object is the same as the one described in the example from the previous section. Then, the `Drawing` should be passed to the [`sheet.addDrawing()`](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/sheet/methods/adddrawing):

###### Example

```
    @(Html.Kendo().Spreadsheet()
       .Name("spreadsheet")
       .Sheets(sheets =>
       {
           sheets.Add()
               .Name("Sheet1")
               .Columns(columns =>
               {
                   columns.Add().Width(115);
               })
               .Rows(rows =>
               {
                   rows.Add().Height(25).Cells(cells =>
                   {
                           cells.Add()
                           .Value("ID")
                           .TextAlign(SpreadsheetTextAlign.Center);
                   });
               });
       })
    )

    <script>
        $(document).ready(function () {
            var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

            var sheet = spreadsheet.activeSheet();

            var drawing = kendo.spreadsheet.Drawing.fromJSON({
                topLeftCell: "J6",
                offsetX: 30,
                offsetY: 10,
                width: 50,
                height: 50,
                image: spreadsheet.addImage("/images/chrome.gif")
            });

            sheet.addDrawing(drawing);
        })
    </script>
```

> **Important**
>  Note the following, while using the Spreadsheet exporting functionality in combination with images:
> * Images are supported only for client-side Import/Export functionality. When engaging server Import/Export, no images will be loaded/exported.
> * In order to properly export any image to PDF using the default Spreadsheet functionality, at least one cell with data should be present on the sheet containing that image.

## See Also

* [Overview of the Spreadsheet HtmlHelper]({% slug htmlhelpers_spreadsheet_aspnetcore %})
* [JavaScript API Reference of the Spreadsheet](http://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
* [Spreadsheet Official Demos](http://demos.telerik.com/aspnet-core/spreadsheet/index)
