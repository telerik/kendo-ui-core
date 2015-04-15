---
title: HTML/JS Kendo UI widgets vs MVC wrappers
page_title: HTML/JS Kendo UI widgets vs MVC wrappers
description: Comparison between the HTML/JS Kendo UI widgets and their MVC wrappers
position: 4
---
# HTML/JavaScript Kendo UI Widgets vs ASP.NET MVC Wrappers

From client-side point of view, the vanilla HTML/JavaScript Kendo UI widgets and their ASP.NET MVC wrappers represent the same thing and provide the same capabilities.
However, there are some things to consider before choosing one product over the other.

The Kendo UI MVC wrappers ("UI for ASP.NET MVC") provide the following benefits:

* Ability to create widgets with no HTML and JavaScript coding. You will still need to write JavaScript to work with client-side events.
* [Server-side data binding](/aspnet-mvc/helpers/grid/server-binding) and in some cases, server-side rendering.
* Integration with some ASP.NET MVC features, e.g. [security trimming](/aspnet-mvc/helpers/menu/overview#security-trimming) or
[localization with resource files](/aspnet-mvc/globalization#localized-user-interface) or [editor templates](/aspnet-mvc/helpers/grid/editor-templates).
* Support for unobtrusive validation based on Data Annotation attributes
* CRUD operations implementation simplicity - support for CRUD operations will require less coding, compared to when client-side Kendo UI is used. In the latter case, you will have to repeat the model and data field configuration in the Javascript code
* Visual Studio intellisense for the server-side configuration syntax
* [Scaffolding](/aspnet-mvc/scaffolding)

The vanilla HTML/JavaScript Kendo UI widgets provide the following benefits:

* Full control over the initialization scripts' placement - server wrappers render the widgets' initialization scripts right after the widget's HTML output.
Even if you use [deferred initialization](/aspnet-mvc/fundamentals#deferred-initialization), the scripts will still be in the View.
When using client-side initialization, you can move the initialization scripts to external script files.
* Full control over the timing, order and conditions of the widgets' initialization.
* Configuration flexibility - in some specific and advanced scenarios, using Javascript initialization will allow you to handle some challenges
more easily (for example - saving and restoring the Grid state)
* Integration with [MVVM](/framework/mvvm/overview), [AngularJS](/AngularJS/introduction) and [Single Page Application](/framework/spa/overview) development patterns.
Server wrappers are not intended to be used with those.
* [Visual Studio Intellisense](/vs-intellisense) for the client-side API
