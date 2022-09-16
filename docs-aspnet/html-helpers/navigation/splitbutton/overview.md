---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI SplitButton component for {{ site.framework }}."
previous_url: /helpers/navigation/splitbutton/overview
slug: htmlhelpers_splitbutton_aspnetcore
position: 1
---

# SplitButton Overview

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
        .Icon("paste")
        .Items(items => {
            items.Add().Id("keep-text").Text("Keep Text Only").Icon("paste-plain-text");
            items.Add().Id("paste-html").Text("Paste as HTML").Icon("paste-as-html");
            items.Add().Id("paste-markdown").Text("Paste Markdown").Icon("paste-markdown");
            items.Add().Id("paste-default").Text("Set Default Paste");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-splitbutton name="splitButton" text="Paste" icon="paste">
        <splitbutton-items>
            <item id="keep-text" text="Keep Text Only" icon="paste-plain-text"></item>
            <item id="paste-html" text="Paste as HTML" icon="paste-as-html"></item>
            <item id="paste-markdown" text="Paste Markdown" icon="paste-markdown"></item>
            <item id="paste-default" text="Set Default Paste"></item>
        </splitbutton-items>
    </kendo-splitbutton>
```
{% endif %}

## Functionality and Features

* [Items]({% slug htmlhelpers_splitbutton_aspnetcore_items %})&mdash;You can configure the SplitButton by adding items to the popup.
* [Appearance]({% slug htmlhelpers_splitbutton_aspnetcore_appearance %})&mdash;You can control the appearance of the SplitButton by configuring its styling options.
* [Icons]({% slug htmlhelpers_splitbutton_aspnetcore_icons %})&mdash;You can enchance the SplitButton's textual content by adding icons.
* [Accessibility]({% slug accessibility_aspnetcore_splitbutton %})&mdash;You can access the SplitButton by different screen readers.

## See Also

* [Overview of the SplitButton for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/splitbutton/index)
* [Using the Basic Events of the SplitButton for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/splitbutton/events)
* [Applying the SplitButton API (Demo)](https://demos.telerik.com/{{ site.platform }}/splitbutton/api)
* [Server-Side API](/api/splitbutton)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/splitbutton)

