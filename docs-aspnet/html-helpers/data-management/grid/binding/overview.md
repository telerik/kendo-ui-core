---
title: Overview
page_title: Data Binding Overview
description: "Learn about the different types of data binding when working with the Telerik UI Grid component for {{ site.framework }}."
previous_url: /helpers/data-management/grid/binding/overview
slug: htmlhelpers_grid_aspnetcore_binding_overview
position: 1
---

# Data Binding Overview

Depending on the configuration of its [DataSource]({% slug htmlhelpers_datasource_aspnetcore %}), the {{ site.product_short }} Grid provides different types of data binding. 

{% if site.core %}
* [Local data binding]({% slug htmlhelpers_grid_aspnetcore_localbinding %})
{% else %}
* [Server binding binding]({% slug serverbinding_grid_aspnetmvc %})
{% endif %}
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

## Loading Overlay Types

The Telerik UI Grid for {{ site.framework }} exposes two types of loading indicators:

* The `GridLoaderType.LoadingPanel` adds an overlay element with a loading spinner over the main content of the Grid. This is the default type.

* The `GridLoaderType.Skeleton` uses the [SkeletonContainer widget](https://docs.telerik.com/kendo-ui/controls/interactivity/skeletoncontainer/overview) to show a simplified preview of each of the grid's cells. The `Skeleton` loading type aims at helping the user gain an idea of what the content would look like when the loading completes. It also makes the page load time appear shorter.

Check the `Skeleton` loading type in action in the live demo below:

* [Skeleton Loading Type Demo](https://demos.telerik.com/{{ site.platform }}/skeletoncontainer/grid-integration)

## See Also

* [Remote Ajax Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/remote-data-binding)
* [Local Ajax Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/local-data-binding)
* [WebAPI Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/webapi)
* [OData Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/odata)
* [SignalR Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/signalr)
* [Custom Ajax Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/customajaxbinding)
