// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Expressions
{
    using System;
    using System.Globalization;
    using System.Reflection;

    internal static class UnboxT<T>
    {
        internal static readonly Converter<object, T> Unbox = Create(typeof(T));

        private static Converter<object, T> Create(Type type)
        {
            if (!type.IsValueType)
            {
                return ReferenceField;
            }
            if ((type.IsGenericType && !type.IsGenericTypeDefinition) && (typeof(Nullable<>) == type.GetGenericTypeDefinition()))
            {
                MethodInfo nullableFieldMethod = typeof(UnboxT<T>).GetMethod("NullableField", BindingFlags.NonPublic | BindingFlags.Static);
                MethodInfo genericMethod = nullableFieldMethod.MakeGenericMethod(new[] { type.GetGenericArguments()[0] });
                
                return (Converter<object, T>) Delegate.CreateDelegate(typeof(Converter<object, T>), genericMethod);
            }
            return ValueField;
        }

        private static TElem? NullableField<TElem>(object value) where TElem : struct
        {
            if (DBNull.Value == value)
            {
                return null;
            }
            return (TElem?)value;
        }

        private static T ReferenceField(object value)
        {
            if (DBNull.Value != value)
            {
                return (T) value;
            }
            return default(T);
        }

        /// <exception cref="InvalidCastException"><c>InvalidCastException</c>.</exception>
        private static T ValueField(object value)
        {
            if (DBNull.Value == value)
            {
                throw new InvalidCastException(
                    string.Format(CultureInfo.CurrentCulture, "Type: {0} cannot be casted to Nullable type", typeof(T)));
            }
            return (T) value;
        }
    }
}