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
- Localization resources are not supported. See [dotnet/corefx#947](https://github.com/dotnet/corefx/issues/947).

## UI Helpers

### Common

- Limited set of helpers. Interim releases will add more widgets.

### Grid

- Server-side rendering is not supported
- Column HTML attributes are not escaped. HttpEncoder is not available in MVC Beta 3.
  See [aspnet/Mvc#72](https://github.com/aspnet/HttpAbstractions/issues/72)

### Chart

- `ChartAreaStyle` enum is now by `ChartLineStyle`
