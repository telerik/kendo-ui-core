---
title: Default State
page_title: ExpansionPanel Default State
description: "Learn how to enable and use the default state functionality of the Telerik UI ExpansionPanel component for {{ site.framework }}"
slug: state_htmlhelpers_expansionpanel_aspnetcore
position: 2
---

# ExpansionPanel Default State

You can configure the default state of the Telerik UI ExpansionPanel for {{ site.framework }} by using the `Disabled`, `Expanded`, `Toggleable` and `Animation` properties.

## ExpansionPanel Disabled State

You can disable the Kendo UI ExpansionPanel component and make the user unable to expand or collapse the panel. To configure this state, set the [`Disabled`](/api/Kendo.Mvc.UI.Fluent/ExpansionPanelBuilder#disabledsystemboolean) property to `true`.

```HtmlHelper
    @(Html.Kendo().ExpansionPanel()
            .Name("brazil")
            .Title("Brazil")
            .SubTitle("South America")
            .Disabled(true)
            .Content("The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology 'red like an ember', formed from brasa ('ember') and the suffix -il (from -iculum or -ilium).")
    )
```
{% if site.core %}
```TagHelper
    <kendo-expansionpanel name="brazil" title="Brazil" sub-title="South America" disabled="true">
        <content>
            The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology 'red like an ember', formed from brasa ('ember') and the suffix -il (from -iculum or -ilium).
        </content>
    </kendo-expansionpanel>
```
{% endif %}

## ExpansionPanel Expanded State

The Kendo UI ExpansionPanel component can be expanded by default. To configure this state, set the [`Expanded`](/api/Kendo.Mvc.UI.Fluent/ExpansionPanelBuilder#expandedsystemboolean) property to `true`.

```HtmlHelper
    @(Html.Kendo().ExpansionPanel()
                .Name("brazil")
                .Title("Brazil")
                .SubTitle("South America")
                .Expanded(true)
                .Content("The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology 'red like an ember', formed from brasa ('ember') and the suffix -il (from -iculum or -ilium).")
    )
```
{% if site.core %}
```TagHelper
    <kendo-expansionpanel name="brazil" title="Brazil" sub-title="South America" expanded="true">
        <content>
            The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology 'red like an ember', formed from brasa ('ember') and the suffix -il (from -iculum or -ilium).
        </content>
    </kendo-expansionpanel>
```
{% endif %}

## ExpansionPanel Toggleable State

By default, the user can expand or collapse the ExpansionPanel. To prevent this, set the [`Toggleable`](/Kendo.Mvc.UI.Fluent/ExpansionPanelBuilder#toggleablesystemboolean) property to `false`.

```HtmlHelper
    @(Html.Kendo().ExpansionPanel()
            .Name("brazil")
            .Title("Brazil")
            .SubTitle("South America")
            .Toggleable(false)
            .Content("The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology 'red like an ember', formed from brasa ('ember') and the suffix -il (from -iculum or -ilium).")
    )
```
{% if site.core %}
```TagHelper
    <kendo-expansionpanel name="brazil" title="Brazil" sub-title="South America" toggleable="false">
        <content>
            The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology 'red like an ember', formed from brasa ('ember') and the suffix -il (from -iculum or -ilium).
        </content>
    </kendo-expansionpanel>
```
{% endif %}

## ExpansionPanel Animation State

You can disable the ExpansionPanel visual animations that appear when the user expands or collapses the panel. To disable the animations, set the [`Animation`](/api/Kendo.Mvc.UI.Fluent/ExpansionPanelBuilder#animationsystemboolean) property to `false`.

```HtmlHelper
    @(Html.Kendo().ExpansionPanel()
            .Name("brazil")
            .Title("Brazil")
            .SubTitle("South America")
            .Animation(false)
            .Content("The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology 'red like an ember', formed from brasa ('ember') and the suffix -il (from -iculum or -ilium).")
    )
```
{% if site.core %}
```TagHelper
    <kendo-expansionpanel name="brazil" title="Brazil" sub-title="South America" animation="false">
        <content>
            The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology 'red like an ember', formed from brasa ('ember') and the suffix -il (from -iculum or -ilium).
        </content>
    </kendo-expansionpanel>
```
{% endif %}

## See Also

* [Overview of the ExpansionPanel (Demo)](https://demos.telerik.com/{{ site.platform }}/expansionpanel/index)
* [Client-side API Reference of the TileLayout](/api/expansionpanel)
* [Keyboard Navigation]({% slug keynav_htmlhelpers_expansionpanel_aspnetcore %})
