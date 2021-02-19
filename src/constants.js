export const localStorageNamespaces = {
  companies: "companies",
  graph: "graph"
};

export const defaultCompanies = [
  "BizStream",
  "ACD",
  "Amway",
  "Amway North America",
  "Arcadia Brewing Company",
  "Art Van",
  "Better Made Potato Chips",
  "Big Boy Restaurants",
  "Coffee Beanery",
  "The Delfield Company",
  "Founders Brewing Company",
  "Gordon Food Service",
  "Guardian Industries",
  "Hot 'n Now",
  "Independent Bank",
  "Jiffy mix",
  "JSTOR",
  "Jet's Pizza",
  "Meritor",
  "Michigan Sugar",
  "Miller, Canfield, Paddock and Stone",
  "Perrigo",
  "Stryker Corporation",
  "Upper Peninsula Power Company",
  "Zingerman's"
];

export const defaultGraph = {
  nodes: [
    {
      name: "BizStream"
    },
    {
      name: "ACD"
    },
    {
      name: "Amway"
    },
    {
      name: "Amway North America"
    },
    {
      name: "Arcadia Brewing Company"
    },
    {
      name: "Art Van"
    },
    {
      name: "Better Made Potato Chips"
    },
    {
      name: "Big Boy Restaurants"
    },
    {
      name: "Coffee Beanery"
    },
    {
      name: "The Delfield Company"
    },
    {
      name: "Founders Brewing Company"
    },
    {
      name: "Gordon Food Service"
    },
    {
      name: "Guardian Industries"
    },
    {
      name: "Hot 'n Now"
    },
    {
      name: "Independent Bank"
    },
    {
      name: "Jiffy mix"
    },
    {
      name: "JSTOR"
    },
    {
      name: "Jet's Pizza"
    },
    {
      name: "Meritor"
    },
    {
      name: "Michigan Sugar"
    },
    {
      name: "Miller, Canfield, Paddock and Stone"
    },
    {
      name: "Perrigo"
    },
    {
      name: "Stryker Corporation"
    },
    {
      name: "Upper Peninsula Power Company"
    },
    {
      name: "Zingerman's"
    }
  ],
  links: [
    {
      source: "BizStream",
      target: "The Delfield Company"
    },
    {
      source: "BizStream",
      target: "Better Made Potato Chips"
    },
    {
      source: "ACD",
      target: "BizStream"
    },
    {
      source: "Amway North America",
      target: "BizStream"
    },
    {
      source: "BizStream",
      target: "Guardian Industries"
    },
    {
      source: "Amway",
      target: "JSTOR"
    },
    {
      source: "Amway North America",
      target: "Michigan Sugar"
    },
    {
      source: "Amway North America",
      target: "Jet's Pizza"
    },
    {
      source: "Arcadia Brewing Company",
      target: "The Delfield Company"
    },
    {
      source: "Art Van",
      target: "Michigan Sugar"
    },
    {
      source: "Art Van",
      target: "JSTOR"
    },
    {
      source: "Coffee Beanery",
      target: "Upper Peninsula Power Company"
    },
    {
      source: "The Delfield Company",
      target: "Stryker Corporation"
    },
    {
      source: "The Delfield Company",
      target: "Jet's Pizza"
    },
    {
      source: "Founders Brewing Company",
      target: "Jiffy mix"
    },
    {
      source: "Founders Brewing Company",
      target: "Stryker Corporation"
    },
    {
      source: "Guardian Industries",
      target: "Miller, Canfield, Paddock and Stone"
    },
    {
      source: "Hot 'n Now",
      target: "Guardian Industries"
    },
    {
      source: "Hot 'n Now",
      target: "Gordon Food Service"
    },
    {
      source: "Independent Bank",
      target: "Upper Peninsula Power Company"
    },
    {
      source: "JSTOR",
      target: "Zingerman's"
    },
    {
      source: "JSTOR",
      target: "Zingerman's"
    },
    {
      source: "Miller, Canfield, Paddock and Stone",
      target: "The Delfield Company"
    },
    {
      source: "Miller, Canfield, Paddock and Stone",
      target: "Guardian Industries"
    },
    {
      source: "Perrigo",
      target: "ACD"
    },
    {
      source: "Perrigo",
      target: "The Delfield Company"
    },
    {
      source: "Stryker Corporation",
      target: "Perrigo"
    },
    {
      source: "Stryker Corporation",
      target: "Amway North America"
    },
    {
      source: "Upper Peninsula Power Company",
      target: "Better Made Potato Chips"
    },
    {
      source: "Zingerman's",
      target: "The Delfield Company"
    }
  ]
};
