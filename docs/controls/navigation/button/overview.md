---
title: Overview
page_title: Overview | Kendo UI Button
description: "Learn how to initialize the Kendo UI Button widget and apply its other options."
slug: overview_kendoui_button_widget
position: 1
---

# Button Overview

The [Kendo UI Button widget](http://demos.telerik.com/kendo-ui/button/index) provides a styled clickable UI functionality with arbitrary content. Apart from consistent Kendo UI styling, the Button provides keyboard operability for elements, which natively do not have it (e.g., `span`).

Note that the content of this article necessitates your understanding of the [fundamental Kendo UI widget concepts](/widgets).

## Getting Started

The Button widget can be initialized from any element with any content. However, using the `button` or `a` elements is more reasonable. When using a `button` element inside a `form`, you should be aware that the default `type` HTML attribute for buttons is `submit`. Clicking the button will submit the form and reload the page. If this is not desired, then use an explicit `type="button"` HTML attribute.

Kendo UI Button can include both inline and block elements, but make sure to take into account web standards, which prohibit placing block elements (e.g., `div`, `p`) inside inline elements (e.g., `a`, `span`).

Placing clickable elements with their own special behavior inside the Button widget (e.g., hyperlinks, textboxes, etc.) may cause undesired side effects.

### Initialize the Button

    <button type="button" id="refreshButton">Refresh</button>

	<script>
	$(function(){
		$("#refreshButton").kendoButton();
	});
	</script>

### Initialize Multiple Buttons

Although each Button represents a separate widget instance on the page, multiple buttons can be initialized simultaneously. There are two ways to do this:

* Use a jQuery selector, which returns multiple elements.
* Use `kendo.init()`.

#### Use a jQuery Selector

###### Example

    <button type="button" class="myButton">Edit</button>
    <button type="button" class="myButton">Delete</button>
	<button type="button" class="myButton">Add</button>

	<script>
	$(function(){
		$(".myButton").kendoButton();
	});
	</script>

#### Apply kendo.init()

This approach allows you to initialize multiple Button widgets at once, but with different configuration options. For more information, refer to [Data Attribute Initialization](/data-attribute-initialization) and [`kendo.init()` method description](/api/framework/kendo#methods-init).

###### Example

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

## Configuration

### Enable or Disable Buttons

The business logic of an application often requires a certain button to be temporarily disabled or enabled. Kendo UI Button can be configured to be initially disabled via its `enable` property or by initializing it from an element, which has a `disabled="disabled"` HTML attribute. The Button can also be disabled or enabled at any time with Javascript by using its `enable()` method with a boolean argument.

The example below demonstrates how to enable and disable the Button.

###### Example

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

For more information on the Button [`enable` property](/api/web/button#configuration-enable) and the [`enable` method](/api/web/button#methods-enable), please refer to the [Button API](/api/web/button/).    

## Add Icons

The Button can accommodate an icon, which enhances the meaning of the text content. The widget provides three ways to add an icon with a classic `img` element or with a background image (usually a sprite). From web standarts' point of view, using background images is better, because the icon does not represent structural content, but is simply a decoration.

Kendo UI Button provides three properties for configuring icons - `icon`, `spriteCssClass` and `imageUrl`. Use only one of them with a particular Button instance. If you defines multiple properties, only one of them will be obeyed and according to the order stated above.

### Background Icons

Background icons are applied via the `icon` or `spriteCssClass` property and are displayed as a background of a `span` element. The `span` element can be rendered by the Button automatically, or an existing `span` element can be used, if it has a `k-sprite` CSS class (or `k-icon` if the `icon` property is used). The difference between the two properties is that `icon` is intended to be used for built-in Kendo UI icons, which are part of the theme sprite. For a list of available icon names, please refer to the [Icons demo](http://demos.telerik.com/kendo-ui/web/styling/icons.html).

The example below demonstrates how to use icons in the Button widget.

###### Example

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

The `icon` configuration in this example will produce the following HTML output:

	<button type="button" id="editButton" class="k-button k-button-icontext"><span class="k-icon k-edit"></span>Edit</button>
	<button type="button" id="deleteButton" class="k-button k-button-icontext"><span class="k-icon k-delete"></span>Delete</button>

The example below demonstrates how to apply the `spriteCssClass`.

###### Example

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

Technically, `spriteCssClass` can be used to achieve the same result as `icon`, but `icon` spares you the need to set two CSS classes at the same time and provides a certain level of abstraction. For example, the following two configurations are practically identical. `#button2` also applies a `k-sprite` CSS class to the `span` element, but it does not change the button appearance.

###### Example

	$(function(){
		$("#button1").kendoButton({
			icon: "foo"
		});

		$("#button2").kendoButton({
			spriteCssClass: "k-icon k-foo"
		});
	});

In some cases you may want to use a Button with no text and only an icon inside. In order to increase the accessibility of the widget in this case, a text label can be included inside the sprite `span`.

The example below demonstrates how to use the Button with no text.

###### Example

	<button type="button" id="deleteButton"><span class="k-sprite">Delete</span></button>

	<script>

	$(function(){
		$("#deleteButton").kendoButton({
			spriteCssClass: "myDeleteIcon"
		});
	});

	</script>

### Image Icons

Image icons are applied via the `imageUrl` property and are displayed as a `img` element. This element can be rendered by the Button automatically, or an existing `img` element can be used if it has a `k-image` CSS class.

The example below demonstrates how to use the `imageUrl`.

###### Example

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

In order to increase the accessibility of the widget when adding an `img` element manually, an `alt` attribute is required.

### Font Icons

It is possible to use FontAwesome or other font icons inside the Kendo UI button by setting the required third-party CSS classes via the `spriteCssClass` property.
However, this will cause a `k-sprite` CSS class to be rendered and it applies some font and size styles, which may interfere with the font icons styles.
There are two ways to proceed in this case. One is to override the Kendo UI styles, which break the font icons.

###### Example

```html
<link rel="stylesheet"
    href="https://fortawesome.github.io/Font-Awesome/assets/font-awesome/css/font-awesome.css" />
<style>
    .k-button .fa {
        font-size: inherit;
        line-height: inherit;
        width: auto;
        height: auto;
        margin-left: 0;
    }
</style>

<button type="button" id="archiveButton">Archive</button>

<script>
    $("#archiveButton").kendoButton({
        spriteCssClass: "fa fa-archive"
    });
</script>
```

The other option is to include the required HTML markup and CSS classes inside the Kendo UI Button directly, as template content. In this way a `k-sprite` class will not be rendered by the Button.

###### Example

```html
<link rel="stylesheet"
    href="https://fortawesome.github.io/Font-Awesome/assets/font-awesome/css/font-awesome.css" />

<button type="button" id="archiveButton"><span class="fa fa-archive"></span> Archive</button>

<script>
    $("#archiveButton").kendoButton({});
</script>
```

## Reference

### Existing Instances

Similar to all other Kendo UI widgets, you can access an existing Button instance via the `.data()` jQuery method, executed by the jQuery object of the originating element.

The example below demonstrates how to access a Button instance.

###### Example

	<button type="button" id="editButton">Edit</button>

	<script>

	$(function(){
		$("#editButton").kendoButton();

		var editButton = $("#editButton").data("kendoButton");
	});

	</script>

The `kendoButton()` method returns the same jQuery object that has been used to execute it. That is why, if the Button is to be accessed afterwards, it is a good idea to save it at the time of initialization.

The example below demonstrates how to save and access a reference to a Button instance.

###### Example

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

Kendo UI Button can be used for creating different style of buttons, like the Floating Action Button from the Material Design theme.

The example below demonstrates how to create a Floating Action Button.

###### Example

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

## See Also

Other articles on Kendo UI Button:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the Button Widget](/aspnet-mvc/helpers/button/overview)
* [Overview of the Button JSP Tag]({% slug overview_button_uiforjsp %})
* [Overview of the Button PHP Class](/php/widgets/button/overview)
* [Button JavaScript API Reference](/api/javascript/ui/button)
