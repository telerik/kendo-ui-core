package com.kendoui.spring.models;

import java.util.List;

public interface IntradayDao {
    public List<Intraday> getList(DataSourceRequest request);
}
