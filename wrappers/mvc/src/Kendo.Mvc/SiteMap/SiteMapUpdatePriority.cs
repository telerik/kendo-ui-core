namespace Kendo.Mvc
{
    using System;

    /// <summary>
    /// Sitemap update priority.
    /// </summary>
    [Serializable]
    public enum SiteMapUpdatePriority
    {
        /// <summary>
        /// Automatic
        /// </summary>
        Automatic = 0,
        /// <summary>
        /// Low
        /// </summary>
        Low = 30,
        /// <summary>
        /// Normal
        /// </summary>
        Normal = 50,
        /// <summary>
        /// High
        /// </summary>
        High = 80,
        /// <summary>
        /// Critical
        /// </summary>
        Critical = 100
    }
}