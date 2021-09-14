---
title: Overview
page_title: Overview
description: "Get started with the Telerik UI PopOver TagHelper for {{ site.framework }} and learn how to initialize and configure it."
slug: taghelpers_overview_popover
position: 1
---

# PopOver TagHelper Overview

The Telerik UI PopOver TagHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI PopOver widget.

The PopOver is a transient view that appears when the user clicks on a specified element or hovers within a particular area. It can contain elements such as buttons, icons, lists, and so on.

* [Demo page for the PopOver](https://demos.telerik.com/{{ site.platform }}/popover/tag-helper)

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

The following example demonstrates how to define the PopOver by using the PopOver TagHelper.

```
	<span id="info" class="k-button wider">Hover me!</span>

	<kendo-popover for="info" show-on="hover" position="top" body="Main content"></kendo-popover>
```

## Basic Configuration

The PopOver provides default configuration options such as its height and width, action buttons, header and body content, animations and events that will trigger its opening, and so on.

The following example demonstrates the basic configuration of the PopOver TagHelper.

```
	<span id="info" class="k-button wider">Click here</span>

	<kendo-popover for="info" show-on="click" position="top" width="120" height="200" header="More Information:" body="Information content">
		<actions>
			<action text="Okay"></action>
		</actions>
		<animation>
			<open duration="5" effects="fade:in"/>
			<close duration="5" effects="fade:out" />
		</animation>
	</kendo-popover>
```

## See Also

* [Basic Usage of the PopOver TagHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/popover/tag-helper)
* [Server-Side API](/api/popover)
