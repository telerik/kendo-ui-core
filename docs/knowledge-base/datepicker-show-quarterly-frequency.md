---
title: Show Quarterly Frequency
description: An example on how to show a quarterly frequency in the Kendo UI DatePicker.
type: how-to
page_title: Display Quarterly Frequency | Kendo UI DatePicker for jQuery
slug: datepicker-show-quarterly-frequency
tags: datepicker, quarterly, frequency
ticketid: 1153900
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2018.1 221</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>DatePicker for Progress® Kendo UI®</td>
	</tr>
</table>

## Description

How can I show a quarterly frequency (March, June, September, and December) in the Kendo UI DatePicker?

## Solution

1. Handle the [`open`](https://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker/events/open) event&mdash;in the event handler, override the `click` event of the left and right Calendar arrows.
1. Handle the [`navigate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/calendar/events/navigate) event of the Calendar&mdash;in the event handler and based on the `view`, disable the undesired months.

```dojo
<input id="datepicker" />
<script>
	$("#datepicker").kendoDatePicker({
		value: new Date(2017, 2, 1),
		open: function(e) {
			var calendar = e.sender.dateView.calendar;
			var right = calendar.element.find(".k-i-arrow-60-right");
			var left = calendar.element.find(".k-i-arrow-60-left");

			right.unbind("click");
			right.bind("click", {
				calendar: calendar
			}, onRightClick);

			left.unbind("click");
			left.bind("click", {
				calendar: calendar
			}, onLeftClick);

			calendar.unbind("navigate");
			calendar.bind("navigate", function(e) {
				var calendar = this;
				var name = calendar.view().name;
				if (name === "year") {
					disableDates(calendar)
				}
			})
		}
	});

	function onRightClick(e) {
		e.stopPropagation();
		var calendar = e.data.calendar;
		var year = calendar.current().getFullYear();
		var curr = calendar.current().getMonth();
		var next = 0;

		switch (curr) {
			case 2:
				next = 5;
				break;
			case 5:
				next = 8;
				break;
			case 8:
				next = 11;
				break;
			case 11:
				year++;
				next = 2;
				break;
			default:
				next = 2;
		}
		calendar.navigate(new Date(year, next));

	};

	function onLeftClick(e) {
		e.stopPropagation();
		var calendar = e.data.calendar;
		var year = calendar.current().getFullYear();
		var curr = calendar.current().getMonth();
		var prev = 0;

		switch (curr) {
			case 2:
				year--;
				prev = 11;
				break;
			case 5:
				prev = 2;
				break;
			case 8:
				prev = 5;
				break;
			case 11:
				prev = 8;
				break;
			default:
				prev = 2;
		}

		calendar.navigate(new Date(year, prev));
	};

	function disableDates(calendar) {
		calendar.element.find("td").not(":eq(2)").not(":eq(4)").not(":eq(6)").not(":eq(8)")
			.addClass("k-state-disabled")
			.click(function(e) {
				e.stopImmediatePropagation();
			});
	};
</script>
```
