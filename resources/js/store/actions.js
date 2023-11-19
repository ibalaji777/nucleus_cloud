import axios from "axios";
var api = "http://127.0.0.1:3333/api/";
var apiCreateBranch = api + "create_branch";
var apiCreateMachine = api + "create_machine";

var apiCreateCompany = api + "create_company";
var apiCreateShift = api + "create_shift";
var apiCreateDownTime = api + "create_down_time";
var apiCreateBreak = api + "create_break";
var apiCreateEmployee = api + "create_employee";
var apiCreateProduct = api + "create_product";
var apiCreateGroup = api + "create_group";
var apiCreateEmpRole = api + "create_emprole";
var apiCreateMachinePrePlanning = api + "create_machine_pre_planning";
var apiUpdateEmployee = api + "update_employee";

var apiGetMachine = api + "get_machine";
var apiGetBranches = api + "get_branch";
var apiGetGroup = api + "get_group";
var apiGetEmployee = api + "get_employee";
var apiGetProducts = api + "get_products";
var apiGetDownTime = api + "get_downtime";
var apiGetBreak = api + "get_break";
var apiGetShift = api + "get_shift";
var apiGetEmpRole = api + "get_emprole";
var apiSignupCompany = api + "signup";
var apiSigninCompany = api + "signin";
var apiGetMachinePrePlanning = api + "get_machine_pre_planning";

var apiRemoveBranch = api + "remove_branch";
var apiRemoveProduct = api + "remove_product";
var apiRemoveEmployee = api + "remove_employee";
var apiRemoveGroup = api + "apiRemoveGroup";
var apiRemoveDownTime = api + "remove_downtime";
var apiRemoveShift = api + "remove_shift";
var apiRemoveBreak = api + "remove_break";
var apiRemoveMachine = api + "remove_machine";
var apiRemoveMachinePlannning = api + "remove_machine_pre_planning";

var apiCreateShedule = api + "create_shedule"; //
var apiGetShedule = api + "get_shedule"; //

// var apiCreateBranch=api+'create_branch';
// var apiCreateBranch=api+'create_branch';
// var apiCreateBranch=api+'create_branch';
// var apiCreateBranch=api+'create_branch';
// var apiCreateBranch=api+'create_branch';

