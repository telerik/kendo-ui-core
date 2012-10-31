
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

    public void setLabels(CategoryAxisLabelsTag value) {
        setProperty("labels", value);
    }

    public void setLine(CategoryAxisLineTag value) {
        setProperty("line", value);
    }

    public void setMajorGridLines(CategoryAxisMajorGridLinesTag value) {
        setProperty("majorgridlines", value);
    }

    public void setMajorTicks(CategoryAxisMajorTicksTag value) {
        setProperty("majorticks", value);
    }

    public void setMinorGridLines(CategoryAxisMinorGridLinesTag value) {
        setProperty("minorgridlines", value);
    }

    public void setMinorTicks(CategoryAxisMinorTicksTag value) {
        setProperty("minorticks", value);
    }

    public void setTitle(CategoryAxisTitleTag value) {
        setProperty("title", value);
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

    public Object getMax() {
        return (Object)getProperty("max");
    }

    public void setMax(Object value) {
        setProperty("max", value);
    }

    public Object getMin() {
        return (Object)getProperty("min");
    }

    public void setMin(Object value) {
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

    public Object getAxisCrossingValue() {
        return (Object)getProperty("axisCrossingValue");
    }

    public void setAxisCrossingValue(Object value) {
        setProperty("axisCrossingValue", value);
    }

//<< Attributes

}
