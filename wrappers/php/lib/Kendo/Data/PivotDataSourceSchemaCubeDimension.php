<?php

namespace Kendo\Data;

class PivotDataSourceSchemaCubeDimension extends \Kendo\SerializableObject {

    public function caption($value) {
        return $this->setProperty('caption', $value);
    }
}

?>
