---
title: Incorrect Drop-Down Position with jQuery 2
description: When the page is scrolled, the position of the drop-down is incorrect and is detached from the element.
type: troubleshooting
page_title: Incorrect Drop-Down Position with Scrolled Pages | Kendo UI for jQuery
slug: dropdown-position-incorrect-with-scroll
ticketid: 1398729, 1387564
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI®, UI for ASP.NET MVC, UI for ASP.NET Core</td>
	</tr>
</table>

## Description

When the page is scrolled down, the drop-down position is incorrect&mdash;it does not consider the page scroll position and is detached from its element by roughly the scroll distance. This issue affects widgets that contain dropdowns such as the Kendo UI ComboBox, DatePicker, DropDownList, Multiselect, and so on.

**Table 1: A demonstration of the issue**

![](images/dropdown-position-problem-jquery-2.png)

## Cause

The cause of the issue is jQuery version 2 which has a positioning bug in this scenario. While it was logged initially for IE, it seems to also affect Chrome. For more information, refer to the following GitHub issues:
* [https://github.com/jquery/jquery/issues/2897](https://github.com/jquery/jquery/issues/2897)
* [https://github.com/KidSysco/jquery-ui-month-picker/issues/40](https://github.com/jquery/jquery/issues/2897)

## Solution

Upgrade to jQuery 3.3.1 where the bug is fixed.
