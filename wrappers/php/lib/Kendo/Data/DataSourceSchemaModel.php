<?php

namespace Kendo\Data;

class DataSourceSchemaModel extends \kendo\SerializableObject {
    public function id($value) {
        return $this->setProperty('id', $value);
    }

    public function addField(\Kendo\Data\DataSourceSchemaModelField $value) {
        return $this->add('fields', $value);
    }
}

?>
