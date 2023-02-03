[English](README.md) | [中文](README-CN.md)

# @yaoxfly/cli

Clean and minimalist project scaffolding integrates`vue3` project templates,`vitepress ` project templates, etc., right out of the box.

> Compatibility note: The scaffolding uses `Vite` internally by default,`Vite` requires `Node.js` version ` 14.18+ `, `16+`. However, some templates rely on a higher version of `Node` to function properly, so be careful to upgrade your version of 'Node' when your package manager warns you.  [node version switch](#node-version-switch)


# Use npx

No sense download template, no need to install `@yaoxfly/cli`.

```
npx @yaoxfly/cli@latest create  [Project name]

```

> If the `npm` image downloads slowly, please switch other image such as `taobao` image, you can use `nrm` management, or other ways, [image switch](#image-switch).


# Creation project

You can also download and then use, the current way can provide more comprehensive features, global download.

```
npm i @yaoxfly/cli -g
```

use

```
yx-cli create [Project name]
```

# Add template

Add custom templates, such as your own `GitHub` or `Gitee` (code cloud) project address

```
yx-cli add
```

#### Format of the template address

You can use the following shorthand

```
GitHub - github:owner/name or owner/name
GitLab - gitlab:owner/name
Bitbucket - bitbucket:owner/name
```
> 1.The default is `master` branching, but you can specify branching and `tag`, such as `owner/name#my-branch`.
> 2.You can also specify a custom source, such as ` gitlab:custom.com: owner/name `. Custom source default is `https` or `git@`, you can customize the protocol.


#### Direct - direct:url 

This method skips the above shorthand and passes the full `url`.

```
direct:https://gitlab.com/flippidippi/download-git-repo-fixture.git
```

> Gitee(code cloud), private library address can be used in this way.

# Deleting a template

```
yx-cli delete
```

# Viewing the Template list

```
yx-cli list
```

# image switch

## Use nrm

Global download

```
npm i nrm@1.0.0 -g
```
>A lower version of `node` and a higher version of `nrm` may not be available.

Viewing the image list

```
nrm ls
```

Using Taobao image

```
nrm use taobao
```

## Use npm

Set Taobao image

```
npm config set registry https://registry.npmmirror.com/
```

> `registry.npm.taobao.org`, which was abandoned on May 31, 2022, needs to be replaced with a new `registry.npmmirror.com` source.


Check whether the configuration is successful

```
npm config get registry 
```

View the current configuration of npm
```
npm config list 
```

Set up an npm image
```
npm config set registry https://registry.npmjs.org/
```

##  Use .npmrc
In the root directory, create `.npmrc` and write the following

```
registry= https://registry.npmmirror.com/
```


# node version switch

#### Use `nvm` to manage your `node` version

[nvm download address](https://github.com/coreybutler/nvm-windows/releases)


Download the `vmm-setup. zip` version and install it as prompted.

#### To download node

This describes only windows systems.

When node is installed using the `nvm` command line, `nvm` will not install `npm` when the `node` version is` 8`or higher. 

Download the corresponding version `zip` file from the   [nodejs download website](https://registry.npmmirror.com/binary.html?path=node) and decompress it to the root directory of the `nvm` installation directory. Change the name of the decompressed folder to `v version number`
For example, the folder name after decompression is changed from `node-v16.13.1-win-x64` to `v16.13.1`.

View the downloaded version of `node`

```
nvm list
```

Use the corresponding version
```
nvm use [Version number]
```