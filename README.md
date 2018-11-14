# Vue-Idle-Runner

Vue module with component wrapper and mixin for running component / function in each idle call, this help a lot for better performance and follow the principle of Lighthouse audit for performance in `First CPU Idle` and `Time to Interactive
`, so that each component or function can be run individually rather than running at the same time

# Usage
main.js:
```javascript
import Vue from 'vue'
import App from './App.vue'
import VueIdleRunner from 'vue-idle-runner'

Vue.use(VueIdleRunner)

// or with options
Vue.use(VueIdleRunner, {
  onLoadTimeout: 10000,
})
```

## Constructor Options

|key|description|default|options|
|:---|---|---|---|
| `onLoadTimeout`|Run the onload idle task after a certain time in millisecond even page onload still not complete |`0`|`Number`|


You can use idle queue by template markup or use it individually by function call, you can also use the mixin.


By Function:
## Options

|key|description|default|options|
|:---|---|---|---|
| `onLoadTimeout`|Run the onload idle task after a certain time in millisecond even page onload still not complete |`0`|`Number`|
| `onload`| Run the idle task after page onload |`false`|`Boolean`|

```javascript
this.$idleQueue(function() {
  console.log('I am run by idleQueue after page onload')
}, {onload: true})
```

```javascript
this.$idleQueue(function() {
  console.log('I am run by idleQueue')
})
```

By template:
```html
<idle-queue>
  <any-component />
</idle-queue>
```

After page onload:
```html
<onload-idle-queue>
  <any-component />
</onload-idle-queue>
```

After page onload / by timeout:
```html
<onload-idle-queue onLoadTimeout=500>
  <any-component />
</onload-idle-queue>
```


By mixin:

```html
<template>
  <any-component v-if="isIdle" />
</template>
<script>
// a reactive property `this.isIdle` can be access
import idle from 'vue-idle-runner/dist/mixins/idle'
export default {
  mixins: [idle],
}
</script>
```

After page onload:
```html
<template>
  <any-component v-if="isOnloadIdle" />
</template>
<script>
// a reactive property `this.isOnloadIdle` can be access
import onLoadIdle from 'vue-idle-runner/dist/mixins/onLoadIdle'
export default {
  mixins: [onLoadIdle],
}
</script>
```