const actions = {
  async apiCreateCompany(context, payload) {
    const { name } = payload;
    return await axios.post(apiCreateCompany, { data: { name } });
  },

  async CREATE_BRANCH(context, payload) {
    var result = await axios.post(apiCreateBranch, { data: payload });
    actions.GET_BRANCHES(context);
    return result;
  },

  async CREATE_SHIFT(context, payload) {
    var branch = context.state.setup.selected_branch;
    var result = await axios.post(apiCreateShift, {
      data: { ...payload, branch },
    });
    actions.GET_SHIFT(context);

    return result;
  },

  async CREATE_BREAK(context, payload) {
    var branch = context.state.setup.selected_branch;

    var result = await axios.post(apiCreateBreak, {
      data: { ...payload, branch },
    });
    actions.GET_BREAK(context);

    return result;
  },
  async CREATE_EMPLOYEE(context, payload) {
    console.log("employee", payload);
    var branch = context.state.setup.selected_branch;
    var result = await axios.post(apiCreateEmployee, {
      data: { ...payload, branch },
    });
    actions.GET_EMPLOYEE(context);
    return result;
  },
  async UPDATE_EMPLOYEE(context, payload) {
    console.log("update employee", payload);
    var result = await axios.post(apiUpdateEmployee, { data: payload });
    actions.GET_EMPLOYEE(context);
    return result;
  },
  async CREATE_PRODUCT(context, payload) {
    var branch = context.state.setup.selected_branch;
    var result = await axios.post(apiCreateProduct, {
      data: { ...payload, branch },
    });
    actions.GET_PRODUCTS(context);
    return result;
  },
  //pending.....
  async CREATE_GROUP(context, payload) {
    var result = await axios.post(apiCreateGroup, { data: payload });
    actions.CREATE_GROUP(context);
    return result;
  },

  async CREATE_SHEDULE(context, payload) {
    var branch = context.state.setup.selected_branch;

    var result = await axios.post(apiCreateShedule, {
      data: { ...payload, branch },
    });
    actions.GET_SHEDULE(context);
    return result;
  },

  async CREATE_MACHINE_PRE_PLANNING(context, payload) {
    var result = await axios.post(apiCreateMachinePrePlanning, {
      data: payload,
    });
    actions.GET_MACHINE_PRE_PLANNING(context);
    return result;
  },
  async CREATE_EMP_ROLE(context, payload) {
    return await axios.post(apiCreateEmpRole, { data: payload });
  },
  async CREATE_MACHINE(context, payload) {
    var branch = context.state.setup.selected_branch;

    var result = await axios.post(apiCreateMachine, {
      data: {
        ...payload,
        branch,
      },
    });
    actions.GET_MACHINES(context);
    return result;
  },
  async CREATE_DOWN_TIME(context, payload) {
    var branch = context.state.setup.selected_branch;

    var result = await axios.post(apiCreateDownTime, {
      data: { ...payload, branch },
    });
    actions.GET_DOWNTIME(context);
    return result;
  },
  GET_MACHINES(context) {
    return new Promise((resolve, reject) => {
      return axios
        .post(apiGetMachine)
        .then((data) => {
          context.commit("GET_MACHINES", data.data);
          resolve(data.data);
        })
        .catch((data) => reject(data));
    });
  },

  GET_EMPROLE(context) {
    return new Promise((resolve, reject) => {
      return axios
        .post(apiGetEmpRole)
        .then((data) => {
          context.commit("GET_EMPROLE", data.data);
          resolve(data.data);
        })
        .catch((data) => reject(data));
    });
  },

  GET_BRANCHES(context) {
    return new Promise((resolve, reject) => {
      return axios
        .post(apiGetBranches)
        .then((data) => {
          context.commit("GET_BRANCHES", data.data);
          resolve(data.data);
        })
        .catch((data) => reject(data));
    });
  },
  GET_GROUPS(context) {
    return new Promise((resolve, reject) => {
      return axios
        .post(apiGetGroup)
        .then((data) => {
          context.commit("GET_GROUPS", data.data);
          resolve(data.data);
        })

        .catch((data) => reject(data));
    });
  },
  GET_MACHINE_PRE_PLANNING(context) {
    return new Promise((resolve, reject) => {
      var machine_id = context.state.eventMachineDetail.id;
      return axios
        .post(apiGetMachinePrePlanning, { data: { machine_id } })
        .then((data) => {
          context.commit("MACHINE_PRE_PLANNING", data.data);
          resolve(data.data);
        })
        .catch((data) => reject(data));
    });
  },
  GET_SHEDULE(context) {
    return new Promise((resolve, reject) => {
      var branch = context.state.setup.selected_branch;
      return axios
        .post(apiGetShedule, { data: { branch } })
        .then((data) => {
          context.commit("GET_SHEDULE", data.data);
          resolve(data.data);
        })
        .catch((data) => reject(data));
    });
  },

  GET_BREAK(context) {
    return new Promise((resolve, reject) => {
      return axios
        .post(apiGetBreak)
        .then((data) => {
          context.commit("GET_BREAK", data.data);
          resolve(data.data);
        })
        .catch((data) => reject(data));
    });
  },
  GET_DOWNTIME(context) {
    return new Promise((resolve, reject) => {
      return axios
        .post(apiGetDownTime)
        .then((data) => {
          context.commit("GET_DOWNTIME", data.data);
          resolve(data.data);
        })
        .catch((data) => reject(data));
    });
  },
  GET_SHIFT(context) {
    return new Promise((resolve, reject) => {
      return axios
        .post(apiGetShift)
        .then((data) => {
          context.commit("GET_SHIFT", data.data);
          resolve(data.data);
        })
        .catch((data) => reject(data));
    });
  },
  async SIGNUP_COMPANY(context, payload) {
    return await axios.post(apiSignupCompany, { data: payload });
  },
  async SIGNIN_COMPANY(context, payload) {
    return await axios.post(apiSigninCompany, { data: payload });
  },

  GET_EMPLOYEE(context) {
    return new Promise((resolve, reject) => {
      return axios
        .post(apiGetEmployee)
        .then((data) => {
          context.commit("GET_EMPLOYEE", data.data);
          resolve(data.data);
        })
        .catch((data) => reject(data));
    });
  },
  GET_PRODUCTS(context) {
    //MUTATION IS PENDING
    return new Promise((resolve, reject) => {
      return axios
        .post(apiGetProducts)
        .then((data) => {
          context.commit("GET_PRODUCTS", data.data);
          resolve(data.data);
        })
        .catch((data) => reject(data));
    });
  },
  async REMOVE_BRANCH(context, payload) {
    var result = await axios.post(apiRemoveBranch, { data: payload });
    actions.GET_BRANCHES(context);

    return result;
  },
  async REMOVE_PRODUCT(context, payload) {
    var result = await axios.post(apiRemoveProduct, { data: payload });
    actions.GET_PRODUCTS(context);

    return result;
  },
  async REMOVE_GROUP(context, payload) {
    var result = await axios.post(apiRemoveGroup, { data: payload });
    actions.GET_GROUPS(context);
    return result;
  },
  async REMOVE_EMPLOYEE(context, payload) {
    var result = await axios.post(apiRemoveEmployee, { data: payload });
    actions.GET_EMPLOYEE(context);
    return result;
  },
  async REMOVE_DOWNTIME(context, payload) {
    var result = await axios.post(apiRemoveDownTime, { data: payload });
    actions.GET_DOWNTIME(context);
    return result;
  },
  async REMOVE_SHIFT(context, payload) {
    var result = await axios.post(apiRemoveShift, { data: payload });
    actions.GET_SHIFT(context);
    return result;
  },
  async REMOVE_BREAK(context, payload) {
    var result = await axios.post(apiRemoveBreak, { data: payload });
    actions.GET_BREAK(context);
    return result;
  },
  async REMOVE_MACHINE(context, payload) {
    var result = await axios.post(apiRemoveMachine, { data: payload });
    actions.GET_MACHINES(context);
    return result;
  },

  async REMOVE_MACHIEN_PRE_PLANNING(context, payload) {
    var result = await axios.post(apiRemoveMachinePlannning, {
      data: { id: payload },
    });
    actions.GET_MACHINE_PRE_PLANNING(context);
    return result;
  },
};

export default actions;
