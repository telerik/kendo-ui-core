package com.kendoui.taglib.gantt;

import com.kendoui.taglib.DataSourceTag;
import com.kendoui.taglib.GanttTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class DependenciesTag extends DataSourceTag {

    @Override
    public int doEndTag() throws JspException {

        GanttTag widget = (GanttTag)findParentWithClass(GanttTag.class);
        
        widget.setDependencies(this);
        
        destroy();

        return 0;
    }

    @Override
    public void initialize() {

        super.initialize();
    }

    @Override
    public void destroy() {

        super.destroy();
    }

    public static String tagName() {
        return "dependencies";
    }

}
