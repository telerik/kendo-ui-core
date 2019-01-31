---
title: Overview
page_title: Overview | Kendo UI ButtonGroup
description: "Learn how to initialize the Kendo UI ButtonGroup widget and apply its options."
slug: overview_kendoui_buttongroup_widget
position: 1
---

# ButtonGroup Overview

The [Kendo UI ButtonGroup widget](http://demos.telerik.com/kendo-ui/buttongroup/index) groups a series of buttons together on a single line.

## Getting Started

### Initialize the ButtonGroup

To initialize the ButtonGroup, either use:

* HTML markup, or
* A JSON data object.

#### Using HTML Markup

The following example demonstrates how to initialize Kendo UI ButtonGroup from HTML markup.

###### Example

    <ul id="buttongroup">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
      </ul>

    <script>
		$("#buttongroup").kendoButtonGroup();
    </script>

#### Using JSON Data Object

The following example demonstrates how to initialize Kendo UI ButtonGroup from a JSON data object.

###### Example

    <div id="buttonGroup"></div>

    <script>
		$("#buttongroup").kendoButtonGroup({
            items: [
                { text: "Option1" },
                { text: "Option2" },
                { text: "Option3" }
            ]
        });
    </script>

## Configuration

### Enable or Disable the ButtonGroup

You can configure the ButtonGroup to be initially disabled by using its `enable` property. The ButtonGroup can also be disabled or enabled at any time with JavaScript by using the `enable()` method with a Boolean argument.

For more information on the [`enable`](/api/javascript/ui/buttongroup/configuration/enable) property and the [`enable`](/api/javascript/ui/buttongroup/methods/enable) method of the ButtonGroup, refer to the [ButtonGroup API](/api/javascript/ui/buttongroup).

The following example demonstrates how to enable and disable the ButtonGroup.

###### Example

	<ul id="buttongroup">
		<li>Option 1</li>
		<li>Option 2</li>
		<li>Option 3</li>
	</ul>

	<script>

	$(function(){
		var buttongroup = $("#buttongroup").kendoButtonGroup({
			enable: false
		}).data("kendoButtonGroup");

		// ...

		// enable ButtonGroup
		buttongroup.enable(true);
	});

	</script>

### Index

The initially selected index of the ButtonGroup can be configured by using its `index` property. An index can also be selected over the `select()` method with an Integer argument.

For more information on the [`index`](/api/javascript/ui/buttongroup/configuration/index) property and the [`select`](/api/javascript/ui/buttongroup/methods/select) method of the ButtonGroup, refer to the [ButtonGroup API](/api/javascript/ui/buttongroup).

The following example demonstrates how to select a button by its index.

###### Example

	<ul id="buttongroup">
		<li>Option 1</li>
		<li>Option 2</li>
		<li>Option 3</li>
	</ul>

	<script>

	$(function(){
		var buttongroup = $("#buttongroup").kendoButtonGroup({
			index: 0
		}).data("kendoButtonGroup");

		// ...

		// select button at 1 index
		buttongroup.select(1);
	});

	</script>

### Selection

The Kendo UI ButtonGroup enables you to restrict the number of Buttons that can be selected through the `selection` property. The property can be configured for a `single` or `multiple` selection.

###### Example

    <div id="buttongroup">
        <span class="k-state-active">Option 1</span>
        <span class="k-state-active">Option 2</span>
        <span>Option 3</span>
    </div>

    <script>
        $("#buttongroup").kendoButtonGroup({
            selection: "multiple"
        });
    </script>

### Icons

The ButtonGroup provides the `icon` and `imageUrl` properties for configuring icons. To set a particular Button instance, use only one of them.

###### Example

    <div id="buttongroup">
    </div>

    <script>
        $("#buttongroup").kendoButtonGroup({
            items: [
                { icon: "edit" },
                { imageUrl: "/images/myEditIcon.gif" }
            ]
        });
    </script>

### Badges

The ButtonGroup provides options for adding badges to its Buttons. To add or update badges, use the `badge` property or the `badge` method.

For more information on the ButtonGroup [`badge` method](/api/javascript/ui/buttongroup/methods/badge), refer to the [ButtonGroup API](/api/javascript/ui/buttongroup).

###### Example

    <div id="buttongroup">
    </div>

    <script>
        $("#buttongroup").kendoButtonGroup({
            items: [
                { text: "Option1", badge: "8" },
                { text: "Option2" }
            ]
        });
    </script>

### Accessibility

The ButtonGroup container has a `role=group` attribute that semantically defines the group of the buttons. The togglable buttons use the `aria-pressed` attribute and adopt the `role="button"` role. Initializing a ButtonGroup from a `ul` element requires you to set a corresponding tabindex to the child `li` elements. To change the focused Button in the ButtonGroup, usea the `Left Arrow` or `Right Arrow` keys.

## See Also

* [Overview of the ASP.NET MVC HtmlHelper Extension for the ButtonGroup Widget](http://docs.telerik.com/aspnet-mvc/helpers/buttongroup/overview)
* [Overview of the ButtonGroup JSP Tag]({% slug overview_buttongroup_uiforjsp %})
* [Overview of the ButtonGroup PHP Class]({% slug overview_buttongroup_uiforphp %})
* [ButtonGroup JavaScript API Reference](/api/javascript/ui/buttongroup)
