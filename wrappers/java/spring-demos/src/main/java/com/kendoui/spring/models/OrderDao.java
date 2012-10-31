package com.kendoui.spring.models;

import java.util.List;

public interface OrderDao {
    public DataSourceResult getList(DataSourceRequest request);
    public List<?> getListByProductId(DataSourceRequest request);
}
