namespace Kendo.Mvc.Infrastructure.Implementation
{
    using System.Collections.ObjectModel;
    using System.Linq;

    public class AggregateFunctionCollection : Collection<AggregateFunction>
    {
        /// <summary>
        /// Gets the <see cref="AggregateFunction"/> with the specified function name.
        /// </summary>
        /// <value>
        /// First <see cref="AggregateFunction"/> with the specified function name 
        /// if any, otherwise null.
        /// </value>
        public AggregateFunction this[string functionName]
        {
            get
            {
                return this.FirstOrDefault(f => f.FunctionName == functionName);
            }
        }
    }
}