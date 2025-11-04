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


<div class="meta-api-description">
How do I sync Kendo UI breadcrumb with browser location on initialization? Configure synchronization between breadcrumb navigation and the browser’s current URL or location state during component startup, enabling or disabling automatic reflection of the active page or route in the breadcrumb trail, controlling whether the breadcrumb updates based on window location on initialization, managing binding to the browser’s address or location object to keep breadcrumbs consistent with the loaded page, setting how breadcrumb links correspond to the current path or URL at load time, toggling breadcrumb linkage to browser history or location for initial state representation in navigation UI.
</div>

#### Example

	<nav id="breadcrumb"></nav>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
            bindToLocation: true
        });
	</script>

### delimiterIcon `String` *(default: "chevron-right")*

Defines a name of an existing icon in [the Kendo UI Web Font Icons](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web). The icon will be applied as separator between the segments of the **Breadcrumb** path.


<div class="meta-api-description">
How do I customize the separator icon in Kendo UI Breadcrumb widget? Configure or customize the visual separator between breadcrumb navigation items by selecting or setting the icon that divides path segments, enabling control over the appearance of breadcrumb dividers using predefined icon names or visual symbols from a web font icon set, including changing, replacing, or styling the breadcrumb separators to enhance navigation clarity and UI consistency.
</div>

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


<div class="meta-api-description">
How can I enable inline editing in Kendo UI breadcrumb component? Control whether users can modify the navigation path directly within the breadcrumb component by enabling inline editing mode, allowing interactive text input for changing the current path dynamically; this setting supports toggling path editability so developers can allow or restrict users from clicking the breadcrumb area to activate a text field prepopulated with the existing path for quick adjustments, path updates, or manual navigation entry in user interfaces where flexible breadcrumb manipulation or real-time path modification is required.
</div>

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


<div class="meta-api-description">
How do I customize the navigation trail in Kendo UI's Breadcrumb widget? Configure or customize the navigation trail by specifying an ordered list or array of navigation elements, each representing a step or link in the breadcrumb path; control the sequence, labels, and content of these navigation entries to shape the breadcrumb navigation experience, set hierarchical navigation links, define paths for users to backtrack, enable dynamic or static breadcrumb displays, and manage how navigation steps appear in user interfaces.
</div>

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


<div class="meta-api-description">
How to prevent cross-site scripting in Kendo UI breadcrumb items? Control whether the text of each breadcrumb item is HTML-encoded or treated as raw HTML markup during rendering, enabling developers to toggle encoding on or off to either escape special characters for safe display or allow inserting HTML entities and tags directly. This setting is useful for handling safe versus untrusted content, preventing cross-site scripting by encoding user input, or rendering trusted HTML snippets within breadcrumb navigation. Adjust the encoding behavior to configure how breadcrumb labels are processed, whether to sanitize and escape text automatically or to display formatted HTML content inside navigation items. Manage breadcrumb item text formatting for security and presentation by enabling or disabling HTML escaping, encoding, or raw HTML rendering depending on the content source and desired output.
</div>

#### Example

	<nav id="breadcrumb"></nav>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
			items: [
				{ type:"rootitem", text: "Home", showText: true },
				{ type:"item", text: "&lt;strong&gt;HTML Content&lt;/strong&gt;", encoded: false },
				{ type:"item", text: "Regular Text", encoded: true }
			]
		});
	</script>

### items.type `String`

Defines the type of the item "rootitem" or "item".


<div class="meta-api-description">
How do I specify the type of breadcrumb item in Kendo UI for jQuery? Set or specify the category, label, or classification for navigation breadcrumb entries to distinguish between primary root-level elements and standard or subordinate items, enabling control over hierarchy, display styling, traversal order, navigation path structure, or rendering behavior in breadcrumb components or menus. This property facilitates defining whether each breadcrumb segment acts as a starting point, a main node, or a regular step in the navigation trail, supporting customization of breadcrumb appearance, interaction, and logical separation of navigation stages. Adjust or configure the type attribute for breadcrumb entries to manage their role within the navigation hierarchy, such as marking root or intermediate levels, ensuring correct visual representation and user understanding of the navigation context.
</div>

#### Example

	<nav id="breadcrumb"></nav>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
			items: [
				{ type: "rootitem", text: "Home", showText: true },
				{ type: "item", text: "Products" },
				{ type: "item", text: "Laptops" }
			]
		});
	</script>

### items.href `String`

Defines the navigation link's url of the item (rendered if `navigational` is `true`).


