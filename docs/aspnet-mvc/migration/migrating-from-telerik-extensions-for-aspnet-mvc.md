---
title: Overview
page_title: Overview | Migrate from Telerik Extensions
description: "Learn the difference between Telerik Extensions for ASP.NET MVC and Telerik UI for ASP.NET MVC, how to migrate, handle data-binding, and set stylesheets."
slug: overview_migrationextensions_aspnetmvc
position: 1
---

# Telerik Extensions Migration Overview

This article aims at demonstrating these differences and at providing a general overview of issues that might occur when migrating from Telerik Extensions for ASP.NET MVC to Telerik UI for ASP.NET MVC.

Telerik UI for ASP.NET MVC differs in many ways from Telerik Extensions for ASP.NET MVC. Some of these differences are breaking changes.

Because of the greater changes in terms of assembly names and namespaces, both Telerik Extensions for ASP.NET MVC and Telerik UI for ASP.NET MVC can be used in the same project, side-by-side. This enables you to migrate an application component by component, without the need to immediately remove all Telerik Extensions components.

Below are listed the major changes coming from Telerik UI for ASP.NET MVC. Each change marks a difference between Kendo UI and the Telerik Extensions for ASP.NET MVC. For each there is a quick summary of the change as well as a detailed description of the modifications.

## Basic Concepts

### Assembly Name

**Change** The name of the assembly that should be included in your project is `Kendo.Mvc.dll`.

With Telerik Extensions for ASP.NET MVC, the assembly that is included with each project is `Telerik.Web.Mvc.dll`. As Telerik UI for ASP.NET MVC is not the same binaries, the new `Kendo.Mvc.dll` assembly needs to be referenced in your project.

### Namespace

**Change** The root namespace of Telerik UI for ASP.NET MVC is `Kendo.Mvc.UI`.

The root namespace for Telerik Extensions for ASP.NET MVC was `Telerik.Web.Mvc`. With Telerik UI for ASP.NET MVC, the namespace is different&mdash;`Kendo.Mvc.UI`. This means that any usage of the old namespace, such as using statements, needs to be updated.

### Web.config

**Change** The import statement in the `web.config` file should import `Kendo.Mvc.UI`.

With Telerik Extensions for ASP.NET MVC, the import statement found within the `web.config` refered to `Telerik.Web.Mvc.UI`. To take use of Telerik UI for ASP.NET MVC, an import statement importing `Kendo.Mvc.UI` is needed instead.

### Version Support

**Change** Telerik UI for ASP.NET MVC supports ASP.NET MVC 3 and 4.

Previously, Telerik Extensions offered support for ASP.NET 1, 2, and 3. With Telerik UI for ASP.NET MVC, the supported ASP.NET MVC versions are 3 and 4. The decision about which ASP.NET MVC versions should be supported was based on an investigation and discussions about the Kendo UI client-base and the industry adaptation of more recent ASP.NET MVC versions. Additionally, the support for the latest two ASP.NET MVC versions only offer additional opportunities to implement features otherwise impossible to implement in older ASP.NET MVC releases. To make use of Telerik UI for ASP.NET MVC, all the projects which use ASP.NET MVC 1 or 2 need to be upgraded to ASP.NET MVC 3 or 4.

### ScriptRegistrar and StyleSheetRegistrar

**Change** Telerik UI for ASP.NET MVC does not take use of the `ScriptRegistrar` and `StylesheetRegistar`.

Traditionally with Telerik Extensions for ASP.NET MVC, every view containing Telerik components needed a `ScriptRegistrar` and a `StylesheetRegistar`, which respectively helped compress and combine scripts and style sheets. With Telerik UI for ASP.NET MVC, these are no longer required, nor used. The same `GZIP` compression that both registrars use can be implemented on a web-server level. With regards to bundling, Kendo UI offer a custom builder tool for the JavaScript files used with Telerik UI for ASP.NET MVC. Additionally, ASP.NET 4.5 offers a built-in bundling.

### Localization

**Change** Currently, Telerik UI for ASP.NET MVC is localized through satellite assemblies.

Telerik Extensions for ASP.NET MVC are localized through `RESX` files whereas Telerik UI for ASP.NET MVC offers satellite assemblies. Individual messages can be easily
overridden by configuration settings.

## Data Binding

### Ajax Binding

**Change** Because of the Kendo UI DataSource component usage, Ajax binding in Telerik UI for ASP.NET MVC is done in the way demonstrated in the example below (the Kendo UI Grid is used).

###### Example

    @(Html.Kendo().Grid<Product>()
        .Name("Grid")
        .DataSource(dataSource => dataSource
            .Ajax()
                .Read(read => read.Action("AjaxBinding_Read", "Grid"))
        )
    )

