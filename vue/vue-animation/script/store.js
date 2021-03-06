const store = new Vuex.Store({
    state: {
        data: [],
        cities: [],
        filter: {
            order: false,
            age30d: false,
            age30u: false
        }
    },
    getters: {
        filterData(state) {
            let alias = [];
            state.data.forEach((user, i) => {
                if(!state.filter.order || i%2 == 1){
                    if(!state.filter.age30d || user.dob.age < 30){
                        if(!state.filter.age30u || user.dob.age > 30){
                            alias.push(user);
                        }else{
                            return false;
                        }
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            });

            return alias.sort((a, b) => a.id - b.id );
        }
    },
    mutations: {

        increment (state, results) {
            results.sort( function (a, b) {
                var keyA = a.id;
                var keyB = b.id;
                if(keyA < keyB) return -1;
                if(keyA > keyB) return 1;
                return 0;
            });

            state.data = results;
        },
        updateFilter(state, filter) {
            state.filter = filter;
        },
        increment_cities (state, results) {
            results.forEach((city) => {
                if(state.cities.indexOf(city) == -1) state.cities.push(city);
            });
        }

    },
    actions: {
        DATA_READ: (context) => {
            return axios.get('https://randomuser.me/api', {
                params: {
                    'results': 50
                }
            }).then((res) => {

                let alias = [];
                let cities = ['unknown'];
                let limit = res.data.results.length;
                let count = 1;

                res.data.results.forEach((user, i) => {
                    user['id'] = i;

                    let latlng = `${user.location.coordinates.latitude},${user.location.coordinates.longitude}`;
                    // console.log(latlng);

                    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                        params: {
                            key: 'AIzaSyBMd4jEPOPso5PkCp46H02dtjKb4jdA5sQ',
                            latlng: latlng,
                            language: 'en-US'
                        }
                    }).then((res) => {
                        let city;

                        if(res.data.results.length == 0){
                            city = 'unknown';
                        }else{
                            city = res.data.results[0].address_components[0].long_name;
                            context.commit('increment_cities', city);
                        }

                        user['city'] = city;
                        alias.push(user);


                        if(count == limit) {
                            context.commit('increment_cities', cities);
                            context.commit('increment', alias);
                        }
                        count ++;
                    }).catch((err) => {
                        // console.log(err);
                    });
                });

                // context.commit('increment', alias);
            }).catch((err) => {

            }).then(() => {

            });
        }
    }
});