<?php

namespace Kendo\Dataviz\UI;

class SparklineSeriesItemTargetLine extends \kendo\SerializableObject {
//>> Properties

    /**
    * The width of the line.
    * @param  $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemTargetLine
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
