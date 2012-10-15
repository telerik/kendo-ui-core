package com.kendoui.spring.models;

import java.util.List;

import com.kendoui.taglib.DataSourceRequest;
import com.kendoui.taglib.DataSourceResult;

public interface ProductDao {
    public List<Product> getList();
    public DataSourceResult getList(DataSourceRequest request);
}
