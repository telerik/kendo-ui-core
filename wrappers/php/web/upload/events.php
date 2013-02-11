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
        This example shows how to handle events triggered by kendoUpload.
    </p>
</div>
<div style="width:45%">
<?php
$upload = new \Kendo\UI\Upload('files[]');
$upload->async(array(
        'saveUrl' => 'async.php?type=save',
        'removeUrl' => 'async.php?type=remove',
        'autoUpload' => true
    ))
     ->select('onSelect')
     ->upload('onUpload')
     ->success('onSuccess')
     ->error('onError')
     ->complete('onComplete')
     ->remove('onRemove')
     ->progress('onProgress');

echo $upload->render();
?>
</div>
<script>
    function onSelect(e) {
        kendoConsole.log("Select :: " + getFileInfo(e));
    }

    function onUpload(e) {
        kendoConsole.log("Upload :: " + getFileInfo(e));
    }

    function onSuccess(e) {
        kendoConsole.log("Success (" + e.operation + ") :: " + getFileInfo(e));
    }

    function onError(e) {
        kendoConsole.log("Error (" + e.operation + ") :: " + getFileInfo(e));
    }

    function onComplete(e) {
        kendoConsole.log("Complete");
    }

    function onCancel(e) {
        kendoConsole.log("Cancel :: " + getFileInfo(e));
    }

    function onRemove(e) {
        kendoConsole.log("Remove :: " + getFileInfo(e));
    }

    function onProgress(e) {
        kendoConsole.log("Upload progress :: " + e.percentComplete + "% :: " + getFileInfo(e));
    }

    function getFileInfo(e) {
        return $.map(e.files, function(file) {
            var info = file.name;

            // File size is not available in all browsers
            if (file.size > 0) {
                info  += " (" + Math.ceil(file.size / 1024) + " KB)";
            }
            return info;
        }).join(", ");
    }
</script>
<div class="console"></div>
<?php require_once '../../include/footer.php'; ?>
