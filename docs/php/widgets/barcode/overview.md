---
title: Overview
page_title: Overview | Barcode PHP Class
description: "Get started with the Barcode PHP class in Kendo UI."
slug: overview_barcode_uiforphp
position: 1
---

# Barcode PHP Class Overview

The Kendo UI Barcode for PHP is a server-side wrapper for the [Kendo UI Barcode](/api/javascript/dataviz/ui/barcode) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Barcode for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Add a Barcode with the default [`type`](/api/javascript/dataviz/ui/barcode#configuration-type) (Code39).

###### Example

    $barcode = new \Kendo\Dataviz\UI\Barcode('barcode');
    $barcode->value("foo");

**Step 3** Change the symbology to match your scenario.

###### Example

    $barcode = new \Kendo\Dataviz\UI\Barcode('barcode');
    $barcode->value("foo");
    $barcode->type("ean8");

**Step 4** Output the chart by echoing the result of the `render` method.

###### Example

    echo $barcode->render();

## Reference

### Existing Instances

You are able to reference an existing Barcode instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Barcode API](/api/javascript/dataviz/ui/barcode#methods) to control its behavior.

###### Example

    // Put this after your Kendo Barcode for PHP render() call
    <script>
    $(function() {
        // Notice that the name of the barcode is used to get its client-side instance
        var barcode = $("#barcode").data("kendoBarcode");
        barcode.value("foo");
    });
    </script>

## See Also

Other articles on Telerik UI for PHP and on the Barcode:

* [Overview of the Kendo UI Barcode Widget]({% slug overview_kendoui_barcode_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
