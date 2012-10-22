
package com.kendoui.taglib.upload;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.UploadTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SelectTag extends FunctionTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        UploadTag parent = (UploadTag)findParentWithClass(UploadTag.class);

        parent.setSelect(this);

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
        return "upload-select";
    }

//<< Attributes

}
