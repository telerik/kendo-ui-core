
package com.kendoui.taglib.gantt;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.GanttTag;


import com.kendoui.taglib.GridTag;

import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ColumnsTag extends BaseTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag

        GanttTag parent = (GanttTag)findParentWithClass(GanttTag.class);
        
        parent.setColumns(this);

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
//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> columns;

    public List<Map<String, Object>> columns() {
        return columns;
    }

    public static String tagName() {
        return "gantt-columns";
    }

    public void addColumn(ColumnTag value) {
        columns.add(value.properties());
    }

//<< Attributes

}
