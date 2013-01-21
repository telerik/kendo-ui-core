<?php

namespace Kendo\Data;

class DataSourceSortItem extends \kendo\SerializableObject {
//>> Properties

    public function field($value) {
        return $this->setProperty('field', $value);
    }

    public function dir($value) {
        return $this->setProperty('dir', $value);
    }

//<< Properties
}

?>
