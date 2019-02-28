---
title: Chat
description: Configuration, methods and events of the Kendo UI Chat
res_type: api
component: chat
---

# kendo.ui.Chat

Represents the Kendo UI Chat widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### messages `Object`

Allows localization of the strings that are used in the widget.

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        messages: {
            placeholder: "Type here..."
        }
    }).data("kendoChat");
    </script>

### messages.placeholder `String` *(default: "Type a message...")*

The hint that is displayed in the input textbox of the widget.

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        messages: {
            placeholder: "Type here..."
        }
    }).data("kendoChat");
    </script>

### user `Object`

Configures the user information of the Chat.

### user.iconUrl `String` *(default: "")*

If set, sets the image URL that will be used for the user avatar icon.

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        user: {
            iconUrl: "https://demos.telerik.com/kendo-ui/content/web/chat/avatar.png"
        }
    }).data("kendoChat");
    </script>

### user.name `String` *(default: "User")*

Sets the name of the Chat user.

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        user: {
            name: "Chat User"
        }
    }).data("kendoChat");
    </script>

### toolbar `Object`

Configures the toolbar of the Chat.

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        toolbar: {
            buttons: [
                { name: "ButtonA", iconClass: "k-icon k-i-gear" },
                { name: "ButtonA", iconClass: "k-icon k-i-gear" }
            ]
        }
    });
    </script>

### toolbar.animation `Boolean|Object`

Configures the toggle animation of the toolbar. If disabled, an animation will not be played.

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        toolbar: {
            animation: false,
            buttons: [
                { name: "ButtonA", iconClass: "k-icon k-i-gear" },
                { name: "ButtonA", iconClass: "k-icon k-i-gear" }
            ]
        }
    });
    </script>

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        toolbar: {
            animation: {
                collapse: {
                    effects: "expandVertical fadeIn",
                    duration: 500
                },
                expand: {
                    effects: "expandVertical fadeIn",
                    duration: 500
                }
            },
            toggleable: true,
            buttons: [
                { name: "ButtonA", iconClass: "k-icon k-i-gear" },
                { name: "ButtonA", iconClass: "k-icon k-i-gear" }
            ]
        }
    });
    </script>

### toolbar.animation.collapse `Object`

Configures the collapse animation of the toolbar.

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        toolbar: {
            animation: {
                collapse: {
                    effects: "expandVertical fadeIn",
                    duration: 500
                }
            },
            toggleable: true,
            buttons: [
                { name: "ButtonA", iconClass: "k-icon k-i-gear" },
                { name: "ButtonA", iconClass: "k-icon k-i-gear" }
            ]
        }
    });
    </script>

### toolbar.animation.collapse.effects `String`

Configures the effects for the collapse animation of the toolbar.

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        toolbar: {
            animation: {
                collapse: {
                    effects: "expandVertical fadeIn"
                }
            },
            toggleable: true,
            buttons: [
                { name: "ButtonA", iconClass: "k-icon k-i-gear" },
                { name: "ButtonA", iconClass: "k-icon k-i-gear" }
            ]
        }
    });
    </script>

### toolbar.animation.collapse.duration `Number`

Configures the duration (in milliseconds) for the collapse animation of the toolbar.

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        toolbar: {
            animation: {
                collapse: {
                    duration: 500
                }
            },
            toggleable: true,
            buttons: [
                { name: "ButtonA", iconClass: "k-icon k-i-gear" },
                { name: "ButtonA", iconClass: "k-icon k-i-gear" }
            ]
        }
    });
    </script>

### toolbar.animation.expand `Object`

Configures the expand animation of the toolbar.

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        toolbar: {
            animation: {
                expand: {
                    effects: "expandVertical fadeIn",
                    duration: 500
                }
            },
            toggleable: true,
            buttons: [
                { name: "ButtonA", iconClass: "k-icon k-i-gear" },
                { name: "ButtonA", iconClass: "k-icon k-i-gear" }
            ]
        }
    });
    </script>

