---
title: Notification
description: Configuration, methods and events of the Kendo UI Notification
res_type: api
component: notification
---

# kendo.ui.Notification

Represents a Kendo UI Notification Widget. Inherits from [Widget](/api/javascript/ui/widget).

> **Important**
>
> Please review the [Notification Overview]({% slug overview_kendoui_notification_widget %}) help topic if you're not familiar with the widget.

## Configuration

### allowHideAfter `Number` *(default: 0)*

Indicates the period in milliseconds after which a notification can be dismissed (hidden) by the user.


<div class="meta-api-description">
How to set delay before notification can be dismissed in Kendo UI? Set and control the delay or timeout period before a notification can be dismissed, hidden, or closed by users, configuring when to enable user-initiated hiding or dismissal after a specified time in milliseconds, allowing management of notification visibility duration, auto-hide postponement, user hide enablement timing, and customizable close delay intervals.
</div>

#### Example - set allowHideAfter to 1 second

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        allowHideAfter: 1000
    });
	$("#notification").getKendoNotification().show("Kendo Notification");
    </script>

### animation `Object|Boolean`

Defines custom show and hide animations via an Kendo UI Animation object. Setting the value to `false` disables animations.

`animation:true` is not a valid configuration.


<div class="meta-api-description">
How to customize notification animations in Kendo UI for jQuery? Control and customize the display transitions for notifications by configuring animations that define how notifications appear and disappear with open and close effects, including enabling smooth or custom entrance and exit animations or disabling all animations to show or hide notifications instantly. Adjust animation behavior for notification pop-ups with options to set specific animation objects for custom effects or turn off animations completely to prevent any transition effects, ensuring precise control over visual feedback during notifications. Manage notification show/hide transitions by enabling, configuring, or disabling animation sequences, allowing developers to tailor the timing, style, and presence of transition effects for enhanced user interface responsiveness and visual clarity.
</div>

#### Example - disable animations

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        animation: false
    });
	$("#notification").getKendoNotification().show("Kendo Notification");
    </script>

#### Example - slide animations

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        animation: {
            open: {
                effects: "slideIn:left"
            },
            close: {
                effects: "slideIn:left",
                reverse: true
            }
        }
    });
	$("#notification").getKendoNotification().show("Kendo Notification");
    </script>

### appendTo `String|Element|jQuery` *(default: null)*

Defines the element to which the notifications will be appended or prepended (depending on the [stacking](/api/javascript/ui/notification#configuration-stacking) direction).


<div class="meta-api-description">
How do I customize the placement of notification messages in Kendo UI? Control where notification messages appear by specifying or configuring the target container element or DOM node for inserting alerts, messages, or toasts within the page layout. Set, define, or change the parent container or wrapper to attach notifications to a specific section or component, managing how messages stack, queue, or organize visually by appending or prepending them according to direction or order preferences. Enable customization of notification placement, container targeting, message injection points, and dynamic attachment to different parts of the user interface for precise control over how alerts are rendered and stacked on the page.
</div>

#### Example - set appendTo as a selector string

    <span id="notification"></span>
    <div id="container"></div>
    <script>
    $("#notification").kendoNotification({
        appendTo: "#container"
    });
	$("#notification").getKendoNotification().show("Kendo Notification");
    </script>

#### Example - set appendTo as a DOM element

    <span id="notification"></span>
    <div id="container"></div>
    <script>
    var container = document.getElementById("container");
    $("#notification").kendoNotification({
        appendTo: container
    });
	$("#notification").getKendoNotification().show("Kendo Notification");
    </script>

#### Example - set appendTo as a jQuery object

    <div id="notification"></div>
    <script>
    var element = $("#notification");
    element.kendoNotification({
        appendTo: element
    });
	$("#notification").getKendoNotification().show("Kendo Notification");
    </script>

### autoHideAfter `Number` *(default: 5000)*

Indicates the period in milliseconds after which a notification disappears automatically. Setting a zero value disables this behavior.


<div class="meta-api-description">
How do I set up notifications to automatically close after a certain amount of time in Kendo UI for jQuery? Set or configure the duration a notification stays visible before automatically closing, controlling the timeout interval in milliseconds for auto-closing alerts, to enable or disable automatic hiding by specifying zero for persistent notifications that require manual dismissal, managing how long messages, alerts, or pop-ups remain displayed on screen without user interaction or after user actions.
</div>

#### Example - set autoHideAfter to 3 seconds

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        autoHideAfter: 3000
    });
	$("#notification").getKendoNotification().show("Kendo Notification");
    </script>

