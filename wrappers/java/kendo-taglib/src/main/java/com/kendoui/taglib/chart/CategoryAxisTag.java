
package com.kendoui.taglib.chart;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.ChartTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class CategoryAxisTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ChartTag parent = (ChartTag)findParentWithClass(ChartTag.class);

        parent.setCategoryAxis(this);

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
        return "chart-categoryAxis";
    }

    public void setLabels(LabelsTag value) {
        setProperty("labels", value);
    }

    public void setLine(LineTag value) {
        setProperty("line", value);
    }

    public void setMajorGridLines(MajorGridLinesTag value) {
        setProperty("majorgridlines", value);
    }

    public void setMajorTicks(MajorTicksTag value) {
        setProperty("majorticks", value);
    }

    public void setMinorGridLines(MinorGridLinesTag value) {
        setProperty("minorgridlines", value);
    }

    public void setMinorTicks(MinorTicksTag value) {
        setProperty("minorticks", value);
    }

    public void setTitle(TitleTag value) {
        setProperty("title", value);
    }

    public float getAxisCrossingValue() {
        return (float)getProperty("axisCrossingValue");
    }

    public void setAxisCrossingValue(float value) {
        setProperty("axisCrossingValue", value);
    }

    public Object getAxisCrossingValues() {
        return (Object)getProperty("axisCrossingValues");
    }

    public void setAxisCrossingValues(Object value) {
        setProperty("axisCrossingValues", value);
    }

    public Object getCategories() {
        return (Object)getProperty("categories");
    }

    public void setCategories(Object value) {
        setProperty("categories", value);
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
    }

    public String getField() {
        return (String)getProperty("field");
    }

    public void setField(String value) {
        setProperty("field", value);
    }

    public boolean getJustified() {
        return (boolean)getProperty("justified");
    }

    public void setJustified(boolean value) {
        setProperty("justified", value);
    }

    public String getName() {
        return (String)getProperty("name");
    }

    public void setName(String value) {
        setProperty("name", value);
    }

    public Object getPlotBands() {
        return (Object)getProperty("plotBands");
    }

    public void setPlotBands(Object value) {
        setProperty("plotBands", value);
    }

    public boolean getReverse() {
        return (boolean)getProperty("reverse");
    }

    public void setReverse(boolean value) {
        setProperty("reverse", value);
    }

    public String getType() {
        return (String)getProperty("type");
    }

    public void setType(String value) {
        setProperty("type", value);
    }

    public Object getAutoBaseUnitSteps() {
        return (Object)getProperty("autoBaseUnitSteps");
    }

    public void setAutoBaseUnitSteps(Object value) {
        setProperty("autoBaseUnitSteps", value);
    }

    public String getBaseUnit() {
        return (String)getProperty("baseUnit");
    }

    public void setBaseUnit(String value) {
        setProperty("baseUnit", value);
    }

    public Object getBaseUnitStep() {
        return (Object)getProperty("baseUnitStep");
    }

    public void setBaseUnitStep(Object value) {
        setProperty("baseUnitStep", value);
    }

    public java.util.Date getMax() {
        return (java.util.Date)getProperty("max");
    }

    public void setMax(java.util.Date value) {
        setProperty("max", value);
    }

    public java.util.Date getMin() {
        return (java.util.Date)getProperty("min");
    }

    public void setMin(java.util.Date value) {
        setProperty("min", value);
    }

    public boolean getRoundToBaseUnit() {
        return (boolean)getProperty("roundToBaseUnit");
    }

    public void setRoundToBaseUnit(boolean value) {
        setProperty("roundToBaseUnit", value);
    }

    public float getWeekStartDay() {
        return (float)getProperty("weekStartDay");
    }

    public void setWeekStartDay(float value) {
        setProperty("weekStartDay", value);
    }

    public float getMaxDateGroups() {
        return (float)getProperty("maxDateGroups");
    }

    public void setMaxDateGroups(float value) {
        setProperty("maxDateGroups", value);
    }

    public boolean getVisible() {
        return (boolean)getProperty("visible");
    }

    public void setVisible(boolean value) {
        setProperty("visible", value);
    }

//<< Attributes

}