<div class="meta-api-description">
How do I set the link for individual breadcrumb items in Kendo UI? Configure the destination link or URL for individual breadcrumb elements to enable clickable navigation paths, set or update the hyperlink target for breadcrumb items, define where each breadcrumb directs users when selecting it, control the anchor URL used for navigation in breadcrumb trails, specify link addresses for breadcrumb steps, enable linking behavior by assigning destination URLs to breadcrumb entries, customize the navigation target of breadcrumb elements, and manage how breadcrumb items route users through links within a navigational trail or breadcrumb menu.
</div>

#### Example

	<nav id="breadcrumb"></nav>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
			navigational: true,
			items: [
				{ type: "rootitem", href: "/", text: "Home", showText: true },
				{ type: "item", href: "/products", text: "Products" },
				{ type: "item", href: "/products/laptops", text: "Laptops" }
			]
		});
	</script>

### items.text `String`

Defines the text of the item.


<div class="meta-api-description">
How do I customize the visible label for each entry in a Kendo UI breadcrumb navigation trail? Control the visible label, display text, or title for each entry in a breadcrumb navigation trail by setting static strings or dynamic data fields that define how breadcrumb links, steps, or path segments appear during rendering, templating, updating, or localization, enabling customization of breadcrumb item names, captions, or identifiers for user-friendly navigation and adaptive UI text.
</div>

#### Example

	<nav id="breadcrumb"></nav>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
			items: [
				{ type: "rootitem", text: "Dashboard", showText: true },
				{ type: "item", text: "User Management" },
				{ type: "item", text: "Edit Profile" }
			]
		});
	</script>

### items.icon `String`

Defines the icon to be rendered.


<div class="meta-api-description">
How do I customize the icon displayed next to each breadcrumb item? Control and customize the visual icons or markers displayed next to each navigation path segment by setting graphical elements such as CSS class-based icons, inline SVG graphics, image URLs, or symbol markers within breadcrumb items; configure, enable, or replace the icon representation alongside breadcrumb labels to enhance navigation clarity, customize UI indicators, or visually denote specific path elements in breadcrumb trails and navigation components.
</div>

#### Example

	<nav id="breadcrumb"></nav>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
			items: [
				{ type: "rootitem", icon: "home", showIcon: true, showText: false },
				{ type: "item", icon: "folder", text: "Documents", showIcon: true },
				{ type: "item", icon: "file", text: "readme.txt", showIcon: true }
			]
		});
	</script>

### items.itemClass `String`

Defines the item classes (the `li` element).


<div class="meta-api-description">
How do I customize the appearance of individual breadcrumb items in Kendo UI for jQuery? Set or configure CSS class names for individual breadcrumb list items to control their appearance, styling, icons, layout, or interactive behavior. Customize or override default classes on the breadcrumb item elements to apply specific styles, animations, or JavaScript hooks. Enable adding single or multiple class names for each breadcrumb element to precisely target them with CSS selectors or scripting, control spacing, colors, icons, hover effects, or responsive design of breadcrumb navigation items. Adjust or modify the class attribute on breadcrumb list entries to tailor their visual presentation, integrate custom styles, or manage item-specific UI behaviors in breadcrumb trails.
</div>

#### Example

	<nav id="breadcrumb"></nav>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
			items: [
				{ type: "rootitem", text: "Home", itemClass: "custom-root-item", showText: true },
				{ type: "item", text: "Products", itemClass: "custom-nav-item" },
				{ type: "item", text: "Laptops", itemClass: "custom-nav-item highlighted" }
			]
		});
	</script>

### items.linkClass `String`

Defines the link classes (the `a` element).


<div class="meta-api-description">
How to customize breadcrumb link styling in Kendo UI for jQuery? Customize navigation link styling by assigning one or multiple CSS class names to breadcrumb item anchors, enabling precise control over link appearance, hover effects, active states, and interactive behaviors within breadcrumb trails. Configure or override default breadcrumb link classes to match branding, theming, or accessibility requirements, ensuring consistent styling for anchor elements inside breadcrumb items. Use class selectors to modify link colors, fonts, spacing, or add animations on breadcrumb `a` tags for enhanced user interface customization and improved navigation clarity.
</div>

#### Example

	<nav id="breadcrumb"></nav>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
			navigational: true,
			items: [
				{ type: "rootitem", href: "/", text: "Home", linkClass: "custom-root-link", showText: true },
				{ type: "item", href: "/products", text: "Products", linkClass: "custom-nav-link" },
				{ type: "item", href: "/products/laptops", text: "Laptops", linkClass: "custom-nav-link active" }
			]
		});
	</script>

