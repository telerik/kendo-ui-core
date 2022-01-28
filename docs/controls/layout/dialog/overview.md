---
title: Overview
page_title: jQuery Dialog Documentation | Dialog Overview
description: "Get started with the jQuery Dialog by Kendo UI and learn how to create, initialize, and enable the widget."
previous_url: /web/dialog/overview, /getting-started/web/dialog/overview
slug: overview_kendoui_dialog_widget
position: 1
---

# Dialog Overview

The Dialog is a modal popup that brings information to the user.

It also provides actions through its action buttons to prompt the user for input or to ask for a decision. The component can also contain more complex UI elements that require the focus of the user. The Dialog is a subset of the [Kendo UI for jQuery Window](https://www.telerik.com/kendo-ui/window) where the most prominent difference is the added functionality for actions and predefined dialogs.

* [Demo page for the Dialog](https://demos.telerik.com/kendo-ui/dialog/index)

## Initializing the Dialog

To initialize the Dialog, you can use virtually any DOM element. During initialization, the targeted content will be automatically wrapped in the `div` element of the widget. By default, once initialized, the Dialog is open and is rendered near the location of the DOM element that was used to initialize its content.

The following example demonstrates how to create the Dialog from an HTML element which contains the content of the Dialog and initialize it by using a jQuery selector.

    <div id="dialog">
        Content of the Dialog
    </div>

    $(document).ready(function() {
        $("#dialog").kendoDialog();
    });

By default, the Dialog is created as a child of the `<body>` element. The following example demonstrates the possible markup before the initialization of the widget.

	<body>
		<div id="container1">
			<div id="dialog">
				Content of the Dialog
			</div>
			...
		</div>
		<div id="container2">
			...
		</div>
	</body>

The following example demonstrates how the page markup from the previous example changes after the initialization of the Dialog when the widget is moved to become a child of the `<body>` and its additional markup (the wrapper and the title bar) is generated.

	<body>
		<div id="container1">
			...
		</div>
		<div id="container2">
			...
		</div>
		<div class="k-widget k-dialog k-window">
			<div class="k-window-titlebar">...</div>
			<div id="dialog" class="k-content">
				Content of the Dialog
			</div>
		</div>
	</body>

## Basic Configuration

The Dialog provides default configuration options that can be set during initialization such as its height and width, custom action buttons, title and **Close** buttons, animation effects and duration, and so on.

The following example demonstrates how to create a non-modal Dialog that contains two action buttons and no **Close** button.

    $("#dialog").kendoDialog({
        width: "400px",
        title: "Software Update",
        closable: false,
        modal: false,
        content: "<p>A new version of <strong>Kendo UI</strong> is available. Would you like to download and install it now?<p>",
        actions: [
            { text: 'NO' },
            { text: 'OK', primary: true }
        ]
    });

## Functionality and Features

* [Basic operations]({% slug basicoperations_kendoui_dialog %})
* [Predefined Dialog types]({% slug types_kendoui_dialog %})
* [Action buttons]({% slug actionbuttons_kendoui_dialog %})
* [Printing]({% slug printing_kendoui_dialog %})
* [Appearance]({% slug appearance_kendoui_dialog %})

## Referencing Existing Instances

To refer to an existing Dialog instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/). Once a reference has been established, use the [Dialog API](/api/javascript/ui/dialog) to control its behavior.

The following example demonstrates how to access an existing Dialog instance.

    var dialog = $("#dialog").data("kendoDialog");

## See Also

* [Basic Usage of the Dialog (Demo)](https://demos.telerik.com/kendo-ui/dialog/index)
* [Using the API of the Dialog (Demo)](https://demos.telerik.com/kendo-ui/dialog/api)
* [JavaScript API Reference of the Dialog](/api/javascript/ui/dialog)
