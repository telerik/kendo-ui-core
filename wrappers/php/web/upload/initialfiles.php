<?php
require_once '../../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $type = $_GET['type'];
    $currentInitialFiles = isset($_COOKIE['initialFiles']) ? unserialize($_COOKIE['initialFiles']) : array();

    if ($type == 'save') {
        $files = $_FILES['files'];

        for ($index = 0; $index < count($files['name']); $index++) {
            $current_file['name'] = $files['name'][$index];
            $current_file['extension'] = pathinfo($files['name'][$index], PATHINFO_EXTENSION);
            $current_file['size'] = $files['size'][$index];
            $currentInitialFiles[] = $current_file;
        }
        
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

        foreach ($fileNames as $fileName) {
            for ($i=0; $i < count($currentInitialFiles); $i++) { 
                if ($currentInitialFiles[$i]['name'] == $fileName) {
                    unset($currentInitialFiles[$i]);
                    break;
                }
            }
        }

        $currentInitialFiles = array_values($currentInitialFiles);

        // Delete uploaded files
        /*
        for ($index = 0; $index < count($fileNames); $index++) {
            unlink('./' . $fileNames[$index]);
        }
        */
    }

    setcookie('initialFiles', serialize($currentInitialFiles), time() + (60 * 60 * 6));

    // Return an empty string to signify success
    echo '';

    exit;
}
require_once '../../include/header.php';
?>
<div class="configuration k-widget k-header" style="width: 300px">
    <span class="infoHead">Information</span>
    <p>
        This example show how to persist the successfully uploaded files
        in the list and display them again when the page is reloaded.
    </p>
    <p>
        Please upload some files and refresh the page.
    </p>
</div>

<div style="width:45%">
<?php

$upload = new \Kendo\UI\Upload('files[]');
$upload->async(array(
        'saveUrl' => 'initialfiles.php?type=save',
        'removeUrl' => 'initialfiles.php?type=remove',
        'autoUpload' => true,
        'removeField' => 'fileNames[]'
       ));

$initialFiles = isset($_COOKIE['initialFiles']) ? unserialize($_COOKIE['initialFiles']) : array();
$upload->files($initialFiles);

echo $upload->render();
?>
</div>

<?php require_once '../../include/footer.php'; ?>
