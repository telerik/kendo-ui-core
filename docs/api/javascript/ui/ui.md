---
title: ui
description: Documentation on helper methods for writing new widgets and show progress with a loading message.
---

# kendo.ui

## Methods

### plugin

Helper method for writing new widgets.
Exposes a jQuery plug-in that will handle the widget creation and attach its client-side object in the appropriate data-* attribute.

#### Example

    function TextBox(element, options) {
    }

    kendo.ui.plugin(TextBox);

    // initialize a new TextBox for each input, with the given options object.
    $("input").kendoTextBox({ });
    // get the TextBox object and call the value API method
    $("input").data("kendoTextBox").value();

#### Parameters

##### widget `kendo.ui.Widget`

The widget function.

##### register `Object` **(default: `kendo.ui`)**

The object where the reference to the widget is recorded.

##### prefix `String` **(default: `""`)**

The plugin function prefix, e.g. "Mobile" will register "kendoMobileFoo".

### progress

Shows or hides a semi-transparent overlay with a loading image, with styling, which depends on the used theme.

#### Parameters

##### element `jQuery`

The container, which will be overlaid. There are several requirements for this element:

* it must be visible on the page
* it must have non-zero width and height
* it must have a `position` style applied with one of the following values: `relative`, `absolute`, or `fixed`
* it must be a block element, which allows nesting of `div` elements (for example `div`, `li`, `td`, `dt`, `dd`, `section`, etc)

##### toggle `Boolean`

The flag, which indicates whether to show or hide the loading overlay.

#### Example

	<div id="container" style="position:relative">...</div>
	<script>

		var ajaxContainer = $("#container");

		// show loading overlay
		kendo.ui.progress(ajaxContainer, true);

		// hide loading overlay
		kendo.ui.progress(ajaxContainer, false);

	</script>
