---
title: Overview
page_title: Migration Overview | Telerik UI for ASP.NET MVC
description: "Learn the difference between Telerik Extensions for ASP.NET MVC and Telerik UI for ASP.NET MVC, how to migrate, handle data-binding, and set the stylesheets."
slug: overview_migrationextensions_aspnetmvc
position: 0
---

# Migrating from Telerik UI Extensions

The Telerik UI for ASP.NET MVC distribution differs from the implementation of the Telerik Extensions for ASP.NET MVC.

However, you can use both the Telerik UI Extensions and Helpers in the same project side by side. This option enables you to migrate an application component by component without the need to immediately remove all Telerik UI Extension components.

## Major Changes

Below are listed the major changes between the implementation of the Extensions and Helpers. Each change marks a difference between Kendo UI and the Telerik Extensions for ASP.NET MVC.

* Include the `Kendo.Mvc.dll` assembly name in your project&mdash;The Telerik Extensions for ASP.NET MVC use the `Telerik.Web.Mvc.dll` assembly name. As Telerik UI for ASP.NET MVC is not the same binaries, your project has to reference the `Kendo.Mvc.dll` assembly.
* Include the `Kendo.Mvc.UI` root namespace for Telerik UI for ASP.NET MVC&mdash;The root namespace for Telerik Extensions for ASP.NET MVC used to be `Telerik.Web.Mvc`. Telerik UI for ASP.NET MVC requires the `Kendo.Mvc.UI` namespace which means that you have to update each usage of the previous namespace.
* The import statement in the `web.config` file has to import `Kendo.Mvc.UI`&mdash;The Telerik Extensions for ASP.NET MVC import statement within the `web.config` referred to `Telerik.Web.Mvc.UI`. To take use of Telerik UI for ASP.NET MVC, include an import statement that imports `Kendo.Mvc.UI`.
* Telerik UI for ASP.NET MVC supports ASP.NET MVC 3, 4 and 5&mdash;Previously, the Telerik UI Extensions offered support for ASP.NET 1, 2, and 3. With Telerik UI for ASP.NET MVC, the supported ASP.NET MVC versions are 3, 4 and 5. The decision about which ASP.NET MVC versions has to be supported was based on an investigation and discussions about the client base and the industry adaptation of more recent ASP.NET MVC versions. Additionally, the support for the latest two ASP.NET MVC versions only offer additional opportunities to implement features otherwise impossible to implement in older ASP.NET MVC releases. To make use of Telerik UI for ASP.NET MVC, all the projects which use ASP.NET MVC 1 or 2 need to be upgraded to ASP.NET MVC 3, 4, or 5.
* Telerik UI for ASP.NET MVC does not take use of the `ScriptRegistrar` and `StylesheetRegistar`&mdash;Traditionally, the Telerik UI Extensions required that every view which contained Telerik UI components had a `ScriptRegistrar` and a `StylesheetRegistar` which, respectively, helped compress and combine scripts and style sheets. Telerik UI for ASP.NET MVC, no longer requires or uses these. The same `GZIP` compression that both registrars use can be implemented on a web-server level. With regards to bundling, Kendo UI offer a custom builder tool for the JavaScript files used with Telerik UI for ASP.NET MVC. Additionally, ASP.NET 4.5 offers a built-in bundling.
* Currently, Telerik UI for ASP.NET MVC is localized through satellite assemblies&mdash;The Telerik UI Extensions are localized through `RESX` files whereas Telerik UI for ASP.NET MVC offers satellite assemblies. Individual messages can be easily
overridden by configuration settings.

## Ajax Binding

The following examples demonstrate that the `.DataBinding()` statement is replaced with `.DataSource()`. Within the DataSource, you have to set additional properties, the most important ones being `.Read()`, `.Create()`, `.Update()`, and `.Destroy()`. Respectively, each setting stands for `.Select()`, `.Insert()`, `.Update()`, and `.Delete()` that are found within the Telerik UI Extensions. All components that rely on Ajax binding must replace their `.DataBinding()` statements with the new `.DataSource()`.

Because of the Kendo UI DataSource component usage, Ajax binding in Telerik UI for ASP.NET MVC is done in the following way.

    @(Html.Kendo().Grid<Product>()
        .Name("Grid")
        .DataSource(dataSource => dataSource
            .Ajax()
                .Read(read => read.Action("AjaxBinding_Read", "Grid"))
        )
    )

