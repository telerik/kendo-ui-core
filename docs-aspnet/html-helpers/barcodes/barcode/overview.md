---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Barcode HtmlHelper for {{ site.framework }}"
previous_url: /helpers/barcodes/barcode/overview
slug: overview_barcodehelper_aspnetcore
position: 1
---

# Barcode HtmlHelper Overview

The Telerik UI Barcode HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Barcode widget.

The Barcode represents data in a machine-readable format.

* [Demo page for the Barcode](https://demos.telerik.com/{{ site.platform }}/barcode/index)

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

## Functionality and Features  

The Barcode supports a set of [encoding types]({% slug encodings_aspnetcore_barcode_widget %}).

## Referencing Existing Instances

To reference an existing Barcode instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Barcode client-side API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/barcode#methods) to control its behavior.

      // Place the following after the declaration of the Barcode for {{ site.framework }}.
      <script>
      $(function() {
          // The Name() of the Barcode is used to get its client-side instance.
          var barcode = $("#barcode").data("kendoBarcode");
          barcode.value("foo") // Supply a valid value for that encoding. Then, the Barcode will redraw automatically.
      });
      </script>

## See Also

* [Basic Usage of the Barcode HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/barcode/index)
* [Using the API of the Barcode HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/barcode/api)
* [Server-Side API](/api/barcode)
