package com.kendoui.spring.models;

import java.util.ArrayList;
import java.util.List;

public class OrgChartItem {
    private String firstName;
    private String lastName;
    private String image;
    private String title;
    private String colorScheme;
    private List<OrgChartItem> items = new ArrayList<OrgChartItem>();

    public OrgChartItem(String firstName, String lastName, String image, String title, String colorScheme) {
        setFirstName(firstName);
        setLastName(lastName);
        setImage(image);
        setTitle(title);
        setColorScheme(colorScheme);
    }
    
    public List<OrgChartItem> getItems() {
        return items;
    }
    
    public void setItems(List<OrgChartItem> items) {
        this.items = items;
    }
    
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
    
    public String getColorScheme() {
        return colorScheme;
    }

    public void setColorScheme(String colorScheme) {
        this.colorScheme = colorScheme;
    }}