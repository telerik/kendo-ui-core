---
title: Migrating to Kendo UI
page_title: Migrating from Telerik Extensions for ASP.NET MVC to Telerik UI for ASP.NET MVC
description: What’s the difference between Telerik Extensions for ASP.NET MVC and Telerik UI for ASP.NET MVC, learn how to migrate, handle data-binding, set stylesheets.
---

# Migrating from Telerik Extensions for ASP.NET MVC

Telerik UI for ASP.NET MVC contains many differences from Telerik Extensions for ASP.NET MVC. Some of these will be breaking changes.
This document is meant to highlight these, as well as provide a general overview of issues that might occur when migrating from the
Telerik Extensions for ASP.NET MVC to Telerik UI for ASP.NET MVC.

Keep in mind that due to the larger changes in terms of assembly name and namespaces, both the Telerik Extensions for ASP.NET MVC and Telerik UI for ASP.NET MVC
can be used in the same project, side-by-side. This allows developers to migrate an application component-by-component, without the need to immediately remove all of the
Telerik Extensions components.

Below you will find the major changes coming from Telerik UI for ASP.NET MVC. Each change marks a difference between Kendo UI and the Telerik Extensions for ASP.NET MVC.
For each one there will be a quick summary of the change, as well as a detailed description of the modifications.
## General Information

### Assembly Name

_The change_: The name of the assembly that should be included in your project is *Kendo.Mvc.dll*

With the Telerik Extensions for ASP.NET MVC the assembly that is included with each project is Telerik.Web.Mvc.dll. As Telerik UI for ASP.NET MVC is not the same binaries, the new Kendo.Mvc.dll assembly will have to be referenced in your project.

### Namespace

_The change_: The root namespace of Telerik UI for ASP.NET MVC is *Kendo.Mvc.UI*

The root namespace for the Telerik Extensions for ASP.NET MVC has been Telerik.Web.Mvc.
With Telerik UI for ASP.NET MVC the namespace will be different, namely Kendo.Mvc.UI.
This means that any usage of the old namespace, such as using statements, will have to be updated.

### Web.config

_The change_: The import statement in the web.config file should be importing *Kendo.Mvc.UI*

With the Telerik Extensions for ASP.NET MVC the import statement found within the web.config refered to Telerik.Web.Mvc.UI
. In order to take use of Telerik UI for ASP.NET MVC an import statement importing Kendo.Mvc.UI will be needed instead.

### ASP.NET MVC version support

_The change_: Telerik UI for ASP.NET MVC supports ASP.NET MVC 3 and 4

Previously the Telerik Extensions offer support for ASP.NET 1, 2, and 3.
With Telerik UI for ASP.NET MVC the versions of ASP.NET MVC that are supported are 3 and 4.
The conclusion of which versions of ASP.NET MVC to support came from an investigation and discussion about our client-base's
and industry adaptation of the newer versions of ASP.NET MVC. Additionally, support for only the latest two versions of ASP.NET MVC offer
additional opportunities to implement features unable to be implemented in older versions of ASP.NET MVC.
In order to take use of Telerik UI for ASP.NET MVC all projects utilizing ASP.NET 1 or 2 will have to upgrade to 3 or 4.

### ScriptRegistrar and StyleSheetRegistrar

_The change_: Telerik UI for ASP.NET MVC will *not* take use of the ScriptRegistrar and StylesheetRegistar

Traditionally with the Telerik Extensions for ASP.NET MVC every view containing Telerik components needed a ScriptRegistrar and a StylesheetRegistar,
which respectively helped compress and combine scripts and style sheets. With Telerik UI for ASP.NET MVC these are no longer required, nor used.
The same GZIP compression that both the registrars utilize can be implemented on the web server level.
As for bundling we offer a custom builder tool for the JavaScript files used with Telerik UI for ASP.NET MVC and additionally ASP.NET 4.5 offers built-in bundling.

### Localization

_The change_: Currently Telerik UI for ASP.NET MVC is localized via satellite assemblies.

The Telerik Extensions for ASP.NET MVC are localized via RESX files whereas Telerik UI for ASP.NET MVC offers satellite assemblies. Individual messages can be easily
overriden via configuration settings.

## Data-Binding

### Ajax Binding

