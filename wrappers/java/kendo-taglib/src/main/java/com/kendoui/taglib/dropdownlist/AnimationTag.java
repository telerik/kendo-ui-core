
package com.kendoui.taglib.dropdownlist;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.DropDownListTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class AnimationTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        DropDownListTag parent = (DropDownListTag)findParentWithClass(DropDownListTag.class);


        parent.setAnimation(this);

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
        return "dropDownList-animation";
    }

    public void setClose(com.kendoui.taglib.dropdownlist.AnimationCloseTag value) {
        setProperty("close", value);
    }

    public void setOpen(com.kendoui.taglib.dropdownlist.AnimationOpenTag value) {
        setProperty("open", value);
    }

//<< Attributes

}
