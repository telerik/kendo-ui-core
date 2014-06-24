<?php

namespace Kendo\Data;

class PivotDataSourceRow extends \Kendo\SerializableObject {
//>> Properties

    /**
    * If set to true the member will be exapnded.
    * @param boolean $value
    * @return \Kendo\Data\PivotDataSourceRow
    */
    public function expand($value) {
        return $this->setProperty('expand', $value);
    }

    /**
    * The hierarchal name of the rows
    * @param string $value
    * @return \Kendo\Data\PivotDataSourceRow
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

//<< Properties
}

?>
