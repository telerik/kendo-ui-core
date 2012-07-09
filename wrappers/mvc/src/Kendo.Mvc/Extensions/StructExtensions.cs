namespace Kendo.Mvc.Extensions
{
    using System;

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