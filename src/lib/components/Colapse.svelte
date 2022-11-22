<script>
  export let title = "Title";
  export let textSize = "text-xs";
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
  tabindex="0"
  class="collapse collapse-arrow border border-base-300 bg-base-100"
>
  <div class="collapse-title {textSize} text-ellipsis whitespace-nowrap">
    {title}
  </div>
  <div class="collapse-content text-xs">
    <slot><!-- optional fallback --></slot>
  </div>
</div>
