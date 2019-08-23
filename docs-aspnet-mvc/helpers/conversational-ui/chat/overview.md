---
title: Overview
page_title: Chat Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI Chat HtmlHelper for ASP.NET MVC."
slug: overview_chathelper_aspnetmvc
position: 1
---

# Chat HtmlHelper Overview

The Telerik UI Chat HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI Chat widget.

The Chat allows the user to participate in chat sessions with other users or with chat bots. It provides support for default cards and actions, and enables the configuration of custom templates and custom components.

* [Demo page for the Chat](https://demos.telerik.com/aspnet-mvc/chat/index)

## Initializing the Chat

The following example demonstrates how to define the Chat by using the Chat HtmlHelper with its `name` and `id` set to `"chat"`.

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

## Functionality and Features

The Chat provides an option for creating a [Peer-to-Peer Chat application by using SignalR]({% slug signalr_chathelper_aspnetmvc %}).  

## Events

You can subscribe to all Chat [events](/api/chat).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```Razor
	@(Html.Kendo().Chat()
		.Name("chat")
		.Events(e => e
			.Post("onPost")
			.SendMessage("onSendMessage")
		)
	)

	<script>
	  function onPost() {
		// Handle the post event.
	  }

	  function onSendMessage() {
		// Handle the sendMessage event.
	  }
	</script>
```
```ASPX
	<%: Html.Kendo().Chat()
		.Name("chat")
		.Events(e => e
			.Post("onPost")
			.SendMessage("onSendMessage")
		)
	%>

	<script>
	  function onPost() {
		// Handle the post event.
	  }

	  function onSendMessage() {
		// Handle the sendMessage event.
	  }
	</script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```Razor
	@(Html.Kendo().Chat(Model)
		.Name("chat")
		.Events(e => e
			.Post(@<text>
				function() {
				  // Handle the post event inline.
				}
			</text>)
			.SendMessage(@<text>
				function() {
				  // Handle the sendMessage event inline.
				}
			</text>)
		)
	)
```

## Referencing Existing Instances

To reference an existing Chat instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method call. Once a reference is established, use the [Chat client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat) to control its behavior.

	// Place the following after the Chat for ASP.NET MVC declaration.
	<script>
	  $(function() {
		  // The Name() of the Chat is used to get its client-side instance.
		  var chat = $("#chat").data("kendoChat");
	  });
	</script>

## See Also

* [Basic Usage of the Chat HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/chat)
* [Server-Side API](/api/chat)
