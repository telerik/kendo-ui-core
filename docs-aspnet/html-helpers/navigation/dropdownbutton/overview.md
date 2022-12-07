---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI DropDownButton component for {{ site.framework }}."
previous_url: /helpers/navigation/dropdownbutton/overview
slug: htmlhelpers_dropdownbutton_aspnetcore
position: 1
---

# {{ site.framework }} DropDownButton Overview

{% if site.core %}
The Telerik UI DropDownButton TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI DropDownButton widget.
{% else %}
The Telerik UI DropDownButton HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI DropDownButton widget.
{% endif %}

The DropDownButton combines the functionality of a button with that of a dropdown element. It allows users to click the primary button and open the drop-down popup to choose from a list of additional actions.

* [Demo page for the DropDownButton](https://demos.telerik.com/{{ site.platform }}/dropdownbutton)

## Initializing the DropDownButton

The following example demonstrates how to define the DropDownButton.

```HtmlHelper
    @(Html.Kendo().DropDownButton()
        .Name("DropDownButton")
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
    <kendo-dropdownbutton name="DropDownButton" text="Paste" icon="paste">
        <dropdownbutton-items>
            <item id="keep-text" text="Keep Text Only" icon="paste-plain-text"></item>
            <item id="paste-html" text="Paste as HTML" icon="paste-as-html"></item>
            <item id="paste-markdown" text="Paste Markdown" icon="paste-markdown"></item>
            <item id="paste-default" text="Set Default Paste"></item>
        </dropdownbutton-items>
    </kendo-dropdownbutton>
```
{% endif %}

## Functionality and Features

* [Items]({% slug htmlhelpers_dropdownbutton_aspnetcore_items %})&mdash;You can configure the DropDownButton by adding items to the popup.
* [Appearance]({% slug htmlhelpers_dropdownbutton_aspnetcore_appearance %})&mdash;You can control the appearance of the DropDownButton by configuring its styling options.
* [Icons]({% slug htmlhelpers_dropdownbutton_aspnetcore_icons %})&mdash;You can enchance the DropDownButton's textual content by adding icons.
* [Accessibility]({% slug accessibility_aspnetcore_dropdownbutton %})&mdash;You can access the DropDownButton by different screen readers.

## See Also

* [Overview of the DropDownButton for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownbutton/index)
* [Using the Basic Events of the DropDownButton for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownbutton/events)
* [Applying the DropDownButton API (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownbutton/api)
* [Server-Side API](/api/dropdownbutton)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownbutton)

