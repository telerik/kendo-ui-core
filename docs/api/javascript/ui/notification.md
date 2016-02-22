---
title: Notification
description: Configuration, methods and events of the Kendo UI Notification
---

# kendo.ui.Notification

*It is assumed that the reader of this page is familiar with the [Notification widget Overview](/web/notification/overview/).*

## Configuration

### allowHideAfter `Number` *(default: 0)*

Indicates the period in milliseconds after which a notification can be dismissed (hidden) by the user.

#### Example - set allowHideAfter to 1 second

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        allowHideAfter: 1000
    });
    </script>

### animation `Object|Boolean`

Defines custom show and hide animations via an Kendo UI Animation object. Setting the value to false disables animations.

#### Example - disable animations

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        animation: false
    });
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
    </script>

### appendTo `String|Element|jQuery` *(default: null)*

Defines the element to which the notifications will be appended or prepended (depending on the [stacking](#configuration-stacking) direction).

#### Example - set appendTo as a selector string

    <span id="notification"></span>
    <div id="container"></div>
    <script>
    $("#notification").kendoNotification({
        appendTo: "#container"
    });
    </script>

#### Example - set appendTo as a DOM element

    <span id="notification"></span>
    <div id="container"></div>
    <script>
    var container = document.getElementById("container");
    $("#notification").kendoNotification({
        appendTo: container
    });
    </script>

#### Example - set appendTo as a jQuery object

    <div id="notification"></div>
    <script>
    var element = $("#notification");
    element.kendoNotification({
        appendTo: element
    });
    </script>

### autoHideAfter `Number` *(default: 5000)*

Indicates the period in milliseconds after which a notification disappears automatically. Setting a zero value disables this behavior.

#### Example - set autoHideAfter to 3 seconds

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        autoHideAfter: 3000
    });
    </script>

#### Example - disable automatic hiding

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        autoHideAfter: 0
    });
    </script>

### button `Boolean` *(default: false)*

Determines whether the notifications will include a hide button. **This setting works with the built-in templates only.**

#### Example - enable hide buttons

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        button: true
    });
    </script>

### height `Number|String` *(default: null)*

Defines the notifications' height. Numbers are treated as pixels.

#### Example - set height as a number

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        height: 50
    });
    </script>

#### Example - set height as a string

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        height: "4em"
    });
    </script>

### hideOnClick `Boolean` *(default: true)*

Determines whether notifications can be hidden by clicking anywhere on their content.

#### Example - disable hideOnClick

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        hideOnClick: false
    });
    </script>

### position `Object`

**This setting applies to popup notifications only, i.e. in cases when `appendTo` is not set.**
It determines the position of the first notification on the screen, as well as whether the notifications will move together with the page content during scrolling.
`top` takes precedence over `bottom` and `left` takes precedence over `right`.

#### Default position settings

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
    </script>

### position.bottom `Number` *(default: 20)*

Determines the pixel position of the first popup notification with regard to the viewport's bottom edge.

#### Example - set position.bottom

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        position: {
            bottom: 30
        }
    });
    </script>

### position.left `Number` *(default: null)*

Determines the pixel position of the first popup notification with regard to the viewport's left edge.

#### Example - set position.left

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        position: {
            left: 30
        }
    });
    </script>

### position.pinned `Boolean` *(default: true)*

Determines whether the popup notifications will move together with the other page content during scrolling.

#### Example - disable pinned notifications

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        position: {
            pinned: false
        }
    });
    </script>

### position.right `Number` *(default: 20)*

Determines the pixel position of the first popup notification with regard to the viewport's right edge.

#### Example - set position.right

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        position: {
            right: 30
        }
    });
    </script>

### position.top `Number` *(default: null)*

Determines the position of the first popup notification with regard to the viewport's top edge. Numeric values are treated as pixels.

#### Example - set position.top

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        position: {
            top: 30
        }
    });
    </script>

### stacking `String` *(default: "default")*

Determines the direction in which multiple notification will stack (arrange) with regard to the first one. Possible values are `"up"`, `"right"`, `"down"`, `"left"` and `"default"`.
The `"default"` setting takes into consideration the applied `position` settings and is evaluated to `"up"` or `"down"`.

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
    </script>

### templates `Array` *(default: [])*

Describes the HTML markup of the different notification types as Kendo UI template strings. The built-in types are `"info"`, `"success"`, `"warning"` and `"error"`.

*This documentation section assumes that you are familiar with [Kendo UI templates](/framework/templates/overview)*.

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

See the [example above](#configuration-templates).

### templates.template `String` *(default: "")*

Defines a Kendo UI template to be used with the corresponding notification type.

See the [example above](#configuration-templates).

### width `Number|String` *(default: null)*

Defines the notifications' width. Numbers are treated as pixels.

#### Example - set width as a number

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        width: 300
    });
    </script>

