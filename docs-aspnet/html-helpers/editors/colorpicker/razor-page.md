---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI ColorPicker component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_colorpicker_razorpage_aspnetcore
components: ["colorpicker"]
position: 9
---

# ColorPicker in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI ColorPicker for {{ site.framework }} in Razor Pages applications.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to Local Data

The following example demonstrates how to configure the ColorPicker buttons and value based on properties from the `PageModel`.

```HtmlHelper
    @page
    @model ColorPickerIndexModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()
	
	@(Html.Kendo().ColorPicker()
		.Name("picker")	
		.ClearButton(Model.ClearButton)
		.Buttons(Model.Buttons)
		.Value(Model.Value)
	)
```
```TagHelper
    @page
    @model ColorPickerIndexModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()

    <kendo-colorpicker name="picker"
        clear-button="@Model.ClearButton"
        buttons="@Model.Buttons"
        value="@Model.Value">
    </kendo-colorpicker>
```
```C# PageModel
public class ColorPickerIndexModel : PageModel
{
	public bool ClearButton { get; set; }	
    public bool Buttons { get; set; }
    public string Value { get; set; }
	
    public void OnGet()
    {
        ClearButton = true;
        Buttons = false;
        Value = "#94ed67";
    }
}
```

For the complete project, refer to the [ColorPicker in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/ColorPicker/ColorPickerIndex.cshtml).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the ColorPicker](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/colorpicker)
* [Server-Side HtmlHelper API of the ColorPicker](/api/colorpicker)
* [Server-Side TagHelper API of the ColorPicker](/api/taghelpers/colorpicker)
* [Knowledge Base Section](/knowledge-base)

