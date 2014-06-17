using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Kendo.Mvc.Examples.Models
{
    public partial class UrbanArea
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]      
        public decimal[] Location {
            get
            {
                return new decimal[] { this.Latitude, this.Longitude };
            }

            private set { }
        }
    }
}
