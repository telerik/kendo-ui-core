
package com.kendoui.taglib.chart;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesTag extends BaseTag /* interfaces */implements SeriesItem/* interfaces */ {

//>> Attributes

    private List<Map<String, Object>> series;

    @Override
    public void initialize() {
        series = new ArrayList<Map<String, Object>>();

        super.initialize();
    }

    @Override
    public void destroy() {
        series = null;

        super.destroy();
    }

    public List<Map<String, Object>> series () {
        return series;
    }

    @Override
    public int doEndTag() throws JspException {
        Series parent = (Series)findParentWithClass(Series.class);

        parent.setSeries(this);

        return super.doEndTag();
    }

    @Override
    public void addSeriesItem(SeriesItemTag value) {
        series.add(value.properties());
    }

//<< Attributes
}
