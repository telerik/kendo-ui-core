
package com.kendoui.taglib.datasource;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.DataSourceTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class RequestStartFunctionTag extends FunctionTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        DataSourceTag parent = (DataSourceTag)findParentWithClass(DataSourceTag.class);

        parent.setRequestStart(this);

//<< doEndTag

        return super.doEndTag();
    }

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
        return "dataSource-requestStart";
    }

//<< Attributes

}
