---
title: Button
description: Configuration, methods and events of the Kendo UI Button
res_type: api
component: button
---

# kendo.ui.Button

## Configuration

### badge `Boolean|String|Object`

If set to true a default overlay badge will be displayed. If set to a string, an ovelay with content set to the specified string will be displayed. Can be set to a JavaScript object which represents the configuration of the [`Badge widget`](/api/javascript/ui/badge).

#### Example - boolean badge

	<button id="button" type="button">Foo</button>
	<script>
		$("#button").kendoButton({
			badge: true
		});
	</script>

#### Example - string badge

	<button id="button" type="button">Foo</button>
	<script>
		$("#button").kendoButton({
			badge: '99+'
		});
	</script>

### badge.appearance  `String` *(default: pill)*

Specifies the shape of the badge - `rectangle` or `pill`.

#### Example

	<button id="button" type="button">Foo</button>
	<script>
		$("#button").kendoButton({
			badge: {
				appearance: 'rectangle'
			}
		});
	</script>

### badge.look `String` *(default: flat)*

Specifies the look of the badge - `flat` or `outline`.

#### Example

	<button id="button" type="button">Foo</button>
	<script>
		$("#button").kendoButton({
			badge: {
				look: 'outline'
			}
		});
	</script>

### badge.overlay `Boolean` *(default: true)*

If set to false the badge is displayed inside the button.

#### Example

	<button id="button" type="button">Foo</button>
	<script>
		$("#button").kendoButton({
			badge: {
				overlay: false,
				value: 15
			}
		});
	</script>

### badge.template `String|Function`

The template which renders the content of the badge

#### Example - string template

	<button id="button" type="button">Foo</button>
	<script>
		$("#button").kendoButton({
			badge: {
				value: 1234,
				template: '#=value > 99? "99+" : value#'
			}
		});
	</script>

#### Example - function template

	<button id="button" type="button">Foo</button>
	<script>
		$("#button").kendoButton({
			badge: {
				value: 1234,
				template: function (value){
					return value > 99 ? '99+' : value;
				}
			}
		});
	</script>

### badge.type `String`

Specifies the type of the badge - `primary`, `secondary`, `info`, `success`, `warning` and `error`.

#### Example - string template

	<button id="button" type="button">Foo</button>
	<script>
		$("#button").kendoButton({
			badge: {
				type: 'warning'
			}
		});
	</script>

### badge.value `String|Number`

The value of the badge

#### Example - string template

	<button id="button" type="button">Foo</button>
	<script>
		$("#button").kendoButton({
			badge: {
				 value: 15
			}
		});
	</script>

### badge.visible `Boolean`

If set to false the badge will not be displayed.

#### Example - string template

	<button id="button" type="button">Foo</button>
	<script>
		$("#button").kendoButton({
			badge: {
				 visible: false
			}
		});
	</script>

### enable `Boolean` *(default: true)*

Indicates whether the **Button** should be enabled or disabled. By default, it is enabled, unless a `disabled="disabled"` attribute is detected.

#### Example

	<button id="button" type="button">Foo</button>
	<script>
	$("#button").kendoButton({
		enable: false
	});
	</script>

### icon `String`

Defines a name of an existing icon in the Kendo UI theme sprite. The icon will be applied as background image of a `span` element inside the **Button**.
The `span` element can be added automatically by the widget, or an existing element can be used, if it has a `k-icon` CSS class applied.
For a list of available icon names, please refer to the [Icons demo](http://demos.telerik.com/kendo-ui/web/styling/icons.html).

#### Example

	<button id="button" type="button">Cancel</button>
	<script>
	$("#button").kendoButton({
		icon: "cancel"
	});
	</script>

#### Example with an existing span element

	<button id="button" type="button">
		<span class="k-icon"></span> Cancel
	</button>
	<script>
	$("#button").kendoButton({
		icon: "cancel"
	});
	</script>


### iconClass `String`

Defines a CSS class - or multiple classes separated by spaced - which are applied to a `span` element inside the **Button**. Allows the usage of custom icons.

#### Example

	<link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />
	<button id="button" type="button">Cancel</button>
	<script>
	$("#button").kendoButton({
		iconClass: "fa fa-male"
	});
	</script>

### imageUrl `String`

Defines a URL, which will be used for an `img` element inside the Button. The URL can be relative or absolute. In case it is relative, it will be evaluated with relation to the web page URL.

The `img` element can be added automatically by the widget, or an existing element can be used, if it has a `k-image` CSS class applied.

#### Example

	<button id="button" type="button">Edit</button>
	<script>
	$("#button").kendoButton({
		imageUrl: "/images/edit-icon.gif"
	});
	</script>

#### Example with an existing img element

	<button id="button" type="button">
		<img class="k-image" alt="Edit" /> Edit
	</button>
	<script>
	$("#button").kendoButton({
		imageUrl: "/images/edit-icon.gif"
	});
	</script>

### spriteCssClass `String`

Defines a CSS class (or multiple classes separated by spaces), which will be used for applying a background image to a `span` element inside the **Button**.
In case you want to use an icon from the Kendo UI theme sprite background image, it is easier to use the [`icon` property](/api/javascript/ui/button#configuration-icon).

The `span` element can be added automatically by the widget, or an existing element can be used, if it has a `k-sprite` CSS class applied.

#### Example

	<button id="button" type="button">Edit</button>
	<script>
	$("#button").kendoButton({
		spriteCssClass: "myEditIcon"
	});
	</script>

#### Example with an existing span element

	<button id="button" type="button">
		<span class="k-sprite"></span> Edit
	</button>
	<script>
	$("#button").kendoButton({
		spriteCssClass: "myEditIcon"
	});
	</script>

## Methods

### enable

Enables or disables the Button.

#### Parameters

##### toggle `Boolean`

Indicates whether the **Button** should be enabled or disabled. `true` and `false` arguments are accepted. If no argument is supplied, the **Button** will assume `true` and will be enabled.

#### Example

	<button id="button" type="button">Edit</button>
	<script>
	$("#button").kendoButton();
	var button = $("#button").data("kendoButton");
	// disable button
	button.enable(false);
	// enable button
	button.enable(true);
	</script>

## Events

### click

Fires when the **Button** is clicked with the mouse, touched on a touch device, or ENTER (or SPACE) is pressed while the **Button** is focused.

#### Event Data

##### e.event `Object`

The original DOM event.

#### Example - subscribe to the "click" event during initialization

	<button id="button" type="button">Edit</button>
	<script>
	$("#button").kendoButton({
		click: function(e) {
			alert(e.event.target.tagName);
		}
	});
	</script>

#### Example - subscribe to the "click" event after initialization

	<button id="button" type="button">Edit</button>
	<script>
	$("#button").kendoButton();
	var button = $("#button").data("kendoButton");
	button.bind("click", function(e) {
		alert(e.event.target.tagName);
	});
	</script>
