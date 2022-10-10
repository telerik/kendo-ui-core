---
title: Resources
page_title: Resources
description: "Get started with the Telerik UI for {{ site.framework }} TaskBoard and learn how to configure its resources."
slug: htmlhelpers_taskboard_aspnetcore_resources
position: 7
---

# Resources

A TaskBoard resource is optional metadata that can be associated with a card. The TaskBoard supports single instance and multiple instance resources.

## Single Instance Resources

A single instance resource is a resource of which only one instance can be assigned to a TaskBoard card, for example, a TaskBoard which displays tasks with different priority.  

The following example demonstrates how to use a single instance resource.

```HtmlHelper
    .Resources(r => r.Add()
        .Field("Priority")
        .DataColorField("Color")
        .DataTextField("Text")
        .DataValueField("Value")
        .BindTo(
            new List<Resource>()
            {
                new Resource { Color = "#ffa500", Text = "Urgent", Value = "urgent"},
                new Resource { Color = "#008000", Text = "High Priority", Value = "highpriority" },
                new Resource { Color = "#0000ff", Text = "Low Priority", Value = "lowpriority"}
            }
        )
    )
```
{% if site.core %}
```TagHelper
    @{
        var resources = new List<Resource>()
                {
                    new Resource { Color = "#ffa500", Text = "orange", Value = "orange"},
                    new Resource { Color = "#008000", Text = "green", Value = "green" },
                    new Resource { Color = "#0000ff", Text = "blue", Value = "blue"}
                };
    }

	<taskboard-resources>
	 	<resource datacolorfield="Color" datatextfield="Text" datavaluefield="Value" field="Priority" 
			 bind-to="resources">
	 	</resource>
	</taskboard-resources>

```
{% endif %}


In the example, each task can have a single priority, and the Priority field value in the card data associates it with the respective resource that has the same value.

For an example that demonstrates the use of resources in the TaskBoard, refer to [Local binding of the TaskBoard (Demo)](https://demos.telerik.com/{{ site.platform }}/taskboard/local-data-binding).

## Multiple Instance Resources

A multiple instance resource is a resource of which more than one instance can be assigned to a TaskBoard card, for example, a TaskBoard which displays a list of issues. 

The following example demonstrates how to use a multiple instance resource. 

```HtmlHelper
    .Resources(r => r.Add()
        .Field("Tags")
        .DataColorField("Color")
        .DataTextField("Text")
        .DataValueField("Value")
        .Multiple(true)
        .BindTo(
            new List<Resource>()
            {
                new Resource { Color = "gray", Text = "Bug", Value = "bug"},
                new Resource { Color = "orange", Text = "Feature", Value = "feature" },
                new Resource { Color = "blue", Text = "Client-side", Value = "client-side"},
                new Resource { Color = "green", Text = "Server-side", Value = "server-side"}
            }
        )
    )
```
{% if site.core %}
```TagHelper
    @{
        var resources = new List<Resource>()
                {
                    new Resource { Color = "gray", Text = "Bug", Value = "bug"},
                    new Resource { Color = "orange", Text = "Feature", Value = "feature" },
                    new Resource { Color = "blue", Text = "Client-side", Value = "client-side"},
                    new Resource { Color = "green", Text = "Server-side", Value = "server-side"}
                };
    }
                    
	<taskboard-resources>
	 	<resource datacolorfield="Color" datatextfield="Text" datavaluefield="Value" field="Tags" 
			multiple="true" bind-to="resources">
	 	</resource>
	</taskboard-resources>

```
{% endif %}

In the example, each issue can have different tags at the same time, for example, `bug`, `client-side`, `high severity`. The `Tags` field in the issues data should be a collection of different tags. Issues with tags that match the Value field of the resources will be associated with the respective resources.

## See Also

* [Local binding of the TaskBoard (Demo)](https://demos.telerik.com/{{ site.platform }}/taskboard/local-data-binding)
* [JavaScript API Reference of the Kendo UI TaskBoard](https://docs.telerik.com/kendo-ui/api/javascript/ui/taskboard)