### toolbar.animation.expand.effects `String`

Configures the effects of the expand animation.

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        toolbar: {
            animation: {
                expand: {
                    effects: "expandVertical fadeIn"
                }
            },
            toggleable: true,
            buttons: [
                { name: "ButtonA", iconClass: "k-icon k-i-gear" },
                { name: "ButtonA", iconClass: "k-icon k-i-gear" }
            ]
        }
    });
    </script>

### toolbar.animation.expand.duration `Number`

Configures the duration of the expand animation.

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        toolbar: {
            animation: {
                expand: {
                    duration: 500
                }
            },
            toggleable: true,
            buttons: [
                { name: "ButtonA", iconClass: "k-icon k-i-gear" },
                { name: "ButtonA", iconClass: "k-icon k-i-gear" }
            ]
        }
    });
    </script>

### toolbar.buttons `Array`

Defines the collection of buttons that will be rendered. When using only an array of strings, the added string will define the `name` option of the button.

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        toolbar: {
            buttons: [
                { name: "ButtonA", iconClass: "k-icon k-i-gear" },
                { name: "ButtonB", iconClass: "k-icon k-i-gear" }
            ]
        }
    });
    </script>

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        toolbar: {
            buttons: [ "ButtonA", "ButtonB" ]
        }
    });
    </script>

### toolbar.buttons.name `String`

Defines the name of the button.

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        toolbar: {
            buttons: [
                { name: "ButtonA", iconClass: "k-icon k-i-gear" },
                { name: "ButtonB", iconClass: "k-icon k-i-gear" }
            ]
        }
    });
    </script>

### toolbar.buttons.text `String`

Defines the text that will be rendered in the button.

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        toolbar: {
            buttons: [
                { name: "ButtonA", text: "ButtonA" },
                { name: "ButtonB", text: "ButtonB" }
            ]
        }
    });
    </script>

### toolbar.buttons.iconClass `String`

Defines the icon classes of the span that is rendered in the button.

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        toolbar: {
            buttons: [
                { name: "ButtonA", iconClass: "k-icon k-i-gear" },
                { name: "ButtonB", iconClass: "k-icon k-i-gear" }
            ]
        }
    });
    </script>

### toolbar.buttons.attr `Object`

Defines an object that is applied to the button element as attributes.

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        toolbar: {
            buttons: [
                { name: "ButtonA", attr: { "class": "myClass" } },
                { name: "ButtonB", attr: { "class": "myClass" } }
            ]
        }
    });
    </script>

### toolbar.scrollable `Boolean` *(default: true)*

Enables or disables the scrollable behavior of the toolbar.

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        toolbar: {
            scrollable: true,
            buttons: [
                { name: "ButtonA", attr: { "class": "myClass" } },
                { name: "ButtonB", attr: { "class": "myClass" } }
            ]
        }
    });
    </script>

### toolbar.toggleable `Boolean` *(default: false)*

Enables or disables the toggleable behavior of the toolbar.

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        toolbar: {
            toggleable: true,
            buttons: [
                { name: "ButtonA", attr: { "class": "myClass" } },
                { name: "ButtonB", attr: { "class": "myClass" } }
            ]
        }
    });
    </script>

## Methods

### getUser

Gets the user information that is associated with the Chat instance.

#### Returns

`Object` - The object with the user information. Contains the auto-generated `id`, `name`, and `iconUrl`.

#### Example

    <div id="chat"></div>
    <script>
        $("#chat").kendoChat();

        var chat = $("#chat").data("kendoChat");

        console.log(chat.getUser().name);
    </script>

### postMessage

Triggers the `post` event with the message and renders it inside the widget.

#### Parameters

##### message `String`

The text that will be sent and rendered.

#### Example

    <div id="chat"></div>
    <script>
        $("#chat").kendoChat();

        var chat = $("#chat").data("kendoChat");

        chat.postMessage("Hello!");
    </script>

### renderAttachments

Renders an attachment inside the Chat. The attachments are rendered through a predefined or custom template that is registered with the Chat.

