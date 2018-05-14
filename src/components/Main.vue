<template>
  <div>
    <h1>{{ msg }}</h1>
    <h4>Total de employees: {{ totalEmployees }}</h4>
    <button @click="generateEmployees()">generate</button>
    <button @click="updateTest(0,55)">update</button>
    <b-card-group deck>
      <box-card v-for = "(employee, index) in employees" :employee="employee" :key="index">
        <template v-if="employee.test" slot="employee-test"> Test: {{ employee.test }} </template>
        <template v-else slot="employee-test"> Sem Test </template>
      </box-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: 'Main',
  components: {
    BoxCard: () => import('./Box'),
  },
  data() {
    return {
      msg: 'NPS Employee - Convenia',
    };
  },
  mounted() {
    this.generateEmployees();
  },
  computed: {
    employees() {
      return this.$store.getters.getEmployeesList;
    },
    totalEmployees() {
      return this.$store.getters.totalEmployees;
    },
  },
  methods: {
    updateTest(index, value) {
      this.$store.dispatch('updateTest', {
        index: index,
        value: value,
      });
    },
    generateEmployees() {
      this.$store.dispatch('searchEmployees');
    },
  },
};

</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
