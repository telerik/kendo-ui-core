<?php

namespace Kendo\Data;

class DataSourceFilterItem extends \kendo\SerializableObject {
//>> Properties

    public function operator($value) {
        $this->setProperty('operator', $value);

        return $this;
    }

    public function field($value) {
        $this->setProperty('field', $value);

        return $this;
    }

    public function value($value) {
        $this->setProperty('value', $value);

        return $this;
    }

//<< Properties
}

?>
