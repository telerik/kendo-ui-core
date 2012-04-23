// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Expressions
{
    using System;
    using System.Diagnostics;
    using System.Globalization;
    using System.Xml;

    /// <summary>
    /// Holds extension methods for <see cref="XmlNode"/>.
    /// </summary>
    public static class XmlNodeExtensions
    {
        /// <exception cref="ArgumentException">
        /// Child element with name specified by <paramref name="childName"/> does not exists.
        /// </exception>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1059:MembersShouldNotExposeCertainConcreteTypes", MessageId = "System.Xml.XmlNode")]
        public static string ChildElementInnerText(this XmlNode node, string childName)
        {
            XmlElement innerElement = node[childName];

            if (innerElement == null)
            {
                string message = string.Format(
                    CultureInfo.CurrentCulture, "Child element with specified name: {0} cannot be found.", childName);
                Trace.WriteLine(message);

                return null;
            }

            return innerElement.InnerText;
        }
    }
}