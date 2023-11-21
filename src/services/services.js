import axios from "axios";

export class Service{
    // static serverURL = "http://localhost:5500";

    static serverURL = "https://mernrestaurantbackend.onrender.com";

    static getAll() {
        let dataUrl = `${this.serverURL}/api/items`;
        return axios.get(dataUrl);
      }

    static deleteItem(itemId){
        let dataUrl = `${this.serverURL}/api/item/${itemId}`;
        return axios.delete(dataUrl);
    }

    static addItem(data){
        let dataUrl = `${this.serverURL}/signup`;
        return axios.post(dataUrl,data)
    }
}