---
title: Overview
page_title: Data Binding Overview
description: "Learn about the different types of data binding when working with the Telerik UI Grid HtmlHelper for {{ site.framework }}."
previous_url: /helpers/data-management/grid/binding/overview
slug: htmlhelpers_grid_aspnetcore_binding_overview
position: 1
---

# Data Binding Overview

Depending on the configuration of its [DataSource]({% slug htmlhelpers_datasource_aspnetcore %}), the {{ site.product_short }} Grid provides different types of data binding. 

* [Local data binding]({% slug htmlhelpers_grid_aspnetcore_localbinding %})
* [Remote data binding]({% slug htmlhelpers_grid_aspnetcore_ajaxbinding %})
* [SignalR data binding]({% slug htmlhelpers_grid_aspnetcore_signalrbinding %})
* [Custom Binding]({% slug custombinding_grid_aspnetmvc %}){% if site.mvc %} 
* [Server Binding]({% slug serverbinding_grid_aspnetmvc %})

The {{ site.product }} Grid enables you to populate it with data by using server and Ajax data binding.

* The server binding binds the Grid to a supplied model and the Grid makes `HTTP` and `GET` requests when binding.
* The Ajax binding makes Ajax requests to get the data for the Grid.

The following table lists the basic feature differences between the server and Ajax binding.

|**Feature**  |**Server Binding** |**Ajax Binding** |
|:---         |:---               |:---             |
|**Templates** |In the server-bound mode, the Grid templates use server-side expressions and .NET code&mdash;C# or Visual Basic. Templates are executed server-side. |In the Ajax-bound mode, the Grid uses Kendo UI templates. Templates are executed on the client and use JavaScript. |
|**Full-Page Updates** |The Grid makes HTTP GET requests to ASP.NET MVC action methods which cause a full-page refresh. |The Grid makes Ajax requests which cause partial page update. The Grid retrieves only the data needed for the current page.|
{% endif %}

## See Also

* [Remote Ajax Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/remote-data-binding)
* [Local Ajax Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/local-data-binding)
* [WebAPI Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/webapi)
* [OData Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/odata)
* [SignalR Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/signalr)
* [Custom Ajax Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/customajaxbinding)
