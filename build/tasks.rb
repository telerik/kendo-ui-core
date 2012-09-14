class MergeTask < Rake::FileTask
    def execute(args=nil)
        File.open(name, 'w') do |output|
            puts "Merge\n\t#{prerequisites.join("\n\t")} \nto #{name}"

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
        template = File.read(prerequisites[0])

        File.open(name, "w") do |file|
            file.write(template.sub "#= version #", VERSION)
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
    file.pathmap("%x") =~ /js|css|less/
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

        puts "cp #{from} #{to}"

        File.open(to, "w") do |file|
            if license && subject_to_license?(to)
                file.write(File.read(license))
            end

            file.write(File.read(from))
        end
    end
end

def tree(options)
    source = FileList[*options[:from]]

    directory = options[:to]

    destination = source.sub(/(.+?\/){#{options[:depth] || 1}}/, "#{directory}/")

    file directory => destination

    destination.each_with_index do |f, index|
        file_copy :to => f, :from => source[index], :license => options[:license]
    end
end
