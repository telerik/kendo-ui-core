---
title: Use Inline Editors in Editor Templates
page_title: Use Inline Editors in Editor Templates
description: "Use an inline Editor in an Editor template in ASP.NET MVC applications."
previous_url: /helpers/editors/editor/how-to/inline-editor-in-editor-template
slug: howto_useinlineeditorineditortemplate_editoraspnetmvc
---

# Use Inline Editors in Editor Templates

When you use the Telerik UI Editor in the inline editing mode in an MVC Editor template, the posting of content to the action is prevented.

The reason for this behavior is that the inline mode renders a DOM element which is not a form field and, therefore, no data is sent. To handle this scenario, implement further the Editor template by adding a hidden input and update it when the content of the Editor changes.

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

## See Also

* [Basic Usage of the Editor HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/editor)
* [Using the API of the Editor HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/editor/api)
* [EditorBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/EditorBuilder)
* [Editor Server-Side API](/api/editor)
