<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<div class="demo-section">
    <h3>Menu with images</h3>

<?php
    $menu = new \Kendo\UI\Menu('menu-images');

    $baseball = new \Kendo\UI\MenuItem("Baseball");
    $baseball->imageUrl("../../content/shared/icons/sports/baseball.png");
    $baseball->addItem(
            array("text" =>"Top News", "imageUrl" => "../../content/shared/icons/16/star.png"),
            array("text" =>"Photo Galleries", "imageUrl" => "../../content/shared/icons/16/photo.png"),
            array("text" =>"Videos Records", "imageUrl" => "../../content/shared/icons/16/video.png"),
            array("text" =>"Radio Records", "imageUrl" => "../../content/shared/icons/16/speaker.png")
        );

    $golf = new \Kendo\UI\MenuItem("Golf");
    $golf->imageUrl("../../content/shared/icons/sports/golf.png");
    $golf->addItem(
            array("text" =>"Top News", "imageUrl" => "../../content/shared/icons/16/star.png"),
            array("text" =>"Photo Galleries", "imageUrl" => "../../content/shared/icons/16/photo.png"),
            array("text" =>"Videos Records", "imageUrl" => "../../content/shared/icons/16/video.png"),
            array("text" =>"Radio Records", "imageUrl" => "../../content/shared/icons/16/speaker.png")
        );

    $swimming = new \Kendo\UI\MenuItem("Swimming");
    $swimming->imageUrl("../../content/shared/icons/sports/swimming.png");
    $swimming->addItem(
            array("text" =>"Top News", "imageUrl" => "../../content/shared/icons/16/star.png"),
            array("text" =>"Photo Galleries", "imageUrl" => "../../content/shared/icons/16/photo.png")
        );

    $snowboarding = new \Kendo\UI\MenuItem("Snowboarding");
    $snowboarding->imageUrl("../../content/shared/icons/sports/snowboarding.png");
    $snowboarding->addItem(
            array("text" =>"Photo Galleries", "imageUrl" => "../../content/shared/icons/16/photo.png"),
            array("text" =>"Videos Records", "imageUrl" => "../../content/shared/icons/16/video.png")
        );

    $menu->dataSource(array(
        $baseball, $golf, $swimming, $snowboarding
    ));

    echo $menu->render();
?>
</div>

<div class="demo-section">

    <h3>Menu with sprites</h3>
<?php
    $menu = new \Kendo\UI\Menu('menu-sprites');

    $brazil = new \Kendo\UI\MenuItem("Brail");
    $brazil->spriteCssClass("brazilFlag");
    $brazil->addItem(
            array("text" =>"History", "spriteCssClass" => "historyIcon"),
            array("text" =>"Geography", "spriteCssClass" => "geographyIcon")
        );

    $india = new \Kendo\UI\MenuItem("India");
    $india->imageUrl("indiaFlag");
    $india->addItem(
            array("text" =>"Top News", "spriteCssClass" => "historyIcon"),
            array("text" =>"Photo Galleries", "spriteCssClass" => "geographyIcon")
        );

    $netherlands = new \Kendo\UI\MenuItem("Netherlands");
    $netherlands->spriteCssClass("netherlandsFlag");
    $netherlands->addItem(
            array("text" =>"Top News", "spriteCssClass" => "historyIcon"),
            array("text" =>"Photo Galleries", "spriteCssClass" => "geographyIcon")
        );

    $menu->dataSource(array(
        $brazil, $india, $netherlands
    ));

    echo $menu->render();
?>
</div>

<style scoped>
    .demo-section {
        width: 500px;
    }
    .demo-section h3 {
        font-weight: normal;
        padding-bottom: 10px;
    }
    #menu-sprites .k-sprite {
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