_The change_: Due to the usage of the Kendo UI DataSource component, Ajax binding in Telerik UI for ASP.NET MVC is done in the following way (Grid component used as an example):

    @(Html.Kendo().Grid<Product>()
        .Name("Grid")
        .DataSource(dataSource => dataSource
            .Ajax()
                .Read(read => read.Action("AjaxBinding_Read", "Grid"))
        )
    )

The Telerik Extensions for ASP.NET MVC follow the following convention for Ajax DataBinding

    @(Html.Telerik().Grid<Product>()
        .Name("Grid")
        .DataBinding(dataBinding => dataBinding
            .Ajax()
                .Select("AjaxBinding_Read", "Grid")
        )
    )

As can be seen by comparing the two pieces of sample code above, the .DataBinding() statement has been replaced with .DataSource().
Within the DataSource there are additional properties that need to be set. The most important ones are the .Read(), .Create(), .Update() and .Destroy() settings.
These are, respectively, in place of .Select(), .Insert(), .Update(), .Delete() found within the Telerik Extensions for ASP.NET MVC.
All components relying on Ajax binding will have to replace their .DataBinding() statements with the new .DataSource().

## Client-Side

### JavaScript files to include

_The change_: The JavaScript files associated with Telerik UI for ASP.NET MVC are the files associated with the Kendo UI widgets (
kendo.web.min.js, specific widget files, or a custom file build) as well as kendo.aspnetmvc.min.js

The Telerik Extensions for ASP.NET MVC include JavaScript files for each individual component,
as well as some of the component’s features (the Grid’s filtering JS file for example).
With Telerik UI for ASP.NET MVC the bare minimum is kendo.web.min.js, which contains Kendo UI-specific JavaScript,
and kendo.aspnetmvc.min.js, which contains the MVC-specific parts of Telerik UI for ASP.NET MVC.
Alternatively, instead of kendo.web.min.js one can include the specific component’s JavaScript files from Kendo UI or
even use the custom download builder tool to create a customized single JavaScript file.
This means that these new JavaScript files have to be added to the project in order for Telerik UI for ASP.NET MVC to function.

### Server-side code blocks

_The change_: Server-side code blocks, such as the one below, in a WebForms view are no longer supported:

    .OnSelect(() => { %>
        function() { }
    <% });


Within the Telerik Extensions for ASP.NET MVC there have been three ways of subscribing to a client-side event handler:

1.  Using the event handler name

        .OnSelect("onSelect")
        <script>function onSelect() {}</script>
2.  Server-side code block in the WebForms ViewEngine

        .OnSelect(() => { %>
            function() { }
        <% });
3.  Inline templates for Razor ViewEngine:

        .OnSelect(@<text> function() {} </text>)

With Telerik UI for ASP.NET MVC the second approach, using the server-side code block within the WebFroms ViewEngine, is no longer supported.
This is due to complications and limitations around the server-side code block due to utilization of Response.Write to add this JavaScript to the page.
Fortunately the third approach, using Razor, takes a string-based approach which removes these limitations.
If approach number two is currently implemented using WebForms the recommended for migration would be to use approach number one.

### ClientEvents is now Events.

_The change_: In order to subscribe to client-side events when defining a Kendo UI component the .Events() property has to be utilized.

The fluent, or chaining, API that was utilized with the Telerik Extensions for ASP.NET MVC used the .ClientEvents() property to bind to a client-side event as follows:

    .ClientEvents(events => events.OnSelect("select"))

However, with Telerik UI for ASP.NET MVC "ClientEvents" has just become "Events" so the statement above will now be:

    .Events(events => events.Select("select"))

This also takes the new client-side event names (found below) into consideration. These changes will require all instances of .ClientEvents() will need to be
replaced with the new .Events() property.

### Client-side event name changes

_The change_: Telerik UI for ASP.NET MVC will not have the prefix of "On" in front of each of the client-events e.g. "OnChange" is now "Change"

When subscribing to client-side events the Telerik Extensions for ASP.NET MVC used names such as OnLoad, OnChange, OnDataBound etc., but all "On" prefixes are removed with Telerik UI for ASP.NET MVC. So all event subscriptions will have to remove the "On" prefix as follows:

    .Events(events => events.OnChange("foo"))
becomes

    .Events(events => events.Change ("foo"))

### The client-side OnLoad event has been removed

_The change_: With Telerik UI for ASP.NET MVC the OnLoad event has been removed. Developers should utilize the document’s ready event instead.

