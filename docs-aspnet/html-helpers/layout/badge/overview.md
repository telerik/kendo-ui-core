---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Badge component for {{ site.framework }}."
components: ["badge"]
slug: overview_badgehelper_aspnetcore
position: 0
---

# {{ site.framework }} Badge Overview

{% if site.core %}
The Telerik UI Badge TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Badge widget.
{% else %}
The Telerik UI Badge HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Badge widget.
{% endif %}

The Badge is an absolutely positioned element that is used to decorate buttons, navigation menus, or other components in the application when the visual notification is needed.

The component allows you to customize its content through templates, to control its appearance and rendering by setting different sizes, colors, and more.

* [Demo page for the Badge HtmlHelper](https://demos.telerik.com/{{ site.platform }}/badge/index)
{% if site.core %}
* [Demo page for the Badge TagHelper](https://demos.telerik.com/aspnet-core/badge/tag_helper)
{% endif %}

## Initializing the Badge

The following example demonstrates how to define a Badge.

```HtmlHelper
    <a class="k-button">
        @(Html.Kendo().Badge()
            .Name("badge")
            .Text("42")
        )
    </a>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <a class="k-button">
        <kendo-badge name="badge" text="42">
        </kendo-badge>
    </a>
```
{% endif %}

## Basic Configuration

The Badge provides a variety of options for positioning and alignment. The following example shows how to render the Badge outside at the top right corner of the parent container.

```HtmlHelper
    <span class='k-icon k-i-envelop'>
        @(Html.Kendo().Badge()
            .Name("badge")
            .Text("+2")
            .ThemeColor(BadgeColor.Primary)
            .Position(BadgePosition.Outside)
            .Align(BadgeAlign.TopEnd)
            .Rounded(Rounded.Full)
            .Size(BadgeSize.Medium)
        )
    </span>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <span class='k-icon k-i-envelop'>
        <kendo-badge name="badge"
            text="+2"
            theme-color="BadgeColor.Primary"
            position="BadgePosition.Outside"
            align="BadgeAlign.TopEnd"
            rounded="Rounded.Full"
            size="BadgeSize.Medium">
        </kendo-badge>
    </span>
```
{% endif %}

## Using a Template

You can customize the Badge content through the `Template()` method. This feature is useful when the Badge content depends on a specific condition, such as user permissions, the value of a global variable, or today's date.

```HtmlHelper
    <a class="k-button">
        @(Html.Kendo().Badge()
            .Name("badge")
            .Text("42")
            .Template("#= this._text > 10 ? '9+' : this._text #")
            .Rounded(Rounded.Full)
        )
    </a>
```
{% if site.core %}
```TagHelper
    <a class="k-button">
        <kendo-badge name="badge"
            text="42"
            rounded="Rounded.Full"
            template="#= this._text > 10 ? '9+' : this._text #">
        </kendo-badge>
    </a>
```
{% endif %}

## Using Badge as a Label

You can integrate the Badge into other UI components. The following example demonstrates how to use it as a label in the [Grid client column templates]({% slug htmlhelper_grid_template_columns%}).

```HtmlHelper
    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .Columns(columns => {
            columns.Bound("OrderID").HtmlAttributes(new { @class = "templateCell" }).ClientTemplateId("orderTemplate");
        })
        .Events(ev => ev.DataBound("initBadges"))
        .DataSource(dataSource => dataSource
          .Ajax()
          .Read(read => read.Action("Orders_Read", "Grid"))
       )
    )

    <script type="kendo-template" id="orderTemplate">
        #if(OrderID <= 10){#
            @(Html.Kendo().Badge()
                .Name("flag#=OrderID#")
                .ThemeColor(BadgeColor.Success)
                .Text("New")
                .ToClientTemplate()
            )
        #}#
        #if(OrderID > 10){#
            @(Html.Kendo().Badge()
                .Name("flag#=OrderID#")
                .ThemeColor(BadgeColor.Error)
                .Text("Old")
                .ToClientTemplate()
            )
        #}#
    </script>
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .Columns(columns => {
            columns.Bound("OrderID").HtmlAttributes(new { @class = "templateCell" }).ClientTemplateId("orderTemplate");
        })
        .Events(ev => ev.DataBound("initBadges"))
        .DataSource(dataSource => dataSource
          .Ajax()
          .Read(read => read.Action("Orders_Read", "Grid"))
       )
    )

    <script type="text/html" id="orderTemplate">
        #if(OrderID <= 10){#
            <kendo-badge name="flag#=OrderID#"
                         theme-color="BadgeColor.Success"
                         text="New"
                         is-in-client-template="true">
            </kendo-badge>
        #}#
        #if(OrderID > 10){#
            <kendo-badge name="flag#=OrderID#"
                         theme-color="BadgeColor.Error"
                         text="Old"
                         is-in-client-template="true">
            </kendo-badge>
        #}#
    </script>
```
{% endif %}
```JavaScript
    function initBadges(e) {
        $(".templateCell").each(function(){
            eval($(this).children("script").last().html());
        });
    }
```

## Functionality and Features

* [Appearance]({% slug appearance_badge_aspnetcore %})&mdash;Use different configuration settings that control the styling of the component.

## Next Steps

* [Getting Started with the Badge]({% slug badge_getting_started %})
* [Basic Usage of the Badge HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/badge/index)
{% if site.core %}
* [Basic Usage of the Badge TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/badge/tag-helper)
{% endif %}

## See Also

* [Knowledge Base Section](/knowledge-base)