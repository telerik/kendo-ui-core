---
title: Wrappers vs Widgets
page_title: Wrappers vs Widgets | Telerik UI for ASP.NET MVC
description: "Compare the HTML- and JavaScript-based Kendo UI widgets and their ASP.NET MVC wrappers."
slug: wrappersvswidgets_aspnetmvc
previous_url: /kendo-ui-vs-mvc-wrappers
position: 10
---

# Wrappers vs Widgets

From a client-side point of view, the vanilla HTML/JavaScript Kendo UI widgets and their ASP.NET MVC wrappers (UI helpers) represent the same thing and provide the same capabilities.

However, before choosing one product over another, you need to consider existing implementation specifications.

## List of Pros and Cons

### Telerik UI for ASP.NET MVC Wrappers

The UI for ASP.NET MVC helpers (Kendo UI MVC wrappers) provide the following benefits:

* They enable you to create widgets with no HTML and JavaScript coding. JavaScript knowledge is still required if you want to apply client-side methods and events.
* They provide for [server-side data binding]({% slug serverbinding_grid_aspnetmvc %}) and in some cases, server-side rendering.
* You can use the [`ToDataSourceResult`]({% slug ajaxbinding_grid_aspnetmvc %}) extension method to bind Kendo UI widgets to server-side collections, and
perform data operations such as paging, sorting, filtering, and grouping.
* They provide integration with some ASP.NET MVC features such as [security trimming]({% slug overview_menu_aspnetmvc %}), [localization with resource files]({% slug localization_aspnetmvc %}), or [editor templates]({% slug editortemplates_grid_aspnetmvc %}).
* They support unobtrusive validation based on Data Annotation attributes.
* Implementing CRUD operations is simple. The support for CRUD data operations requires less coding as compared to when the client-side Kendo UI is used. In the latter case, you have to repeat the model and data field configuration in the JavaScript code.
* The Visual Studio IntelliSense is available for the server-side configuration syntax.
* They enable [Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %}) for automatic creation of new Kendo UI ASP.NET MVC applications, or adding Kendo UI to existing projects, or automatic updating of the Kendo UI version.
* You are able to use [scaffolding]({% slug scaffolding_aspnetmvc %}) to generate widget declarations and related controller action methods.

### Kendo UI Widgets

The vanilla HTML/JavaScript Kendo UI widgets (Kendo UI Professional) provide the following benefits:

* They allow for a complete server-platform independence. The widgets can be used with any web server and server framework&mdash;including ASP.NET MVC. For example, you can build Single Page Applications with any RESTful backend.
* They provide full control over the placement of the initialization scripts&mdash;server wrappers render the widgets' initialization scripts right after the widget's HTML output. Even if you use [deferred initialization]({% slug fundamentals_aspnetmvc %}), the scripts are still kept in the View. When using plain (non-wrapper) Kendo UI widgets, you write the initialization scripts yourself and can move them to external script files.
* They support the integration with the [MVVM](http://docs.telerik.com/kendo-ui/framework/mvvm/overview), [AngularJS](http://docs.telerik.com/kendo-ui/AngularJS/introduction), and [Single Page Application](http://docs.telerik.com/kendo-ui/framework/spa/overview) development patterns. Server-side wrappers are not intended to be used with these.
* [Visual Studio IntelliSense](http://docs.telerik.com/kendo-ui/third-party/vs-intellisense) is supported for the client-side API.

## Conclusion

You can use UI for ASP.NET MVC helpers and vanilla Kendo UI widgets at the same time on the same page, if a specific scenario requires that.

## See Also

* [Telerik UI for ASP.NET MVC Overview]({% slug overview_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Custom DataSource]({% slug customdatasource_aspnetmvc %})
* [Validation with Telerik UI for ASP.NET MVC]({% slug validation_aspnetmvc %})
* [Globalization with Telerik UI for ASP.NET MVC]({% slug globalization_aspnetmvc %})
* [Localization with Telerik UI for ASP.NET MVC]({% slug localization_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Telerik UI for ASP.NET MVC NuGet Packages]({% slug aspnetmvc_nuget %})
* [Scaffolding with Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
