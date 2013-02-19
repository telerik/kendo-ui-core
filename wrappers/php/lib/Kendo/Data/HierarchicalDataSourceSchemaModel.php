<?php

namespace Kendo\Data;

class HierarchicalDataSourceSchemaModel extends \Kendo\Data\DataSourceSchemaModel {

    /**
    * Sets the hasChildren property
    * @param boolean|string $value
    * @return \Kendo\Data\HierarchicalDataSourceSchemaModel
    */
    public function hasChildren($value) {
        return $this->setProperty('hasChildren', $value);
    }

    /**
    * Sets the hasChildren property
    * @param mixed|string $value
    * @return \Kendo\Data\HierarchicalDataSourceSchemaModel
    */
    public function children($value) {
        return $this->setProperty('children', $value);
    }

//>> Properties
//<< Properties
}

?>

