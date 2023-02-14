---
title: Persist Selected Tab in the TabStrip
description: How can I persist the selected tab in the TabStrip when the user refreshes the page or navigates to another page?
type: how-to
page_title: Persist selected tab in TabStrip
slug: tabstrip-persist-selected-tab
tags: tabstrip, persist, selected, tab
res_type: kb
ticketid: 1582045
component: tabstrip
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® {{ site.product_short }}</td>
 </tr>
</table>

## Description

How can I persist the selected tab in the TabStrip when the user refreshes the page or navigates to another page?

## Solution

1. Handle the [`Select`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/TabStripEventBuilder#selectsystemfunc) event of the TabStrip and get the name of the selected tab. Send it through an `AJAX` request to the server and store it.

	```View
		@{
			var selectedTab = ViewData["tabinfo"];
		}

	    @(Html.Kendo().TabStrip()
          .Name("tabstrip")
          .Events(ev => ev.Select("onSelect"))
		  // Other configuration
    	)

		<script>
			function onSelect(e) {
				if (e.item) {
					$.ajax({
						type: "POST",
						url: "@Url.Action("SaveTabName","Home")",
						data: { name: e.item.innerText },
						success: function(result) {
							if(result) {
								console.log("Successfully saved tab!");
							}
						},
						error: function(err) {
							console.log("Tab is not saved.");
						}
					});
				}
			}
		</script>
	```
	```Controller
		public class HomeController : Controller
		{
			public static string SelectedTabInfo;

			public IActionResult Index()
			{
				if (SelectedTabInfo == null)
				{
					ViewData["tabinfo"] = "";
					SelectedTabInfo = "";
				}
				else
				{
					ViewData["tabinfo"] = SelectedTabInfo;
				}
				return View();
			}

			public IActionResult SaveTabName(string name)
			{
				ViewData["tabinfo"] = name;
				SelectedTabInfo = name;
				return new JsonResult(true);
			}
		}
	```

1. When the document is ready, get the name of the selected tab through the `ViewData["tabinfo"]` and activate the respective tab.

	```View
		<script>
			$(document).ready(function () {
				var savedTab = '@Html.Raw(selectedTab)';
				if(savedTab != "") {
					var tabStrip = $("#tabstrip").data("kendoTabStrip");
					var tabEelement = $("li:contains('" + savedTab + "')");
					tabStrip.activateTab(tabEelement); // Activate the latest selected tab.
				}
			});
		</script>
	```

## See Also
 * [TabStrip Overview](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/tabstrip/overview)
 * [TabStrip Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip)