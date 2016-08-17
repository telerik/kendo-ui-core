---
title: Overview
page_title: Overview | Kendo UI ProgressBar HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI ProgressBar widget for ASP.NET MVC."
slug: overview_progressbarhelper_aspnetmvc
position: 1
---

# ProgressBar HtmlHelper Overview

The ProgressBar HtmlHelper extension is a server-side wrapper for the [Kendo UI ProgressBar](https://demos.telerik.com/kendo-ui/progressbar/index) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ProgressBar.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which renders the view.

###### Example

			public ActionResult Index()
	         {
	           return View();
	         }

**Step 3** Add a ProgressBar.

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

You can subscribe to all ProgressBar [events](/api/javascript/ui/progressbar#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

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

The example below demonstrates how to subscribe to events by a template delegate.

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

You can reference an existing Kendo UI ProgressBar instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [ProgressBar API](/api/javascript/ui/progressbar#methods) to control its behavior.

###### Example

		//Put this after your Kendo ProgressBar for ASP.NET MVC declaration.
	    <script>
	    $(function() {
	      //Notice that the Name() of the ProgressBar is used to get its client-side instance.
	      var progressbar = $("#progressBar").data("kendoProgressBar");
	    });
	    </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the ProgressBar:

* [ASP.NET MVC API Reference: ProgressBarBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ProgressBarBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI ProgressBar Widget]({% slug overview_kendoui_progressbar_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
