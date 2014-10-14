package com.kendoui.spring.controllers.grid;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.DataSourceRequest;
import com.kendoui.spring.models.DataSourceResult;
import com.kendoui.spring.models.EmployeeDao;

@Controller("grid-pdf-export-controller")
@RequestMapping(value = "/grid/")
public class PdfExportController {
    @Autowired
    private EmployeeDao employee;

    @RequestMapping(value = "/pdf-export", method = RequestMethod.GET)
    public String index() {
        return "grid/pdf-export";
    }

    @RequestMapping(value = "/pdf-export/read", method = RequestMethod.POST)
    public @ResponseBody
    DataSourceResult read(@RequestBody DataSourceRequest request) {

        return employee.getList(request);
    }

    @RequestMapping(value = "/pdf-export/save", method = RequestMethod.POST)
    public @ResponseBody
    void save(String fileName, String base64, String contentType,
            HttpServletResponse response) throws IOException {

        response.setHeader("Content-Disposition", "attachment;filename="
                + fileName);
        response.setContentType(contentType);

        byte[] data = DatatypeConverter.parseBase64Binary(base64);

        response.setContentLength(data.length);
        response.getOutputStream().write(data);
        response.flushBuffer();
    }
}