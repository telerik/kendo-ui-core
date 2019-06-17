---
title: Prevent Old Content from Showing when Refreshing
description: How to prevent the old content from showing up for a moment until the new content is fetched in a Kendo Window.
type: troubleshooting
page_title: Prevent Old Content From Showing when Refreshing
slug: window-prevent-old-content-from-show
position: 
tags: window,load,content,old,flicker,refresh, ajax
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
When Kendo Window is opened and loads content from the server, it shows old data for fraction of second and then shows current data.

How to stop it from showing old data and just show current data when we open it?

## Steps to Reproduce
Declare a window that will use AJAX to fetch content and use its refresh() method when opening it to get new content. Add some dummy delay in the controller to better see the results.

## Cause\Possible Cause(s)
The Kendo Window puts the data returned by the controller in the DOM as its content. Until the new request returns, it cannot know what to update the DOM with.

## Solution
To prevent the user from seeing old content and even interacting with it, use the [close event](https://docs.telerik.com/kendo-ui/api/javascript/ui/window/events/close) of the Kendo Window instance and its [content() method](https://docs.telerik.com/kendo-ui/api/javascript/ui/window/methods/content) to clean out the old content (for example, call .content("loading, please wait...")). You can call this at any other suitable time as well (e.g., when you need to make the call even when the window is opened. Here is an example.

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
    System.Threading.Thread.Sleep(3000);//simulate data loading delay
    return DateTime.Now.ToString();
}
```

## Notes
Note 1: This is not applicable for an iframe scenario. For it, clear its src attribute instead of using the .content() method. Traverse the DOM of the Window widget to get the iframe reference (e.g., with jQuery).

Note 2: You can also see how to make a request only when you open the dialog and not when it initializes, which can be used as a performance improvement.

Note 3: The solution contained in the `resetContent` function is applicable for the other Kendo Window instances (plain jQuery, ASP.NET Core)

