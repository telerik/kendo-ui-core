desc 'Build time zone database'
task :timezone do
    sh 'curl ftp://ftp.iana.org/tz/tzdata-latest.tar.gz -o tzdata-latest.tar.gz --ftp-pasv'
    sh 'tar -xvzf tzdata-latest.tar.gz -C build/tz'
    sh 'rm tzdata-latest.tar.gz'
    sh 'node build/timezone-js/src/node-preparse.js build/tz > build/tz/timezones.json'
end
