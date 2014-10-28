package com.kendoui.spring.models;

import java.util.List;

public interface OrgChartConnectionDao {
    public List<OrgChartConnection> getList();

    public void saveOrUpdate(OrgChartConnection connection);

    public void delete(OrgChartConnection connection);
}
