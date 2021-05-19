---
title: Data Binding
page_title: jQuery PivotGrid Documentation | Data Binding
description: "Get started with the jQuery PivotGrid by Kendo UI and learn about the OLAP cube configuration for performing data binding and about the limitations when binding the widget to flat data."
slug: databinding_kendoui_pivotgrid
position: 1
---

# Data Binding

The Kendo UI PivotGrid supports data binding to an HTTP accessible Online Analytical Processing (OLAP) cube and to flat data.

## OLAP Services

Kendo UI provides an OLAP service dll that can be used for testing and is hosted at `https://demos.telerik.com/olap/msmdpump.dll`. To see the responses, the service needs to be queried and cannot be opened directly in the browser. For more information on binding the PivotGrid to data over an OLAP cube, refer to the following articles:
* [OLAP Cube Fundamentals]({% slug fundamentals_pivotgrid_widget %})
* [OLAP Cube Setup]({% slug olap_cube_setup_pivotgrid_widget %})
* [PivotConfigurator Overview]({% slug overview_kendoui_pivotconfigurator_pivotgridwidget %})

## Flat Data

When the PivotGrid is bound to a flat-data structure, it processes the data on the client (browser) and creates a client cube representation [(configuration)](/api/javascript/data/pivotdatasource/configuration/schema.cube). This means that the widget uses the processing power of the browser to project the data and produces the required categorized data output. Even though the PivotGrid does not restrict the maximum data amount bound to itself, the data has limits that are directly related to the browser capability to handle the loaded dataset.

The symptoms for an overloaded browser are:
- The browser is extremely slowly loading or unresponsive for a long time.
- The browser is crashing on load or on the dimensions/measures update.

If you observe any of these symptoms, this means you have hit the processing limit of the browser. To work around this issue, use a dedicated [OLAP](https://en.wikipedia.org/wiki/Online_analytical_processing) solution like Microsoft [SSAS](https://technet.microsoft.com/en-us/library/ms175609(v=sql.90).aspx).

> The server solution has to enable the communication with the client accepting HTTP requests and has to support the [XMLA 1.1 protocol](https://en.wikipedia.org/wiki/XML_for_Analysis).

For runnable examples on binding the PivotGrid to flat data, refer to the following online demos:
* [Local binding of the PivotGrid (demo)](https://demos.telerik.com/kendo-ui/pivotgrid/local-flat-data-binding)
* [Remote binding of the PivotGrid (demo)](https://demos.telerik.com/kendo-ui/pivotgrid/remote-flat-data-binding)

## See Also

* [Basic Usage of the PivotGrid (Demo)](https://demos.telerik.com/kendo-ui/pivotgrid/index)
* [PivotGrid JavaScript API Reference](/api/javascript/ui/pivotgrid)
