---
title: Overview
page_title: Overview | Kendo UI Chat
description: "Learn how to create a Chat UI, integrate it with different frameworks and configure its templates."
slug: overview_kendoui_chat_widget
position: 1
---

# Chat Overview

The [Kendo UI Chat](http://demos.telerik.com/kendo-ui/chat/index) widget allows the user to participate in chat sessions with other users or with chat bots.

For additional information on new Chat features, refer to the [Kendo UI Roadmap](http://www.telerik.com/support/whats-new/kendo-ui-web/roadmap).

## Getting Started

### Create the Chat

To create a Chat:

1. Add an empty `div` to the HTML.
1. Provide it with an ID.
1. (Optional) Set the width and height of the desired chat inline or by using CSS &mdash;<div id="chart" style="width: 400px; height: 600px"></div>.

### Initialize the Chat

To render the Chat:

1. Select the `div` with a jQuery selector.
1. Call the `kendoChat()` function.
1. Configure its implementation for the [`post`](/api/javascript/ui/chat/events/post) event.

        var chat = $("#chat").kendoChat({
    		post: function (args) {
    			// react on a user post action
    		}
    	}).data("kendoChat");

## Features

* [Default cards](#default-cards)
* [Default actions](#default-actions)
* [Custom templates](#custom-templates)
* [Custom components](#custom-components)

### Default Cards

Out of the box, the Chat supports `heroCards` which can be displayed in the chat flow by manually calling the [`renderAttachments`](/api/javascript/ui/chat/methods/renderattachments) method of the widget.

```html
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
```

### Default Actions

Out of the box, the Chat supports `suggested actions`. To display the `suggestedActions` prompt, manually call the [`renderSuggestedActions`](/api/javascript/ui/chat/methods/rendersuggestedactions) method of the widget.

```html
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
```

### Custom Templates

The Chat supports the definition of custom templates to fit any custom payload that is returned by the service.

The following example demonstrates how to implement a simple template and to register it for the Chat.

###### Example

```html
<div id="chat"></div>

<script id="quote-template" type="text/x-kendo-template">
  <div class="#=styles.card# #=styles.cardRich#">
	<div class="#=styles.cardBody#">
	  <div>
		<strong>Type:</strong>
		<span>#:coverage#</span>
	  </div>
	  <div>
		<strong>Car model:</strong>
		<span>#:make#</span></div>
	  <div>
		<strong>Car cost:</strong>
		<span>#:worth#</span>
	  </div>
	  <div>
		<strong>Start date:</strong>
		<span>#:startDate#</span>
	  </div>
	  <hr/>
	  <div>
		<strong>Total:</strong>
		<span>#:premium#</span>
	  </div>
	</div>
  </div>
</script>

<script>
  var QUOTE_CARD_TEMPLATE = kendo.template($('#quote-template').html());
  kendo.chat.registerTemplate("quote", QUOTE_CARD_TEMPLATE);

  $("#chat").kendoChat();

  var chat = $("#chat").data("kendoChat");

  chat.renderAttachments({
	attachments: [{
	  contentType: "quote",
	  content: {
		"premium": 200.0,
		"coverage": "Full coverage",
		"make": "Opel",
		"model": "Astra",
		"worth": "4000",
		"startDate": "2018-10-10"
	  }
	}],
	attachmentLayout: "carousel"
  }, chat.getUser());
</script>
```

### Custom Components

The Chat supports the implementation of custom components which allow you to use JavaScript to render any content.

The following example demonstrates how to place a [Kendo UI Calendar]({% slug overview_kendoui_calendar_widget %}) in a custom Chat component.

```html
<div id="chat"></div>

<script>
  var CalendarComponent = kendo.chat.Component.extend({
	init: function (options, view) {
	  kendo.chat.Component.fn.init.call(this, options, view);

	  // Create a <div> from which the Calendar will be initialized
	  var calendarElement = $('<div>');

	  // Initialize the Calendar widget passing the provided value
	  calendarElement.kendoCalendar({
		value: options.value,
		// Implement the logic to be executed
		// when the user selects a date
		change: function(e) {
		  var chat = $('#chat').getKendoChat();
		  chat.postMessage('You have selected ' + kendo.toString(e.sender.value(), 'D') + '!');

		  var element = e.sender.element.closest('.k-card-container');

		  setTimeout(function() {
			e.sender.destroy();
			element.remove();
		  });
		}
	  });

	  // Place the calendar within the Chat Card
	  var bodyElement = $('<div>').addClass("k-card-body").append(calendarElement);
	  this.element.addClass("k-card").append(bodyElement);
	}
  });

  kendo.chat.registerComponent("CalendarComponent", CalendarComponent);

  var chat = $("#chat").kendoChat().data("kendoChat");

  chat.postMessage("Hello!");
  chat.postMessage("Please, select a date from the Calendar.");

  chat.renderAttachments({
	attachments: [{
	  contentType: "CalendarComponent",
	  content: {
		value: new Date()
	  }
	}]
  }, chat.getUser());
</script>
```

## See Also

* [Connecting to Chat Bot Services]({% slug connect_to_chatbot_service %})
* [Chat JavaScript API Reference](/api/javascript/ui/chat)

For runnable examples on Kendo UI Chat, refer to the [Kendo UI Demos site](http://demos.telerik.com/kendo-ui/chat/index).
