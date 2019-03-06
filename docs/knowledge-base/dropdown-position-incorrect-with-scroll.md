---
title: Incorrect Drop Down Position with jQuery 2
description: When the page is scrolled, the dropdown position is incorrect and is detached from the element. This is how to fix it.
type: troubleshooting
page_title: Incorrect dropdown position with scrolled page
slug: dropdown-position-incorrect-with-scroll
position: 
tags: 
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
When the page is scrolled down, the dropdown position is incorrect - it does not consider the page scroll position and is offset (detached) from its element by roughly the scroll distance.

This issue affects various widgets that have dropdowns - combo box, date picker, dropdownlist, multiselect, etc.

Example of the problem:

![](images/dropdown-position-problem-jquery-2.png)

## Cause\Possible Cause(s)
The problem stems from jQuery v2 which has a positioning bug in this scenario. While it was logged initially for IE, it seems to also affect Chrome. You can read more about it in the following GitHub issues:

* [https://github.com/jquery/jquery/issues/2897](https://github.com/jquery/jquery/issues/2897)
* [https://github.com/KidSysco/jquery-ui-month-picker/issues/40](https://github.com/jquery/jquery/issues/2897)


## Solution
The solution is to upgrade to jQuery 3.3.1 where the bug is fixed.
