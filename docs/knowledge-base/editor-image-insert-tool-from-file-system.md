---
title: Editor Enable Upload of Images From File System
description: Enable adding an image to the Editor by uploading it from the user's file system
type: how-to
page_title:  Editor Create an Image Insert Tool from File System 
slug: editor-image-insert-tool-from-file-system
tags: editor, image, insert, tool, file, system, upload
ticketid: 1174115
res_type: kb
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Editor for jQuery</td>
 </tr>
  <tr>
  <td>Product Version</td>
  <td>2021.2.616</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td> <a href="https://caniuse.com/?search=filereader">Review browser support</a></td>
 </tr>
</table>

## Description

How can I create a simpler Image Insert Tool that enables me to upload from my file system?

## Solution

### Create a custom tool

1. Create the custom [tool](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor/configuration/tools)
1. Define its [tool.exec](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor/configuration/tools.exec) function 
1. In the exec function create a file input element, click it programmatically and subscribe to its [change event](https://api.jquery.com/change/)
1. (Optional) Use CSS to style the custom **Insert Image From File System** tool with the desired [Kendo Icon](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web#list-of-font-icons)

### Handle the change event of the file input

1. If there are files in the input create a new [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
1. Subscribe to its [onload event](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload)
1. Read the contents of the file with the [FileReader.readAsDataURL()](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL) This also triggers the onload event.
1. Get ready to remove the file input to prevent memory leaks

### Handle the onload event of the FileReader

1. Get the Editor's data
1. Get the Base64-encoded data of the image from the content of the event
1. Create a new img element and set the image data as its source
1. Use the Editor's [paste method](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor/methods/paste) to insert the img element into its editable area
1. Remove the event handler from the file input element and then delete it from the DOM



```dojo

<div id="example">


    <textarea id="editor" rows="10" cols="30" style="width:100%;height:400px">
           
    </textarea>

</div>
<script>
        $("#editor").kendoEditor({
            tools: [
              	"bold",
              "insertImage",
                {
                    name: "myInsertImage",
                    tooltip: "Insert an image",
                    exec: function(e) {
                        
                      
                      
                      	var uploadInput = $("<input type='file' />");
                      	uploadInput.click();
                      	uploadInput.on("change", uploadInputChange);
                      	
     
                    }
                }
            ]
        });
      
      	function uploadInputChange (ev) {
          if (this.files && this.files[0]) {
            var reader = new FileReader();

            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
            window.UPLOAD_TO_DESTROY = this;
          }
        }
      
      	function imageIsLoaded (ev) {
          var editor = $("#editor").data("kendoEditor");
          var base64Src = ev.target.result;
          var img = $("<img src='" + base64Src + "' />")[0];

          editor.paste(img.outerHTML);
          img.remove();

          if (UPLOAD_TO_DESTROY) {
            $(UPLOAD_TO_DESTROY).off("change");
            $(UPLOAD_TO_DESTROY).remove();
            delete UPLOAD_TO_DESTROY;
          }
        }
    </script>
    <style>
        .k-i-my-insert-image:before {
        content: "\E501"
        }
    </style>

```
## Notes
 This article displays a general approach for adding an image from the user's file system in the Editor. There are further aspects of this functionality to be handled like validation of files, security issues, etc.

## See Also

[How to make a simple image upload using Javascript/Html StackOverflow article](https://stackoverflow.com/questions/22087076/how-to-make-a-simple-image-upload-using-javascript-html) 