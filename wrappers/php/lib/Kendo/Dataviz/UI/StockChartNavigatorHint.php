<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorHint extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The visibility of the hint.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorHint
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * Sets the template option of the StockChartNavigatorHint.
    * The hint template.
Template variables:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\Dataviz\UI\StockChartNavigatorHint
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the StockChartNavigatorHint.
    * The hint template.
Template variables:
    * @param string $value The template content.
    * @return \Kendo\Dataviz\UI\StockChartNavigatorHint
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * The format of the hint.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorHint
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

//<< Properties
}

?>
