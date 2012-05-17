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

        public MonthTemplateBuilder Content(string content)
        {
            MonthTemplate.content = content;

            return this;
        }

        public MonthTemplateBuilder Empty(string empty)
        {
            MonthTemplate.empty = empty;

            return this;
        }
    }
}
