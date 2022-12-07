---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Badge component for {{ site.framework }}."
slug: overview_badgehelper_aspnetcore
position: 1
---

# {{ site.framework }} Badge Overview

{% if site.core %}
The Telerik UI Badge TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Badge widget.
{% else %}
The Telerik UI Badge HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Badge widget.
{% endif %}

The Badge is an absolutely positioned element that is used to decorate avatars, navigation menus, or other components in the application when the visual notification is needed.

It also provides customizing its content through templates, setting different types and layouts.

* [Demo page for the Badge HtmlHelper](https://demos.telerik.com/{{ site.platform }}/badge/index)
{% if site.core %}
* [Demo page for the Badge TagHelper](https://demos.telerik.com/aspnet-core/badge/tag_helper)
{% endif %}

## Initializing the Badge

The following example demonstrates how to define the Badge.

```HtmlHelper
    <a class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md">
        @(Html.Kendo().Badge()
            .Name("badge")
            .Text("42")
            .Rounded(Rounded.Small)
        )
    </a>
```
{% if site.core %}
```TagHelper
    <a class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md">
        <kendo-badge name="badge" 
                     text="42" 
                     rounded="Rounded.Small">
        </kendo-badge>
    </a>
```
{% endif %}

## Basic Configuration

The badge also provides the choice to be inline or overlay and set its type. To make the badge overlay add the `k-badge-overlay` class to the parent parent element.

```HtmlHelper
    <a class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-badge-overlay">
        @(Html.Kendo().Badge()
            .Name("badge")
            .Text("42")
            .ThemeColor(BadgeColor.Warning)
            .Rounded(Rounded.Large)
        )
    </a>
```
{% if site.core %}
```TagHelper
    <a class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-badge-overlay">
        <kendo-badge name="badge" 
                     text="42" 
                     theme-color="BadgeColor.Warning" 
                     rounded="Rounded.Large">
        </kendo-badge>
    </a>
```
{% endif %}

## Using templates

With the badge you can customize the content using templates.

```HtmlHelper
    <a class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-badge-overlay">
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
    <a class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-badge-overlay">
        <kendo-badge name="badge" 
                     text="42" 
                     rounded="Rounded.Full"
                     template="#= this._text > 10 ? '9+' : this._text #">
        </kendo-badge>
    </a>
```
{% endif %}

## Using as a label

You can integrate the Badge into other UI components. The following example demonstrates how to use it as a label in Grid client column templates.

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
```TagHelper.cshtml

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

## Referencing Existing Instances

You can access an existing Button instance by using the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method which gets executed by the jQuery object of the originating element. Once the reference is established, use the [Badge client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/badge#methods) to control its behavior.

```HtmlHelper
    <a class="k-button k-badge-overlay">
    @(Html.Kendo().Badge()
        .Name("badge")
        .Text("42")
        .Template("#= this._text > 10 ? '9+' : this._text #")
        .Rounded(Rounded.Large)
    </a>

    <script>
        var badge = $('#badge').data('kendoBadge');
    </script>
```
{% if site.core %}
```TagHelper
    <a class="k-button k-badge-overlay">
        <kendo-badge name="badge" 
                     text="42"
                     template="#= this._text > 10 ? '9+' : this._text #"
                     rounded="Rounded.Large">
        </kendo-badge>
    </a>

    <script>
        var badge = $('#badge').data('kendoBadge');
    </script>
```
{% endif %}
## See Also

* [Basic Usage of the Badge HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/badge/index)
{% if site.core %}
* [Basic Usage of the Badge TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/badge/tag_helper)
{% endif %}
* [Server-Side API](/api/badge)
