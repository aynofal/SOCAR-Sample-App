import axios from 'axios';

const baseUrl = 'https://api.github.com/search';
const userSearchString = '/users?per_page=10'

const api = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
});

export default class User{
    static async getUsers(query, filters, page){
        let url = `${userSearchString}&page=${page}&q=${encodeURIComponent(query)}`;
        return await api.get(url, {
            headers: {
                'Accept': 'application/json',
            }
        }).then(res=>res).catch(err=>{
            if(err.response){
                return err.response
            } else if (err.request){
                return err.request
            } else return err.message
        });
    }
}