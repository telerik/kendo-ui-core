package com.kendoui.spring.models;

import java.util.List;

public interface CategoryDao {
    public DataSourceResult getList(DataSourceRequest request);
    public List<Category> getList();
}
