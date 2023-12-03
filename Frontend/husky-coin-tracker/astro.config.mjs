import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import svelte from "@astrojs/svelte";
import solidJs from "@astrojs/solid-js";
import partytown from "@astrojs/partytown";
import react from '@astrojs/react';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [
  tailwind(),
  react({
    include: ['**/react/*'],
  }),
  svelte(),
  solidJs({
    exclude: ['**/react/*'],
  }),
  partytown()]
});