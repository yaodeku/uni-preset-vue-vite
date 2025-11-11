<template>
  <Layout page-title="工作空间">
    <view class="page-root">
      <view class="page-card">
        <view class="card-header">
          <text class="page-title">工作空间</text>
          <view class="header-actions">
            <input class="input-sm" v-model="name" placeholder="名称" />
            <input class="input-sm" v-model="description" placeholder="描述" />
            <button class="btn-primary" @click="createWorkspace">新建</button>
          </view>
        </view>

        <view class="card-body">
          <view class="grid">
            <view class="workspace-card" v-for="w in workspaces" :key="w.id">
              <view class="workspace-main" @click="openDetail(w.id)">
                <text class="workspace-title">{{ w.name }}</text>
                <text class="workspace-sub">{{ w.description }}</text>
              </view>
              <view class="workspace-actions">
                <button class="btn-ghost" @click.stop="edit(w)">编辑</button>
                <button class="btn-danger" @click.stop="remove(w.id)">删除</button>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </Layout>
</template>

<script src="./index.js">
</script>

<style src="./index.css">
</style>