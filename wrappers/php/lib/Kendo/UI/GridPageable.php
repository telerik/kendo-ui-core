<?php

namespace Kendo\UI;

class GridPageable extends \Kendo\SerializableObject {
//>> Properties

    public function pageSize($value) {
        $this->setProperty('pageSize', $value);

        return $this;
    }

    public function previousNext($value) {
        $this->setProperty('previousNext', $value);

        return $this;
    }

    public function numeric($value) {
        $this->setProperty('numeric', $value);

        return $this;
    }

    public function buttonCount($value) {
        $this->setProperty('buttonCount', $value);

        return $this;
    }

    public function input($value) {
        $this->setProperty('input', $value);

        return $this;
    }

    public function pageSizes($value) {
        $this->setProperty('pageSizes', $value);

        return $this;
    }

    public function refresh($value) {
        $this->setProperty('refresh', $value);

        return $this;
    }

    public function info($value) {
        $this->setProperty('info', $value);

        return $this;
    }

    public function messages(\Kendo\UI\GridPageableMessages $value) {
        $this->setProperty('messages', $value);

        return $this;
    }

//<< Properties
}

?>
