---
title: Overview
page_title: Overview | Kendo UI ProgressBar HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI ProgressBar widget for ASP.NET MVC."
slug: overview_progressbarhelper_aspnetmvc
position: 1
---

# ProgressBar HtmlHelper Overview

The ProgressBar HtmlHelper extension is a server-side wrapper for the [Kendo UI ProgressBar](https://demos.telerik.com/kendo-ui/progressbar/index) widget.

## Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ProgressBar.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method which renders the view.

	###### Example

				public ActionResult Index()
		         {
		           return View();
		         }

1. Add a ProgressBar.

	###### Example

	```tab-ASPX

				<%= Html.Kendo().ProgressBar()
	                    .Name("progressBar") // The name of the ProgressBar is mandatory. It specifies the "id" attribute of the widget.
	                    .Type(ProgressBarType.Percent)
	            %>
	```
	```tab-Razor

				@(Html.Kendo().ProgressBar()
	                  .Name("progressBar") // The name of the ProgressBar is mandatory. It specifies the "id" attribute of the widget.
	                  .Type(ProgressBarType.Percent)
	            )
	```

## Event Handling

You can subscribe to all ProgressBar [events](../../../kendo-ui/api/javascript/ui/progressbar#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

			<%= Html.Kendo().ProgressBar()
		            .Name("progressBar")
		            .Events(e => {
		                  e.Change("onChange");
		                  e.Complete("onComplete");
		            })
		    %>
			<script>
		        function onChange(e) {
		            //Handle the change event.
		        }

		        function onComplete(e) {
		            //Handle the complete event.
		        }
		    </script>
```
```tab-Razor

			@(Html.Kendo().ProgressBar()
		            .Name("progressBar")
		            .Events(e => {
		                  e.Change("onChange");
		                  e.Complete("onComplete");
		            })
		    )
			<script>
		        function onChange(e) {
							//Handle the change event.
		        }

		        function onComplete(e) {
		            //Handle the complete event.
		        }
		    </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

			@(Html.Kendo().ProgressBar()
		          .Name("progressBar")
		          .Events(e => e.Change(@<text>
		                  function() {
		                      //Handle the change event.
		                  }
		              </text>)
				  )
		    )
```

## Reference

### Existing Instances

To reference an existing Kendo UI ProgressBar instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ProgressBar API](../../../kendo-ui/api/javascript/ui/progressbar#methods) to control its behavior.

###### Example

		//Put this after your Kendo ProgressBar for ASP.NET MVC declaration.
	    <script>
	    $(function() {
	      //Notice that the Name() of the ProgressBar is used to get its client-side instance.
	      var progressbar = $("#progressBar").data("kendoProgressBar");
	    });
	    </script>

## See Also

* [ASP.NET MVC API Reference: ProgressBarBuilder](/api/Kendo.Mvc.UI.Fluent/ProgressBarBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI ProgressBar Widget](http://docs.telerik.com/kendo-ui/controls/interactivity/progressbar/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
