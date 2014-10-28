package com.kendoui.taglib.diagram;

import com.kendoui.taglib.DataSourceTag;
import com.kendoui.taglib.DiagramTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class DiagramConnectionsDataSource extends DataSourceTag {

    @Override
    public int doEndTag() throws JspException {

        DiagramTag widget = (DiagramTag)findParentWithClass(DiagramTag.class);
        
        widget.setConnectionsDataSource(this);
        
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
        return "diagram-connectionsDataSource";
    }

}

