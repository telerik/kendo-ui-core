---
title: Overview
page_title: Overview | Kendo UI Dialog
description: "Learn how to initialize the Kendo UI Dialog widget and configure its behaviors."
slug: overview_kendoui_dialog_widget
position: 1
---

# Dialog Overview

The [Kendo UI Dialog widget](http://demos.telerik.com/kendo-ui/dialog/index) is a modal popup that brings information to the user. It also provides actions through the action buttons to prompt the user for input or to ask for a decision. The component can also contain more complex UI elements that require the focus of the user. The Dialog widget is a subset of the [Kendo UI Window widget](http://www.telerik.com/kendo-ui/window) where the most prominent difference is the added functionality for actions and predefined dialogs.

## Getting Started

### Initialize the Dialog

Kendo UI Dialog can be initialized from virtually any DOM element. During initialization, the targeted content is going to be automatically wrapped in the `div` element of the widget.

The example below demonstrates how to create the widget from a simple HTML element with the content of the Dialog and initialize it by using a jQuery selector.

###### Example

    <div id="dialog">
        Content of the Dialog
    </div>

    $(document).ready(function() {
        $("#dialog").kendoDialog();
    });

When a Dialog is initialized, it is going to be automatically displayed as open near the location of the DOM element, which was used to initialize the content.

### HTML Structure and DOM Placement

With regard to the CSS selectors or element discovery via Javascript, take into account that, by default, the Dialog is created as a child of the `<body>` element.

The example below demonstrates the possible markup before the initialization of the Kendo UI Dialog.

###### Example

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

The example below demonstrates how the above page markup changes after the initialization of the Kendo UI Dialog, when the widget is moved to become a child of the `<body>` and its additional markup is generated&mdash;that is, the wrapper and the title bar.

###### Example

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

## Configuration

### Defaults

Kendo UI Dialog provides default configuration options that can be set during initialization. Some of the properties that can be overridden and controlled are:

*   Minimum and maximum height and width during resizing
*   Custom action buttons and their layout
*   Title and close button
*   Animation effects and duration
*	Modality
*   Predefined dialogs

The example below demonstrates how to create a non-modal Dialog that contains two action buttons and no close button.

###### Example

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


### Action Buttons

You can provide specific interaction to users via dialog widget action buttons. Each button has a text and an action handler attached to it. Generally, each button closes the dialog as its last action but you can cancel that from the custom action handler.

The order of the values in the actions array determines the order in which the action buttons will be rendered in the Dialog. You can define the button as `primary` as well.

The example below demonstrates how to set three action buttons in a Dialog with a `stretched` layout. The last button has an `action` event handler attached and is set as `primary`.

###### Example

      $("#dialog").kendoDialog({
          width: "400px",
          title: "Software Update",
          buttonLayout: "stretched",
          content: "<p>A new version of <strong>Kendo UI</strong> is available. Would you like to download and install it now?<p>",
          actions: [
              { text: 'Skip this version' },
              { text: 'Remind me later' },
              {
                  text: 'Install update',
                  primary: true,
                  action: function (e) {
                      alert("Install update action was clicked");
                      // Returning false will prevent the closing of the dialog
                      return true;
                    },
              }
          ],
      });

### Opening

It is common to open a Dialog as the result of a user action, rather than on the `load` event of the page. The [Dialog API](/api/javascript/ui/dialog) provides methods for handling these scenarios. Basically, the widget can be initialized as non-visible and opened when needed.

The example below demonstrates how to  open a Kendo UI Dialog on button click.

###### Example

    <div id="dialog">
        Content of the Dialog
    </div>
    <button id="openButton">Open Dialog</button>

The example below demonstrates how to initialize a Dialog, center, and configure the button click action.

###### Example

    $(document).ready(function(){
        $("#dialog").kendoDialog({
            width: 200,
            height: 200,
            title: "Dialog Title",
            visible: false            
        }).data("kendoDialog");
    });

    $("#openButton").click(function(){
        var dialog = $("#dialog").data("kendoDialog");
        dialog.open();
    });

### Dimensions

By default, Kendo UI Dialog does not have any preset dimensions, so its size depends on its content.

If the Dialog contains horizontally expandable block-level elements, including Kendo UI widgets such as the Grid, Editor, etc., the widget can expand horizontally to the point of touching the browser viewport's right edge. In such cases the widget sticks to the right viewport edge and cannot be separated from it. This issue is not related to Kendo UI, but rather to the fact that the Dialog is absolutely positioned with CSS. To avoid the issue, set some appropriate width to the Dialog, or set a (max-)width to its content.

If the Dialog and its content are able to expand vertically without any restrictions, this may result in a popup which is higher than the browser viewport. Such an interface is not very usable, so try to avoid it.

### Integrate with Forms

By default, Kendo UI Dialog is moved in the DOM and placed as a child of the `body` element after its initialization. In this way the widget is easily positioned on top of all other page content, but may lead to undesired side-effects if the Dialog is created from an element inside a form, because the moved form fields will not be submitted.

To avoid this behavior place the whole form, including its opening and closing tags, inside the element from which the Dialog is created.

When the Dialog contains a form, which is submitted via a standard POST request, the widget is going to close and the page reloaded. If you want to avoid this behavior, submit the form via Ajax. This is essentially recommended when the submitted data is validated on the server, because in such cases the Dialog should remain visible to display any validation messages that may be returned.

### Destroy

Unlike most widgets, Kendo UI Dialog is completely removed from the DOM when [destroyed](/framework/widgets/destroy). This means that the element, from which it was initialized, no longer exists on the page. Therefore, you are able to create a new Dialog instance only from another element.

### Print

To select only the Dialog content visible during printing and hide the rest of the page content, you are able to use the CSS code demonstrated in the example below. The code assumes that only one Dialog instance exists on the page. If there are multiple Dialog instances on the page and only one should be printed, then replace the `.k-dialog` class by a custom CSS class, which is manually applied to the Dialog wrapper element.

###### Example

    @media print
    {
        body > *
        {
            display: none !important;
        }

        body > .k-dialog
        {
            display: block !important;
            position: relative !important;
            top: auto !important;
            left: auto !important;
            width: auto !important;
            height: auto !important;
            border-width: 0;
            box-shadow: none !important;
        }

        .k-window .k-window-titlebar
        {
            display: none;
        }
    }

## Predefined Dialogs

Kendo UI Dialog provides predefined dialogs, similar to the browser's alert, confirm and prompt, via the [kendo](/api/javascript/kendo) object:

*   [Alert](/api/javascript/ui/alert)
*   [Confirm](/api/javascript/ui/confirm)
*   [Prompt](/api/javascript/ui/prompt)

The example below demonstrates how to call kendo alert, confirm and prompt dialogs.

###### Example

    kendo.alert("String to alert");
    kendo.confirm("Continue?");
    kendo.prompt("enter value", "123"); //123 is the default value

Since it is not possible to interrupt the current thread as the browser can for the confirm and prompt dialogs, you can use promises. The example below showcases this approach.

###### Example

    kendo.confirm("Continue?")
        .done(function() { console.log("Ok") })
        .fail(function() { console.log("Cancel") });
    kendo.prompt("enter value")
        .done(function(value) { console.log(value); })
        .fail(function() { console.log("Cancel") });


## Reference

### Existing Instances

Refer to an existing Dialog instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference has been established, use the [Dialog API](/api/javascript/ui/dialog) to control its behavior.

The example below demonstrates how to access an existing Dialog instance.

###### Example

    var dialog = $("#dialog").data("kendoDialog");

### Access DOM Elements

Similar to other Kendo UI widgets, the Dialog has two DOM elements, which you may want to access and use to customize the appearance of the widget or its content. These are the widget's [`wrapper` and `element`](/framework/widgets/wrapper-element), which are provided as fields of the widget object. In specific scenarios, the Dialog wrapper can be used to tweak the widget's position or size, although this is normally done via the API and the [`setOptions` method](/api/javascript/ui/widget#methods-setOptions).

The example below demonstrates how to access the DOM elements of a Dialog.

###### Example

    var dialog = $("#dialog").data("kendoDialog");
    var dialogWrapper = dialog.wrapper;

    dialogWrapper.addClass("myDialogClass");

## Troubleshooting

### Scrollbar Overlaps: OS X

In Safari and Chrome browsers running on OS X, a scrollbar of an element below the Dialog popup may be displayed incorrectly over the Dialog popup. Resolve this issue by applying the CSS style demonstrated in the example to the scrollbar container below the Dialog.

###### Example

    -webkit-transform: translate3d(0, 0, 0);

### Create Dialogs Multiple Times

It is possible to create a Kendo UI Dialog instance multiple times with the same ID only if the existing instance with this ID is [destroyed](#configuration-Destroy) first. Multiple widgets with the same ID [cannot exist and work properly]({% slug initialize_widgets_using_jquery_plugins_installation %}#duplicate-initialization) at the same time. An alternative approach is not to destroy the existing Dialog instance, but just [open](/api/javascript/ui/dialog#methods-open) it and [set new static content](/api/javascript/ui/dialog#methods-content)&mdash;if needed.

## See Also

Other articles on Kendo UI Upload:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the Dialog Widget](/aspnet-mvc/helpers/dialog/overview)
* [Overview of the Dialog JSP Tag]({% slug overview_dialog_uiforjsp %})
* [Overview of the Dialog PHP Class](/php/widgets/dialog/overview)
* [How to Create Confirmation Dialog via Promises]({% slug howto_createconfirmationdialog_viapromises_window %})
* [How to Display Loading Indicator over Window]({% slug howto_displayloadingindicator_overwindow_window %})
* [How to Post to Iframe]({% slug howto_posttoiframe_window %})
* [How to Use MVVM Binding for Window Data Editing]({% slug howto_usemvvmbinding_forwindowdataediting_mvvm_window %})
* [Dialog JavaScript API Reference](/api/javascript/ui/dialog)
