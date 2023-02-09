---
title: Style the Calendar Header by Using CSS
description: Learn how to add or change the style of the Kendo UI for jQuery Calendar header based on custom preference.
type: how-to
page_title: Implement Custom Styling to the Header - Kendo UI for jQuery Calendar
slug: calendar-header-custom-style-hover
position:
tags: calender, header, style, css, custom, color, background, change, hover, styling, text, hovering, icon
ticketid: 1426434
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2019.2.619</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® Calendar for jQuery</td>
		</tr>
	</tbody>
</table>


## Description
How can I configure the style of the header in the Kendo UI Calendar? Additionally, how can I change the color of the text and the icon in the header when hovering over them?

## Solution
Here is an example of how to make custom changes in the header of the Calendar:

```css
.k-calendar > .k-header {
   border-color: #e0e0e0;
   color: #ffffff;
   background-color: #20a0ff;
}
```

To add styling to the text and the icon in the header when hovering over them, use the following CSS selector:

```css
.k-link.k-nav-fast:hover,
.k-link.k-nav-prev:hover,
.k-link.k-nav-next:hover {
   color: purple;
}
```

```dojo
<style>
  .k-calendar > .k-header {
      border-color: #e0e0e0;
      color: #ffffff;
      background-color: #20a0ff;
  }
  .k-link.k-nav-fast:hover,
  .k-link.k-nav-prev:hover,
  .k-link.k-nav-next:hover {
      color: purple;
  }
</style>

<div id="calendar"></div>

<script>
    $("#calendar").kendoCalendar();
</script>

```