#### Example - disable automatic hiding

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        autoHideAfter: 0
    });
	$("#notification").getKendoNotification().show("Kendo Notification");
    </script>

### button `Boolean` *(default: false)*

Determines whether the notifications will include a hide button. **This setting works with the built-in templates only.**


<div class="meta-api-description">
How can I customize notifications to allow users to close them manually in Kendo UI for jQuery? Configure manual dismissal options for notifications by enabling or disabling a close or hide button within each notification message, allowing users to control whether notifications include a user-activated close feature for hiding or removing alerts. Adjust settings to show or hide a built-in button that lets users dismiss or close notifications individually, providing interactive control over message visibility in applications that use default notification layouts or templates. Customize notification behavior to allow or prevent manual closing, ensuring that alerts can be cleared by user action when supported by standard interface designs.
</div>

#### Example - enable hide buttons

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        button: true
    });
	$("#notification").getKendoNotification().show("Kendo Notification");
    </script>

### height `Number|String` *(default: null)*

Defines the notifications' height. Numbers are treated as pixels.


<div class="meta-api-description">
How do I adjust the height of a notification in Kendo UI for jQuery? Control and customize the vertical dimension of alerts, pop-ups, or message components by setting or adjusting their height to influence layout spacing, visual density, and alignment within the user interface. Configure notification box size, pixel height, or vertical space to manage overflow, stacking behavior, and readability of multiple notifications. Use height settings to control the size of notification elements, enabling tailored UI design for alerts, toasts, banners, or message containers with precise vertical sizing for consistent spacing and appearance across different display contexts.
</div>

#### Example - set height as a number

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        height: 50
    });
	$("#notification").getKendoNotification().show("Kendo Notification");
    </script>

#### Example - set height as a string

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        height: "4em"
    });
	$("#notification").getKendoNotification().show("Kendo Notification");
    </script>

### hideOnClick `Boolean` *(default: true)*

Determines whether notifications can be hidden by clicking anywhere on their content.


<div class="meta-api-description">
How can I make Kendo UI notifications close immediately when clicked on? Control whether notifications can be dismissed or closed instantly when users click inside their content area, enabling or disabling click-to-close functionality for alerts, messages, or pop-ups within an application; configure to make notifications disappear on user tap, touch, or click events inside the notification box, allowing quick acknowledgment or manual dismissal through direct interaction, suitable for managing transient user feedback or alerts with customizable dismissal behaviors.
</div>

#### Example - disable hideOnClick

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        hideOnClick: false
    });
	$("#notification").getKendoNotification().show("Kendo Notification");
    </script>

### position `Object`

**This setting applies to popup notifications only, i.e. in cases when `appendTo` is not set.**
It determines the position of the first notification on the screen, as well as whether the notifications will move together with the page content during scrolling.
`top` takes precedence over `bottom` and `left` takes precedence over `right`.


<div class="meta-api-description">
How can I control where my Kendo UI notifications appear on the screen? Control and configure the initial screen placement and on-page anchor point for popup notifications, specifying where notification messages appear relative to the viewport such as top, bottom, left, or right positions, including options to fix notifications so they stay visible during page scrolling or to allow them to move with the content. Customize whether popup alerts remain anchored as the user scrolls, manage the stacking and ordering of notifications by priority positions with top overriding bottom and left overriding right, adjust floating or fixed positioning for transient messages, and set notification alignment and behavior without impacting inline or appended elements. This encompasses scenarios like enabling sticky alerts, positioning messages in corners or edges, controlling movement during scroll or static display, and defining the screen region where new notifications emerge, all optimizing user visibility and interaction with on-screen popup prompts.
</div>

#### Example

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        position: {
            pinned: true,
            top: null,
            left: null,
            bottom: 20,
            right: 20
        }
    });
	$("#notification").getKendoNotification().show("Kendo Notification");
    </script>