#### Parameters

##### options `Object`

The configuration options for the attachment.

##### options.attachments `Object`

An array of `attachment` objects.

##### options.attachments.content `Object`

The `attachment` properties that are passed to the template which will be rendered inside the Chat bubble.

##### options.attachments.contentType `String`

The `attachment` type. Used to determine which template is used when rendering the attachment inside the Chat.

##### options.attachmentLayout `String`

The layout that will be applied for rendering the attachments.

The supported values are:

* `list`
* `carousel`

##### sender `Object`

The configuration object which contains information about the sender of the message bubble. Determines where the message will be rendered.

##### sender.id `Object`

The unique identifier which is used to distinguish between different users in the Chat.

##### sender.name `String`

The string which represents the name of the sender and which is rendered before the message bubble.

##### sender.iconUrl `String`

The URL that is used to show the sender avatar.

#### Example - rendering an attachment

    <div id="chat"></div>
    <script>
        $("#chat").kendoChat();

        var chat = $("#chat").data("kendoChat");

        chat.renderAttachments({
            attachments: [{
                contentType: "heroCard",
                content: {
                    title: "Attachment Title",
                    subtitle: "Attachment Subtitle",
                    text: "Sample text"
                }
            }],
            attachmentLayout: "carousel"
        }, chat.getUser());
    </script>

### renderMessage

Renders a message bubble inside the Chat.

#### Parameters

##### message `Object`

The configuration options for the message.

##### message.type `String`

The type of the message bubble that will be rendered. Can be either `text` or `typing`.

##### message.text `String`

The text of the message bubble. Ignored when the type is set to `typing`.

##### sender `Object`

The configuration object which contains information about the sender of the message bubble. Determines where the message will be rendered.

##### sender.id `Object`

The unique identifier which is used to distinguish between different users in the chat.

##### sender.name `String`

The string which represents the name of the sender that is rendered before the message bubble.

##### sender.iconUrl `String`

The URL that is used to show the sender avatar.

#### Example - rendering a message

    <div id="chat"></div>
    <script>
        $("#chat").kendoChat();

        var chat = $("#chat").data("kendoChat");

        chat.renderMessage({
            type: "text",
            text: "Hello Kendo Chat"
        }, {
            id: kendo.guid(),
            name: "Sample User",
            iconUrl: "https://demos.telerik.com/kendo-ui/content/web/chat/avatar.png"
        });
    </script>

#### Example - rendering a message from a chat user

    <div id="chat"></div>
    <script>
        $("#chat").kendoChat();

        var chat = $("#chat").data("kendoChat");

        chat.renderMessage({
            type: "text",
            text: "Hello Kendo Chat"
        }, chat.getUser());
    </script>

#### Example - rendering the typing indicator

    <div id="chat"></div>
    <script>
        $("#chat").kendoChat();

        var chat = $("#chat").data("kendoChat");

        chat.renderMessage({
            type: "typing"
        }, chat.getUser());
    </script>

### renderSuggestedActions

Renders an array of suggested actions inside the chat.

#### Parameters

##### suggestedActions `Object`

An array of `suggestedAction` objects.

##### suggestedActions.title `String`

The text which is rendered inside the suggested action bubble.

##### suggestedActions.value `String`

The value of the suggested action - the value that is used as an input when a suggested action is clicked.

#### Example

    <div id="chat"></div>
    <script>
        $("#chat").kendoChat();

        var chat = $("#chat").data("kendoChat");

        chat.renderSuggestedActions([{
            title: "Option 1",
            value: "Value 1"
        }, {
            title: "Option 2",
            value: "Value 2"
        }]);
    </script>

### renderUserTypingIndicator

Renders the typing indicator for the specified user inside the chat. If a Chat indicator is already rendered, `renderUserTypingIndicator` will add the user to the typing list.

#### Parameters

##### sender `Object`

The configuration object which contains information about the sender of the typing indicator bubble.

##### sender.id `Object`

