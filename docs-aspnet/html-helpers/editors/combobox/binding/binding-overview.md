---
title: Overview
page_title: Telerik UI ComboBox Documentation | Data Binding Overview  
description: "Learn how to bind data to the {{ site.product }} ComboBox using various data binding approaches."
previous_url: /helpers/editors/combobox/binding/overview
slug: htmlhelpers_combobox_databinding_aspnetcore
position: 1
---

# Data Binding Overview

The {{ site.product }} ComboBox provides flexible data binding capabilities that allow you to populate the dropdown list with suggestions from various data sources. You can choose the appropriate binding method based on your application architecture and data requirements.

{% if site.core %}
@[template](/_contentTemplates/core/json-serialization-note.md#json-serialization-note)
{% endif %}

## Data Binding Approaches

The ComboBox supports the following data binding methods:

### Local Data Binding

Bind the ComboBox to a local dataset by passing an arbitrary model directly within the boundaries of the component. This approach is optimal for:
- Small to medium-sized datasets that can be loaded in memory.
- Filtering the data on the client.
- Scenarios where all data is available at render time.

For detailed implementation instructions, see [Local Data Binding]({% slug htmlhelpers_combobox_serverbinding_aspnetcore %}) documentation.

### Remote Data Binding

Connect the ComboBox to a remote endpoint using AJAX requests. This enables:
- Dynamic data loading and filtering as the user types.
- Real-time data updates from external sources.
- Improved performance with large datasets through [server-side filtering]({% slug htmlhelpers_combobox_filtering_aspnetcore%}) or [data virtualization]({% slug htmlhelpers_combobox_virtualization_aspnetcore%}).

For more information and examples, refer to the [Remote Data Binding]({% slug htmlhelpers_combobox_ajaxbinding_aspnetcore %}) documentation.

### Custom DataSource Binding

Implement custom data binding scenarios with full control over the data retrieval process:
- Custom data processing logic based on the remote server structure and requirements.
- Custom data operations such as filtering and grouping.
- Connection to [OData](https://www.odata.org/) or other external services.

For more information, refer to the [Custom DataSource Binding]({% slug htmlhelpers_combobox_todatasourceresultbinding_aspnetcore %}) documentation.

### Model Binding

Bind the ComboBox to model properties using strongly-typed expressions (for example, `ComboBoxFor(m => m.PropertyName)`) for form scenarios that require server-side validation, model state management, and seamless integration with [Data Annotation attributes]({% slug validation_aspnetmvc%}#using-dataannotation-attributes).

For more information, refer to the [Model Binding]({% slug htmlhelpers_combobox_modelbinding_aspnetcore %}) documentation.

{% if site.core %}
## Data Binding in Razor Pages

You can seamlessly integrate the ComboBox component into Razor Pages applications. All the [data binding approaches](#data-binding-approaches) described above can be configured within Razor Pages scenarios.

The component supports both HtmlHelper and TagHelper syntax, and allows you to send the anti-forgery token when connecting to remote endpoints to ensure secure data operations.

For detailed implementation instructions, refer to the [ComboBox in Razor Pages]({% slug htmlhelpers_combobox_razorpage_aspnetcore %}) article.
{% endif %}

## Key Considerations

When selecting a data binding approach for the ComboBox, evaluate the following factors:

* **Performance**&mdash;Local data binding offers faster initial rendering, while remote data binding provides better performance with large datasets through on-demand loading.
* **Data volume**&mdash;Large datasets are better handled with remote data binding and server-side filtering, while small to medium datasets work well with local data binding.
* **Real-time requirements**&mdash;Remote data binding is essential for scenarios requiring live data updates and dynamic content refresh.
* **Form integration**&mdash;Model binding is optimal when working with strongly-typed forms that require validation and model state management.
* **Custom scenarios**&mdash;Custom DataSource binding provides full control for complex data operations, OData integration, or specialized server architectures.
* **Maintenance**&mdash;Local data binding is simpler for static data, while remote data binding offers more flexibility for evolving data requirements.

## See Also

* [Server-Side API of the ComboBox HtmlHelper](/api/combobox)
{% if site.core %}
* [Server-Side API of the ComboBox TagHelper](/api/taghelpers/combobox)
{% endif %}
