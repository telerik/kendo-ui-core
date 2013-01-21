<?php

namespace Kendo\Data;

class DataSourceSortItem extends \kendo\SerializableObject {
//>> Properties

    public function setField($value) {
        $this->setProperty('field', $value);

        return $this;
    }

    public function setDir($value) {
        $this->setProperty('dir', $value);

        return $this;
    }

//<< Properties
}

?>
