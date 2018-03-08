---
title: Menu
page_title: Menu  | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Menu tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_menu_aspnetcore
---

# Menu Tag Helper Overview

The Menu tag helper helps you configure the Kendo UI Menu widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the Menu by using the Menu tag helper.

###### Example

		<kendo-menu name="menu">
		</kendo-menu>

## Configuration

### Menu

The Menu items collection is passed through the nest `<items>` tag. Or you can also add `<li>` tags, which will not include the `menu-item` tag helper attributes to configure.

###### Example

```tab-tagHelper
<kendo-menu name="menu">
    <items>
        <menu-item text="Home"></menu-item>
        <menu-item text="Second Page"></menu-item>
    </items>
</kendo-menu>
```
```tab-tagHelper
<kendo-menu name="menu">
    <li>Home</li>
    <li>Second Page</li>
</kendo-menu>
```
```tab-cshtml
@(Html.Kendo().Menu()
		.Name("menu")
		.Items(items => {
				items.Add().Text("Home");
				items.Add().Text("Second Page");
		})
)
```

Other configurable options for the Menu tag helper are: `<open-on-click>`, `<popup-animation>` and `<scrollable>`.

###### Example

```tab-tagHelper
<kendo-menu name="menu">
    <items>
        <menu-item text="Home"></menu-item>
        <menu-item text="Second Page"></menu-item>
    </items>
    <open-on-click enabled="true" root-menu-items="true" sub-menu-items="false" />
    <popup-animation>
        <open duration="500" />
        <close duration="300" />
    </popup-animation>
    <scrollable enabled="false" />
</kendo-menu>
```
```tab-cshtml
@(Html.Kendo().Menu()
    .Name("menu")
    .Items(items => {
        items.Add().Text("Home");
        items.Add().Text("Second Page");
    })
    .OpenOnClick(open => open.RootMenuItems(true).SubMenuItems(false))
    .Animation(animation =>
        animation.Open(open => open.Duration(500))
                 .Close(close => close.Duration(300))
    )
    .Scrollable(true)
)
```

### Menu Items

The Menu items are represented by the `menu-item` tag helper and render `<li>` tags inside the Menu root element. The `<menu-item>` utilizes different inner tags and attributes to let you configure the Menu items.

The `menu-item` tag helper inherits the [AnchorTagHelper class](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/tag-helpers/built-in/anchor-tag-helper) and thus you can utilize the native navigation attributes that comes with it.

###### Example

```tab-tagHelper
<kendo-menu name="menu">
    <items>
        <menu-item text="Home" asp-action="Index" asp-controller="Home"></menu-item>
        <menu-item text="Second Page" asp-action="SecondIndex" asp-controller="Home"></menu-item>
    </items>
</kendo-menu>
```
```tab-cshtml
@(Html.Kendo().Menu()
    .Name("menu")
    .Items(items => {
        items.Add().Text("Home").Action("Index", "Home");
        items.Add().Text("Second Page").Action("SecondIndex", "Home");
    })
)
```

You can also directly setup an URL that navigates to the desired location:

###### Example

```tab-tagHelper
<kendo-menu name="menu">
    <items>
        <menu-item text="Home" url="/home/index"></menu-item>
    </items>
</kendo-menu>
```

To create popup menus you can configure the items by using the `<sub-items>` tag of the `menu-item`.

###### Example

```tab-tagHelper
<kendo-menu name="menu">
    <items>
        <menu-item text="Navigate">
            <sub-items>
                <menu-item text="Home"></menu-item>
                <menu-item text="About"></menu-item>
                <menu-item text="Contact"></menu-item>
            </sub-items>
        </menu-item>
    </items>
</kendo-menu>
```
```tab-cshtml
@(Html.Kendo().Menu()
        .Name("menu")
        .Items(items =>
        {
            items.Add().Text("Navigate").Items(subitems => {
                subitems.Add().Text("Home");
                subitems.Add().Text("About");
                subitems.Add().Text("Contact");
            });
        })
)
```

Just like the Kendo Menu helper method, you can customize the menu items by adding images, [icons](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web), custom CSS classes and DOM attributes.

###### Example

```tab-tagHelper
<kendo-menu name="menu">
    <items>
        <menu-item text="Home" my-attr="value" link-html-attributes='new { link_attr="value" }'></menu-item>
        <menu-item text="About" image-url="path/to/image.png" image-html-attributes='new { img_attr="value" }'></menu-item>
        <menu-item text="Contact" icon-class="k-sprite my-sprite-class"></menu-item>
        <menu-item text="Login" icon="login" ></menu-item>
    </items>
</kendo-menu>
```
```tab-cshtml
@(Html.Kendo().Menu()
		.Name("menu")
		.Items(items =>
		{
				items.Add().Text("Home")
						.LinkHtmlAttributes(new { link_attr = "value" })
						.HtmlAttributes(new { my_attr="value" });

				items.Add().Text("About")
						.ImageUrl("path/to/image.png")
						.ImageHtmlAttributes(new { img_attr = "value" });

				items.Add().Text("Contact")
						.SpriteCssClasses("my-sprite-class");

				// The Kendo Menu helper method does not support icons yet.
		})
)
```

The popup of each menu item can be also defined with HTML syntax. For that you can use the `<content>` tag helper.

###### Example

```tab-tagHelper
<kendo-menu name="menu">
    <items>
        <menu-item text="Locations">
            <content class="locations-menu-content" content-attr="value">
                <div id="template" style="padding: 10px;">
                    <h2>Around the Globe</h2>
                    <ol>
                        <li>United States</li>
                        <li>Europe</li>
                        <li>Canada</li>
                        <li>Australia</li>
                    </ol>
                    <img src='@Url.Content("~/shared/web/menu/map.png")' alt="Stores Around the Globe" />
                    <button class="k-button">See full list</button>
                </div>
            </content>
        </menu-item>
    </items>
</kendo-menu>
```
```tab-cshtml
@(Html.Kendo().Menu()
    .Name("menu")
    .Items(items =>
    {
			items.Add().Text("Locations")
					.ContentHtmlAttributes(new { @class= "locations-menu-content", content_attr = "value" })
					.Content(@<text>
								<div id="template" style="padding: 10px;">
										<h2>Around the Globe</h2>
										<ol>
												<li>United States</li>
												<li>Europe</li>
												<li>Canada</li>
												<li>Australia</li>
										</ol>
										<img src='@Url.Content("~/shared/web/menu/map.png")' alt="Stores Around the Globe" />
										<button class="k-button">See full list</button>
								</div>
						</text>);
			})
)
```


## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
