<template>
  <div>
    <el-row  type="flex" justify="center">
      <el-col :span="5">
        <el-card class="box-card" style="margin:0 10px">
          <el-upload
            :multiple="false"
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="true"
            :auto-upload="true">
            <el-button slot="trigger" type="primary" icon="plus">Upload New Foreclosures</el-button>
            <div class="el-upload__tip" slot="tip">accepts only .csv file</div>
          </el-upload>
        </el-card>
      </el-col>
      <el-col :span="19">
        <!-- <input type="text" v-model="search_text"/> -->
        <!-- <input type="text" v-model="search_text" @keyup="searchProperty"/> -->
        <el-table
        v-loading="loading"
        :data="properties"
        style="width: 100%">
          <el-table-column type="expand">
            <template scope="props">
              <el-row :gutter="20" class="text-left">
                <el-col :span="6">
                  <p><b>Property No:</b> {{ props.row.property_no }}</p>
                  <p><b>Bank:</b> {{ props.row.bank }}</p>
                  <p><b>Property Type:</b> {{ props.row.property_type }}</p>
                  <p><b>Price:</b> {{ props.row.price }}</p>
                  <p><b>Status:</b> {{ props.row.status }}</p>
                  <p><b>Contact Name:</b> {{ props.row.contact_name }}</p>
                  <p><b>Contact Email:</b> {{ props.row.contact_email }}</p>
                  <p><b>Contact Mobile:</b> {{ props.row.contact_mobike }}</p>
                  <p><b>Contact Home:</b> {{ props.row.contact_home }}</p>
                </el-col>
                <el-col :span="18">
                  <p><b>Title:</b> {{ props.row.title }}</p>
                  <p><b>Description:</b> {{ props.row.description }}</p>
                  <p><b>Bedrooms:</b> {{ props.row.bedrooms }}</p>
                  <p><b>Bathrooms:</b> {{ props.row.bathrooms }}</p>
                  <p><b>Parking:</b> {{ props.row.parkin }}</p>
                  <p><b>Floor Area:</b> {{ props.row.floor_area }}</p>
                  <p><b>Lot Area:</b> {{ props.row.lot_area }}</p>
                  <p><b>Address:</b> {{ props.row.address }}</p>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column align="left" label="Property ID" prop="property_no"></el-table-column>
          <el-table-column align="left" label="Bank" prop="bank" sortable></el-table-column>
          <el-table-column align="left" label="Title" prop="title"></el-table-column>
          <el-table-column align="left" label="Price" prop="price"></el-table-column>
          <el-table-column align="left" label="Offer Type" prop="offer_type"></el-table-column>
          <el-table-column align="left" label="Property Type" prop="property_type"></el-table-column>
          <el-table-column align="left" label="Status" prop="status" width="100"
          :filters="[{ text: 'Sold', value: 'sold' }, { text: 'Available', value: 'available' }]"
          :filter-method="filterTag" filter-placement="bottom-end">
            <template scope="scope">
              <el-tag :type="scope.row.status === 'sold' ? 'success' : 'primary'" close-transition>{{scope.row.status}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="text-left" style="margin-top:10px"
          layout="total, prev, pager, next"
          :page-size="item_per_page"
          :total="total_properties"
          @current-change="switchToPage">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import _ from 'lodash'
import Papa from 'papaparse'

export default {
  name: "",
  data() {
    return {
      search_text: '',
      loading:true,
      property_source:[],
      properties:[],
      total_properties:0,
      item_per_page: 20,
      page_count:0,
    }
  },
  computed: {
    filteredProperties: function(){
      const self = this;
      return this.properties.filter( function (property){
         return _.includes(property.property_no, self.search_text)
      })
    }
  },
  methods: {
    searchProperty(){
      var filtered = this.properties.filter((item)=>item['bank'] === this.search_text)
      console.log(filtered)
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.status === value;
    },
    loadProperties(start, end){
      var arr = [];
      for (var elem in this.property_source) {
         arr.push(this.property_source[elem]);
      }
      var items = arr.slice(start, end);
      this.properties = items;
      console.log(this.properties)
      this.loading = false
      // console.log(items);
    },
    switchToPage(page){
      var end = this.item_per_page * page;
      var start = end - this.item_per_page;
      this.loadProperties(start, end, false);
      this.current_page = page;
    },
    parseFile() {
      Papa.parse("../static/worksheets/foreclosures.csv", {
        header: true,
        download: true,
        complete: (results, file) => {
          console.log(results.data)
          var data = results.data.slice(0, -1)
          this.property_source = JSON.parse(JSON.stringify(data))
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
  .el-card{
    box-shadow: 0px 0px 0px 0px !important;
    border-radius: 2px !important;
    margin-bottom: 20px;
  }
</style>
