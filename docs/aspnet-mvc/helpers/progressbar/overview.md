---
title: Overview
page_title: Help Guide for ProgressBar HtmlHelper extension | Kendo UI documentation
description: Step-by-step instructions how to configure Kendo UI ProgressBar for ASP.NET MVC widget and add ProgressBar HtmlHelper extension.
---

# ProgressBar

The ProgressBar HtmlHelper extension is a server-side wrapper for the&nbsp;[Kendo UI ProgressBar](/api/web/progressbar)&nbsp;widget.

## Getting Started

Here is how to configure a simple Kendo ProgressBar:

1. Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.
2. Create a new action method which renders the view:

		 public ActionResult Index()
         {
           return View();
         }

3. Add a progressbar:
	- Aspx
			
			<%= Html.Kendo().ProgressBar()
                    .Name("progressBar") // The name of the ProgressBar is mandatory. It specifies the "id" attribute of the widget.
                    .Type(ProgressBarType.Percent)
            %>
	
	- Razor
	
			@(Html.Kendo().ProgressBar()
                  .Name("progressBar") // The name of the ProgressBar is mandatory. It specifies the "id" attribute of the widget.
                  .Type(ProgressBarType.Percent)
            )

## Getting Client-side Reference

You can reference the client-side Kendo ProgressBar instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/progressbar#methods) to control its behavior.

### Example - accessing an Existing ProgressBar

	//Put this after your Kendo ProgressBar for ASP.NET MVC declaration
    <script>
    $(function() {
      // Notice that the Name() of the progressbar is used to get its client-side instance
      var progressbar = $("#progressBar").data("kendoProgressBar");
    });
    </script>

## Handling Events

You can subscribe to all ProgressBar [events](/api/web/progressbar#events).

### Example - subscribe to event by handler name (ASPX)

	<%= Html.Kendo().ProgressBar()
            .Name("progressBar")
            .Events(e => {
                  e.Change("onChange");
                  e.Complete("onComplete");
            })
    %>
	<script>
        function onChange(e) {
            // handle change event
        }

        function onComplete(e) {
            // handle complete event
        }
    </script>

### Example - subscribe to event by handler name (Razor)

	@(Html.Kendo().ProgressBar()
            .Name("progressBar")
            .Events(e => {
                  e.Change("onChange");
                  e.Complete("onComplete");
            })
    )
	<script>
        function onChange(e) {
            // handle change event
        }

        function onComplete(e) {
            // handle complete event
        }
    </script>

### Example - subscribe to event via Razor delegate

	@(Html.Kendo().ProgressBar()
          .Name("progressBar")
          .Events(e => e.Change(@<text>
                  function() {
                      //Handle the change event
                  }
              </text>)
		  )
    )

