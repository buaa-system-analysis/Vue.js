<template>
  <div style="margin-top: 30px; padding: 0 25% 0 25%; text-align: left">
    <div style="width: 100%">
      <p style="color: black; font-size: 24px; float: left; width:100%">
        {{this.$store.state.username}}的收藏列表
        <el-divider></el-divider>
      </p>
    </div>
    <div style="width: 100%">
      <el-row>
        <el-col>
          <el-table size="medium" :data="paperListStyle.data" border style="width: 100%" highlight-current-row>
            <el-table-column type="index"></el-table-column>
            <el-table-column v-for="(v,i) in paperListStyle.columns" :prop="v.field" :label="v.title" :key="(v,i)">
              <template slot-scope="scope">
                <span v-if="scope.row.isSet">
                  <el-input size="medium" placeholder="请输入内容" v-model="paperListStyle.sel[v.field]">
                  </el-input>
                </span>
                <span v-else>{{scope.row[v.field]}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                  <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="changePaperList(scope.row,scope.$index,true)">
                      {{scope.row.isSet?'保存':"修改"}}
                  </span>
                  <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;"  @click="changePaperList(scope.row,scope.$index,false)">
                      删除
                  </span>
                  <span v-else class="el-tag el-tag--mini" style="cursor: pointer;" @click="scope.row.isSet = false">
                      取消
                  </span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col>
          <div class="el-table-add-row" style="width: 100%;" @click="addPaperList()">
            <span style="color: black;">+ 添加</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Collection',
  data () {
    return {
      paperListStyle: {
        sel: null,
        columns: [
          { field: 'paperListName', title: '名称' }
        ],
        data: []
      }
    }
  },
  methods: {
    addPaperList () {
      let j = {
        id: 0,
        'paperListName': '',
        'isSet': true
      }
      this.paperListStyle.data.push(j)
      this.paperListStyle.sel = JSON.parse(JSON.stringify(j))
    },
    changePaperList (row, index, cg) {
      if (!cg) {
        if (!this.paperListStyle.sel.id) {
          this.paperListStyle.data.splice(index, 1)
        }
        row.isSet = !row.isSet
        return true
      }

      if (row.isSet) {
        let data = JSON.parse(JSON.stringify(this.paperListStyle.sel))
        for (let k in data) {
          row[k] = data[k]
        }
        this.$message('保存成功')
        row.isSet = false
      } else {
        this.paperListStyle.sel = JSON.parse(JSON.stringify(row))
        row.isSet = true
      }
    },
    deletePaperList () {

    }
  }
}
</script>

<style scoped>
.el-table-add-row {
    margin-top: 10px;
    width: 100%;
    height: 34px;
    border: 1px dashed #c1c1cd;
    border-radius: 3px;
    cursor: pointer;
    justify-content: center;
    display: flex;
    line-height: 34px;
}
</style>
