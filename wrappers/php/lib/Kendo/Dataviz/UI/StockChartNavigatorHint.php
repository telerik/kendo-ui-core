<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorHint extends \kendo\SerializableObject {
//>> Properties

    /**
    * The visibility of the hint.
    * @param boolean $value
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * The hint template.
Template variables:
    * @param string|\kendo\JavaScriptFunction $value
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * The format of the hint.
    * @param string $value
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

//<< Properties
}

?>
