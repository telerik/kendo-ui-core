---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ButtonGroup TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/button-group, /helpers/tag-helpers/button-group
slug: taghelpers_buttongroup_aspnetcore
position: 1
---

# ButtonGroup TagHelper Overview

The Telerik UI ButtonGroup TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI ButtonGroup widget.

The ButtonGroup groups a series of buttons together on a single line.

* [Demo page for the ButtonGroup](https://demos.telerik.com/aspnet-core/buttongroup/tag-helper)

## Initializing the ButtonGroup

The following example demonstrates how to define the ButtonGroup by using the ButtonGroup TagHelper.

    <kendo-buttongroup name="buttonGroup">
        <buttongroup-items>
            <item text="Click here!"></item>
        </buttongroup-items>
    </kendo-buttongroup>

## Basic Configuration

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

* [Basic Usage of the ButtonGroup TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/buttongroup/tag-helper)
* [Server-Side API](/api/buttongroup)
