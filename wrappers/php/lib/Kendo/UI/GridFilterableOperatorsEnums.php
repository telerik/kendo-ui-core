<?php

namespace Kendo\UI;

class GridFilterableOperatorsEnums extends \Kendo\SerializableObject {
//>> Properties

    public function setEQ($value) {
        $this->setProperty('eq', $value);

        return $this;
    }

    public function setNeq($value) {
        $this->setProperty('neq', $value);

        return $this;
    }

//<< Properties
}

?>
