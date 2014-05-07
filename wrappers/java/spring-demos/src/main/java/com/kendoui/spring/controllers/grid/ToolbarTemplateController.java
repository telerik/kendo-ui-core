package com.kendoui.spring.controllers.grid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.CategoryDao;
import com.kendoui.spring.models.DataSourceRequest;
import com.kendoui.spring.models.DataSourceResult;
import com.kendoui.spring.models.ProductDao;

@Controller("grid-toolbar-template-controller")
@RequestMapping(value="/grid/")
public class ToolbarTemplateController {
    @Autowired    
    private ProductDao product;
    
    @Autowired 
    private CategoryDao category;

    @RequestMapping(value = "/toolbar-template", method = RequestMethod.GET)
    public String index() {
        return "grid/toolbar-template";
    }
    
    @RequestMapping(value = "/toolbar-template/read", method = RequestMethod.POST)
    public @ResponseBody DataSourceResult read(@RequestBody DataSourceRequest request) {
        return product.getList(request);
    }
    
    @RequestMapping(value = "/toolbar-template/categories", method = RequestMethod.GET)
    public @ResponseBody List<?> categories() {
        return category.getList();
    }
}