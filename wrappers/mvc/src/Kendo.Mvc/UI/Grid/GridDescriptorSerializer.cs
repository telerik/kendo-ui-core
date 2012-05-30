namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Kendo.Mvc.Extensions;

    public class GridDescriptorSerializer
    {
        private const string ColumnDelimiter = "~";
        
        public static string Serialize<T>(IEnumerable<T> descriptors)
            where T : IDescriptor
        {
            if (!descriptors.Any())
            {
                return "~";
            }

            var expressions = descriptors.Select(d => d.Serialize()).ToArray();

            return string.Join(ColumnDelimiter, expressions);
        }

        public static IList<T> Deserialize<T>(string from)
            where T : IDescriptor, new()
        {
            var result = new List<T>();

            if (!from.HasValue())
            {
                return result;
            }

            var components = from.Split(ColumnDelimiter.ToCharArray(), StringSplitOptions.RemoveEmptyEntries);

            foreach (string component in components)
            {
                var descriptor = new T();

                descriptor.Deserialize(component);

                result.Add(descriptor);
            }

            return result;
        }
    }
}