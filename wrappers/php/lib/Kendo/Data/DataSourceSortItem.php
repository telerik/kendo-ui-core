<?php

namespace Kendo\Data;

class DataSourceSortItem extends \kendo\SerializableObject {
//>> Properties

    public function field($value) {
        $this->setProperty('field', $value);

        return $this;
    }

    public function dir($value) {
        $this->setProperty('dir', $value);

        return $this;
    }

//<< Properties
}

?>
