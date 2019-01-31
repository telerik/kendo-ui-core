---
title: Overview
page_title: Barcode | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI Barcode HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_barcodehelper_aspnetcore
position: 1
---

# Barcode HtmlHelper Overview

The Barcode HtmlHelper extension is a server-side wrapper for the [Kendo UI Barcode](https://demos.telerik.com/kendo-ui/barcode/index) widget.

## Configuration

1. Add a Barcode.

    ###### Example

    ```
        @(Html.Kendo().Barcode()
          .Name("barcode") // The name of the Barcode is mandatory. It specifies the "id" attribute of the widget.
          .Value("2346722") // Set the value of the Barcode.
          .Width(200)
          .Height(100))
    ```

1. Choose the appropriate symbology (encoding) from the [available options](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/barcode/configuration/type). Specify it through the encoding method which accepts an `enum` value.

    ###### Example

    ```
      @(Html.Kendo().Barcode()
        .Name("mascarpone")
        .Value("Mascarpone")
        .Encoding(BarcodeSymbology.Code128)
        .Width(200)
        .Height(100))
    ```

## Reference

### Existing Instances

To reference an existing Kendo UI Barcode instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Barcode API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/barcode#methods) to control its behavior.

###### Example

      //Put this after your Kendo UI Barcode for ASP.NET Core declaration.
      <script>
      $(function() {
          //Notice that the Name() of the Barcode is used to get its client-side instance.
          var barcode = $("#barcode").data("kendoBarcode");
          barcode.value("foo") //make sure you supply valid value for that encoding then the barcode will redraw automatically
      });
      </script>

## See Also

* [Overview of the Kendo UI Barcode Widget](https://docs.telerik.com/kendo-ui/controls/barcodes/barcode/overview)
* [Telerik UI for ASP.NET Core Demos](https://demos.telerik.com/aspnet-core/barcode/index)
