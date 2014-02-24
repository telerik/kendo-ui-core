<?php

namespace Kendo\Dataviz\UI;

class SparklineChartArea extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the chart area.
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineChartArea
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The background opacity of the chart area.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineChartArea
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The border of the chart area.
    * @param \Kendo\Dataviz\UI\SparklineChartAreaBorder|array $value
    * @return \Kendo\Dataviz\UI\SparklineChartArea
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The height of the chart area.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineChartArea
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * The margin of the chart area.
    * @param float| $value
    * @return \Kendo\Dataviz\UI\SparklineChartArea
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The width of the chart area.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineChartArea
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
