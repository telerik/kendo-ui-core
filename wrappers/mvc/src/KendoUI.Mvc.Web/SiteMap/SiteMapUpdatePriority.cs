// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
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