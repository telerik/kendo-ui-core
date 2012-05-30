﻿using System;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.Infrastructure;

namespace Kendo.Mvc.UI
{
    public class DataSourceRequestModelBinder : IModelBinder
    {
        public object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
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

            return request;
        }

        public string Prefix { get; set; }

        private bool TryGetValue<T>(ModelBindingContext bindingContext, string key, out T result)
        {
            if (Prefix.HasValue())
            {
                key = Prefix + "-" + key;
            }

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
