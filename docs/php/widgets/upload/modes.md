---
title: Modes of Operation
page_title: Modes of Operation | Upload PHP Class
description: "Use the synchronous and asynchronous operational modes of the Upload PHP class in Kendo UI."
slug: modesofoperation_upload_uiforphp
position: 2
---

# Modes of Operation

The Kendo UI Upload supports two modes of operation&mdash;synchronous and asynchronous. This article explains how to use these modes with the Spring MVC framework.

For general information, refer to the article on the [widget's modes of operation]({% slug modes_upload_widget %}).

## Synchronous Mode

In the synchronous mode, the Upload is executed as part of the form submit (synchronously). No dedicated action methods are required.

### Configuration

Below are listed the steps for you to follow when configuring the synchronous mode of operation for the Kendo UI Upload.

**Step 1** Add a `form` declaration and set a `controller` action.

###### Example

        <form method="post" action="form-action.php">
        </form>

**Step 2** Add the Upload inside the form. The only required setting is a `Name`.

###### Example

        <?php
        $upload = new \Kendo\UI\Upload('upload');
        echo $upload->render();
        ?>

**Step 3** Add a submit and reset buttons to the form.

###### Example

        <input type="submit" value="Send" class="t-button" />
        <input type="reset" value="Reset" class="t-button" />

**Step 4** The form should look like this.

###### Example

        <form method="post" action="<c:url value='/web/upload/' />">
            <?php
            $upload = new \Kendo\UI\Upload('upload');
            echo $upload->render();
            ?>
            <input type="submit" value="Send" class="t-button" />
            <input type="reset" value="Reset" class="t-button" />
        </form>

**Step 5** Process the files in `form-action.php`. This requires no special server handling compared to a regular input.

###### Example

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

<!--_-->
## Asynchronous Mode

In this mode the files are uploaded to a handler without interrupting the user interaction with the page.

### Save Handlers

Below are listed the steps for you to follow when configuring the saving of the handler in the asynchronous mode of operation of the Kendo UI Upload.

**Step 1** Add the Upload to the page.

###### Example

        <?php
        $upload = new \Kendo\UI\Upload('files[]');
        $upload->async(array(
                'saveUrl' => 'save.php'
        ));
        ?>

The `name` attribute is required and must be unique. It will be used as a `form` field name in the requests to the server. Each request may contain multiple files hence the array-like syntax.

**Step 2** Implement the Save handler (`save.php`).

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
### Remove Handlers

Users can remove files after they are uploaded asynchronously. To enable this feature, a `Remove` action is needed.

Below are listed the steps for you to follow when configuring the removing of the handler in the asynchronous mode of operation of the Kendo UI Upload.

**Step 1** Specify a `Remove` action.

###### Example

        <?php
        $upload = new \Kendo\UI\Upload('files[]');
        $upload->async(array(
                'saveUrl' => 'save.php',
                'removeUrl' => 'remove.php',
                'removeField' => 'fileNames[]'
        ));
        ?>

**Step 2** Implement the Remove handler (`remove.php`).

###### Example

        $fileNames = $_POST['fileNames'];
        // Delete uploaded files
        for ($index = 0; $index < count($fileNames); $index++) {
            unlink('./' . $fileNames[$index]);
        }

<!--_-->
> **Important**
>
> The `Remove` action can be used as an attack vector if implemented poorly. Always sanitize the file names and verify that the user has the appropriate permissions before actually deleting any files.

### Disable Automatic Uploads

The selected files are uploaded immediately by default. You can change this behavior by setting `AutoUpload` to `false`.

###### Example

        <?php
        $upload = new \Kendo\UI\Upload('files[]');
        $upload->async(array(
                'saveUrl' => 'save.php',
                'removeUrl' => 'remove.php',
                'removeField' => 'fileNames[]',
                'autoUpload' => false
        ));
        ?>

## See Also

Other articles on Telerik UI for PHP and on the Upload:

* [Overview of the Upload PHP Class]({% slug overview_upload_uiforphp %})
* [Overview of the Kendo UI Upload Widget]({% slug overview_kendoui_upload_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
