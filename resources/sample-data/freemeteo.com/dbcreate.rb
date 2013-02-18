#!/usr/bin/ruby
require 'csv'

# Switch to CRLF in output
$/ = "\r\n"

SRC_DATE_FORMAT = '%d/%m/%Y'
DST_DATE_FORMAT = '%d-%m-%Y %H:%M:%S'

puts %Q{
    CREATE TABLE Weather (
        [ID] INT IDENTITY(1,1) NOT NULL,
        [Station] VARCHAR(255) NOT NULL,
        [Date] DATETIME NOT NULL,
        [TMax] DECIMAL(5,2) NOT NULL,
        [TMin] DECIMAL(5,2) NOT NULL,
        [Wind] DECIMAL(5,2) NOT NULL,
        [Gust] DECIMAL(5,2) NULL,
        [Rain] DECIMAL(5,2) NOT NULL,
        [Snow] DECIMAL(5,2) NULL,
        [Events] VARCHAR(255) NULL
    )
    GO

    BEGIN TRANSACTION
}

CSV.foreach('sofia.csv', :headers => true) do |row|
    date = DateTime.strptime("#{row['Date']} #{row['Time']}", SRC_DATE_FORMAT)

    puts %Q{
    INSERT INTO Weather
        ([Station], [Date], [TMax], [TMin], [Wind], [Gust], [Rain], [Snow], [Events])
    VALUES
        ('SOFIA', CONVERT(DATETIME, '#{date.strftime(DST_DATE_FORMAT)}', 103), #{row['TMax']}, #{row['TMin']}, #{row['Wind']}, #{row['Gust']}, #{row['Rain']}, #{row['Snow']}, '#{row['Events']}')
    }
end

puts %Q{
    COMMIT TRANSACTION
}
