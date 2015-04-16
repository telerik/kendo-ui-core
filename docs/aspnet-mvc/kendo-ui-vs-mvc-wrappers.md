---
title: ASP.NET MVC wrappers vs Kendo UI widgets
page_title: ASP.NET MVC wrappers vs Kendo UI widgets
description: Comparison between the HTML/JS Kendo UI widgets and their ASP.NET MVC wrappers
position: 4
---
# ASP.NET MVC wrappers (UI helpers) vs Kendo UI widgets

From client-side point of view, the vanilla HTML/JavaScript Kendo UI widgets and their ASP.NET MVC wrappers (UI helpers) represent the same thing and provide the same capabilities.
However, there are some implementation specifics to consider before choosing one product over the other.

The **UI for ASP.NET MVC** helpers (Kendo UI MVC wrappers) provide the following benefits:

* Create widgets with no HTML and JavaScript coding. JavaScript knowledge will still be required to use client-side methods and events.
* [Server-side data binding](/aspnet-mvc/helpers/grid/server-binding) and in some cases, server-side rendering.
* Use the [ToDataSourceResult](/aspnet-mvc/helpers/grid/ajax-binding) extension method to bind Kendo UI widgets to server-side collections and
perform data operations (paging, sorting, filtering, grouping).
* Integration with some ASP.NET MVC features, e.g. [security trimming](/aspnet-mvc/helpers/menu/overview#security-trimming) or
[localization with resource files](/aspnet-mvc/globalization#localized-user-interface) or [editor templates](/aspnet-mvc/helpers/grid/editor-templates).
* Support for unobtrusive validation based on Data Annotation attributes.
* CRUD operations implementation simplicity - support for CRUD operations will require less coding, compared to when client-side Kendo UI is used.
In the latter case, you will have to repeat the model and data field configuration in the JavaScript code.
* Visual Studio intellisense for the server-side configuration syntax.
* [Visual Studio Extensions](/aspnet-mvc/vs-integration/introduction) for automatic creation of new Kendo UI ASP.NET MVC applications, or adding Kendo UI to existing projects,
or automatic updating of the Kendo UI version.
* Use [Scaffolding](/aspnet-mvc/scaffolding) to generate widget declarations and related controller action methods.

The vanilla HTML/JavaScript Kendo UI widgets provide the following benefits:

* Complete server platform independence. The widgets can be used with any web server and server framework (**including ASP.NET MVC**).
For example, you can build Single Page Applications with any RESTful back-end.
* Full control over the initialization scripts' placement - server wrappers render the widgets' initialization scripts right after the widget's HTML output.
Even if you use [deferred initialization](/aspnet-mvc/fundamentals#deferred-initialization), the scripts will still be in the View.
When using plain (non-wrapper) Kendo UI widgets, you write the initialization scripts yourself and can move them to external script files.
* Integration with [MVVM](/framework/mvvm/overview), [AngularJS](/AngularJS/introduction) and [Single Page Application](/framework/spa/overview) development patterns.
Server wrappers are not intended to be used with those.
* [Visual Studio Intellisense](/vs-intellisense) for the client-side API.

Finally, there is no problem to use UI for ASP.NET MVC helpers and vanilla Kendo UI widgets **at the same time on the same page**, if a specific scenario requires that.