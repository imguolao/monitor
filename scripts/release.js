import fs from 'node:fs'
import { resolve } from 'node:path'
import { execSync } from 'node:child_process'
import readline from 'node:readline'

const __dirname = import.meta.dirname
const packageJsonPath = resolve(__dirname, '../package.json')
const cargoTomlPath = resolve(__dirname, '../src-tauri/Cargo.toml')
const tauriConfJsonPath = resolve(__dirname, '../src-tauri/tauri.conf.json')

run()

function getVersionComponent (version, type) {
  const [major, minor, patch] = version.split('.').map(str => {
    const arr = str.split('-')
    if (arr.length === 1) {
      return Number(arr[0])
    }

    return [arr[0], Number(arr[1].split('.')[1] ?? -1)]
  })
  switch (type) {
    case 'major':
      return `${major + 1}.0.0`
    case 'minor':
      return `${major}.${minor + 1}.0`
    case 'patch':
      return `${major}.${minor}.${patch + 1}`
    case 'beta':
      const [newPatch, beta] = patch
      return `${major}.${minor}.${newPatch}-beta.${beta + 1}`
    default:
      throw new Error('Invalid version type')
  }
};

function updateVersionInFile (filePath, newVersion) {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  let updatedContent = fileContent

  if (filePath.endsWith('Cargo.toml')) {
    updatedContent = fileContent.replace(
      /version\s*=\s*"(.*?)"/,
      `version = "${newVersion}"`
    )
  } else if (filePath.endsWith('package.json') || filePath.endsWith('tauri.conf.json')) {
    const jsonContent = JSON.parse(fileContent)
    if (jsonContent.version) {
      jsonContent.version = newVersion
    }
    updatedContent = JSON.stringify(jsonContent, null, 2)
  }

  fs.writeFileSync(filePath, updatedContent, 'utf-8')
};

function updateVersion (versionType) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  const currentVersion = packageJson.version
  const newVersion = getVersionComponent(currentVersion, versionType)

  updateVersionInFile(packageJsonPath, newVersion)
  updateVersionInFile(cargoTomlPath, newVersion)
  updateVersionInFile(tauriConfJsonPath, newVersion)

  console.log(`Version updated to ${newVersion}`)
  return newVersion
};

function runCommand (command) {
  console.log(`Running command: ${command}`)
  execSync(command, { stdio: 'inherit' })
};

function gitTagAndPush (version) {
  runCommand(`git add .`)
  runCommand(`git commit -m "chore: release v${version}"`)
  runCommand(`git tag v${version}`)
  runCommand(`git push origin main --tags`)
};

function run () {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question('Please choose the version type (major, minor, patch, beta): ', (versionType) => {
    try {
      const newVersion = updateVersion(versionType)
      runCommand('pnpm tauri build')
      console.log("build success")
      // gitTagAndPush(newVersion)
      // console.log('Release process completed successfully! 🎉')
    } catch (error) {
      console.error(`Error: ${error.message}`)
    } finally {
      rl.close()
    }
  })
}
