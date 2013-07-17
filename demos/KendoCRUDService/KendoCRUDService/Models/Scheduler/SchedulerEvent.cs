using System;
using System.Collections.Generic;

namespace KendoCRUDService.Models
{
    public abstract class SchedulerEvent
    {
        public string Title { get; set; }
        public string Description { get; set; }

        public string StartTimezone { get; set; }

        private DateTime start;
        public DateTime Start
        {
            get
            {
                return start;
            }
            set
            {
                start = value.ToUniversalTime();
            }
        }
        

        private DateTime end;
        public DateTime End
        {
            get
            {
                return end;
            }
            set
            {
                end = value.ToUniversalTime();
            }
        }


        public string EndTimezone { get; set; }
        public string RecurrenceRule { get; set; }
        public int? RecurrenceID { get; set; }
        public string RecurrenceException { get; set; }
        public bool IsAllDay { get; set; }

        public void ApplyTimezone()
        {
            if (!string.IsNullOrEmpty(StartTimezone))
            {
                Start = TimeZoneInfo.ConvertTimeFromUtc(Start, OlsonTimeZoneToTimeZoneInfo(StartTimezone));
            }

            var endTimezone = string.IsNullOrEmpty(EndTimezone) ? StartTimezone : EndTimezone;
            if (!string.IsNullOrEmpty(endTimezone))
            {
                End = TimeZoneInfo.ConvertTimeFromUtc(End, OlsonTimeZoneToTimeZoneInfo(endTimezone));
            }
        }


