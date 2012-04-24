namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using System;

    public interface ITextBox<T> where T : struct
    {
        IDictionary<string, object> InputHtmlAttributes { get; }

        Nullable<T> Value { get; set; }

        Nullable<T> MinValue { get; set; }
        
        Nullable<T> MaxValue { get; set; }
        
        T IncrementStep { get; set; }
        
        bool Spinners { get; set; }
 
        int NumberGroupSize{ get; set; }

        string NumberGroupSeparator{ get; set; }

        string EmptyMessage{ get; set; }

        string ButtonTitleUp { get; set; }

        string ButtonTitleDown { get; set; }
    }
}
