# sequelize

## 描述关系模型

用户(`User`)－与其它模型存在`1:1`、`1:N`、`N:M`
用户登录信息(`UserCheckin`)－与 `User` 存在 `1:1` 关系
用户地址(`UserAddress`)－与 `User` 存在 `N:1` 关系
角色(`Role`)－与 `User` 存在 `N:M` 关系

这几个模型的E-R结构如下：

![](https://dn-cnode.qbox.me/Fno1hzNb3V0m7uAxIG_SuEubEdx0)

## 参考文档

1. [sequelize-docs](https://demopark.github.io/sequelize-docs-Zh-CN/)
2. [koa2-with-sequelize](https://github.com/fengyun2/koa2-with-sequelize)