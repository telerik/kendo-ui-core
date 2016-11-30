---
title: Validation
page_title: Validation | Kendo UI Upload
description: "Validate the selected files in the Kendo UI Upload widget."
slug: validation_upload_widget
position: 3
---

# Validation

As of the Kendo UI 2016 Q3 release the Upload supports file validation&mdash;selected files can be validated against their extensions and size.

The example below demonstrates a sample configuration for validation.

###### Example

        validation: {
    		allowedExtensions: [".jpg", ".rar"],
    		maxFileSize: 800000,
    		minFileSize: 200000
		}

## Types of Validation

The Upload supports three types of validation:

* [File extension](#file-extension)
* [Maximum file size](#maximum-file-size)
* [Minimum file size](#minimum-file-size)

### File Extension

The `allowedExtensions` array object lists all file extensions that are allowed. If the user tries to select a file with an extension that is not included in the array, the validation will fail.

The validation messages are displayed differently depending on whether the [`async.batch`](/api/javascript/ui/upload#configuration-async.batch) option is enabled.

**Figure 1: Batch mode is disabled**

![Validation message on disabled batch mode](/controls/editors/upload/upload-validation-batch-disabled.png)

**Figure 2: Batch mode is enabled**

![Validation message on enabled batch mode](/controls/editors/upload/upload-validation-batch-enabled.png)

### Maximum File Size

The `maxFileSize` property defines the maximum size in bytes allowed of a file that is intended for upload to the server. If the selected file exceeds the maximum size, a validation error message, such as `File size too large.`, is displayed.

### Minimum File Size

The `minFileSize` property defines the minimum size in bytes allowed of a file that is intended for upload to the server. If the size of the selected file is less than the minimum size, a validation error message, such as `File size too small.`, is displayed.

## Browser Limitations

Internet Explorer versions prior to version 9 provide no information on the file size. As a result, the Upload validation for the `minFileSize` and `maxFileSize` options will not work as expected.

## See Also

Other articles on Kendo UI Upload:

* [Overview of the Upload Widget]({% slug overview_kendoui_upload_widget %})
* [Send and Receive Metadata]({% slug metadata_upload_widget %})
* [Drag and Drop]({% slug dragandrop_upload_widget %})
* [Modes of Operation]({% slug modes_upload_widget %})
* [Browser Support]({% slug browsersupport_upload_widget %})
* [Troubleshooting]({% slug troubleshooting_upload_widget %})
