---
title: Calendar
page_title: Calendar | Migrate from Telerik Extensions
description: "Handle ASP.NET MVC server-side API for the Kendo UI Calendar widget."
slug: calendar_migrationextensions_aspnetmvc
---

## Calendar Migration

This article demonstrates the ASP.NET MVC server-side API for the Kendo UI Calendar widget.

## Server-Side API

<table width="100%">
  <col width="50%">
  <col width="50%">
    <tr>
      <th>Options</th>
      <th>Previous</th>
      <th>New</th>
    </tr>

    <tr>
      <td><strong>Events</strong></td>
      <td><code>Html.Telerik().Calendar().Name("Calendar").ClientEvents( events => events.OnChange(“change”))</code></td>
      <td><code>Html.Kendo().Calendar().Name("Calendar").Events( events => events.Change(“change”))</code></td>
    </tr>

    <tr>
      <td><strong>Min Date</strong></td>
      <td><code>Html.Telerik().Calendar().Name("Calendar").MinDate(DateTime.Now)</code></td>
      <td><code>Html.Telerik().Calendar().Name("Calendar").MaxDate(DateTime.Now)</code></td>
    </tr>

    <tr>
      <td><strong>Max Date</strong></td>
      <td><code>Html.Kendo().Calendar().Name("Calendar").Min(DateTime.Now)</code></td>
      <td><code>Html.Kendo().Calendar().Name("Calendar").Max(DateTime.Now)</code></td>
    </tr>

    <tr>
      <td><strong>Footer</strong></td>
      <td><code>Html.Telerik().Calendar().Name("Calendar").TodayButton(“d”)</code></td>
      <td><code>Html.Kendo().Calendar().Name("Calendar").Footer(“#= kendo.toString(data, ‘MM/dd/yyyy’)”)</code></td>
    </tr>

</table>

## See Also

Other articles on migrating from Telerik Extensions:

* [Migrate the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrate the Chart]({% slug chart_migrationextensions_aspnetmvc %})

To see the articles on migrating kendo UI controls from Telerik Extensions, browse [this section]({% slug combobox_migrationextensions_aspnetmvc %}).
