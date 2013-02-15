<?php

namespace Kendo\Data;

class DataSourceSchemaModel extends \Kendo\SerializableObject {
    public function id($value) {
        return $this->setProperty('id', $value);
    }

    public function addField($value) {
        return $this->add('fields', func_get_args());
    }
}

?>
