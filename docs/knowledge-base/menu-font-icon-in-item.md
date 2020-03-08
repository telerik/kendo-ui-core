---
title: Add Font Icons to Menu Items
description: An example on how to add font icons to a Kendo UI Menu item.
type: how-to
page_title: Add Font Icons to Menu Items | Kendo UI Menu
slug: menu-font-icon-in-item
tags: font,icon,menu
ticketid: 1413471
res_type: kb
---

## Environment

<table>
    <tbody>
	    <tr>
	    	<td>Product</td>
	    	<td>Menu for ASP.NET Core, Menu for ASP.NET MVC, Menu for jQuery</td>
	    </tr>
    </tbody>
</table>


## Description

The Kendo UI Menu provides built-in support for raster images and sprites in its items. However, how can I add font icons to a Kendo UI Menu item?

## Solution

Inside the Menu items, add your own HTML which supports font icons&mdash;for example, the [Kendo UI font icons](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web).

The following examples demonstrate the implementation of the suggested approach for the MVC HTML helpers and for a plain jQuery widget. For the MVC instance, set `.Encode(false)` for the item so that its HTML is parsed, and escape the quotation marks.

```
@(Html.Kendo().Menu()
  .Name("Menu")
  .Items(items =>
  {
	  items.Add()
			  .Text("Products - Expand me")
			  .Items(children =>
			  {
				  children.Add().Text("Furniture");

				  children.Add().Encoded(false).Text("<span class=\"k-icon k-i-clock\"></span>I have a Font Icon");

				  children.Add().Text("Decor");

			  });

	  items.Add().Text("Stores");
  })
)
```

When you work with a plain jQuery widget, you only need to add the HTML to the markup from which you instantiate the widget.

```dojo
<ul id="menu">
    <li>
        Products - Expand me
        <ul>
            <li>
                Furniture
            </li>

          <!-- If you instantiate the Menu from HTML, you can put your own
                content in it. There, you can use the font icons
                as described in the following article:
                https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web
          -->
            <li><span class="k-icon k-i-clock"></span>I have a font icon</li>


            <li>
                Decor
            </li>
        </ul>
    </li>
  <li>Some item</li>
</ul>

<script>
$(document).ready(function() {
    $("#menu").kendoMenu();
});
</script>
```
