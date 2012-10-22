package com.kendoui.taglib;

import java.util.List;

@SuppressWarnings("serial")
public class BaseItemTagTestDouble extends BaseItemTag {
    
    public String text;
    public String spriteCssClass;

    public static String tagName() {
        return "baseTagTestDouble";
    }

    @Override
    protected List<?> items() {
        return null;
    }

    @Override
    protected String getText() {
        return text;
    }

    @Override
    protected String getSpriteCssClass() {
        return spriteCssClass;
    }

}
