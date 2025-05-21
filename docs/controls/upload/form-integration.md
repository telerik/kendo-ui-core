---
title: Form Integration
page_title: jQuery Upload Documentation - Form Integration
description: "Learn how to use the Upload as a Form item editor in Kendo UI jQuery Upload component."
slug: form_integration_upload_component
position: 9
---

# Form Integration

The [Kendo UI Form]({% slug overview_kendoui_form_widget %}) supports the Upload component as a form field editor, allowing you to seamlessly integrate file uploads within your form. This integration lets you handle file uploads along with other form data.

When used in a form, the Upload editor operates only in synchronous mode&mdash;it behaves like a standard file selection input while still providing the Kendo UI styling and user experience benefits. This approach ensures compatibility with standard form submissions while maintaining the enhanced UI features of the Kendo UI Upload component.

## Basic Usage

The following example demonstrates how to add an Upload editor to a Form:

```dojo
<div id="validation-success"></div>
<form id="exampleform"></form>

<script>
  $(document).ready(function() {
    var validationSuccess = $("#validation-success");
    
    $("#exampleform").kendoForm({
      orientation: "horizontal",
      items: [
        {
          field: "UserName",
          label: "Username:",
          validation: { required: true },
          editor: "TextBox",
          editorOptions: {
            placeholder: "Username"
          }
        },
        {
          field: "Email",
          label: "Email:",
          validation: { required: true, email: true },
          editor: "TextBox",
          editorOptions: {
            placeholder: "Email"
          }
        },
        {
          field: "UploadedFile",
          label: "Document:",
          hint: "Accepted formats: .pdf, .docx, .txt",
          editor: "Upload",
          validation: { required: true },
          editorOptions: {
            multiple: false,
            validation: {
              allowedExtensions: [".pdf", ".docx", ".txt"],
              maxFileSize: 10485760 // 10MB
            }
          }
        }
      ],
      submit: function(e) {
        e.preventDefault();
        if (e.model.UploadedFile) {
          validationSuccess.html(
            "<div class='k-messagebox k-messagebox-success'>" +
            "Form data is valid! Selected file: " + e.model.UploadedFile.name +
            "</div>"
          );
        }
      }
    });
  });
</script>
```

## Supported Upload Editor Options

When using the Upload as a Form editor, you can configure the following options:

- [`multiple`](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/configuration/multiple)&mdash;Determines whether multiple file selection is enabled.
- [`validation`](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/configuration/validation)&mdash;Lets you configure file restrictions:
  - [`allowedExtensions`](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/configuration/validation#validation.allowedExtensions)&mdash;Lets you set an array of allowed file extensions.
  - [`maxFileSize`](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/configuration/validation#validationmaxfilesize)&mdash;Lets you configure the maximum allowed file size in bytes.
  - [`minFileSize`](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/configuration/validation#validationminfilesize)&mdash;Lets you configure the minimum required file size in bytes.
  - `required`&mdash;Whether file selection is required.

## Custom Validation Messages

You can customize validation messages by adding them to the validation options:

```javascript
editorOptions: {
  validation: {
    allowedExtensions: [".pdf", ".docx"],
    maxFileSize: 5242880, // 5MB
    required: true,
    validateOnLoad: true,
    invalidFileExtensionMessage: "Only PDF and Word documents are allowed.",
    invalidMaxFileSizeMessage: "File size exceeds the 5MB limit.",
    invalidMinFileSizeMessage: "File size is too small."
  }
}
```

## Complete Example with Form Submission

The following example demonstrates a complete form with an Upload field that validates file types and submits all form data together:

```dojo
$("#exampleform").kendoForm({
  formData: {
    UserName: "",
    Email: "",
    Password: "",
    UploadedFileNames: null
  },
  orientation: "vertical",
  items: [
    {
      field: "UserName",
      label: "Username:",
      validation: { required: true },
      editor: "TextBox"
    },
    {
      field: "Email",
      label: { text: "Email:" },
      editor: "TextBox",
      validation: { required: true, email: true }
    },
    {
      field: "Password",
      label: "Password",
      editor: "TextBox",
      attributes: { type: "password" },
      validation: { required: true }
    },
    {
      field: "UploadedFileNames",
      label: "Upload documents:",
      hint: "Accepted file formats: .txt, .docx, .pdf",
      editor: "Upload",
      validation: { required: true },
      editorOptions: {
        multiple: false,
        validation: {
          required: true,
          allowedExtensions: [".txt", ".docx", ".pdf"]
        }
      }
    }
  ],
  submit: function(e) {
    e.preventDefault();
    
    var validationSuccess = $("#validation-success");
    var formData = new FormData();
    formData.append("Username", e.model.UserName);
    formData.append("Email", e.model.Email);
    formData.append("Password", e.model.Password);
    
    if (e.model.UploadedFileNames) {
      formData.append("File", e.model.UploadedFileNames);
    }
    
    // Example AJAX call (commented out for demo)
    /*
    fetch("/api/submit", {
      method: "POST",
      body: formData
    }).then(response => {
      if (response.ok) {
        validationSuccess.html("<div class='k-messagebox k-messagebox-success'>Form submitted successfully!</div>");
      }
    });
    */
    
    // For demo
    validationSuccess.html("<div class='k-messagebox k-messagebox-success'>Form data is valid!</div>");
  }
});
```

## Limitations

- The Upload editor in Form supports only synchronous mode.
- Server-side handling must be implemented to process the uploaded files.
- The file contents are available only when the form is submitted.

## Browser Support

The Upload editor in Form supports the same browsers as the standard Kendo UI Upload component.  
For detailed information about browser compatibility, refer to the [Upload Browser Support documentation]({% slug browsersupport_upload_widget %}).

## See Also


- [Form Component API Reference](/api/javascript/ui/form)
- [Upload Component API Reference](/api/javascript/ui/upload)
- [Form Demo Examples](https://demos.telerik.com/kendo-ui/form/index)
- [Upload Validation]({% slug validation_upload_widget %})
