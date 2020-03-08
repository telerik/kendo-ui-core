---
title: Remove Extra Whitespace on Enter
description: An example on how to remove extra whitespace around the text in the Kendo UI Editor when the user presses Enter.
type: how-to
page_title: Prevent the Appearance of Extra Whitespace on Enter | Kendo UI Editor for ASP.NET MVC
slug: editor-remove-extra-whitespace-on-enter
ticketid: 1381664
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® Editor for ASP.NET MVC</td>
	</tr>
</table>


## Problem

When the Editor is opened in the browser I press the `Enter` key, an extra blank row appears before the next sentence. To remove the extra blank row, I have to press `Shift`+`Enter` to get a new row right after the previous row.

How can I change the default behavior and prevent the appearance of the extra blank row on `Enter`?

## Solution

On `Enter`, the Editor inserts a paragraph and paragraphs have a default margin set by the browsers. Therefore, to remove the extra row, [add a stylesheet to the content area of the Editor](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor/configuration/stylesheets).

You can also set a similar paragraph rule to the whole content to provide a what-you-see-is-what-you-get styling.

```MVC
@(Html.Kendo().Editor()
                .Name("messageEditor")
                .StyleSheets(s => s.Add(@Url.Content("~/Content/removeParaMargin.css")))
)
```

```CSS
p {
    margin: 0;
}
```
