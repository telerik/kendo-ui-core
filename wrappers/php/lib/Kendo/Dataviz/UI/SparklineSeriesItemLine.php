<?php

namespace Kendo\Dataviz\UI;

class SparklineSeriesItemLine extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The line color.
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemLine
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The line opacity.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemLine
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The line width.
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemLine
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The supported values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemLine
    */
    public function style($value) {
        return $this->setProperty('style', $value);
    }

//<< Properties
}

?>
