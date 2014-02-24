<?php

namespace Kendo\Dataviz\UI;

class SparklineSeriesItemHighlight extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The border of highlighted points. The color is computed automatically from the base point color.** Applicable to pie series. **
    * @param \Kendo\Dataviz\UI\SparklineSeriesItemHighlightBorder|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemHighlight
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The highlight color.** Available only for pie series **
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemHighlight
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The opacity of the highlighted points.** Applicable to pie series. **
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemHighlight
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * A value indicating if the series points should be highlighted.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemHighlight
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
