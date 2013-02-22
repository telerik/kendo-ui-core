<?php
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $type = $_GET['type'];


    if ($type == 'save') {
        $files = $_FILES['files'];
        // Save the uploaded files
        /*
        for ($index = 0; $index < count($files['name']); $index++) {
            $file = $files['tmp_name'][$index];
            if (is_uploaded_file($file)) {
                move_uploaded_file($file, './' . $files['name'][$index]);
            }
        }
        */
    } else if ($type == 'remove') {
        $fileNames = $_POST['fileNames'];
        // Delete uploaded files
        /*
        for ($index = 0; $index < count($fileNames); $index++) {
            unlink('./' . $fileNames[$index]);
        }
        */
    }

    // Return an empty string to signify success
    echo '';

    exit;
}
require_once '../../include/header.php';
?>
<div class="configuration k-widget k-header" style="width: 300px">
    <span class="infoHead">Information</span>
    <p>
        The Upload is able to upload files out-of-band using the
        HTML5 File API with fallback for legacy browsers.
    </p>
    <p>
        You need to configure save action that will receive
        the uploaded files.
        An optional remove action is also available.
    </p>
</div>

<div style="width:45%">
<?php
$upload = new \Kendo\UI\Upload('files[]');
$upload->async(array(
        'saveUrl' => 'async.php?type=save',
        'removeUrl' => 'async.php?type=remove',
        'autoUpload' => true,
        'removeField' => 'fileNames[]'
       ));

echo $upload->render();
?>
</div>
<?php require_once '../../include/footer.php'; ?>
