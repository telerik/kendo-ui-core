<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

    <div class="demo-section">
        <h3>PanelBar with images</h3>

<?php
    $panelbar = new \Kendo\UI\PanelBar('panelbar-images');

    $baseball = new \Kendo\UI\PanelBarItem("Baseball");
    $baseball->imageUrl("../../content/shared/icons/sports/baseball.png");
    $baseball->addItem(
            array("text" =>"Top News", "imageUrl" => "../../content/shared/icons/16/star.png"),
            array("text" =>"Photo Galleries", "imageUrl" => "../../content/shared/icons/16/photo.png"),
            array("text" =>"Videos Records", "imageUrl" => "../../content/shared/icons/16/video.png"),
            array("text" =>"Radio Records", "imageUrl" => "../../content/shared/icons/16/speaker.png")
        );

    $golf = new \Kendo\UI\PanelBarItem("Golf");
    $golf->imageUrl("../../content/shared/icons/sports/golf.png");
    $golf->addItem(
            array("text" =>"Top News", "imageUrl" => "../../content/shared/icons/16/star.png"),
            array("text" =>"Photo Galleries", "imageUrl" => "../../content/shared/icons/16/photo.png"),
            array("text" =>"Videos Records", "imageUrl" => "../../content/shared/icons/16/video.png"),
            array("text" =>"Radio Records", "imageUrl" => "../../content/shared/icons/16/speaker.png")
        );

    $swimming = new \Kendo\UI\PanelBarItem("Swimming");
    $swimming->imageUrl("../../content/shared/icons/sports/swimming.png");
    $swimming->addItem(
            array("text" =>"Top News", "imageUrl" => "../../content/shared/icons/16/star.png"),
            array("text" =>"Photo Galleries", "imageUrl" => "../../content/shared/icons/16/photo.png")
        );

    $snowboarding = new \Kendo\UI\PanelBarItem("Snowboarding");
    $snowboarding->imageUrl("../../content/shared/icons/sports/snowboarding.png");
    $snowboarding->addItem(
            array("text" =>"Photo Galleries", "imageUrl" => "../../content/shared/icons/16/photo.png"),
            array("text" =>"Videos Records", "imageUrl" => "../../content/shared/icons/16/video.png")
        );

    $panelbar->dataSource(array(
        $baseball, $golf, $swimming, $snowboarding
    ));

    echo $panelbar->render();
?>
    </div>

    <div class="demo-section">

        <h3>PanelBar with sprites</h3>

<?php
    $panelbar = new \Kendo\UI\PanelBar('panelbar-sprites');

    $brazil = new \Kendo\UI\PanelBarItem("Brail");
    $brazil->spriteCssClass("brazilFlag");
    $brazil->addItem(
            array("text" =>"History", "spriteCssClass" => "historyIcon"),
            array("text" =>"Geography", "spriteCssClass" => "geographyIcon")
        );

    $india = new \Kendo\UI\PanelBarItem("India");
    $india->imageUrl("indiaFlag");
    $india->addItem(
            array("text" =>"Top News", "spriteCssClass" => "historyIcon"),
            array("text" =>"Photo Galleries", "spriteCssClass" => "geographyIcon")
        );

    $netherlands = new \Kendo\UI\PanelBarItem("Netherlands");
    $netherlands->spriteCssClass("netherlandsFlag");
    $netherlands->addItem(
            array("text" =>"Top News", "spriteCssClass" => "historyIcon"),
            array("text" =>"Photo Galleries", "spriteCssClass" => "geographyIcon")
        );

    $panelbar->dataSource(array(
        $brazil, $india, $netherlands
    ));

    echo $panelbar->render();
?>
    </div>

    <style scoped>
        .k-panel
        {
            -webkit-transform: translatez(0);
        }

        .demo-section {
            width: 300px;
        }
        .demo-section h3 {
            font-weight: normal;
            padding-bottom: 10px;
        }
        #panelbar-images > .k-item > .k-link > .k-image
        {
            margin-top: 2px;
            margin-left: -5px;
        }

        #panelbar-sprites > .k-item > .k-link > .k-sprite
        {
            margin-top: 6px;
        }

        #panelbar-sprites .k-sprite {
            background-image: url("../../content/shared/styles/flags.png");
        }
        .brazilFlag {
            background-position: 0 0;
        }
        .indiaFlag {
            background-position: 0 -32px;
        }
        .netherlandsFlag {
            background-position: 0 -64px;
        }
        .historyIcon {
            background-position: 0 -96px;
        }
        .geographyIcon {
            background-position: 0 -128px;
        }
    </style>

<?php require_once '../../include/footer.php'; ?>
