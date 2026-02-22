---
title: Overview
page_title: Data Binding Overview
description: "Get started with the Telerik UI PivotGridV2 HtmlHelper for {{ site.framework }} and learn about the OLAP cube configuration for performing Ajax data binding with the PivotGridV2."
components: ["pivotgridv2"]
slug: databinding_pivotgridv2helper_aspnetcore
position: 1
---

# Data Binding Overview

The PivotGridV2 for {{ site.framework }} supports Ajax data binding to an HTTP accessible [Online Analytical Processing (OLAP)](https://learn.microsoft.com/en-us/previous-versions/sql/sql-server-2005/ms175367(v=sql.90)) and binding to local flat data.

* [OLAP Cube Fundamentals]({% slug htmlhelpers_pivotgridv2_aspnetcore_fundamentals %})
* [Local Data Binding]({% slug htmlhelpers_pivotgridv2_aspnetcore_localbinding %})
* [Using PivotConfiguratorV2]({% slug htmlhelpers_pivotgridv2_aspnetcore_configurator %})
{% if site.core %}
* [Razor Pages Binding]({% slug razorpages_pivotgridv2_aspnetcore %})
{% endif %}

## OLAP Services

* Telerik UI provides an OLAP service dll that can be used for testing and is hosted at `https://demos.telerik.com/service/v2/olap/msmdpump.dll`.
* To see the responses, the service needs to be queried and cannot be opened directly in the browser.

For more information on binding the PivotGridV2 to data over an OLAP cube, refer to the following articles:

* [OLAP Cube Fundamentals]({% slug htmlhelpers_pivotgridv2_aspnetcore_fundamentals %})
* [OLAP Cube Setup]({% slug htmlhelpers_pivotgridv2_aspnetcore_olap_cube_setup %})
* [PivotConfigurator Overview]({% slug htmlhelpers_pivotgridv2_aspnetcore_configurator %})

## See Also

* [Basic Usage of the PivotGridV2 HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pivotgridv2)
* [Local Data Binding by the PivotGridV2 HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pivotgridv2/local-flat-data-binding)
