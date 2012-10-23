
package com.kendoui.taglib.grid;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.GridTag;


import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ColumnsTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        GridTag parent = (GridTag)findParentWithClass(GridTag.class);


        parent.setColumns(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        columns = new ArrayList<Map<String, Object>>();

//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy

        columns = null;

//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> columns;

    public List<Map<String, Object>> columns() {
        return columns;
    }

    public static String tagName() {
        return "grid-columns";
    }

    public void addColumn(ColumnsColumnTag value) {
        columns.add(value.properties());
    }

//<< Attributes

}
