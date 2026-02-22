---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Get started with the Telerik UI SmartPasteButton for {{ site.framework }} and its keyboard navigation support."
components: ["smartpastebutton"]
slug: smartpastebutton_keyboard_navigation
position: 7
---

# Keyboard Navigation

The keyboard navigation of the SmartPasteButton is always available and integrates with the form focus flow.

For a complete example, refer to the [demo on keyboard navigation of the SmartPasteButton](https://demos.telerik.com/{{ site.platform }}/smartpastebutton/keyboard-navigation).

## Default Keyboard Shortcuts

* **Tab**&mdash;Moves focus to the SmartPasteButton.
* **Enter** or **Space**&mdash;Activates the SmartPasteButton.

## Custom Keyboard Shortcut

In the demo, a custom shortcut focuses the SmartPasteButton when the user presses **Alt+W**.

```JS Scripts
<script>
    $(document).keydown(function (e) {
        if (e.altKey && e.keyCode === 87) {
            $(".k-smart-paste-button").focus();
        }
    });
</script>
```

## See Also

* [SmartPasteButton Overview]({% slug htmlhelpers_overview_smartpastebutton %})
* [Events of the SmartPasteButton]({% slug smartpastebutton_events %})
* [Server-Side API of the SmartPasteButton ](/api/smartpastebutton)
{% if site.core %}
* [Server-Side API of the SmartPasteButton TagHelper](/api/taghelpers/smartpastebutton)
{% endif %}
* [Knowledge Base Section](/knowledge-base)
