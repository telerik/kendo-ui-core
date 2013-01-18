<?php

namespace kendo\ui;

class GridFilterableOperators extends \kendo\SerializableObject {
//>> Properties

    public function setString(\kendo\ui\GridFilterableOperatorsString $value) {
        $this->setProperty('string', $value);

        return $this;
    }

    public function setNumber(\kendo\ui\GridFilterableOperatorsNumber $value) {
        $this->setProperty('number', $value);

        return $this;
    }

    public function setDate(\kendo\ui\GridFilterableOperatorsDate $value) {
        $this->setProperty('date', $value);

        return $this;
    }

    public function setEnums(\kendo\ui\GridFilterableOperatorsEnums $value) {
        $this->setProperty('enums', $value);

        return $this;
    }

//<< Properties
}

?>
