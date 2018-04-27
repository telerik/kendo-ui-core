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

### Create the Chat Agent

Each Kendo Chat uses an `agent` that would communicate with the Bot framework of choice. The `agent` class should implement its `init()`, `postMessage()`, `onResponse()`, `renderMessage()`, `renderAttachments()` and `renderSuggestedActions()` methods. In can also implement its `postEvent()` method. In the `init()` method, the Bot framework agent should be assigned to the `agent` property of the newly created class:

###### Example

    window.AgentClass = kendo.Class.extend({
		init: function (chat) {
			this.chat = chat;
			this.userInfo = {
				id: "botty",
				iconUrl: "../content/chat/avatar.png",
				name: "Botty McbotFace"
			};

			// Assign here the Bot framework agent
			// The below example uses the Microsoft's Bot Framework
			this.agent = new DirectLine.DirectLine({ secret: "Y_ly-If6haE.cwA.PQE.ZwOOsq4MlHcD3_YLFI-t9oW6L6DXMMBoi67LBz9WaWA" });

			// The below code would depend on the Bot framework of choice
			this.agent.activity$.subscribe($.proxy(this.onResponse, this));
		},
		// The implementation of the below methods would depend on the Bot framework of choice
		// This example uses the Microsoft's Bot Framework API to demonstrate a possible implementation
		postMessage: function (args) {
			this.agent.postActivity(args)
				.subscribe();
		},
		onResponse: function (response) {
			if (response.from.id === this.chat.getUser().id) {
				return;
			}

			response.from.iconUrl = this.userInfo.iconUrl;
			
			this.renderMessage(response);
			this.renderAttachments(response);
			this.renderSuggestedActions(response.suggestedActions);
		},
		renderMessage: function (message) {
			if (message.text || message.type == "typing") {
				this.chat.renderMessage(message, message.from);
			}
		},
		renderAttachments: function (data) {
			this.chat.renderAttachments(data, data.from);
		},
		renderSuggestedActions: function (suggestedActions) {
			var actions = [];

			if (suggestedActions && suggestedActions.actions) {
				actions = suggestedActions.actions;
			}

			this.chat.renderSuggestedActions(actions);
		}
	});
	
### Initialize the Chat

The Kendo UI Chat widget is rendered by selecting the `div` with a jQuery selector, calling the `kendoChat()` function and configuring its agent for the [`post`](/api/javascript/ui/chat/events/post) event:

###### Example

    var chat = $("#chat").kendoChat({
		post: function (args) {
			agent.postMessage(args);
		}
	}).data("kendoChat");

	var agent = new AgentClass(chat);

## Features

### Default Cards

The Chat widget supports out-of-the-box `hero cards` which can be displayed in the chat flow. To display the `heroCard`, you could manually call the [`renderAttachments`](/api/javascript/ui/chat/methods/renderattachments) method of the widget:

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

The Chat widget offers the possibility to define custom templates to fit any custom payload, returned by the service. The below example demonstrates the implementation of a sample template and how that can be registered for the Kendo Chat:

###### Example

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
	
	<script type=“text/javascript”>
      var QUOTE_CARD_TEMPLATE = kendo.template($('#quote-template').html());
      kendo.chat.registerTemplate("quote", QUOTE_CARD_TEMPLATE);
	</script>
	
### Custom Components

The Chat widget allows the developer to define custom components, which let you use JavaScript to render any content. The below example demonstrates how to use the [AdaptiveCards client API](https://github.com/Microsoft/AdaptiveCards) to render the adaptive cards returned by the service:

###### Example

    var AdaptiveCardComponent = kendo.chat.Component.extend({
		init: function (options, view) {
			kendo.chat.Component.fn.init.call(this, options, view);

			var adaptiveCard = new AdaptiveCards.AdaptiveCard();

			adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
				fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
			});

			// The Microsoft Bot Framework would return the JSON data in the format required by the AdaptiveCard
			// The component can be configured to consume data from other Bot frameworks too
			// In such case, the data would need to be transformed in the required format
			adaptiveCard.parse(options);

			var bodyElement = $("<div>").addClass("k-card-body").append(adaptiveCard.render());
			this.element.addClass("k-card").append(bodyElement);
		},

		destroy: function () {
		}
	});

	kendo.chat.registerComponent("application/vnd.microsoft.card.adaptive", AdaptiveCardComponent);

## See Also

* [Chat JavaScript API Reference](/api/javascript/ui/chat)

For runnable examples on Kendo UI Chat, refer to the [Kendo UI Demos site](http://demos.telerik.com/kendo-ui/chat/index).
