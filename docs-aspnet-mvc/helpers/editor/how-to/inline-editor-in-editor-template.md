---
title: Using Inline Editor in Editor Template
page_title: Using Inline Editor in Editor Template | Kendo UI Editor HtmlHelper
description: "Using Inline Editor in Editor Template in ASP.NET MVC applications."
slug: howto_useinlineeditorineditortemplate_editoraspnetmvc
---

# Using Inline Editor in Editor Template

Using the Kendo Editor in Inline mode in an MVC Editor Template will lead you to a not posted content to the action. That is because Inlinde mode will render a DOM element that is not a form field and thus, no data is sent. 

To handle this case you should implement further your Editor Template by adding a hidden input and update it when Kendo Editor's content is changed. 

###### Example

```tab-Razor
@model string
    
@(Html.Kendo().EditorFor(model => model)
    .Name(Html.NameFor(model => model) + "_Editor")
    .Tag("div")
    .Tools(tools => tools.Clear().Bold().Italic().Underline())
    .Events(events => events.Change(@"function (ev){
    var hiddenINput =  $('#" + Html.NameFor(model => model) + @"');
    hiddenINput.val(ev.sender.value());
    hiddenINput.change();
}"))
) 

@Html.HiddenFor(model => model)
```

## See Also

Other articles and how-to examples on the Kendo UI Editor HtmlHelper:

* [Editor HtmlHelper Overview]({% slug overview_editorhelper_aspnetmvc %})
* [EditorBuilder API Reference](/api/Kendo.Mvc.UI.Fluent/EditorBuilder)

For more runnable examples on the Kendo UI Editor in ASP.NET MVC applications, browse its [**How To** documentation folder]({% slug howto_addmaxlengthvalidation_editoraspnetmvc %}).
