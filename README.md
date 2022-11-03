# @yaoxfly/cli
干净极简的项目脚手架集成了`vue3`项目模板，`vitepress`项目模板等，开箱即用。


> 兼容性注意:
脚手架内部默认使用了`Vite`，`Vite` 需要 `Node.js` 版本 `14.18+`，`16+`。然而，有些模板需要依赖更高的`Node` 版本才能正常运行，当你的包管理器发出警告时，请注意升级你的`Node`版本。[node版本切换](#node版本切换)


# 使用 npx

无感知下载模板，无需安装`@yaoxfly/cli`。

```
npx @yaoxfly/cli@latest create  [工程名]

```

> 国内`npx`使用`npm`镜像下载可能会比慢，请切换其他镜像比如`taobao`镜像，可使用`nrm`管理,或其他方式，[镜像切换](#镜像切换)。

# 创建工程

你也可以下载后再使用，当前方式可提供更全面的功能,全局下载。

```
npm i @yaoxfly/cli -g
```

使用
```
yx-cli create [工程名]
```
<a id='mirrorSwitching'></a>


# 添加模板
添加自定义的模板，比如自己`GitHub`或者`Gitee`(码云)上的项目地址
```
yx-cli add
```

#### 模板地址的格式

可以采用下面简写方式

```
GitHub - github:owner/name 或者 owner/name
GitLab - gitlab:owner/name
Bitbucket - bitbucket:owner/name
```
> 1.默认是 `master` 分枝, 但你可以指定分枝和`tag` ，如 `owner/name#my-branch`。
> 2.你还可以指定自定义来源，如`gitlab:custom.com:owner/name`. 自定义来源默认为 `https` 或 `git@` , 可自定义协议。


#### Direct - direct:url方式

这种方式会跳过上面简写的方式，直接传递完整的 `url`。

```
direct:https://gitlab.com/flippidippi/download-git-repo-fixture.git
```

> Gitee(码云)，私库等地址可以使用这种方式。

# 删除模板

```
yx-cli delete
```


# 查看模板列表

```
yx-cli list
```

# 镜像切换

## 使用nrm

全局下载

```
npm i nrm@1.0.0 -g
```
>`node`版本较低，高版本`nrm`可能无法使用。

查看镜像列表

```
nrm ls
```

使用淘宝镜像
```
nrm use taobao
```

## 使用npm

设置淘宝镜像

```
npm config set registry https://registry.npmmirror.com/
```

查看是否配置成功
```
npm config get registry 
```

查看npm当前配置
```
npm config list 
```

设置npm镜像
```
npm config set registry https://registry.npmjs.org/
```

##  使用.npmrc
根目录下，创建`.npmrc`写入下面内容

```
registry= https://registry.npmmirror.com/
```


# node版本切换

#### 使用`nvm`来管理你的`node`版本

[nvm下载地址](https://github.com/coreybutler/nvm-windows/releases)


下载 `nvm-setup.zip`版本，根据提示安装即可。

#### 下载node：

使用`nvm`命令行安装`node`时，当`node`版本为`8`以上时，`nvm`将不会安装`npm`。

自行在[nodejs下载网站](https://registry.npmmirror.com/binary.html?path=node)下载对应版本`zip`文件，将其解压至`nvm`安装目录的根目录下，将解压后的文件夹名 改为 `v版本号`
例如：解压后的文件夹名：`node-v16.13.1-win-x64` 改为：`v16.13.1`完成。

查看已经下载的`node`版本
```
nvm list
```

使用对应的版本
```
nvm use [版本号]
```

