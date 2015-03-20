---
title: Overview
page_title: Summary of Kendo UI Button functionality
description: Find out how to use the Kendo UI Button widget
---

# Button Overview

The **Kendo UI Button** provides a styled clickable UI widget with arbitrary content.
Apart from consistent Kendo UI styling, the **Button** provides keyboard operability for elements, which natively don't have it (e.g. `span`).

It is assumed that the reader of this page is familiar with the [fundamental Kendo UI widget concepts](/widgets).

## Getting Started

The **Button** widget can be initialized from any element with any content. However, using `button` or `a` elements is more reasonable. When using a `button` element inside a `form`, one should be aware
that the default `type` HTML attribute for buttons is `submit`. Clicking the button will submit the form and reload the page. If this is not desired, then use an explicit `type="button"` HTML attribute.

The **Button** can include both inline and block elements, but one should take into account web standards, which prohibit placing block elements (e.g. `div`, `p`) inside inline elements (e.g. `a`, `span`).

Placing clickable elements with their own special behavior inside the **Button** (e.g. hyperlinks, textboxes, etc) may cause undesired side efects.

### Button initialization example

    <button type="button" id="refreshButton">Refresh</button>

	<script>
	$(function(){
		$("#refreshButton").kendoButton();
	});
	</script>


## Initializing multiple buttons

Although each **Button** represents a separate widget instance on the page, multiple Buttons can be initialized simultaneously.
There are two ways to do this - one is to use a jQuery selector, which returns multiple elements, or via `kendo.init()`.

### Multiple Buttons initialization with a jQuery selector

    <button type="button" class="myButton">Edit</button>
    <button type="button" class="myButton">Delete</button>
	<button type="button" class="myButton">Add</button>

	<script>
	$(function(){
		$(".myButton").kendoButton();
	});
	</script>

### Multiple Buttons initialization with kendo.init

