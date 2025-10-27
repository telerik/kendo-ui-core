---
title: Overview
page_title: Telerik UI PanelBar Documentation | Data Binding Overview  
description: "Learn how to bind data to the {{ site.product }} PanelBar using various data binding approaches."
previous_url: /helpers/navigation/panelbar/binding/overview
slug: htmlhelpers_panelbar_databinding_aspnetcore
position: 1
---

# Data Binding Overview

The {{ site.product }} PanelBar provides flexible data binding capabilities that allow you to create expandable panel navigation from various data sources. You can choose the appropriate binding method based on your application architecture and data requirements.

{% if site.core %}
@[template](/_contentTemplates/core/json-serialization-note.md#json-serialization-note)
{% endif %}

## Data Binding Approaches

The PanelBar supports the following data binding methods:

### Items Binding

Define the PanelBar items declaratively within the component configuration when using:
- Declarative panel structure with known items.
- Static hierarchical content that does not require external data sources.

For detailed implementation instructions, refer to the [Items Binding]({% slug itemsbinding_panelbarhelper_aspnetmvc %}) documentation.

### Local Data Binding

Bind the PanelBar to a local dataset by passing an arbitrary model directly within the boundaries of the component. This approach is optimal for:
- Small to medium-sized datasets that can be loaded in memory.
- Scenarios where all data is available at render time.

For detailed implementation instructions, see [Local Data Binding]({% slug htmlhelpers_panelbar_serverbinding_aspnetcore %}) documentation.

### Remote Data Binding

Connect the PanelBar to a remote endpoint using AJAX requests. This enables:
- Dynamic loading of large hierarchical datasets.
- Real-time data updates from external sources.
- Improved performance through on-demand data loading.

For more information and examples, refer to the [Ajax Data Binding]({% slug htmlhelpers_panelbar_ajaxbinding_aspnetcore %}) documentation.

{% if site.mvc %}
### Sitemap Binding

Bind the PanelBar to an ASP.NET sitemap for automatic navigation structure generation:
- Integration with XML sitemap files using `SiteMapManager`.
- Automatic panel generation from sitemap structure.
- Role-based panel filtering.

For detailed implementation instructions, see [Sitemap Binding]({% slug sitemapbinding_panelbarhelper_aspnetmvc %}) article.
{% endif %}

{% if site.core %}
## Data Binding in Razor Pages

You can seamlessly integrate the PanelBar component into Razor Pages applications. All the [data binding approaches](#data-binding-approaches) described above can be configured within Razor Pages scenarios.

The component supports both HtmlHelper and TagHelper syntax, and allows you to send the anti-forgery token when connecting to remote endpoints to ensure secure data operations.

For detailed implementation instructions, refer to the [Razor Pages Binding]({% slug htmlhelpers_panelbar_razorpage_aspnetcore %}) article.
{% endif %}

## Key Considerations

When selecting a data binding approach for the PanelBar, evaluate the following factors:

* **Performance**&mdash;Items binding offers fastest initial rendering for static PanelBar components, local binding provides fast rendering for server-side data, while remote binding delivers better performance with large datasets through on-demand loading.
* **Data volume**&mdash;Items binding works best for small static hierarchies, local binding suits small to medium-sized server-side datasets, while large hierarchical data structures are better handled with remote binding and lazy loading.
* **Data structure**&mdash;Items binding is ideal for known static panel hierarchies, local binding works well with server-side collections, while remote binding supports dynamic hierarchical data from any endpoint.
* **Security**&mdash;Local and remote binding provide better control over data access and validation compared to Items binding.
* **Real-time requirements**&mdash;Remote binding is essential for scenarios requiring live data updates, dynamic content refresh, and expandable panel structures that load on demand.
* **Scalability**&mdash;Items and local binding are suitable for relatively static navigation, while remote binding scales better as your application and hierarchical data requirements grow.

## See Also

* [Server-Side API of the PanelBar HtmlHelper](/api/panelbar)
{% if site.core %}
* [Server-Side API of the PanelBar TagHelper](/api/taghelpers/panelbar)
{% endif %}
