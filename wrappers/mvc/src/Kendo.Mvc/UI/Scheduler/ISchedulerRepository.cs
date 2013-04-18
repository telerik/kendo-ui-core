using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI
{
    public interface IAppointmentService
    {
        IEnumerable<IAppointment> GetAppointments(DataSourceRequest request); //TODO: handle TimeZones
    }
}
