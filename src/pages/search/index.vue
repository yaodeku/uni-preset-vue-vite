<template>
  <layout page-title="搜索">
    <view class="page-root">
      <view class="page-card">
        <view class="card-header">
          <text class="page-title">搜索</text>
          <view class="header-actions">
            <view class="tabs">
              <button :class="['tab-button', tab==='tasks'?'active':'']" @click="tab='tasks'">任务</button>
              <button :class="['tab-button', tab==='projects'?'active':'']" @click="tab='projects'">项目</button>
            </view>
          </view>
        </view>

        <view class="card-body">
          <view class="search-row">
            <input class="input-sm" v-model="query" placeholder="输入关键词" />
            <button class="btn-primary" @click="search">搜索</button>
          </view>

          <view v-if="tab==='tasks'" class="results-grid">
            <view class="result-card" v-for="t in taskResults" :key="t.id">
              <text class="result-title">{{ t.title }}</text>
              <text class="result-sub">{{ t.description }}</text>
            </view>
          </view>

          <view v-else class="results-grid">
            <view class="result-card" v-for="p in projectResults" :key="p.id">
              <text class="result-title">{{ p.title }}</text>
              <text class="result-sub">{{ p.description }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </layout>
</template>

<script src="./index.js">
</script>

<style src="./index.css">
</style>
