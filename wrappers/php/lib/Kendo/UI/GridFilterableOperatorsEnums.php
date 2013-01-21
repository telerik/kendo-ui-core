<?php

namespace Kendo\UI;

class GridFilterableOperatorsEnums extends \Kendo\SerializableObject {
//>> Properties

    public function eq($value) {
        return $this->setProperty('eq', $value);
    }

    public function neq($value) {
        return $this->setProperty('neq', $value);
    }

//<< Properties
}

?>
