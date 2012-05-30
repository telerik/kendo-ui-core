namespace Kendo.Mvc.UI.Html
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class GridDataKeyComparer : IGridDataKeyComparer
    {
        private readonly IEnumerable<Func<object, object>> dataKeys;
        private readonly IEnumerable<string> values;

        public GridDataKeyComparer(IEnumerable<Func<object, object>> dataKeys, IEnumerable<string> values)
        {
            this.dataKeys = dataKeys;
            this.values = values;
        }

        public bool KeysEqualTo(object dataItem)
        {
            if (dataItem == null)
            {
                return false;
            }

            return dataKeys.Select(dataKey => Convert.ToString(dataKey(dataItem)))
                           .SequenceEqual(values);
        }
    }
}