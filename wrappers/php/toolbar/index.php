<?php
require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

$toolbar = new \Kendo\UI\ToolBar('toolbar');

$toolbar->addItem(
    array("type" => "button", "text" => "Button"),
    array("type" => "button", "text" => "Toggle Button", "togglable" => true),
    array(
        "type" => "splitButton",
        "text" => "Insert",
        "menuButtons" => array(
            array("text" => "Insert above", "icon" => "insert-n"),
            array("text" => "Insert between", "icon" => "insert-m"),
            array("text" => "Insert below", "icon" => "insert-s")
        )
    ),
    array("type" => "separator"),
    array("template" => "<label>Format:</label>"),
    array("template" => "<input id='dropdown' style='width: 150px;' />", "overflow" => "never"),
    array("type" => "separator"),
    array(
        "type" => "buttonGroup",
        "buttons" => array(
            array("spriteCssClass" => "k-tool-icon k-justifyLeft", "text" => "Left", "togglable" => true, "group" => "text-align"),
            array("spriteCssClass" => "k-tool-icon k-justifyCenter", "text" => "Center", "togglable" => true, "group" => "text-align"),
            array("spriteCssClass" => "k-tool-icon k-justifyRight", "text" => "Right", "togglable" => true, "group" => "text-align")
        )
    ),
    array(
        "type" => "buttonGroup",
        "buttons" => array(
            array("spriteCssClass" => "k-tool-icon k-bold", "text" => "Bold", "togglable" => true, "showText" => "overflow"),
            array("spriteCssClass" => "k-tool-icon k-italic", "text" => "Italic", "togglable" => true, "showText" => "overflow"),
            array("spriteCssClass" => "k-tool-icon k-underline", "text" => "Underline", "togglable" => true, "showText" => "overflow")
        )
    ),
    array("type" => "button", "text" => "Action", "overflow" => "always"),
    array("type" => "button", "text" => "Another Action", "overflow" => "always"),
    array("type" => "button", "text" => "Something else here", "overflow" => "always")
);

echo $toolbar->render();
?>

<script>
    $(document).ready(function() {
        $("#dropdown").kendoDropDownList({
            optionLabel: "Paragraph",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Heading 1", value: 1 },
                { text: "Heading 2", value: 2 },
                { text: "Heading 3", value: 3 },
                { text: "Title", value: 4 },
                { text: "Subtitle", value: 5 }
            ]
        });
    });
</script>

<?php require_once '../include/footer.php'; ?>
