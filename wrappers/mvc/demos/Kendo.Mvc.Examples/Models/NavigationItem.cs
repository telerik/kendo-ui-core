using System;
using System.Linq;

namespace Kendo.Mvc.Examples.Models
{
    public class NavigationItem
    {
        public string Name { get; set; }
        public string Text { get; set; }
        public string[] Packages { get; set; }

        public bool ShouldInclude
        {
            get
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

                    if (name == "mvc")
                    {
                        match = true;
                    }
                }

                return (!invert && match) || (invert && !match);
            }
        }
    }
}
