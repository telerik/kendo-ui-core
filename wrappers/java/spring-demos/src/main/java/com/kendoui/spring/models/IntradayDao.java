package com.kendoui.spring.models;

import java.util.List;

public interface IntradayDao {
    public List<?> getList(DataSourceRequest request);
}
