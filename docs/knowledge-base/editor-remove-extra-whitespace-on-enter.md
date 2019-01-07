---
title: Prevent extra whitespace on enter
description: When you press enter some extra space appears around the text. How to remove it.
type: troubleshooting
page_title: Prevent extra whitespace on enter
slug: editor-remove-extra-whitespace-on-enter
position: 
tags: 
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

When I'm using the editor in the browser and hit the enter button, it create an extra blank row before the next sentence.  To prevent the extra blank row, I have to hit SHIFT+ENTER to get new row right after previous row.  How can I change the default behaviour to not include an extra blank row on Enter button click?

## Solution

The editor inserts a paragraph when enter is pressed, and paragraphs have default margin set by the browsers. Thus, you can remove it by [adding a stylesheet to the editor content area](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor/configuration/stylesheets) that will remove it. Something like this:

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

The place where the content will be used may also benefit from having a similar paragraph rule to provide WYSIWYG styling.