

namespace KendoUI.Mvc.UI
{
    using System.Web.Mvc;

    /// <summary>
    /// For internal use
    /// </summary>
    public interface IChart
    {
        /// <summary>
        /// The component UrlGenerator
        /// </summary>
        IUrlGenerator UrlGenerator
        {
            get;
        }

        /// <summary>
        /// The component view context
        /// </summary>
        ViewContext ViewContext
        {
            get;
        }
    }
}
