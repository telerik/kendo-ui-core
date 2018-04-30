---
title: Overview
page_title: Overview | Kendo UI Chat
description: "Learn how to create a Chat UI, integrate it with different frameworks and configure its templates."
slug: overview_kendoui_chat_widget
position: 1
---

# Chat Overview

The [Kendo UI Chat](http://demos.telerik.com/kendo-ui/chat/index) widget allows for integration with any Bot framework, due to its simplicity, flexible API and customizable templates.

For additional information on new Kendo UI Chat features, refer to the [Kendo UI Roadmap](http://www.telerik.com/support/whats-new/kendo-ui-web/roadmap).

## Getting Started

### Create the Chat

To create a Chat UI, add an empty `div` in the HTML, provide it with an ID, and, optionally, set the width and height of the desired chart inline or via CSS, as demonstrated in the example below.

###### Example

    <div id="chart" style="width: 400px; height: 600px"></div>
	
### Initialize the Chat

The Kendo UI Chat widget is rendered by selecting the `div` with a jQuery selector, calling the `kendoChat()` function and configuring its implementation for the [`post`](/api/javascript/ui/chat/events/post) event:

###### Example

    var chat = $("#chat").kendoChat({
		post: function (args) {
			// react on a user post action
		}
	}).data("kendoChat");

## Features

### Default Cards

The Chat widget supports out-of-the-box `heroCards` which can be displayed in the chat flow. To display the `heroCard`, you could manually call the [`renderAttachments`](/api/javascript/ui/chat/methods/renderattachments) method of the widget:

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

The Chat widget supports out-of-the-box `suggested actions`. To display the `suggestedActions` prompt, you could manually call the [`renderSuggestedActions`](/api/javascript/ui/chat/methods/rendersuggestedactions) method of the widget: 

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

The Chat widget offers the possibility to define custom templates to fit any custom payload, returned by the service. The below example demonstrates the implementation of a simple template and how that can be registered for the Kendo Chat:

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

The Chat widget allows the developer to define custom components, which let you use JavaScript to render any content. The below example demonstrates how to place a [Kendo UI Calendar]({% slug overview_kendoui_calendar_widget %}) in a component:

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
        change: function(e) {
          alert(kendo.toString(e.sender.value(), 'D') + ' selected!');
        }
      });

      // Place the calendar within the Chat Card
      var bodyElement = $('<div>').addClass("k-card-body").append(calendarElement);
      this.element.addClass("k-card").append(bodyElement);
    }
  });

  kendo.chat.registerComponent("CalendarComponent", CalendarComponent);

  $("#chat").kendoChat({
    sendMessage: function(e) {
      var dateText = e.text;
      var date = new Date(dateText);
      var chat = e.sender;

      if ( Object.prototype.toString.call(date) === "[object Date]" ) {
        if(isNaN(date)) {
          chat.postMessage("The date is not valid!");
        }
        else {
          chat.renderAttachments({
          attachments: [{
            contentType: "CalendarComponent",
            content: {
              value: date
            }
          }]
        }, chat.getUser());
        }
      }
      else {
        chat.postMessage("The date is not valid!");
      }
    }
  });

  var chat = $("#chat").data("kendoChat");

  chat.postMessage("Hello!");
  chat.postMessage("Please, type a date to display it in a Calendar.");

</script>
```

## See Also

* [Configure Chat Agent]({% slug configure_chat_agent %})
* [Chat JavaScript API Reference](/api/javascript/ui/chat)

For runnable examples on Kendo UI Chat, refer to the [Kendo UI Demos site](http://demos.telerik.com/kendo-ui/chat/index).
