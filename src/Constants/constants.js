const constants = {
  pickupAddress: "Pickup Address",
  destinationAddress: "Destination Address",
  noOfUnits: "Number of units",
  weightPerUnit: "Weight Per Unit",
  DimensionPerUnit: "Dimension Per Unit",
  truckNumber: "Truck Number",
  driverName: "Driver Name",
  driverNumber: "Driver Phone Number",
  estimatedPickup: "Estimated Pickup",
  estimatedDelivery: "Estimated Delivery",
  customerName: "Name",
  customerEmail: "Email",
  customerPhoneNumber: "Phone Number",
  estimatedCost: "Estimated Price",
  companyName: "Company Name",
  usersName: "Name",
  usersEmail: "Email",
  usersPhone: "Phone",
  usersDesignation: "Designation",
  usersDepartment: "Department",
  usersRole: "Role",
  usersAccesses: "Accesses",
  usersAddedDate: "AddedDate",

  /*Price Calculator(same for inventory management)*/
  dimensionOptions: [
    { name: "Centimeters", value: "centimeters" },

    { name: "Inches", value: "inches" },
    { name: "Feets", value: "feets" },
    { name: "Millimeter", value: "millimeter" },
  ],

  lengthDimensions: [
    { label: "Centimeters", value: "centimeters" },
    { label: "Inches", value: "inches" },
    { label: "Feets", value: "feets" },
    { name: "Millimeter", value: "millimeter" },
  ],

  /*Inventory Management */
  inventoryFeatures: [
    { name: "Packed Food Item", id: 1 },
    { name: "Frozen", id: 2 },
    { name: "Sharable", id: 3 },
    { name: "Non-Sharable", id: 4 },
    { name: "Glass Items", id: 5 },
    { name: "Cosmetic Products", id: 6 },
    { name: "Liquid", id: 7 },
  ],

  inventoryCategory: [
    { label: "Packed Food Item", value: "packedFoodItem" },
    { label: "Frozen", value: "frozen" },
    { label: "Sharable", value: "sharable" },
    { label: "Non-Sharable", value: "nonSharable" },
    { label: "Glass Items", value: "glassItems" },
    { label: "Cosmetic Products", value: "cosmeticProducts" },
    { label: "Liquid", value: "liquid" },
  ],

  /**Types of product */
  typesOfProducts: [
    { label: "Auto Parts", value: "autoParts" },
    { label: "Building Materials", value: "buildingMaterials" },
    { label: "Fertilizers", value: "fertilizers" },
    { label: "Fruits And Vegetables", value: "fruitsAndVegetables" },
    { label: "Furniture And Wood Products", value: "furnitureAndWoodProducts" },
    { label: "Liquid in Drums", value: "liquidInDrums" },
    { label: "Liquid/Oil", value: "liquidOrOil" },
    { label: "Medicals", value: "medicals" },
  ],

  /*User Manager */

  userManagerRoles: [
    { name: "", value: "" },
    { name: "Admin", value: "admin" },
    { name: "Executive", value: "executive" },
    { name: "Finance", value: "finance" },
  ],

  /**Forms */

  timeSlots: [
    { name: "", value: "" },
    { name: "8AM-12Noon", value: "08-12" },
    { name: "12Noon-4PM", value: "12-16" },
    { name: "4PM-8PM", value: "16-20" },
    { name: "8PM-12Midnight", value: "20-00" },
  ],
  vas: [
    { name: "Onloading", value: "Onloading", id: 1 },
    { name: "Offloading", value: "offloading", id: 2 },
    { name: "Warehouse", value: "Warehouse", id: 3 },
  ],
};
export default constants;
