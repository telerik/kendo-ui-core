// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Telerik.Web.Mvc.Extensions;

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