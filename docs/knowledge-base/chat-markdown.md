---
title: Render Chat Messages in Markdown
description: Learn how to create a custom message type that uses third-party libraries to render Markdown in the Kendo UI for jQuery.
type: how-to
page_title: Show Markdown Messages - Kendo UI for jQuery Chat
slug: chat-markdown
tags: chat, markdown, kendo ui
ticketid: 1411881
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2021.1.224</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® Chat for jQuery</td>
	</tr>
</table>


## Description

The chat Widget renders Markdown in the 'text' field of a message activity as plain text - it does not convert it to Markdown. I need it to properly render Markdown in messages.

## Solution

Kendo UI Chat renders messages as text and HTML only. For the Markdown to be rendered properly in the Kendo UI Chat, it has to be converted to Html first. Use a third-party library of your choice that renders Markdown to Html and include it on the client-side. You can then render the resulting HTML using a Kendo Template.

The example below demonstrates how to implement this using the [markdown-js](https://github.com/evilstreak/markdown-js) library.


To show the message:

1. Register a custom message type with the [`kendo.template`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/template) and [`kendo.chat.registerTemplate`](https://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/chat-items#custom-templates)
1. In the Template render the Markdown to Html using the third-party library
1. Show the message using the `renderMessage` method


```dojo
<script src="https://unpkg.com/markdown@0.5.0/lib/markdown.js"></script>
<script src="https://unpkg.com/turndown@5.0.3/dist/turndown.js"></script>
</head>
<body>

<div id="chat"></div>
<script>
  	var MD_MESSAGE = kendo.template(
      '<div class="k-message">' +
      '<div class="k-bubble">' +
				'#= markdown.toHTML(text, "Maruku") #' +
      '</div>' +
      '</div>'
    );

  	kendo.chat.registerTemplate("md_message", MD_MESSAGE);

  	$("#chat").kendoChat();

    var chat = $("#chat").data("kendoChat");

    chat.renderMessage({
        type: "md_message",
        text: "*Hello* __MD__ Message [link](http://www.telerik.com)"
    }, {
        id: kendo.guid(),
        name: "Sample Bot",
        iconUrl: "https://demos.telerik.com/kendo-ui/content/chat/InsuranceBot.png"
    });
</script>
```


## See also

* [Kendo UI Templates Overview](https://docs.telerik.com/kendo-ui/framework/templates/overview)
* [JavaScript API Reference of the Chat renderMessage method](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat/methods/rendermessage)
