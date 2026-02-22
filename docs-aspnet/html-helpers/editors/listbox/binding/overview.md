---
title: Overview
page_title: Telerik UI ListBox Documentation | Data Binding Overview  
description: "Learn how to bind data to the {{ site.product }} ListBox using various data binding approaches."
components: ["listbox"]
previous_url: /helpers/editors/listbox/data-binding
slug: htmlhelpers_listbox_databinding_aspnetcore
position: 1
---

# Data Binding Overview

The {{ site.product }} ListBox provides flexible data binding capabilities that allow you to populate the list with selectable items from various data sources. You can choose the appropriate binding method based on your application architecture and data requirements.

{% if site.core %}
@[template](/_contentTemplates/core/json-serialization-note.md#json-serialization-note)
{% endif %}

## Data Binding Approaches

The ListBox supports the following data binding methods:

### Local Data Binding

Bind the ListBox to a local dataset by passing an arbitrary model directly within the boundaries of the component. This approach is optimal for:
- Small to medium-sized datasets that can be loaded in memory.
- Static data that does not require frequent updates.
- Scenarios where all data is available at render time.

For detailed implementation instructions, see [Local Data Binding]({% slug htmlhelpers_listbox_local_aspnetcore %}).

### Array Data Binding

Bind the ListBox to arrays when working with simple data structures and straightforward scenarios:
- Binding to primitive arrays.
- Static list scenarios with minimal configuration requirements.
- Quick prototyping and testing environments.

For detailed implementation instructions, refer to the [Binding to Arrays]({% slug htmlhelpers_listbox_array_binding_aspnetcore %}) article.

### Remote Data Binding

Connect the ListBox to a remote endpoint using AJAX requests. This enables:
- Dynamic data loading from external sources.
- Real-time list updates with fresh data.

For more information and examples, refer to the [Remote Data Binding]({% slug htmlhelpers_listbox_remote_aspnetcore %}) documentation.

{% if site.core %}
## Data Binding in Razor Pages

You can seamlessly integrate the ListBox component into Razor Pages applications. All the [data binding approaches](#data-binding-approaches) described above can be configured within Razor Pages scenarios.

The component supports both HtmlHelper and TagHelper syntax, and allows you to send the anti-forgery token when connecting to remote endpoints to ensure secure data operations.

For detailed implementation instructions, refer to the [ListBox in Razor Pages]({% slug razorpages_listBoxhelper_aspnetcore %}) article.
{% endif %}

## Key Considerations

When selecting a data binding approach for the ListBox, evaluate the following factors:

* **Performance**&mdash;Local data binding offers faster initial rendering since all data is available immediately, while remote data binding provides better performance with large datasets.
* **Data volume**&mdash;Array binding works best for small primitive datasets, local binding suits small to medium-sized collections, while remote binding handles large datasets efficiently with server-side operations.
* **Real-time requirements**&mdash;Remote data binding is essential for scenarios requiring live data updates and dynamic content refresh.
* **Security**&mdash;Remote binding provides better control over data access, validation, and can implement proper authentication and authorization mechanisms.

## See Also

* [Server-Side API of the ListBox HtmlHelper](/api/listbox)
{% if site.core %}
* [Server-Side API of the ListBox TagHelper](/api/taghelpers/listbox)
{% endif %}
