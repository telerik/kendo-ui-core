<?php

namespace kendo\data;

class DataSourceGroupItem extends \kendo\SerializableObject {
//>> Properties

    public function setField($value) {
        $this->setProperty('field', $value);

        return $this;
    }

    public function setDir($value) {
        $this->setProperty('dir', $value);

        return $this;
    }

    public function addAggregate(\kendo\data\DataSourceGroupItemAggregate $value) {
        $values = $this->getProperty('aggregates');

        if ($values == null) {
            $values = array();
            $this->setProperty('aggregates', $values);
        }

        $values[] = $value;

        return $this;
    }

//<< Properties
}

?>
