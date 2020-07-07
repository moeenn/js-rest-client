class Store {
  constructor(name) {
    this.name = key;
  }

  Add(obj) {
    if(localStorage.getItem(this.name)) {
      throw `Add Failed: Item Already Exists: ${this.name}`;
    }
    localStorage.setItem(this.name, obj);
  }

  Update(newObj) {
    if(localStorage.getItem(this.name) === null) {
      throw `Update Failed: Item does not exist: ${this.name}`;
    }
    localStorage.setItem(this.name, newObj);
  }

  Delete() {
    if(localStorage.getItem(this.name) === null) {
      console.warn(`Deletion Failed: Item does not exist: ${this.name}`);
      return;
    }
    localStorage.removeItem(this.name);
  }

  AddArray(array) {
    if(localStorage.getItem(this.name)) {
      console.warn(`Add Array Failed: Item Already Exists: ${this.name}`);
      return;
    }
    localStorage.setItem(this.name, array);
  }

  AddArrayElement(newObj) {
    if(localStorage.getItem(this.name) === null) {
      console.warn(`Array Add Item Failed: Array not found: ${this.name}`);
      return;
    }
    const data = localStorage.getItem(this.name);
    try {
      data.push(newObj);
    } catch {
      console.warn(`Array Add Item Failed: Item not of Array Type: ${this.name}`);
      return;
    }
    localStorage.setItem(this.name, data);
  }
}

export default Store;