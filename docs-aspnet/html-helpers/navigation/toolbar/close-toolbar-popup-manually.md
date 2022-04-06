---
title: Manual Closing
page_title: Manual Closing
description: "Learn how to close the ToolBar popup manually with the Telerik UI ToolBar component for {{ site.framework }}."
slug: htmlhelpers_toolbar_popup_manual_close_aspnetcore
position: 3
---

# Manual Closing

The ToolBar provides options for closing its popup from a button `click` event in a template.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-toolbar name="ToolBar">
        <toolbar-items>
            <item type="CommandType.Button" text="Button" />
            <item template="<a class='k-item k-state-default ng-scope' >Test</a>"
            overflow-template="<button onclick='action()' class='btn' >Test</button>"
            overflow="ShowInOverflowPopup.Always">
		    </item>
        </toolbar-items>
    </kendo-toolbar>
    <script>
        function action() {
            $("#toolbar").data("kendoToolBar").popup.close();
        }
    </script>
```
{% endif %}
```Controller
    public class ToolBarController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
```

## See Also

* [Server-Side API](/api/toolbar)