### position.bottom `Number` *(default: 20)*

Determines the pixel position of the first popup notification with regard to the viewport's bottom edge.


<div class="meta-api-description">
How do I adjust the position of the first popup notification to appear below a certain number of pixels from the bottom edge of the viewport? Control and customize the vertical placement and offset of the first popup notification relative to the viewport’s bottom edge by setting precise pixel values to adjust how far from the bottom the notification appears. Configure or set the bottom margin, fine-tune popup vertical alignment, reposition alerts by pixels, and manage notification placement near the screen bottom for tailored UI behavior. Enable adjusting bottom distance, shifting notification popups vertically, or controlling popup offset from the lower viewport boundary for better visual arrangement and user interface layout consistency.
</div>

#### Example - set position.bottom

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        position: {
            bottom: 30
        }
    });
	$("#notification").getKendoNotification().show("Kendo Notification");
    </script>

### position.left `Number` *(default: null)*

Determines the pixel position of the first popup notification with regard to the viewport's left edge.


<div class="meta-api-description">
How do I adjust the left margin for the first notification popup in Kendo UI? Control the horizontal placement or left-side offset in pixels for the first notification popup, configuring how far from the viewport’s left edge alerts, messages, or popups appear on screen. Adjust, set, or customize the initial left margin or distance in pixel units to position notifications horizontally, enabling precise alignment, layout control, or on-screen placement of popup alerts starting from the left side of the display area. This setting defines the starting left offset coordinate for rendering notification popups within the user interface.
</div>

#### Example - set position.left

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        position: {
            left: 30
        }
    });
	$("#notification").getKendoNotification().show("Kendo Notification");
    </script>

### position.pinned `Boolean` *(default: true)*

Determines whether the popup notifications will move together with the other page content during scrolling.


<div class="meta-api-description">
How to keep notification popup fixed on screen while scrolling? Control whether alert messages or notification popups remain fixed in place on the screen or scroll along with the webpage content, enabling you to set notifications to either stay anchored and visible during page scrolling or move dynamically with the page flow. This setting lets you configure, enable, or disable sticky, pinned, or fixed positioning behavior for on-screen alerts, ensuring notifications either remain persistently in view regardless of scrolling or integrate seamlessly with the page’s scroll movement. Adjust notification placement to be viewport-locked or content-attached based on user interaction needs, preferences, or UI design choices involving floating messages, popup positioning, or scroll behavior control.
</div>

#### Example - disable pinned notifications

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        position: {
            pinned: false
        }
    });
	$("#notification").getKendoNotification().show("Kendo Notification");
    </script>

### position.right `Number` *(default: 20)*

Determines the pixel position of the first popup notification with regard to the viewport's right edge.


<div class="meta-api-description">
How do I configure the horizontal position of the first popup notification in Kendo UI for jQuery? Adjust or configure the horizontal placement, offset, or alignment of the first popup notification from the right edge of the viewport, controlling how far the notification appears from the screen’s right side in pixels. Customize the position to shift, move, set spacing, or control the initial alert or message’s rightward alignment for precise UI placement and responsive design. Optimize horizontal distance, margin, or padding from the right border to ensure notifications appear exactly where desired relative to the viewport’s edge.
</div>

#### Example - set position.right

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        position: {
            right: 30
        }
    });
	$("#notification").getKendoNotification().show("Kendo Notification");
    </script>

### position.top `Number` *(default: null)*

Determines the position of the first popup notification with regard to the viewport's top edge. Numeric values are treated as pixels.


<div class="meta-api-description">
How do I set the position of a Kendo UI notification message at the top of my page? Control or configure the vertical placement of popup alerts or notification messages relative to the top edge of the screen or viewport by setting a numeric offset that shifts the initial alert up or down by pixels; enable precise positioning of the first notification popup from the viewport top to customize UI spacing, align alerts for better visibility, or adjust vertical margins for popups appearing at the top of the display area.
</div>

#### Example - set position.top

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        position: {
            top: 30
        }
    });
	$("#notification").getKendoNotification().show("Kendo Notification");
    </script>

### stacking `String` *(default: "default")*

