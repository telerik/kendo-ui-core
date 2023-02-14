---
title: Serialize Form Data during Async Upload
page_title: Serialize Form Data during Async Upload 
description: "Learn how to serialize form data with the Kendo UI Upload widget."
slug: howto_serialize_form_data_upload
previous_url: /controls/editors/upload/how-to/serialize-form-data
tags: telerik, kendo, jquery, upload, serialize, form, data, during, async, upload
component: upload
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Upload for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I include a collection of form fields as [metadata]({% slug metadata_upload_widget %}) during asynchronous uploads?

## Solution

The output from the commonly used [`jQuery.serializeArray`](https://api.jquery.com/serializeArray/) helper is not directly usable in the [`upload`](/api/javascript/ui/upload/events/upload) event and needs to be processed. The following example demonstrates how to achieve this.



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


