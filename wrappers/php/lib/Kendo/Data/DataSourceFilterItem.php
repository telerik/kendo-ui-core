<?php

namespace Kendo\Data;

class DataSourceFilterItem extends \kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the filter operator. One of the following values "eq", "neq", "lt", "lte", "gt", "gte", "startswith", "endswith", "contains".
    * @param string $value
    * @return \Kendo\Data\DataSourceFilterItem
    */
    public function operator($value) {
        return $this->setProperty('operator', $value);
    }

    /**
    * Specifies the field to filter by.
    * @param string $value
    * @return \Kendo\Data\DataSourceFilterItem
    */
    public function field($value) {
        return $this->setProperty('field', $value);
    }

    /**
    * Specifies the value to filter for.
    * @param Object $value
    * @return \Kendo\Data\DataSourceFilterItem
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

//<< Properties
}

?>
