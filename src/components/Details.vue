<template>
    <div>
      <b-container class="bv-example-row">
        <b-row>
        <b-col>
          <b-card :title="employee ? employee.name.first + ' ' + employee.name.last : ''"
          :img-src="employee ? employee.picture.large : ''"
          :img-alt="employee ? employee.name.first + ' ' + employee.name.last : ''"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-12">
          <p class="card-text">
            {{ employee.email }}
          </p>
          <p class="card-text">
            NPS: {{ nps }}
          </p>
          <router-link tag="b-button" :to="{ name: 'home'}">Voltar</router-link>
          </b-card>
        </b-col>
        <b-col cols="8">
          <form-template></form-template>
          <table-template :items="items"></table-template>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import npsCalc from '../helpers/npsCalc'

export default {
  components: {
    FormTemplate: () => import('./Form'),
    TableTemplate: () => import('./Table'),
  },
  data () {
    return {
      nps:0,
      employee:'',
    }
  },
  computed: {
    items() {
      return this.$store.getters.getEmployeesItems
    },
  },
  mounted() {
    this.$store.dispatch('getItems', this.$route.params.userId)
    this.$store.dispatch('getEmployee', this.$route.params.userId)
  /*
    let vm = this;
    var newArray = this.$store.getters.getEmployeesList.filter(function (el) {
      return el.id == vm.$route.params.userId;
    });

    this.employee = newArray[0]
  */
    this.employee = this.$store.getters.getEmployee
    this.getNPS()
  },
  methods: {
    getNPS () {
      this.nps = npsCalc(this.items)
    },
  },
  watch: {
    items: function (val) {
      this.getNPS();
    }
  }
}
</script>
