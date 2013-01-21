<?php

namespace Kendo\UI;

class ListView extends \Kendo\UI\Widget {
    public function name() {
        return 'ListView';
    }
//>> Properties

    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    public function dataSource(\Kendo\Data\DataSource $value) {
        return $this->setProperty('dataSource', $value);
    }

    public function navigatable($value) {
        return $this->setProperty('navigatable', $value);
    }

    public function selectable($value) {
        return $this->setProperty('selectable', $value);
    }

    public function template($value) {
        return $this->setProperty('template', $value);
    }

    public function editTemplate($value) {
        return $this->setProperty('editTemplate', $value);
    }

    public function altTemplate($value) {
        return $this->setProperty('altTemplate', $value);
    }

    public function pageable($value) {
        return $this->setProperty('pageable', $value);
    }

    public function tagName($value) {
        return $this->setProperty('tagName', $value);
    }

    public function change($value) {
        return $this->setProperty('change', new \Kendo\JavaScriptFunction($value));
    }

    public function dataBound($value) {
        return $this->setProperty('dataBound', new \Kendo\JavaScriptFunction($value));
    }

    public function dataBinding($value) {
        return $this->setProperty('dataBinding', new \Kendo\JavaScriptFunction($value));
    }

    public function edit($value) {
        return $this->setProperty('edit', new \Kendo\JavaScriptFunction($value));
    }

    public function remove($value) {
        return $this->setProperty('remove', new \Kendo\JavaScriptFunction($value));
    }

//<< Properties
}

?>
