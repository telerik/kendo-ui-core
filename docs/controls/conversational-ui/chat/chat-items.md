---
title: Chat Items
page_title: Chat Items | Kendo UI Chat
description: "Learn about the predefined Chat Items and how to configure custom ones."
slug: chat_items
position: 3
---

# Chat Items

The Kendo UI Chat offers support for some predefined and customizable items, that would provide better user experience.

* [Default cards](#default-cards)
* [Suggested actions](#suggested-actions)
* [Custom templates](#custom-templates)
* [Custom components](#custom-components)

## Default Cards

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

You could also easily add images to the `heroCard` by passing the proper values to the `attachments.content.images` object:

```html
<div id="chat"></div>
<script>
	$("#chat").kendoChat();

	var chat = $("#chat").data("kendoChat");

	chat.renderAttachments({
		attachments: [{
			contentType: "heroCard",
			content: {
				title: "Ninja Title",
				subtitle: "The Telerik Ninja",
				text: "This is an example.",
				images: [{
					url: "https://docs.telerik.com/kendo-ui/images/ninja-icon.png",
					alt: "Ninja"
				}]
			}
		}],
		attachmentLayout: "carousel"
	}, chat.getUser());
</script>
```

## Suggested Actions

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

## Custom Templates

The Chat supports the definition of custom templates to fit any custom payload that is returned by the service.

The following example demonstrates how to implement a simple template and to register it for the Chat.

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

## Custom Components

The Chat supports the implementation of custom components which allows you to use JavaScript to render any content.

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

* [Chat Overview]({% slug overview_kendoui_chat_widget %})
* [Connecting to Chat Bot Services]({% slug connect_to_chatbot_service %})
* [Chat JavaScript API Reference](/api/javascript/ui/chat)

For runnable examples on Kendo UI Chat, refer to the [Kendo UI Demos site](http://demos.telerik.com/kendo-ui/chat/index).