### items.iconClass `String`

Defines the icon classes (the `span` element).


<div class="meta-api-description">
How to customize the icon class for breadcrumb items in Kendo UI? Control and customize the icon appearance within breadcrumb navigation by assigning CSS class names to the icon element, enabling the use of various font-icon libraries, custom icon sets, or specific styling on the breadcrumb item icons. Configure, set, or apply CSS classes that define icon visuals inside breadcrumb spans, allowing developers to integrate font-based icons, icon fonts, or custom styles to enhance breadcrumb item symbols, ensuring flexible icon theming and consistent navigation iconography across different UI designs.
</div>

#### Example

	<nav id="breadcrumb"></nav>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
			items: [
				{ type: "rootitem", icon: "home", iconClass: "custom-root-icon", showIcon: true, showText: false },
				{ type: "item", icon: "folder", text: "Documents", iconClass: "custom-folder-icon", showIcon: true },
				{ type: "item", icon: "file", text: "readme.txt", iconClass: "custom-file-icon large", showIcon: true }
			]
		});
	</script>

### items.showIcon `Boolean`

Defines whether to show the icon. Default value is *true* for `rootItem` and *false* for `item`.


<div class="meta-api-description">
How to show icons next to breadcrumb entries in Kendo UI for jQuery? Control the visibility of icons next to breadcrumb entries by enabling or disabling icon display for each item individually, with options to show or hide icons for root or child breadcrumb elements. Configure whether breadcrumb steps display icons, toggle item icon visibility true or false, set icon presence on parent or leaf nodes, customize showing or hiding graphical indicators in breadcrumb navigation paths, and adjust icon appearance per breadcrumb node to highlight or simplify navigation cues. Manage icon rendering in breadcrumb trails to improve UI clarity or minimize clutter, supporting both global and per-item icon visibility preferences.
</div>

#### Example

	<nav id="breadcrumb"></nav>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
			items: [
				{ type: "rootitem", icon: "home", showIcon: true, showText: false },
				{ type: "item", icon: "folder", text: "Documents", showIcon: false },
				{ type: "item", icon: "file", text: "readme.txt", showIcon: true }
			]
		});
	</script>

### items.showText `Boolean`

Defines whether to show the text. Default value is *false* for `rootItem` and *true* for `item`.


<div class="meta-api-description">
How do I control whether each breadcrumb segment shows descriptive text in Kendo UI for jQuery? Control the visibility of text labels for each navigation step within breadcrumb trails, enabling the display or concealment of item names or titles individually or globally. Configure whether each breadcrumb segment shows descriptive text or remains icon-only, useful for customizing user interface clarity, saving space, or emphasizing minimalism. Adjust settings to show text on root, intermediate, or leaf items, toggle label rendering per entry, enable or disable textual cues in hierarchical navigation paths, and fine-tune the appearance of navigational breadcrumbs by controlling the presence of readable text versus compact indicators. This supports developer needs around UI customization, accessibility considerations, and different design requirements for breadcrumb navigation elements.
</div>

#### Example

	<nav id="breadcrumb"></nav>

	<script>
        $("#breadcrumb").kendoBreadcrumb({
			items: [
				{ type: "rootitem", icon: "home", text: "Home", showIcon: true, showText: false },
				{ type: "item", text: "Documents", showText: true },
				{ type: "item", text: "readme.txt", showText: false, icon: "file", showIcon: true }
			]
		});
	</script>

### gap `Number` *(default: 0)*

Defines the space in pixels after the last item to stay empty.

The gap value is taken into account when items overflow and continues to remain empty.


<div class="meta-api-description">
How do I set the gap between breadcrumb items in Kendo UI for jQuery? Control, configure, or set the amount of empty space or padding after the last breadcrumb item, adjusting the trailing margin or gap in pixels to maintain consistent spacing and layout. Enable developers to reserve fixed pixel spacing beyond the final breadcrumb regardless of overflow situations, helping to manage horizontal alignment, visual separation, and aesthetic spacing in navigation components. This spacing parameter influences how breadcrumbs appear with overflow control and prevents items from crowding the container edge by preserving empty areas after the last element. Adjust or customize the end gap to refine UI spacing, styling, or alignment in breadcrumb navigation bars across different screen sizes and layouts.
</div>

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


<div class="meta-api-description">
How do I customize the tooltip text for the root icon in a Kendo UI breadcrumb navigation? Customize or translate the tooltip text, title attribute, or accessible name for the root icon in breadcrumb navigation to support different languages, localization needs, multilingual interfaces, or custom display labels, enabling developers to set, override, or configure the displayed descriptive text, icon title, or accessible label used for navigation breadcrumbs in various regional or language-specific contexts.
</div>

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


