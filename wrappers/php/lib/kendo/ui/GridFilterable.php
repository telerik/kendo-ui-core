<?php

namespace kendo\ui;

class GridFilterable extends \kendo\SerializableObject {
//>> Properties

    public function setExtra($value) {
        $this->setProperty('extra', $value);

        return $this;
    }

    public function setMessages(\kendo\ui\GridFilterableMessages $value) {
        $this->setProperty('messages', $value);

        return $this;
    }

    public function setOperators(\kendo\ui\GridFilterableOperators $value) {
        $this->setProperty('operators', $value);

        return $this;
    }

//<< Properties
}

?>
