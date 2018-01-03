<template>
  <div>
    <el-table
    v-loading="loading"
    :data="properties"
    style="width: 100%">
    <el-table-column type="expand">
      <template scope="props">
        <el-row :gutter="20">
          <el-col :span="19" class="text-left">
            <p><b>Property Type:</b> {{ props.row.property_type }}</p>
            <p><b>Status:</b> {{ props.row.status }}</p>
            <p><b>Address:</b> {{ props.row.address }}</p>
            <p><b>Contact Email:</b> {{ props.row.contact_email }}</p>
          </el-col>
        </el-row>
      </template>
    </el-table-column>
    <el-table-column
      align="left"
      label="Property ID"
      prop="property_no">
    </el-table-column>
    <el-table-column
      align="left"
      label="Bank"
      prop="bank">
    </el-table-column>
    <el-table-column
      align="left"
      label="Title"
      prop="title">
    </el-table-column>
    <el-table-column
      align="left"
      label="Price"
      prop="price">
    </el-table-column>
    <el-table-column
      align="left"
      label="Address"
      prop="address">
    </el-table-column>
  </el-table>
  <el-pagination class="text-left" style="margin-top:10px"
    layout="total, prev, pager, next"
    :page-size="item_per_page"
    :total="total_properties"
    @current-change="switchToPage">
  </el-pagination>
  </div>
</template>
<script>
import Papa from 'papaparse'

export default {
  name: "",
  data() {
    return {
      loading:true,
      property_source:[],
      properties:[{}],
      total_properties:0,
      item_per_page: 20,
      page_count:0,
    }
  },
  methods: {
    loadProperties(start, end){
      var arr = [];
      for (var elem in this.property_source) {
         arr.push(this.property_source[elem]);
      }
      var items = arr.slice(start, end);
      this.properties = items;
      this.loading = false
      console.log(items);
    },
    switchToPage(page){
      var end = this.item_per_page * page;
      var start = end - this.item_per_page;
      this.loadProperties(start, end, false);
      this.current_page = page;
    },
    parseFile() {
      Papa.parse("../static/worksheets/bdo.csv", {
        header: true,
        download: true,
        complete: (results, file) => {
          this.property_source = JSON.parse(JSON.stringify(results.data))
          this.total_properties = Object.keys(this.property_source).length
          this.page_count = Object.keys(this.property_source).length / this.item_per_page
          this.loadProperties(0, this.item_per_page)
        }
      })

    }
  },
  mounted() {
    this.parseFile()
  }
}
</script>
<style scoped>
</style>