The unique identifier which is used to distinguish between different users for the typing indicator bubble.

##### sender.name `String`

#### Example

    <div id="chat"></div>
    <script>
        $("#chat").kendoChat();

        var chat = $("#chat").data("kendoChat");

        chat.renderUserTypingIndicator(chat.getUser())
    </script>

### clearUserTypingIndicator

Clears the typing indicator for the specified user inside the chat. If a typing indicator is rendered for multiple users, `clearUserTypingIndicator` will remove the name of the specified user from the typing list.

#### Parameters

##### sender `Object`

The configuration object which contains information about the sender of the typing indicator bubble.

##### sender.id `Object`

The unique identifier which is used to distinguish between different users for the typing indicator bubble.

##### sender.name `String`

#### Example

    <div id="chat"></div>
    <script>
        $("#chat").kendoChat();

        var chat = $("#chat").data("kendoChat");

        chat.renderUserTypingIndicator(chat.getUser())
        chat.clearUserTypingIndicator(chat.getUser())
    </script>

### removeTypingIndicator

Removes the typing indicator bubble from the chat. If a typing indicator is rendered for multiple users, `removeTypingIndicator` will remove the entire bubble.

#### Example

    <div id="chat"></div>
    <script>
        $("#chat").kendoChat();

        var chat = $("#chat").data("kendoChat");

        chat.renderUserTypingIndicator({ id: "user-1", name: "User 1" });
        chat.renderUserTypingIndicator({ id: "user-2", name: "User 2" });
        chat.removeTypingIndicator(chat.getUser());
    </script>

### toggleToolbar

Toggles the Chat toolbar.

#### Parameters

##### skipEffects `Boolean`

If set to `true`, an animation will not play.

#### Example

    <div id="chat"></div>
    <script>
        $("#chat").kendoChat({
            toolbar: {
                buttons: [
                    { name: "ButtonA", iconClass: "k-icon k-i-gear" },
                    { name: "ButtonA", iconClass: "k-icon k-i-gear" }
                ]
            }
        });

        var chat = $("#chat").data("kendoChat");

        chat.toggleToolbar(true);
        chat.toggleToolbar();
    </script>

## Events

### actionClick

Fired when an action button is clicked inside an attachment template or when a `suggestedAction` is clicked.

#### Event Data

##### e.sender `kendo.ui.Chat`

The widget instance which fired the event.

##### e.text `String`

The text value of the clicked action button.

#### Example - subscribing to the actionClick event during initialization

    <p>Click on one of the buttons to see the value</p>
    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        actionClick: function(e) {
            console.log("Action Clicked: " + e.text);
        }
    });

    var chat = $("#chat").data("kendoChat");

    chat.renderAttachments({
        attachments: [{
            contentType: "heroCard",
            content: {
                title: "Attachment Title",
                subtitle: "Attachment Subtitle",
                buttons: [{
                    title: "button 1",
                    value: "value 1",
                }, {
                    title: "button 2",
                    value: "value 2",
                }]
            }
        }],
        attachmentLayout: "carousel"
    }, chat.getUser());
    </script>

#### Example - subscribing to the actionClick event after initialization

    <p>Click on one of the buttons to see the value</p>
    <div id="chat"></div>
    <script>
    function chat_actionClick(e) {
        console.log("Action Clicked: " + e.text);
    }
    $("#chat").kendoChat();

    var chat = $("#chat").data("kendoChat");
    chat.bind("actionClick", chat_actionClick);

    chat.renderAttachments({
        attachments: [{
            contentType: "heroCard",
            content: {
                title: "Attachment Title",
                subtitle: "Attachment Subtitle",
                buttons: [{
                    title: "button 1",
                    value: "value 1",
                }, {
                    title: "button 2",
                    value: "value 2",
                }]
            }
        }],
        attachmentLayout: "carousel"
    }, chat.getUser());
    </script>

