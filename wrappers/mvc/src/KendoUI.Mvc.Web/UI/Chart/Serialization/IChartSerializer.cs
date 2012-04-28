namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    
    /// <summary>
    /// Represents an object that can serialize itself
    /// </summary>
    public interface IChartSerializer
    {
        /// <summary>
        /// Serializes the current instance
        /// </summary>
        IDictionary<string, object> Serialize();
    }
}
