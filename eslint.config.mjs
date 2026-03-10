import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@/components/atoms",
              message:
                "No uses barrel imports. Importa desde el archivo directo: @/components/atoms/Button",
            },
            {
              name: "@/components/molecules",
              message:
                "No uses barrel imports. Importa desde el archivo directo: @/components/molecules/TitleSubtitle",
            },
            {
              name: "@/components/organisms",
              message:
                "No uses barrel imports. Importa desde el archivo directo: @/components/organisms/InvitationHeader",
            },
            {
              name: "@/templates",
              message:
                "No uses barrel imports. Importa desde el archivo directo: @/templates/SinglePageInvitation",
            },
            {
              name: "@/theme",
              message:
                "No uses barrel imports. Importa desde el archivo directo: @/theme/tokens o @/theme/animationPresets",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
