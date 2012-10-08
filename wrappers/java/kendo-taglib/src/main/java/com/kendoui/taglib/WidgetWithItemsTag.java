package com.kendoui.taglib;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@SuppressWarnings("serial")
public abstract class WidgetWithItemsTag extends WidgetTag {

    public WidgetWithItemsTag(String widget) {
        super(widget);
    }

    protected List<Map<String, Object>> items; 
    
    @Override
    public void initialize() {
        items = new ArrayList<Map<String, Object>>();
        
        super.initialize();
    }

    @Override
    public void destroy() {
        items = null;
        
        super.destroy();
    }
}
