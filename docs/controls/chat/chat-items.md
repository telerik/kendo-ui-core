---
title: Items
page_title: jQuery Chat Documentation - Items
description: "Get started with the jQuery Chat by Kendo UI and use the predefined Chat items and configure custom ones."
slug: chat_items
position: 2
---

# Items

To provide better customer experience, the Chat offers support for predefined and customizable items.

* [Default cards](#default-cards)
* [Suggested actions](#suggested-actions)
* [Custom templates](#custom-templates)
* [Custom components](#custom-components)

## Default Cards

The Chat supports the `heroCards` option which can be displayed in the chat flow by manually calling the `renderAttachments` method of the component.

```dojo
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

You can also add images to the `heroCard` setting by passing the proper values to the `attachments.content.images` object.

```dojo
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
					url: "data:image/png;base64,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",
					alt: "Ninja"
				}]
			}
		}],
		attachmentLayout: "carousel"
	}, chat.getUser());
</script>
```

## Suggested Actions

The Chat also supports the implementation of suggested actions. To display the `suggestedActions` prompt, manually call the `renderSuggestedActions` method of the component.

```dojo
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

The Chat provides options for defining custom templates to fit custom payload that is returned by the service.

The following example demonstrates how to implement a simple template and register it for the Chat.

```dojo
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

The Chat allows you to implement custom components and use JavaScript to render content.

The following example demonstrates how to place a Kendo UI Calendar in a custom Chat component.

```dojo
<div id="chat"></div>

<script>
  var CalendarComponent = kendo.chat.Component.extend({
	init: function (options, view) {
	  kendo.chat.Component.fn.init.call(this, options, view);

	  // Create a <div> from which the Calendar will be initialized.
	  var calendarElement = $('<div>');

	  // Initialize the Calendar component by passing the provided value.
	  calendarElement.kendoCalendar({
		value: options.value,
		// Implement the logic that will be executed
		// when the user selects a date.
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

	  // Place the calendar within the Chat card.
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

* [Basic Usage of the Chat (Demo)](https://demos.telerik.com/kendo-ui/chat/index)
* [JavaScript API Reference of the Chat](/api/javascript/ui/chat)
