---
title: Display Images in Menu Items when Using Sitemap Binding 
description: An example on how to display images in the items when the Menu is bound using sitemap binding.
type: how-to
page_title: Show Images in Items when Using Sitemap Binding | Menu for ASP.NET MVC
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
  <td>Menu for ASP.NET MVC</td>
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

I have set urls to different images for the items in the xml file I am binding the Menu to, how can I configure the Menu to display those images?

## Solution

1. The image url can stored as an attribute value in the xml file, as in the example below, in which the **image** attribute is used for that purpose.

```html
	<siteMapNode controller="menu" action="sitemapbinding" title="Baseball" image="/Content/shared/icons/sports/baseball.png" />
```

1. The attribute can be accessed in the binding configuration of the Menu and its value set as `ImageUrl` value. 

```html
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
