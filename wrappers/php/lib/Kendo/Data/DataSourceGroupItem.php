<?php

namespace Kendo\Data;

class DataSourceGroupItem extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Adds DataSourceGroupItemAggregate to the DataSourceGroupItem.
    * @param \Kendo\Data\DataSourceGroupItemAggregate|array,... $value one or more DataSourceGroupItemAggregate to add.
    * @return \Kendo\Data\DataSourceGroupItem
    */
    public function addAggregate($value) {
        return $this->add('aggregates', func_get_args());
    }

    /**
    * The sort order of the group. The supported values are "asc" (ascending order) and "desc" (descending order). The default sort order is ascending.
    * @param string $value
    * @return \Kendo\Data\DataSourceGroupItem
    */
    public function dir($value) {
        return $this->setProperty('dir', $value);
    }

    /**
    * The data item field to group by.
    * @param string $value
    * @return \Kendo\Data\DataSourceGroupItem
    */
    public function field($value) {
        return $this->setProperty('field', $value);
    }

//<< Properties
}

?>
