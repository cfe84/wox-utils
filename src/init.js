const uuid = require("uuid").v4
const fs = require("fs")
const path = require("path")

const targetDirectory = process.cwd()

function createPluginFile({ name, description, keyword, author }) {
  const template = {
    "ID": uuid(),
    "ActionKeyword": keyword,
    "Name": name,
    "Description": description,
    "Author": author,
    "Version": "1.0.0",
    "Language": "executable",
    "Website": "http://nothing.com",
    "IcoPath": "img\\logo.jpg",
    "ExecuteFileName": "run.bat"
  }
  const targetFile = path.join(targetDirectory, "plugin.json")
  fs.writeFileSync(targetFile, JSON.stringify(template))
}

function getResourceFileName(filename) {
  return path.join(__dirname, "..", "res", filename)
}

function getTargetFileName(...filenames) {
  return path.join(targetDirectory, ...filenames)
}

function copyResources() {
  fs.mkdirSync(getTargetFileName("img"), { recursive: true })
  fs.mkdirSync(getTargetFileName("src"), { recursive: true })
  fs.copyFileSync(getResourceFileName("run.bat"), getTargetFileName("run.bat"))
  fs.copyFileSync(getResourceFileName("circle.jpg"), getTargetFileName("img", "logo.jpg"))
  fs.copyFileSync(getResourceFileName("pack.js"), getTargetFileName("pack.js"))
  if (!fs.existsSync(getTargetFileName("index.ts"))) {
    fs.copyFileSync(getResourceFileName("index.ts"), getTargetFileName("src", "index.ts"))
  }
  fs.copyFileSync(getResourceFileName("RenameMeHandler.ts"), getTargetFileName("src", "RenameMeHandler.ts"))
}

function updatePackage(package) {
  package.scripts["pack"] = "node pack.js"
  package.scripts["bnp"] = "npm run build && npm run pack"
  if (!package.dependencies) {
    package.dependencies = {}
  }
  if (!package.devDependencies) {
    package.devDependencies = {}
  }
  package.dependencies["wox-ts"] = "^1.0.0"
  package.devDependencies["adm-zip"] = "^0.5.9"
  package["woxPack"] = {
    "target": package.name + ".wox",
    "pullNodeModules": true,
    "include": [
      "plugin.json",
      "run.bat",
      "img",
      "dist"
    ]
  },
    fs.writeFileSync("package.json", JSON.stringify(package, null, 2))
}

const package = JSON.parse(fs.readFileSync("package.json").toString())
copyResources()
createPluginFile({
  name: package.name,
  author: package.author,
  description: package.description,
  keyword: "*"
})
updatePackage(package)