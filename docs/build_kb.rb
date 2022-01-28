temp_file = "temp_exclude_result.tmp"
File.delete(temp_file) if File.exist?(temp_file)
config_file = "_config.yml"

paths_to_include = ARGV.collect!{|arg| arg += '/' unless arg[-1] == '/'}

orig_config = File.read(config_file)
orig_exlude = orig_config[/(?<=exclude: \[)[^\]]*/].split(',')
all_paths = Dir["*/"].reject{ |f| f["images"] || f[0] == '_' || orig_exlude.include?(f) || paths_to_include.include?(f) || f == "controls/" || f == "knowledge-base/"}
all_controls_paths = Dir["controls/*/"].reject{ |f| f["images"] || f[0] == '_' || orig_exlude.include?(f) || paths_to_include.include?(f)}

exclude = orig_exlude + all_paths + all_controls_paths
exclude_text = "[" + exclude.join(',') + "]"

new_config = orig_config.gsub(/exclude: \[[^\]]*\]/, "exclude: " + exclude_text)

File.write("_tempconfig.yml", new_config)

system "bundle exec jekyll serve --config _tempconfig.yml"

