---
title: Overview
page_title: Telerik UI Grid Documentation | Data Binding Overview  
description: "Learn how to bind data to the {{ site.product }} Grid using various data binding approaches."
previous_url: /helpers/data-management/grid/binding/overview
slug: htmlhelpers_grid_aspnetcore_binding_overview
position: 0
---

# Data Binding Overview

The {{ site.product }} Grid provides flexible data binding capabilities that allow you to display and manage tabular data from various sources. You can choose the appropriate binding method based on your application architecture and data requirements.

{% if site.core %}
@[template](/_contentTemplates/core/json-serialization-note.md#json-serialization-note)
{% endif %}

## Data Binding Approaches

The Grid supports the following data binding methods:

### Local Data Binding

Bind the Grid to a local dataset by passing an arbitrary model directly within the boundaries of the component. This approach is optimal for:
- Small to medium-sized datasets that can be loaded in memory.
- Static data that does not require frequent updates.
- Scenarios where all data is available at render time.

For detailed implementation instructions, see [Local Data Binding]({% slug htmlhelpers_grid_aspnetcore_localbinding %}).

### Remote Data Binding

Connect the Grid to a remote endpoint using AJAX operations. This enables:
- Dynamic data loading with paging, sorting, grouping, and filtering.
- Real-time data updates from external sources.
- Improved performance with large datasets through on-demand data loading.

For more information and examples, refer to the [Remote Data Binding]({% slug htmlhelpers_grid_aspnetcore_ajaxbinding %}) documentation.

### Custom DataSource Binding

Implement custom data binding scenarios with full control over the data retrieval process:
- Custom data processing logic based on the remote server structure and requirements.
- Custom data operations such as paging, sorting, filtering, and grouping.
- Connection to [OData]({% slug htmlhelpers_grid_aspnetcore_odata-binding %}) and [GraphQL]({% slug htmlhelpers_grid_aspnetcore_graphql-binding %}) services.

For more information, refer to the [Custom Binding]({% slug custombinding_grid_aspnetmvc %}) documentation.

### Web API Data Binding

Connect the Grid to Web API endpoints for RESTful data operations:
- RESTful API integration with automatic HTTP verb mapping.
- Standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) for CRUD operations.
- JSON data exchange format.
- Clean separation between client and server logic.

For more information, refer to the [Web API Binding]({% slug htmlhelpers_grid_webapi_binding %}) documentation.

{% if site.mvc %}
### Server Binding

Utilize server-side binding for rendering the Grid with data on the server. This approach provides:
- Server-side rendering with pre-populated data.
- Full-page postback scenarios with HTTP requests for CRUD operations.
- Integration with server-side data processing.
- Server-side template execution using Razor syntax.

For detailed implementation instructions, see [Server Binding]({% slug serverbinding_grid_aspnetmvc %}) documentation.
{% endif %}

### SignalR Data Binding

Enable real-time data synchronization using SignalR for live data updates:
- Real-time data synchronization across multiple clients.
- Automatic Grid updates when data changes on the server.
- Live collaboration features with instant data broadcasting.
- Push notifications for data modifications without page refresh.

For detailed implementation instructions, see [SignalR Data Binding]({% slug htmlhelpers_grid_aspnetcore_signalrbinding %}) documentation.

{% if site.core %}
## Data Binding in Razor Pages

You can seamlessly integrate the Grid component into Razor Pages applications. All the [data binding approaches](#data-binding-approaches) described above can be configured within Razor Pages scenarios.

The component supports both HtmlHelper and TagHelper syntax, and allows you to send the anti-forgery token when connecting to remote endpoints to ensure secure data operations.

For detailed implementation instructions, refer to the [Grid in Razor Pages]({% slug razorpages_gridhelper_aspnetcore %}) article.
{% endif %}

## Key Considerations

When selecting a data binding approach for the Grid, evaluate the following factors:

* **Performance**&mdash;Local binding offers faster initial rendering for small datasets, while remote binding provides better performance with large datasets through on-demand loading and server-side operations.
* **Data volume**&mdash;Large datasets require remote binding, custom DataSource, or Web API binding to leverage server-side paging, sorting, and filtering for optimal performance.
* **Security**&mdash;Remote binding provide better control over data access through server-side validation and authorization.
* **Real-time requirements**&mdash;SignalR binding is essential for scenarios requiring live data updates and multi-client synchronization.
* **API architecture**&mdash;Web API binding is optimal for RESTful services, while Custom DataSource binding provides flexibility for OData, GraphQL, or custom endpoints.
{% if site.mvc %}
* **Application model**&mdash;Server binding is suitable for traditional MVC applications requiring server-side rendering and full-page postbacks.
{% endif %}
* **Development complexity**&mdash;Local binding is simplest for static data, while Custom DataSource binding offers maximum flexibility at the cost of increased implementation complexity.

## Loading Overlay Types

The Grid component exposes two types of loading indicators:

* The `GridLoaderType.LoadingPanel` adds an overlay element with a loading spinner over the main content of the Grid. This is the default type.

* The `GridLoaderType.Skeleton` uses the [SkeletonContainer widget](https://docs.telerik.com/kendo-ui/controls/skeletoncontainer/overview) to show a simplified preview of each of the grid's cells. The `Skeleton` loading type aims at helping the user gain an idea of what the content would look like when the loading completes. It also makes the page load time appear shorter.

Check the `Skeleton` loading type in action in the live demo below:

* [Skeleton Loading Type Demo](https://demos.telerik.com/{{ site.platform }}/skeletoncontainer/grid-integration)

## See Also

* [Server-Side API of the Grid HtmlHelper](/api/grid)
{% if site.core %}
* [Server-Side API of the Grid TagHelper](/api/taghelpers/grid)
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Local Data Binding by the Grid for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/local-data-binding)
* [Remote Data Binding by the Grid for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/remote-data-binding)
* [Custom DataSource Binding by the Grid for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/custom-datasource)
* [Custom Ajax Binding by the Grid for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/customajaxbinding)
* [Web API Binding by the Grid for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/webapi)
* [OData Binding by the Grid for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/odata)
* [SignalR Binding by the Grid for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/signalr)
* [GraphQL Service Binding by the Grid for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/graphql)
