<?php

namespace Kendo\UI;

class ListView extends \Kendo\UI\Widget {
    public function name() {
        return 'ListView';
    }
//>> Properties

    public function autoBind($value) {
        $this->setProperty('autoBind', $value);

        return $this;
    }

    public function dataSource(\Kendo\Data\DataSource $value) {
        $this->setProperty('dataSource', $value);

        return $this;
    }

    public function navigatable($value) {
        $this->setProperty('navigatable', $value);

        return $this;
    }

    public function selectable($value) {
        $this->setProperty('selectable', $value);

        return $this;
    }

    public function template($value) {
        $this->setProperty('template', $value);

        return $this;
    }

    public function editTemplate($value) {
        $this->setProperty('editTemplate', $value);

        return $this;
    }

    public function altTemplate($value) {
        $this->setProperty('altTemplate', $value);

        return $this;
    }

    public function pageable($value) {
        $this->setProperty('pageable', $value);

        return $this;
    }

    public function tagName($value) {
        $this->setProperty('tagName', $value);

        return $this;
    }

    public function change($value) {
        $this->setProperty('change', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function dataBound($value) {
        $this->setProperty('dataBound', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function dataBinding($value) {
        $this->setProperty('dataBinding', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function edit($value) {
        $this->setProperty('edit', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function remove($value) {
        $this->setProperty('remove', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
