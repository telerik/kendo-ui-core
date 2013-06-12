
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

    public Object getDays() {
        return (Object)getProperty("days");
    }

    public void setDays(Object value) {
        setProperty("days", value);
    }

    public Object getHours() {
        return (Object)getProperty("hours");
    }

    public void setHours(Object value) {
        setProperty("hours", value);
    }

    public Object getMinutes() {
        return (Object)getProperty("minutes");
    }

    public void setMinutes(Object value) {
        setProperty("minutes", value);
    }

    public Object getMonths() {
        return (Object)getProperty("months");
    }

    public void setMonths(Object value) {
        setProperty("months", value);
    }

    public Object getWeeks() {
        return (Object)getProperty("weeks");
    }

    public void setWeeks(Object value) {
        setProperty("weeks", value);
    }

    public Object getYears() {
        return (Object)getProperty("years");
    }

    public void setYears(Object value) {
        setProperty("years", value);
    }

//<< Attributes

}
