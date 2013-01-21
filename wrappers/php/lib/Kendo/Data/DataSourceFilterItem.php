<?php

namespace Kendo\Data;

class DataSourceFilterItem extends \kendo\SerializableObject {
//>> Properties

    public function operator($value) {
        return $this->setProperty('operator', $value);
    }

    public function field($value) {
        return $this->setProperty('field', $value);
    }

    public function value($value) {
        return $this->setProperty('value', $value);
    }

//<< Properties
}

?>
