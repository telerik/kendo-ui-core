<?php

namespace Kendo\Dataviz\UI;

class SparklineSeriesItemHighlight extends \kendo\SerializableObject {
//>> Properties

    /**
    * The border of highlighted points. The color is computed automatically from the base point color.
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
    * The opacity of the highlighted points.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemHighlight
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

//<< Properties
}

?>
