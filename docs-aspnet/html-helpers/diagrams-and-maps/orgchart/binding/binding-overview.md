---
title: Overview
page_title: Telerik UI OrgChart Documentation | Data Binding Overview  
description: "Learn how to bind data to the {{ site.product }} OrgChart using various data binding approaches."
slug: htmlhelpers_orgchart_databinding_aspnetcore
position: 1
---

# Data Binding Overview

The {{ site.product }} OrgChart provides flexible data binding capabilities that allow you to visualize hierarchical organizational structures from various data sources. You can choose the appropriate binding method based on your application architecture and data requirements.

{% if site.core %}
@[template](/_contentTemplates/core/json-serialization-note.md#json-serialization-note)
{% endif %}

## Data Binding Approaches

The OrgChart supports the following data binding methods:

### Local Data Binding

Bind the OrgChart to a local dataset by setting the data using a client-side logic after the component initialization. This approach is optimal for:
- Small to medium-sized organizational structures that can be loaded in memory.
- Static hierarchical data that does not require updates.
- Scenarios where all organizational data is available at render time.

For detailed implementation instructions, see [Local Data Binding]({% slug htmlhelpers_orgchart_localbinding_aspnetcore %}) documentation.

### Remote Data Binding

Connect the OrgChart to a remote endpoint using AJAX operations. This enables:
- Dynamic loading of large organizational structures.
- Real-time data updates from external sources.
- Improved performance with large datasets through on-demand data loading.

For more information and examples, refer to the [Remote Data Binding]({% slug htmlhelpers_orgchart_ajaxbinding_aspnetcore %}) documentation.

{% if site.core %}
## Data Binding in Razor Pages

You can seamlessly integrate the OrgChart component into Razor Pages applications. All the [data binding approaches](#data-binding-approaches) described above can be configured within Razor Pages scenarios.

The component supports both HtmlHelper and TagHelper syntax, and allows you to send the anti-forgery token when connecting to remote endpoints to ensure secure data operations.

For detailed implementation instructions, refer to the [OrgChart in Razor Pages]({% slug htmlhelpers_orgchart_razorpage_aspnetcore %}) article.
{% endif %}

## Key Considerations

When selecting a data binding approach for the OrgChart, evaluate the following factors:

* **Performance**&mdash;Local binding offers faster initial rendering, while remote binding provides better performance with large datasets.
* **Data volume**&mdash;Large organizational structures are better handled with remote binding and enabled on-demand loading.
* **Security**&mdash;Remote binding provides better control over data access through server-side validation and authorization.
* **Real-time requirements**&mdash;Remote binding is essential for scenarios requiring live data updates and dynamic content refresh.
* **Maintenance**&mdash;Local binding is simpler for static data, while remote binding offers more flexibility for evolving data requirements.

## See Also

* [Server-Side API of the OrgChart HtmlHelper](/api/orgchart)
{% if site.core %}
* [Server-Side API of the OrgChart TagHelper](/api/taghelpers/orgchart)
{% endif %}
* [Remote Data Binding by the OrgChart for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/orgchart/remote-data-binding)
* [Loading Data on Demand by the OrgChart for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/orgchart/load-on-demand)
