using System;
using System.Collections.Generic;
using System.Linq;
using Kendo.Mvc.Infrastructure;

namespace Kendo.Mvc.UI
{
    public class DataSourceSchema : JsonObject
    {
        public string Data { get; set; }

        public ClientHandlerDescriptor FunctionData { get; set; }

        public string Total { get; set; }

        public ClientHandlerDescriptor FunctionTotal { get; set; }

        public string Errors { get; set; }

        public ClientHandlerDescriptor FunctionErrors { get; set; }

        public string Aggregates { get; set; }

        public ClientHandlerDescriptor FunctionAggregates { get; set; }

        public string Groups { get; set; }

        public ClientHandlerDescriptor FunctionGroups { get; set; }

        public string Type { get; set; }

        public ClientHandlerDescriptor Parse { get; set; }

        public object FunctionModel { get; set; }

        public ModelDescriptor Model
        {
            get;
            set;
        }

        public DataSourceSchema()
        {
            Data = "Data";
            Total = "Total"; 
            Errors = "Errors";

            FunctionData = new ClientHandlerDescriptor();
            FunctionTotal = new ClientHandlerDescriptor();
            FunctionErrors = new ClientHandlerDescriptor();
            FunctionAggregates = new ClientHandlerDescriptor();
            FunctionGroups = new ClientHandlerDescriptor();
            Parse = new ClientHandlerDescriptor();
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (FunctionData.HasValue())
            {
                json.Add("data", FunctionData);
            }
            else
            {
                FluentDictionary.For(json).Add("data", Data, string.Empty);
            }

            if (FunctionTotal.HasValue())
            {
                json.Add("total", FunctionTotal);
            }
            else
            {
                FluentDictionary.For(json).Add("total", Total, string.Empty);
            }

            if (FunctionErrors.HasValue())
            {
                json.Add("errors", FunctionErrors);
            }
            else
            {
                FluentDictionary.For(json).Add("errors", Errors, string.Empty);
            }

            if (FunctionAggregates.HasValue())
            {
                json.Add("aggregates", FunctionAggregates);
            }
            else
            {
                FluentDictionary.For(json).Add("aggregates", Aggregates, string.Empty);
            }

            if (FunctionGroups.HasValue())
            {
                json.Add("groups", FunctionGroups);
            }
            else
            {
                FluentDictionary.For(json).Add("groups", Groups, string.Empty);
            }

            if (FunctionModel != null)
            {
                json.Add("model", FunctionModel);
            }
            else if (Model != null)
            {
                json.Add("model", Model.ToJson());
            }

            if (!string.IsNullOrEmpty(Type))
            {
                json.Add("type", Type);
            }

            if (Parse.HasValue())
            {
                json.Add("parse", Parse);
            }
        }
    }
}
