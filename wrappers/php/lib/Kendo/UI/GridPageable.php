<?php

namespace Kendo\UI;

class GridPageable extends \Kendo\SerializableObject {
//>> Properties

    public function setPageSize($value) {
        $this->setProperty('pageSize', $value);

        return $this;
    }

    public function setPreviousNext($value) {
        $this->setProperty('previousNext', $value);

        return $this;
    }

    public function setNumeric($value) {
        $this->setProperty('numeric', $value);

        return $this;
    }

    public function setButtonCount($value) {
        $this->setProperty('buttonCount', $value);

        return $this;
    }

    public function setInput($value) {
        $this->setProperty('input', $value);

        return $this;
    }

    public function setPageSizes($value) {
        $this->setProperty('pageSizes', $value);

        return $this;
    }

    public function setRefresh($value) {
        $this->setProperty('refresh', $value);

        return $this;
    }

    public function setInfo($value) {
        $this->setProperty('info', $value);

        return $this;
    }

    public function setMessages(\Kendo\UI\GridPageableMessages $value) {
        $this->setProperty('messages', $value);

        return $this;
    }

//<< Properties
}

?>
