namespace Kendo.Mvc.Extensions
{
    using System;

    public static class StructExtensions
    {
        public static T? AsNullable<T>(this T instance) where T : struct
        {
            return new Nullable<T>(instance);
        }
    }
}