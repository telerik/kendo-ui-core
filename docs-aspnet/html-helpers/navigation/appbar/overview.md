---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI AppBar component for {{ site.framework }}."
slug: htmlhelpers_appbar_aspnetcore_overview
position: 0
---

# {{ site.framework }} AppBar Overview

{% if site.core %}
The Telerik UI AppBar TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI AppBar widget.
{% else %}
The Telerik UI AppBar HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI AppBar widget.
{% endif %}

The AppBar is a navigational template-driven component that renders options like action buttons, search panels, and icons. To take advantage of its functionality, you can include various [content items]({% slug htmlhelpers_appbar_aspnetcore_items %}).

* [Demo page for the AppBar HtmlHelper](https://demos.telerik.com/{{ site.platform }}/appbar/index)
{% if site.core %}
* [Demo page for the AppBar TagHelper](https://demos.telerik.com/aspnet-core/appbar/tag-helper)
{% endif %}

## Initializing the AppBar

The following example demonstrates how to define the AppBar.

```HtmlHelper
    @(Html.Kendo().AppBar()
        .Name("appbar")
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
 
    <kendo-appbar name="appbar"> 
    </kendo-appbar>
```
{% endif %}

## Basic Configuration

The following example showcases a basic configuration of the AppBar that contains a button and a [`DropDownButton`]({% slug htmlhelpers_dropdownbutton_aspnetcore %}), which is integrated with the help of the [`Template`]({% slug htmlhelpers_overview_template %}) component.

```HtmlHelper
    @(Html.Kendo().AppBar()
        .Name("appbar")
        .ThemeColor(AppBarThemeColor.Light)
        .Items(items =>
        {
            items.Add().Template("<button class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary'>Categories</button>").Type(AppBarItemType.ContentItem);
            items.Add().Type(AppBarItemType.Spacer).Width("10px");
            items.Add().Template(Html.Kendo().Template()
            .AddComponent(ddl => ddl
                .DropDownButton()
                .Name("dropdownBtn")
                .Text("User Settings")
                .Icon("user")
                .Items(items =>
                {
                    items.Add().Id("profile").Text("My Profile").Icon("image");
                    items.Add().Id("friend-request").Text("Friend Requests").Icon("inbox");
                    items.Add().Id("settings").Text("Account Settings").Icon("gear");
                    items.Add().Id("support").Text("Support").Icon("question-circle");
                    items.Add().Id("logout").Text("Log Out").Icon("logout");
                })
            ))
            .Type(AppBarItemType.ContentItem);
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
 
    <kendo-appbar name="appbar" theme-color="AppBarThemeColor.Light">
        <items>
            <appbar-item type="AppBarItemType.ContentItem" template="<button class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary'>Categories</button>"></appbar-item>
            <appbar-item type="AppBarItemType.Spacer" width="10px"></appbar-item>
            <appbar-item type="AppBarItemType.ContentItem">
                <template>
                    <kendo-dropdownbutton name="iconCssButon" text="User Settings">
                        <dropdownbutton-items>
                            <item id="profile" text="My Profile" icon="image"></item>
                            <item id="friend-request" text="Friend Requests" icon="inbox"></item>
                            <item id="settings" text="Account Settings" icon="gear"></item>
                            <item id="support" text="Support" icon="question-circle"></item>
                            <item id="logout" text="Log Out" icon="logout"></item>
                        </dropdownbutton-items>
                    </kendo-dropdownbutton>
                </template>
            </appbar-item>
        </items>
    </kendo-appbar>
```
{% endif %}

## Functionality and Features

* [Items]({% slug htmlhelpers_appbar_aspnetcore_items %})&mdash;You can integrate different types of items into the AppBar.
* [Positioning]({% slug htmlhelpers_appbar_aspnetcore_position %})&mdash;Control the component position through the available positioning options.
* [Events]({% slug events_app_bar %})&mdash;Subscribe to the AppBar `Resize` event and implement the desired custom logic.

## Next Steps

* [Getting Started with the AppBar]({% slug app_bar_getting_started %})
* [Basic Usage of the AppBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/appbar)
{% if site.core %}
* [Basic Usage of the AppBar TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/appbar/tag-helper)
{% endif %}

## See Also

* [Knowledge Base Section](/knowledge-base)
