

namespace KendoUI.Mvc
{
    using System;

    /// <summary>
    /// Sitemap change frequency
    /// </summary>
    [Serializable]
    public enum SiteMapChangeFrequency
    {
        /// <summary>
        /// Automatic
        /// </summary>
        Automatic = 0,
        /// <summary>
        /// Daily
        /// </summary>
        Daily = 1,
        /// <summary>
        /// Always
        /// </summary>
        Always = 2,
        /// <summary>
        /// Hourly
        /// </summary>
        Hourly = 3,
        /// <summary>
        /// Weekly
        /// </summary>
        Weekly = 4,
        /// <summary>
        /// Monthly
        /// </summary>
        Monthly = 5,
        /// <summary>
        /// Yearly
        /// </summary>
        Yearly = 6,
        /// <summary>
        /// Never
        /// </summary>
        Never = 7
    }
}