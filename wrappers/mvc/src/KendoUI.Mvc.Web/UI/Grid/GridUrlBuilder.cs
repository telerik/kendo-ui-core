// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Routing;
    using Telerik.Web.Mvc.Extensions;
    
    public class GridUrlBuilder : IGridUrlBuilder
    {
        private readonly IGrid grid;

        private readonly IGridDataKeyStore dataKeyStore;

        public GridUrlBuilder(IGrid grid, IGridDataKeyStore dataKeyStore)
        {
            this.dataKeyStore = dataKeyStore;
            this.grid = grid;
        }

        private IDictionary<string, object> GetDataKeyRouteValues(object dataItem)
        {
            return dataKeyStore.GetRouteValues(dataItem);
        }

        public IEnumerable<IGridDataKey> GetDataKeys()
        {
            return dataKeyStore.GetDataKeys();
        }

        public IDictionary<string, object> GetState()
        {
            var state = new Dictionary<string, object>();

            if (grid.Paging.Enabled)
            {
                state[grid.Prefix(GridUrlParameters.CurrentPage)] = "<#=__page#>";
            }

            if (grid.Sorting.Enabled)
            {
                state[grid.Prefix(GridUrlParameters.OrderBy)] = "<#=__orderBy#>";
            }

            if (grid.Grouping.Enabled)
            {
                state[grid.Prefix(GridUrlParameters.GroupBy)] = "<#=__groupBy#>";
            }

            if (grid.Filtering.Enabled)
            {
                state[grid.Prefix(GridUrlParameters.Filter)] = "<#=__filter#>";
            }

            return state;
        }

        public string SelectUrl()
        {
            return Url(grid.Server.Select);
        }

        public string SelectUrl(string key, object value)
        {
            return Url(grid.Server.Select, key, value);
        }

        public string SelectUrl(object dataItem)
        {
            var routeValues = GetDataKeyRouteValues(dataItem);

            var navigatable = grid.Server.Select;

            var selectRouteValues = PrepareRouteValues(navigatable.RouteValues);

            selectRouteValues[grid.Prefix(GridUrlParameters.Mode)] = "select";

            selectRouteValues.Merge(routeValues);

            return navigatable.GenerateUrl(grid.ViewContext, grid.UrlGenerator, selectRouteValues);
        }

        public string DeleteUrl(object dataItem)
        {
            var routeValues = GetDataKeyRouteValues(dataItem);
            
            var navigatable = grid.Server.Delete;

            var selectRouteValues = PrepareRouteValues(navigatable.RouteValues);

            selectRouteValues.Merge(routeValues);

            return navigatable.GenerateUrl(grid.ViewContext, grid.UrlGenerator, selectRouteValues);
        }

        public string CancelUrl(object dataItem)
        {
            var keysToExclude = grid.DataKeys.Select(key => key.RouteKey);
                
            var navigatable = grid.Server.Select;
            
            var selectRouteValues = PrepareRouteValues(navigatable.RouteValues);

            selectRouteValues.Remove(grid.Prefix(GridUrlParameters.Mode));

            foreach (var key in keysToExclude)
            {
                selectRouteValues[key] = string.Empty;
            }

            return navigatable.GenerateUrl(grid.ViewContext, grid.UrlGenerator, selectRouteValues);
        }

        public string EditUrl(object dataItem)
        {
            var routeValues = GetDataKeyRouteValues(dataItem);

            var navigatable = grid.Server.Select;
            
            var selectRouteValues = PrepareRouteValues(navigatable.RouteValues);

            selectRouteValues[grid.Prefix(GridUrlParameters.Mode)] = "edit";
            
            selectRouteValues.Merge(routeValues);

            return navigatable.GenerateUrl(grid.ViewContext, grid.UrlGenerator, selectRouteValues);
        }

        public string AddUrl(object dataItem)
        {
            var navigatable = grid.Server.Select;
            
            var selectRouteValues = PrepareRouteValues(navigatable.RouteValues);

            selectRouteValues[grid.Prefix(GridUrlParameters.Mode)] = "insert";
            
            return navigatable.GenerateUrl(grid.ViewContext, grid.UrlGenerator, selectRouteValues);
        }        
        
        public string InsertUrl(object dataItem)
        {
            var navigatable = grid.Server.Insert;

            var selectRouteValues = PrepareRouteValues(navigatable.RouteValues);

            return navigatable.GenerateUrl(grid.ViewContext, grid.UrlGenerator, selectRouteValues);
        }

        public string UpdateUrl(object dataItem)
        {
            var routeValues = GetDataKeyRouteValues(dataItem);

            var navigatable = grid.Server.Update;

            var selectRouteValues = PrepareRouteValues(navigatable.RouteValues);

            selectRouteValues.Merge(routeValues);

            return navigatable.GenerateUrl(grid.ViewContext, grid.UrlGenerator, selectRouteValues);
        }

        public string Url(INavigatable navigatable, string key, object value)
        {
            RouteValueDictionary routeValues = PrepareRouteValues(navigatable.RouteValues);
            
            routeValues[grid.Prefix(key)] = value;

            return navigatable.GenerateUrl(grid.ViewContext, grid.UrlGenerator, routeValues);
        }      

        public string Url(INavigatable navigatable, Action<RouteValueDictionary> configurator)
        {
            RouteValueDictionary routeValues = PrepareRouteValues(navigatable.RouteValues);
            configurator(routeValues);

            return navigatable.GenerateUrl(grid.ViewContext, grid.UrlGenerator, routeValues);
        }

        public string Url(INavigatable navigatable)
        {
            return Url(navigatable, true);
        }

        public string Url(INavigatable navigatable, bool copy)
        {
            var routeValues = new RouteValueDictionary(navigatable.RouteValues);

            if (copy)
            {
                routeValues = PrepareRouteValues(navigatable.RouteValues);
            }

            return navigatable.GenerateUrl(grid.ViewContext, grid.UrlGenerator, routeValues);
        }

        public RouteValueDictionary PrepareRouteValues(RouteValueDictionary routeValues)
        {
            RouteValueDictionary result = new RouteValueDictionary(routeValues);

            result.Merge(grid.ViewContext.RouteData.Values, false);
            
            if (grid.EnableCustomBinding)
            {
                result[grid.Prefix(GridUrlParameters.PageSize)] = grid.PageSize;
            }

            foreach (string key in grid.ViewContext.HttpContext.Request.QueryString)
            {
                if (key != null && key != "X-Requested-With" && !result.ContainsKey(key))
                {
                    result[key] = grid.ViewContext.HttpContext.Request.QueryString[key];
                }
            }

            return result;
        }

    }
}