#### Example - displaying the actionClick event triggered by the suggestedAction click

    <p>Click on one of the buttons to see the value</p>
    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        actionClick: function(e) {
            console.log("Action Clicked: " + e.text);
        }
    });

    var chat = $("#chat").data("kendoChat");

    chat.renderSuggestedActions([{
        title: "Option 1",
        value: "Value 1"
    }, {
        title: "Option 2",
        value: "Value 2"
    }]);
    </script>

### post

Fires when a message is posted to the Chat. Can be either through the message box, or through an action button click.

#### Event Data

##### e.sender `kendo.ui.Chat`

The widget instance which fired the event.

##### e.text `String`

The text value that was posted.

##### e.timestamp `Date`

The current time of posting the message.

##### e.from `Object`

The user information for the current chat. Contains the `id`, `name`, and `iconUrl` that are set to the Chat instance.

#### Example - subscribing to the post event during initialization

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        post: function(e) {
            console.log("Post: " + e.text);
        }
    });
    </script>

#### Example - subscribing to the post event after initialization

    <div id="chat"></div>
    <script>
    function chat_post(e) {
        console.log("Post: " + e.text);
    }
    $("#chat").kendoChat();

    var chat = $("#chat").data("kendoChat");
    chat.bind("post", chat_post);
    </script>

### sendMessage

Fires when a message is posted through the Chat message box.

#### Event Data

##### e.sender `kendo.ui.Chat`

The widget instance which fired the event.

##### e.text `String`

The text value that was entered in the message box.

#### Example - subscribing to the sendMessage event during initialization

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        sendMessage: function(e) {
            console.log("Message sent: " + e.text);
        }
    });
    </script>

#### Example - subscribing to the sendMessage event after initialization

    <div id="chat"></div>
    <script>
    function chat_sendMessage(e) {
        console.log("Message sent: " + e.text);
    }
    $("#chat").kendoChat();

    var chat = $("#chat").data("kendoChat");
    chat.bind("sendMessage", chat_sendMessage);
    </script>

### typingEnd

Fires when the user clears the chat message box which signals that the user has stopped typing. The event is also triggered when the user submits the currently typed in message.

#### Event Data

##### e.sender `kendo.ui.Chat`

The widget instance which fired the event.

#### Example - subscribing to the typingEnd event during initialization

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        typingEnd: function(e) {
            console.log("End typing");
        }
    });
    </script>

#### Example - subscribing to the typingEnd event after initialization

    <div id="chat"></div>
    <script>
    function chat_typingEnd(e) {
        console.log("End typing");
    }
    $("#chat").kendoChat();

    var chat = $("#chat").data("kendoChat");
    chat.bind("typingEnd", chat_typingEnd);
    </script>

### typingStart

Fires when the user starts typing in the Chat message box. The event is fired only once and not upon each keystroke.

#### Event Data

##### e.sender `kendo.ui.Chat`

The widget instance which fired the event.

#### Example - subscribing to the typingStart event during initialization

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        typingStart: function(e) {
            console.log("Started typing");
        }
    });
    </script>

#### Example - subscribing to the typingStart event after initialization

    <div id="chat"></div>
    <script>
    function chat_typingStart(e) {
        console.log("Started typing");
    }
    $("#chat").kendoChat();

    var chat = $("#chat").data("kendoChat");
    chat.bind("typingStart", chat_typingStart);
    </script>

### toolClick

Fires when a button from the toolbar is clicked.

#### Event Data

##### e.sender `kendo.ui.Chat`

The widget instance which fired the event.

##### e.name `String`

The name of the button clicked.

##### e.button `Element`

The DOM element of the clicked button.

##### e.messageBox `Element`

The input element of the message box.

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        toolClick: function(ev){
        switch (ev.name) {
            case "Hello":
                ev.sender.postMessage("Hello (sent from button)");
                break;
            case "Smile":
                var input = $(ev.messageBox);
                input.val(input.val() + " :)");
                break;
        }
        },
        toolbar: {
            buttons: [
                { name: "Hello", text: "Hello" },
                { name: "Smile", text: "Smile" }
            ]
        }
    });
    </script>
