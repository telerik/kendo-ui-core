---
title: Items
page_title: Telerik UI Chat Documentation - Items
description: "Learn how to use predefined and custom items in the Telerik UI Chat component for {{ site.framework }}."
components: ["chat"]
slug: htmlhelpers_items_chat
position: 3
---

# Items

To provide better customer experience, the Chat offers support for predefined and customizable items displayed within the conversation flow.

* [Default cards](#default-cards)
* [Suggested actions](#suggested-actions)
* [Custom templates](#custom-templates)

The `carousel` attachment layout applies to attachments rendered inside Chat messages. It is not a general-purpose carousel for page-level messages, top-menu information, or static message containers.

## Default Cards

The Chat supports rendering of hero cards through the `RenderAttachments()` method, which displays attachments with customizable layout options.

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat">
</kendo-chat>
```
{% endif %}

```JavaScript
<script>
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

### Adding Images to Hero Cards

You can add images to the hero card by passing image data to the `attachments.content.images` object.

```JavaScript
<script>
    var chat = $("#chat").data("kendoChat");
    
    chat.renderAttachments({
        attachments: [{
            contentType: "heroCard",
            content: {
                title: "Product Card",
                subtitle: "Featured Product",
                text: "High-quality product example.",
                images: [{
                    url: "https://example.com/image.png",
                    alt: "Product Image"
                }]
            }
        }],
        attachmentLayout: "carousel"
    }, chat.getUser());
</script>
```

## Suggested Actions

The Chat supports rendering of suggested actions through the `RenderSuggestedActions()` method. These appear as quick-reply options below the message input area, enabling users to select predefined responses.

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat">
</kendo-chat>
```
{% endif %}

```JavaScript
<script>
    var chat = $("#chat").data("kendoChat");
    
    chat.renderSuggestedActions([
        {
            title: "Option 1",
            value: "Value 1"
        },
        {
            title: "Option 2",
            value: "Value 2"
        },
        {
            title: "Option 3",
            value: "Value 3"
        }
    ]);
</script>
```

## Custom Templates

The Chat provides options for defining custom templates to render custom payload returned by your service. This allows you to display specialized content types beyond the default hero cards and suggested actions.

### Registering and Using Custom Templates

1. Define a template using the Kendo template syntax.
2. Register the template with the Chat using `kendo.chat.registerTemplate()`.
3. Use the registered template when rendering attachments.

```HTML
<script id="quote-template" type="text/x-kendo-template">
    <div class="#=styles.card# #=styles.cardRich#">
        <div class="#=styles.cardBody#">
            <div>
                <strong>Type:</strong>
                <span>#:coverage#</span>
            </div>
            <div>
                <strong>Car model:</strong>
                <span>#:make#</span>
            </div>
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
                <strong>Premium:</strong>
                <span>#:premium#</span>
            </div>
        </div>
    </div>
</script>
```

```JavaScript
<script>
    var QUOTE_CARD_TEMPLATE = kendo.template($('#quote-template').html());
    kendo.chat.registerTemplate("quote", QUOTE_CARD_TEMPLATE);

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

## See Also

* [Chat Overview Demo](https://demos.telerik.com/{{ site.platform }}/chat/index)
* [Using Client Templates]({% slug client_templates_overview %})
