---
title: Default State
page_title: Kendo UI for jQuery ExpansionPanel Documentation | ExpansionPanel Default State
description: "Learn how to enable and use the default state functionality of the Kendo UI for jQuery ExpansionPanel."
slug: state_kendoui_expansionpanel_widget
position: 2
---

# ExpansionPanel Default State

You can configure the default state of The Kendo UI for jQuery ExpansionPanel widget by using the `disabled`, `expanded`, `toggleable` and `animation` properties.

## ExpansionPanel Disabled State

You can disable the Kendo UI ExpansionPanel component and make the user unable to expand or collapse the panel. To configure this state, set the [`disabled`](/api/javascript/ui/expansionpanel/configuration/disabled) property to `true`.

```dojo
<div id="brazil">
            The word "Brazil" likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology "red like an ember", formed from brasa ("ember") and the suffix -il (from -iculum or -ilium). As brazilwood produces a deep red dye, it was highly valued by the European textile industry and was the earliest commercially exploited product from Brazil.
        </div>

    <script>
        $('#brazil').kendoExpansionPanel({
            title: 'Brazil',
            subTitle: 'South America',
            disabled: true
        });
    </script>
```

## ExpansionPanel Expanded State

The Kendo UI ExpansionPanel widget can be expanded by default. To configure this state, set the [`expanded`](/api/javascript/ui/expansionpanel/configuration/expanded) property to `true`.

```dojo
<div id="brazil">
            ...
        </div>

    <script>
        $('#brazil').kendoExpansionPanel({
            title: 'Brazil',
            subTitle: 'South America',
            expanded: true
        });
    </script>
```

## ExpansionPanel Toggleable State

By default, the user can expand or collapse the ExpansionPanel widget. To prevent this, set the [`toggleable `](/api/javascript/ui/expansionpanel/configuration/toggleable) property to `false`.


```dojo
<div id="brazil">
            ...
        </div>

    <script>
        $('#brazil').kendoExpansionPanel({
            title: 'Brazil',
            subTitle: 'South America',
            toggleable: false
        });
    </script>
```

## ExpansionPanel Animation State

You can disable the ExpansionPanel visual animations that appear when the user expands or collapses the panel. To disable the animations, set the [`animation `](/api/javascript/ui/expansionpanel/configuration/animation) property to `false`.

```dojo
<div id="brazil">
            ...
        </div>

    <script>
        $('#brazil').kendoExpansionPanel({
            title: 'Brazil',
            subTitle: 'South America',
            animation: false
        });
    </script>
```

## See Also

* [Overview of the ExpansionPanel (Demo)](https://demos.telerik.com/kendo-ui/expansionpanel/index)
* [JavaScript API Reference of the TileLayout](/api/javascript/ui/expansionpanel)
* [Keyboard navigation]({% slug keynav_kendoui_expansionpanel_widget %})
