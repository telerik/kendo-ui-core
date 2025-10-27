---
title: Overview
page_title: Telerik UI ListView Documentation | Data Binding Overview  
description: "Learn how to bind data to the {{ site.product }} ListView using various data binding approaches."
slug: htmlhelpers_databinding_overview_listview
position: 0
---

# Data Binding Overview

The {{ site.product }} ListView provides flexible data binding capabilities that allow you to display and manage data collections from various sources. You can choose the appropriate binding method based on your application architecture and data requirements.

{% if site.core %}
@[template](/_contentTemplates/core/json-serialization-note.md#json-serialization-note)
{% endif %}

## Data Binding Approaches

The ListView supports the following data binding methods:

### Local Data Binding

Bind the ListView to a local dataset by passing an arbitrary model directly within the boundaries of the component. This approach is optimal for:
- Small to medium-sized datasets that can be loaded in memory.
- Static data that does not require frequent updates.
- Scenarios where all data is available at render time.

For detailed implementation instructions, see [Local Data Binding]({% slug htmlhelpers_listview_aspnetcore_localbinding %}) documentation.

### Remote Data Binding

Connect the ListView to a remote endpoint using AJAX operations. This enables:
- Dynamic data loading with paging.
- Real-time data updates from external sources.
- Improved performance with large datasets through on-demand data loading.

For more information and examples, refer to the [Remote Data Binding]({% slug htmlhelpers_listview_aspnetcore_ajaxbinding %}) documentation.

### Custom DataSource Binding

Implement custom data binding scenarios with full control over the data retrieval process:
- Custom data processing logic based on the remote server structure and requirements.
- Custom data operations such as paging and grouping.
- Connection to [OData](https://www.odata.org/) or other external services.

For more information, refer to the [Custom DataSource Binding]({% slug listview_customdatasource_aspnetmvc %}) documentation.

{% if site.core %}
## Data Binding in Razor Pages

You can seamlessly integrate the ListView component into Razor Pages applications. All the [data binding approaches](#data-binding-approaches) described above can be configured within Razor Pages scenarios.

The component supports both HtmlHelper and TagHelper syntax, and allows you to send the anti-forgery token when connecting to remote endpoints to ensure secure data operations.

For detailed implementation instructions, refer to the [ListView in Razor Pages]({% slug htmlhelpers_listview_razorpage_aspnetcore %}) article.
{% endif %}

## Key Considerations

When selecting a data binding approach for the ListView, evaluate the following factors:

* **Performance**&mdash;Local binding offers faster initial rendering, while remote binding provides better performance with large datasets through on-demand loading.
* **Data volume**&mdash;Large datasets are better handled with remote binding and enabled paging.
* **Security**&mdash;Remote binding provides better control over data access through server-side validation and authorization.
* **Real-time requirements**&mdash;Remote binding is essential for scenarios requiring live data updates and dynamic content refresh.
* **Maintenance**&mdash;Local binding is simpler for static data, while remote binding offers more flexibility for evolving data requirements.

## See Also

* [Server-Side API of the ListView HtmlHelper](/api/listview)
{% if site.core %}
* [Server-Side API of the ListView TagHelper](/api/taghelpers/listview)
{% endif %}
* [Local Data Binding by the ListView for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listview/local-data-binding)
* [Ajax Data Binding by the ListView for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listview/remote-data-binding)
* [Custom DataSource Binding by the ListView for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listview/custom-datasource)