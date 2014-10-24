
package com.kendoui.taglib.grid;


@SuppressWarnings("serial")
public class ColumnGroupTag extends ColumnTag  /* interfaces *//* interfaces */ {
    
    @Override
    public void initialize() {
//>> initialize
//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "grid-column-group";
    }
    
    public void setColumns(ColumnGroupColumnsTag value) {
        setProperty("columns", value.columns());
    }

//<< Attributes    
    
}
