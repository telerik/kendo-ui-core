---
title: Icons
page_title: SegmentedControl Icons
description: "Learn how to configure icons and text for buttons in the Telerik UI SegmentedControl component for {{ site.framework }}."
components: ["segmentedcontrol"]
slug: htmlhelpers_segmentedcontrol_icons
position: 4
---

# Icons

Each segment button in the SegmentedControl can display a text label, an icon, or both. Use the `Icon()`, `IconClass()`, and `Text()` item options to customize the appearance of individual buttons.

## Text Labels

Set the `Text()` option on each item to display a visible label inside the segment button.

```HtmlHelper
@using Kendo.Mvc.UI

@(Html.Kendo().SegmentedControl()
    .Name("segmentedControl")
    .Items(items =>
    {
        items.Add().Text("Option 1").Value("option1");
        items.Add().Text("Option 2").Value("option2");
        items.Add().Text("Option 3").Value("option3");
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-segmentedcontrol name="segmentedControl">
    <items>
        <item text="Option 1" value="option1"></item>
        <item text="Option 2" value="option2"></item>
        <item text="Option 3" value="option3"></item>
    </items>
</kendo-segmentedcontrol>
```
{% endif %}

## Icons from the Kendo UI Theme

Use the `Icon()` option to display an icon from the built-in Kendo UI icon set inside a segment button. When no `Text()` is set, the item's `Value()` is used as the button's accessible label.

```HtmlHelper
@using Kendo.Mvc.UI

@(Html.Kendo().SegmentedControl()
    .Name("segmentedControl")
    .Items(items =>
    {
        items.Add().Icon("bold").Value("bold");
        items.Add().Icon("italic").Value("italic");
        items.Add().Icon("underline").Value("underline");
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-segmentedcontrol name="segmentedControl">
    <items>
        <item icon="bold" value="bold"></item>
        <item icon="italic" value="italic"></item>
        <item icon="underline" value="underline"></item>
    </items>
</kendo-segmentedcontrol>
```
{% endif %}

## Icons with Text

Combine `Icon()` and `Text()` to display both inside the same segment button.

```HtmlHelper
@using Kendo.Mvc.UI

@(Html.Kendo().SegmentedControl()
    .Name("segmentedControl")
    .Items(items =>
    {
        items.Add().Text("Settings").Icon("gear").Value("settings");
        items.Add().Text("Home").Icon("home").Value("home");
        items.Add().Text("Profile").Icon("user").Value("profile");
    })
    .SelectedValue("home")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-segmentedcontrol name="segmentedControl" selected-value="home">
    <items>
        <item text="Settings" icon="gear" value="settings"></item>
        <item text="Home" icon="home" value="home"></item>
        <item text="Profile" icon="user" value="profile"></item>
    </items>
</kendo-segmentedcontrol>
```
{% endif %}

## Custom Icon Classes

Use `IconClass()` to append one or more CSS class names to the icon element. This allows you to apply custom styles or integrate icons from external icon libraries.

```HtmlHelper
@using Kendo.Mvc.UI

@(Html.Kendo().SegmentedControl()
    .Name("segmentedControl")
    .Items(items =>
    {
        items.Add().Text("Settings").Icon("gear").IconClass("custom-icon").Value("settings");
        items.Add().Text("Home").Icon("home").Value("home");
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-segmentedcontrol name="segmentedControl">
    <items>
        <item text="Settings" icon="gear" icon-class="custom-icon" value="settings"></item>
        <item text="Home" icon="home" value="home"></item>
    </items>
</kendo-segmentedcontrol>
```
{% endif %}

## See Also

* [SegmentedControl Overview (Demo)](https://demos.telerik.com/{{ site.platform }}/segmentedcontrol/index)
* [SegmentedControl Server-Side API for {{ site.framework }}](/api/segmentedcontrol)
* [SegmentedControl Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/segmentedcontrol)
