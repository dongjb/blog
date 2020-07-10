<template>
  <div class="scrollbar-demo">
    <div>
      <p>scrollbar-demo</p>
      <p>scrollbar-demo</p>
      <p>scrollbar-demo</p>
      <p>scrollbar-demo</p>
      <p>scrollbar-demo</p>
      <p>scrollbar-demo</p>
      <p>scrollbar-demo</p>
      <p>scrollbar-demo</p>
      <p>scrollbar-demo</p>
      <p>scrollbar-demo</p>
      <p>scrollbar-demo</p>
      <p>scrollbar-demo</p>
      <p>scrollbar-demo</p>
      <p>scrollbar-demo</p>
    </div>
  </div>
</template>

<style lang="stylus">
.scrollbar-demo {
  width: 100%;
  height: 200px;
  border: 1px solid #ccc;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 20px;
    height: 20px;
    background-color: yellow;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f00;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: green;
  }

  &::-webkit-scrollbar-button {
    background-color: #ccc;
    height: 10px;
    width: 10px;
  }

  &::-webkit-scrollbar-corner {
    background-color: #666;
  }

  > div {
    width: 2000px;
  }
}
</style>
