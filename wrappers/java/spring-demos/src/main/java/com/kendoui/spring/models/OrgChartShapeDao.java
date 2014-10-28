package com.kendoui.spring.models;

import java.util.List;

public interface OrgChartShapeDao {
    public List<OrgChartShape> getList();

    public void saveOrUpdate(OrgChartShape shape);

    public void delete(OrgChartShape shape);
}