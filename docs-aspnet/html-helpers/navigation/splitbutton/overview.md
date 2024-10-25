---
title: Overview
page_title: Overview
description: "The Telerik UI SplitButton component for {{ site.framework }} provides a styled UI button with the functionality of a dropdown element."
previous_url: /helpers/navigation/splitbutton/overview
slug: htmlhelpers_splitbutton_aspnetcore
position: 0
---

# {{ site.framework }} SplitButton Overview

{% if site.core %}
The Telerik UI SplitButton TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI SplitButton widget.
{% else %}
The Telerik UI SplitButton HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI SplitButton widget.
{% endif %}

The SplitButton combines the functionality of a button with that of a dropdown element. It allows users to either click on the primary button and run its default behavior, or to open the drop-down popup and choose from a list of additional actions.

* [Demo page for the SplitButton](https://demos.telerik.com/{{ site.platform }}/splitbutton)

## Initializing the SplitButton

The following example demonstrates how to define the SplitButton.

```HtmlHelper
    @(Html.Kendo().SplitButton()
        .Name("splitButton")
        .Text("Paste")
        .Icon("clipboard")
        .Items(items => {
            items.Add().Id("keep-text").Text("Keep Text Only").Icon("clipboard-text");
            items.Add().Id("paste-html").Text("Paste as HTML").Icon("clipboard-code");
            items.Add().Id("paste-markdown").Text("Paste Markdown").Icon("clipboard-markdown");
            items.Add().Id("paste-default").Text("Set Default Paste");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-splitbutton name="splitButton" text="Paste" icon="clipboard">
        <splitbutton-items>
            <item id="keep-text" text="Keep Text Only" icon="clipboard-text"></item>
            <item id="paste-html" text="Paste as HTML" icon="clipboard-code"></item>
            <item id="paste-markdown" text="Paste Markdown" icon="clipboard-markdown"></item>
            <item id="paste-default" text="Set Default Paste"></item>
        </splitbutton-items>
    </kendo-splitbutton>
```
{% endif %}

## Functionality and Features

* [Items]({% slug htmlhelpers_splitbutton_aspnetcore_items %})&mdash;You can configure the SplitButton by adding items to the popup.
* [Appearance]({% slug htmlhelpers_splitbutton_aspnetcore_appearance %})&mdash;You can control the appearance of the SplitButton by configuring its styling options.
* [Icons]({% slug htmlhelpers_splitbutton_aspnetcore_icons %})&mdash;You can enchance the SplitButton's textual content by adding icons.
* [Accessibility]({% slug accessibility_aspnetcore_splitbutton %})&mdash;The SplitButton is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

>tip To learn more about the appearance, anatomy, and accessibility of the SplitButton, visit the [Progress Design System documentation](https://www.telerik.com/design-system/docs/components/splitbutton/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

## Next Steps

* [Getting Started with the SplitButton]({% slug aspnetcore_splitbutton_getting_started %})
* [Basic Usage of the SplitButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/splitbutton/index)
{% if site.core %}
* [Basic Usage of the SplitButton TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/splitbutton/tag-helper)
{% endif %}

## See Also

* [Using the API of the SplitButton (Demo)](https://demos.telerik.com/{{ site.platform }}/splitbutton/api)
* [Knowledge Base Section](/knowledge-base)
