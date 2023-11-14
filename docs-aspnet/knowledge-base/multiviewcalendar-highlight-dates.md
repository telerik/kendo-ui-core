---
title: Highlighting Dates in the MultiViewCalendar
description: How can I highlight specific dates in the MultiViewCalendar? Find the solution in the Knowledge Base section of the {{ site.product }} documentation.
type: how-to
page_title: Highlighting Dates in the MultiViewCalendar
slug: multiviewcalendar-highlight-dates
tags: aspnet, mvc, core, dotnet-core, kendo, kendo-ui, multiviewcalendar, date, dates, highlight
res_type: kb
component: multiviewcalendar
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} MultiViewCalendar</td>
 </tr>
</table>

## Description

How can I highlight some of the dates in the {{ site.product }} MultiViewCalendar?

## Solution

You can use the following approach:
1. Pass a template to the `MonthTemplateId` option of the MultiViewCalendar.
2. The dates that will be highlighted are specified in the `Dates` configuration option of the MultiViewCalendar. This way they will be accessible in the template through `data.dates`.
3. The template is evaluated for each day, so this allows checking whether the day matches any of the dates in the `Dates` configuration. If a match is found, the day is wrapped in a div with class `custom-day`.
4. Add custom CSS to customize the appearance of the days that have the `custom-day` class.

```View
<script id="monthTemplate" type="text/x-kendo-template">
	# var match = false;#
	
	# for (var i = 0; i < dates.length; i++) { #
		#if(data.date.getTime() == dates[i].getTime()){#
			# match = true; #
			# break; #
		#}#
	# } #

	<div class="#=match == true ? 'custom-day' : ''#">#=data.value #</div>
</script>

@(Html.Kendo().MultiViewCalendar()
	.Name("MultiViewCalendar")
	.Views(12)
	.ShowViewHeader()
	.Start(CalendarView.Month)
	.Depth(CalendarView.Month)
	.Selectable("single")
	.Depth(CalendarView.Month)
	.Footer(false)
	.Value(DateTime.Now)
	.Min(new DateTime(2021, 1, 1))
	.Max(new DateTime(2021, 12, 31))
	.Dates(new List<DateTime>()
	{
		new DateTime(2021, 2, 10),
		new DateTime(2021, 2, 17),
		new DateTime(2021, 2, 24),
		new DateTime(2021, 3, 3),
		new DateTime(2021, 3, 10),
		new DateTime(2021, 3, 17),
		new DateTime(2021, 3, 24),
		new DateTime(2021, 3, 31)
		//...additional dates...
	})
	.MonthTemplateId("monthTemplate")
)

<style>
	.custom-day {
		background-color: sandybrown;
		width: 38.84px;
		height: 38.84px;
		border-radius: 4px;
		margin-top: -8px;
		margin-left: -8px;
		text-align: inherit;
		vertical-align: middle;
		padding-top: 8px;
	}

	.k-calendar-range .k-month td.k-selected .custom-day {
		background-color: transparent;
	}
</style>
```

## More {{ site.framework }} MultiViewCalendar Resources

* [{{ site.framework }} MultiViewCalendar Documentation]({%slug overview_multiviewcalendar_htmlhelper_aspnetcore%})

* [{{ site.framework }} MultiViewCalendar Demos](https://demos.telerik.com/{{ site.platform }}/multiviewcalendar)

{% if site.core %}
* [{{ site.framework }} MultiViewCalendar Product Page](https://www.telerik.com/aspnet-core-ui/core-multiviewcalendar)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} MultiViewCalendar Product Page](https://www.telerik.com/aspnet-mvc/mvc-multiviewcalendar)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the MultiViewCalendar for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiviewcalendar)
* [Server-Side API Reference of the MultiViewCalendar for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/multiviewcalendar)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