Telerik Extensions for ASP.NET MVC follow the Ajax DataBinding convention as demonstrated in the example below.

###### Example

    @(Html.Telerik().Grid<Product>()
        .Name("Grid")
        .DataBinding(dataBinding => dataBinding
            .Ajax()
                .Select("AjaxBinding_Read", "Grid")
        )
    )

As seen when comparing the two pieces of sample code above, the `.DataBinding()` statement is replaced with `.DataSource()`. Within the DataSource, there are additional properties that need to be set. The most important ones are the `.Read()`, `.Create()`, `.Update()`, and `.Destroy()` settings. Respectively, each one stands for `.Select()`, `.Insert()`, `.Update()`, and `.Delete()` that are found within Telerik Extensions for ASP.NET MVC. All components that rely on Ajax binding must replace their `.DataBinding()` statements with the new `.DataSource()`.

## Client Side

### JavaScript Files Inclusion

**Change** The JavaScript files associated with Telerik UI for ASP.NET MVC are the files associated with the Kendo UI widgets&mdash;`kendo.web.min.js`, specific widget files, or a custom file build, and `kendo.aspnetmvc.min.js`.

Telerik Extensions for ASP.NET MVC include JavaScript files for each individual component as well as some of the component features&mdash;for example, the Grid filtering JS file. With Telerik UI for ASP.NET MVC, the bare minimum is `kendo.web.min.js`, which contains Kendo UI-specific JavaScript, and `kendo.aspnetmvc.min.js`, which contains the MVC-specific parts of Telerik UI for ASP.NET MVC. Alternatively, instead of `kendo.web.min.js` you can include the component-specific JavaScript files from Kendo UI or
even use the custom download builder tool to create a single customized JavaScript file. This means that the new JavaScript files must be added to the project for Telerik UI for ASP.NET MVC to function.

### Server-Side Code Blocks

**Change** Server-side code blocks in WebForms views, such as the one in the example below, are no longer supported.

###### Example

    .OnSelect(() => { %>
        function() { }
    <% });

Within Telerik Extensions for ASP.NET MVC, you can subscribe to a client-side event handler in three ways.

**Option 1** Use the name of the event handler.

###### Example

        .OnSelect("onSelect")
        <script>function onSelect() {}</script>

**Option 2** Apply a server-side code block in the WebForms ViewEngine.

###### Example

        .OnSelect(() => { %>
            function() { }
        <% });

**Option 3** Use inline templates for the Razor ViewEngine.

###### Example

        .OnSelect(@<text> function() {} </text>)

With Telerik UI for ASP.NET MVC, the second approach&mdash;using the server-side code block within the WebFroms ViewEngine&mdash;is no longer supported. The reason for this are the complications and limitations around the server-side code block because of the utilization of the `Response.Write` to add this JavaScript to the page. The third approach&mdash;using Razor&mdash;takes a string-based approach which removes these limitations. If the second approach is the one currently implemented, it is recommended to use approach number one for the migration.

### ClientEvents

**Change** To subscribe to client-side events when defining a Kendo UI component, the `.Events()` property must be utilized.

The fluent (or chaining) API, which is utilized with Telerik Extensions for ASP.NET MVC, uses the `.ClientEvents()` property to bind to a client-side event as demonstrated in the example below.

###### Example

    .ClientEvents(events => events.OnSelect("select"))

With Telerik UI for ASP.NET MVC, `ClientEvents` becomes `Events`, so the statement above transforms to the one demonstrated in the example below.

###### Example

    .Events(events => events.Select("select"))

This also takes the new client-side event names (found below) into consideration. These changes require that all `.ClientEvents()` instances be replaced with the new `.Events()` property.

### Client-Side Event Name Changes

**Change** Telerik UI for ASP.NET MVC does not have the `on-` prefix for each of the client-events. For example, `OnChange` is now `Change`.

When subscribing to client-side events, the Telerik Extensions for ASP.NET MVC used names such as `OnLoad`, `OnChange`, `OnDataBound` and others. All `on` prefixes are removed with Telerik UI for ASP.NET MVC. Therefore, all event subscriptions must have the `on` prefix removed as demonstrated in the example below.

###### Example

    .Events(events => events.OnChange("foo"))
becomes

    .Events(events => events.Change ("foo"))

### Client-Side OnLoad Event

**Change** With Telerik UI for ASP.NET MVC, the `OnLoad` event is removed. Utilize the `document ready` event instead.

