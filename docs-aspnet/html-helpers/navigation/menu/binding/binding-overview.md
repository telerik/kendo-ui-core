---
title: Overview
page_title: Telerik UI Menu Documentation | Data Binding Overview  
description: "Learn how to bind data to the {{ site.product }} Menu using various data binding approaches."
previous_url: /helpers/navigation/menu/binding/overview
slug: htmlhelpers_menu_databinding_aspnetcore
position: 1
---

# Data Binding Overview

The {{ site.product }} Menu provides flexible data binding capabilities that allow you to populate its items from various data sources. You can choose the appropriate binding method based on your application architecture and data requirements.

{% if site.core %}
@[template](/_contentTemplates/core/json-serialization-note.md#json-serialization-note)
{% endif %}

## Data Binding Approaches

The Menu supports the following data binding methods:

### Items Binding

Define the Menu items declaratively within the component configuration when using:
- Declarative menu structure with known items.
- Static navigation content that does not require external data sources.

For detailed implementation instructions, refer to the [Items Binding]({% slug itemsbinding_menu_aspnetmvc %}) documentation.

### Model Binding

Bind the Menu to a local dataset by passing an arbitrary model directly within the boundaries of the component. This approach is optimal for small to medium-sized datasets that can be loaded in memory.

For detailed implementation instructions, refer to the [Model Binding]({% slug htmlhelpers_menu_modelbinding_aspnetcore %}) documentation.

### Remote Data Binding

Connect the Menu to a remote endpoint using AJAX requests. This enables:
- Dynamic menu generation using server-side data.
- Real-time menu updates based on user permissions or roles.
- Improved performance with large menu structures through on-demand loading.

For more information and examples, refer to the [Remote Data Binding]({% slug htmlhelpers_menu_bindingremotedata_aspnetcore %}) documentation.

### Custom Attributes Binding

Implement custom attribute binding for enhanced Menu functionality by applying model binding to populate menu items dynamically from the server while binding HTML attributes to model fields:
- Bind the Menu items to model properties and specify custom HTML attributes.
- Apply client-side logic based on item attributes and selection.
- Create Menu hierarchies with additional metadata.
- Enable attribute-driven Menu behavior and interactions.

For more information, refer to the [Custom Attributes Binding]({% slug custom-attributes-binding %}) documentation.

{% if site.mvc %}
### Sitemap Binding

Bind the Menu to an ASP.NET sitemap for automatic navigation structure generation:
- Integration with XML sitemap files using `SiteMapManager`.
- Automatic menu hierarchy generation from sitemap structure.
- Support for controller and action routing from sitemap nodes.

For detailed implementation instructions, see [Sitemap Binding]({% slug sitemapbinding_menu_aspnetmvc %}) article.
{% endif %}

{% if site.core %}
## Data Binding in Razor Pages

You can seamlessly integrate the Menu component into Razor Pages applications. All the [data binding approaches](#data-binding-approaches) described above can be configured within Razor Pages scenarios.

The component supports both HtmlHelper and TagHelper syntax, and allows you to send the anti-forgery token when connecting to remote endpoints to ensure secure data operations.

For detailed implementation instructions, refer to the [Razor Pages Binding]({% slug htmlhelpers_menu_razorpage_aspnetcore %}) article.
{% endif %}

## Key Considerations

When selecting a data binding approach for the Menu, evaluate the following factors:

* **Performance**&mdash;Items binding offers fastest initial rendering for static Menus, model binding provides fast rendering for local data, while remote binding delivers better performance with large datasets through server-side operations.
* **Data volume**&mdash;Items binding works best for small static Menus, model binding suits small to medium-sized datasets, while large menu structures are better handled with remote binding.
* **Data structure**&mdash;Items binding is ideal for known static hierarchies, model binding works well with server-side collections, while remote binding supports dynamic data from any endpoint.
* **Customization needs**&mdash;Custom attributes binding enables enhanced functionality when Menu items require additional metadata and client-side logic based on attributes.
* **Security**&mdash;Remote and model binding provide better control over data access and validation compared to Items binding.
* **Real-time requirements**&mdash;Remote binding is essential for scenarios requiring live data updates and dynamic content refresh.

## See Also

* [Server-Side API of the Menu HtmlHelper](/api/menu)
{% if site.core %}
* [Server-Side API of the Menu TagHelper](/api/taghelpers/menu)
{% endif %}
