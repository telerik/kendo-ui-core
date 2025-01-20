---
title: Window Configuration
page_title: jQuery ChartWizard Documentation - Window Configuration
description: "Get started with the jQuery ChartWizard by Kendo UI and learn more about the supported Window settings."
slug: window_kendoui_chartwizard
position: 5
---

# Window Configuration

To configure the Chart Wizard Window utilize the [window](/api/javascript/ui/chartwizard/configuration/window) object and set the options provided by the nested [Window](/api/javascript/ui/window/) component.

The following example demonstrates how to customize the ChartWizard window.


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
        window: {
          height: 600,
          width: 500,
          modal: false,
          title: 'My custom window title,
          draggable: false
        }
    });
```


## See Also

* [Window Configuration of the ChartWizard (Demo)](https://demos.telerik.com/kendo-ui/chartwizard/window-configuration)
* [Using the API of the ChartWizard (Demo)](https://demos.telerik.com/kendo-ui/chartwizard/api)
* [JavaScript API Reference of the ChartWizard](/api/javascript/ui/chartwizard)
* [JavaScript API Reference of the Window](/api/javascript/ui/window)
