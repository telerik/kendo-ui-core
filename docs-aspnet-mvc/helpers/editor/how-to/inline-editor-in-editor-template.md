---
title: Use Inline Editors in Editor Templates
page_title: Use Inline Editors in Editor Templates | Kendo UI Editor HtmlHelper
description: "Use an inline Editor in an Editor template in ASP.NET MVC applications."
slug: howto_useinlineeditorineditortemplate_editoraspnetmvc
---

# Use Inline Editors in Editor Templates

When you use the Kendo UI Editor in the inline editing mode in an MVC Editor template, the posting of content to the action is prevented.

The reason for this behavior is that the inline mode renders a DOM element which is not a form field and, therefore, no data is sent. To handle this scenario, implement further the Editor template by adding a hidden input and update it when the content of the Kendo UI Editor changes.

###### Example

```tab-Razor
@model string

@(Html.Kendo().EditorFor(model => model)
    .Name(Html.NameFor(model => model) + "_Editor")
    .Tag("div")
    .Tools(tools => tools.Clear().Bold().Italic().Underline())
    .Events(events => events.Change(@"function (ev){
    var hiddenInput =  $('#" + Html.NameFor(model => model) + @"');
    hiddenInput.val(ev.sender.value());
    hiddenInput.change();
}"))
)

@Html.HiddenFor(model => model)
```

## See Also

* [Editor HtmlHelper Overview]({% slug overview_editorhelper_aspnetmvc %})
* [EditorBuilder API Reference](/api/Kendo.Mvc.UI.Fluent/EditorBuilder)

For more runnable examples on the Kendo UI Editor in ASP.NET MVC applications, browse its [**How To** documentation folder](/helpers/editor/how-to/).
