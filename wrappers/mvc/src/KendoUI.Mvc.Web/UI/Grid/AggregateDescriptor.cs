// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using Telerik.Web.Mvc.Infrastructure;
    using Telerik.Web.Mvc.Infrastructure.Implementation;
    
    public class AggregateDescriptor : IDescriptor
    {
        private readonly IDictionary<string, Func<AggregateFunction>> aggregateFactories;

        public AggregateDescriptor()
        {
            Aggregates = new List<AggregateFunction>();

            aggregateFactories = new Dictionary<string, Func<AggregateFunction>>
              {
                  { "sum", () => new SumFunction { SourceField = Member } },
                  { "count", () => new CountFunction{ SourceField = Member } },
                  { "average", () => new AverageFunction { SourceField = Member } },
                  { "min", () => new MinFunction { SourceField = Member } },
                  { "max", () => new MaxFunction { SourceField = Member } }
              };
        }

        public ICollection<AggregateFunction> Aggregates
        {
            get;
            private set;
        }

        public string Member
        {
            get;
            set;
        }

        public void Deserialize(string source)
        {
            var components = source.Split('-');

            if (components.Any())
            {
                Member = components[0];

                for (int i = 1; i < components.Length; i++)
                {
                    DeserializeAggregate(components[i]);
                }
            }
        }

        private void DeserializeAggregate(string aggregate)
        {
            Func<AggregateFunction> factory;

            if (aggregateFactories.TryGetValue(aggregate, out factory))
            {
                Aggregates.Add(factory());
            }
        }

        public string Serialize()
        {
            var result = new StringBuilder(Member);

            var aggregates = Aggregates.Select(aggregate => aggregate.FunctionName.Split('_')[0].ToLowerInvariant());

            foreach (var aggregate in aggregates)
            {
                result.Append("-");
                result.Append(aggregate);
            }

            return result.ToString();
        }
    }
}