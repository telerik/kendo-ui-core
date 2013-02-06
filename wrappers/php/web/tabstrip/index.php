<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<?php
    $tabstrip = new \Kendo\UI\TabStrip('tabstrip');

    // set items

    $paris = new \Kendo\UI\TabStripItem();

    $paris->text("Paris")
        ->selected(true)
        ->startContent();
?>
        <div class="weather">
            <h2>17<span>&ordm;C</span></h2>
            <p>Rainy weather in Paris.</p>
        </div>
        <span class="rainy">&nbsp;</span>
<?php
    $paris->endContent();

    $newYork = new \Kendo\UI\TabStripItem();
    $newYork->text("New York")
        ->startContent();
?>
        <div class="weather">
            <h2>29<span>&ordm;C</span></h2>
            <p>Sunny weather in New York.</p>
        </div>
        <span class="sunny">&nbsp;</span>
<?php
    $newYork->endContent();

    $london = new \Kendo\UI\TabStripItem();
    $london->text("London")
        ->startContent();
?>
        <div class="weather">
            <h2>21<span>&ordm;C</span></h2>
            <p>Sunny weather in London.</p>
        </div>
        <span class="sunny">&nbsp;</span>
<?php
    $london->endContent();

    $moscow = new \Kendo\UI\TabStripItem();
    $moscow->text("Moscow")
        ->startContent();
?>
        <div class="weather">
            <h2>16<span>&ordm;C</span></h2>
            <p>Cloudy weather in Moscow.</p>
        </div>
        <span class="cloudy">&nbsp;</span>
<?php
    $moscow->endContent();

    $sydney = new \Kendo\UI\TabStripItem();
    $sydney->text("sydney")
        ->startContent();
?>
        <div class="weather">
            <h2>17<span>&ordm;C</span></h2>
            <p>Rainy weather in Sydney.</p>
        </div>
        <span class="rainy">&nbsp;</span>
<?php
    $sydney->endContent();

    $tabstrip->addItem($paris, $newYork, $london, $moscow, $sydney);

    // set animation
    $animation = new \Kendo\UI\TabStripAnimation();
    $openAnimation = new \Kendo\UI\TabStripAnimationOpen();
    $openAnimation->effects("fadeIn");
    $animation->open($openAnimation);

    $tabstrip->animation($animation);

    echo $tabstrip->render();
?>

<style scoped>
    #forecast {
        width: 360px;
        height: 337px;
        margin: 30px auto;
        padding: 80px 15px 0 15px;
        background: url('../../content/web/tabstrip/forecast.png') transparent no-repeat 0 0;
    }

    .sunny, .cloudy, .rainy {
        display: inline-block;
        margin: 20px 0 20px 10px;
        width: 128px;
        height: 128px;
        background: url('../../content/web/tabstrip/weather.png') transparent no-repeat 0 0;
    }

    .cloudy{
        background-position: -128px 0;
    }

    .rainy{
        background-position: -256px 0;
    }

    .weather {
        width: 160px;
        padding: 40px 0 0 0;
        float: right;
    }

    #forecast h2 {
        font-weight: lighter;
        font-size: 5em;
        padding: 0;
        margin: 0;
    }

    #forecast h2 span {
        background: none;
        padding-left: 5px;
        font-size: .5em;
        vertical-align: top;
    }

    #forecast p {
        margin: 0;
        padding: 0;
    }
</style>

<?php require_once '../../include/footer.php'; ?>


