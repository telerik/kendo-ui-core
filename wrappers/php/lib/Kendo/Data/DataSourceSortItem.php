<?php

namespace Kendo\Data;

class DataSourceSortItem extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The field by which the data items are sorted.
    * @param string $value
    * @return \Kendo\Data\DataSourceSortItem
    */
    public function field($value) {
        return $this->setProperty('field', $value);
    }

    /**
    * The sort order (direction). The supported values are "asc" (ascending order) and "desc" (descending order).
    * @param string $value
    * @return \Kendo\Data\DataSourceSortItem
    */
    public function dir($value) {
        return $this->setProperty('dir', $value);
    }

//<< Properties
}

?>