Determines the direction in which multiple notification will stack (arrange) with regard to the first one. Possible values are `"up"`, `"right"`, `"down"`, `"left"` and `"default"`.
The `"default"` setting takes into consideration the applied `position` settings and is evaluated to `"up"` or `"down"`.


<div class="meta-api-description">
How do I control the stacking order of notifications in Kendo UI for jQuery? Control how multiple alert or notification messages arrange visually by configuring their stacking order or direction, such as stacking new notifications upward, downward, leftward, or rightward relative to the initial message. Adjust notification stacking to manage the spatial flow, overlap behavior, or visual hierarchy of queued messages, allowing customization of the notification pile or line orientation based on screen position or user preference. Enable, set, or modify the stacking direction to optimize the display of multiple pop-ups, to prevent clutter or overlap, and to align with interface layout choices. The stacking can dynamically adapt to default behaviors that consider notification positioning on the screen, supporting flexible and intuitive message arrangement for varied UI scenarios.
</div>

#### Example - set downward stacking

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        position: {
            top: 20,
            right: 20
        },
        stacking: "down"
    });
	$("#notification").getKendoNotification().show("Kendo Notification");
    </script>

### templates `Array` *(default: [])*

Describes the HTML markup of the different notification types as Kendo UI template strings. The built-in types are `"info"`, `"success"`, `"warning"` and `"error"`.

*This documentation section assumes that you are familiar with [Kendo UI templates](/framework/templates/overview)*.


<div class="meta-api-description">
How do I customize notification appearance in Kendo UI using templates? Customize notification appearance by defining HTML or custom markup templates for each notification type including info, success, warning, and error messages; configure, set, or override default rendering using template strings, Kendo UI style templates, or component initialization parameters to control how notifications display content, structure, and styling for different message categories, enabling tailored visual feedback, personalized alerts, and dynamic message formatting across notification types.
</div>

#### Example - define several custom templates

    <span id="notification"></span>

    <script id="myAlertTemplate" type="text/x-kendo-template">
        <div class="myAlert">System alert generated at #= time # : #= myMessage #</div>
    </script>

    <script>
    $(function(){
        var notificationElement = $("#notification");

        notificationElement.kendoNotification({
            templates: [{
                    // define a custom template for the built-in "warning" notification type
                    type: "warning",
                    template: "<div class='myWarning'>Warning: #= myMessage #</div>"
                }, {
                    // define a template for the custom "timeAlert" notification type
                    type: "timeAlert",
                    template: "<div class='myAlert'>System alert generated at #= time # : #= myMessage #</div>"
                    // template content can also be defined separately
                    //template: $("#myAlertTemplate").html()
            }]
        });

        var n = notificationElement.data("kendoNotification");

        // show a warning message using the built-in shorthand method
        n.warning({
            myMessage: "some warning message here"
        });

        // show a "timeAlert" message using the default show() method
        n.show({
            time: new Date().toLocaleTimeString(),
            myMessage: "Server will be restarted."
        }, "timeAlert");
    });
    </script>

### templates.type `String` *(default: "")*

**Required.** Specified a unique identifier, which is used to retrieve the correct template when a notification of this type is shown.


<div class="meta-api-description">
How do I link specific templates to different notification types in Kendo UI? Configure or set a unique template identifier to link notifications with specific message layouts, enabling precise control over which template is displayed for each notification type, such as customizing, registering, or referencing templates by their keys or IDs to ensure the notification component retrieves and renders the correct template version during runtime or user interactions, including cases where different notification styles, formats, or themes are needed based on notification categories, event types, or user preferences.
</div>

#### Example

    <div id="notification"></div>
    <script>
    $("#notification").kendoNotification({
        templates: [{
            type: "info",
            template: (data) => `<div class='info-notification'>${data.content}</div>`
        }, {
            type: "warning",  
            template: (data) => `<div class='warning-notification'>${data.content}</div>`
        }]
    });
    
    // Show notification with specific type
    $("#notification").getKendoNotification().show("This is an info message", "info");
    </script>