The `OnLoad` event found within Telerik Extensions for ASP.NET MVC gets raised when a UI component is initialized. However, in terms of the page lifecycle, this occurs at the same time as the `document ready` event. Therefore, out of efficiency concerns, the support for `OnLoad` is dropped from Telerik UI for ASP.NET MVC. This means that all `.OnLoad()` occurrences must be placed within a function that handles the `document ready` event.

###### Example

    .OnLoad("onLoad")

    // The code above becomes

    $(document).ready(function () { onLoad(); });

### Client-Side instead of jQuery Events

**Change** To limit event bubbling for optimizing the components, Telerik UI for ASP.NET MVC uses Kendo UI events instead of jQuery events.

Many jQuery events traditionally bubble up from the target element all the way to the document root. Telerik Extensions for ASP.NET MVC offer all of their client-side events as jQuery events. This means that many of these events trigger event bubbling. Kendo UI uses its own type of events, which do not create the same event bubbling effect and are used within Telerik UI for ASP.NET MVC. This requires that all scenarios, where event bubbling is either implemented or taken for granted, are modified so that they follow the new style of Kendo UI events.

### Client-Side Object Retrieval

**Change** Telerik UI for ASP.NET MVC applies a similar approach to the traditional Kendo UI framework when retrieving the client-side object of the component.

###### Example

 `$("#foo").data("kendoGrid")`

With Telerik Extensions for ASP.NET MVC, the client-side object of a Grid is retrieved in the way demonstrated in the example below.

###### Example

    var grid = $("#foo").data("tGrid")

With Telerik UI for ASP.NET MVC, the proper way to grab the client-side object is as shown below.

###### Example

    var grid = $("#foo").data("kendoGrid")

This change requires that all instances of grabbing the client-side object are changed to follow the specific convention of Kendo UI Complete.

### Client-Side Event Binding

**Change** With Telerik UI for ASP.NET MVC, binding to an event on the client-side is done in the way demonstrated in the example below.

###### Example

    var grid = $("#foo").data("kendoGrid");
    grid.bind("dataBound");

Traditionally, with Telerik Extensions for ASP.NET MVC, you need to do the following to bind to a client-side event in JavaScript.

###### Example

    $("#foo").bind("dataBound");

With the usage of Kendo UI events, this no longer works with Telerik UI for ASP.NET MVC. The new required approach is to get an instance of the client-side component object first, then use the `bind` function found within this object.

### Themes and Stylesheets

By default, Telerik UI for ASP.NET MVC uses the Kendo UI stylesheets. Similar to Telerik Extensions for ASP.NET MVC, the Kendo UI widgets use a base stylesheet&mdash;`kendo.common.css`&mdash;and a theme-specific stylesheet&mdash;`kendo.[theme_name].css`. Register both of them manually on the page. Make sure you list the base stylesheet before the theme stylesheet, because the theme might need to override some of the base styles.

The Kendo UI widgets are shipped with the following themes:
* Black
* BlueOpal
* Default
* Metro (Green)
* Silver

The styling mechanism of the MVC extensions and the Kendo UI widgets is quite similar. For more information on the Kendo UI styling, refer to the [article on appearance and styling]({% slug themesandappearnce_kendoui_desktopwidgets %}).

In some cases when developers migrate from Telerik Extensions for ASP.NET MVC to Telerik UI for ASP.NET MVC, they might want to preserve the previous look of the components. This is the purpose for providing the so-called legacy themes. They represent modified versions of the MVC extensions stylesheets, so that they are compatible with the Kendo UI widgets. Changes include updates in the classnames prefix from `t-` to `k-` and some tweaks required by the slightly different HTML output of the Kendo UI widgets.

> **Important**
>
> Using Kendo UI stylesheets and legacy themes on the same page is not supported.

Generally, it is recommened that you use the Kendo UI themes and not the legacy ones. The latter are located in the `wrappers/aspnetmvc/LegacyThemes` folder of the Telerik UI for ASP.NET MVC distribution package. Legacy themes can also be referenced from the Kendo UI CDN. If so, do not forget to specify the version&mdash;for example, 2012.2.710.

###### Example

    <link href="http://kendo.cdn.telerik.com/<VERSION>/styles/telerik/telerik.common.min.css" rel="stylesheet" type="text/css" />
    <link href="http://kendo.cdn.telerik.com/<VERSION>/styles/telerik/telerik.black.min.css" rel="stylesheet" type="text/css" />

## See Also

Other articles on migrating from Telerik Extensions:

* [Migrate the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrate the Calendar]({% slug calendar_migrationextensions_aspnetmvc %})
* [Migrate the Chart]({% slug chart_migrationextensions_aspnetmvc %})

To see the articles on migrating kendo UI controls from Telerik Extensions, browse [this section]({% slug combobox_migrationextensions_aspnetmvc %}).
