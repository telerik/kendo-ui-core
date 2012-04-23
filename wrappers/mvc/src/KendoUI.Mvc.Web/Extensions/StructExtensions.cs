

namespace KendoUI.Mvc.Extensions
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