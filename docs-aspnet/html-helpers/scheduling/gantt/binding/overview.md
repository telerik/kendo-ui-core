---
title: Overview
page_title: Data Binding
description: "Learn the basics approaches for binding the Telerik UI Gantt component for {{ site.framework }}."
previous_url: /helpers/scheduling/gantt/server-binding, /helpers/scheduling/gantt/binding
slug: htmlhelpers_gantt_databinding
position: 0
---

# Data Binding

The Gantt provides a set of options for binding it to data.

{% if site.has_cta_panels == true %}
{% include cta-panel-introduction.html %}
{% endif %}

The supported data-binding approaches are:

* [Ajax binding]({% slug htmlhelpers_gantt_ajaxbinding_aspnetcore %})
* [Server binding]({% slug htmlhelpers_gantt_serverbinding_aspnetcore %})
{% if site.core %}
* [Razor Pages binding]({% slug htmlhelpers_gantt_razorpage_aspnetcore %})
{% endif %}

## Model Requirements

The model that binds to the Gantt extends the `IGanttTask` and the `IGanttDependency` interfaces, whith the following properties: 

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

## See Also

* [Server-Side API](/api/gantt)
{% if site.core %}
* [Server-Side TagHelper API](/api/taghelpers/gantt)
{% endif %}
