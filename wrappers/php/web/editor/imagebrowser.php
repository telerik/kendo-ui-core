<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<?php
    $editor = new \Kendo\UI\Editor('editor');

    // configure image browser
    $imageBrowser = new \Kendo\UI\EditorImageBrowser();

    $transport = new \Kendo\UI\EditorImageBrowserTransport();
    $transport->thumbnailUrl('../../lib/ImageBrowser.php?action=thumbnail');
    $transport->uploadUrl('../../lib/ImageBrowser.php?action=upload');
    $transport->imageUrl('../../lib/ImageBrowser.php?action=image&path={0}');

    $transport->read('../../lib/ImageBrowser.php?action=read');
    $destroy = new \Kendo\UI\EditorImageBrowserTransportDestroy();
    $destroy
        ->url('../../lib/ImageBrowser.php?action=destroy')
        ->type('POST');
    $transport->destroy($destroy);
    $create = new \Kendo\UI\EditorImageBrowserTransportDestroy();
    $create
        ->url('../../lib/ImageBrowser.php?action=create')
        ->type('POST');
    $transport->create($create);
    $imageBrowser->transport($transport);

    $editor->imageBrowser($imageBrowser);

    // add content
    $editor
        ->attr('style', 'width:740px;height:440px')
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

<script>
    $(document).ready( function () { $("#editor").data("kendoEditor").exec("insertImage"); });
</script>

<?php require_once '../../include/footer.php'; ?>


