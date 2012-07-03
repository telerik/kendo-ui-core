namespace Kendo.Mvc.UI.Fluent
{   
    public class MonthTemplateBuilder : IHideObjectMembers
    {
        public MonthTemplateBuilder(MonthTemplate monthTemplate)
        {
            MonthTemplate = monthTemplate;
        }

        protected MonthTemplate MonthTemplate 
        { 
            get; 
            private set; 
        }

        public MonthTemplateBuilder ContentId(string id)
        {
            MonthTemplate.ContentId = id;

            return this;
        }

        public MonthTemplateBuilder EmptyId(string id)
        {
            MonthTemplate.EmptyId = id;

            return this;
        }

        public MonthTemplateBuilder Content(string content)
        {
            MonthTemplate.Content = content;

            return this;
        }

        public MonthTemplateBuilder Empty(string empty)
        {
            MonthTemplate.Empty = empty;

            return this;
        }
    }
}
