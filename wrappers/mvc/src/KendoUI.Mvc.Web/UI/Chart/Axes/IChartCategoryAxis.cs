
namespace KendoUI.Mvc.UI
{
    using System.Collections;

    /// <summary>
    /// Represents a category axis
    /// </summary>
    public interface IChartCategoryAxis : IChartAxis
    {
        /// <summary>
        /// The categories displayed on the axis
        /// </summary>
        IEnumerable Categories
        { 
            get; 
            set; 
        }

        /// <summary>
        /// The Model member used to populate the <see cref="Categories" />
        /// </summary>
        string Member
        {
            get;
            set;
        }  
    }
}
