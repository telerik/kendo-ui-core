using System;
using System.Linq;
using System.Collections.Generic;

namespace Kendo.Models
{
    public class NavigationItem
    {
        public string Name { get; set; }
        public string Text { get; set; }
        public IDictionary<string,string> Title { get; set; }
        public IDictionary<string, string> Meta { get; set; }
        public string[] Packages { get; set; }

        public bool ShouldInclude(string package)
        {
            if (Packages == null)
            {
                return true;
            }

            var invert = false;
            var match = false;

            foreach (var packageName in Packages)
            {
                var name = packageName;
                if (name[0] == '!')
                {
                    invert = true;
                    name = name.Substring(1);
                }

                if (name == package)
                {
                    match = true;
                }

                if (packageName == "offline")
                {
                    return false;
                }
            }

            return (!invert && match) || (invert && !match);
        }
    }
}
