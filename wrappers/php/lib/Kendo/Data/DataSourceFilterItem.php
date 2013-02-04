<?php

namespace Kendo\Data;

class DataSourceFilterItem extends \Kendo\SerializableObject {
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
    * @param  $value
    * @return \Kendo\Data\DataSourceFilterItem
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

//<< Properties
}

?>
