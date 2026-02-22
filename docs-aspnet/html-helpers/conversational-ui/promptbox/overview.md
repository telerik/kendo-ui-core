---
title: Overview
page_title: PromptBox Overview
description: "Learn the basics when working with the Telerik UI PromptBox component for {{ site.framework }}."
slug: htmlhelpers_promptbox_aspnetcore
position: 0
components: ["promptbox"]
---

# {{ site.framework }} PromptBox Overview

The Telerik UI for {{ site.framework }} PromptBox component provides an input interface that enables users to interact with AI language models through a rich text input experience.

The PromptBox serves as a dedicated input area for composing and sending prompts to AI models. It offers flexible input sizing options to accommodate different prompt lengths and user preferences. The component supports file attachments and adornments, making it a versatile solution for building AI-powered conversational interfaces.

## Initializing the PromptBox

The following example demonstrates how to define a PromptBox.

```HtmlHelper
    @(Html.Kendo().PromptBox()
        .Name("promptBox")
        .Placeholder("Enter your prompt...")
    )
```
{% if site.core %}
```TagHelper
    <kendo-promptbox name="promptBox" placeholder="Enter your prompt...">
    </kendo-promptbox>
```
{% endif %}

## Functionality and Features

* [Modes]({% slug htmlhelpers_promptbox_modes_aspnetcore %})&mdash;The PromptBox supports different interaction modes to suit various use cases and user preferences.
* [Appearance]({% slug htmlhelpers_promptbox_appearance_aspnetcore %})&mdash;Customize the appearance of the built-in buttons with predefined options for size, border radius, fill modes, and theme colors.
* [Adornments]({% slug htmlhelpers_promptbox_adornments_aspnetcore %})&mdash;Customize the PromptBox with icons, buttons, and other UI elements for enhanced functionality.
* [Tools]({% slug htmlhelpers_promptbox_tools_aspnetcore %})&mdash;Utilize the available tools like Action Button, File Select Button, and Speech-to-Text Button.
* [Events]({% slug htmlhelpers_promptbox_events_aspnetcore %})&mdash;Handle user interactions through events like prompt submission, attachment uploads, and content changes.
* [Keyboard Navigation]({% slug htmlhelpers_promptbox_keyboard_navigation_aspnetcore %})&mdash;Navigate and interact efficiently using keyboard shortcuts for message composition and actions.
* [Accessibility]({% slug htmlhelpers_promptbox_accessibility_aspnetcore %})&mdash;Full accessibility support with WAI-ARIA attributes, ensuring WCAG 2.2 AA and Section 508 compliance.

## Next Steps

* [Basic Usage of the PromptBox for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/promptbox/index)
* [PromptBox Modes (Demo)](https://demos.telerik.com/{{ site.platform }}/promptbox/modes)

## See Also

* [Server-Side API of the PromptBox HtmlHelper](/api/promptbox)
{% if site.core %}
* [Server-Side API of the PromptBox TagHelper](/api/taghelpers/promptbox)
{% endif %}
* [JavaScript API Reference of the PromptBox](/api/javascript/ui/promptbox)
