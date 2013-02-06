<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<div class="configuration k-widget k-header" style="float:none;max-width:none;margin:0 0 2em;">
    <span class="infoHead">Information</span>
    <p>
        The following demo shows how to use the Editor's style tool, which provides the ability to customize the widget content by means of custom
        CSS classes and styling, and a CSS file registered in the Editor iframe document.
    </p>
</div>

<?php
    $editor = new \Kendo\UI\Editor('editor');

    // declare styles
    $highlight_error = new \Kendo\UI\EditorToolItem();
    $highlight_error->text("Highlight Error")->value("hlError");

    $highlight_ok = new \Kendo\UI\EditorToolItem();
    $highlight_ok->text("Highlight OK")->value("hlOK");

    $inline_code = new \Kendo\UI\EditorToolItem();
    $inline_code->text("Inline Code")->value("inlineCode");

    // add styles to style tool
    $style = new \Kendo\UI\EditorTool();
    $style->name("style");
    $style->addItem($highlight_error, $highlight_ok, $inline_code);

    $editor->addTool($style);

    // add custom stylesheet to show custom styles
    $editor->stylesheets(array("../../content/web/editor/editorStyles.css"));

    $editor
        ->attr('style', 'width:740px;height:400px')
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

<?php require_once '../../include/footer.php'; ?>

