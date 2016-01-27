---
title: Serialize Form Data
page_title: Serialize Form Data During Async Upload | Kendo UI Upload Widget
description: "Learn how to serialize form data with a Kendo Upload"
slug: howto_serialize_form_data_upload
---

# Serialize Form Data During Async Upload

It can be desirable to include a collection of form fields as [Metadata]({% slug metadata_upload_widget %}) during asynchronous uploads.

The output from the commonly used [jQuery.serializeArray](http://api.jquery.com/serializeArray/) helper is not usable directly in the [upload event](/api/javascript/ui/upload#events-upload) and needs to be processed as illustrated below.

###### Example - Serialize form data for async upload

```html
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

The network request will look like:
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

Other articles on Kendo UI Upload:

* [Upload JavaScript API Reference](/api/javascript/ui/upload)
* [Modes of Operation]({% slug modes_upload_widget %})
* [Metadata]({% slug metadata_upload_widget %})
