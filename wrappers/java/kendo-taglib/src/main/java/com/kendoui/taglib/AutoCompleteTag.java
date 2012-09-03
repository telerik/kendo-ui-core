package com.kendoui.taglib;

import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Input;

@SuppressWarnings("serial")
public class AutoCompleteTag extends WidgetTag implements DataBoundWidget {

    public AutoCompleteTag() {
        super("AutoComplete");
    }

    @Override
    public void setDataSource(DataSource dataSource) {

    }

    @Override
    protected Element<?> createElement() {
        return new Input();
    }
}
