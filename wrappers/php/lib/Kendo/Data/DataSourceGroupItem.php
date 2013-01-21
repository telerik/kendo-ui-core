<?php

namespace Kendo\Data;

class DataSourceGroupItem extends \kendo\SerializableObject {
//>> Properties

    public function field($value) {
        return $this->setProperty('field', $value);
    }

    public function dir($value) {
        return $this->setProperty('dir', $value);
    }

    public function addAggregate(\Kendo\Data\DataSourceGroupItemAggregate $value) {
        return $this->add('aggregates', $value);
    }

//<< Properties
}

?>
