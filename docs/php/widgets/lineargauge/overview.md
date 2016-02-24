---
title: Overview
page_title: Overview | LinearGauge PHP Class
description: "Get started with the LinearGauge PHP class in Kendo UI."
slug: overview_lineargauge_uiforphp
position: 1
---

# LinearGauge PHP Class Overview

The Kendo UI LinearGauge for PHP is a server-side wrapper for the [Kendo UI LinearGauge](/api/javascript/dataviz/ui/lineargauge) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI LinearGauge for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [LinearGauge](/api/javascript/dataviz/ui/lineargauge).

###### Example

        $gauge = new \Kendo\Dataviz\UI\LinearGauge('gauge');
        $gauge->pointer(array('value' => 10))
              ->scale(array('min' => 0, 'max' => 100));

**Step 3** Output the LinearGauge by echoing the result of the `render` method.

###### Example

        echo $gauge->render();

## Reference

### Client-Side Instances

You are able to reference an existing LinearGauge instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [LinearGauge API](/api/javascript/dataviz/ui/lineargauge#methods) to control its behavior.

###### Example

        // Put this after your Kendo LinearGauge for PHP render() call
        <script>
        $(function() {
        // Notice that the Name() of the linearGauge is used to get its client-side instance
            var gauge = $("#linearGauge").data("kendoLinearGauge");
            gauge.value(20);
        });
        </script>

## See Also

Other articles on Telerik UI for PHP and on the LinearGauge:

* [Overview of the Kendo UI LinearGauge Widget]({% slug overview_kendoui_lineargauge_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
