<!doctype html>
<html>
    <head>
        <link href="http://cdn.kendostatic.com/2012.3.1315/styles/kendo.common.min.css" rel="stylesheet" />
        <link href="http://cdn.kendostatic.com/2012.3.1315/styles/kendo.default.min.css" rel="stylesheet" />
        <link href="http://cdn.kendostatic.com/2012.3.1315/styles/kendo.dataviz.min.css" rel="stylesheet" />
        <script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>
        <script src="http://cdn.kendostatic.com/2012.3.1315/js/kendo.all.min.js"></script>
    </head>
    <body>
<?php

require_once 'lib/kendo/Autoload.php';

class Window extends kendo\ui\Widget {
    public function tagName() {
        return 'div';
    }

    public function name() {
        return 'Window';
    }

    public function createElement() {
        $element = parent::createElement();

        $element->html($this->content);

        return $element;
    }

    private $content;

    public function setContent($content) {
        $this->content = $content;
    }
}

$window = new Window('window');

ob_start();

?>

<strong>Window</strong> content goes here

<?php

$window->setContent(ob_get_clean());

echo $window->render();
?>
    </body>
</html>
