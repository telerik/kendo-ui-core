---
title: File Validation
page_title: File Validation
description: "Learn how to configure file validation on the client before it has been uploaded using the Telerik UI Upload HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_upload_validation_aspnetcore
position: 7
---

# File Validation

The Upload supports file validation&mdash;selected files can be validated against their extensions and size.

## Types of Validation

The Upload supports three types of validation:

* [File extension](#file-extension)
* [Maximum file size](#maximum-file-size)
* [Minimum file size](#minimum-file-size)

The following example demonstrates a sample configuration for all the three types of validation.

```
@(Html.Kendo().Upload()
    .Name("files")
    .Async(a => a
        .Save("ChunkSave", "Upload")
        .Remove("Remove", "Upload")
    )
    .Validation(validation => validation
        .AllowedExtensions(new string[] { ".gif", ".jpg", ".png" })
        .MaxFileSize(31457280)
        .MinFileSize(30720)
    )
)
```

### File Extension

The `AllowedExtensions()`, which accepts an array of strings listing all file extensions that are allowed. If the user tries to select a file with an extension that is not included in the array, the validation will fail.

### Maximum File Size

The `MaxFileSize()` configuration defines the maximum size in bytes allowed of a file that is intended for upload to the server. If the selected file exceeds the maximum size, a validation error message, such as `File size too large.`, is displayed.

### Minimum File Size

Similarly, the `MinFileSize()` method defines the minimum size in bytes allowed of a file that is intended for upload to the server. If the size of the selected file is less than the minimum size, a validation error message, such as `File size too small.`, is displayed.

## Browser Limitations

Internet Explorer versions prior to version 10 provide no information on the file size. As a result, the Upload validation for the `MinFileSize()` and `MaxFileSize()` options will not work as expected.

## See Also

* [File Validation by the Upload HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/upload/validation)
* [Server-Side API](/api/upload)
