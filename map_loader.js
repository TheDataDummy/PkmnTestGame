const map_data = fetch("./assets/maps/psgm_test.tmj")
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(err => console.log(err));