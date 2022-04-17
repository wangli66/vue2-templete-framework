module.exports = {
    root: true,
    env: {
        node: true
    },
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    plugins: ['prettier'],
    extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: ['error', 4], //允许4个空格为缩进
        // 文件末尾不强制换行
        'eol-last': ['error', 'always'], //不在每个文件末尾检查检查是否有空行
        'newline-per-chained-call': ['error', { ignoreChainWithDepth: 5 }],
        // 'newline-per-chained-call': false,
        // js语句结尾必须使用分号
        semi: ['off', 'always'],
        // 三等号
        eqeqeq: 0,
        // 强制在注释中 // 或 /* 使用一致的空格
        'spaced-comment': 0,
        // 强制在对象字面量的属性中键和值之间使用一致的间距
        'key-spacing': [
            2,
            {
                beforeColon: false,
                afterColon: true
            }
        ],
        // 强制在关键字前后使用一致的空格
        'keyword-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        // 关键字后面使用一致的空格
        // 'keyword-spacing': 0,
        // 强制在 function的左括号之前使用一致的空格
        'space-before-function-paren': 0,
        // 引号类型
        // quotes: [2, 'single'],
        // 禁止出现未使用过的变量
        'no-unused-vars': 0,
        //不能有声明后未被使用的变量或参数
        // 'no-unused-vars': [2, { vars: 'all', args: 'after-used' }],
        // 要求或禁止末尾逗号
        'comma-dangle': 0,
        // 严格的检查缩进问题
        // indent: 0,
        //引入模块没有放入顶部
        'import/first': 0,
        //前面缺少空格，Missing space before
        'arrow-spacing': 0,
        //后面没有空位，There should be no space after this paren
        'space-in-parens': 0,
        //已定义但是没有使用，'scope' is defined but never used
        'vue/no-unused-vars': 0,
        //块语句中的内容不能为空
        // 'no-empty': 2,
        //禁止使用process.env
        'no-process-env': 0,
        //禁止使用process.exit()
        'no-process-exit': 0,
        //nodejs 禁止同步方法
        'no-sync': 0,
        //不能有未定义的变量
        'no-undef': 0,
        // 不允许多个空行
        'no-multiple-empty-lines': [2, { max: 3 }],
        // 'no-restricted-syntax': ['error', 'ObjectExpression > SpreadElement', 'ObjectPattern > RestElement', 'AwaitExpression'],
        'no-restricted-syntax': 0,
        'vue/multi-word-component-names': 0,
        'no-useless-escape': 0,
        'prettier/prettier': [
            'error',
            {
                printWidth: 160, //一行的代码数
                tabWidth: 4, // 会忽略vetur的tabSize配置
                useTabs: false,
                singleQuote: true,
                quoteProps: 'preserve',
                semi: true, //句尾加分号
                endOfLine: 'auto',
                usePrettierrc: false, //不读取prettier的配置
                fileInfoOptions: {
                    //忽略node-module中的文件格式检查
                    withNodeModules: true
                },
                eslintIntegration: true,
                trailingComma: 'none', //是否使用尾逗号
                arrowParens: 'avoid' //箭头函数单一参数省略括号
            }
        ]
    }
};
