
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//Vue.component('example-component', require('./components/ExampleComponent.vue'));
Vue.component('modal',{
	template:'#modal-template'
})
const app = new Vue({
    el: '#app-vue',
    data:{
    	newItem:{ 'name':'','age':'','profession':'' },
    	hasError:true,
    	hasAgeError:true,
    	hasDeleted:true,
    	showModal:false,
    	items:[],
    	e_id:'',
    	e_name:'',
    	e_age:'',
    	e_profession:''
    },
  	mounted:function mounted(){
    	this.getItems();

    },
    methods:{
    	getItems:function getItems(){
    		var _this=this;
    		axios.get('/getItems').then(function(response){
    			_this.items=response.data;
    		})
    	},
    	setVal(val_id,val_name,val_age,val_profession){
    		this.e_id=val_id;
    		this.e_age=val_age;
    		this.e_name=val_name;
    		this.e_profession=val_profession;
    	},
    	createItem: function createItem(){
    		var input=this.newItem;
    		var _this=this;
    		if( input['name']==''|| input['age']==''|| input['profession']==''){
    			this.hasError=false;
    		}
    		else
    		{
    			this.hasError=true;
    			axios.post('/storeItem', input).then(function(response){
    				_this.newItem={'name':'','age':'','profession':''}
    				_this.getItems();

    			});
    			this.hasDeleted = true;
    		}
    	},
    	deleteItem:function deleteItem(item){
    		var _this=this;
    		axios.post('/deleteItem/' + item.id).then(function(response){
    			_this.getItems();
    			_this.hasError = true, 
        _this.hasDeleted = false
    		});
    	},
    	editItem:function editItem(){
    		var _this=this;
    		var i_val=document.getElementById('e_id');
    		var n_val=document.getElementById('e_name');
    		var a_val=document.getElementById('e_age');
    		var p_val=document.getElementById('e_profession');

    		axios.post('/editItem/' + i_val.value, {val1:n_val.value, val2:a_val.value, val3:p_val.value}).then(function(response){
    			_this.getItems();
    			_this.showModal=false
    		});
    		this.hasDeleted = true;
    	}
    	
    }
});
