import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'), // Where your components are exported
      name: 'MyBestComponents',
      fileName: 'my-best-components',
    },
    rollupOptions: {
      // 1. THIS IS THE MAGIC LINE: Tell Rollup not to bundle Vue
      external: ['vue', 'pinia', '@vueuse/core', '@floating-ui/vue'], // Add pinia here too if your components rely on it!

      output: {
        // 2. Provide a global variable to use in the UMD build for externalized deps
        globals: {
          vue: 'Vue',
          pinia: 'Pinia',
          '@vueuse/core': 'VueUseCore',
          '@floating-ui/vue': 'FloatingUi',
        },
      },
    },
  },
});
