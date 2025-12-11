---
title: Overview
page_title: Telerik UI Gantt Documentation | Data Binding Overview  
description: "Learn how to bind data to the {{ site.product }} Gantt using various data binding approaches."
components: ["gantt"]
previous_url: /helpers/scheduling/gantt/server-binding, /helpers/scheduling/gantt/binding
slug: htmlhelpers_gantt_databinding
position: 0
---

# Data Binding Overview

The {{ site.product }} Gantt provides flexible data binding capabilities that allow you to visualize project schedules and task dependencies from various data sources. You can choose the appropriate binding method based on your application architecture and data requirements.

{% if site.core %}
@[template](/_contentTemplates/core/json-serialization-note.md#json-serialization-note)
{% endif %}

## Data Binding Approaches

The Gantt supports the following data binding methods:

### Local Data Binding

Bind the Gantt to a local dataset by passing an arbitrary model directly within the boundaries of the component. This approach is optimal for:
- Small to medium-sized datasets that can be loaded in memory.
- Static data that does not require frequent updates.
- Scenarios where all data is available at render time.

For detailed implementation instructions, refer to the [Local Data Binding]({% slug htmlhelpers_gantt_serverbinding_aspnetcore %}) documentation.

### Remote Data Binding

Connect the Gantt to a remote endpoint using AJAX operations. This enables:
- Dynamic data loading with paging, sorting, and filtering.
- Real-time updates of task progress and dependencies from external sources.
- Improved performance with large event datasets through server-side processing.

For more information and examples, refer to the [Remote Data Binding]({% slug htmlhelpers_gantt_ajaxbinding_aspnetcore %}) documentation.

{% if site.core %}
## Data Binding in Razor Pages

You can seamlessly integrate the Gantt component into Razor Pages applications. All the [data binding approaches](#data-binding-approaches) described above can be configured within Razor Pages scenarios.

The component supports both HtmlHelper and TagHelper syntax, and allows you to send the anti-forgery token when connecting to remote endpoints to ensure secure data operations.

For detailed implementation instructions, refer to the [Gantt in Razor Pages]({% slug htmlhelpers_gantt_razorpage_aspnetcore %}) article.
{% endif %}

## Model Requirements

The model that binds to the Gantt extends the `IGanttTask` and the `IGanttDependency` interfaces, with the following properties: 

```IGanttTask
    public interface IGanttTask
    {
        string Title { get; set; }
        DateTime Start { get; set; }
        DateTime End { get; set; }
        decimal PercentComplete { get; set; }
        int OrderId { get; set; }
        bool Summary { get; set; }
        bool Expanded { get; set; }
    }
```

```IGanttDependency
    public interface IGanttDependency
    {
        DependencyType Type { get; set; }
    }
```

## Key Considerations

When selecting a data binding approach for the Gantt, evaluate the following factors:

* **Performance**&mdash;Local binding offers faster initial rendering for smaller project schedules, while remote binding with enabled server operations provides better performance with large datasets through on-demand loading and server-side processing.
* **Data volume**&mdash;Local binding works well for small to medium-sized project schedules that can be loaded in memory, while large project schedules with numerous tasks and dependencies are better handled with remote binding and server-side filtering.
* **CRUD operations**&mdash;Remote binding enables full task management capabilities including creating, updating, and deleting tasks and dependencies, while local binding provides read-only project visualization.
* **Real-time collaboration**&mdash;Remote binding is essential for multi-user scenarios requiring live project updates, task progress tracking, and dependency changes from team members.
* **Security**&mdash;Remote binding provides better control over data access, user permissions, and project data validation compared to the local binding.

## See Also

* [Server-Side API of the Gantt HtmlHelper](/api/gantt)
{% if site.core %}
* [Server-Side API of the Gantt TagHelper](/api/taghelpers/gantt)
{% endif %}
