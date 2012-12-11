
package com.kendoui.taglib.listview;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.ListViewTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class DataBindingFunctionTag extends FunctionTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ListViewTag parent = (ListViewTag)findParentWithClass(ListViewTag.class);


        parent.setDataBinding(this);

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
        return "listView-dataBinding";
    }

//<< Attributes

}
