# @yaoxfly/cli
干净极简的项目脚手架集成了`vue3`项目模板，`vitepress`项目模板等，开箱即用。


# 使用 npx

无感知下载模板，无需安装`@yaoxfly/cli`。

```
npx @yaoxfly/cli@latest create  [工程名]

```

> 国内`npx`使用`npm`镜像下载可能会比慢，请切换其他镜像比如`taobao`镜像，可使用`nrm`管理,或其他方式，[镜像切换](#镜像切换)。

# 下载

你也可以下载后再使用,全局下载

```
npm i @yaoxfly/cli -g
```

使用
```
yx-cli create [工程名]
```
<a id='mirrorSwitching'></a>

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



