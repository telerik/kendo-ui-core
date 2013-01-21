<?php

namespace Kendo\UI;

class GridFilterableOperators extends \Kendo\SerializableObject {
//>> Properties

    public function string(\Kendo\UI\GridFilterableOperatorsString $value) {
        return $this->setProperty('string', $value);
    }

    public function number(\Kendo\UI\GridFilterableOperatorsNumber $value) {
        return $this->setProperty('number', $value);
    }

    public function date(\Kendo\UI\GridFilterableOperatorsDate $value) {
        return $this->setProperty('date', $value);
    }

    public function enums(\Kendo\UI\GridFilterableOperatorsEnums $value) {
        return $this->setProperty('enums', $value);
    }

//<< Properties
}

?>
