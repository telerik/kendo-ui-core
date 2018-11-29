---
title: Responsive Kendo Window
description: How to make a responsive window that reacts to viewport size change and adapts to small screens
type: how-to
page_title: Responsive Window
slug: responsive-kendo-window
position: 
tags: kendo, window, responsive, adaptive, percent, size
ticketid: 1362958
res_type: kb
---

## Environment
<table>
	<tr>
		<td>Product</td>
		<td>Window for Progress® Kendo UI®, Progress® Kendo UI® Window for ASP.NET MVC and Progress® Kendo UI® Window for ASP.NET Core</td>
	</tr>
</table>


## Description
How to make a responsive window that takes a certain portion of the screen or the entire screen for small devices. How to improve readability and avoid having tiny content on small devices.

## Solution
To make a responsive window, use its width and height features to set its size in percent. You can also define maxWidth and maxHeight if you want to limit the size to a certain amount for large screens.

You can then hook to the show event of the window in order to maximize it for small screens. When maximized it will automatically reach to viewport changes as well.

To prevent the content from being too small on mobile devices, you can use a `@media` query to enlarge the fonts for them. An example is available at the end of the article

```JavaScript
<div id="theWindow">
    lorem ipsum dolor sit amet.
</div>

<button id="btnShowDiag">Show dialog</button>
<script>
    $(document).ready(function() {
        var myWindow = $("#theWindow")

        $("#btnShowDiag").click(function() {
            $("#theWindow").data("kendoWindow").center().open();
        });
      
          function adjustSize() {
            //for small screens, maximize the dialog when it is shown
            //you can also make the check again in $(window).resize if you want to
            //but you'd have to change the way to reference the widget then
            //to use $("#theWindow").data("kendoWindow")
            //you may, alternatively, want to .center() the dialog

            if ($(window).width() < 800 || $(window).height() < 600) {
                this.maximize();
            }
        }


        $("#theWindow").kendoWindow({
            width: "90%",
            height: "90%",
            
            //optional, will limit the percentage dimensions as well
          	//maxWidth: 1200,
            //maxHeight: 800,
            
          	title: "Responsive dialog",
            visible: false,
            actions: [
                "Close"
            ],
            open: adjustSize
        });
    });
</script>

```

```MVC
@(Html.Kendo().Window()
        .Name("windowDetails")
        .Title("Details")
        .Content(@<text> lorem ipsum dolor sit amet </text>)
        .Draggable()
        .Visible(false)
        .Modal(true)
        .Actions(a => a.Close())
        .Events(e => e.Open("adjustSize"))
)
 
@(Html.Kendo().Button()
        .Name("btnOpenDiag")
        .Content("Open the Window")
        .HtmlAttributes(new { type = "button" })
        .Events(events => events.Click("openWnd"))
)
<script>
    function openWnd() {
        var wnd = $("#windowDetails").data("kendoWindow");
        var opts = wnd.options;
        //opts.maxHeight = 600;
        //opts.maxWidth = 1200;
        //set "responsive" size, you may want to .center() on $(window).resize because the relative position between the dialog and the viewport will change
        //the constraints above apply, however, and are most useful when the dialog is resizeable by the end user, I am showing here that you can use them
        //but in the provided configuration they may not be needed. You can find the full set of options the widget can take in the following article:
        //https://docs.telerik.com/kendo-ui/api/javascript/ui/window
        
        opts.height = "90%";
        opts.width = "90%";
        
        //with the MVC wrapper, you need to set dimensions options through the setOptions() method
        //future versions may allow you to set width and height as percentage strings in the 
        //wrapper methods too, so you can check that and you may be able to remove this function
        wnd.setOptions(opts);
        wnd.center().open();
    }
 
    function adjustSize() {
        //for small screens, maximize the dialog when it is shown
        //you can also make the check again in $(window).resize if you want to but you'd have to change the way to reference the widget then
        //to use a similar approach as the function above
        
        if ($(window).width() < 800 || $(window).height() < 600) {
            this.maximize();
        }
    }
</script>
```

```CSS
/* how to make content readable on small screens */
@media screen and (max-width: 800px) {
    html body {
        font-size: 20px;
        color: red; /*just so you can easily tell when this is in effect*/
    }
}
```

## See Also
[Window Widget API](https://docs.telerik.com/kendo-ui/api/javascript/ui/window)
