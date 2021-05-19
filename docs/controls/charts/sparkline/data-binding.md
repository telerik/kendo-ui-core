---
title: Data Binding
page_title: jQuery Sparkline Charts Documentation | Data Binding
description: "Get started with the jQuery Sparkline by Kendo UI and learn how to bind the widget to data."
slug: databinding_kendoui_sparklinescharts
position: 2
---

# Data Binding

The Sparkline charts can visualize series that are bound to both local and remote data.

## Binding to Local Data

Binding to local data can be done by using any of the following approaches:

* Passing an array with values to the widget constructor.
* Setting the root-level `data` field to an array with values.
* Configuring a series and setting its `data` option.

    // The following configurations are identical.

    $("#sparkline").kendoSparkline([200, 450, 300, 125]);

    $("#sparkline").kendoSparkline({
        type: "line",
        data: [200, 450, 300, 125]
    });

    $("#sparkline").kendoSparkline({
        series: [{
            type: "line",
            data: [200, 450, 300, 125]
        }]
    });

## Binding to Remote Data

For more information, refer to the article on [binding Telerik UI Charts to a data source]({% slug databinding_charts_widget %}).

## See Also

* [Basic Usage of the Sparkline (Demo)](https://demos.telerik.com/kendo-ui/sparklines/index)
* [JavaScript API Reference of the Sparkline](/api/javascript/dataviz/ui/sparkline)
