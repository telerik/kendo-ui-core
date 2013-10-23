<?php

namespace Kendo\Dataviz\UI;

class SparklineSeriesItemConnectors extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the connector line.
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemConnectors
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The padding between the connector line and the label, and connector line and pie chart.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemConnectors
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * The width of the connector line.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemConnectors
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
