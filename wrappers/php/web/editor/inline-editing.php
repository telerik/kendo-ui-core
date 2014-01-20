<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<div class="demo-section">
<?php
    $editor = new \Kendo\UI\Editor('topEditor');

    $editor->tag('div')
        ->addTool(
            'bold', 'italic', 'underline', 'strikethrough',
            'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
            'createLink', 'unlink', 'insertImage',
            'createTable',
            'addColumnLeft', 'addColumnRight', 'addRowAbove', 'addRowBelow',
            'deleteRow', 'deleteColumn',
            'foreColor', 'backColor'
        )
        ->startContent();
?>
    <h2>
        Comprehensive <br />HTML5/JavaScript framework <br />
        for modern web and mobile app development
    </h2>
    <p>
        Kendo UI is everything professional developers need
        to build HTML5 sites and mobile apps. Today, productivity
        of an average HTML/jQuery developer is hampered by
        assembling a Frankenstein framework of disparate
        JavaScript libraries and plug-ins.
    </p>
    <p>
        Kendo UI has it all: rich jQuery-based widgets,
        a simple and consistent programming interface,
        a rock-solid DataSource, validation, internationalization,
        a MVVM framework, themes, templates and the list goes on.
    </p>
<?php
    $editor->endContent();

    echo $editor->render();
?>

<?php

    $columnTools = array('bold', 'italic', 'underline', 'createLink', 'unlink', 'insertImage');

    $editor = new \Kendo\UI\Editor('leftColumn');

    call_user_func_array(array($editor, 'addTool'), $columnTools);

    $editor->tag('div')
        ->attr('class', 'column')
        ->startContent();
?>
    <img src="../../content/web/editor/web.png" />
    <h3>Web app <br />development <br />framework</h3>
    <p>
        Kendo UI Web provides you with a simple and consistent
        programming interface, polished and innovative
        UI widgets for the web, powered by jQuery, HTML5 &amp; CSS3,
        a MVVM framework, themes which are easily customizable to
        fit the widgets to your web application, templates
        and much more. All that's left to do is to develop modern
        desktop and mobile web applications by leveraging your web
        development skills while unlocking the power of JavaScript,
        HTML5 &amp; CSS3, and using the intuitive <br />
        <a href="http://www.telerik.com/kendo-ui-web" title="Kendo UI Web">Kendo UI Web</a>.
    </p>
<?php
    $editor->endContent();

    echo $editor->render();
?>

<?php
    $editor = new \Kendo\UI\Editor('centerColumn');

    call_user_func_array(array($editor, 'addTool'), $columnTools);

    $editor->tag('div')
        ->attr('class', 'column')
        ->startContent();
?>
    <img src="../../content/web/editor/mobile.png" />
    <h3>Mobile app <br />development <br />framework</h3>
    <p>
        Build native-like mobile apps for iPhone, Android and Blackberry,
        and deliver unmatched user experience without any extra coding.
    </p>
    <p>
        <a href="http://www.telerik.com/kendo-ui-mobile" title="Kendo UI Mobile">Kendo UI Mobile</a>
        is packed with easy-to-use jQuery-based widgets and built-in
        rich components for your fast mobile application development.
    </p>
<?php
    $editor->endContent();

    echo $editor->render();
?>

<?php
    $editor = new \Kendo\UI\Editor('rightColumn');

    call_user_func_array(array($editor, 'addTool'), $columnTools);

    $editor->tag('div')
        ->attr('class', 'column')
        ->startContent();
?>
    <img src="../../content/web/editor/dataviz.png" />
    <h3>Rich UI widgets <br />for interactive <br />data visualization </h3>
    <p>
        Create interactive data visualization with HTML5 and JavaScript,
        build rich web apps that look and behave native on any platform or device.
        Kendo UI DataViz uses SVG, and brings you a collection of UI widgets,
        including jQuery charts, gauges, and more.
    </p>
    <p>
        <a href="http://www.telerik.com/kendo-ui-dataviz" title="Kendo UI DataViz">Kendo UI DataViz</a>
        uses automatic hardware acceleration for all animations and rendering,
        maximizing performance and minimizing the impact on CPU resources.
    </p>
<?php
    $editor->endContent();

    echo $editor->render();
?>

<style scoped>
    .demo-section {
        padding: 40px;
    }

    #example .configuration {
        max-width: none;
        margin: 0;
        float: none;
    }

    .configuration a {
        color: inherit;
    }

    .configuration a:hover {
        text-decoration: none;
    }

    .k-editor-inline {
        margin: 0;
        padding: 21px 21px 11px;
        border-width: 0;
        box-shadow: none;
        background: none;
    }

    .k-editor-inline.k-state-active {
        border-width: 1px;
        padding: 20px 20px 10px;
        background: none;
    }

    #topEditor h2, .column h3 {
        font-size: 24px;
        color: #e15613;
        font-family: "Droid Sans",DroidSansWeb,"Segoe UI","Lucida Sans Unicode",Arial,Helvetica,sans-serif;
    }

    .k-editor-inline p {
        font-size: 13px;
    }

    .column {
        display: inline-block;
        vertical-align: top;
        width: 170px;
    }

    .column a {
        color: #e15613;
    }

    .column h3 {
        padding-top: 10px;
        font-size: 15px;
    }

    .k-table {
        border-spacing: 0;
        border-collapse: collapse;
        border: 1px solid #999;
        width: 100%;
    }

    .k-table td, .k-table th {
        border: 1px solid #999;
        padding: 3px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>

