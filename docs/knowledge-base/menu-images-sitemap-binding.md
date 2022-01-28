---
title: Display Images in Menu Items When Using Sitemap Binding
description: An example on how to display images in the items when the Knedo UI Menu is bound by using a sitemap binding.
type: how-to
page_title: Show Images in Items When Using Sitemap Binding | Kendo UI Menu for ASP.NET MVC
slug: menu-images-sitemap-binding
tags: menu, show, display, images, items, sitemap, binding, xml
ticketid: 1143354
res_type: kb
component: menu
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Menu for ASP.NET MVC</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>C#</td>
 </tr>
</table>

## Description

How can I display images, which are set to different URLs, for the items in the `.xml` file to which I am binding the Menu?

## Solution

1. Store the image URL as an attribute value in the `.xml` file where the `image` attribute is used for that purpose.

```dojo
	<siteMapNode controller="menu" action="sitemapbinding" title="Baseball" image="/Content/shared/icons/sports/baseball.png" />
```

1. Access the attribute in the binding configuration of the Menu and set its value as an `ImageUrl` value.

```dojo
	@(Html.Kendo().Menu()
		.Name("Menu")
		.BindTo("sample", (item, value) => {
			if (value.Attributes["image"] != null)
			{
				item.ImageUrl = value.Attributes["image"].ToString();
			}
		})
	)
```
