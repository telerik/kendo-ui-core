---
title: Overview
page_title: Tag Helpers Overview
description: "Learn the basics when working with Telerik Tag Helpers for ASP.NET Core (aka MVC 6 or ASP.NET Core MVC)."
previous_url: /mvc-6/tag-helpers, /kendo-ui/aspnet-mvc/aspnetmvc-apps/mvc-6/tag-helpers, aspnet-core/helpers/tag-helpers/tag-helpers
slug: taghelpers_aspnetmvc6_aspnetmvc
position: 0
---

# Tag Helpers Overview

The Telerik UI Tag Helpers for ASP.NET Core enable you to configure the corresponding Kendo UI widgets.

Tag Helpers can be added and further configured through predefined strongly typed attributes and also allow you to handle the events of the widgets in ASP.NET Core projects.

## Widgets vs. Helpers

The Kendo UI widgets:

* Allow for a complete server-platform independence.
* Provide full control over the placement of the initialization scripts.
* Support the integration with the [MVVM](https://docs.telerik.com/kendo-ui/framework/mvvm/overview), [AngularJS](https://docs.telerik.com/kendo-ui/framework/AngularJS/introduction), and [Single-Page Application](https://docs.telerik.com/kendo-ui/framework/spa/overview) development patterns.
* Support [Visual Studio IntelliSense](https://docs.telerik.com/kendo-ui/third-party/vs-intellisense) for the client-side API.

The {{ site.product_short }} helpers:

* Allow you to create widgets with no HTML and JavaScript coding.
* Provide for server-side data binding.
* Allow you to use the `ToDataSourceResult()` extension method for binding Kendo UI widgets to server-side collections and for performing data operations (paging, sorting, filtering, and grouping).
* Provide integration with some {{ site.framework }} features such as security trimming.
* Enable a simple implementation of CRUD operations.
* Support Visual Studio IntelliSense for the server-side configuration syntax.
* Enable Visual Studio Extensions for automatic creation of new {{ site.product }} applications and for automatic updating of the Telerik UI version.
* Enable you to use scaffolding to generate widget declarations and related controller action methods.

## Adding Tag Helpers

To configure an ASP.NET Core project that enables you to use a Telerik UI tag helper, add the @addTagHelper directive to your `cshtml` file.

      @addTagHelper "*, Kendo.Mvc"

<!--*-->
You can also globally add the directive in `Views/_ViewImports.cshtml`.

## Configuring Tag Helpers

You can configure the Tag Helpers through the predefined strongly typed attributes which also provide IntelliSense. Complex and composite properties as well as nested configuration tags are not supported.

The following example demonstrates how to configure the `NumericTextBox` tag helper.

      <kendo-numerictextbox name="currency" format="c" min="0"
          enable="true" max="100" value="30">
      </kendo-numerictextbox>

## Using Tag Helpers in ClientTemplates

Тhe .NET framework ignores any TagHelpers which are within script tags. In order to compile them correctly, when placing a TagHelper within a Kendo Template, set the type to `text/html` and add the `is-in-client-template="true"` attribute.

The following example demonstrates how to include Chart TagHelpers in the TileLayout TagHelper.

      <!-- container chart templates -->
      <script id="downloads-template" type="text/html">
          <kendo-chart name="downloads" is-in-client-template="true">
              <series>
                  <series-item type="ChartSeriesType.Line" data="new double[] { 56000, 63000, 74000, 91000, 117000, 138000 }">
                  </series-item>
              </series>
          </kendo-chart>
      </script>
      <script id="devices-template" type="text/html">
          <kendo-chart name="devices" is-in-client-template="true">
              <series>
                  <series-item type="ChartSeriesType.Donut" auto-fit="true" data='new dynamic[] {
                      new {category = "Asia",value = 30.8,color = "\\#006634"},
                      new {category = "Europe",value = 69.2,color = "\\#90cc38"}}'>
                  </series-item>
              </series>
          </kendo-chart>
      </script>
      <kendo-tilelayout name="tilelayout" columns="2" resizable="true" reorderable="true">
          <containers>
              <container body-template-id="downloads-template" col-span="1" row-span="1">
                  <container-header text="Weekly Recap-Downloads" />
              </container>
              <container body-template-id="devices-template" col-span="1" row-span="1">
                  <container-header text="Devices" />
              </container>
          </containers>
      </kendo-tilelayout>


## Handling Widget Events

All widget events are supported by the Tag Helpers. The event can only be set as a string literal that points to a JavaScript function handler. The event is set as an attribute preceded by the `on-` prefix.

The following example demonstrates how to set the `change` event of a NumericTextBox.

        <kendo-numerictextbox name="currency" on-change="changeEvent">
        </kendo-numerictextbox>

## Known Issues

* Tag Helpers might need to be disabled on pages where widgets render custom content&mdash;for example, the Button, Editor, Splitter, Tooltip, or Window. Some Tag Helpers, such as the `href` one, are processed automatically and result in invalid HTML.

        @removeTagHelper "*, Microsoft.AspNet.Mvc.Razor"
        @removeTagHelper "*, Microsoft.AspNetCore.Mvc.Razor"

* The `TagMode` enum of the MultiSelect is now renamed to `MultiSelectTagMode`.
* [More known issues]({% slug knownissues_aspnetmvc6_aspnetmvc %}#known-issues)

## See Also

* [Introduction to UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Mac (Online Guide)]({% slug gettingstarted_firststeps_vsmac %})
* [First Steps with CLI (Online Guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
