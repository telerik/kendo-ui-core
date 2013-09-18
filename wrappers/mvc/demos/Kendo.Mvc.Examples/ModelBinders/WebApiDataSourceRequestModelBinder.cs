using Kendo.Mvc.Infrastructure;
using Kendo.Mvc.UI;
using System.Web.Http.Controllers;
using System.Web.Http.ModelBinding;

namespace Kendo.Mvc.Examples
{
    public class WebApiDataSourceRequestModelBinder : IModelBinder
    {
        public bool BindModel(HttpActionContext actionContext, ModelBindingContext bindingContext)
        {
            DataSourceRequest request = new DataSourceRequest();

            string sort, group, filter, aggregates;
            int currentPage;
            int pageSize;

            if (TryGetValue(bindingContext, GridUrlParameters.Sort, out sort))
            {
                request.Sorts = GridDescriptorSerializer.Deserialize<SortDescriptor>(sort);
            }

            if (TryGetValue(bindingContext, GridUrlParameters.Page, out currentPage))
            {
                request.Page = currentPage;
            }

            if (TryGetValue(bindingContext, GridUrlParameters.PageSize, out pageSize))
            {
                request.PageSize = pageSize;
            }

            if (TryGetValue(bindingContext, GridUrlParameters.Filter, out filter))
            {
                request.Filters = FilterDescriptorFactory.Create(filter);
            }

            if (TryGetValue(bindingContext, GridUrlParameters.Group, out group))
            {
                request.Groups = GridDescriptorSerializer.Deserialize<GroupDescriptor>(group);
            }

            if (TryGetValue(bindingContext, GridUrlParameters.Aggregates, out aggregates))
            {
                request.Aggregates = GridDescriptorSerializer.Deserialize<AggregateDescriptor>(aggregates);
            }

            bindingContext.Model = request;
            return true;
        }

        private bool TryGetValue<T>(System.Web.Http.ModelBinding.ModelBindingContext bindingContext, string key, out T result)
        {
            var value = bindingContext.ValueProvider.GetValue(key);

            if (value == null)
            {
                result = default(T);

                return false;
            }

            result = (T)value.ConvertTo(typeof(T));

            return true;
        }
    }
}