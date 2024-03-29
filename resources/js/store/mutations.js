import Vue from "vue";
const mutations = {
  dialog(state, payload) {
    Vue.set(state.dialog, payload.key, payload.value);
  },

  GET_SHEDULE(state, result) {
    if (Array.isArray(result)) state.db.shedule = result;
  },
  GET_MACHINES(state, result) {
    if (Array.isArray(result)) state.db.machines = result;
  },
  GET_BRANCHES(state, result) {
    if (Array.isArray(result)) Vue.set(state.db, "branches", result);
  },
  GET_GROUPS(state, result) {
    if (Array.isArray(result)) state.db.groups = result;
  },
  GET_BREAK(state, result) {
    if (Array.isArray(result)) state.db.break = result;
  },
  GET_DOWNTIME(state, result) {
    if (Array.isArray(result)) state.db.downtime = result;
  },
  GET_SHIFT(state, result) {
    if (Array.isArray(result)) state.db.shift = result;
  },
  COMPANY_LOGIN(state, result) {
    state.setup.selected_company.id = result.id;
    state.setup.selected_company.email = result.email;
    state.setup.selected_company.phone = result.phone;
    state.setup.selected_company.company_name = result.company_name;
  },
  COMPANY_LOGOUT(state, result) {
    state.setup.selected_company.id = "";
    state.setup.selected_company.email = "";
    state.setup.selected_company.phone = "";
    state.setup.selected_company.company_name = "";
  },
  GET_EMPLOYEE(state, result) {
    if (Array.isArray(result)) state.db.employees = result;
  },
  GET_EMPROLE(state, result) {
    if (Array.isArray(result)) state.db.emprole = result;
  },
  EVENT_MACHINE_DETAIL(state, result) {
    state.eventMachineDetail.id = result.id || "";
    state.eventMachineDetail.code = result.code || "";
    state.eventMachineDetail.branch = result.branch || "";
    state.eventMachineDetail.name = result.name || "";
    state.eventMachineDetail.group = result.group || "";
    state.eventMachineDetail.hours = result.hours || "";
    state.eventMachineDetail.description = result.description || "";
    state.eventMachineDetail.username = result.username || "";
    state.eventMachineDetail.password = result.password || "";
  },
  GET_PRODUCTS(state, payload) {
    if (Array.isArray(payload)) state.db.products = payload;
  },
  SELECTED_BRANCH(state, payload) {
    state.setup.selected_branch = payload;
  },
  MACHINE_PRE_PLANNING(state, payload) {
    state.db.machinePrePlanning = payload;
  },
};
export default mutations;