The OnLoad event found within the Telerik Extensions for ASP.NET MVC gets raised when a UI component is initialized. However, in terms of the page’s lifecycle this essentially occurs right at the same time as the documeny’s ready event and for the sake of efficiency, the support for OnLoad was dropped from Telerik UI for ASP.NET MVC. This means that all usages of .OnLoad() will have to be placed within a function that handles document’s ready event:

    .OnLoad("onLoad")
becomes

    $(document).ready(function () { onLoad(); });

### Client-side events are now Kendo events instead of jQuery events

_The change_: In an attempt to limit event bubbling in order to optimize the components, Telerik UI for ASP.NET MVC utilize Kendo events instead of jQuery events.

Many jQuery events traditionally bubble up from the target element all the way to the document root.
The Telerik Extensions for ASP.NET MVC offer all of its client-side events as jQuery events, which means many of these events will trigger event bubbling.
Kendo UI utilizes its own type of events, which do not create the same event bubbling effect, which are utilized within Telerik UI for ASP.NET MVC.
This will require all scenarios where event bubbling is either implemented or taken for granted will have to be modified to adhere to the new Kendo-style events.

### Retrieving the client-side object

_The change_: Telerik UI for ASP.NET MVC utilizes a similar approach to traditional Kendo UI when retrieving the component’s client-side object: `$("#foo").data("kendoGrid")` (with the Grid as an example).

With the Telerik Extensions for ASP.NET MVC the client-side object of a Grid was retrieved in the following way:

    var grid = $("#foo").data("tGrid")

However, with Telerik UI for ASP.NET MVC the proper way to grab the client-side object is:

    var grid = $("#foo").data("kendoGrid")

This change will require all instances of grabbing the client-side object to be changed to follow the Kendo UI Complete-specific convention.

### Client-side event binding

_The change_: With Telerik UI for ASP.NET MVC binding to an event on the client-side looks like:

    var grid = $("#foo").data("kendoGrid");
    grid.bind("dataBound");

Traditionally with the Telerik Extensions for ASP.NET MVC one had to do the following to bind to a client-side event in JavaScript:

    $("#foo").bind("dataBound");

However, with the usage of Kendo UI events this will no longer work with Telerik UI for ASP.NET MVC.
The new required approach is to first get an instance of the component’s client-side object, then utilize the bind function found within this object.

### Themes and Stylesheets

By default, Telerik UI for ASP.NET MVC uses the Kendo UI stylesheets.
Similar to the Telerik Extensions for ASP.NET MVC, the Kendo UI widgets use a base stylesheet (kendo.common.css) and a theme-specific stylesheet (kendo.[theme_name].css),
both of which should be registered manually on the page. The base stylesheet should be registered before the theme stylesheet,
because the theme might need to override some of the base styles.

The Kendo UI widgets come with the following themes: Black, BlueOpal, Default, Metro (Green) and Silver.
The styling mechanism of the MVC extensions and the Kendo UI widgets is quite similar.
More information about the Kendo UI styling is available in the [Kendo UI Appearance and Styling](/web/appearance-styling) documentation article.

In some cases, developers that migrate from Telerik Extensions for ASP.NET MVC to Telerik UI for ASP.NET MVC, may want to preserve the previous look of the components.
For this purpose the so-called **legacy themes** are provided.
They represent modified versions of the MVC extensions' stylesheets, so that they are compatible with the Kendo UI widgets.
Changes include changing the classnames' prefix from "t-" to "k-", and some tweaks required by the slightly different HTML output of the Kendo UI widgets.
Note that **using Kendo UI stylesheets and legacy themes on the same page is not supported**.

Generally, it is encouraged to use the Kendo UI themes, not the legacy ones.
The latter are located in the **wrappers/aspnetmvc/LegacyThemes** folder of the Telerik UI for ASP.NET MVC distribution package.
Legacy themes can also be referenced from the Kendo UI CDN. Don't forget to specify the version (e.g. 2012.2.710)

    <link href="http://cdn.kendostatic.com/<VERSION>/styles/telerik/telerik.common.min.css" rel="stylesheet" type="text/css" />
    <link href="http://cdn.kendostatic.com/<VERSION>/styles/telerik/telerik.black.min.css" rel="stylesheet" type="text/css" />
