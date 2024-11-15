import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules:{
            'indent': ['error', 4],
            "@typescript-eslint/no-explicit-any": "off"
        }
    }
);