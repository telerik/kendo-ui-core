---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ExpansionPanel component for {{ site.framework }}."
slug: htmlhelpers_expansionpanel_aspnetcore
position: 0
---

# ExpansionPanel Overview

{% if site.core %}
The Telerik UI ExpansionPanel TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI ExpansionPanel widget.
{% else %}
The Telerik UI ExpansionPanel HtmlHelper is a server-side wrapper for the [Kendo UI ExpansionPanel](/api/javascript/ui/expansionpanel) widget.
{% endif %}

The ExpansionPanel is a layout component that allows the user to expand and collapse a content area within the application.

* [Demo page for the ExpansionPanel HtmlHelper](https://demos.telerik.com/{{ site.platform }}/expansionpanel/index)
{% if site.core %}
* [Demo page for the ExpansionPanel TagHelper](https://demos.telerik.com/aspnet-core/expansionpanel/tag-helper)
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

## Basic Configuration

The following example showcases a basic configuration of the ExpansionPanel with specified visual animations used when the user expands or collapses the component.

```HtmlHelper
    @(Html.Kendo().ExpansionPanel()
        .Name("brazil")
        .Title("Brazil")
        .SubTitle("South America")
        .Expanded(true)
        .Animation(animation =>
        {
            animation.Expand(expand => expand.Effects("expandVertical fadeIn").Duration(500));
            animation.Collapse(collapse => collapse.Effects("fadeOut").Duration(1000));
        })
        .Content("The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology 'red like an ember', formed from brasa ('ember') and the suffix -il (from -iculum or -ilium). As brazilwood produces a deep red dye, it was highly valued by the European textile industry and was the earliest commercially exploited product from Brazil.")
     )
```
{% if site.core %}
```TagHelper
	<kendo-expansionpanel name="brazil" title="Brazil" sub-title="South America" expanded="true">
        <animation>
            <collapse enabled="true" effects="fadeOut" duration="1000"/>
            <expand enabled="true" effects="expandVertical fadeIn" duration="500"/>
        </animation>
        <content>
            The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology 'red like an ember', formed from brasa ('ember') and the suffix -il (from -iculum or -ilium). As brazilwood produces a deep red dye, it was highly valued by the European textile industry and was the earliest commercially exploited product from Brazil.
        </content>
    </kendo-expansionpanel>
```
{% endif %}

## Functionality and Features

* [Default State]({% slug state_htmlhelpers_expansionpanel_aspnetcore %})&mdash;The ExpansionPanel supports various states.
* [Events]({% slug events_expansionpanel %})&mdash;The component exposes the `Expand()`, `Collapse()` and `Complete()` events that allow you to control its behavior.
* [Keyboard Navigation]({% slug keynav_htmlhelpers_expansionpanel_aspnetcore %})&mdash;You can navigate through the ExpansionPanel elements with the keyboard. 

## Next Steps

* [Getting Started with the ExpansionPanel]({% slug expansionpanel_getting_started %})
* [Basic Usage of the ExpansionPanel HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/expansionpanel/index)
{% if site.core %}
* [Basic Usage of the ExpansionPanel TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/expansionpanel/tag-helper)
{% endif %}

## See Also

* [Using the API of the ExpansionPanel for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/expansionpanel/api)
* [Knowledge Base Section](/knowledge-base)
