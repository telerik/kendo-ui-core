---
title: Adornments
page_title: Telerik UI Chat Documentation - Adornments
description: "Learn how to configure PromptBox adornments in the Telerik UI for {{ site.framework }} Chat component."
components: ["chat"]
slug: htmlhelpers_adornments_chat
position: 8
---

# Adornments

The Chat component supports PromptBox adornments that let you place custom UI elements around the input area. You can render content before the input, after the input, or above it to enable custom actions, settings, and context selectors.

Use the demo source tabs to compare the wrapper syntax in each platform:

{% if site.core %}
* [Chat Adornments Demo (ASP.NET Core)](https://demos.telerik.com/aspnet-core/chat/adornments)
* [Chat Adornments Demo (ASP.NET MVC)](https://demos.telerik.com/aspnet-mvc/chat/adornments)
{% else %}
* [Chat Adornments Demo (ASP.NET MVC)](https://demos.telerik.com/aspnet-mvc/chat/adornments)
{% endif %}

## PromptBox Affix Templates

Use the following message box options to configure PromptBox adornments:

* `StartAffixTemplate()`&mdash;Renders content before the message input.
* `EndAffixTemplate()`&mdash;Renders content after the message input.
* `TopAffixTemplate()`&mdash;Renders content above the message input.

## Start and End Adornments

The example below configures action buttons in the start and end PromptBox areas.

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .AuthorId("user")
    .MessageBox(messageBox => messageBox
        .Mode(PromptBoxMode.Single)
        .StartAffixTemplate("<button class='k-button k-button-flat k-button-sm' type='button'>Source</button>")
        .EndAffixTemplate("<button class='k-button k-button-flat k-button-sm' type='button'>Settings</button>")
    )
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat" author-id="user">
    <message-box mode="PromptBoxMode.Single"
                 start-affix-template="<button class='k-button k-button-flat k-button-sm' type='button'>Source</button>"
                 end-affix-template="<button class='k-button k-button-flat k-button-sm' type='button'>Settings</button>">
    </message-box>
</kendo-chat>
```
{% endif %}

## Top Adornment

Use a top affix template to add controls such as model selection above the input:

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .AuthorId("user")
    .MessageBox(messageBox => messageBox
        .Mode(PromptBoxMode.Multi)
        .Rows(3)
        .TopAffixTemplate("<div class='chat-model-affix'><select id='chat-model'></select></div>")
    )
)

<script>
    $(document).on("kendoReady", function() {
        $("#chat-model").kendoDropDownList({
            dataSource: ["GPT-4o", "GPT-4o mini", "Claude 3.5 Haiku"],
            value: "GPT-4o"
        });
    });
</script>
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat" author-id="user">
    <message-box mode="PromptBoxMode.Multi"
                 rows="3"
                 top-affix-template="<div class='chat-model-affix'><select id='chat-model'></select></div>">
    </message-box>
</kendo-chat>

<script>
    $(document).on("kendoReady", function() {
        $("#chat-model").kendoDropDownList({
            dataSource: ["GPT-4o", "GPT-4o mini", "Claude 3.5 Haiku"],
            value: "GPT-4o"
        });
    });
</script>
```
{% endif %}

## Next Steps

* [Chat Overview]({% slug htmlhelpers_chat_aspnetcore %})
* [AutoScroll Threshold]({% slug htmlhelpers_autoscroll_threshold_chat %})
* [Quick Actions]({% slug htmlhelpers_quick_actions_chat %})
* [Chat Templates]({% slug htmlhelpers_templates_chat %})
* [PromptBox Adornments Demo](https://demos.telerik.com/{{ site.platform }}/chat/adornments)
