<template>
    <div>
      <b-container fluid>
          <!-- User Interface controls -->
          <b-row>
            <b-col md="6" class="my-1">
              <b-form-group horizontal label="Filtro" class="mb-0">
                <b-input-group>
                  <b-form-input v-model="filter" placeholder="Digite para filtrar" />
                  <b-input-group-append>
                    <b-btn :disabled="!filter" @click="filter = ''">Limpar</b-btn>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col md="6" class="my-1">
              <b-form-group horizontal label="Sort" class="mb-0">
                <b-input-group>
                  <b-form-select v-model="sortBy" :options="sortOptions">
                    <option slot="first" :value="null">-- nenhum --</option>
                  </b-form-select>
                  <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
                    <option :value="false">Asc</option>
                    <option :value="true">Desc</option>
                  </b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>

          <!-- Main table element -->
          <b-table show-empty
                  stacked="md"
                  :items="items"
                  :fields="fields"
                  :current-page="currentPage"
                  :per-page="perPage"
                  :filter="filter"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  @filtered="onFiltered"
          >
            <template slot="actions" slot-scope="row">
              <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
              <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">
                Informações
              </b-button>
              <b-button size="sm" @click.stop="remove(row.index, row.item.id)" class="mr-1">
                Remover
              </b-button>
            </template>
          </b-table>

          <!-- Info modal -->
          <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.title" ok-only>
            <pre>{{ modalInfo.content }}</pre>
          </b-modal>

          <b-row>
            <b-col md="6" class="my-1">
              <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
            </b-col>
            <b-col md="6" class="my-1">
              <b-form-group horizontal label="Per page" class="mb-0">
                <b-form-select :options="pageOptions" v-model="perPage" />
              </b-form-group>
            </b-col>
          </b-row>
          </b-container> 
    </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    items: {
      type: Array,
    },
  },
  data () {
    return {
      fields: [
        { key: 'name', label: 'Nome', sortable: true },
        { key: 'date', label: 'Data', sortable: true, 'class': 'text-center' },
        { key: 'nps', label: 'NPS' },
        { key: 'actions', label: 'Ação' }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      pageOptions: [ 5, 10, 15 ],
      sortBy: null,
      sortDesc: false,
      filter: null,
      modalInfo: { title: '', content: '' }
    }
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    },
  },
  methods: {
    info (item, index, button) {
      this.modalInfo.title = `Row index: ${index}`
      this.modalInfo.content = item.text
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    remove (index, id) {
        this.$store.dispatch('removeNPS', {
          id: id
        });
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  }
}
</script>

<style>
.form-group{
    text-align: left;
}
</style>