#### Example - set width as a string

    <span id="notification"></span>
    <script>
    $("#notification").kendoNotification({
        width: "20em"
    });
    </script>

## Methods

### error

This is a shorthand method for [`show(data, "error")`](#methods-show)

#### Parameters

##### data `Object|String|Function`

**Required**. The string content for the notification; or the object with the values for the variables inside the notification template; or the function, which returns the required string or an object.

### getNotifications

Returns a jQuery collection of all visible notifications, displayed by the given widget instance. Each item in the collection is a `div.k-notification` element.

This method is useful for quick removal of all visible messages before showing new ones. After obtaining all visible messages, **remove** them from the DOM
instead of [hiding](#methods-hide) them, unless animations are disabled. This is because animations are asynchronous and the new messages
will be shown on the wrong places before the old ones have been hidden. Another thing to keep in mind is that when using
[**popup**](/web/notification/overview#popup-messages) notification messages, you should remove the [**parent**](/web/notification/overview#html-output)
of each member of the collection, returned by the `getNotifications()` method. In this case the parent will be a `div.k-animation-container` element.

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
            $(this).parent().remove();
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
then use the [`getNotifications()`](#methods-getNotifications) method instead, unless animations are disabled.

#### Example

    <span id="notification"></span>
    <script>
    var notificationWidget = $("#notification").kendoNotification().data("kendoNotification");

    notificationWidget.show("foo");
    notificationWidget.show("bar");

    notificationWidget.hide();
    </script>

### info

This is a shorthand method for [`show(data, "info")`](#methods-show)

#### Parameters

##### data `Object|String|Function`

**Required**. The string content for the notification; or the object with the values for the variables inside the notification template; or the function, which returns the required string or an object.

Note that the widget does not perform any automatic sanitization of the passed content and `script` tags will be evaluated.
In order to encode script tags as HTML entities, use `#: #` expressions in the [Kendo UI templates](/framework/templates/overview).

### show

Displays a notification.

#### Parameters

##### data `Object|String|Function`

**Required**. The string content for the notification; or the object with the values for the variables inside the notification template; or the function, which returns the required string or an object.

> **Important** The content **will not** be HTML-encoded. Use the [showText](#methods-showText) if you only intend to show plain text.

##### type `String`

The notification type. Built-in types include `"info"`, `"success"`, `"warning"` and `"error"`. Custom types should match the types from the [template configuration](#configuration-templates).
If this argument is not supplied, then `"info"` is assumed.

#### Example - Use the show method with a template and custom arguments

    <span id="notification"></span>
    <script>
    var notificationWidget = $("#notification").kendoNotification().data("kendoNotification");

    notificationWidget.show("foo text", "warning");
    </script>

#### Example - Use the show method and return the message from a function

    <span id="notification"></span>
    <script>
    function getNotificationMessage() {
        return "foo text";
    }

    var notificationWidget = $("#notification").kendoNotification().data("kendoNotification");

    notificationWidget.showText(getNotificationMessag);
    </script>

### showText

Displays a plain-text notification.

This is a safer version of the [show](#methods-show) method that assumes that you want to encode any markup passed in as a message.

#### Parameters

##### data `Object|String|Function`

**Required**. The string content for the notification; or the object with the values for the variables inside the notification template; or the function, which returns the required string or an object.

##### type `String`

The notification type. Built-in types include `"info"`, `"success"`, `"warning"` and `"error"`. Custom types should match the types from the [template configuration](#configuration-templates).
If this argument is not supplied, then `"info"` is assumed.

#### Example - Use the showText method to display a string

    <span id="notification"></span>
    <script>
    var notificationWidget = $("#notification").kendoNotification().data("kendoNotification");

    notificationWidget.showText("foo text", "warning");
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
        templates: {
            myAlert: "<div>System alert: #= myMessage #</div>"
        }
    }).data("kendoNotification");

    notificationWidget.show(getNotificationMessage, "myAlert");
    </script>

### success

This is a shorthand method for [`show(data, "success")`](#methods-show)

#### Parameters

##### data `Object|String|Function`

**Required**. The string content for the notification; or the object with the values for the variables inside the notification template; or the function, which returns the required string or an object.

### warning

This is a shorthand method for [`show(data, "warning")`](#methods-show)

#### Parameters

##### data `Object|String|Function`

**Required**. The string content for the notification; or the object with the values for the variables inside the notification template; or the function, which returns the required string or an object.

## Events

### hide

Fires when a notification's hiding animation starts.

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
    </script>

### show

Fires when a notification's showing animation starts.

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
    </script>
