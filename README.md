# DaBomb

A clone of Keep Talking And Nobody Explodes

## Runnig the app

```bash
# clone the repo
git clone https://github.com/guyver2/dabomb.git

# Install dependencies
pnpm install

# run the app
pnpm run dev
```

## Developing

Modules can be added easily, just create a new .svelte file in the folder `src/components/modules` and the associated manual page in `src/components/manuals`. You can look into `ModBasic.svelte` for a quick overview of how a module should handle successes and failures.

Then you can simply register your module and manual in `src/components/Defuser.svelte` and `src/components/Expert.svelte` respectively.
