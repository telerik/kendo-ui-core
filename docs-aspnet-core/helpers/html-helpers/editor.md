---
title: Editor
page_title: Editor | UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Editor HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_editor_aspnetcore
---

# Editor HtmlHelper Overview

The Editor HtmlHelper extension is a server-side wrapper for the [Kendo UI Editor](http://demos.telerik.com/kendo-ui/editor/index) widget.

It enables you to configure the Kendo UI Editor widget from server-side code. The [Editor](http://docs.telerik.com/kendo-ui/controls/editors/editor/overview) allows you to create rich textual content through a What-You-See-Is-What-You-Get (WYSIWYG) interface. The generated widget value is an XHTML markup.

For more information on the HtmlHelper, refer to the article on the [Editor HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/editor/overview).

## Basic Usage

The following example demonstrates how to define the Editor by using the Editor HtmlHelper.

###### Example

```tab-Razor
@(Html.Kendo().Editor()
    .Name("editor")
    .HtmlAttributes(new { style = "height:440px" })
    .Resizable(resizable => resizable.Content(true).Toolbar(true))
    .Value(@<text>
        <p>
            Kendo UI Editor allows your users to edit HTML in a familiar, user-friendly way.<br />
            In this version, the Editor provides the core HTML editing engine, which includes basic text formatting, hyperlinks, lists,
            and image handling. The widget <strong>outputs identical HTML</strong> across all major browsers, follows
            accessibility standards and provides API for content manipulation.
        </p>
        <p>Features include:</p>
        <ul>
            <li>Text formatting &amp; alignment</li>
            <li>Bulleted and numbered lists</li>
            <li>Hyperlink and image dialogs</li>
            <li>Cross-browser support</li>
            <li>Identical HTML output across browsers</li>
            <li>Gracefully degrades to a <code>textarea</code> when JavaScript is turned off</li>
        </ul>
    </text>)
)
```
```tab-Controller
    public class EditorController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
```

## Configuration

The following example demonstrates the basic configuration of the Editor HtmlHelper and how to get the Editor instance.

###### Example

```tab-Razor

@(Html.Kendo().Editor()
    .Name("editor")
    .HtmlAttributes(new { style = "width: 100%;height:440px" })
    .ImageBrowser(imageBrowser => imageBrowser
        .Image("~/Content/UserFiles/Images/{0}")
        .Read("Read", "ImageBrowser")
        .Create("Create", "ImageBrowser")
        .Destroy("Destroy", "ImageBrowser")
        .Upload("Upload", "ImageBrowser")
        .Thumbnail("Thumbnail", "ImageBrowser")
    )
    .FileBrowser(fileBrowser => fileBrowser
        .File("~/Content/UserFiles/Images/{0}")
        .Read("Read", "FileBrowser")
        .Create("Create", "FileBrowser")
        .Destroy("Destroy", "FileBrowser")
        .Upload("Upload", "FileBrowser")
    )
    .Pdf(pdf => pdf
        .Margin(20, 20, 20, 20)
        .PaperSize("A4")
        .ProxyURL(Url.Action("Pdf_Export_Save", "Editor"))
    )
    .Tools(tools => tools
        .Clear()
        .Bold().Italic().Underline().Strikethrough()
        .JustifyLeft().JustifyCenter().JustifyRight().JustifyFull()
        .InsertUnorderedList().InsertOrderedList()
        .Outdent().Indent()
        .CreateLink().Unlink()
        .InsertImage()
        .InsertFile()
        .SubScript()
        .SuperScript()
        .TableEditing()
        .ViewHtml()
        .Formatting()
        .CleanFormatting()
        .FontName()
        .FontSize()
        .ForeColor()
        .BackColor()
        .Pdf()
        .Print()
        .Snippets(snippets => snippets
            .Add("Signature", "<p>Regards,<br /> John Doe,<br /><a href='mailto:john.doe@example.com'>john.doe@example.com</a></p>")
            .Add("Kendo online demos", " <a href='http://demos.telerik.com/kendo-ui'>Kendo online demos</a> ")
        )
    )
    .Value(@<text>
        <p>
            Kendo UI Editor allows your users to edit HTML in a familiar, user-friendly way.
        </p>
    </text>)
)

    <script>
    $(function() {
        //Notice that the Name() of the Editor is used to get its client-side instance.
        var editor = $("#editor").data("kendoEditor");
    });
    </script>
```

## See Also

* [JavaScript API Reference of the Editor](http://docs.telerik.com/kendo-ui/api/javascript/ui/editor)
* [Editor HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/editor/overview)
* [Editor Official Demos](http://demos.telerik.com/aspnet-core/editor/index)
* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
