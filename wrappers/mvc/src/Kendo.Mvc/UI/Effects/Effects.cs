namespace Kendo.Mvc.UI
{
    using System.Linq;
    using System.Collections.Generic;

    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;

    public class Effects
    {
        public Effects(string name)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            Name = name;

            Container = new List<string>();
            Duration = (int)AnimationDuration.Normal;
        }

        protected string Name 
        { 
            get;
            set; 
        }

        public IList<string> Container
        {
            get;
            private set;
        }

        public int Duration
        {
            get;
            set;
        }

        public string Serialize()
        {
            var result = string.Empty;

            if (Container.Any())
            {
                result = "{0}: {{effects: \"{1}\", duration: {2}}}".FormatWith(Name, string.Join(" ", Container), Duration);
            }

            return result;
        }
    }
}