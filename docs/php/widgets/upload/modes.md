---
title: Modes
page_title: How to configure the upload mode of the Kendo UI Upload widget
description: Learn how to use the synchronous and asynchronous modes of Kendo UI Upload for PHP, handle save and remove requests.
---

# Upload

The Upload supports two modes of operation - synchronous and asynchronous.

This help topic explains how to use these modes with PHP.
Please review the main [Upload Modes](/web/upload/modes) help topic for general information.

## Synchronous mode

In this mode the upload is executed as part of the form submit (synchronously). No dedicated action methods are required.

1. Add a form declaration and set a controller action.

        <form method="post" action="form-action.php">
        </form>

2. Add the Upload inside the form. The only required setting is a Name.

        <?php
        $upload = new \Kendo\UI\Upload('upload');
        echo $upload->render();
        ?>

3. Add a submit and reset buttons to the form.

        <input type="submit" value="Send" class="t-button" />
        <input type="reset" value="Reset" class="t-button" />

4. The form should look like this:

        <form method="post" action="<c:url value='/web/upload/' />">
            <?php
            $upload = new \Kendo\UI\Upload('upload');
            echo $upload->render();
            ?>
            <input type="submit" value="Send" class="t-button" />
            <input type="reset" value="Reset" class="t-button" />
        </form>

5. Process the files in "form-action.php". This requires no special server handling compared to a regular input.

        <?php
        // Check if any files are uploaded
        if (isset($_FILES['files'])) {
            $files = $_FILES['files'];
            $count = count($files['name']);

            for ($index = 0; $index < $count; $index++) {
                // Save the uploaded files
                $file = $files['tmp_name'][$index];
                if (is_uploaded_file($file)) {
                    move_uploaded_file($file, './' . $files['name'][$index]);
                }
        ?>

## Asynchronous mode

In this mode the files are uploaded to a handler without interrupting the user interaction with the page.

### Save handler

1.  Add the upload to the page:

        <?php
        $upload = new \Kendo\UI\Upload('files[]');
        $upload->async(array(
                'saveUrl' => 'save.php'
        ));
        ?>

The name attribute is required and must be unique. It will be used as a form field name in the requests to the server.

Each request may contain multiple files hence the array-like syntax.

2. Implement the Save handler (save.php):

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

### Remove handler

Users can remove files even after they've been uploaded asynchronously. To enable this feature you need a Remove action.

1. Specify a Remove action

        <?php
        $upload = new \Kendo\UI\Upload('files[]');
        $upload->async(array(
                'saveUrl' => 'save.php',
                'removeUrl' => 'remove.php',
                'removeField' => 'fileNames[]'
        ));
        ?>

2. Implement the Remove handler (remove.php):

        $fileNames = $_POST['fileNames'];
        // Delete uploaded files
        for ($index = 0; $index < count($fileNames); $index++) {
            unlink('./' . $fileNames[$index]);
        }

> The Remove action can be used as an attack vector if implemented poorly. Always sanitize the file names and verify that the user has the appropriate permissions before actually deleting any files.

### Disabling automatic upload

The selected files will be uploaded immediately by default. You can change this behavior by setting autoUpload to false.

        <?php
        $upload = new \Kendo\UI\Upload('files[]');
        $upload->async(array(
                'saveUrl' => 'save.php',
                'removeUrl' => 'remove.php',
                'removeField' => 'fileNames[]',
                'autoUpload' => false
        ));
        ?>

