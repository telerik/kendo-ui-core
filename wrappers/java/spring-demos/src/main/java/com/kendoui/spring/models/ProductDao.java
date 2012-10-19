package com.kendoui.spring.models;

import java.util.List;

public interface ProductDao {
    public List<Product> getList();
    
    public DataSourceResult getList(DataSourceRequest request);
    
    public void update(List<Product> products);
}
