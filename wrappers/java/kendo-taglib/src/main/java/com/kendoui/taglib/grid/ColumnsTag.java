
package com.kendoui.taglib.grid;

import java.util.ArrayList;
import java.util.List;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ColumnsTag extends BaseTag /* interfaces */implements Column/* interfaces */ {

//>> Attributes

    private List<ColumnTag> columns = new ArrayList<ColumnTag>();

    public List<ColumnTag> columns () {
        return columns;
    }

    @Override
    public int doEndTag() throws JspException {
        Columns parent = (Columns)findParentWithClass(Columns.class);

        parent.setColumns(this);

        return EVAL_PAGE;
    }

    @Override
    public void addColumn(ColumnTag value) {
        columns.add(value);
    }

//<< Attributes
}
