<?php

namespace Kendo\UI;

class Pager extends \Kendo\UI\Widget {
    public function name() {
        return 'Pager';
    }
//>> Properties

    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    public function buttonCount($value) {
        return $this->setProperty('buttonCount', $value);
    }

    public function dataSource(\Kendo\Data\DataSource $value) {
        return $this->setProperty('dataSource', $value);
    }

    public function selectTemplate($value) {
        return $this->setProperty('selectTemplate', $value);
    }

    public function linkTemplate($value) {
        return $this->setProperty('linkTemplate', $value);
    }

    public function info($value) {
        return $this->setProperty('info', $value);
    }

    public function input($value) {
        return $this->setProperty('input', $value);
    }

    public function numeric($value) {
        return $this->setProperty('numeric', $value);
    }

    public function pageSizes($value) {
        return $this->setProperty('pageSizes', $value);
    }

    public function previousNext($value) {
        return $this->setProperty('previousNext', $value);
    }

    public function refresh($value) {
        return $this->setProperty('refresh', $value);
    }

    public function messages(\Kendo\UI\PagerMessages $value) {
        return $this->setProperty('messages', $value);
    }

    public function change($value) {
        return $this->setProperty('change', new \Kendo\JavaScriptFunction($value));
    }

//<< Properties
}

?>
