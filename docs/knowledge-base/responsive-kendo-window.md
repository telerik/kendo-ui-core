---
title: Make Kendo UI Window Responsive
description: An example on how to make a Kendo UI Window responsive so that it reacts to changes in the size of the viewport and adapts to small screens.
type: how-to
page_title: Adapt Window to Viewport Size | Kendo UI Window for jQuery
slug: responsive-kendo-window
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

How can I make a Kendo UI Window responsive so that it reacts to changes in the size of the viewport and adapts to small screens? How can I improve readability and avoid having tiny content on small devices?

## Solution

To display a responsive Window:

1. Set the size of the Window in percentage values by using its `width` and `height` options to make it responsive.
1. (Optional) Define a `maxWidth` and `maxHeight` to limit the size of the Window on large screens to a certain portion.
1. Hook to the `show` event of the Window to maximize it for small screens. As a result, when the user maximizes the Window, the Window will automatically react to changes in the viewport size as well.

```JavaScript
<div id="theWindow">
    lorem ipsum dolor sit amet.
</div>

<button id="btnShowDiag" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">Show dialog</button>
<script>
    $(document).ready(function() {
        var myWindow = $("#theWindow")

        $("#btnShowDiag").click(function() {
            $("#theWindow").data("kendoWindow").center().open();
        });

          function adjustSize() {
            // For small screens, maximize the window when it is shown.
            // You can also make the check again in $(window).resize if you want to
            // but you will have to change the way to reference the widget and then
            // to use $("#theWindow").data("kendoWindow").
            // Alternatively, you may want to .center() the window.

            if ($(window).width() < 800 || $(window).height() < 600) {
                this.maximize();
            }
        }


        $("#theWindow").kendoWindow({
            width: "90%",
            height: "90%",

            // (Optional) Will limit the percentage dimensions as well:
          	// maxWidth: 1200,
            // maxHeight: 800,

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
        // Set "responsive" size, you may want to .center() on $(window).resize because the relative position between the window and the viewport will change.
        // The constraints above apply, however, and are most useful when the window is resizable by the end user. The example here demonstrates that you can use them
        // but in the provided configuration they may not be needed. You can find the full set of options the widget can take in the following article:
        // https://docs.telerik.com/kendo-ui/api/javascript/ui/window.

        opts.height = "90%";
        opts.width = "90%";

        // With the MVC wrapper, you need to set dimensions options through the setOptions() method.
        // Future versions may allow you to set width and height as percentage strings in the
        // wrapper methods too, so you can check that and you may be able to remove this function.
        wnd.setOptions(opts);
        wnd.center().open();
    }

    function adjustSize() {
        // For small screens, maximize the window when it is shown.
        // You can also make the check again in $(window).resize if you want to but you will have to change the way to reference the widget and then
        // to use a similar approach as the function above.

        if ($(window).width() < 800 || $(window).height() < 600) {
            this.maximize();
        }
    }
</script>
```

To prevent the content from being too small on mobile devices, use a `@media` query which enlarges the fonts on them.

```CSS
@media screen and (max-width: 800px) {
    html body {
        font-size: 20px;
			color: red; /* In this way, you can easily tell when this is in effect.*/
		}
}
```

## See Also

* [API Reference of the Kendo UI Window for jQuery](https://docs.telerik.com/kendo-ui/api/javascript/ui/window)
