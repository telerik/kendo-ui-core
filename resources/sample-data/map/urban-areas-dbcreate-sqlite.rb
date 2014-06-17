#!/usr/bin/ruby
require 'csv'

# Switch to CRLF in output
$/ = "\r\n"

puts %Q{
    CREATE TABLE UrbanAreas (
        [ID] INTEGER PRIMARY KEY AUTOINCREMENT,
        [City] NVARCHAR(256) NOT NULL,
        [Country] NVARCHAR(256) NOT NULL,
        [Latitude] DECIMAL(9,6) NOT NULL,
        [Longitude] DECIMAL(9,6) NOT NULL,
        [Country_ISO3] CHAR(3) NOT NULL,
        [Pop1950] INT NOT NULL,
        [Pop1955] INT NOT NULL,
        [Pop1960] INT NOT NULL,
        [Pop1965] INT NOT NULL,
        [Pop1970] INT NOT NULL,
        [Pop1975] INT NOT NULL,
        [Pop1980] INT NOT NULL,
        [Pop1985] INT NOT NULL,
        [Pop1990] INT NOT NULL,
        [Pop1995] INT NOT NULL,
        [Pop2000] INT NOT NULL,
        [Pop2005] INT NOT NULL,
        [Pop2010] INT NOT NULL,
        [Pop2015] INT NOT NULL,
        [Pop2020] INT NOT NULL,
        [Pop2025] INT NOT NULL,
        [Pop2050] INT NOT NULL
    );

    BEGIN TRANSACTION;
}

CSV.foreach('urban-areas.tsv', { :headers => true, :col_sep => "\t" }) do |row|
    puts %Q{
    INSERT INTO UrbanAreas
        ([City], [Country], [Latitude], [Longitude], [Country_ISO3],
        [Pop1950], [Pop1955], [Pop1960], [Pop1965], [Pop1970], [Pop1975],
        [Pop1980], [Pop1985], [Pop1990], [Pop1995], [Pop2000], [Pop2005],
        [Pop2010], [Pop2015], [Pop2020], [Pop2025], [Pop2050])
    VALUES
        ('#{row['City'].gsub("'","''")}', '#{row['Country'].gsub("'","''")}', #{row['Latitude']}, #{row['Longitude']}, '#{row['Country_ISO3']}',
         #{row['Pop1950']}, #{row['Pop1955']}, #{row['Pop1960']}, #{row['Pop1965']}, #{row['Pop1970']}, #{row['Pop1975']},
         #{row['Pop1980']}, #{row['Pop1985']}, #{row['Pop1990']}, #{row['Pop1995']}, #{row['Pop2000']}, #{row['Pop2005']},
         #{row['Pop2010']}, #{row['Pop2015']}, #{row['Pop2020']}, #{row['Pop2025']}, #{row['Pop2050']});
    }
end

puts %Q{
    COMMIT TRANSACTION;
}
