// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Fluent
{
    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the data key.
    /// </summary>
    /// <typeparam name="TModel">The type of the model</typeparam>
    public class GridDataKeyBuilder<TModel> : IHideObjectMembers
        where TModel : class
    {
        private readonly IGridDataKey<TModel> dataKey;

        /// <summary>
        /// Initializes a new instance of the <see cref="GridDataKeyBuilder&lt;TModel&gt;"/> class.
        /// </summary>
        /// <param name="dataKey">The dataKey.</param>
        public GridDataKeyBuilder(IGridDataKey<TModel> dataKey)
        {
            this.dataKey = dataKey;
        }

        /// <summary>
        /// Sets the RouteKey.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public void RouteKey(string value)
        {
            Guard.IsNotNullOrEmpty(value, "value");

            dataKey.RouteKey = value;
        }
    }
}
