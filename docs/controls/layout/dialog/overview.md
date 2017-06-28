---
title: Overview
page_title: Overview | Kendo UI Dialog
description: "Learn how to initialize the Kendo UI Dialog widget and configure its behaviors."
previous_url: /web/dialog/overview, /getting-started/web/dialog/overview
slug: overview_kendoui_dialog_widget
position: 1
---

# Dialog Overview

The [Kendo UI Dialog widget](http://demos.telerik.com/kendo-ui/dialog/index) is a modal popup that brings information to the user. It also provides actions through its action buttons to prompt the user for input or to ask for a decision. The component can also contain more complex UI elements that require the focus of the user. The Dialog widget is a subset of the [Kendo UI Window widget](http://www.telerik.com/kendo-ui/window) where the most prominent difference is the added functionality for actions and predefined dialogs.

## Getting Started

### Initialize the Dialog

To initialize the Dialog, use virtually any DOM element. During initialization, the targeted content is going to be automatically wrapped in the `div` element of the widget.

The example below demonstrates how to create the widget from an HTML element, which contains the content of the Dialog, and initialize it by using a jQuery selector.

###### Example

    <div id="dialog">
        Content of the Dialog
    </div>

    $(document).ready(function() {
        $("#dialog").kendoDialog();
    });

When a Dialog is initialized, it is automatically displayed as open near the location of the DOM element that was used to initialize the content.

### HTML Structure and DOM Placement

By default, the Dialog is created as a child of the `<body>` element.

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

The following example demonstrates how the page markup from the previous example changes after the initialization of the Kendo UI Dialog, when the widget is moved to become a child of the `<body>` and its additional markup&mdash;the wrapper and the title bar&mdash;is generated.

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

The Dialog provides default configuration options that can be set during initialization.

Some of the properties that can be overridden and controlled are:

* Minimum and maximum height and width during resizing.
* Custom action buttons and their layout.
* Title and **Close** buttons.
* Animation effects and duration.
*	Modality.
* Predefined dialogs.

The example below demonstrates how to create a non-modal Dialog that contains two action buttons and no **Close** button.

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

The Dialog action buttons allow you to provide specific interaction to users. Each button has a text and an action handler attached to it. Generally, each button closes the Dialog as its last action, but you can cancel this from the custom action handler.

The order of the values in the actions array determines the order in which the action buttons are rendered in the Dialog. You can also define the button as `primary`.

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

Usually, a Dialog is opened as a result of a user action rather than of the `load` event of the page. The [Dialog API](/api/javascript/ui/dialog) provides methods for handling such scenarios. Basically, the widget can be initialized as non-visible and can opened when needed.

The example below demonstrates how to open a Kendo UI Dialog on a button click.

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

By default, the Dialog does not have any preset dimensions and its size depends on its content.

If the Dialog contains horizontally expandable block-level elements&mdash;including Kendo UI widgets such as the Grid, Editor, and others&mdash;the widget can expand horizontally to the point of touching the right edge of the browser viewport. In such cases, the widget sticks to the right viewport edge and cannot be separated from it. This issue occurs because the Dialog is absolutely positioned with CSS. To avoid such behavior, set an appropriate width to the widget, or a (max-)width to its content.

The lack of restrictions over the dimensions for vertical expanding of the Dialog and its content might result in undesired behavior&mdash;for example, the rendition of a popup which is higher than the browser viewport.

### Integration with Forms

By default, after the Dialog is initialized, it is moved in the DOM and placed as a child of the `body` element. This behavior easily positions it on top of all other page content, but might cause undesired side-effects if the Dialog is created from an element inside a form, because the moved form fields will not be submitted. To avoid such issues, place the whole form, including its opening and closing tags, inside the element from which the Dialog is created.

When the Dialog contains a form, which is submitted through a standard POST request, the widget will close and the page will reload. If you have to avoid this behavior, submit the form through Ajax. The approach is strongly recommended when the submitted data is validated on the server, because in such cases the Dialog is expected to remain visible and to display the validation messages that might be returned.

### Destroy

Unlike most widgets, the Dialog is completely removed from the DOM when [destroyed]({% slug destroywidgets_kendoui_gettingstarted %}). This means that the element from which the Dialog was initialized no longer exists on the page. Therefore, you are able to create a new Dialog instance only from another element.

### Print

To select only the Dialog content that is visible during printing and hide the rest of the page content, use the CSS code demonstrated in the following example. It assumes that only one Dialog instance exists on the page. If there are multiple Dialog instances on the page and only one needs to be printed, replace the `.k-dialog` class by a custom CSS class that is manually applied to the wrapper element of the Dialog.

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

The Dialog provides an option to render predefined dialogs, similar to the alert, confirm, and prompt ones of the browser, through the [`kendo`](/api/javascript/kendo) object.

For more information, refer the API documentation for:

* [Alert dialogs](/api/javascript/ui/alert)
* [Confirm dialogs](/api/javascript/ui/confirm)
* [Prompt dialogs](/api/javascript/ui/prompt)

The example below demonstrates how to call the Kendo UI alert, confirm, and prompt dialogs.

###### Example

    kendo.alert("String to alert");
    kendo.confirm("Continue?");
    kendo.prompt("enter value", "123"); //123 is the default value

It is not possible to interrupt the current thread for the confirm and prompt dialogs the way the browser can. To achieve this behavior, use promises.

###### Example

    kendo.confirm("Continue?")
        .done(function() { console.log("Ok") })
        .fail(function() { console.log("Cancel") });
    kendo.prompt("enter value")
        .done(function(value) { console.log(value); })
        .fail(function() { console.log("Cancel") });


## Reference

### Existing Instances

To refer to an existing Dialog instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference has been established, use the [Dialog API](/api/javascript/ui/dialog) to control its behavior.

The example below demonstrates how to access an existing Dialog instance.

###### Example

    var dialog = $("#dialog").data("kendoDialog");

### Access DOM Elements

Similar to other Kendo UI widgets, the Dialog has two DOM elements, which can be accessed and used to customize the appearance of the widget or its content. These are the [`wrapper` and `element`]({% slug widgetwrapperandelement_references_gettingstarted %}) elements of the widget, which are provided as fields of the widget object. In specific scenarios, the Dialog wrapper can be used to tweak the position or the size of the widget although this is normally done through the API and the [`setOptions` method](/api/javascript/ui/widget#methods-setOptions).

###### Example

    var dialog = $("#dialog").data("kendoDialog");
    var dialogWrapper = dialog.wrapper;

    dialogWrapper.addClass("myDialogClass");

## Troubleshooting

### Scrollbar Overlaps: OS X

A scrollbar of an element below the Dialog popup might be displayed incorrectly over the Dialog popup in the Safari and Chrome browsers which run on OS X.

**Solution**

Apply the CSS style to the scrollbar container below the Dialog as demonstrated in the example below.

###### Example

    -webkit-transform: translate3d(0, 0, 0);

### Create Dialogs Multiple Times

To create a Kendo UI Dialog instance multiple times with the same ID, make sure that the existing instance with this ID is [destroyed](#configuration-Destroy) first. Widgets with the same ID [cannot exist and work properly]({% slug initialize_widgets_using_jquery_plugins_installation %}#duplicate-initialization) at one and the same time.

Alternatively, do not destroy the existing Dialog instance&mdash;[open](/api/javascript/ui/dialog#methods-open) it and [set new static content](/api/javascript/ui/dialog#methods-content) if needed.

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
