import { execSync } from 'child_process';
import fs from 'fs';
import inquirer from 'inquirer';

let preVersion = ''; // 当前版本号
let newVersion = ''; // 新版本号

/** 设置版本 */
function setPackageVersion() {
  const packageJsonStr = fs.readFileSync('./package.json').toString();
  const packageJson = JSON.parse(packageJsonStr);
  packageJson.version = newVersion;
  console.info('版本修改为：' + newVersion);

  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, '\t'));
  execSync(`git add package.json`);
  execSync(`git commit -m '更新package.json'`);
}
/** 更新项目版本 */
function updateVersion(type) {
  try {
    const packageJsonStr = fs.readFileSync('./package.json').toString();
    const packageJson = JSON.parse(packageJsonStr);
    // 方便回档
    preVersion = packageJson.version;
    // 升级版本号
    let [major, minor, patch] = packageJson.version.split('.').map((v) => +v);
    if (type === 'major') {
      //major 主版本
      major += 1;
      minor = patch = 0;
    } else if (type === 'minor') {
      //minor  次版本
      minor += 1;
      patch = 0;
    } else {
      //patch 小版本
      patch += 1;
    }
    newVersion = `${major}.${minor}.${patch}`;
    setPackageVersion();

    try {
      execSync(`git tag ${newVersion}`);
    } catch (error) {
      console.log('tag 已存在，删除tag,重新打');
      execSync(`git tag -d ${newVersion}`);
      execSync(`git tag ${newVersion}`);
    }
  } catch (e) {
    console.error('处理package.json失败，请重试', e.message);
    process.exit(1);
  }
}

const prompt = inquirer.createPromptModule();
prompt({
  type: 'list',
  choices: [
    {
      name: 'major(修改主版本)',
      value: 'major',
    },
    {
      name: 'minor(修改次版本)',
      value: 'minor',
    },
    {
      name: 'patch(修改小版本)',
      value: 'patch',
    },
  ],
  name: 'type',
  message: '请选择发布类型',
}).then((res) => {
  const { type = 'patch' } = res;
  try {
    //  项目打包
    console.log('build project ...');
    // execSync('yarn build');

    console.log('update version ...');
    // 更新版本
    updateVersion(type);

    console.log('push code ...');
    execSync('git push origin develop');

    console.log('publish package ...');
    execSync('npm publish');
  } catch (error) {
    console.log(error);
    if (!preVersion) {
      console.log('回退版本');
      execSync(`git tag -d ${newVersion}`);
    }
  }
});