This approach allows you to initialize multiple **Buttons** at once, but with different configuration options.
For more information, please refer to [Data Attribute Initialization](/data-attribute-initialization) and [`kendo.init()` method description](/api/framework/kendo#methods-init).

	<div id="buttonsContainer">
		<span data-role="button" data-sprite-css-class="myEditIcon">Edit</span>
		<span data-role="button" data-enable="false">Delete</span>
		<span data-role="button" data-click="myClickHandler">Add</span>
	</div>

	<script>
	$(function(){
		function myClickHandler(e) {
			// Add Button click handler
		}

		kendo.init("#buttonsContainer");
	});
	</script>

## Using Icons

The **Button** can accommodate an icon, which enhances the meaning of the text content.
The widget provides three ways to add an icon with a classic `img` element or with a background image (usually a sprite).
From web standarts' point of view, using background images is better, because the icon does not represent structural content, but it's simply a decoration.

There are three properties, which the **Button** provides for configuring icons - `icon`, `spriteCssClass` and `imageUrl`.
Only one should be used with a particular **Button** instance. If multiple properties are defined, only one will be obeyed, in the order above.

### Background icons

Background icons are applied via the `icon` or `spriteCssClass` property and are displayed as a background of a `span` element.
The `span` element can be rendered by the **Button** automatically, or an existing `span` element can be used, if it has a `k-sprite` CSS class (or `k-icon` if the `icon` property is used).

The difference between the two properties is that `icon` is intended to be used for built-in Kendo UI icons, which are part of the theme sprite.
For a list of available icon names, please refer to the [Icons demo](http://demos.telerik.com/kendo-ui/web/styling/icons.html).

#### Example - using icon

	<button type="button" id="editButton">Edit</button>
	<button type="button" id="deleteButton"><span class="k-icon"></span>Delete</button>

	<script>

	$(function(){
		$("#editButton").kendoButton({
			icon: "edit"
		});

		$("#deleteButton").kendoButton({
			icon: "delete"
		});
	});

	</script>

The above `icon` configuration will produce the following HTML output:

	<button type="button" id="editButton" class="k-button k-button-icontext"><span class="k-icon k-edit"></span>Edit</button>
	<button type="button" id="deleteButton" class="k-button k-button-icontext"><span class="k-icon k-delete"></span>Delete</button>

#### Example - using spriteCssClass

	<button type="button" id="editButton">Edit</button>
	<button type="button" id="deleteButton"><span class="k-sprite"></span>Delete</button>

	<script>

	$(function(){
		$("#editButton").kendoButton({
			spriteCssClass: "myEditIcon"
		});

		$("#deleteButton").kendoButton({
			spriteCssClass: "myDeleteIcon"
		});
	});

	</script>

Technically, `spriteCssClass` can be used to achieve the same result as `icon`, but `icon` will spare you the need to set two CSS classes at the same time and provides a certain level of abstraction.
For example, the following two configurations are practically identical. `#button2` will also apply a `k-sprite` CSS class to the `span` element, but it will not change the button appearance.

	$(function(){
		$("#button1").kendoButton({
			icon: "foo"
		});

		$("#button2").kendoButton({
			spriteCssClass: "k-icon k-foo"
		});
	});

In some cases you may want to use a **Button** with no text and only an icon inside.
In order to increase the accessibility of the **Button** in this case, a text label can be included inside the sprite `span`.

#### Example - using a Button with no text

	<button type="button" id="deleteButton"><span class="k-sprite">Delete</span></button>

	<script>

	$(function(){
		$("#deleteButton").kendoButton({
			spriteCssClass: "myDeleteIcon"
		});
	});

	</script>

### Image icons

Image icons are applied via the `imageUrl` property and are displayed as a `img` element.
This element can be rendered by the **Button** automatically, or an existing `img` element can be used, if it has a `k-image` CSS class.

#### Example - using imageUrl

	<button type="button" id="editButton">Edit</button>
	<button type="button" id="deleteButton"><img class="k-image" alt="Delete" />Delete</button>

	<script>

	$(function(){
		$("#editButton").kendoButton({
			imageUrl: "/images/myEditIcon.gif"
		});

		$("#deleteButton").kendoButton({
			imageUrl: "/images/myDeleteIcon.gif"
		});
	});

	</script>

In order to increase the accessibility of the **Button** when adding an `img` element manually, an `alt` attribute is required.

## Enabled and Disabled buttons

The business logic of an application often requires a certain button to be temporarily disabled or enabled.
The **Button** can be configured to be initially disabled via its `enable` property or by initializing it from an element, which has a `disabled="disabled"` HTML attribute.
The **Button** can also be disabled or enabled at any time with Javascript by using its `enable()` method with a boolean argument.

### Example - enable and disable the Button

	<button type="button" id="editButton">Edit</button>

	<script>

	$(function(){
		var editButton = $("#editButton").kendoButton({
			enable: false
		}).data("kendoButton");

		// ...

		// enable button
		editButton.enable(true);
	});

	</script>

For more information on the **Button** [`enable` property](/api/web/button#configuration-enable) and the [`enable` method](/api/web/button#methods-enable), please refer to the [Button API](/api/web/button/).

## Accessing the Button instance

Similar to all other Kendo UI widgets, an existing **Button** instance is accessed via the `.data()` jQuery method, executed by the jQuery object of the originating element.

### Example - accessing a Button instance

	<button type="button" id="editButton">Edit</button>

	<script>

	$(function(){
		$("#editButton").kendoButton();

		var editButton = $("#editButton").data("kendoButton");
	});

	</script>

The `kendoButton()` method returns the same jQuery object that has been used to execute it.
That's why, if the **Button** will be accessed afterwards, it is a good idea to save it at the time of initialization.

### Example - saving and accessing a reference to a Button instance

	<button type="button" id="editButton">Edit</button>
	<button type="button" id="deleteButton">Delete</button>

	<script>

	$(function(){
		// save button element and then the button widget object
		var editButtonElement = $("#editButton").kendoButton();
		var editButton = editButtonElement.data("kendoButton");

		// save the button widget object and then retrieve the DOM element as a jQuery object
		var deleteButton = $("#editButton").kendoButton().data("kendoButton");
		var deleteButtonElement = deleteButton.element;
	});

	</script>

For further reading and related information, please refer to the [Button API](/api/web/button/).

### Creating Floating Action Button

The Kendo UI Button can be used for creating different style of buttons, like the Floating Action Button from the Material Design theme. Here is an example:

    <button id="primaryTextButton" class="k-primary"></button>
    <script>
      $(document).ready(function () {
        $("#primaryTextButton").kendoButton({
          spriteCssClass: "k-icon k-i-plus"
        });
      });
    </script>

    <style scoped>
      .k-button {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        text-align: center;
      }

      .k-button-icontext .k-icon,
      .k-button-icontext .k-image {
        margin: 0;
      }
      .k-i-plus, .k-button-icon:hover span.k-icon.k-i-plus {
        background-position: -48px -64px;
        opacity: 1;
      }
    </style>

