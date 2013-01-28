<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemConnectors extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the connector line.
    * @param string $value
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The padding between the connector line and the label, and connector line and donut chart.
    * @param float $value
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * The width of the connector line.
    * @param float $value
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
