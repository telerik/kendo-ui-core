<?php

namespace Kendo\Data;

class DataSourceFilterItem extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The data item field to which the filter operator is applied.
    * @param string $value
    * @return \Kendo\Data\DataSourceFilterItem
    */
    public function field($value) {
        return $this->setProperty('field', $value);
    }

    /**
    * The nested filter expressions. Suppor the same options as filter. Filters can be nested indefinitely.
    * @param array $value
    * @return \Kendo\Data\DataSourceFilterItem
    */
    public function filters($value) {
        return $this->setProperty('filters', $value);
    }

    /**
    * The logical operation to use when the filter.filters option is set. The supported values are "and" and "or".
    * @param string $value
    * @return \Kendo\Data\DataSourceFilterItem
    */
    public function logic($value) {
        return $this->setProperty('logic', $value);
    }

    /**
    * The filter operator (comparison). The supported operators are: "eq" (equal to), "neq" (not equal to), "lt" (less than), "lte" (less than or equal to), "gt" (greater than), "gte" (greater than or equal to),
"startswith", "endswith", "contains". The last three are supported only for string fields.
    * @param string $value
    * @return \Kendo\Data\DataSourceFilterItem
    */
    public function operator($value) {
        return $this->setProperty('operator', $value);
    }

    /**
    * The value to which the field is compared. The value must be from the same type as the field.
    * @param  $value
    * @return \Kendo\Data\DataSourceFilterItem
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

//<< Properties
}

?>
