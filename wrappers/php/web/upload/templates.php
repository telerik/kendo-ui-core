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

<?php
$upload = new \Kendo\UI\Upload('files[]');
$upload->async(array(
        'saveUrl' => 'async.php?type=save',
        'removeUrl' => 'async.php?type=remove',
        'autoUpload' => false,
        'removeField' => 'fileNames[]'
       ));

$upload->template(
	"<span class='k-progress'></span>".
    "<div class='file-wrapper'>".
        "<span class='file-icon #=addExtensionClass(files[0].extension)#'></span>".
        "<h4 class='file-heading file-name-heading'>Name: #=name#</h4>".
        "<h4 class='file-heading file-size-heading'>Size: #=size# bytes</h4>".
        "<button type='button' class='k-upload-action'></button>".
    "</div>"
);

echo $upload->render();
?>

<script>
	function addExtensionClass(extension) {
        switch (extension) {
            case '.jpg':
            case '.img':
            case '.png':
            case '.gif':
                return "img-file";
            case '.doc':
            case '.docx':
                return "doc-file";
            case '.xls':
            case '.xlsx':
                return "xls-file";
            case '.pdf':
                return "pdf-file";
            case '.zip':
            case '.rar':
                return "zip-file";
            default:
                return "default-file";
        }
    }
</script>

<style scoped>
    .file-icon
    {
        display: inline-block;
        float: left;
        width: 48px;
        height: 48px;
        margin-left: 10px;
        margin-top: 13.5px;
    }

    .img-file { background-image: url(../../content/web/upload/jpg.png) }
    .doc-file { background-image: url(../../content/web/upload/doc.png) }
    .pdf-file { background-image: url(../../content/web/upload/pdf.png) }
    .xls-file { background-image: url(../../content/web/upload/xls.png) }
    .zip-file { background-image: url(../../content/web/upload/zip.png) }
    .default-file { background-image: url(../../content/web/upload/default.png) }

    #example .file-heading
    {
        font-family: Arial;
        font-size: 1.1em;
        display: inline-block;
        float: left;
        width: 450px;
        margin: 0 0 0 20px;
        height: 25px;
        -ms-text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        overflow:hidden;
        white-space:nowrap;
    }

        #example .file-name-heading
        {
            font-weight: bold;
        }

         #example .file-size-heading
        {
            font-weight: normal;
            font-style: italic;
        }

    li.k-file .file-wrapper .k-upload-action
    {
        position: absolute;
        top: 0;
        right: 0;
    }

    li.k-file div.file-wrapper
    {
        position: relative;
        height: 75px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>