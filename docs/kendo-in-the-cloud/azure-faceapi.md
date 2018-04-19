---
title: Integrating Kendo UI with Azure Face API
page_title: Azure Face API Integration with Kendo UI Widgets | Kendo UI in the Cloud
description: "Learn how to upload images and cosume the returned data from Azure Face API."
slug: azure_faceapi
position: 2
---

# Integrating Kendo UI with Azure Face API

The Kendo UI widgets can be seamlessly itegrated with a cognitive service such as [Azure Face API](https://azure.microsoft.com/en-us/services/cognitive-services/face/). The cloud-based Face API provides access to a set of advanced face algorithms, that enable developers to detect and identify faces in images.

## Send files directly to Face API with Kendo UI Upload

The below example demonstrates how files can be sent directly to the Azure Face API by using [the Kendo Upload's useArrayBuffer configuration option](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/configuration/async.usearraybuffer). In this way, the file is read with FileReader and the buffer data is then sent to the cloud service. In turn, the Face API analyzes the image, detects available faces and returns data in JSON format.

### Configuration

1. Create HTML markup for initializing an Upload widget, an image tag for displaying the uploaded image and a textarea that will be used to display the received data from the Face API:

    ```
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Kendo UI and Azure Face API Integration</title>

      <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2018.1.221/styles/kendo.common.min.css">
      <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2018.1.221/styles/kendo.rtl.min.css">
      <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2018.1.221/styles/kendo.default.min.css">
      <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2018.1.221/styles/kendo.mobile.all.min.css">

      <script src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
      <script src="https://kendo.cdn.telerik.com/2018.1.221/js/angular.min.js"></script>
      <script src="https://kendo.cdn.telerik.com/2018.1.221/js/jszip.min.js"></script>
      <script src="https://kendo.cdn.telerik.com/2018.1.221/js/kendo.all.min.js"></script>

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

2. To successfully authenticate with the Face API service, peform the following simple steps:

    * Copy the below template.
    * Replace the `subscriptionKey` value with your valid subscription key that is obtained from Azure.
    * Change the `uriBase` value to use the location where you obtained your subscription keys.

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

## Breakdown of the above implementation

1. The first step is to initialize an async Kendo UI Upload by also passing the base service URL with the required [Face API parameters](https://westcentralus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236) and also configuring the [`useArrayBuffer`](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/configuration/async.usearraybuffer) and [`withCredentials`](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/configuration/async.withcredentials) in order to send the uploaded file directly to the Azure Face API.

2. Next, to authenticate with the API, the `Content-Type` and `Ocp-Apim-Subscription-Key` headers have to be sent with the request. This is achieved through [the Upload's upload event](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/events/upload):
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

3. When the upload is successfully completed, the data from the Face API is received in JSON format. Then [the Upload's success event](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/events/success) is used to display the data and the image:
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

4. The received data from the Face API is based on the parameters that are initially passed to the service and returns recognized faces coordinates, gender, age, emotion and other face attirubutes:
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
* [Overview of the Upload widget](https://docs.telerik.com/kendo-ui/controls/editors/upload/overview)
* [Upload widget API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload)
* [Consuming Data from Azure Functions]({% slug azure_functions %})
* [Consuming Data from Amazon DynamoDB]({% slug aws_dynamodb %})
