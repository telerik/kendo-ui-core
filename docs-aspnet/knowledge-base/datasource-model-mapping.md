---
title: Modifying the DataSourceRequest Object to Map ViewModel Objects to EF Core Entities and Support Filtering and Sorting
description: Learn how to map the DataSourceRequest members to the corresponding EF core entity.
type: how-to
page_title: DataSourceRequest Model Mapping
slug: datasource_model_mapping
position: 
tags: DataSource, DataSourceRequest, attribute, map, properties, View Model, EF Core entity, SortDescriptor, FilterDescriptor
ticketid: 1601637
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2023.1.117</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>DataSource for {{ site.framework }}</td>
		</tr>
	</tbody>
</table>


## Description
I want to use Model Mapping, but my view model object and entities returned by Entity Framework are not identical. Thus when I follow the [Model mapping documentation](https://docs.telerik.com/aspnet-core/html-helpers/datasource/overview#model-mapping) I get an exception.

I've an EF Core entity:
```C#
public class Product
{
 public long ID {get;set;}
 public string Product_Name {get;set;}
}
```
And a corresponding ViewModel:
```C#
public class ProductVM
{
  public long Id {get;set;}
  public string ProductName {get;set;}
}
```

## Solution
A possible approach to resolve the issue is to implement model mapping and map the different model properties to support filtering and sorting. The [solution](https://www.telerik.com/forums/todatasourceresult) below is suggested by Dave, a member of our forums, and shows how to map model properties so filtering and sorting can be used:
```C#
    public static class DataSourceRequestExtensions
    {
        public static void RemapMember(this DataSourceRequest request, string memberName, string newMemberName)
        {
            foreach (var sort in request.Sorts)
            {
                if (sort.Member.Equals(memberName))
                {
                    sort.Member = newMemberName;
                }
            }

            foreach (var filter in request.Filters)
            {
                if (filter is CompositeFilterDescriptor compositeFilterDescriptor)
                {
                    foreach (var compositeFilter in compositeFilterDescriptor.FilterDescriptors)
                    {
                        RemapFilterDescription(compositeFilter, memberName, newMemberName);
                    }
                }
                RemapFilterDescription(filter, memberName, newMemberName);
            }
        }

        private static void RemapFilterDescription(IFilterDescriptor filter, string memberName, string newMemberName)
        {
            if (!(filter is FilterDescriptor descriptor)) return;

            if (descriptor.Member.Equals(memberName))
            {
                descriptor.Member = newMemberName;
            }
        }
    }
```

Use the extension method to map the model properties so filtering and sorting works as expected:
```C#
        public ActionResult Grid_Read([DataSourceRequest] DataSourceRequest request)
        {
            var data = myProductsService.GetAllProducts();
            request.RemapMember("Id", "ID");
            request.RemapMember("ProductName", "Product_Name");
            var dsResult = data.ToDataSourceResult(request, model => new ProductVM()
            {
                Id = model.ID,
                ProductName = model.Product_Name
            });
            return Json(dsResult);
        }
```

## See Also

* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Server-Side API Reference of the DataSource for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/datasource)

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})
* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)
{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)
{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}
