---
title: Azure Face API
page_title: Azure Face API | Kendo UI in the Cloud
description: "Learn how to upload images and consume the returned data from Azure Face API when working with Kendo UI."
slug: azure_faceapi
position: 2
---

# Azure Face API

This article provides a sep-by-step tutorial on how to configure the Kendo UI Upload to send images directly to [the Azure Face API](https://azure.microsoft.com/en-us/services/cognitive-services/face/) and then consume the received data from the service.

The complete implementation of the template is available in [the Kendo UI Cloud Integration repository on GitHub](https://github.com/telerik/kendo-cloud-integration/tree/master/AzureFaceAPI).

## Prerequisites

You can seamlessly integrate Kendo UI widgets with a cognitive service such as [Azure Face API](https://azure.microsoft.com/en-us/services/cognitive-services/face/). The cloud-based Face API provides access to a set of advanced face algorithms which enable the detection and identification of faces in images.

* [Create an Azure Account](https://azure.microsoft.com/en-us/services/cognitive-services/face/).

## Sending Files Directly to Face API with the Upload

The following example demonstrates how to send files directly to Azure Face API by using the [`useArrayBuffer`](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/configuration/async.usearraybuffer) configuration option of the Upload. This approach enables the file reading with `FileReader` and the sending of buffer data to the cloud service afterwards. In turn, the Face API analyzes the image, detects the available faces, and returns data in a JSON format.

### Configuration

1. Create the HTML markup for initializing the Upload widget, an image tag for displaying the uploaded image, and a text area that will be used to display the received data from the Face API.

    ```
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Kendo UI and Azure Face API Integration</title>

      <link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{site.cdnVersion}}/styles/kendo.common.min.css">
      <link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{site.cdnVersion}}/styles/kendo.default.min.css">

      <script src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
      <script src="https://kendo.cdn.telerik.com/{{site.cdnVersion}}/js/jszip.min.js"></script>
      <script src="https://kendo.cdn.telerik.com/{{site.cdnVersion}}/js/kendo.all.min.js"></script>

    </head>
    <body>
    	<h1 class="text-center text-primary">Integrating Kendo UI with Azure FaceAPI </h1>
    	<div class="row">
    		<input name="files" id="files" type="file" />
    	</div>
    	<div class="main-content row">
    		<div class="col-xs-12 col-md-6">
    			<h4 class="text-center">Image Preview:</h4>
    			<div id="imageContainer">
    				<img id="imagePreview" />
    			</div>
    		</div>
    		<div class="col-xs-12 col-md-6">
    			<h4 class="text-center">FaceAPI Response Data:</h4>
    			<textarea id="apiResponseData" class="k-textbox"></textarea>
    		</div>
        </div>
    </body>
    </html>
    ```

2. To successfully authenticate with the Face API service:

    1. Copy the following template.
    1. Replace the `subscriptionKey` value with your valid subscription key that is obtained from Azure.
    1. Change the `uriBase` value to use the location where you obtained your subscription keys.

    ```js
    <script>
        $(document).ready(function () {
            var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
            var params = {
                "returnFaceId": "true",
                "returnFaceLandmarks": "false",
                "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
            };
            var saveUrl = uriBase + "?" + $.param(params);

            $("#files").kendoUpload({
                async: {
                    saveUrl: saveUrl,
                    withCredentials: false,
                    useArrayBuffer: true
                },
                multiple: false
                success: onSuccess,
                upload: onUpload,
                showFileList: true,
                localization: {
                    select: "Select an image that contains a face"
                },
                validation: {
                    allowedExtensions: [".png", ".jpg"],
                    maxFileSize: 4194304
                }
            });

            function onUpload(e) {
                var xhr = e.XMLHttpRequest;

                if (xhr) {
                    xhr.addEventListener("readystatechange", function (e) {
                        if (xhr.readyState == 1) {
                            xhr.setRequestHeader("Content-Type", "application/octet-stream");
                            xhr.setRequestHeader("Ocp-Apim-Subscription-Key", "subscriptionKey");
                        }
                    });
                }
            }

            function onSuccess(e) {
                var upload = e.sender;
                var faceApiData = e.response;
                var fileData = e.files[0].rawFile;

                displayImage(fileData, "#imagePreview");
                $("#apiResponseData").val(JSON.stringify(faceApiData, null, 2));
            }

            function displayImage(file, containerId) {
                var fileReader = new FileReader();

                fileReader.onload = function (event) {
                    var image = event.target.result;
                    var containerElement = $(containerId);

                    containerElement.attr('src', image);
                }
                fileReader.readAsDataURL(file);
            }
        });
    </script>
    ```

## Breakdown of the Sample Implementation

1. The first step is to initialize an async Kendo UI Upload by also passing the base service URL with the required [Face API parameters](https://westcentralus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236). Then, you need to configure the [`useArrayBuffer`](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/configuration/async.usearraybuffer) and [`withCredentials`](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/configuration/async.withcredentials) to send the uploaded file directly to the Azure Face API.

2. Next, to authenticate with the API, you have to send the `Content-Type` and `Ocp-Apim-Subscription-Key` headers with the request by utilizing [`upload`](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/events/upload) event of the Upload.

    ```js
    function onUpload(e) {
        var xhr = e.XMLHttpRequest;

        if (xhr) {
            xhr.addEventListener("readystatechange", function (e) {
                if (xhr.readyState == 1) {
                    xhr.setRequestHeader("Content-Type", "application/octet-stream");
                    xhr.setRequestHeader("Ocp-Apim-Subscription-Key", "subscriptionKey");
                }
            });
        }
    }
    ```

3. When the Upload is successfully completed, the data from the Face API is received in a JSON format. Then, you use the [`success`](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/events/success) event of the Upload to display the data and the image.

    ```js
    function onSuccess(e) {
        var upload = e.sender;
        var faceApiData = e.response;
        var fileData = e.files[0].rawFile;

        displayImage(fileData, "#imagePreview");
        $("#apiResponseData").val(JSON.stringify(faceApiData, null, 2));
    }

    function displayImage(file, containerId) {
        var fileReader = new FileReader();

        fileReader.onload = function (event) {
            var image = event.target.result;
            var containerElement = $(containerId);

            containerElement.attr('src', image);
        }
        fileReader.readAsDataURL(file);
    }
    ```

4. The received data from the Face API is based on the parameters that are initially passed to the service and returns the coordinates, gender, age, emotion, and other face attributes of the recognized faces.

    ```json
    [
      {
        "faceId": "937f09d1-6476-4d14-b92b-c20641e84268",
        "faceRectangle": {
          "top": 68,
          "left": 63,
          "width": 101,
          "height": 101
        },
        "faceAttributes": {
          "smile": 0.008,
          "headPose": {
            "pitch": 0,
            "roll": -0.2,
            "yaw": -0.2
          }
        },
        ...
      }
    ]
    ```

## See Also

* [Overview of the Upload Widget](https://docs.telerik.com/kendo-ui/controls/editors/upload/overview)
* [API Reference of the Upload Widget](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload)
* [Consuming Data from Azure Functions]({% slug azure_functions %})
* [Binding to Azure Cosmos DB]({% slug azure_cosmos_db %})
* [Consuming Data from Amazon DynamoDB]({% slug aws_dynamodb %})
