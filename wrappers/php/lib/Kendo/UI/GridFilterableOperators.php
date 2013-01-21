<?php

namespace Kendo\UI;

class GridFilterableOperators extends \Kendo\SerializableObject {
//>> Properties

    public function setString(\Kendo\UI\GridFilterableOperatorsString $value) {
        $this->setProperty('string', $value);

        return $this;
    }

    public function setNumber(\Kendo\UI\GridFilterableOperatorsNumber $value) {
        $this->setProperty('number', $value);

        return $this;
    }

    public function setDate(\Kendo\UI\GridFilterableOperatorsDate $value) {
        $this->setProperty('date', $value);

        return $this;
    }

    public function setEnums(\Kendo\UI\GridFilterableOperatorsEnums $value) {
        $this->setProperty('enums', $value);

        return $this;
    }

//<< Properties
}

?>
