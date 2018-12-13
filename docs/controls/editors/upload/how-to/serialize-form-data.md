---
title: Serialize Form Data during Async Upload
page_title: Serialize Form Data during Async Upload | Kendo UI Upload
description: "Learn how to serialize form data with the Kendo UI Upload widget."
slug: howto_serialize_form_data_upload
---

# Serialize Form Data during Async Upload

Your project might require you to include a collection of form fields as [metadata]({% slug metadata_upload_widget %}) during asynchronous uploads.

The output from the commonly used [`jQuery.serializeArray`](http://api.jquery.com/serializeArray/) helper is not directly usable in the [`upload`](/api/javascript/ui/upload/events/upload) event and needs to be processed. The following example demonstrates how to achieve this.

###### Example

```dojo
    <form id="form"/>
      <input type="text" name="name1" value="value1" />
      <input type="text" name="name2" value="value2" />
    </form>

    <input type="file" id="files" />

    <script>
      $('#files').kendoUpload({
        async: {
            saveUrl:'placeholder'
        },
        upload: function (e) {
          var data = {};
          var form = $('#form').serializeArray();

          $.each(form, function() {
              data[this.name] = this.value;
          });

          e.data = data;
        }
      });
    </script>
```

The network request is expected to look like the one shown below.

###### Example

```
------WebKitFormBoundaryXLTaUOP1FzKWJJlD
Content-Disposition: form-data; name="name1"

value1
------WebKitFormBoundaryXLTaUOP1FzKWJJlD
Content-Disposition: form-data; name="name2"

value2
------WebKitFormBoundaryXLTaUOP1FzKWJJlD
Content-Disposition: form-data; name=""; filename="filename.txt"
Content-Type: text/plain


------WebKitFormBoundaryXLTaUOP1FzKWJJlD--
```


## See Also

* [JavaScript API Reference of the Upload](/api/javascript/ui/upload)
* [Modes of Operation]({% slug modes_upload_widget %})
* [Metadata]({% slug metadata_upload_widget %})

For more runnable examples on the Kendo UI Upload widget, browse its [**How To** documentation folder]({% slug howto_add_image_preview %}).
