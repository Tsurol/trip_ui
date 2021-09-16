<template>
  <!-- 首页精选景点 -->
  <div class="home-fine-box">
    <!-- 顶上导航 -->
    <van-cell
      title="精选景点"
      value="更多"
      is-link
      title-style="text-align:left"
      icon="location-o"
      style="padding:10px 0px"
      :to="{ name: 'Search', query: { isTop: 1 } }"
    />
    <!-- //顶上导航 -->
    <!-- 景点列表 -->
    <div class="box-main">
      <ListSight v-for="sight in dataList" :key="sight.id" :item="sight" />
    </div>
    <!-- //景点列表 -->
  </div>
  <!-- //首页精选景点 -->
</template>

<script>
import ListSight from "@/components/common/ListSight";
import { ajax } from "@/utils/ajax";
import { SightApis } from "@/utils/apis";

export default {
  components: {
    ListSight
  },
  data() {
    return {
      dataList: []
    };
  },
  methods: {
    // 查询精选景点数据
    getDataList () {
      ajax.get(SightApis.sightListCacheUrl, {
        params: {
          is_top: 1
        }
      }).then(({data})=> {
        this.dataList = data.objects;
      });
    }
  },
  created() {
    // 获取精选景点列表接口数据
    this.getDataList();
  }
};
</script>

<style lang="less">
.home-fine-box {
  margin-top: 10px;
  background-color: #fff;
  padding: 0 10px;
  .box-main {
    padding-bottom: 60px;
  }
}
</style>
