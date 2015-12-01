---
title: Known Issues
page_title: Known issues when using Telerik UI for ASP.NET MVC in ASP.NET 5 and MVC 6
description: Known issues when using Telerik UI for ASP.NET MVC in ASP.NET 5 and MVC 6
position: 100
---

# Known Issues

This page contains a summary of all known issues with the Telerik UI for ASP.NET MVC version 6.
Come back often for updates.

> The ASP.NET 5 Framework is still actively developed. Tooling and APIs change frequently, often requiring extensive changes.

## ASP.NET 5 / MVC 6 Framework

- Data Tables are not supported. See [dotnet/corefx#1039](https://github.com/dotnet/corefx/issues/1039)
- Localization resources are not supported. See [dotnet/coreclr#2007](https://github.com/dotnet/coreclr/issues/2007).

## UI Helpers

### Common

- Limited set of helpers. Interim releases will add more widgets.
- Localization is work in progress. See [aspnet/Home/issues/1124](https://github.com/aspnet/Home/issues/1142) for a discussion.
- [Deferred()](/aspnet-mvc/fundamentals.html#deferred-initialization) can be invoked only as a last setting.

        @(Html.Kendo().NumericTextBox()
              .Name("age")
              /*other configuration..*/
              .Deferred()
        )


### Grid

- Server-side rendering is not supported

### Chart

- `ChartAreaStyle` enum is now by `ChartLineStyle`
