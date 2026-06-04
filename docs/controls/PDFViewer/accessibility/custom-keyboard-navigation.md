---
title: Custom Key Handling
page_title: jQuery PDFViewer Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery PDFViewer by Kendo UI using the kendoKeydown event."
components: ["pdfviewer"]
slug: custom_keynav_pdfviewer_kendoui
position: 2
---

# Custom Key Handling

The PDFViewer exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the PDFViewer surface receives keyboard input, the `kendoKeydown` event fires before the PDFViewer runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the PDFViewer instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the PDFViewer from running its own keyboard handler for this key press.

## Overriding a Built-In Key Combination

The PDFViewer uses `Arrow Up` and `Arrow Down` to navigate pages. The following example replaces them with `U` and `D`.

```dojo
    <div id="pdfviewer"></div>
    <script>
    $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
            file: ""
        },
        kendoKeydown: function(e) {
            var keys = kendo.keys;

            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 85) {
                e.preventKendoKeydown = true;
                var page = e.sender.activePage;
                if (page > 1) { e.sender.activatePage(page - 1); }
            }

            if (e.keyCode === 68) {
                e.preventKendoKeydown = true;
                e.sender.activatePage(e.sender.activePage + 1);
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds a `G` key shortcut to prompt for a page number.

```dojo
    <div id="pdfviewer"></div>
    <script>
    $("#pdfviewer").kendoPDFViewer({
        pdfjsProcessing: {
            file: ""
        },
        kendoKeydown: function(e) {
            if (e.keyCode === 71) {
                var page = prompt("Go to page:");
                if (page) { e.sender.activatePage(parseInt(page, 10)); }
            }
        }
    });
    </script>
```

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the PDFViewer]({% slug jquery_pdfviewer_accessibility %})
