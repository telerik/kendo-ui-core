---
title: Integrate an ImageEditor in the Editor Component
description: "An example on how to use the ImageEditor to edit images in the Kendo UI for jQuery Editor."
type: how-to
page_title: Integrate an ImageEditor to Edit Images in the Editor
slug: editor-imageeditor-intergration
tags: kendo, jquery, editor, imageeditor, integration, image editing
ticketid: 1534294
res_type: kb
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI for jQuery Editor</td>
 </tr>
</table>


## Description

Can I integrate an ImageEditor in the Kendo UI for jQuery Editor component to edit images?

## Solution

To achieve the desired scenario: 

1. First, place the ImageEditor in a popup, for example, a [Kendo UI for jQuery Window](https://docs.telerik.com/kendo-ui/api/javascript/ui/window) which is initially closed. 

1. Next, define a Kendo UI for jQuery ContextMenu that opens when right-clicking an image.

1. Finally, open the Window containing the ImageEditor and load the image in it.

```dojo
     <div id="example">
      <div id="dialog">

        <div id="imageeditor"></div>
        <div class="window-footer">
          <button type="button" class="k-button">Close</button>
          <button type="button" class="k-primary k-button">Save changes</button>
        </div>
      </div>

      <ul id="menu">
        <li>
          Edit Image
        </li>
      </ul>
      <div class="demo-section k-content wide">
        <textarea id="editor" rows="10" cols="30" style="width:90%; height:470px" aria-label="editor">
          &lt;br /&gt;
          &lt;p style="text-align:center;"&gt;
          &lt;span style="font-family:Verdana, Geneva, sans-serif;font-size:large;"&gt;&lt;strong&gt;One of the Most Beautiful Islands on Earth - Tenerife&lt;/strong&gt;
          &lt;/span&gt;
          &lt;/p&gt;
          &lt;p&gt;
          &lt;span style="font-family:Verdana, Geneva, sans-serif;font-size:medium;"&gt;&lt;strong&gt;Overview&lt;/strong&gt;
          &lt;/span&gt;
          &lt;/p&gt;
          &lt;p style="font-size: small;"&gt;
          &lt;strong&gt;Tenerife &lt;/strong&gt;is the largest and most populated island of the eight &lt;a href="https://en.wikipedia.org/wiki/Canary_Islands" target="_blank"&gt;Canary Islands&lt;/a&gt;. It is also the most populated island of &lt;strong&gt;Spain&lt;/strong&gt;, with a land area of 2,034.38 square kilometers (785 sq mi) and 904,713 inhabitants, 43% of the total population of the &lt;strong&gt;Canary Islands&lt;/strong&gt;.&amp;nbsp;The archipelago's beaches, climate and important natural attractions, make it a major tourist destination with over 12 million visitors per year.
          &lt;/p&gt;
          &lt;br /&gt;
          &lt;img src="https://demos.telerik.com/kendo-ui/content/web/editor/tenerife.png" style="float: right;" alt="" width="350" height="206" /&gt;

          &lt;p&gt;&lt;span style="font-family:Verdana, Geneva, sans-serif;font-size:medium;"&gt;
          &lt;strong&gt;Trip Highlights in Tenerife&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;&lt;span style="white-space:pre;"&gt;&lt;/span&gt;
          &lt;ul&gt;
          &lt;li&gt;
          &lt;strong style="color: rgb(0,80,5);"&gt;Trip to Loro Parque &lt;/strong&gt; &lt;br /&gt; Out top tip is to visit the famous &lt;em&gt;Loro Parque&lt;/em&gt; or 'Loro Park. It is a 13.5-hectare zoo on the outskirts of Puerto de la Cruz on Tenerife, Spain where it houses an extensive and diverse reserve of animal and plant species. 
          &lt;br /&gt;
          &lt;br /&gt;
          &lt;/li&gt;
          &lt;li&gt;
          &lt;strong&gt;&lt;span style="color: rgb(46,125,50);"&gt;Whale and Dolphin Watching Tour&amp;nbsp;&lt;br /&gt;&lt;/span&gt;&lt;/strong&gt; Another great option is to take boat excursion with almost guaranteed sightings of whales and dolphins. This is a day-long trip that includes lunch, island visits, fishing, and amazing views of ocean sceneries.
          &lt;br /&gt;
          &lt;br /&gt;
          &lt;/li&gt;
          &lt;li&gt;
          &lt;strong&gt;&lt;span style="color: rgb(96,173,94);"&gt;Teide National Park Stargazing&lt;/span&gt;&lt;/strong&gt;&lt;br /&gt;Last, but not least you can take a stargaze trip to Teide National Park, the 3rd best place in the world to view stars and described by NASA as a window to the universe.
          &lt;br /&gt;
          &lt;/li&gt;
          &lt;/ul&gt;
        </textarea>
        <script>
          $(document).ready(function () {
            function toDataURL(url, callback) {
              var xhr = new XMLHttpRequest();
              xhr.onload = function() {
                var reader = new FileReader();
                reader.onloadend = function() {
                  callback(reader.result);
                }
                reader.readAsDataURL(xhr.response);
              };
              xhr.open('GET', url);
              xhr.responseType = 'blob';
              xhr.send();
            }

            //var base64 = getBase64Image(document.getElementById("imageid"));
            var imageUrl;
            var img;
            var dialog = $("#dialog").kendoWindow({
              width:1000,
              height:1000,
              visible:false,
              modal:true,
              open:function(){
                var imgEditor = $("#imageeditor").data("kendoImageEditor");
                toDataURL(imageUrl, function(dataUrl){
                  $("#imageeditor").data("kendoImageEditor").drawImage(imageUrl).done(function (image) {
                    $(image).attr("src", dataUrl);
                    $("#imageeditor").data("kendoImageEditor").drawCanvas(image);
                  })
                })


              }
            }).data("kendoWindow");
            $("#imageeditor").kendoImageEditor();
            // create Editor from textarea HTML element with default set of tools
            $("#editor").kendoEditor();
            var editor = $("#editor").data("kendoEditor");
            $("#menu").kendoContextMenu({
              target:$(editor.body),
              filter: "img",
              animation: {
                open: { effects: "fadeIn" },
                duration: 500
              },
              open:function(e){
                img = e.target;
                imageUrl = $(e.target).attr("src");
              },
              select: function(e) {
                $("#dialog").data("kendoWindow").center().open();
              }
            });
            $(".k-primary").click(function(){
              var imageEditor = $("#imageeditor").data("kendoImageEditor");
              var image = imageEditor.getCurrentImage();
              var imageBase64 = $(image).attr("src");
              dialog.close();
              $(img).attr("src", imageBase64);
            })
          });
        </script>
        <style>
          .window-footer{
            position: absolute;
            bottom: 0;
            display: block;
            width: 95%;
            margin-top: 150px;
            padding: 19px 0 20px;
            text-align: right;
            border-top: 1px solid #e5e5e5;
          }
        </style>
      </div>
    </div>

```

## See Also

* [Kendo UI for jQuery Editor API Reference](/api/javascript/ui/editor)
* [Common Issues in Kendo UI for jQuery]({% slug troubleshooting_common_issues_kendoui %})