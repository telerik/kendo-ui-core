// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Expressions
{
    using System;
    using System.ComponentModel;
    using System.Globalization;
    /// <exclude/>
    /// <excludeToc/>
    
    internal static class CustomTypeDescriptorExtensions
    {
        /// <exception cref="ArgumentException"><c>ArgumentException</c>.</exception>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1004:GenericMethodsShouldProvideTypeParameter")]
        public static T Property<T>(this ICustomTypeDescriptor typeDescriptor, string propertyName)
        {
            var propertyDescriptor = TypeDescriptor.GetProperties(typeDescriptor)[propertyName];

            if ( propertyDescriptor == null )
            {
                string message = string.Format(
                    CultureInfo.CurrentCulture, "Property with specified name: {0} cannot be found on type: {1}",
                    propertyName, typeDescriptor.GetType());

                throw new ArgumentException(message, "propertyName");
            }

            return UnboxT<T>.Unbox(propertyDescriptor.GetValue(typeDescriptor));
        }
    }
}