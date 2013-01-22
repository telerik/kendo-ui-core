<?php

namespace Kendo\Data;

class DataSourceSchemaModelField extends \kendo\SerializableObject {
    public function field($value) {
        return $this->setProperty('field', $value);
    }

    public function type($value) {
        return $this->setProperty('type', $value);
    }
}

?>
