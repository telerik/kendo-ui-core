<?php

namespace Kendo\Data;

class DataSourceGroupItemAggregate extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the field on which the aggregate will be calculated.
    * @param string $value
    * @return \Kendo\Data\DataSourceGroupItemAggregate
    */
    public function field($value) {
        return $this->setProperty('field', $value);
    }

    /**
    * Specifies the aggregate function. Possible values are: "min", "max", "count", "sum", "average"
    * @param string $value
    * @return \Kendo\Data\DataSourceGroupItemAggregate
    */
    public function aggregate($value) {
        return $this->setProperty('aggregate', $value);
    }

//<< Properties
}

?>
