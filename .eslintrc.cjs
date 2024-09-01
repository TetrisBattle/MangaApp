module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:prettier/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 'latest',
	},
	plugins: ['react-refresh'],
	rules: {
		// 'no-unused-vars': 'warn',
		// 'no-console': ['warn', { allow: ['error'] }],
		'no-debugger': 'warn',
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/no-explicit-any': 'off',
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'prettier/prettier': [
			'warn',
			{
				printWidth: 80,
				tabWidth: 4,
				useTabs: true,
				semi: false,
				singleQuote: true,
				jsxSingleQuote: true,
				trailingComma: 'es5',
				endOfLine: 'auto',
			},
		],
	},
}
