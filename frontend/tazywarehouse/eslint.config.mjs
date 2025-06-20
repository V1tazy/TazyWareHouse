import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",       // Отключаем проверку на any
      "@typescript-eslint/no-unused-vars": "off",       // Отключаем проверку неиспользуемых переменных
      "react-hooks/exhaustive-deps": "off"             // Отключаем проверку зависимостей useEffect
    }
  }
];

export default eslintConfig;