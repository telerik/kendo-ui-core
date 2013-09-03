
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class CategoryAxisItemAutoBaseUnitStepsTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        CategoryAxisItemTag parent = (CategoryAxisItemTag)findParentWithClass(CategoryAxisItemTag.class);


        parent.setAutoBaseUnitSteps(this);

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
        return "chart-categoryAxisItem-autoBaseUnitSteps";
    }

    public java.lang.Object getDays() {
        return (java.lang.Object)getProperty("days");
    }

    public void setDays(java.lang.Object value) {
        setProperty("days", value);
    }

    public java.lang.Object getHours() {
        return (java.lang.Object)getProperty("hours");
    }

    public void setHours(java.lang.Object value) {
        setProperty("hours", value);
    }

    public java.lang.Object getMinutes() {
        return (java.lang.Object)getProperty("minutes");
    }

    public void setMinutes(java.lang.Object value) {
        setProperty("minutes", value);
    }

    public java.lang.Object getMonths() {
        return (java.lang.Object)getProperty("months");
    }

    public void setMonths(java.lang.Object value) {
        setProperty("months", value);
    }

    public java.lang.Object getSeconds() {
        return (java.lang.Object)getProperty("seconds");
    }

    public void setSeconds(java.lang.Object value) {
        setProperty("seconds", value);
    }

    public java.lang.Object getWeeks() {
        return (java.lang.Object)getProperty("weeks");
    }

    public void setWeeks(java.lang.Object value) {
        setProperty("weeks", value);
    }

    public java.lang.Object getYears() {
        return (java.lang.Object)getProperty("years");
    }

    public void setYears(java.lang.Object value) {
        setProperty("years", value);
    }

//<< Attributes

}
