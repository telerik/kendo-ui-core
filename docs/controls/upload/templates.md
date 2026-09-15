---
title: Templates
page_title: jQuery Upload Documentation - Templates
description: "Get started with the jQuery Upload by Kendo UI and learn how to use templates when working with the widget."
components: ["upload"]
slug: templates_upload
position: 7
---

# Templates

The Upload enables you to implement templates.

The file template receives the following data:

* `name`—The name of the file. In batch upload mode, this is a comma-separated list of file names.
* `size`—The file size in bytes. In batch upload mode, this is the total file size.
* `files`—An array containing the selected file information, including the `name`, `size`, and `extension` properties.

The template can also include a `<span class="k-progress"></span>` element to render the default progress bar. To render the built-in upload action buttons, include elements with the `k-upload-action` class. For the complete API details, see the [`template` configuration](/api/javascript/ui/upload/configuration/template).

For a runnable example, refer to the [demo on using templates in the Upload](https://demos.telerik.com/kendo-ui/upload/templates).

## See Also

* [Using Templates in the Upload](https://demos.telerik.com/kendo-ui/upload/templates)
* [JavaScript API Reference of the Upload](/api/ui/upload)
