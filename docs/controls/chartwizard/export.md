---
title: Export Options
page_title: jQuery ChartWizard Documentation - Export Options
description: "Get started with the jQuery ChartWizard by Kendo UI and learn more about how you can export the chart to different formats."
components: ["chartwizard"]
slug: export_kendoui_chartwizard
position: 4
---

# Export Options

To export the charts of the ChartWizard component to PDF, PNG, or SVG formats, set the desired properties in the [`exportOptions`](/api/javascript/ui/chartwizard/configuration/exportoptions) object.

You can configure the parameters of the exported image by setting the image property to an [`exportOptions.image`](/api/javascript/ui/chartwizard/configuration/exportoptions.image) object and the exported PDF file by utilizing the [`exportOptions.pdf`](/api/javascript/ui/chartwizard/configuration/exportoptions.pdf) object.

The following example demonstrates how to customize the export options of the component.


```dojo
    <div id="chartwizard"></div>
    $("#chartwizard").kendoChartWizard({            
        dataSource: [
           [
               { field: 'Product Name', value: 'Calzone' },
               { field: 'Quantity', value: 1 },
               { field: 'Price', value: 12.39 },
               { field: 'Tax', value: 2.48 },
               { field: 'Total', value: 14.87 }
           ]
        ],
        exportOptions: {
          fileName: "report",
          pdf: {
              paperSize: "A4",
          },
          image: {
              width: 1900,
              height: 1200,
          },
        }
    });
```


## See Also

* [Export Options of the ChartWizard (Demo)](https://demos.telerik.com/kendo-ui/chartwizard/export-options)
* [Using the API of the ChartWizard (Demo)](https://demos.telerik.com/kendo-ui/chartwizard/api)
* [JavaScript API Reference of the ChartWizard](/api/javascript/ui/chartwizard)
