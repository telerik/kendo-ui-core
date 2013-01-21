<?php

namespace Kendo\UI;

class GridFilterableOperatorsEnums extends \Kendo\SerializableObject {
//>> Properties

    public function eq($value) {
        $this->setProperty('eq', $value);

        return $this;
    }

    public function neq($value) {
        $this->setProperty('neq', $value);

        return $this;
    }

//<< Properties
}

?>
