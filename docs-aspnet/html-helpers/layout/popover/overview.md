---
title: Overview
page_title: Overview
description: "Discover the Telerik UI for {{ site.framework }} PopOver component and its features like custom action buttons and built-in customization options."
components: ["popover"]
slug: htmlhelpers_overview_popover
position: 0
---

# {{ site.framework }} PopOver Overview

{% if site.core %}
The Telerik UI PopOver TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI PopOver widget.
{% else %}
The Telerik UI PopOver HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI PopOver widget.
{% endif %}

The PopOver is a transient view that appears when the user clicks on a specified element or hovers within a particular area. It can contain elements such as buttons, icons, lists, and so on.

* [Demo page for the PopOver](https://demos.telerik.com/{{ site.platform }}/popover/index)

## PopOver vs. Tooltip

The PopOver and Tooltip components share some similar features - you can use both to display some additional content. The following list describes the differences between them.

The PopOver:

* Usually holds more content than the Tooltip (The PopOver has a header and body section).
* Allows you to add a variety of graphical elements.
* Supports action buttons.
* Provides additional context to the parent element.

The Tooltip:

* Usually holds less content than the PopOver.
* Is designed to display a small amount of text.
* Provides clarification to the parent element.

## Initializing the PopOver

The PopOver is usually displayed or dismissed as a result of a user action. It exposes various options for positioning.

The following example demonstrates how to define the PopOver.

```HtmlHelper
   <span id="info" class="k-button k-button-primary">Hover me!</span>

    @(Html.Kendo().Popover()
        .For("#info")
        .Position(PopOverPosition.Right)
        .ShowOn(PopoverShowOn.MouseEnter)
        .Body("Main content")
    )
```
{% if site.core %}
```TagHelper
	<span id="info" class="k-button k-button-primary">Hover me!</span>

	<kendo-popover for="#info" show-on="mouseenter" position="right" body="Main content"></kendo-popover>
```
{% endif %}

## Basic Configuration

The PopOver provides default configuration options such as its height and width, action buttons, header and body content, animations and events that will trigger its opening, and so on.

The following example demonstrates the basic configuration of the PopOver.

```HtmlHelper
   <span id="info" class="k-button k-button-primary">Click here</span>

    @(Html.Kendo().Popover()
        .For("#info")
        .Width(120)
        .Height(120)
        .Position(PopoverPosition.Top)
        .Header("More Information:")
        .Body("Information content")
        .Actions(a => a.Add().Text("Okay"))
        .ActionsLayout(PopoverActionsLayout.Center)
        .Animation(animation =>
        {
            animation.Open(op => op.Zoom(ZoomDirection.In).Duration(5));
            animation.Close(cl => cl.Zoom(ZoomDirection.Out).Duration(5));
        })
        .ShowOn(PopoverShowOn.Click)
    )
```
{% if site.core %}
```TagHelper
	<span id="info" class="k-button k-button-primary">Click here</span>

	<kendo-popover for="#info" show-on="click" position="top" width="120" height="120" header="More Information:" body="Information content" actions-layout="center">
		<actions>
			<action text="Okay"></action>
		</actions>
		<animation>
			<open duration="5" effects="zoom:in"/>
			<close duration="5" effects="zoom:out" />
		</animation>
	</kendo-popover>
```
{% endif %}

## Functionality and Features

* [Templates]({% slug htmlhelpers_templates_popover %})&mdash;The PopOver provides template options that allow you to customize the header and body content.
* [Events]({% slug events_popover %})&mdash;The component exposes the `Show` and `Hide` events that you can handle and control its behavior.
* [Accessibility]({% slug htmlhelpers_popover_accessibility %})&mdash;The PopOver is accessible for screen readers and supports WAI-ARIA attributes.

## Next Steps

* [Getting Started with the PopOver]({% slug getting_started_popover %})
* [Basic Usage of the PopOver for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/popover)

## See Also

* [Using the API of the PopOver for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/popover/api)
* [Knowledge Base Section](/knowledge-base)

