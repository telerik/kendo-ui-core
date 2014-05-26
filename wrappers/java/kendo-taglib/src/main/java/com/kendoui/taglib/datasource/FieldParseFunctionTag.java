package com.kendoui.taglib.datasource;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.FunctionTag;

@SuppressWarnings("serial")
public class FieldParseFunctionTag extends FunctionTag
{
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        FieldTag parent = (FieldTag)findParentWithClass(FieldTag.class);


        parent.setParse(this);

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
        return "dataSource-schema-model-field-parse";
    }

  //<< Attributes      

}
