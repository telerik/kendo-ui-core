---
title: Overview
page_title: Telerik UI TabStrip Documentation | Data Binding Overview  
description: "Learn how to bind data to the {{ site.product }} TabStrip using various data binding approaches."
components: ["tabstrip"]
previous_url: /helpers/navigation/tabstrip/binding/overview
slug: tabstrip_databinding_aspnetmvc
position: 1
---

# Data Binding Overview

The {{ site.product }} TabStrip provides flexible data binding capabilities that allow you to create tabbed interfaces with dynamic content from various data sources. You can choose the appropriate binding method based on your application architecture and data requirements.

{% if site.core %}
@[template](/_contentTemplates/core/json-serialization-note.md#json-serialization-note)
{% endif %}

## Data Binding Approaches

The TabStrip supports the following data binding methods:

### Items Binding

Define tab items declaratively within the component configuration when using:
- Declarative tab structure with known items.
- Static tab content that does not require external data sources.

For detailed implementation instructions, refer to the [Items Binding]({% slug itemsbinding_tabstrip_aspnetmvc %}) documentation.

### Model Binding

Bind the TabStrip to a local dataset by passing an arbitrary model directly within the boundaries of the component. This approach is optimal for small to medium-sized datasets that can be loaded in memory.

For detailed implementation instructions, refer to the [Model Binding]({% slug modelbinding_tabstrip_aspnetmvc %}) documentation.

### Remote Data Binding

Connect the TabStrip to a remote endpoint to load the tab content asynchronously by using AJAX. This enables:
- Dynamic loading of each tab's content.
- Real-time content updates from external sources.
- Improved performance through on-demand data loading.

For more information, refer to the [Ajax Binding]({% slug htmlhelpers_tabstrip_ajaxbinding %}) article.

{% if site.mvc %}
### Sitemap Binding

Bind the TabStrip to an ASP.NET sitemap for automatic tab structure generation:
- Integration with XML sitemap files using `SiteMapManager`.
- Automatic tab generation from sitemap structure.
- Role-based tab filtering.

For detailed implementation instructions, see [Sitemap Binding]({% slug sitemapbinding_tabstrip_aspnetmvc %}) article.
{% endif %}

{% if site.core %}
## Data Binding in Razor Pages

You can seamlessly integrate the TabStrip component into Razor Pages applications. All the [data binding approaches](#data-binding-approaches) described above can be configured within Razor Pages scenarios.

The component supports both HtmlHelper and TagHelper syntax, and allows you to send the anti-forgery token when connecting to remote endpoints to ensure secure data operations.

For detailed implementation instructions, refer to the [Razor Pages Binding]({% slug htmlhelpers_tabstrip_aspnetcore_razor_page %}) article.
{% endif %}

## Key Considerations

When selecting a data binding approach for the TabStrip, evaluate the following factors:

* **Performance**&mdash;Items binding offers fastest initial rendering for static tabs, model binding provides fast rendering for server-side data, while remote binding delivers better performance with large datasets through on-demand content loading.
* **Data volume**&mdash;Items binding works best for small static tab sets, model binding suits small to medium-sized server-side datasets, while large tab collections are better handled with remote binding and lazy loading.
* **Content type**&mdash;Items binding is ideal for known static tab content, model binding works well with server-side collections, while remote binding supports dynamic content loading from any endpoint.
* **Security**&mdash;Model and remote binding provide better control over data access and validation compared to Items binding.
* **Real-time requirements**&mdash;Remote binding is essential for scenarios requiring live data updates and dynamic content refresh.

## See Also

* [Server-Side API of the TabStrip](/api/tabstrip)
{% if site.core %}
* [Server-Side API of the TabStrip TagHelper](/api/taghelpers/tabstrip)
{% endif %}