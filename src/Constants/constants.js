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
    { label: "Bardana Jute", value: "BardanaJute" },
    { label: "Building Material", value: "BuildingMaterial" },
    { label: "Cement", value: "Cement" },
    { label: "Chemicals", value: "Chemicals" },
    { label: "Coal and Ash", value: "CoalAsh" },
    { label: "Containers", value: "Containers" },
    { label: "Cotton Seed", value: "CottonSeed" },
    {
      label: "Electronics Consumer Durable",
      value: "ElectronicsConsumerDurable",
    },
    { label: "Fertilizers", value: "Fertilizers" },
    { label: "Fruits and Vegetables", value: "FruitsAndVegetables" },
    {
      label: "Furniture and Wood Products",
      value: "FurnitureAndWoodProducts",
    },
    { label: "House Hold Goods", value: "HouseHoldGoods" },
    { label: "Industrial Equipments", value: "IndustrialEquipments" },
    {
      label: "Iron sheets / bars / scraps",
      value: "IronSheetsBarsScraps",
    },
    { label: "Liquid in drums", value: "LiquidInDrums" },
    { label: "Liquids/Oil", value: "LiquidsOil" },
    { label: "Machinery new or old", value: "Machinery" },
    { label: "Medicals", value: "Medicals" },
    { label: "Metals", value: "Metals" },
    { label: "Mill Jute Oil", value: "MillJuteOil" },
    { label: "Packed Food", value: "PackedFood" },
    { label: "Plastic pipes", value: "PlasticPipes" },
    { label: "Powder Bags", value: "powderBags" },
    {
      label: "printed books or paper rolls",
      value: "printedBooksPaperRolls",
    },
    { label: "Refrigerated Goods", value: "RefrigeratedGoods" },
    {
      label: "Rice or wheat or agriculture products",
      value: "agricultureProducts",
    },
    { label: "scrap", value: "scrap" },
    { label: "spices", value: "spices" },
    { label: "Textiles", value: "Textiles" },
    { label: "Tyres and rubber products", value: "TyreAndRubber" },
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
  DistanceOptions: [
    {
      name: "0 - 50 Kms",
      value: {
        lowRange: 0,
        highRange: 50,
      },
    },
    {
      name: "50 - 200 Kms",
      value: {
        lowRange: 50,
        highRange: 200,
      },
    },
    {
      name: "200 - 400 Kms",
      value: {
        lowRange: 200,
        highRange: 400,
      },
    },
    {
      name: "400 - 800 Kms",
      value: {
        lowRange: 400,
        highRange: 800,
      },
    },
    {
      name: "800+ Kms",
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
