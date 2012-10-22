
package com.kendoui.taglib.editor;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.EditorTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PasteTag extends FunctionTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        EditorTag parent = (EditorTag)findParentWithClass(EditorTag.class);

        parent.setPaste(this);

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
        return "editor-paste";
    }

//<< Attributes

}
