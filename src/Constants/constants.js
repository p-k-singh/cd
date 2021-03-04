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
    { label: "Millimeter", value: "millimeter" },
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
    { label: "Bardana Jute", value: "bardanaJute" },
    { label: "Building Material", value: "buildingMaterial" },
    { label: "Cement", value: "cement" },
    { label: "Chemicals", value: "chemicals" },
    { label: "Coal and Ash", value: "coalAndAsh" },
    { label: "Containers", value: "containers" },
    { label: "Cotton Seed", value: "cottonSeed" },
    {
      label: "Electronics Consumer Durable",
      value: "electronicsConsumerDurable",
    },
    { label: "Fertilizers", value: "fertilizers" },
    { label: "Fruits and Vegetables", value: "fruitsAndVegetables" },
    {
      label: "Furniture and Wood Products",
      value: "furnitureAndWoodProducts",
    },
    { label: "House Hold Goods", value: "houseHoldGoods" },
    { label: "Industrial Equipments", value: "industrialEquipments" },
    {
      label: "Iron sheets / bars / scraps",
      value: "ironSheetsOrBarsOrScraps",
    },
    { label: "Liquid in drums", value: "liquidInDrums" },
    { label: "Liquids/Oil", value: "liquids/oil" },
    { label: "Machinery new or old", value: "machineryNewOrOld" },
    { label: "Medicals", value: "medicals" },
    { label: "Metals", value: "metals" },
    { label: "Mill Jute Oil", value: "millJuteOil" },
    { label: "Packed Food", value: "packedFood" },
    { label: "Plastic pipes", value: "plasticPipes" },
    { label: "Powder Bags", value: "powderBags" },
    {
      label: "printed books or paper rolls",
      value: "printedBooksOrPaperRolls",
    },
    { label: "Refrigerated Goods", value: "refrigeratedGoods" },
    {
      label: "Rice or wheat or agriculture products",
      value: "riceOrWheatOrAgricultureProducts",
    },
    { label: "scrap", value: "scrap" },
    { label: "spices", value: "spices" },
    { label: "Textiles", value: "textiles" },
    { label: "Tyres and rubber products", value: "tyresAndRubberProducts" },
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
    { label: "8AM-12Noon", value: "08-12" },
    { label: "12Noon-4PM", value: "12-16" },
    { label: "4PM-8PM", value: "16-20" },
    { label: "8PM-12Midnight", value: "20-00" },
  ],
  DistanceOptions: [
    {
      label: "0 - 50 Kms",
      value: {
        lowRange: 0,
        highRange: 50,
      },
    },
    {
      label: "50 - 200 Kms",
      value: {
        lowRange: 50,
        highRange: 200,
      },
    },
    {
      label: "200 - 400 Kms",
      value: {
        lowRange: 200,
        highRange: 400,
      },
    },
    {
      label: "400 - 800 Kms",
      value: {
        lowRange: 400,
        highRange: 800,
      },
    },
    {
      label: "800+ Kms",
      value: {
        lowRange: 800,
        highRange: 2000,
      },
    },
  ],
  vas: [
    { name: "Onloading", value: "Onloading", id: 1 },
    { name: "Offloading", value: "offloading", id: 2 },
    { name: "Warehouse", value: "Warehouse", id: 3 },
  ],
};
export default constants;
