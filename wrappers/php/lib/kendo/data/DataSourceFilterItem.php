<?php

namespace kendo\data;

class DataSourceFilterItem extends \kendo\SerializableObject {
//>> Properties

    public function setOperator($value) {
        $this->setProperty('operator', $value);

        return $this;
    }

    public function setField($value) {
        $this->setProperty('field', $value);

        return $this;
    }

    public function setValue($value) {
        $this->setProperty('value', $value);

        return $this;
    }

//<< Properties
}

?>
