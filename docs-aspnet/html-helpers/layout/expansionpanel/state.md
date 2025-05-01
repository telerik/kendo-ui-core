---
title: Default State
page_title: Default State
description: "Learn how to enable and use the default state functionality of the Telerik UI ExpansionPanel component for {{ site.framework }}"
slug: state_htmlhelpers_expansionpanel_aspnetcore
position: 2
---

# Default State

You can configure a default state of the Telerik UI ExpansionPanel for {{ site.framework }} by using the `Disabled`, `Expanded`, `Toggleable` and `Animation` properties.

## Disabled State

To disable the component and prevent the user to expand or collapse the panel, set the [`Disabled`](/api/kendo.mvc.ui.fluent/expansionpanelbuilder#disabledsystemboolean) property to `true`.

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

## Expanded State

The ExpansionPanel can be rendered in an expanded state by default. To configure this state, set the [`Expanded`](/api/kendo.mvc.ui.fluent/expansionpanelbuilder#expandedsystemboolean) property to `true`.

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

## Toggleable State

By default, the user can expand or collapse the ExpansionPanel. To prevent this behavior, set the [`Toggleable`](/api/kendo.mvc.ui.fluent/expansionpanelbuilder#toggleablesystemboolean) property to `false`.

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

## Animation State

You can disable the ExpansionPanel visual animations that appear when the user expands or collapses the panel by setting the [`Animation`](/api/kendo.mvc.ui.fluent/expansionpanelbuilder#animationsystemboolean) option to `false`.

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

* [ExpansionPanel Server-Side API for {{ site.framework}}](/api/expansionpanel)
* [ExpansionPanel Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/expansionpanel)
