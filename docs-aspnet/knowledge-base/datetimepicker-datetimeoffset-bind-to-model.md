---
title: Use DateTimeOffset in a DateTimePicker and Grid
description: An example on how to bind a DateTimeOffset model value to a DateTimePicker and grid.
type: how-to
page_title: Use DateTimeOffset Model values in a DateTimePicker and Grid
slug: datetimepicker-datetimeoffset-bind-to-model
tags: datetimepicker, model, value, datetimeoffset, grid, filter
res_type: kb
---

## Environment

<table>
  <tr>
  	<td>Product</td>
  	<td>DateTimePicker for {{ site.product_long }}, Grid for {{ site.product_long }} </td>
  </tr>
</table>


## Description

The DateTimeOffset structure represents a new date-time data structure which defines a point relative to the UTC time zone. However, neither databases nor JS are able of storing this structure as is since the DateTimeOffset is serialized as an object. On the other hand, the {{ site.product_short }} components which use dates strongly depend on the JavaScript Date type API which means that they need to work with a JavaScript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

The default MVC binder is capable of binding a DateTimeOffset only if the submitted parameter is in the 2017-04-17T05:04:18.070Z format. In other words, if the {{ site.product_short }} components implement the DateTimeOffset overload, their use will be limited to only the above format or a custom binder would be required.

## Solution

Map database models with DateTimeOffset fields to view models with DateTime fields and use those view models in the UI for ASP.NET MVC and Core components. [AutoMapper](https://automapper.org/) is a popular third-party library that can map the models as shown below

* Install AutoMapper from NuGet Package Manager or from the package manager console:.

```
    PM> Install-Package AutoMapper
```

{% if site.core %}
Upon a successful installation, the `csproj` file should include a similar package:

```html
    <PackageReference Include="AutoMapper" Version="9.0.0" />
    <PackageReference Include="AutoMapper.Extensions.Microsoft.DependencyInjection" Version="7.0.0" />
```
{% else %}

Upon a successful installation, the `packages.config` file should include a similar package:

```html
    <package id="AutoMapper" version="7.0.1" targetFramework="net45" />
```
{% endif %}

* Add a Mapping profile class that inherits from `AutoMapper.Profile` and list the required mappings.

```MappingProfile.cs
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Car, CarViewModel>();
            CreateMap<CarViewModel, Car>();
            CreateMap<DateTime, DateTimeOffset>();
            CreateMap<DateTimeOffset, DateTime>();
        }
    }
```
```DataBaseModel
    public class Car
    {
        public DateTimeOffset ProductionDate { get; set; }
    }
```
```ViewModel
    public class CarViewModel
    {
        public DateTime ProductionDate { get; set; }
    }
```
```Controller
    using AutoMapper;

    public class HomeController : Controller
    {
        private readonly IMapper mapper;

        {% if site.core %}
        public HomeController(IMapper mapper, CarsService service)
        {
            this.mapper = mapper;
            this.service = service;
        }
        {% else %}
        public HomeController()
        {
            if(mapper == null)
            {
                var mappingConfig = new MapperConfiguration(mc =>
                {
                    mc.AddProfile(new MappingProfile());
                });
                mapper = mappingConfig.CreateMapper();
            }
        }
        {% endif %}

        // to bind the model to any UI for ASP.NET Date/Time picker in the Index.cshtmls view
        public ActionResult Index()
        {
            return View(mapper.Map<CarViewModel>(cars.FirstOrDefault()));
        }

        // to use DateTimeOffset in the context of the Ajax() bound grid
        public ActionResult AllCars([DataSourceRequest] DataSourceRequest request)
        {
            // map the database models to the viewmodels
            var result = cars.Select(car => mapper.Map<CarViewModel>(car));
            // call the ToDataSourceResult() extension method over the mapped collection
            return Json(result.ToDataSourceResult(request));
        }
    }
```

For the complete implementation refer to  {% if site.core %}[this GitHub project](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Views/DateTimeOffset).{% else %} [this GitHub project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/general/DateTimeOffset).{% endif %}
