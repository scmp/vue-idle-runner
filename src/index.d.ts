import Vue, { PluginFunction } from 'vue'

declare module 'vue-idle-runner' {
  export const install: PluginFunction<never>
}

declare module 'vue-idle-runner/mixins' {
  export const idle: Vue;
  export const onLoadIdle: Vue;
}

declare module "vue/types/vue" {
  interface Vue {
    $idleQueue: (cb: () => void) => boolean;
  }
}
