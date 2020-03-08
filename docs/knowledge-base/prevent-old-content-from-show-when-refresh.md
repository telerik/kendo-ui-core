---
title: Prevent Old Content from Showing When Refreshing
description: An example on how to prevent the old content from showing up for a moment until the new content is fetched in a Kendo Window.
type: troubleshooting
page_title: Prevent Old Content from Showing When Refreshing | Kendo UI Window for jQuery
slug: window-prevent-old-content-from-show
tags: window, load, content, old, flicker, refresh, ajax
ticketid: 1413198
res_type: kb
---

## Environment

<table>
    <tbody>
	    <tr>
	    	<td>Product</td>
	    	<td>Progress® Kendo UI® ListView for ASP.NET MVC</td>
	    </tr>
    </tbody>
</table>


## Description

When the Kendo UI Window is opened and loads its content from the server, it displays old data for a fraction of a second and then shows its current data. How can I prevent the Window from rendering old data and show only its current content when the user opens it?

## Steps to Reproduce

Declare a Window that will use AJAX to fetch content and use its `refresh()` method when you open it to get the new content. Add some dummy delay in the controller to better see the results.

## Cause\Possible Causes

The Kendo UI Window places the data that is returned by the controller as its content in the DOM. Until the new request returns, the current content is not available and the Window updates the DOM with the obsolete content.

## Solution

To prevent the user from seeing and interacting with outdated content, use the [`close` event](https://docs.telerik.com/kendo-ui/api/javascript/ui/window/events/close) of the Window instance and its [`content()` method](https://docs.telerik.com/kendo-ui/api/javascript/ui/window/methods/content) to clean out the old content&mdash;for example, call `.content("loading, please wait..."))`. You can call this at any other suitable time as well&mdashh;for example, when you need to make the call even when the Window is opened.

```View
@(Html.Kendo().Window()
                    .Name("createAddressPopUp")
                    .Visible(false)
                    .Modal(true)
                    .Draggable(true)
                    .Resizable(x => x.Enabled(true))
                    .Width(600)
                    .Height(600)
                    .Title("Create New Address")
                    .Content("loading..")
                    .Events(ev => ev.Close("resetContent"))
)

<button onclick="openWnd();">open wnd</button>

<script>
    function openWnd() {
        $("#createAddressPopUp").data("kendoWindow").refresh({url: "/home/fetchcontent"}).open().center();
        }

    function resetContent() {
        $("#createAddressPopUp").data("kendoWindow").content("loading, please wait...");
    }
</script>
```
```Controller
public string fetchcontent()
{
    System.Threading.Thread.Sleep(3000); // Simulate a data-loading delay.
    return DateTime.Now.ToString();
}
```

## Notes

* The suggested approach is not applicable for an iframe scenario. When using iframes, clear the `src` attribute instead of using the `.content()` method. Traverse the DOM of the Window to get the iframe reference, for example, with jQuery.
* You can also see how to make a request only when you open the Window and not when it initializes. You can use it as a performance improvement.
* The solution that is contained in the `resetContent` function is also applicable for the other Kendo UI Window instances, for example, plain jQuery and ASP.NET Core.
