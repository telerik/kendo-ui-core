---
title: Overview
page_title: TabStrip | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI TabStrip tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_tabstrip_aspnetcore
previous_url: /aspnet-core/helpers/tag-helpers/tabstrip
position: 1
---

# TabStrip Tag Helper Overview

The TabStrip tag helper helps you configure the Kendo UI TabStrip widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the TabStrip by using the TabStrip tag helper.

###### Example

		<kendo-tabstrip name="tabstrip">
		</kendo-tabstrip>

## Configuration

### TabStrip

To pass the TabStrip items collection, either:

* Use the nested `<items>` tag, or
* Add `<li>` tags. This approach will not include the `tabstrip-item` tag helper attributes. And you will need to also include `<div>` tags for the content of the tabs.

```tagHelper
<kendo-tabstrip name="tabstrip">
    <items>
        <tabstrip-item text="Tab 1">
            <content><p>Content 1</p></content>
        </tabstrip-item>
        <tabstrip-item text="Tab 2">
            <content><p>Content 2</p></content>
        </tabstrip-item>
    </items>
</kendo-tabstrip>
```
```tagHelper=li
<kendo-tabstrip name="tabstrip">
    <li>Tab 1</li>
    <li>Tab 2</li>
    <div>
        <p>Content 1</p>
    </div>
    <div>
        <p>Content 2</p>
    </div>
</kendo-tabstrip>
```
```cshtml
@(Html.Kendo().TabStrip()
		.Name("tabstrip")
		.Items(items => {
				items.Add().Text("Tab 1").Content(@<text>
                    <p>Content 1</p>
                </text>);
				items.Add().Text("Tab 2").Content(@<text>
                    <p>Content 2</p>
                </text>);
		})
)
```

To further configure the TabStrip tag helper, use its other options&mdash;`<popup-animation>`, and `<scrollable>`.

```tagHelper
<kendo-tabstrip name="tabstrip">
    <items>
        <tabstrip-item text="Tab 1">
            <content><p>Content 1</p></content>
        </tabstrip-item>
        <tabstrip-item text="Tab 2">
            <content><p>Content 2</p></content>
        </tabstrip-item>
    </items>
    <popup-animation>
        <open duration="500" />
        <close duration="300" />
    </popup-animation>
    <scrollable enabled="false" />
</kendo-tabstrip>
```
```cshtml
@(Html.Kendo().TabStrip()
    .Name("tabstrip")
    .Items(items => {
        items.Add().Text("Tab 1").Content(@<text>
            <p>Content 1</p>
        </text>);
        items.Add().Text("Tab 2").Content(@<text>
            <p>Content 2</p>
        </text>);
    })
    .Animation(animation =>
        animation.Open(open => open.Duration(500))
                 .Close(close => close.Duration(300))
    )
    .Scrollable(true)
)
```

### TabStrip Items

The TabStrip items are represented by the `tabstrip-item` tag helper and render `<li>` tags inside the TabStrip root element. The `<tabstrip-item>` utilizes various inner tags and attributes to let you configure the TabStrip items.

The `tabstrip-item` tag helper inherits the [`AnchorTagHelper`](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/tag-helpers/built-in/anchor-tag-helper) class which enables you to utilize the native attributes that come with it and thus configure a URL to action or Razor page to load the content from.

```tagHelper
<kendo-tabstrip name="tabstrip">
    <items>
        <tabstrip-item text="Tab 1" asp-action="Content" asp-controller="Home"></tabstrip-item>
        <tabstrip-item text="Tab 2" asp-action="ContentTwo" asp-controller="Home"></tabstrip-item>
    </items>
</kendo-tabstrip>
```
```cshtml
@(Html.Kendo().TabStrip()
    .Name("tabstrip")
    .Items(items => {
        items.Add().Text("Tab 1").LoadContentFrom("Content", "Home");
        items.Add().Text("Tab 2").LoadContentFrom("ContentTwo", "Home");
    })
)
```

You can also directly set up a URL that loads content from the desired location.

###### Example

```
<kendo-tabstrip name="tabstrip">
    <items>
        <tabstrip-item text="Tab" content-url="/home/content"></tabstrip-item>
    </items>
</kendo-tabstrip>
```

Identical to the Kendo UI TabStrip helper method, you can customize the TabStrip items by adding images, [icons](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web), custom CSS classes, and DOM attributes.

```tagHelper
<kendo-tabstrip name="tabstrip">
    <items>
        <tabstrip-item text="Tab 1" my-attr="value" link-html-attributes='new { link_attr="value" }'></tabstrip-item>
        <tabstrip-item text="Tab 2" image-url="path/to/image.png" image-html-attributes='new { img_attr="value" }'></tabstrip-item>
        <tabstrip-item text="Tab 3" icon-class="k-sprite my-sprite-class"></tabstrip-item>
        <tabstrip-item text="Tab 4" icon="login" ></tabstrip-item>
    </items>
</kendo-tabstrip>
```
```cshtml
@(Html.Kendo().TabStrip()
		.Name("tabstrip")
		.Items(items =>
		{
				items.Add().Text("Tab 1")
						.LinkHtmlAttributes(new { link_attr = "value" })
						.HtmlAttributes(new { my_attr="value" });

				items.Add().Text("Tab 2")
						.ImageUrl("path/to/image.png")
						.ImageHtmlAttributes(new { img_attr = "value" });

				items.Add().Text("Tab 3")
						.SpriteCssClasses("my-sprite-class");

				// The Kendo TabStrip helper method does not support icons yet.
		})
)
```

You can also define the content of each item by using the `<content>` tag helper.

```tagHelper
<kendo-tabstrip name="tabstrip">
    <items>
        <tabstrip-item text="Paris">
            <content class="my-class" content-attr="value">
                <div class="weather">
                    <h2>17<span>&ordm;C</span></h2>
                    <p>Rainy weather in Paris.</p>
                </div>
                <span class="rainy">&nbsp;</span>
            </content>
        </tabstrip-item>
    </items>
</kendo-tabstrip>
```
```cshtml
@(Html.Kendo().TabStrip()
    .Name("tabstrip")
    .Items(items =>
    {
        items.Add().Text("Locations")
            .ContentHtmlAttributes(new { @class= "my-class", content_attr = "value" })
            .Content(@<text>
                <div class="weather">
                    <h2>17<span>&ordm;C</span></h2>
                    <p>Rainy weather in Paris.</p>
                </div>
                <span class="rainy">&nbsp;</span>
            </text>);
        })
)
```


## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
