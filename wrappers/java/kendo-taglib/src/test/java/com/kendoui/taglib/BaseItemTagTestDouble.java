package com.kendoui.taglib;

@SuppressWarnings("serial")
public class BaseItemTagTestDouble extends BaseItemTag {
    
    public String text;
    public String spriteCssClass;
    public boolean expanded;
    public boolean enabled;

    public static String tagName() {
        return "baseTagTestDouble";
    }

    @Override
    protected String getText() {
        return text;
    }

    @Override
    protected String getSpriteCssClass() {
        return spriteCssClass;
    }

    @Override
    protected boolean getExpanded() {
        return expanded;
    }

    @Override
    protected String getImageUrl() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    protected boolean getEnabled() {
        return enabled;
    }

}
