
package com.kendoui.taglib.colorpicker;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.ColorPickerTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class OpenFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ColorPickerTag parent = (ColorPickerTag)findParentWithClass(ColorPickerTag.class);


        parent.setOpen(this);

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
//<< Attributes

}
