---
title: Overview
page_title: ButtonGroup | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI ButtonGroup tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/button-group, /aspnet-core/helpers/tag-helpers/button-group
slug: taghelpers_buttongroup_aspnetcore
position: 1
---

# ButtonGroup Tag Helper Overview

The ButtonGroup tag helper helps you configure the Kendo UI ButtonGroup widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the ButtonGroup by using the ButtonGroup tag helper.

###### Example

    <kendo-buttongroup name="buttonGroup">
        <buttongroup-items>
            <item text="Click here!"></item>
        </buttongroup-items>
    </kendo-buttongroup>

## Configuration

The Button tag helper configuration options are passed as attributes of the tag. The buttons are specified in the `buttongroup-items` child tag collection.

```tagHelper

    <kendo-buttongroup name="player">
        <buttongroup-items>
            <item icon="play" text="Play" selected="true"></item>
            <item icon="pause" text="Pause" enabled="false"></item>
            <item icon="stop" text="Stop"></item>
        </buttongroup-items>
    </kendo-buttongroup>
```
```cshtml

    @(Html.Kendo().ButtonGroup()
       .Name("player")
       .Items(t =>
       {
           t.Add().Text("Play").Icon("play").Selected(true);
           t.Add().Text("Pause").Icon("pause").Enabled(false);
           t.Add().Text("stop").Icon("stop");
       })
    )
```

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
