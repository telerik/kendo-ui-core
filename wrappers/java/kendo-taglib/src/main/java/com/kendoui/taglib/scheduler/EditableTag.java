
package com.kendoui.taglib.scheduler;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.SchedulerTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class EditableTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SchedulerTag parent = (SchedulerTag)findParentWithClass(SchedulerTag.class);


        parent.setEditable(this);

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
        return "scheduler-editable";
    }

    public void setTemplate(EditableTemplateFunctionTag value) {
        setEvent("template", value.getBody());
    }

    public Object getConfirmation() {
        return (Object)getProperty("confirmation");
    }

    public void setConfirmation(Object value) {
        setProperty("confirmation", value);
    }

    public boolean getCreate() {
        return (boolean)getProperty("create");
    }

    public void setCreate(boolean value) {
        setProperty("create", value);
    }

    public boolean getDestroy() {
        return (boolean)getProperty("destroy");
    }

    public void setDestroy(boolean value) {
        setProperty("destroy", value);
    }

    public String getTemplate() {
        return (String)getProperty("template");
    }

    public void setTemplate(String value) {
        setProperty("template", value);
    }

    public boolean getUpdate() {
        return (boolean)getProperty("update");
    }

    public void setUpdate(boolean value) {
        setProperty("update", value);
    }

//<< Attributes

}
