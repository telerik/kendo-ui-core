<?php

namespace Kendo\Data;

class PivotDataSourceColumn extends \Kendo\SerializableObject {
//>> Properties

    /**
    * If set to true the member will be exapnded.
    * @param boolean $value
    * @return \Kendo\Data\PivotDataSourceColumn
    */
    public function expand($value) {
        return $this->setProperty('expand', $value);
    }

    /**
    * The hierarchal name of the column
    * @param string $value
    * @return \Kendo\Data\PivotDataSourceColumn
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

//<< Properties
}

?>
