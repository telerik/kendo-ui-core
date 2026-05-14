---
title: AutoScroll Threshold
page_title: Telerik UI Chat Documentation - AutoScroll Threshold
description: "Learn how to configure the AutoScrollThreshold option in the Telerik UI for {{ site.framework }} Chat component."
components: ["chat"]
slug: htmlhelpers_autoscroll_threshold_chat
position: 9
---

# AutoScroll Threshold

The Chat component exposes an `AutoScrollThreshold` option that controls when incoming messages trigger automatic scrolling.

When users stay within the configured bottom zone, the Chat keeps new messages in view. When users scroll further away from the bottom, the Chat preserves their reading position and shows the scroll-to-bottom action instead.

## Configure AutoScrollThreshold

Set the threshold as a pixel value (for example, `120px`) or as a percentage of the viewport (for example, `50%`).

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .AuthorId("user")
    .AutoScrollThreshold("50%")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat"
    author-id="user"
    auto-scroll-threshold="50%">
</kendo-chat>
```
{% endif %}

## Runtime Updates

You can update the threshold dynamically through the client-side API:

```JavaScript
const chat = $("#chat").data("kendoChat");
chat.setOptions({
    autoScrollThreshold: "200px"
});
```

## See Also

{% if site.core %}
* [AutoScroll Threshold Demo (ASP.NET Core)](https://demos.telerik.com/aspnet-core/chat/autoscroll-threshold)
* [AutoScroll Threshold Demo (ASP.NET MVC)](https://demos.telerik.com/aspnet-mvc/chat/autoscroll-threshold)
{% else %}
* [AutoScroll Threshold Demo (ASP.NET MVC)](https://demos.telerik.com/aspnet-mvc/chat/autoscroll-threshold)
{% endif %}
* [Chat Overview]({% slug htmlhelpers_chat_aspnetcore %})
* [Chat Adornments]({% slug htmlhelpers_adornments_chat %})
* [Client-Side API of the Chat](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat)
