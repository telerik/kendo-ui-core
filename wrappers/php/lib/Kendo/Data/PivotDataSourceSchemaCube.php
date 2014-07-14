<?php

namespace Kendo\Data;

class PivotDataSourceSchemaCube extends \Kendo\SerializableObject {
    public function addDimension($value) {
        return $this->add('dimensions', func_get_args());
    }

    public function addMeasure($value) {
        return $this->add('measures', func_get_args());
    }
}

?>
