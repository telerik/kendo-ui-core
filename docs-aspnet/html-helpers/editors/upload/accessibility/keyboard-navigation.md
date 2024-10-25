---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Get started with the {{ site.product }} Upload and learn about the accessibility support it provides through its keyboard navigation functionality."
slug: keynav_aspnetcore_upload
position: 2
---

# Keyboard Navigation

The keyboard navigation of the Upload is always available.

The Upload supports the following keyboard shortcuts:

| SHORTCUT						| DESCRIPTION				                                                        |
|:---              |:---                                                                                |
| `Tab`            | Focuses the Select File Button, or the action buttons (Cancel, Upload) after the file list.|
| `Space` or `Enter`| Opens the Select file dialog, if the Select files button is focused.|
| `Up Arrow`       | Highlights the previous file in the file list, or the Select files button, if the top of the list is reached.|
| `Down Arrow`     | Highlights the next file in the file list, or the Clear button, if the end of the list is reached.|
| `Enter`          | Retries the upload of the failed file, when the focus is on a file list item, or starts the file upload for a valid file.|
| `Esc   `         | Cancels the upload of the highlighted file, when the focus is on a file list item.|
| `Delete`         | Removes the highlighted file, when the focus is on a file list item.|
| `Space`          | When Chunk upload is enabled, Start or Pause the highlighted file upload.|
| `Left Arrow` or `Right Arrow`| Navigate between the Play/Pause, Cancel, Remove buttons of a highlighted file list item.|


For a complete example, refer to the [demo on keyboard navigation of the Upload](https://demos.telerik.com/{{ site.platform }}/upload/keyboard-navigation).

## See Also

* [Keyboard Navigation by the Upload (Demo)](https://demos.telerik.com/{{ site.platform }}/upload/keyboard-navigation)
* [Accessibility Overview of the Upload HtmlHelper for {{ site.framework }}]({% slug accessibility_aspnetcore_upload %})
