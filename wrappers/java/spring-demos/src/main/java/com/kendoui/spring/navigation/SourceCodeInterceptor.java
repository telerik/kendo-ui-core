package com.kendoui.spring.navigation;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.context.ServletContextAware;
import org.springframework.web.context.support.ServletContextResource;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class SourceCodeInterceptor extends HandlerInterceptorAdapter implements ServletContextAware  {
    private ServletContext context;
    
    @Override
    public void postHandle(HttpServletRequest request, 
            HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {
        
        if (modelAndView != null) {
            ServletContextResource resource = new ServletContextResource(context, "/WEB-INF/views/" + modelAndView.getViewName() + ".jsp");
            
            BufferedReader input = new BufferedReader(new InputStreamReader(resource.getInputStream()));
            
            StringBuilder content = new StringBuilder();
            String line = input.readLine();
            
            while (line != null) {
                content.append(line + "\r\n");
                line = input.readLine();
            }
            
            input.close();
            
            modelAndView.addObject("view", content.toString());
        }
    }

    @Override
    public void setServletContext(ServletContext context) {
        this.context = context;
    }
}
