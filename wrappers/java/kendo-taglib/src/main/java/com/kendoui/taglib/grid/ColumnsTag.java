
package com.kendoui.taglib.grid;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ColumnsTag extends BaseTag /* interfaces */implements Column/* interfaces */ {

//>> Attributes

    private List<Map<String, Object>> columns;

    @Override
    public void initialize() {
        columns = new ArrayList<Map<String, Object>>();

        super.initialize();
    }

    @Override
    public void destroy() {
        columns = null;

        super.destroy();
    }

    public List<Map<String, Object>> columns () {
        return columns;
    }

    @Override
    public int doEndTag() throws JspException {
        Columns parent = (Columns)findParentWithClass(Columns.class);

        parent.setColumns(this);

        return super.doEndTag();
    }

    @Override
    public void addColumn(ColumnTag value) {
        columns.add(value.properties());
    }

//<< Attributes
}
