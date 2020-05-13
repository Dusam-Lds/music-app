<template>
  <div class="singer" ref="singer">

  </div>
</template>

<script>
import { getSingerList } from "api/singer";
import { ERR_OK } from "api/config";
import Singer from "../../common/js/singer";

const HOT_NAME = '热门';
const HOT_SINGER_LEN = 10;
export default {
  data() {
    return {
      singers: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    // 歌手数据
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list);
          console.log(this.singers,8888);
          
        }
      });
    },
    // 格式化歌手数据
    _normalizeSinger(list) {
      // 定义热门数据
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item,index) => {
        // 获取返回的的前几条数据作为热门数据
        if(index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name,
          }));
        }
        // 如果对象里面这个key(字母)不存在，则创建一个对象
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        // 在已创建的key里面，放入相应的歌手数据
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name,
        }))
      })
       // 为了得到有序列表，我们需要处理 map
      let hot = [];
      let ret = [];
      for(let key in map) {
        let val = map[key];
        if(val.title.match(/[a-zA-z]/)) {
          ret.push(val);
        }else if(val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a,b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
      return hot.concat(ret);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
