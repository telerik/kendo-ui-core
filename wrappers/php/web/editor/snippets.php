<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<?php
    $editor = new \Kendo\UI\Editor('editor');

    // declare snippets
    $signature = new \Kendo\UI\EditorToolItem();
    $signature->text("Signature")->value("<p>Regards,<br /> John Doe,<br /><a href='mailto:john.doe@example.com'>john.doe@example.com</a></p>");

    $onlineDemosLink = new \Kendo\UI\EditorToolItem();
    $onlineDemosLink->text("Kendo online demos")->value("<a href='http://demos.kendoui.com'>Kendo online demos</a> ");

    // add snippets to insertHtml tool
    $insertHtml = new \Kendo\UI\EditorTool();
    $insertHtml->name("insertHtml");
    $insertHtml->addItem($signature, $onlineDemosLink);

    $editor->addTool($insertHtml);

    $editor
        ->attr('style', 'width:740px;height:440px')
        ->content('Put the cursor after this text and use the "Insert HTML" tool. ');

    echo $editor->render();
?>

<?php require_once '../../include/footer.php'; ?>

