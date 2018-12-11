---
title: Overview
page_title: ButtonGroup | Telerik UI for ASP.NET MVC HtmlHelpers
description: "Get started with the server-side wrapper for the Kendo UI ButtonGroup widget for ASP.NET MVC."
slug: overview_buttongrouphelper_aspnetmvc
position: 1
---

# ButtonGroup HtmlHelper Overview

The ButtonGroup HtmlHelper extension is a server-side wrapper for the [Kendo UI ButtonGroup](https://demos.telerik.com/kendo-ui/buttongroup/index) widget.

Make sure you are familiar with the fundamental Kendo UI widget concepts and that the [Kendo UI MVC wrappers]({% slug overview_aspnetmvc %}) are set up correctly.

## Getting Started

### Initialization

The following example demonstrates how to initialize the ButtonGroup.

###### Example

```Razor

        @(Html.Kendo().ButtonGroup()
            .Name("select-period")
            .Items(t =>
                {
                        t.Add().Text("Month");
                        t.Add().Text("Quarter");
                        t.Add().Text("Year");
                }))
```
```ASPX

        <%= Html.Kendo().ButtonGroup()
            .Name("select-period")
            .Items(t =>
                {
                        t.Add().Text("Month");
                        t.Add().Text("Quarter");
                        t.Add().Text("Year");
                }) %>
```

## Icons

The ButtonGroup provides the `.Icon()` method for configuring icons.

###### Example

```Razor

         @(Html.Kendo().ButtonGroup()
            .Name("player")
            .Items(t =>
            {
                    t.Add().Icon("play");
                    t.Add().Icon("pause");
                    t.Add().Icon("stop");
            }))
```
```ASPX

        <%= Html.Kendo().ButtonGroup()
            .Name("player")
            .Items(t =>
            {
                    t.Add().Icon("play");
                    t.Add().Icon("pause");
                    t.Add().Icon("stop");
            }) %>
```

The previous configuration is expected to produce the HTML output from the following example.

###### Example

        <div class="k-button-group k-widget" data-role="buttongroup" id="player" role="group" tabindex="0">
            <span data-icon="play" aria-pressed="false" role="button" class="k-button k-button-icon">
                <span class="k-icon k-i-play"></span>
            </span>
            <span data-icon="pause" aria-pressed="false" role="button" class="k-button k-button-icon">
                <span class="k-icon k-i-pause"></span>
            </span>
            <span data-icon="stop" aria-pressed="false" role="button" class="k-button k-button-icon">
                <span class="k-icon k-i-stop"></span>
            </span>
        </div>

## Features

### Enable and Disable ButtonGroup

You can configure the ButtonGroup as initially disabled by using its `.Enable()` setting. The ButtonGroup can also be disabled or enabled at any time with JavaScript by using its `.Enable()` method with a Boolean argument.

For more information on the [`enable` method of the ButtonGroup](http://docs.telerik.com/kendo-ui/api/javascript/ui/buttongroup#methods-enable), refer to the [API of the ButtonGroup control](http://docs.telerik.com/kendo-ui/api/javascript/ui/buttongroup).

The following example demonstrates how to enable and disable the ButtonGroup over the `.Enable()` configuration.

###### Example

```Razor

        @(Html.Kendo().ButtonGroup()
            .Name("select-period")
            .Enable(false)
            .Items(t =>
                {
                        t.Add().Text("Month");
                        t.Add().Text("Quarter");
                        t.Add().Text("Year");
                }))
```
```ASPX

        <%= Html.Kendo().ButtonGroup()
            .Name("select-period")
            .Enable(false)
            .Items(t =>
                {
                        t.Add().Text("Month");
                        t.Add().Text("Quarter");
                        t.Add().Text("Year");
                }) %>
```

### Index

You can configure the initially selected index of the ButtonGroup by using its `index` property. An index can be selected through the `select()` method with a Integer argument.

For more information on the [`index` setting of the ButtonGroup](http://docs.telerik.com/kendo-ui/api/javascript/ui/buttongroup#configuration-index), refer to the [API of the ButtonGroup control](http://docs.telerik.com/kendo-ui/api/javascript/ui/buttongroup).

The following example demonstrates how to select a button by its index.

###### Example

```Razor

        @(Html.Kendo().ButtonGroup()
            .Name("select-period")
            .Index(1)
            .Items(t =>
                {
                        t.Add().Text("Month");
                        t.Add().Text("Quarter");
                        t.Add().Text("Year");
                }))
```
```ASPX

        <%= Html.Kendo().ButtonGroup()
            .Name("select-period")
            .Index(1)
            .Items(t =>
                {
                        t.Add().Text("Month");
                        t.Add().Text("Quarter");
                        t.Add().Text("Year");
                }) %>
```

### Selection

The ButtonGroup enables you to restrict the number of Buttons that can be selected through its `.Selection()` property. The property can be configured for a `single` or `multiple` selection.

For more information on the [`selection` setting of the ButtonGroup](http://docs.telerik.com/kendo-ui/api/javascript/ui/buttongroup#configuration-selection), refer to the [API of the ButtonGroup control](http://docs.telerik.com/kendo-ui/api/javascript/ui/buttongroup).

The following example demonstrates how to use `.Selection()`.

###### Example

```Razor

        @(Html.Kendo().ButtonGroup()
            .Name("select-period")
            .Selection("multiple")
            .Items(t =>
                {
                        t.Add().Text("Month");
                        t.Add().Text("Quarter");
                        t.Add().Text("Year");
                }))
```
```ASPX

        <%= Html.Kendo().ButtonGroup()
            .Name("select-period")
            .Selection("multiple")
            .Items(t =>
                {
                        t.Add().Text("Month");
                        t.Add().Text("Quarter");
                        t.Add().Text("Year");
                }) %>
```

## Reference

### Existing Instances

For more information on how to access an instance, refer to the [introductory article on the ButtonGroup](http://docs.telerik.com/kendo-ui/controls/navigation/buttongroup/overview).

## See Also

* [Telerik UI for ASP.NET MVC API Reference: ButtonGroupBuilder](/api/Kendo.Mvc.UI.Fluent/ButtonGroupBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI ButtonGroup Widget](http://docs.telerik.com/kendo-ui/controls/navigation/buttongroup/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
