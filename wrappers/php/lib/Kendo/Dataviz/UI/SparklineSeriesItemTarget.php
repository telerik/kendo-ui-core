<?php

namespace Kendo\Dataviz\UI;

class SparklineSeriesItemTarget extends \kendo\SerializableObject {
//>> Properties

    /**
    * The target line.
    * @param \Kendo\Dataviz\UI\SparklineSeriesItemTargetLine|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemTarget
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * The border of the target.
    * @param \Kendo\Dataviz\UI\SparklineSeriesItemTargetBorder|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemTarget
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

//<< Properties
}

?>
