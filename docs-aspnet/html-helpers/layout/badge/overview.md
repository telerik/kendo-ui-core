---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Badge HtmlHelper for {{ site.framework }}."
slug: overview_badgehelper_aspnetcore
position: 1
---

# Badge Overview

The Badge is an absolutely positioned element that is used to decorate avatars, navigation menus, or other components in the application when the visual notification is needed.

It also provides customizing its content through templates, setting different types and layouts.

* [Demo page for the Badge](https://demos.telerik.com/{{ site.platform }}/badge/index)

## Initializing the Badge

The following example demonstrates how to define the Badge by using the Badge HtmlHelper.


        <a class="k-button">
            @(Html.Kendo().Badge()
                .Name("badge")
                .Text("42")
                .Shape(BadgeShape.Rectangle)
            )
        </a>

## Basic Configuration

The badge also provides the choice to be inline or overlay and set its type. To make the badge overlay add the `k-badge-overlay` class to the parent parent element.

        <a class="k-button k-badge-overlay">
            @(Html.Kendo().Badge()
                .Name("badge")
                .Text("42")
                .ThemeColor(BadgeColor.Warning)
                .Shape(BadgeShape.Rounded)
            )
        </a>

## Using templates

With the badge you can customize the content using templates.

        <a class="k-button k-badge-overlay">
            @(Html.Kendo().Badge()
                .Name("badge")
                .Text("120")
                .Template("#= +this._text > 100 ? 'a lot' : this._text #")
                .Shape(BadgeShape.Rectangle)
            )
        </a>

## Using as a label

You can integrate the Badge into other UI components. The following example demonstrates how to use it as a label in Grid client column templates.

```C#
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
```JavaScript
    function initBadges(e) {
        $(".templateCell").each(function(){
            eval($(this).children("script").last().html());
        });
    }
```

## Referencing Existing Instances

You can access an existing Button instance by using the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method which gets executed by the jQuery object of the originating element. Once the reference is established, use the [Badge client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/badge#methods) to control its behavior.

        <a class="k-button k-badge-overlay">
            @(Html.Kendo().Badge()
                .Name("badge")
                .Text("42")
                .TemplateId("badge-template")
                .Shape(BadgeShape.Pill)
            )
        </a>

        <script type="text/x-kendo-template" id="badge-template">
            # var badgeText = this.options.text;#
            #if(badgeText > 100){#
                100+
            #}else{#
                #=badgeText#
            #}#
        </script>
    
        <script>
            var badge = $('#badge').data('kendoBadge');
        </script>

## See Also

* [Basic Usage of the Badge HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/badge/index)
* [Server-Side API](/api/badge)
