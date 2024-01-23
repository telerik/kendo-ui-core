---
title: Getting Started
page_title: jQuery QRCode Documentation - Getting Started with the QRCode
description: "Get started with the jQuery QRCode by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_qrcode_widget
position: 2
---

# Getting Started with the QRCode

This guide demonstrates how to get up and running with the Kendo UI for jQuery QRCode.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
   <div id="qrcode"></div>
   <script>
      $("#qrcode").kendoQRCode({
        value:"12345ABCD",
        errorCorrection: "H",
        color: '#6F21A5',
        background: '#F1E2FC'
      });
   </script>
```

## 1. Create a Div Element

First, create a `<div>` element on the page that will be used to initialize the QRCode component.

```html
   <div id="qrcode"></div>
```

## 2. Initialize the QRCode

In this step, you will initialize the QRCode from the `<div>` element. All settings of the QRCode will be provided in the script statement and you have to describe its configuration in JavaScript.

```html
   <div id="qrcode"></div>

   <script>
       $("#qrcode").kendoQRCode(); 
    </script>
```

## 3. Set the Value of the QRCode

You can configure the initial value of the component by using the [`value`](/api/javascript/dataviz/ui/qrcode/configuration/value) option.

```html
   <div id="qrcode"></div>

   <script>
       $("#qrcode").kendoQRCode({
         value:"12345ABCD"
       }); 
    </script>
```

## 4. Set the Error Correction

The QRCode provides you with an option to set [`error correction`](/api/javascript/dataviz/ui/qrcode/configuration/errorcorrection) level used to encode the value.

```html
   <div id="qrcode"></div>
   <script>
      $("#qrcode").kendoQRCode({
        value:"12345ABCD",
        errorCorrection: "H"
      });
   </script>
```

## 5. Change the QRCode Colors

You can customize the QRCode appearance by setting the [`color`](/api/javascript/dataviz/ui/qrcode/configuration/color) and [`background`](/api/javascript/dataviz/ui/qrcode/configuration/background) color option.

```html
   <div id="qrcode"></div>
   <script>
      $("#qrcode").kendoQRCode({
        value:"12345ABCD",
        errorCorrection: "H",
        color: '#6F21A5',
        background: '#F1E2FC'
      });
   </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the QRCode](https://demos.telerik.com/kendo-ui/qrcode/index)

## See Also

* [JavaScript API Reference of the jQuery QRCode](/api/javascript/dataviz/ui/qrcode)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
