<?php

namespace Kendo\Dataviz\UI;

class TreeMap extends \Kendo\UI\Widget {
    public function name() {
        return 'TreeMap';
    }
//>> Properties

    /**
    * Sets the data source of the TreeMap.
    * @param array|\Kendo\Data\DataSource $value
    * @return \Kendo\Dataviz\UI\TreeMap
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * If set to false the widget will not bind to the data source during initialization. In this case data binding will occur when the change event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\TreeMap
    */
    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    /**
    * The theme of the TreeMap.
    * @param string $value
    * @return \Kendo\Dataviz\UI\TreeMap
    */
    public function theme($value) {
        return $this->setProperty('theme', $value);
    }

    /**
    * The data item field which contains the tile value.
    * @param string $value
    * @return \Kendo\Dataviz\UI\TreeMap
    */
    public function valueField($value) {
        return $this->setProperty('valueField', $value);
    }

    /**
    * The data item field which contains the tile color.
    * @param string $value
    * @return \Kendo\Dataviz\UI\TreeMap
    */
    public function colorField($value) {
        return $this->setProperty('colorField', $value);
    }

    /**
    * The data item field which contains the tile title.
    * @param string $value
    * @return \Kendo\Dataviz\UI\TreeMap
    */
    public function textField($value) {
        return $this->setProperty('textField', $value);
    }

    /**
    * Sets the template option of the TreeMap.
    * The template which renders the treeMap tile content.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\Dataviz\UI\TreeMap
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the TreeMap.
    * The template which renders the treeMap tile content.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\Dataviz\UI\TreeMap
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * The default colors for the treemap tiles. When all colors are used, new colors are pulled from the start again.
    * @param array $value
    * @return \Kendo\Dataviz\UI\TreeMap
    */
    public function colors($value) {
        return $this->setProperty('colors', $value);
    }

    /**
    * The layout type for the Treemap.
    * @param string $value
    * @return \Kendo\Dataviz\UI\TreeMap
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * Sets the itemCreated event of the TreeMap.
    * Fired when a tile has been created.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\TreeMap
    */
    public function itemCreated($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('itemCreated', $value);
    }

    /**
    * Sets the dataBound event of the TreeMap.
    * Fired when the widget is bound to data from its dataSource.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\TreeMap
    */
    public function dataBound($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dataBound', $value);
    }


//<< Properties
}

?>
