require 'yaml'

version_data = YAML.load(File.read('VERSION'))

now = Time.now

year = version_data['year'].to_i

month = now.month + (now.year - year) * 12

VERSION = "#{year}.#{version_data['release']}.#{month * 100 + now.day}"
BETA = !!ENV['BETA']
