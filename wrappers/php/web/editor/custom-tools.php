<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<div class="configuration k-widget k-header" style="float:none;max-width:none;margin:0 0 2em;">
    <span class="infoHead">Information</span>
    <p>
        The following demo shows how to customize some of the native Editor tools (font size, font name and block format) by modifying the tools' item
        collections, as well as how to create completely custom tools.
    </p>
</div>

<?php
    $editor = new \Kendo\UI\Editor('editor');

    // configure custom tools
    // - font name
    $fontGaramond = new \Kendo\UI\EditorToolItem();
    $fontGaramond->text("Verdana")->value("Verdana, Geneva, sans-serif");

    $fontVerdana = new \Kendo\UI\EditorToolItem();
    $fontVerdana->text("Garamond")->value("Garamond, serif");

    $fontName = new \Kendo\UI\EditorTool();
    $fontName->name("fontName");
    $fontName->addItem($fontGaramond, $fontVerdana);

    // - font size
    $xxsmall = new \Kendo\UI\EditorToolItem();
    $xxsmall->text("1 (8pt)")->value("xx-small");

    $medium = new \Kendo\UI\EditorToolItem();
    $medium->text("16px")->value("16px");

    $fontSize = new \Kendo\UI\EditorTool();
    $fontSize->name("fontSize");
    $fontSize->addItem($xxsmall, $medium);

    // - format block
    $paragraph = new \Kendo\UI\EditorToolItem();
    $paragraph->text("Paragraph")->value("p");

    $fieldset = new \Kendo\UI\EditorToolItem();
    $fieldset->text("Fieldset")->value("fieldset");

    $formatBlock = new \Kendo\UI\EditorTool();
    $formatBlock->name("formatBlock");
    $formatBlock->addItem($paragraph, $fieldset);

    // - tool with custom template
    $customTemplate = new \Kendo\UI\EditorTool();
    $customTemplate
        ->name("customTemplate")
        ->template(
              "<label for='templateTool' style='vertical-align:middle;'>Background:</label>"
            . "<select id='templateTool' style='width:90px'><option value=''>none</option><option value='\#ff9'>yellow</option><option value='\#dfd'>green</option></select>"
        );

    // - tool with custom action
    $hr = new \Kendo\UI\EditorTool();
    $hr->name("custom")
        ->tooltip("Insert a horizontal rule")
        ->exec("insertHr");

    // add all custom tools to the toolbar
    $editor->addTool($fontName, $fontSize, $formatBlock, $customTemplate, $hr);

    $editor
        ->attr('style', 'width:100%;height:400px')
        ->startContent();
?>
    &lt;p&gt;&lt;img src=&quot;http://www.kendoui.com/Image/kendo-logo.png&quot; alt=&quot;Editor for ASP.NET MVC logo&quot; style=&quot;display:block;margin-left:auto;margin-right:auto;&quot; /&gt;&lt;/p&gt;
    &lt;p&gt;
        Kendo UI Editor allows your users to edit HTML in a familiar, user-friendly way.&lt;br /&gt;
        In this version, the Editor provides the core HTML editing engine, which includes basic text formatting, hyperlinks, lists,
        and image handling. The widget &lt;strong&gt;outputs identical HTML&lt;/strong&gt; across all major browsers, follows
        accessibility standards and provides API for content manipulation.
    &lt;/p&gt;
    &lt;p&gt;Features include:&lt;/p&gt;
    &lt;ul&gt;
        &lt;li&gt;Text formatting &amp; alignment&lt;/li&gt;
        &lt;li&gt;Bulleted and numbered lists&lt;/li&gt;
        &lt;li&gt;Hyperlink and image dialogs&lt;/li&gt;
        &lt;li&gt;Cross-browser support&lt;/li&gt;
        &lt;li&gt;Identical HTML output across browsers&lt;/li&gt;
        &lt;li&gt;Gracefully degrades to a &lt;code&gt;textarea&lt;/code&gt; when JavaScript is turned off&lt;/li&gt;
    &lt;/ul&gt;
    &lt;p&gt;
        Read &lt;a href=&quot;http://docs.kendoui.com&quot;&gt;more details&lt;/a&gt; or send us your
        &lt;a href=&quot;http://www.kendoui.com/forums.aspx&quot;&gt;feedback&lt;/a&gt;!
    &lt;/p&gt;

<?php
    $editor->endContent();

    echo $editor->render();
?>

<script type="text/x-kendo-template" id="backgroundColor-template">
</script>

<script>
    function insertHr(e) {
        var editor = $(this).data("kendoEditor");
        editor.exec("inserthtml", { value: "<hr />" });
    }

    $(document).ready(function() {
        $("#templateTool").kendoDropDownList({
            change: function(e) {
                $("#editor").data("kendoEditor").body.style.backgroundColor = e.sender.value();
            }
        });
    });

</script>

<?php require_once '../../include/footer.php'; ?>

