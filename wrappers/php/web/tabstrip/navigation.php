<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<div id="forecast">
<?php
    $tabstrip = new \Kendo\UI\TabStrip('tabstrip');

    $tabstrip->attr('accesskey', 'w');

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
</div>

<ul id="keyboard-nav" class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button leftAlign wider"><a target="_blank" href="http://en.wikipedia.org/wiki/Access_key">Access key</a></span>
            +
            <span class="key-button">w</span>
        </span>
        <span class="button-descr">
            focuses the widget
        </span>
    </li>
</ul>

<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">left arrow</span>
        </span>
        <span class="button-descr">
            selects previous tab
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">right arrow</span>
        </span>
        <span class="button-descr">
            selects next tab
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">home</span>
        </span>
        <span class="button-descr">
            selects first tab
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">end</span>
        </span>
        <span class="button-descr">
            selects last tab
        </span>
    </li>
</ul>

<style scoped>
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

    #keyboard-nav
    {
        padding-top: 35px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>


