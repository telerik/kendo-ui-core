---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Barcode component for {{ site.framework }}"
previous_url: /helpers/barcodes/barcode/overview
slug: overview_barcodehelper_aspnetcore
position: 1
---

# {{ site.framework }} Barcode Overview

{% if site.core %}
The Barcode TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Barcode widget. To add the component to your ASP.NET Core app, you can use either.
{% else %}
The Telerik UI Barcode HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Barcode widget.
{% endif %}

The Barcode represents data in a machine-readable format.

{% if site.has_cta_panels == true %}
{% include cta-panel-introduction.html %}
{% endif %}

To see the component in action, check the examples:

* [Demo page for the Barcode HtmlHelper](https://demos.telerik.com/{{ site.platform }}/barcode/index)
{% if site.core %}
* [Demo page for the Barcode TagHelper](https://demos.telerik.com/{{ site.platform }}/barcode/tag-helper)
{% endif %}

## Initializing the Barcode

The following example demonstrates how to define the Barcode.

```HtmlHelper
    @(Html.Kendo().Barcode()
      .Name("barcode")
```
{% if site.core %}
```TagHelper
    <kendo-barcode name="barcode"></kendo-barcode>
```
{% endif %}

### Basic Configuration

To configure the Barcode, pass the configuration options as attributes:

* The name of the Barcode is mandatory. It specifies the "id" attribute of the widget.

* You can select the appropriate encoding (symbology) from the [available options](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/barcode/configuration/type). Specify it by passing an `enum` value to the encoding method.

```HtmlHelper
    @(Html.Kendo().Barcode()
    .Name("barcode")
    .Value("10110110")
    .Encoding(BarcodeSymbology.Code128)
    .Width(200)
    .Height(100)
    .Border(border => border.Color("red").Width(2)))
)
```
{% if site.core %}
```TagHelper
    <kendo-barcode name="barcode" value="10110110" type="BarcodeSymbology.Code128" width="200" height="100">
        <border color="red" width="2"/>
    </kendo-barcode>
```
{% endif %}

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

* [Basic Usage of the Barcode component for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/barcode/index)
* [Using the API of the Barcode component for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/barcode/api)
* [Server-Side API](/api/barcode)
