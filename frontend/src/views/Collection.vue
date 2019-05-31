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
          <el-table size="medium" :data="paperListCollection.data" border style="width: 100%" highlight-current-row>
            <el-table-column type="index"></el-table-column>
            <el-table-column v-for="(v,i) in paperListCollection.columns" :prop="v.field" :label="v.title" :key="(v,i)">
              <template slot-scope="scope">
                <span v-if="scope.row.isSet">
                  <el-input size="medium" placeholder="请输入内容" v-model="paperListCollection.sel[v.field]">
                  </el-input>
                </span>
                <!-- <span v-else><el-link href="/PaperList" target="_blank">{{scope.row[v.field]}}</el-link></span> -->
                <el-button v-else type="text" size="small" @click="jump2list(scope.row['paperListID'], scope.row['paperListName'])">{{scope.row['paperListName']}}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                  <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="changePaperList(scope.row,scope.$index,true)" v-if="scope.row.isSet">
                      {{scope.row.isSet?'保存':"修改"}}
                  </span>
                  <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;"  @click="changePaperList(scope.row,scope.$index,false, 2)">
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
    <div style="width: 100%">
      <p style="color: black; font-size: 24px; float: left; width:100%; margin-top: 30px">
        {{this.$store.state.username}}的订阅列表
        <el-divider></el-divider>
      </p>
      <el-table size="medium" :data="paperListSubscribe.data" border style="width: 100%" highlight-current-row>
        <el-table-column type="index"></el-table-column>
        <el-table-column v-for="(v,i) in paperListSubscribe.columns" :prop="v.field" :label="v.title" :key="(v,i)">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="jump2list(scope.row['paperListID'], scope.row['paperListName'])">{{scope.row['paperListName']}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <span class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;" @click="changePaperList(scope.row,scope.$index,false, 4)">
                删除
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Collection',
  data () {
    return {
      paperListCollection: {
        sel: [],
        columns: [
          { field: 'paperListName', title: '名称' }
        ],
        data: []
      },
      paperListSubscribe: {
        columns: [
          { field: 'paperListName', title: '名称' }
        ],
        data: []
      }
    }
  },
  mounted () {
    let postData = {
      'userID': parseInt(this.$store.state.userID),
      'paperListID': 0
    }
    // console.log(postData)
    this.$axios.post('/api/collection/get_paper_list', postData).then((response) => {
      // console.log(response.data['data']['paperList'])
      for (let i = 0; i < response.data['data']['paperList']['mylist'].length; i++) {
        let j = {
          'id': i,
          'isSet': false,
          'paperListName': response.data['data']['paperList']['mylist'][i]['name'],
          'paperListID': response.data['data']['paperList']['mylist'][i]['_id']
        }
        console.log(j)
        this.paperListCollection.data.push(j)
        this.paperListCollection.sel = JSON.parse(JSON.stringify(j))
      }
      for (let i = 0; i < response.data['data']['paperList']['collist'].length; i++) {
        let j = {
          'id': i,
          'paperListName': response.data['data']['paperList']['collist'][i]['name'],
          'paperListID': response.data['data']['paperList']['collist'][i]['_id']
        }
        this.paperListSubscribe.data.push(j)
      }
    })
    // console.log(this.paperListCollection.data)
  },
  methods: {
    addPaperList () {
      for (let i of this.paperListCollection.data) {
        if (i.isSet) {
          this.$message({
            message: '请保存当前的编辑项目',
            type: 'warning'
          })
          return false
        }
      }
      let j = {
        id: this.paperListCollection.data.length,
        'paperListName': '',
        'isSet': true
      }
      this.paperListCollection.data.push(j)
      this.paperListCollection.sel = JSON.parse(JSON.stringify(j))
    },
    changePaperList (row, index, cg, cmd) {
      for (let i of this.paperListCollection.data) {
        if (i.isSet && i.id !== row.id) {
          this.$message({
            message: '请保存当前的编辑项目',
            type: 'warning'
          })
          return false
        }
      }
      if (!cg) {
        row.isSet = !row.isSet
        let data = []
        if (cmd === 1 || cmd === 2) {
          data = this.paperListCollection.data[index]
        } else {
          data = this.paperListSubscribe.data[index]
        }
        let postData = {
          'userID': parseInt(this.$store.state.userID),
          'paperListID': data.paperListID,
          'cmd': cmd,
          'name': data.paperListName
        }
        console.log(postData)
        // todo：添加API之后调用API删除paperList
        this.$axios.post('/api/collection/manage', postData).then((response) => {
          let resdata = response.data
          if (resdata['code'] === 100) {
            if (cmd === 1 || cmd === 2) {
              this.paperListCollection.data.splice(index, 1)
            } else {
              this.paperListSubscribe.data.splice(index, 1)
            }
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            for (let k in data) {
              row[k] = data[k]
            }
            row.isSet = false
          } else {
            this.$message.error('删除失败')
          }
        })
        return true
      }

      if (row.isSet) {
        // todo：添加API之后调用API保存paperList
        let data = JSON.parse(JSON.stringify(this.paperListCollection.sel))
        let postData = {
          'userID': parseInt(this.$store.state.userID),
          'paperListID': 0,
          'cmd': 1,
          'name': data.paperListName
        }
        console.log(postData)
        for (let k in data) {
          row[k] = data[k]
        }
        row.isSet = false
        this.$axios.post('/api/collection/manage', postData).then((response) => {
          let resdata = response.data
          if (resdata['code'] === 100) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            for (let k in data) {
              row[k] = data[k]
            }
            row.isSet = false
          } else {
            this.$message.error('保存失败')
          }
        })
      } else {
        this.paperListCollection.sel = JSON.parse(JSON.stringify(row))
        row.isSet = true
      }
    },
    jump2list (id, name) {
      // console.log(id)
      // console.log(name)
      let routeData = this.$router.resolve({
        path: '/PaperList',
        query: {
          'id': id,
          'name': name
        }
      })
      window.open(routeData.href, '_blank')
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
