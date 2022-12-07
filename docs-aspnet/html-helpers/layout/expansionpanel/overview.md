---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ExpansionPanel component for {{ site.framework }}."
slug: htmlhelpers_expansionpanel_aspnetcore
position: 1
---

# {{ site.framework }} ExpansionPanel Overview

{% if site.core %}
The Telerik UI ExpansionPanel TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI ExpansionPanel widget.
{% else %}
The Telerik UI ExpansionPanel HtmlHelper is a server-side wrapper for the [Kendo UI ExpansionPanel](/api/javascript/ui/expansionpanel) widget.
{% endif %}

The Telerik UI ExpansionPanel HtmlHelper for {{ site.framework }} is a layout component that provides the user with an easy way to expand and collapse a content area within the application.

* [Demo page for the ExpansionPanel HtmlHelper](https://demos.telerik.com/{{ site.platform }}/expansionpanel/index)
{% if site.core %}
* [Demo page for the ExpansionPanel TagHelper](https://demos.telerik.com/aspnet-core/expanionpanel/tag-helper)
{% endif %}

## Initializing the ExpansionPanel

The following example demonstrates how to define the ExpansionPanel.

```HtmlHelper
    @(Html.Kendo().ExpansionPanel()
            .Name("brazil")
            .Title("Brazil")
            .SubTitle("South America")
            .Expanded(true)
            .Content("The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology 'red like an ember', formed from brasa ('ember') and the suffix -il (from -iculum or -ilium). As brazilwood produces a deep red dye, it was highly valued by the European textile industry and was the earliest commercially exploited product from Brazil.")
     )
```
{% if site.core %}
```TagHelper
	<kendo-expansionpanel name="brazil" title="Brazil" sub-title="South America" expanded="true">
        <content>
            The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology 'red like an ember', formed from brasa ('ember') and the suffix -il (from -iculum or -ilium). As brazilwood produces a deep red dye, it was highly valued by the European textile industry and was the earliest commercially exploited product from Brazil.
        </content>
    </kendo-expansionpanel>
```
{% endif %}

## Referencing Existing Instances

The following example demonstrates how to get an instance of the ExpansionPanel.

```HtmlHelper
    @(Html.Kendo().ExpansionPanel()
            .Name("brazil")
            .Title("Brazil")
            .SubTitle("South America")
            .Expanded(true)
            .Content("The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology 'red like an ember', formed from brasa ('ember') and the suffix -il (from -iculum or -ilium). As brazilwood produces a deep red dye, it was highly valued by the European textile industry and was the earliest commercially exploited product from Brazil.")
    )

    <script type="text/javascript">
        $(function () {
            // The Name() of the ExpansionPanel is used to get its client-side instance.
            var expansionPanel = $("#brazil").data("kendoExpansionPanel");
            console.log(expansionPanel);
        });
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-expansionpanel name="brazil" title="Brazil" sub-title="South America" expanded="true">
        <content>
            The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology 'red like an ember', formed from brasa ('ember') and the suffix -il (from -iculum or -ilium). As brazilwood produces a deep red dye, it was highly valued by the European textile industry and was the earliest commercially exploited product from Brazil.
        </content>
    </kendo-expansionpanel>

    <script type="text/javascript">
        $(function () {
            // The Name() of the ExpansionPanel is used to get its client-side instance.
            var expansionPanel = $("#brazil").data("kendoExpansionPanel");
            console.log(expansionPanel);
        });
    </script>
```
{% endif %}

## Functionality and Features

* [Default State]({% slug state_htmlhelpers_expansionpanel_aspnetcore %})
* [Keyboard Navigation]({% slug keynav_htmlhelpers_expansionpanel_aspnetcore %})



## Event Handling

The below example demonstrates how the the `Expand`, `Collapse` and `Complete` events of the ExpansionPanel can be intercepted to output messages in the console when these events are raised. They can also be hooked for customizations or to execute custom logic, if necessary.

```HtmlHelper
    @(Html.Kendo().ExpansionPanel()
            .Name("brazil")
            .Title("Brazil")
            .SubTitle("South America")
            .Expanded(true)
            .Events(e => {
                e.Collapse("onCollapse");
                e.Complete("onComplete");
                e.Expand("onExpand")
            })
            .Content("The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology 'red like an ember', formed from brasa ('ember') and the suffix -il (from -iculum or -ilium). As brazilwood produces a deep red dye, it was highly valued by the European textile industry and was the earliest commercially exploited product from Brazil.")
     )
     
     <script>
        function onExpand() {
            console.log("Expand");
        };
        function onCollapse() {
             console.log("Collapse");
        };
        function onComplete() {
            console.log("Complete");
        };
    </script>
```

{% if site.core %}
```TagHelper
	<kendo-expansionpanel name="brazil" title="Brazil" sub-title="South America" expanded="true" on-expand="onExpand" on-collapse="onCollapse" on-complete="onComplete">
        <content>
            The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology 'red like an ember', formed from brasa ('ember') and the suffix -il (from -iculum or -ilium). As brazilwood produces a deep red dye, it was highly valued by the European textile industry and was the earliest commercially exploited product from Brazil.
        </content>
    </kendo-expansionpanel>

    <script>
        function onExpand() {
            console.log("Expand");
        };
        function onCollapse() {
             console.log("Collapse");
        };
        function onComplete() {
            console.log("Complete");
        };
    </script>
```
{% endif %}

## See Also

* [Basic Usage of the ExpansionPanel HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/expansionpanel)
{% if site.core %}
* [Basic Usage of the ExpansionPanel TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/expansionpanel/tag-helper)
{% endif %}
* [Using the API of the ExpansionPanel HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/expansionpanel/api)
* [Server-Side API](/api/expansionpanel)
