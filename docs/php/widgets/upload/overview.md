---
title: Overview
page_title: Overview | Upload PHP Class
description: "Get started with the Upload PHP class in Kendo UI."
slug: overview_upload_uiforphp
position: 1
---

# Upload PHP Class Overview

The Upload JSP tag is a server-side wrapper for the [Kendo UI Upload](/api/javascript/ui/upload) widget.

## Getting Started

### Modes of Operation

The Upload supports two main modes of operation:

* [Sync](/php/widgets/upload/modes#sync)&mdash;During the synchronous mode files are uploaded when the form is submitted.
* [Async](/php/widgets/upload/modes#async)&mdash;During the asynchronous mode files are uploaded out-of-band using AJAX requests.

### Configuration

Below are listed the steps for you to follow when configuring the Upload for asynchronous operations.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create an [Upload](/api/php/Kendo/UI/Upload) and configure its [`async`](/api/php/Kendo/UI/Upload#async) options.

###### Example

        <?php
        $upload = new \Kendo\UI\Upload('files[]');
        $upload->async(array(
                'saveUrl' => 'save.php'
        ));
        ?>

**Step 3** Output the Upload by echoing the result of the `render` method.

###### Example

        <?php
        echo $upload->render();
        ?>

**Step 4** Create the `save.php` handler.

###### Example

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

<!--_-->
### Event Handling

You can subscribe to all Upload [events](/api/javascript/ui/upload#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example


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

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

        <?php
        $upload = new \Kendo\UI\Upload('upload');

        // Provide inline JavaScript code that will handle the 'select' event of the upload
        $upload->select('function() { /* Handle the select event */ }');

        echo $upload->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing Upload instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Upload API](/api/javascript/ui/upload#methods) to control its behavior.

###### Example

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

## See Also

Other articles on Telerik UI for PHP and on the Upload:

* [Modes of Operation of the Upload PHP Class]({% slug modesofoperation_upload_uiforphp %})
* [Overview of the Kendo UI Upload Widget]({% slug overview_kendoui_upload_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
