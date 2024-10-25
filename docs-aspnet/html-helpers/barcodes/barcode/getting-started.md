---
title: Getting Started
page_title: Getting Started
description: "Make your first steps with the Telerik UI for {{ site.framework }} Barcode components by following a complete step-by-step tutorial."
slug: barcode_getting_started
position: 1
---

# Getting Started with the Barcode

This tutorial explains how to set up a basic Telerik UI for {{ site.framework }} Barcode and highlights the major steps in the configuration of the component.

You will initialize a Barcode control and configure the encoding `type`, `value` and `appearance`. {% if site.core %}Finally, you can run the sample code in [Telerik REPL](https://netcorerepl.telerik.com/) and continue exploring the components.{% endif %}

 ![Sample Telerik UI for {{ site.framework }} Barcode](./images/barcode-getting-started.png)

@[template](/_contentTemplates/core/getting-started-prerequisites.md#repl-component-gs-prerequisites)

## 1. Prepare the CSHTML File

@[template](/_contentTemplates/core/getting-started-directives.md#gs-adding-directives)

Optionally, you can structure the document by adding the desired HTML elements like headings, divs, paragraphs, and apply some basic styles.

## 2. Initialize the Barcode

Use the Barcode HtmlHelper {% if site.core %}or TagHelper{% endif %} to add the component to a page:

* The `Name()` configuration method is mandatory as its value is used for the `id` and the `name` attributes of the Barcode element.

* The `Value()` configuration method sets the value of the Component.

* The `Encoding()` configuration property determines the symbology used by the Component.

```HtmlHelper
@using Kendo.Mvc.UI

@(Html.Kendo().Barcode()
    .Name("barcode")
    .Value("10110110")
    .Encoding(BarcodeSymbology.Code128)
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-barcode name="barcode" value="10110110" type="BarcodeSymbology.Code128">
</kendo-barcode>

```
{% endif %}

## 3. Configure the Appearance of the Barcode

The configuration methods `Width`, `Height`, `Color`, `Border`, etc. allow you to control the appearance of the Barcode Component.

```HtmlHelper
@using Kendo.Mvc.UI

@(Html.Kendo().Barcode()
    .Name("barcode")
    .Value("10110110")
    .Encoding(BarcodeSymbology.Code128)
    .Width(480)
    .Height(100)
    .Border(border => border.Color("red").Width(1))
)

```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-barcode name="barcode" value="10110110" width="480" height="100" type="BarcodeSymbology.Code128">
    <border color="red" width="1"/>
</kendo-barcode>

```
{% endif %}


## 4. (Optional) Reference Existing Barcode Instances

To use the [client-side API of the Barcode](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/barcode) and build on top of its initial configuration, you need a reference to the Barcode instance. Once you get a valid reference, you can call the respective API methods:

1. Use the `.Name()` (`id` attribute) of the component instance to get a reference.

    ```script
        <script>
            var barcodeReference = $("#barcode").data("kendoBarcode"); // barcodeReference is a reference to the existing instance of the helper.
        </script>
    ```

1. Use the [client-side API of the Barcode](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/barcode) to control the behavior of the widget. In this example, you will use the [`redraw`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/barcode/methods/redraw) method to disable the Barcode.

    ```script
        <script>
            $(document).ready(function () {
                var barcode = $("#barcode").data("kendoBarcode");

                barcode.redraw();
            })
        </script>
    ```
For more examples, refer to the [Demo of the Barcode client API](https://demos.telerik.com/{{ site.platform }}/barcode/api).

{% if site.core %}

## Explore this Tutorial in REPL

You can continue experimenting with the code sample above by running it in the Telerik REPL server playground:

* [Sample code with the Barcode HtmlHelper](https://netcorerepl.telerik.com/mnvkHFvo02JdyL0303)

* [Sample code with the Barcode TagHelper](https://netcorerepl.telerik.com/QxFYRlFI19SIKgkO21)
{% endif %}

## Next Steps

* [Choosing the Right Barcode Encoding]({% slug encodings_aspnetcore_barcode_widget %})

## See Also

* [Client-Side API of the Barcode](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/barcode)
* [Server-Side API of the Barcode](/api/barcode)
* [Knowledge Base Section](/knowledge-base)
