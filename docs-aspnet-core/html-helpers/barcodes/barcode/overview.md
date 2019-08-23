---
title: Overview
page_title: Barcode Overview | Telerik UI for ASP.NET Core HTML Helpers
description: "Learn the basics when working with the Telerik UI Barcode HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_barcodehelper_aspnetcore
position: 1
---

# Barcode HtmlHelper Overview

The Telerik UI Barcode HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Barcode widget.

The Barcode is used to represent data in a machine-readable format.

* [Demo page for the Barcode](https://demos.telerik.com/aspnet-core/barcode/index)

## Initializing the Barcode

1. Add the Barcode.

    ```
        @(Html.Kendo().Barcode()
          .Name("barcode") // The name of the Barcode is mandatory. It specifies the "id" attribute of the widget.
          .Value("2346722") // Set the value of the Barcode.
          .Width(200)
          .Height(100))
    ```

1. Select the appropriate encoding (symbology) from the [available options](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/barcode/configuration/type). Specify it through the encoding method which accepts an `enum` value.

    ```
      @(Html.Kendo().Barcode()
        .Name("mascarpone")
        .Value("Mascarpone")
        .Encoding(BarcodeSymbology.Code128)
        .Width(200)
        .Height(100))
    ```

## Referencing Existing Instances

To reference an existing Barcode instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Barcode API](/api/barcode) to control its behavior.

      // Place the following after the declaration of the Barcode for ASP.NET Core.
      <script>
      $(function() {
          // The Name() of the Barcode is used to get its client-side instance.
          var barcode = $("#barcode").data("kendoBarcode");
          barcode.value("foo") // Supply a valid value for that encoding. Then, the Barcode will redraw automatically.
      });
      </script>

## See Also

* [Basic Usage of the Barcode HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/barcode/index)
* [Using the API of the Barcode HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/barcode/api)
* [Server-Side API](/api/barcode)
