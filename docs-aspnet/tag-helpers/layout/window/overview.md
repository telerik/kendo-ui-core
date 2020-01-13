---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Window TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/window, /helpers/tag-helpers/window
slug: taghelpers_window_aspnetcore
position: 1
---

# Window TagHelper Overview

The Telerik UI Window TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Window widget.

The Window displays content in a modal or non-modal HTML window. By default, the user can move, resize, and close a Window. Its content can also be defined either as static HTML or dynamically loaded with AJAX.

* [Demo page for the Window](https://demos.telerik.com/aspnet-core/window/tag-helper)

## Initializing the Window

The following example demonstrates how to define the Window by using the Window TagHelper.

> To ensure the tag-naming consistency across the Telerik UI for ASP.NET Core suite, the Kendo UI for jQuery R1 2018 release introduces a change in the tag names of the Window. Previously, it was possible to nest content directly in the `<kendo-window>` tag while now, after the release, the content must be nested within a `<content>` tag.

        <kendo-window name="window1">
			<content>Window contents</content>
		</kendo-window>

## Basic Configuration

The Window TagHelper configuration options are passed as attributes of the tag. The Window contents is placed between the opening and closing tag.

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

* [Basic Usage of the Window TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/window/tag-helper)
* [Server-Side API](/api/window)
