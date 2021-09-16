module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ["plugin:vue/essential", "eslint:recommended"],
    parserOptions: {
        parser: "babel-eslint",
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "linebreak-style": ["error", "windows"],
        indent: ["error", 2], //缩进没有使用4个空格 -- 错误
        quotes: ["error", "double"], //字符串没有使用双引号 -- 错误
        semi: ["error", "always"], //没有添加末尾分号 -- 错误
        "no-unused-vars": 1, //声明变量未使用 -- 警告
        "vue/no-unused-vars": 1,
        "linebreak-style": 0, //换行符使用 -- 不报错
    },
};
