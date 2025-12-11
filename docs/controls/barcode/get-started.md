---
title: Getting Started
page_title: jQuery Barcode Documentation - Getting Started with the Barcode
description: "Get started with the jQuery Barcode by Kendo UI and learn how to create, initialize, and enable the component."
components: ["barcode"]
slug: getting_started_kendoui_barcode_widget
position: 2
---

# Getting Started with the Barcode

This guide demonstrates how to get up and running with the Kendo UI for jQuery Barcode.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
   <div id="barcode"></div>
   <script>
      $("#barcode").kendoBarcode({
        value:"12345ABCD",
        type: "code128",
        color: '#6F21A5',
        background: '#F1E2FC'
      });
   </script>
```

## 1. Create a Div Element

First, create a `<div>` element on the page that will be used to initialize the Barcode component.

```html
   <div id="barcode"></div>
```

## 2. Initialize the Barcode

In this step, you will initialize the Barcode from the `<div>` element. All settings of the Barcode will be provided in the script statement and you have to describe its configuration in JavaScript.

```html
   <div id="barcode"></div>

   <script>
       $("#barcode").kendoBarcode(); 
    </script>
```

## 3. Set the Value of the Barcode

You can configure the initial value of the component by using the [`value`](/api/javascript/dataviz/ui/barcode/configuration/value) option.

```html
   <div id="barcode"></div>

   <script>
       $("#barcode").kendoBarcode({
         value:"12345ABCD"
       }); 
    </script>
```

## 4. Set the Encoding Type

The Barcode provides an option to set the symbology the component will use. Use the [`type`](/api/javascript/dataviz/ui/barcode/configuration/type) configuration option to set the encoding.

```html
   <div id="barcode"></div>
   <script>
      $("#barcode").kendoBarcode({
        value:"12345ABCD",
        type: "code128",
        color: '#6F21A5',
        background: '#F1E2FC'
      });
   </script>
```

## 5. Change the Barcode Colors

You can customize the Barcode appearance by setting the [`color`](/api/javascript/dataviz/ui/barcode/configuration/color) and [`background`](/api/javascript/dataviz/ui/barcode/configuration/background) color option.

```html
   <div id="barcode"></div>
   <script>
      $("#barcode").kendoBarcode({
        value:"12345ABCD",
        type: "code128",
        color: '#6F21A5',
        background: '#F1E2FC'
      });
   </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Barcode](https://demos.telerik.com/kendo-ui/barcode/index)

## See Also

* [JavaScript API Reference of the jQuery Barcode](/api/javascript/dataviz/ui/barcode)
* [Knowledge Base Section](/knowledge-base)


