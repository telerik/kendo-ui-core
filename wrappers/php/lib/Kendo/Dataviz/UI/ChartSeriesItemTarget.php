<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemTarget extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The border of the target.
    * @param \Kendo\JavaScriptFunction|\Kendo\Dataviz\UI\ChartSeriesItemTargetBorder|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemTarget
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The target color.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemTarget
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The target line options.
    * @param \Kendo\Dataviz\UI\ChartSeriesItemTargetLine|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemTarget
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

//<< Properties
}

?>
