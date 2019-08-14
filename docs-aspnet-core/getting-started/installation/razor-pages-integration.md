---
title: Razor Pages Integration
page_title: Razor Pages Integration with Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET Core | Telerik UI for ASP.NET Core
description: "Razor Pages Integration with Progress Telerik UI for ASP.NET Core (aka MVC 6 or ASP.NET Core MVC)."
previous_url: /getting-started/razor-pages-integration
slug: razor_pages_integration_aspnetmvc6_aspnetmvc
position: 9
---

# Razor Pages Integration

All Telerik UI for ASP.NET Core components are compatible with the ASP.NET Razor Pages framework.

## Scaffolding Templates

You can scaffold a Razor Pages sample which contains an ASP.NET Core Grid with enabled CRUD operations by using the Telerik UI Create New Project Wizard. To get started with the Wizard, refer to the article on [creating projects]({% slug newprojectwizards_visualstudio_aspnetcore %}).

## Sample Applications

The sample Razor Pages samples which demonstrate the usage of the Telerik UI for ASP.NET Core components are located in the [ASP.NET Core Examples](https://github.com/telerik/ui-for-aspnet-core-examples) repository on GitHub.

## Known Limitations

Razor Pages use `Page` in their routing mechanism which interferes with `GET` requests made by the Kendo UI DataSource. As a result, only `POST` requests should be used when paging is required.

## See Also

* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Mac (Online Guide)]({% slug gettingstarted_firststeps_vsmac %})
* [First Steps with CLI (Online Guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
