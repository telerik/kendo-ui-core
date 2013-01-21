<?php

namespace Kendo\UI;

class Grid extends \Kendo\UI\Widget {
    public function name() {
        return 'Grid';
    }
//>> Properties

    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    public function addColumn(\Kendo\UI\GridColumn $value) {
        return $this->add('columns', $value);
    }

    public function columnMenu($value) {
        return $this->setProperty('columnMenu', $value);
    }

    public function dataSource(\Kendo\Data\DataSource $value) {
        return $this->setProperty('dataSource', $value);
    }

    public function editable($value) {
        return $this->setProperty('editable', $value);
    }

    public function filterable($value) {
        return $this->setProperty('filterable', $value);
    }

    public function reorderable($value) {
        return $this->setProperty('reorderable', $value);
    }

    public function resizable($value) {
        return $this->setProperty('resizable', $value);
    }

    public function groupable($value) {
        return $this->setProperty('groupable', $value);
    }

    public function height($value) {
        return $this->setProperty('height', $value);
    }

    public function navigatable($value) {
        return $this->setProperty('navigatable', $value);
    }

    public function pageable($value) {
        return $this->setProperty('pageable', $value);
    }

    public function scrollable($value) {
        return $this->setProperty('scrollable', $value);
    }

    public function selectable($value) {
        return $this->setProperty('selectable', $value);
    }

    public function sortable($value) {
        return $this->setProperty('sortable', $value);
    }

    public function addToolbarItem(\Kendo\UI\GridToolbarItem $value) {
        return $this->add('toolbar', $value);
    }

    public function detailTemplate($value) {
        return $this->setProperty('detailTemplate', $value);
    }

    public function rowTemplate($value) {
        return $this->setProperty('rowTemplate', $value);
    }

    public function altRowTemplate($value) {
        return $this->setProperty('altRowTemplate', $value);
    }

    public function change($value) {
        return $this->setProperty('change', new \Kendo\JavaScriptFunction($value));
    }

    public function columnHide($value) {
        return $this->setProperty('columnHide', new \Kendo\JavaScriptFunction($value));
    }

    public function columnReorder($value) {
        return $this->setProperty('columnReorder', new \Kendo\JavaScriptFunction($value));
    }

    public function columnResize($value) {
        return $this->setProperty('columnResize', new \Kendo\JavaScriptFunction($value));
    }

    public function columnShow($value) {
        return $this->setProperty('columnShow', new \Kendo\JavaScriptFunction($value));
    }

    public function dataBound($value) {
        return $this->setProperty('dataBound', new \Kendo\JavaScriptFunction($value));
    }

    public function dataBinding($value) {
        return $this->setProperty('dataBinding', new \Kendo\JavaScriptFunction($value));
    }

    public function detailCollapse($value) {
        return $this->setProperty('detailCollapse', new \Kendo\JavaScriptFunction($value));
    }

    public function detailExpand($value) {
        return $this->setProperty('detailExpand', new \Kendo\JavaScriptFunction($value));
    }

    public function detailInit($value) {
        return $this->setProperty('detailInit', new \Kendo\JavaScriptFunction($value));
    }

    public function edit($value) {
        return $this->setProperty('edit', new \Kendo\JavaScriptFunction($value));
    }

    public function filterMenuInit($value) {
        return $this->setProperty('filterMenuInit', new \Kendo\JavaScriptFunction($value));
    }

    public function columnMenuInit($value) {
        return $this->setProperty('columnMenuInit', new \Kendo\JavaScriptFunction($value));
    }

    public function remove($value) {
        return $this->setProperty('remove', new \Kendo\JavaScriptFunction($value));
    }

    public function save($value) {
        return $this->setProperty('save', new \Kendo\JavaScriptFunction($value));
    }

    public function saveChanges($value) {
        return $this->setProperty('saveChanges', new \Kendo\JavaScriptFunction($value));
    }

//<< Properties
}

?>
