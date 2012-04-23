// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Extensions
{
    using System;

    /// <summary>
    /// Contains the extension methods of <see cref="struct"/>.
    /// </summary>
    public static class StructExtensions
    {
        /// <summary>
        /// Create Nullable instance of the passed <see cref="struct"/>.
        /// </summary>
        public static T? AsNullable<T>(this T instance) where T : struct
        {
            return new Nullable<T>(instance);
        }
    }
}