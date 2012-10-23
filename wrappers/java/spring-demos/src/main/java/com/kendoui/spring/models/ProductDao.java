package com.kendoui.spring.models;

import java.util.List;

public interface ProductDao {
    public List<Product> getList();
    
    public DataSourceResult getList(DataSourceRequest request);
    
    public void saveOrUpdate(List<Product> products);
    
    public void saveOrUpdate(Product product);
    
    public void delete(List<Product> products);
    
    public void delete(Product product);
}
