<?php

namespace Kendo\UI;

class GridFilterableOperators extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Enable/Disable and set the text of filter operators for fields of type string.
    * @param \Kendo\UI\GridFilterableOperatorsString $value
    */
    public function string(\Kendo\UI\GridFilterableOperatorsString $value) {
        return $this->setProperty('string', $value);
    }

    /**
    * Enable/Disable and set the text of filter operators for fields of type number.
    * @param \Kendo\UI\GridFilterableOperatorsNumber $value
    */
    public function number(\Kendo\UI\GridFilterableOperatorsNumber $value) {
        return $this->setProperty('number', $value);
    }

    /**
    * Enable/Disable and set the text of filter operators for fields of type date.
    * @param \Kendo\UI\GridFilterableOperatorsDate $value
    */
    public function date(\Kendo\UI\GridFilterableOperatorsDate $value) {
        return $this->setProperty('date', $value);
    }

    /**
    * Enable/Disable and set the text of filter operators for foreign key columns.
    * @param \Kendo\UI\GridFilterableOperatorsEnums $value
    */
    public function enums(\Kendo\UI\GridFilterableOperatorsEnums $value) {
        return $this->setProperty('enums', $value);
    }

//<< Properties
}

?>
