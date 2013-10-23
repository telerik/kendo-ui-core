<?php

namespace Kendo\Dataviz\UI;

class SparklineSeriesItemTargetLine extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The width of the line.
    * @param |\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemTargetLine
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
