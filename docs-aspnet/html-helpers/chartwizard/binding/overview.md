---
title: Overview
page_title: Telerik UI Chart Wizard Documentation | Data Binding Overview  
description: "Learn how to bind data to the {{ site.product }} Chart Wizard using various data binding approaches."
components: ["chartwizard"]
slug: htmlhelpers_databinding_overview_chartwizard
position: 1
---

# Data Binding Overview

The {{ site.product }} Chart Wizard provides flexible data binding capabilities that allow you to create and configure charts with dynamic data. You can choose the appropriate binding method based on your application architecture and data requirements.

{% if site.core %}
@[template](/_contentTemplates/core/json-serialization-note.md#json-serialization-note)
{% endif %}

## Data Binding Approaches

The Chart Wizard supports the following data binding methods:

### Local Data Binding

Bind the Chart Wizard to a local dataset by passing an arbitrary model directly within the boundaries of the component. This approach is optimal for:
- Small to medium-sized datasets that can be loaded in memory.
- Static data that does not require frequent updates.
- Scenarios where all chart data is available at render time.

For detailed implementation instructions, see [Local Data Binding]({% slug htmlhelpers_localbinding_chartwizard %}).

### Remote Data Binding

Connect the Chart Wizard to a remote endpoint using AJAX operations. This enables:
- Dynamic data loading from external sources.
- Real-time chart updates with fresh data.
- Improved performance with large datasets through on-demand data loading.

For more information and examples, refer to the [Remote Data Binding]({% slug htmlhelpers_remotebinding_chartwizard %}) documentation.

{% if site.core %}
## Data Binding in Razor Pages

You can seamlessly integrate the Chart Wizard component into Razor Pages applications. All the [data binding approaches](#data-binding-approaches) described above can be configured within Razor Pages scenarios.

The component supports both HtmlHelper and TagHelper syntax, and allows you to send the anti-forgery token when connecting to remote endpoints to ensure secure data operations.

For detailed implementation instructions, refer to the [Chart Wizard in Razor Pages]({% slug razorpages_chartwizard %}) article.
{% endif %}

## Key Considerations

When selecting a data binding approach for the Chart Wizard, evaluate the following factors:

* **Performance**&mdash;Local binding offers faster initial rendering, while remote binding provides better performance with large datasets through on-demand loading.
* **Data volume**&mdash;Large datasets are better handled with remote binding to avoid memory constraints and improve chart responsiveness.
* **Security**&mdash;Remote binding provides better control over data access through server-side validation and authorization.
* **Maintenance**&mdash;Local binding is simpler for static charts, while remote binding offers more flexibility for evolving data requirements.

## See Also

* [Server-Side API of the Chart Wizard HtmlHelper](/api/chartwizard)
{% if site.core %}
* [Server-Side API of the Chart Wizard TagHelper](/api/taghelpers/chartwizard)
{% endif %}