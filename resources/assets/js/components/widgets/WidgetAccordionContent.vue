<template>
  <article class="panel">
    <div class="panel-heading" role="tab" :id="randonCode">
      <a data-toggle="collapse"
          data-parent="#accordion"
          :href="'#collapse'+ randonCode"
          aria-expanded="true"
          :aria-controls="'#collapse'+ randonCode">
        {{ title }}
        <i class="font-icon font-icon-arrow-down"></i>
      </a>
    </div>
    <div :id="'collapse'+ randonCode" class="panel-collapse collapse in" role="tabpanel" :aria-labelledby="randonCode">
      <div class="panel-collapse-in">

        <slot></slot>

      </div>
    </div>
  </article>
</template>
<script>
import { strRandon } from "./../../helpers/tools";

export default {
  name: "WidgetAccordionContent",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    randonCode() {
      return strRandon()
    }
  }
};
</script>
