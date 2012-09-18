require 'rbconfig'

LEGAL = File.join('resources', 'legal', BETA ? 'beta' : 'official')
THIRD_PARTY_LEGAL = File.join('resources', 'legal', 'third-party')

class MergeTask < Rake::FileTask
    def execute(args=nil)
        File.open(name, 'w') do |output|
            $stderr.puts "Merge\n\t#{prerequisites.join("\n\t")} \nto #{name}"

            prerequisites.each do |src|
                File.open(src, 'r:bom|utf-8') do |file|
                    output.write file.read
                end
            end
        end
    end
end

class LicenseTask < Rake::FileTask
    def execute(args=nil)
        ensure_path(name)

        template = File.read(prerequisites[0])

        File.open(name, "w") do |file|
            file.write(template.sub("#= version #", VERSION).sub("#= year #", Time.now.year.to_s))
        end
    end

    def needed?
        super || !File.read(name).include?(VERSION)
    end
end

def ensure_path(path)
    dir = path.pathmap('%d')
    mkdir_p dir unless Dir.exists?(dir)
end

def file_merge(*args, &block)
    MergeTask.define_task(*args, &block)
end

def file_license(*args, &block)
    LicenseTask.define_task(*args, &block)
end

def subject_to_license?(file)
    file.pathmap('%f') =~ /^kendo(.+)(js|css|less)$/
end

def msbuild(project, options=nil)
    platform = RbConfig::CONFIG['host_os']

    options = '/p:Configuration=Release' if options == nil

    msbuild_path = 'c:\\Windows\\Microsoft.NET\\Framework64\\v4.0.30319\\msbuild.exe'

    msbuild_path = 'xbuild' if platform =~ /linux|darwin/

    sh "#{msbuild_path} #{project} #{options}"
end

# Copy file when it is modified
def file_copy(options)
    to = options[:to]
    license = options[:license]
    from = options[:from]

    if license && subject_to_license?(to)
        prerequisites = [from, license]
    else
        prerequisites = from
    end

    file to => prerequisites do |t|
        ensure_path to

        $stderr.puts "cp #{from} #{to}"

        File.open(to, "w") do |file|
            if license && subject_to_license?(to)
                file.write(File.read(license))
            end

            file.write(File.read(from))
        end
    end
end

def tree(options)
    dir = options[:to]
    root = options[:root]

    source = FileList[*options[:from]].reject { |f| File.directory? f }

    destination = source.sub(root, "#{dir}/")

    file dir => destination

    destination.each_with_index do |f, index|
        src = source[index]

        file_copy :to => f, :from => src, :license => options[:license]
    end
end

def description(name)
    name = name.sub('.', ' ').split(/\W/).map { |c| c.capitalize }.join(' ')

    "Build Kendo UI #{name}"
end

def bundle(options)
    name = options[:name]
    path = "dist/bundles/#{name}"
    prerequisites = []
    eula = options[:eula]
    license = "#{path}.license"

    file_license license => File.join(LEGAL, "#{options[:license]}.txt")

    options[:contents].each do |target, contents|

        to = "#{path}/#{target}"

        tree :to => to,
             :from => contents,
             :root => ROOT_MAP[target],
             :license => license

        prerequisites.push(to)
    end

    if eula
        license_agreements_path = File.join(path, "license-agreements")
        third_party_path = File.join(license_agreements_path, "third-party")
        source_path = File.join(LEGAL, eula + "-eula")

        tree :to => license_agreements_path,
             :from =>  File.join(source_path, "*"),
             :root => source_path

        tree :to => third_party_path,
             :from =>  File.join(THIRD_PARTY_LEGAL, "*"),
             :root => THIRD_PARTY_LEGAL

        prerequisites.push(license_agreements_path)
        prerequisites.push(third_party_path)
    end


    zip "#{path}.zip" => [:js, :less] + prerequisites

    task name => "#{path}.zip"
    desc description(name)
    task "bundles:#{name}" => "#{path}.zip"
end

