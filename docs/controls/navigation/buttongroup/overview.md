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

The Kendo UI ButtonGroup widget can be initialized in two ways:

* From HTML markup
* From a JSON data object

#### Using HTML Markup

The example below demonstrates how to initialize Kendo UI ButtonGroup from HTML markup.

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

The example below demonstrates how to initialize Kendo UI ButtonGroup from a JSON data object.

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

### Enable or Disable ButtonGroup

Kendo UI ButtonGroup can be configured to be initially disabled via its `enable` property. The ButtonGroup can also be disabled or enabled at any time with JavaScript by using its `enable()` method with a Boolean argument.

The example below demonstrates how to enable and disable the ButtonGroup.

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

For more information on the ButtonGroup [`enable` property](/api/javascript/ui/ButtonGroup#configuration-enable) and the [`enable` method](/api/javascript/ui/ButtonGroup#methods-enable), refer to the [ButtonGroup API](/api/javascript/ui/ButtonGroup).

### Index

Initially selected index of the Kendo UI ButtonGroup can be configured via its `index` property. An index could be selected via `select()` method with a Integer argument.

The example below demonstrates how to select a button by its index.

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

For more information on the ButtonGroup [`index` property](/api/javascript/ui/ButtonGroup#configuration-index) and the [`select` method](/api/javascript/ui/ButtonGroup#methods-select), refer to the [ButtonGroup API](/api/javascript/ui/ButtonGroup).

### Selection

Kendo UI ButtonGroup can restrict the numbers of Buttons that can be selected via its selection property. It can be configured with `single` or `multiple` selection.

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

### Add Icons

Kendo UI ButtonGroup provides two properties for configuring icons - `icon` and `imageUrl`. Use only one of them with a particular Button instance.

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

### Add Badges

Kendo UI ButtonGroup provides possibility to add badges in its Buttons. You could use `badge` property or the `badge` method for update or add operation.

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

For more information on the ButtonGroup [`badge` method](/api/javascript/ui/ButtonGroup#methods-badge), refer to the [ButtonGroup API](/api/javascript/ui/ButtonGroup).

### Accessibility

Kendo UI ButtonGroup container has a `role=group` attribute that semantically defines the group of the buttons. The togglable buttons use `aria-pressed` attribute and have the `role="button"` role. Initializing a ButtonGroup from `ul` element requires setting a corresponding tabindex to the child `li` elements. Changing focused Button in the Kendo ButtonGroup could be made via Left/Right keyboard navigation.

## See Also

Other articles on Kendo UI ButtonGroup:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the ButtonGroup Widget](http://docs.telerik.com/aspnet-mvc/helpers/buttongroup/overview)
* [Overview of the ButtonGroup JSP Tag]({% slug overview_buttongroup_uiforjsp %})
* [Overview of the ButtonGroup PHP Class]({% slug overview_buttongroup_uiforphp %})
* [ButtonGroup JavaScript API Reference](/api/javascript/ui/buttongroup)
