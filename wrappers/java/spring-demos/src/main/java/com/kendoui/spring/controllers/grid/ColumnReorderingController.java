package com.kendoui.spring.controllers.grid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.DataSourceRequest;
import com.kendoui.spring.models.DataSourceResult;
import com.kendoui.spring.models.OrderDao;

@Controller("grid-column-reordering-controller")
@RequestMapping(value="/grid/")
public class ColumnReorderingController {
    @Autowired 
    private OrderDao order;

    @RequestMapping(value = "/column-reordering", method = RequestMethod.GET)
    public String index() {
        return "grid/column-reordering";
    }
    
    @RequestMapping(value = "/column-reordering/read", method = RequestMethod.POST)
    public @ResponseBody DataSourceResult read(@RequestBody DataSourceRequest request) {
        return order.getList(request);
    }
}
