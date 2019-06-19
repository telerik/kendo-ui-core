---
title: Menu Font Icon
description: How to add font icons in a Kendo Menu item
type: how-to
page_title: Font Icon in Kendo Menu
slug: menu-font-icon-in-item
position: 
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
The Kendo menu provides built-in support for raster images and sprites in its items, but you may want to add font icons as well.

How to add font icons in a Kendo Menu item?

## Solution
The easiest solution is to add your own HTML inside the menu items that supports font icons, for example, the [Kendo Font Icons](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web).

Below follow examples for the MVC HTML helpers and for a plain jQuery widget.

For MVC - set `.Encode(false)` for the item so its HTML is parsed, and escape quotation marks:

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

With a plain jQuery widget, you only need to add the HTML to the markup you instantiate the widget from

```dojo
<ul id="menu">
    <li>
        Products - Expand me
        <ul>
            <li>
                Furniture
            </li>
          
          <!-- if you instantiate the menu from HTML, you can put your own
                content in it, and there you can easily use font icons
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