See the [example above](/api/javascript/ui/notification#configuration-templates).

### templates.template `String` *(default: "")*

Defines a Kendo UI template to be used with the corresponding notification type.


<div class="meta-api-description">
How do I customize the layout of individual notifications in Kendo UI for jQuery? Configure and customize the notification layout by defining HTML templates or functions tailored for specific notification types, enabling dynamic content rendering with data-binding to notification models, supporting flexible template syntax such as Kendo UI's templating system. This allows control over the visual structure and content presentation of individual notifications, including setting custom handlebars or inline templates for messages, alerts, or updates within a notification component, facilitating personalized and data-driven notification designs.
</div>

#### Example

    <div id="notification"></div>
    <script>
    $("#notification").kendoNotification({
        templates: [{
            type: "custom",
            template: (data) => `<div class='custom-template'>
                <strong>${data.title || 'Notification'}</strong>
                <p>${data.message}</p>
                <button onclick='$(this).closest(\".k-notification\").find(\".k-notification-wrap\").click()'>Close</button>
            </div>`
        }]
    });
    
    // Show notification with custom template
    $("#notification").getKendoNotification().show({
        title: "Custom Title",
        message: "This notification uses a custom template"
    }, "custom");
    </script>

See the [example above](/api/javascript/ui/notification#configuration-templates).

### title `String` *(default: null)*

Defines the title attribute value for the Notification wrapper.


<div class="meta-api-description">
How do I customize the title attribute on Kendo UI notification? Control and configure the HTML title attribute on the notification container to enable native browser tooltips, provide accessible labels, set hover text descriptions, define tooltip content for notifications, improve screen reader accessibility, add descriptive titles to notification elements, specify text shown on mouseover, customize the notification wrapper’s title for assistive technology, and include concise context or label information for notifications through standard HTML attributes.
</div>

#### Example

    <span id="notification"></span>
    <script>
        $("#notification").kendoNotification({
            title: "Custom title"
        });
        $("#notification").getKendoNotification().show("Kendo Notification");
    </script>

### width `Number|String` *(default: null)*

Defines the notifications' width. Numbers are treated as pixels.


<div class="meta-api-description">
How can I set the width of a Kendo UI notification message in pixels? Adjust, configure, or define the width and size of notification messages or alerts in pixels or percentages to control layout, appearance, and responsiveness; customize the horizontal dimension to set exact pixel values or flexible CSS-based widths like "50%" for adaptive UI design, enabling developers to control message box sizing, resize notification containers, and manage visual presentation during initialization or runtime for consistent and clear display of alert content across different screen sizes and interfaces.
</div>

#### Example - set width as a number

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        width: 300
    });
	$("#notification").getKendoNotification().show("Kendo Notification");
    </script>

#### Example - set width as a string

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        width: "20em"
    });
	$("#notification").getKendoNotification().show("Kendo Notification");
    </script>

## Methods

### error

This is a shorthand method for [`show(data, "error")`](/api/javascript/ui/notification/methods/show)

#### Parameters

##### data `Object|String|Function`

**Required**. The string content for the notification; or the object with the values for the variables inside the notification template; or the function, which returns the required string or an object.

<div class="meta-api-description">
How to display error messages with Kendo UI for jQuery notification? Display or trigger error messages and alerts instantly with predefined error styling using a method that simplifies showing error notifications without manual invocation, supporting quick error toast creation for failures, warnings, exceptions, or fault reporting by passing message content or configuration objects, enabling developers to present error popups, error toasts, or alert dialogs effortlessly with consistent error visuals and behavior across applications.
</div>

#### Example

    <div id="notification"></div>
    <script>
    $("#notification").kendoNotification();
    
    var notification = $("#notification").getKendoNotification();
    
    // Show error notification with string message
    notification.error("An error occurred while processing your request");
    
    // Show error notification with object data
    notification.error({
        title: "Error",
        message: "Failed to save data"
    });
    </script>

### getNotifications

Returns a jQuery collection of all visible notifications, displayed by the given widget instance. Each item in the collection is a `div.k-notification` element.

