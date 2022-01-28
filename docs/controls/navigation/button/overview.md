---
title: Overview
page_title: jQuery Button Documentation | Button Overview
description: "Get started with the jQuery Button by Kendo UI, initialize single or multiple buttons, and reference existing Button instances."
slug: overview_kendoui_button_widget
position: 1
---

# Button Overview

The Button provides a styled clickable UI functionality with arbitrary content.

Apart from consistent Kendo UI for jQuery styling, the Button provides keyboard operability for elements, which natively do not have it&mdash;for example, `span`.

* [Demo page for the Button](https://demos.telerik.com/kendo-ui/button/index) 

## Getting Started

Depending on the required scenario, you have options for initializing a single Button or multiple Buttons at once.   

### Initializing Single Buttons

While you can initialize the Button from any element and with any content, it is intuitive to use the `button` or the `a` element. When you use a `button` element inside a `form`, the default `type` HTML attribute for buttons is `submit` and clicking the button will submit the form and reload the page. To change this behavior, use an explicit `type="button"` HTML attribute.

The Button can include both inline (for example, `div` or `p`) and block (for example, `a` or `span`) elements. However, web standards prohibit placing block elements inside inline elements.

Placing clickable elements, such as hyperlinks or textboxes, with their own special behavior inside the Button may cause undesired side effects.

The following example demonstrates how to initialize a single button.

    <button type="button" id="refreshButton">Refresh</button>

  	<script>
  	$(function(){
  		$("#refreshButton").kendoButton();
  	});
  	</script>

### Initializing Multiple Buttons

Although each Button represents a separate widget instance on the page, multiple buttons can be initialized simultaneously. To do so, use either of the following approaches:

* Use a jQuery selector which returns multiple elements.

  The following example demonstrates how to initialize multiple Buttons by using a jQuery selector.

        <button type="button" class="myButton">Edit</button>
        <button type="button" class="myButton">Delete</button>
      	<button type="button" class="myButton">Add</button>

      	<script>
      	$(function(){
      		$(".myButton").kendoButton();
      	});
      	</script>

* Use the `kendo.init()` method which approach will allow you to initialize multiple Button widgets with different configuration options at once. For more information, refer to the documentation on [`data` attribute initialization]({% slug initialize_widgets_using_markup_installation %}) and [`kendo.init()` API](/api/javascript/kendo/methods/init).

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

## Functionality and Features

* [Disabled Button]({% slug disabled_button %})
* [Icon Button]({% slug icons_button %})
* [Globalization]({% slug globalization_button %})
* [Accessibility]({% slug accessibility_button %})

## Events

For a complete example on the basic Button events, refer to the [demo on using the events of the Button](https://demos.telerik.com/kendo-ui/button/events).

## Referencing Existing Instances

You can access an existing Button instance by using the `.data()` jQuery method which gets executed by the jQuery object of the originating element.

	 <button type="button" id="editButton">Edit</button>

  	<script>
  	$(function(){
  		$("#editButton").kendoButton();

  		var editButton = $("#editButton").data("kendoButton");
  	});
  	</script>

The `kendoButton()` method returns the same jQuery object that was used to execute it. If the Button will be accessed on a later stage, you can save it at the time of initialization. For more information, refer to the [Button API](/api/javascript/ui/button).

  	<button type="button" id="editButton">Edit</button>
  	<button type="button" id="deleteButton">Delete</button>

  	<script>
  	$(function(){
  		// Save the button element and then the button widget object.
  		var editButtonElement = $("#editButton").kendoButton();
  		var editButton = editButtonElement.data("kendoButton");

  		// Save the button widget object and then retrieve the DOM element as a jQuery object.
  		var deleteButton = $("#editButton").kendoButton().data("kendoButton");
  		var deleteButtonElement = deleteButton.element;
  	});
  	</script>

You can also use the Button for creating different button styles such is the Floating Action Button from the Material Design theme.

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

* [Basic Usage of the Button (Demo)](https://demos.telerik.com/kendo-ui/button/index)
* [Using the Basic Events of the Button (Demo)](https://demos.telerik.com/kendo-ui/button/events)
* [Binding the Button over MVVM (Demo)](https://demos.telerik.com/kendo-ui/button/mvvm)
* [Using the Button with AngularJS Directives (Demo)](https://demos.telerik.com/kendo-ui/button/angular)
* [Applying the Button API (Demo)](https://demos.telerik.com/kendo-ui/button/api)
* [JavaScript API Reference of the Button](/api/javascript/ui/button)
