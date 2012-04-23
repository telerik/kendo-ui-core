// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI
{
    using System.Collections;
    using System.Collections.Generic;
    using System.Web.Mvc;
    using System.Web.Routing;
    
    class GridJsonResultAdapter : IGridActionResultAdapter
    {
        private readonly object data;
        private readonly IDictionary<string, object> state;

        public GridJsonResultAdapter(JsonResult jsonResult)
        {
            data = jsonResult.Data;
            
            if (data is IDictionary<string, object>)
            {
                state = new RouteValueDictionary((IDictionary<string, object>)data);
            }
            else
            {
                state = new RouteValueDictionary(data);
            }
        }

        public IEnumerable GetDataSource()
        {
            return Get<IEnumerable>("data") ?? data as IEnumerable;
        }

        public int GetTotal()
        {
            return Get<int>("total");
        }
        
        public ModelStateDictionary GetModelState()
        {
            return Get<ModelStateDictionary>("modelState");
        }

        private T Get<T>(string key)
        {
            object value;

            if (state.TryGetValue(key, out value))
            {
                return (T)value;
            }

            return default(T);
        }
        
        public object GetAggregates()
        {
            return Get<object>("aggregates");
        }
    }
}