        private static TimeZoneInfo OlsonTimeZoneToTimeZoneInfo(string olsonTimeZoneId)
        {
            var olsonWindowsTimes = new Dictionary<string, string>()
            {
                    { "Africa/Bangui", "W. Central Africa Standard Time" },
                    { "Africa/Cairo", "Egypt Standard Time" },
                    { "Africa/Casablanca", "Morocco Standard Time" },
                    { "Africa/Harare", "South Africa Standard Time" },
                    { "Africa/Johannesburg", "South Africa Standard Time" },
                    { "Africa/Lagos", "W. Central Africa Standard Time" },
                    { "Africa/Monrovia", "Greenwich Standard Time" },
                    { "Africa/Nairobi", "E. Africa Standard Time" },
                    { "Africa/Windhoek", "Namibia Standard Time" },
                    { "America/Anchorage", "Alaskan Standard Time" },
                    { "America/Argentina/San_Juan", "Argentina Standard Time" },
                    { "America/Asuncion", "Paraguay Standard Time" },
                    { "America/Bahia", "Bahia Standard Time" },
                    { "America/Bogota", "SA Pacific Standard Time" },
                    { "America/Buenos_Aires", "Argentina Standard Time" },
                    { "America/Caracas", "Venezuela Standard Time" },
                    { "America/Cayenne", "SA Eastern Standard Time" },
                    { "America/Chicago", "Central Standard Time" },
                    { "America/Chihuahua", "Mountain Standard Time (Mexico)" },
                    { "America/Cuiaba", "Central Brazilian Standard Time" },
                    { "America/Denver", "Mountain Standard Time" },
                    { "America/Fortaleza", "SA Eastern Standard Time" },
                    { "America/Godthab", "Greenland Standard Time" },
                    { "America/Guatemala", "Central America Standard Time" },
                    { "America/Halifax", "Atlantic Standard Time" },
                    { "America/Indianapolis", "US Eastern Standard Time" },
                    { "America/La_Paz", "SA Western Standard Time" },
                    { "America/Los_Angeles", "Pacific Standard Time" },
                    { "America/Mexico_City", "Mexico Standard Time" },
                    { "America/Montevideo", "Montevideo Standard Time" },
                    { "America/New_York", "Eastern Standard Time" },
                    { "America/Noronha", "UTC-02" },
                    { "America/Phoenix", "US Mountain Standard Time" },
                    { "America/Regina", "Canada Central Standard Time" },
                    { "America/Santa_Isabel", "Pacific Standard Time (Mexico)" },
                    { "America/Santiago", "Pacific SA Standard Time" },
                    { "America/Sao_Paulo", "E. South America Standard Time" },
                    { "America/St_Johns", "Newfoundland Standard Time" },
                    { "America/Tijuana", "Pacific Standard Time" },
                    { "Antarctica/McMurdo", "New Zealand Standard Time" },
                    { "Atlantic/South_Georgia", "UTC-02" },
                    { "Asia/Almaty", "Central Asia Standard Time" },
                    { "Asia/Amman", "Jordan Standard Time" },
                    { "Asia/Baghdad", "Arabic Standard Time" },
                    { "Asia/Baku", "Azerbaijan Standard Time" },
                    { "Asia/Bangkok", "SE Asia Standard Time" },
                    { "Asia/Beirut", "Middle East Standard Time" },
                    { "Asia/Calcutta", "India Standard Time" },
                    { "Asia/Colombo", "Sri Lanka Standard Time" },
                    { "Asia/Damascus", "Syria Standard Time" },
                    { "Asia/Dhaka", "Bangladesh Standard Time" },
                    { "Asia/Dubai", "Arabian Standard Time" },
                    { "Asia/Irkutsk", "North Asia East Standard Time" },
                    { "Asia/Jerusalem", "Israel Standard Time" },
                    { "Asia/Kabul", "Afghanistan Standard Time" },
                    { "Asia/Kamchatka", "Kamchatka Standard Time" },
                    { "Asia/Karachi", "Pakistan Standard Time" },
                    { "Asia/Katmandu", "Nepal Standard Time" },
                    { "Asia/Kolkata", "India Standard Time" },
                    { "Asia/Krasnoyarsk", "North Asia Standard Time" },
                    { "Asia/Kuala_Lumpur", "Singapore Standard Time" },
                    { "Asia/Kuwait", "Arab Standard Time" },
                    { "Asia/Magadan", "Magadan Standard Time" },
                    { "Asia/Muscat", "Arabian Standard Time" },
                    { "Asia/Novosibirsk", "N. Central Asia Standard Time" },
                    { "Asia/Oral", "West Asia Standard Time" },
                    { "Asia/Rangoon", "Myanmar Standard Time" },
                    { "Asia/Riyadh", "Arab Standard Time" },
                    { "Asia/Seoul", "Korea Standard Time" },
                    { "Asia/Shanghai", "China Standard Time" },
                    { "Asia/Singapore", "Singapore Standard Time" },
                    { "Asia/Taipei", "Taipei Standard Time" },
                    { "Asia/Tashkent", "West Asia Standard Time" },
                    { "Asia/Tbilisi", "Georgian Standard Time" },
                    { "Asia/Tehran", "Iran Standard Time" },
                    { "Asia/Tokyo", "Tokyo Standard Time" },
                    { "Asia/Ulaanbaatar", "Ulaanbaatar Standard Time" },
                    { "Asia/Vladivostok", "Vladivostok Standard Time" },
                    { "Asia/Yakutsk", "Yakutsk Standard Time" },
                    { "Asia/Yekaterinburg", "Ekaterinburg Standard Time" },
                    { "Asia/Yerevan", "Armenian Standard Time" },
                    { "Atlantic/Azores", "Azores Standard Time" },
                    { "Atlantic/Cape_Verde", "Cape Verde Standard Time" },
                    { "Atlantic/Reykjavik", "Greenwich Standard Time" },
                    { "Australia/Adelaide", "Cen. Australia Standard Time" },
                    { "Australia/Brisbane", "E. Australia Standard Time" },
                    { "Australia/Darwin", "AUS Central Standard Time" },
                    { "Australia/Hobart", "Tasmania Standard Time" },
                    { "Australia/Perth", "W. Australia Standard Time" },
                    { "Australia/Sydney", "AUS Eastern Standard Time" },
                    { "Etc/GMT", "UTC" },
                    { "Etc/GMT+11", "UTC-11" },
                    { "Etc/GMT+12", "Dateline Standard Time" },
                    { "Etc/GMT+2", "UTC-02" },
                    { "Etc/GMT-12", "UTC+12" },
                    { "Europe/Amsterdam", "W. Europe Standard Time" },
                    { "Europe/Athens", "GTB Standard Time" },
                    { "Europe/Belgrade", "Central Europe Standard Time" },
                    { "Europe/Berlin", "W. Europe Standard Time" },
                    { "Europe/Brussels", "Romance Standard Time" },
                    { "Europe/Budapest", "Central Europe Standard Time" },
                    { "Europe/Dublin", "GMT Standard Time" },
                    { "Europe/Helsinki", "FLE Standard Time" },
                    { "Europe/Istanbul", "GTB Standard Time" },
                    { "Europe/Kiev", "FLE Standard Time" },
                    { "Europe/London", "GMT Standard Time" },
                    { "Europe/Minsk", "E. Europe Standard Time" },
                    { "Europe/Moscow", "Russian Standard Time" },
                    { "Europe/Paris", "Romance Standard Time" },
                    { "Europe/Sarajevo", "Central European Standard Time" },
                    { "Europe/Warsaw", "Central European Standard Time" },
                    { "Indian/Mauritius", "Mauritius Standard Time" },
                    { "Pacific/Apia", "Samoa Standard Time" },
                    { "Pacific/Auckland", "New Zealand Standard Time" },
                    { "Pacific/Fiji", "Fiji Standard Time" },
                    { "Pacific/Guadalcanal", "Central Pacific Standard Time" },
                    { "Pacific/Guam", "West Pacific Standard Time" },
                    { "Pacific/Honolulu", "Hawaiian Standard Time" },
                    { "Pacific/Pago_Pago", "UTC-11" },
                    { "Pacific/Port_Moresby", "West Pacific Standard Time" },
                    { "Pacific/Tongatapu", "Tonga Standard Time" }
                };

            var windowsTimeZoneId = default(string);
            var windowsTimeZone = default(TimeZoneInfo);
            if (olsonWindowsTimes.TryGetValue(olsonTimeZoneId, out windowsTimeZoneId))
            {
                windowsTimeZone = TimeZoneInfo.FindSystemTimeZoneById(windowsTimeZoneId);

            }
            return windowsTimeZone;
        }
    }
}