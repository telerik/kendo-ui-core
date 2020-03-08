---
title: Modify the Font CSS in the Chat
description: Change the font of the messages and the placeholder in the Kendo UI Chat.
type: how-to
page_title: Customize the Font Style | Kendo UI Chat
slug: chat-change-font-css-messages-placeholder
position: 
tags: change, modify, font, messages, placeholder, chat
ticketid: 1440042
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2019.3.1023</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Chat for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description
How can I change the font of the messages and the placeholder in the Kendo UI Chat?

## Solution
Use the following CSS class to modify the font in the placeholder and the messages:

```css
.k-bubble, 
.k-message-box {
  font: italic bold 20px Georgia, serif;
}
```
#### Example

```dojo
	<style>
		.k-bubble, 
		.k-message-box {
			font: italic bold 20px Georgia, serif;
		}
	</style>
	
	<div id="chat"></div>

	<script>
		$("#chat").kendoChat().data("kendoChat");
	</script>
```

