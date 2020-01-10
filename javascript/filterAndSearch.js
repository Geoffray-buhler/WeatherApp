function filter(data, filters = {}) {
    // Set up the specific defaults that will show everything:
    const defaults = {
      name: "No Match",
    }
  
    // Merge any filters with the defaults
    filters = Object.assign({}, defaults, filters);
  
    // Filter based on that filters object:
    return data.filter(data => {
      return (data.name == filters.name);
    });
  }