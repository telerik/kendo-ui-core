<?php

namespace Kendo\Data;

class DataSourceGroupItem extends \kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the field to group by.
    * @param string $value
    * @returns \Kendo\Data\DataSourceGroupItem
    */
    public function field($value) {
        return $this->setProperty('field', $value);
    }

    /**
    * Specifies the order of the groupped items.
    * @param string $value
    * @returns \Kendo\Data\DataSourceGroupItem
    */
    public function dir($value) {
        return $this->setProperty('dir', $value);
    }

    /**
    * Adds DataSourceGroupItemAggregate to the DataSourceGroupItem.
    * @param \Kendo\Data\DataSourceGroupItemAggregate,... $value one or more DataSourceGroupItemAggregate to add.
    * @returns \Kendo\Data\DataSourceGroupItem
    */
    public function addAggregate(\Kendo\Data\DataSourceGroupItemAggregate $value) {
        return $this->add('aggregates', func_get_args());
    }

//<< Properties
}

?>
