---
title: Getting Started
page_title: jQuery ChartWizard Documentation - Getting Started with the ChartWizard
description: "Get started with the jQuery ChartWizard by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_chartwizard_component
position: 2
---

# Getting Started with the ChartWizard

This guide demonstrates how to get up and running with the Kendo UI for jQuery ChartWizard.

After the completion of this guide, you will achieve the following end result:

```dojo
    <div id="chartwizard"></div>
    <script>
        $(document).ready(function(){
            $("#chartwizard").kendoChartWizard({
                exportOptions: {
                  fileName: "report",
                  pdf: {
                      paperSize: "A4",
                  },
                  image: {
                      width: 1900,
                      height: 1200,
                  },
                },
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
                    modal: false,
                    width: 700,
                    height: 500
                }
            });
        })        
    </script>
```

## 1. Create a div Element

First, create a `<div>` element with two or more `<div>` children.

```html
    <div id="chartwizard"></div>
```

## 2. Initialize the ChartWizard

In this step, you'll initialize the ChartWizard component from the parent `<div>` element.

```javascript
    $("#chartwizard").kendoChartWizard({
    });
```

## 3. Bind the ChartWizard Component to Its Data

The array containing the [`data`](/api/javascript/ui/chartwizard/configuration/datasource) consists of single or multiple arrays of Objects, which have the `field` and `value` properties.

```javascript
    $("#chartwizard").kendoChartWizard({            
        data: [
            { field: 'Product Name', value: 'Calzone' },
            { field: 'Quantity', value: 1 },
            { field: 'Price', value: 12.39 },
            { field: 'Tax', value: 2.48 },
            { field: 'Total', value: 14.87 }
        ]
    });
```

## 4. Configure the Export Options

The ChartWizard component allows you to export the displayed chart in `PDF`, `JPG`, or `PNG` files.  
You can configure the paper size as well as the size of the exported image. 

```javascript
        $("#chartwizard").kendoChartWizard({
            exportOptions: {
              fileName: "report",
              pdf: {
                  paperSize: "A4",
              },
              image: {
                  width: 1900,
                  height: 1200,
              },
            },
            data: [
                { field: 'Product Name', value: 'Calzone' },
                { field: 'Quantity', value: 1 },
                { field: 'Price', value: 12.39 },
                { field: 'Tax', value: 2.48 },
                { field: 'Total', value: 14.87 }
            ]
        });
```

## 5. Configure the Window Options

You can use the configuration options of the nested [Window](/api/javascript/ui/window) component to customize the appearance of the ChartWizard window.

```javascript
        $("#chartwizard").kendoChartWizard({
                exportOptions: {
                  fileName: "report",
                  pdf: {
                      paperSize: "A4",
                  },
                  image: {
                      width: 1900,
                      height: 1200,
                  },
                },
                data: [
                    { field: 'Product Name', value: 'Calzone' },
                    { field: 'Quantity', value: 1 },
                    { field: 'Price', value: 12.39 },
                    { field: 'Tax', value: 2.48 },
                    { field: 'Total', value: 14.87 }
                ],
                window: {
                    modal: false,
                    width: 700,
                    height: 500
                }
        });
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery ChartWizard](https://demos.telerik.com/kendo-ui/chartwizard/index)

## See Also

* [JavaScript API Reference of the jQuery ChartWizard](/api/javascript/ui/chartwizard)
* [Knowledge Base Section](/knowledge-base)


