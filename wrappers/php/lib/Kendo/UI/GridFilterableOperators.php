<?php

namespace Kendo\UI;

class GridFilterableOperators extends \Kendo\SerializableObject {
//>> Properties

    public function string(\Kendo\UI\GridFilterableOperatorsString $value) {
        $this->setProperty('string', $value);

        return $this;
    }

    public function number(\Kendo\UI\GridFilterableOperatorsNumber $value) {
        $this->setProperty('number', $value);

        return $this;
    }

    public function date(\Kendo\UI\GridFilterableOperatorsDate $value) {
        $this->setProperty('date', $value);

        return $this;
    }

    public function enums(\Kendo\UI\GridFilterableOperatorsEnums $value) {
        $this->setProperty('enums', $value);

        return $this;
    }

//<< Properties
}

?>
