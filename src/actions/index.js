let axios = require('axios');
//reducer to indicate that our api call has started
export let startDevSearch = () => {
    return {
        type : 'Start_Dev_Search'
    }
}

// reducer to indicate we have received all our data from the api
export let endDevSearch = (devsArray) => {
    return {
        type : 'End_Dev_Search',
        devsArray
    }
}


//here we actually do the fetching
export let fetchDev = (currency) => {
    let GET_CRYPTOCCY_URL = 'https://api.coinmarketcap.com/v1/ticker/?limit=5&convert=' + currency;
    return (dispatch) => {
        dispatch(startDevSearch())
        return axios.get(GET_CRYPTOCCY_URL).then(
            (response) => {
                let devsArr = response.data.slice(0,5); 
                let price = 'price' + '_' + currency.toLocaleLowerCase();
                devsArr.map((obj) => {
                    obj.currency = currency;
                    obj.currPrice = obj[price];
                    obj.isInt = Number(obj.percent_change_24h)>0;
                    return obj;
                })
                dispatch(endDevSearch(devsArr))
            },
            (err) => {
                console.log(err);
            }
        )

    }
}