---
title: Overview
page_title: Overview - CircularGauge PHP Class
description: "Get started with the CircularGauge PHP class in Kendo UI."
slug: overview_circulargauge_uiforphp
position: 1
---

# CircularGauge PHP Class Overview

The Kendo UI CircularGauge for PHP is a server-side wrapper for the [Kendo UI CircularGauge](/api/javascript/dataviz/ui/circulargauge) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI CircularGauge for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP](https://docs.telerik.com/kendo-ui/php/introduction)&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [CircularGauge](/api/javascript/dataviz/ui/circulargauge).




    $gauge = new \Kendo\Dataviz\UI\CircularGauge('gauge');
    $gauge->value(55)
      ->centerTemplate('Temperature')
      ->scale(array(
          'min' => 0,
          'max' => 140,
          'majorTicks' => array(
            'visible' => true
          ),
          'minorTicks' => array(
            'visible' => true
          ),
          'labels' => array(
            'visible' => true
          )
        ));

**Step 3** Output the CircularGauge by echoing the result of the `render` method.



        echo $gauge->render();

## Reference

### Client-Side Instances

You are able to reference an existing CircularGauge instance via the [`jQuery.data()`](https://api.jquery.com/jQuery.data/). Once a reference is established, use the [CircularGauge API](/api/javascript/dataviz/ui/circulargauge#methods) to control its behavior.



        // Put this after your Kendo CircularGauge for PHP render() call
        <script>
        $(function() {
        // Notice that the Name() of the circularGauge is used to get its client-side instance
            var gauge = $("#circularGauge").data("kendoCircularGauge");
            gauge.value(20);
        });
        </script>

## See Also

* [Overview of the Kendo UI CircularGauge Widget](https://docs.telerik.com/kendo-ui/php/widgets/circulargauge/overview)
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/CircularGauge)
