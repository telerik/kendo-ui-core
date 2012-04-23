// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Globalization;
    using System.Linq;
    using Extensions;

    /// <summary>
    /// Base class for all aggregate functions that will use extension 
    /// methods in <see cref="Enumerable"/> for aggregation.
    /// </summary>
    public abstract class EnumerableAggregateFunctionBase : AggregateFunction
    {
        /// <summary>
        /// Gets the type of the extension methods that holds the extension methods for
        /// aggregation. For example <see cref="Enumerable"/> or <see cref="Queryable"/>.
        /// </summary>
        /// <value>
        /// The type of that holds the extension methods. The default value is <see cref="Enumerable"/>.
        /// </value>
        protected virtual internal Type ExtensionMethodsType
        {
            get
            {
                return typeof(Enumerable);
            }
        }

        protected override string GenerateFunctionName()
        {
            var sourceName = SourceField;
            if (sourceName.HasValue())
            {
                sourceName = sourceName.Replace(".", "-");
            }

            return string.Format(CultureInfo.InvariantCulture, "{0}_{1}_{2}", AggregateMethodName, sourceName, GetHashCode());
        }
    }
}