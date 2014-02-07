package com.kendoui.taglib.grid;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class ColumnSortableTag extends BaseTag /* interfaces *//* interfaces */{

    @Override
    public int doEndTag() throws JspException {
        // >> doEndTag

        ColumnTag parent = (ColumnTag) findParentWithClass(ColumnTag.class);

        parent.setSortable(this);

        // << doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
        // >> initialize
        // << initialize

        super.initialize();
    }

    @Override
    public void destroy() {
        // >> destroy
        // << destroy

        super.destroy();
    }

    // >> Attributes

    public static String tagName() {
        return "grid-column-sortable";
    }

    public void setCompare(ColumnSortableCompareFunctionTag value) {
        setEvent("compare", value.getBody());
    }

    public String getCompare() {
        Function property = ((Function) getProperty("compare"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setCompare(String value) {
        setProperty("compare", new Function(value));
    }

    // << Attributes

}
