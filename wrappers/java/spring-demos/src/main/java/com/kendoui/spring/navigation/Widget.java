package com.kendoui.spring.navigation;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Widget extends Item {
    private Example[] items;

    public Example[] getItems() {
        return items;
    }

    public void setItems(Example[] items) {
        this.items = items;
    }
}
