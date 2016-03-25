---
title: Known Issues
page_title: Known Issues | Telerik UI for ASP.NET Core MVC
description: "Read about known issues when using Telerik UI for ASP.NET MVC in ASP.NET 5 and ASP.NET Core MVC."
previous_url: /aspnet-mvc/mvc-6/known-issues
slug: knownissues_aspnetmvc6_aspnetmvc
position: 5
---

# Known Issues

This articles summarizes all known issues related to Telerik UI for ASP.NET MVC, version 6.

> **Important**
>
> The ASP.NET 5 Framework is still actively being developed. Tooling and APIs change frequently, often requiring extensive changes.

## ASP.NET Core MVC Framework

- Data Tables are not supported. For more information on this limitation, refer to [dotnet/corefx#1039](https://github.com/dotnet/corefx/issues/1039).
- Localization resources are not supported. For more information on this limitation, refer to [dotnet/coreclr#2007](https://github.com/dotnet/coreclr/issues/2007).

## HtmlHelpers

### Common Issues

- Limited set of helpers. Interim releases will add more widgets.
- Localization is a work in progress.For a discussion, refer to [aspnet/Home/issues/1124](https://github.com/aspnet/Home/issues/1142).
- [`Deferred()`](/aspnet-mvc/fundamentals.html#deferred-initialization) can be invoked only as a last setting.

###### Example

        @(Html.Kendo().NumericTextBox()
              .Name("age")
              /*other configuration..*/
              .Deferred()
        )

### Grid

- Server-side rendering is not supported. The Toolbar template, Column Header template, and Column Template are no longer rendered on the server.

### Chart

- `ChartAreaStyle` enum is now by `ChartLineStyle`.

### MultiSelect

- `TagMode` enum is now by `MultiSelectTagMode`.

## See Also

Other articles on Telerik UI for ASP.NET MVC in ASP.NET Core MVC applications:

* [Overview of Telerik UI for ASP.NET Core MVC - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core MVC Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core MVC Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Tag Helpers for ASP.NET Core MVC]({% slug taghelpers_aspnetmvc6_aspnetmvc %})
