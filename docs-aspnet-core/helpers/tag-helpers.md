---
title: Tag Helpers Overview
page_title: Tag Helpers Overview | Telerik UI for ASP.NET Core
description: "Learn the basics when working with Telerik Tag Helpers for ASP.NET Core (aka MVC 6 or ASP.NET Core MVC)."
previous_url: /mvc-6/tag-helpers, /kendo-ui/aspnet-mvc/aspnetmvc-apps/mvc-6/tag-helpers, /tag-helpers
slug: taghelpers_aspnetmvc6_aspnetmvc
position: 0
---

# Tag Helpers Overview

The Kendo UI tag helper help you configure the Kendo UI widgets by using the tag helper feature in ASP.NET Core.

## Getting Started

Tag helpers can be added and further configured through predefined strongly typed attributes, and enable you to handle the events of the widgets.

### Adding Tag Helpers

To configure an ASP.NET Core project that enables you to use the Kendo UI tag helper, add the @addTagHelper directive to your `cshtml` file.

###### Example

      @addTagHelper "*, Kendo.Mvc"

<!--*-->
You can also globally add the directive in `Views/_ViewImports.cshtml`.

### Configuring Tag Helpers

You can configure tag helpers through the predefined strongly typed attributes which also provide IntelliSense. Complex and composite properties as well as nested configuration tags are not supported.

The following example demonstrates how to configure the `NumericTextBox` tag helper.

###### Example

      <kendo-numerictextbox name="currency" format="c" min="0"
          enable="true" max="100" value="30">
      </kendo-numerictextbox>

### Handling Widget Events

All widget events are supported by the tag helpers. The event can only be set as a string literal that points to a JavaScript function handler. The event is set as an attribute preceded by the `on-` prefix.

The following example demonstrates how to set the `change` event of a NumericTextBox.

###### Example

        <kendo-numerictextbox name="currency" on-change="changeEvent">
        </kendo-numerictextbox>

## See Also

* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
