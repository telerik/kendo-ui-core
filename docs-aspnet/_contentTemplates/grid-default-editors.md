#grid-default-editors-section

By default, the Grid component serializes editors allocated within the `~/Views/Shared/EditorTemplates/` folder. 

For example, the default editor of the `string` properties is the [TextBox]({% slug htmlhelpers_overview_textbox%}) component, the [CheckBox]({% slug htmlhelpers_checkbox_aspnetcore_overview%})&mdash;for booleans, the [DateTimePicker]({% slug htmlhelpers_datetimepicker_aspnetcore%})&mdash;for `DateTime` data type properties, and more.

```C# String.cshtml
@model object 

@Html.Kendo().TextBoxFor(model => model)
```
```C# Boolean.cshtml
@model bool?

@(Html.Kendo().CheckBoxFor(m => m).HtmlAttributes(new { title = Html.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName("")}))
```
```C# DateTime.cshtml
@model DateTime?

@(Html.Kendo().DateTimePickerFor(m => m).HtmlAttributes(new { title = Html.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName("")}))
```

If no editors are available in the `~/Views/Shared/EditorTemplates/` folder, the Grid will revert to using a default editor based on the primitive type.

#end