import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import state from './state';

Vue.use(Vuex);

// when we have const URL = 'https://randomuser.me/api/?results=15';

export default new Vuex.Store({
  state,
  getters: {
    totalEmployees: state => state.state.employees.length,
    getEmployeesList: state => state.state.employees,
    getEmployee: state => state.state.employeeActive,
    // getEmployeesItems(state) {
    // return index => state.state.items.filter((item) => item.employeeId === index);
    // },
    getEmployeesItems: state => state.state.itemsActive,
  },
  mutations: {
    updateTest: (state, payload) => {
      Vue.set(state.state.employees[payload.index], 'test', payload.value); // test for new attribute
    },
    removeNPS: (state, payload) => {
      state.state.items.splice(state.state.items.findIndex(item => item.id === payload.id), 1);
      state.state.itemsActive.splice(state.state.itemsActive.findIndex(item => item.id === payload.id), 1); // err api
    },
    insertNPS: (state, payload) => {
      state.state.items.push(payload);
      state.state.itemsActive.push(payload); // err api
    },
    updateEmployeesList: (state, payload) => {
      state.state.employees = payload;
    },
    updateEmployeeItems: (state, payload) => {
      state.state.itemsActive = payload;  //err api
    },
    updateEmployee: (state, payload) => {
      state.state.employeeActive = payload;
    },
  },
  actions: {
    updateTest: (context, payload) => {
      context.commit('updateTest', payload);
    },
    removeNPS: (context, payload) => {
      context.commit('removeNPS', payload);
    },
    getItems: (context, employeeId) => {
      const newState = state.state.items.filter(item => item.employeeId === parseInt(employeeId));
      context.commit('updateEmployeeItems', newState);
    },
    getEmployee: (context, employeeId) => {
      const newEmployee = state.state.employees.filter(employees => employees.id === parseInt(employeeId));
      context.commit('updateEmployee', newEmployee[0]);
    },
    searchEmployees: (context) => {
      // axios
      // .get(URL)
      // .then(response => context.commit('updateEmployeesList', response.data.results));
    },
    insertNPS: (context, payload) => {
      context.commit('insertNPS', payload);
    },
  },
});
