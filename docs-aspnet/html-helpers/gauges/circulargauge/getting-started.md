---
title: Getting Started 
page_title: Getting Started
description: "Make your first steps with the Telerik UI for {{ site.framework }} Circular Gauge component by following a complete step-by-step tutorial."
slug: circulargauge_getting_started
position: 1
---

# Getting Started with the Circular Gauge

This tutorial explains how to set up a basic Telerik UI for {{ site.framework }}  Circular Gauge and highlights the major steps in the configuration of the component.

You will initialize a Circular Gauge and configure its `Scale`, which is responsible for the visualization of the gauge. Then, you will handle the basic JavaScript `keydown` event to acknowledge when the user presses the `Up` or `Down` arrow keys and update the value of the Circular Gauge using its client-side reference.  {% if site.core %}Finally, you can run the sample code in [Telerik REPL](https://netcorerepl.telerik.com/) and continue exploring the components.{% endif %}

 ![Sample Telerik UI for {{ site.framework }}  Circular Gauge](./images/circulargauge-getting-started.png)

@[template](/_contentTemplates/core/getting-started-prerequisites.md#repl-component-gs-prerequisites)

## 1. Prepare the CSHTML File
@[template](/_contentTemplates/core/getting-started-directives.md#gs-adding-directives)

Optionally, you can structure the document by adding the desired HTML elements like headings, divs, and paragraphs. In this tutorial, you will also apply some styles to the gauge and its container.

```html
    <style>
        #gauge-container {
            width: 386px;
            height: 386px;
            text-align: center;
            margin: 20px auto 30px auto;
        }

        #gauge {
            width: 350px;
            height: 300px;
            margin: 0 auto;
        }
    </style>
    <div id="example">
        
        <div id="gauge-container">
            <p>Modify the Temperature with the Up and Down Arrows of the Keyboard</p>
            <!-- Component Configuration -->
        </div>
    </div>
```

## 2. Initialize the Circular Gauge

Use the Circular Gauge HtmlHelper {% if site.core %}or TagHelper{% endif %} to add the component to a page:

* The `Name()` configuration method is mandatory as its value is used for the `id` and the `name` attributes of the Circular Gauge element.
* Configure the text in the center of the gauge with the `CenterTemplate` property.
* Set the color of the value pointer with the `Color` configuration method.
* Utilize the `Value` method to set an initial value for the Circular Gauge.

```HtmlHelper
    @using Kendo.Mvc.UI

    @(Html.Kendo().CircularGauge()
        .Name("gauge")
        .Value(55)
        .Color("#1274AC")
        .CenterTemplate("Temperature")
    )
```
{% if site.core %}
```TagHelper
    @using Kendo.Mvc.UI
    @addTagHelper *, Kendo.Mvc

    <kendo-circulargauge name="gauge" value="55" center-template="Temperature" color="#1274AC">
    </kendo-circulargauge>
```
{% endif %}

## 3. Configure the Circular Gauge

Configure the [Scale](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/circulargaugebuilder#scalesystemaction) configuration method of the Circular Gauge. It exposes the [CircularGaugeSettingsBuilder](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/circulargaugescalesettingsbuilder) which allows you to then set up the `Min`, `Max`, `MajorTicks`, `MinorTicks`, `Labels` and `Reverse` properties.

```HtmlHelper
    @using Kendo.Mvc.UI

    @(Html.Kendo().CircularGauge()
        .Name("gauge")
        .Value(55)
        .Scale(x =>
           x.Min(0)
            .Max(140)
            .MajorTicks(M=>M.Visible(true))
            .MinorTicks(m => m.Visible(true))
            .Labels(l => l.Visible(true))
        )
        .Color("#1274AC")
        .CenterTemplate("Temperature")
    )
```
{% if site.core %}
```TagHelper
    @using Kendo.Mvc.UI
    @addTagHelper *, Kendo.Mvc

    <kendo-circulargauge name="gauge" value="55" center-template="Temperature" color="#1274AC">
        <scale min="0" max="140">
            <major-ticks visible="true"/>
            <minor-ticks visible="true"/>
            <labels visible="true"/>
        </scale>
    </kendo-circulargauge>
```
{% endif %}


## 4. (Optional) Reference Existing Circular Gauge Instances

You can reference the Circular Gauge instances that you have created and build on top of their existing configuration:

1. Use the `id` attribute of the component instance to establish a reference.

    ```JavaScript
        $(document).ready( function (e) {
            var circulargaugeReference = $("#gauge").data("kendoCircularGauge"); // circulargaugeReference is a reference to the existing Circular Gauge instance of the helper.
        });
    ```

1. Use the [Circular Gauge client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/circulargauge#methods) to control the behavior of the component. In this example, you will use the [`value`](https://docs.telerik.com/kendo-ui/api/javascript/ui/circulargauge/methods/value) method to change the value of the Circular Gauge when the user presses the ArrowUp or ArrowDown keyboard buttons.

    ```JavaScript
        $("body").on("keydown",function(e){
            if(e.key=="ArrowUp"){
                updateValue(1);
            }else if(e.key=="ArrowDown"){
                updateValue(-1);
            }
        })   
        
        function updateValue(number) {
            var gauge = $("#gauge").data("kendoCircularGauge");
            gauge.value(gauge.value()+number);
        }
    ```

{% if site.core %}
## Explore this Tutorial in REPL

You can continue experimenting with the code sample above by running it in the Telerik REPL server playground:

* [Sample code with the Circular Gauge HtmlHelper](https://netcorerepl.telerik.com/mHOsOmlJ43UV35SA53)
* [Sample code with the Circular Gauge TagHelper](https://netcorerepl.telerik.com/GdkWOmbJ43QAvWvk39)

{% endif %}

## Next Steps

* [Explore the Scale Options of the Circular Gauge]({% slug scale_circulargaugehelper_aspnetcore %})
* [Customize the Color of the Circular Gauge]({% slug colors_circulargaugehelper_aspnetcore %})

## See Also

* [Using the API of the Circular Gauge for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/circulargauge/api)
* [Client-Side API of the Circular Gauge](https://docs.telerik.com/kendo-ui/api/javascript/ui/circulargauge)
* [Server-Side API of the Circular Gauge](/api/circulargauge)
* [Knowledge Base Section](/knowledge-base)
