---
title: Upload Files and Select Additional Metadata
page_title: Upload Files and Select Additional Metadata | Kendo UI Upload
description: "Learn how to upload files and select additional metadata with the Kendo UI Upload widget."
slug: howto_select_additional_metadata_upload
---

# Upload Files and Select Additional Metadata

The example demonstrates how to upload files and select additional metadata using the Kendo UI Upload widget.

###### Example

```html
<div id="example">
          <h3>Upload files and select additional metadata</h3>
            <div class="demo-section k-header">
                <input type="file" name="files" id="files" />
            </div>

            <script id="fileTemplate" type="text/x-kendo-template">
                <span class='k-progress'></span>
                <div class='file-wrapper'>
                    <h4 class='file-heading file-name-heading'>Name: #=name#</h4>
                    <h4 class='file-heading file-size-heading'>Size: #=size# bytes</h4>
                    <h4 class='file-heading'>Uploaded by:</h4>
                    <select class="info">
                        <option>Developer</option>
                        <option>Support</option>
                        <option>QA</option>
                        <option>HR</option>
                    </select>
                    <button type='button' class='k-upload-action'></button>
                </div>
            </script>

            <script>
                $(document).ready(function () {
                    $("#files").kendoUpload({
                        multiple: true,
                        async: {
                            saveUrl: "save",
                            removeUrl: "remove",
                            autoUpload: false
                        },
                        template: kendo.template($('#fileTemplate').html()),
                      	select: onSelect,
                    	  upload: onUpload
                    });
                });

                function onSelect(e){
                  var upload = this;
                  var files = e.files;

                  setTimeout(function(){
                  	for(var i = 0; i < files.length; i++){
                      var select = upload.wrapper.find(".k-file[data-uid='" + files[i].uid +"'] select");
                      select.kendoDropDownList();
                    }
                  });
                }

              function onUpload(e){
              	var upload = this;
                var dropdown = upload.wrapper.find(".k-file[data-uid='" + e.files[0].uid +"'] select").data("kendoDropDownList");

                e.data = {
                    uploader: dropdown.value()
                };
              }
            </script>

            <style scoped>
			  html {
				font-size: 12px;
				font-family: Arial, Helvetica, sans-serif;
			  }

              #example {
              	width: 800px;
              }

                #example .file-heading
                {
                    font-family: Arial;
                    font-size: 1.1em;
                    display: inline-block;
                    float: left;
                    margin: 0 20px 0 20px;
                    height: 25px;
                    -ms-text-overflow: ellipsis;
                    -o-text-overflow: ellipsis;
                    text-overflow: ellipsis;
                    overflow:hidden;
                    white-space:nowrap;
                }

                    #example .file-name-heading
                    {
                        font-weight: bold;
                    }

                     #example .file-size-heading
                    {
                        font-weight: normal;
                        font-style: italic;
                    }

                li.k-file .file-wrapper .k-upload-action
                {
                    position: absolute;
                    top: 0;
                    right: 0;
                }

                li.k-file div.file-wrapper
                {
                    position: relative;
                    height: 33px;
                }
            </style>
        </div>


    </script>
```
## See Also

Other articles on the Kendo UI Upload:

* [Upload JavaScript API Reference](/api/javascript/ui/upload)
* [Modes of Operation]({% slug modes_upload_widget %})
* [Metadata]({% slug metadata_upload_widget %})

For more runnable examples on the Kendo UI Upload widget, browse its [**How To** documentation folder]({% slug howto_remove_files_with_errors %}).
