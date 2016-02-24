---
title: Overview
page_title: Overview | RadialGauge PHP Class
description: "Get started with the RadialGauge PHP class in Kendo UI."
slug: overview_radialgauge_uiforphp
position: 1
---

# RadialGauge PHP Class Overview

The Kendo UI RadialGauge for PHP is a server-side wrapper for the [Kendo UI RadialGauge](/api/javascript/dataviz/ui/radialgauge) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI RadialGauge for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Add a [RadialGauge](/api/php/Kendo/Dataviz/UI/RadialGauge).

###### Example

        $gauge = new \Kendo\Dataviz\UI\RadialGauge('gauge');
        $gauge->pointer(array('value' => 10))
              ->scale(array('min' => 0, 'max' => 100));

**Step 3** Output the RadialGauge by echoing the result of the `render` method.

###### Example

        echo $gauge->render();

## Reference

### Client-Side Instances

You are able to reference an existing RadialGauge instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [RadialGauge API](/api/javascript/dataviz/ui/radialgauge#methods) to control its behavior.

###### Example

        // Put this after your Kendo RadialGauge for PHP render() call
        <script>
        $(function() {
            // Notice that the Name() of the radialGauge is used to get its client-side instance
            var gauge = $("#radialGauge").data("kendoRadialGauge");
            gauge.value(20);
        });
        </script>

## See Also

Other articles on Telerik UI for PHP and on the RadialGauge:

* [Overview of the Kendo UI RadialGauge Widget]({% slug overview_kendoui_radialgaugewidget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
