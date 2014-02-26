using System;
using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Models.Chart
{
    public class CorporateData
    {
        public CorporateData(string firstName, string lastName, string image, string title, string colorScheme)
        {
            FirstName = firstName;
            LastName = lastName;
            Image = image;
            Title = title;
            ColorScheme = colorScheme;
            Items = new List<CorporateData>();
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Image { get; set; }
        public string Title { get; set; }
        public string ColorScheme { get; set; }

        public List<CorporateData> Items { get; set; }
    }
}
