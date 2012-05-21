namespace Kendo.Mvc.UI
{
    using System.Linq;
    using System.Collections.Generic;

    using Kendo.Mvc.Extensions;

    public class Effects
    {
        public Effects()
        {
            Container = new List<string>();
            Duration = (int)AnimationDuration.Normal;
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
                result = "effects: \"{0}\", duration: {1}".FormatWith(string.Join(",", Container), Duration);
            }

            return result;
        }
    }
}