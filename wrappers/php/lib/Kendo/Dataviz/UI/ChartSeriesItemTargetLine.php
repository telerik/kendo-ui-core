<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemTargetLine extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The width of the line.
    * @param |\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemTargetLine
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
