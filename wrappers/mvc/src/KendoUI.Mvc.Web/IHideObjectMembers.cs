// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    using System;
    using System.ComponentModel;

    /// <summary>
    /// Helper interface used to hide the base <see cref="Object"/> 
    /// members from the fluent API to make it much cleaner 
    /// in Visual Studio intellisense.
    /// </summary>
    [EditorBrowsable(EditorBrowsableState.Never)]
    public interface IHideObjectMembers
    {
        /// <summary>
        /// Equalses the specified value.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        [EditorBrowsable(EditorBrowsableState.Never)]
        bool Equals(object value);

        /// <summary>
        /// Gets the hash code.
        /// </summary>
        /// <returns></returns>
        [EditorBrowsable(EditorBrowsableState.Never)]
        int GetHashCode();

        /// <summary>
        /// Gets the type.
        /// </summary>
        /// <returns></returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1716:IdentifiersShouldNotMatchKeywords", MessageId = "GetType", Justification = "This should not be visible in auto complete list of VS, distracts when writing fluent syntax.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1024:UsePropertiesWhereAppropriate", Justification = "In that case it is an issue of the .NET Framework itself")]
        [EditorBrowsable(EditorBrowsableState.Never)]
        Type GetType();

        /// <summary>
        /// Toes the string.
        /// </summary>
        /// <returns></returns>
        [EditorBrowsable(EditorBrowsableState.Never)]
        string ToString();
    }
}