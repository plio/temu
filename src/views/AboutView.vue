<template>
  <div class="about">
    <el-button type="primary" size="small" @click="handleEdit(false)">新增</el-button>
    <el-table :data="tableData" border>
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="picture_url" label="图片" width="100">
        <template #default="scope">
          <el-image :src="scope.row.picture_url" />
        </template>
      </el-table-column>
      <el-table-column prop="fn_sku" label="fn_sku" width="120" />
      <el-table-column prop="platform_sku" label="platform_sku" width="140" />
      <el-table-column prop="product_name" label="产品名称" min-width="200" />
      <el-table-column prop="cost_price" label="成本价(元)" width="90" />
      <el-table-column prop="weight" label="重量(kg)" width="90" />
      <el-table-column prop="dimensions" label="尺寸(cm)" width="90" />
      <el-table-column prop="create_time" label="创建时间" width="160" />
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="page" :page-size="pageSize" :total="total" layout="prev, pager, next"
      @current-change="handlePageChange" />
    <el-drawer v-model="dialog" title="编辑产品" :before-close="handleClose" class="demo-drawer">
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="fn_sku" :label-width="formLabelWidth">
            <el-input v-model="form.fn_sku" autocomplete="off" />
          </el-form-item>
          <el-form-item label="图片" :label-width="formLabelWidth">
            <el-input v-model="form.picture_url" autocomplete="off" />
          </el-form-item>
          <el-form-item label="产品名称" :label-width="formLabelWidth">
            <el-input v-model="form.product_name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="platform_sku" :label-width="formLabelWidth">
            <el-input v-model="form.platform_sku" autocomplete="off" />
          </el-form-item>
          <el-form-item label="成本价(元)" :label-width="formLabelWidth">
            <el-input v-model="form.cost_price" autocomplete="off" />
          </el-form-item>
          <el-form-item label="重量(kg)" :label-width="formLabelWidth">
            <el-input v-model="form.weight" autocomplete="off" />
          </el-form-item>
          <el-form-item label="尺寸(cm)" :label-width="formLabelWidth">
            <el-input v-model="form.dimensions" autocomplete="off" />
          </el-form-item>
          <el-form-item label="启用" :label-width="formLabelWidth">
            <el-input v-model="form.status" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">Cancel</el-button>
          <el-button type="primary" :loading="loading" @click="onClick">
            {{ loading ? 'Submitting ...' : 'Submit' }}
          </el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { fetchProducts, saveProducts } from '@/api/index' // 注意路径是否正确
import { ElMessageBox } from 'element-plus'

const tableData = ref([])
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)

const dialog = ref(false)
const loading = ref(false)
const formLabelWidth = '80px'
const defaultForm = {
  fn_sku: '',
  picture_url: '',
  product_name: '',
  platform_sku: '',
  status: '1',
  cost_price: '7.50',
  weight: '0.115',
  dimensions: '20*8*6'
}
const form = reactive({ ...defaultForm })  // 初始赋值


onMounted(async () => {
  fetchData();
})

async function fetchData() {
  const searchData = {
    page: page.value,
    pageSize: pageSize.value,
    status: '1'
  }
  const result = await fetchProducts(searchData)
  tableData.value = result.data
  total.value = result.total
}

function handlePageChange(p) {
  page.value = p
  fetchData()
}

const handleEdit = (row) => {
  dialog.value = true
  if (!row) {
    Object.assign(form, defaultForm)
  } else {
    Object.assign(form, row)
  }
}

const handleClose = (done) => {
  if (loading.value) {
    return
  }
  ElMessageBox.confirm('Do you want to submit?')
    .then(() => {
      onClick();
    })
}

const onClick = async () => {
  loading.value = true
  await saveProducts(form)
  loading.value = false
  dialog.value = false
  fetchData();
}

const cancelForm = () => {
  loading.value = false
  dialog.value = false
}
</script>