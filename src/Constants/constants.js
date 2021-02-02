const constants = {
  pickupAddress: 'Pickup Address',
  destinationAddress:'Destination Address',
  noOfUnits:'Number of units',
  weightPerUnit:'Weight Per Unit',
  DimensionPerUnit: 'Dimension Per Unit',
  truckNumber: 'Truck Number',
  driverName: 'Driver Name',
  driverNumber: 'Driver Phone Number',
  estimatedPickup: 'Estimated Pickup',
  estimatedDelivery: 'Estimated Delivery',
  customerName:'Name',
  customerEmail:'Email',
  customerPhoneNumber:'Phone Number',
  estimatedCost:'Estimated Price',
  companyName: 'Company Name',
  usersName: 'Name',
  usersEmail:'Email',
  usersPhone:'Phone',
  usersDesignation:'Designation',
  usersDepartment:'Department',
  usersRole:'Role',
  usersAccesses:'Accesses',
  usersAddedDate:'AddedDate',


  /*Price Calculator(same for inventory management)*/
  dimensionOptions:[
    {name:'Centimeters',value:'centimeters'},
    {name:'Inches',value:'inches'},
    {name:'Feets',value:'feets'},
  ],



  /*Inventory Management */
  inventoryFeatures: [
    {name: 'Packed Food Item', id: 1},
    {name: 'Frozen', id: 2},
    {name:'Sharable',id:3},
    {name:'Non-Sharable',id:4},
    {name:'Glass Items',id:5},
    {name:'Cosmetic Products',id:6},
    {name:'Liquid',id:7}
  ],

  /*User Manager */

  userManagerRoles:[
    {name:'',value:''},
    {name:'Admin',value:'admin'},
    {name:'Executive',value:'executive'},
    {name:'Finance',value:'finance'}
  ],

  /**Forms */

  timeSlots:[
    {name:'',value:''},
    {name:'8AM-12Noon',value:'08-12'},
    {name:'12NOON-4PM',value:'12-16'},
    {name:'4PM-8PM',value:'16-20'},
    {name:'8PM-12Midnight',value:'20-00'}
  ]




}
export default constants