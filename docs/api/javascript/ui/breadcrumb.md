---
title: Breadcrumb
description: Configuration, methods and events of the Kendo UI Breadcrumb
res_type: api
component: breadcrumb
---

# kendo.ui.Breadcrumb

Represents the Kendo UI Breadcrumb widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### bindToLocation `Boolean` *(default: false)*

Indicates whether the **Breadcrumb** will enable/disable the binding to the location object of the browser on initialization.

#### Example

	<nav id="breadcrumb"></nav>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
            bindToLocation: true
        });
	</script>

### delimiterIcon `String` *(default: "chevron-right")*

Defines a name of an existing icon in [the Kendo UI Web Font Icons](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web). The icon will be applied as separator between the segments of the **Breadcrumb** path.

#### Example

	<nav id="breadcrumb"></nav>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
            delimiterIcon: "shape-line",
			value: 'Telerik UI/Navigation/Breadcrumb'
        });
	</script>

### editable `Boolean` *(default: false)*

Indicates whether the editing functionality of the **Breadcrumb** will be enabled/disabled.

If the option is enabled the path will be editable. Clicking in an empty area of the component will trigger editing mode. Editing mode shows an input showing the value of the component enabling the end user to type a new path.

#### Example

	<nav id="breadcrumb"></nav>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
            editable: true,
            value: 'Telerik UI/Navigation/Breadcrumb'
        });
	</script>

### items `Array`

Array of items to be rendered in **Breadcrumb**.

#### Example

	<nav id="breadcrumb"></nav>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
			items: [
				{ type:"rootitem", href: "mysite.com", text: "Home", showIcon: false, showText: true },
				{ type:"item", href: "/cloud", text: "Cloud", icon: "cloud", showText: false, showIcon: true }
			]
		});
	</script>

### items.encoded `Boolean` _(default: true)_

Defines whether to encode the item's text. To render entities or HTML, set it to `false`.

### items.type `String`

Defines the type of the item "rootitem" or "item".

### items.href `String`

Defines the navigation link's url of the item (rendered if `navigational` is `true`).

### items.text `String`

Defines the text of the item.

### items.icon `String`

Defines the icon to be rendered.

### items.itemClass `String`

Defines the item classes (the `li` element).

### items.linkClass `String`

Defines the link classes (the `a` element).

### items.iconClass `String`

Defines the icon classes (the `span` element).

### items.showIcon `Boolean`

Defines whether to show the icon. Default value is *true* for `rootItem` and *false* for `item`.

### items.showText `Boolean`

Defines whether to show the text. Default value is *false* for `rootItem` and *true* for `item`.

### gap `Number` *(default: 0)*

Defines the space in pixels after the last item to stay empty.

The gap value is taken into account when items overflow and continues to remain empty.

#### Example

	<div style="width: 400px">
		<nav id="breadcrumb"></nav>
	</div>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
            gap: 150,
            value: 'Telerik UI/Navigation/Breadcrumb'
        });
	</script>

### messages `Object`

Defines the text of the root icon title that is displayed within the **Breadcrumb**.

#### Example

    <nav id="breadcrumb"></nav>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
            value: 'Telerik UI/Navigation/Breadcrumb',
			messages: {
				rootTitle: 'Click here to navigate to root'
			}
        });
	</script>

### messages.rootTitle `String` *(default: "Go to root")*

The label for the root icon of the **Breadcrumb**.

#### Example

    <nav id="breadcrumb"></nav>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
            value: 'Telerik UI/Navigation/Breadcrumb',
			messages: {
				rootTitle: 'Click here to navigate to root'
			}
        });
	</script>

### navigational `Boolean` *(default: false)*

Indicates whether the navigation functionality of the **Breadcrumb** will be enabled/disabled.

When `navigational` is set to `false`, automatic navigation (changing url location) is disabled by default. In this state, the click event will be prevented and navigation will occur only if programmatic navigation is implemented.

When `navigational` is set to `true`, the url (path) will be automatically added to the href attribute of the rendered links. In this state, the click event will trigger navigation.

#### Example

	<nav id="breadcrumb"></nav>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
            navigational: true,
			bindToLocation: true
        });
	</script>

### rootIcon `String` *(default: "home")*

Defines a name of an existing icon in [the Kendo UI Web Font Icons](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web). The icon will be applied as the first item(root) of **Breadcrumb** path.

The root icon is clickable and resets the value of the component.

#### Example

	<nav id="breadcrumb"></nav>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
            rootIcon: "cloud",
			value: 'Telerik UI/Navigation/Breadcrumb'
        });
	</script>

### size `String` *(default: "medium")*

Sets a value controlling size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"

#### Example

	<nav id="breadcrumb"></nav>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
			size: "large",
            rootIcon: "cloud",
			value: 'Telerik UI/Navigation/Breadcrumb'
        });
	</script>

### value `String` *(default: "")*

Defines the value/path of the component. Each segments is separated by a slash.

#### Example


	<nav id="breadcrumb"></nav>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
            value: 'Telerik UI/Navigation/Breadcrumb'
        });
	</script>

## Methods

### value

A getter and setter for the value of the component.

#### Parameters

##### path `String`

The path segments separated by slash.

#### Example

	<nav id="breadcrumb"></nav>

	<script>
        var breadcrumb = $("#breadcrumb").kendoBreadcrumb({
            gap: 10
        }).getKendoBreadcrumb();

		breadcrumb.value('Telerik UI/Navigation/Breadcrumb');
	</script>

### items

A getter and setter for the items rendered in the component.

#### Parameters

##### items `Array`

The path segments separated by slash.

#### Example

	<nav id="breadcrumb"></nav>

	<script>
        var breadcrumb = $("#breadcrumb").kendoBreadcrumb({

        }).getKendoBreadcrumb();

		breadcrumb.items([
			{ type: "rootitem", text: "Home", showText: true, showIcon: false }
		]);
	</script>

## Events

### click

Fires when an item or a rootitem is clicked.

#### Event Data

##### e.originalEvent `Object`

The original DOM event.

##### e.sender `kendo.ui.Breadcrumb`

The Breadcrumb instance that triggered the event.

##### e.isRoot `Boolean`

Indicates if the event is triggered from the rootitem.

##### e.item `Object`

The item representation of the clicked instance.

##### e.preventDefault `Function`

If invoked prevents the click action.

#### Example - subscribe to the "click" event during initialization

	<nav id="breadcrumb"></nav>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
            value: 'Telerik UI/Navigation/Breadcrumb',
			click: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
				console.log(e.sender);
			}
        });

	</script>

#### Example - subscribe to the "click" event after initialization

	<nav id="breadcrumb"></nav>

	<script>
        var breadcrumb = $("#breadcrumb").kendoBreadcrumb({
            value: 'Telerik UI/Navigation/Breadcrumb'
        }).getKendoBreadcrumb();

		breadcrumb.bind('click', function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
			console.log(e.sender);
		});
	</script>

### change

Fires when the value of the Breadcrumb is changed.

#### Event Data

##### e.sender `kendo.ui.Breadcrumb`

The Breadcrumb instance that triggered the event.

##### e.value `String`

The new value(path) of the Breadcrumb.

#### Example - handling the change event

    <nav id="breadcrumb"></nav>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
            value: 'Telerik UI/Navigation/Breadcrumb',
			change: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
				console.log(e.value);
			}
        });
	</script>
