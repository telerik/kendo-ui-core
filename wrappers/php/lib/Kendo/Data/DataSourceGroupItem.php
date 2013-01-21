<?php

namespace Kendo\Data;

class DataSourceGroupItem extends \kendo\SerializableObject {
//>> Properties

    public function field($value) {
        $this->setProperty('field', $value);

        return $this;
    }

    public function dir($value) {
        $this->setProperty('dir', $value);

        return $this;
    }

    public function addAggregate(\Kendo\Data\DataSourceGroupItemAggregate $value) {
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
