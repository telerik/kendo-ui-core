---
title: Troubleshooting
page_title: Common Issues | Kendo UI Editor
description: "Learn how to deal with issues you may encounter while using the Kendo UI Editor widget."
previous_url: /controls/editors/editor/troubleshooting/troubleshooting
slug: troubleshooting_editor_widget
position: 70
---

# Troubleshooting

This article provides solutions for common issues you might encounter while working with the Kendo UI Editor widget.

## Pasting displays nothing in Internet Explorer

Pasting in the Editor requires permission to access **Clipboard** data.

**Solution** Users with strict security settings might be required to apply either of the following approaches:
* Add the site in the trusted site zone.
* Adjust their Internet options so that the **Allow Programmatic Clipboard Access** setting is set to either **Allowed** or **Prompt**.

## Pasted MS Word styles are not retained

By design, the Editor strives to output a clean and XHTML-compatible markup. That is why, the widget cleans up invalid styles set by Microsoft Word and removes the most presentational styles. Such styles include the colors applied by the current theme and the default MS Word font and size.

**Solution** Ideally, the output of the Editor has to be styled via a stylesheet provided through the [stylesheets configuration option](/api/javascript/ui/editor/configuration/stylesheets). It allows for the whole pasted content to be consistently styled across your site.

If wrong pasting removes semantics or actual content along with the styles:

1. Submit a bug report.
1. Attach an MS Word document that reproduces the issue.

## Formatting shows BOM characters in the editable area

The Editor uses BOM characters to correctly handle some ranges. If there is an issue with the page encoding, these characters become visible.

**Solution** To handle this behavior, refer to the following scenarios:

1. If you observe the problem in the [online demos](https://demos.telerik.com/kendo-ui/editor), your browser might have enforced an encoding that is different from the UTF-8 one. This scenario is not supported.
1. If the online demos behave properly, change the Kendo UI script references so they are loaded from the CDN (https://kendo.cdn.telerik.com/2014.2.716/js/kendo.all.min.js). If your page is now working correctly, your local script files are served with the wrong encoding, or are corrupted. Copy over the scripts (the files, not their content) from the official distribution, and see if the issue persists.
1. If the problem is still visible on your page, and the scripts are loaded through the CDN, the page might be served with the wrong formatting. Verify that the page as well as its layout pages are saved and served in UTF-8.

## The popup Editor is read-only in Firefox

Firefox cannot handle `iframe` elements properly when they are moved to the DOM.

**Solution** When you use an Editor inside a popup, which moves elements to the DOM, either first initialize the popup (for example, a Kendo UI Window, a jQuery dialog, or other) or call the [`refresh`](/api/javascript/ui/editor/methods/refresh) method.

## The Editor on iPad expands instead of being scrollable

Iframes cannot be scrollable in iOS and always expand to display all their content.

**Solution** Use the inline Editor mode that excludes an `iframe`. When in inline mode, you need to manually post the value of the Editor (see below).

## Images and tables are not resizable

Image and table resizing inside `contenteditable` elements depends on the browser. As a result, images may not resize if a classic-mode Editor (which uses an `iframe`) is created while hidden, or is hidden after its initialization and then displayed back. The reason for the issue is the functionalities of the browser.

**Solution** Call the [`refresh`](/api/javascript/ui/editor/methods/refresh) method of the Editor after the widget becomes visible. Refreshing the widget recreates the `iframe`.

Another possible approach is to use the inline mode of the Editor, that is, to create the Editor from a `div` element.

> * As of the R3 2016 release, resizing of table rows and columns has been implemented in the Editor. To resize a row or a column of the Editor, the user can drag the cell borders with the mouse.
> * To resize an image or a table in versions prior to the R3 2016 release and in browsers that do not normally support it, such as Google Chrome 46, implement a [custom Editor tool](https://demos.telerik.com/kendo-ui/editor/custom-tools).

## Back and forward browser buttons display raw HTML

By default, the Editor stores its value encoded. When the page is retrieved from the `bfcache` (back-forward cache), the `textarea` value is persisted as encoded and the Editor encodes it again. This process can be easily observed if you navigate several times back and forth. On each navigation, the Editor value is encoded once more.

**Solution** Set the [`encoded`](/api/javascript/ui/editor/configuration/encoded) property to `false`. The value of the Editor is expected to be posted unencoded to the server.

If you are using ASP.NET, make sure that you either disable the ASP.NET security validation or set the `AllowHtml` attribute on the model field that will receive the HTML string. For more information, refer to the documentation on [requesting validation in ASP.NET](http://blogs.learnnowonline.com/blog/bid/199703/ASP-NET-MVC-Request-Validation-Protection-AllowHtml-Attribute).

Another option is to enable the [inline Editor mode](/web/editor/overview#classic-mode-vs-inline-mode) which does not use an `iframe` and a `textarea`. In this case, however, you have to [manually submit the value of the Editor]({% slug troubleshooting_editor_widget %}#inline-editor-value-is-not-posted-to-the-server).

The back-forward cache of the browser can be disabled by attaching a `window.unload` handler, as demonstrated in the following example.

    $(window).unload(function() {
      // nothing required here
    });

## The inline value is not posted to the server

Because the inline Editor is initialized from a non-`form` element, it is not posted to the server by design.

**Solution** To submit the value of the Editor along with the `form`, use the approach demonstrated in the following example.

    <form>
      <div id="comment" contentEditable></div>

      <button class="k-button">Submit</button>
    </form>

    <script>
      $("form").on("submit", function() {
        var form = $(this);

        // For each Editor in the form...
        form.find("[data-role=editor]").each(function() {
          var editor = $(this).data("kendoEditor");

          // ... append a hidden input that holds the Editor value.
          $("<input type='hidden' />")
            .attr("name", editor.element.attr("id"))
            .val(editor.value())
            .appendTo(form);
        });
      });
    </script>

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
