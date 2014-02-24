<?php

namespace Kendo\Dataviz\UI;

class SparklineSeriesItemTarget extends \Kendo\SerializableObject {
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
    * The target color.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemTarget
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The border of the target.
    * @param \Kendo\JavaScriptFunction|\Kendo\Dataviz\UI\SparklineSeriesItemTargetBorder|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemTarget
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

//<< Properties
}

?>
