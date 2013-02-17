namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;

    public class Effects: JsonObject
    {
        public Effects(string name)
        {

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

        public bool Reverse 
        {
            get; 
            set; 
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Container.Any())
            {
                var options = new Dictionary<string, object>();

                options["effects"] = string.Join(" ", Container);
                options["duration"] = Duration;
                if (Reverse)
                {
                    options["reverse"] = Reverse;
                }
                
                json[Name] = options;
            }
        }
    }
}