This method is useful for quick removal of all visible messages before showing new ones. After obtaining all visible messages, **remove** them from the DOM
instead of [hiding](/api/javascript/ui/notification/methods/hide) them, unless animations are disabled. This is because animations are asynchronous and the new messages
will be shown on the wrong places before the old ones have been hidden. Another thing to keep in mind is that when using
[**popup**](/web/notification/overview#popup-messages) notification messages, you should remove the [**parent**](/web/notification/overview#html-output)
of each member of the collection, returned by the `getNotifications()` method. In this case the parent will be a `div.k-animation-container` element.


<div class="meta-api-description">
How do I access all currently visible notification messages in Kendo UI for jQuery? Retrieve, access, or list all currently visible notification messages or alerts displayed by a notification system or UI component, enabling inspection, management, or bulk removal of active warnings, info messages, popups, or alerts before adding new ones. This includes methods to get all on-screen notifications as elements or collections that can be queried, iterated, or manipulated, supporting scenarios such as clearing existing messages, controlling notification display order, removing notification containers or wrappers when using popup or animated notifications, handling synchronous versus asynchronous removal to avoid display glitches, and managing visible message elements for UI updates or dynamic notification handling. This covers retrieving notification elements, controlling visibility, enabling removal of old or active notifications, handling message wrappers in popup contexts, and ensuring proper cleanup to maintain a clean notification area when new notices appear.
</div>

#### Example

    <span id="notification"></span>
    <button id="removeMessages" type="button" class="k-button">Remove messages and show new ones</button>

    <script>

    var notificationWidget = $("#notification").kendoNotification({
        button: false,
        hideOnClick: false,
        autoHideAfter: 0
    }).data("kendoNotification");

    var messageCount = 1;

    notificationWidget.show("foo " + messageCount);
    notificationWidget.show("bar " + messageCount);

    $("#removeMessages").click(function(){
        // since there is no way for the user to hide notifications,
        // the following expression will return two elements, no matter when it is executed
        var elements = notificationWidget.getNotifications();

        // remove the two messages from the DOM
        elements.each(function(){
            $(this).parent().parent().remove();
        });

        messageCount++;

        // show two new messages
        notificationWidget.show("foo " + messageCount);
        notificationWidget.show("bar " + messageCount);
    });

    </script>

#### Returns

`jQuery` A collection of all visible notifications.

### hide

Hides all notifications from the given widget instance.

If you intend to use this method to dispose of all visible messages before showing new ones,
then use the [`getNotifications()`](/api/javascript/ui/notification/methods/getnotifications) method instead, unless animations are disabled.


<div class="meta-api-description">
How do I programmatically close all visible notifications in Kendo UI for jQuery? Control how to programmatically close or dismiss all visible notification messages in the current notification instance, including commands to hide or remove all active alerts, pop-ups, or messages at once, managing notification visibility by hiding displayed notifications, dismissing all notifications simultaneously, clearing or closing every notification currently shown, enabling batch dismissal of alerts, handling notification lifecycle by closing messages globally, and configuring notification display management to ensure no messages remain visible before triggering new notifications or updates.
</div>

#### Example

    <span id="notification"></span>
    <script>
    var notificationWidget = $("#notification").kendoNotification().data("kendoNotification");

    notificationWidget.show("foo");
    notificationWidget.show("bar");

    notificationWidget.hide();
    </script>

### info

This is a shorthand method for [`show(data, "info")`](/api/javascript/ui/notification/methods/show)


<div class="meta-api-description">
How to display an informational notification with Kendo UI for jQuery? Display, trigger, or generate informational notifications, messages, or alerts using a shorthand method to show status updates, tips, or non-critical information within user interfaces or components. Enable, configure, or call a function to present info-level messages, pop-ups, or toasts that communicate messages like updates, hints, or confirmations, passing content or data parameters to customize the notification text or details. Use this approach to quickly invoke informational feedback without manually specifying types, supporting typical developer patterns for showing info alerts or messages programmatically with content control.
</div>

#### Example

    <div id="notification"></div>
    <script>
    $("#notification").kendoNotification();
    
    var notification = $("#notification").getKendoNotification();
    
    // Show info notification with string message
    notification.info("This is an informational message");
    
    // Show info notification with object data  
    notification.info({
        title: "Information",
        message: "Your data has been saved successfully"
    });
    </script>

#### Parameters

##### data `Object|String|Function`

**Required**. The string content for the notification; or the object with the values for the variables inside the notification template; or the function, which returns the required string or an object.

Note that the widget does not perform any automatic sanitization of the passed content and `script` tags will be evaluated.
In order to encode script tags as HTML entities, use `#: #` expressions in the [Kendo UI templates](/framework/templates/overview).

### show

Displays a notification.


<div class="meta-api-description">
How do I programmatically show a notification in Kendo UI with custom animation? Display temporary alerts, pop-ups, or toast messages programmatically by triggering the notification to appear and disappear with animations, auto-dismiss timing, and customizable styles. Control how to present transient messages, error or success notifications, info pop-ups, or any short user feedback dynamically through code, adjusting text content, duration, visual themes, and open or close behaviors. Enable or set notification displays from scripts, configure message visibility intervals, and handle lifecycle events for on-screen alerts visible to the user.
</div>

#### Parameters

##### data `Object|String|Function`

**Required**. The string content for the notification; or the object with the values for the variables inside the notification template; or the function, which returns the required string or an object.

> **Important** The content **will not** be HTML-encoded. Use the [showText](/api/javascript/ui/notification/methods/showtext) if you only intend to show plain text.

##### type `String`

The notification type. Built-in types include `"info"`, `"success"`, `"warning"` and `"error"`. Custom types should match the types from the [template configuration](/api/javascript/ui/notification#configuration-templates).
If this argument is not supplied, then `"info"` is assumed.

#### Example - Use the show method with a template and custom arguments

    <span id="notification"></span>
    <script>
    var notificationWidget = $("#notification").kendoNotification().data("kendoNotification");

    notificationWidget.show("foo text", "warning");
    </script>

#### Example - use the show method with a function argument

    <span id="notification"></span>
    <script>
    function getNotificationMessage() {
        return {
            myMessage: "foo text"
        }
    }

    var notificationWidget = $("#notification").kendoNotification({
		templates: [{
			type: "myAlert",
			template: "<div>System alert: #= myMessage #</div>"
		}]
	}).data("kendoNotification");

	notificationWidget.show(getNotificationMessage, "myAlert");
    </script>

### showText

Displays a plain-text notification.

This is a safer version of the [show](/api/javascript/ui/notification/methods/show) method that assumes that you want to encode any markup passed in as a message.


<div class="meta-api-description">
How do I prevent XSS attacks when displaying plain-text notifications in Kendo UI? Control how to display plain-text notifications with messages that are safely encoded to prevent HTML rendering and protect against cross-site scripting (XSS) attacks; configure notifications to show user alerts without interpreting or executing any HTML or markup, ensuring content is escaped automatically, enabling secure message display instead of raw HTML output, and providing a reliable way to present textual information in UI notifications without exposing security vulnerabilities or rendering issues.
</div>

#### Parameters

##### data `Object|String|Function`

**Required**. The string content for the notification; or the object with the values for the variables inside the notification template; or the function, which returns the required string or an object.

###### data.closeButton `Boоlean` If set to `false` the Notification will not render the close button.

##### type `String`

The notification type. Built-in types include `"info"`, `"success"`, `"warning"` and `"error"`. Custom types should match the types from the [template configuration](/api/javascript/ui/notification#configuration-templates).
If this argument is not supplied, then `"info"` is assumed.

#### Example - Use the showText method to display a string

    <span id="notification"></span>
    <script>
    var notificationWidget = $("#notification").kendoNotification().data("kendoNotification");

    notificationWidget.showText("foo text", "warning");
    </script>

#### Example - Use the show method and return the message from a function

    <span id="notification"></span>
    <script>
    function getNotificationMessage() {
        return "foo text";
    }

    var notificationWidget = $("#notification").kendoNotification().data("kendoNotification");

    notificationWidget.showText({
        closeButton: false,
        content: "Welcome to the Application",
        "warning"
    });
    </script>

#### Example - Use the showText() method to show the initially hidden close button

    <span id="notification"></span>
    <script>
        let notificationWidget = $("#notification").kendoNotification({
            button: false,
        }).data("kendoNotification");

        notificationWidget.showText({
            closeButton: true, //show the close button
            content: "Welcome to the Application"
        },
        "warning");
    </script>

### success

This is a shorthand method for [`show(data, "success")`](/api/javascript/ui/notification/methods/show)


<div class="meta-api-description">
How do I trigger a success notification in Kendo UI for jQuery? Display or trigger success alert messages, confirmation pop-ups, or positive feedback notifications quickly by configuring automatic success notifications, success message prompts, or success toast alerts using a single method call. Enable simplified success notification dispatching, instant success pop-up generation, or streamlined success message displaying with customizable options for content, timing, and styling, all without manually setting the message type. Control positive event indicators, operation completion alerts, or success status messages programmatically through a concise function designed for success notifications.
</div>

#### Example

    <div id="notification"></div>
    <script>
    $("#notification").kendoNotification();
    
    var notification = $("#notification").getKendoNotification();
    
    // Show success notification with string message
    notification.success("Operation completed successfully!");
    
    // Show success notification with object data
    notification.success({
        title: "Success",
        message: "Your changes have been saved"
    });
    </script>

#### Parameters

##### data `Object|String|Function`

**Required**. The string content for the notification; or the object with the values for the variables inside the notification template; or the function, which returns the required string or an object.

### warning

This is a shorthand method for [`show(data, "warning")`](/api/javascript/ui/notification/methods/show)


<div class="meta-api-description">
How do I programmatically trigger a warning notification in Kendo UI for jQuery? Trigger or configure warning alerts and messages using notification functions that display cautionary or alert-style popups, banners, or toasts in your application. Enable, set, or control warning notifications programmatically by calling warning-specific methods or invoking generic show functions with warning-level severity, allowing dynamic display of attention-grabbing notices or alerts. Quickly generate, emit, or raise warnings for user feedback, error prevention, or status updates without manually specifying notification types, focusing on warning styles, colors, or icons to highlight potential issues or important information in UI components. Implement alerting mechanisms that prioritize warning classification in notification systems for immediate user awareness and response.
</div>

#### Example

    <div id="notification"></div>
    <script>
    $("#notification").kendoNotification();
    
    var notification = $("#notification").getKendoNotification();
    
    // Show warning notification with string message
    notification.warning("Please review your input before proceeding");
    
    // Show warning notification with object data
    notification.warning({
        title: "Warning",
        message: "Some fields are incomplete"
    });
    </script>

#### Parameters

##### data `Object|String|Function`

**Required**. The string content for the notification; or the object with the values for the variables inside the notification template; or the function, which returns the required string or an object.

## Events

### hide

Fires when a notification's hiding animation starts.


<div class="meta-api-description">
How do I detect when a Kendo UI notification is being closed? Detect when a notification starts closing or disappearing by capturing the event that triggers at the beginning of its hide or dismiss animation, enabling immediate execution of actions such as stopping timers, halting processes, updating UI or application state, triggering subsequent animations, logging dismissal events, or handling cleanup tasks as the notification begins to fade out or transition away.
</div>

#### Event Data

##### e.element `jQuery`

The jQuery object, which wraps the element being hidden.

#### Example - subscribe to the "hide" event during initialization

    <span id="notification"></span>
    <script>

    function onHide(e) {
        var elementBeingHidden = e.element;
    }

    $("#notification").kendoNotification({
        hide: onHide
    });

	$("#notification").getKendoNotification().show("Kendo Notification");
    </script>

### show

Fires when a notification's showing animation starts.


<div class="meta-api-description">
How to trigger code when a Kendo UI notification is first shown onscreen? Trigger code execution at the moment a notification starts appearing onscreen, enabling detection of the initial showing animation to run functions such as event handlers, analytics tracking, timer initiation, focus management, or synchronizing animations and UI components. Capture the opening lifecycle phase of alerts or popups with event hooks that respond precisely as notifications begin to display, supporting use cases like onShow callbacks, animation start triggers, or coordinated interface behavior upon notification activation.
</div>

#### Event Data

##### e.element `jQuery`

The jQuery object, which wraps the element being displayed.

#### Example - subscribe to the "show" event during initialization

    <span id="notification"></span>
    <script>

    function onShow(e) {
        var elementBeingShown = e.element;
    }

    $("#notification").kendoNotification({
        show: onShow
    });

	$("#notification").getKendoNotification().show("Kendo Notification");
    </script>