The Telerik UI Extensions follow the Ajax data binding convention.

    @(Html.Telerik().Grid<Product>()
        .Name("Grid")
        .DataBinding(dataBinding => dataBinding
            .Ajax()
                .Select("AjaxBinding_Read", "Grid")
        )
    )

## Client-Side Updates

* [Including JavaScript files](#including-javascript-files)
* [Using server-side code blocks](#using-server-side-code-blocks)
* [Using events](#using-events)
* [Changing the event names](#changing-the-event-names)
* [Using the onLoad event](#using-the-onload-event)
* [Using client-side instead of jQuery events](#using-client-side-instead-of-jquery-events)
* [Retrieving objects](#retrieving-objects)
* [Binding events](#binding-events)
* [Applying themes and stylesheets](#applying-themes-and-stylesheets)

### Including JavaScript Files

The JavaScript files associated with Telerik UI for ASP.NET MVC are the files associated with the Kendo UI widgets&mdash;`kendo.all.min.js`, specific widget files, or a custom file build, and `kendo.aspnetmvc.min.js`.

Telerik Extensions for ASP.NET MVC include JavaScript files for each individual component as well as some of the component features&mdash;for example, the Grid filtering JS file. With Telerik UI for ASP.NET MVC, the bare minimum is `kendo.all.min.js`, which contains Kendo UI-specific JavaScript, and `kendo.aspnetmvc.min.js`, which contains the MVC-specific parts of Telerik UI for ASP.NET MVC. Alternatively, instead of `kendo.all.min.js` you can include the component-specific JavaScript files from Kendo UI or
even use the custom download builder tool to create a single customized JavaScript file. This means that the new JavaScript files must be added to the project for Telerik UI for ASP.NET MVC to function.

### Using Server-Side Code Blocks

Server-side code blocks in WebForms views, such as the one in the example below, are no longer supported.

    .OnSelect(() => { %>
        function() { }
    <% });

Within Telerik Extensions for ASP.NET MVC, you can subscribe to a client-side event handler in ay of the following ways:

* Use the name of the event handler.

            .OnSelect("onSelect")
            <script>function onSelect() {}</script>

* Apply a server-side code block in the WebForms ViewEngine.

  Telerik UI for ASP.NET MVC no longer supports this approach because of the complications and limitations around the server-side code block due to the utilization of `Response.Write` that is used to add this JavaScript to the page. To work around this issue, use the following Razor approach which utilizes strings and removes these limitations.

  However, if you implemented the WebForms ViewEngine approach, for migrating use the approach with the name of the event handler.

            .OnSelect(() => { %>
                function() { }
            <% });

* Use inline templates for the Razor ViewEngine.

            .OnSelect(@<text> function() {} </text>)

### Using Events

To subscribe to client-side events when defining a Kendo UI control, initialize the `.Events()` property. The fluent (chaining) API, which is utilized with the Telerik UI Extensions, uses the `.ClientEvents()` property to bind to a client-side event.

    .ClientEvents(events => events.OnSelect("select"))

With Telerik UI for ASP.NET MVC, `ClientEvents` becomes `Events`, so that the previous statement transforms to the following one.

    .Events(events => events.Select("select"))

This also takes the new client-side event names into consideration. These changes require that all `.ClientEvents()` instances be replaced with the new `.Events()` property.

### Changing the Event Names

Telerik UI for ASP.NET MVC does not have the `on-` prefix for each of the client events. For example, `OnChange` is now `Change`.

When subscribing to client-side events, the Telerik Extensions for ASP.NET MVC used names such as `OnLoad`, `OnChange`, `OnDataBound` and others. All `on` prefixes are removed with Telerik UI for ASP.NET MVC. Therefore, all event subscriptions must have the `on` prefix removed. For example, `.Events(events => events.OnChange("foo"))` becomes `.Events(events => events.Change ("foo"))`.

### Using the onLoad Event

With Telerik UI for ASP.NET MVC, the `OnLoad` event is removed. Utilize the `document ready` event instead.

The `OnLoad` event found within Telerik Extensions for ASP.NET MVC gets raised when a UI component is initialized. However, in terms of the page lifecycle, this occurs at the same time as the `document ready` event. Therefore, out of efficiency concerns, the support for `OnLoad` is dropped from Telerik UI for ASP.NET MVC. This means that you have to place all `.OnLoad()` occurrences within a function that handles the `document ready` event. For example, `.OnLoad("onLoad")` becomes `$(document).ready(function () { onLoad(); });`.

### Using Client-Side instead of jQuery Events

To limit event bubbling for optimizing the components, Telerik UI for ASP.NET MVC uses Kendo UI events instead of jQuery events.

Many jQuery events traditionally bubble up from the target element all the way to the document root. Telerik Extensions for ASP.NET MVC offer all of their client-side events as jQuery events. This means that many of these events trigger event bubbling. Kendo UI uses its own type of events, which do not create the same event bubbling effect and are used within Telerik UI for ASP.NET MVC. This requires that all scenarios, where event bubbling is either implemented or taken for granted, are modified so that they follow the new style of Kendo UI events.

### Retrieving Objects

Telerik UI for ASP.NET MVC applies a similar approach to the traditional Kendo UI framework when retrieving (`$("#foo").data("kendoGrid")`) the client-side object of the component.

With Telerik Extensions for ASP.NET MVC, the client-side object of a Grid is retrieved by `var grid = $("#foo").data("tGrid")`. With Telerik UI for ASP.NET MVC, the proper way to grab the client-side object is by `var grid = $("#foo").data("kendoGrid")`. This change requires that all instances of grabbing the client-side object are changed to follow the specific Kendo UI convention.

### Binding Events

With Telerik UI for ASP.NET MVC, binding to an event on the client-side is done in the following way.

    var grid = $("#foo").data("kendoGrid");
    grid.bind("dataBound");

Traditionally, with Telerik Extensions for ASP.NET MVC, to bind to a client-side event in JavaScript, you have to use `$("#foo").bind("dataBound");`.

With the usage of Kendo UI events, this no longer works with Telerik UI for ASP.NET MVC. The new required approach is to get an instance of the client-side component object first, then use the `bind` function found within this object.

### Applying Themes and Stylesheets

By default, Telerik UI for ASP.NET MVC uses the Kendo UI stylesheets. Similar to Telerik Extensions for ASP.NET MVC, the Kendo UI widgets use a base stylesheet&mdash;`kendo.common.css`&mdash;and a theme-specific stylesheet&mdash;`kendo.[theme_name].css`. Register both of them manually on the page. Make sure you list the base stylesheet before the theme stylesheet, because the theme might need to override some of the base styles.

The Kendo UI widgets are shipped with Less- and Sass-based themes. For the full lists of the themes, refer to the following articles:
* [Less-Based Themes](https://docs.telerik.com/kendo-ui/styles-and-layout/appearance-styling)
* [Sass-Based Themes](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes)

The styling mechanism of the MVC extensions and the Kendo UI widgets is quite similar. For more information on the Kendo UI styling, refer to the [article on appearance and styling](http://docs.telerik.com/kendo-ui/styles-and-layout/appearance-styling).

In some cases when developers migrate from Telerik Extensions for ASP.NET MVC to Telerik UI for ASP.NET MVC, they might want to preserve the previous look of the components. This is the purpose for providing the so-called legacy themes. They represent modified versions of the MVC extensions stylesheets, so that they are compatible with the Kendo UI widgets. Changes include updates in the class names prefix from `t-` to `k-` and some tweaks required by the slightly different HTML output of the Kendo UI widgets.

> * As of the R3 2015 release, legacy themes are not shipped.
> * Using Kendo UI stylesheets and legacy themes on the same page is not supported.

Generally, it is recommended that you use the Kendo UI themes and not the legacy ones. The latter are located in the `wrappers/aspnetmvc/LegacyThemes` folder of the Telerik UI for ASP.NET MVC distribution package. Legacy themes can also be referenced from the Kendo UI CDN. If so, do not forget to specify the version&mdash;for example, 2012.2.710.

    <link href="http://kendo.cdn.telerik.com/<VERSION>/styles/telerik/telerik.common.min.css" rel="stylesheet" type="text/css" />
    <link href="http://kendo.cdn.telerik.com/<VERSION>/styles/telerik/telerik.black.min.css" rel="stylesheet" type="text/css" />

## See Also

* [Migrating the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrating the Calendar]({% slug calendar_migrationextensions_aspnetmvc %})
* [Migrating the Chart]({% slug chart_migrationextensions_aspnetmvc %})
