<?php
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $type = $_GET['type'];


    if ($type == 'save') {
        $files = $_FILES['files'];
        // save the files
    } else if ($type == 'remove') {
        $fileNames = $_POST['fileNames'];
        // delete the files
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
        'autoUpload' => true
       ));

echo $upload->render();
?>
</div>
<?php require_once '../../include/footer.php'; ?>
