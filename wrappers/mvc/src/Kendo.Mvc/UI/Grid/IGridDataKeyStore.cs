namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    
    public interface IGridDataKeyStore
    {
        IDictionary<string, object> GetRouteValues(object dataItem);

        IDictionary<string, object> GetDataKeyValues(object dataItem);

        IEnumerable<Func<object, object>> DataKeyGetters
        {
            get;
        }

        IEnumerable<string> CurrentDataKeyValues
        {
            get;
        }

        IEnumerable<IGridDataKey> GetDataKeys();
    }

    public class GridDataKeyStore : IGridDataKeyStore
    {
        private readonly IEnumerable<IGridDataKey> dataKeys;

        private IEnumerable<Func<object, object>> dataKeyGetters;

        public GridDataKeyStore(IEnumerable<IGridDataKey> dataKeys, IEnumerable<string> currentDataKeyValues)
        {
            this.dataKeys = dataKeys;

            CurrentDataKeyValues = currentDataKeyValues;
        }
        
        public IEnumerable<IGridDataKey> GetDataKeys()
        {
            return dataKeys;
        }

        public IDictionary<string, object> GetRouteValues(object dataItem)
        {
            if (dataItem != null)
            {
                return dataKeys.ToDictionary(dataKey => dataKey.RouteKey, dataKey => dataKey.GetValue(dataItem));
            }

            return new Dictionary<string, object>();
        }
        
        public IDictionary<string, object> GetDataKeyValues(object dataItem)
        {
            if (dataItem != null)
            {
                return dataKeys.ToDictionary(dataKey => dataKey.Name, dataKey => dataKey.GetValue(dataItem));
            }

            return new Dictionary<string, object>();
        }

        public IEnumerable<Func<object, object>> DataKeyGetters
        {
            get
            {
                if (dataKeyGetters == null)
                {
                    dataKeyGetters = dataKeys.Select(dataKey => (Func<object, object>)dataKey.GetValue).ToArray();
                }

                return dataKeyGetters;
            }
        }
        
        public IEnumerable<string> CurrentDataKeyValues
        {
            get;
            private set;
        }
    }
}
