---
title: Overview
page_title: How to use the Upload PHP class, server-side wrapper for Kendo UI Upload widget
description: Learn how to bind Kendo UI Upload for PHP, handle Kendo UI Upload Events, access an existing upload.
---

# Upload

The Kendo Upload for PHP is a server-side wrapper for the [Kendo UI Upload](/api/web/upload) widget.

## Getting Started

The Upload supports two main modes:

* [sync](/php/widgets/upload/modes#sync) - files are uploaded when the form is submitted
* [async](/php/widgets/upload/modes#async) - files are uploaded out-of-band using AJAX requests

Here is how to configure the Upload for asynchronous operation:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
2. Create an [upload](/api/wrappers/php/Kendo/UI/Upload), configure its [async](/api/wrappers/php/Kendo/UI/Upload#async) options

        <?php
        $upload = new \Kendo\UI\Upload('files[]');
        $upload->async(array(
                'saveUrl' => 'save.php'
        ));
        ?>
3. Output the upload by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $upload->render();
        ?>
4. Create the "save.php" handler.

        <?php
        $files = $_FILES['files'];
        // Save the uploaded files
        for ($index = 0; $index < count($files['name']); $index++) {
            $file = $files['tmp_name'][$index];
            if (is_uploaded_file($file)) {
                move_uploaded_file($file, './' . $files['name'][$index]);
            }
        }
        ?>

## Getting Client-side Reference

You can reference the client-side Kendo Upload instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/upload#methods) to control its behavior.


### Example

    <?php
    $upload = new \Kendo\UI\Upload('upload');
    echo $upload->render();
    ?>
    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the upload
        var upload = $("#upload").data("kendoUpload")
    });
    </script>

## Handling Events

You can subscribe to all upload [events](/api/web/upload#events).

### Example - subscribing by specifying JavaScript function name

    <?php
    $upload = new \Kendo\UI\Upload('upload');

    // The 'upload_select' JavaScript function will handle the 'select' event of the upload
    $upload->select('upload_select');

    echo $upload->render();
    ?>
    <script>
    function upload_select() {
        // Handle the select event
    }
    </script>

### Example - providing inline JavaScript code

    <?php
    $upload = new \Kendo\UI\Upload('upload');

    // Provide inline JavaScript code that will handle the 'select' event of the upload
    $upload->select('function() { /* Handle the select event */ }');

    echo $upload->render();
    ?>
