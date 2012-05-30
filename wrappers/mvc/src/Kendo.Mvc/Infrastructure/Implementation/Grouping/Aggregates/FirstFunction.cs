namespace Kendo.Mvc
{
    public class FirstFunction : EnumerableAggregateFunction
    {
        /// <summary>
        /// Gets the the First method name.
        /// </summary>
        /// <value><c>First</c>.</value>
        public override string AggregateMethodName
        {
            get
            {
                return "FirstOrDefault";
            }
        }
    }
}