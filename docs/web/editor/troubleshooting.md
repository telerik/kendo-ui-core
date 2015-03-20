---
title: Troubleshooting
page_title: Troubleshooting of Kendo UI Editor widget
description: How to deal with the troubleshooting of Editor UI widget.
position: 6
---

# Editor troubleshooting

## Pasting content in the editor when using IE does not display anything

Pasting in the editor requires permission to access clipboard data. This may require users with strict security settings to add the site in the trusted sites zone, or to adjust their Internet options so that the "Allow Programmatic clipboard access" setting is set to either "Allowed" or "Prompt".

## Editor inside a popup is readonly in Firefox

Firefox cannot handle iframes properly when they are moved in the DOM. When an Editor will be used inside a popup, which moves elements in the DOM, the popup (e.g. Kendo UI Window, jQuery dialog, etc) should be initialized first, or you should call the [refresh method](/kendo-ui/api/web/editor#methods-refresh).

## Editor inside iPad expands instead of being scrollable

Iframes cannot be scrollable in iOS and always expand to display all their content. A possible solution is to use the Editor's inline editing mode, which does not include an iframe.
In this mode the Editor's value should be posted manually (see below).

## Inline editor value is not posted to the server

Since the inline editor is initialized from a non-form element, it is not posted to the server by design. If you need to submit the editor value along with the form, use the following approach:

    <form>
      <div id="comment" contentEditable></div>

      <button class="k-button">Submit</button>
    </form>

    <script>
      $("form").on("submit", function() {
        var form = $(this);

        // for each editor in the form
        form.find("[data-role=editor]").each(function() {
          var editor = $(this).data("kendoEditor");

          // ... append a hidden input that holds the editor value
          $("<input type='hidden' />")
            .attr("name", editor.element.attr("id"))
            .val(editor.value())
            .appendTo(form);
        });
      });
    </script>

## Images inside the Editor are not resizable in some scenarios

To begin with, image resizing inside contenteditable elements depends on the browser and is not an Editor feature. In addition, there is a browser issue, which is exhibited in the following way -
if a "classic" Editor (which uses an `iframe`) is created while hidden, or is hidden after initialization and then displayed back, then images become non-resizable. This problem is not related to Kendo UI.
It can be resolved by calling the Editor's [`refresh`](/api/web/editor#methods-refresh) method after the Editor becomes visible. Refreshing the widget will recreate the iframe.
Another possible approach is to use the Editor's "inline" mode, i.e. create the Editor from a `div`.

## Editor displays raw HTML content when using the browser's Back and Forward buttons

The Editor stores its value encoded by default. When the page is retrieved from the *bfcache* (back-forward cache), the textarea value is persisted encoded and the Editor encodes it again. This process can be easily observed if one navigates several times back and forth - on each navigation, the Editor value will be encoded once more.

To resolve the problem, set the [`encoded`](/api/web/editor#configuration-encoded) property to `false`, and expect the editor value to be posted unencoded to the server. If you are using ASP.NET, be sure to either disable the ASP.NET security validation or set the `AllowHtml` attribute on the model field that will receive the HTML string. Here is some more [information about request validation in ASP.NET](http://blogs.learnnowonline.com/blog/bid/199703/ASP-NET-MVC-Request-Validation-Protection-AllowHtml-Attribute).

Another option is to enable the [inline Editor mode](/web/editor/overview#classic-mode-vs-inline-mode), which does not use an `iframe` and a `textarea`. In this case, however, the Editor's value should be [submitted manually](/getting-started/web/editor/troubleshooting#inline-editor-value-is-not-posted-to-the-server).

## Pasted styles from MS Word are not retained

By design, the Editor widget strives to output clean, XHTML-compatible markup. Because of that, the widget cleans up invalid styles set by Microsoft Word, and removes most presentational styles. Such styles include the colors applied by the current theme, and the default MS Word font and size. Ideally, the output of the editor should be styled via a stylesheet provided through the [stylesheets configuration option](/kendo-ui/api/web/editor#configuration-stylesheets). This allows all pasted content to be styled in a consistent manner across your site.

If pasting wrongly removes semantics or actual content along with the styles, please submit a bug report and attach a MS Word document that reproduces the problem.

## BOM characters are shown in the editable area when applying formats

The Editor uses BOM characters to handle some ranges correctly. These characters become visible if there is a problem with the page encoding. To debug this, follow the following steps:

1. If you observe the problem in the [online demos](http://demos.telerik.com/kendo-ui/editor), this might mean that your browser has enforced an encoding that is not UTF-8. This scenario is not supported.

1. If the online demos behave properly, change the Kendo UI script references so that they are loaded from the CDN, `http://cdn.kendostatic.com/2014.2.716/js/kendo.all.min.js`. If your page now works correctly, then your local script files are served with the wrong encoding or are corrupted. Copy over the scripts (the files, not their content) from the official distribution and see if the problem persists.

1. If the problem is still visible on your page, and the scripts are loaded via the CDN, then it is likely that the page is served with the wrong formatting. Make sure the page, as well as its layout pages, are saved and served in UTF-8.
