---
title: Overview
page_title: Telerik UI Chat Documentation | Data Binding Overview  
description: "Learn how to bind data to the {{ site.product }} Chat using various data binding approaches."
components: ["chat"]
slug: htmlhelpers_databinding_overview_chat
position: 1
---

# Data Binding Overview

The {{ site.product }} Chat provides flexible data binding capabilities that allow you to populate the chat with conversation data from various sources. You can choose the appropriate binding method based on your application architecture and data requirements.

{% if site.core %}
@[template](/_contentTemplates/core/json-serialization-note.md#json-serialization-note)
{% endif %}

## Data Binding Approaches

The Chat supports the following data binding methods:

### Local Data Binding

Bind the Chat to a local dataset by passing an arbitrary model directly within the boundaries of the component. This approach is optimal for:
- Pre-loaded conversation history or messages.
- Static chat scenarios with predefined conversations.
- Demo or testing environments with sample data.

For detailed implementation instructions, see [Local Data Binding]({% slug htmlhelpers_localbinding_chat %}).

### Remote Data Binding

Connect the Chat to a remote endpoint using AJAX operations. This enables:
- Real-time message synchronization with the server.
- Dynamic loading of conversation history.
- Integration with live chat services and messaging APIs.

For more information and examples, refer to the [Remote Data Binding]({% slug htmlhelpers_remotebinding_chat %}) documentation.

{% if site.core %}
## Data Binding in Razor Pages

You can seamlessly integrate the Chat component into Razor Pages applications. All the [data binding approaches](#data-binding-approaches) described above can be configured within Razor Pages scenarios.

The component supports both HtmlHelper and TagHelper syntax, and allows you to send the anti-forgery token when connecting to remote endpoints to ensure secure data operations.

For detailed implementation instructions, refer to the [Chat in Razor Pages]({% slug htmlhelpers_chat_razorpage_aspnetcore %}) article.
{% endif %}

## Key Considerations

When selecting a data binding approach for the Chat, evaluate the following factors:

* **Performance**&mdash;Local binding offers faster initial rendering, while remote binding provides better performance with large datasets through on-demand loading.
* **Data volume**&mdash;Large datasets are better handled with remote binding to improve Chat responsiveness.
* **Security**&mdash;Remote binding provides better control over data access through server-side validation and authorization.
* **Real-time requirements**&mdash;Remote binding is essential for scenarios requiring live data updates.
* **Maintenance**&mdash;Local binding is simpler for static data, while remote binding offers more flexibility for evolving data requirements.

## See Also

* [Server-Side API of the Chat HtmlHelper](/api/chat)
{% if site.core %}
* [Server-Side API of the Chat TagHelper](/api/taghelpers/chat)
{% endif %}