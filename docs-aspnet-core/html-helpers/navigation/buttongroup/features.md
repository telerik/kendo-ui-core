---
title: Features
page_title: ButtonGroup | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn how to use the basic features when working with the Kendo UI ButtonGroup HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_buttongroup_features_aspnetcore
position: 2
---

# Features
The examples below demonstate how to use the basic fearutes of the ButtonGroup

### Enable and Disable the ButtonGroup

To configure the ButtonGroup as initially disabled, use its `.Enable()` setting. The ButtonGroup can also be disabled or enabled at any time with JavaScript by using its `.Enable()` method with a Boolean argument.

For more information on the [`enable` method of the ButtonGroup](http://docs.telerik.com/kendo-ui/api/javascript/ui/buttongroup#methods-enable), refer to the [API of the ButtonGroup control](http://docs.telerik.com/kendo-ui/api/javascript/ui/buttongroup).

The following example demonstrates how to enable and disable the ButtonGroup over the `.Enable()` configuration.

#### Example

```

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

### Index

The initially selected index of the Kendo UI ButtonGroup can be configured by using its `index` property. You can select an index through the `select()` method with a Integer argument.

For more information on the [`index` setting of the ButtonGroup](http://docs.telerik.com/kendo-ui/api/javascript/ui/buttongroup#configuration-index), refer to the [API of the ButtonGroup control](http://docs.telerik.com/kendo-ui/api/javascript/ui/buttongroup).

The following example demonstrates how to select a button by its index.

#### Example

```

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

### Selection

You can restrict the number of Buttons that can be selected through its `.Selection()` property within the ButtonGroup. The property can be configured for a `single` or `multiple` selection.

For more information on the [`selection` setting of the ButtonGroup](http://docs.telerik.com/kendo-ui/api/javascript/ui/buttongroup#configuration-selection), refer to the [API of the ButtonGroup control](http://docs.telerik.com/kendo-ui/api/javascript/ui/buttongroup).

The following example demonstrates how to use the `.Selection()` configuration.

#### Example

```

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
