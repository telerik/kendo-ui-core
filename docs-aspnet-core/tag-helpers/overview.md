---
title: Overview
page_title: Tag Helpers Overview | Telerik UI for ASP.NET Core
description: "Learn the basics when working with Telerik Tag Helpers for ASP.NET Core (aka MVC 6 or ASP.NET Core MVC)."
previous_url: /mvc-6/tag-helpers, /kendo-ui/aspnet-mvc/aspnetmvc-apps/mvc-6/tag-helpers, aspnet-core/helpers/tag-helpers/tag-helpers
slug: taghelpers_aspnetmvc6_aspnetmvc
position: 0
---

# Tag Helpers Overview

The Telerik UI Tag Helpers for ASP.NET Core enable you to configure the corresponding Kendo UI widgets.

Tag Helpers can be added and further configured through predefined strongly typed attributes and also allow you to handle the events of the widgets in ASP.NET Core projects.

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
