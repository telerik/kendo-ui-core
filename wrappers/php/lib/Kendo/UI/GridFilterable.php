<?php

namespace Kendo\UI;

class GridFilterable extends \Kendo\SerializableObject {
//>> Properties

    public function extra($value) {
        $this->setProperty('extra', $value);

        return $this;
    }

    public function messages(\Kendo\UI\GridFilterableMessages $value) {
        $this->setProperty('messages', $value);

        return $this;
    }

    public function operators(\Kendo\UI\GridFilterableOperators $value) {
        $this->setProperty('operators', $value);

        return $this;
    }

//<< Properties
}

?>
