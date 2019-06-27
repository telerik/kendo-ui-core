---
title: Close ToolBar Popup Manually
page_title: ToolBar | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn how to close the ToolBar popup manually with the Kendo UI ToolBar HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_toolbar_popup_manual_close_aspnetcore
position: 2
---

# Close ToolBar Popup Manually

The example below demonstrates how to close the Kendo UI ToolBar popup from a button `click` event in a template.

###### Example
```Razor
@(Html.Kendo().ToolBar()
                .Name("toolbar")
                .Items(items => {
                    items.Add().Type(CommandType.Button).Text("Button");
                    items.Add().Template("<a class='k-item k-state-default ng-scope' >Test</a>")
                               .OverflowTemplate("<button onclick='action()' class='btn' >Test</button>")
                               .Overflow(ShowInOverflowPopup.Always);
                }
                )
  )

<script>
    function action() {
        $("#toolbar").data("kendoToolBar").popup.close();
    }
</script>
```
```Controller
    public class ToolBarController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
```
