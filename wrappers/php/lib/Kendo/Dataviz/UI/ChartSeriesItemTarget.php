<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemTarget extends \kendo\SerializableObject {
//>> Properties

    /**
    * The target line.
    * @param \Kendo\Dataviz\UI\ChartSeriesItemTargetLine|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemTarget
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * The border of the target.
    * @param \Kendo\Dataviz\UI\ChartSeriesItemTargetBorder|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemTarget
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

//<< Properties
}

?>
