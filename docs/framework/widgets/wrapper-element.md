---
title: Widget Wrapper and Widget Element
position: 1
---

# Widget wrapper and widget element

Each Kendo UI **Web** and **DataViz** widget instance keeps references to two elements - `element` and `wrapper`. Kendo UI **Mobile** widgets have an `element` reference only.

## Element

**`element`** is the element from which the widget was initialized. Depending on the widget, it may be visible (e.g. AutoComplete, Calendar, DatePicker, etc.) or hidden (e.g. DropDownList, Upload).
A reference to this element is also returned by the initialization statement.

## Wrapper

**`wrapper`** is the outermost element, which is part of the widget. Depending on the widget and exact scenario, the wrapper and the element may match.
For example, if the Grid is initialized from a `<div>`, the two references match. But if the Grid is initialized from a `<table>`, then `element` points to the `<table>`, while `wrapper` points to the wrapper `<div>`.

### Example - using element and wrapper references

	<div id="myWindow">...window content...</div>
	<script>
		var winElement1 = $("#myWindow").kendoWindow( { /*...*/ } ); // returns div#myWindow as a jQuery object
		var winElement2 = $("#myWindow").data("kendoWindow").element; // returns div#myWindow as a jQuery object
		
		var winWrapper = $("#myWindow").data("kendoWindow").wrapper; // returns div.k-window as a jQuery object
	</script>

## Usage

A reference to the widget wrapper may be needed when doing DOM or CSS manipulations. For example, in order to hide a widget, one must hide the **wrapper**. Hiding the element may hide the widget partially or not hide it at all.
The wrapper is also the most suitable HTML node for appending custom CSS classes.

Obtaining a reference to the widget element from the widget object is a relatively rare scenario, but may be helpful in some cases, especially when hard-coding IDs in jQuery selectors is not desired.