<?php

namespace Kendo\UI;

class GridFilterable extends \Kendo\SerializableObject {
//>> Properties

    public function extra($value) {
        return $this->setProperty('extra', $value);
    }

    public function messages(\Kendo\UI\GridFilterableMessages $value) {
        return $this->setProperty('messages', $value);
    }

    public function operators(\Kendo\UI\GridFilterableOperators $value) {
        return $this->setProperty('operators', $value);
    }

//<< Properties
}

?>
