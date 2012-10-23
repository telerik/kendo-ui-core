
package com.kendoui.taglib.numerictextbox;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.NumericTextBoxTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SpinFunctionTag extends FunctionTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        NumericTextBoxTag parent = (NumericTextBoxTag)findParentWithClass(NumericTextBoxTag.class);


        parent.setSpin(this);

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
        return "numericTextBox-spin";
    }

//<< Attributes

}
