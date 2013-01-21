<?php

namespace Kendo\UI;

class Grid extends \Kendo\UI\Widget {
    public function name() {
        return 'Grid';
    }
//>> Properties

    public function setAutoBind($value) {
        $this->setProperty('autoBind', $value);

        return $this;
    }

    public function addColumn(\Kendo\UI\GridColumn $value) {
        $values = $this->getProperty('columns');

        if ($values == null) {
            $values = array();
            $this->setProperty('columns', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setColumnMenu($value) {
        $this->setProperty('columnMenu', $value);

        return $this;
    }

    public function setColumnMenu(\Kendo\UI\GridColumnMenu $value) {
        $this->setProperty('columnMenu', $value);

        return $this;
    }

    public function setDataSource(\Kendo\Data\DataSource $value) {
        $this->setProperty('dataSource', $value);

        return $this;
    }

    public function setEditable($value) {
        $this->setProperty('editable', $value);

        return $this;
    }

    public function setEditable(\Kendo\UI\GridEditable $value) {
        $this->setProperty('editable', $value);

        return $this;
    }

    public function setFilterable($value) {
        $this->setProperty('filterable', $value);

        return $this;
    }

    public function setFilterable(\Kendo\UI\GridFilterable $value) {
        $this->setProperty('filterable', $value);

        return $this;
    }

    public function setReorderable($value) {
        $this->setProperty('reorderable', $value);

        return $this;
    }

    public function setResizable($value) {
        $this->setProperty('resizable', $value);

        return $this;
    }

    public function setGroupable($value) {
        $this->setProperty('groupable', $value);

        return $this;
    }

    public function setGroupable(\Kendo\UI\GridGroupable $value) {
        $this->setProperty('groupable', $value);

        return $this;
    }

    public function setHeight($value) {
        $this->setProperty('height', $value);

        return $this;
    }

    public function setNavigatable($value) {
        $this->setProperty('navigatable', $value);

        return $this;
    }

    public function setPageable($value) {
        $this->setProperty('pageable', $value);

        return $this;
    }

    public function setPageable(\Kendo\UI\GridPageable $value) {
        $this->setProperty('pageable', $value);

        return $this;
    }

    public function setScrollable($value) {
        $this->setProperty('scrollable', $value);

        return $this;
    }

    public function setScrollable(\Kendo\UI\GridScrollable $value) {
        $this->setProperty('scrollable', $value);

        return $this;
    }

    public function setSelectable($value) {
        $this->setProperty('selectable', $value);

        return $this;
    }

    public function setSortable($value) {
        $this->setProperty('sortable', $value);

        return $this;
    }

    public function setSortable(\Kendo\UI\GridSortable $value) {
        $this->setProperty('sortable', $value);

        return $this;
    }

    public function addToolbarItem(\Kendo\UI\GridToolbarItem $value) {
        $values = $this->getProperty('toolbar');

        if ($values == null) {
            $values = array();
            $this->setProperty('toolbar', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setDetailTemplate($value) {
        $this->setProperty('detailTemplate', $value);

        return $this;
    }

    public function setRowTemplate($value) {
        $this->setProperty('rowTemplate', $value);

        return $this;
    }

    public function setAltRowTemplate($value) {
        $this->setProperty('altRowTemplate', $value);

        return $this;
    }

    public function setChange($value) {
        $this->setProperty('change', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setColumnHide($value) {
        $this->setProperty('columnHide', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setColumnReorder($value) {
        $this->setProperty('columnReorder', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setColumnResize($value) {
        $this->setProperty('columnResize', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setColumnShow($value) {
        $this->setProperty('columnShow', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDataBound($value) {
        $this->setProperty('dataBound', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDataBinding($value) {
        $this->setProperty('dataBinding', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDetailCollapse($value) {
        $this->setProperty('detailCollapse', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDetailExpand($value) {
        $this->setProperty('detailExpand', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDetailInit($value) {
        $this->setProperty('detailInit', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setEdit($value) {
        $this->setProperty('edit', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setFilterMenuInit($value) {
        $this->setProperty('filterMenuInit', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setColumnMenuInit($value) {
        $this->setProperty('columnMenuInit', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setRemove($value) {
        $this->setProperty('remove', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSave($value) {
        $this->setProperty('save', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSaveChanges($value) {
        $this->setProperty('saveChanges', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