<div class="meta-api-description">
How do I customize the root title in Kendo UI breadcrumb navigation? Customize or set the label text for the root icon in breadcrumb navigation, enabling localization, accessibility improvements, or personalized naming for the home or starting point indicator in breadcrumb trails; control the displayed root title to fit interface language preferences, user experience design, and clarity in navigation hierarchies.
</div>

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


<div class="meta-api-description">
How do I control breadcrumb link behavior in Kendo UI for jQuery? Enable or disable clickable breadcrumb links, control if breadcrumb items update the URL automatically on click, manage navigation behavior so clicks either trigger page changes or only execute custom code without changing the address bar, toggle between programmatic routing versus user-driven URL updates, configure whether breadcrumb paths function as active hyperlinks or static labels, set navigation mode to allow or prevent default link clicks and history changes, determine if interacting with breadcrumb elements causes browser navigation or suppresses it for manual control, customize breadcrumb navigation to suit single-page app routing or traditional link-based page loads, adjust breadcrumb interactivity for seamless user experience by enabling or disabling link-based navigation, and control how breadcrumb trails reflect navigation state in the URL through clickable vs non-clickable items.
</div>

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


<div class="meta-api-description">
How do I configure a home icon in Kendo UI breadcrumb navigation? Configure a clickable home or root icon to appear as the first element in breadcrumb navigation that serves as a reset or starting point; customize this icon by specifying any supported icon name from the web font icon set to enable quick navigation back to the initial state or homepage, allowing users to efficiently reset or clear current breadcrumb selections and improve navigation flow.
</div>

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


<div class="meta-api-description">
How do I adjust the size of Kendo UI Breadcrumb navigation element in jQuery? Adjust the breadcrumb navigation element’s overall scale and spacing by configuring its size to predefined options like small, medium, large, or none, controlling typography weight, icon dimensions, and button proportions to create compact or prominent breadcrumb displays, customize visual hierarchy, spacing consistency, and responsiveness, and optimize navigation cues by scaling breadcrumb elements for different screen sizes, design aesthetics, or user interface density requirements.
</div>

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


<div class="meta-api-description">
How can I update the breadcrumb path in Kendo UI for jQuery? Manage or retrieve the current navigation path displayed in the breadcrumb trail, defining hierarchical location using slash-separated segments like home/documents/images; update or set this path string programmatically to control navigation state, reflect user selection, customize breadcrumb display, implement dynamic routing paths, or synchronize UI navigation indicators across the application.
</div>

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


<div class="meta-api-description">
How do I change the current breadcrumb value in Kendo UI? Retrieve or update the current value of the breadcrumb component by calling the method with or without parameters, enabling reading the active breadcrumb value or setting a new one to change the navigation state; configure, access, modify, or control the breadcrumb's selected item, current path segment, or active state dynamically through this getter and setter functionality.
</div>

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


<div class="meta-api-description">
How do I update the breadcrumb navigation elements in Kendo UI? Retrieve, update, or replace the collection of navigation elements displayed in a breadcrumb trail by getting or setting the list of breadcrumb entries, enabling dynamic control over the sequence of links or labels shown, supporting operations such as accessing the current set of navigation items, modifying them programmatically, binding new data to update the displayed path, and managing breadcrumb content for dynamic user interface changes or navigation state adjustments.
</div>

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


<div class="meta-api-description">
How to handle click events on breadcrumb items in Kendo UI for jQuery? Handle user interactions with breadcrumb navigation by detecting when any breadcrumb item or the root element is clicked, capturing the selected item's information for dynamic response such as triggering page navigation, updating interface elements, executing custom event handlers, or managing breadcrumb trail behavior. Enable event-driven logic to respond to clicks on hierarchical navigation links, supporting UI updates, navigation control, user path tracking, and contextual actions based on the clicked breadcrumb node data.
</div>

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


<div class="meta-api-description">
How do I detect changes to the breadcrumb navigation selection in Kendo UI for jQuery? Detect and handle updates or modifications in the breadcrumb navigation selection, capturing when users alter or switch breadcrumb items by listening for change events; configure event listeners to track changes in the current breadcrumb value, enabling synchronization of application state, model updates, navigation triggers, validation routines, or responsive UI adjustments whenever the breadcrumb path changes or selection updates occur, with event data providing context about the source component and the specifics of the change for dynamic response and state management.
</div>

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