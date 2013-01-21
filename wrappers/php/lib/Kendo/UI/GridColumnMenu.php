<?php

namespace Kendo\UI;

class GridColumnMenu extends \Kendo\SerializableObject {
//>> Properties

    public function setColumns($value) {
        $this->setProperty('columns', $value);

        return $this;
    }

    public function setFilterable($value) {
        $this->setProperty('filterable', $value);

        return $this;
    }

    public function setSortable($value) {
        $this->setProperty('sortable', $value);

        return $this;
    }

    public function setMessages(\Kendo\UI\GridColumnMenuMessages $value) {
        $this->setProperty('messages', $value);

        return $this;
    }

//<< Properties
}

?>
