---
title: Overview
page_title: Chat | Telerik UI for ASP.NET MVC HtmlHelpers
description: "Get started with the server-side wrapper for the Kendo UI Chat widget for ASP.NET MVC."
slug: overview_chathelper_aspnetmvc
position: 1
---

# Chat HtmlHelper Overview

The Chat HtmlHelper extension is a server-side wrapper for the [Kendo UI Chat](https://demos.telerik.com/kendo-ui/chat/index) widget.

The Chat widget allows the user to participate in chat sessions with other users or with chat bots. The widget provides support for default [cards](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#default-cards) and [actions](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#default-actions), and enables the configuration of [custom templates](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#custom-templates) and [custom components](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#custom-components).

For more information on new Chat features, refer to the [Kendo UI Roadmap](http://www.telerik.com/support/whats-new/kendo-ui-web/roadmap).

## Getting Started

### Create the Chat

The following example demonstrates how to use the HtmlHelper declaration to create a Chat widget with its `name` and `id` set to `"chat"`.

###### Example

```Razor
	@(Html.Kendo().Chat()
		.Name("chat")
	)
```
```ASPX
	<%: Html.Kendo().Chat()
		.Name("chat")
	%>
```

## Event Handling

You can subscribe to all Chat [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/chat) either by a [handler name](#by-handler-name) or by a [template delegate](#by-template-delegate).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```Razor
	@(Html.Kendo().Chat()
		.Name("chat")
		.Events(e => e
			.Post("onPost")
			.SendMessage("onSendPessage")
		)
	)

	<script>
	  function onPost() {
		//Handle the post event.
	  }

	  function onSendPessage() {
		//Handle the sendMessage event.
	  }
	</script>
```
```ASPX
	<%: Html.Kendo().Chat()
		.Name("chat")
		.Events(e => e
			.Post("onPost")
			.SendMessage("onSendPessage")
		)
	%>

	<script>
	  function onPost() {
		//Handle the post event.
	  }

	  function onSendPessage() {
		//Handle the sendMessage event.
	  }
	</script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

```Razor
	@(Html.Kendo().Chat(Model)
		.Name("chat")
		.Events(e => e
			.Post(@<text>
				function() {
				  //Handle the post event inline.
				}
			</text>)
			.SendMessage(@<text>
				function() {
				  //Handle the sendMessage event inline.
				}
			</text>)
		)
	)
```

## Reference

### Existing Instances

To reference an existing Kendo UI Chat instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method call. Once a reference is established, use the [Chat API](http://docs.telerik.com/kendo-ui/api/javascript/ui/chat#methods) to control its behavior.

###### Example

	//Put this after your Kendo UI Chat for ASP.NET MVC declaration.
	<script>
	  $(function() {
		  //Notice that the Name() of the Chat is used to get its client-side instance.
		  var chat = $("#chat").data("kendoChat");
	  });
	</script>

## See Also

* [Peer-to-Peer Chat with SignalR]({% slug signalr_chathelper_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference: ChatBuilder](/api/Kendo.Mvc.UI.Fluent/ChatBuilder)
* [Overview of the Kendo UI Chat Widget](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
