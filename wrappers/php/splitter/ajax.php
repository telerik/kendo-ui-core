<?php

require_once '../include/header.php';
require_once '../lib/Kendo/Autoload.php';

?>

<?php
    $splitter = new \Kendo\UI\Splitter('splitter');

    $leftPane = new \Kendo\UI\SplitterPane();
    $leftPane->contentUrl('../content/web/splitter/ajax/ajaxContent1.html');
    $splitter->addPane($leftPane);

    $rightPane = new \Kendo\UI\SplitterPane();
    $rightPane->contentUrl('../content/web/splitter/ajax/ajaxContent2.html');
    $splitter->addPane($rightPane);

    echo $splitter->render();
?>

<?php require_once '../include/footer.php'; ?>
