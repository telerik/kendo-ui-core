---
title: Adding a Loading Animation to Telerik UI for ASP.NET Core Chart
description: Learn how to add a loading animation to the Telerik UI for ASP.NET Core Chart when the data takes time to load.
type: how-to
page_title: Displaying Loading Animation in Telerik UI for ASP.NET Core Chart
meta_title: Displaying Loading Animation in Telerik UI for ASP.NET Core Chart
slug: telerik-ui-core-chart-loading-animation
tags: chart,asp.net core,loading animation,datasource,loading mask
res_type: kb
ticketid: 1719392
---

## Environment
<table>
<tbody>
<tr>
<td>Product</td>
<td>Telerik UI for ASP.NET Core Chart</td>
</tr>
<tr>
<td>Version</td>
<td>2026.4.1111</td>
</tr>
</tbody>
</table>

## Description

When using the [Telerik UI for ASP.NET Core Chart](https://www.telerik.com/aspnet-core-ui/documentation/html-helpers/charts/overview), the Chart does not show a built-in loading animation while the data is being fetched or processed from the server. This behavior is noticeable when there is a delay in the data retrieval process, such as a long-running query on the server. This issue can be addressed by implementing custom loading animations.

This knowledge base article also answers the following questions:
- How to create a custom loading animation for Telerik UI for ASP.NET Core Chart?
- Why does the Telerik UI for ASP.NET Core Chart not show a loading spinner on the first data fetch?
- How to synchronize loading indicators with the Telerik UI for ASP.NET Core Chart dataSource events?

## Solution

To add a loading animation for the Telerik UI for ASP.NET Core Chart, make the following changes:

1. **Raise the loading mask above the chart's "No data available" overlay.**  
   The empty chart displays a "No data available" overlay with a `z-index` of `10000`, which can obscure the loading mask. Adjust the loading mask's `z-index` to ensure visibility:
   ```css
   #chartWrapper > .k-loading-mask {
       z-index: 10001;
   }
   ```

2. **Hide the spinner when the data request finishes or fails.**  
   Add `RequestEnd` and `Error` events to the Chart's `DataSource` to stop the spinner appropriately:
   ```csharp
   .DataSource(ds => ds
       .Read(read => read.Action("GetSpainElectricityProduction", "Home"))
       .Events(events => events
           .RequestEnd("onChartRequestEnd")
           .Error("onChartRequestEnd")
       )
   )
   ```

3. **Update the Switch handler to prevent redundant loading.**  
   Ensure the spinner appears only when the Switch is turned ON and no other data fetch is in progress. Use the following JavaScript code:
   ```javascript
   var chartLoading = false;

   function onSwitchChange(e) {
       if (!e.checked || chartLoading) {
           return;
       }

       chartLoading = true;
       kendo.ui.progress($("#chartWrapper"), true);
       $("#chart").data("kendoChart").dataSource.read();
   }

   function onChartRequestEnd(e) {
       chartLoading = false;
       kendo.ui.progress($("#chartWrapper"), false);
   }
   ```

4. **Remove handling of the Render event.**  
   The `Render` event does not align with the end of the data request, making it unreliable for stopping the spinner.

Implement these changes in your application to display a loading animation when the Chart fetches data from the server.

## See Also

- [Telerik UI for ASP.NET Core Chart Documentation](https://www.telerik.com/aspnet-core-ui/documentation/html-helpers/charts/overview)
- [DataSource Configuration Documentation](https://www.telerik.com/aspnet-core-ui/documentation/html-helpers/datasource/overview)
- [Handling Telerik UI DataSource Events](https://www.telerik.com/aspnet-core-ui/documentation/html-helpers/datasource/events)
