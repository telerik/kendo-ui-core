---
title: When Setting the Initial DataSource Filter an Expected Primary Expression Exception Occurs
description: Setting the initial filter in the Kendo UI Grid throws an Expected primaryExpression exception.
type: troubleshooting
page_title: Expected Primary Expression Exception Occurs When Setting the Initial DataSource Filter | Kendo UI DataSource
slug: expected-primary-expression-datasource-exception
tags: expected, primary, expression, exception, datasource, filter, mvc
ticketid: 1135350
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI DataSource for ASP.NET MVC</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>All</td>
 </tr>
 <tr>
  <td>View Engine</td>
  <td>Razor</td>
 </tr>
</table>

## Description

The server returns an exception when it tries to load data from the DataSource by using the following filter configuration:

````c#
.DataSource(dataSource => dataSource
  .Ajax()
  .Filter(filter =>
  {
    filter.Add(p => p.Employee.Surname == "Korla");
    filter.Add(p => p.Status == false);
  })
  ...
)
````

## Error Message

An `Expected primaryExpression` exception occurs:

````
[FilterParserException: Expected primaryExpression]
   Kendo.Mvc.Infrastructure.Implementation.FilterParser.PrimaryExpression() +381
   Kendo.Mvc.Infrastructure.Implementation.FilterParser.ComparisonExpression() +14
   Kendo.Mvc.Infrastructure.Implementation.FilterParser.OrExpression() +15
   Kendo.Mvc.Infrastructure.Implementation.FilterParser.Parse() +26
   Kendo.Mvc.Infrastructure.FilterDescriptorFactory.Create(String input) +63
   Kendo.Mvc.UI.DataSourceRequestModelBinder.BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext) +213
   System.Web.Mvc.ControllerActionInvoker.GetParameterValue(ControllerContext controllerContext, ParameterDescriptor parameterDescriptor) +337
   System.Web.Mvc.ControllerActionInvoker.GetParameterValues(ControllerContext controllerContext, ActionDescriptor actionDescriptor) +105
   System.Web.Mvc.Async.&lt;&gt;c__DisplayClass21.&lt;BeginInvokeAction&gt;b__19(AsyncCallback asyncCallback, Object asyncState) +743
   System.Web.Mvc.Async.WrappedAsyncResult`1.CallBeginDelegate(AsyncCallback callback, Object callbackState) +14
   System.Web.Mvc.Async.WrappedAsyncResultBase`1.Begin(AsyncCallback callback, Object state, Int32 timeout) +128
   System.Web.Mvc.Async.AsyncControllerActionInvoker.BeginInvokeAction(ControllerContext controllerContext, String actionName, AsyncCallback callback, Object state) +343
   System.Web.Mvc.Controller.&lt;BeginExecuteCore&gt;b__1c(AsyncCallback asyncCallback, Object asyncState, ExecuteCoreState innerState) +25
   System.Web.Mvc.Async.WrappedAsyncVoid`1.CallBeginDelegate(AsyncCallback callback, Object callbackState) +30
   System.Web.Mvc.Async.WrappedAsyncResultBase`1.Begin(AsyncCallback callback, Object state, Int32 timeout) +128
   System.Web.Mvc.Controller.BeginExecuteCore(AsyncCallback callback, Object state) +465
   System.Web.Mvc.Controller.&lt;BeginExecute&gt;b__14(AsyncCallback asyncCallback, Object callbackState, Controller controller) +18
   System.Web.Mvc.Async.WrappedAsyncVoid`1.CallBeginDelegate(AsyncCallback callback, Object callbackState) +20
   System.Web.Mvc.Async.WrappedAsyncResultBase`1.Begin(AsyncCallback callback, Object state, Int32 timeout) +128
   System.Web.Mvc.Controller.BeginExecute(RequestContext requestContext, AsyncCallback callback, Object state) +374
   System.Web.Mvc.Controller.System.Web.Mvc.Async.IAsyncController.BeginExecute(RequestContext requestContext, AsyncCallback callback, Object state) +16
   System.Web.Mvc.MvcHandler.&lt;BeginProcessRequest&gt;b__4(AsyncCallback asyncCallback, Object asyncState, ProcessRequestState innerState) +52
   System.Web.Mvc.Async.WrappedAsyncVoid`1.CallBeginDelegate(AsyncCallback callback, Object callbackState) +30
   System.Web.Mvc.Async.WrappedAsyncResultBase`1.Begin(AsyncCallback callback, Object state, Int32 timeout) +128
   System.Web.Mvc.MvcHandler.BeginProcessRequest(HttpContextBase httpContext, AsyncCallback callback, Object state) +384
   System.Web.Mvc.MvcHandler.BeginProcessRequest(HttpContext httpContext, AsyncCallback callback, Object state) +48
   System.Web.Mvc.MvcHandler.System.Web.IHttpAsyncHandler.BeginProcessRequest(HttpContext context, AsyncCallback cb, Object extraData) +16
   System.Web.CallHandlerExecutionStep.System.Web.HttpApplication.IExecutionStep.Execute() +103
   System.Web.HttpApplication.ExecuteStep(IExecutionStep step, Boolean&amp; completedSynchronously) +155
````

## Cause

The `Expected primaryExpression` exception is frequently caused by the incorrect formatting of the filter expression.

## Solution

Use the following syntax in the filter instead:

````c#
.DataSource(dataSource => dataSource
  .Ajax()
  .Filter(filter =>
  {
    filter.Add(p => p.Employee.Surname).IsEqualTo("Korla");
    filter.Add(p => p.Status).IsEqualTo(false);
  })
  ...
)
````
