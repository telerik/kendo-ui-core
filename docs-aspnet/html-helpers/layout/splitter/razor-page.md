---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI Splitter component for {{ site.framework }} in a Razor Page."
components: ["splitter"]
slug: htmlhelpers_splitter_razorpage_aspnetcore
position: 6
---

# Splitter in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Splitter for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Splitter component in a Razor Pages scenario.

For the complete project, refer to the [Splitter in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```HtmlHelper
    @page
    @model SplitterIndexModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <h1>SplitterIndex</h1>

    @(Html.Kendo().Splitter()
        .Name("vertical")
        .Orientation(SplitterOrientation.Vertical)
        .Panes(verticalPanes =>
        {
            verticalPanes.Add()
                .HtmlAttributes(new { id = "top-pane" })
                .Scrollable(false)
                .Collapsible(false)
                .Content(
                  Html.Kendo().Splitter()
                      .Name("horizontal")
                      .HtmlAttributes(new { style = "height: 100%;" })
                      .Panes(horizontalPanes =>
                      {
                          horizontalPanes.Add()
                              .HtmlAttributes(new { id = "left-pane" })
                              .Size("220px")
                              .Collapsible(true)
                              .Content(@<div class="pane-content">
                                          <h3>Inner splitter / left pane</h3>
                                          <p>Resizable and collapsible.</p>
                                        </div>);
    
                          horizontalPanes.Add()
                              .HtmlAttributes(new { id = "center-pane" })
                              .Content(@<div class="pane-content">
                                          <h3>Inner splitter / center pane</h3>
                                          <p>Resizable only.</p>
                                        </div>);
    
                          horizontalPanes.Add()
                              .HtmlAttributes(new { id = "right-pane" })
                              .Collapsible(true)
                              .Size("220px")
                              .Content(@<div class="pane-content">
                                          <h3>Inner splitter / right pane</h3>
                                          <p>Resizable and collapsible.</p>
                                        </div>);
                      }).ToHtmlString()
                );
    
            verticalPanes.Add()
                .Size("100px")
                .HtmlAttributes(new { id = "middle-pane" })
                .Collapsible(false)
                .Content(@<div class="pane-content">
                              <h3>Outer splitter / middle pane</h3>
                              <p>Resizable only.</p>
                          </div>);
    
            verticalPanes.Add()
                .Size("100px")
                .HtmlAttributes(new { id = "bottom-pane" })
                .Resizable(false)
                .Collapsible(false)
                .Content(@<div class="pane-content">
                              <h3>Outer splitter / bottom pane</h3>
                              <p>Non-resizable and non-collapsible.</p>
                          </div>);
        })
    )
    
    <style>
    	#vertical {
    		height: 380px;
    	}
    	#middle-pane {
    		color: #000;
    		background-color: #ccc;
    	}
    	#bottom-pane {
    		color: #000;
    		background-color: #aaa;
    	}
    	#left-pane, #center-pane, #right-pane {
    		color: #000;
    		background-color: #F5F5F5;
    	}
    	.pane-content {
    		padding: 0 10px;
    	}
    </style>
```
{% if site.core %}
```TagHelper
    @page
    @model SplitterIndexModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <h1>SplitterIndex</h1>

    <kendo-splitter name="vertical" orientation="SplitterOrientation.Vertical">
           <pane scrollable="false" collapsible="false" id="top-pane">
               <kendo-splitter name="horizontal" style="height: 100%;">
                   <pane size="220px" collapsible="true" id="left-pane">
                       <div class="pane-content">
                           <h3>Inner splitter / left pane</h3>
                           <p>Resizable and collapsible.</p>
                       </div>
                   </pane>
                   <pane id="center-pane">
                       <div class="pane-content">
                           <h3>Inner splitter / center pane</h3>
                           <p>Resizable only.</p>
                       </div>
                   </pane>
                   <pane size="220px" collapsible="true" id="right-pane">
                       <div class="pane-content">
                           <h3>Inner splitter / right pane</h3>
                           <p>Resizable and collapsible.</p>
                       </div>
                   </pane>
               </kendo-splitter>
           </pane>
           <pane size="100px" collapsible="false" id="middle-pane">
               <div class="pane-content">
                   <h3>Outer splitter / middle pane</h3>
                   <p>Resizable only.</p>
               </div>
           </pane>
           <pane size="100px" resizable="false" collapsible="false" id="bottom-pane">
               <div class="pane-content">
                   <h3>Outer splitter / bottom pane</h3>
                   <p>Non-resizable and non-collapsible.</p>
               </div>
           </pane>
    </kendo-splitter>

    <style>
	    #vertical {
	    	height: 380px;
	    }
	    #middle-pane {
	    	color: #000;
	    	background-color: #ccc;
	    }
	    #bottom-pane {
	    	color: #000;
	    	background-color: #aaa;
	    }
	    #left-pane, #center-pane, #right-pane {
	    	color: #000;
	    	background-color: #F5F5F5;
	    }
	    .pane-content {
	    	padding: 0 10px;
	    }
    </style>
```
{% endif %}
```C# PageModel
public class SplitterIndexModel : PageModel
{
    public void OnGet()
    {

    }
}
```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Splitter](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/splitter)
* [Server-Side HtmlHelper API of the Splitter](/api/splitter)
* [Server-Side TagHelper API of the Splitter](/api/taghelpers/splitter)
* [Knowledge Base Section](/knowledge-base)
