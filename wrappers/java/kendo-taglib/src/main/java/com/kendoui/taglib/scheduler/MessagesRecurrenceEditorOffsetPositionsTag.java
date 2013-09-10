
package com.kendoui.taglib.scheduler;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesRecurrenceEditorOffsetPositionsTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MessagesRecurrenceEditorTag parent = (MessagesRecurrenceEditorTag)findParentWithClass(MessagesRecurrenceEditorTag.class);


        parent.setOffsetPositions(this);

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
        return "scheduler-messages-recurrenceEditor-offsetPositions";
    }

    public java.lang.String getFirst() {
        return (java.lang.String)getProperty("first");
    }

    public void setFirst(java.lang.String value) {
        setProperty("first", value);
    }

    public java.lang.String getFourth() {
        return (java.lang.String)getProperty("fourth");
    }

    public void setFourth(java.lang.String value) {
        setProperty("fourth", value);
    }

    public java.lang.String getLast() {
        return (java.lang.String)getProperty("last");
    }

    public void setLast(java.lang.String value) {
        setProperty("last", value);
    }

    public java.lang.String getSecond() {
        return (java.lang.String)getProperty("second");
    }

    public void setSecond(java.lang.String value) {
        setProperty("second", value);
    }

    public java.lang.String getThird() {
        return (java.lang.String)getProperty("third");
    }

    public void setThird(java.lang.String value) {
        setProperty("third", value);
    }

//<< Attributes

}
