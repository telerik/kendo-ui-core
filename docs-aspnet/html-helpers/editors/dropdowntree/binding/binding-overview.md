---
title: Overview
page_title: Telerik UI DropDownTree Documentation | Data Binding Overview  
description: "Learn how to bind data to the {{ site.product }} DropDownTree using various data binding approaches."
slug: htmlhelpers_dropdowntree_databinding_aspnetcore
position: 1
---

# Data Binding Overview

The {{ site.product }} DropDownTree provides flexible data binding capabilities that allow you to populate the tree structure with hierarchical data from various sources. You can choose the appropriate binding method based on your application architecture and data requirements.

{% if site.core %}
@[template](/_contentTemplates/core/json-serialization-note.md#json-serialization-note)
{% endif %}

## Data Binding Approaches

The DropDownTree supports the following data binding methods:

### Items Data Binding

Define the DropDownTree items declaratively within the component configuration when using:
- Simple tree structures with a known, fixed hierarchy.
- Static content that does not require external data sources.

For detailed implementation instructions, refer to the [Items Binding]({% slug itemsbinding_dropdowntree %}) documentation.

### Local Data Binding

Bind the DropDownTree to a local dataset by passing an arbitrary model directly within the boundaries of the component. This approach is optimal for:
- Small to medium-sized datasets that can be loaded in memory.
- Scenarios where all data is available at render time.

For detailed implementation instructions, see [Local Data Binding]({% slug htmlhelpers_dropdowntree_serverbinding_aspnetcore %}) documentation.

### Remote Data Binding

Connect the DropDownTree to a remote endpoint using AJAX requests. This enables:
- Dynamic loading of large hierarchical datasets.
- Real-time data updates from external sources.
- Improved performance through on-demand data loading.

For more information and examples, refer to the [Remote Data Binding]({% slug htmlhelpers_dropdowntree_ajaxbinding_aspnetcore %}) documentation.

{% if site.core %}
## Data Binding in Razor Pages

You can seamlessly integrate the DropDownTree component into Razor Pages applications. All the [data binding approaches](#data-binding-approaches) described above can be configured within Razor Pages scenarios.

The component supports both HtmlHelper and TagHelper syntax, and allows you to send the anti-forgery token when connecting to remote endpoints to ensure secure data operations.

For detailed implementation instructions, refer to the [Razor Pages Binding]({% slug htmlhelpers_dropdowntree_razorpage_aspnetcore %}) article.
{% endif %}

## Key Considerations

When selecting a data binding approach for the DropDownTree, evaluate the following factors:

* **Performance**&mdash;Local data binding offers faster initial rendering, while remote data binding provides better performance with large datasets through on-demand loading of child nodes.
* **Data volume**&mdash;Large hierarchical datasets are better handled with remote binding and lazy loading, while small to medium datasets work well with local data binding. Items binding is suitable for static trees.
* **Tree complexity**&mdash;Simple, fixed hierarchies work well with items binding, while dynamic or deeply nested structures benefit from local or remote data binding approaches.
* **Real-time requirements**&mdash;Remote data binding is essential for scenarios requiring live data updates and dynamic content refresh.

## See Also

* [Local Data Binding by the DropDownTree for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdowntree/local-data-binding)
* [Ajax Data Binding by the DropDownTree for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdowntree/remote-data-binding)
* [Server-Side API of the DropDownTree HtmlHelper](/api/dropdowntree)
{% if site.core %}
* [Server-Side API of the DropDownTree TagHelper](/api/taghelpers/dropdowntree)
{% endif %}
