---
title: Overview
page_title: Window | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Window tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/window, /aspnet-core/helpers/tag-helpers/window
slug: taghelpers_window_aspnetcore
position: 1
---

# Window Tag Helper Overview

The Window tag helper helps you configure the Kendo UI Window widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the Window by using the Window tag helper.

> **Important**
>
> To ensure the tag-naming consistency across the Telerik UI for ASP.NET Core suite, the Kendo UI R1 2018 release introduces a change in the tag names of the Window. Previously, it was possible to nest content directly in the `<kendo-window>` tag while now, after the release, the content must be nested within a `<content>` tag.

###### Example

        <kendo-window name="window1">
			<content>Window contents</content>
		</kendo-window>

## Configuration

The Window tag helper configuration options are passed as attributes of the tag. The Window contents is placed between the opening and closing tag.

```cshtml

        @(Html.Kendo().Window()
            .Name("window")
            .Title("About Alvar Aalto")
            .Content(@<text>
                <div class="armchair">
                    <img src="@Url.Content("~/shared/web/window/armchair-402.png")"
                            alt="Artek Alvar Aalto - Armchair 402" />
                    Artek Alvar Aalto - Armchair 402
                </div>

                <p>
                    Alvar Aalto is one of the greatest names in modern architecture and design.
                    Glassblowers at the iittala factory still meticulously handcraft the legendary
                    vases that are variations on one theme, fluid organic shapes that let the end user
                    ecide the use. Interpretations of the shape in new colors and materials add to the
                    growing Alvar Aalto Collection that remains true to his original design.
                </p>
            </text>)
            .Draggable()
            .Width(600)
            .Events(ev => ev.Close("onClose"))
        )
```
```tagHelper

        <kendo-window name="window" title="About Alvar Aalto" draggable="true"
            width="400" on-close="onClose">
			<content>
				<div class="armchair">
					<img src="@Url.Content("~/shared/web/window/armchair-402.png")"
						alt="Artek Alvar Aalto - Armchair 402" />
					Artek Alvar Aalto - Armchair 402
				</div>

				<p>
					Alvar Aalto is one of the greatest names in modern architecture and design.
					Glassblowers at the iittala factory still meticulously handcraft the legendary
					vases that are variations on one theme, fluid organic shapes that let the end user
					ecide the use. Interpretations of the shape in new colors and materials add to the
					growing Alvar Aalto Collection that remains true to his original design.
				</p>
			</content>
        </kendo-window>
```

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
